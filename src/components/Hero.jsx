import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Phone, Sparkles } from 'lucide-react';
import { companyInfo } from '../data/content';
import WhyUs from './WhyUs';

export default function Hero({ onOpenModal, navigate }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '3.5rem 0 4.5rem 0' }}>
      
      {/* Background Decorative Glow Spheres */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.2) 0%, rgba(247, 209, 0, 0.1) 40%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxW: '960px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Top Pill Badge */}
          <div className="badge" style={{ marginBottom: '1.5rem' }}>
            <Sparkles size={16} />
            <span>Asesoría Energética 100% Gratuita en Andalucía</span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Expertos en reducir el coste de tu <span className="text-gradient">factura de luz</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '740px',
            margin: '0 auto 2.5rem auto'
          }}>
            Analizamos tu consumo eléctrico previo y comparamos entre más de <strong>50 comercializadoras</strong>. Identificamos oportunidades reales de ahorro sin complicaciones ni costes para tu hogar, empresa o comunidad.
          </p>

          {/* CTAs Button Row */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <button 
              onClick={() => onOpenModal()}
              className="btn btn-primary"
              style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}
            >
              <span>Solicitar Estudio Gratuito</span>
              <ArrowRight size={20} />
            </button>

            <a 
              href={`tel:${companyInfo.phoneRaw}`}
              className="btn btn-secondary"
              style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem' }}
            >
              <Phone size={18} style={{ color: 'var(--accent-green)' }} />
              <span>Llamar al {companyInfo.phone}</span>
            </a>
          </div>

          {/* Ventaja Competitiva / Why Choose Us Section */}
          <div style={{ paddingTop: '2.5rem', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-green)' }}>
                Ventaja Competitiva
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.2rem' }}>
                ¿Por qué Elegir <span className="text-gradient">TúLuz en Andalucía</span>?
              </h2>
            </div>

            <WhyUs />
          </div>

        </div>
      </div>
    </div>
  );
}

