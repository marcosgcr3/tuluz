import express from 'express';
import cors from 'cors';
import compression from 'compression';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

import { 
  initDatabase, 
  isDbConnected, 
  saveLead, 
  getAllLeads, 
  updateLeadStatus, 
  deleteLead 
} from './db.js';

// Inicializar conexión con PostgreSQL (con fallback automático a leads.json)
initDatabase();

const app = express();
const PORT = process.env.PORT || 3000;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'davidad@tu-luz.es';

// Middleware
// Compresión de texto Gzip/Deflate para acelerar transferencias en móvil
app.use(compression());
// Redirección canónica permanente 301 para SEO (eliminar www y unificar autoridad en tu-luz.es)
app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host.startsWith('www.')) {
    const cleanHost = host.slice(4);
    const protoHeader = req.headers['x-forwarded-proto'];
    const protocol = (typeof protoHeader === 'string' ? protoHeader.split(',')[0].trim() : '') || 'https';
    return res.redirect(301, `${protocol}://${cleanHost}${req.originalUrl}`);
  }
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Multer for in-memory file handling
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB max file size
});

import fs from 'fs';

// Configure Nodemailer Transport
function isConfiguredSMTP() {
  return (
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.SMTP_PASS !== 'tu_contraseña_de_aplicación_de_google' &&
    process.env.SMTP_PASS.trim() !== ''
  );
}

function getTransporter() {
  if (isConfiguredSMTP()) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== 'false',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS.replace(/\s+/g, '')
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  return null;
}

// Persist leads locally to PostgreSQL and leads.json backup
const LEADS_FILE = path.join(__dirname, 'leads.json');

async function saveLeadLocally(leadData) {
  try {
    await saveLead(leadData);
  } catch (err) {
    console.error('Error guardando lead:', err);
  }
}

