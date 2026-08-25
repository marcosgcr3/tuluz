export const companyInfo = {
  name: "TúLuz",
  tagline: "Asesoría Energética Gratuita en Andalucía",
  phone: "620 061 560",
  phoneRaw: "+34620061560",
  email: "david@tu-luz.es",
  address: "Av. del Aeropuerto, 6, Poniente Sur, 14004 Córdoba, España",
  city: "Córdoba",
  region: "Andalucía",
  country: "España",
  socials: {
    whatsapp: "https://wa.me/+34620061560?text=Hola,%20quisiera%20recibir%20asesoramiento%20gratuito%20para%20mi%20factura%20de%20luz."
  }
};

export const navLinks = [
  { name: "Inicio", path: "/" },
  { name: "Empresas", path: "/empresas" },
  { name: "Comunidades", path: "/comunidades-de-vecinos" },
  { name: "Particulares", path: "/particulares" },
  { name: "Solicita Presupuesto", path: "/solicita-un-presupuesto" }
];

export const providersList = [
  "Endesa", "Iberdrola", "Naturgy", "Repsol", "TotalEnergies",
  "Plenitude", "Audax Renovables", "HolaLuz", "GNS Energy", "Fenie Energía",
  "Octopus Energy", "Lucera", "Imagenerat", "EnergyAV", "Factor Energía"
];

export const heroStats = [
  { value: "+50", label: "Compañías comparadas" },
  { value: "100%", label: "Servicio gratuito" },
  { value: "35%", label: "Ahorro medio estimado" },
  { value: "+2.500", label: "Facturas optimizadas" }
];

export const servicesOverview = [
  {
    id: "empresas",
    title: "Empresas",
    path: "/empresas",
    badge: "Solución Corporativa",
    icon: "Building2",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    description: "Análisis y optimización de costes energéticos industriales y comerciales. Ajuste de potencia, tarifas pyme e inducción fotovoltaica.",
    features: [
      "Optimización de potencia contratada (P1-P6)",
      "Estudio de mercado entre +50 comercializadoras",
      "Consultoría de autoconsumo solar",
      "Seguimiento activo y alertas de vencimiento"
    ]
  },
  {
    id: "comunidades",
    title: "Comunidades de Vecinos",
    path: "/comunidades-de-vecinos",
    badge: "Gestión de Fincas",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    description: "Reducción directa de la cuota comunitaria optimizando el consumo de ascensores, garajes, bombas de agua e iluminación común.",
    features: [
      "Estudio gratuito de facturas de zonas comunes",
      "Eliminación de penalizaciones por reactiva",
      "Trámites de altas, bajas y cambios de titular",
      "Auditoría para alumbrado eficiente e ingeniería solar"
    ]
  },
  {
    id: "particulares",
    title: "Particulares",
    path: "/particulares",
    badge: "Ahorro Doméstico",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    description: "Pagos justos en tu hogar sin cambiar tus hábitos diarios. Encontramos la tarifa fija o indexada idónea para tu consumo familiar.",
    features: [
      "Revisión minuciosa sin coste financiero",
      "Asesoría para instalación de paneles solares",
      "Elección de la mejor tarifa (Fija / Indexada / 100% Verde)",
      "Re-estudio continuo ante fluctuaciones del mercado"
    ]
  }
];

export const valuePillars = [
  {
    icon: "Gift",
    title: "Asesoramiento 100% Gratuito",
    description: "Analizamos tu factura y consumo de luz sin ningún compromiso financiero ni coste oculto."
  },
  {
    icon: "Network",
    title: "Red con +50 Comercializadoras",
    description: "No dependemos de una sola eléctrica. Buscamos la oferta objetivamente más barata para ti."
  },
  {
    icon: "BarChart3",
    title: "Estudio Minucioso de Consumos",
    description: "Detectamos excesos de potencia contratada, cobros indebidos y tramos horarios desaprovechados."
  },
  {
    icon: "TrendingUp",
    title: "Maximización y Vigilancia de Ahorro",
    description: "Revisamos tus contratos periódicamente para garantizar que siempre disfrutes del precio más ajustado."
  }
];

export const testimonials = [
  {
    name: "Manuel Gómez",
    role: "Administrador de Fincas en Córdoba",
    text: "TúLuz logró reducir la factura de electricidad de 4 comunidades que gestionamos en más de un 28%. El proceso fue rápido y transparente.",
    rating: 5,
    tag: "Comunidades"
  },
  {
    name: "Carmen Ruiz",
    role: "Propietaria de Restaurante",
    text: "Con el estudio gratuito de mi factura pyme ahorramos casi 1.800€ al año. Nos ajustaron los tramos de potencia y cambiamos a una tarifa a precio de coste.",
    rating: 5,
    tag: "Empresas"
  },
  {
    name: "Javier Fernández",
    role: "Particular (Sevilla)",
    text: "No entendía mi factura de la luz. David me explicó todo con claridad, me cambió de compañía en 5 minutos y ahora pago 35€ menos al mes.",
    rating: 5,
    tag: "Particulares"
  }
];

export const faqs = [
  {
    q: "¿El servicio de asesoría energética es realmente gratuito?",
    a: "Sí, 100% gratuito para ti. En TúLuz realizamos el estudio de tus facturas, comparativa de mercado y trámites sin cobrarte absolutamente nada."
  },
  {
    q: "¿Tengo que cambiarme obligatoriamente de compañía eléctrica?",
    a: "No. Te presentamos el estudio con las mejores ofertas disponibles. Tú decides libremente si deseas realizar el cambio o mantener tu contrato actual."
  },
  {
    q: "¿Sufriré algún corte en el suministro eléctrico durante el cambio?",
    a: "Jamás. El cambio de comercializadora es un trámite puramente administrativo protegido por ley. Tu suministro de luz no se interrumpe en ningún momento."
  },
  {
    q: "¿Qué documentación necesito para solicitar el estudio gratuito?",
    a: "Tan solo necesitamos una factura de luz reciente (en PDF o foto) donde se aprecien los datos de consumo y potencia contratada."
  },
  {
    q: "¿Trabajáis solo en Córdoba o en toda Andalucía?",
    a: "Atendemos en toda Andalucía y en el territorio nacional español. Realizamos gestiones tanto presenciales como 100% digitales."
  }
];
