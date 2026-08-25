import React from 'react';
import { companyInfo } from '../data/content';
import { ShieldCheck, Lock } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="section" style={{ paddingTop: '3.5rem' }}>
      <div className="container" style={{ maxW: '850px' }}>
        
        <div className="glass-card" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            <Lock size={16} />
            <span>Protección de Datos Garantizada</span>
          </div>

          <h1 style={{ fontSize: '2.4rem', marginBottom: '1.5rem' }}>Política de Privacidad</h1>

          <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <p>
              En {companyInfo.name} nos tomamos muy en serio la protección y privacidad de tus datos personales. Conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), te informamos detalladamente sobre cómo tratamos la información facilitada.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>1. Responsables del Tratamiento</h3>
            <p>
              El responsable del tratamiento de tus datos es <strong>{companyInfo.name}</strong> con domicilio en {companyInfo.address} y correo de contacto <strong>{companyInfo.email}</strong>.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>2. Finalidad del Tratamiento</h3>
            <p>
              Los datos personales solicitados (nombre, teléfono, correo electrónico y copia opcional de factura de luz) son procesados con las siguientes finalidades exclusivamente:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Realización del estudio comparativo de ahorro energético 100% gratuito.</li>
              <li>Contacto directo telefónico o por e-mail para presentar el informe de tarifas optimizadas.</li>
              <li>Gestión de la tramitación de cambio de compañía o ajuste de potencia en caso de solicitarlo el usuario.</li>
            </ul>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>3. Legitimación</h3>
            <p>
              La base legal para el tratamiento de tus datos es el consentimiento explícito prestado al marcar la casilla de aceptación en nuestros formularios.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>4. Derechos del Usuario</h3>
            <p>
              Tienes derecho a acceder, rectificar, suprimir, limitar el tratamiento u oponerte al tratamiento de tus datos enviando un correo electrónico a <strong>{companyInfo.email}</strong> junto con copia de tu documento de identidad.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
