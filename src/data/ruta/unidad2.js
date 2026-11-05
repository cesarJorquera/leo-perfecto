import { readingQuestionAssessment } from '@/utils/assessment.js'

const nombresParaEvaluar = {
  idea_principal: 'Identificar Idea Principal',
  causa_efecto: 'Identificar Causa-Efecto',
  inferencia: 'Hacer Inferencias',
  detalle_especifico: 'Identificar Detalles Específicos',
  proposito_intencion: 'Identificar Propósito/Intención',
  comparar_fuentes: 'Comparar Fuentes',
  tono: 'Reconocer Tono'
}

function crearReto(habilidadId, id, titulo, tipo, ejercicio, resumen) {
  const evaluacion = readingQuestionAssessment(nombresParaEvaluar[habilidadId] || habilidadId)
  const retoId = 'u2-' + habilidadId + '-' + id

  return {
    id: retoId,
    titulo,
    codigo: evaluacion.code,
    assessmentType: evaluacion.type,
    pasos: [
      {
        id: retoId + '-pregunta',
        tipo,
        conAyuda: false,
        codigo: evaluacion.code,
        ejercicio
      },
      {
        id: retoId + '-resumen',
        tipo: 'resumen',
        ejercicio: { puntos: [resumen] }
      }
    ]
  }
}

function crearHabilidad(id, titulo, descripcion, retos) {
  return {
    id,
    titulo,
    descripcion,
    retos
  }
}

