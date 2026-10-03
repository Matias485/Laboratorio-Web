# Laboratorio web

Sitio interactivo para aprender desarrollo web de punta a punta: **HTML, CSS,
JavaScript, TypeScript, React y Redux**. Cada lección explica una idea, la
muestra funcionando en la misma página y deja el código al lado para copiarlo,
romperlo y volverlo a armar.

Nació como apoyo de **Taller de Programación II**, pero no se queda en el
temario: cada tema incluye lo que en la práctica vas a necesitar igual, aunque
no haya entrado en una diapositiva.

## Arrancar

```bash
npm install
```

```bash
npm run dev
```

Después abrí <http://localhost:3000>.

El servidor de desarrollo recarga la página sola cada vez que guardás un
archivo, así que lo normal es dejarlo corriendo mientras editás.

## Comandos

| Comando | Para qué sirve |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en `http://localhost:3000`. |
| `npm run build` | Compila el proyecto como si fueras a publicarlo. Detecta errores que en desarrollo no molestan. |
| `npm start` | Levanta el proyecto ya compilado (corré `npm run build` antes). |
| `npm run lint` | Revisa el código buscando errores comunes. |

## Las cinco pistas

**HTML** — la estructura. Cómo funciona la web, texto y enlaces, HTML
semántico, tablas, formularios con validación nativa y accesibilidad.

**CSS** — la presentación. Cómo se aplica, selectores y especificidad, modelo de
caja, `display`, Flexbox, Grid, responsive con variables, y una página entera
armada de cero.

**JavaScript y TypeScript** — el comportamiento. Dónde se ejecuta (navegador
contra Node), los fundamentos del lenguaje (variables, tipos, funciones,
arreglos y objetos), el DOM y la asincronía (callbacks, promesas y
`async/await`), y TypeScript.

**React** — construir interfaces con componentes. Componentes, JSX, props,
eventos, `useState`, objetos y arreglos en estado, listas y `key`, renderizado
condicional, formularios, estado compartido, efectos, hooks propios, routing,
layouts y una página de desafíos.

**Redux** — estado global previsible. Por qué existe (y cuándo no hace falta),
las tres piezas desde cero, Redux Toolkit y un carrito completo.

El índice vive en un solo archivo: [`app/lecciones.js`](app/lecciones.js).
La barra lateral, la página de inicio y los botones de anterior/siguiente leen
todos de ahí.

## Qué hay adentro

```
laboratorio-react/
├── app/
│   ├── layout.js          # marco de todas las páginas (la barra lateral vive acá)
│   ├── globals.css        # todos los estilos del sitio, con variables de color
│   ├── lecciones.js       # índice único de las cinco pistas
│   ├── page.js            # la página de inicio            →  /
│   ├── sobre-next/        # cómo funciona este proyecto    →  /sobre-next
│   ├── html/…             # una carpeta por lección        →  /html/…
│   ├── css/…              #                                →  /css/…
│   ├── js/…               #                                →  /js/…
│   ├── react/…            #                                →  /react/…
│   └── redux/…            #                                →  /redux/…
├── components/            # piezas reutilizables del sitio (no de las lecciones)
│   ├── Leccion.js         # marco de una lección: título, resumen, anterior/siguiente
│   ├── Seccion.js         # bloque temático
│   ├── Demo.js            # recuadro "Demo en vivo"
│   ├── Codigo.js          # bloque de código con colores y botón de copiar
│   ├── Vista.js           # HTML y CSS sueltos dentro de un iframe aislado
│   ├── Editor.js          # editor en vivo: tocás el código y ves el resultado
│   ├── Nota.js            # recuadro de aviso
│   ├── Comparacion.js     # dos columnas: así no / así sí
│   ├── Desafio.js         # ejercicio con pista y solución escondidas
│   └── BarraLateral.js    # navegación por pistas
└── public/                # archivos estáticos servidos tal cual
```

En el App Router de Next.js **una carpeta dentro de `app/` es una ruta** y el
archivo `page.js` que tiene adentro es la página. Por eso `app/css/grid/page.js`
se ve en `http://localhost:3000/css/grid`. La lección
**Cómo funciona este proyecto** explica esto en detalle.

## Cómo sacarle el jugo

Leer no alcanza. En las lecciones de HTML y CSS, el editor en vivo tiene una
consigna abajo: seguila y mirá qué cambia. En las de JavaScript y React, abrí el
archivo del demo —el nombre está arriba de cada bloque de código— y modificalo.

Probá a propósito las cosas que las lecciones dicen que están mal: sacá un
`key`, mutá un objeto del estado, escribí un componente en minúscula, quitale el
`outline` al foco. Ver el error con tus propios ojos vale más que leer la
explicación tres veces.

## Cómo agregar una lección tuya

1. Creá la carpeta `app/<pista>/<mi-tema>/` con un `page.js` adentro.
2. Copiá la estructura de cualquier lección existente (`<Leccion>` con varias
   `<Seccion>`).
3. Agregá la entrada en `app/lecciones.js`: aparece sola en la barra lateral, en
   la página de inicio y en los botones de anterior/siguiente.

Si el componente usa `useState` o responde a clicks, acordate de `"use client"`
en la primera línea del archivo.

## Créditos

Referencias: [MDN](https://developer.mozilla.org/es/),
[react.dev](https://es.react.dev/learn) y
[Redux Toolkit](https://redux-toolkit.js.org/). Varios ejemplos de la pista de
React —la galería de científicos, las tazas de té, el punto que sigue al mouse—
son los mismos de la cursada, para poder ir y venir entre la teoría y este
laboratorio.

Construido con [Next.js](https://nextjs.org) y [React](https://react.dev).
