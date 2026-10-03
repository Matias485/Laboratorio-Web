import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "Layouts" };

// Estilos del diagrama de encastre. Son cajas una adentro de la otra: cada una
// representa un archivo que envuelve al de adentro.
const caja = {
  borderRadius: 10,
  padding: "14px 16px",
  border: "2px solid var(--borde)",
  background: "var(--superficie)",
};

const etiqueta = {
  margin: "0 0 10px",
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.74rem",
  fontWeight: 700,
  letterSpacing: "0.04em",
  color: "var(--texto-suave)",
};

// Los archivos especiales, de afuera hacia adentro.
const ENVOLTURA = [
  ["layout.js", "El marco. No se vuelve a montar."],
  ["template.js", "Igual, pero se vuelve a montar en cada navegación."],
  ["error.js", "Frontera de error. Atrapa lo que falle más adentro."],
  ["loading.js", "El <Suspense> automático de este nivel."],
  ["not-found.js", "Lo que se ve cuando se llama a notFound()."],
  ["page.js", "La página. O el layout.js de la carpeta de adentro."],
];

export default function Pagina() {
  return (
    <Leccion
      slug="/react/layout"
      titulo="Layouts"
      resumen="Layouts anidados, estados de carga y de error. Lo que envuelve a tus páginas."
    >
      <Seccion titulo="Lo que no se vuelve a montar" id="que-es">
        <p>
          Mirá la barra lateral de la izquierda. Cambiá de lección y volvé.{" "}
          <strong>No parpadeó, no perdió el scroll, no se cerraron las pistas
          que habías abierto.</strong> No es una optimización que alguien
          escribió: es que la barra nunca se desmontó.
        </p>

        <p>
          Un <strong>layout</strong> es eso: un componente que envuelve a tus
          páginas y <strong>sigue vivo mientras navegás entre ellas</strong>. La
          página de adentro se reemplaza; el marco de afuera queda quieto, con su
          estado intacto.
        </p>

        <p>
          El archivo se llama <code>layout.js</code> y vale para su carpeta y
          para todas las de abajo. Hay uno obligatorio: el{" "}
          <strong>layout raíz</strong>, <code>app/layout.js</code>, que envuelve
          absolutamente todo el sitio. Este es el de este proyecto, tal cual
          está:
        </p>

        <Codigo
          archivo="app/layout.js"
          resaltar={[17, 19, 22, 24]}
          codigo={`import "./globals.css";
import BarraLateral from "@/components/BarraLateral";

export const metadata = {
  title: {
    default: "Laboratorio web",
    template: "%s · Laboratorio web",
  },
  description:
    "Laboratorio interactivo de desarrollo web: HTML, CSS, JavaScript, TypeScript, React y Redux.",
};

// Este es el layout raíz: lo que está acá envuelve a TODAS las páginas.
// Es un Server Component (no tiene "use client" arriba), así que se ejecuta
// solamente en el servidor. Por eso la barra lateral, que necesita saber en qué
// página estamos, vive en su propio archivo marcado como componente de cliente.
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="layout">
          <BarraLateral />
          <main className="contenido">
            <div className="contenido-interno">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}`}
        />

        <p>Tres cosas para leer ahí:</p>

        <ul>
          <li>
            <strong>Devuelve <code>&lt;html&gt;</code> y{" "}
            <code>&lt;body&gt;</code>.</strong> El layout raíz es el único que
            los escribe, y es obligatorio que lo haga: no hay ningún{" "}
            <code>index.html</code> escondido en el proyecto. Este archivo{" "}
            <em>es</em> el documento.
          </li>
          <li>
            <strong>Recibe <code>children</code>.</strong> Todo layout lo recibe.
            Es la misma prop de siempre —la{" "}
            <Link href="/react/props">conocés de props</Link>— solo que acá no se
            la pasás vos: la completa Next con la página que corresponda a la
            dirección que se está pidiendo. Esta lección que estás leyendo es ese{" "}
            <code>children</code> ahora mismo.
          </li>
          <li>
            <strong>La barra lateral está adentro del layout, no de la
            página.</strong> Por eso sobrevive a cada navegación. Si{" "}
            <code>&lt;BarraLateral /&gt;</code> estuviera en cada{" "}
            <code>page.js</code>, se desmontaría y se volvería a montar en cada
            click, y perderías el scroll y las pistas abiertas.
          </li>
        </ul>

        <Nota tipo="info" titulo="Dónde poner cada cosa">
          <p style={{ marginBottom: 0 }}>
            La regla práctica: si algo tiene que <strong>seguir existiendo</strong>{" "}
            cuando cambia la página —una barra de navegación, un reproductor que
            no se corta, un panel lateral con su scroll— va en el layout. Si es
            el contenido de esa dirección, va en la página.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Layouts anidados" id="anidados">
        <p>
          No hay un solo layout. <strong>Cualquier carpeta puede tener el
          suyo</strong>, y envuelve a todo lo que cuelgue de ella sin reemplazar
          al de arriba: se mete adentro. Los layouts se encastran igual que las
          carpetas.
        </p>

        <div style={{ ...caja, borderColor: "var(--azul-600)", margin: "0 0 16px" }}>
          <p style={etiqueta}>app/layout.js · el layout raíz (html, body, barra)</p>
          <div style={{ ...caja, borderColor: "var(--azul-300)", borderStyle: "dashed" }}>
            <p style={etiqueta}>app/react/layout/demo/layout.js · el marco del laboratorio</p>
            <div style={{ ...caja, background: "var(--superficie-2)" }}>
              <p style={{ ...etiqueta, margin: 0 }}>
                app/react/layout/demo/otra/page.js · la página
              </p>
            </div>
          </div>
        </div>

        <p>
          Al navegar de <code>/demo</code> a <code>/demo/otra</code> cambia{" "}
          <strong>solo la caja de adentro</strong>. Las dos de afuera no se
          tocan, porque son las mismas para las dos direcciones. Eso no hay que
          creerlo: andá a verlo.
        </p>

        <Demo titulo="Laboratorio navegable · un layout con cronómetro">
          <p style={{ marginTop: 0 }}>
            El marco del laboratorio tiene un contador de segundos desde que se
            montó. Hacé esto, en este orden:
          </p>
          <ol>
            <li>
              Entrá, esperá a que el número llegue a 5 o 6 y tocá un par de veces
              el botón de clicks.
            </li>
            <li>
              Pasá a <strong>Página dos</strong>: el texto de adentro cambia, pero
              el cronómetro <strong>sigue corriendo sin reiniciarse</strong> y los
              clicks siguen ahí.
            </li>
            <li>
              Ahora apretá <strong>F5</strong>: los dos vuelven a cero. Ahí sí se
              montó todo de nuevo.
            </li>
          </ol>
          <p className="fila" style={{ marginBottom: 0 }}>
            <Link className="boton" href="/react/layout/demo">
              Abrir el laboratorio
            </Link>
          </p>
        </Demo>

        <p>
          Esa diferencia entre cambiar de página y apretar F5 es exactamente la
          navegación del lado del cliente de la que habla{" "}
          <Link href="/react/routing">la lección de Routing</Link>. El layout es
          lo que gana con ella.
        </p>

        <h3>Lo que un layout no recibe</h3>

        <p>
          Un layout <strong>sí</strong> recibe <code>params</code>, pero solo los
          de su propio segmento y los de arriba. Los de las carpetas de abajo no
          le llegan: cuando se dibujó, esos todavía podían ser cualquier cosa.
        </p>

        <Codigo
          archivo="qué params ve cada archivo"
          resaltar={[4, 5]}
          codigo={`app/tienda/[rubro]/layout.js    → params = { rubro }        ✓ es suyo
app/tienda/[rubro]/[id]/page.js → params = { rubro, id }    ✓ los dos

// Pero al revés NO:
app/tienda/layout.js            → params = { }   ← el [rubro] de abajo no llega`}
        />

        <p>
          Y nunca recibe <code>searchParams</code>, lo que va después del{" "}
          <code>?</code>. La razón es la misma de siempre:{" "}
          <strong>el layout no se vuelve a dibujar cuando navegás</strong>, así
          que ese dato le quedaría viejo. Si lo necesitás, leelo en la página, o
          desde un componente de cliente con <code>useSearchParams()</code>, que
          esos sí se vuelven a dibujar.
        </p>

        <p className="tenue">
          Es el mismo motivo por el que la barra lateral de este sitio está en su
          propio archivo con <code>&quot;use client&quot;</code>: necesita saber
          en qué lección estás, y eso lo averigua con <code>usePathname()</code>.
          El layout, que es de servidor, no podría.
        </p>
      </Seccion>

      <Seccion titulo="Cuando el marco sí se vuelve a montar: template.js" id="template">
        <p>
          A veces querés lo contrario. Un <code>template.js</code> se escribe
          igual que un layout —recibe <code>children</code>, envuelve lo de
          abajo— pero <strong>se vuelve a montar en cada navegación</strong>. Por
          dentro Next le pone una <code>key</code> distinta por ruta, y ya sabés
          lo que hace una key que cambia: React tira el componente viejo y monta
          uno nuevo.
        </p>

        <Comparacion>
          <Columna tono="bien" titulo="layout.js">
            <p style={{ marginTop: 0 }}>
              Sobrevive a la navegación. El estado de sus componentes de cliente
              queda intacto y los <code>useEffect</code> no se vuelven a
              ejecutar.
            </p>
            <p style={{ marginBottom: 0 }} className="tenue">
              Una barra de navegación, un menú lateral, un reproductor.
            </p>
          </Columna>
          <Columna tono="bien" titulo="template.js">
            <p style={{ marginTop: 0 }}>
              Se desmonta y se monta de nuevo. El estado se pierde y los{" "}
              <code>useEffect</code> vuelven a correr.
            </p>
            <p style={{ marginBottom: 0 }} className="tenue">
              Una animación de entrada, o contar una visita por página.
            </p>
          </Columna>
        </Comparacion>

        <Codigo
          archivo="app/blog/template.js"
          resaltar={[4]}
          codigo={`// Se escribe igual que un layout: recibe children y devuelve JSX.
// La diferencia es que esto se monta de nuevo en cada navegación, así que la
// animación "aparecer" arranca otra vez en cada página del blog.
export default function Template({ children }) {
  return <div className="aparecer">{children}</div>;
}`}
        />

        <p>
          Los dos pueden convivir en la misma carpeta: el{" "}
          <code>template.js</code> se dibuja adentro del <code>layout.js</code>.
          Marco quieto por fuera, contenido que se renueva por dentro.
        </p>

        <Nota tipo="atencion" titulo="Si dudás, va un layout">
          <p style={{ marginBottom: 0 }}>
            <code>template.js</code> es la excepción, no la regla. Empezá siempre
            con <code>layout.js</code> y pasate a template solo cuando tengas un
            motivo concreto para que algo se reinicie. Volver a montar cuesta
            trabajo y es justo lo que el App Router trata de evitar.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Los otros archivos especiales" id="especiales">
        <p>
          <code>layout.js</code> no viene solo. En la misma carpeta podés poner
          otros archivos con nombre reservado, y cada uno se encarga de un estado
          distinto de esa rama del sitio.
        </p>

        <h3>loading.js · mientras tanto</h3>

        <p>
          Si una página tarda —espera datos, consulta algo—, Next muestra el{" "}
          <code>loading.js</code> de su carpeta hasta que esté lista.{" "}
          <strong>No es magia: por debajo es un <code>&lt;Suspense&gt;</code></strong>.
          Next envuelve a la página en uno y usa tu archivo como{" "}
          <code>fallback</code>. Vos escribís esto:
        </p>

        <Codigo
          archivo="app/react/layout/demo/loading.js · recortado"
          codigo={`// loading.js no recibe ninguna prop y se dibuja solo.
export default function Cargando() {
  return <h1>Cargando…</h1>;
}`}
        />

        <p>y Next arma esto:</p>

        <Codigo
          archivo="lo que hace Next por abajo"
          resaltar={[1, 3]}
          codigo={`<Suspense fallback={<Cargando />}>
  <Page />
</Suspense>`}
        />

        <p>
          La página lenta del laboratorio espera dos segundos a propósito. Entrá
          desde los botones del marco, no por la barra de direcciones, así ves la
          transición:
        </p>

        <p className="fila">
          <Link className="boton" href="/react/layout/demo/lenta">
            Ver la página lenta
          </Link>
        </p>

        <p className="tenue">
          Mirá qué <em>no</em> se tapa mientras carga: el marco del laboratorio
          sigue ahí y sus botones siguen andando.{" "}
          <code>loading.js</code> envuelve a la página, no al layout de su mismo
          nivel.
        </p>

        <h3>error.js · la frontera de error</h3>

        <p>
          Si algo explota durante el renderizado, sin una frontera se cae toda la
          pantalla. <code>error.js</code> pone un límite: el error sube hasta la
          frontera más cercana, se dibuja ahí, y{" "}
          <strong>el resto de la página sigue funcionando</strong>.
        </p>

        <p>Tiene dos reglas que no son negociables:</p>

        <ul>
          <li>
            <strong>Va con <code>&quot;use client&quot;</code>.</strong> Por
            debajo es un <em>error boundary</em> de React, y eso solo existe del
            lado del navegador.
          </li>
          <li>
            <strong>Recibe <code>error</code> y <code>retry</code>.</strong>{" "}
            <code>error</code> es el <code>Error</code> que se lanzó;{" "}
            <code>retry()</code> vuelve a pedir y a dibujar lo que falló, por si
            el problema era pasajero.
          </li>
        </ul>

        <Codigo
          archivo="app/react/layout/demo/error.js · recortado"
          resaltar={[1, 6, 12]}
          codigo={`"use client";

// Recibe el Error que se lanzó y una función para volver a intentarlo.
// En Next 16 la función se llama retry(); en tutoriales viejos vas a ver
// reset(), que todavía existe pero ya no es la recomendada.
export default function ErrorDelLaboratorio({ error, retry }) {
  return (
    <div>
      <h1>Algo se rompió acá adentro</h1>
      <p>{error.message}</p>

      <button type="button" onClick={() => retry()}>
        Reintentar
      </button>
    </div>
  );
}`}
        />

        <p>
          La página rota del laboratorio lanza un error a propósito. Entrá y
          fijate qué sobrevive:
        </p>

        <p className="fila">
          <Link className="boton" href="/react/layout/demo/rota">
            Ver la página rota
          </Link>
        </p>

        <Nota tipo="error" titulo="Lo que error.js NO atrapa">
          <p>
            Un <code>error.js</code> atrapa lo que falla <strong>más
            adentro</strong>: su página, lo que cuelgue de ella, las carpetas de
            abajo. Lo que <strong>no</strong> atrapa es el{" "}
            <code>layout.js</code> de su mismo nivel, porque ese archivo lo
            envuelve a él: si el marco se rompe, la frontera que está adentro no
            puede hacer nada.
          </p>
          <p style={{ marginBottom: 0 }}>
            Para eso hay que subir un escalón: el <code>error.js</code> de la
            carpeta de arriba lo atrapa. Y si lo que se rompe es el layout{" "}
            <em>raíz</em>, no queda nadie arriba: ahí entra{" "}
            <code>app/global-error.js</code>, que reemplaza al documento entero y
            por eso tiene que escribir su propio{" "}
            <code>&lt;html&gt;</code> y <code>&lt;body&gt;</code>.
          </p>
        </Nota>

        <h3>not-found.js · el 404 de la rama</h3>

        <p>
          Ya lo viste en acción:{" "}
          <Link href="/react/routing#cuatrocientos-cuatro">
            la lección de Routing lo explica
          </Link>{" "}
          junto con <code>notFound()</code>. Lo que importa acá es dónde cae en
          el encastre: <code>not-found.js</code> se dibuja{" "}
          <strong>adentro</strong> del layout de su carpeta, igual que{" "}
          <code>loading.js</code> y <code>error.js</code>. Un 404 no te borra el
          marco.
        </p>

        <h3>metadata · lo que dice la pestaña</h3>

        <p>
          Tanto <code>page.js</code> como <code>layout.js</code> pueden exportar
          un objeto <code>metadata</code>, y Next lo convierte en las etiquetas
          del <code>&lt;head&gt;</code>. Se evalúan{" "}
          <strong>de la raíz hacia adentro</strong> y se mezclan: la clave que
          repite el archivo de más adentro gana.
        </p>

        <p>
          Lo tenés funcionando ahora mismo. El layout raíz define una plantilla
          de título y esta lección define solo su parte:
        </p>

        <Codigo
          archivo="app/layout.js"
          resaltar={[4]}
          codigo={`export const metadata = {
  title: {
    default: "Laboratorio web",   // cuando una página no pone la suya
    template: "%s · Laboratorio web",
  },
  description: "Laboratorio interactivo de desarrollo web: …",
};`}
        />

        <Codigo
          archivo="app/react/layout/page.js · esta misma lección"
          codigo={`export const metadata = { title: "Layouts" };`}
        />

        <p>
          El <code>%s</code> es el agujero donde entra el título del hijo.{" "}
          <strong>Mirá la pestaña del navegador: dice “Layouts · Laboratorio
          web”.</strong> Ninguno de los dos archivos escribió esa frase entera.
        </p>

        <Nota tipo="atencion" titulo="La plantilla es para los hijos, no para sí misma">
          <p style={{ marginBottom: 0 }}>
            <code>template</code> solo se aplica a los segmentos de{" "}
            <strong>más abajo</strong>: ni al título del propio layout, ni al del{" "}
            <code>page.js</code> que está en su misma carpeta. Por eso va junto
            con <code>default</code>: ese es el título que se usa cuando una
            página no define el suyo. Y si querés que una página se saltee la
            plantilla de arriba, se escribe{" "}
            <code>title: {"{ absolute: \"…\" }"}</code>.
          </p>
        </Nota>

        <h3>El orden en que se envuelven</h3>

        <p>
          Todos juntos, de afuera hacia adentro. Este es el orden que usa Next, y
          explica cada cosa que vimos: por qué el layout no se tapa cuando carga
          la página, por qué un error no se lleva puesto el marco, por qué el 404
          aparece adentro.
        </p>

        <div style={{ margin: "0 0 16px" }}>
          {ENVOLTURA.map(([archivo, que], i) => (
            <div
              key={archivo}
              style={{
                marginLeft: i * 16,
                padding: "8px 12px",
                borderLeft: "3px solid var(--azul-300)",
                borderBottom: "1px solid var(--borde)",
                background: i % 2 === 0 ? "var(--superficie)" : "var(--superficie-2)",
              }}
            >
              <code style={{ fontWeight: 700 }}>{archivo}</code>{" "}
              <span className="tenue">— {que}</span>
            </div>
          ))}
        </div>

        <p>
          Y así quedó la carpeta del laboratorio de esta lección, con todos los
          nombres reservados que fuimos viendo:
        </p>

        <Codigo
          archivo="estructura de la carpeta"
          resaltar={[4, 7, 8]}
          codigo={`app/react/layout/
├─ page.js                 → /react/layout   (esta lección)
└─ demo/
   ├─ layout.js            → el marco de todo lo de abajo (sin URL propia)
   ├─ MarcadorDelLayout.js → componente de cliente del marco (sin URL)
   ├─ page.js              → /react/layout/demo
   ├─ loading.js           → mientras carga cualquier página de acá abajo
   ├─ error.js             → la frontera de error de esta rama
   ├─ otra/page.js         → /react/layout/demo/otra
   ├─ lenta/page.js        → /react/layout/demo/lenta
   └─ rota/page.js         → /react/layout/demo/rota`}
        />

        <p className="tenue">
          Fijate que <code>layout.js</code>, <code>loading.js</code> y{" "}
          <code>error.js</code> no son direcciones: ninguno agrega un pedazo a la
          URL. Solo <code>page.js</code> crea rutas. Y{" "}
          <code>MarcadorDelLayout.js</code> tampoco es nada especial: es un
          componente común, con un nombre común, que vive al lado de lo que lo
          usa.
        </p>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. El contador que se reinicia"
          pista={
            <p style={{ marginBottom: 0 }}>
              El archivo está bien escrito; el problema es{" "}
              <strong>cómo se llama</strong>. Repasá qué hace Next con un{" "}
              <code>template.js</code> en cada navegación, y qué hace con un{" "}
              <code>layout.js</code>.
            </p>
          }
          solucion={
            <div>
              <p style={{ marginTop: 0 }}>
                Renombrá el archivo a <code>app/panel/layout.js</code>. No hay
                que tocar una sola línea del código.
              </p>
              <Codigo
                archivo="app/panel/layout.js"
                resaltar={[4]}
                codigo={`// Antes se llamaba template.js, y por eso se montaba de nuevo en cada
// navegación: el <Reloj> arrancaba de cero cada vez. Como layout.js el
// marco sobrevive y el reloj sigue corriendo.
export default function Layout({ children }) {
  return (
    <div className="panel">
      <Reloj />
      {children}
    </div>
  );
}`}
              />
              <p className="tenue" style={{ marginBottom: 0 }}>
                La pregunta que conviene hacerse siempre es si querés que eso se
                reinicie. Para un reloj, no. Para una animación de entrada, sí: y
                ahí <code>template.js</code> es la herramienta correcta.
              </p>
            </div>
          }
        >
          <p>
            Un panel tiene un reloj arriba que cuenta el tiempo de la sesión.
            Funciona, pero cada vez que el usuario cambia de sección{" "}
            <strong>el reloj vuelve a cero</strong>. El código del componente es
            correcto. ¿Qué está mal?
          </p>
          <Codigo
            archivo="app/panel/template.js"
            resaltar={[1]}
            codigo={`export default function Marco({ children }) {
  return (
    <div className="panel">
      <Reloj />
      {children}
    </div>
  );
}`}
          />
        </Desafio>

        <Desafio
          titulo="2. Una frontera de error que no compila"
          pista={
            <p style={{ marginBottom: 0 }}>
              Son tres cosas. Una es una línea que falta arriba de todo y que
              hace falta porque un error boundary es cosa del navegador. Otra es
              el nombre de la prop que sirve para reintentar. La tercera está en
              el <code>&lt;button&gt;</code>, y es la misma de siempre.
            </p>
          }
          solucion={
            <div>
              <Codigo
                archivo="app/facturas/error.js"
                resaltar={[1, 3, 7]}
                codigo={`"use client"; // sin esto no compila: un error boundary es de cliente

export default function Error({ error, retry }) {
  return (
    <div>
      <h2>No pudimos mostrar las facturas</h2>
      <button type="button" onClick={() => retry()}>
        Reintentar
      </button>
    </div>
  );
}`}
              />
              <p className="tenue" style={{ marginBottom: 0 }}>
                El <code>type=&quot;button&quot;</code> no es un detalle de
                estilo: adentro de un <code>&lt;form&gt;</code>, un botón sin{" "}
                <code>type</code> envía el formulario. Y acordate de que este
                archivo no va a atrapar lo que falle en{" "}
                <code>app/facturas/layout.js</code>: para eso hay que subir a{" "}
                <code>app/error.js</code>.
              </p>
            </div>
          }
        >
          <p>
            Esta frontera de error tiene tres problemas: uno hace que ni
            arranque, otro hace que el botón explote al tocarlo, y el tercero es
            un descuido que arrastrás de HTML. Encontralos.
          </p>
          <Codigo
            archivo="app/facturas/error.js"
            resaltar={[1, 5]}
            codigo={`export default function Error({ error, reiniciar }) {
  return (
    <div>
      <h2>No pudimos mostrar las facturas</h2>
      <button onClick={() => reiniciar()}>Reintentar</button>
    </div>
  );
}`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
