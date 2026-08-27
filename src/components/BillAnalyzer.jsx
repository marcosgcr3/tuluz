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
    }, 1600);
  };

  return (
    <div className="glass-card" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)', borderRadius: 'var(--radius-lg)', textAlign: 'center', position: 'relative' }}>
      
      <div className="badge" style={{ marginBottom: '0.85rem', background: 'rgba(255, 193, 7, 0.15)', color: '#d97706', borderColor: 'rgba(255, 193, 7, 0.3)' }}>
        <Sparkles size={15} />
        <span>Subida e Inspección Gratuita de Luz y Gas</span>
      </div>

      <h3 style={{ fontSize: 'clamp(1.35rem, 4.5vw, 1.85rem)', marginBottom: '0.6rem' }}>
        ¿Tienes tu factura a mano? <span className="text-gradient">Analízala gratis</span>
      </h3>

      <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 1.5rem auto', fontSize: '0.92rem', lineHeight: 1.5 }}>
        Arrastra tu última factura de luz o gas en formato PDF o fotografía. Nuestro equipo examinará tu tarifa y consumo en menos de 24 horas.
      </p>

      {/* Dropzone Area */}
      <div 
        style={{
          border: '2px dashed var(--border-glow)',
          borderRadius: 'var(--radius-md)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem) 1rem',
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
          id="bill-file-upload"
          name="billFile"
          aria-label="Adjuntar factura de electricidad o gas"
          type="file" 
          accept=".pdf,image/*" 
          onChange={handleFileChange}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%', zIndex: 5 }}
        />

        {!fileName && !isAnalyzing && !analyzed && (
          <div>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(76, 175, 79, 0.12)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.85rem auto'
            }}>
              <UploadCloud size={28} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Toca aquí para adjuntar tu factura de luz o gas</h4>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>Soporta PDF, fotos JPG/PNG (máx. 15MB)</span>
          </div>
        )}

        {isAnalyzing && (
          <div>
            <div className="animate-float" style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(255, 193, 7, 0.18)',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.85rem auto'
            }}>
              <Sparkles size={28} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Analizando factura: {fileName}...</h4>
            <span style={{ fontSize: '0.82rem', color: 'var(--primary)' }}>Verificando comercializadora, peajes, potencias y tramos</span>
          </div>
        )}

        {analyzed && (
          <div>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(76, 175, 79, 0.15)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.85rem auto'
            }}>
              <CheckCircle size={30} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem', color: 'var(--primary)' }}>
              ¡Factura "{fileName}" lista para informe!
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem', maxWidth: '450px', margin: '0 auto 1rem auto' }}>
              Factura pre-procesada con éxito. Envíanos tus datos de contacto para remitirte el dictamen de ahorro completo.
            </p>
            <button 
              onClick={() => onOpenModal({ uploadedFile: fileName, clientType })}
              className="btn btn-primary" 
              style={{ padding: '0.65rem 1.4rem' }}
            >
              <span>Completar Solicitud de Estudio</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem 1.75rem', flexWrap: 'wrap', marginTop: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Shield size={15} style={{ color: 'var(--primary)' }} /> Máxima confidencialidad de datos
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <FileText size={15} style={{ color: 'var(--primary)' }} /> Informe 100% gratuito sin compromiso
        </span>
      </div>

    </div>
  );
}
