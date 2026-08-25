import React, { useState } from 'react';
import { Calculator, Zap, TrendingDown, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SavingsCalculator({ onOpenModal }) {
  const [monthlyBill, setMonthlyBill] = useState(140);
  const [clientType, setClientType] = useState('particular');

  // Savings calculation heuristics
  const savingsPercentages = {
    particular: 0.32,
    empresa: 0.38,
    comunidad: 0.29
  };

  const currentRate = savingsPercentages[clientType] || 0.32;
  const monthlySavings = Math.round(monthlyBill * currentRate);
  const annualSavings = monthlySavings * 12;

  return (
    <div className="glass-card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(247, 209, 0, 0.25) 0%, transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }} className="calc-grid">
        
        {/* Controls Column */}
        <div>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            <Calculator size={16} />
            <span>Simulador de Ahorro Eléctrico</span>
          </div>

          <h3 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>
            Descubre cuánto puedes <span className="text-gradient">ahorrar hoy mismo</span>
          </h3>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
            Selecciona tu perfil y ajusta tu consumo mensual aproximado para ver la estimación de reducción en tu factura.
          </p>

          {/* Client Type Selector */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', background: 'var(--bg-main)', padding: '0.3rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)' }}>
            {[
              { id: 'particular', label: 'Particular' },
              { id: 'empresa', label: 'Empresa' },
              { id: 'comunidad', label: 'Comunidad' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setClientType(type.id)}
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: clientType === type.id ? 700 : 500,
                  color: clientType === type.id ? '#ffffff' : 'var(--text-muted)',
                  background: clientType === type.id ? 'var(--primary)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Range Input Slider */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-muted)' }}>Factura mensual estimada:</span>
              <span style={{ fontSize: '1.4rem', color: 'var(--accent-green)', fontWeight: 800 }}>{monthlyBill} €/mes</span>
            </div>

            <input 
              type="range" 
              min="30" 
              max="2000" 
              step="10"
              value={monthlyBill} 
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                outline: 'none',
                accentColor: 'var(--accent-green)',
                cursor: 'pointer'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.3rem' }}>
              <span>30 €</span>
              <span>500 €</span>
              <span>1.000 €</span>
              <span>+2.000 €</span>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={16} style={{ color: 'var(--accent-green)' }} /> 0€ Coste de servicio
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--accent-green)' }} /> Sin permanente
            </span>
          </div>

        </div>

        {/* Results Visual Box */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 97, 0, 0.08) 0%, rgba(16, 185, 129, 0.15) 100%)',
          borderRadius: 'var(--radius-md)',
          padding: '2rem',
          border: '1.5px solid var(--border-glow)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-glow)'
        }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(247, 209, 0, 0.2)', color: '#d97706', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <Zap size={16} /> Ahorro Estimado Hasta un {Math.round(currentRate * 100)}%
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Ahorro Anual Estimado
            </span>
            <span style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }} className="text-gradient">
              {annualSavings.toLocaleString()} €
            </span>
            <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--accent-green)', fontWeight: 600, marginTop: '0.3rem' }}>
              (~{monthlySavings} € / mes de descuento directo)
            </span>
          </div>

          {/* Progress bar visual */}
          <div style={{ background: 'var(--bg-main)', borderRadius: 'var(--radius-full)', height: '12px', padding: '2px', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
            <div style={{
              width: `${Math.round(currentRate * 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent-green) 0%, var(--energy-gold) 100%)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.4s ease'
            }} />
          </div>

          <button 
            onClick={() => onOpenModal({ monthlyBill, clientType, annualSavings })}
            className="btn btn-gold"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <span>Obtener Estudio Personalizado Gratuito</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>

      <style>{`
        @media (min-width: 900px) {
          .calc-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
