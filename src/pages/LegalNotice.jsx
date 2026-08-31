import React from 'react';
import { companyInfo } from '../data/content';
import { FileText, Scale } from 'lucide-react';

export default function LegalNotice() {
  return (
    <div className="section" style={{ paddingTop: '3.5rem' }}>
      <div className="container" style={{ maxW: '850px' }}>
        
        <div className="glass-card" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            <Scale size={16} />
            <span>Información Legal Regulada</span>
          </div>

          <h1 style={{ fontSize: '2.4rem', marginBottom: '1.5rem' }}>Aviso Legal</h1>

          <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se exponen a continuación los datos identificativos del titular del sitio web:
            </p>

            <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-main)', fontWeight: 500 }}>
                <li><strong>Denominación comercial:</strong> {companyInfo.name}</li>
                <li><strong>Domicilio social:</strong> {companyInfo.address}</li>
                <li><strong>Teléfono de contacto:</strong> {companyInfo.phone}</li>
                <li><strong>Correo electrónico:</strong> {companyInfo.email}</li>
                <li><strong>Actividad principal:</strong> Asesoría energética independiente y optimización de suministros de electricidad y gas.</li>
              </ul>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginTop: '1rem' }}>1. Propiedad Intelectual e Industrial</h3>
            <p>
              Todos los contenidos de este sitio web, incluyendo textos, diseños gráficos, código fuente, logotipos, marcas y estructura de navegación son propiedad titular de {companyInfo.name} o se dispone de la correspondiente licencia de uso. Queda prohibida cualquier reproducción total o parcial sin autorización explícita.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginTop: '1rem' }}>2. Exención de Responsabilidad</h3>
            <p>
              {companyInfo.name} realiza estudios comparativos objetivos basados en las facturas de luz aportadas por los usuarios y las tarifas públicas u homologadas por las más de 50 comercializadoras con las que colabora. Las variaciones tarifarias o decisiones de contratación son reguladas directamente por las comercializadoras firmantes finales.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginTop: '1rem' }}>3. Legislación Aplicable</h3>
            <p>
              El presente aviso legal se rige en todos y cada uno de sus extremos por la legislación española y el Reglamento General de Protección de Datos (RGPD) de la Unión Europea.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
