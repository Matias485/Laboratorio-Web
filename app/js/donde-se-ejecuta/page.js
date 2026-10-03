import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import DetectorDeEntorno from "./DetectorDeEntorno";
import AlmacenDemo from "./AlmacenDemo";
import MedidorDeVentana from "./MedidorDeVentana";
import TrabajadorDemo from "./TrabajadorDemo";
import OrdenDeCargaDemo from "./OrdenDeCargaDemo";
import ModulosDemo from "./ModulosDemo";
import HiloUnicoDemo from "./HiloUnicoDemo";

export const metadata = { title: "Dónde se ejecuta JavaScript" };

// --------------------------------------------------------------------------
// Datos de la tabla de referencia. Se escriben acá arriba para que el JSX de
// abajo se pueda leer de un saque.
// --------------------------------------------------------------------------

const TABLA = [
  [
    "Objeto global",
    "window (y globalThis)",
    "globalThis (y el viejo global)",
  ],
  [
    "Interfaz",
    "document y todo el DOM: la página que ve el usuario",
    "No hay. La salida es la terminal, un archivo o una respuesta HTTP",
  ],
  [
    "Red",
    "fetch y WebSocket, pero solo adonde el otro servidor le dé permiso (CORS)",
    "fetch, http, https, sockets: sin restricciones",
  ],
  [
    "Archivos",
    "Ninguno, salvo el que el usuario elija a mano con un input de tipo file",
    "fs: leer, escribir y borrar todo lo que el usuario del sistema pueda",
  ],
  [
    "Guardar datos",
    "localStorage, sessionStorage, IndexedDB, cookies",
    "Archivos, bases de datos, variables de entorno",
  ],
  ["Abrir un servidor", "No puede", "Sí: http.createServer(...).listen(3000)"],
  [
    "Ejecutar otros programas",
    "No puede",
    "Sí: child_process, y por eso npm puede hacer todo lo que hace",
  ],
  [
    "Cómo llega el código",
    "El usuario entra a una URL y el código ya está corriendo",
    "Vos instalás Node y ejecutás el archivo a propósito",
  ],
  [
    "Módulos",
    "ESM solamente, con type=\"module\"",
    "ESM y CommonJS, los dos conviven",
  ],
  [
    "Qué versión corre",
    "La que tenga el visitante. No elegís vos",
    "La que instalaste. Lo decidís vos",
  ],
];

// Diagrama de tiempos. Cada caso tiene dos carriles: qué hace el parser de
// HTML y qué hace el script. Los números son porcentajes del ancho total.
const AZUL = "var(--azul-600)";
const AMBAR = "var(--ambar)";
const ROJO = "var(--rojo)";

const CARGAS = [
  {
    nombre: "<script src=\"app.js\"> a secas, en el <head>",
    html: [[15, AZUL], [45, null], [40, AZUL]],
    script: [[15, null], [30, AMBAR], [15, ROJO], [40, null]],
    nota:
      "El parser se planta: no lee una línea más de HTML hasta que el archivo bajó y se ejecutó. La página queda en blanco mientras tanto. Y cuando por fin corre, el DOM está vacío.",
  },
  {
    nombre: "<script defer src=\"app.js\"> en el <head>",
    html: [[70, AZUL], [30, null]],
    script: [[15, null], [30, AMBAR], [25, null], [15, ROJO], [15, null]],
    nota:
      "Baja en paralelo sin frenar nada y se ejecuta recién cuando el HTML está completo. Si hay varios defer, corren en el orden en que están escritos. Es la opción que querés el 90% de las veces.",
  },
  {
    nombre: "<script async src=\"app.js\"> en el <head>",
    html: [[45, AZUL], [15, null], [40, AZUL]],
    script: [[15, null], [30, AMBAR], [15, ROJO], [40, null]],
    nota:
      "Baja en paralelo, pero se ejecuta apenas termina de bajar, interrumpiendo el parseo donde sea que esté. No garantiza ningún orden entre varios async. Sirve para cosas sueltas que no dependen de nadie, tipo métricas.",
  },
  {
    nombre: "<script src=\"app.js\"> al final del <body>",
    html: [[70, AZUL], [30, null]],
    script: [[70, null], [15, AMBAR], [15, ROJO]],
    nota:
      "El DOM ya está listo cuando corre, igual que con defer, pero la descarga arranca tardísimo: el navegador se entera de que ese archivo existe recién al final. Es la técnica vieja, anterior a defer.",
  },
];

const th = {
  textAlign: "left",
  fontSize: "0.74rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "var(--texto-suave)",
  padding: "7px 10px",
  borderBottom: "2px solid var(--borde)",
};

const td = {
  padding: "7px 10px",
  borderBottom: "1px solid var(--borde)",
  verticalAlign: "top",
};

function Carril({ etiqueta, tramos }) {
  return (
    <div className="fila" style={{ gap: 8, flexWrap: "nowrap", marginBottom: 4 }}>
      <span
        style={{
          width: 54,
          flexShrink: 0,
          fontSize: "0.72rem",
          color: "var(--texto-suave)",
          fontFamily: "var(--fuente-mono)",
        }}
      >
        {etiqueta}
      </span>
      <span
        style={{
          display: "flex",
          flex: 1,
          height: 14,
          borderRadius: 4,
          overflow: "hidden",
          background: "var(--superficie-2)",
        }}
      >
        {tramos.map(([ancho, color], indice) => (
          <span
            key={etiqueta + indice}
            style={{
              width: `${ancho}%`,
              background: color ?? "transparent",
            }}
          />
        ))}
      </span>
    </div>
  );
}

function Chip({ color, children }) {
  return (
    <span className="fila" style={{ gap: 6, flexWrap: "nowrap" }}>
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 4,
          background: color,
          display: "inline-block",
        }}
      />
      <span className="tenue">{children}</span>
    </span>
  );
}

