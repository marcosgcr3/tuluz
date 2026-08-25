import React from 'react';
import { Building2, Users, Home, Check, ArrowRight } from 'lucide-react';
import { servicesOverview } from '../data/content';

const iconMap = {
  Building2: Building2,
  Users: Users,
  Home: Home
};

export default function ServicesGrid({ navigate }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', mdGridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="services-grid">
      {servicesOverview.map((service) => {
        const IconComponent = iconMap[service.icon] || Home;
        
        return (
          <div 
            key={service.id} 
            className="glass-card" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              borderRadius: 'var(--radius-lg)', 
              overflow: 'hidden' 
            }}
          >
            
            {/* Top Image Banner */}
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
              <img 
                src={service.image} 
                alt={`Asesoría energética para ${service.title} en Andalucía y Córdoba`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(9, 17, 11, 0.8) 0%, transparent 60%)'
              }} />

              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '0.3rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--primary-dark)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {service.badge}
              </div>

              {/* Icon Circle */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1.25rem',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-green) 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-glow)',
                zIndex: 2
              }}>
                <IconComponent size={22} />
              </div>
            </div>

            {/* Card Content Body */}
            <div style={{ padding: '2rem 1.5rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.6rem' }}>{service.title}</h3>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem', flex: 1 }}>
                {service.description}
              </p>

              {/* Features List */}
              <ul style={{ listStyle: 'none', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {service.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <Check size={12} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Link Button */}
              <button 
                onClick={() => {
                  navigate(service.path);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'space-between', padding: '0.75rem 1.25rem' }}
              >
                <span>Ver Solución Completa</span>
                <ArrowRight size={16} />
              </button>

            </div>

          </div>
        );
      })}

      <style>{`
        @media (min-width: 768px) {
          .services-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
