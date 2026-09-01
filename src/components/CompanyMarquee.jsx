import React, { useState } from 'react';
import { providersList } from '../data/content';
import { Zap } from 'lucide-react';

function ProviderBadge({ provider }) {
  const [hasError, setHasError] = useState(false);
  const name = typeof provider === 'string' ? provider : provider.name;
  const domain = typeof provider === 'string' ? '' : provider.domain;
  const logoUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : '';

  return (
    <div 
      style={{
        padding: '0.6rem 1.25rem',
        borderRadius: 'var(--radius-full)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        boxShadow: 'var(--shadow-sm)',
        whiteSpace: 'nowrap',
        fontSize: '0.95rem',
        fontWeight: 600,
        color: 'var(--text-main)',
        transition: 'transform 0.2s ease, border-color 0.2s ease'
      }}
    >
      <div 
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          flexShrink: 0
        }}
      >
        {logoUrl && !hasError ? (
          <img 
            src={logoUrl} 
            alt={`Logo ${name}`}
            onError={() => setHasError(true)}
            style={{
              width: '17px',
              height: '17px',
              objectFit: 'contain',
              display: 'block'
            }}
            loading="lazy"
          />
        ) : (
          <Zap size={14} style={{ color: 'var(--accent-green)' }} />
        )}
      </div>
      <span>{name}</span>
    </div>
  );
}

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
        {duplicatedProviders.map((provider, index) => (
          <ProviderBadge 
            key={`${typeof provider === 'string' ? provider : provider.name}-${index}`} 
            provider={provider} 
          />
        ))}
      </div>

    </div>
  );
}
