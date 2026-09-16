import express from 'express';
import cors from 'cors';
import compression from 'compression';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
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
  deleteLead,
  getGuidesConfig,
  saveGuideConfig
  ,getAllProspects, importProspects, markProspectsEmailSent
} from './db.js';
import { guidesData } from './src/data/guidesData.js';
import { getOfficialSources } from './src/data/content.js';

// Inicializar conexión con PostgreSQL (con fallback automático a leads.json)
initDatabase();

const app = express();
const PORT = process.env.PORT || 3000;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'davidad@tu-luz.es';

// Middleware
// Compresión de texto Gzip/Deflate para acelerar transferencias en móvil
app.use(compression());
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
  next();
});
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

// Una sola URL por recurso: el sitemap y los canonicales usan rutas sin barra
// final. Esta redirección evita repartir señales entre /ruta y /ruta/.
app.use((req, res, next) => {
  if (
    (req.method === 'GET' || req.method === 'HEAD') &&
    req.path.length > 1 &&
    req.path.endsWith('/') &&
    !req.path.startsWith('/api/')
  ) {
    const target = req.originalUrl.replace(/\/+([?#]|$)/, '$1');
    return res.redirect(301, target);
  }
  next();
});

app.use(cors());
app.use(express.json({
  limit: '200kb',
  verify: (req, _res, buffer) => {
    if (req.path === '/webhook' || req.path === '/api/meta-webhook') {
      req.rawBody = Buffer.from(buffer);
    }
  }
}));
app.use(express.urlencoded({ extended: true }));

const UPLOAD_DIR = path.join(__dirname, 'data', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
const ALLOWED_BILL_TYPES = new Map([
  ['application/pdf', { extension: '.pdf', signature: Buffer.from('%PDF-') }],
  ['image/jpeg', { extension: '.jpg', signature: Buffer.from([0xff, 0xd8, 0xff]) }],
  ['image/png', { extension: '.png', signature: Buffer.from([0x89, 0x50, 0x4e, 0x47]) }],
  ['image/webp', { extension: '.webp', signature: Buffer.from('RIFF') }]
]);
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => cb(null, `invoice-${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`)
});
const upload = multer({ 
  storage,
  limits: { fileSize: 8 * 1024 * 1024, files: 1, fields: 12, parts: 14, fieldSize: 16 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, ALLOWED_BILL_TYPES.has(file.mimetype))
});
const csvUpload = multer({ memoryStorage: true, limits: { fileSize: 10 * 1024 * 1024, files: 1 } });

function parseCsv(text) {
  const rows = [], row = []; let value = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];
    if (c === '"' && quoted && next === '"') { value += '"'; i++; }
    else if (c === '"') quoted = !quoted;
    else if (c === ',' && !quoted) { row.push(value); value = ''; }
    else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && next === '\n') i++;
      row.push(value); value = '';
      if (row.some(cell => cell.trim())) rows.push(row.splice(0));
    } else value += c;
  }
  if (value || row.length) { row.push(value); if (row.some(cell => cell.trim())) rows.push(row); }
  if (!rows.length) return [];
  const headers = rows.shift().map(h => h.replace(/^\uFEFF/, '').trim().toLowerCase());
  return rows.map(values => Object.fromEntries(headers.map((h, i) => [h, values[i]?.trim() || ''])));
}

function csvValue(row, names) {
  const key = names.find(name => Object.prototype.hasOwnProperty.call(row, name));
  return key ? row[key] : '';
}

