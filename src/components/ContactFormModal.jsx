import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Phone, Mail, CheckCircle2, Sparkles, Loader2, UploadCloud } from 'lucide-react';
import { companyInfo } from '../data/content';

export default function ContactFormModal({ isOpen, onClose, initialData = {} }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('clientType', formData.clientType);
      if (formData.monthlyBill) data.append('monthlyBill', formData.monthlyBill);
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
        // Fallback submission
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
      console.error('Error enviando formulario:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '650px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          position: 'relative',
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg-main)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)'
          }}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="badge" style={{ marginBottom: '0.8rem' }}>
              <Sparkles size={14} />
              <span>Estudio Energético Gratuito</span>
            </div>

            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              Solicita tu <span className="text-gradient">Estudio de Ahorro</span>
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
              Déjanos tus datos y un asesor especializado se pondrá en contacto contigo sin ningún compromiso.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              
              {/* Client Type Toggle */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Tipo de Cliente
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
                        padding: '0.45rem',
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

              {/* Name Input */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Nombre y Apellidos *
                </label>
                <input 
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
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              {/* Phone & Email Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Teléfono Móvil *
                  </label>
                  <input 
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
                      fontSize: '0.95rem'
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
                      outline: 'none',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              </div>

              {/* File Attachment */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Adjuntar Factura (Opcional - PDF/Foto)
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
                    type="file" 
                    accept=".pdf,image/*" 
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem', color: selectedFile ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                    <UploadCloud size={18} />
                    <span style={{ fontWeight: selectedFile ? 700 : 400 }}>
                      {selectedFile ? `Factura adjunta: ${selectedFile.name}` : 'Haz clic para adjuntar tu factura'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Observaciones / Comentarios
                </label>
                <textarea 
                  rows="3"
                  placeholder="Detalles sobre tu consumo actual o intereses."
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
                    fontSize: '0.95rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Consent checkbox */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <input type="checkbox" required style={{ marginTop: '2px', accentColor: 'var(--accent-green)' }} />
                <span>Acepto la <a href="/politica-de-privacidad" style={{ textDecoration: 'underline', color: 'var(--accent-green)' }}>política de privacidad</a> para tramitar la solicitud de estudio.</span>
              </label>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
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

            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={40} />
            </div>

            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.6rem', color: 'var(--accent-green)' }}>
              ¡Solicitud Enviada con Éxito!
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem', maxWidth: '480px', margin: '0 auto 1.75rem auto' }}>
              Gracias, <strong>{formData.name}</strong>. Hemos recibido tu solicitud. Nuestro equipo de asesores revisará tu información y se pondrá en contacto contigo en la mayor brevedad posible.
            </p>

            <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'inline-flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.88rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <Phone size={16} style={{ color: 'var(--accent-green)' }} /> Atención directa: {companyInfo.phone}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <Mail size={16} style={{ color: 'var(--accent-green)' }} /> {companyInfo.email}
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
    </div>
  );
}
