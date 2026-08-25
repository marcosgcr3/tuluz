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
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-green)' }}>
              Nuestras Especialidades
            </span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '0.3rem' }}>
              Soluciones a Medida para Cada <span className="text-gradient">Necesidad Energética</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxW: '640px', margin: '0.5rem auto 0 auto' }}>
              Nos adaptamos tanto a los requisitos de facturación de pymes e industrias como a fincas colectivas y hogares familiares.
            </p>
          </div>

          <ServicesGrid navigate={navigate} />
        </div>
      </section>

      {/* Bill Dropzone Uploader */}
      <section className="section" style={{ background: 'rgba(0, 97, 0, 0.03)' }}>
        <div className="container">
          <BillAnalyzer onOpenModal={onOpenModal} />
        </div>
      </section>

      {/* Partner Companies Marquee */}
      <CompanyMarquee />

      {/* Testimonials & Case Studies */}
      <section className="section" style={{ background: 'rgba(16, 185, 129, 0.03)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-green)' }}>
              Testimonios Reales
            </span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '0.3rem' }}>
              Lo que opinan nuestros <span className="text-gradient">Clientes en Andalucía</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', mdGridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }} className="testimonials-grid">
            {testimonials.map((t, index) => (
              <div 
                key={index} 
                className="glass-card" 
                style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '0.2rem', color: '#f59e0b', marginBottom: '1rem' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#f59e0b" />
                    ))}
                  </div>

                  <p style={{ fontStyle: 'italic', color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    "{t.text}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h5 style={{ fontSize: '1rem', fontWeight: 700 }}>{t.name}</h5>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role}</span>
                  </div>
                  <span className="badge" style={{ fontSize: '0.75rem' }}>{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .testimonials-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* Call Banner */}
      <section className="section" style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
            color: '#ffffff',
            padding: '3.5rem 2.5rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ maxW: '650px' }}>
              <h3 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '0.8rem', lineHeight: 1.2 }}>
                ¡Llama hoy y mejora tu consumo de energía con nuestro equipo experto!
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem' }}>
                Estudiamos sin costo la viabilidad de optimización en tu factura eléctrica en Córdoba y toda Andalucía.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onOpenModal()}
                className="btn btn-gold"
                style={{ padding: '0.9rem 1.8rem' }}
              >
                <span>Solicitar Contacto</span>
                <ArrowRight size={18} />
              </button>

              <a 
                href={`tel:${companyInfo.phoneRaw}`}
                className="btn"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', backdropFilter: 'blur(8px)' }}
              >
                <Phone size={18} />
                <span>{companyInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-green)' }}>
              Resolvemos tus Dudas
            </span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '0.3rem' }}>
              Preguntas <span className="text-gradient">Frecuentes</span>
            </h2>
          </div>

          <FAQAccordion />
        </div>
      </section>

    </div>
  );
}
