// Índice único de todo el laboratorio.
//
// La barra lateral, la página de inicio y los botones de "anterior / siguiente"
// leen todos de acá. Si agregás una lección nueva, agregá su entrada en este
// archivo y aparece sola en los tres lugares.
//
// El orden de este archivo ES el orden de lectura del sitio.

export const PISTAS = [
  {
    id: "empezar",
    nombre: "Empezar acá",
    descripcion: "Cómo está armado este laboratorio y cómo se usa.",
    lecciones: [
      {
        slug: "/",
        titulo: "Inicio",
        resumen: "El mapa completo: qué hay en cada pista y por dónde arrancar.",
      },
      {
        slug: "/sobre-next",
        titulo: "Cómo funciona este proyecto",
        resumen:
          "npm, npx, Next.js, el App Router y por qué aparece la línea \"use client\".",
      },
    ],
  },

  {
    id: "html",
    nombre: "HTML",
    descripcion:
      "La estructura. Lo que define qué es cada cosa en la página, antes de que tenga un solo color.",
    lecciones: [
      {
        slug: "/html/bases",
        titulo: "Cómo funciona la web",
        resumen:
          "Qué pasa entre que escribís una dirección y ves la página. Anatomía de un documento HTML.",
      },
      {
        slug: "/html/texto",
        titulo: "Texto, enlaces e imágenes",
        resumen:
          "Encabezados con jerarquía, listas, enlaces que no mienten e imágenes con alt.",
      },
      {
        slug: "/html/semantica",
        titulo: "HTML semántico",
        resumen:
          "Por qué <section> no es lo mismo que <div>, y qué gana tu página cuando elegís bien.",
      },
      {
        slug: "/html/tablas",
        titulo: "Tablas",
        resumen:
          "Tablas de datos bien armadas, accesibles y responsive. Y cuándo no usar una tabla.",
      },
      {
        slug: "/html/formularios",
        titulo: "Formularios y validación nativa",
        resumen:
          "Los controles, las etiquetas, y todo lo que el navegador valida gratis antes de que escribas JavaScript.",
      },
      {
        slug: "/html/accesibilidad",
        titulo: "Accesibilidad",
        resumen:
          "Cómo se lee tu página con un lector de pantalla y con el teclado. Lo que cambia con muy poco esfuerzo.",
      },
    ],
  },

  {
    id: "css",
    nombre: "CSS",
    descripcion:
      "La presentación. Cómo se ve, cómo se acomoda y cómo se adapta a cualquier pantalla.",
    lecciones: [
      {
        slug: "/css/bases",
        titulo: "Qué es CSS y cómo se aplica",
        resumen:
          "Las tres formas de aplicar estilos —en línea, interno y externo— y cuál conviene.",
      },
      {
        slug: "/css/selectores",
        titulo: "Selectores, cascada y especificidad",
        resumen:
          "Por qué a veces un estilo no se aplica y la respuesta casi nunca es !important.",
      },
      {
        slug: "/css/caja",
        titulo: "El modelo de caja",
        resumen:
          "Todo elemento es una caja. Padding, border, margin, box-sizing y las unidades que conviene usar.",
      },
      {
        slug: "/css/display",
        titulo: "La propiedad display",
        resumen:
          "block, inline, inline-block, none y el flujo normal del documento. La base de todo lo demás.",
      },
      {
        slug: "/css/flexbox",
        titulo: "Flexbox",
        resumen:
          "Acomodar cosas en una dirección. El eje principal, el cruzado, y los patrones que vas a repetir siempre.",
      },
      {
        slug: "/css/grid",
        titulo: "Grid",
        resumen:
          "Acomodar cosas en dos dimensiones. Filas, columnas, áreas con nombre y grillas que se adaptan solas.",
      },
      {
        slug: "/css/responsive",
        titulo: "Responsive y variables",
        resumen:
          "Media queries, variables CSS, tema oscuro y las funciones que evitan la mitad de los breakpoints.",
      },
      {
        slug: "/css/pagina-completa",
        titulo: "Armar una página entera",
        resumen:
          "Todo junto: una landing con header, hero, grilla de tarjetas y footer, explicada decisión por decisión.",
      },
    ],
  },

  {
    id: "js",
    nombre: "JavaScript y TypeScript",
    descripcion:
      "El comportamiento. El lenguaje que mueve la página, y el sistema de tipos que lo hace soportable.",
    lecciones: [
      {
        slug: "/js/donde-se-ejecuta",
        titulo: "Dónde se ejecuta JavaScript",
        resumen:
          "Navegador y Node.js: el mismo lenguaje, dos entornos distintos. Qué tiene cada uno y qué no.",
      },
      {
        slug: "/js/fundamentos",
        titulo: "Los fundamentos del lenguaje",
        resumen:
          "Variables, tipos, funciones, arreglos y objetos: lo que hay que tener firme antes de seguir.",
      },
      {
        slug: "/js/dom-y-asincronia",
        titulo: "El DOM y la asincronía",
        resumen:
          "Modificar la página desde JavaScript, escuchar al usuario, y cómo se escribe lo que tarda.",
      },
      {
        slug: "/js/typescript",
        titulo: "TypeScript",
        resumen:
          "Qué agrega sobre JavaScript, los tipos que vas a usar el 90% del tiempo, y cuánto cuesta adoptarlo.",
      },
    ],
  },

  {
    id: "react",
    nombre: "React",
    descripcion:
      "Construir interfaces con componentes. La pista más larga, porque es la que más vas a usar.",
    lecciones: [
      {
        slug: "/react/componentes",
        titulo: "Componentes",
        resumen:
          "Un componente es una función que devuelve JSX. Por qué el nombre va en mayúscula.",
      },
      {
        slug: "/react/jsx",
        titulo: "JSX",
        resumen:
          "Las reglas de JSX: un solo elemento raíz, etiquetas cerradas, className y llaves.",
      },
      {
        slug: "/react/props",
        titulo: "Props",
        resumen:
          "Cómo un componente padre le pasa información a un hijo, y qué es children.",
      },
      {
        slug: "/react/eventos",
        titulo: "Eventos",
        resumen:
          "onClick, propagación de eventos, stopPropagation y preventDefault.",
      },
      {
        slug: "/react/estado",
        titulo: "useState",
        resumen:
          "Por qué una variable común no alcanza, y cómo el estado le da memoria a un componente.",
      },
      {
        slug: "/react/actualizaciones-de-estado",
        titulo: "Cómo se actualiza el estado",
        resumen:
          "La instantánea del render, por qué setNumber tres veces suma uno, y las funciones actualizadoras.",
      },
      {
        slug: "/react/objetos-en-estado",
        titulo: "Objetos en estado",
        resumen:
          "Mutar es incorrecto: hay que crear un objeto nuevo. Spread y objetos anidados.",
      },
      {
        slug: "/react/arreglos-en-estado",
        titulo: "Arreglos en estado",
        resumen:
          "Agregar, borrar, modificar y ordenar sin mutar el arreglo original.",
      },
      {
        slug: "/react/listas-y-keys",
        titulo: "Listas y key",
        resumen:
          "Renderizar arreglos con map y por qué la key importa más de lo que parece.",
      },
      {
        slug: "/react/renderizado-condicional",
        titulo: "Renderizado condicional",
        resumen: "if, operador ternario, && y la trampa clásica del cero.",
      },
      {
        slug: "/react/formularios",
        titulo: "Formularios controlados",
        resumen:
          "Inputs, checkboxes y selects manejados por el estado de React.",
      },
      {
        slug: "/react/estado-compartido",
        titulo: "Estado compartido",
        resumen:
          "Levantar el estado al padre para que dos componentes se mantengan sincronizados.",
      },
      {
        slug: "/react/efectos",
        titulo: "Efectos",
        resumen:
          "useEffect: sincronizar tu componente con algo de afuera, y por qué casi siempre no lo necesitás.",
      },
      {
        slug: "/react/hooks-propios",
        titulo: "Hooks propios",
        resumen:
          "Extraer lógica repetida a tu propio hook. Es más simple de lo que suena.",
      },
      {
        slug: "/react/routing",
        titulo: "Routing",
        resumen:
          "Rutas por carpeta, Link, rutas dinámicas y navegación desde el código.",
      },
      {
        slug: "/react/layout",
        titulo: "Layouts",
        resumen:
          "Layouts anidados, estados de carga y de error. Lo que envuelve a tus páginas.",
      },
      {
        slug: "/react/desafios",
        titulo: "Desafíos",
        resumen: "Ejercicios para resolver vos, con pista y solución escondidas.",
      },
    ],
  },

  {
    id: "redux",
    nombre: "Redux",
    descripcion:
      "Estado global previsible, para cuando levantar el estado ya no alcanza.",
    lecciones: [
      {
        slug: "/redux/por-que",
        titulo: "Por qué existe Redux",
        resumen:
          "El problema que resuelve, las alternativas más baratas, y cuándo de verdad conviene.",
      },
      {
        slug: "/redux/conceptos",
        titulo: "Store, acciones y reducers",
        resumen:
          "Las tres piezas y el flujo en una sola dirección. Redux a mano, sin librerías, para entenderlo.",
      },
      {
        slug: "/redux/toolkit",
        titulo: "Redux Toolkit",
        resumen:
          "createSlice, configureStore, useSelector y useDispatch: lo mismo de antes con un cuarto del código.",
      },
      {
        slug: "/redux/practica",
        titulo: "Un carrito completo",
        resumen:
          "Varios slices, selectores derivados, datos que llegan de afuera y las DevTools.",
      },
    ],
  },
];

