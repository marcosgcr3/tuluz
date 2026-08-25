import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'david@tu-luz.es';

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

// Configure Nodemailer Transport for Google Workspace / Custom SMTP
async function getTransporter() {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== 'false', // Default true for Google Workspace port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS.replace(/\s+/g, '') // Strip spaces from App Password
      },
      tls: {
        rejectUnauthorized: false // Prevent self-signed cert chain issues on local Windows networks
      }
    });
  }

  // Fallback to test account if SMTP_PASS is empty
  const testAccount = await nodemailer.createTestAccount();
  console.log('💡 Cuenta SMTP de prueba activa mientras configuras tu contraseña de aplicación de Google Workspace.');
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
}

// API Endpoint for Contact & Quote Requests
app.post('/api/contact', upload.single('factura'), async (req, res) => {
  try {
    const { name, phone, email, clientType, monthlyBill, notes } = req.body;

    console.log(`📩 Recibida nueva solicitud de ${name} (${email}) -> Remitiendo a ${RECIPIENT_EMAIL}`);

    const transporter = await getTransporter();

    // File Attachments
    const attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype
      });
    }

    // Corporate HTML Email Template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f5; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #006100 0%, #10B981 100%); color: #ffffff; padding: 30px 25px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 5px 0 0 0; opacity: 0.9; font-size: 14px; }
          .content { padding: 30px 25px; }
          .badge { display: inline-block; background: #fef3c7; color: #d97706; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 20px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
          .info-table th, .info-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .info-table th { background-color: #f8faf9; color: #475569; font-weight: 600; width: 35%; }
          .info-table td { color: #0f172a; font-weight: 500; }
          .notes-box { background-color: #f8faf9; border-left: 4px solid #10B981; padding: 15px; border-radius: 4px; font-size: 14px; color: #334155; margin-bottom: 25px; }
          .actions { text-align: center; padding: 20px 0; border-top: 1px solid #f1f5f9; }
          .btn { display: inline-block; padding: 12px 24px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 0 5px; }
          .btn-primary { background-color: #006100; color: #ffffff; }
          .btn-secondary { background-color: #f1f5f9; color: #0f172a; }
          .footer { background-color: #f8faf9; text-align: center; padding: 15px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💡 TúLuz - Nueva Solicitud</h1>
            <p>Notificación enviada a Google Workspace (${RECIPIENT_EMAIL})</p>
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
                <td><a href="tel:${phone}" style="color: #006100; font-weight: 700; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <th>Correo del Cliente:</th>
                <td><a href="mailto:${email}" style="color: #006100; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <th>Tipo de Cliente:</th>
                <td>${clientType || 'Particular'}</td>
              </tr>
              ${monthlyBill ? `
              <tr>
                <th>Gasto Mensual Estimado:</th>
                <td><strong style="color: #10B981;">${monthlyBill} €/mes</strong></td>
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
              <a href="mailto:${email}?subject=Estudio%20Energético%20TúLuz%20para%20${encodeURIComponent(name)}" class="btn btn-primary">Responder a ${name}</a>
              <a href="tel:${phone}" class="btn btn-secondary">Llamar al ${phone}</a>
            </div>
          </div>

          <div class="footer">
            © ${new Date().getFullYear()} TúLuz Asesoría Energética • Notificación directa a Google Workspace (${RECIPIENT_EMAIL}).
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Formulario Web TúLuz" <${process.env.SMTP_USER || RECIPIENT_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `⚡ Nueva Solicitud de Estudio: ${name} (${clientType || 'Particular'})`,
      html: htmlTemplate,
      attachments: attachments
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ Correo entregado en Google Workspace (${RECIPIENT_EMAIL}). MessageId: ${info.messageId}`);
    
    return res.status(200).json({
      success: true,
      message: `Solicitud enviada a Google Workspace (${RECIPIENT_EMAIL})`
    });

  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    return res.status(500).json({
      success: false,
      message: 'Ocurrió un error en el servidor de correo.',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend Google Workspace activo en http://localhost:${PORT}`);
  console.log(`📬 Los formularios se envían a: ${RECIPIENT_EMAIL}`);
});
