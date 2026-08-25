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
      title: "Estudio Multicompañía (+50 Opciónes)",
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
      <section className="section" style={{ padding: '4rem 0 3rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(247, 209, 0, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="hero-page-grid">
            <div>
              <div className="badge" style={{ marginBottom: '1.25rem' }}>
                <Users size={16} />
                <span>Soluciones para Comunidades de Propietarios</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.15 }}>
                Eficiencia energética para <span className="text-gradient">comunidades de vecinos en Andalucía</span>
              </h1>

              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Conocemos las necesidades específicas de las fincas colectivas. Nos enfocamos en reducir costes en zonas comunes, evitar derramas innecesarias y simplificar la gestión energética del inmueble.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => onOpenModal({ clientType: 'comunidad' })} className="btn btn-primary">
                  <span>Estudio Gratuito de la Comunidad</span>
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
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" 
                alt="Eficiencia Energética en Comunidades de Vecinos" 
                style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" style={{ background: 'rgba(0, 97, 0, 0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-green)' }}>
              Gestión Eficiente de Fincas
            </span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '0.3rem' }}>
              Reduce el coste de las facturas en tu <span className="text-gradient">Comunidad de Vecinos</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxW: '600px', margin: '0.5rem auto 0 auto' }}>
              Optimizamos los contadores comunes del edificio para bajar la cuota mensual de los vecinos.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', mdGridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }} className="grid-3">
            {communityServices.map((s, idx) => {
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

      {/* Upload zone */}
      <section className="section">
        <div className="container">
          <BillAnalyzer onOpenModal={onOpenModal} clientType="comunidad" />
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
            <h3 style={{ fontSize: '1.9rem', color: '#ffffff', marginBottom: '1rem' }}>
              Contáctanos para reducir los gastos de energía de tu comunidad. ¡Llama ahora al <a href={`tel:${companyInfo.phoneRaw}`} style={{ textDecoration: 'underline', color: 'var(--energy-gold)' }}>{companyInfo.phone}</a>!
            </h3>
            <button onClick={() => onOpenModal({ clientType: 'comunidad' })} className="btn btn-gold">
              <span>Solicitar Informe Gratuito de Finca</span>
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
