import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data/content';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  };

  return (
    <div style={{ maxW: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Schema.org FAQPage Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div 
            key={index}
            className="glass-card"
            style={{ 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden',
              borderColor: isOpen ? 'var(--border-glow)' : 'var(--border-light)'
            }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--text-main)'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <HelpCircle size={20} style={{ color: isOpen ? 'var(--accent-green)' : 'var(--text-muted)', flexShrink: 0 }} />
                {faq.q}
              </span>
              <ChevronDown 
                size={20} 
                style={{ 
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  color: 'var(--text-muted)',
                  flexShrink: 0
                }} 
              />
            </button>

            {isOpen && (
              <div style={{
                padding: '0 1.5rem 1.25rem 3.1rem',
                color: 'var(--text-muted)',
                fontSize: '0.94rem',
                lineHeight: 1.6,
                borderTop: '1px solid var(--border-light)',
                paddingTop: '1rem',
                animation: 'fadeIn 0.3s ease'
              }}>
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