const habilidades = [
  crearHabilidad('idea_principal', 'Encuentra la idea central', 'Distingue el mensaje principal de los detalles.', [
    crearReto('idea_principal', 'titular', 'El titular que resume', 'elegir', {
      enunciado: 'Elige el titular que mejor resume la noticia.',
      palabras: ['El', 'centro', 'juvenil', 'abre', 'talleres', 'gratuitos', 'de', 'reparación', 'de', 'bicicletas', '.'],
      opciones: [
        'Un centro juvenil enseña a reparar bicicletas gratis.',
        'Las bicicletas son el transporte más rápido.',
        'Un taller cambió el horario de atención.'
      ],
      correcta: 0
    }, 'La idea central resume el hecho principal, no un dato aislado.'),
    crearReto('idea_principal', 'palabras-clave', 'Marca las ideas clave', 'tocar', {
      enunciado: 'Toca las palabras que muestran de qué trata principalmente el aviso.',
      palabras: ['La', 'biblioteca', 'del', 'barrio', 'extiende', 'su', 'horario', 'para', 'apoyar', 'a', 'estudiantes', '.'],
      correctas: [1, 4, 6, 8, 10],
      pista: 'Busca quién hace el cambio, cuál es y a quién beneficia.'
    }, 'Reunir varias ideas importantes ayuda a resumir el mensaje.'),
    crearReto('idea_principal', 'idea-o-detalle', 'Idea o detalle', 'clasificar', {
      enunciado: 'Separa el mensaje principal de un detalle.',
      cajas: [
        { id: 'central', titulo: 'Idea central' },
        { id: 'detalle', titulo: 'Detalle' }
      ],
      fichas: [
        { texto: 'El colegio inicia un plan para reducir residuos.', caja: 'central' },
        { texto: 'Los contenedores son de color verde.', caja: 'detalle' }
      ]
    }, 'La idea central explica el tema; un detalle agrega información específica.'),
    crearReto('idea_principal', 'resumen', 'El mejor resumen', 'vf', {
      enunciado: '¿El resumen conserva el mensaje principal?',
      afirmacion: 'Texto: El curso organizó una feria para reunir fondos para el paseo. Resumen: El curso realizó una actividad para financiar su paseo.',
      correcta: true
    }, 'Un buen resumen conserva lo esencial y elimina detalles secundarios.')
  ]),
  crearHabilidad('causa_efecto', 'Conecta causas y efectos', 'Reconoce qué provoca un hecho y qué ocurre después.', [
    crearReto('causa_efecto', 'cadena', 'Arma la cadena', 'clasificar', {
      enunciado: 'Ordena cada hecho como causa o efecto.',
      cajas: [
        { id: 'causa', titulo: 'Causa' },
        { id: 'efecto', titulo: 'Efecto' }
      ],
      fichas: [
        { texto: 'El club plantó árboles en el patio.', caja: 'causa' },
        { texto: 'En verano, el patio tiene más sombra.', caja: 'efecto' }
      ]
    }, 'La causa inicia el cambio; el efecto es lo que ocurre como resultado.'),
    crearReto('causa_efecto', 'resultado', '¿Qué ocurrió por eso?', 'elegir', {
      enunciado: 'El bus se atrasó por un corte de calle. ¿Cuál fue el efecto?',
      palabras: ['Por', 'un', 'corte', 'de', 'calle,', 'el', 'bus', 'se', 'atrasó', '.'],
      opciones: ['El corte de calle', 'El bus se atrasó', 'La calle estaba vacía'],
      correcta: 1
    }, 'Un conector como “por” puede señalar la causa; busca qué pasó como resultado.'),
    crearReto('causa_efecto', 'conector', 'Sigue la pista', 'tocar', {
      enunciado: 'Toca el conector que introduce la causa.',
      palabras: ['La', 'cancha', 'se', 'mojó', 'porque', 'llovió', 'durante', 'la', 'noche', '.'],
      correctas: [4],
      pista: 'Busca la palabra que une el resultado con su motivo.'
    }, 'Los conectores ayudan a reconocer la relación entre dos hechos.'),
    crearReto('causa_efecto', 'verdadero-falso', '¿La relación tiene sentido?', 'vf', {
      enunciado: 'Lee el hecho y decide si la relación es correcta.',
      afirmacion: 'Como el grupo ahorró agua, bajó el consumo registrado en la escuela.',
      correcta: true
    }, 'Comprueba que el efecto pueda explicarse por la causa mencionada.')
  ]),
  crearHabilidad('inferencia', 'Lee entre líneas', 'Deduce información usando pistas del texto.', [
    crearReto('inferencia', 'deduccion', 'Detective de pistas', 'elegir', {
      enunciado: 'Elige la conclusión mejor apoyada por el texto.',
      palabras: ['Al', 'terminar', 'el', 'entrenamiento,', 'Sofía', 'guardó', 'los', 'conos', 'y', 'apagó', 'las', 'luces', '.'],
      opciones: ['Sofía fue la última en salir.', 'Sofía olvidó entrenar.', 'El entrenamiento se hará en otro lugar.'],
      correcta: 0
    }, 'Inferir es combinar pistas del texto con una conclusión razonable.'),
    crearReto('inferencia', 'pista-verdadera', '¿Se puede deducir?', 'vf', {
      enunciado: 'Decide si la conclusión se apoya en una pista.',
      afirmacion: 'Texto: Martín miró el cielo oscuro, guardó el picnic y abrió el paraguas. Se puede inferir que esperaba lluvia.',
      correcta: true
    }, 'Una inferencia debe apoyarse en señales concretas, no en una suposición cualquiera.'),
    crearReto('inferencia', 'evidencia', 'Encuentra las pistas', 'tocar', {
      enunciado: 'Toca las dos pistas que permiten inferir que el local está por cerrar.',
      palabras: ['El', 'dueño', 'bajó', 'la', 'mitad', 'de', 'la', 'cortina', 'y', 'guardó', 'las', 'sillas', '.'],
      correctas: [2, 9],
      pista: 'Elige acciones que suelen ocurrir al terminar la atención.'
    }, 'Las pistas son detalles del texto que respaldan lo que deduces.'),
    crearReto('inferencia', 'hecho-o-deduccion', 'Hecho o deducción', 'clasificar', {
      enunciado: 'Distingue lo que el texto dice de lo que se puede deducir.',
      cajas: [
        { id: 'hecho', titulo: 'El texto lo dice' },
        { id: 'deduccion', titulo: 'Se puede deducir' }
      ],
      fichas: [
        { texto: 'El suelo quedó mojado.', caja: 'hecho' },
        { texto: 'Alguien pudo entrar con zapatos húmedos.', caja: 'deduccion' }
      ]
    }, 'Separar el hecho de la deducción ayuda a no confundir pistas con certezas.')
  ]),
  crearHabilidad('detalle_especifico', 'Rastrea información', 'Ubica datos concretos y comprueba dónde aparecen.', [
    crearReto('detalle_especifico', 'dato', 'Recupera el dato', 'escribir', {
      enunciado: 'Escribe el día en que será la reunión.',
      palabras: ['La', 'reunión', 'del', 'centro', 'de', 'estudiantes', 'será', 'el', 'jueves', 'en', 'la', 'sala', 'multiuso', '.'],
      correcta: 8,
      evidencia: [8],
      pista: 'Busca cuándo será la reunión.'
    }, 'Vuelve al texto para verificar el dato exacto antes de responder.'),
    crearReto('detalle_especifico', 'busqueda', 'Búsqueda de evidencia', 'tocar', {
      enunciado: 'Toca el día y la hora del taller.',
      palabras: ['El', 'taller', 'de', 'radio', 'será', 'el', 'martes', 'a', 'las', 'cuatro', 'de', 'la', 'tarde', '.'],
      correctas: [6, 9],
      pista: 'Busca cuándo se realizará, no de qué trata.'
    }, 'Un detalle específico responde una parte concreta de la pregunta.'),
    crearReto('detalle_especifico', 'dato-verdadero', 'Comprueba el dato', 'vf', {
      enunciado: '¿El dato coincide exactamente con el texto?',
      afirmacion: 'Texto: La inscripción cierra el 18 de agosto. Afirmación: La inscripción cierra el 18 de agosto.',
      correcta: true
    }, 'Distingue un dato explícito de uno parecido pero incorrecto.'),
    crearReto('detalle_especifico', 'opcion-exacta', 'Elige el dato exacto', 'elegir', {
      enunciado: 'Según el mensaje, ¿qué debe llevar cada participante?',
      palabras: ['Para', 'la', 'caminata,', 'cada', 'participante', 'debe', 'llevar', 'una', 'botella', 'reutilizable', '.'],
      opciones: ['Una botella reutilizable', 'Un vaso desechable', 'Una mochila nueva'],
      correcta: 0
    }, 'La respuesta correcta está expresada de forma directa en el texto.')
  ]),
  crearHabilidad('proposito_intencion', 'Descubre el propósito', 'Identifica qué busca lograr quien escribe.', [
    crearReto('proposito_intencion', 'aviso', '¿Para qué se escribió?', 'elegir', {
      enunciado: 'Lee el aviso y elige su propósito principal.',
      palabras: ['Este', 'viernes,', 'trae', 'tu', 'taza', 'reutilizable', 'y', 'ayúdanos', 'a', 'reducir', 'los', 'vasos', 'desechables', '.'],
      opciones: ['Convencer a las personas de cambiar un hábito', 'Contar una historia sobre una taza', 'Dar instrucciones para fabricar una taza'],
      correcta: 0
    }, 'El propósito explica qué quiere conseguir el mensaje en quien lo lee.'),
    crearReto('proposito_intencion', 'informar', 'Informar o convencer', 'clasificar', {
      enunciado: 'Clasifica cada mensaje según su propósito.',
      cajas: [
        { id: 'informar', titulo: 'Informar' },
        { id: 'convencer', titulo: 'Convencer' }
      ],
      fichas: [
        { texto: 'El gimnasio abre de 9:00 a 18:00.', caja: 'informar' },
        { texto: '¡Ven al gimnasio y muévete con tu curso!', caja: 'convencer' }
      ]
    }, 'Mira si el texto entrega un dato o intenta motivar una acción.'),
    crearReto('proposito_intencion', 'intencion', '¿Qué busca lograr?', 'vf', {
      enunciado: 'Decide si la intención descrita coincide con el mensaje.',
      afirmacion: 'Mensaje: “No compartas tu clave; cuida tu cuenta”. Su propósito es advertir sobre un riesgo.',
      correcta: true
    }, 'La intención puede ser advertir, informar, invitar o persuadir.'),
    crearReto('proposito_intencion', 'palabras-persuasivas', 'Detecta el llamado', 'tocar', {
      enunciado: 'Toca las palabras que invitan directamente a participar.',
      palabras: ['Inscríbete', 'hoy', 'y', 'súmate', 'a', 'la', 'limpieza', 'del', 'barrio', '.'],
      correctas: [0, 3],
      pista: 'Busca verbos que le pidan una acción al lector.'
    }, 'Los llamados a la acción suelen revelar que el texto busca motivar al lector.')
  ]),
  crearHabilidad('comparar_fuentes', 'Compara fuentes', 'Encuentra acuerdos y diferencias entre dos textos.', [
    crearReto('comparar_fuentes', 'dato-comun', '¿Qué comparten?', 'elegir', {
      enunciado: 'Fuente A: “El huerto escolar abrió en marzo”. Fuente B: “Desde marzo, el colegio tiene un huerto”. ¿Qué dato aparece en ambas?',
      opciones: ['El huerto abrió en marzo.', 'El huerto tiene tomates.', 'El huerto se riega cada tarde.'],
      correcta: 0
    }, 'Compara el mismo tema y marca solo la información respaldada por ambas fuentes.'),
    crearReto('comparar_fuentes', 'coincide-o-no', 'Acuerdo entre fuentes', 'vf', {
      enunciado: '¿La afirmación coincide con las dos fuentes?',
      afirmacion: 'Fuente A: “La feria será el sábado en la plaza”. Fuente B: “El sábado habrá una feria en la plaza”. Afirmación: La feria será el sábado.',
      correcta: true
    }, 'Un dato compartido debe estar presente en las dos fuentes, aunque cambien las palabras.'),
    crearReto('comparar_fuentes', 'fuentes', '¿Quién lo confirma?', 'clasificar', {
      enunciado: 'Clasifica los datos según cuántas fuentes los respaldan.',
      cajas: [
        { id: 'ambas', titulo: 'Lo dicen ambas' },
        { id: 'una', titulo: 'Lo dice solo una' }
      ],
      fichas: [
        { texto: 'Ambas anuncian una campaña de reciclaje.', caja: 'ambas' },
        { texto: 'Solo la fuente A indica que habrá premios.', caja: 'una' }
      ]
    }, 'Diferencia lo que comparten las fuentes de los datos exclusivos de una.'),
    crearReto('comparar_fuentes', 'diferencia', 'Detecta una diferencia', 'tocar', {
      enunciado: 'Fuente A: “El taller empieza a las 10”. Fuente B: “El taller comienza a las 11”. Toca los dos horarios distintos.',
      palabras: ['10', '11'],
      correctas: [0, 1],
      pista: 'Compara el mismo dato en cada fuente.'
    }, 'Comparar también implica detectar desacuerdos y verificar cuál fuente es más precisa.')
  ]),
  crearHabilidad('tono', 'Reconoce el tono', 'Interpreta la actitud que transmite la voz del texto.', [
    crearReto('tono', 'palabras', 'Pistas de tono', 'tocar', {
      enunciado: 'Toca las palabras que transmiten entusiasmo.',
      palabras: ['¡Qué', 'alegría!', 'Por', 'fin', 'abrimos', 'el', 'espacio', 'de', 'música', '.'],
      correctas: [0, 1, 3],
      pista: 'Fíjate en las palabras que expresan una emoción.'
    }, 'El tono se reconoce por las palabras y signos que expresan una actitud.'),
    crearReto('tono', 'tono-texto', '¿Qué tono transmite?', 'elegir', {
      enunciado: '“Lamentamos informar que el paseo fue suspendido por lluvia”. ¿Qué tono predomina?',
      opciones: ['Decepcionado', 'Bromista', 'Triunfal'],
      correcta: 0
    }, 'El tono muestra cómo se presenta el mensaje, no solo el tema que trata.'),
    crearReto('tono', 'neutral-o-emotivo', 'Neutral o emotivo', 'clasificar', {
      enunciado: 'Clasifica las expresiones por el tono que transmiten.',
      cajas: [
        { id: 'neutral', titulo: 'Neutral' },
        { id: 'emotivo', titulo: 'Emotivo' }
      ],
      fichas: [
        { texto: 'La actividad comienza a las nueve.', caja: 'neutral' },
        { texto: '¡Qué increíble jornada vivimos!', caja: 'emotivo' }
      ]
    }, 'Una voz neutral entrega información; una emotiva deja ver sentimientos.'),
    crearReto('tono', 'ironia', 'Lee la intención del tono', 'vf', {
      enunciado: '¿La afirmación reconoce una ironía?',
      afirmacion: 'Texto: “¡Qué puntual!”, dijo Ana cuando su amigo llegó una hora tarde. La frase probablemente expresa molestia, no elogio.',
      correcta: true
    }, 'El contexto puede cambiar el sentido literal de una frase y revelar ironía.')
  ])
]

const nodos = habilidades.map((habilidad, index) => ({
  id: 'u2-n' + (index + 1),
  habilidadId: habilidad.id,
  numero: index + 1
}))

const tareas = habilidades.reduce((catalogo, habilidad) => {
  habilidad.retos.forEach(reto => {
    catalogo[reto.id] = reto
  })
  return catalogo
}, {})

export default {
  id: 'u2',
  gameId: 3,
  titulo: 'Leer más allá',
  descripcion: 'Conecta ideas, pistas y fuentes.',
  habilidades,
  nodos,
  tareas
}
