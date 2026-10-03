import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import TerminalDeComandos from "./TerminalDeComandos";
import ExploradorDeRutas from "./ExploradorDeRutas";
import DatoDelServidor from "./DatoDelServidor";
import ContadorCliente from "./ContadorCliente";
import ErrorUseClient from "./ErrorUseClient";

export const metadata = { title: "Cómo funciona este proyecto" };

// Filas reales de este mismo sitio, para la tabla de archivo -> URL.
const RUTAS = [
  { archivo: "app/page.js", url: "/", nota: "la página de inicio" },
  { archivo: "app/sobre-next/page.js", url: "/sobre-next", nota: "esta misma página" },
  { archivo: "app/react/props/page.js", url: "/props", nota: "la lección de props" },
  {
    archivo: "app/react/arreglos-en-estado/page.js",
    url: "/arreglos-en-estado",
    nota: "el guion del medio va igual en la carpeta y en la URL",
  },
  {
    archivo: "app/layout.js",
    url: "(ninguna)",
    nota: "no es una página: envuelve a todas",
  },
];

const celda = {
  padding: "8px 12px",
  borderBottom: "1px solid var(--borde)",
  textAlign: "left",
  verticalAlign: "top",
};

const celdaTitulo = {
  ...celda,
  fontSize: "0.72rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--texto-suave)",
};

