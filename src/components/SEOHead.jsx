import { useEffect } from 'react';

const seoDataMap = {
  '/': {
    title: 'tuLuz | Asesoramiento Energético Gratuito en Luz y Gas',
    description: 'tuLuz representa claridad, ahorro y un futuro sostenible. Estudio 100% gratuito comparando más de 50 comercializadoras de electricidad y gas.',
    canonical: 'https://tu-luz.es/'
  },
  '/empresas': {
    title: 'Asesoramiento Energético en Luz y Gas para Empresas | tuLuz',
    description: 'Optimización de costes de electricidad y gas para empresas e industrias. Ajuste de potencia contratada (P1-P6) y mejores tarifas con tuLuz.',
    canonical: 'https://tu-luz.es/empresas'
  },
  '/comunidades-de-vecinos': {
    title: 'Asesoramiento en Luz y Gas para Comunidades de Vecinos | tuLuz',
    description: 'Estudio gratuito para reducir el gasto de electricidad y gas en zonas comunes, garajes y calderas de comunidades. Sin costes con tuLuz.',
    canonical: 'https://tu-luz.es/comunidades-de-vecinos'
  },
  '/particulares': {
    title: 'Asesoramiento en Luz y Gas para Particulares y Hogares | tuLuz',
    description: 'Encuentra la mejor tarifa de luz y gas para tu vivienda. Revisión sin compromiso de tus facturas y asesoría solar con tuLuz.',
    canonical: 'https://tu-luz.es/particulares'
  },
  '/solicita-un-presupuesto': {
    title: 'Solicita tu Estudio Gratuito de Luz y Gas | tuLuz',
    description: 'Analizamos tus facturas de luz y gas sin coste ni compromiso. Adjunta tus facturas o datos de contacto y empieza a ahorrar con tuLuz.',
    canonical: 'https://tu-luz.es/solicita-un-presupuesto'
  },
  '/presupuesto': {
    title: 'Solicita tu Estudio Gratuito de Luz y Gas | tuLuz',
    description: 'Analizamos tus facturas de luz y gas sin coste ni compromiso. Adjunta tus facturas o datos de contacto y empieza a ahorrar con tuLuz.',
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
