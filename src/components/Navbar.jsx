import React, { useState, useEffect } from 'react';
import { Lightbulb, Menu, X, Moon, Sun, Phone, ArrowRight } from 'lucide-react';
import { companyInfo, navLinks } from '../data/content';

export default function Navbar({ currentPath, navigate, theme, toggleTheme, openContactModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          transition: 'all 0.3s ease',
          background: isScrolled ? 'var(--bg-glass)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-light)' : '1px solid transparent',
          boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
          padding: isScrolled ? '0.7rem 0' : '1.1rem 0'
        }}
      >
        <div className="navbar-container" style={{ width: '100%', maxWidth: '100%', padding: '0 clamp(1rem, 3.5vw, 3.5rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem' }}>
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flexShrink: 0 }}
            title="tuLuz - Asesoramiento Energético"
          >
            <picture>
              <source srcSet="/icono.webp" type="image/webp" />
              <img 
                src="/icono.png" 
                alt="tuLuz" 
                width="56"
                height="56"
                fetchpriority="high"
                decoding="async"
                className="navbar-brand-icon"
                style={{
                  width: '56px',
                  height: '56px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(76, 175, 79, 0.3))',
                  transition: 'transform 0.3s ease'
                }}
              />
            </picture>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="navbar-brand-text" style={{ 
                fontFamily: 'var(--font-primary)', 
                fontSize: '2.0rem', 
                fontWeight: 800, 
                letterSpacing: '-0.025em',
                lineHeight: 0.98,
                color: 'var(--text-main)',
                whiteSpace: 'nowrap'
              }}>
                tu<span style={{ color: 'var(--primary)' }}>Luz</span>
              </span>
              <span className="navbar-brand-sub" style={{ 
                display: 'block', 
                fontSize: '0.65rem', 
                fontWeight: 700, 
                color: 'var(--text-muted)', 
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '3px',
                whiteSpace: 'nowrap'
              }}>
                Asesoramiento Energético
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'none', gap: '0.35rem', alignItems: 'center', flexWrap: 'nowrap' }} className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  style={{
                    padding: '0.5rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.92rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--primary)' : 'var(--text-main)',
                    background: isActive ? 'rgba(76, 175, 79, 0.12)' : 'transparent',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-main)';
                  }}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Controls & CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
            
            {/* Phone quick link on larger mobile / desktop */}
            <a 
              href={`tel:${companyInfo.phoneRaw}`} 
              className="navbar-phone-btn"
              title={`Llamar al ${companyInfo.phone}`}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.45rem', 
                color: 'var(--text-main)', 
                fontSize: '0.9rem', 
                fontWeight: 600,
                padding: '0.5rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                minHeight: '40px',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              <Phone size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <span className="phone-text-desktop" style={{ whiteSpace: 'nowrap' }}>{companyInfo.phone}</span>
            </a>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              aria-label="Cambiar tema"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-main)',
                transition: 'transform 0.2s ease',
                flexShrink: 0
              }}
            >
              {theme === 'dark' ? <Sun size={18} style={{ color: '#FFC107' }} /> : <Moon size={18} />}
            </button>

            {/* Contact Desktop CTA */}
            <button 
              onClick={() => openContactModal()}
              className="btn btn-primary navbar-cta-desktop"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem', minHeight: '40px', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <span>Estudio Gratuito</span>
              <ArrowRight size={15} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-main)',
                flexShrink: 0
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Backdrop & Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 898,
            background: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '64px',
              left: '1rem',
              right: '1rem',
              background: 'var(--bg-card)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              animation: 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              maxHeight: 'calc(100vh - 85px)',
              overflowY: 'auto'
            }}
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  style={{
                    textAlign: 'left',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1.05rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--primary)' : 'var(--text-main)',
                    background: isActive ? 'rgba(76, 175, 79, 0.12)' : 'var(--bg-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '48px'
                  }}
                >
                  <span>{link.name}</span>
                  {isActive && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />}
                </button>
              );
            })}

            {/* Mobile Drawer Actions */}
            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  openContactModal();
                }}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Solicitar Estudio Gratuito</span>
                <ArrowRight size={16} />
              </button>

              <a 
                href={`tel:${companyInfo.phoneRaw}`} 
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Phone size={16} style={{ color: 'var(--primary)' }} />
                <span>Llamar al {companyInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Breakpoint CSS */}
      <style>{`
        @media (min-width: 1040px) {
          .desktop-nav { display: flex !important; }
          .mobile-hamburger { display: none !important; }
          .navbar-cta-desktop { display: inline-flex !important; }
        }
        @media (max-width: 1039px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
          .navbar-cta-desktop { display: none !important; }
        }
        @media (max-width: 600px) {
          .phone-text-desktop { display: none !important; }
          .navbar-brand-icon { width: 44px !important; height: 44px !important; }
          .navbar-brand-text { font-size: 1.6rem !important; }
          .navbar-brand-sub { font-size: 0.55rem !important; }
        }
        @media (max-width: 400px) {
          .navbar-brand-icon { width: 38px !important; height: 38px !important; }
          .navbar-brand-text { font-size: 1.42rem !important; }
          .navbar-brand-sub { font-size: 0.50rem !important; }
          .navbar-phone-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
