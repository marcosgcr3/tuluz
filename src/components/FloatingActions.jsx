import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/content';

export default function FloatingActions({ onOpenModal }) {
  return (
    <>
      <div 
        className="floating-actions-wrapper"
        style={{
          position: 'fixed',
          bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
          right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
          zIndex: 950,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          alignItems: 'flex-end'
        }}
      >
        {/* WhatsApp Floating Button */}
        <a 
          href={companyInfo.socials.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="floating-btn floating-wa-btn"
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
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            WebkitTapHighlightColor: 'transparent'
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
          className="floating-btn floating-call-btn"
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
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            WebkitTapHighlightColor: 'transparent'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.12)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Phone size={22} />
        </a>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .floating-actions-wrapper {
            bottom: calc(0.9rem + env(safe-area-inset-bottom, 0px)) !important;
            right: calc(0.85rem + env(safe-area-inset-right, 0px)) !important;
            gap: 0.55rem !important;
          }
          .floating-wa-btn {
            width: 48px !important;
            height: 48px !important;
          }
          .floating-call-btn {
            width: 42px !important;
            height: 42px !important;
          }
        }
      `}</style>
    </>
  );
}
