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
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.25rem', cursor: 'pointer' }} 
              onClick={() => handleNavClick('/')}
              title="tuLuz - Asesoramiento Energético"
            >
              <picture>
                <source srcSet="/icono.webp" type="image/webp" />
                <img 
                  src="/icono.png" 
                  alt="tuLuz" 
                  width="50"
                  height="50"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '50px', height: '50px', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(76, 175, 79, 0.25))' }}
                />
              </picture>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-primary)', fontSize: '1.85rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.025em', color: 'var(--text-main)' }}>
                  tu<span style={{ color: 'var(--primary)' }}>Luz</span>
                </span>
                <span style={{ fontSize: '0.64rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '3px' }}>
                  Asesoramiento Energético
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '340px', marginBottom: '1.5rem' }}>
              tuLuz representa claridad, ahorro y un futuro sostenible. Asesoramos para que tomes mejores decisiones energéticas, optimices tu consumo y cuides lo que importa.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href={companyInfo.socials.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp tuLuz"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.15)',
                  color: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Col 2: Dirección */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Dirección</h4>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <MapPin size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
              <span>{companyInfo.address}</span>
            </div>
          </div>

          {/* Col 3: Contacto */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <a href={`tel:${companyInfo.phoneRaw}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'inherit' }}>
                <Phone size={18} style={{ color: 'var(--primary)' }} />
                <span>{companyInfo.phone}</span>
              </a>
              <a href={`mailto:${companyInfo.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'inherit' }}>
                <Mail size={18} style={{ color: 'var(--primary)' }} />
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
                style={{ textAlign: 'left', color: 'var(--primary)', fontWeight: 600, background: 'none' }}
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
          <span>© {new Date().getFullYear()} {companyInfo.name} - Asesoramiento Energético. Todos los derechos reservados.</span>
          <span>Claridad · Ahorro · Sostenibilidad</span>
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
