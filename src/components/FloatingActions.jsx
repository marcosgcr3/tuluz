import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/content';

export default function FloatingActions({ onOpenModal }) {
  return (
    <>
      <div className="floating-actions-container">
        
        {/* WhatsApp Floating Button */}
        <a 
          href={companyInfo.socials.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="floating-btn-whatsapp"
        >
          <MessageCircle className="floating-icon-wa" size={26} />
        </a>

        {/* Call Floating Button */}
        <a 
          href={`tel:${companyInfo.phoneRaw}`}
          aria-label="Llamar directamente"
          className="floating-btn-call"
        >
          <Phone className="floating-icon-call" size={20} />
        </a>

      </div>

      <style>{`
        .floating-actions-container {
          position: fixed;
          bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));
          right: calc(1.25rem + env(safe-area-inset-right, 0px));
          z-index: 950;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          align-items: flex-end;
        }
        .floating-btn-whatsapp {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #25D366;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          -webkit-tap-highlight-color: transparent;
        }
        .floating-btn-whatsapp:hover {
          transform: scale(1.1);
        }
        .floating-btn-call {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--primary);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-glow);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          -webkit-tap-highlight-color: transparent;
        }
        .floating-btn-call:hover {
          transform: scale(1.1);
        }
        @media (max-width: 600px) {
          .floating-actions-container {
            bottom: calc(0.9rem + env(safe-area-inset-bottom, 0px));
            right: calc(0.85rem + env(safe-area-inset-right, 0px));
            gap: 0.5rem;
          }
          .floating-btn-whatsapp {
            width: 46px;
            height: 46px;
          }
          .floating-icon-wa {
            width: 23px;
            height: 23px;
          }
          .floating-btn-call {
            width: 40px;
            height: 40px;
          }
          .floating-icon-call {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </>
  );
}
