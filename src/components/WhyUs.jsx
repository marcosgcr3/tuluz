import React from 'react';
import { Lightbulb, Leaf, TrendingUp, Handshake, ShieldCheck } from 'lucide-react';
import { valuePillars } from '../data/content';

const iconMap = {
  Lightbulb: Lightbulb,
  Leaf: Leaf,
  TrendingUp: TrendingUp,
  HandHeart: Handshake,
  Handshake: Handshake
};

export default function WhyUs() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', mdGridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="why-grid">
      {valuePillars.map((pillar, index) => {
        const IconComponent = iconMap[pillar.icon] || Lightbulb;

        return (
          <div 
            key={index}
            className="glass-card"
            style={{ 
              padding: '2.2rem 1.5rem', 
              borderRadius: 'var(--radius-lg)', 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: index === 0 
                ? 'rgba(255, 193, 7, 0.15)' 
                : index === 1 
                ? 'rgba(76, 175, 79, 0.15)' 
                : index === 2 
                ? 'rgba(139, 195, 74, 0.18)' 
                : 'rgba(76, 175, 79, 0.15)',
              color: index === 0 ? '#d97706' : 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <IconComponent size={28} />
            </div>

            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
              {pillar.title}
            </h4>
            {pillar.subtitle && (
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
                {pillar.subtitle}
              </span>
            )}
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
              {pillar.description}
            </p>
          </div>
        );
      })}

      <style>{`
        @media (min-width: 560px) and (max-width: 959px) {
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.25rem !important; }
        }
        @media (min-width: 960px) {
          .why-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}


