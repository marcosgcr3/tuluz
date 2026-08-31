export const companyInfo = {
  name: "tuLuz",
  brandName: "tuLuz",
  tagline: "Asesoramiento Energético",
  fullTagline: "Asesoramiento Energético en Luz y Gas para Hogares, Empresas y Comunidades",
  description: "tuLuz representa claridad, ahorro y un futuro sostenible. Asesoramos en electricidad y gas natural para que tomes mejores decisiones energéticas, optimices tu consumo y cuides lo que importa.",
  phone: "620 061 560",
  phoneRaw: "+34620061560",
  email: "davidad@tu-luz.es",
  address: "Av. del Aeropuerto, 6, Poniente Sur, 14004 Córdoba, España",
  city: "Córdoba",
  region: "Andalucía",
  country: "España",
  socials: {
    whatsapp: "https://wa.me/+34620061560?text=Hola,%20quisiera%20recibir%20asesoramiento%20gratuito%20para%20mis%20facturas%20de%20luz%20y%20gas."
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
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=75&fm=webp",
    description: "Análisis y optimización de costes energéticos de electricidad y gas para pymes e industrias. Ajuste de potencia, tarifas duales e inducción fotovoltaica.",
    features: [
      "Optimización de potencia contratada (P1-P6) y gas",
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
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=75&fm=webp",
    description: "Reducción directa de la cuota comunitaria optimizando el consumo de electricidad y gas (calefacción central, calderas, ascensores, garajes e iluminación).",
    features: [
      "Estudio gratuito de facturas de luz y gas comunitario",
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
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=75&fm=webp",
    description: "Pagos justos en luz y gas en tu hogar sin cambiar tus hábitos diarios. Encontramos la tarifa fija, indexada o paquete dual idónea para tu consumo familiar.",
    features: [
      "Revisión minuciosa de luz y gas sin coste",
      "Asesoría para instalación de paneles solares",
      "Mejor tarifa individual o paquete dual (Luz + Gas)",
      "Re-estudio continuo ante fluctuaciones del mercado"
    ]
  }
];

export const valuePillars = [
  {
    icon: "Lightbulb",
    title: "Claridad",
    subtitle: "Transparencia total",
    description: "Hablamos claro y simplificamos lo complejo para que siempre entiendas tus facturas de luz y gas."
  },
  {
    icon: "Leaf",
    title: "Sostenibilidad",
    subtitle: "Compromiso ecológico",
    description: "Comprometidos con el medio ambiente y las personas hacia una energía limpia y responsable."
  },
  {
    icon: "TrendingUp",
    title: "Eficiencia",
    subtitle: "Ahorro real",
    description: "Buscamos siempre la mejor solución energética comparando entre más de 50 comercializadoras."
  },
  {
    icon: "HandHeart",
    title: "Cercanía",
    subtitle: "Atención humana",
    description: "Acompañamos y escuchamos a cada cliente con un trato directo y asesoramiento a medida."
  }
];

export const testimonials = [
  {
    name: "Manuel Gómez",
    role: "Administrador de Fincas en Córdoba",
    text: "tuLuz logró reducir la factura de electricidad y calefacción comunitaria de 4 fincas que gestionamos en más de un 28%. El proceso fue rápido y transparente.",
    rating: 5,
    tag: "Comunidades"
  },
  {
    name: "Carmen Ruiz",
    role: "Propietaria de Restaurante",
    text: "Con el estudio gratuito de mis facturas de luz y gas ahorramos casi 1.800€ al año en el local. Nos ajustaron potencias y cambiamos a una tarifa a precio de coste.",
    rating: 5,
    tag: "Empresas"
  },
  {
    name: "Javier Fernández",
    role: "Particular (Sevilla)",
    text: "No entendía las tarifas de luz ni de gas. David me explicó todo con claridad, me cambió a una tarifa combinada en 5 minutos y ahora pago 45€ menos al mes.",
    rating: 5,
    tag: "Particulares"
  }
];

export const faqs = [
  {
    q: "¿Revisáis tanto facturas de luz como de gas?",
    a: "¡Sí! En tuLuz realizamos análisis completos tanto de contratos de electricidad (luz) como de gas natural, así como de tarifas combinadas (duales) para conseguir el máximo ahorro global."
  },
  {
    q: "¿El servicio de asesoría energética es realmente gratuito?",
    a: "Sí, 100% gratuito para ti. En tuLuz realizamos el estudio de tus facturas de luz y gas, comparativa de mercado y trámites sin cobrarte absolutamente nada."
  },
  {
    q: "¿Tengo que cambiarme obligatoriamente de compañía eléctrica o de gas?",
    a: "No. Te presentamos el estudio con las mejores ofertas disponibles. Tú decides libremente si deseas realizar el cambio o mantener tus contratos actuales."
  },
  {
    q: "¿Sufriré algún corte en el suministro durante el cambio?",
    a: "Jamás. El cambio de comercializadora es un trámite puramente administrativo protegido por ley. Tus suministros de luz y gas no se interrumpen en ningún momento."
  },
  {
    q: "¿Qué documentación necesito para solicitar el estudio gratuito?",
    a: "Tan solo necesitamos una factura reciente de luz y/o gas (en PDF o foto) donde se aprecien los datos de consumo y tarifa contratada."
  },
  {
    q: "¿En qué zonas trabajáis?",
    a: "Trabajamos en todo el territorio peninsular y en las islas (Baleares y Canarias), excepto en Ceuta y Melilla. Realizamos todas las gestiones de forma 100% digital y telefónica para tu máxima comodidad."
  }
];
