import React, { useState, useEffect } from 'react';
import { Lightbulb, Menu, X, Moon, Sun, Phone, ArrowRight } from 'lucide-react';
import { companyInfo, navLinks } from '../data/content';

export default function Navbar({ currentPath, navigate, theme, toggleTheme, openContactModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
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
        padding: isScrolled ? '0.8rem 0' : '1.2rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-green) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)',
            color: '#fff'
          }}>
            <Lightbulb size={26} className="animate-float" style={{ filter: 'drop-shadow(0 0 8px rgba(247, 209, 0, 0.8))' }} />
          </div>
          <div>
            <span style={{ 
              fontFamily: 'var(--font-primary)', 
              fontSize: '1.6rem', 
              fontWeight: 800, 
              letterSpacing: '-0.02em',
              color: 'var(--text-main)'
            }}>
              Tú<span className="text-gradient">Luz</span>
            </span>
            <span style={{ 
              display: 'block', 
              fontSize: '0.68rem', 
              fontWeight: 600, 
              color: 'var(--text-muted)', 
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginTop: '-4px'
            }}>
              Asesoría Energética
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'none', mdDisplay: 'flex', gap: '0.5rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--accent-green)' : 'var(--text-main)',
                  background: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--accent-green)';
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

        {/* Right CTA & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          
          {/* Direct Call Quick Link */}
          <a 
            href={`tel:${companyInfo.phoneRaw}`} 
            className="phone-quick-link"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              color: 'var(--text-main)', 
              fontSize: '0.9rem', 
              fontWeight: 600,
              padding: '0.4rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-card)'
            }}
          >
            <Phone size={16} style={{ color: 'var(--accent-green)' }} />
            <span style={{ display: 'none', lgDisplay: 'inline' }}>{companyInfo.phone}</span>
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
              transition: 'transform 0.2s ease'
            }}
          >
            {theme === 'dark' ? <Sun size={20} style={{ color: '#f59e0b' }} /> : <Moon size={20} />}
          </button>

          {/* Contact CTA */}
          <button 
            onClick={() => openContactModal()}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
          >
            <span>Estudio Gratuito</span>
            <ArrowRight size={16} />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger"
            aria-label="Abrir menú"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'var(--bg-main)',
          borderBottom: '1px solid var(--border-light)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 899
        }}>
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              style={{
                textAlign: 'left',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '1.1rem',
                fontWeight: currentPath === link.path ? 700 : 500,
                color: currentPath === link.path ? 'var(--accent-green)' : 'var(--text-main)',
                background: currentPath === link.path ? 'rgba(16, 185, 129, 0.1)' : 'transparent'
              }}
            >
              {link.name}
            </button>
          ))}
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a 
              href={`tel:${companyInfo.phoneRaw}`} 
              className="btn btn-secondary"
              style={{ justifyContent: 'center' }}
            >
              <Phone size={18} />
              Llamar al {companyInfo.phone}
            </a>
          </div>
        </div>
      )}

      {/* Responsive Styles helper */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-hamburger { display: none !important; }
        }
        @media (max-width: 899px) {
          .phone-quick-link span { display: none !important; }
        }
      `}</style>
    </header>
  );
}