export default function Pagina() {
  return (
    <Leccion
      slug="/sobre-next"
      titulo="Cómo funciona este proyecto"
      resumen={`npm, npx, Next.js, el App Router y por qué aparece la línea "use client".`}
    >
      <Seccion titulo="npm y npx: parecidos, distintos">
        <p>
          Los dos vienen instalados junto con Node.js y los dos escriben paquetes
          en tu compu, pero hacen cosas diferentes. La forma más rápida de
          comprobar que los tenés es pedirles la versión.
        </p>

        <Codigo
          archivo="terminal"
          codigo={`npm -v
11.6.2

npx -v
11.6.2`}
        />

        <p>
          <code>npm</code> es el <strong>instalador</strong>: baja paquetes a la
          carpeta <code>node_modules</code> de tu proyecto y ejecuta los scripts
          que están escritos en <code>package.json</code> (
          <code>npm run dev</code>, <code>npm run build</code>).{" "}
          <code>npx</code> es el <strong>ejecutor de una sola vez</strong>: baja
          un paquete, lo corre y no te lo deja instalado. Por eso para crear un
          proyecto se usa <code>npx</code>: vas a usar{" "}
          <code>create-next-app</code> una vez en la vida, no tiene sentido
          instalarlo para siempre.
        </p>

        <Demo titulo="Demo en vivo · terminal de mentira">
          <TerminalDeComandos />
        </Demo>

        <Nota tipo="atencion" titulo="La confusión más común">
          <p style={{ marginBottom: 0 }}>
            <code>npm run dev</code> lleva <code>run</code> porque{" "}
            <code>dev</code> no es un comando de npm: es un script tuyo, que vive
            en <code>package.json</code>. Si le cambiás el nombre a{" "}
            <code>arrancar</code>, el comando pasa a ser{" "}
            <code>npm run arrancar</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Cómo nació esta carpeta">
        <p>
          Estos son los tres comandos que corrieron en clase. Ninguno tiene magia:
          el primero arma la carpeta, el segundo te mete adentro y el tercero
          prende el servidor de desarrollo.
        </p>

        <Codigo
          archivo="terminal"
          resaltar={[1]}
          codigo={`npx create-next-app@latest mi-primer-app
cd mi-primer-app
npm run dev

// ▲ Next.js 16.3.6
// - Local:  http://localhost:3000`}
        />

        <p>Adentro quedó esto (recortado a lo que importa):</p>

        <Codigo
          archivo="estructura de la carpeta"
          codigo={`mi-primer-app/
├─ app/              // acá van las páginas. Una carpeta = una URL
│  ├─ layout.js      // el marco que envuelve a TODAS las páginas
│  ├─ page.js        // la página de inicio ("/")
│  └─ globals.css    // los estilos de todo el sitio
├─ components/       // esta la creás vos: tus piezas reutilizables
├─ public/           // imágenes y archivos sueltos, servidos tal cual
├─ package.json      // dependencias y scripts (npm run dev vive acá)
└─ node_modules/     // las dependencias bajadas. No se toca, no se sube`}
        />

        <Nota tipo="atencion" titulo="node_modules no se toca ni se sube">
          <p style={{ marginBottom: 0 }}>
            Pesa cientos de megas y se regenera entero con{" "}
            <code>npm install</code> leyendo <code>package.json</code>. Por eso
            está en el <code>.gitignore</code>: si le pasás el proyecto a un
            compañero, le mandás todo <em>menos</em> esa carpeta y él corre{" "}
            <code>npm install</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El App Router: una carpeta es una ruta">
        <p>
          No hay ningún archivo donde declares las rutas. En el App Router la
          regla es literal: <strong>una carpeta adentro de <code>app/</code> es
          una URL</strong>, y el archivo <code>page.js</code> que está adentro es
          lo que se ve en esa URL. El nombre de la carpeta es la dirección.
        </p>

        <div style={{ overflowX: "auto", margin: "0 0 16px" }}>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr>
                <th style={celdaTitulo}>Archivo</th>
                <th style={celdaTitulo}>URL</th>
                <th style={celdaTitulo}>Qué es</th>
              </tr>
            </thead>
            <tbody>
              {RUTAS.map((ruta) => (
                <tr key={ruta.archivo}>
                  <td style={celda}>
                    <code>{ruta.archivo}</code>
                  </td>
                  <td style={celda}>
                    <code>{ruta.url}</code>
                  </td>
                  <td style={{ ...celda, color: "var(--texto-suave)" }}>
                    {ruta.nota}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Probalo al revés: escribí un nombre de carpeta y fijate qué URL te
          quedaría.
        </p>

        <Demo titulo="Demo en vivo · de carpeta a URL">
          <ExploradorDeRutas />
        </Demo>

        <Comparacion>
          <Columna tono="mal" titulo="No es una ruta">
            <Codigo
              archivo="app/hola/index.js"
              codigo={`export default function Hola() {
  return <h1>Hola</h1>;
}`}
            />
            <p style={{ marginBottom: 0 }}>
              El archivo tiene que llamarse <code>page.js</code>. Con cualquier
              otro nombre, <code>/hola</code> da 404: Next ni siquiera lo mira.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Sí es una ruta">
            <Codigo
              archivo="app/hola/page.js"
              codigo={`export default function Hola() {
  return <h1>Hola</h1>;
}`}
            />
            <p style={{ marginBottom: 0 }}>
              Mismo código, nombre correcto. Guardás y <code>/hola</code> ya
              anda, sin reiniciar nada.
            </p>
          </Columna>
        </Comparacion>

        <p>
          ¿Y la barra lateral que ves a la izquierda, que no se redibuja al
          cambiar de lección? Está en <code>app/layout.js</code>. El layout
          envuelve a todas las páginas de su carpeta y de las de abajo: la página
          llega como <code>children</code>. Así se ve el de este sitio, recortado
          a lo importante:
        </p>

        <Codigo
          archivo="app/layout.js"
          resaltar={[7]}
          codigo={`export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <BarraLateral />
        <main className="contenido">
          {children}   {/* acá entra cada page.js */}
        </main>
      </body>
    </html>
  );
}`}
        />

        <Nota tipo="info" titulo="Ojo con los comentarios adentro del JSX">
          <p style={{ marginBottom: 0 }}>
            Fijate en la línea resaltada: adentro del JSX un comentario se
            escribe <code>{"{/* así */}"}</code>, con llaves. Si ponés{" "}
            <code>{"//"}</code> a secas, no es un comentario: React lo toma como
            texto y te lo dibuja en la pantalla.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="React es la librería, Next.js es el andamio">
        <p>
          Se mezclan todo el tiempo y conviene separarlos desde ahora.{" "}
          <strong>React</strong> es la librería de componentes: JSX, props,{" "}
          <code>useState</code>, los eventos. Es lo que estás aprendiendo y
          funciona igual en cualquier lado, con Next o sin Next.
        </p>
        <p>
          <strong>Next.js</strong> es un framework construido encima de React que
          te resuelve lo que React no trae: el ruteo por carpetas, la compilación
          para publicar, el servidor de desarrollo con recarga automática y el
          renderizado en el servidor. Cuando un ejercicio te sale mal, la primera
          pregunta útil es <em>¿esto es React o es Next?</em>, porque se buscan en
          documentaciones distintas.
        </p>

        <Nota tipo="ok" titulo="Lo que vas a escribir en todo el resto del sitio">
          <p style={{ marginBottom: 0 }}>
            Todo lo de las clases 5 y 6 —componentes, JSX, props,{" "}
            <code>useState</code>— es React puro. Lo único de Next que aparece en
            este laboratorio es dónde va cada archivo y la línea{" "}
            <code>&quot;use client&quot;</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Servidor o navegador: los dos tipos de componente">
        <p>
          Esta es la parte que más confunde. En el App Router,{" "}
          <strong>por defecto tus componentes se ejecutan en el servidor</strong>
          : la función corre allá, el resultado se convierte en HTML y al
          navegador le llega solo ese HTML. Ese código nunca llega al navegador,
          y por lo tanto no puede tener estado ni escuchar clicks.
        </p>
        <p>
          Si un componente necesita <code>useState</code>, <code>onClick</code>,{" "}
          <code>useEffect</code> o cualquier hook, tenés que escribir{" "}
          <code>&quot;use client&quot;</code> en la <strong>primera línea</strong>{" "}
          del archivo. Mirá los dos al lado: uno cambia cuando lo tocás, el otro
          ni se entera de que existís.
        </p>

        <Demo titulo="Demo en vivo · el mismo recuadro, dos mundos">
          <div
            className="fila"
            style={{ alignItems: "flex-start", gap: 32 }}
          >
            <DatoDelServidor />
            <ContadorCliente />
          </div>
        </Demo>

        <p>
          Son dos archivos distintos, y la única diferencia real está en la
          primera línea de uno de ellos.
        </p>

        <Codigo
          archivo="app/sobre-next/DatoDelServidor.js"
          codigo={`// Sin "use client": esta función corre en el servidor y nunca
// llega al navegador. Por eso no puede tener useState ni onClick.
export default function DatoDelServidor() {
  const versionDeNode = process.version;   // solo existe en el servidor
  const sistema = process.platform;

  return (
    <div>
      <p className="tenue">Componente de servidor</p>
      <p className="marcador">{versionDeNode}</p>
      <p className="tenue">
        La versión de Node.js que corre en <code>{sistema}</code>.
      </p>
    </div>
  );
}`}
        />

        <Codigo
          archivo="app/sobre-next/ContadorCliente.js"
          resaltar={[1]}
          codigo={`"use client";

import { useState } from "react";

export default function ContadorCliente() {
  const [clicks, setClicks] = useState(0);

  return (
    <div>
      <p className="tenue">Componente de cliente</p>
      <p className="marcador">{clicks}</p>
      <div className="fila">
        <button
          type="button"
          className="boton"
          onClick={() => setClicks(clicks + 1)}
        >
          Sumar uno
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setClicks(0)}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}`}
        />

        <p>
          <code>&quot;use client&quot;</code> no marca un archivo: marca un{" "}
          <strong>límite</strong>. Todo lo que ese archivo importe pasa a ser
          cliente también. Por eso la línea va en el componente chiquito que de
          verdad necesita estado, y no arriba de todo.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Marcar la página entera">
            <Codigo
              archivo="app/sobre-next/page.js"
              codigo={`"use client";   // ¡toda la lección se va al navegador!

export const metadata = { title: "Cómo funciona este proyecto" };

export default function Pagina() {
  // ... toda la lección
}`}
            />
            <p style={{ marginBottom: 0 }}>
              Ni siquiera compila: Next corta con{" "}
              <code>
                You are attempting to export &quot;metadata&quot; from a
                component marked with &quot;use client&quot;
              </code>
              , porque el título de la pestaña lo resuelve el servidor. Y aunque
              saques el <code>metadata</code>, todo lo que la página importe
              viajaría al navegador para nada.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Marcar solo lo que necesita estado">
            <Codigo
              archivo="app/sobre-next/ContadorCliente.js"
              codigo={`"use client";   // solo este archivito

import { useState } from "react";
// ... el contador`}
            />
            <p style={{ marginBottom: 0 }}>
              La página sigue siendo de servidor y adentro pone una islita
              interactiva. Es el patrón que usa todo este laboratorio.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="info" titulo="La prueba de que uno corre en otro lado">
          <p>
            El recuadro de la izquierda lee <code>process.version</code>, que es
            la versión de Node.js. <code>process</code> es un objeto de Node y en
            el navegador no existe: si copiás esa línea a un archivo con{" "}
            <code>&quot;use client&quot;</code>, Next le pone al navegador un{" "}
            <code>process</code> de mentira y el número te queda vacío. No
            explota, pero tampoco te dice nada: ese valor solo existe del lado
            del servidor.
          </p>
          <p style={{ marginBottom: 0 }}>
            El camino de vuelta es más ruidoso. Si un componente de servidor toca{" "}
            <code>window</code> o <code>document</code>, la terminal te tira{" "}
            <code>window is not defined</code>, porque cuando esa función corre
            todavía no hay ningún navegador. Ese es, literalmente, el límite
            entre los dos mundos.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Cuando algo se rompe">
        <p>
          El error que más vas a ver es el de olvidarte{" "}
          <code>&quot;use client&quot;</code>. Sacale la línea al contador de
          recién y mirá qué aparece en la terminal donde corre{" "}
          <code>npm run dev</code>.
        </p>

        <Demo titulo="Demo en vivo · sacale la línea y mirá el error">
          <ErrorUseClient />
        </Demo>

        <p>Ese texto se lee de arriba hacia abajo, en cuatro pasos:</p>
        <ol>
          <li>
            La primera línea es <strong>el archivo culpable</strong>:{" "}
            <code>./app/sobre-next/ContadorCliente.js</code>. Empezá por abrir
            ese, no el que estabas mirando.
          </li>
          <li>
            El mensaje dice <strong>qué import molesta</strong>:{" "}
            <code>useState</code> solo funciona en un componente de cliente.
          </li>
          <li>
            El recuadro de abajo señala con una rayita la{" "}
            <strong>palabra exacta</strong> y el número de línea.
          </li>
          <li>
            La solución está escrita en el propio mensaje:{" "}
            <em>
              none of its parents are marked with{" "}
              <code>&quot;use client&quot;</code>
            </em>
            . O sea, falta esa línea, y tiene que ser la primera del archivo que
            nombra el paso 1.
          </li>
        </ol>

        <p>Y los tres comandos del día a día:</p>

        <Codigo
          archivo="terminal"
          codigo={`npm run dev     // servidor de desarrollo, se actualiza al guardar
npm run build   // compila el proyecto como si fueras a publicarlo
npm run lint    // busca errores comunes sin ejecutar nada`}
        />

        <Nota tipo="atencion" titulo="La receta cuando nada tiene sentido">
          <p style={{ marginBottom: 0 }}>
            Cortá el servidor con <code>Ctrl + C</code>, borrá la carpeta{" "}
            <code>.next</code> y volvé a correr <code>npm run dev</code>.{" "}
            <code>.next</code> es caché compilada: se regenera sola y no se
            pierde nada de tu código. Si el error sigue igual después de eso,
            entonces sí es un error tuyo y hay que leerlo.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="Tu primera ruta"
          pista={
            <p style={{ marginBottom: 0 }}>
              Creá la carpeta <code>app/hola</code> y adentro un archivo llamado
              exactamente <code>page.js</code>. Adentro, una función que devuelva
              JSX y esté exportada con <code>export default</code>. No hace falta
              reiniciar el servidor ni tocar ningún otro archivo.
            </p>
          }
          solucion={
            <Codigo
              archivo="app/hola/page.js"
              codigo={`export default function Hola() {
  return (
    <div>
      <h1>Hola, mundo</h1>
      <p>Esta página vive en app/hola/page.js</p>
    </div>
  );
}`}
            />
          }
        >
          <p>
            Hacé que <code>http://localhost:3000/hola</code> muestre un título
            tuyo, sin tocar ningún archivo que ya exista. Después probá cambiarle
            el nombre a la carpeta y fijate cómo cambia la URL sola.
          </p>
        </Desafio>

        <Desafio
          titulo="Rompelo a propósito"
          pista={
            <p style={{ marginBottom: 0 }}>
              Agregale un contador con <code>useState</code> a tu{" "}
              <code>app/hola/page.js</code> pero <strong>sin</strong> poner{" "}
              <code>&quot;use client&quot;</code>. Guardá y mirá la terminal
              donde corre <code>npm run dev</code>, no solo el navegador: el
              mensaje completo está ahí.
            </p>
          }
          solucion={
            <>
              <p>
                Vas a ver el error de recién, apuntando a{" "}
                <code>./app/hola/page.js</code>. Se arregla con una sola línea, y
                tiene que ser la primera del archivo:
              </p>
              <Codigo
                archivo="app/hola/page.js"
                resaltar={[1]}
                codigo={`"use client";

import { useState } from "react";

export default function Hola() {
  const [veces, setVeces] = useState(0);

  return (
    <div>
      <h1>Hola, mundo</h1>
      <button type="button" onClick={() => setVeces(veces + 1)}>
        Me tocaron {veces} veces
      </button>
    </div>
  );
}`}
              />
            </>
          }
        >
          <p>
            Provocá el error a propósito y leelo entero. Saber reconocer este
            mensaje te va a ahorrar media hora en cada práctica de acá en
            adelante.
          </p>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
