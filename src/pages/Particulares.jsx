import React from 'react';
import { Home as HomeIcon, ArrowRight, Phone, CheckCircle2, Shield, Zap, Search, Sun, Scale, Gauge, BellRing } from 'lucide-react';
import { companyInfo } from '../data/content';
import BillAnalyzer from '../components/BillAnalyzer';

export default function Particulares({ onOpenModal }) {
  const homeServices = [
    {
      icon: Search,
      title: "Análisis Personalizado de Facturas",
      desc: "Revisamos tu consumo eléctrico previo y realizamos un estudio detallado de tu factura para identificar ahorros inmediatos sin cambiar tus hábitos domésticos."
    },
    {
      icon: Scale,
      title: "Estudio de Mercado (+50 Comercializadoras)",
      desc: "Comparamos objetivamente entre más de 50 compañías para ofrecerte las tarifas (fijas o indexadas) más competitivas del momento en Andalucía."
    },
    {
      icon: Gauge,
      title: "Optimización de Potencia Contratada",
      desc: "Te aconsejamos la potencia exacta que necesita tu vivienda para evitar pagar un exceso innecesario en el término fijo de la factura."
    },
    {
      icon: Sun,
      title: "Asesoría en Energía Solar Fotovoltaica",
      desc: "Si estás pensando en instalar placas solares en tu vivienda unifamiliar o pareado, te asesoramos en presupuestos, subvenciones y compensación de excedentes."
    },
    {
      icon: BellRing,
      title: "Seguimiento y Alerta de Tarifas",
      desc: "No te abandonamos tras el contrato. Hacemos un seguimiento permanente del mercado libre para avisarte si aparece una oferta superior o vence tu promoción."
    },
    {
      icon: Zap,
      title: "Eficiencia y Sostenibilidad Doméstica",
      desc: "Te ayudamos a comprender los tramos horarios (punta, llano, valle) y adoptar pautas sencillas de eficiencia que reduzcan el importe a fin de mes."
    }
  ];

  return (
    <div>
      
      {/* Page Hero */}
      <section className="section" style={{ padding: '4rem 0 3rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="hero-page-grid">
            <div>
              <div className="badge" style={{ marginBottom: '1.25rem' }}>
                <HomeIcon size={16} />
                <span>Ahorro para Hogares y Particulares</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.15 }}>
                Asesoría energética para optimizar <span className="text-gradient">facturas de luz en el hogar en Andalucía</span>
              </h1>

              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                En TúLuz nos especializamos en asesoría energética gratuita y personalizada para particulares en Andalucía. Nuestro equipo trabaja para que pagues únicamente lo justo por la electricidad de tu vivienda.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => onOpenModal({ clientType: 'particular' })} className="btn btn-primary">
                  <span>Revisar mi Factura Gratis</span>
                  <ArrowRight size={18} />
                </button>
                <a href={`tel:${companyInfo.phoneRaw}`} className="btn btn-secondary">
                  <Phone size={18} style={{ color: 'var(--accent-green)' }} />
                  <span>{companyInfo.phone}</span>
                </a>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" 
                alt="Ahorro de luz en hogares particulares" 
                style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" style={{ background: 'rgba(0, 97, 0, 0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-green)' }}>
              Servicio Gratuito para tu Casa
            </span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '0.3rem' }}>
              Bajamos tu factura de luz <span className="text-gradient">sin complicaciones</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxW: '600px', margin: '0.5rem auto 0 auto' }}>
              Analizamos tus facturas y cambiamos las condiciones de tu contrato sin cortes de luz ni molestias.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', mdGridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }} className="grid-3">
            {homeServices.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: 'var(--accent-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <Icon size={26} />
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bill Dropzone Uploader */}
      <section className="section">
        <div className="container">
          <BillAnalyzer onOpenModal={onOpenModal} />
        </div>
      </section>

      {/* Call CTA */}
      <section className="section" style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
            color: '#ffffff',
            padding: '3rem 2rem',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '1rem' }}>
              ¡Llama ahora al <a href={`tel:${companyInfo.phoneRaw}`} style={{ textDecoration: 'underline', color: 'var(--energy-gold)' }}>{companyInfo.phone}</a>!
            </h3>
            <p style={{ fontSize: '1.1rem', maxW: '650px', margin: '0 auto 2rem auto', color: 'rgba(255,255,255,0.9)' }}>
              Déjanos ayudarte a reducir la factura de la luz de tu hogar con nuestro estudio 100% gratuito.
            </p>
            <button onClick={() => onOpenModal({ clientType: 'particular' })} className="btn btn-gold">
              <span>Solicitar Asesoría de Luz Gratuita</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 900px) {
          .hero-page-grid { grid-template-columns: 1.2fr 0.8fr !important; }
        }
        @media (min-width: 768px) {
          .grid-3 { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>

    </div>
  );
}
