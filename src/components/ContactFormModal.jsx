import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Phone, Mail, CheckCircle2, Sparkles, Loader2, UploadCloud } from 'lucide-react';
import { companyInfo } from '../data/content';

export default function ContactFormModal({ isOpen, onClose, initialData = {}, navigate }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    clientType: initialData.clientType || 'particular',
    monthlyBill: initialData.monthlyBill || '',
    notes: initialData.uploadedFile ? `Factura pre-analizada: ${initialData.uploadedFile}` : ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const redirectToGracias = () => {
    onClose();
    if (navigate) {
      navigate('/gracias');
    } else {
      window.location.href = '/gracias';
    }
  };

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        clientType: initialData.clientType || 'particular',
        monthlyBill: initialData.monthlyBill !== undefined ? initialData.monthlyBill : prev.monthlyBill,
        notes: initialData.notes || (initialData.uploadedFile ? `Factura pre-analizada: ${initialData.uploadedFile}` : (prev.notes || ''))
      }));
      setSubmitted(false);
      setSelectedFile(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const getTrafficSource = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get('utm_source') || params.get('src') || params.get('source');
      const utmCampaign = params.get('utm_campaign') || params.get('campaign');
      const path = window.location.pathname.toLowerCase();

      if (utmSource) return `${utmSource}${utmCampaign ? ' (' + utmCampaign + ')' : ''}`;
      if (params.get('gclid')) return 'Google Ads (gclid)';
      if (params.get('fbclid')) return 'Meta Ads (fbclid)';
      if (params.get('ttclid')) return 'TikTok Ads (ttclid)';
      if (path.includes('tiktok')) return 'TikTok Ads';
      if (path.includes('meta')) return 'Meta Ads';
      if (path.includes('instagram')) return 'Instagram Ads';
      if (path.includes('facebook')) return 'Facebook Ads';
      if (path.includes('google')) return 'Google Ads';
      if (document.referrer) {
        if (document.referrer.includes('tiktok.com')) return 'TikTok';
        if (document.referrer.includes('instagram.com')) return 'Instagram';
        if (document.referrer.includes('facebook.com')) return 'Facebook';
        if (document.referrer.includes('google.')) return 'Google';
      }
      return 'Modal Web (Directo/Orgánico)';
    } catch {
      return 'Modal Web';
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
      data.append('source', getTrafficSource());
      data.append('pageUrl', window.location.href);
      if (formData.monthlyBill) data.append('monthlyBill', formData.monthlyBill);
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

      // Direct port fallback
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
      console.error('Error enviando formulario:', err);
      redirectToGracias();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-card modal-content-box" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '620px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(1.25rem, 4vw, 2.25rem)',
          position: 'relative',
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Cerrar modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--bg-main)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="badge" style={{ marginBottom: '0.75rem' }}>
              <Sparkles size={14} />
              <span>Estudio Energético Gratuito</span>
            </div>

            <h3 style={{ fontSize: 'clamp(1.35rem, 4.5vw, 1.75rem)', marginBottom: '0.4rem', paddingRight: '2rem' }}>
              Solicita tu <span className="text-gradient">Estudio de Ahorro</span>
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Déjanos tus datos y un asesor especializado de <strong>tuLuz</strong> se pondrá en contacto contigo sin ningún compromiso.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Client Type Toggle */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Tipo de Cliente
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

              {/* Name Input */}
              <div>
                <label htmlFor="modal-name-input" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Nombre y Apellidos *
                </label>
                <input 
                  id="modal-name-input"
                  name="name"
                  type="text" 
                  required
                  placeholder="Ej. Juan Pérez"
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

              {/* Phone & Email Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }} className="modal-form-row">
                <div>
                  <label htmlFor="modal-phone-input" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Teléfono Móvil *
                  </label>
                  <input 
                    id="modal-phone-input"
                    name="phone"
                    type="tel" 
                    required
                    placeholder="600 000 000"
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
                  <label htmlFor="modal-email-input" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Correo Electrónico *
                  </label>
                  <input 
                    id="modal-email-input"
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

              {/* File Attachment */}
              <div>
                <label htmlFor="modal-file-input" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem', cursor: 'pointer' }}>
                  Adjuntar Factura de Luz o Gas (Opcional - PDF/Foto)
                </label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '1.5px dashed var(--border-glow)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    textAlign: 'center',
                    background: 'var(--bg-main)',
                    cursor: 'pointer'
                  }}
                >
                  <input 
                    ref={fileInputRef}
                    id="modal-file-input"
                    name="billFile"
                    aria-label="Adjuntar archivo de factura de luz o gas"
                    type="file" 
                    accept=".pdf,image/*" 
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem', color: selectedFile ? 'var(--primary)' : 'var(--text-muted)' }}>
                    <UploadCloud size={18} />
                    <span style={{ fontWeight: selectedFile ? 700 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {selectedFile ? `Factura adjunta: ${selectedFile.name}` : 'Toca aquí para adjuntar factura de luz o gas'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="modal-notes-input" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Observaciones / Comentarios <span style={{ fontWeight: 400, opacity: 0.7 }}>(Opcional)</span>
                </label>
                <textarea 
                  id="modal-notes-input"
                  name="notes"
                  rows="2"
                  placeholder="Detalles sobre tu consumo actual, horarios o dudas (opcional)."
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
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.4rem', padding: '0.85rem' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Enviando solicitud...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Solicitud Gratuita</span>
                    <Send size={16} />
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
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(76, 175, 79, 0.15)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
              ¡Solicitud Enviada con Éxito!
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem', maxWidth: '450px', margin: '0 auto 1.5rem auto', lineHeight: 1.5 }}>
              Gracias, <strong>{formData.name}</strong>. Hemos recibido tu solicitud. Nuestro equipo de asesores revisará tu información y se pondrá en contacto contigo a la mayor brevedad posible.
            </p>

            <div style={{ background: 'var(--bg-main)', padding: '0.9rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'inline-flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.86rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <Phone size={15} style={{ color: 'var(--primary)' }} /> Atención directa: {companyInfo.phone}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <Mail size={15} style={{ color: 'var(--primary)' }} /> {companyInfo.email}
              </span>
            </div>

            <button 
              onClick={onClose}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Cerrar ventana
            </button>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 540px) {
          .modal-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
