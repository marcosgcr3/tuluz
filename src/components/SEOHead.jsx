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
  '/autoconsumo': {
    title: 'Autoconsumo Solar y Placas Solares Fotovoltaicas | tuLuz',
    description: 'Genera tu propia energía y ahorra hasta un 80% en tu factura de luz. Estudio de viabilidad solar, subvenciones, deducción IRPF y batería virtual con tuLuz.',
    canonical: 'https://tu-luz.es/autoconsumo'
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
  '/solicitar-estudio': {
    title: 'Solicita tu Estudio Energético Gratuito | tuLuz',
    description: 'Estudio 100% gratuito y sin compromiso de tus facturas de luz, gas y autoconsumo solar. Comparamos +50 comercializadoras.',
    canonical: 'https://tu-luz.es/solicitar-estudio'
  },
  '/estudio-gratuito': {
    title: 'Estudio Gratuito de Ahorro en Luz y Gas | tuLuz',
    description: 'Ahorra hasta un 35% en tu factura de luz y gas o hasta un 80% con autoconsumo solar. Estudio gratuito sin compromiso.',
    canonical: 'https://tu-luz.es/estudio-gratuito'
  },
  '/estudio': {
    title: 'Solicita tu Estudio Energético Gratuito | tuLuz',
    description: 'Estudio gratuito de luz, gas y energía solar para hogares, empresas y comunidades.',
    canonical: 'https://tu-luz.es/solicitar-estudio'
  },
  '/google': {
    title: 'Solicita tu Estudio Energético Gratuito | tuLuz',
    description: 'Estudio gratuito de luz, gas y energía solar para hogares, empresas y comunidades.',
    canonical: 'https://tu-luz.es/solicitar-estudio',
    noindex: true
  },
  '/meta': {
    title: 'Solicita tu Estudio Energético Gratuito | tuLuz',
    description: 'Estudio gratuito de luz, gas y energía solar para hogares, empresas y comunidades.',
    canonical: 'https://tu-luz.es/solicitar-estudio',
    noindex: true
  },
  '/instagram': {
    title: 'Solicita tu Estudio Energético Gratuito | tuLuz',
    description: 'Estudio gratuito de luz, gas y energía solar para hogares, empresas y comunidades.',
    canonical: 'https://tu-luz.es/solicitar-estudio',
    noindex: true
  },
  '/facebook': {
    title: 'Solicita tu Estudio Energético Gratuito | tuLuz',
    description: 'Estudio gratuito de luz, gas y energía solar para hogares, empresas y comunidades.',
    canonical: 'https://tu-luz.es/solicitar-estudio',
    noindex: true
  },
  '/tiktok': {
    title: 'Solicita tu Estudio Energético Gratuito | tuLuz',
    description: 'Estudio gratuito de luz, gas y energía solar para hogares, empresas y comunidades.',
    canonical: 'https://tu-luz.es/solicitar-estudio',
    noindex: true
  },
  '/promo': {
    title: 'Solicita tu Estudio Energético Gratuito | tuLuz',
    description: 'Estudio gratuito de luz, gas y energía solar para hogares, empresas y comunidades.',
    canonical: 'https://tu-luz.es/solicitar-estudio',
    noindex: true
  },
  '/solar': {
    title: 'Autoconsumo Solar y Placas Solares Fotovoltaicas | tuLuz',
    description: 'Genera tu propia energía y ahorra hasta un 80% en tu factura de luz. Estudio de viabilidad solar, subvenciones y batería virtual.',
    canonical: 'https://tu-luz.es/autoconsumo'
  },
  '/gracias': {
    title: '¡Solicitud Recibida con Éxito! | tuLuz Asesoramiento Energético',
    description: 'Gracias por solicitar tu estudio energético gratuito. Nuestro equipo revisará tus facturas en breve.',
    canonical: 'https://tu-luz.es/gracias',
    noindex: true
  },
  '/solicitud-enviada': {
    title: '¡Solicitud Recibida con Éxito! | tuLuz Asesoramiento Energético',
    description: 'Gracias por solicitar tu estudio energético gratuito. Nuestro equipo revisará tus facturas en breve.',
    canonical: 'https://tu-luz.es/gracias',
    noindex: true
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

    // Update robots meta tag (noindex for ads and thank you pages)
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (seoData.noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else {
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'index, follow');
      }
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

    // Track dynamic SPA pageview in Google Tag
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-B3QHJXW8RB', {
        page_path: cleanPath,
        page_title: seoData.title
      });
    }

  }, [currentPath]);

  return null;
}
