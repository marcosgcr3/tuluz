import React from 'react';
import { providersList } from '../data/content';
import { Zap } from 'lucide-react';

export default function CompanyMarquee() {
  const duplicatedProviders = [...providersList, ...providersList, ...providersList];

  return (
    <div style={{ padding: '3rem 0', overflow: 'hidden', position: 'relative' }}>
      
      <div className="container" style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-green)' }}>
          Red de Trabajo Multicompañía
        </span>
        <h4 style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>
          Comparamos más de <span className="text-gradient">50 Comercializadoras de Electricidad</span>
        </h4>
      </div>

      {/* Fade Gradients for edge masking */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '120px',
        background: 'linear-gradient(to right, var(--bg-main) 0%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: '120px',
        background: 'linear-gradient(to left, var(--bg-main) 0%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      {/* Marquee Track */}
      <div className="animate-marquee" style={{ gap: '1.5rem', padding: '0.5rem 0' }}>
        {duplicatedProviders.map((name, index) => (
          <div 
            key={index} 
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: 'var(--shadow-sm)',
              whiteSpace: 'nowrap',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--text-main)'
            }}
          >
            <Zap size={16} style={{ color: 'var(--accent-green)' }} />
            <span>{name}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
