// Base de datos de Guías de Ahorro Energético tuLuz
// Artículos rigurosos, verificados y optimizados para posicionamiento orgánico en motores de búsqueda y buscadores de IA.

export const guidesData = [
  {
    id: 'ahorrar-factura-de-la-luz',
    slug: 'ahorrar-factura-de-la-luz',
    keyword: 'ahorrar factura de la luz',
    title: 'Cómo ahorrar en la factura de la luz en 2026: 10 consejos reales y análisis de tu recibo',
    metaTitle: 'Cómo Ahorrar en la Factura de la Luz en 2026: 10 Consejos Reales | tuLuz',
    metaDescription: 'Guía con 10 consejos reales y contrastados para ahorrar en la factura de la luz hasta un 35%: ajuste de potencia (kW), tramos 2.0TD, tarifas ocultas y hábitos eficaces.',
    category: 'Hogar y Consumo',
    readTime: '9 min de lectura',
    publishedAt: '2026-03-15',
    updatedAt: '2026-09-10',
    author: {
      name: 'Equipo Técnico tuLuz',
      role: 'Especialistas en Eficiencia y Mercado Eléctrico',
      avatar: '/icono.webp'
    },
    excerpt: 'Reducir el importe de tu recibo eléctrico no significa pasar frío o prescindir del confort. Te presentamos 10 consejos reales, explicados paso a paso con cifras concretas, para recortar hasta un 35% mensual.',
    tableOfContents: [
      { id: 'anatomia-factura', title: 'Anatomía de la factura: qué pagas realmente en cada recibo' },
      { id: 'consejo-1-potencia', title: 'Consejo 1: Ajusta la potencia contratada (término fijo en kW)' },
      { id: 'consejo-2-tramos', title: 'Consejo 2: Aprovecha los 3 tramos horarios de la tarifa 2.0TD' },
      { id: 'consejo-3-tarifa', title: 'Consejo 3: Elige la modalidad adecuada (precio fijo vs indexado)' },
      { id: 'consejo-4-servicios', title: 'Consejo 4: Elimina servicios de mantenimiento y seguros innecesarios' },
      { id: 'consejo-5-standby', title: 'Consejo 5: Erradica el consumo fantasma (stand-by) con regletas' },
      { id: 'consejo-6-climatizacion', title: 'Consejo 6: Fija el termostato en 21°C en invierno y 25°C en verano' },
      { id: 'consejo-7-frigorifico', title: 'Consejo 7: Regula y mantén el frigorífico a 4°C y el congelador a -18°C' },
      { id: 'consejo-8-lavados', title: 'Consejo 8: Lava a baja temperatura (30°C) y usa programas ECO' },
      { id: 'consejo-9-led', title: 'Consejo 9: Sustituye el 100% de la iluminación por bombillas LED' },
      { id: 'consejo-10-autoconsumo', title: 'Consejo 10: Valora el autoconsumo solar con batería virtual' },
      { id: 'tabla-resumen-ahorro', title: 'Tabla resumen: potencial de ahorro anual de cada consejo' },
      { id: 'preguntas-frecuentes', title: 'Preguntas frecuentes sobre cómo ahorrar en la factura' }
    ],
    sections: [
      {
        id: 'anatomia-factura',
        title: 'Anatomía de la factura: qué pagas realmente en cada recibo',
        content: `Para saber cómo **ahorrar factura de la luz**, el primer paso imprescindible es entender exactamente qué compone el recibo emitido por tu comercializadora. El importe final no es un número arbitrario: es la suma de varios conceptos regulados y libres:`,
        bullets: [
          '**Término de potencia (kW):** La parte fija de tu factura. Se paga independientemente de si consumes electricidad o la vivienda está deshabitada. Se calcula multiplicando los kW contratados por los días de facturación y el precio del kW fijado por contrato.',
          '**Término de energía (kWh):** La parte variable. Representa el consumo real de electricidad durante el ciclo de lectura, multiplicando los kWh consumidos por el precio de la energía.',
          '**Impuesto Especial sobre la Electricidad (IEE):** Impuesto regulado fijado por la legislación estatal sobre la suma de potencia y energía.',
          '**Alquiler del contador digital:** Cuota fija mensual regulada que se abona a la distribuidora por el equipo de medida digital (habitualmente entre 0,81€ y 1,40€/mes).',
          '**Servicios adicionales de mantenimiento:** Cuotas accesorias de urgencias o asistencias que muchas eléctricas añaden sin consentimiento claro (de 4€ a 15€/mes).',
          '**IVA (Impuesto sobre el Valor Añadido):** Gravamen porcentual sobre el subtotal acumulado de la factura.'
        ]
      },
      {
        id: 'consejo-1-potencia',
        title: 'Consejo 1: Ajusta la potencia contratada (término fijo en kW) según tus picos reales',
        content: `Más del 60% de los hogares en España tienen contratada más potencia de la que necesitan. Cada tramo de 1,15 kW de potencia contratada que reduzcas supone un ahorro directo de entre **45€ y 70€ al año**, sin importar cuánta luz consumas.`,
        callout: {
          type: 'tip',
          title: '¿Cómo comprobar tu potencia máxima demandada?',
          text: 'Entra en el portal de tu empresa distribuidora (i-DE, e-distribución, UFD, E-Redes). En tu área de cliente puedes consultar la gráfica de picos de potencia máximos demandados en los últimos 12 meses. Si tu pico máximo nunca ha superado los 3,1 kW y tienes contratados 4,6 kW o 5,75 kW, estás regalando dinero a la compañía mes tras mes.'
        }
      },
      {
        id: 'consejo-2-tramos',
        title: 'Consejo 2: Conoce y aprovecha los 3 tramos horarios de la tarifa 2.0TD',
        content: `La tarifa doméstica estándar (hasta 15 kW) divide el consumo eléctrico en tres periodos en días laborables. Desplazar los consumos más intensivos a las horas más baratas reduce notablemente el término de energía:`,
        table: {
          headers: ['Periodo', 'Horario en días laborables', 'Nivel de coste', 'Electrodomésticos recomendados'],
          rows: [
            ['Punta (P1)', '10:00 - 14:00 y 18:00 - 22:00', 'El más caro', 'Evitar horno, lavadora, secadora y plancha'],
            ['Llano (P2)', '08:00 - 10:00, 14:00 - 18:00 y 22:00 - 00:00', 'Coste intermedio', 'Uso habitual, cocina diaria y teletrabajo'],
            ['Valle (P3)', '00:00 - 08:00 + Fines de semana y festivos 24h', 'El más barato', 'Programar lavavajillas, lavadora, termo y recarga de vehículo eléctrico']
          ]
        }
      },
      {
        id: 'consejo-3-tarifa',
        title: 'Consejo 3: Elige la modalidad adecuada (precio fijo vs indexado al mercado)',
        content: `No te quedes con la tarifa por defecto que te asignó tu compañía hace años. Evalúa cuál de las dos opciones encaja mejor con tu estilo de vida:`,
        bullets: [
          '**Tarifa con precio fijo (24h o 3 tramos):** Pagas siempre el mismo precio pactado por kWh durante la vigencia del contrato (habitualmente 12 meses). Te protege ante subidas del mercado mayorista y te da certidumbre de gasto.',
          '**Tarifa indexada (coste mayorista + cuota de gestión):** Pagas la energía al precio real horario del mercado pool (OMIE) más un margen comercial de la comercializadora (entre 0,005€ y 0,015€/kWh). En meses de alta generación solar y eólica, los precios del kWh en horas centrales del día caen a mínimos históricos.'
        ]
      },
      {
        id: 'consejo-4-servicios',
        title: 'Consejo 4: Elimina servicios de mantenimiento y seguros de pago innecesarios',
        content: `Es la fuga invisible de dinero más frecuente: servicios con nombres como "Protección Eléctrica Hogar", "Asistencia Urgencias 24h" o "Seguro de Facturas". Muchas veces se incluyen con un descuento inicial de 6 meses y luego pasan a costar entre **5€ y 15€ al mes**.\n\nLa inmensa mayoría de averías graves en el hogar ya están cubiertas por la póliza básica del seguro de tu vivienda. Dar de baja estos servicios adicionales puede ahorrarte de forma inmediata entre **60€ y 180€ al año**.`
      },
      {
        id: 'consejo-5-standby',
        title: 'Consejo 5: Erradica el consumo en reposo (stand-by o consumo fantasma) con regletas',
        content: `Los pilotos rojos de televisores, decodificadores, routers, ordenadores, microondas y cargadores enchufados sin uso representan entre el **7% y el 11% del consumo eléctrico total de un hogar** (el equivalente a tener una bombilla encendida permanentemente las 24 horas del día).\n\nConectar estos dispositivos a regletas con interruptor o enchufes inteligentes programables para apagarlos por la noche o durante ausencias supone un recorte de entre **30€ y 60€ al año**.`
      },
      {
        id: 'consejo-6-climatizacion',
        title: 'Consejo 6: Fija el termostato de climatización en 21°C en invierno y 25°C en verano',
        content: `La climatización (calefacción y aire acondicionado) representa más del 40% del consumo energético doméstico en España. Por cada grado de temperatura que exijas de más al termostato, el consumo eléctrico del compresor aumenta entre un **7% y un 8%**.\n\n- **En invierno:** Ajusta a 20°C - 21°C de día y baja a 16°C - 17°C para dormir.\n- **En verano:** Configura la refrigeración a 25°C o 26°C y apóyate en ventiladores de techo, que consumen hasta un 90% menos de energía generando una sensación térmica hasta 3°C más fresca.`
      },
      {
        id: 'consejo-7-frigorifico',
        title: 'Consejo 7: Regula y mantén el frigorífico a 4°C y el congelador a -18°C',
        content: `El frigorífico es el único electrodoméstico que funciona ininterrumpidamente los 365 días del año, concentrando más del 30% del consumo de los aparatos del hogar:`,
        bullets: [
          '**Ajuste térmico óptimo:** Mantén la zona de refrigeración entre 3°C y 5°C, y el congelador a -18°C. Temperaturas más bajas solo aumentan el gasto sin aportar mejoras en conservación de alimentos.',
          '**Ventilación trasera y gomas de cierre:** Limpia el polvo de la rejilla trasera del condensador una vez al año y comprueba que las gomas de la puerta sellen herméticamente (si un billete atrapado en la puerta se desliza con facilidad, la goma pierde frío y necesita sustitución).'
        ]
      },
      {
        id: 'consejo-8-lavados',
        title: 'Consejo 8: Lava a baja temperatura (30°C o frío) y usa programas ECO',
        content: `Aproximadamente el **80% - 85% de la energía eléctrica que consume una lavadora se destina exclusivamente a calentar el agua** mediante su resistencia eléctrica interna. Lavar a 30°C en lugar de a 60°C reduce a la mitad el gasto por ciclo.\n\nAdemás, los programas ECO de lavadoras y lavavajillas tardan más tiempo pero calientan el agua más lentamente y usan menos volumen de agua, ahorrando entre un 20% y un 35% de electricidad por lavado.`
      },
      {
        id: 'consejo-9-led',
        title: 'Consejo 9: Sustituye el 100% de la iluminación por bombillas LED de alta eficiencia',
        content: `Si todavía conservas bombillas halógenas o fluorescentes compactas (bajo consumo tradicionales), estás desperdiciando energía en forma de calor. Una bombilla LED de 8W produce la misma luminosidad que una halógena de 50W, consumiendo un **84% menos de potencia**.\n\nLa sustitución de 10 bombillas incandescentes o halógenas por tecnología LED se amortiza en menos de 4 a 6 meses y genera un ahorro continuado de entre **40€ y 80€ al año** en iluminación.`
      },
      {
        id: 'consejo-10-autoconsumo',
        title: 'Consejo 10: Valora el autoconsumo solar fotovoltaico con batería virtual',
        content: `Si resides en una vivienda unifamiliar, adosado o perteneces a una comunidad con azotea aprovechable, instalar paneles solares es la medida con mayor potencial de recorte disponible en 2026:`,
        bullets: [
          'Permite **reducir hasta un 70% - 80% de la factura de luz** mediante la generación de tu propia energía limpia durante las horas de radiación.',
          'Gracias al servicio de **Batería Virtual** (monedero solar), los excedentes que viertes a la red se remuneran en euros para compensar el término de potencia, impuestos y otras facturas hasta alcanzar recibos de 0€.',
          'Con las deducciones en el IRPF de hasta el 60% y bonificaciones de IBI, el periodo de amortización se sitúa actualmente entre **3 y 5 años**.'
        ]
      },
      {
        id: 'tabla-resumen-ahorro',
        title: 'Tabla resumen: potencial de ahorro anual real de cada consejo',
        content: `Resumen acumulado del impacto económico estimado que puedes conseguir aplicando estos 10 consejos en tu vivienda:`,
        table: {
          headers: ['Nº', 'Consejo de Ahorro', 'Ahorro medio anual estimado', 'Dificultad de aplicación'],
          rows: [
            ['1', 'Ajustar la potencia contratada (kW)', '45€ - 80€ / año', 'Muy fácil (gestión de trámite)'],
            ['2', 'Aprovechar los tramos horarios 2.0TD', '60€ - 130€ / año', 'Media (adaptación de hábitos)'],
            ['3', 'Elegir tarifa competitiva (fija o indexada)', '90€ - 220€ / año', 'Fácil (asesoramiento tuLuz)'],
            ['4', 'Eliminar seguros y mantenimientos ocultos', '60€ - 180€ / año', 'Muy fácil (baja de servicio)'],
            ['5', 'Eliminar consumo fantasma (stand-by)', '30€ - 60€ / año', 'Fácil (regletas con interruptor)'],
            ['6', 'Optimizar climatización (21°C invierno / 25°C verano)', '80€ - 160€ / año', 'Fácil (ajuste de termostato)'],
            ['7', 'Regulación de frigorífico (4°C / -18°C)', '25€ - 50€ / año', 'Muy fácil (ajuste de ruleta/display)'],
            ['8', 'Lavados a baja temperatura (30°C / ECO)', '35€ - 70€ / año', 'Fácil (selección de programa)'],
            ['9', 'Migración integral a iluminación LED', '40€ - 80€ / año', 'Fácil (cambio de bombillas)'],
            ['10', 'Instalación de paneles solares + batería virtual', '450€ - 1.100€ / año', 'Media-Alta (instalación técnica)']
          ]
        }
      }
    ],
    faqs: [
      {
        q: '¿Cuál es el primer consejo que debería aplicar para notar un ahorro rápido?',
        a: 'Revisar la potencia contratada y los servicios de mantenimiento adicionales en tu última factura. Son dos gestiones administrativas sencillas que reducen el recibo fijo desde el primer mes sin cambiar tus hábitos de consumo.'
      },
      {
        q: '¿Cuánto puedo ahorrar en mi factura de la luz cambiando de compañía con tuLuz?',
        a: 'El ahorro medio que consiguen nuestros clientes en tuLuz oscila entre el 20% y el 35% del total de la factura, lo que representa entre 150€ y más de 350€ al año para un hogar medio, sin coste de gestión.'
      },
      {
        q: '¿Me pueden cortar la luz si solicito un cambio de tarifa o de comercializadora?',
        a: 'No, en ningún caso. El suministro eléctrico continúa sin interrupción porque el transporte y la distribución física de la electricidad dependen de la empresa distribuidora de tu zona geográfica, no de la comercializadora con la que contrates la factura.'
      },
      {
        q: '¿Cuánto cuesta cambiar de compañía eléctrica?',
        a: 'El cambio de comercializadora en el mercado libre español es 100% gratuito por ley, siempre que no tengas una cláusula de permanencia vigente en tu contrato anterior.'
      }
    ],
    relatedSlugs: ['comparador-comercializadoras-luz-y-gas', 'placas-solares-particulares-precio']
  },
  {
    id: 'tarifas-luz-empresas',
    slug: 'tarifas-luz-empresas',
    keyword: 'tarifas luz empresas',
    title: 'Tarifas de luz para empresas: 6 claves para optimizar el coste energético en pymes e industrias',
    metaTitle: 'Tarifas de Luz para Empresas: 6 Claves de Optimización | tuLuz',
    metaDescription: 'Descubre las 6 claves esenciales en tarifas de luz para empresas (3.0TD y 6.XTD). Elimina penalizaciones por maxímetro, reactiva y optimiza tus contratos.',
    category: 'Empresas y Negocios',
    readTime: '9 min de lectura',
    publishedAt: '2026-03-20',
    updatedAt: '2026-09-10',
    author: {
      name: 'Área de Grandes Cuentas tuLuz',
      role: 'Consultoría Energética Industrial y Pyme',
      avatar: '/icono.webp'
    },
    excerpt: 'La energía es uno de los mayores costes operativos en cualquier empresa. Te revelamos las 6 claves técnicas y contractuales para eliminar penalizaciones por maxímetro o reactiva y negociar tarifas competitivas.',
    tableOfContents: [
      { id: 'clave-1-peajes', title: 'Clave 1: Conoce tu peaje de acceso (2.0TD, 3.0TD, 6.XTD) y potencias crecientes' },
      { id: 'clave-2-maximetro', title: 'Clave 2: Evita penalizaciones por maxímetro y excesos de potencia P1-P6' },
      { id: 'clave-3-reactiva', title: 'Clave 3: Suprime el recargo por energía reactiva con baterías de condensadores' },
      { id: 'clave-4-modalidades', title: 'Clave 4: Selecciona la modalidad: Fija, Indexada al Pool o Coberturas PPA' },
      { id: 'clave-5-telemedida', title: 'Clave 5: Negocia tu tarifa con la curva de carga cuartohoraria real' },
      { id: 'clave-6-caso-exito', title: 'Clave 6: Caso real: reducción del 31% de gasto eléctrico en pyme' },
      { id: 'preguntas-frecuentes', title: 'Preguntas frecuentes sobre tarifas de luz para empresas' }
    ],
    sections: [
      {
        id: 'clave-1-peajes',
        title: 'Clave 1: Conoce tu peaje de acceso (2.0TD, 3.0TD, 6.XTD) y la regla de potencias crecientes',
        content: `El marco regulatorio clasifica los puntos de suministro en función de su tensión de red y potencia contratada:`,
        bullets: [
          '**Tarifa 2.0TD (Baja Tensión, hasta 15 kW):** Pequeños despachos, oficinas comerciales y microempresas. Cuenta con 2 periodos de potencia y 3 de energía.',
          '**Tarifa 3.0TD (Baja Tensión, más de 15 kW en algún periodo):** El estándar de pymes, comercios con refrigeración, obradores, restaurantes y naves industriales medianas. Dispone de **6 periodos de potencia (P1 a P6)** y **6 periodos de energía**.',
          '**Tarifas 6.1TD a 6.4TD (Media y Alta Tensión):** Fábricas, industrias intensivas y centros logísticos con potencias superiores a 450 kW conectadas a redes de 1 kV a más de 72,5 kV.'
        ],
        callout: {
          type: 'important',
          title: 'Regla obligatoria de potencias crecientes (P1 a P6):',
          text: 'Por normativa del Real Decreto regulador, en las tarifas 3.0TD y 6.XTD la potencia contratada de cada periodo debe ser igual o superior a la del periodo anterior: P1 ≤ P2 ≤ P3 ≤ P4 ≤ P5 ≤ P6. Un error de dimensionamiento en esta escala genera costes innecesarios en periodos donde la empresa no tiene actividad.'
        }
      },
      {
        id: 'clave-2-maximetro',
        title: 'Clave 2: Evita penalizaciones por maxímetro y excesos de potencia P1-P6',
        content: `A diferencia de los domicilios donde el contador corta la luz al superar la potencia, en tarifas de empresa 3.0TD y 6.XTD el suministro nunca se interrumpe: se mide con un **maxímetro cuartohorario**.\n\nSi durante un intervalo de 15 minutos tu maquinaria demanda más potencia de la contratada en ese periodo, la distribuidora liquida un **recargo por exceso de potencia**. En empresas manufactureras o con cámaras de congelación, estos excesos pueden suponer cientos o miles de euros extra cada mes.\n\n**Solución tuLuz:** Extraemos tu histórico de telemedida para reajustar exactamente la potencia de cada periodo (P1 a P6) a tu régimen real de trabajo, eliminando por completo las penalizaciones sin comprometer la producción.`
      },
      {
        id: 'clave-3-reactiva',
        title: 'Clave 3: Suprime el recargo por energía reactiva con baterías de condensadores',
        content: `La energía reactiva inductiva la provocan motores eléctricos, compresores, transformadores y tubos fluorescentes. Si el factor de potencia (coseno de fi) desciende por debajo de 0,95, la distribuidora factura una penalización por cada kVArh excedente.`,
        bullets: [
          '**¿Cómo se erradica?** Instalando una **batería de condensadores automática** dimensionada al perfil reactivo de la planta.',
          '**Amortización exprés:** En instalaciones con recargos mensuales de entre 80€ y 300€, la batería de condensadores se amortiza en menos de 6 a 12 meses, protegiendo además las líneas y transformadores contra sobrecalentamientos.'
        ]
      },
      {
        id: 'clave-4-modalidades',
        title: 'Clave 4: Selecciona la modalidad adecuada: Fija, Indexada al Pool o Coberturas PPA',
        content: `La estrategia de contratación debe ajustarse al nivel de tolerancia al riesgo y al perfil de producción de tu empresa:`,
        table: {
          headers: ['Modalidad', 'Ventajas principales', 'Riesgos asociados', 'Recomendado para'],
          rows: [
            ['Precio Fijo', 'Presupuesto cerrado sin sorpresas durante 12-24 meses.', 'Precios habitualmente más altos debido a la prima de riesgo que cobra la comercializadora.', 'Negocios con márgenes comerciales estrictos que no pueden tolerar volatilidad.'],
            ['Indexada al Pool (OMIE)', 'Sin recargo de cobertura comercial. Aprovecha los precios mínimos en horas solares.', 'Sensibilidad a subidas imprevistas del mercado mayorista.', 'Empresas con capacidad de desplazar consumo a horas diurnas o turnos nocturnos.'],
            ['Mixta / Con Coberturas (PPA)', 'Bloqueo de un % de consumo a precio fijo y el resto a mercado spot indexado.', 'Requiere asesoramiento técnico profesional continuo.', 'Pymes medianas e industrias con consumos superiores a 100 MWh anuales.']
          ]
        }
      },
      {
        id: 'clave-5-telemedida',
        title: 'Clave 5: Negocia tu tarifa con la curva de carga cuartohoraria real',
        content: `Las comercializadoras calculan sus mejores ofertas basándose en la **curva de carga**. Si tu empresa concentra el 80% de su consumo en las horas centrales del día (donde la gran aportación solar abarata el mercado mayorista), puedes exigir tarifas sensiblemente más baratas que una empresa que concentre su actividad en horas punta nocturnas.\n\nEn **tuLuz** descargamos los ficheros oficiales de telemedida de la distribuidora para lanzar rondas de licitación entre más de 50 comercializadoras, logrando condiciones que no se ofrecen en canales comerciales generales.`
      },
      {
        id: 'clave-6-caso-exito',
        title: 'Clave 6: Caso real de optimización: reducción del 31% del gasto eléctrico en un taller mecanizado',
        content: `**Situación de partida:** Taller mecanizado con tarifa 3.0TD con un gasto medio de 1.840€/mes. Contrataba 45 kW lineales en todos los periodos y pagaba recargos de reactiva de 145€/mes.\n\n**Intervención de tuLuz:**\n1. Reajuste de potencias P1-P6 según telemedida real (reduciendo P4-P6 a 22 kW en periodos no operativos).\n2. Instalación de batería de condensadores financiada sin desembolso inicial.\n3. Licitación de contrato indexado con fee comercial de solo 0,006€/kWh.\n\n**Resultado comprobado:** La factura media bajó a 1.270€/mes, generando un **ahorro neto anual de 6.840€**.`
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
    title: 'Autoconsumo solar en comunidades de vecinos: 6 pasos de instalación compartida y normativa',
    metaTitle: 'Autoconsumo Solar en Comunidades de Vecinos: 6 Pasos | tuLuz',
    metaDescription: 'Descubre los 6 pasos y la normativa del autoconsumo solar en comunidades de vecinos: Ley de Propiedad Horizontal, mayorías, coeficientes Beta y ayudas IRPF.',
    category: 'Comunidades de Propietarios',
    readTime: '8 min de lectura',
    publishedAt: '2026-03-25',
    updatedAt: '2026-09-10',
    author: {
      name: 'Departamento de Comunidades tuLuz',
      role: 'Asesoría Especializada en Propiedad Horizontal',
      avatar: '/icono.webp'
    },
    excerpt: 'Instalar placas solares en la cubierta de un edificio de vecinos permite desplomar la factura comunitaria e incluso suministrar energía a las viviendas. Te explicamos los 6 pasos técnicos y legales para llevarlo a cabo.',
    tableOfContents: [
      { id: 'paso-1-normativa', title: 'Paso 1: Conocer el marco legal español (Real Decreto 244/2019)' },
      { id: 'paso-2-mayorias', title: 'Paso 2: Votar y conseguir las mayorías legales en junta (LPH)' },
      { id: 'paso-3-modelos', title: 'Paso 3: Elegir el modelo (zonas comunes vs reparto entre vecinos)' },
      { id: 'paso-4-coeficientes', title: 'Paso 4: Fijar los coeficientes de reparto de energía (parámetros Beta)' },
      { id: 'paso-5-subvenciones', title: 'Paso 5: Gestionar deducciones de hasta el 60% en IRPF y rebajas de IBI' },
      { id: 'paso-6-ejecucion', title: 'Paso 6: Ejecutar la instalación, legalización y activación con distribuidora' },
      { id: 'preguntas-frecuentes', title: 'Preguntas frecuentes sobre autoconsumo en comunidades' }
    ],
    sections: [
      {
        id: 'paso-1-normativa',
        title: 'Paso 1: Conocer el marco legal español (Real Decreto 244/2019)',
        content: `El **Real Decreto 244/2019** reguló de manera definitiva el **autoconsumo colectivo a través de red interior o próxima**, terminando con las trabas históricas que impedían compartir energía solar en edificios plurifamiliares:`,
        bullets: [
          'Permite compartir la energía de una única instalación solar ubicada en el tejado o azotea común entre múltiples puntos de suministro situados a menos de **2.000 metros** en baja tensión.',
          'No es obligatorio que el 100% de los vecinos participen ni paguen la instalación.',
          'Los excedentes no consumidos en tiempo real se vierten a la red con compensación económica o acumulación en monedero de batería virtual.'
        ]
      },
      {
        id: 'paso-2-mayorias',
        title: 'Paso 2: Votar y conseguir las mayorías legales en junta de propietarios (LPH)',
        content: `El **artículo 17.1 de la Ley de Propiedad Horizontal (LPH)** establece con claridad los quórums de votación necesarios en función del destino de la energía fotovoltaica:`,
        table: {
          headers: ['Destino de la energía', 'Mayoría requerida en Junta', 'Reparto del coste', 'Vecinos que no votaron a favor'],
          rows: [
            ['Exclusivo para zonas comunes (ascensor, luces, grupo de presión)', 'Mayoría simple (mayoría de propietarios que representen la mayoría de cuotas presentes).', 'Se reparte entre todos los propietarios según su coeficiente de participación.', 'Obligados al pago si el coste repercutido anual no supera 12 mensualidades ordinarias de gastos comunes.'],
            ['Uso privativo para viviendas particulares interesadas', 'Un tercio (1/3) de los propietarios que representen un tercio de las cuotas de participación.', 'Asumido exclusivamente por los vecinos que voluntariamente se adhieran al proyecto.', 'No pagan nada, no participan en el coste y no reciben energía de los paneles.']
          ]
        },
        callout: {
          type: 'tip',
          title: 'Adhesión posterior garantizada:',
          text: 'Aquellos vecinos que en la votación inicial decidan no participar pueden incorporarse en cualquier momento posterior abonando el importe correspondiente debidamente actualizado con el interés legal.'
        }
      },
      {
        id: 'paso-3-modelos',
        title: 'Paso 3: Elegir el modelo: zonas comunes vs comunidad solar con reparto a viviendas',
        content: `Antes de solicitar presupuestos técnicos, la junta debe definir el alcance del proyecto:`,
        bullets: [
          '**Modelo A: Solo Zonas Comunes:** La energía solar se conecta al contador comunitario (escalera, bombas, garaje, ascensores). Reduce directamente los gastos ordinarios del edificio y la cuota de comunidad que paga cada vecino.',
          '**Modelo B: Autoconsumo Colectivo Completo (Comunidad Solar):** Se instala una planta de mayor potencia en la azotea que cubre el consumo común y además reparte energía horaria a los contadores de las viviendas de los vecinos adheridos, reduciendo sus facturas privadas de luz.'
        ]
      },
      {
        id: 'paso-4-coeficientes',
        title: 'Paso 4: Fijar los coeficientes de reparto de energía (parámetros Beta)',
        content: `Para que la distribuidora sepa cuánta energía solar asignar a cada contador participante en cada hora, se formaliza un **acuerdo de reparto** con coeficientes (parámetro **Beta**). La suma de los coeficientes de todos los participantes debe ser igual a 1 (100%).\n\n- **Coeficientes fijos:** Cada vecino recibe un porcentaje constante a lo largo del año (por ejemplo, 10% si son 10 vecinos con la misma aportación económica).\n- **Coeficientes dinámicos horarios:** Se adaptan por horas en base a los hábitos de consumo de cada hogar, optimizando la asignación de kilovatios y evitando que se desperdicie energía si un vecino no está en casa.`
      },
      {
        id: 'paso-5-subvenciones',
        title: 'Paso 5: Gestionar deducciones de hasta el 60% en IRPF y rebajas de IBI',
        content: `Las comunidades de propietarios disponen de ventajas fiscales extraordinarias que aceleran la amortización:`,
        bullets: [
          '**Deducción estatal en el IRPF de hasta el 60%:** Los propietarios participantes pueden desgravarse hasta el 60% de las cantidades invertidas en su declaración de la renta si las obras reducen el consumo de energía primaria no renovable del edificio en al menos un 30%.',
          '**Bonificación en el IBI (Impuesto sobre Bienes Inmuebles):** Reducciones de entre el 30% y el 50% en el recibo anual del IBI durante 3 a 5 años según la ordenanza fiscal de tu ayuntamiento.',
          '**Bonificación en el ICIO:** Descuentos de hasta el 95% en la tasa municipal de construcciones e instalaciones.'
        ]
      },
      {
        id: 'paso-6-ejecucion',
        title: 'Paso 6: Ejecutar la instalación, legalización en Industria y activación con distribuidora',
        content: `En **tuLuz** coordinamos todo el ciclo para que el presidente de la comunidad y el administrador de fincas no tengan que asumir cargas burocráticas:`,
        bullets: [
          '1. **Estudio técnico gratuito:** Inspección de la cubierta, orientación, estado de impermeabilización y cálculo de sombras.',
          '2. **Dossier para la Junta:** Presentación con cifras claras de inversión, amortización y ahorro de cuota comunitaria.',
          '3. **Instalación y legalización:** Montaje por instaladores certificados, boletín eléctrico (CIE) y registro en la Delegación de Industria.',
          '4. **Activación de contratos de autoconsumo colectivo:** Tramitación con la distribuidora de zona para que aplique los coeficientes Beta en la facturación mensual.'
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
    title: 'Comparador de comercializadoras de luz y gas: 5 trampas habituales y checklist de 6 puntos',
    metaTitle: 'Comparador de Comercializadoras de Luz y Gas: 5 Trampas | tuLuz',
    metaDescription: 'Descubre las 5 trampas de las comercializadoras de luz y gas y el checklist de 6 puntos clave para comparar ofertas sin sorpresas ni costes ocultos.',
    category: 'Mercado y Tarifas',
    readTime: '8 min de lectura',
    publishedAt: '2026-03-30',
    updatedAt: '2026-09-10',
    author: {
      name: 'Equipo de Regulación y Tarifas tuLuz',
      role: 'Analistas del Mercado Mayorista e Imparcialidad',
      avatar: '/icono.webp'
    },
    excerpt: 'El mercado energético en España cuenta con cientos de ofertas comerciales aparentemente irresistibles. Te desvelamos las 5 trampas más habituales del sector y el checklist de 6 comprobaciones clave antes de firmar.',
    tableOfContents: [
      { id: 'comercializadora-vs-distribuidora', title: 'Diferencia fundamental entre comercializadora y distribuidora' },
      { id: 'mercado-libre-vs-regulado', title: 'Mercado Libre vs Mercado Regulado (PVPC y TUR)' },
      { id: 'las-5-trampas', title: 'Las 5 trampas habituales de las ofertas comerciales gancho' },
      { id: 'tarifas-duales', title: 'Tarifas duales (luz + gas): ¿realmente ahorras unificándolas?' },
      { id: 'comparadores-sesgados', title: 'La verdad sobre los comparadores web convencionales' },
      { id: 'checklist-6-puntos', title: 'Checklist de 6 comprobaciones clave antes de contratar' },
      { id: 'preguntas-frecuentes', title: 'Preguntas frecuentes en comparativas de tarifas' }
    ],
    sections: [
      {
        id: 'comercializadora-vs-distribuidora',
        title: 'Diferencia fundamental entre comercializadora y distribuidora',
        content: `Uno de los mayores motivos de confusión entre los usuarios es la distinción entre distribuidores y comercializadores:`,
        bullets: [
          '**Distribuidora eléctrica / gasista:** Es la empresa dueña de la infraestructura física (red de cables, tuberías, transformadores y contadores). Viene asignada por zona geográfica (por ejemplo, e-distribución/Endesa, i-DE/Iberdrola, UFD/Naturgy, Nedgia, Madrileña Red de Gas). No se puede cambiar de distribuidora.',
          '**Comercializadora:** Es la empresa con la que suscribes el contrato, la que compra la energía en el mercado y la que emite tus facturas. Existen más de 300 comercializadoras registradas en España, y puedes cambiarte tantas veces como desees sin modificar tu contador ni interrumpir tu suministro.'
        ]
      },
      {
        id: 'mercado-libre-vs-regulado',
        title: 'Mercado Libre vs Mercado Regulado: ¿cuál te conviene?',
        content: `Tanto en electricidad como en gas natural conviven dos mercados totalmente distintos:`,
        table: {
          headers: ['Concepto', 'Mercado Regulado (PVPC en luz / TUR en gas)', 'Mercado Libre (+300 comercializadoras)'],
          rows: [
            ['Fijación de precios', 'Regulados por el Gobierno y fórmulas oficiales del BOE.', 'Libremente pactados entre la comercializadora y el cliente.'],
            ['Bono Social', 'Obligatorio para solicitar el Bono Social Eléctrico o Térmico.', 'No disponible (salvo excepciones normativas puntuales).'],
            ['Permanencia', 'Prohibida por ley (0 permanencia).', 'Generalmente sin permanencia en contratos residenciales, salvo cláusulas de descuento vinculadas.'],
            ['Servicios adicionales', 'Prohibido añadir seguros de averías o asistencias.', 'Permitido (frecuente foco de sobrecostes si no se vigilan).']
          ]
        },
        callout: {
          type: 'important',
          title: 'El caso del Gas Natural (TUR):',
          text: 'En el gas natural, la Tarifa de Último Recurso (TUR) suele ser considerablemente más económica que la inmensa mayoría de ofertas del mercado libre debido al tope regulado del coste de la materia prima. En tuLuz analizamos con honestidad si a tu hogar le conviene permanecer en la TUR o dar el salto al mercado libre.'
        }
      },
      {
        id: 'las-5-trampas',
        title: 'Las 5 trampas habituales de las ofertas comerciales gancho',
        content: `Cuando usas un **comparador comercializadoras luz y gas**, debes tener cuidado con estas 5 prácticas comerciales frecuentes:`,
        bullets: [
          '**Trampa 1: El descuento con caducidad.** Promociones del "20% de descuento en el consumo" que esconden una subida automática masiva en el mes 13 si no recuerdas renegociar el contrato.',
          '**Trampa 2: Precios de kWh que excluyen costes regulados.** Comerciales que publicitan un precio muy bajo por kWh pero omiten deliberadamente el término de pérdidas de red o el impuesto eléctrico.',
          '**Trampa 3: Servicios de mantenimiento camuflados.** Cobros mensuales de 7€ a 14€ por pólizas de asistencia eléctrica de dudosa utilidad que duplican lo que ya cubre tu seguro de hogar.',
          '**Trampa 4: Tarifas planas con regularización oculta.** Promesas de "cuota fija de 65€ al mes" que esconden una cláusula de liquidación anual con recargos de cientos de euros si superas un límite de consumo prefijado.',
          '**Trampa 5: Penalizaciones por cancelación de descuentos.** Aunque la ley prohíbe permanencias en hogares, algunas compañías cobran penalizaciones por pérdida de bonificaciones acumuladas si te marchas antes de 12 meses.'
        ]
      },
      {
        id: 'tarifas-duales',
        title: 'Tarifas duales (luz + gas): ¿realmente ahorras unificándolas?',
        content: `Es muy común que las grandes energéticas ofrezcan un "descuento especial si contratas luz y gas juntos". En la práctica, casi siempre una de las dos partes del contrato está inflada. Por ejemplo, te ofrecen un precio competitivo en electricidad mientras encarecen el término fijo del gas, resultando en un coste neto superior.\n\nEn **tuLuz** recomendamos contratar la luz con la comercializadora que ofrezca las mejores condiciones eléctricas y el gas con la que ofrezca el mejor precio gasista (incluso la tarifa regulada TUR), optimizando cada suministro de forma separada.`
      },
      {
        id: 'comparadores-sesgados',
        title: 'La verdad sobre los comparadores web convencionales',
        content: `La mayoría de comparadores automáticos que encuentras en internet posicionan en primer lugar a las comercializadoras que pagan mayores comisiones de captación por cliente captado, ocultando ofertas más económicas de comercializadoras que no pagan comisiones por clic.\n\n**tuLuz opera con independencia:** Comparamos más de 50 compañías del mercado libre y regulado buscando exclusivamente la opción que maximice el ahorro real de tu factura.`
      },
      {
        id: 'checklist-6-puntos',
        title: 'Checklist de 6 comprobaciones clave antes de contratar una oferta',
        content: `Antes de firmar cualquier contrato de luz o gas, comprueba estos 6 puntos indispensables:`,
        bullets: [
          '**1. Precio final con impuestos:** ¿El precio por kWh incluye peajes de acceso regulados e impuestos?',
          '**2. Precio de la potencia (kW):** ¿Cuánto cuesta el término de potencia en punta y valle?',
          '**3. Ausencia de permanencia:** ¿Puedes darte de baja libremente sin penalizaciones?',
          '**4. Cero servicios adicionales:** ¿Se ha excluido todo tipo de seguro, asistencia o mantenimiento?',
          '**5. Vigencia temporal:** ¿El precio pactado es válido durante 12 meses completos o solo durante los primeros meses?',
          '**6. Criterio de revisión anual:** ¿Las actualizaciones anuales se vinculan al IPC o a una fórmula interna de la comercializadora?'
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
    title: 'Placas solares para particulares: precio de instalación en 2026, 6 partidas de coste y rentabilidad',
    metaTitle: 'Placas Solares para Particulares: Precio Real en 2026 | tuLuz',
    metaDescription: '¿Cuánto cuesta instalar placas solares en una vivienda particular? Tabla de precios en 2026, las 6 partidas del presupuesto, amortización en 3-5 años y deducción IRPF.',
    category: 'Autoconsumo y Fotovoltaica',
    readTime: '9 min de lectura',
    publishedAt: '2026-04-05',
    updatedAt: '2026-09-10',
    author: {
      name: 'Equipo de Ingeniería Fotovoltaica tuLuz',
      role: 'Instalaciones Solares y Autoconsumo Residencial',
      avatar: '/icono.webp'
    },
    excerpt: 'Desglosamos al milímetro cuánto cuesta poner placas solares en una vivienda en 2026: tabla de precios por potencia, las 6 partidas de un presupuesto llave en mano, deducciones de hasta el 60% en IRPF y batería virtual para facturas a 0€.',
    tableOfContents: [
      { id: 'tabla-precios-2026', title: '1. Tabla de precios reales de instalaciones solares en 2026' },
      { id: 'las-6-partidas-coste', title: '2. Las 6 partidas que componen un presupuesto solar llave en mano' },
      { id: 'cuantos-paneles-necesitas', title: '3. ¿Cuántos paneles solares necesita realmente tu vivienda?' },
      { id: 'bateria-virtual-vs-fisica', title: '4. Batería virtual (monedero solar) vs Batería física de litio' },
      { id: 'retorno-inversion-3-5-anos', title: '5. Retorno de la inversión: amortización real en 3 a 5 años' },
      { id: 'deducciones-irpf-ibi', title: '6. Deducción de hasta el 60% en IRPF y bonificaciones de IBI e ICIO' },
      { id: 'preguntas-frecuentes', title: 'Preguntas frecuentes sobre precios de placas solares' }
    ],
    sections: [
      {
        id: 'tabla-precios-2026',
        title: '1. Tabla de precios reales de instalaciones solares residenciales en 2026',
        content: `Gracias a la madurez de la tecnología de células monocristalinas de alta potencia (TOPCon y HJT), los precios de los paneles fotovoltaicos se sitúan hoy en sus valores más accesibles.\n\nEn 2026, el rango de precio medio en España oscila entre **3.200€ y 7.900€** (IVA incluido) para una vivienda unifamiliar o adosado estándar, antes de aplicar deducciones fiscales:`,
        table: {
          headers: ['Tipo de vivienda / Consumo mensual', 'Potencia pico', 'Nº estimado paneles (500W)', 'Rango de precio medio (IVA incluido)'],
          rows: [
            ['Piso / Adosado pequeño (hasta 50€/mes factura)', '2,5 kWp - 3 kWp', '5 - 6 paneles', '3.200€ - 4.100€'],
            ['Vivienda unifamiliar media (60€ - 120€/mes)', '4 kWp - 5 kWp', '8 - 10 paneles', '4.400€ - 5.600€'],
            ['Vivienda grande / Aerotermia (+150€/mes)', '6 kWp - 8 kWp', '12 - 16 paneles', '6.200€ - 7.900€'],
            ['Vivienda con piscina climatizada y coche eléctrico', '8 kWp - 10 kWp', '16 - 20 paneles', '7.800€ - 9.800€']
          ]
        }
      },
      {
        id: 'las-6-partidas-coste',
        title: '2. Las 6 partidas que componen un presupuesto solar llave en mano',
        content: `Un presupuesto fotovoltaico profesional no es solo comprar paneles; comprende 6 partidas esenciales:`,
        bullets: [
          '**1. Módulos fotovoltaicos Tier 1:** Paneles monocristalinos de alta eficiencia con 25 a 30 años de garantía de producción (representan el 25% - 30% del presupuesto).',
          '**2. Inversor solar o microinversores:** El equipo que transforma la corriente continua de las placas en corriente alterna para tu hogar (marcas como Huawei, Enphase, Sungrow, Fronius), con un 20% - 25% del coste.',
          '**3. Estructuras de anclaje:** Estructuras de aluminio anodizado coplanares o con inclinación certificadas para resistir vientos superiores a 120 km/h (10% - 12% del coste).',
          '**4. Cuadro de protecciones eléctricas y cableado:** Magnetotérmicos, sobretensiones transitorias y permanentes y cableado solar de doble aislamiento (8% - 10% del coste).',
          '**5. Mano de obra e instalación autorizada:** Técnicos montadores e instaladores electricistas homologados con seguro de responsabilidad civil (15% - 20% del coste).',
          '**6. Legalización, tasas y boletín (CIE):** Proyecto o memoria técnica, pago de tasas municipales, boletín eléctrico y registro ante Industria y distribuidora (8% - 12% del coste).'
        ]
      },
      {
        id: 'cuantos-paneles-necesitas',
        title: '3. ¿Cuántos paneles solares necesita realmente tu vivienda?',
        content: `El mayor error al pedir ofertas es sobredimensionar la instalación pensando que "a más placas, mejor". Si no consumes la energía ni dispones de una tarifa adecuada, habrás pagado por paneles que tardarás el doble en amortizar.\n\nEn **tuLuz** calculamos el número idóneo cruzando tu histórico real de consumo horario (disponible a través de tu distribuidora) con la orientación (sur, este-oeste), inclinación y radiación solar específica de tu tejado.`
      },
      {
        id: 'bateria-virtual-vs-fisica',
        title: '4. Batería virtual (monedero solar) vs Batería física de litio',
        content: `Para aprovechar la energía solar producida en horas centrales durante la noche dispones de dos alternativas:`,
        bullets: [
          '**Batería Virtual (Monedero solar):** Es un servicio ofrecido por la comercializadora de luz. No requiere instalar ningún aparato físico ni desembolsar miles de euros. Cada kWh excedentario que viertes a la red se tasa en euros y se acumula en un monedero digital que descuenta no solo el consumo nocturno, sino también la potencia contratada e impuestos hasta reducir la factura a 0€.',
          '**Batería física de litio (5 kWh a 10 kWh):** Dispositivo de almacenamiento físico en tu vivienda. Cuesta entre **2.800€ y 5.500€ adicionales**. Aporta independencia frente a cortes de red (modo back-up) y un 90% de autosuficiencia directa, aunque alarga el periodo de amortización global.'
        ]
      },
      {
        id: 'retorno-inversion-3-5-anos',
        title: '5. Retorno de la inversión: amortización real en 3 a 5 años',
        content: `Con los precios actuales de los equipos y las deducciones fiscales vigentes, el plazo de amortización de una instalación solar doméstica en España se sitúa entre **3 y 5 años**.\n\nUna vivienda que invierta 4.800€ y reduzca su factura mensual de 110€ a menos de 15€ gracias a la batería virtual ahorra cerca de **1.140€ anuales**. Teniendo en cuenta que los módulos fotovoltaicos tienen una vida útil superior a 25-30 años, disfrutarás de más de 20 años de electricidad prácticamente gratuita.`
      },
      {
        id: 'deducciones-irpf-ibi',
        title: '6. Deducción de hasta el 60% en IRPF y bonificaciones de IBI e ICIO',
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
