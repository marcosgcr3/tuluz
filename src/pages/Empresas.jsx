import React from 'react';
import { Building2, ArrowRight, Phone, CheckCircle, ShieldCheck, Zap, Sliders, Sun, FileCheck, RefreshCw, BarChart2 } from 'lucide-react';
import { companyInfo } from '../data/content';
import BillAnalyzer from '../components/BillAnalyzer';

export default function Empresas({ onOpenModal }) {
  const corporateServices = [
    {
      icon: Sliders,
      title: "Análisis y Optimización de Facturas",
      desc: "Realizamos un estudio exhaustivo de los periodos de consumo (P1 a P6) y de las potencias contratadas, identificando ahorros directos para reducir el importe final de tu pyme o industria."
    },
    {
      icon: BarChart2,
      title: "Estudio de Mercado (+50 Comercializadoras)",
      desc: "Comparamos objetivamente las tarifas a precio de coste (tarifas indexadas) y fijas disponibles en el mercado libre de energía empresarial."
    },
    {
      icon: FileCheck,
      title: "Gestión Integral de Trámites",
      desc: "Nos encargamos de toda la tramitación administrativa: cambios de titularidad, altas, bajas, modificaciones de potencia y reclamaciones sin interrumpir tu producción."
    },
    {
      icon: Sun,
      title: "Consultoría para Energía Solar Corporativa",
      desc: "Asesoramos en proyectos de autoconsumo fotovoltaico empresarial, analizando la amortización del presupuesto e integración de excedentes."
    },
    {
      icon: RefreshCw,
      title: "Seguimiento y Actualización de Ofertas",
      desc: "Monitorizamos las fluctuaciones del mercado energético para re-negociar tus condiciones antes del vencimiento de contrato y garantizar siempre la tarifa más económica."
    },
    {
      icon: Zap,
      title: "Medidas de Eficiencia Energética",
      desc: "Asesoramos en la eliminación de penalizaciones por energía reactiva, optimización de batería de condensadores y programas de consumo eficiente."
    }
  ];

  return (
    <div>
      
      {/* Page Hero Header */}
      <section className="section" style={{ padding: 'clamp(2rem, 5vw, 4rem) 0 clamp(2rem, 4vw, 3rem) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '5%',
          width: 'min(400px, 80vw)',
          height: '350px',
          background: 'radial-gradient(circle, rgba(76, 175, 79, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', alignItems: 'center' }} className="hero-page-grid">
            <div>
              <div className="badge" style={{ marginBottom: '1rem' }}>
                <Building2 size={16} />
                <span>Asesoramiento Energético Empresarial (Luz y Gas)</span>
              </div>

              <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 3.2rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.18 }}>
                Análisis y optimización de facturas de <span className="text-gradient">luz y gas para empresas</span>
              </h1>

              <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                En <strong>tuLuz</strong> somos especialistas en proporcionar soluciones energéticas personalizadas y eficientes para pymes, comercios e industrias. Nos centramos en optimizar el consumo de electricidad y gas natural, minimizando costes operativos.
              </p>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }} className="page-hero-btns">
                <button onClick={() => onOpenModal({ clientType: 'empresa' })} className="btn btn-primary page-btn">
                  <span>Contacto Empresarial</span>
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
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=75&fm=webp" 
                alt="Optimización Energética de Luz y Gas para Empresas" 
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

      {/* Corporate Services Grid */}
      <section className="section" style={{ background: 'rgba(76, 175, 79, 0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)' }}>
              Servicios Especializados Pyme e Industria
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', marginTop: '0.3rem' }}>
              Ahorra en la factura de tu <span className="text-gradient">Empresa o Negocio</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0.5rem auto 0 auto', fontSize: '0.92rem' }}>
              Cada negocio posee una curva de carga singular. Adaptamos la contratación a tu patrón de actividad real.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="grid-3">
            {corporateServices.map((s, idx) => {
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

      {/* Bill Uploader */}
      <section className="section">
        <div className="container">
          <BillAnalyzer onOpenModal={onOpenModal} clientType="empresa" />
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
              ¡Llama ya al <a href={`tel:${companyInfo.phoneRaw}`} style={{ textDecoration: 'underline', color: '#FFC107' }}>{companyInfo.phone}</a>!
            </h3>
            <p style={{ fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)', maxWidth: '700px', margin: '0 auto 1.75rem auto', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
              Empieza a ahorrar en la factura de tu empresa y deja que nuestras soluciones personalizadas te guíen hacia un consumo energético óptimo.
            </p>
            <button onClick={() => onOpenModal({ clientType: 'empresa' })} className="btn btn-gold" style={{ padding: '0.85rem 1.8rem' }}>
              <span>Solicitar Estudio de Factura Pyme</span>
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
