import fs from 'fs';
import path from 'path';

const rawData = [
  {
    keyword: "cómo saber qué potencia contratar en casa",
    title: "Cómo saber qué potencia contratar en casa",
    metaTitle: "Potencia contratada en casa: cómo calcularla | tuLuz",
    metaDescription: "Aprende a calcular la potencia que necesita tu vivienda y detecta si estás pagando de más.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "cómo bajar la potencia contratada",
    title: "Cómo bajar la potencia contratada sin cometer errores",
    metaTitle: "Bajar potencia contratada: pasos y ahorro | tuLuz",
    metaDescription: "Cuándo conviene reducir potencia, qué límites existen y cómo solicitar el cambio correctamente.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "diferencia entre potencia y energía eléctrica",
    title: "Potencia y energía eléctrica: diferencias que debes conocer",
    metaTitle: "Potencia y energía eléctrica: diferencias claras | tuLuz",
    metaDescription: "Entiende qué son kW y kWh, cómo afectan a tu recibo y por qué no son lo mismo.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "horas más baratas de la luz",
    title: "Horas más baratas de la luz: cuándo conviene consumir",
    metaTitle: "Horas baratas de luz: guía de consumo | tuLuz",
    metaDescription: "Aprende cómo funcionan punta, llano y valle y cuándo desplazar tu consumo eléctrico.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "qué es el CUPS y dónde encontrarlo",
    title: "Qué es el CUPS y dónde encontrarlo en tu factura",
    metaTitle: "Qué es el CUPS y dónde encontrarlo | tuLuz",
    metaDescription: "Te explicamos para qué sirve el CUPS, dónde aparece y cuándo te lo pedirán.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "cambio de titularidad luz qué necesito",
    title: "Cambio de titularidad de luz: requisitos y documentos",
    metaTitle: "Cambio de titularidad de luz: guía completa | tuLuz",
    metaDescription: "Todo lo necesario para cambiar el titular de un suministro eléctrico sin errores ni retrasos.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "cómo aumentar potencia contratada",
    title: "Cómo aumentar la potencia contratada de luz",
    metaTitle: "Aumentar potencia contratada: pasos y coste | tuLuz",
    metaDescription: "Cuándo aumentar potencia, qué revisar y cómo tramitar el cambio de forma segura.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "PVPC o mercado libre qué conviene",
    title: "PVPC o mercado libre: diferencias y cómo decidir",
    metaTitle: "PVPC o mercado libre: cuál te conviene | tuLuz",
    metaDescription: "Compara las características de la tarifa regulada y el mercado libre antes de revisar tu contrato.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "cómo saber si tengo PVPC",
    title: "Cómo saber si tienes PVPC o mercado libre",
    metaTitle: "Cómo saber si tienes PVPC o mercado libre | tuLuz",
    metaDescription: "Identifica tu tipo de tarifa, qué datos mirar y qué implica cada modalidad.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "bono social eléctrico requisitos",
    title: "Bono social eléctrico: requisitos y solicitud",
    metaTitle: "Bono social eléctrico: requisitos y solicitud | tuLuz",
    metaDescription: "Consulta quién puede solicitarlo, qué documentación hace falta y qué revisar antes de tramitarlo.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "qué electrodomésticos consumen más luz",
    title: "Qué electrodomésticos consumen más luz en casa",
    metaTitle: "Electrodomésticos que más consumen luz | tuLuz",
    metaDescription: "Identifica los aparatos que más influyen en tu consumo y cómo reducir su gasto.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "cuánto consume el stand by en casa",
    title: "Consumo en stand-by: cuánto gastan los aparatos apagados",
    metaTitle: "Consumo stand-by: cuánto cuesta y cómo reducirlo | tuLuz",
    metaDescription: "Averigua cuánto puede sumar el consumo fantasma y qué dispositivos conviene desconectar.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "cómo calcular consumo eléctrico de una empresa",
    title: "Cómo calcular el consumo eléctrico de una empresa",
    metaTitle: "Calcular consumo eléctrico de una empresa | tuLuz",
    metaDescription: "Guía para estimar el consumo de un negocio, localizar desviaciones y preparar una revisión energética.",
    category: "Empresas y Negocios"
  },
  {
    keyword: "auditoría energética para pymes",
    title: "Auditoría energética para pymes: qué revisar",
    metaTitle: "Auditoría energética para pymes: guía práctica | tuLuz",
    metaDescription: "Conoce los datos y facturas que conviene analizar para detectar oportunidades de ahorro.",
    category: "Empresas y Negocios"
  },
  {
    keyword: "cómo ahorrar luz en un restaurante",
    title: "Cómo ahorrar luz en un restaurante sin afectar al servicio",
    metaTitle: "Cómo ahorrar luz en un restaurante | tuLuz",
    metaDescription: "Medidas para cocina, cámaras, iluminación y horarios que ayudan a controlar el consumo.",
    category: "Empresas y Negocios"
  },
  {
    keyword: "cómo ahorrar luz en una oficina",
    title: "Cómo ahorrar electricidad en una oficina",
    metaTitle: "Cómo ahorrar electricidad en una oficina | tuLuz",
    metaDescription: "Acciones concretas para reducir el consumo de iluminación, climatización y equipos informáticos.",
    category: "Empresas y Negocios"
  },
  {
    keyword: "consumo eléctrico cámara frigorífica",
    title: "Cómo reducir el consumo de una cámara frigorífica",
    metaTitle: "Reducir consumo de una cámara frigorífica | tuLuz",
    metaDescription: "Claves para revisar el gasto de una cámara frigorífica y mejorar su eficiencia.",
    category: "Empresas y Negocios"
  },
  {
    keyword: "cambio de titularidad luz local comercial",
    title: "Cambio de titularidad de luz en un local comercial",
    metaTitle: "Cambio titularidad luz en local comercial | tuLuz",
    metaDescription: "Qué documentos necesitas y qué revisar al abrir, alquilar o traspasar un local.",
    category: "Empresas y Negocios"
  },
  {
    keyword: "cómo ahorrar luz en ascensor comunidad",
    title: "Cómo ahorrar luz en el ascensor de una comunidad",
    metaTitle: "Ahorrar luz en ascensor comunitario | tuLuz",
    metaDescription: "Medidas de mantenimiento, iluminación y uso para reducir el gasto del ascensor.",
    category: "Comunidades de Propietarios"
  },
  {
    keyword: "cómo ahorrar luz en garaje comunitario",
    title: "Cómo reducir el consumo de un garaje comunitario",
    metaTitle: "Ahorrar luz en un garaje comunitario | tuLuz",
    metaDescription: "Revisa iluminación, ventilación, horarios y potencia para bajar el gasto eléctrico del garaje.",
    category: "Comunidades de Propietarios"
  },
  {
    keyword: "cómo leer contador digital de luz",
    title: "Cómo leer un contador digital de luz paso a paso",
    metaTitle: "Cómo leer un contador digital de luz | tuLuz",
    metaDescription: "Aprende qué datos muestra un contador inteligente y cuáles necesitas para revisar tu consumo.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "cómo consultar consumo de luz por horas",
    title: "Cómo consultar tu consumo de luz por horas",
    metaTitle: "Consultar consumo de luz por horas | tuLuz",
    metaDescription: "Descubre cómo ver tu consumo horario y usar esos datos para tomar mejores decisiones.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "cómo calcular consumo eléctrico de una vivienda",
    title: "Cómo calcular el consumo eléctrico de una vivienda",
    metaTitle: "Calcular consumo eléctrico de una vivienda | tuLuz",
    metaDescription: "Estima el consumo de tu hogar a partir de tus aparatos, hábitos y horas de uso.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "consumo aire acondicionado por hora",
    title: "Cuánto consume un aire acondicionado por hora",
    metaTitle: "Consumo de aire acondicionado por hora | tuLuz",
    metaDescription: "Calcula el gasto aproximado de tu aire acondicionado y aprende a reducirlo sin perder confort.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "consumo calefactor eléctrico por hora",
    title: "Cuánto consume un calefactor eléctrico por hora",
    metaTitle: "Consumo de calefactor eléctrico por hora | tuLuz",
    metaDescription: "Averigua cuánto puede gastar un calefactor y qué alternativas reducen el consumo en invierno.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "cuánto consume una secadora",
    title: "Cuánto consume una secadora y cómo usarla mejor",
    metaTitle: "Consumo de una secadora: gasto y consejos | tuLuz",
    metaDescription: "Conoce el consumo de una secadora, qué factores lo cambian y cómo optimizar cada ciclo.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "cuánto consume un termo eléctrico",
    title: "Cuánto consume un termo eléctrico al mes",
    metaTitle: "Consumo de termo eléctrico al mes | tuLuz",
    metaDescription: "Calcula el gasto de un termo eléctrico y revisa temperatura, capacidad y horarios de funcionamiento.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "qué hacer si salta el diferencial",
    title: "Qué hacer si salta el diferencial de casa",
    metaTitle: "Salta el diferencial: causas y qué hacer | tuLuz",
    metaDescription: "Identifica causas habituales de un salto del diferencial y cuándo debes contactar con un profesional.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "diferencia ICP y diferencial",
    title: "Diferencia entre ICP, magnetotérmico y diferencial",
    metaTitle: "ICP, magnetotérmico y diferencial: diferencias | tuLuz",
    metaDescription: "Entiende qué protege cada elemento del cuadro eléctrico y qué significa cuando se dispara.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "cómo dar de alta la luz en una vivienda",
    title: "Cómo dar de alta la luz en una vivienda",
    metaTitle: "Dar de alta la luz: requisitos y pasos | tuLuz",
    metaDescription: "Qué necesitas para activar un suministro eléctrico nuevo, alquilado o que lleva tiempo inactivo.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "qué es el certificado de instalación eléctrica",
    title: "Qué es el boletín eléctrico y cuándo lo necesitas",
    metaTitle: "Boletín eléctrico: qué es y cuándo necesitas | tuLuz",
    metaDescription: "Te explicamos para qué sirve el certificado de instalación eléctrica y en qué trámites se solicita.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "cómo cambiar domiciliación factura luz",
    title: "Cómo cambiar la cuenta bancaria de la factura de luz",
    metaTitle: "Cambiar cuenta bancaria de la luz | tuLuz",
    metaDescription: "Pasos y datos que conviene revisar al modificar la domiciliación de tu contrato eléctrico.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "cuánto tarda un cambio de comercializadora luz",
    title: "Cuánto tarda un cambio de comercializadora de luz",
    metaTitle: "Cambio de comercializadora: cuánto tarda | tuLuz",
    metaDescription: "Conoce los plazos habituales, qué gestiona la nueva compañía y cómo comprobar el estado del cambio.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "qué hacer si me cambian compañía luz sin permiso",
    title: "Me han cambiado de compañía de luz sin permiso: qué hacer",
    metaTitle: "Cambio de compañía sin permiso: qué hacer | tuLuz",
    metaDescription: "Pasos para revisar el contrato, conservar pruebas y reclamar ante un cambio no autorizado.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "cruce de CUPS qué es",
    title: "Cruce de CUPS: qué es y cómo actuar",
    metaTitle: "Cruce de CUPS: cómo detectarlo y reclamar | tuLuz",
    metaDescription: "Aprende a detectar un CUPS erróneo durante una contratación y qué datos debes comprobar.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "diferencia distribuidora y comercializadora",
    title: "Diferencia entre distribuidora y comercializadora",
    metaTitle: "Distribuidora y comercializadora: diferencias | tuLuz",
    metaDescription: "Aprende quién gestiona la red, quién factura y a quién dirigirte ante cada incidencia.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "qué hacer si no llega factura de luz",
    title: "No me llega la factura de luz: causas y soluciones",
    metaTitle: "No llega la factura de luz: qué hacer | tuLuz",
    metaDescription: "Revisa qué puede estar ocurriendo con tus facturas y qué comprobaciones hacer antes de reclamar.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "cómo reclamar factura de luz incorrecta",
    title: "Cómo reclamar una factura de luz incorrecta",
    metaTitle: "Reclamar una factura de luz incorrecta | tuLuz",
    metaDescription: "Guía para revisar cargos, reunir información y presentar una reclamación con orden y evidencia.",
    category: "Mercado y Tarifas"
  },
  {
    keyword: "consumo eléctrico de un coche eléctrico en casa",
    title: "Cuánto consume cargar un coche eléctrico en casa",
    metaTitle: "Cargar coche eléctrico en casa: consumo | tuLuz",
    metaDescription: "Calcula el consumo aproximado de recargar un vehículo eléctrico y qué factores influyen en el coste.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "mejor hora para cargar coche eléctrico en casa",
    title: "Cuándo cargar un coche eléctrico en casa",
    metaTitle: "Mejor hora para cargar coche eléctrico | tuLuz",
    metaDescription: "Descubre cómo planificar la recarga doméstica según tu consumo, potencia y periodos horarios.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "cómo calcular potencia para cargador coche eléctrico",
    title: "Qué potencia necesitas para cargar un coche eléctrico",
    metaTitle: "Potencia para cargador de coche eléctrico | tuLuz",
    metaDescription: "Qué revisar antes de instalar o usar un cargador doméstico: potencia disponible, hábitos y seguridad.",
    category: "Hogar y Consumo"
  },
  {
    keyword: "consumo eléctrico de una panadería",
    title: "Cómo reducir el consumo eléctrico de una panadería",
    metaTitle: "Ahorrar electricidad en una panadería | tuLuz",
    metaDescription: "Medidas para revisar hornos, frío, iluminación y horarios en una panadería o pastelería.",
    category: "Empresas y Negocios"
  },
  {
    keyword: "consumo eléctrico de una lavandería",
    title: "Cómo reducir el consumo eléctrico de una lavandería",
    metaTitle: "Ahorrar electricidad en una lavandería | tuLuz",
    metaDescription: "Claves para controlar consumo de lavadoras, secadoras, agua caliente y horas de máxima demanda.",
    category: "Empresas y Negocios"
  },
  {
    keyword: "ahorro energético en una peluquería",
    title: "Cómo ahorrar electricidad en una peluquería",
    metaTitle: "Ahorrar electricidad en una peluquería | tuLuz",
    metaDescription: "Revisa secadores, climatización, iluminación y hábitos de uso para controlar el gasto del salón.",
    category: "Empresas y Negocios"
  },
  {
    keyword: "cómo medir consumo eléctrico por máquinas",
    title: "Cómo medir el consumo eléctrico de cada máquina",
    metaTitle: "Medir consumo eléctrico por máquinas | tuLuz",
    metaDescription: "Aprende a separar consumos por equipos para detectar qué máquinas elevan el gasto de tu negocio.",
    category: "Empresas y Negocios"
  },
  {
    keyword: "consumo eléctrico de iluminación LED negocio",
    title: "Cómo calcular el consumo de iluminación LED en un negocio",
    metaTitle: "Consumo iluminación LED en negocios | tuLuz",
    metaDescription: "Calcula el impacto de tu iluminación y detecta oportunidades de mejora en locales y oficinas.",
    category: "Empresas y Negocios"
  },
  {
    keyword: "cómo repartir gasto luz zonas comunes",
    title: "Cómo repartir el gasto de luz en zonas comunes",
    metaTitle: "Repartir gasto de luz en zonas comunes | tuLuz",
    metaDescription: "Explica qué consumos se incluyen en las zonas comunes y qué información debe revisar una comunidad.",
    category: "Comunidades de Propietarios"
  },
  {
    keyword: "consumo ventilación garaje comunitario",
    title: "Cómo reducir el consumo de ventilación en un garaje",
    metaTitle: "Consumo de ventilación en garaje comunitario | tuLuz",
    metaDescription: "Revisa horarios, sistemas de control y mantenimiento para reducir el gasto de ventilación del garaje.",
    category: "Comunidades de Propietarios"
  },
  {
    keyword: "ahorro iluminación portal comunidad vecinos",
    title: "Cómo ahorrar luz en el portal de una comunidad",
    metaTitle: "Ahorrar iluminación en portal comunitario | tuLuz",
    metaDescription: "Medidas prácticas para mejorar iluminación, temporización y consumo de las zonas de acceso.",
    category: "Comunidades de Propietarios"
  },
  {
    keyword: "consumo piscina comunitaria",
    title: "Cómo reducir el consumo eléctrico de una piscina comunitaria",
    metaTitle: "Reducir consumo de piscina comunitaria | tuLuz",
    metaDescription: "Claves para revisar depuración, horarios, iluminación y potencia en una piscina de comunidad.",
    category: "Comunidades de Propietarios"
  }
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate complete guide object
function buildGuideObject(item) {
  const slug = slugify(item.keyword);
  const baseId = slug;

  return {
    id: baseId,
    slug: slug,
    keyword: item.keyword,
    title: item.title,
    metaTitle: item.metaTitle,
    metaDescription: item.metaDescription,
    category: item.category,
    readTime: "6 min de lectura",
    publishedAt: "2026-09-14",
    updatedAt: "2026-09-14",
    author: {
      name: "Equipo Técnico tuLuz",
      role: "Especialistas en Eficiencia y Mercado Eléctrico",
      avatar: "/icono.webp"
    },
    excerpt: item.metaDescription,
    tableOfContents: [
      { id: "introduccion-claves", title: `1. Claves esenciales sobre ${item.keyword}` },
      { id: "analisis-detallado", title: "2. Análisis paso a paso y recomendaciones prácticas" },
      { id: "impacto-factura", title: "3. Cómo repercute en tu factura y ahorro estimado" },
      { id: "preguntas-frecuentes", title: "4. Preguntas frecuentes" }
    ],
    sections: [
      {
        id: "introduccion-claves",
        title: `1. Claves esenciales sobre ${item.keyword}`,
        content: `Comprender a fondo **${item.keyword}** es fundamental para optimizar tu suministro eléctrico y evitar sobrecostes innecesarios en tus facturas. En España, las tarifas y condiciones de acceso a la red cuentan con especificaciones técnicas que muchos usuarios desconocen, lo que deriva en pagos excesivos mes a mes.\n\n${item.metaDescription}`,
        callout: {
          type: "tip",
          title: "Consejo de Asesor tuLuz",
          text: `Antes de realizar cualquier gestión o modificación contractual respecto a ${item.keyword}, solicita una revisión de tus últimas 3 facturas para confirmar que los datos de potencia y consumo coinciden con tus necesidades reales.`
        }
      },
      {
        id: "analisis-detallado",
        title: "2. Análisis paso a paso y recomendaciones prácticas",
        content: `Para actuar con seguridad y conseguir los mejores resultados en tu instalación, sigue estos puntos clave recomendados por nuestros técnicos especialistas:`,
        bullets: [
          `**Verifica los datos técnicos de tu contrato:** Revisa en tu recibo los conceptos de término de potencia y energía contratada asociados a este trámite.`,
          `**Compara opciones del mercado:** Evalúa si las condiciones ofrecidas se ajustan al mercado libre o regulado y si aplican permanencias o servicios adicionales.`,
          `**Aplica medidas de eficiencia activa:** Ajusta horarios de uso y programas de mantenimiento preventivo para evitar picos de demanda innecesarios.`
        ]
      },
      {
        id: "impacto-factura",
        title: "3. Cómo repercute en tu factura y ahorro estimado",
        content: `Una gestión correcta en relación con **${item.title}** puede traducirse en una reducción directa de entre un **15% y un 30% en tu gasto energético anual**.\n\nOptimizar términos fijos y variables garantiza que solo pagas por la potencia y energía que efectivamente utilizas, eliminando sobrecostes derivados de configuraciones inadecuadas o penalizaciones en la red.`,
        callout: {
          type: "tip",
          title: "¿Necesitas ayuda personalizada?",
          text: "En tuLuz analizamos tu factura de luz de forma totalmente gratuita y sin compromiso, indicándote exactamente dónde puedes recortar costes."
        }
      }
    ],
    faqs: [
      {
        q: `¿Cuánto tiempo tarda en aplicarse cualquier gestión relacionada con ${item.keyword}?`,
        a: "La mayoría de trámites administrativos y cambios de configuración técnica con la distribuidora se hacen efectivos en un plazo de entre 2 y 15 días hábiles."
      },
      {
        q: "¿Tiene algún coste para el usuario?",
        a: "Depende de la naturaleza del trámite. La revisión y optimización de tarifas es gratuita con tuLuz. Ciertas modificaciones técnicas (como variaciones de potencia o derechos de acceso) pueden incluir tasas reguladas por la distribuidora."
      }
    ],
    relatedSlugs: ["ahorrar-factura-de-la-luz", "tarifas-luz-empresas"]
  };
}

export function generateAllGuides() {
  const generated = rawData.map(buildGuideObject);
  return generated;
}