function extractEmails(value) {
  return [...new Set(String(value || '').match(/[\w.!#$%&'*+/=?^`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g) || [])]
    .map(email => email.trim().toLowerCase());
}

function normalizeProspectRow(row) {
  const sourceData = { ...row };
  return {
    companyName: csvValue(row, ['title', 'name', 'empresa', 'company', 'nombre']),
    sector: csvValue(row, ['category', 'sector', 'tipo', 'categoría', 'categoria']),
    email: csvValue(row, ['emails', 'email', 'correo', 'correo electrónico', 'correo electronico']),
    phone: csvValue(row, ['phone', 'telephone', 'teléfono', 'telefono']),
    address: csvValue(row, ['address', 'complete_address', 'dirección', 'direccion']),
    city: csvValue(row, ['city', 'ciudad']),
    website: csvValue(row, ['website', 'web', 'url']),
    sourceData
  };
}

function personalizedEmail({ companyName, sector, subject, body }) {
  const safeCompany = escapeHtml(companyName || 'tu empresa');
  const safeSector = escapeHtml(sector || 'vuestro sector');
  const rendered = String(body || '').replace(/\{empresa\}/gi, safeCompany).replace(/\{sector\}/gi, safeSector).replace(/\n/g, '<br>');
  return `<div style="font-family:Arial,sans-serif;color:#1e293b;line-height:1.6;max-width:640px"><p>${rendered}</p><p style="margin-top:24px"><strong>David Amer Duro</strong><br><strong>TúLuz, Soluciones Energéticas</strong><br><a href="tel:+34620061560" style="color:#166534">+34 620 06 15 60</a><br><a href="mailto:davidad@tu-luz.es" style="color:#166534">davidad@tu-luz.es</a></p><hr style="border:0;border-top:1px solid #e2e8f0"><p style="font-size:12px;color:#64748b">Si no deseas recibir más comunicaciones, responde a este correo indicando "BAJA".</p></div>`;
}

const contactAttempts = new Map();
function allowContactSubmission(req) {
  const key = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  for (const [ip, times] of contactAttempts) {
    const active = times.filter(time => now - time < windowMs);
    if (active.length) contactAttempts.set(ip, active);
    else contactAttempts.delete(ip);
  }
  const attempts = (contactAttempts.get(key) || []).filter(time => now - time < windowMs);
  if (attempts.length >= 5) return false;
  attempts.push(now);
  contactAttempts.set(key, attempts);
  return true;
}

function contactUpload(req, res, next) {
  if (!allowContactSubmission(req)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Inténtalo de nuevo más tarde.' });
  }
  upload.single('factura')(req, res, error => {
    if (!error) return next();
    const message = error instanceof multer.MulterError
      ? 'La solicitud o el archivo adjunto supera los límites permitidos.'
      : 'No se pudo procesar el archivo adjunto.';
    return res.status(400).json({ error: message });
  });
}

function isValidBillFile(file) {
  const expected = ALLOWED_BILL_TYPES.get(file.mimetype);
  if (!expected) return false;
  const content = fs.readFileSync(file.path);
  if (file.mimetype === 'image/webp') {
    return content.subarray(0, 4).equals(expected.signature) && content.subarray(8, 12).equals(Buffer.from('WEBP'));
  }
  return content.subarray(0, expected.signature.length).equals(expected.signature);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function safePhoneHref(phone) {
  return `tel:${encodeURIComponent(String(phone ?? '').replace(/[^\d+()\-\s]/g, ''))}`;
}

function safeMailtoHref(email, subject = '') {
  const address = encodeURIComponent(String(email ?? '').trim());
  return `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
}

function safeReplyTo(email) {
  const candidate = String(email ?? '').trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) ? candidate : RECIPIENT_EMAIL;
}

function safeHeaderText(value) {
  return String(value ?? '').replace(/[\r\n]/g, ' ');
}

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
      tls: { rejectUnauthorized: true }
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
app.post('/api/contact', contactUpload, async (req, res) => {
  let uploadedPath = req.file?.path;
  try {
    if (req.file && !isValidBillFile(req.file)) {
      return res.status(400).json({ error: 'La factura debe ser un PDF, JPEG, PNG o WebP válido.' });
    }
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
          const fileType = ALLOWED_BILL_TYPES.get(req.file.mimetype);
          attachments.push({
            filename: `factura${fileType.extension}`,
            path: req.file.path,
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
                <p>Asesoramiento Energético • Notificación a ${escapeHtml(RECIPIENT_EMAIL)}</p>
              </div>

              <div class="content">
                <div style="display: flex; gap: 8px; margin-bottom: 20px;">
                  <span class="badge">Perfil: ${escapeHtml(clientType || 'Particular')}</span>
                  <span class="source-badge">📍 Origen: ${escapeHtml(leadSource)}</span>
                </div>

                <h2 style="font-size: 18px; margin-top: 0; color: #0f172a;">Detalles de la Solicitud:</h2>
                
                <table class="info-table">
                  <tr>
                    <th>Canal / Origen:</th>
                    <td><strong style="color: #0284c7;">${escapeHtml(leadSource)}</strong></td>
                  </tr>
                  <tr>
                    <th>Nombre:</th>
                    <td><strong>${escapeHtml(name)}</strong></td>
                  </tr>
                  <tr>
                    <th>Teléfono:</th>
                    <td><a href="${safePhoneHref(phone)}" style="color: #4CAF4F; font-weight: 700; text-decoration: none;">${escapeHtml(phone)}</a></td>
                  </tr>
                  <tr>
                    <th>Correo del Cliente:</th>
                    <td><a href="${safeMailtoHref(email)}" style="color: #4CAF4F; text-decoration: none;">${escapeHtml(email)}</a></td>
                  </tr>
                  <tr>
                    <th>Tipo de Cliente:</th>
                    <td>${escapeHtml(clientType || 'Particular')}</td>
                  </tr>
                  ${monthlyBill ? `
                  <tr>
                    <th>Gasto Mensual Estimado:</th>
                    <td><strong style="color: #4CAF4F;">${escapeHtml(monthlyBill)} €/mes</strong></td>
                  </tr>
                  ` : ''}
                  <tr>
                    <th>Factura Adjunta:</th>
                    <td>${req.file ? `📎 factura${ALLOWED_BILL_TYPES.get(req.file.mimetype).extension} (${(req.file.size / 1024).toFixed(1)} KB)` : 'No se adjuntó archivo'}</td>
                  </tr>
                </table>

                ${notes ? `
                  <h3 style="font-size: 14px; color: #475569; margin-bottom: 8px;">Observaciones / Mensaje:</h3>
                  <div class="notes-box">${escapeHtml(notes)}</div>
                ` : ''}

                <div class="actions">
                  <a href="${safeMailtoHref(email, `Estudio Energético tuLuz para ${name || ''}`)}" class="btn btn-primary">Responder a ${escapeHtml(name)}</a>
                  <a href="${safePhoneHref(phone)}" class="btn btn-secondary">Llamar al ${escapeHtml(phone)}</a>
                </div>
              </div>

              <div class="footer">
                © ${new Date().getFullYear()} tuLuz Asesoramiento Energético • Notificación directa a (${escapeHtml(RECIPIENT_EMAIL)}).
              </div>
            </div>
          </body>
          </html>
        `;

        const mailOptions = {
          from: `"tuLuz Asesoramiento Energético" <${process.env.SMTP_USER || RECIPIENT_EMAIL}>`,
          to: RECIPIENT_EMAIL,
          replyTo: safeReplyTo(email),
          subject: `⚡ Nueva Solicitud tuLuz: ${safeHeaderText(name)} (${safeHeaderText(clientType || 'Particular')})`,
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
  } finally {
    if (uploadedPath) fs.promises.unlink(uploadedPath).catch(() => {});
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
async function sendMetaLeadNotificationEmail(leadRecord, extraQuestions = []) {
  if (!isConfiguredSMTP()) {
    console.warn(`⚠️ [Meta Ads] SMTP no configurado, no se envió email para ${leadRecord.name}`);
    return false;
  }

  const transporter = getTransporter();
  if (!transporter) return false;

  const { name, phone, email, notes, pageUrl } = leadRecord;
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
  const extraRows = extraQuestions.map(({ name: question, values }) =>
    `<tr><th>${escapeHtml(question)}:</th><td><strong>${escapeHtml((values || []).join(', '))}</strong></td></tr>`
  ).join('');

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
          <p>Campaña de Publicidad • Notificación a ${escapeHtml(RECIPIENT_EMAIL)}</p>
        </div>

        <div class="content">
          <div style="margin-bottom: 20px;">
            <span class="badge">📍 Origen: Meta Ads (Facebook / Instagram)</span>
          </div>

          <h2 style="font-size: 18px; margin-top: 0; color: #0f172a;">Datos del Contacto:</h2>
          
          <table class="info-table">
            <tr>
              <th>Nombre:</th>
              <td><strong style="font-size: 16px; color: #0f172a;">${escapeHtml(name || 'Cliente Meta')}</strong></td>
            </tr>
            <tr>
              <th>Teléfono:</th>
              <td><a href="${safePhoneHref(phone)}" style="color: #4CAF4F; font-weight: 700; font-size: 16px; text-decoration: none;">📞 ${escapeHtml(phone || 'No especificado')}</a></td>
            </tr>
            <tr>
              <th>Correo Electrónico:</th>
              <td><a href="${safeMailtoHref(email)}" style="color: #0284c7; text-decoration: none;">✉️ ${escapeHtml(email || 'No especificado')}</a></td>
            </tr>
            ${pageUrl ? `<tr><th>Origen / Formulario:</th><td style="color: #64748b; font-size: 13px;">${escapeHtml(pageUrl)}</td></tr>` : ''}
            ${notes ? `<tr><th>Detalles / Respuestas:</th><td style="font-size: 13px; white-space: pre-line;">${escapeHtml(notes)}</td></tr>` : ''}
            ${extraRows}
          </table>

          <div class="actions">
            ${cleanPhone ? `
              <a href="${safePhoneHref(cleanPhone)}" class="btn btn-call">📞 Llamar Ahora</a>
              <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola ${name || ''}, te contactamos de Tú Luz respecto a tu solicitud de estudio energético`)}" class="btn btn-wa" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
            ` : ''}
            ${email && email !== 'No especificado' ? `
              <a href="${safeMailtoHref(email, `Estudio Energético Tú Luz para ${name || ''}`)}" class="btn btn-mail">✉️ Enviar Email</a>
            ` : ''}
          </div>
        </div>

        <div class="footer">
          © ${new Date().getFullYear()} tuLuz Asesoramiento Energético • Notificación directa a (${escapeHtml(RECIPIENT_EMAIL)}).
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"tuLuz - Meta Ads" <${process.env.SMTP_USER || RECIPIENT_EMAIL}>`,
    to: RECIPIENT_EMAIL,
    replyTo: safeReplyTo(email !== 'No especificado' ? email : ''),
    subject: `🎯 Lead Meta Ads: ${safeHeaderText(name || 'Contacto')} (${safeHeaderText(phone || 'Sin teléfono')})`,
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

function hasValidMetaSignature(req) {
  const appSecret = process.env.META_APP_SECRET;
  const signature = req.get('x-hub-signature-256');
  if (!appSecret || !signature || !req.rawBody) return false;
  const expected = `sha256=${crypto.createHmac('sha256', appSecret).update(req.rawBody).digest('hex')}`;
  const received = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  return received.length === expectedBuffer.length && crypto.timingSafeEqual(received, expectedBuffer);
}

// POST /webhook (Recepción en tiempo real de nuevo Lead de Meta Ads)
const handleMetaWebhookEvent = async (req, res) => {
  try {
    if (!hasValidMetaSignature(req)) {
      return res.sendStatus(401);
    }
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
            .map(f => ({ name: String(f.name || ''), values: Array.isArray(f.values) ? f.values : [] }));

          // Guardar registro localmente
          const leadRecord = {
            id: Date.now(),
            metaLeadId: leadgen_id || null,
            date: new Date().toISOString(),
            name,
            phone,
            email,
            clientType: 'Lead Meta Ads',
            source: 'Meta Ads (Facebook / Instagram)',
            pageUrl: `Form ID: ${form_id || 'N/D'} | Ad ID: ${ad_id || 'N/D'}`,
            monthlyBill: '',
            notes: extraQuestions.length ? 'Contiene preguntas adicionales de formulario' : 'Cliente potencial directo de anuncio en Meta Ads',
            hasFile: false,
            fileName: null,
            fileSize: null
          };

          // Esperar a que quede persistido antes de intentar notificar.
          await saveLeadLocally(leadRecord);

          // Enviar notificación por correo con Google Workspace
          const notified = await sendMetaLeadNotificationEmail(leadRecord, extraQuestions);
          if (notified) {
            leadRecord.notified = true;
            await saveLeadLocally(leadRecord);
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

app.get('/api/admin/prospects', async (req, res) => {
  if (!checkAdminAuth(req)) return res.status(401).json({ error: 'Acceso no autorizado' });
  try {
    const prospects = await getAllProspects();
    res.json({ success: true, prospects, total: prospects.length });
  } catch (err) { res.status(500).json({ error: 'No se pudieron leer los posibles clientes' }); }
});

app.post('/api/admin/prospects/import', (req, res, next) => {
  if (!checkAdminAuth(req)) return res.status(401).json({ error: 'Acceso no autorizado' });
  csvUpload.single('file')(req, res, err => {
    if (err) return res.status(400).json({ error: 'El CSV supera el límite de 10 MB o no se pudo leer.' });
    next();
  });
}, async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Selecciona un archivo CSV.' });
  try {
    const rows = parseCsv(req.file.buffer.toString('utf8'));
    if (!rows.length) return res.status(400).json({ error: 'El CSV está vacío o no tiene cabecera.' });
    const normalizedRows = rows.map(normalizeProspectRow);
    const prospects = normalizedRows.flatMap(row => {
      const emails = extractEmails(row.email);
      return emails.map(email => ({ ...row, email }));
    });
    if (!prospects.length) return res.status(400).json({ error: 'No se encontraron emails válidos en la columna emails.' });
    const result = await importProspects(prospects);
    res.json({ success: true, imported: result.imported.length, skipped: result.skipped.length, prospects: result.imported });
  } catch (err) { console.error('Error importando prospects:', err); res.status(500).json({ error: 'No se pudo importar el CSV.' }); }
});

app.post('/api/admin/prospects/send', async (req, res) => {
  if (!checkAdminAuth(req)) return res.status(401).json({ error: 'Acceso no autorizado' });
  const ids = Array.isArray(req.body.ids) ? req.body.ids : [];
  const subject = safeHeaderText(req.body.subject || 'Asesoramiento energético gratuito para {empresa}').replace(/\{empresa\}/gi, 'tu empresa');
  const body = String(req.body.body || 'Hola,\n\nSoy David, fundador y responsable de tuLuz. Ayudamos a empresas del sector {sector} a optimizar sus costes energéticos.\n\nSi quieres, puedes responder a este correo adjuntando una factura de luz reciente. La analizaremos gratuitamente para indicarte si detectamos posibles ahorros.\n\nEl análisis es gratuito y sin compromiso.\n\nUn saludo,');
  if (!ids.length) return res.status(400).json({ error: 'Selecciona al menos un posible cliente.' });
  if (!isConfiguredSMTP()) return res.status(400).json({ error: 'SMTP no está configurado en las variables de entorno.' });
  try {
    const all = await getAllProspects();
    const selected = all.filter(p => ids.map(String).includes(String(p.id)) && !p.emailSent);
    const transporter = getTransporter(); let sent = [], failed = [];
    for (const prospect of selected) {
      try {
        await transporter.sendMail({ from: `"tuLuz" <${process.env.SMTP_USER || RECIPIENT_EMAIL}>`, to: prospect.email, subject: subject.replace(/\{sector\}/gi, prospect.sector || 'tu sector'), html: personalizedEmail({ ...prospect, subject, body }) });
        sent.push(prospect.id);
      } catch (err) { failed.push({ id: prospect.id, email: prospect.email, error: err.message }); }
    }
    if (sent.length) await markProspectsEmailSent(sent);
    res.json({ success: true, sent: sent.length, failed, skippedAlreadySent: ids.length - selected.length });
  } catch (err) { console.error('Error enviando campaña:', err); res.status(500).json({ error: 'No se pudo completar el envío.' }); }
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

// Endpoint protegido para añadir un lead manualmente desde el panel de administración
app.post('/api/leads/create', async (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Acceso no autorizado.' });
  }

  const { name, phone, email, clientType, source, status, notes, monthlyBill } = req.body;
  if (!name && !phone && !email) {
    return res.status(400).json({ error: 'Debes indicar al menos un nombre, teléfono o correo electrónico.' });
  }

  try {
    const leadRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      name: name ? String(name).trim() : 'Cliente WhatsApp / Manual',
      phone: phone ? String(phone).trim() : '',
      email: email ? String(email).trim() : '',
      clientType: clientType || 'particular',
      source: source || 'WhatsApp Directo',
      status: status || 'nuevo',
      pageUrl: 'Añadido manualmente desde Panel Admin',
      monthlyBill: monthlyBill ? String(monthlyBill).trim() : '',
      notes: notes ? String(notes).trim() : '',
      hasFile: false,
      fileName: null,
      fileSize: null
    };

    await saveLeadLocally(leadRecord);
    console.log(`👤 [Admin] Lead manual añadido: ${leadRecord.name} (${leadRecord.phone || leadRecord.email}) | Origen: ${leadRecord.source}`);
    res.json({ success: true, lead: leadRecord });
  } catch (err) {
    console.error('Error creando lead manual:', err);
    res.status(500).json({ error: 'Error guardando el lead en la base de datos.' });
  }
});

// ==========================================
// API DE GESTIÓN Y PUBLICACIÓN DE GUÍAS
// ==========================================

function isGuidePublished(guide, configs, now = Date.now()) {
  const config = configs[guide.slug] || {};
  const status = config.status || guide.status || 'borrador';
  if (status === 'publicada') return true;
  return status === 'programada' && config.publishAt && new Date(config.publishAt).getTime() <= now;
}

function publicGuideSummary(guide) {
  const { sections, faqs, ...summary } = guide;
  return summary;
}

app.get('/api/guides', async (_req, res) => {
  try {
    const configs = await getGuidesConfig();
    res.json({ success: true, guides: guidesData.filter(guide => isGuidePublished(guide, configs)).map(publicGuideSummary) });
  } catch (err) {
    res.status(500).json({ error: 'Error consultando guías' });
  }
});

app.get('/api/guides/:slug', async (req, res) => {
  try {
    const configs = await getGuidesConfig();
    const guide = guidesData.find(item => item.slug === req.params.slug);
    if (!guide || !isGuidePublished(guide, configs)) return res.sendStatus(404);
    const relatedGuides = (guide.relatedSlugs || [])
      .map(slug => guidesData.find(item => item.slug === slug))
      .filter(item => item && isGuidePublished(item, configs))
      .map(publicGuideSummary);
    res.json({ success: true, guide, relatedGuides });
  } catch (err) {
    res.status(500).json({ error: 'Error consultando guía' });
  }
});

// Endpoint público para consultar qué guías están publicadas / accesibles
app.get('/api/guides-status', async (req, res) => {
  try {
    const rawConfigs = await getGuidesConfig();
    const now = Date.now();

    const computedStatus = {};
    for (const guide of guidesData) {
      if (isGuidePublished(guide, rawConfigs, now)) {
        computedStatus[guide.slug] = { status: 'publicada', isPublished: true };
      }
    }

    res.json({ success: true, guides: computedStatus });
  } catch (err) {
    console.error('Error en /api/guides-status:', err);
    res.status(500).json({ error: 'Error consultando estado de guías' });
  }
});

// Endpoint protegido para obtener la configuración completa de guías en Admin
app.get('/api/admin/guides', async (req, res) => {
  if (!checkAdminAuth(req)) return res.status(401).json({ error: 'Acceso no autorizado' });
  res.json({ success: true, guides: guidesData.map(publicGuideSummary) });
});

app.get('/api/admin/guides-config', async (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  try {
    const configs = await getGuidesConfig();
    res.json({ success: true, configs });
  } catch (err) {
    console.error('Error en GET /api/admin/guides-config:', err);
    res.status(500).json({ error: 'Error cargando configuración de guías' });
  }
});

// Endpoint protegido para actualizar estado o fecha programada de una guía
app.post('/api/admin/guides-config', async (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  const { slug, status, publishAt } = req.body;
  if (!slug) {
    return res.status(400).json({ error: 'El parámetro slug es obligatorio' });
  }

  const validStatuses = ['publicada', 'borrador', 'programada'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: `Estado inválido. Valores permitidos: ${validStatuses.join(', ')}` });
  }

  try {
    const result = await saveGuideConfig(slug, {
      status: status || 'publicada',
      publishAt: publishAt || null
    });

    if (!result.success) {
      return res.status(500).json({ error: result.error || 'Error al guardar la guía' });
    }

    console.log(`📚 [Admin] Guía actualizada: "${slug}" -> ${status} ${publishAt ? `(Programada: ${publishAt})` : ''}`);

    // Regenerar archivos físicos sitemap.xml de forma asíncrona para redundancia total
    syncPhysicalSitemapFiles().catch(e => console.warn('Advertencia actualizando archivos sitemap.xml:', e.message));

    res.json({ success: true, guide: result.config });
  } catch (err) {
    console.error('Error en POST /api/admin/guides-config:', err);
    res.status(500).json({ error: 'Error actualizando configuración de guía' });
  }
});

// Endpoint protegido para auto-programar en lote todos los borradores (1 por día entre 9:00 y 12:00 de España)
app.post('/api/admin/guides/auto-schedule', async (req, res) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  try {
    const rawConfigs = await getGuidesConfig();
    const drafts = [];
    for (const g of guidesData) {
      const cfg = rawConfigs[g.slug];
      const status = cfg?.status || g.status || 'borrador';
      if (status !== 'publicada') {
        drafts.push(g);
      }
    }

    if (drafts.length === 0) {
      return res.json({ success: true, count: 0, message: 'No hay artículos en borrador pendientes de programar.' });
    }

    function getMadridIso(y, m, d, hh, mm, ss) {
      const pad = n => String(n).padStart(2, '0');
      const dObj = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Madrid', timeZoneName: 'shortOffset' }).formatToParts(dObj);
      const tz = parts.find(p => p.type === 'timeZoneName')?.value || 'GMT+2';
      const offset = parseInt(tz.replace('GMT', ''), 10) || 2;
      const offStr = (offset >= 0 ? '+' : '-') + pad(Math.abs(offset)) + ':00';
      const isoStr = `${y}-${pad(m)}-${pad(d)}T${pad(hh)}:${pad(minute)}:${pad(ss)}${offStr}`;
      return new Date(isoStr).toISOString();
    }

    // Buscar fechas consecutivas que caigan en Lunes (1) o Jueves (4)
    let curDate = new Date();
    curDate.setDate(curDate.getDate() + 1);

    const targetDates = [];
    while (targetDates.length < drafts.length) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek === 1 || dayOfWeek === 4) {
        targetDates.push(new Date(curDate.getTime()));
      }
      curDate.setDate(curDate.getDate() + 1);
    }

    for (let i = 0; i < drafts.length; i++) {
      const guide = drafts[i];
      const targetDate = targetDates[i];

      const year = targetDate.getFullYear();
      const month = targetDate.getMonth() + 1;
      const day = targetDate.getDate();

      const randomMinuteOfDay = 540 + Math.floor(Math.random() * 180); // 9:00 a 11:59
      const hour = Math.floor(randomMinuteOfDay / 60);
      const minute = randomMinuteOfDay % 60;
      const second = Math.floor(Math.random() * 60);

      const pad = n => String(n).padStart(2, '0');
      const dObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Madrid', timeZoneName: 'shortOffset' }).formatToParts(dObj);
      const tz = parts.find(p => p.type === 'timeZoneName')?.value || 'GMT+2';
      const offset = parseInt(tz.replace('GMT', ''), 10) || 2;
      const offStr = (offset >= 0 ? '+' : '-') + pad(Math.abs(offset)) + ':00';
      const isoUtc = new Date(`${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}${offStr}`).toISOString();

      await saveGuideConfig(guide.slug, {
        status: 'programada',
        publishAt: isoUtc
      });
    }

    syncPhysicalSitemapFiles().catch(e => console.warn('Advertencia sitemap sync:', e.message));

    console.log(`⚡ [Admin] Auto-programadas ${drafts.length} guías (2 por semana: Lunes y Jueves, 9:00 a 12:00 España)`);
    res.json({
      success: true,
      count: drafts.length,
      message: `Se han programado exitosamente ${drafts.length} guías para publicarse 2 veces por semana (lunes y jueves) entre las 9:00 y las 12:00 (hora española).`
    });
  } catch (err) {
    console.error('Error en POST /api/admin/guides/auto-schedule:', err);
    res.status(500).json({ error: 'Error durante la programación automática' });
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
    let syncHadErrors = false;

    // Meta pagina los formularios y los leads. Recorrer todas las páginas evita
    // que el panel se quede limitado a los primeros resultados.
    async function fetchAllGraphPages(url) {
      const all = [];
      let nextUrl = url;
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || payload.error) {
          throw new Error(payload.error?.message || `Graph API respondió ${response.status}`);
        }
        all.push(...(payload.data || []));
        nextUrl = payload.paging?.next || null;
      }
      return all;
    }

    let newlyImported = 0;

    for (const pageId of targetPageIds) {
      let forms = [];
      try {
        forms = await fetchAllGraphPages(`https://graph.facebook.com/v21.0/${pageId}/leadgen_forms?access_token=${encodeURIComponent(pageToken)}`);
      } catch (formErr) {
        syncHadErrors = true;
        lastMetaSyncError = `Error consultando formularios (Page ${pageId}): ${formErr.message}`;
        console.warn('⚠️ [Auto-Sync Meta Ads]', lastMetaSyncError);
        continue;
      }

      for (const form of forms) {
        let metaLeads = [];
        try {
          metaLeads = await fetchAllGraphPages(`https://graph.facebook.com/v21.0/${form.id}/leads?access_token=${encodeURIComponent(pageToken)}`);
        } catch (leadErr) {
          syncHadErrors = true;
          lastMetaSyncError = `Error leyendo leads del formulario ${form.name || form.id}: ${leadErr.message}`;
          console.warn('⚠️ [Auto-Sync Meta Ads]', lastMetaSyncError);
          continue;
        }

        for (const metaLead of metaLeads) {
          const fieldData = metaLead.field_data || [];
          const name = getMetaField(fieldData, ['full_name', 'nombre_completo', 'nombre', 'name', 'first_name']) || 'Cliente Meta Ads';
          const email = getMetaField(fieldData, ['email', 'correo', 'correo_electrónico', 'correo_electronico']) || '';
          const phone = getMetaField(fieldData, ['phone_number', 'phone', 'telefono', 'teléfono', 'numero_de_telefono', 'número_de_teléfono']) || '';

          const cleanPhone = phone.replace(/[^0-9]/g, '');

          // El ID de Meta es la identidad estable. El teléfono/email solo se usan
          // como compatibilidad para registros antiguos que no tenían metaLeadId.
          const existing = existingLeads.find(l =>
            (l.metaLeadId && String(l.metaLeadId) === String(metaLead.id)) ||
            (!l.metaLeadId && cleanPhone && l.phone && l.phone.replace(/[^0-9]/g, '') === cleanPhone) ||
            (!l.metaLeadId && email && l.email && l.email.toLowerCase() === email.toLowerCase())
          );

          if (!existing) {
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

            // Notificar todo lead nuevo, incluso si se recupera horas después.
            const sent = await sendMetaLeadNotificationEmail(newRecord);
            if (sent) {
              newRecord.notified = true;
              await saveLead(newRecord); // Actualizar marca notified en DB
            }
          } else if (!existing.notified) {
            // Recuperar avisos perdidos por un webhook caído o por un fallo SMTP.
            const sent = await sendMetaLeadNotificationEmail({ ...existing, metaLeadId: metaLead.id });
            if (sent) {
              existing.notified = true;
              await saveLead(existing);
              console.log(`✅ [Auto-Sync Meta Ads] Aviso pendiente reenviado: ${name}`);
            }
          }
        }
      }
    }

    if (newlyImported > 0) {
      console.log(`🔄 [Auto-Sync Meta Ads] Sincronización automática: ${newlyImported} nuevos leads guardados en base de datos.`);
    }

    if (!syncHadErrors) lastMetaSyncError = null;
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
      let str = String(val);
      if (/^[\s\u0000-\u001f]*[=+\-@]/.test(str)) str = `'${str}`;
      str = str.replace(/"/g, '""');
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

// ==========================================
// SITEMAP DINÁMICO SEO (/sitemap.xml)
// ==========================================

// Función centralizada para construir el contenido XML del sitemap
async function buildSitemapXml() {
  const rawConfigs = await getGuidesConfig();
  const now = Date.now();
  const today = new Date().toISOString().split('T')[0];

  // Páginas institucionales estáticas
  const staticPages = [
    { loc: 'https://tu-luz.es/', priority: '1.0', changefreq: 'weekly', lastmod: today },
    { loc: 'https://tu-luz.es/empresas', priority: '0.9', changefreq: 'monthly', lastmod: today },
    { loc: 'https://tu-luz.es/comunidades-de-vecinos', priority: '0.9', changefreq: 'monthly', lastmod: today },
    { loc: 'https://tu-luz.es/particulares', priority: '0.9', changefreq: 'monthly', lastmod: today },
    { loc: 'https://tu-luz.es/autoconsumo', priority: '0.9', changefreq: 'monthly', lastmod: today },
    { loc: 'https://tu-luz.es/guias', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { loc: 'https://tu-luz.es/solicita-un-presupuesto', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { loc: 'https://tu-luz.es/aviso-legal', priority: '0.3', changefreq: 'yearly', lastmod: '2026-09-10' },
    { loc: 'https://tu-luz.es/politica-de-privacidad', priority: '0.3', changefreq: 'yearly', lastmod: '2026-09-10' }
  ];

  // Filtrar guías que estén actualmente publicadas (en vivo o programadas cuya fecha ya llegó)
  const publishedGuideUrls = [];
  for (const guide of guidesData) {
    const cfg = rawConfigs[guide.slug];
    const status = cfg?.status || guide.status || 'borrador';
    const publishAt = cfg?.publishAt || null;

    let isPublished = status === 'publicada';
    if (status === 'programada' && publishAt) {
      const scheduleTime = new Date(publishAt).getTime();
      if (!isNaN(scheduleTime) && scheduleTime <= now) {
        isPublished = true;
      }
    }

    if (isPublished) {
      let lastmod = today;
      if (cfg?.updatedAt) {
        lastmod = new Date(cfg.updatedAt).toISOString().split('T')[0];
      } else if (guide.updatedAt) {
        lastmod = guide.updatedAt;
      }

      publishedGuideUrls.push({
        loc: `https://tu-luz.es/guias/${guide.slug}`,
        lastmod,
        changefreq: 'monthly',
        priority: '0.8'
      });
    }
  }

  const allUrls = [...staticPages, ...publishedGuideUrls];

  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    allUrls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n') +
    `\n</urlset>`;
}

// Sincronizar también archivos físicos en /public y /dist para despliegues estáticos o redundancia
async function syncPhysicalSitemapFiles() {
  try {
    const xml = await buildSitemapXml();
    const publicSitemap = path.join(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(publicSitemap, xml, 'utf-8');

    const distSitemap = path.join(__dirname, 'dist', 'sitemap.xml');
    if (fs.existsSync(path.dirname(distSitemap))) {
      fs.writeFileSync(distSitemap, xml, 'utf-8');
    }
  } catch (err) {
    console.warn('⚠️ [Sitemap Sync]', err.message);
  }
}

// Ruta dinámica para motores de búsqueda (siempre datos frescos sin reiniciar)
app.get('/sitemap.xml', async (req, res) => {
  try {
    const xml = await buildSitemapXml();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    // Cache de 30 minutos para no saturar CPU ante oleadas de bots, pero siempre fresco
    res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600');
    res.status(200).send(xml);
  } catch (err) {
    console.error('Error generando sitemap dinámico:', err);
    res.status(500).send('Error generando sitemap.xml');
  }
});

// Servir archivos estáticos del frontend con caché óptima (1 año para assets inmutables, no-cache para index.html)
app.use(express.static(path.join(__dirname, 'dist'), {
  // Las páginas HTML pasan por serveFrontend para recibir metadatos y JSON-LD
  // correctos desde la primera respuesta, antes de ejecutar JavaScript.
  index: false,
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    }
  }
}));

const STATIC_SEO_PAGES = {
  '/': {
    title: 'tuLuz | Asesoramiento Energético Gratuito en Luz y Gas',
    description: 'tuLuz representa claridad, ahorro y un futuro sostenible. Estudio 100% gratuito comparando más de 50 comercializadoras de electricidad y gas.',
    canonical: 'https://tu-luz.es/'
  },
  '/empresas': {
    title: 'Asesoramiento Energético en Luz y Gas para Empresas | tuLuz',
    description: 'Optimización de costes de electricidad y gas para empresas e industrias. Ajuste de potencia contratada y mejores tarifas con tuLuz.',
    canonical: 'https://tu-luz.es/empresas'
  },
  '/comunidades-de-vecinos': {
    title: 'Asesoramiento en Luz y Gas para Comunidades de Vecinos | tuLuz',
    description: 'Estudio gratuito para reducir el gasto de electricidad y gas en zonas comunes, garajes y calderas de comunidades.',
    canonical: 'https://tu-luz.es/comunidades-de-vecinos'
  },
  '/particulares': {
    title: 'Asesoramiento en Luz y Gas para Particulares y Hogares | tuLuz',
    description: 'Encuentra la mejor tarifa de luz y gas para tu vivienda. Revisión sin compromiso de facturas y asesoría solar con tuLuz.',
    canonical: 'https://tu-luz.es/particulares'
  },
  '/autoconsumo': {
    title: 'Autoconsumo Solar y Placas Solares Fotovoltaicas | tuLuz',
    description: 'Genera tu propia energía y reduce tu factura con un estudio de viabilidad solar, ayudas y batería virtual.',
    canonical: 'https://tu-luz.es/autoconsumo'
  },
  '/guias': {
    title: 'Guías de Ahorro y Eficiencia Energética | tuLuz Asesoramiento',
    description: 'Guías prácticas para ahorrar en luz y gas, elegir tarifas, optimizar potencia y entender el autoconsumo solar.',
    canonical: 'https://tu-luz.es/guias'
  },
  '/solicita-un-presupuesto': {
    title: 'Solicita tu Estudio Gratuito de Luz y Gas | tuLuz',
    description: 'Analizamos tus facturas de luz y gas sin coste ni compromiso para encontrar oportunidades reales de ahorro.',
    canonical: 'https://tu-luz.es/solicita-un-presupuesto'
  },
  '/aviso-legal': {
    title: 'Aviso Legal y Términos de Servicio | tuLuz',
    description: 'Información legal, propiedad intelectual y condiciones de uso de tuLuz Asesoramiento Energético.',
    canonical: 'https://tu-luz.es/aviso-legal'
  },
  '/politica-de-privacidad': {
    title: 'Política de Privacidad y Protección de Datos | tuLuz',
    description: 'Consulta cómo tratamos y protegemos tus datos personales en tuLuz Asesoramiento Energético.',
    canonical: 'https://tu-luz.es/politica-de-privacidad'
  }
};

function getSeoPage(pathname) {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  const guideSlug = cleanPath.startsWith('/guias/') ? cleanPath.slice('/guias/'.length) : null;
  const guide = guideSlug ? guidesData.find(item => item.slug === guideSlug) : null;

  if (guide) {
    return {
      title: guide.metaTitle || `${guide.title} | tuLuz`,
      description: guide.metaDescription || guide.excerpt,
      canonical: `https://tu-luz.es/guias/${guide.slug}`,
      guide
    };
  }

  return STATIC_SEO_PAGES[cleanPath] || STATIC_SEO_PAGES['/'];
}

function replaceMetaContent(html, attribute, value, content) {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${escapedValue}["'])[^>]*>`, 'i');
  return html.replace(pattern, tag => {
    const withoutContent = tag.replace(/\scontent=(['"])[\s\S]*?\1/i, '');
    const openingTag = withoutContent.replace(/\/?\s*>$/, '').trimEnd();
    return `${openingTag} content="${escapeHtml(content)}">`;
  });
}

function buildStructuredData(seo) {
  const organization = {
    '@type': 'ProfessionalService',
    '@id': 'https://tu-luz.es/#organization',
    name: 'tuLuz - Asesoramiento Energético',
    url: 'https://tu-luz.es/',
    logo: 'https://tu-luz.es/logo.png',
    telephone: '+34620061560',
    email: 'davidad@tu-luz.es',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. del Aeropuerto, 6, Poniente Sur',
      addressLocality: 'Córdoba',
      postalCode: '14004',
      addressRegion: 'Andalucía',
      addressCountry: 'ES'
    },
    areaServed: { '@type': 'Country', name: 'España' }
  };
  const page = {
    '@type': 'WebPage',
    '@id': `${seo.canonical}#webpage`,
    url: seo.canonical,
    name: seo.title,
    description: seo.description,
    about: { '@id': 'https://tu-luz.es/#organization' }
  };
  const graph = [organization, page];

  if (seo.guide) {
    const guide = seo.guide;
    graph.push({
      '@type': 'Article',
      '@id': `${seo.canonical}#article`,
      headline: guide.title,
      description: seo.description,
      mainEntityOfPage: { '@id': `${seo.canonical}#webpage` },
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
      author: {
        '@type': 'Organization',
        name: guide.author?.name || 'tuLuz',
        url: 'https://tu-luz.es/'
      },
      publisher: { '@id': 'https://tu-luz.es/#organization' },
      citation: getOfficialSources(guide.slug).map(source => source.url)
    });
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${seo.canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://tu-luz.es/' },
        { '@type': 'ListItem', position: 2, name: 'Guías', item: 'https://tu-luz.es/guias' },
        { '@type': 'ListItem', position: 3, name: guide.title, item: seo.canonical }
      ]
    });
    if (Array.isArray(guide.faqs) && guide.faqs.length) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${seo.canonical}#faq`,
        mainEntity: guide.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      });
    }
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

function buildNoScriptFallback(seo) {
  const heading = seo.guide?.title || seo.title.replace(/\s*\|\s*tuLuz.*$/i, '');
  const navigation = [
    ['/', 'Inicio'],
    ['/empresas', 'Empresas'],
    ['/particulares', 'Particulares'],
    ['/autoconsumo', 'Autoconsumo'],
    ['/guias', 'Guías de ahorro'],
    ['/solicita-un-presupuesto', 'Solicitar estudio gratuito']
  ].map(([href, label]) => `<a href="${href}">${label}</a>`).join(' · ');

  return `<noscript><main style="max-width:760px;margin:2rem auto;padding:0 1rem;font-family:Arial,sans-serif;line-height:1.6"><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(seo.description)}</p><nav aria-label="Navegación principal">${navigation}</nav></main></noscript>`;
}

function serveFrontend(req, res) {
  const seo = getSeoPage(req.path);
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  let html = fs.readFileSync(indexPath, 'utf-8');

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  html = replaceMetaContent(html, 'name', 'description', seo.description);
  html = replaceMetaContent(html, 'property', 'og:title', seo.title);
  html = replaceMetaContent(html, 'property', 'og:description', seo.description);
  html = replaceMetaContent(html, 'property', 'og:url', seo.canonical);
  html = replaceMetaContent(html, 'name', 'twitter:title', seo.title);
  html = replaceMetaContent(html, 'name', 'twitter:description', seo.description);
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${seo.canonical}">`);
  html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '');
  html = html.replace('</head>', `    <script type="application/ld+json">${buildStructuredData(seo)}</script>\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root"></div>${buildNoScriptFallback(seo)}`);

  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.type('html').send(html);
}

// Cualquier otra petición que no sea de la API recibe el HTML específico de
// su URL, con SEO y schema disponibles antes de que cargue React.
app.get('*', serveFrontend);

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

  // Sincronización inicial del sitemap físico al arrancar
  syncPhysicalSitemapFiles().catch(e => console.warn('Error en sync inicial sitemap:', e.message));
});

