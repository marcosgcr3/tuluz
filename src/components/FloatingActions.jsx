import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/content';

export default function FloatingActions({ onOpenModal }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 950,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      alignItems: 'flex-end'
    }}>
      
      {/* WhatsApp Floating Button */}
      <a 
        href={companyInfo.socials.whatsapp} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.12)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MessageCircle size={28} />
      </a>

      {/* Call Floating Button */}
      <a 
        href={`tel:${companyInfo.phoneRaw}`}
        aria-label="Llamar directamente"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.12)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Phone size={22} />
      </a>

    </div>
  );
}
