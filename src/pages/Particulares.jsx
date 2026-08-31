import React from 'react';
import { ArrowRight, Phone, CheckCircle2, Shield, Zap, Search, Sun, Scale, Gauge, BellRing } from 'lucide-react';
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
      desc: "Ajustamos tus términos de potencia contratada para evitar pagar por kW que no utilizas o incurrir en penalizaciones innecesarias."
    },
    {
      icon: Sun,
      title: "Asesoría en Energía Solar Fotovoltaica",
      desc: "Si estás pensando en instalar placas solares en tu vivienda unifamiliar o pareado, te asesoramos en presupuestos, subvenciones y compensación de excedentes."
    },
    {
      icon: BellRing,
      title: "Monitoreo y Renovaciones",
      desc: "Te alertamos antes de cualquier subida o vencimiento contractual para mantener siempre el precio más bajo del mercado."
    },
    {
      icon: Zap,
      title: "Eficiencia y Sostenibilidad Doméstica",
      desc: "Te ayudamos a comprender los tramos horarios (punta, llano, valle) y adoptar pautas sencillas de eficiencia que reduzcan el importe a fin de mes."
    }
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(2rem, 5vw, 3.5rem) 0' }}>
      
      {/* Background Ambience */}
      <section style={{ position: 'relative', paddingBottom: '3.5rem' }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '10%',
          width: 'min(400px, 80vw)',
          height: '350px',
          background: 'radial-gradient(circle, rgba(76, 175, 79, 0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', alignItems: 'center' }} className="hero-page-grid">
            <div>
              <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 3.2rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.18 }}>
                Asesoramiento energético para optimizar <span className="text-gradient">facturas de luz y gas en tu hogar</span>
              </h1>

              <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                En <strong>tuLuz</strong> nos especializamos en asesoramiento energético gratuito y personalizado para particulares en Andalucía. Nuestro equipo trabaja para que pagues únicamente lo justo por la electricidad y el gas de tu vivienda.
              </p>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }} className="page-hero-btns">
                <button onClick={() => onOpenModal({ clientType: 'particular' })} className="btn btn-primary page-btn">
                  <span>Revisar mis Facturas Gratis</span>
                  <ArrowRight size={18} />
                </button>
                <a href={`tel:${companyInfo.phoneRaw}`} className="btn btn-secondary page-btn">
                  <Phone size={18} style={{ color: 'var(--primary)' }} />
                  <span>{companyInfo.phone}</span>
                </a>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=75&fm=webp" 
                alt="Ahorro de luz y gas en hogares particulares" 
                loading="lazy"
                decoding="async"
                width="600"
                height="340"
                style={{ width: '100%', height: 'clamp(220px, 35vw, 340px)', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" style={{ background: 'rgba(76, 175, 79, 0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)' }}>
              Servicio Gratuito para tu Casa
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', marginTop: '0.3rem' }}>
              Bajamos tus facturas de luz y gas <span className="text-gradient">sin complicaciones</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0.5rem auto 0 auto', fontSize: '0.92rem' }}>
              Analizamos tus contratos y cambiamos las condiciones sin cortes de suministro ni molestias.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="grid-3">
            {homeServices.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="glass-card" style={{ padding: 'clamp(1.25rem, 3vw, 1.85rem)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: 'rgba(76, 175, 79, 0.12)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.1rem'
                  }}>
                    <Icon size={24} />
                  </div>

                  <h3 style={{ fontSize: '1.18rem', marginBottom: '0.5rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55, flex: 1 }}>
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
          <BillAnalyzer onOpenModal={onOpenModal} clientType="particular" />
        </div>
      </section>

      {/* Call CTA */}
      <section className="section" style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, #4CAF4F 0%, #2e6931 100%)',
            color: '#ffffff',
            padding: 'clamp(1.75rem, 4vw, 3rem) clamp(1.25rem, 3.5vw, 2.5rem)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#ffffff', marginBottom: '0.8rem' }}>
              ¡Llama ahora al <a href={`tel:${companyInfo.phoneRaw}`} style={{ textDecoration: 'underline', color: '#FFC107' }}>{companyInfo.phone}</a>!
            </h3>
            <p style={{ fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)', maxWidth: '650px', margin: '0 auto 1.75rem auto', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
              Déjanos ayudarte a reducir las facturas de luz y gas de tu hogar con nuestro estudio 100% gratuito.
            </p>
            <button onClick={() => onOpenModal({ clientType: 'particular' })} className="btn btn-gold" style={{ padding: '0.85rem 1.8rem' }}>
              <span>Solicitar Asesoría de Luz y Gas Gratuita</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 900px) {
          .hero-page-grid { grid-template-columns: 1.2fr 0.8fr !important; }
        }
        @media (min-width: 600px) and (max-width: 959px) {
          .grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 960px) {
          .grid-3 { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .page-hero-btns {
            flex-direction: column;
          }
          .page-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

    </div>
  );
}
