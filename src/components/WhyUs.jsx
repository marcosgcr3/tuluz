import React from 'react';
import { Gift, Network, BarChart3, TrendingUp } from 'lucide-react';
import { valuePillars } from '../data/content';

const iconMap = {
  Gift: Gift,
  Network: Network,
  BarChart3: BarChart3,
  TrendingUp: TrendingUp
};

export default function WhyUs() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', mdGridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} className="why-grid">
      {valuePillars.map((pillar, index) => {
        const IconComponent = iconMap[pillar.icon] || Gift;

        return (
          <div 
            key={index}
            className="glass-card"
            style={{ 
              padding: '2rem 1.25rem', 
              borderRadius: 'var(--radius-md)', 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(0, 97, 0, 0.12) 0%, rgba(16, 185, 129, 0.2) 100%)',
              color: 'var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.1rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <IconComponent size={26} />
            </div>

            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.3 }}>{pillar.title}</h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              {pillar.description}
            </p>
          </div>
        );
      })}

      <style>{`
        @media (min-width: 768px) {
          .why-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}


