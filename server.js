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
    const { name, phone, email, clientType, monthlyBill, notes } = req.body;

    console.log(`📩 Recibida nueva solicitud de ${name} (${email}, Tel: ${phone})`);

    const leadRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      name: name || '',
      phone: phone || '',
      email: email || '',
      clientType: clientType || 'particular',
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
                <span class="badge">Perfil: ${clientType || 'Particular'}</span>

                <h2 style="font-size: 18px; margin-top: 0; color: #0f172a;">Detalles de la Solicitud:</h2>
                
                <table class="info-table">
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

// Servir archivos estáticos del frontend (Vite)
app.use(express.static(path.join(__dirname, 'dist')));

// Cualquier otra petición que no sea de la API sirve el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend Google Workspace activo en http://localhost:${PORT}`);
  console.log(`📬 Los formularios se envían a: ${RECIPIENT_EMAIL}`);
});