// API Endpoint for Contact & Quote Requests
app.post('/api/contact', upload.single('factura'), async (req, res) => {
  try {
    const { name, phone, email, clientType, monthlyBill, notes, source, pageUrl } = req.body;

    const leadSource = source || 'Web Directa / Orgánico';
    console.log(`📩 Recibida nueva solicitud de ${name} (${email}, Tel: ${phone}) | Origen: ${leadSource}`);

    const leadRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      name: name || '',
      phone: phone || '',
      email: email || '',
      clientType: clientType || 'particular',
      source: leadSource,
      pageUrl: pageUrl || '',
      monthlyBill: monthlyBill || '',
      notes: notes || '',
      hasFile: !!req.file,
      fileName: req.file ? req.file.originalname : null,
      fileSize: req.file ? req.file.size : null
    };

    // Save lead record permanently
    saveLeadLocally(leadRecord);

    // If real SMTP credentials are provided, send email
    if (isConfiguredSMTP()) {
      const transporter = getTransporter();
      if (transporter) {
        const attachments = [];
        if (req.file) {
          attachments.push({
            filename: req.file.originalname,
            content: req.file.buffer,
            contentType: req.file.mimetype
          });
        }

        const htmlTemplate = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f5; margin: 0; padding: 20px; color: #1e293b; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
              .header { background: linear-gradient(135deg, #4CAF4F 0%, #2e6931 100%); color: #ffffff; padding: 30px 25px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
              .header p { margin: 5px 0 0 0; opacity: 0.9; font-size: 14px; }
              .content { padding: 30px 25px; }
              .badge { display: inline-block; background: #fef3c7; color: #d97706; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 20px; }
              .source-badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 700; }
              .info-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
              .info-table th, .info-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
              .info-table th { background-color: #f8faf9; color: #475569; font-weight: 600; width: 35%; }
              .info-table td { color: #0f172a; font-weight: 500; }
              .notes-box { background-color: #f8faf9; border-left: 4px solid #4CAF4F; padding: 15px; border-radius: 4px; font-size: 14px; color: #334155; margin-bottom: 25px; }
              .actions { text-align: center; padding: 20px 0; border-top: 1px solid #f1f5f9; }
              .btn { display: inline-block; padding: 12px 24px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 0 5px; }
              .btn-primary { background-color: #4CAF4F; color: #ffffff; }
              .btn-secondary { background-color: #f1f5f9; color: #0f172a; }
              .footer { background-color: #f8faf9; text-align: center; padding: 15px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>⚡ tuLuz - Nueva Solicitud de Estudio</h1>
                <p>Asesoramiento Energético • Notificación a ${RECIPIENT_EMAIL}</p>
              </div>

              <div class="content">
                <div style="display: flex; gap: 8px; margin-bottom: 20px;">
                  <span class="badge">Perfil: ${clientType || 'Particular'}</span>
                  <span class="source-badge">📍 Origen: ${leadSource}</span>
                </div>

                <h2 style="font-size: 18px; margin-top: 0; color: #0f172a;">Detalles de la Solicitud:</h2>
                
                <table class="info-table">
                  <tr>
                    <th>Canal / Origen:</th>
                    <td><strong style="color: #0284c7;">${leadSource}</strong></td>
                  </tr>
                  <tr>
                    <th>Nombre:</th>
                    <td><strong>${name}</strong></td>
                  </tr>
                  <tr>
                    <th>Teléfono:</th>
                    <td><a href="tel:${phone}" style="color: #4CAF4F; font-weight: 700; text-decoration: none;">${phone}</a></td>
                  </tr>
                  <tr>
                    <th>Correo del Cliente:</th>
                    <td><a href="mailto:${email}" style="color: #4CAF4F; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <th>Tipo de Cliente:</th>
                    <td>${clientType || 'Particular'}</td>
                  </tr>
                  ${monthlyBill ? `
                  <tr>
                    <th>Gasto Mensual Estimado:</th>
                    <td><strong style="color: #4CAF4F;">${monthlyBill} €/mes</strong></td>
                  </tr>
                  ` : ''}
                  <tr>
                    <th>Factura Adjunta:</th>
                    <td>${req.file ? `📎 ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB)` : 'No se adjuntó archivo'}</td>
                  </tr>
                </table>

                ${notes ? `
                  <h3 style="font-size: 14px; color: #475569; margin-bottom: 8px;">Observaciones / Mensaje:</h3>
                  <div class="notes-box">${notes}</div>
                ` : ''}

                <div class="actions">
                  <a href="mailto:${email}?subject=Estudio%20Energético%20tuLuz%20para%20${encodeURIComponent(name)}" class="btn btn-primary">Responder a ${name}</a>
                  <a href="tel:${phone}" class="btn btn-secondary">Llamar al ${phone}</a>
                </div>
              </div>

              <div class="footer">
                © ${new Date().getFullYear()} tuLuz Asesoramiento Energético • Notificación directa a (${RECIPIENT_EMAIL}).
              </div>
            </div>
          </body>
          </html>
        `;

        const mailOptions = {
          from: `"tuLuz Asesoramiento Energético" <${process.env.SMTP_USER || RECIPIENT_EMAIL}>`,
          to: RECIPIENT_EMAIL,
          replyTo: email,
          subject: `⚡ Nueva Solicitud tuLuz: ${name} (${clientType || 'Particular'})`,
          html: htmlTemplate,
          attachments: attachments
        };

        try {
          const info = await transporter.sendMail(mailOptions);
          console.log(`✅ Correo enviado con éxito a ${RECIPIENT_EMAIL}. MessageId: ${info.messageId}`);
        } catch (mailErr) {
          console.error('⚠️ Error enviando correo SMTP:', mailErr.message);
        }
      }
    } else {
      console.warn(`⚠️ SMTP NO configurado en el servidor. (Variables SMTP_USER y SMTP_PASS no encontradas en el entorno). Destinatario: ${RECIPIENT_EMAIL}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Solicitud recibida y registrada correctamente.'
    });

  } catch (error) {
    console.error('❌ Error procesando solicitud:', error);
    return res.status(200).json({
      success: true,
      message: 'Solicitud recibida'
    });
  }
});

// ==========================================
// META ADS (FACEBOOK / INSTAGRAM) WEBHOOK
// ==========================================

// Helper para extraer campos de field_data de Meta
function getMetaField(fieldData, aliases) {
  if (!Array.isArray(fieldData)) return '';
  for (const alias of aliases) {
    const found = fieldData.find(f => f.name && f.name.toLowerCase() === alias.toLowerCase());
    if (found && found.values && found.values.length > 0) {
      return String(found.values[0]).trim();
    }
  }
  return '';
}

// Función centralizada para enviar notificación por correo al recibir un lead de Meta Ads
async function sendMetaLeadNotificationEmail(leadRecord, extraHtml = '') {
  if (!isConfiguredSMTP()) {
    console.warn(`⚠️ [Meta Ads] SMTP no configurado, no se envió email para ${leadRecord.name}`);
    return false;
  }

  const transporter = getTransporter();
  if (!transporter) return false;

  const { name, phone, email, notes, pageUrl } = leadRecord;
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f5; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #1877F2 0%, #0d5cb6 100%); color: #ffffff; padding: 30px 25px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; font-size: 14px; }
        .content { padding: 30px 25px; }
        .badge { display: inline-block; background: #e0f2fe; color: #0284c7; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 20px; }
        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
        .info-table th, .info-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .info-table th { background-color: #f8faf9; color: #475569; font-weight: 600; width: 35%; }
        .info-table td { color: #0f172a; font-weight: 500; }
        .actions { text-align: center; padding: 20px 0; border-top: 1px solid #f1f5f9; }
        .btn { display: inline-block; padding: 12px 20px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 5px; }
        .btn-call { background-color: #4CAF4F; color: #ffffff; }
        .btn-wa { background-color: #25D366; color: #ffffff; }
        .btn-mail { background-color: #0284c7; color: #ffffff; }
        .footer { background-color: #f8faf9; text-align: center; padding: 15px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 ¡Nuevo Cliente Potencial de Meta Ads!</h1>
          <p>Campaña de Publicidad • Notificación a ${RECIPIENT_EMAIL}</p>
        </div>

        <div class="content">
          <div style="margin-bottom: 20px;">
            <span class="badge">📍 Origen: Meta Ads (Facebook / Instagram)</span>
          </div>

          <h2 style="font-size: 18px; margin-top: 0; color: #0f172a;">Datos del Contacto:</h2>
          
          <table class="info-table">
            <tr>
              <th>Nombre:</th>
              <td><strong style="font-size: 16px; color: #0f172a;">${name || 'Cliente Meta'}</strong></td>
            </tr>
            <tr>
              <th>Teléfono:</th>
              <td><a href="tel:${phone}" style="color: #4CAF4F; font-weight: 700; font-size: 16px; text-decoration: none;">📞 ${phone || 'No especificado'}</a></td>
            </tr>
            <tr>
              <th>Correo Electrónico:</th>
              <td><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">✉️ ${email || 'No especificado'}</a></td>
            </tr>
            ${pageUrl ? `<tr><th>Origen / Formulario:</th><td style="color: #64748b; font-size: 13px;">${pageUrl}</td></tr>` : ''}
            ${notes ? `<tr><th>Detalles / Respuestas:</th><td style="font-size: 13px; white-space: pre-line;">${notes}</td></tr>` : ''}
            ${extraHtml || ''}
          </table>

          <div class="actions">
            ${cleanPhone ? `
              <a href="tel:${cleanPhone}" class="btn btn-call">📞 Llamar Ahora</a>
              <a href="https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(name || '')},%20te%20contactamos%20de%20T%C3%BA%20Luz%20respecto%20a%20tu%20solicitud%20de%20estudio%20energ%C3%A9tico" class="btn btn-wa" target="_blank">💬 WhatsApp</a>
            ` : ''}
            ${email && email !== 'No especificado' ? `
              <a href="mailto:${email}?subject=Estudio%20Energ%C3%A9tico%20T%C3%BA%20Luz%20para%20${encodeURIComponent(name || '')}" class="btn btn-mail">✉️ Enviar Email</a>
            ` : ''}
          </div>
        </div>

        <div class="footer">
          © ${new Date().getFullYear()} tuLuz Asesoramiento Energético • Notificación directa a (${RECIPIENT_EMAIL}).
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"tuLuz - Meta Ads" <${process.env.SMTP_USER || RECIPIENT_EMAIL}>`,
    to: RECIPIENT_EMAIL,
    replyTo: (email && email !== 'No especificado') ? email : RECIPIENT_EMAIL,
    subject: `🎯 Lead Meta Ads: ${name || 'Contacto'} (${phone || 'Sin teléfono'})`,
    html: htmlTemplate
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ [Meta Ads] Correo de lead enviado con éxito a ${RECIPIENT_EMAIL}. MessageId: ${info.messageId}`);
    return true;
  } catch (mailErr) {
    console.error('⚠️ [Meta Ads] Error enviando correo SMTP:', mailErr.message);
    return false;
  }
}

// GET /webhook (Handshake de verificación con Meta)
const handleMetaWebhookVerification = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const expectedToken = process.env.META_VERIFY_TOKEN;

  if (!expectedToken) {
    console.error('❌ Error de configuración: META_VERIFY_TOKEN no está definido en el archivo .env');
    return res.status(500).send('META_VERIFY_TOKEN no configurado en el servidor');
  }

  if (mode === 'subscribe' && token === expectedToken) {
    console.log('✅ Webhook de Meta Ads verificado con éxito por Meta.');
    return res.status(200).send(String(challenge));
  } else {
    console.warn(`⚠️ Intento fallido de verificación de Webhook de Meta. Token recibido: "${token}" no coincide con el definido en .env.`);
    return res.sendStatus(403);
  }
};

app.get('/webhook', handleMetaWebhookVerification);
app.get('/api/meta-webhook', handleMetaWebhookVerification);

// POST /webhook (Recepción en tiempo real de nuevo Lead de Meta Ads)
const handleMetaWebhookEvent = async (req, res) => {
  try {
    const body = req.body;

    // Responder inmediatamente a Meta para confirmar recepción y evitar reintentos
    res.status(200).send('EVENT_RECEIVED');

    if (body.object !== 'page') return;

    for (const entry of (body.entry || [])) {
      for (const change of (entry.changes || [])) {
        if (change.field === 'leadgen') {
          const { leadgen_id, form_id, ad_id } = change.value || {};
          console.log(`🎯 [Meta Ads] ¡Nuevo cliente potencial recibido! Leadgen ID: ${leadgen_id}`);

          const pageToken = process.env.META_PAGE_ACCESS_TOKEN;
          if (!pageToken) {
            console.error('❌ Falta configurar META_PAGE_ACCESS_TOKEN en las variables de entorno.');
            continue;
          }

          let fieldData = [];
          let isTestLead = false;

          // Consultar los datos del lead a la Graph API de Meta
          const graphUrl = `https://graph.facebook.com/v21.0/${leadgen_id}?access_token=${encodeURIComponent(pageToken)}`;
          const metaRes = await fetch(graphUrl);

          if (!metaRes.ok) {
            const errText = await metaRes.text();
            console.warn(`⚠️ Aviso Graph API para lead ${leadgen_id} (posible evento de prueba):`, errText);
            // Si es un lead de prueba de Meta (ej: ID simulado 444444...), generamos datos de prueba para no descartarlo
            isTestLead = true;
            fieldData = [
              { name: 'full_name', values: ['Cliente de Prueba Meta'] },
              { name: 'email', values: ['prueba@meta-ads.com'] },
              { name: 'phone_number', values: ['+34 600 00 00 00'] }
            ];
          } else {
            const leadData = await metaRes.json();
            fieldData = leadData.field_data || [];
          }

          // Extraer nombre, teléfono y correo
          const name = getMetaField(fieldData, ['full_name', 'nombre_completo', 'nombre', 'name', 'first_name']) || (isTestLead ? 'Cliente de Prueba Meta' : 'Cliente Meta Ads');
          const email = getMetaField(fieldData, ['email', 'correo', 'correo_electrónico', 'correo_electronico']) || 'No especificado';
          const phone = getMetaField(fieldData, ['phone_number', 'telefono', 'teléfono', 'phone', 'numero_de_telefono', 'número_de_teléfono']) || 'No especificado';

          // Extraer preguntas personalizadas del formulario
          const extraQuestions = fieldData
            .filter(f => !['full_name', 'nombre_completo', 'nombre', 'name', 'first_name', 'email', 'correo', 'correo_electrónico', 'correo_electronico', 'phone_number', 'telefono', 'teléfono', 'phone', 'numero_de_telefono', 'número_de_teléfono'].includes((f.name || '').toLowerCase()))
            .map(f => `<tr><th>${f.name}:</th><td><strong>${(f.values || []).join(', ')}</strong></td></tr>`)
            .join('');

          // Guardar registro localmente
          const leadRecord = {
            id: Date.now(),
            date: new Date().toISOString(),
            name,
            phone,
            email,
            clientType: 'Lead Meta Ads',
            source: 'Meta Ads (Facebook / Instagram)',
            pageUrl: `Form ID: ${form_id || 'N/D'} | Ad ID: ${ad_id || 'N/D'}`,
            monthlyBill: '',
            notes: extraQuestions ? 'Contiene preguntas adicionales de formulario' : 'Cliente potencial directo de anuncio en Meta Ads',
            hasFile: false,
            fileName: null,
            fileSize: null
          };

          saveLeadLocally(leadRecord);

          // Enviar notificación por correo con Google Workspace
          await sendMetaLeadNotificationEmail(leadRecord, extraQuestions);
        }
      }
    }
  } catch (err) {
    console.error('❌ Error procesando evento de Webhook de Meta:', err);
  }
};

app.post('/webhook', handleMetaWebhookEvent);
app.post('/api/meta-webhook', handleMetaWebhookEvent);

// ==========================================
// API DE ADMINISTRACIÓN Y MÉTRICAS DE LEADS
// ==========================================

function checkAdminAuth(req) {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || adminKey.trim() === '') {
    console.error('❌ Error de seguridad: ADMIN_KEY no está definida en el archivo .env');
    return false;
  }
  const providedKey = req.query.key || req.headers['x-api-key'] || req.headers['authorization'];
  if (!providedKey) return false;
  return providedKey === adminKey || providedKey === `Bearer ${adminKey}`;
}

// Endpoint protegido para consultar resumen, métricas y lista de leads
app.get('/api/leads-summary', async (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ 
      error: 'Acceso no autorizado. Se requiere clave de administración válida.' 
    });
  }

  // Sincronización automática transparente con Meta Ads (si han pasado más de 30s desde el último chequeo)
  if (process.env.META_PAGE_ACCESS_TOKEN && (Date.now() - lastMetaSyncTime > 30 * 1000)) {
    try {
      await syncMetaLeadsSilently();
    } catch (syncErr) {
      console.warn('⚠️ Auto-sync silencioso con Meta Ads:', syncErr.message);
    }
  }

  try {
    const leads = await getAllLeads();

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime();

    let todayCount = 0;
    let weekCount = 0;
    let metaAdsCount = 0;

    const bySource = {};
    const byType = {};
    const byStatus = {
      'nuevo': 0,
      'contactado': 0,
      'en_estudio': 0,
      'ganado': 0,
      'descartado': 0
    };

    const formattedLeads = leads.map(l => {
      const leadDate = l.date ? new Date(l.date).getTime() : 0;
      if (leadDate >= startOfToday) todayCount++;
      if (leadDate >= startOfWeek) weekCount++;

      const src = l.source || 'Web Directa';
      bySource[src] = (bySource[src] || 0) + 1;

      if (src.toLowerCase().includes('meta') || src.toLowerCase().includes('facebook') || src.toLowerCase().includes('instagram')) {
        metaAdsCount++;
      }

      const type = l.clientType || 'particular';
      byType[type] = (byType[type] || 0) + 1;

      const status = l.status || 'nuevo';
      byStatus[status] = (byStatus[status] || 0) + 1;

      return {
        ...l,
        status
      };
    });

    // Ordenar siempre los leads por fecha descendente (los más recientes arriba del todo)
    formattedLeads.sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : (Number(a.id) || 0);
      const timeB = b.date ? new Date(b.date).getTime() : (Number(b.id) || 0);
      return timeB - timeA;
    });

    res.json({
      success: true,
      totalLeads: leads.length,
      todayLeads: todayCount,
      weekLeads: weekCount,
      metaAdsLeads: metaAdsCount,
      bySource,
      byType,
      byStatus,
      leads: formattedLeads,
      systemStatus: {
        databaseReady: isDbConnected(),
        smtpReady: isConfiguredSMTP(),
        smtpRecipient: RECIPIENT_EMAIL,
        metaReady: !!process.env.META_PAGE_ACCESS_TOKEN,
        metaError: lastMetaSyncError,
        metaVerifyToken: process.env.META_VERIFY_TOKEN ? 'Configurado en .env' : 'No configurado en .env'
      }
    });
  } catch (err) {
    console.error('Error obteniendo resumen de leads:', err);
    res.status(500).json({ error: 'Error leyendo leads' });
  }
});

// Endpoint para probar el envío de correo desde el panel de administración
app.post('/api/admin/test-email', async (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  if (!isConfiguredSMTP()) {
    return res.status(400).json({ error: 'SMTP no está configurado en las variables de entorno.' });
  }

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `"tuLuz Notificaciones" <${process.env.SMTP_USER || RECIPIENT_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      subject: '⚡ Prueba de Notificación de tuLuz',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #4CAF4F;">¡Prueba de Correo Exitosa!</h2>
          <p>Tu servidor en tu-luz.es está correctamente conectado a Google Workspace (Gmail SMTP).</p>
          <p>Los correos de nuevos clientes potenciales se enviarán a: <strong>${RECIPIENT_EMAIL}</strong>.</p>
        </div>
      `
    });

    res.json({ success: true, message: `Correo de prueba enviado correctamente a ${RECIPIENT_EMAIL}`, messageId: info.messageId });
  } catch (err) {
    console.error('Error probando envío SMTP:', err);
    res.status(500).json({ error: `Error enviando correo: ${err.message}` });
  }
});

// Endpoint para probar el token de Meta y devolver diagnóstico detallado
app.get('/api/admin/test-meta', async (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  const pageToken = process.env.META_PAGE_ACCESS_TOKEN;
  if (!pageToken) {
    return res.status(400).json({ error: 'META_PAGE_ACCESS_TOKEN no está configurado en .env' });
  }

  try {
    const meRes = await fetch(`https://graph.facebook.com/v21.0/me?access_token=${encodeURIComponent(pageToken)}`);
    const meData = await meRes.json();

    const accountsRes = await fetch(`https://graph.facebook.com/v21.0/me/accounts?access_token=${encodeURIComponent(pageToken)}`);
    const accountsData = await accountsRes.json();

    res.json({
      success: !meData.error,
      me: meData,
      accounts: accountsData,
      syncError: lastMetaSyncError
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint protegido para actualizar el estado comercial de un lead
app.post('/api/leads/update-status', async (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Acceso no autorizado.' });
  }

  const { leadId, status } = req.body;
  if (!leadId || !status) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos (leadId, status).' });
  }

  try {
    const success = await updateLeadStatus(leadId, status);
    if (!success) {
      return res.status(404).json({ error: 'Lead no encontrado' });
    }
    res.json({ success: true, lead: { id: leadId, status } });
  } catch (err) {
    console.error('Error actualizando lead:', err);
    res.status(500).json({ error: 'Error actualizando estado del lead' });
  }
});

// Endpoint protegido para eliminar un lead
app.post('/api/leads/delete', async (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Acceso no autorizado.' });
  }

  const { leadId } = req.body;
  if (!leadId) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos (leadId).' });
  }

  try {
    const success = await deleteLead(leadId);
    if (!success) {
      return res.status(404).json({ error: 'Lead no encontrado.' });
    }
    res.json({ success: true, message: 'Lead eliminado correctamente.' });
  } catch (err) {
    console.error('Error eliminando lead:', err);
    res.status(500).json({ error: 'Error eliminando lead' });
  }
});

let lastMetaSyncTime = 0;
let lastMetaSyncError = null;

// Función interna reutilizable para sincronizar leads de Meta Ads de forma automática o manual
async function syncMetaLeadsSilently() {
  const pageToken = process.env.META_PAGE_ACCESS_TOKEN;
  if (!pageToken || pageToken.trim() === '') {
    lastMetaSyncError = 'META_PAGE_ACCESS_TOKEN no configurado en variables de entorno';
    return { success: false, error: lastMetaSyncError };
  }

  try {
    let targetPageIds = [];

    // Si se especificó un Page ID directo en el entorno, lo usamos
    if (process.env.META_PAGE_ID) {
      targetPageIds.push(process.env.META_PAGE_ID);
    }

    // 1. Obtener la página o páginas asociadas a la cuenta
    const meRes = await fetch(`https://graph.facebook.com/v21.0/me?access_token=${encodeURIComponent(pageToken)}`);
    const meData = await meRes.json();
    
    if (meData.error) {
      lastMetaSyncError = `Error en token de Meta: ${meData.error.message}`;
      console.warn('⚠️ [Auto-Sync Meta Ads] Error Graph API /me:', meData.error.message);
    } else if (meData.id && !targetPageIds.includes(meData.id)) {
      targetPageIds.push(meData.id);
    }

    const accountsRes = await fetch(`https://graph.facebook.com/v21.0/me/accounts?access_token=${encodeURIComponent(pageToken)}`);
    if (accountsRes.ok) {
      const accountsData = await accountsRes.json();
      if (accountsData.data) {
        for (const acc of accountsData.data) {
          if (acc.id && !targetPageIds.includes(acc.id)) targetPageIds.push(acc.id);
        }
      }
    } else {
      const accErr = await accountsRes.json().catch(() => ({}));
      if (accErr.error) {
        lastMetaSyncError = `Error Meta /me/accounts: ${accErr.error.message}`;
      }
    }

    if (targetPageIds.length === 0) {
      const errMsg = lastMetaSyncError || 'No se pudo obtener el ID de la página de Meta Ads con el token actual.';
      console.warn('⚠️ [Auto-Sync Meta Ads]', errMsg);
      return { success: false, error: errMsg };
    }

    let existingLeads = await getAllLeads();

    let newlyImported = 0;

    for (const pageId of targetPageIds) {
      const formsRes = await fetch(`https://graph.facebook.com/v21.0/${pageId}/leadgen_forms?access_token=${encodeURIComponent(pageToken)}`);
      if (!formsRes.ok) {
        const fErr = await formsRes.json().catch(() => ({}));
        if (fErr.error) {
          lastMetaSyncError = `Error consultando formularios (Page ${pageId}): ${fErr.error.message}`;
          console.warn('⚠️ [Auto-Sync Meta Ads]', lastMetaSyncError);
        }
        continue;
      }
      const formsData = await formsRes.json();

      for (const form of (formsData.data || [])) {
        const leadsRes = await fetch(`https://graph.facebook.com/v21.0/${form.id}/leads?access_token=${encodeURIComponent(pageToken)}`);
        if (!leadsRes.ok) continue;
        const leadsData = await leadsRes.json();

        for (const metaLead of (leadsData.data || [])) {
          const fieldData = metaLead.field_data || [];
          const name = getMetaField(fieldData, ['full_name', 'nombre_completo', 'nombre', 'name', 'first_name']) || 'Cliente Meta Ads';
          const email = getMetaField(fieldData, ['email', 'correo', 'correo_electrónico', 'correo_electronico']) || '';
          const phone = getMetaField(fieldData, ['phone_number', 'phone', 'telefono', 'teléfono', 'numero_de_telefono', 'número_de_teléfono']) || '';

          const cleanPhone = phone.replace(/[^0-9]/g, '');

          // Evitar duplicados
          const exists = existingLeads.some(l => 
            String(l.metaLeadId) === String(metaLead.id) ||
            (cleanPhone && l.phone && l.phone.replace(/[^0-9]/g, '') === cleanPhone) ||
            (email && l.email && l.email.toLowerCase() === email.toLowerCase())
          );

          if (!exists) {
            const extraQuestions = fieldData
              .filter(f => !['full_name', 'nombre_completo', 'nombre', 'name', 'first_name', 'email', 'correo', 'correo_electrónico', 'correo_electronico', 'phone_number', 'phone', 'telefono', 'teléfono', 'numero_de_telefono', 'número_de_teléfono'].includes((f.name || '').toLowerCase()))
              .map(f => `${f.name}: ${(f.values || []).join(', ')}`)
              .join('\n');

            const newRecord = {
              id: Date.now() + Math.floor(Math.random() * 1000),
              metaLeadId: metaLead.id,
              date: metaLead.created_time || new Date().toISOString(),
              name,
              phone,
              email,
              clientType: 'Lead Meta Ads',
              source: 'Meta Ads (Facebook / Instagram)',
              pageUrl: `Formulario: ${form.name || form.id}`,
              monthlyBill: '',
              notes: extraQuestions ? `Preguntas del formulario:\n${extraQuestions}` : 'Cliente importado de Meta Ads',
              status: 'nuevo',
              hasFile: false,
              fileName: null,
              fileSize: null
            };

            await saveLead(newRecord);
            existingLeads.unshift(newRecord);
            newlyImported++;

            // Enviar correo de notificación SOLO si el lead es reciente (menos de 4 horas)
            // Esto evita que al reiniciar el contenedor o sincronizar se vuelvan a enviar correos de clientes antiguos
            const leadTimestamp = new Date(newRecord.date).getTime();
            const isRecent = !isNaN(leadTimestamp) && (Date.now() - leadTimestamp < 4 * 60 * 60 * 1000);

            if (isRecent) {
              await sendMetaLeadNotificationEmail(newRecord);
              newRecord.notified = true;
              await saveLead(newRecord); // Actualizar marca notified en DB
            } else {
              console.log(`ℹ️ [Auto-Sync Meta Ads] Lead histórico guardado sin reenviar correo: ${name} (${newRecord.date})`);
            }
          }
        }
      }
    }

    if (newlyImported > 0) {
      console.log(`🔄 [Auto-Sync Meta Ads] Sincronización automática: ${newlyImported} nuevos leads guardados en base de datos.`);
    }

    lastMetaSyncError = null; // Sin errores si completó el ciclo
    lastMetaSyncTime = Date.now();
    return { success: true, newlyImported };
  } catch (err) {
    lastMetaSyncError = `Error general de sincronización: ${err.message}`;
    console.error('⚠️ [Auto-Sync Meta Ads] Error sincronizando con Meta Graph API:', err.message);
    return { success: false, error: err.message };
  }
}

// Endpoint protegido para sincronizar leads históricos o pendientes desde Meta Ads (manual)
app.post('/api/leads/sync-meta', async (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Acceso no autorizado.' });
  }

  const result = await syncMetaLeadsSilently();
  if (!result.success) {
    return res.status(400).json({ error: result.error || 'Error al conectar con Meta Graph API' });
  }

  res.json({
    success: true,
    importedCount: result.newlyImported,
    message: result.newlyImported > 0 
      ? `Se han sincronizado ${result.newlyImported} clientes potenciales de Meta Ads.` 
      : 'Todos los clientes de Meta Ads ya están al día.'
  });
});

// Endpoint protegido para exportar los leads a un CSV compatible con Excel
app.get('/api/leads/export-csv', async (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).send('Acceso no autorizado.');
  }

  try {
    const leads = await getAllLeads();

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const header = ['ID', 'Fecha', 'Nombre', 'Teléfono', 'Email', 'Tipo de Cliente', 'Origen', 'Estado', 'Página / Formulario', 'Gasto Mensual', 'Notas'];
    const rows = leads.map(l => [
      escapeCsv(l.id),
      escapeCsv(l.date ? new Date(l.date).toLocaleString('es-ES') : ''),
      escapeCsv(l.name),
      escapeCsv(l.phone),
      escapeCsv(l.email),
      escapeCsv(l.clientType || 'Particular'),
      escapeCsv(l.source || 'Web Directa'),
      escapeCsv(l.status || 'nuevo'),
      escapeCsv(l.pageUrl || ''),
      escapeCsv(l.monthlyBill || ''),
      escapeCsv(l.notes || '')
    ].join(';'));

    // UTF-8 BOM (\uFEFF) para que Microsoft Excel abra las tildes y caracteres especiales perfectamente
    const csvContent = '\uFEFF' + [header.join(';'), ...rows].join('\r\n');

    const dateStr = new Date().toISOString().slice(0, 10);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="leads_tuluz_${dateStr}.csv"`);
    res.status(200).send(csvContent);
  } catch (err) {
    console.error('Error exportando CSV:', err);
    res.status(500).send('Error generando archivo CSV');
  }
});

// Servir archivos estáticos del frontend con caché óptima (1 año para assets inmutables, no-cache para index.html)
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    }
  }
}));

// Cualquier otra petición que no sea de la API sirve el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend activo en puerto ${PORT}`);
  console.log(`📬 Destinatario de leads: ${RECIPIENT_EMAIL}`);
  console.log(`🔑 Estado SMTP: ${isConfiguredSMTP() ? 'CONFIGURADO Y LISTO (' + process.env.SMTP_USER + ')' : '⚠️ NO CONFIGURADO (Faltan variables SMTP)'}`);
  console.log(`🎯 Meta Verify Token: ${process.env.META_VERIFY_TOKEN ? 'DEFINIDO EN .ENV' : '⚠️ FALTA META_VERIFY_TOKEN'}`);
  console.log(`🔑 Meta Page Token: ${process.env.META_PAGE_ACCESS_TOKEN ? 'DEFINIDO EN .ENV' : '⚠️ FALTA META_PAGE_ACCESS_TOKEN'}`);
  console.log(`🛡️ Clave Admin (/admin): ${process.env.ADMIN_KEY ? 'DEFINIDA EN .ENV' : '⚠️ FALTA ADMIN_KEY'}`);

  // Auto-sincronización periódica con Meta Ads en segundo plano cada 5 minutos
  setInterval(() => {
    if (process.env.META_PAGE_ACCESS_TOKEN) {
      syncMetaLeadsSilently().catch(err => console.error('Error en intervalo sync Meta:', err));
    }
  }, 5 * 60 * 1000);

  // Chequeo inicial 5 segundos después del arranque
  setTimeout(() => {
    if (process.env.META_PAGE_ACCESS_TOKEN) {
      syncMetaLeadsSilently().catch(err => console.error('Error en sync inicial Meta:', err));
    }
  }, 5000);
});

