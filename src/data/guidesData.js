// Base de datos de Guías de Ahorro Energético tuLuz
// Artículos optimizados para posicionamiento orgánico en motores de búsqueda y buscadores de IA.

export const guidesData = [
  {
    id: 'ahorrar-factura-de-la-luz',
    slug: 'ahorrar-factura-de-la-luz',
    keyword: 'ahorrar factura de la luz',
    title: 'Cómo ahorrar en la factura de la luz en 2026: 10 claves definitivas y análisis de tu recibo',
    metaTitle: 'Cómo Ahorrar en la Factura de la Luz en 2026 | Guía Definitiva tuLuz',
    metaDescription: 'Descubre cómo ahorrar en la factura de la luz hasta un 35%: optimización de potencia (kW), tramos horarios 2.0TD (punta, llano, valle) y revisión de tarifas ocultas.',
    category: 'Hogar y Consumo',
    readTime: '7 min de lectura',
    publishedAt: '2026-03-15',
    updatedAt: '2026-09-10',
    author: {
      name: 'Equipo Técnico tuLuz',
      role: 'Especialistas en Eficiencia y Mercado Eléctrico',
      avatar: '/icono.webp'
    },
    excerpt: 'Reducir el importe de tu recibo eléctrico no significa pasar frío o prescindir del confort. Conoce las 10 medidas técnicas y contractuales más efectivas para recortar hasta un 35% mensual.',
    tableOfContents: [
      { id: 'anatomia-factura', title: '1. Anatomía de la factura: qué pagas realmente' },
      { id: 'ajustar-potencia', title: '2. Ajustar la potencia contratada (término fijo)' },
      { id: 'tramos-horarios', title: '3. Comprender los tramos horarios 2.0TD' },
      { id: 'fija-vs-indexada', title: '4. ¿Tarifa fija o tarifa indexada al mercado?' },
      { id: 'servicios-ocultos', title: '5. Eliminar servicios de mantenimiento innecesarios' },
      { id: 'habitos-eficientes', title: '6. Electrodomésticos y hábitos de alto impacto' },
      { id: 'tabla-ahorro', title: '7. Tabla comparativa de impacto de ahorro' },
      { id: 'preguntas-frecuentes', title: '8. Preguntas frecuentes sobre el recibo' }
    ],
    sections: [
      {
        id: 'anatomia-factura',
        title: '1. Anatomía de la factura de la luz: qué pagas realmente en cada recibo',
        content: `Para saber cómo **ahorrar factura de la luz**, el primer paso imprescindible es comprender los conceptos que componen el documento emitido por tu comercializadora. La mayoría de los usuarios se fijan únicamente en el importe final, pero el ahorro real se consigue desglosando cada línea:`,
        bullets: [
          '**Término de potencia (kW):** Es el coste fijo que abonas tengas o no encendidas las luces. Se calcula multiplicando la potencia contratada por el número de días del ciclo de facturación y el precio del kW fijado en tu contrato.',
          '**Término de energía (kWh):** Es la parte variable y representa el consumo efectivo de electricidad. Se obtiene multiplicando los kilovatios hora consumidos por el precio de la energía acordado.',
          '**Impuesto Especial sobre la Electricidad (IEE):** Gravamen regulado aplicado sobre la suma de potencia y energía.',
          '**Alquiler del contador digital:** Cuota mensual fija regulada por la distribuidora de tu zona (habitualmente entre 0,80€ y 1,50€/mes).',
          '**Servicios adicionales y seguros:** Mantenimientos de urgencia, asistencias eléctricas o seguros de pagos que con frecuencia encarecen la factura entre 4€ y 15€ adicionales cada mes sin que el usuario sea consciente.',
          '**IVA (Impuesto sobre el Valor Añadido):** Aplicado sobre el total acumulado de la factura.'
        ]
      },
      {
        id: 'ajustar-potencia',
        title: '2. Ajustar la potencia contratada: el ahorro fijo garantizado',
        content: `Cerca del 65% de los hogares en España pagan por más potencia de la que realmente necesitan. Reducir un solo tramo de potencia (por ejemplo, de 4,6 kW a 3,45 kW) supone un ahorro directo de entre **50€ y 90€ al año**, independientemente de cuánta electricidad consumas.`,
        callout: {
          type: 'tip',
          title: '¿Cómo saber tu potencia máxima demandada?',
          text: 'Puedes consultar los picos máximos demandados de los últimos 12 meses accediendo al portal web de tu distribuidora eléctrica (i-DE, e-distribución, UFD, E-Redes). Si tu pico más alto nunca ha superado los 3,2 kW, pagar por 4,6 kW o 5,75 kW es un gasto completamente prescindible.'
        }
      },
      {
        id: 'tramos-horarios',
        title: '3. Comprender los tramos horarios de la tarifa 2.0TD',
        content: `Todas las tarifas domésticas y de pequeños comercios con potencia inferior o igual a 15 kW se rigen por el peaje de acceso **2.0TD**, que divide el consumo de energía en tres periodos durante los días laborables:`,
        table: {
          headers: ['Periodo', 'Horario (Laborables)', 'Coste relativo', 'Estrategia recomendada'],
          rows: [
            ['Punta (P1)', '10:00 - 14:00 y 18:00 - 22:00', 'Más costoso', 'Evitar electrodomésticos térmicos (horno, lavadora, secadora)'],
            ['Llano (P2)', '08:00 - 10:00, 14:00 - 18:00 y 22:00 - 00:00', 'Intermedio', 'Consumo equilibrado, cocina diaria y teletrabajo'],
            ['Valle (P3)', '00:00 - 08:00 + Fines de semana y festivos 24h', 'Más económico', 'Programación de lavavajillas, recarga de vehículo eléctrico y termos']
          ]
        }
      },
      {
        id: 'fija-vs-indexada',
        title: '4. ¿Tarifa con precio fijo o tarifa indexada al mercado mayorista?',
        content: `A la hora de elegir contrato, surgen dos modalidades principales:`,
        bullets: [
          '**Tarifa con precio fijo:** Pagas el mismo importe pactado por cada kWh durante las 24 horas del día (o por tramos preestablecidos). Aporta tranquilidad presupuestaria total y protección ante fluctuaciones bruscas del mercado mayorista.',
          '**Tarifa indexada (precio de coste + fee):** Pagas la energía al precio real que cotiza el mercado mayorista (OMIE) en cada hora, más un pequeño margen de gestión de la comercializadora. Históricamente, en periodos de alta producción renovable (solar y eólica), las tarifas indexadas ofrecen precios mínimos durante las horas centrales del día.'
        ],
        callout: {
          type: 'important',
          title: 'El consejo de tuLuz:',
          text: 'No existe una tarifa universal perfecta. La mejor tarifa depende de tu perfil horario de consumo. Por eso en tuLuz comparamos más de 50 comercializadoras con tu curva horaria real para recomendarte la que minimice tu coste neto.'
        }
      },
      {
        id: 'servicios-ocultos',
        title: '5. Eliminar servicios de mantenimiento y asistencias innecesarias',
        content: `Una práctica recurrente de muchas grandes eléctricas tradicionales consiste en aplicar promociones iniciales que incluyen "gratuitamente" servicios de protección de pagos o reparación de averías durante los primeros meses. Al vencer el periodo promocional, estos servicios pasan a cobrarse a precios que oscilan entre **4,99€ y 14,50€ al mes**.\n\nRevisar detalladamente las últimas páginas del recibo y cancelar estos servicios vinculados puede suponer un recorte inmediato de **60€ a 170€ al año** sin alterar en lo más mínimo la calidad del suministro eléctrico.`
      },
      {
        id: 'habitos-eficientes',
        title: '6. Electrodomésticos y hábitos de alto impacto en el consumo',
        content: `Pequeños ajustes en la gestión de tus electrodomésticos generan reducciones medibles en los kilovatios hora facturados:`,
        bullets: [
          '**Frigorífico y congelador:** Representan más del 30% del consumo de un hogar. Ajustar el termostato a 4°C en refrigeración y -18°C en congelación evita sobrecargas térmicas innecesarias.',
          '**Lavado a baja temperatura:** El 80% de la energía que consume una lavadora se destina a calentar el agua. Lavar a 30°C en lugar de 60°C ahorra hasta un 55% de electricidad por ciclo.',
          '**Stand-by o consumo fantasma:** Televisores, ordenadores, cargadores y consolas en modo de espera generan entre un 7% y un 10% del gasto eléctrico anual. Utilizar regletas con interruptor corta este drenaje.',
          '**Iluminación LED de alta eficiencia:** Sustituir halógenos tradicionales por tecnología LED amortiza el coste en menos de 4 meses con un 85% menos de potencia por lumen emitido.'
        ]
      },
      {
        id: 'tabla-ahorro',
        title: '7. Tabla comparativa: impacto real de ahorro anual estimado',
        content: `A continuación detallamos el potencial de ahorro acumulado que logran habitualmente los clientes que optimizan su contrato con **tuLuz**:`,
        table: {
          headers: ['Acción de optimización', 'Ahorro medio anual', 'Dificultad', 'Tiempo de ejecución'],
          rows: [
            ['Ajuste de potencia contratada (kW)', '60€ - 120€', 'Baja (gestión administrativa)', '1 semana'],
            ['Eliminación de mantenimientos ocultos', '60€ - 170€', 'Baja (baja de servicio)', 'Inmediato'],
            ['Cambio a la mejor tarifa del mercado libre', '120€ - 280€', 'Baja (sin corte de luz)', '3 - 5 días hábiles'],
            ['Aprovechamiento de horas valle / solares', '80€ - 150€', 'Media (hábitos)', 'Continuo'],
            ['Instalación de autoconsumo solar fotovoltaico', '450€ - 1.100€', 'Media-Alta (instalación)', '2 - 3 semanas']
          ]
        }
      }
    ],
    faqs: [
      {
        q: '¿Cuánto puedo ahorrar en mi factura de la luz cambiando de compañía?',
        a: 'El ahorro medio que consiguen nuestros clientes en tuLuz oscila entre el 20% y el 35% del total de la factura, lo que representa entre 150€ y más de 350€ al año para un hogar medio, sin coste de gestión.'
      },
      {
        q: '¿Me pueden cortar la luz si solicito un cambio de tarifa o de comercializadora?',
        a: 'No, en ningún caso. El suministro eléctrico continúa sin interrupción porque el transporte y la distribución física de la electricidad dependen de la empresa distribuidora de tu zona geográfica, no de la comercializadora con la que contrates la factura.'
      },
      {
        q: '¿Cuánto cuesta cambiar de compañía eléctrica?',
        a: 'El cambio de comercializadora en el mercado libre español es 100% gratuito por ley, siempre que no tengas una cláusula de permanencia vigente en tu contrato anterior.'
      },
      {
        q: '¿Qué diferencia hay entre distribuidora y comercializadora?',
        a: 'La distribuidora es la dueña de los cables, contadores y postes de tu zona (no se puede elegir). La comercializadora es la empresa que te vende la energía y te emite la factura (puedes elegir libremente entre más de 50 opciones en el mercado).'
      }
    ],
    relatedSlugs: ['comparador-comercializadoras-luz-y-gas', 'placas-solares-particulares-precio']
  },
  {
    id: 'tarifas-luz-empresas',
    slug: 'tarifas-luz-empresas',
    keyword: 'tarifas luz empresas',
    title: 'Tarifas de luz para empresas: cómo reducir el coste energético en pymes e industrias',
    metaTitle: 'Tarifas de Luz para Empresas y Pymes | Optimización Energética tuLuz',
    metaDescription: 'Descubre cómo elegir y negociar las mejores tarifas de luz para empresas (3.0TD y 6.XTD). Elimina penalizaciones por maxímetro, reactiva y optimiza tus contratos.',
    category: 'Empresas y Negocios',
    readTime: '9 min de lectura',
    publishedAt: '2026-03-20',
    updatedAt: '2026-09-10',
    author: {
      name: 'Área de Grandes Cuentas tuLuz',
      role: 'Consultoría Energética Industrial y Pyme',
      avatar: '/icono.webp'
    },
    excerpt: 'La energía es uno de los mayores costes operativos en cualquier empresa. Aprende a descifrar los peajes 3.0TD y 6.XTD, eliminar penalizaciones por maxímetro o reactiva y negociar coberturas óptimas.',
    tableOfContents: [
      { id: 'peajes-empresariales', title: '1. Tipos de tarifas y peajes para empresas (2.0TD, 3.0TD, 6.XTD)' },
      { id: 'penalizaciones-maximetro', title: '2. Penalizaciones por exceso de potencia y maxímetro' },
      { id: 'energia-reactiva', title: '3. El recargo silencioso: energía reactiva e inductiva' },
      { id: 'modalidades-fija-indexada', title: '4. Modalidades de contratación: ¿Fija, Indexada o Mixta?' },
      { id: 'curva-carga-cuartohoraria', title: '5. Análisis de curvas de carga cuartohorarias' },
      { id: 'caso-practico-pyme', title: '6. Caso práctico de optimización en pyme' },
      { id: 'preguntas-frecuentes', title: '7. Preguntas frecuentes en tarifas para empresas' }
    ],
    sections: [
      {
        id: 'peajes-empresariales',
        title: '1. Clasificación de tarifas de luz para empresas: 2.0TD, 3.0TD y 6.XTD',
        content: `El marco regulatorio clasifica los puntos de suministro en función de su tensión de red y la potencia contratada. Conocer el peaje que le corresponde a tu instalación es crucial para contratar correctamente:`,
        bullets: [
          '**Tarifa 2.0TD (Baja Tensión, hasta 15 kW):** Destinada a pequeños despachos, oficinas comerciales y microempresas. Dispone de 2 periodos de potencia y 3 periodos de energía.',
          '**Tarifa 3.0TD (Baja Tensión, más de 15 kW contratados en al menos un periodo):** El estándar de pymes, comercios con refrigeración, talleres, restaurantes y naves de mediano tamaño. Cuenta con **6 periodos de potencia (P1 a P6)** y **6 periodos de energía**.',
          '**Tarifas 6.1TD a 6.4TD (Alta Tensión):** Diseñadas para fábricas, industrias intensivas y centros logísticos con potencias superiores a 450 kW conectadas a redes de media o alta tensión (de 1 kV a más de 72,5 kV).'
        ],
        callout: {
          type: 'important',
          title: 'Regla de potencias crecientes en 3.0TD y 6.XTD:',
          text: 'Por normativa técnica regulada (Real Decreto), la potencia contratada en cada periodo debe ser igual o superior a la del periodo anterior: P1 ≤ P2 ≤ P3 ≤ P4 ≤ P5 ≤ P6. Un error en esta configuración puede provocar bloqueos administrativos o sobrecostes innecesarios.'
        }
      },
      {
        id: 'penalizaciones-maximetro',
        title: '2. Penalizaciones por exceso de potencia: cómo evitar el recargo del maxímetro',
        content: `A diferencia de las viviendas donde el ICP "salta" cuando se supera la potencia, en suministros de empresas con tarifas 3.0TD y 6.XTD la electricidad no se corta: se mide mediante un **maxímetro** o integrador cuartohorario.\n\nSi durante un intervalo de 15 minutos tu maquinaria o climatización demanda más potencia de la contratada en ese periodo, la distribuidora factura una **penalización por exceso de potencia**. En empresas industriales, estos excesos pueden sumar cientos o miles de euros extra cada mes.\n\n**Solución tuLuz:** Monitorizamos tu histórico de telemedida para reajustar las potencias P1-P6 exactamente al perfil de tu operativa, eliminando las penalizaciones o ajustando a la baja periodos ociosos (como turnos de noche o fines de semana).`
      },
      {
        id: 'energia-reactiva',
        title: '3. El recargo silencioso de la energía reactiva: causas y solución',
        content: `La energía reactiva es demandada por equipos que contienen motores, bobinas, transformadores o tubos fluorescentes (cámaras frigoríficas, compresores, ascensores, maquinaria industrial). Si el factor de potencia cae por debajo de 0,95, la distribuidora aplica un recargo económico por cada kVArh excedente.`,
        bullets: [
          '**¿Cómo se elimina?** La instalación de una **batería de condensadores automática** dimensionada a la carga de la planta neutraliza la energía reactiva inductiva.',
          '**Retorno de inversión:** En instalaciones con penalizaciones mensuales superiores a 80€-200€, la batería de condensadores se amortiza en menos de 6 a 12 meses, protegiendo además los transformadores de la empresa.'
        ]
      },
      {
        id: 'modalidades-fija-indexada',
        title: '4. Modalidades de contratación para empresas: ¿Fija, Indexada o Mixta (PPA)?',
        content: `La elección contractual impacta directamente en la cuenta de resultados de la compañía:`,
        table: {
          headers: ['Modalidad', 'Ventajas principales', 'Riesgos asociados', 'Recomendado para'],
          rows: [
            ['Precio Fijo', 'Presupuesto cerrado sin sorpresas durante 12-24 meses.', 'Precios habitualmente más altos con primas de riesgo de la comercializadora.', 'Empresas con márgenes estrictos que no pueden tolerar volatilidad.'],
            ['Indexada al Pool (OMIE)', 'Sin prima de cobertura comercial. Aprovecha precios mínimos en horas solares.', 'Sensibilidad a subidas puntuales del mercado mayorista.', 'Empresas con capacidad de desplazar consumo a horas centrales o nocturnas.'],
            ['Mixta / Con Coberturas (PPA)', 'Bloqueo de un % de consumo a precio fijo y el resto a mercado indexado.', 'Requiere asesoramiento técnico profesional continuado.', 'Empresas medianas y grandes con consumos superiores a 100 MWh/año.']
          ]
        }
      },
      {
        id: 'curva-carga-cuartohoraria',
        title: '5. La importancia de la curva de carga cuartohoraria en la negociación',
        content: `Las comercializadoras asignan un precio personalizado a cada empresa basándose en su **curva de carga**. Un negocio cuyo 80% de actividad se realiza en horas de alta radiación solar (donde la energía mayorista suele estar en valores mínimos) puede negociar tarifas sustancialmente más agresivas que una empresa que concentre su actividad en horas punta nocturnas.\n\nEn tuLuz extraemos los ficheros de telemedida oficiales de la distribuidora para lanzar rondas de licitación entre más de 50 comercializadoras, obligándolas a competir por tu suministro.`
      },
      {
        id: 'caso-practico-pyme',
        title: '6. Caso de éxito: reducción del 31% en el gasto eléctrico de un taller mecanizado',
        content: `**Situación inicial:** Taller con tarifa 3.0TD pagando una media de 1.840€/mes. Contrataba 45 kW en todos los periodos y sufría recargos constantes por reactiva de 145€/mes.\n\n**Acciones implementadas por tuLuz:**\n1. Reajuste de potencias P1-P6 según telemedida real (reduciendo P4-P6 a 22 kW en periodos no laborables).\n2. Instalación de batería de condensadores con financiación sin desembolso inicial.\n3. Licitación del contrato de energía indexado con fee comercial de solo 0,006€/kWh.\n\n**Resultado:** La factura media se redujo a 1.270€/mes, logrando un **ahorro neto anual de 6.840€**.`
      }
    ],
    faqs: [
      {
        q: '¿Qué documentos necesita tuLuz para hacer un estudio de tarifas de empresa?',
        a: 'Únicamente una factura completa y reciente (las hojas donde figuran los desgloses de potencia y lecturas de maxímetro) y el CIF de la empresa. Si dispones de acceso a telemedida, analizamos también la curva de carga cuartohoraria.'
      },
      {
        q: '¿Tenemos que cambiar de contador si cambiamos de tarifa o comercializadora?',
        a: 'No. El contador fiscal digital pertenece a la distribuidora y es totalmente compatible con cualquier comercializadora del mercado eléctrico nacional.'
      },
      {
        q: '¿Cuánto tiempo tarda en aplicarse el cambio de contrato en una tarifa 3.0TD?',
        a: 'El cambio administrativo tarda entre 3 y 8 días hábiles, sin ninguna interrupción en la producción ni en el suministro eléctrico de la empresa.'
      }
    ],
    relatedSlugs: ['comparador-comercializadoras-luz-y-gas', 'autoconsumo-solar-comunidades-de-vecinos']
  },
  {
    id: 'autoconsumo-solar-comunidades-de-vecinos',
    slug: 'autoconsumo-solar-comunidades-de-vecinos',
    keyword: 'autoconsumo solar comunidades de vecinos',
    title: 'Autoconsumo solar en comunidades de vecinos: guía completa de instalación compartida y normativa',
    metaTitle: 'Autoconsumo Solar en Comunidades de Vecinos | Normativa y Ahorro tuLuz',
    metaDescription: 'Todo sobre el autoconsumo solar en comunidades de propietarios: ley de propiedad horizontal, mayorías necesarias, coeficientes de reparto beta y reducción de cuotas.',
    category: 'Comunidades de Propietarios',
    readTime: '8 min de lectura',
    publishedAt: '2026-03-25',
    updatedAt: '2026-09-10',
    author: {
      name: 'Departamento de Comunidades tuLuz',
      role: 'Asesoría Especializada en Propiedad Horizontal',
      avatar: '/icono.webp'
    },
    excerpt: 'Instalar paneles solares fotovoltaicos en la cubierta de un edificio de vecinos permite desplomar la factura comunitaria e incluso alimentar las viviendas de los propietarios participantes. Te explicamos los pasos legales y técnicos.',
    tableOfContents: [
      { id: 'marco-normativo', title: '1. Marco legal: Real Decreto 244/2019 y Ley de Propiedad Horizontal' },
      { id: 'mayorias-junta', title: '2. ¿Qué mayoría se necesita en junta de propietarios?' },
      { id: 'modelos-autoconsumo', title: '3. Modelos: zonas comunes vs reparto entre vecinos' },
      { id: 'coeficientes-reparto', title: '4. Coeficientes de reparto (parámetros Beta)' },
      { id: 'ayudas-subvenciones', title: '5. Subvenciones, deducción en IRPF e IBI' },
      { id: 'pasos-proyecto', title: '6. Fases de un proyecto fotovoltaico comunitario' },
      { id: 'preguntas-frecuentes', title: '7. Preguntas frecuentes en comunidades' }
    ],
    sections: [
      {
        id: 'marco-normativo',
        title: '1. Marco normativo: el Real Decreto 244/2019 y la democratización solar',
        content: `Durante años, el autoconsumo en edificios residenciales estuvo frenado por barreras burocráticas. La entrada en vigor del **Real Decreto 244/2019** reguló de forma clara el **autoconsumo colectivo a través de red interior o próxima**, permitiendo que varios consumidores compartan la energía generada por una única instalación fotovoltaica ubicada en la azotea o tejado común.`,
        bullets: [
          'Permite instalaciones compartidas situadas a una distancia máxima de hasta **2.000 metros** en baja tensión.',
          'No requiere que todos los vecinos del inmueble participen ni paguen la instalación.',
          'Los excedentes no autoconsumidos se pueden verter a la red con compensación económica en factura o monedero de batería virtual.'
        ]
      },
      {
        id: 'mayorias-junta',
        title: '2. ¿Qué mayoría de votos se necesita en la junta de propietarios?',
        content: `La modificación del **artículo 17.1 de la Ley de Propiedad Horizontal (LPH)** flexibilizó sustancialmente los quórums requeridos para la adopción de acuerdos energéticos renovables:`,
        table: {
          headers: ['Destino de la instalación', 'Mayoría requerida en Junta', 'Distribución del coste', 'Vecinos no participantes'],
          rows: [
            ['Exclusivo para zonas comunes (ascensor, luces, garaje)', 'Mayoría simple (voto favorable de la mayoría de propietarios que representen la mayoría de cuotas).', 'Se reparte entre todos los propietarios según cuota de participación.', 'Obligados al pago si el coste repercutido no supera doce mensualidades ordinarias.'],
            ['Uso privativo individual (solo para vecinos interesados)', 'Un tercio (1/3) de los integrantes de la comunidad que representen un tercio de las cuotas de participación.', 'Asumido exclusivamente por los vecinos que voluntariamente se adhieran.', 'No pagan nada y no disfrutan de la energía generada.']
          ]
        },
        callout: {
          type: 'tip',
          title: 'Clave de convivencia comunitaria:',
          text: 'Aquellos propietarios que inicialmente voten en contra o decidan no participar pueden incorporarse en el futuro a la instalación colectiva abonando el importe correspondiente debidamente actualizado.'
        }
      },
      {
        id: 'modelos-autoconsumo',
        title: '3. Dos modelos de autoconsumo colectivo en comunidades de vecinos',
        content: `A la hora de diseñar el proyecto, la comunidad puede optar por dos estrategias:`,
        bullets: [
          '**Modelo 1: Autoconsumo para zonas comunes (CUPS comunitario):** La energía generada por las placas se destina íntegramente a reducir el consumo de la escalera, alumbrado, bombas de agua, puertas de garaje y ascensores. Consigue reducir la cuota mensual ordinaria que paga cada vecino.',
          '**Modelo 2: Autoconsumo mixto o vecinal (Comunidad solar):** Se dimensiona una planta más amplia que cubre el consumo común y además reparte excedentes de producción horaria entre los contadores individuales de las viviendas adheridas.'
        ]
      },
      {
        id: 'coeficientes-reparto',
        title: '4. ¿Cómo se reparte la energía? Los coeficientes de reparto (Beta)',
        content: `Cada participante firma un **acuerdo de reparto** en el que se asigna a cada contador un coeficiente de distribución (denominado técnicamente parámetro **Beta**). La suma de todos los coeficientes debe ser igual a 1 (o 100%).\n\nExisten dos modalidades:\n- **Coeficientes fijos:** Cada vecino recibe un porcentaje constante a lo largo de todas las horas del año (por ejemplo, 10% por vecino si son 10 vecinos idénticos).\n- **Coeficientes dinámicos horarios:** Se adaptan por horas en función de los hábitos de cada hogar, maximizando el aprovechamiento y evitando el desperdicio de energía en horas donde una vivienda esté vacía.`
      },
      {
        id: 'ayudas-subvenciones',
        title: '5. Subvenciones, bonificaciones de IBI y deducciones de IRPF',
        content: `Las comunidades de propietarios cuentan con ventajas fiscales de enorme impacto para acelerar la amortización:`,
        bullets: [
          '**Deducción en IRPF por rehabilitación energética:** Los propietarios participantes pueden deducirse hasta un **60% del importe invertido** en su declaración de la renta si la instalación logra reducir el consumo de energía primaria no renovable del edificio en al menos un 30%.',
          '**Bonificación en el IBI (Impuesto sobre Bienes Inmuebles):** La mayoría de ayuntamientos aplican rebajas de entre el 30% y el 50% en el IBI durante 3 a 5 años tras la instalación.',
          '**Bonificación en el ICIO:** Reducciones de hasta el 95% en la tasa municipal de obras.'
        ]
      },
      {
        id: 'pasos-proyecto',
        title: '6. Fases de un proyecto fotovoltaico comunitario con tuLuz',
        content: `En tuLuz gestionamos todo el proceso para que la junta y el administrador de fincas no tengan que preocuparse de nada:`,
        bullets: [
          '1. **Estudio técnico previo gratuito:** Análisis de superficie útil en azotea, orientación, sombras y viabilidad estructural.',
          '2. **Simulación económica personalizada:** Presentación para la Junta de Vecinos con desglose de inversión, ahorro previsto y tiempos de amortización.',
          '3. **Asesoramiento en Junta:** Acompañamos al presidente o administrador para resolver dudas técnicas a los vecinos.',
          '4. **Instalación y legalización:** Tramitación de licencias, boletines eléctricos y registro ante la distribuidora de zona.',
          '5. **Optimización de contratos y batería virtual:** Asignación de la comercializadora con mejor compensación de excedentes.'
        ]
      }
    ],
    faqs: [
      {
        q: '¿Qué ocurre si el tejado del edificio no es transitable o es antiguo?',
        a: 'En el estudio técnico inicial revisamos la resistencia estructural y el estado de impermeabilización de la cubierta. Si la cubierta requiere mantenimiento previo, se coordina antes del anclaje de las estructuras solares.'
      },
      {
        q: '¿Puede un vecino negarse a que se instalen placas en la azotea común?',
        a: 'Si la votación alcanza la mayoría legal requerida por la Ley de Propiedad Horizontal (LPH), ningún vecino individual puede vetar la instalación comunitaria en los elementos comunes del edificio.'
      },
      {
        q: '¿Cuánto tiempo tarda la distribuidora en activar el autoconsumo colectivo?',
        a: 'Una vez finalizada la instalación física y legalizada en Industria, la distribuidora tarda entre 20 y 60 días en activar los contratos de acceso colectivo con los coeficientes de reparto aprobados.'
      }
    ],
    relatedSlugs: ['placas-solares-particulares-precio', 'ahorrar-factura-de-la-luz']
  },
  {
    id: 'comparador-comercializadoras-luz-y-gas',
    slug: 'comparador-comercializadoras-luz-y-gas',
    keyword: 'comparador comercializadoras luz y gas',
    title: 'Comparador de comercializadoras de luz y gas: claves para no caer en trampas y pagar menos',
    metaTitle: 'Comparador de Comercializadoras de Luz y Gas en España | Guía tuLuz',
    metaDescription: 'Compara más de 50 comercializadoras de electricidad y gas natural de forma imparcial. Conoce la verdad sobre mercado libre vs regulado, letras pequeñas y permanencias.',
    category: 'Mercado y Tarifas',
    readTime: '8 min de lectura',
    publishedAt: '2026-03-30',
    updatedAt: '2026-09-10',
    author: {
      name: 'Equipo de Regulación y Tarifas tuLuz',
      role: 'Analistas del Mercado Mayorista e Imparcialidad',
      avatar: '/icono.webp'
    },
    excerpt: 'El mercado eléctrico y gasista en España cuenta con cientos de ofertas comerciales aparentemente atractivas. Descubre cómo analizar las ofertas de luz y gas sin sesgos ni cláusulas engañosas.',
    tableOfContents: [
      { id: 'comercializadora-vs-distribuidora', title: '1. Diferencia fundamental entre comercializadora y distribuidora' },
      { id: 'mercado-libre-vs-regulado', title: '2. Mercado Libre vs Mercado Regulado (PVPC y TUR)' },
      { id: 'trampas-habituales', title: '3. Las 5 trampas habituales de las ofertas gancho' },
      { id: 'tarifas-duales', title: '4. Tarifas duales (luz + gas): ¿conviene unificarlas?' },
      { id: 'por-que-comparadores-sesgados', title: '5. La verdad sobre los comparadores online convencionales' },
      { id: 'checklist-comparativa', title: '6. Checklist para evaluar una oferta energética' },
      { id: 'preguntas-frecuentes', title: '7. Preguntas frecuentes en comparativas' }
    ],
    sections: [
      {
        id: 'comercializadora-vs-distribuidora',
        title: '1. La diferencia clave: ¿quién te factura y quién lleva el cable a tu casa?',
        content: `Uno de los mayores motivos de confusión entre los usuarios es la distinción entre distribuidoras y comercializadoras:`,
        bullets: [
          '**Distribuidora eléctrica / gasista:** Es la empresa propietaria de la infraestructura física (red de cables, tuberías, transformadores y contadores). Viene asignada por zona geográfica (por ejemplo, e-distribución/Endesa, i-DE/Iberdrola, UFD/Naturgy, Nedgia, Madrileña Red de Gas). No puedes cambiar de distribuidora.',
          '**Comercializadora:** Es la empresa con la que suscribes el contrato, la que compra la energía en el mercado y la que emite tus facturas. Existen más de 300 comercializadoras registradas ante la CNMC en España, y puedes cambiarte tantas veces como desees sin modificar tu contador ni interrumpir tu suministro.'
        ]
      },
      {
        id: 'mercado-libre-vs-regulado',
        title: '2. Mercado Libre vs Mercado Regulado: ¿cuál te conviene?',
        content: `Tanto en electricidad como en gas natural conviven dos mercados totalmente distintos:`,
        table: {
          headers: ['Concepto', 'Mercado Regulado (PVPC en luz / TUR en gas)', 'Mercado Libre (+300 comercializadoras)'],
          rows: [
            ['Fijación de precios', 'Regulados por el Gobierno y fórmulas oficiales del BOE.', 'Libremente pactados entre la comercializadora y el cliente.'],
            ['Bono Social', 'Obligatorio para solicitar el Bono Social Eléctrico o Térmico.', 'No disponible (salvo excepciones normativas puntuales).'],
            ['Permanencia', 'Prohibida por ley (0 permanencia).', 'Generalmente sin permanencia en contratos residenciales, aunque algunas empresas la imponen si no se revisa el contrato.'],
            ['Servicios adicionales', 'Prohibido añadir seguros de averías o mantenimientos.', 'Permitido (frecuente foco de sobrecostes si no se rechazan expresamente).']
          ]
        },
        callout: {
          type: 'important',
          title: 'El caso del Gas Natural (TUR):',
          text: 'En el gas natural, la Tarifa de Último Recurso (TUR) suele ser considerablemente más económica que la inmensa mayoría de ofertas del mercado libre debido al tope regulado del coste de la materia prima. En tuLuz analizamos con honestidad si a tu hogar le conviene permanecer en la TUR o dar el salto al mercado libre.'
        }
      },
      {
        id: 'trampas-habituales',
        title: '3. Las 5 trampas habituales de las ofertas comerciales gancho',
        content: `Cuando buscas un **comparador comercializadoras luz y gas**, debes tener cuidado con tácticas comerciales diseñadas para dar una falsa sensación de ahorro:`,
        bullets: [
          '**1. El descuento con caducidad:** Descuentos promocionales del "20% en el consumo durante el primer año" que esconden una subida automática masiva en el mes 13 si no recuerdas negociar.',
          '**2. Precios por kWh que no incluyen costes regulados:** Comerciales que promocionan un precio atractivo pero excluyen deliberadamente el término de ajuste del mecanismo ibérico, pérdidas de red o el impuesto eléctrico.',
          '**3. Mantenimientos de electrodomésticos camuflados:** Cobros mensuales de 7€ a 12€ por pólizas de asistencia de dudosa cobertura que duplican las coberturas que ya tiene tu seguro de hogar.',
          '**4. Tarifas planas con liquidación a final de año:** Tarifas que prometen una "cuota fija mensual" de 60€ pero esconden una cláusula de regularización con cobros de cientos de euros si te desvías de una bolsa de consumo predefinida.',
          '**5. Penalizaciones por cancelación anticipada:** Aunque la ley prohíbe permanencias en consumos domésticos (hasta 15 kW), algunas comercializadoras cobran penalizaciones por pérdida de descuentos acumulados.'
        ]
      },
      {
        id: 'tarifas-duales',
        title: '4. Tarifas duales (luz + gas): ¿realmente ahorras unificándolas?',
        content: `Es habitual que las grandes eléctricas ofrezcan un "descuento especial si contratas luz y gas juntos". En la práctica, casi siempre una de las dos partes del contrato está sobrevalorada. Por ejemplo, te ofrecen un precio competitivo en electricidad mientras inflan el término fijo del gas, resultando en un coste neto superior.\n\nEn **tuLuz** recomendamos contratar la luz con la comercializadora que ofrezca las mejores condiciones eléctricas y el gas con la que ofrezca el mejor precio gasista (incluso la tarifa regulada TUR), optimizando cada suministro de manera independiente.`
      },
      {
        id: 'por-que-comparadores-sesgados',
        title: '5. La verdad sobre los comparadores web convencionales',
        content: `La mayoría de comparadores automáticos que encuentras en internet posicionan en primer lugar a las comercializadoras que pagan mayores comisiones de captación por cliente captado, ocultando ofertas más económicas de comercializadoras que no pagan comisiones por clic.\n\n**tuLuz opera con independencia:** Comparamos más de 50 compañías del mercado libre y regulado buscando exclusivamente la opción que maximice el ahorro real de tu factura.`
      },
      {
        id: 'checklist-comparativa',
        title: '6. Checklist para evaluar cualquier oferta energética antes de firmar',
        content: `Antes de aceptar una oferta telefónica o web, verifica los siguientes 6 puntos:`,
        bullets: [
          '¿El precio del kWh incluye impuestos y peajes de acceso regulados?',
          '¿Cuál es el precio del término de potencia (kW) en punta y valle?',
          '¿Existe permanencia obligatoria o penalización por baja anticipada?',
          '¿Se incluye algún seguro de asistencia, mantenimiento o protección de pagos?',
          '¿Qué vigencia tienen los precios acordados (6 meses, 12 meses o indefinidos)?',
          '¿La revisión anual de precios se vincula al IPC o a una fórmula interna?'
        ]
      }
    ],
    faqs: [
      {
        q: '¿Cuánto tiempo tarda en hacerse efectivo un cambio de comercializadora?',
        a: 'El cambio suele tardar entre 2 y 7 días hábiles. Durante el proceso nunca te quedarás sin electricidad ni gas, y la factura anterior se liquidará de forma exacta hasta el día del cambio.'
      },
      {
        q: '¿Qué es el código CUPS y dónde lo encuentro?',
        a: 'El CUPS (Código Unificado de Punto de Suministro) es el identificador único de tu instalación eléctrica o de gas (empieza por ES seguido de 20 o 22 caracteres alfanuméricos). Aparece en la cabecera o datos del contrato de cualquiera de tus facturas.'
      },
      {
        q: '¿Por qué tuLuz ofrece su estudio de forma 100% gratuita?',
        a: 'Porque actuamos como asesores energéticos profesionales. Si decides formalizar el cambio con alguna de las opciones optimizadas, las comercializadoras retribuyen nuestra gestión administrativa sin que a ti te cueste ni un solo céntimo adicional ni se encarezca tu tarifa.'
      }
    ],
    relatedSlugs: ['ahorrar-factura-de-la-luz', 'tarifas-luz-empresas']
  },
  {
    id: 'placas-solares-particulares-precio',
    slug: 'placas-solares-particulares-precio',
    keyword: 'placas solares particulares precio',
    title: 'Placas solares para particulares: precio de instalación en 2026, rentabilidad y ayudas',
    metaTitle: 'Placas Solares para Particulares: Precio y Rentabilidad 2026 | tuLuz',
    metaDescription: '¿Cuánto cuesta instalar placas solares en una vivienda particular? Desglose de precios en 2026, número de paneles, amortización en 3-5 años y deducciones IRPF.',
    category: 'Autoconsumo y Fotovoltaica',
    readTime: '9 min de lectura',
    publishedAt: '2026-04-05',
    updatedAt: '2026-09-10',
    author: {
      name: 'Equipo de Ingeniería Fotovoltaica tuLuz',
      role: 'Instalaciones Solares y Autoconsumo Residencial',
      avatar: '/icono.webp'
    },
    excerpt: 'Analizamos al detalle cuánto cuesta poner placas solares en una vivienda unifamiliar o adosado en 2026: desglose de materiales, retorno de la inversión, deducciones del 60% en IRPF y batería virtual para factura a 0€.',
    tableOfContents: [
      { id: 'cuanto-cuesta', title: '1. ¿Cuánto cuesta instalar placas solares en 2026?' },
      { id: 'desglose-presupuesto', title: '2. Desglose detallado de un presupuesto fotovoltaico' },
      { id: 'cuantos-paneles', title: '3. ¿Cuántos paneles necesita una vivienda particular?' },
      { id: 'bateria-virtual-vs-fisica', title: '4. Batería virtual vs Batería física de litio' },
      { id: 'tiempo-amortizacion', title: '5. Tiempo de amortización y retorno de la inversión' },
      { id: 'subvenciones-irpf', title: '6. Deducciones de IRPF, IBI y bonificaciones fiscales' },
      { id: 'preguntas-frecuentes', title: '7. Preguntas frecuentes sobre placas solares' }
    ],
    sections: [
      {
        id: 'cuanto-cuesta',
        title: '1. ¿Cuánto cuesta instalar placas solares en una vivienda particular en 2026?',
        content: `Gracias a la madurez de la cadena de suministro internacional y a la eficiencia tecnológica de los módulos fotovoltaicos monocristalinos de alta potencia (TOPCon y HJT), el precio de las instalaciones fotovoltaicas residenciales se sitúa hoy en sus mínimos históricos.\n\nEn 2026, el rango de precio medio en España oscila entre **3.500€ y 7.800€** (IVA incluido) para una vivienda unifamiliar estándar, antes de aplicar deducciones fiscales:`,
        table: {
          headers: ['Tamaño vivienda / Consumo', 'Potencia instalada', 'Nº estimado paneles', 'Rango precio instalación (sin batería)'],
          rows: [
            ['Piso / Adosado pequeño (hasta 50€/mes factura)', '2,5 kWp - 3 kWp', '5 - 6 paneles (500W)', '3.200€ - 4.100€'],
            ['Vivienda unifamiliar media (60€ - 120€/mes)', '4 kWp - 5 kWp', '8 - 10 paneles (500W)', '4.400€ - 5.600€'],
            ['Vivienda grande / Aerotermia (+150€/mes)', '6 kWp - 8 kWp', '12 - 16 paneles (500W)', '6.200€ - 7.900€'],
            ['Vivienda con piscina y coche eléctrico', '8 kWp - 10 kWp', '16 - 20 paneles (500W)', '7.800€ - 9.800€']
          ]
        }
      },
      {
        id: 'desglose-presupuesto',
        title: '2. Desglose detallado: qué incluye un presupuesto solar llave en mano',
        content: `Un presupuesto profesional de autoconsumo no se limita a comprar paneles solares; contempla todos los elementos técnicos y administrativos:`,
        bullets: [
          '**Módulos fotovoltaicos Tier 1:** Paneles de alta eficiencia monocristalina con 25 a 30 años de garantía de producción (representan el 25-30% del coste total).',
          '**Inversor solar / Microinversores:** El "cerebro" de la instalación que transforma la corriente continua de las placas en corriente alterna para tus electrodomésticos (marcas como Huawei, Enphase, Sungrow, Fronius). Supone un 20-25% del coste.',
          '**Estructura y anclaje:** Estructuras de aluminio anodizado coplanares o triangulares certificadas para soportar vientos de más de 120 km/h.',
          '**Protecciones eléctricas y cableado solar:** Cuadro de protecciones AC/DC con sobretensiones transitorias y permanentes, magnetotérmicos y cableado solar de doble aislamiento.',
          '**Mano de obra certificada:** Montadores e instaladores autorizados con seguro de responsabilidad civil.',
          '**Legalización y trámites:** Proyecto técnico o memoria de diseño, visado, boletín eléctrico (CIE), pago de tasas municipales y registro en Industria y distribuidora.'
        ]
      },
      {
        id: 'cuantos-paneles',
        title: '3. ¿Cuántos paneles solares necesita realmente tu tejado?',
        content: `El mayor error al pedir presupuestos es sobredimensionar la instalación creyendo que "cuantas más placas, mejor". Si no consumes la energía ni dispones de una tarifa de compensación adecuada, estarás pagando por paneles que no amortizarás.\n\nEn **tuLuz** calculamos el número idóneo cruzando tu histórico de consumo horario (disponible en la distribuidora) con la inclinación, orientación (sur, este-oeste) y radiación solar específica de tu tejado.`
      },
      {
        id: 'bateria-virtual-vs-fisica',
        title: '4. ¿Instalar batería física de litio o contratar batería virtual?',
        content: `A la hora de aprovechar la energía generada durante las horas de máxima radiación para la noche, dispones de dos alternativas:`,
        bullets: [
          '**Batería Virtual (Monedero solar):** Es un servicio ofrecido por la comercializadora eléctrica. No requiere instalar ningún aparato en tu garaje ni desembolsar miles de euros. Cada kWh que tus placas vierten a la red se valora económicamente y se acumula en un monedero en euros que descuenta no solo el consumo nocturno, sino también el término de potencia, los impuestos e incluso la factura de segundas residencias hasta dejar el recibo en 0€.',
          '**Batería física de litio (5 kWh a 10 kWh):** Dispositivo de almacenamiento físico en tu vivienda. Su precio oscila entre **2.800€ y 5.500€ adicionales**. Aporta independencia absoluta ante cortes de red (modo back-up) y un autoconsumo directo nocturno del 90%, aunque su plazo de amortización es mayor.'
        ]
      },
      {
        id: 'tiempo-amortizacion',
        title: '5. Tiempo de amortización: ¿cuándo recuperas la inversión?',
        content: `Con el precio actual de la electricidad y las deducciones fiscales vigentes, el plazo de amortización de una instalación solar en España se sitúa entre **3 y 5 años**.\n\nUna vivienda que invierta 4.800€ y reduzca su factura mensual de 110€ a menos de 15€ gracias a la batería virtual ahorra cerca de **1.140€ anuales**. Teniendo en cuenta que los paneles solares tienen una vida útil superior a 25-30 años, disfrutarás de más de 20 años de electricidad prácticamente gratuita.`
      },
      {
        id: 'subvenciones-irpf',
        title: '6. Deducciones de IRPF, bonificación de IBI y ventajas fiscales en 2026',
        content: `Las ayudas fiscales existentes reducen de forma drástica el coste real desembolsado:`,
        bullets: [
          '**Deducción estatal en el IRPF:** Deducciones de hasta el **40% o 60%** del importe de la instalación en la declaración de la renta para viviendas habituales que reduzcan la demanda de calefacción/refrigeración o el consumo de energía primaria no renovable.',
          '**Bonificación en el IBI (Impuesto sobre Bienes Inmuebles):** Rebajas de hasta el 50% en el recibo del IBI durante 3 a 5 años según la ordenanza municipal de tu ayuntamiento.',
          '**Bonificación en el ICIO:** Descuentos de hasta el 95% en el impuesto sobre construcciones, instalaciones y obras.'
        ],
        callout: {
          type: 'tip',
          title: '¿Quieres conocer el presupuesto exacto para tu tejado?',
          text: 'En tuLuz realizamos una simulación digital 3D por satélite de tu tejado sin coste alguno, comparando las 3 mejores ofertas de instaladores certificados de tu zona.'
        }
      }
    ],
    faqs: [
      {
        q: '¿Qué mantenimiento necesitan las placas solares en una vivienda particular?',
        a: 'El mantenimiento es mínimo debido a la ausencia de partes móviles. Basta con una limpieza con agua y cepillo suave 1 o 2 veces al año para retirar polvo o polen y la monitorización regular desde la app móvil del inversor.'
      },
      {
        q: '¿Funcionan las placas solares en días nublados o con lluvia?',
        a: 'Sí. Aunque la producción se reduce respecto a un día despejado, las células solares de silicio monocristalino siguen captando la radiación solar difusa y la radiación ultravioleta a través de las nubes.'
      },
      {
        q: '¿Qué garantía tienen los paneles y el inversor solar?',
        a: 'Los paneles solares de marcas líderes Tier 1 ofrecen entre 12 y 25 años de garantía de producto y entre 25 y 30 años de garantía de rendimiento lineal (garantizando más del 80-85% de potencia inicial a los 25 años). Los inversores cuentan con garantías de 5 a 10 años, ampliables hasta 20 años.'
      }
    ],
    relatedSlugs: ['ahorrar-factura-de-la-luz', 'autoconsumo-solar-comunidades-de-vecinos']
  }
];

// Helper functions for easy querying
export function getGuideBySlug(slug) {
  return guidesData.find(guide => guide.slug === slug);
}

export function getAllGuideCategories() {
  return ['Todas', 'Hogar y Consumo', 'Empresas y Negocios', 'Comunidades de Propietarios', 'Mercado y Tarifas', 'Autoconsumo y Fotovoltaica'];
}
