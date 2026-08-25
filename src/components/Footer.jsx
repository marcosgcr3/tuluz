import React from 'react';
import { Lightbulb, Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/content';

export default function Footer({ navigate }) {
  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-light)',
      paddingTop: '4rem',
      paddingBottom: '2rem',
      position: 'relative'
    }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          mdGridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '2.5rem',
          marginBottom: '3rem'
        }} className="footer-grid">
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => handleNavClick('/')}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Lightbulb size={24} />
              </div>
              <span style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Tú<span className="text-gradient">Luz</span>
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxW: '320px', marginBottom: '1.5rem' }}>
              Expertos en asesoría energética gratuita en Andalucía. Optimizamos tu factura de electricidad comparando entre más de 50 comercializadoras.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href={companyInfo.socials.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.15)',
                  color: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Dirección */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Dirección</h4>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <MapPin size={18} style={{ color: 'var(--accent-green)', flexShrink: 0, marginTop: '2px' }} />
              <span>{companyInfo.address}</span>
            </div>
          </div>

          {/* Col 3: Contacto */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <a href={`tel:${companyInfo.phoneRaw}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'inherit' }}>
                <Phone size={18} style={{ color: 'var(--accent-green)' }} />
                <span>{companyInfo.phone}</span>
              </a>
              <a href={`mailto:${companyInfo.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'inherit' }}>
                <Mail size={18} style={{ color: 'var(--accent-green)' }} />
                <span>{companyInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Col 4: Más Enlaces */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Más Enlaces</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <button 
                onClick={() => handleNavClick('/aviso-legal')} 
                style={{ textAlign: 'left', color: 'inherit', background: 'none' }}
              >
                Aviso legal
              </button>
              <button 
                onClick={() => handleNavClick('/politica-de-privacidad')} 
                style={{ textAlign: 'left', color: 'inherit', background: 'none' }}
              >
                Política de privacidad
              </button>
              <button 
                onClick={() => handleNavClick('/solicita-un-presupuesto')} 
                style={{ textAlign: 'left', color: 'var(--accent-green)', fontWeight: 600, background: 'none' }}
              >
                Solicitar estudio gratuito
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <span>© {new Date().getFullYear()} {companyInfo.name} - Asesoría Energética en Andalucía. Todos los derechos reservados.</span>
          <span>Desarrollado con alto rendimiento y optimización visual.</span>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
