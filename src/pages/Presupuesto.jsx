import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, UploadCloud, Sparkles, MessageCircle, Loader2 } from 'lucide-react';
import { companyInfo } from '../data/content';

export default function Presupuesto() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    clientType: 'particular',
    monthlyBill: '',
    notes: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

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

      let response;
      try {
        response = await fetch('/api/contact', {
          method: 'POST',
          body: data
        });
      } catch (backendErr) {
        response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          body: data
        });
      }

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitted(true);
      } else {
        const formSubmitData = new FormData();
        formSubmitData.append('Nombre', formData.name);
        formSubmitData.append('Teléfono', formData.phone);
        formSubmitData.append('Email', formData.email);
        formSubmitData.append('Tipo_de_Cliente', formData.clientType);
        if (formData.notes) formSubmitData.append('Notas', formData.notes);
        if (selectedFile) formSubmitData.append('Factura', selectedFile);

        await fetch(`https://formsubmit.co/ajax/${companyInfo.email}`, {
          method: 'POST',
          body: formSubmitData
        });

        setSubmitted(true);
      }
    } catch (err) {
      console.error('Error enviando presupuesto:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            <Sparkles size={16} />
            <span>Formulario de Solicitud Directa</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: '0.8rem' }}>
            Recibe asesoramiento energético con <span className="text-gradient">TúLuz en Andalucía</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxW: '720px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Nuestra asesoría energética 100% gratuita incluye un estudio detallado de tu factura. Rellena el formulario y nos pondremos en contacto contigo a la mayor brevedad.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1fr 1.2fr', gap: '3rem' }} className="contact-grid">
          
          {/* Info Box Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Main Info Card */}
            <div className="glass-card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                Información de Contacto
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sede Central</h5>
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.2rem' }}>{companyInfo.address}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Atención Telefónica</h5>
                    <a href={`tel:${companyInfo.phoneRaw}`} style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem', display: 'block' }}>
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Correo Electrónico</h5>
                    <a href={`mailto:${companyInfo.email}`} style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.2rem', display: 'block' }}>
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                <a 
                  href={companyInfo.socials.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ width: '100%', justifyContent: 'center', background: '#25D366', color: '#ffffff', fontWeight: 700 }}
                >
                  <MessageCircle size={20} />
                  <span>Consultar por WhatsApp Directo</span>
                </a>
              </div>

            </div>

            {/* Map Box */}
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <MapPin size={20} style={{ color: 'var(--accent-green)' }} />
                <h4 style={{ fontSize: '1.1rem' }}>Ubicación en Córdoba</h4>
              </div>
              
              <div style={{
                height: '180px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(0, 97, 0, 0.15) 0%, rgba(16, 185, 129, 0.25) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '1.5rem',
                border: '1px solid var(--border-glow)'
              }}>
                <div>
                  <MapPin size={36} className="animate-float" style={{ color: 'var(--primary)', margin: '0 auto 0.5rem auto' }} />
                  <span style={{ fontWeight: 700, display: 'block' }}>Córdoba - Poniente Sur</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Av. del Aeropuerto, 6</span>
                </div>
              </div>
            </div>

          </div>

          {/* Form Column */}
          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
            
            {!submitted ? (
              <div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                  Solicita tu <span className="text-gradient">Estudio Personalizado</span>
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
                  Tu solicitud será revisada directamente por nuestro equipo de asesores energéticos.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  
                  {/* Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      Perfil de Solicitante
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-main)', padding: '0.3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      {[
                        { id: 'particular', label: 'Particular' },
                        { id: 'empresa', label: 'Empresa / Pyme' },
                        { id: 'comunidad', label: 'Comunidad' }
                      ].map(t => (
                        <button
                          type="button"
                          key={t.id}
                          onClick={() => setFormData({ ...formData, clientType: t.id })}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            fontSize: '0.85rem',
                            fontWeight: formData.clientType === t.id ? 700 : 500,
                            borderRadius: 'var(--radius-sm)',
                            color: formData.clientType === t.id ? '#ffffff' : 'var(--text-muted)',
                            background: formData.clientType === t.id ? 'var(--primary)' : 'transparent'
                          }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      Nombre Completo *
                    </label>
                    <input 
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
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Phone & Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                        Teléfono Móvil *
                      </label>
                      <input 
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
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                        Tu Correo Electrónico *
                      </label>
                      <input 
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
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Optional File Attachment */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      Adjuntar Factura (Opcional - PDF/Foto)
                    </label>
                    
                    <div 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleFileDrop}
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        border: '1.5px dashed var(--border-glow)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.25rem',
                        textAlign: 'center',
                        background: 'var(--bg-main)',
                        cursor: 'pointer'
                      }}
                    >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept=".pdf,image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <UploadCloud size={24} style={{ color: 'var(--accent-green)', margin: '0 auto 0.3rem auto' }} />
                      <span style={{ fontSize: '0.88rem', display: 'block', color: selectedFile ? 'var(--accent-green)' : 'var(--text-muted)', fontWeight: selectedFile ? 700 : 400 }}>
                        {selectedFile ? `Factura adjunta: ${selectedFile.name}` : 'Haz clic o arrastra tu factura aquí'}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      Observaciones
                    </label>
                    <textarea 
                      rows="3"
                      placeholder="Escribe aquí cualquier aclaración o consulta."
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
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Consent */}
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <input type="checkbox" required style={{ marginTop: '2px', accentColor: 'var(--accent-green)' }} />
                    <span>Acepto la <a href="/politica-de-privacidad" style={{ textDecoration: 'underline', color: 'var(--accent-green)' }}>política de privacidad</a> para la tramitación de mi solicitud.</span>
                  </label>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Enviando solicitud...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Solicitud de Presupuesto</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>

                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle2 size={56} style={{ color: 'var(--accent-green)', margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--accent-green)' }}>
                  ¡Solicitud Enviada!
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Hemos recibido la solicitud y los archivos adjuntos. Te responderemos a la mayor brevedad posible.
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
          .contact-grid { grid-template-columns: 1fr 1.2fr !important; }
        }
      `}</style>
    </div>
  );
}
