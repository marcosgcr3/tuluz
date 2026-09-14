import fs from 'fs';
import path from 'path';
import http from 'http';
import os from 'os';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Read logo and encode to base64
const logoPath = path.join(rootDir, 'public', 'logo.png');
let logoBase64 = '';
if (fs.existsSync(logoPath)) {
  logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`;
}

// 2. Generate HTML with executive styling, crisp diagrams and in-depth Google Ads strategy
const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Brief Estratégico Integral | tuLuz Asesoramiento Energético</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 13mm 14mm 13mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1e293b;
      background-color: #ffffff;
      line-height: 1.48;
      font-size: 11.5px;
      -webkit-font-smoothing: antialiased;
    }

    .page-break {
      page-break-before: always;
      break-before: page;
    }
    .avoid-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Header */
    .doc-header {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 12px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .brand-col {
      max-width: 62%;
    }

    .brand-logo {
      height: 38px;
      object-fit: contain;
      margin-bottom: 6px;
    }

    .doc-badge {
      display: inline-block;
      background: #e8f5e9;
      color: #1b5e20;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding: 2px 7px;
      border-radius: 4px;
      border: 1px solid #c8e6c9;
      margin-bottom: 5px;
    }

    .doc-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.2;
      margin-bottom: 2px;
      letter-spacing: -0.3px;
    }

    .doc-subtitle {
      font-size: 11px;
      color: #475569;
      font-weight: 400;
    }

    .doc-meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 7px;
      padding: 7px 11px;
      text-align: right;
      font-size: 9.5px;
      color: #64748b;
      min-width: 155px;
    }

    .doc-meta-box strong { color: #1e293b; }
    .meta-row { margin-bottom: 2px; }
    .meta-row:last-child { margin-bottom: 0; }

    /* Sections */
    .section-block {
      margin-bottom: 16px;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1.5px solid #4CAF4F;
      padding-bottom: 4px;
      margin-bottom: 10px;
    }

    .section-num {
      background: #4CAF4F;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }

    .section-title {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.2px;
    }

    .sub-title {
      font-size: 12px;
      font-weight: 700;
      color: #0f172a;
      margin: 10px 0 6px 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    p {
      margin-bottom: 7px;
      color: #334155;
    }

    /* Quotes */
    .quote-box {
      background: #f0fdf4;
      border-left: 3.5px solid #4CAF4F;
      padding: 8px 12px;
      border-radius: 0 6px 6px 0;
      margin: 8px 0 10px 0;
      font-style: italic;
      color: #166534;
      font-size: 11.5px;
      font-weight: 500;
    }

    .quote-title {
      font-style: normal;
      font-weight: 700;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #15803d;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Tables */
    .custom-table-wrapper {
      margin: 8px 0 12px 0;
      border: 1px solid #e2e8f0;
      border-radius: 7px;
      overflow: hidden;
      break-inside: avoid;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5px;
      text-align: left;
    }

    th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 600;
      padding: 7px 9px;
      letter-spacing: 0.2px;
      border: none;
    }

    td {
      padding: 7px 9px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
      vertical-align: top;
    }

    tr:nth-child(even) td { background: #f8fafc; }
    tr:last-child td { border-bottom: none; }
    td strong { color: #0f172a; font-weight: 600; }

    /* Diagram containers */
    .diagram-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 9px;
      padding: 11px;
      margin: 8px 0 11px 0;
      break-inside: avoid;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }

    .diagram-caption {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #166534;
      margin-bottom: 9px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    /* Flow Pipeline (Diag 1) */
    .flow-pipeline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4px;
    }

    .flow-step {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 7px 4px;
      text-align: center;
      min-height: 68px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2px;
    }

    .flow-step.highlight { background: #f0fdf4; border-color: #86efac; }
    .flow-step.active-final { background: #4CAF4F; border-color: #2e7d32; color: #ffffff; }
    .flow-step .step-icon { font-size: 13px; }
    .flow-step .step-title { font-size: 9.5px; font-weight: 700; line-height: 1.2; color: #0f172a; }
    .flow-step.active-final .step-title { color: #ffffff; }
    .flow-step .step-desc { font-size: 8px; color: #64748b; line-height: 1.15; }
    .flow-step.active-final .step-desc { color: #e8f5e9; }
    .flow-arrow { color: #4CAF4F; font-size: 13px; font-weight: 900; }

    /* Audience Tree (Diag 2) */
    .tree-wrapper { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .tree-root { background: #4CAF4F; color: white; font-weight: 700; font-size: 10.5px; padding: 4px 14px; border-radius: 14px; display: flex; align-items: center; gap: 4px; }
    .tree-columns { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; width: 100%; }
    .tree-col { background: #f8fafc; border: 1px solid #e2e8f0; border-top: 3px solid #4CAF4F; border-radius: 6px; padding: 7px; }
    .tree-col.col-2 { border-top-color: #0284c7; }
    .tree-col.col-3 { border-top-color: #8b5cf6; }
    .tree-col.col-4 { border-top-color: #f59e0b; }
    .tree-col-title { font-size: 10px; font-weight: 700; color: #0f172a; margin-bottom: 5px; display: flex; align-items: center; gap: 4px; }
    .tree-bullet { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 3px 5px; font-size: 8.5px; color: #334155; margin-bottom: 3px; line-height: 1.2; }
    .tree-bullet:last-child { margin-bottom: 0; }

    /* Funnel (Diag 3) */
    .funnel-wrapper { display: flex; flex-direction: column; gap: 6px; }
    .funnel-layer { border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 10px; }
    .layer-1 { background: #f8fafc; }
    .layer-2 { background: #f0fdf4; border-color: #bbf7d0; }
    .layer-3 { background: #f8fafc; }
    .layer-title { font-size: 9px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 5px; }
    .layer-items { display: flex; gap: 5px; justify-content: space-between; }
    .funnel-card { flex: 1; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 5px; padding: 5px; text-align: center; }
    .funnel-card .f-title { font-size: 9.5px; font-weight: 700; color: #0f172a; }
    .funnel-card .f-desc { font-size: 8px; color: #64748b; }
    .layer-divider { text-align: center; color: #15803d; font-weight: 800; font-size: 8.5px; letter-spacing: 0.3px; }

    /* Sequence SOP (Diag 4) */
    .sop-seq-container { display: flex; flex-direction: column; gap: 5px; }
    .sop-actors { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 3px; }
    .sop-actor-pill { background: #0f172a; color: white; font-size: 9px; font-weight: 700; padding: 4px; border-radius: 4px; text-align: center; }
    .sop-actor-pill.advisor { background: #4CAF4F; }
    .sop-step-row { display: flex; align-items: center; gap: 5px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 4px 7px; font-size: 9px; }
    .sop-num { width: 16px; height: 16px; background: #4CAF4F; color: white; font-size: 8.5px; font-weight: 800; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .sop-from { font-weight: 700; color: #0f172a; min-width: 85px; }
    .sop-arrow-tag { color: #4CAF4F; font-weight: 900; font-size: 10px; }
    .sop-to { font-weight: 700; color: #0f172a; min-width: 85px; }
    .sop-action { color: #334155; flex: 1; }
    .sop-highlight-row { background: #fefce8; border: 1px solid #fef08a; color: #854d0e; font-weight: 600; font-size: 9px; padding: 4px 8px; border-radius: 4px; display: flex; align-items: center; gap: 5px; }

    /* Audience Cards */
    .cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin: 8px 0; break-inside: avoid; }
    .audience-card { background: #f8fafc; border: 1px solid #e2e8f0; border-top: 3px solid #4CAF4F; border-radius: 6px; padding: 8px 10px; display: flex; flex-direction: column; gap: 5px; }
    .audience-card.solar { border-top-color: #f59e0b; }
    .audience-card.empresa { border-top-color: #0284c7; }
    .audience-card.comunidad { border-top-color: #8b5cf6; }
    .card-header { font-size: 11px; font-weight: 700; color: #0f172a; }
    .pill-item { font-size: 9.5px; line-height: 1.3; padding: 3px 6px; border-radius: 4px; }
    .pill-dolor { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
    .pill-propuesta { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .pill-msg { background: #ffffff; border: 1px dashed #cbd5e1; color: #334155; font-style: italic; }

    /* Google Ads Special Box */
    .gads-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3.5px solid #2563eb;
      border-radius: 0 7px 7px 0;
      padding: 8px 12px;
      margin-bottom: 8px;
    }

    .gads-box h5 {
      font-size: 10.5px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .gads-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      margin-top: 6px;
    }

    .gads-mini-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 6px 8px;
      font-size: 9px;
    }

    .channel-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px 10px;
      margin-bottom: 6px;
      break-inside: avoid;
    }

    .channel-title {
      font-size: 10.5px;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 3px;
    }

    .channel-badge {
      font-size: 8px;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 3px;
      text-transform: uppercase;
    }

    .badge-google { background: #fee2e2; color: #b91c1c; }
    .badge-meta { background: #e0e7ff; color: #3730a3; }
    .badge-tiktok { background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; }

    ul.bullet-list {
      list-style-type: none;
      padding-left: 0;
      font-size: 10px;
      color: #334155;
    }

    ul.bullet-list li {
      position: relative;
      padding-left: 11px;
      margin-bottom: 2.5px;
      line-height: 1.3;
    }

    ul.bullet-list li::before {
      content: "•";
      color: #4CAF4F;
      font-weight: bold;
      font-size: 11px;
      position: absolute;
      left: 1px;
      top: -1px;
    }

    /* Golden rules */
    .rules-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; margin: 8px 0 10px 0; break-inside: avoid; }
    .rule-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; }
    .rule-num { width: 18px; height: 18px; background: #10b981; color: white; font-weight: 800; font-size: 9.5px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 4px; }
    .rule-card h5 { font-size: 10px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
    .rule-card p { font-size: 9px; color: #475569; margin: 0; line-height: 1.3; }

    /* Roadmap */
    .timeline-container { margin: 8px 0; display: flex; flex-direction: column; gap: 7px; break-inside: avoid; }
    .phase-card { background: #ffffff; border: 1px solid #e2e8f0; border-left: 3.5px solid #4CAF4F; border-radius: 0 6px 6px 0; padding: 7px 11px; }
    .phase-card.p2 { border-left-color: #0284c7; }
    .phase-card.p3 { border-left-color: #8b5cf6; }
    .phase-title { font-size: 10.5px; font-weight: 700; color: #0f172a; margin-bottom: 3px; display: flex; align-items: center; justify-content: space-between; }
    .phase-tag { font-size: 8.5px; font-weight: 600; color: #64748b; background: #f1f5f9; padding: 1px 5px; border-radius: 3px; }

    .code-tag {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 9px;
      background: #f1f5f9;
      color: #0f172a;
      padding: 1px 4px;
      border-radius: 3px;
      border: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>

  <!-- ==================== PÁGINA 1 ==================== -->
  <header class="doc-header">
    <div class="brand-col">
      ${logoBase64 ? `<img src="${logoBase64}" alt="tuLuz" class="brand-logo" />` : `<div style="font-size:20px;font-weight:800;color:#4CAF4F;margin-bottom:4px;">tuLuz</div>`}
      <div class="doc-badge">Documento Estratégico Integral • Uso Corporativo</div>
      <h1 class="doc-title">Brief Estratégico Integral</h1>
      <div class="doc-subtitle">tuLuz Asesoramiento Energético — Modelo de Negocio, Adquisición Digital y Operaciones</div>
    </div>
    <div class="doc-meta-box">
      <div class="meta-row"><strong>Ámbito:</strong> Nacional (España)</div>
      <div class="meta-row"><strong>Sede:</strong> Córdoba, España</div>
      <div class="meta-row"><strong>Portal Web:</strong> tu-luz.es</div>
      <div class="meta-row"><strong>Fecha:</strong> Septiembre 2026</div>
      <div class="meta-row"><strong>Versión:</strong> 1.1 (Con Estrategia Google Ads)</div>
    </div>
  </header>

  <!-- SECCIÓN 1: RESUMEN EJECUTIVO -->
  <section class="section-block">
    <div class="section-header">
      <div class="section-num">1</div>
      <h2 class="section-title">Resumen Ejecutivo y Propósito de Marca</h2>
    </div>
    <p>
      <strong>tuLuz</strong> es una consultora y plataforma de asesoramiento energético independiente con sede operativa en Córdoba y cobertura en <strong>toda España</strong>. Su misión es erradicar el sobrecoste sistemático que sufren hogares, negocios y comunidades en sus suministros de electricidad y gas natural, ofreciendo un servicio de auditoría, comparación y tramitación <strong>100% gratuito, transparente y sin permanencia</strong>.
    </p>

    <div class="quote-box">
      <div class="quote-title">⚡ Promesa Central de Marca</div>
      "Claridad, ahorro y un futuro sostenible. Comparamos más de 50 comercializadoras para que pagues exactamente lo justo, sin letra pequeña ni trámites engorrosos."
    </div>

    <!-- DIAGRAMA 1 -->
    <div class="diagram-card avoid-break">
      <div class="diagram-caption">Figura 1.1 — Embudo y Flujo Operativo de Valor tuLuz</div>
      <div class="flow-pipeline">
        <div class="flow-step">
          <span class="step-icon">👤</span>
          <span class="step-title">Usuario Insatisfecho</span>
          <span class="step-desc">Factura con sobrecoste</span>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-step">
          <span class="step-icon">📢</span>
          <span class="step-title">Captación Multicanal</span>
          <span class="step-desc">Google, Meta, TikTok</span>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-step highlight">
          <span class="step-icon">🌐</span>
          <span class="step-title">Landing tu-luz.es</span>
          <span class="step-desc">Modal express</span>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-step">
          <span class="step-icon">🔍</span>
          <span class="step-title">Auditoría Gratuita</span>
          <span class="step-desc">+50 comercializadoras</span>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-step highlight">
          <span class="step-icon">💡</span>
          <span class="step-title">Propuesta de Ahorro</span>
          <span class="step-desc">Hasta 35% luz/gas o 80% solar</span>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-step active-final">
          <span class="step-icon">✅</span>
          <span class="step-title">Cierre sin Cortes</span>
          <span class="step-desc">100% gratuito para el cliente</span>
        </div>
      </div>
    </div>
  </section>

  <!-- SECCIÓN 2: PILARES DE POSICIONAMIENTO -->
  <section class="section-block avoid-break">
    <div class="section-header">
      <div class="section-num">2</div>
      <h2 class="section-title">Pilares de Posicionamiento y Propuesta de Valor</h2>
    </div>

    <div class="custom-table-wrapper">
      <table>
        <thead>
          <tr>
            <th style="width: 25%;">Pilar Estratégico</th>
            <th style="width: 45%;">Definición Operativa</th>
            <th style="width: 30%;">Impacto Percibido por el Cliente</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Independencia Real</strong></td>
            <td>Sin ataduras a oligopolios. Comparativa activa y neutral entre +50 compañías (Endesa, Iberdrola, Naturgy, Repsol, TotalEnergies, Octopus, GNS, etc.).</td>
            <td>Confianza y objetividad absoluta.</td>
          </tr>
          <tr>
            <td><strong>Servicio 100% Gratuito</strong></td>
            <td>El cliente nunca abona honorarios; la remuneración proviene directamente de las comisiones de gestión de las comercializadoras seleccionadas.</td>
            <td>Barrera de entrada 0 (cero riesgo económico).</td>
          </tr>
          <tr>
            <td><strong>Sin Cortes ni Molestias</strong></td>
            <td>Trámite 100% administrativo y digital. El suministro eléctrico o de gas jamás se interrumpe y la empresa distribuidora continúa siendo la misma.</td>
            <td>Tranquilidad operativa y continuidad garantizada.</td>
          </tr>
          <tr>
            <td><strong>Acompañamiento Continuo</strong></td>
            <td>Monitorización recurrente de fin de promociones y renovación automática antes de que las tarifas sufran incrementos automáticos.</td>
            <td>Fidelización a largo plazo y maximización de LTV.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- ==================== PÁGINA 2 ==================== -->
  <div class="page-break"></div>

  <!-- SECCIÓN 3: BUYER PERSONAS -->
  <section class="section-block">
    <div class="section-header">
      <div class="section-num">3</div>
      <h2 class="section-title">Segmentación de Audiencias (Buyer Personas)</h2>
    </div>

    <!-- DIAGRAMA 2 -->
    <div class="diagram-card avoid-break">
      <div class="diagram-caption">Figura 3.1 — Mapa de Cobertura de Segmentos Clave de tuLuz</div>
      <div class="tree-wrapper">
        <div class="tree-root">🎯 Segmentos Estratégicos de tuLuz</div>
        <div class="tree-columns">
          <div class="tree-col col-1">
            <div class="tree-col-title">🏡 Particulares y Hogares</div>
            <div class="tree-bullet">Ahorro directo en factura mensual</div>
            <div class="tree-bullet">Blindaje con tarifas fijas estables</div>
            <div class="tree-bullet">Auditoría sin cambiar de hábitos</div>
          </div>
          <div class="tree-col col-2">
            <div class="tree-col-title">🏢 Pymes y Comercios</div>
            <div class="tree-bullet">Ajuste potencia contratada (P1-P6)</div>
            <div class="tree-bullet">Eliminación penalización reactiva</div>
            <div class="tree-bullet">Reducción costes operativos</div>
          </div>
          <div class="tree-col col-3">
            <div class="tree-col-title">👥 Comunidades de Vecinos</div>
            <div class="tree-bullet">Optimización ascensores y garajes</div>
            <div class="tree-bullet">Tarifas caldera y gas centralizado</div>
            <div class="tree-bullet">Asesoría a Administradores</div>
          </div>
          <div class="tree-col col-4">
            <div class="tree-col-title">☀️ Autoconsumo Solar</div>
            <div class="tree-bullet">Factura a 0€ con Batería Virtual</div>
            <div class="tree-bullet">Gestión de subvenciones e IRPF</div>
            <div class="tree-bullet">Amortización en 3-5 años</div>
          </div>
        </div>
      </div>
    </div>

    <div class="cards-grid avoid-break">
      <!-- Card 1 -->
      <div class="audience-card">
        <div class="card-header"><span>🏡 Hogares y Familias (Particulares)</span></div>
        <div class="pill-item pill-dolor"><strong>Punto de dolor:</strong> Facturas abusivas y conceptos incomprensibles (peajes, cargos, término potencia vs. energía).</div>
        <div class="pill-item pill-propuesta"><strong>Propuesta:</strong> Reducción de hasta un 35% en el recibo y blindaje ante revisiones tarifarias imprevistas.</div>
        <div class="pill-item pill-msg"><strong>Mensaje clave:</strong> "Envíanos una foto de tu última factura por WhatsApp y te decimos cuánto dinero estás perdiendo cada mes."</div>
      </div>

      <!-- Card 2 -->
      <div class="audience-card empresa">
        <div class="card-header"><span>🏢 Pymes, Comercios e Industrias</span></div>
        <div class="pill-item pill-dolor"><strong>Punto de dolor:</strong> Penalizaciones de energía reactiva o maxímetros, potencias sobredimensionadas y tarifas indexadas sin cobertura.</div>
        <div class="pill-item pill-propuesta"><strong>Propuesta:</strong> Análisis técnico cuarto-horario, reconfiguración P1-P6 y negociación en pool mayorista.</div>
        <div class="pill-item pill-msg"><strong>Mensaje clave:</strong> "Convierte el gasto energético en ventaja competitiva: recortamos tu coste operativo sin inversión."</div>
      </div>

      <!-- Card 3 -->
      <div class="audience-card comunidad">
        <div class="card-header"><span>👥 Comunidades y Administradores</span></div>
        <div class="pill-item pill-dolor"><strong>Punto de dolor:</strong> Derramas imprevistas provocadas por ascensor, garajes, bombas de presión y caldera centralizada de gas.</div>
        <div class="pill-item pill-propuesta"><strong>Propuesta:</strong> Facturación unificada comunitaria, reducción de potencia ociosa y tarifas colectivas.</div>
        <div class="pill-item pill-msg"><strong>Mensaje clave:</strong> "Baja la cuota de la comunidad revisando las facturas comunes a coste cero."</div>
      </div>

      <!-- Card 4 -->
      <div class="audience-card solar">
        <div class="card-header"><span>☀️ Prosumidores (Solar & Batería Virtual)</span></div>
        <div class="pill-item pill-dolor"><strong>Punto de dolor:</strong> Incertidumbre sobre rentabilidad, trámites burocráticos de subvenciones y baja compensación por excedentes.</div>
        <div class="pill-item pill-propuesta"><strong>Propuesta:</strong> Instalación llave en mano, amortización en 3-5 años y compensación integral vía batería virtual (recibo a 0€).</div>
        <div class="pill-item pill-msg"><strong>Mensaje clave:</strong> "Paga 0 € de luz aprovechando el sol de Andalucía y toda España con batería virtual."</div>
      </div>
    </div>
  </section>

  <!-- ==================== PÁGINA 3 ==================== -->
  <div class="page-break"></div>

  <!-- SECCIÓN 4: ESTRATEGIA DE ADQUISICIÓN DIGITAL -->
  <section class="section-block">
    <div class="section-header">
      <div class="section-num">4</div>
      <h2 class="section-title">Estrategia de Adquisición Digital por Plataforma</h2>
    </div>

    <!-- DIAGRAMA 3 -->
    <div class="diagram-card avoid-break">
      <div class="diagram-caption">Figura 4.1 — Arquitectura Integral del Embudo Digital y Tracking</div>
      <div class="funnel-wrapper">
        <div class="funnel-layer layer-1">
          <div class="layer-title">1. Canales de Adquisición Digital</div>
          <div class="layer-items">
            <div class="funnel-card">
              <div class="f-title">🔍 Google Ads</div>
              <div class="f-desc">Búsqueda de Alta Intención</div>
            </div>
            <div class="funnel-card">
              <div class="f-title">📸 Meta Ads</div>
              <div class="f-desc">Instagram & Facebook Visual</div>
            </div>
            <div class="funnel-card">
              <div class="f-title">🎵 TikTok Ads</div>
              <div class="f-desc">Viralidad & Educación Rápida</div>
            </div>
          </div>
        </div>
        <div class="layer-divider">▼ Tráfico Dirigido con Directiva Noindex ▼</div>
        <div class="funnel-layer layer-2">
          <div class="layer-title" style="color:#166534;">2. Embudo Web tu-luz.es (Conversión Express)</div>
          <div class="layer-items">
            <div class="funnel-card" style="border-color:#86efac;"><div class="f-title">/google</div><div class="f-desc">Modal Automático</div></div>
            <div class="funnel-card" style="border-color:#86efac;"><div class="f-title">/meta</div><div class="f-desc">Modal Automático</div></div>
            <div class="funnel-card" style="border-color:#86efac;"><div class="f-title">/tiktok</div><div class="f-desc">Modal Automático</div></div>
            <div class="funnel-card" style="border-color:#86efac;"><div class="f-title">/solar</div><div class="f-desc">Landing Dedicada</div></div>
          </div>
        </div>
        <div class="layer-divider">▼ Envío de Formulario + Adjunto de Factura ▼</div>
        <div class="funnel-layer layer-3">
          <div class="layer-title">3. Medición, Tracking & CRM Comercial</div>
          <div class="layer-items">
            <div class="funnel-card"><div class="f-title">📊 GA4</div><div class="f-desc">G-B3QHJXW8RB</div></div>
            <div class="funnel-card"><div class="f-title">🎯 Google Ads Tag</div><div class="f-desc">generate_lead</div></div>
            <div class="funnel-card" style="background:#4CAF4F; color:white; border-color:#2e7d32;"><div class="f-title" style="color:white;">🎉 /gracias</div><div class="f-desc" style="color:#e8f5e9;">Página de Éxito</div></div>
            <div class="funnel-card"><div class="f-title">⚡ Alerta Inmediata</div><div class="f-desc">davidad@tu-luz.es</div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4.1 GOOGLE ADS DETALLADO: MATRIZ DE INTENCIONES -->
    <div class="sub-title">🎯 1. Google Ads (Search & Performance Max): Intenciones de Búsqueda y Ejecución</div>
    <p>
      Google Ads intercepta al usuario en el <strong>momento de máxima fricción y necesidad</strong> (cuando recibe una factura abusiva o busca cambiar activamente).
    </p>

    <div class="custom-table-wrapper">
      <table>
        <thead>
          <tr>
            <th style="width: 22%;">Nivel de Intención</th>
            <th style="width: 24%;">Momento Psicológico</th>
            <th style="width: 26%;">Palabras Clave Clave</th>
            <th style="width: 28%;">Copy del Anuncio y Oferta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Transaccional Urgente (BoFu)</strong></td>
            <td>Dolor agudo por factura recibida; quiere cambiar o rebajar el coste YA.</td>
            <td><span class="code-tag">[cambiar compania luz]</span>, <span class="code-tag">"bajar factura luz urgente"</span>, <span class="code-tag">"tarifa luz mas barata"</span></td>
            <td><em>"¿Factura abusiva? Comparamos +50 compañías y bajamos tu recibo en 15 min. 100% gratis y sin cortes."</em></td>
          </tr>
          <tr>
            <td><strong>2. Comparativa / Conquista (MoFu)</strong></td>
            <td>Cliente de Endesa, Iberdrola, Naturgy o Repsol evaluando alternativas.</td>
            <td><span class="code-tag">"mejor alternativa a endesa"</span>, <span class="code-tag">"cual es la luz mas barata"</span>, <span class="code-tag">"comparador tarifas luz"</span></td>
            <td><em>"No te cases con ninguna eléctrica: auditamos tu contrato frente al mercado real sin compromiso ni coste."</em></td>
          </tr>
          <tr>
            <td><strong>3. Técnica B2B Pymes</strong></td>
            <td>Comercios e industrias con sobrecoste en potencia contratada y reactiva.</td>
            <td><span class="code-tag">"asesor energetico empresas"</span>, <span class="code-tag">"reducir potencia pyme"</span>, <span class="code-tag">"tarifa luz 3.0TD"</span></td>
            <td><em>"Recorta hasta un 40% en potencia y reactiva en tu negocio. Estudio cuarto-horario sin inversión."</em></td>
          </tr>
          <tr>
            <td><strong>4. Autoconsumo & Batería Virtual</strong></td>
            <td>Propietarios de viviendas o naves buscando independencia y factura 0€.</td>
            <td><span class="code-tag">"bateria virtual cual es mejor"</span>, <span class="code-tag">"subvenciones placas solares"</span>, <span class="code-tag">"factura 0 euros luz"</span></td>
            <td><em>"Genera tu energía y acumula excedentes en batería virtual para pagar 0 € de luz. Amortización 3-5 años."</em></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ARQUITECTURA Y NEGATIVAS GOOGLE ADS -->
    <div class="gads-grid-2 avoid-break">
      <div class="gads-box">
        <h5>🏛️ Arquitectura de Campañas (Search STAG)</h5>
        <ul class="bullet-list">
          <li><strong>Camp. 1 (Particulares):</strong> Búsqueda de alta urgencia con foco en cambio de compañía y ahorro mensual.</li>
          <li><strong>Camp. 2 (B2B Negocios):</strong> Optimización de potencias P1-P6 y eliminación de energía reactiva.</li>
          <li><strong>Camp. 3 (Autoconsumo Solar):</strong> Batería virtual, excedentes y subvenciones autonómicas.</li>
          <li><strong>Camp. 4 (Conquista Competitiva):</strong> Búsquedas de alternativas a grandes comercializadoras con copy neutral.</li>
          <li><strong>Camp. 5 (PMax Retargeting):</strong> Captación multi-inventario a partir de 30 conversiones registradas.</li>
        </ul>
      </div>

      <div class="gads-box" style="border-left-color: #dc2626;">
        <h5>⛔ Concordancias y Negativas Obligatorias</h5>
        <ul class="bullet-list">
          <li><strong>Concordancias permitidas:</strong> Solo <span class="code-tag">"Frase"</span> y <span class="code-tag">[Exacta]</span>. Queda excluida la amplia para blindar el presupuesto.</li>
          <li><strong>Exclusiones de empleo:</strong> <span class="code-tag">trabajo</span>, <span class="code-tag">empleo</span>, <span class="code-tag">curriculum</span>, <span class="code-tag">sueldo</span>, <span class="code-tag">convenio</span>.</li>
          <li><strong>Exclusiones de distribuidora:</strong> <span class="code-tag">averias telefono</span>, <span class="code-tag">corte luz hoy</span>, <span class="code-tag">dar lectura contador</span>.</li>
          <li><strong>Exclusiones administrativas:</strong> <span class="code-tag">bono social requisitos</span>, <span class="code-tag">pagar recibo online</span>, <span class="code-tag">descargar pdf</span>.</li>
          <li><strong>Exclusiones ilegales/fraude:</strong> <span class="code-tag">enganchar luz</span>, <span class="code-tag">trucar contador</span>, <span class="code-tag">luz gratis truco</span>.</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ==================== PÁGINA 4 ==================== -->
  <div class="page-break"></div>

  <!-- CONTINUACIÓN GOOGLE ADS & RESTO DE CANALES -->
  <section class="section-block">
    <div class="gads-grid-2 avoid-break" style="margin-bottom: 10px;">
      <div class="gads-box" style="border-left-color: #16a34a;">
        <h5>✍️ Textos RSA y Activos de Alto CTR</h5>
        <ul class="bullet-list">
          <li><strong>Títulos de alto impacto:</strong> <em>"Baja tu Factura de Luz Hoy"</em>, <em>"Estudio Energético 100% Gratuito"</em>, <em>"Comparamos +50 Comercializadoras"</em>, <em>"Ahorra hasta un 35% en tu Recibo"</em>.</li>
          <li><strong>Inserción dinámica geográfica:</strong> <span class="code-tag">{LOCATION(City)}: Asesoría de Luz Gratuita</span>.</li>
          <li><strong>Enlaces de sitio (Sitelinks):</strong> «Hogares», «Pymes y Comercios», «Batería Virtual», «Cómo Ahorrar (Sin Coste)».</li>
          <li><strong>Textos destacados (Callouts):</strong> «Sin Permanencia», «Sin Cortes de Suministro», «Trato WhatsApp Directo».</li>
        </ul>
      </div>

      <div class="gads-box" style="border-left-color: #f59e0b;">
        <h5>📈 Estrategia de Pujas (Bidding Roadmap)</h5>
        <ul class="bullet-list">
          <li><strong>Semanas 1-2 (Arranque):</strong> <em>Maximizar Clics con CPC Máximo acotado (0,85 € - 1,20 €)</em> para forzar impresiones y filtrar búsquedas con negativas diarias.</li>
          <li><strong>Semanas 3-6 (Consolidación):</strong> Cambio a <em>Maximizar Conversiones</em> tras registrar al menos 15-20 leads validados en GA4.</li>
          <li><strong>Semana 7+ (Escala Rentable):</strong> Fijación de <em>CPA Objetivo (tCPA: 7 € - 11 € / lead)</em> para escalar presupuesto manteniendo margen operativo.</li>
        </ul>
      </div>
    </div>

    <!-- META Y TIKTOK ADS -->
    <div class="avoid-break">
      <div class="channel-box">
        <div class="channel-title">
          <span class="channel-badge badge-meta">Meta Ads</span>
          <span>Instagram & Facebook Ads (Impacto Visual de Alto Contraste)</span>
        </div>
        <ul class="bullet-list">
          <li><strong>Objetivo:</strong> Generación de demanda latente mediante comparativas directas de costes ("Antes vs. Después").</li>
          <li><strong>Creatividades prioritarias:</strong> Vídeos Reel/Story tachando conceptos abusivos con rotulador; carruseles de ahorro verificado (Familia: 48€/mes; Hostelería: 280€/mes).</li>
          <li><strong>Ruta de destino:</strong> <span class="code-tag">https://tu-luz.es/meta</span> o <span class="code-tag">https://tu-luz.es/instagram</span> (apertura programada de modal).</li>
        </ul>
      </div>

      <div class="channel-box">
        <div class="channel-title">
          <span class="channel-badge badge-tiktok">TikTok Ads</span>
          <span>UGC, Desmitificación y Educación Rápida</span>
        </div>
        <ul class="bullet-list">
          <li><strong>Objetivo:</strong> Captación de gran volumen a coste por lead reducido mediante lenguaje desenfadado.</li>
          <li><strong>Enfoque de contenido:</strong> Formato UGC (User Generated Content): <em>"3 trampas en tu factura de luz que estás pagando hoy mismo sin saberlo"</em>.</li>
          <li><strong>Ruta de destino:</strong> <span class="code-tag">https://tu-luz.es/tiktok</span>.</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- SECCIÓN 5: ARQUITECTURA DEL EMBUDO Y ATRIBUCIÓN TÉCNICA -->
  <section class="section-block avoid-break">
    <div class="section-header">
      <div class="section-num">5</div>
      <h2 class="section-title">Arquitectura del Embudo y Atribución Técnica</h2>
    </div>

    <div class="custom-table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Canal de Campaña</th>
            <th>URL de Entrada</th>
            <th>Metatítulo Identificador GA4</th>
            <th>Evento Registrado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Google Ads</strong></td>
            <td><span class="code-tag">tu-luz.es/google</span></td>
            <td>[Google Ads] Solicita tu Estudio Energético Gratuito | tuLuz</td>
            <td><span class="code-tag">generate_lead</span> + visita a /gracias</td>
          </tr>
          <tr>
            <td><strong>Meta Ads (FB/IG)</strong></td>
            <td><span class="code-tag">tu-luz.es/meta</span></td>
            <td>[Meta Ads] Solicita tu Estudio Energético Gratuito | tuLuz</td>
            <td><span class="code-tag">generate_lead</span> + visita a /gracias</td>
          </tr>
          <tr>
            <td><strong>Instagram Exclusivo</strong></td>
            <td><span class="code-tag">tu-luz.es/instagram</span></td>
            <td>[Instagram Ads] Solicita tu Estudio Energético Gratuito | tuLuz</td>
            <td><span class="code-tag">generate_lead</span> + visita a /gracias</td>
          </tr>
          <tr>
            <td><strong>TikTok Ads</strong></td>
            <td><span class="code-tag">tu-luz.es/tiktok</span></td>
            <td>[TikTok Ads] Solicita tu Estudio Energético Gratuito | tuLuz</td>
            <td><span class="code-tag">generate_lead</span> + visita a /gracias</td>
          </tr>
          <tr>
            <td><strong>Landing Autoconsumo</strong></td>
            <td><span class="code-tag">tu-luz.es/solar</span></td>
            <td>Autoconsumo Solar y Placas Fotovoltaicas | tuLuz</td>
            <td><span class="code-tag">generate_lead</span> + visita a /gracias</td>
          </tr>
          <tr>
            <td><strong>Orgánico / Directo</strong></td>
            <td><span class="code-tag">tu-luz.es/</span></td>
            <td>tuLuz | Asesoramiento Energético Gratuito en Toda España</td>
            <td><span class="code-tag">generate_lead</span> + visita a /gracias</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-top:6px;">
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:5px; padding:7px 10px; font-size:9.5px;">
        <strong style="color:#0f172a;">🔒 Protección SEO (noindex, nofollow)</strong><br/>
        Las rutas de campañas y la página de confirmación (<span class="code-tag">/gracias</span>) cuentan con directiva estricta de no indexación para preservar el SEO orgánico y evitar distorsión analítica.
      </div>
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:5px; padding:7px 10px; font-size:9.5px;">
        <strong style="color:#0f172a;">🛡️ Cumplimiento RGPD y Endpoint Seguro</strong><br/>
        Procesamiento estructurado en backend con endpoint securizado <span class="code-tag">/api/leads-summary?key=ADMIN_KEY</span> para auditoría interna y estricto cumplimiento de privacidad de datos.
      </div>
    </div>
  </section>

  <!-- ==================== PÁGINA 5 ==================== -->
  <div class="page-break"></div>

  <!-- SECCIÓN 6: PROTOCOLO DE GESTIÓN DE LEADS (SOP) -->
  <section class="section-block">
    <div class="section-header">
      <div class="section-num">6</div>
      <h2 class="section-title">Protocolo de Gestión Comercial y Conversión (SOP)</h2>
    </div>

    <p>
      El factor determinante que asegura el retorno sobre inversión (ROAS) de las campañas es el <strong>Speed-to-Lead (velocidad de respuesta inmediata)</strong>:
    </p>

    <!-- DIAGRAMA 4 -->
    <div class="diagram-card avoid-break">
      <div class="diagram-caption">Figura 6.1 — Protocolo de Gestión Comercial y Conversión (SOP)</div>
      <div class="sop-seq-container">
        <div class="sop-actors">
          <div class="sop-actor-pill">👤 Cliente Potencial</div>
          <div class="sop-actor-pill">🌐 Web tu-luz.es</div>
          <div class="sop-actor-pill">⚙️ Servidor / SMTP</div>
          <div class="sop-actor-pill advisor">👨‍💼 Asesor tuLuz (David)</div>
        </div>

        <div class="sop-step-row">
          <div class="sop-num">1</div>
          <div class="sop-from">👤 Cliente</div>
          <div class="sop-arrow-tag">➔</div>
          <div class="sop-to">🌐 Web</div>
          <div class="sop-action">Rellena formulario express y adjunta fotografía o PDF de su factura</div>
        </div>

        <div class="sop-step-row">
          <div class="sop-num">2</div>
          <div class="sop-from">🌐 Web</div>
          <div class="sop-arrow-tag">➔</div>
          <div class="sop-to">⚙️ Servidor</div>
          <div class="sop-action">POST /api/contact con datos de contacto, archivo adjunto y canal de procedencia</div>
        </div>

        <div class="sop-step-row">
          <div class="sop-num">3</div>
          <div class="sop-from">⚙️ Servidor</div>
          <div class="sop-arrow-tag">➔</div>
          <div class="sop-to">🌐 Web</div>
          <div class="sop-action">Respuesta 200 OK y redirección instantánea a la página de agradecimiento (/gracias)</div>
        </div>

        <div class="sop-step-row">
          <div class="sop-num">4</div>
          <div class="sop-from">⚙️ Servidor</div>
          <div class="sop-arrow-tag">➔</div>
          <div class="sop-to">👨‍💼 Asesor tuLuz</div>
          <div class="sop-action">Envío urgente de notificación interna por correo electrónico a davidad@tu-luz.es</div>
        </div>

        <div class="sop-highlight-row">
          <span>⏱️</span>
          <span><strong>REGLA DE ORO SPEED-TO-LEAD:</strong> Tiempo objetivo de contacto inferior a 15 minutos (multiplica x7 la tasa de cierre).</span>
        </div>

        <div class="sop-step-row">
          <div class="sop-num">5</div>
          <div class="sop-from">👨‍💼 Asesor tuLuz</div>
          <div class="sop-arrow-tag">➔</div>
          <div class="sop-to">👤 Cliente</div>
          <div class="sop-action">Contacto personalizado vía WhatsApp cordial o llamada telefónica directa</div>
        </div>

        <div class="sop-step-row">
          <div class="sop-num">6</div>
          <div class="sop-from">👨‍💼 Asesor tuLuz</div>
          <div class="sop-arrow-tag">➔</div>
          <div class="sop-to">👤 Cliente</div>
          <div class="sop-action">Envío de estudio comparativo con el ahorro anual en euros garantizado</div>
        </div>

        <div class="sop-step-row" style="background:#f0fdf4; border-color:#86efac;">
          <div class="sop-num" style="background:#16a34a;">7</div>
          <div class="sop-from">👤 Cliente</div>
          <div class="sop-arrow-tag">➔</div>
          <div class="sop-to">👨‍💼 Asesor tuLuz</div>
          <div class="sop-action"><strong>Firma digital y confirmación del cambio</strong> sin cortes ni coste para el cliente</div>
        </div>
      </div>
    </div>

    <div class="rules-grid avoid-break">
      <div class="rule-card">
        <div class="rule-num">1</div>
        <h5>Contacto en &lt; 15 Minutos</h5>
        <p>Atender al usuario en el primer cuarto de hora multiplica por 7 las probabilidades de formalizar el cambio frente a respuestas demoradas.</p>
      </div>
      <div class="rule-card">
        <div class="rule-num">2</div>
        <h5>Canal Preferente WhatsApp</h5>
        <p>Un mensaje inicial cordial por WhatsApp personalizado con el nombre del titular antes de llamar eleva la receptividad y respuesta más de un 60%.</p>
      </div>
      <div class="rule-card">
        <div class="rule-num">3</div>
        <h5>Foco en Euros de Ahorro</h5>
        <p>Evitar tecnicismos regulatorios complejos: la propuesta comercial debe comunicarse siempre como <strong>ahorro neto en euros al mes y al año</strong>.</p>
      </div>
    </div>
  </section>

  <!-- SECCIÓN 7: CUADRO DE MANDOS Y KPIS -->
  <section class="section-block avoid-break">
    <div class="section-header">
      <div class="section-num">7</div>
      <h2 class="section-title">Cuadro de Mandos y KPIs de Negocio</h2>
    </div>

    <div class="custom-table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Indicador Clave de Rendimiento (KPI)</th>
            <th>Objetivo Inicial (Fase 1)</th>
            <th>Objetivo de Escala (Fase 2)</th>
            <th>Plataforma de Medición</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Coste por Lead — Google Ads (CPL)</strong></td>
            <td>&lt; 12,00 € / lead</td>
            <td>&lt; 8,00 € / lead</td>
            <td>Google Ads Conversion Tracking</td>
          </tr>
          <tr>
            <td><strong>Coste por Lead — Meta / TikTok (CPL)</strong></td>
            <td>&lt; 6,00 € / lead</td>
            <td>&lt; 3,50 € / lead</td>
            <td>Meta Ads Manager / TikTok Ads</td>
          </tr>
          <tr>
            <td><strong>Tasa de Conversión Web (CR)</strong></td>
            <td>&gt; 5,0 % (visita a formulario)</td>
            <td>&gt; 8,5 % optimizado</td>
            <td>Google Analytics 4</td>
          </tr>
          <tr>
            <td><strong>Tasa de Contactabilidad Efectiva</strong></td>
            <td>&gt; 75 % de leads registrados</td>
            <td>&gt; 85 % contactados</td>
            <td>CRM Interno / Centralita</td>
          </tr>
          <tr>
            <td><strong>Tasa de Cierre (Lead a Contrato)</strong></td>
            <td>&gt; 28 % de convertidos</td>
            <td>&gt; 35 % de firmas</td>
            <td>Panel de Gestión Comercial</td>
          </tr>
          <tr>
            <td><strong>Ahorro Medio Conseguido</strong></td>
            <td>&gt; 180 €/año en Hogares</td>
            <td>&gt; 1.200 €/año en Pymes</td>
            <td>Informes de Auditoría tuLuz</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- SECCIÓN 8: HOJA DE RUTA -->
  <section class="section-block avoid-break">
    <div class="section-header">
      <div class="section-num">8</div>
      <h2 class="section-title">Hoja de Ruta de Crecimiento (Roadmap 2026)</h2>
    </div>

    <div class="timeline-container">
      <div class="phase-card">
        <div class="phase-title">
          <span>Fase 1: Consolidación y Adquisición Rápida</span>
          <span class="phase-tag">Meses 1 - 2</span>
        </div>
        <ul class="bullet-list">
          <li>Activación de campañas en Google Ads orientadas a términos de búsqueda de máxima intención.</li>
          <li>Despliegue de anuncios de impacto visual en Meta e Instagram Reels con prueba social.</li>
          <li>Optimización de micro-conversiones en landing pages y auditoría estricta de tiempos de contacto.</li>
        </ul>
      </div>

      <div class="phase-card p2">
        <div class="phase-title">
          <span>Fase 2: Escala y Alianzas Estratégicas</span>
          <span class="phase-tag">Meses 3 - 4</span>
        </div>
        <ul class="bullet-list">
          <li>Inicio de captación mediante campañas cortas y pedagógicas en TikTok Ads para capturar volumen masivo.</li>
          <li>Programa de acuerdos de colaboración con Administradores de Fincas, Gestorías y Asesorías locales.</li>
          <li>Lanzamiento de campañas estacionales dedicadas a autoconsumo fotovoltaico y batería virtual.</li>
        </ul>
      </div>

      <div class="phase-card p3">
        <div class="phase-title">
          <span>Fase 3: Automatización y Retención (LTV)</span>
          <span class="phase-tag">Meses 5 - 6</span>
        </div>
        <ul class="bullet-list">
          <li>Notificación preventiva automatizada al cliente 30 días antes del vencimiento anual de su tarifa para renovar en el mercado más económico.</li>
          <li>Lanzamiento del programa de fidelización y referidos: <em>"Recomienda tuLuz y ahorra conjuntamente"</em>.</li>
        </ul>
      </div>
    </div>
  </section>

  <script>
    window.addEventListener('DOMContentLoaded', async () => {
      try {
        await document.fonts.ready;
      } catch (e) {}
      setTimeout(() => {
        window.__RENDER_COMPLETE__ = true;
      }, 300);
    });
  </script>
</body>
</html>`;

// 3. Execution Pipeline
async function generatePDF() {
  console.log('--- Generando PDF Oficial con Estrategia Detallada de Google Ads ---');

  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlContent);
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const pageUrl = `http://127.0.0.1:${port}/`;

  const cdpPort = 9889;
  const tempProfileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tuluz-pdf-chrome-'));
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${cdpPort}`,
    '--remote-allow-origins=*',
    `--user-data-dir=${tempProfileDir}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    'about:blank'
  ]);

  await new Promise((r) => setTimeout(r, 1400));

  try {
    const listRes = await fetch(`http://127.0.0.1:${cdpPort}/json/list`);
    const tabs = await listRes.json();
    const pageTab = tabs.find((t) => t.type === 'page') || tabs[0];
    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const handler = (evt) => {
          const data = JSON.parse(evt.data);
          if (data.id === id) {
            ws.removeEventListener('message', handler);
            if (data.error) reject(data.error);
            else resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: pageUrl });

    // Wait until window.__RENDER_COMPLETE__ is true
    let ready = false;
    let attempts = 0;
    while (!ready && attempts < 30) {
      await new Promise((r) => setTimeout(r, 200));
      attempts++;
      try {
        const evalRes = await send('Runtime.evaluate', {
          expression: 'window.__RENDER_COMPLETE__ === true',
          returnByValue: true
        });
        if (evalRes?.result?.value === true) {
          ready = true;
          break;
        }
      } catch (e) {}
    }

    await new Promise((r) => setTimeout(r, 500));

    const footerTemplate = `
      <div style="font-size: 8px; font-family: 'Poppins', -apple-system, sans-serif; color: #64748b; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 13mm;">
        <span style="font-weight: 500;">tuLuz Asesoramiento Energético • Documento Estratégico Integral (Confidencial)</span>
        <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
      </div>
    `;

    const pdfData = await send('Page.printToPDF', {
      landscape: false,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: footerTemplate,
      printBackground: true,
      paperWidth: 8.27,
      paperHeight: 11.69,
      marginTop: 0.35,
      marginBottom: 0.45,
      marginLeft: 0.45,
      marginRight: 0.45,
      preferCSSPageSize: true
    });

    const outputPath = path.join(rootDir, 'brief_estrategico_tuluz.pdf');
    fs.writeFileSync(outputPath, Buffer.from(pdfData.data, 'base64'));

    const brainPdfPath = 'c:\\Users\\marco\\.gemini\\antigravity-ide\\brain\\854c987f-e655-450a-a775-f1b03c6b22dd\\brief_estrategico_tuluz.pdf';
    try {
      fs.copyFileSync(outputPath, brainPdfPath);
    } catch (e) {}

    console.log(`✅ ¡PDF generado con éxito en: ${outputPath}!`);
    console.log(`✅ ¡Copia sincronizada en: ${brainPdfPath}!`);
    console.log(`Tamaño total: ${(pdfData.data.length * 0.75 / 1024).toFixed(1)} KB`);

    ws.close();
  } catch (err) {
    console.error('Error durante la generación del PDF:', err);
  } finally {
    chromeProc.kill();
    server.close();
    setTimeout(() => {
      try {
        fs.rmSync(tempProfileDir, { recursive: true, force: true });
      } catch (e) {}
    }, 1500);
  }
}

generatePDF();
