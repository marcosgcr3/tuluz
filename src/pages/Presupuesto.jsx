import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, UploadCloud, Sparkles, MessageCircle, Loader2 } from 'lucide-react';
import { companyInfo } from '../data/content';

export default function Presupuesto({ navigate }) {
  const queryParams = new URLSearchParams(window.location.search);
  const paramType = queryParams.get('tipo') || queryParams.get('type');
  const validTypes = ['particular', 'empresa', 'comunidad', 'autoconsumo'];
  const defaultClientType = validTypes.includes(paramType) ? paramType : 'particular';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    clientType: defaultClientType,
    monthlyBill: '',
    notes: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const redirectToGracias = () => {
    if (navigate) {
      navigate('/gracias');
    } else {
      window.location.href = '/gracias';
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('clientType', formData.clientType);
      if (formData.notes) data.append('notes', formData.notes);

      if (selectedFile) {
        data.append('factura', selectedFile);
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: data
        });
        if (response.ok) {
          redirectToGracias();
          return;
        }
      } catch (errApi) {
        console.warn('API local /api/contact:', errApi);
      }

      try {
        const directResp = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          body: data
        });
        if (directResp.ok) {
          redirectToGracias();
          return;
        }
      } catch (directErr) {
        console.warn('Direct port 5000:', directErr);
      }

      redirectToGracias();
    } catch (err) {
      console.error('Error enviando presupuesto:', err);
      redirectToGracias();
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="section" style={{ paddingTop: 'clamp(2rem, 5vw, 3.5rem)' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge" style={{ marginBottom: '0.85rem' }}>
            <Sparkles size={16} />
            <span>Formulario de Solicitud Directa</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.85rem, 5vw, 3.2rem)', fontWeight: 800, marginBottom: '0.8rem', lineHeight: 1.2 }}>
            Recibe asesoramiento energético con <span className="text-gradient">tuLuz</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '720px', margin: '0 auto', fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)', lineHeight: 1.6 }}>
            Nuestra asesoría energética 100% gratuita incluye un estudio detallado de tus facturas de luz y/o gas. Rellena el formulario y nos pondremos en contacto contigo a la mayor brevedad.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="contact-grid">
          
          {/* Info Box Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Main Info Card */}
            <div className="glass-card" style={{ padding: 'clamp(1.25rem, 4vw, 2.25rem)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>
                Información de Contacto
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(76, 175, 79, 0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sede Central</h5>
                    <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.2rem' }}>{companyInfo.address}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(76, 175, 79, 0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Atención Telefónica</h5>
                    <a href={`tel:${companyInfo.phoneRaw}`} style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem', display: 'block' }}>
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(76, 175, 79, 0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Correo Electrónico</h5>
                    <a href={`mailto:${companyInfo.email}`} style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.2rem', display: 'block', wordBreak: 'break-all' }}>
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
                <a 
                  href={companyInfo.socials.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ width: '100%', justifyContent: 'center', background: '#25D366', color: '#ffffff', fontWeight: 700, padding: '0.8rem 1rem', fontSize: '0.92rem' }}
                >
                  <MessageCircle size={19} />
                  <span>Consultar por WhatsApp Directo</span>
                </a>
              </div>

            </div>

            {/* Map Box */}
            <div className="glass-card" style={{ padding: 'clamp(1rem, 3vw, 1.5rem)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <MapPin size={18} style={{ color: 'var(--primary)' }} />
                <h4 style={{ fontSize: '1.05rem' }}>Ubicación en Córdoba</h4>
              </div>
              
              <div style={{
                height: '160px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(76, 175, 79, 0.12) 0%, rgba(139, 195, 74, 0.2) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '1.25rem',
                border: '1px solid var(--border-glow)'
              }}>
                <div>
                  <MapPin size={32} className="animate-float" style={{ color: 'var(--primary)', margin: '0 auto 0.4rem auto' }} />
                  <span style={{ fontWeight: 700, display: 'block', fontSize: '0.95rem' }}>Córdoba - Poniente Sur</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Av. del Aeropuerto, 6</span>
                </div>
              </div>
            </div>

          </div>

          {/* Form Column */}
          <div className="glass-card" style={{ padding: 'clamp(1.25rem, 4vw, 2.25rem)', borderRadius: 'var(--radius-lg)' }}>
            
            {!submitted ? (
              <div>
                <h3 style={{ fontSize: 'clamp(1.35rem, 4vw, 1.6rem)', marginBottom: '0.4rem' }}>
                  Solicita tu <span className="text-gradient">Estudio Personalizado</span>
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Tu solicitud será revisada directamente por nuestro equipo de asesores energéticos.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  {/* Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      Perfil de Solicitante
                    </label>
                    <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-main)', padding: '0.3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      {[
                        { id: 'particular', label: 'Particular' },
                        { id: 'empresa', label: 'Empresa' },
                        { id: 'comunidad', label: 'Comunidad' },
                        { id: 'autoconsumo', label: 'Autoconsumo' }
                      ].map(t => (
                        <button
                          type="button"
                          key={t.id}
                          onClick={() => setFormData({ ...formData, clientType: t.id })}
                          style={{
                            flex: 1,
                            padding: '0.45rem 0.3rem',
                            fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)',
                            fontWeight: formData.clientType === t.id ? 700 : 500,
                            borderRadius: 'var(--radius-sm)',
                            color: formData.clientType === t.id ? '#ffffff' : 'var(--text-muted)',
                            background: formData.clientType === t.id ? 'var(--primary)' : 'transparent',
                            textAlign: 'center',
                            minHeight: '36px'
                          }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="presupuesto-name-input" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      Nombre Completo *
                    </label>
                    <input 
                      id="presupuesto-name-input"
                      name="name"
                      type="text" 
                      required
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)',
                        background: 'var(--bg-main)',
                        color: 'var(--text-main)',
                        outline: 'none',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  {/* Phone & Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }} className="presupuesto-form-row">
                    <div>
                      <label htmlFor="presupuesto-phone-input" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                        Teléfono Móvil *
                      </label>
                      <input 
                        id="presupuesto-phone-input"
                        name="phone"
                        type="tel" 
                        required
                        placeholder="Ej. 620 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-light)',
                          background: 'var(--bg-main)',
                          color: 'var(--text-main)',
                          outline: 'none',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="presupuesto-email-input" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                        Tu Correo Electrónico *
                      </label>
                      <input 
                        id="presupuesto-email-input"
                        name="email"
                        type="email" 
                        required
                        placeholder="tuemail@ejemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-light)',
                          background: 'var(--bg-main)',
                          color: 'var(--text-main)',
                          outline: 'none',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                  </div>

                  {/* Optional File Attachment */}
                  <div>
                    <label htmlFor="presupuesto-file-input" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem', cursor: 'pointer' }}>
                      Adjuntar Factura de Luz o Gas (Opcional - PDF/Foto)
                    </label>
                    
                    <div 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleFileDrop}
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        border: '1.5px dashed var(--border-glow)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem',
                        textAlign: 'center',
                        background: 'var(--bg-main)',
                        cursor: 'pointer'
                      }}
                    >
                      <input 
                        ref={fileInputRef}
                        id="presupuesto-file-input"
                        name="billFile"
                        aria-label="Adjuntar archivo de factura de luz o gas"
                        type="file" 
                        accept=".pdf,image/*" 
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <UploadCloud size={22} style={{ color: 'var(--primary)', margin: '0 auto 0.25rem auto' }} />
                      <span style={{ fontSize: '0.85rem', display: 'block', color: selectedFile ? 'var(--primary)' : 'var(--text-muted)', fontWeight: selectedFile ? 700 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {selectedFile ? `Factura adjunta: ${selectedFile.name}` : 'Toca o arrastra tu factura de luz o gas aquí'}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="presupuesto-notes-input" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      Observaciones <span style={{ fontWeight: 400, opacity: 0.7 }}>(Opcional)</span>
                    </label>
                    <textarea 
                      id="presupuesto-notes-input"
                      name="notes"
                      rows="3"
                      placeholder="Escribe aquí cualquier aclaración o consulta (opcional)."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)',
                        background: 'var(--bg-main)',
                        color: 'var(--text-main)',
                        outline: 'none',
                        fontSize: '16px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Enviando solicitud...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Solicitud de Presupuesto</span>
                        <Send size={17} />
                      </>
                    )}
                  </button>

                  {/* Implicit Consent Notice */}
                  <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>
                    Al enviar este formulario aceptas nuestra <a href="/politica-de-privacidad" style={{ textDecoration: 'underline', color: 'var(--primary)' }}>política de privacidad</a> para la tramitación del estudio.
                  </p>

                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <CheckCircle2 size={50} style={{ color: 'var(--primary)', margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                  ¡Solicitud Enviada con Éxito!
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '0.92rem' }}>
                  Hemos recibido tu solicitud y los archivos adjuntos. Un asesor de tuLuz te responderá a la mayor brevedad posible.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                  Enviar otra solicitud
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 1fr 1.2fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 540px) {
          .presupuesto-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
