import React from 'react';
import { 
  ArrowRight, 
  Phone, 
  Sun, 
  Zap, 
  BatteryCharging, 
  FileCheck2, 
  BadgePercent, 
  Users2, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingDown,
  Building2,
  Home
} from 'lucide-react';
import { companyInfo } from '../data/content';
import BillAnalyzer from '../components/BillAnalyzer';

export default function Autoconsumo({ onOpenModal }) {
  const solarServices = [
    {
      icon: Sun,
      title: "Estudio de Viabilidad y Dimensionamiento a Medida",
      desc: "Analizamos tu tejado, orientación, radiación solar y curvas horarias de consumo eléctrico para dimensionar la instalación fotovoltaica ideal sin sobredimensionar ni encarecer costes."
    },
    {
      icon: FileCheck2,
      title: "Comparativa Multimarca y Llave en Mano",
      desc: "Comparamos ofertas de los mejores instaladores certificados e ingeniería de primeras marcas (paneles Tier 1, microinversores e inversores híbridos) con garantías de hasta 25-30 años."
    },
    {
      icon: BadgePercent,
      title: "Gestión de Subvenciones y Deducciones Fiscales",
      desc: "Te ayudamos a tramitar las deducciones en el IRPF (hasta el 60%), bonificaciones en el IBI (hasta el 50%), rebajas en el ICIO y fondos europeos Next Generation disponibles en tu comunidad."
    },
    {
      icon: Zap,
      title: "Batería Virtual y Compensación de Excedentes",
      desc: "Te conseguimos la mejor tarifa de compensación de excedentes por kWh vertido y configuramos tu Batería Virtual (monedero solar) para reducir tus facturas de luz a 0€ mes tras mes."
    },
    {
      icon: BatteryCharging,
      title: "Baterías Físicas y Aerotermia Híbrida",
      desc: "Asesoramos en sistemas de almacenamiento con baterías de litio de última generación e hibridación con aerotermia para lograr hasta un 90% de autosuficiencia energética día y noche."
    },
    {
      icon: Users2,
      title: "Autoconsumo Colectivo y Comunidades Solares",
      desc: "Diseñamos proyectos solares compartidos para comunidades de propietarios, edificios residenciales y polígonos empresariales con coeficientes de reparto energético optimizados."
    }
  ];

  const solarStats = [
    { value: "Hasta -80%", label: "Ahorro en tu factura eléctrica", icon: TrendingDown },
    { value: "3 a 5 años", label: "Plazo medio de amortización", icon: Sparkles },
    { value: "Hasta 60%", label: "Deducción en el IRPF", icon: BadgePercent },
    { value: "25+ Años", label: "Garantía de rendimiento paneles", icon: ShieldCheck }
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(2rem, 5vw, 3.5rem) 0' }}>
      
      {/* Background Solar Ambience */}
      <section style={{ position: 'relative', paddingBottom: '3.5rem' }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '8%',
          width: 'min(450px, 85vw)',
          height: '380px',
          background: 'radial-gradient(circle, rgba(255, 193, 7, 0.22) 0%, rgba(76, 175, 79, 0.12) 50%, transparent 70%)',
          filter: 'blur(55px)',
          pointerEvents: 'none'
        }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', alignItems: 'center' }} className="hero-page-grid">
            <div>
              <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 3.2rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.18 }}>
                Genera tu propia energía limpia y <span className="text-gradient">reduce tu factura hasta un 80%</span>
              </h1>

              <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                En <strong>tuLuz</strong> te asesoramos gratis en todo el proceso de autoconsumo solar: estudio de tejado, comparativa de instaladores, gestión de subvenciones y la mejor tarifa con <strong>batería virtual para facturas a 0€</strong>.
              </p>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }} className="page-hero-btns">
                <button onClick={() => onOpenModal({ clientType: 'autoconsumo' })} className="btn btn-primary page-btn">
                  <span>Estudio Solar Gratuito</span>
                  <ArrowRight size={18} />
                </button>
                <a href={`tel:${companyInfo.phoneRaw}`} className="btn btn-secondary page-btn">
                  <Phone size={18} style={{ color: 'var(--primary)' }} />
                  <span>{companyInfo.phone}</span>
                </a>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
              <picture>
                <source srcSet="/autoconsumo.webp" type="image/webp" />
                <img 
                  src="/autoconsumo.jpg" 
                  alt="Instalación de Paneles Solares y Autoconsumo Fotovoltaico" 
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="340"
                  style={{ width: '100%', height: 'clamp(220px, 35vw, 340px)', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                />
              </picture>
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sun size={20} style={{ color: '#FFC107', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Batería Virtual y Cero Emisiones</span>
                </div>
                <span style={{ fontSize: '0.78rem', background: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>
                  100% Renovable
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solar Impact Stats */}
      <section className="section" style={{ paddingTop: '0', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="solar-stats-grid">
            {solarStats.map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="glass-card" style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: '1px solid var(--border-light)'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(255, 193, 7, 0.15)',
                    color: '#d97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1 }}>
                      {st.value}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {st.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solar Specialized Services */}
      <section className="section" style={{ background: 'rgba(76, 175, 79, 0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)' }}>
              Asesoría Integral en Energía Solar
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', marginTop: '0.3rem' }}>
              Todo lo que necesitas para tu <span className="text-gradient">Instalación Solar</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0.5rem auto 0 auto', fontSize: '0.92rem' }}>
              Desde el dimensionamiento técnico y la solicitud de ayudas hasta la activación de la compensación de excedentes en tu factura.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="grid-3">
            {solarServices.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="glass-card" style={{ padding: 'clamp(1.25rem, 3vw, 1.85rem)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: 'rgba(255, 193, 7, 0.15)',
                    color: '#d97706',
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

      {/* Profiles: Particulares, Pymes y Comunidades */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)' }}>
              Adaptado a tu Perfil
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', marginTop: '0.3rem' }}>
              Autoconsumo para <span className="text-gradient">Cualquier Necesidad</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="grid-3">
            
            {/* Hogares */}
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <Home size={22} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Viviendas y Chalets</h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                Instalaciones residenciales monofásicas o trifásicas con compensación de excedentes y monedero solar para anular la factura.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-main)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--primary)' }} /> Deducción IRPF hasta el 60%
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--primary)' }} /> Bonificación IBI hasta 5 años
                </li>
              </ul>
            </div>

            {/* Empresas */}
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <Building2 size={22} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Empresas y Naves</h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                Reducción drástica del término de energía en horas punta diurnas para mejorar la competitividad de tu negocio.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-main)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--primary)' }} /> Amortización rápida en 3-4 años
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--primary)' }} /> Cumplimiento de objetivos ESG
                </li>
              </ul>
            </div>

            {/* Comunidades */}
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <Users2 size={22} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Comunidades Solares</h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                Aprovechamiento de la cubierta del edificio para zonas comunes y reparto del excedente entre los vecinos participantes.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-main)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--primary)' }} /> Ascensores y garajes a coste 0
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--primary)' }} /> Revalorización de la finca
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Bill Dropzone Uploader */}
      <section className="section">
        <div className="container">
          <BillAnalyzer onOpenModal={onOpenModal} clientType="autoconsumo" />
        </div>
      </section>

      {/* Call CTA Banner */}
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
              ¿Quieres saber cuánto ahorrarías con placas solares?
            </h3>
            <p style={{ fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)', maxWidth: '680px', margin: '0 auto 1.75rem auto', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
              Llámanos al <a href={`tel:${companyInfo.phoneRaw}`} style={{ textDecoration: 'underline', color: '#FFC107' }}>{companyInfo.phone}</a> o solicita tu estudio solar gratuito sin ningún compromiso.
            </p>
            <button onClick={() => onOpenModal({ clientType: 'autoconsumo' })} className="btn btn-gold" style={{ padding: '0.85rem 1.8rem' }}>
              <span>Solicitar Estudio Solar Gratuito</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 900px) {
          .hero-page-grid { grid-template-columns: 1.2fr 0.8fr !important; }
        }
        @media (min-width: 768px) {
          .solar-stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
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
