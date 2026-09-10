import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  TrendingDown, 
  FileText, 
  Filter,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { guidesData, getAllGuideCategories } from '../data/guidesData';
import { companyInfo } from '../data/content';

export default function Guias({ navigate, onOpenModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = useMemo(() => getAllGuideCategories(), []);

  const filteredGuides = useMemo(() => {
    return guidesData.filter((guide) => {
      const matchesCategory = selectedCategory === 'Todas' || guide.category === selectedCategory;
      const matchesSearch = 
        searchQuery.trim() === '' ||
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.keyword.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredGuide = guidesData[0];

  const handleGuideClick = (slug) => {
    navigate(`/guias/${slug}`);
  };

  return (
    <div className="guides-page" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(2rem, 4vw, 3.5rem) 0 5rem' }}>
      
      {/* Background glow ambiance */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(900px, 95vw)',
        height: '420px',
        background: 'radial-gradient(circle, rgba(76, 175, 79, 0.18) 0%, rgba(30, 77, 43, 0.08) 50%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            Inicio
          </button>
          <ChevronRight size={15} />
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Guías de Ahorro</span>
        </nav>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem',
            color: 'var(--text-main)'
          }}>
            Guías Expertas para <span className="text-gradient">Reducir tus Facturas</span> de Luz y Gas
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            marginBottom: '2rem'
          }}>
            Información técnica, transparente y contrastada por asesores energéticos. Aprende a descifrar tu recibo, comparar comercializadoras, evitar penalizaciones y rentabilizar placas solares.
          </p>

          {/* Search Bar */}
          <div style={{
            position: 'relative',
            maxWidth: '560px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={20} style={{ position: 'absolute', left: '1.2rem', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por palabra clave: potencia, solares, pymes, gas..."
              aria-label="Buscar guías de ahorro energético"
              style={{
                width: '100%',
                padding: '0.95rem 1.2rem 0.95rem 3.1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '1.1rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          gap: '0.6rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '3rem'
        }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                  background: isSelected ? 'var(--primary)' : 'var(--bg-card)',
                  color: isSelected ? '#ffffff' : 'var(--text-main)',
                  fontSize: '0.88rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 3px 12px rgba(76, 175, 79, 0.3)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Article Card (only if "Todas" and no search filter) */}
        {selectedCategory === 'Todas' && searchQuery === '' && featuredGuide && (
          <div 
            onClick={() => handleGuideClick(featuredGuide.slug)}
            style={{
              background: 'linear-gradient(135deg, rgba(76, 175, 79, 0.08) 0%, var(--bg-card) 100%)',
              border: '1px solid rgba(76, 175, 79, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              marginBottom: '3.5rem',
              cursor: 'pointer',
              boxShadow: '0 10px 35px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}
            className="featured-guide-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span style={{
                background: 'var(--primary)',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Sparkles size={13} /> Guía Destacada
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {featuredGuide.category}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                <Clock size={13} style={{ color: 'var(--primary)', flexShrink: 0 }} /> {featuredGuide.readTime}
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.4rem, 3.5vw, 2.1rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              marginBottom: '1rem',
              lineHeight: 1.25
            }}>
              {featuredGuide.title}
            </h2>

            <p style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              maxWidth: '850px'
            }}>
              {featuredGuide.excerpt}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <img 
                  src={featuredGuide.author.avatar} 
                  alt={featuredGuide.author.name} 
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'contain', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }} 
                />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{featuredGuide.author.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{featuredGuide.author.role}</div>
                </div>
              </div>

              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}>
                Leer guía completa <ArrowRight size={18} />
              </span>
            </div>
          </div>
        )}

        {/* Guides Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 290px), 1fr))',
          gap: '1.75rem',
          marginBottom: '4.5rem'
        }}>
          {filteredGuides.map((guide) => (
            <article 
              key={guide.id}
              onClick={() => handleGuideClick(guide.slug)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
              }}
              className="guide-card"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', gap: '0.75rem' }}>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--primary)',
                    background: 'rgba(76, 175, 79, 0.1)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {guide.category}
                  </span>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    color: 'var(--text-muted)', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.35rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}>
                    <Clock size={13} style={{ color: 'var(--primary)', flexShrink: 0 }} /> {guide.readTime}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.22rem',
                  fontWeight: 800,
                  lineHeight: 1.35,
                  color: 'var(--text-main)',
                  marginBottom: '0.85rem'
                }}>
                  {guide.title}
                </h3>

                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.55,
                  marginBottom: '1.25rem'
                }}>
                  {guide.excerpt}
                </p>
              </div>

              <div>
                <div style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}>
                  <span 
                    title={`#${guide.keyword}`}
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'monospace',
                      background: 'var(--bg-main)',
                      padding: '0.25rem 0.55rem',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '62%'
                    }}
                  >
                    #{guide.keyword}
                  </span>

                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}>
                    Leer más <ChevronRight size={16} style={{ flexShrink: 0 }} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-color)' }}>
            <FileText size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No se encontraron guías</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Prueba con otro término de búsqueda o selecciona otra categoría.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('Todas'); }}
              style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Ver todas las guías
            </button>
          </div>
        )}

        {/* Free Energy Audit CTA Banner */}
        <section style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, #2e7d32 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'center',
          gap: '2rem',
          boxShadow: '0 15px 40px rgba(76, 175, 79, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }} className="cta-guides-banner">
          <div style={{
            position: 'absolute',
            right: '-60px',
            top: '-60px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            pointerEvents: 'none'
          }} />

          <div>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem'
            }}>
              <Zap size={14} /> Asesoramiento Imparcial y Gratuito
            </span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', color: '#ffffff' }}>
              ¿Prefieres que un asesor analice tus facturas sin compromiso?
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, opacity: 0.95, maxWidth: '650px', marginBottom: '1.75rem' }}>
              En <strong>tuLuz</strong> comparamos más de 50 comercializadoras de luz y gas con tu consumo real. Sin letra pequeña, sin permanencia y con trámite 100% gratuito.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onOpenModal({ clientType: 'particular' })}
                style={{
                  background: '#ffffff',
                  color: 'var(--primary)',
                  fontWeight: 800,
                  fontSize: '0.98rem',
                  padding: '0.85rem 1.75rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <span>Solicitar Estudio Gratuito</span>
                <ArrowRight size={18} />
              </button>

              <a 
                href={companyInfo.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.98rem',
                  padding: '0.85rem 1.5rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'background 0.2s ease'
                }}
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </section>

      </div>

      <style>{`
        .guide-card:hover {
          transform: translateY(-5px);
          border-color: rgba(76, 175, 79, 0.45);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        }
        .featured-guide-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(76, 175, 79, 0.12);
        }
        @media (min-width: 900px) {
          .cta-guides-banner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
