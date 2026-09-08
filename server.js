import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'davidad@tu-luz.es';

// Middleware
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

// Persist leads locally to leads.json
const LEADS_FILE = path.join(__dirname, 'leads.json');

function saveLeadLocally(leadData) {
  try {
    let leads = [];
    if (fs.existsSync(LEADS_FILE)) {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      leads = JSON.parse(content || '[]');
    }
    leads.unshift(leadData);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    console.log(`💾 Solicitud guardada localmente en ${LEADS_FILE}`);
  } catch (err) {
    console.error('Error guardando lead local:', err);
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

// GET /webhook (Handshake de verificación con Meta)
const handleMetaWebhookVerification = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const expectedToken = process.env.META_VERIFY_TOKEN || 'tuluz_meta_secret_2026%!!';

  if (mode === 'subscribe' && token === expectedToken) {
    console.log('✅ Webhook de Meta Ads verificado con éxito por Meta.');
    return res.status(200).send(String(challenge));
  } else {
    console.warn(`⚠️ Intento fallido de verificación de Webhook de Meta. Token recibido: "${token}" vs Esperado: "${expectedToken}"`);
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

          // Consultar los datos del lead a la Graph API de Meta
          const graphUrl = `https://graph.facebook.com/v21.0/${leadgen_id}?access_token=${encodeURIComponent(pageToken)}`;
          const metaRes = await fetch(graphUrl);

          if (!metaRes.ok) {
            const errText = await metaRes.text();
            console.error(`❌ Error consultando Meta Graph API para lead ${leadgen_id}:`, errText);
            continue;
          }

          const leadData = await metaRes.json();
          const fieldData = leadData.field_data || [];

          // Extraer nombre, teléfono y correo
          const name = getMetaField(fieldData, ['full_name', 'nombre_completo', 'nombre', 'name', 'first_name']) || 'Cliente Meta Ads';
          const email = getMetaField(fieldData, ['email', 'correo', 'correo_electrónico', 'correo_electronico']) || 'No especificado';
          const phone = getMetaField(fieldData, ['phone_number', 'telefono', 'teléfono', 'phone', 'numero_de_telefono', 'número_de_teléfono']) || 'No especificado';

          // Extraer preguntas personalizadas del formulario
          const extraQuestions = fieldData
            .filter(f => !['full_name', 'nombre_completo', 'nombre', 'name', 'first_name', 'email', 'correo', 'correo_electrónico', 'correo_electronico', 'phone_number', 'telefono', 'teléfono', 'phone', 'numero_de_telefono', 'número_de_teléfono'].includes((f.name || '').toLowerCase()))
            .map(f => `<tr><th>${f.name}:</th><td><strong>${(f.values || []).join(', ')}</strong></td></tr>`)
            .join('');

          // Formatear teléfono limpio para enlaces de WhatsApp
          const cleanPhone = phone.replace(/[^0-9]/g, '');

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
          if (isConfiguredSMTP()) {
            const transporter = getTransporter();
            if (transporter) {
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
                          <td><strong style="font-size: 16px; color: #0f172a;">${name}</strong></td>
                        </tr>
                        <tr>
                          <th>Teléfono:</th>
                          <td><a href="tel:${phone}" style="color: #4CAF4F; font-weight: 700; font-size: 16px; text-decoration: none;">📞 ${phone}</a></td>
                        </tr>
                        <tr>
                          <th>Correo Electrónico:</th>
                          <td><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">✉️ ${email}</a></td>
                        </tr>
                        <tr>
                          <th>ID Formulario:</th>
                          <td style="color: #64748b; font-size: 12px;">${form_id || 'N/D'}</td>
                        </tr>
                        ${extraQuestions}
                      </table>

                      <div class="actions">
                        ${phone && phone !== 'No especificado' ? `
                          <a href="tel:${phone}" class="btn btn-call">📞 Llamar Ahora</a>
                          <a href="https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(name)},%20te%20contactamos%20de%20T%C3%BA%20Luz%20respecto%20a%20tu%20solicitud%20de%20estudio%20energ%C3%A9tico" class="btn btn-wa" target="_blank">💬 WhatsApp</a>
                        ` : ''}
                        ${email && email !== 'No especificado' ? `
                          <a href="mailto:${email}?subject=Estudio%20Energ%C3%A9tico%20T%C3%BA%20Luz%20para%20${encodeURIComponent(name)}" class="btn btn-mail">✉️ Enviar Email</a>
                        ` : ''}
                      </div>
                    </div>

                    <div class="footer">
                      © ${new Date().getFullYear()} TúLuz Asesoramiento Energético • Webhook Meta Ads activo.
                    </div>
                  </div>
                </body>
                </html>
              `;

              const mailOptions = {
                from: `"TúLuz - Meta Ads" <${process.env.SMTP_USER || RECIPIENT_EMAIL}>`,
                to: RECIPIENT_EMAIL,
                replyTo: email !== 'No especificado' ? email : RECIPIENT_EMAIL,
                subject: `🎯 Lead Meta Ads: ${name} (${phone})`,
                html: htmlTemplate
              };

              try {
                const info = await transporter.sendMail(mailOptions);
                console.log(`✅ [Meta Ads] Correo de lead enviado con éxito a ${RECIPIENT_EMAIL}. MessageId: ${info.messageId}`);
              } catch (mailErr) {
                console.error('⚠️ [Meta Ads] Error enviando correo SMTP:', mailErr.message);
              }
            }
          }
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
  const adminKey = process.env.ADMIN_KEY || 'tuluz2026';
  const providedKey = req.query.key || req.headers['x-api-key'] || req.headers['authorization'];
  if (!providedKey) return false;
  return providedKey === adminKey || providedKey === `Bearer ${adminKey}`;
}

// Endpoint protegido para consultar resumen, métricas y lista de leads
app.get('/api/leads-summary', (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ 
      error: 'Acceso no autorizado. Se requiere clave de administración válida.' 
    });
  }

  try {
    let leads = [];
    if (fs.existsSync(LEADS_FILE)) {
      leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8') || '[]');
    }

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
        smtpReady: isConfiguredSMTP(),
        metaReady: !!process.env.META_PAGE_ACCESS_TOKEN,
        metaVerifyToken: process.env.META_VERIFY_TOKEN ? 'Configurado' : 'Por defecto'
      }
    });
  } catch (err) {
    console.error('Error obteniendo resumen de leads:', err);
    res.status(500).json({ error: 'Error leyendo leads' });
  }
});

// Endpoint protegido para actualizar el estado comercial de un lead
app.post('/api/leads/update-status', (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Acceso no autorizado.' });
  }

  const { leadId, status } = req.body;
  if (!leadId || !status) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos (leadId, status).' });
  }

  try {
    let leads = [];
    if (fs.existsSync(LEADS_FILE)) {
      leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8') || '[]');
    }

    const index = leads.findIndex(l => String(l.id) === String(leadId));
    if (index === -1) {
      return res.status(404).json({ error: 'Lead no encontrado' });
    }

    leads[index].status = status;
    leads[index].updatedAt = new Date().toISOString();

    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    res.json({ success: true, lead: leads[index] });
  } catch (err) {
    console.error('Error actualizando lead:', err);
    res.status(500).json({ error: 'Error actualizando estado del lead' });
  }
});

// Endpoint protegido para exportar los leads a un CSV compatible con Excel
app.get('/api/leads/export-csv', (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).send('Acceso no autorizado.');
  }

  try {
    let leads = [];
    if (fs.existsSync(LEADS_FILE)) {
      leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8') || '[]');
    }

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
  console.log(`🔑 Estado SMTP: ${isConfiguredSMTP() ? 'CONFIGURADO Y LISTO (' + process.env.SMTP_USER + ')' : '⚠️ NO CONFIGURADO (Faltan variables)'}`);
  console.log(`🎯 Meta Ads Webhook listo en: /webhook y /api/meta-webhook`);
});

