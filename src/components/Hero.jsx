import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Phone } from 'lucide-react';
import { companyInfo } from '../data/content';
import WhyUs from './WhyUs';

export default function Hero({ onOpenModal, navigate }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(2rem, 5vw, 3.8rem) 0 clamp(2.5rem, 6vw, 4.5rem) 0' }}>
      
      {/* Background Decorative Glow Spheres */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(600px, 90vw)',
        height: '350px',
        background: 'radial-gradient(ellipse at center, rgba(76, 175, 79, 0.22) 0%, rgba(255, 193, 7, 0.12) 40%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Main Title aligned with Brand Concept & SEO */}
          <h1 style={{
            fontSize: 'clamp(2rem, 6.5vw, 3.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            lineHeight: 1.18
          }}>
            Ahorra en Luz y Gas con <span className="text-gradient">asesoramiento 100% gratuito</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(0.95rem, 3.2vw, 1.2rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '2rem',
            maxWidth: '780px',
            margin: '0 auto 2rem auto'
          }}>
            <strong>tuLuz</strong> representa claridad, ahorro y un futuro sostenible. Te asesoramos para que optimices tu consumo de electricidad y gas natural, reduzcas tus facturas y cuides lo que realmente importa comparando entre más de <strong>50 comercializadoras</strong>.
          </p>

          {/* CTAs Button Row */}
          <div className="hero-btn-row" style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <button 
              onClick={() => onOpenModal()}
              className="btn btn-primary hero-btn"
              style={{ padding: '0.85rem 2rem', fontSize: '1.02rem' }}
            >
              <span>Hablemos</span>
              <ArrowRight size={18} />
            </button>

            <a 
              href={`tel:${companyInfo.phoneRaw}`}
              className="btn btn-secondary hero-btn"
              style={{ padding: '0.85rem 1.6rem', fontSize: '1.02rem' }}
            >
              <Phone size={18} style={{ color: 'var(--primary)' }} />
              <span>Llamar al {companyInfo.phone}</span>
            </a>
          </div>

          {/* Ventaja Competitiva / Why Choose Us Section */}
          <div style={{ paddingTop: '2.5rem', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--primary)' }}>
                Nuestros Valores de Marca
              </span>
              <h2 style={{ fontSize: 'clamp(1.7rem, 4.5vw, 2.3rem)', fontWeight: 800, marginTop: '0.3rem' }}>
                El compromiso de <span className="text-gradient">tuLuz</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0.4rem auto 0 auto', fontSize: '0.92rem' }}>
                Cuatro pilares fundamentales sobre los que construimos la relación con cada uno de nuestros clientes.
              </p>
            </div>

            <WhyUs />
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 540px) {
          .hero-btn-row {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