export default function Pagina() {
  return (
    <Leccion
      slug="/js/donde-se-ejecuta"
      titulo="Dónde se ejecuta JavaScript"
      resumen="Navegador y Node.js: el mismo lenguaje, dos entornos distintos. Qué tiene cada uno y qué no."
    >
      <Seccion titulo="JavaScript no corre solo">
        <p>
          Esta es la primera lección de la pista y arranca con la idea que
          ordena todas las que siguen, así que vale la pena decirla despacio:{" "}
          <strong>
            JavaScript es un lenguaje que no puede hacer absolutamente nada por
            su cuenta
          </strong>
          . No sabe dibujar un botón, no sabe leer un archivo, no sabe mandar un
          pedido por la red. Nada de eso está en el lenguaje.
        </p>

        <p>
          Lo que el lenguaje trae es la gramática y un puñado de cosas
          universales: números, textos, objetos, arreglos, funciones, clases,{" "}
          <code>Math</code>, <code>JSON</code>, <code>Date</code>,{" "}
          <code>Promise</code>. Eso está escrito en un estándar que se llama{" "}
          <strong>ECMAScript</strong>, y es idéntico en todos lados. Lo demás —
          todo lo interesante— se lo presta el <strong>entorno</strong> donde el
          código está corriendo.
        </p>

        <p>Y hay dos piezas que conviene no confundir:</p>
        <ul>
          <li>
            <strong>El motor</strong> es el programa que entiende JavaScript y
            lo ejecuta. Los que importan hoy son <strong>V8</strong> (Chrome,
            Edge, Opera y también Node.js),{" "}
            <strong>SpiderMonkey</strong> (Firefox) y{" "}
            <strong>JavaScriptCore</strong> (Safari, y Bun). Los tres
            implementan el mismo estándar.
          </li>
          <li>
            <strong>El entorno</strong> es lo que envuelve al motor y le pone
            objetos a mano. El navegador le da <code>document</code>,{" "}
            <code>fetch</code>, <code>localStorage</code>. Node.js le da{" "}
            <code>process</code>, <code>fs</code>, <code>path</code>. Son{" "}
            <em>agregados</em>, no parte del lenguaje.
          </li>
        </ul>

        <Nota tipo="info" titulo="El mismo motor, dos entornos">
          <p style={{ marginBottom: 0 }}>
            Node.js usa exactamente el mismo V8 que Chrome. Si escribís{" "}
            <code>[1, 2, 3].map(n =&gt; n * 2)</code>, corre igual en los dos, con
            el mismo código de máquina. Lo único que cambia es qué más hay
            alrededor. Por eso la pregunta &quot;¿esto anda en Node?&quot; casi
            nunca es sobre el lenguaje: es sobre el entorno.
          </p>
        </Nota>

        <p>
          La forma más rápida de creerlo es medirlo. El recuadro de abajo{" "}
          <strong>se está ejecutando en tu navegador ahora mismo</strong> y le
          pregunta a tu entorno qué tiene a mano. No es una lista escrita a mano:
          cada fila sale de un <code>typeof</code> de verdad.
        </p>

        <Demo titulo="Demo · qué hay en tu entorno, medido en vivo">
          <DetectorDeEntorno />
        </Demo>

        <Codigo
          archivo="app/js/donde-se-ejecuta/DetectorDeEntorno.js"
          resaltar={[9]}
          codigo={`function medir() {
  return {
    filas: APIS.map(([nombre, entorno, para]) => ({
      nombre,
      entorno,
      para,
      // typeof es la única forma segura de preguntar por algo que quizás
      // no existe: con cualquier otra cosa tendrías un ReferenceError.
      tipo: typeof globalThis[nombre],
    })),
    userAgent: navigator.userAgent,
    nucleos: navigator.hardwareConcurrency,
    idioma: navigator.language,
    enLinea: navigator.onLine,
    origen: window.location.origin,
  };
}`}
        />

        <p>
          Ese mismo archivo, ejecutado con <code>node</code> en tu terminal,
          daría la tabla dada vuelta:{" "}
          <code>&quot;undefined&quot;</code> donde ahora dice{" "}
          <code>&quot;object&quot;</code>, y al revés. Y la última línea
          explotaría, porque <code>navigator.userAgent</code> no existe allá.
        </p>

        <Nota tipo="atencion" titulo="typeof es el único que no explota">
          <p style={{ marginBottom: 0 }}>
            Si escribís <code>if (window)</code> en un entorno donde{" "}
            <code>window</code> no existe, no te da <code>false</code>: te tira{" "}
            <code>ReferenceError: window is not defined</code> y se corta todo.{" "}
            <code>typeof window</code>, en cambio, devuelve tranquilamente la
            cadena <code>&quot;undefined&quot;</code>. Es la única operación del
            lenguaje que se banca un nombre que no está declarado, y por eso la
            vas a ver en todos lados.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El navegador: dueño de la página, invitado en tu máquina">
        <p>
          El entorno del navegador está construido alrededor de un objeto
          gigante: <code>window</code>. <code>window</code> es el objeto global
          de la pestaña, y todo cuelga de ahí. Cuando escribís{" "}
          <code>document</code> a secas, estás escribiendo{" "}
          <code>window.document</code>; lo mismo con <code>fetch</code>,{" "}
          <code>setTimeout</code> o <code>alert</code>.
        </p>

        <p>Lo que el navegador te presta, agrupado:</p>
        <ul>
          <li>
            <strong>La página</strong>: <code>document</code> y todo el DOM —
            buscar elementos, crearlos, cambiarlos, escuchar clicks. De eso se
            ocupa la lección <em>El DOM y los eventos</em>.
          </li>
          <li>
            <strong>La red</strong>: <code>fetch</code>, <code>WebSocket</code>,{" "}
            <code>EventSource</code>.
          </li>
          <li>
            <strong>Guardar cosas</strong>: <code>localStorage</code>,{" "}
            <code>sessionStorage</code>, <code>IndexedDB</code>, cookies.
          </li>
          <li>
            <strong>La ventana y el usuario</strong>: <code>location</code>,{" "}
            <code>history</code>, <code>navigator</code>,{" "}
            <code>alert</code> / <code>confirm</code> / <code>prompt</code>.
          </li>
          <li>
            <strong>Hardware, con permiso explícito</strong>: cámara, micrófono,
            ubicación, notificaciones, portapapeles. Todas piden autorización
            con un cartel del navegador, no tuyo.
          </li>
        </ul>

        <h3>Y ahora lo que NO puede, que es más interesante</h3>
        <p>
          El JavaScript de una página <strong>no puede</strong> abrir un archivo
          de tu disco, ni listar tus carpetas, ni ejecutar un programa, ni
          escuchar en un puerto, ni leer las variables de entorno de tu máquina,
          ni espiar lo que hay en otra pestaña, ni leer las cookies de otro
          sitio. No es que sea difícil: <strong>no existe la función</strong>.
        </p>

        <p>
          El motivo es el modelo de amenaza, y es bueno tenerlo claro porque
          explica la mitad de las rarezas del navegador:{" "}
          <strong>
            vos entrás a páginas que no elegiste con cuidado
          </strong>
          . Hacés click en un link de un mail, en un resultado de Google, en algo
          que te pasaron por WhatsApp. En ese instante tu máquina descarga y
          ejecuta el código de un desconocido, sin preguntarte nada, sin
          instalar nada. Si ese código pudiera leer tu disco, la web sería
          directamente inusable.
        </p>

        <p>
          Así que el navegador ejecuta todo adentro de una caja, y la única
          puerta al disco la abre el usuario a mano: un{" "}
          <code>{"<input type=\"file\">"}</code>. Vos no elegís el archivo, lo
          elige la persona, y solo ese. En el demo de abajo probá el selector: la
          página se entera del nombre, el tamaño y el tipo del archivo que
          elegiste, y de nada más. Ni en qué carpeta estaba.
        </p>

        <Demo titulo="Demo · el cajón del navegador y la única puerta al disco">
          <AlmacenDemo />
        </Demo>

        <Codigo
          archivo="app/js/donde-se-ejecuta/AlmacenDemo.js"
          resaltar={[7, 8]}
          codigo={`function guardar() {
  localStorage.setItem(CLAVE, texto);
}

function guardarUnNumero() {
  // Le pasamos el NÚMERO 42, no el texto "42".
  localStorage.setItem("laboratorio:numero", 42);
  const leido = localStorage.getItem("laboratorio:numero");
  // ...y nos devuelve "42", una cadena. localStorage solo guarda texto.
  // Para guardar un objeto: JSON.stringify al guardar, JSON.parse al leer.
}`}
        />

        <Nota tipo="atencion" titulo="localStorage guarda texto y nada más">
          <p>
            Tocá <em>Guardar el número 42</em> y mirá el <code>typeof</code>{" "}
            de lo que vuelve: <code>&quot;string&quot;</code>. Todo lo que entra
            se convierte a texto. Un <code>true</code> vuelve como{" "}
            <code>&quot;true&quot;</code>, y un objeto vuelve como{" "}
            <code>&quot;[object Object]&quot;</code>, que es basura. Por eso el
            par obligatorio es{" "}
            <code>JSON.stringify()</code> al guardar y{" "}
            <code>JSON.parse()</code> al leer.
          </p>
          <p style={{ marginBottom: 0 }}>
            Y el cajón está atado al <strong>origen</strong> (protocolo + dominio
            + puerto). Lo que guarda <code>localhost:3000</code> no lo ve{" "}
            <code>localhost:3001</code> ni ningún otro sitio. Eso se llama{" "}
            <em>política del mismo origen</em> y es la regla de seguridad más
            importante de la web.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Node.js: JavaScript sin pantalla">
        <p>
          En 2009 a Ryan Dahl se le ocurrió algo simple: agarrar V8, el motor de
          JavaScript de Chrome, sacarlo del navegador y ponerle alrededor lo que
          le faltaba para ser un programa de sistema común y corriente. Eso es{" "}
          <strong>Node.js</strong>. No es un lenguaje nuevo, no es una versión
          distinta de JavaScript: es{" "}
          <strong>el mismo motor con otros objetos alrededor</strong>.
        </p>

        <p>Los que vas a ver todo el tiempo:</p>
        <ul>
          <li>
            <code>process</code> — el proceso del sistema operativo: los
            argumentos con los que lo llamaron (<code>process.argv</code>), las
            variables de entorno (<code>process.env</code>), la carpeta desde la
            que se ejecutó (<code>process.cwd()</code>), cómo terminar
            (<code>process.exit()</code>).
          </li>
          <li>
            <code>fs</code> — archivos: leer, escribir, borrar, mirar carpetas.
          </li>
          <li>
            <code>path</code> — armar rutas sin romperte la cabeza con las
            barras de Windows contra las de Linux.
          </li>
          <li>
            <code>http</code> / <code>https</code> — abrir un servidor o pedirle
            cosas a otro.
          </li>
          <li>
            <code>os</code>, <code>crypto</code>, <code>child_process</code> —
            datos de la máquina, hashes y firmas, y ejecutar otros programas.
          </li>
        </ul>

        <p>
          Y lo que <strong>no</strong> hay: <code>document</code>,{" "}
          <code>window</code>, <code>alert</code>, <code>localStorage</code>. No
          hay pantalla. La salida de un programa de Node es la terminal, un
          archivo, o una respuesta HTTP.
        </p>

        <Nota tipo="info" titulo="Acá console.log sí es la salida">
          <p style={{ marginBottom: 0 }}>
            En este laboratorio los demos nunca usan <code>console.log</code>,
            porque en una página web lo que va a la consola no lo ve nadie. En
            Node es al revés: <strong>la terminal es la interfaz</strong>, y{" "}
            <code>console.log</code> es literalmente cómo el programa le habla a
            la persona que lo ejecutó.
          </p>
        </Nota>

        <Codigo
          archivo="contar-lineas.js — se corre con: node contar-lineas.js notas.txt"
          resaltar={[7, 9]}
          codigo={`// Nada de esto existe en el navegador.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// process.argv son las palabras que escribiste en la terminal.
// [0] es node, [1] es este archivo, [2] en adelante son tus argumentos.
const nombre = process.argv[2] ?? "notas.txt";

const contenido = readFileSync(resolve(process.cwd(), nombre), "utf8");
const lineas = contenido.split("\\n").length;

console.log(\`\${nombre} tiene \${lineas} líneas\`);`}
        />

        <p>
          Y un servidor completo, que es lo que más se usa. Fijate que son ocho
          líneas: esa fue buena parte del atractivo de Node cuando apareció.
        </p>

        <Codigo
          archivo="servidor.js — se corre con: node servidor.js"
          codigo={`import { createServer } from "node:http";

const servidor = createServer((pedido, respuesta) => {
  respuesta.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  respuesta.end(\`Hola. Acá corre Node \${process.version}\`);
});

// El proceso queda vivo esperando pedidos. No termina solo.
servidor.listen(3000, () => {
  console.log("Escuchando en http://localhost:3000");
});`}
        />

        <h3>Ya estás usando Node aunque no lo sepas</h3>
        <p>
          Esto es lo que más sorprende al principio:{" "}
          <strong>
            todo el andamiaje del desarrollo frontend corre sobre Node
          </strong>
          . <code>npm</code> es un programa de Node. Next.js es un programa de
          Node. Este sitio que estás leyendo lo está sirviendo un proceso de Node
          en tu propia máquina: cuando corrés <code>npm run dev</code>, lo que
          arranca es exactamente el tipo de servidor del ejemplo de arriba,
          escuchando en el puerto 3000. De eso habla{" "}
          <Link href="/sobre-next">Cómo funciona este proyecto</Link>.
        </p>

        <p>
          Así que la respuesta a &quot;¿para qué me sirve Node si yo hago
          frontend?&quot; es: ya te está sirviendo. Y además es lo que te
          permite escribir el backend con el mismo lenguaje, y armarte
          herramientas de línea de comandos para tus propias tareas repetitivas.
        </p>

        <h3>La tabla, para volver a mirar</h3>

        <div style={{ overflowX: "auto", marginBottom: 16 }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.88rem",
              minWidth: 560,
            }}
          >
            <thead>
              <tr>
                <th style={th}></th>
                <th style={th}>Navegador</th>
                <th style={th}>Node.js</th>
              </tr>
            </thead>
            <tbody>
              {TABLA.map(([tema, navegador, node]) => (
                <tr key={tema}>
                  <td style={{ ...td, fontWeight: 600, whiteSpace: "nowrap" }}>
                    {tema}
                  </td>
                  <td style={td}>{navegador}</td>
                  <td style={td}>{node}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Y una aclaración para que no te agarre de sorpresa: no son los únicos
          dos. <strong>Deno</strong> y <strong>Bun</strong> son entornos de
          servidor más nuevos, los <strong>Web Workers</strong> son un entorno
          adentro del propio navegador, y los <em>edge runtimes</em> (Cloudflare
          Workers, Vercel Edge) son otro más. Todos corren el mismo lenguaje con
          distintas cosas alrededor. El criterio con el que los vas a leer es
          siempre el mismo: <em>¿qué me presta este entorno?</em>
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Un archivo atado al navegador">
            <Codigo
              archivo="saludo.js"
              codigo={`export function saludar(nombre) {
  // La lógica y la pantalla mezcladas: este
  // archivo solo sirve adentro de una página.
  const limpio = nombre.trim() || "invitado";
  document.getElementById("saludo").textContent =
    "Hola, " + limpio;
}`}
            />
            <p className="tenue">
              No lo podés probar con Node, no lo podés reusar en el backend y no
              lo podés testear sin levantar un navegador entero.
            </p>
          </Columna>
          <Columna tono="bien" titulo="La lógica separada del entorno">
            <Codigo
              archivo="saludo.js"
              codigo={`// JavaScript puro: anda en los dos lados.
export function saludar(nombre) {
  return "Hola, " + (nombre.trim() || "invitado");
}

// pagina.js — la parte que toca el DOM, aparte.
import { saludar } from "./saludo.js";
document.getElementById("saludo").textContent =
  saludar(entrada.value);`}
            />
            <p className="tenue">
              La regla que te va a salvar mil veces:{" "}
              <strong>el cálculo no toca el entorno</strong>. Solo los bordes
              saben si están en un navegador o en un servidor.
            </p>
          </Columna>
        </Comparacion>
      </Seccion>

      <Seccion titulo="&quot;window is not defined&quot;: el error que vas a ver mil veces">
        <p>
          Con todo lo anterior, este error ya se explica solo. En Next.js, tus
          componentes <strong>se ejecutan primero en el servidor</strong>: la
          función corre en Node, devuelve HTML, ese HTML viaja al navegador y
          recién ahí el mismo código se vuelve a ejecutar, esta vez con{" "}
          <code>window</code> a mano. Es el tema de{" "}
          <Link href="/sobre-next">Cómo funciona este proyecto</Link>.
        </p>

        <p>
          Entonces, si escribís esto, el primer paso de los dos falla y ni
          siquiera llegás a ver la página:
        </p>

        <Codigo
          archivo="app/tablero/page.js"
          resaltar={[3]}
          codigo={`export default function Tablero() {
  // ✗ Esto corre en el servidor antes que en ningún lado.
  const ancho = window.innerWidth;
  return <p>La ventana mide {ancho}px</p>;
}`}
        />

        <Codigo
          archivo="terminal donde corre npm run dev"
          codigo={`ReferenceError: window is not defined
    at Tablero (app/tablero/page.js:3:17)
    at renderToString (node_modules/react-dom/server.js:...)

  1 | export default function Tablero() {
  2 |   // ✗ Esto corre en el servidor antes que en ningún lado.
> 3 |   const ancho = window.innerWidth;
    |                 ^
  4 |   return <p>La ventana mide {ancho}px</p>;`}
        />

        <p>
          El mensaje es literal y no hay que buscarle vueltas:{" "}
          <em>window no está definido</em>. Con <code>document</code>,{" "}
          <code>localStorage</code> o <code>navigator</code> es exactamente lo
          mismo. Hay dos arreglos, y sirven para cosas distintas.
        </p>

        <Comparacion>
          <Columna tono="bien" titulo="1. Moverlo a un efecto">
            <Codigo
              archivo="app/tablero/page.js"
              resaltar={[1, 9]}
              codigo={`"use client";
import { useEffect, useState } from "react";

export default function Tablero() {
  const [ancho, setAncho] = useState(null);

  useEffect(() => {
    // useEffect NO corre en el servidor. Nunca.
    setAncho(window.innerWidth);
  }, []);

  return <p>{ancho ?? "midiendo…"}</p>;
}`}
            />
            <p className="tenue">
              Para cuando <strong>necesitás el valor en pantalla</strong>. El
              primer dibujo muestra un placeholder y el valor real aparece
              apenas el componente se monta en el navegador.
            </p>
          </Columna>
          <Columna tono="bien" titulo="2. Preguntar con typeof">
            <Codigo
              archivo="almacen.js"
              resaltar={[3]}
              codigo={`export function leerTema() {
  // Este archivo lo importan los dos lados.
  if (typeof window === "undefined") return "claro";
  return localStorage.getItem("tema") ?? "claro";
}`}
            />
            <p className="tenue">
              Para <strong>funciones de ayuda</strong> que se importan desde
              cualquier lado y tienen que devolver algo razonable aunque no haya
              navegador.
            </p>
          </Columna>
        </Comparacion>

        <Demo titulo="Demo · el ancho medido dentro de un efecto">
          <MedidorDeVentana />
        </Demo>

        <Codigo
          archivo="app/js/donde-se-ejecuta/MedidorDeVentana.js"
          resaltar={[4, 11]}
          codigo={`useEffect(() => {
  // Cuando esta línea se ejecuta, el navegador ya existe.
  function medir() {
    setAncho(window.innerWidth);
  }

  medir();
  window.addEventListener("resize", medir);
  // Si no sacamos el listener, cada vez que este componente se monte
  // de nuevo queda uno viejo escuchando para siempre.
  return () => window.removeEventListener("resize", medir);
}, []);`}
        />

        <Nota tipo="atencion" titulo="El typeof no va suelto en el render">
          <p>
            Esto parece la solución obvia y es un error distinto:
          </p>
          <Codigo
            codigo={`// ✗ No explota, pero React se queja de "hydration mismatch".
const ancho = typeof window === "undefined" ? 0 : window.innerWidth;
return <p>{ancho}</p>;`}
          />
          <p style={{ marginBottom: 0 }}>
            El servidor dibuja <code>0</code> y el navegador dibuja{" "}
            <code>1280</code>. React compara los dos y encuentra que no
            coinciden, así que tira el HTML del servidor y vuelve a dibujar todo.
            Para que se vea en pantalla, el valor tiene que entrar por un{" "}
            <strong>efecto</strong> o por un <strong>evento</strong> (un click),
            que son los dos momentos que solo existen en el navegador.
          </p>
        </Nota>

        <p>
          Y para cerrar la idea de que el entorno es lo que cambia, acá hay un
          tercer entorno que ya tenés instalado: un{" "}
          <strong>Web Worker</strong>. Es JavaScript corriendo en el mismo
          navegador, en el mismo motor, pero en otro hilo y{" "}
          <strong>sin acceso al DOM</strong>. El botón le manda el código a un
          worker de verdad y muestra lo que contesta.
        </p>

        <Demo titulo="Demo · el mismo código, adentro de un Web Worker">
          <TrabajadorDemo />
        </Demo>

        <p>
          Fijate que <code>fetch</code> y <code>setTimeout</code> están, pero{" "}
          <code>document</code> no, y el mensaje de error que te devuelve es{" "}
          <strong>el mismo</strong> que te tira Next.js desde el servidor. No es
          una casualidad: es la misma situación. Código de navegador corriendo en
          un lugar que no tiene página.
        </p>
      </Seccion>

      <Seccion titulo="Cómo entra tu código en la página">
        <p>
          Ya sabemos dónde corre. Falta lo otro:{" "}
          <strong>cuándo</strong>. Un archivo <code>.js</code> entra a una página
          con una etiqueta <code>{"<script>"}</code>, y el lugar donde la ponés y
          los atributos que le agregues cambian por completo el resultado.
          Empecemos por el problema, que se ve mejor que lo que se explica.
        </p>

        <Demo titulo="Demo · el mismo script, en tres lugares distintos">
          <OrdenDeCargaDemo />
        </Demo>

        <p>
          El primer caso es el clásico &quot;mi código no encuentra el
          botón&quot;. El navegador lee el HTML de arriba hacia abajo y, cuando
          se topa con un <code>{"<script>"}</code>, lo ejecuta ahí mismo. Todo lo
          que está escrito más abajo en el archivo{" "}
          <strong>todavía no existe</strong>, así que{" "}
          <code>document.querySelector(&quot;#lista&quot;)</code> devuelve{" "}
          <code>null</code> y el error que te llega es{" "}
          <code>Cannot read properties of null</code>.
        </p>

        <h3>Los cuatro tiempos, dibujados</h3>

        <div
          className="fila"
          style={{ gap: 18, marginBottom: 14, flexWrap: "wrap" }}
        >
          <Chip color={AZUL}>el navegador lee el HTML</Chip>
          <Chip color={AMBAR}>baja el archivo .js</Chip>
          <Chip color={ROJO}>ejecuta el script</Chip>
        </div>

        {CARGAS.map((caso) => (
          <div key={caso.nombre} style={{ marginBottom: 20 }}>
            <p
              style={{
                margin: "0 0 6px",
                fontWeight: 600,
                fontSize: "0.92rem",
                fontFamily: "var(--fuente-mono)",
              }}
            >
              {caso.nombre}
            </p>
            <Carril etiqueta="HTML" tramos={caso.html} />
            <Carril etiqueta="script" tramos={caso.script} />
            <p className="tenue" style={{ margin: "6px 0 0" }}>
              {caso.nota}
            </p>
          </div>
        ))}

        <Nota tipo="ok" titulo="La regla corta">
          <p style={{ marginBottom: 0 }}>
            Usá <code>defer</code>, o usá <code>type=&quot;module&quot;</code>{" "}
            (que ya lo implica). Dejá <code>async</code> para lo que no depende
            de nadie ni de nada, como un script de métricas. Y si estás usando
            React, Next.js, Vite o cualquier herramienta moderna, todo esto lo
            resuelve la herramienta por vos: igual conviene entenderlo, porque
            cuando algo falla el error aparece acá.
          </p>
        </Nota>

        <Codigo
          archivo="index.html"
          resaltar={[4, 5]}
          codigo={`<head>
  <meta charset="utf-8">
  <title>Mi página</title>
  <script defer src="app.js"></script>
  <script type="module" src="principal.js"></script>
  <script async src="metricas.js"></script>
</head>`}
        />

        <Nota tipo="atencion" titulo="defer y async se ignoran si no hay src">
          <p style={{ marginBottom: 0 }}>
            Los dos atributos hablan de <em>cuándo ejecutar lo que se bajó</em>,
            así que en un script escrito adentro de la página (sin{" "}
            <code>src</code>) no significan nada: el navegador los ignora y
            ejecuta el código en el acto. La excepción es{" "}
            <code>type=&quot;module&quot;</code>, que <strong>sí</strong> difiere
            aunque esté escrito ahí mismo. Es justo lo que ves en el tercer caso
            del demo de arriba, donde el script está arriba de todo y aun así
            encuentra la lista.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Módulos: import/export contra require">
        <p>
          Durante dieciséis años JavaScript{" "}
          <strong>no tuvo módulos</strong>. Ninguno. Todos los archivos de una
          página compartían un único espacio de nombres: si dos archivos
          declaraban <code>var usuario</code>, el segundo pisaba al primero y no
          te enterabas hasta que algo fallaba en producción. La forma de
          &quot;importar&quot; era acordarse de poner los{" "}
          <code>{"<script>"}</code> en el orden correcto.
        </p>

        <p>
          Cuando Node apareció en 2009, ese problema era intolerable para
          programas grandes, así que se inventó el suyo:{" "}
          <strong>CommonJS</strong>, con <code>require()</code> y{" "}
          <code>module.exports</code>. Recién en 2015 el lenguaje incorporó los
          suyos al estándar: <strong>ESM</strong>, con <code>import</code> y{" "}
          <code>export</code>. Por eso hoy hay dos: uno es el oficial y el otro
          es el que quedó de la época en que no había.
        </p>

        <Demo titulo="Demo · qué cambia de verdad cuando ponés type=module">
          <ModulosDemo />
        </Demo>

        <p>
          El primer botón muestra el mundo viejo: dos archivos sueltos que
          comparten todo. El segundo, el mundo nuevo: el mismo código deja de
          verse porque{" "}
          <strong>cada módulo tiene su propio alcance</strong>. El tercero es el
          error con el que todo el mundo se choca la primera vez.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="CommonJS — lo de Node, pre-2015">
            <Codigo
              archivo="matematica.js"
              codigo={`function sumar(a, b) {
  return a + b;
}

module.exports = { sumar };`}
            />
            <Codigo
              archivo="principal.js"
              codigo={`const { sumar } = require("./matematica.js");

// require() es una función común: se ejecuta
// cuando el programa llega a esa línea, y le
// podés pasar un nombre calculado.
console.log(sumar(2, 3));`}
            />
            <p className="tenue">
              El navegador <strong>no entiende</strong> nada de esto:{" "}
              <code>require</code> no existe ahí. Sigue vivo en Node y en
              muchísimo código viejo.
            </p>
          </Columna>
          <Columna tono="bien" titulo="ESM — el estándar del lenguaje">
            <Codigo
              archivo="matematica.js"
              codigo={`export function sumar(a, b) {
  return a + b;
}

// también: export default function ...`}
            />
            <Codigo
              archivo="principal.js"
              codigo={`import { sumar } from "./matematica.js";

// import es estático: el nombre del archivo
// tiene que ser una cadena fija, y se resuelve
// ANTES de ejecutar una sola línea.
console.log(sumar(2, 3));`}
            />
            <p className="tenue">
              Funciona en el navegador (con{" "}
              <code>type=&quot;module&quot;</code>) y en Node. Es lo que usa este
              proyecto y lo que vas a escribir siempre.
            </p>
          </Columna>
        </Comparacion>

        <p>
          Lo que tenés que saber para no quedarte trabado, en cuatro puntos:
        </p>
        <ul>
          <li>
            <strong>En el navegador solo hay ESM</strong>, y hay que declararlo:{" "}
            <code>{"<script type=\"module\" src=\"principal.js\">"}</code>. Sin
            eso, el <code>import</code> ni siquiera se lee.
          </li>
          <li>
            <strong>En Node conviven los dos.</strong> Node decide cuál usar
            mirando el <code>package.json</code>: con{" "}
            <code>&quot;type&quot;: &quot;module&quot;</code> trata los{" "}
            <code>.js</code> como ESM, y sin eso como CommonJS. Las extensiones{" "}
            <code>.mjs</code> y <code>.cjs</code> fuerzan una u otra sin
            importar el <code>package.json</code>.
          </li>
          <li>
            <strong>En ESM la ruta va completa</strong>, con extensión:{" "}
            <code>&quot;./matematica.js&quot;</code>, no{" "}
            <code>&quot;./matematica&quot;</code>. Eso lo perdona{" "}
            <code>require</code>, y también lo perdonan los empaquetadores como
            el de Next, que es por lo que en este proyecto ves imports sin{" "}
            <code>.js</code>.
          </li>
          <li>
            <strong>Un módulo está en modo estricto siempre</strong> y sus
            variables no van a <code>window</code>. Además, la carga es{" "}
            <em>diferida</em>: eso es lo que viste en la sección anterior.
          </li>
        </ul>

        <Nota tipo="error" titulo="Los dos mensajes que vas a ver">
          <Codigo
            archivo="consola del navegador"
            codigo={`Uncaught SyntaxError: Cannot use import statement outside a module`}
          />
          <p>
            Te falta <code>type=&quot;module&quot;</code> en la etiqueta, o le
            estás pasando a Node un archivo ESM en un proyecto configurado como
            CommonJS. El archivo está bien; lo que está mal es cómo lo cargaste.
          </p>
          <Codigo
            archivo="terminal"
            codigo={`ReferenceError: require is not defined in ES module scope`}
          />
          <p style={{ marginBottom: 0 }}>
            El espejo del anterior: el proyecto es ESM y ese archivo está escrito
            en CommonJS. O lo pasás a <code>import</code>, o lo renombrás a{" "}
            <code>.cjs</code>.
          </p>
        </Nota>

        <p>
          Una última cosa útil: como <code>import</code> es estático, existe{" "}
          <code>import()</code> como <em>función</em> para los casos en que
          necesitás cargar algo en el momento. Devuelve una promesa, y es la
          forma correcta de usar una librería que solo funciona en el navegador.
        </p>

        <Codigo
          archivo="Mapa.js"
          resaltar={[4]}
          codigo={`useEffect(() => {
  // Esta librería toca window apenas se carga, así que ni siquiera
  // podemos importarla arriba del archivo: se caería en el servidor.
  import("una-libreria-de-mapas").then((modulo) => {
    modulo.dibujar(contenedor.current);
  });
}, []);`}
        />
      </Seccion>

      <Seccion titulo="Un solo hilo">
        <p>
          Falta una característica del motor que explica muchísimo de lo que vas
          a ver:{" "}
          <strong>JavaScript ejecuta una sola cosa por vez</strong>. Hay un solo
          hilo. Mientras tu función esté corriendo, el navegador{" "}
          <em>no puede hacer nada más</em>: ni responder un click, ni redibujar
          la pantalla, ni correr un <code>setInterval</code> que ya venció.
        </p>

        <p>
          Esto no se entiende bien hasta que se ve. El contador de abajo avanza
          diez veces por segundo. Tocá el botón y mirá qué le pasa; probá también
          escribir en el casillero durante el bloqueo.
        </p>

        <Demo titulo="Demo · un bucle que se queda con el hilo">
          <HiloUnicoDemo />
        </Demo>

        <Codigo
          archivo="app/js/donde-se-ejecuta/HiloUnicoDemo.js"
          resaltar={[8, 9, 10]}
          codigo={`function bloquear() {
  const arranque = performance.now();
  let vueltas = 0;

  // Este bucle no hace nada útil: lo único que hace es NO devolver
  // el hilo. Mientras esté acá adentro, el navegador no puede correr
  // el setInterval, ni atender tus clicks, ni redibujar la pantalla.
  while (performance.now() - arranque < 1500) {
    vueltas += 1;
  }
}`}
        />

        <p>
          Los tics perdidos no se recuperan: el navegador no acumula las diez
          vueltas que debía y las corre todas juntas, simplemente{" "}
          <strong>no ocurrieron</strong>. Y las teclas que apretaste aparecieron
          todas de golpe al final, porque el evento quedó esperando en una cola.
          Eso es una página congelada, y cada vez que viste una en tu vida, era
          esto.
        </p>

        <p>
          La pregunta obvia es entonces cómo hace una página para pedir algo por
          la red, que tarda medio segundo, sin quedarse dura. La respuesta corta:{" "}
          <strong>no espera</strong>. Le pide el trabajo al entorno —que sí tiene
          otros hilos— y le deja dicho qué hacer cuando termine. El motor sigue
          con lo suyo y vuelve a esa tarea cuando está libre. Ese mecanismo se
          llama <strong>bucle de eventos</strong>, y es el tema completo de la
          lección <em>Callbacks, promesas y async/await</em>, que viene más
          adelante en esta misma pista.
        </p>

        <h3>Dónde quedaste parado</h3>
        <p>
          Cerramos donde empezamos. Aprendiste que hay{" "}
          <strong>un lenguaje</strong> y <strong>varios entornos</strong>, y que
          casi todo lo que parece raro de JavaScript se explica preguntando{" "}
          <em>¿dónde está corriendo esto?</em>. Ese mismo lenguaje que vas a
          estudiar en las próximas lecciones te sirve para la página, para el
          servidor que la atiende, para las herramientas con las que construís, y
          también para aplicaciones de escritorio (Electron: VS Code está hecho
          así) y para celulares (React Native).
        </p>

        <p>
          No es un lenguaje que aprendas para una materia y después descartes.
          Por eso conviene aprenderlo bien, y por eso las lecciones que siguen se
          meten con las partes incómodas —<code>var</code> contra{" "}
          <code>let</code>, la coerción de tipos, <code>this</code>— en vez de
          pasar por arriba.
        </p>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Preferencias que no rompan el servidor"
          pista={
            <div>
              <p>
                Tres cosas para tener en cuenta, y las tres ya aparecieron en la
                lección:
              </p>
              <ul>
                <li>
                  <code>typeof window === &quot;undefined&quot;</code> es la
                  única forma segura de preguntar. Un <code>if (window)</code> a
                  secas tira <code>ReferenceError</code>.
                </li>
                <li>
                  <code>localStorage</code> guarda texto, así que el objeto pasa
                  por <code>JSON.stringify</code> al ir y{" "}
                  <code>JSON.parse</code> al volver.
                </li>
                <li>
                  El <code>JSON.parse</code> puede fallar si lo guardado está
                  corrupto, y en modo incógnito algunos navegadores hacen que{" "}
                  <code>setItem</code> tire una excepción cuando no hay espacio.
                  Un <code>try</code> no está de más.
                </li>
              </ul>
            </div>
          }
          solucion={
            <Codigo
              archivo="preferencias.js"
              resaltar={[4, 10, 17]}
              codigo={`const CLAVE = "preferencias";

function hayAlmacen() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function leerPreferencias(porDefecto = {}) {
  // En el servidor devolvemos los valores por defecto y listo:
  // la página se dibuja igual y no explota nada.
  if (!hayAlmacen()) return porDefecto;

  const crudo = localStorage.getItem(CLAVE);
  if (crudo === null) return porDefecto;

  try {
    // Lo guardado es texto: hay que volver a armar el objeto.
    return { ...porDefecto, ...JSON.parse(crudo) };
  } catch {
    // Alguien tocó el valor a mano, o quedó a medio escribir.
    return porDefecto;
  }
}

export function guardarPreferencias(preferencias) {
  if (!hayAlmacen()) return false;
  try {
    localStorage.setItem(CLAVE, JSON.stringify(preferencias));
    return true;
  } catch {
    // En modo incógnito o con el disco lleno, setItem puede fallar.
    return false;
  }
}`}
            />
          }
        >
          <p>
            Escribí un archivo <code>preferencias.js</code> con dos funciones,{" "}
            <code>leerPreferencias()</code> y{" "}
            <code>guardarPreferencias(objeto)</code>, que guarden un objeto
            —por ejemplo <code>{"{ tema: \"oscuro\", idioma: \"es\" }"}</code>—
            en <code>localStorage</code>.
          </p>
          <p>
            La condición es que ese archivo lo pueda importar cualquiera,
            incluido un componente que corre en el servidor. Si no hay navegador,{" "}
            <code>leerPreferencias()</code> tiene que devolver los valores por
            defecto sin tirar ningún error, y <code>guardarPreferencias()</code>{" "}
            no tiene que hacer nada.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Arreglá el componente que no compila"
          pista={
            <p>
              Hay <strong>tres</strong> líneas que tocan el navegador:{" "}
              <code>window.innerWidth</code>, <code>document.title</code> y el{" "}
              <code>addEventListener</code>. Ninguna puede estar en el cuerpo del
              componente. Movelas a un <code>useEffect</code> y acordate de que{" "}
              <code>addEventListener</code> se devuelve siempre con su{" "}
              <code>removeEventListener</code> en la función de limpieza. El
              valor inicial del estado tiene que ser algo que el servidor también
              pueda dibujar.
            </p>
          }
          solucion={
            <div>
              <Codigo
                archivo="app/tablero/Tablero.js"
                resaltar={[1, 7, 9, 15, 17]}
                codigo={`"use client";

import { useEffect, useState } from "react";

export default function Tablero() {
  // null es un valor que el servidor también puede dibujar.
  const [ancho, setAncho] = useState(null);

  useEffect(() => {
    function medir() {
      setAncho(window.innerWidth);
    }

    medir();
    document.title = "Tablero";
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  return (
    <div>
      <p>{ancho === null ? "Midiendo…" : \`La ventana mide \${ancho}px\`}</p>
      <p>{ancho !== null && ancho < 700 ? "Modo angosto" : "Modo ancho"}</p>
    </div>
  );
}`}
              />
              <p>
                Tres detalles que valen tanto como el arreglo:
              </p>
              <ul>
                <li>
                  <code>&quot;use client&quot;</code> es obligatorio: sin eso el
                  archivo no puede tener ni <code>useState</code> ni{" "}
                  <code>useEffect</code>.
                </li>
                <li>
                  El <code>return</code> del efecto es la limpieza. Sin él, cada
                  montaje deja un listener más escuchando para siempre.
                </li>
                <li>
                  La primera pintura dice <em>Midiendo…</em> tanto en el servidor
                  como en el navegador. Si el valor inicial fuera distinto en
                  cada lado, React se quejaría de que el HTML no coincide.
                </li>
              </ul>
            </div>
          }
        >
          <p>
            Este componente tira{" "}
            <code>ReferenceError: window is not defined</code> apenas entrás a la
            página. Arreglalo sin cambiar lo que hace.
          </p>
          <Codigo
            archivo="app/tablero/Tablero.js"
            codigo={`import { useState } from "react";

export default function Tablero() {
  const ancho = window.innerWidth;
  const [angosto, setAngosto] = useState(ancho < 700);

  document.title = "Tablero";
  window.addEventListener("resize", () => setAngosto(window.innerWidth < 700));

  return (
    <div>
      <p>La ventana mide {ancho}px</p>
      <p>{angosto ? "Modo angosto" : "Modo ancho"}</p>
    </div>
  );
}`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
