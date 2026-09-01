import React, { useEffect } from 'react';
import { CheckCircle2, Phone, MessageCircle, ArrowRight, ShieldCheck, Clock, FileSearch } from 'lucide-react';
import { companyInfo } from '../data/content';

export default function Gracias({ navigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGoHome = () => {
    if (navigate) {
      navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="section" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)', paddingBottom: '3.5rem' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        <div className="glass-card" style={{
          padding: 'clamp(1.75rem, 5vw, 3.25rem)',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-glow)',
          border: '1.5px solid var(--border-glow)'
        }}>
          
          {/* Animated Success Icon */}
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(76, 175, 79, 0.2) 0%, rgba(139, 195, 74, 0.3) 100%)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            border: '2px solid rgba(76, 175, 79, 0.3)'
          }}>
            <CheckCircle2 size={44} />
          </div>

          <span className="badge" style={{ marginBottom: '0.85rem' }}>
            <ShieldCheck size={15} />
            <span>Solicitud Confirmada</span>
          </span>

          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.6rem)', fontWeight: 800, marginBottom: '0.8rem', lineHeight: 1.2 }}>
            ¡Muchas gracias! Hemos recibido <span className="text-gradient">tu solicitud</span>
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 2.5vw, 1.08rem)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Un asesor energético de <strong>tuLuz</strong> analizará tu caso para encontrar el máximo ahorro posible y se pondrá en contacto contigo en las próximas <strong>24-48 horas</strong>.
          </p>

          {/* Next Steps Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1rem',
            marginBottom: '2.5rem',
            textAlign: 'left'
          }} className="gracias-steps-grid">
            
            <div style={{ background: 'var(--bg-main)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(76, 175, 79, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.88rem', flexShrink: 0 }}>
                1
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '0.15rem' }}>Revisión y auditoría</strong>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>Revisamos tus potencias, consumo histórico y condiciones contractuales.</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg-main)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(76, 175, 79, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.88rem', flexShrink: 0 }}>
                2
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '0.15rem' }}>Comparativa de mercado</strong>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>Buscamos la opción más económica entre más de 50 comercializadoras.</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg-main)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(76, 175, 79, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.88rem', flexShrink: 0 }}>
                3
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '0.15rem' }}>Propuesta 100% gratuita</strong>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>Te presentamos el estudio con total claridad para que tú decidas.</span>
              </div>
            </div>

          </div>

          {/* Quick Contact & Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
              <a 
                href={companyInfo.socials.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn" 
                style={{ background: '#25D366', color: '#ffffff', fontWeight: 700, padding: '0.8rem 1.4rem' }}
              >
                <MessageCircle size={18} />
                <span>Escríbenos por WhatsApp</span>
              </a>

              <a 
                href={`tel:${companyInfo.phoneRaw}`} 
                className="btn btn-secondary"
                style={{ padding: '0.8rem 1.4rem' }}
              >
                <Phone size={18} style={{ color: 'var(--primary)' }} />
                <span>Llamar al {companyInfo.phone}</span>
              </a>
            </div>

            <button 
              onClick={handleGoHome}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.6rem', marginTop: '0.5rem' }}
            >
              <span>Volver a la Página de Inicio</span>
              <ArrowRight size={16} />
            </button>

          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 680px) {
          .gracias-steps-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
