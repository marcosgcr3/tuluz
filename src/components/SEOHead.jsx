import { useEffect } from 'react';

const seoDataMap = {
  '/': {
    title: 'TúLuz | Asesoría Energética Gratuita en Córdoba y Andalucía',
    description: 'Optimiza tu factura de luz en Córdoba y Andalucía con TúLuz. Estudio 100% gratuito comparando más de 50 comercializadoras de electricidad. Ahorra hasta un 35%.',
    canonical: 'https://tu-luz.es/'
  },
  '/empresas': {
    title: 'Asesoría Energética para Empresas y Pymes en Andalucía | TúLuz',
    description: 'Reducción de costes eléctricos para empresas, pymes e industrias en Andalucía. Optimización de potencia contratada (P1-P6) y tarifas a precio de coste.',
    canonical: 'https://tu-luz.es/empresas'
  },
  '/comunidades-de-vecinos': {
    title: 'Ahorro Energético en Comunidades de Vecinos en Andalucía | TúLuz',
    description: 'Estudio gratuito para reducir el gasto de luz en zonas comunes, garajes y ascensores de comunidades en Córdoba y Andalucía. Sin costes.',
    canonical: 'https://tu-luz.es/comunidades-de-vecinos'
  },
  '/particulares': {
    title: 'Ahorro en Factura de Luz para Particulares y Hogares | TúLuz',
    description: 'Encuentra la mejor tarifa de luz para tu hogar en Andalucía. Revisión sin compromiso de tu factura y asesoría en energía solar.',
    canonical: 'https://tu-luz.es/particulares'
  },
  '/solicita-un-presupuesto': {
    title: 'Solicita tu Estudio Energético Gratuito en 2 Minutos | TúLuz',
    description: 'Analizamos tu factura de luz sin coste ni compromiso. Adjunta tu factura o datos de contacto y empieza a ahorrar en Andalucía.',
    canonical: 'https://tu-luz.es/solicita-un-presupuesto'
  },
  '/presupuesto': {
    title: 'Solicita tu Estudio Energético Gratuito en 2 Minutos | TúLuz',
    description: 'Analizamos tu factura de luz sin coste ni compromiso. Adjunta tu factura o datos de contacto y empieza a ahorrar en Andalucía.',
    canonical: 'https://tu-luz.es/solicita-un-presupuesto'
  },
  '/aviso-legal': {
    title: 'Aviso Legal y Términos de Servicio | TúLuz Asesoría Energética',
    description: 'Información legal, propiedad intelectual y condiciones generales de uso del sitio web de TúLuz Asesoría Energética.',
    canonical: 'https://tu-luz.es/aviso-legal'
  },
  '/politica-de-privacidad': {
    title: 'Política de Privacidad y Protección de Datos | TúLuz',
    description: 'Consulta cómo tratamos y protegemos tus datos personales conforme al RGPD en TúLuz Asesoría Energética.',
    canonical: 'https://tu-luz.es/politica-de-privacidad'
  }
};

export default function SEOHead({ currentPath }) {
  useEffect(() => {
    const cleanPath = currentPath ? currentPath.replace(/\/$/, '') || '/' : '/';
    const seoData = seoDataMap[cleanPath] || seoDataMap['/'];

    // Update document title
    document.title = seoData.title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description);
    }

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', seoData.canonical);
    }

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seoData.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seoData.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', seoData.canonical);

    // Update Twitter tags
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', seoData.title);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', seoData.description);

  }, [currentPath]);

  return null;
}
