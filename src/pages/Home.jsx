import React from 'react';
import Hero from '../components/Hero';
import SavingsCalculator from '../components/SavingsCalculator';
import BillAnalyzer from '../components/BillAnalyzer';
import ServicesGrid from '../components/ServicesGrid';
import CompanyMarquee from '../components/CompanyMarquee';
import FAQAccordion from '../components/FAQAccordion';
import { ArrowRight, Star, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';
import { testimonials, companyInfo } from '../data/content';

export default function Home({ onOpenModal, navigate }) {
  return (
    <div>
      {/* Hero Header */}
      <Hero onOpenModal={onOpenModal} navigate={navigate} />

      {/* Interactive Calculator Section */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <SavingsCalculator onOpenModal={onOpenModal} />
        </div>
      </section>

      {/* Client Profiles Grid */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)' }}>
              Nuestras Especialidades
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', marginTop: '0.3rem' }}>
              Soluciones a Medida para Cada <span className="text-gradient">Necesidad Energética</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0.5rem auto 0 auto', fontSize: '0.92rem' }}>
              Nos adaptamos tanto a los requisitos de facturación de pymes e industrias como a fincas colectivas y hogares familiares.
            </p>
          </div>

          <ServicesGrid navigate={navigate} />
        </div>
      </section>

      {/* Bill Dropzone Uploader */}
      <section className="section" style={{ background: 'rgba(76, 175, 79, 0.03)' }}>
        <div className="container">
          <BillAnalyzer onOpenModal={onOpenModal} />
        </div>
      </section>

      {/* Partner Companies Marquee */}
      <CompanyMarquee />

      {/* Testimonials & Case Studies */}
      <section className="section" style={{ background: 'rgba(76, 175, 79, 0.03)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)' }}>
              Testimonios Reales
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', marginTop: '0.3rem' }}>
              Lo que opinan nuestros <span className="text-gradient">Clientes</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="testimonials-grid">
            {testimonials.map((t, index) => (
              <div 
                key={index} 
                className="glass-card" 
                style={{ padding: 'clamp(1.25rem, 3vw, 1.85rem)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '0.2rem', color: '#FFC107', marginBottom: '0.85rem' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={17} fill="#FFC107" />
                    ))}
                  </div>

                  <p style={{ fontStyle: 'italic', color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    "{t.text}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{t.name}</h5>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.role}</span>
                  </div>
                  <span className="badge" style={{ fontSize: '0.72rem', padding: '0.25rem 0.65rem' }}>{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (min-width: 600px) and (max-width: 959px) {
            .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (min-width: 960px) {
            .testimonials-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* Call Banner */}
      <section className="section" style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, #4CAF4F 0%, #2e6931 100%)',
            color: '#ffffff',
            padding: 'clamp(1.75rem, 4vw, 3rem) clamp(1.25rem, 3.5vw, 2.5rem)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ maxWidth: '650px' }}>
              <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.1rem)', color: '#ffffff', marginBottom: '0.6rem', lineHeight: 1.25 }}>
                ¡Llama hoy y mejora tu consumo con el equipo de tuLuz!
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 'clamp(0.9rem, 2.5vw, 1.02rem)', lineHeight: 1.5 }}>
                Estudiamos sin costo la viabilidad de optimización en tus facturas de luz y gas.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', width: '100%', maxWidth: 'max-content' }} className="banner-cta-group">
              <button 
                onClick={() => onOpenModal()}
                className="btn btn-gold banner-cta-btn"
                style={{ padding: '0.85rem 1.6rem' }}
              >
                <span>Solicitar Contacto</span>
                <ArrowRight size={17} />
              </button>

              <a 
                href={`tel:${companyInfo.phoneRaw}`}
                className="btn banner-cta-btn"
                style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                <Phone size={17} />
                <span>{companyInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 580px) {
            .banner-cta-group {
              max-width: 100% !important;
              flex-direction: column;
            }
            .banner-cta-btn {
              width: 100%;
              justify-content: center;
            }
          }
        `}</style>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)' }}>
              Resolvemos tus Dudas
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', marginTop: '0.3rem' }}>
              Preguntas <span className="text-gradient">Frecuentes</span>
            </h2>
          </div>

          <FAQAccordion />
        </div>
      </section>

    </div>
  );
}
