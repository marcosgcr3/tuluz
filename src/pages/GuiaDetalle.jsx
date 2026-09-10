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
    <article className="guide-detail-page" style={{ position: 'relative', paddingBottom: '6rem' }}>
      
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
      <div style={{
        background: 'linear-gradient(180deg, rgba(76, 175, 79, 0.08) 0%, var(--bg-main) 100%)',
        borderBottom: '1px solid var(--border-light)',
        padding: 'clamp(2rem, 4vw, 3.5rem) 0 2.5rem'
      }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/')} 
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Inicio
            </button>
            <ChevronRight size={14} />
            <button 
              onClick={() => navigate('/guias')} 
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Guías
            </button>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{guide.category}</span>
          </nav>

          {/* Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
            <span style={{
              background: 'var(--primary)',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {guide.category}
            </span>
            <span style={{
              background: 'rgba(76, 175, 79, 0.12)',
              color: 'var(--primary)',
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)'
            }}>
              Objetivo SEO: {guide.keyword}
            </span>
          </div>

          {/* Main H1 Title */}
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 2.9rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem',
            color: 'var(--text-main)'
          }}>
            {guide.title}
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '1.75rem'
          }}>
            {guide.excerpt}
          </p>

          {/* Meta Information Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-light)'
          }}>
            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img 
                src={guide.author.avatar} 
                alt={guide.author.name}
                style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'contain', background: 'var(--bg-card)', border: '1px solid var(--border-light)' }} 
              />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>{guide.author.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{guide.author.role}</div>
              </div>
            </div>

            {/* Read Time & Dates */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={15} style={{ color: 'var(--primary)' }} /> {guide.readTime}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={15} style={{ color: 'var(--primary)' }} /> Actualizado: {guide.updatedAt}
              </span>
              <button 
                onClick={handleShare}
                aria-label="Compartir artículo"
                style={{
                  background: 'none',
                  border: '1px solid var(--border-light)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-main)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Share2 size={14} /> Compartir
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container" style={{ maxWidth: '1120px', marginTop: '3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'start'
        }} className="guide-layout-grid">
          
          {/* Main Article Body */}
          <main style={{ maxWidth: '760px', width: '100%', margin: '0 auto' }}>
            
            {/* Table of Contents Box (Inline on mobile & desktop) */}
            <nav 
              aria-label="Índice del artículo"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                marginBottom: '3rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)', fontWeight: 800, fontSize: '1.05rem' }}>
                <BookOpen size={20} />
                <span>Índice de Contenidos</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {guide.tableOfContents.map((toc) => (
                  <li key={toc.id}>
                    <button
                      onClick={() => scrollToSection(toc.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '0.2rem 0',
                        textAlign: 'left',
                        color: activeHeading === toc.id ? 'var(--primary)' : 'var(--text-main)',
                        fontWeight: activeHeading === toc.id ? 700 : 500,
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      <ChevronRight size={14} style={{ color: activeHeading === toc.id ? 'var(--primary)' : 'var(--text-muted)' }} />
                      <span>{toc.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Content Sections */}
            <div className="article-body" style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.8 }}>
              {guide.sections.map((section) => (
                <section key={section.id} id={section.id} style={{ marginBottom: '3.5rem', scrollMarginTop: '100px' }}>
                  
                  <h2 style={{
                    fontSize: 'clamp(1.45rem, 3.5vw, 1.85rem)',
                    fontWeight: 800,
                    lineHeight: 1.3,
                    color: 'var(--text-main)',
                    marginBottom: '1.2rem',
                    paddingBottom: '0.5rem',
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
                            style={{ marginBottom: '1.15rem' }}
                            dangerouslySetInnerHTML={{ __html: formatted }} 
                          />
                        );
                      })}
                    </div>
                  )}

                  {/* Bullet list if present */}
                  {section.bullets && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {section.bullets.map((bullet, bIdx) => {
                        const formatted = bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        return (
                          <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.98rem' }}>
                            <CheckCircle2 size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '4px' }} />
                            <div dangerouslySetInnerHTML={{ __html: formatted }} />
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {/* Callout Box if present */}
                  {section.callout && (
                    <div style={{
                      margin: '1.75rem 0',
                      padding: '1.25rem 1.5rem',
                      borderRadius: 'var(--radius-md)',
                      background: section.callout.type === 'tip' ? 'rgba(76, 175, 79, 0.08)' : 'rgba(255, 152, 0, 0.08)',
                      borderLeft: `4px solid ${section.callout.type === 'tip' ? 'var(--primary)' : '#ff9800'}`,
                      color: 'var(--text-main)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '0.4rem', color: section.callout.type === 'tip' ? 'var(--primary)' : '#e65100' }}>
                        {section.callout.type === 'tip' ? <Sparkles size={18} /> : <AlertCircle size={18} />}
                        <span>{section.callout.title}</span>
                      </div>
                      <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>{section.callout.text}</p>
                    </div>
                  )}

                  {/* Data Table if present */}
                  {section.table && (
                    <div style={{ margin: '1.75rem 0', overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ background: 'var(--bg-card)', borderBottom: '2px solid var(--border-color)' }}>
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx} style={{ padding: '0.85rem 1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} style={{ borderBottom: '1px solid var(--border-light)', background: rIdx % 2 === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.015)' }}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} style={{ padding: '0.85rem 1.1rem', color: cIdx === 0 ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: cIdx === 0 ? 600 : 400 }}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                </section>
              ))}
            </div>

            {/* Interactive Free Audit Banner inside article */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(76, 175, 79, 0.12) 0%, rgba(30, 77, 43, 0.08) 100%)',
              border: '1px solid rgba(76, 175, 79, 0.35)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              margin: '3.5rem 0',
              textAlign: 'center'
            }}>
              <Zap size={32} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                ¿Quieres saber cuánto puedes ahorrar con tu factura actual?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '580px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                En <strong>tuLuz</strong> analizamos tu factura de electricidad o gas sin ningún compromiso. Comparamos más de 50 comercializadoras y te decimos cuál es tu opción más rentable.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => onOpenModal({ clientType: 'particular' })}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>Solicitar Estudio Gratuito</span>
                  <ArrowRight size={18} />
                </button>
                <a 
                  href={`tel:${companyInfo.phoneRaw}`}
                  className="btn btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Phone size={17} style={{ color: 'var(--primary)' }} />
                  <span>{companyInfo.phone}</span>
                </a>
              </div>
            </div>

            {/* Frequently Asked Questions Section (FAQPage Schema target) */}
            <section id="preguntas-frecuentes" style={{ marginBottom: '4rem', scrollMarginTop: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <HelpCircle size={24} style={{ color: 'var(--primary)' }} />
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Preguntas Frecuentes
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
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
                          padding: '1.1rem 1.3rem',
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          cursor: 'pointer',
                          color: 'var(--text-main)',
                          fontWeight: 700,
                          fontSize: '1.02rem'
                        }}
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} /> : <ChevronDown size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
                      </button>

                      {isOpen && (
                        <div style={{
                          padding: '0 1.3rem 1.25rem',
                          color: 'var(--text-muted)',
                          fontSize: '0.96rem',
                          lineHeight: 1.65,
                          borderTop: '1px solid var(--border-light)',
                          paddingTop: '0.85rem'
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
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              marginBottom: '3.5rem',
              flexWrap: 'wrap'
            }}>
              <img 
                src={guide.author.avatar} 
                alt={guide.author.name}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'contain', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }} 
              />
              <div style={{ flex: 1, minWidth: '220px' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  Artículo redactado y revisado por {guide.author.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {guide.author.role}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                  En tuLuz analizamos mensualmente miles de facturas y el mercado mayorista diario para ofrecer a familias, pymes y comunidades información veraz, sin letra pequeña.
                </p>
              </div>
            </div>

            {/* Related Guides / Cross Linking */}
            {relatedGuides.length > 0 && (
              <section style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                  Guías Relacionadas de Ahorro
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {relatedGuides.map((rel) => (
                    <div 
                      key={rel.id}
                      onClick={() => navigate(`/guias/${rel.slug}`)}
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.25rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      className="guide-card"
                    >
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                        {rel.category}
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.5rem 0', color: 'var(--text-main)', lineHeight: 1.35 }}>
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
                  padding: '0.75rem 1.5rem',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.92rem',
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
          <aside className="desktop-guide-sidebar" style={{ display: 'none', position: 'sticky', top: '100px' }}>
            
            {/* Quick Contact & Free Audit Box */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '1.5rem'
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

          </aside>

        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .guide-layout-grid {
            grid-template-columns: 1fr 310px !important;
          }
          .desktop-guide-sidebar {
            display: block !important;
          }
        }
      `}</style>

    </article>
  );
}
