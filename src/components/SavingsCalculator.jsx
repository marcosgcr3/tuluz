import React, { useState } from 'react';
import { Calculator, Zap, TrendingDown, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SavingsCalculator({ onOpenModal }) {
  const [monthlyBill, setMonthlyBill] = useState(140);
  const [clientType, setClientType] = useState('particular');

  // Savings calculation heuristics
  const savingsPercentages = {
    particular: 0.32,
    empresa: 0.38,
    comunidad: 0.29,
    autoconsumo: 0.72
  };

  const currentRate = savingsPercentages[clientType] || 0.32;
  const monthlySavings = Math.round(monthlyBill * currentRate);
  const annualSavings = monthlySavings * 12;

  return (
    <div className="glass-card savings-calc-card" style={{ padding: 'clamp(1rem, 3.5vw, 2.25rem)', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
      
      {/* Decorative Glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255, 193, 7, 0.22) 0%, transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.75rem', alignItems: 'center' }} className="calc-grid">
        
        {/* Controls Column */}
        <div style={{ minWidth: 0, width: '100%' }}>
          <div className="badge" style={{ marginBottom: '0.85rem' }}>
            <Calculator size={15} />
            <span>Simulador de Ahorro Energético</span>
          </div>

          <h3 style={{ fontSize: 'clamp(1.3rem, 4.2vw, 1.85rem)', marginBottom: '0.6rem', lineHeight: 1.25 }}>
            Descubre cuánto puedes <span className="text-gradient">ahorrar hoy mismo</span>
          </h3>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Selecciona tu perfil y ajusta tu gasto mensual aproximado en luz y/o gas para ver la estimación de ahorro.
          </p>

          {/* Client Type Selector Responsive Grid */}
          <div className="calc-selector-container">
            {[
              { id: 'particular', label: 'Particular' },
              { id: 'empresa', label: 'Empresa' },
              { id: 'comunidad', label: 'Comunidad' },
              { id: 'autoconsumo', label: 'Autoconsumo' }
            ].map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => setClientType(type.id)}
                className={`calc-type-btn ${clientType === type.id ? 'active' : ''}`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Range Input Slider */}
          <div style={{ marginBottom: '1.25rem', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.5rem', fontWeight: 600 }}>
              <label htmlFor="calculator-monthly-bill" style={{ color: 'var(--text-muted)', fontSize: '0.88rem', cursor: 'pointer' }}>
                Factura mensual:
              </label>
              <span style={{ fontSize: 'clamp(1.15rem, 3.8vw, 1.45rem)', color: 'var(--primary)', fontWeight: 800 }}>{monthlyBill} €/mes</span>
            </div>

            <input 
              id="calculator-monthly-bill"
              name="monthlyBill"
              aria-label="Factura mensual estimada en euros"
              type="range" 
              min="30" 
              max="2000" 
              step="10"
              value={monthlyBill} 
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              style={{
                width: '100%',
                height: '10px',
                borderRadius: '5px',
                outline: 'none',
                accentColor: 'var(--primary)',
                cursor: 'pointer'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
              <span>30 €</span>
              <span>500 €</span>
              <span>1.000 €</span>
              <span>+2.000 €</span>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div style={{ display: 'flex', gap: '0.65rem 1rem', flexWrap: 'wrap', fontSize: '0.80rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={15} style={{ color: 'var(--primary)' }} /> 0€ Coste de servicio
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--primary)' }} /> Sin permanencia
            </span>
          </div>

        </div>

        {/* Results Visual Box */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(76, 175, 79, 0.08) 0%, rgba(139, 195, 74, 0.15) 100%)',
          borderRadius: 'var(--radius-md)',
          padding: 'clamp(1.1rem, 3.2vw, 1.85rem)',
          border: '1.5px solid var(--border-glow)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-glow)',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255, 193, 7, 0.2)', color: '#d97706', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.78rem', marginBottom: '1rem' }}>
            <Zap size={14} /> Ahorro Estimado Hasta un {Math.round(currentRate * 100)}%
          </div>

          <div style={{ marginBottom: '1.1rem' }}>
            <span style={{ display: 'block', fontSize: '0.80rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Ahorro Anual Estimado
            </span>
            <span style={{ fontSize: 'clamp(2.1rem, 6.8vw, 3.2rem)', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1 }} className="text-gradient">
              {annualSavings.toLocaleString()} €
            </span>
            <span style={{ display: 'block', fontSize: '0.84rem', color: 'var(--primary)', fontWeight: 600, marginTop: '0.25rem' }}>
              (~{monthlySavings} € / mes de descuento directo)
            </span>
          </div>

          {/* Progress bar visual */}
          <div style={{ background: 'var(--bg-main)', borderRadius: 'var(--radius-full)', height: '9px', padding: '2px', marginBottom: '1.15rem', border: '1px solid var(--border-light)' }}>
            <div style={{
              width: `${Math.round(currentRate * 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--primary) 0%, var(--energy-gold) 100%)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.4s ease'
            }} />
          </div>

          <button 
            type="button"
            onClick={() => onOpenModal({ monthlyBill, clientType, annualSavings })}
            className="btn btn-gold"
            style={{ width: '100%', justifyContent: 'center', padding: '0.8rem 1rem', fontSize: 'clamp(0.85rem, 2.4vw, 0.96rem)' }}
          >
            <span>Obtener Estudio Personalizado</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

      <style>{`
        .calc-selector-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.25rem;
          margin-bottom: 1.25rem;
          background: var(--bg-main);
          padding: 0.25rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          width: 100%;
          box-sizing: border-box;
        }
        .calc-type-btn {
          padding: 0.5rem 0.25rem;
          border-radius: var(--radius-full);
          font-size: clamp(0.74rem, 2.2vw, 0.86rem);
          font-weight: 500;
          color: var(--text-muted);
          background: transparent;
          transition: all 0.2s ease;
          min-height: 36px;
          text-align: center;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .calc-type-btn.active {
          font-weight: 700;
          color: #ffffff !important;
          background: var(--primary) !important;
          box-shadow: 0 2px 8px rgba(76, 175, 79, 0.35);
        }
        @media (max-width: 500px) {
          .calc-selector-container {
            grid-template-columns: repeat(2, 1fr) !important;
            border-radius: var(--radius-md) !important;
            gap: 0.3rem !important;
            padding: 0.3rem !important;
          }
          .calc-type-btn {
            border-radius: var(--radius-sm) !important;
            min-height: 38px !important;
            font-size: 0.84rem !important;
          }
          .savings-calc-card {
            padding: 1rem 0.9rem !important;
          }
        }
        @media (min-width: 860px) {
          .calc-grid { grid-template-columns: 1fr 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </div>
  );
}
