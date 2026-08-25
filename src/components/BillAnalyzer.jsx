import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function BillAnalyzer({ onOpenModal, clientType = 'particular' }) {
  const [fileName, setFileName] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file.name);
    }
  };

  const processFile = (name) => {
    setFileName(name);
    setIsAnalyzing(true);
    setAnalyzed(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 1800);
  };

  return (
    <div className="glass-card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', position: 'relative' }}>
      
      <div className="badge" style={{ marginBottom: '1rem', background: 'rgba(247, 209, 0, 0.15)', color: '#d97706', borderColor: 'rgba(247, 209, 0, 0.3)' }}>
        <Sparkles size={16} />
        <span>Subida e Inspección Gratuita</span>
      </div>

      <h3 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>
        ¿Tienes tu factura a mano? <span className="text-gradient">Analízala gratis</span>
      </h3>

      <p style={{ color: 'var(--text-muted)', maxW: '600px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
        Arrastra tu última factura de luz en formato PDF o fotografía. Nuestro equipo examinará tu tarifa y consumo en menos de 24 horas.
      </p>

      {/* Dropzone Area */}
      <div 
        style={{
          border: '2px dashed var(--border-glow)',
          borderRadius: 'var(--radius-md)',
          padding: '2.5rem 1.5rem',
          background: 'var(--bg-main)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0].name);
          }
        }}
      >
        <input 
          type="file" 
          accept=".pdf,image/*" 
          onChange={handleFileChange}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
        />

        {!fileName && !isAnalyzing && !analyzed && (
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.1)',
              color: 'var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <UploadCloud size={32} />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Haz clic o arrastra tu factura aquí</h4>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Soporta PDF, JPG, PNG (máx. 15MB)</span>
          </div>
        )}

        {isAnalyzing && (
          <div>
            <div className="animate-float" style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(247, 209, 0, 0.15)',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <Sparkles size={32} />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Analizando factura: {fileName}...</h4>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-green)' }}>Verificando comercializadora, peajes y término de potencia</span>
          </div>
        )}

        {analyzed && (
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <CheckCircle size={32} />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: 'var(--accent-green)' }}>
              ¡Factura "{fileName}" lista para informe!
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Factura pre-procesada con éxito. Envíanos tus datos de contacto para remitirte el dictamen de ahorro completo.
            </p>
            <button 
              onClick={() => onOpenModal({ uploadedFile: fileName, clientType })}
              className="btn btn-primary" 
              style={{ padding: '0.6rem 1.4rem' }}
            >
              <span>Completar Solicitud de Estudio</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Shield size={16} style={{ color: 'var(--accent-green)' }} /> Máxima confidencialidad de datos
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <FileText size={16} style={{ color: 'var(--accent-green)' }} /> Informe 100% gratuito sin compromiso
        </span>
      </div>

    </div>
  );
}
