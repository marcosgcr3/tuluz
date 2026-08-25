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
      <section className="section" style={{ padding: '4rem 0 3rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="hero-page-grid">
            <div>
              <div className="badge" style={{ marginBottom: '1.25rem' }}>
                <Building2 size={16} />
                <span>Asesoría Energética Empresarial</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.15 }}>
                Análisis y optimización de facturas para <span className="text-gradient">empresas en Andalucía</span>
              </h1>

              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                En TúLuz somos especialistas en proporcionar soluciones energéticas personalizadas y eficientes para pymes, comercios e industrias. Nos centramos en optimizar el consumo de electricidad y minimizar costes operativos.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => onOpenModal({ clientType: 'empresa' })} className="btn btn-primary">
                  <span>Contacto Empresarial</span>
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
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" 
                alt="Optimización Energética para Empresas" 
                style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Services Grid */}
      <section className="section" style={{ background: 'rgba(0, 97, 0, 0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-green)' }}>
              Servicios Especializados Pyme e Industria
            </span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '0.3rem' }}>
              Ahorra en la factura de tu <span className="text-gradient">Empresa o Negocio</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxW: '600px', margin: '0.5rem auto 0 auto' }}>
              Cada negocio posee una curva de carga singular. Adaptamos la contratación a tu patrón de actividad real.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', mdGridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }} className="grid-3">
            {corporateServices.map((s, idx) => {
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

      {/* Bill Uploader */}
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
              ¡Llama ya al <a href={`tel:${companyInfo.phoneRaw}`} style={{ textDecoration: 'underline', color: 'var(--energy-gold)' }}>{companyInfo.phone}</a>!
            </h3>
            <p style={{ fontSize: '1.1rem', maxW: '700px', margin: '0 auto 2rem auto', color: 'rgba(255,255,255,0.9)' }}>
              Empieza a ahorrar en la factura de tu empresa y deja que nuestras soluciones personalizadas te guíen hacia un consumo energético óptimo.
            </p>
            <button onClick={() => onOpenModal({ clientType: 'empresa' })} className="btn btn-gold">
              <span>Solicitar Estudio de Factura Pyme</span>
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