// Lecciones que todavía no están escritas. Aparecen en el índice en gris, sin
// enlace, para que se vea el mapa completo del recorrido sin que nadie caiga en
// un 404. A medida que se escribe una, se saca de esta lista y listo.
const PENDIENTES = new Set([]);

for (const pista of PISTAS) {
  for (const leccion of pista.lecciones) {
    if (PENDIENTES.has(leccion.slug)) leccion.pendiente = true;
  }
}

// Se mantiene el nombre viejo para no romper nada que ya lo importe.
export const GRUPOS = PISTAS;

// Lista plana de las lecciones que ya se pueden leer, en orden de lectura.
// Las pendientes quedan afuera para que "anterior / siguiente" nunca lleve a
// una página que todavía no existe.
export const LECCIONES = PISTAS.flatMap((pista) =>
  pista.lecciones.filter((leccion) => !leccion.pendiente),
);

// Todas, incluidas las pendientes. La usa el índice para mostrar el mapa entero.
export const TODAS = PISTAS.flatMap((pista) => pista.lecciones);

// Devuelve la lección anterior y la siguiente para el pie de cada página.
export function vecinas(slug) {
  const indice = LECCIONES.findIndex((leccion) => leccion.slug === slug);
  if (indice === -1) return { anterior: null, siguiente: null };
  return {
    anterior: indice > 0 ? LECCIONES[indice - 1] : null,
    siguiente: indice < LECCIONES.length - 1 ? LECCIONES[indice + 1] : null,
  };
}

// La pista a la que pertenece una lección.
export function pistaDe(slug) {
  return PISTAS.find((p) => p.lecciones.some((l) => l.slug === slug)) ?? null;
}

// El nombre de la pista, para la etiqueta que va arriba del título.
export function grupoDe(slug) {
  const pista = pistaDe(slug);
  return pista ? pista.nombre : null;
}
