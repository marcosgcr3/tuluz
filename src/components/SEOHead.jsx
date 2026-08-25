import { useEffect } from 'react';

const seoDataMap = {
  '/': {
    title: 'tuLuz | Asesoramiento Energético Gratuito en Córdoba y Andalucía',
    description: 'tuLuz representa claridad, ahorro y un futuro sostenible. Estudio 100% gratuito comparando más de 50 comercializadoras de electricidad en Andalucía.',
    canonical: 'https://tu-luz.es/'
  },
  '/empresas': {
    title: 'Asesoramiento Energético para Empresas y Pymes | tuLuz',
    description: 'Optimización de costes eléctricos para empresas e industrias en Andalucía. Ajuste de potencia contratada (P1-P6) y mejores tarifas con tuLuz.',
    canonical: 'https://tu-luz.es/empresas'
  },
  '/comunidades-de-vecinos': {
    title: 'Asesoramiento Energético para Comunidades de Vecinos | tuLuz',
    description: 'Estudio gratuito para reducir el gasto de luz en zonas comunes, garajes y ascensores de comunidades en Andalucía. Sin costes con tuLuz.',
    canonical: 'https://tu-luz.es/comunidades-de-vecinos'
  },
  '/particulares': {
    title: 'Asesoramiento Energético para Particulares y Hogares | tuLuz',
    description: 'Encuentra la mejor tarifa de luz para tu vivienda en Andalucía. Revisión sin compromiso de tu factura y asesoría solar con tuLuz.',
    canonical: 'https://tu-luz.es/particulares'
  },
  '/solicita-un-presupuesto': {
    title: 'Solicita tu Estudio Energético Gratuito | tuLuz',
    description: 'Analizamos tu factura de luz sin coste ni compromiso. Adjunta tu factura o datos de contacto y empieza a ahorrar con tuLuz.',
    canonical: 'https://tu-luz.es/solicita-un-presupuesto'
  },
  '/presupuesto': {
    title: 'Solicita tu Estudio Energético Gratuito | tuLuz',
    description: 'Analizamos tu factura de luz sin coste ni compromiso. Adjunta tu factura o datos de contacto y empieza a ahorrar con tuLuz.',
    canonical: 'https://tu-luz.es/solicita-un-presupuesto'
  },
  '/aviso-legal': {
    title: 'Aviso Legal y Términos de Servicio | tuLuz Asesoramiento Energético',
    description: 'Información legal, propiedad intelectual y condiciones generales de uso del sitio web de tuLuz Asesoramiento Energético.',
    canonical: 'https://tu-luz.es/aviso-legal'
  },
  '/politica-de-privacidad': {
    title: 'Política de Privacidad y Protección de Datos | tuLuz',
    description: 'Consulta cómo tratamos y protegemos tus datos personales conforme al RGPD en tuLuz Asesoramiento Energético.',
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
