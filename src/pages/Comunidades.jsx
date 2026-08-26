import React from 'react';
import { Users, ArrowRight, Phone, CheckCircle2, Shield, Zap, Layers, FileSpreadsheet, Sun, ShieldAlert, LifeBuoy } from 'lucide-react';
import { companyInfo } from '../data/content';
import BillAnalyzer from '../components/BillAnalyzer';

export default function Comunidades({ onOpenModal }) {
  const communityServices = [
    {
      icon: FileSpreadsheet,
      title: "Análisis de Facturas Comunes",
      desc: "Estudiamos al detalle el consumo de iluminación, ascensores, garajes, calderas y bombas de agua para eliminar sobrecostes en los gastos generales de la finca."
    },
    {
      icon: Layers,
      title: "Estudio Multicompañía (+50 Opciones)",
      desc: "Trabajamos con más de 50 suministradoras eléctricas para garantizar la tarifa más barata ajustada a suministros comunitarios sin permanencias abusivas."
    },
    {
      icon: LifeBuoy,
      title: "Gestión de Trámites e Incidencias",
      desc: "Liberamos de carga al Administrador de Fincas y al Presidente. Nos ocupamos de altas, cambios de titular, optimización de potencia y reclamaciones."
    },
    {
      icon: Sun,
      title: "Energía Solar y Autoconsumo Colectivo",
      desc: "Asesoramos a la comunidad de vecinos en la instalación de placas solares comunitarias, baterías de respaldo y cargadores para vehículos eléctricos."
    },
    {
      icon: ShieldAlert,
      title: "Eliminación de Penalizaciones",
      desc: "Detectamos cobros por exceso de potencia o energía reactiva provocada por motores de ascensores y bombas, instalando baterías de condensadores."
    },
    {
      icon: Zap,
      title: "Seguimiento Continuo sin Sobrecostes",
      desc: "Realizamos una vigilancia permanente del mercado eléctrico para que la comunidad renueve siempre con las mejores condiciones tarifarias del momento."
    }
  ];

  return (
    <div>
      
      {/* Page Hero */}
      <section className="section" style={{ padding: 'clamp(2rem, 5vw, 4rem) 0 clamp(2rem, 4vw, 3rem) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '5%',
          width: 'min(400px, 80vw)',
          height: '350px',
          background: 'radial-gradient(circle, rgba(255, 193, 7, 0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', alignItems: 'center' }} className="hero-page-grid">
            <div>
              <div className="badge" style={{ marginBottom: '1rem' }}>
                <Users size={16} />
                <span>Soluciones de Luz y Gas para Comunidades</span>
              </div>

              <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 3.2rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.18 }}>
                Eficiencia energética en <span className="text-gradient">luz y gas para comunidades de vecinos</span>
              </h1>

              <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                En <strong>tuLuz</strong> conocemos las necesidades específicas de las fincas colectivas. Nos enfocamos en reducir costes en suministros eléctricos y gas comunitario (calderas, calefacción central y zonas comunes), evitando derramas innecesarias.
              </p>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }} className="page-hero-btns">
                <button onClick={() => onOpenModal({ clientType: 'comunidad' })} className="btn btn-primary page-btn">
                  <span>Estudio Gratuito de la Comunidad</span>
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
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" 
                alt="Eficiencia Energética de Luz y Gas en Comunidades de Vecinos" 
                style={{ width: '100%', height: 'clamp(220px, 35vw, 340px)', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" style={{ background: 'rgba(76, 175, 79, 0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)' }}>
              Gestión Eficiente de Fincas
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', marginTop: '0.3rem' }}>
              Reduce el coste de las facturas en tu <span className="text-gradient">Comunidad de Vecinos</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0.5rem auto 0 auto', fontSize: '0.92rem' }}>
              Optimizamos los contadores comunes de electricidad y gas para bajar la cuota mensual de los vecinos.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="grid-3">
            {communityServices.map((s, idx) => {
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

      {/* Upload zone */}
      <section className="section">
        <div className="container">
          <BillAnalyzer onOpenModal={onOpenModal} clientType="comunidad" />
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
            <h3 style={{ fontSize: 'clamp(1.35rem, 4vw, 1.9rem)', color: '#ffffff', marginBottom: '0.8rem', lineHeight: 1.3 }}>
              Contáctanos para reducir los gastos de energía de tu comunidad. ¡Llama ahora al <a href={`tel:${companyInfo.phoneRaw}`} style={{ textDecoration: 'underline', color: '#FFC107' }}>{companyInfo.phone}</a>!
            </h3>
            <p style={{ fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)', maxWidth: '650px', margin: '0 auto 1.75rem auto', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
              Estudio sin compromiso para fincas residenciales y complejos comunitarios en toda Andalucía.
            </p>
            <button onClick={() => onOpenModal({ clientType: 'comunidad' })} className="btn btn-gold" style={{ padding: '0.85rem 1.8rem' }}>
              <span>Solicitar Informe Gratuito de Finca</span>
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
