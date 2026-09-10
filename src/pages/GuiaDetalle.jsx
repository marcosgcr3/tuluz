import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  BookOpen, 
  Phone, 
  MessageCircle,
  FileCheck,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { getGuideBySlug, guidesData } from '../data/guidesData';
import { companyInfo } from '../data/content';

export default function GuiaDetalle({ slug, navigate, onOpenModal }) {
  const guide = useMemo(() => getGuideBySlug(slug) || guidesData[0], [slug]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState('');
  const [openFaqIndices, setOpenFaqIndices] = useState([0]); // First FAQ open by default
  const [isTocOpen, setIsTocOpen] = useState(false); // Collapsed by default on load for optimal mobile reading

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      // Track active heading for TOC
      if (guide?.tableOfContents) {
        for (let i = guide.tableOfContents.length - 1; i >= 0; i--) {
          const item = guide.tableOfContents[i];
          const el = document.getElementById(item.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 140) {
              setActiveHeading(item.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [guide]);

  // Inject Schema.org JSON-LD structured data for Article, Breadcrumb and FAQPage
  useEffect(() => {
    if (!guide) return;

    const schemaId = 'schema-guide-article';
    let scriptTag = document.getElementById(schemaId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const articleSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": `https://tu-luz.es/guias/${guide.slug}#article`,
          "isPartOf": {
            "@type": "WebPage",
            "@id": `https://tu-luz.es/guias/${guide.slug}`
          },
          "headline": guide.title,
          "description": guide.metaDescription,
          "datePublished": `${guide.publishedAt}T09:00:00+02:00`,
          "dateModified": `${guide.updatedAt}T12:00:00+02:00`,
          "mainEntityOfPage": `https://tu-luz.es/guias/${guide.slug}`,
          "author": {
            "@type": "Organization",
            "name": guide.author.name,
            "url": "https://tu-luz.es"
          },
          "publisher": {
            "@type": "Organization",
            "name": "tuLuz - Asesoramiento Energético",
            "logo": {
              "@type": "ImageObject",
              "url": "https://tu-luz.es/logo.png"
            }
          },
          "keywords": guide.keyword
        },
        {
          "@type": "BreadcrumbList",
          "@id": `https://tu-luz.es/guias/${guide.slug}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Inicio",
              "item": "https://tu-luz.es/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Guías de Ahorro",
              "item": "https://tu-luz.es/guias"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": guide.title,
              "item": `https://tu-luz.es/guias/${guide.slug}`
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": `https://tu-luz.es/guias/${guide.slug}#faq`,
          "mainEntity": (guide.faqs || []).map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        }
      ]
    };

    scriptTag.text = JSON.stringify(articleSchema);

    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [guide]);

  const toggleFaq = (index) => {
    setOpenFaqIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: guide.title,
          text: guide.excerpt,
          url: window.location.href
        });
      } catch (err) {
        // ignore share cancellation
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  // Related guides
  const relatedGuides = useMemo(() => {
    return (guide.relatedSlugs || [])
      .map(s => getGuideBySlug(s))
      .filter(Boolean);
  }, [guide]);

  if (!guide) {
    return (
      <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
        <h2>Guía no encontrada</h2>
        <button onClick={() => navigate('/guias')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Volver al índice de guías
        </button>
      </div>
    );
  }

  return (
    <article className="guide-detail-page" style={{ position: 'relative', paddingBottom: '5rem' }}>
      
      {/* Top Reading Progress Bar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '4px',
          background: 'linear-gradient(90deg, var(--primary) 0%, #81C784 100%)',
          width: `${scrollProgress}%`,
          zIndex: 9999,
          transition: 'width 0.1s ease-out'
        }} 
      />

      {/* Header Container */}
      <div className="guide-header-hero" style={{
        background: 'linear-gradient(180deg, rgba(76, 175, 79, 0.08) 0%, var(--bg-main) 100%)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/')} 
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Inicio
            </button>
            <ChevronRight size={13} />
            <button 
              onClick={() => navigate('/guias')} 
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Guías
            </button>
            <ChevronRight size={13} />
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{guide.category}</span>
          </nav>

          {/* Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span style={{
              background: 'var(--primary)',
              color: '#ffffff',
              fontSize: '0.74rem',
              fontWeight: 700,
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              {guide.category}
            </span>
          </div>

          {/* Main H1 Title */}
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4.5vw, 2.75rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            color: 'var(--text-main)'
          }}>
            {guide.title}
          </h1>

          <p style={{
            fontSize: 'clamp(0.98rem, 2.2vw, 1.15rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '1.5rem'
          }}>
            {guide.excerpt}
          </p>

          {/* Meta Information Bar */}
          <div className="guide-meta-bar">
            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img 
                src={guide.author.avatar} 
                alt={guide.author.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'contain', background: 'var(--bg-card)', border: '1px solid var(--border-light)', flexShrink: 0 }} 
              />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.25 }}>{guide.author.name}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{guide.author.role}</div>
              </div>
            </div>

            {/* Read Time, Dates & Share */}
            <div className="guide-meta-details">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
                <Clock size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} /> {guide.readTime}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
                <Calendar size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} /> {guide.updatedAt}
              </span>
              <button 
                onClick={handleShare}
                aria-label="Compartir artículo"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-main)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  transition: 'all 0.2s ease',
                  fontWeight: 600
                }}
              >
                <Share2 size={13} /> Compartir
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container" style={{ maxWidth: '1120px', marginTop: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'clamp(1.75rem, 3vw, 3rem)',
          width: '100%',
          maxWidth: '100%'
        }} className="guide-layout-grid">
          
          {/* Main Article Body */}
          <main style={{ maxWidth: '760px', width: '100%', minWidth: 0, margin: '0 auto' }}>
            
            {/* Table of Contents Box (Collapsible on mobile with clear count badge) */}
            <nav 
              aria-label="Índice del artículo"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1rem, 2.5vw, 1.4rem)',
                marginBottom: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
              }}
            >
              <button 
                type="button"
                onClick={() => setIsTocOpen(!isTocOpen)}
                aria-expanded={isTocOpen}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                  padding: 0,
                  paddingBottom: isTocOpen ? '0.85rem' : '0',
                  borderBottom: isTocOpen ? '1px solid var(--border-light)' : 'none',
                  marginBottom: isTocOpen ? '0.85rem' : '0',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 800, fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)' }}>
                  <BookOpen size={18} style={{ flexShrink: 0 }} />
                  <span>Índice ({guide.tableOfContents.length} apartados)</span>
                </div>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  fontSize: '0.8rem', 
                  color: 'var(--primary)', 
                  fontWeight: 600,
                  background: 'rgba(76, 175, 79, 0.08)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)'
                }}>
                  <span>{isTocOpen ? 'Plegar' : 'Desplegar'}</span>
                  {isTocOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {isTocOpen && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {guide.tableOfContents.map((toc) => (
                    <li key={toc.id}>
                      <button
                        onClick={() => scrollToSection(toc.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0.25rem 0',
                          textAlign: 'left',
                          color: activeHeading === toc.id ? 'var(--primary)' : 'var(--text-main)',
                          fontWeight: activeHeading === toc.id ? 700 : 500,
                          fontSize: 'clamp(0.85rem, 2vw, 0.92rem)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.45rem',
                          width: '100%',
                          transition: 'color 0.2s ease',
                          lineHeight: 1.45
                        }}
                      >
                        <ChevronRight size={14} style={{ color: activeHeading === toc.id ? 'var(--primary)' : 'var(--text-muted)', flexShrink: 0, marginTop: '3px' }} />
                        <span>{toc.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </nav>

            {/* Content Sections */}
            <div className="article-body">
              {guide.sections.map((section) => (
                <section key={section.id} id={section.id} style={{ marginBottom: 'clamp(2rem, 4vw, 3.25rem)', scrollMarginTop: '100px' }}>
                  
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 3.8vw, 1.75rem)',
                    fontWeight: 800,
                    lineHeight: 1.3,
                    color: 'var(--text-main)',
                    marginBottom: '0.9rem',
                    paddingBottom: '0.45rem',
                    borderBottom: '2px solid rgba(76, 175, 79, 0.2)'
                  }}>
                    {section.title}
                  </h2>

                  {section.content && (
                    <div style={{ marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>
                      {section.content.split('\n\n').map((paragraph, pIdx) => {
                        // Highlight markdown bold text
                        const formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        return (
                          <p 
                            key={pIdx} 
                            dangerouslySetInnerHTML={{ __html: formatted }} 
                          />
                        );
                      })}
                    </div>
                  )}

                  {/* Bullet list if present */}
                  {section.bullets && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {section.bullets.map((bullet, bIdx) => {
                        const formatted = bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        return (
                          <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: 'clamp(0.92rem, 2.2vw, 0.98rem)', lineHeight: 1.55 }}>
                            <CheckCircle2 size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                            <div dangerouslySetInnerHTML={{ __html: formatted }} />
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {/* Callout Box if present */}
                  {section.callout && (
                    <div style={{
                      margin: 'clamp(1.25rem, 2.5vw, 1.75rem) 0',
                      padding: 'clamp(1rem, 2.5vw, 1.35rem)',
                      borderRadius: 'var(--radius-md)',
                      background: section.callout.type === 'tip' ? 'rgba(76, 175, 79, 0.08)' : 'rgba(255, 152, 0, 0.08)',
                      borderLeft: `4px solid ${section.callout.type === 'tip' ? 'var(--primary)' : '#ff9800'}`,
                      color: 'var(--text-main)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, marginBottom: '0.35rem', color: section.callout.type === 'tip' ? 'var(--primary)' : '#e65100', fontSize: '0.96rem' }}>
                        {section.callout.type === 'tip' ? <Sparkles size={17} /> : <AlertCircle size={17} />}
                        <span>{section.callout.title}</span>
                      </div>
                      <p style={{ fontSize: '0.92rem', margin: 0, lineHeight: 1.55 }}>{section.callout.text}</p>
                    </div>
                  )}

                  {/* Data Table with Mobile Horizontal Swipe */}
                  {section.table && (
                    <div style={{ margin: 'clamp(1.25rem, 2.5vw, 1.75rem) 0' }}>
                      <div style={{
                        overflowX: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                        maxWidth: '100%'
                      }}>
                        <table style={{ width: '100%', minWidth: '460px', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                          <thead>
                            <tr style={{ background: 'var(--bg-card)', borderBottom: '2px solid var(--border-color)' }}>
                              {section.table.headers.map((h, hIdx) => (
                                <th key={hIdx} style={{ padding: '0.7rem 0.85rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} style={{ borderBottom: '1px solid var(--border-light)', background: rIdx % 2 === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.015)' }}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} style={{ padding: '0.7rem 0.85rem', color: cIdx === 0 ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: cIdx === 0 ? 600 : 400 }}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.4rem', textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.3rem' }}>
                        <span>⇄ Desliza horizontalmente para ver la tabla</span>
                      </div>
                    </div>
                  )}

                </section>
              ))}
            </div>

            {/* Interactive Free Audit Banner inside article */}
            <div className="guide-cta-box" style={{
              background: 'linear-gradient(135deg, rgba(76, 175, 79, 0.12) 0%, rgba(30, 77, 43, 0.08) 100%)',
              border: '1px solid rgba(76, 175, 79, 0.35)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.25rem, 3.5vw, 2rem)',
              margin: 'clamp(2rem, 4vw, 3.25rem) 0',
              textAlign: 'center'
            }}>
              <Zap size={30} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
              <h3 style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.35rem)', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
                ¿Quieres saber cuánto puedes ahorrar con tu factura actual?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '580px', margin: '0 auto 1.35rem', lineHeight: 1.6 }}>
                En <strong>tuLuz</strong> analizamos tu factura de electricidad o gas sin ningún compromiso. Comparamos más de 50 comercializadoras y te decimos cuál es tu opción más rentable.
              </p>
              <div className="guide-cta-buttons">
                <button 
                  onClick={() => onOpenModal({ clientType: 'particular' })}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  <span>Solicitar Estudio Gratuito</span>
                  <ArrowRight size={18} />
                </button>
                <a 
                  href={`tel:${companyInfo.phoneRaw}`}
                  className="btn btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  <Phone size={17} style={{ color: 'var(--primary)' }} />
                  <span>{companyInfo.phone}</span>
                </a>
              </div>
            </div>

            {/* Frequently Asked Questions Section (FAQPage Schema target) */}
            <section id="preguntas-frecuentes" style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)', scrollMarginTop: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <HelpCircle size={22} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <h2 style={{ fontSize: 'clamp(1.3rem, 3.8vw, 1.6rem)', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Preguntas Frecuentes
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {guide.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndices.includes(idx);
                  return (
                    <div 
                      key={idx}
                      style={{
                        background: 'var(--bg-card)',
                        border: isOpen ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        transition: 'border-color 0.2s ease'
                      }}
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        style={{
                          width: '100%',
                          padding: '0.95rem 1.15rem',
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.75rem',
                          cursor: 'pointer',
                          color: 'var(--text-main)',
                          fontWeight: 700,
                          fontSize: 'clamp(0.92rem, 2.5vw, 1.02rem)',
                          lineHeight: 1.35
                        }}
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
                      </button>

                      {isOpen && (
                        <div style={{
                          padding: '0 1.15rem 1.15rem',
                          color: 'var(--text-muted)',
                          fontSize: '0.92rem',
                          lineHeight: 1.62,
                          borderTop: '1px solid var(--border-light)',
                          paddingTop: '0.75rem'
                        }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Author Credential Bio Box */}
            <div className="guide-author-box" style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.25rem, 3vw, 1.75rem)',
              marginBottom: 'clamp(2rem, 4vw, 3.5rem)'
            }}>
              <img 
                src={guide.author.avatar} 
                alt={guide.author.name}
                style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'contain', background: 'var(--bg-main)', border: '1px solid var(--border-light)', flexShrink: 0 }} 
              />
              <div style={{ flex: 1, minWidth: '220px' }}>
                <div style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  Artículo redactado y revisado por {guide.author.name}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {guide.author.role}
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
                  En tuLuz analizamos mensualmente miles de facturas y el mercado mayorista diario para ofrecer a familias, pymes y comunidades información veraz, sin letra pequeña.
                </p>
              </div>
            </div>

            {/* Related Guides / Cross Linking */}
            {relatedGuides.length > 0 && (
              <section style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2.25rem' }}>
                <h3 style={{ fontSize: 'clamp(1.15rem, 3vw, 1.3rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                  Guías Relacionadas de Ahorro
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
                  {relatedGuides.map((rel) => (
                    <div 
                      key={rel.id}
                      onClick={() => navigate(`/guias/${rel.slug}`)}
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.15rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      className="guide-card"
                    >
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                        {rel.category}
                      </span>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0.45rem 0', color: 'var(--text-main)', lineHeight: 1.35 }}>
                        {rel.title}
                      </h4>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>
                        Leer guía <ChevronRight size={14} />
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Back to Guides Hub */}
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <button 
                onClick={() => navigate('/guias')}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  padding: '0.7rem 1.4rem',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={16} /> Volver a todas las guías
              </button>
            </div>

          </main>

          {/* Sticky Sidebar on Desktop */}
          <aside className="desktop-guide-sidebar" style={{ display: 'none', height: '100%' }}>
            <div style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Quick Contact & Free Audit Box */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                  <Zap size={16} />
                  <span>Estudio 100% Gratuito</span>
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                  ¿Cuánto puedes ahorrar en tu luz?
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Envíanos tu factura y nuestro equipo revisará tus potencias y contratos entre más de 50 comercializadoras.
                </p>
                <button 
                  onClick={() => onOpenModal({ clientType: 'particular' })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--primary)',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 3px 12px rgba(76, 175, 79, 0.3)'
                  }}
                >
                  <span>Analizar mi factura</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Direct WhatsApp Assistance Box */}
              <div style={{
                background: 'rgba(37, 211, 102, 0.08)',
                border: '1px solid rgba(37, 211, 102, 0.25)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#25D366', fontWeight: 700, fontSize: '0.92rem' }}>
                  <MessageCircle size={18} />
                  <span>Atención Rápida WhatsApp</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.45 }}>
                  ¿Tienes dudas sobre esta guía o tu factura? Escríbenos directamente y un asesor te responderá hoy mismo.
                </p>
                <a 
                  href={companyInfo.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    background: '#25D366',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                    display: 'inline-block'
                  }}
                >
                  Abrir WhatsApp
                </a>
              </div>

            </div>
          </aside>

        </div>
      </div>

      <style>{`
        .guide-detail-page {
          overflow-x: clip;
        }
        .guide-header-hero {
          padding: clamp(1.75rem, 4vw, 3.5rem) 0 clamp(1.5rem, 3vw, 2.5rem);
        }
        .guide-meta-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
        }
        .guide-meta-details {
          display: flex;
          align-items: center;
          gap: 1.15rem;
          font-size: 0.82rem;
          color: var(--text-muted);
          flex-wrap: wrap;
        }
        .guide-layout-grid {
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }
        .guide-layout-grid > * {
          min-width: 0;
          max-width: 100%;
        }
        .article-body {
          color: var(--text-main);
          word-break: break-word;
          overflow-wrap: break-word;
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }
        .article-body * {
          max-width: 100%;
        }
        .article-body p {
          font-size: clamp(0.98rem, 2.3vw, 1.05rem);
          line-height: 1.7;
          margin-bottom: 1.15rem;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .guide-cta-buttons {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .guide-author-box {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .guide-meta-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.85rem !important;
          }
          .guide-meta-details {
            width: 100% !important;
            justify-content: space-between !important;
            gap: 0.5rem !important;
          }
          .guide-cta-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          .guide-cta-buttons .btn {
            width: 100% !important;
            justify-content: center !important;
          }
          .guide-author-box {
            flex-direction: column !important;
            text-align: center !important;
            align-items: center !important;
          }
        }

        @media (min-width: 960px) {
          .guide-layout-grid {
            grid-template-columns: minmax(0, 1fr) 320px !important;
            align-items: stretch !important;
          }
          .desktop-guide-sidebar {
            display: block !important;
            height: 100% !important;
          }
        }
      `}</style>

    </article>
  );
}
