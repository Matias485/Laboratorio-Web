import { Suspense } from "react";
import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import EnlacesDemo from "./EnlacesDemo";
import NavegacionDemo from "./NavegacionDemo";
import FiltroDemo from "./FiltroDemo";

export const metadata = { title: "Routing" };

// Rutas REALES de este sitio, para la tabla de carpeta -> URL.
const RUTAS = [
  ["app/page.js", "/", "la portada del laboratorio"],
  ["app/css/grid/page.js", "/css/grid", "la lección de Grid"],
  ["app/react/hooks-propios/page.js", "/react/hooks-propios", "la anterior"],
  ["app/react/routing/page.js", "/react/routing", "esta misma página"],
  ["app/react/routing/demo/page.js", "/react/routing/demo", "el laboratorio"],
  [
    "app/react/efectos/RelojDemo.js",
    "(ninguna)",
    "no se llama page.js: es un componente de esa lección",
  ],
  ["app/layout.js", "(ninguna)", "no es una página: envuelve a todas"],
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

// El porqué del <Suspense> está explicado en la sección de parámetros.
function Cargando() {
  return <p className="tenue">Preparando el demo…</p>;
}

export default function Pagina() {
  return (
    <Leccion
      slug="/react/routing"
      titulo="Routing"
      resumen="Rutas por carpeta, Link, rutas dinámicas y navegación desde el código."
    >
      <Seccion titulo="Una sola carga para todo el sitio" id="una-sola-carga">
        <p>
          Un sitio hecho de varios archivos HTML funciona así: cada enlace es un
          viaje completo. El navegador tira a la basura la página que tenías, le
          pide la nueva al servidor, la arma desde cero y te deja arriba de todo.
          En cada click.
        </p>

        <p>
          Con el App Router de Next eso pasa <strong>una sola vez</strong>: la
          primera. Después, al hacer click en un enlace no se recarga nada. Next
          pide solo el pedazo que cambia y React lo reemplaza adentro de la
          página que ya estaba abierta.
        </p>

        <p>Lo que gana el que usa tu sitio:</p>
        <ul>
          <li>
            <strong>No se pierde el estado.</strong> Todo lo que rodea a la
            parte que cambió sigue vivo, con sus <code>useState</code> intactos.
          </li>
          <li>
            <strong>No parpadea.</strong> No hay pantalla en blanco en el medio.
          </li>
          <li>
            <strong>Es más rápido.</strong> Viaja menos: no vuelven a bajar el
            HTML de alrededor, ni los estilos, ni el JavaScript.
          </li>
        </ul>

        <Nota tipo="ok" titulo="Comprobalo con la barra de la izquierda">
          <p style={{ marginBottom: 0 }}>
            Abrí y cerrá algunas pistas de la barra lateral y después cambiá de
            lección: las que dejaste abiertas <strong>siguen abiertas</strong>.
            Ese estado es un <code>useState</code> de{" "}
            <code>components/BarraLateral.js</code>, y sobrevive porque la barra
            vive en <code>app/layout.js</code>: nunca se desmonta.
          </p>
        </Nota>

        <p className="tenue">
          Que no suene a magia: el HTML lo sigue armando el servidor, y esto lo
          trae <strong>Next</strong>, no React.{" "}
          <Link href="/sobre-next">Cómo funciona este proyecto</Link> lo cuenta
          por arriba; esta lección profundiza.
        </p>
      </Seccion>

      <Seccion titulo="La carpeta es la ruta" id="carpetas">
        <p>
          No hay ningún archivo donde declares las direcciones de tu sitio. La
          regla es literal: <strong>una carpeta adentro de <code>app/</code> es
          un pedazo de la URL</strong>, y el archivo <code>page.js</code> que
          tiene adentro es lo que se ve en esa dirección. Carpetas anidadas,
          direcciones anidadas. Todas estas filas son archivos que existen de
          verdad acá: podés abrir cualquiera y comprobarlo.
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
              {RUTAS.map(([archivo, url, nota]) => (
                <tr key={archivo}>
                  <td style={celda}>
                    <code>{archivo}</code>
                  </td>
                  <td style={celda}>
                    <code>{url}</code>
                  </td>
                  <td style={{ ...celda, color: "var(--texto-suave)" }}>
                    {nota}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Mirá las dos últimas filas, porque ahí está la duda que aparece
          siempre: <strong>los archivos que no se llaman <code>page.js</code> no
          son rutas</strong>. En <Link href="/react/efectos">la lección de
          efectos</Link> hay un <code>RelojDemo.js</code> en la misma carpeta que
          su <code>page.js</code>, y no tiene ninguna URL: es un componente que
          la lección importa, nada más. Por eso cada demo vive al lado de la
          lección que lo usa, sin ensuciar el mapa de direcciones.
        </p>

        <p>
          Los nombres reservados son pocos: <code>page.js</code> es lo que se ve
          en esa dirección, <code>layout.js</code> el marco que la envuelve
          —tema de la lección de Layouts, que viene justo después— y{" "}
          <code>not-found.js</code> el 404 de esa rama, que vemos al final. Así
          quedó la carpeta de esta lección:
        </p>

        <Codigo
          archivo="estructura de la carpeta"
          resaltar={[2, 3]}
          codigo={`app/react/routing/
├─ page.js                    → /react/routing   (esta lección)
├─ EnlacesDemo.js             → (ninguna: es un componente)
└─ demo/
   ├─ page.js                 → /react/routing/demo
   ├─ not-found.js            → el 404 de esta rama
   ├─ (vitrina)/atajo/page.js → /react/routing/demo/atajo
   ├─ [id]/page.js            → /react/routing/demo/42
   └─ [...resto]/page.js      → /react/routing/demo/norte/sur/este`}
        />

        <p className="tenue">
          Si a la carpeta <code>routing</code> le cambiás el nombre a{" "}
          <code>rutas</code>, la lección pasa a estar en{" "}
          <code>/react/rutas</code> y no hay que tocar nada más. Por eso los
          nombres van en minúscula y con guiones del medio, como{" "}
          <code>hooks-propios</code>: eso también es la URL, y la va a leer
          gente.
        </p>
      </Seccion>

      <Seccion titulo="Link contra a: el contraste" id="enlaces">
        <p>
          Todo lo de la sección anterior se cae si enlazás mal. Estos dos
          enlaces llevan al mismo lado y se ven igual, pero no hacen lo mismo:
        </p>

        <Codigo
          archivo="dos formas de enlazar"
          resaltar={[1, 4]}
          codigo={`import Link from "next/link";

// Navegación del lado del cliente: se reemplaza solo lo que cambia.
<Link href="/react/routing/demo">Ir al laboratorio</Link>

// Recarga completa: el navegador tira todo y arranca de nuevo.
<a href="/react/routing/demo">Ir al laboratorio</a>`}
        />

        <p>
          En este demo los dos enlaces llevan{" "}
          <strong>a esta misma página</strong>. Subí el contador, escribí algo en
          la nota y probá uno y después el otro.
        </p>

        <Demo titulo="Demo en vivo · el mismo destino, dos maneras">
          <EnlacesDemo />
        </Demo>

        <p>
          Con <code>&lt;Link&gt;</code> volvés y todo está como lo dejaste; con{" "}
          <code>&lt;a&gt;</code> volvés a cero. No es que Next “guarde” el
          estado: es que con <code>&lt;Link&gt;</code>{" "}
          <strong>nunca se desmontó nada</strong>, y el <code>&lt;a&gt;</code>{" "}
          hizo que el navegador empezara la página de nuevo, como un F5.
        </p>

        <p>
          <code>&lt;Link&gt;</code> hace además algo que no se ve:{" "}
          <strong>precarga</strong>. Next pide por adelantado la ruta de cada{" "}
          <code>&lt;Link&gt;</code> que aparece en pantalla, así que cuando hacés
          click la respuesta ya está del lado del navegador. Por eso los cambios
          de lección de este sitio son instantáneos.
        </p>

        <Nota tipo="atencion" titulo="Cuándo el a sí corresponde">
          <p style={{ marginBottom: 0 }}>
            <code>&lt;Link&gt;</code> es para las direcciones{" "}
            <strong>de tu sitio</strong>; para todo lo demás va el{" "}
            <code>&lt;a&gt;</code> de siempre: otro sitio, un{" "}
            <code>mailto:</code>, un archivo para descargar. Y que no te
            preocupe la accesibilidad: <code>&lt;Link&gt;</code> termina
            dibujando un <code>&lt;a&gt;</code> de verdad en el HTML, así que el
            click derecho, el teclado y los lectores de pantalla lo tratan como
            el enlace que es.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Rutas dinámicas: la carpeta entre corchetes" id="dinamicas">
        <p>
          Hasta acá cada carpeta era una dirección fija, pero no vas a escribir
          una carpeta por cada producto de un catálogo. Para eso está el nombre{" "}
          <strong>entre corchetes</strong>: <code>[id]</code> quiere decir “acá
          va cualquier cosa, y me la pasás como dato”.
        </p>

        <p>Un solo archivo real de esta lección, para infinitas direcciones:</p>

        <Codigo
          archivo="app/react/routing/demo/[id]/page.js · recortado"
          resaltar={[8, 9, 13]}
          codigo={`import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = { title: "Ficha del laboratorio" };

// En Next.js 16 la prop params es una PROMESA. Por eso la función es async y
// hay que hacerle await antes de leer nada adentro.
export default async function Pagina({ params }) {
  const { id } = await params;

  // Regla inventada para este laboratorio: solo hay fichas con número.
  // notFound() corta el renderizado acá y dibuja demo/not-found.js.
  if (!/^\\d+$/.test(id)) notFound();

  const numero = Number(id);

  // …y acá abajo el JSX que muestra el id y el doble del número.
}`}
        />

        <p>
          Andá a tocarlo: estas dos direcciones las dibuja{" "}
          <strong>ese único archivo</strong>, con un <code>params.id</code>{" "}
          distinto cada una.
        </p>

        <p className="fila">
          <Link className="boton" href="/react/routing/demo/42">
            /demo/42
          </Link>
          <Link className="boton boton-suave" href="/react/routing/demo/7">
            /demo/7
          </Link>
        </p>

        <p className="tenue">
          Cuando estés adentro, editá el número en la barra de direcciones. Es
          la misma función corriendo otra vez con otro dato.
        </p>

        <Nota tipo="error" titulo="El error que te va a pasar la primera vez">
          <p style={{ marginBottom: 0 }}>
            <code>params</code> es una <strong>promesa</strong>. Antes de la
            versión 15 de Next era un objeto común, y en un montón de tutoriales
            vas a ver <code>params.id</code> a secas. Hoy eso te da{" "}
            <code>undefined</code>: le estás pidiendo la propiedad{" "}
            <code>id</code> a una promesa.
          </p>
        </Nota>

        <p>
          El <code>await</code> vale en un Server Component, que es lo normal
          para una página. Si tuviera que ser de cliente —porque necesita{" "}
          <Link href="/react/estado">estado</Link> o escuchar clicks— no podés
          usar <code>await</code>: un componente de cliente no puede ser{" "}
          <code>async</code>. Ahí va <code>use()</code>, que es de React y sirve
          para leer una promesa adentro de un componente:
        </p>

        <Codigo
          archivo="una página de cliente con params"
          resaltar={[1, 2, 5]}
          codigo={`"use client";
import { use } from "react";

export default function Pagina({ params }) {
  const { id } = use(params);
  return <h1>Ficha {id}</h1>;
}`}
        />

        <p className="tenue">
          En los dos casos el valor que llega es siempre un{" "}
          <strong>string</strong>, aunque en la URL parezca un número:{" "}
          <code>params.id</code> vale <code>&quot;42&quot;</code>, no{" "}
          <code>42</code>. Si vas a hacer cuentas, <code>Number(id)</code>.
        </p>
      </Seccion>

      <Seccion titulo="Atrapa-todo y grupos de rutas" id="atrapa-todo">
        <h3>[...resto] — atrapar todo lo que venga</h3>

        <p>
          Con tres puntos adentro de los corchetes, la carpeta se queda con{" "}
          <strong>todos</strong> los segmentos que sobren, no con uno solo. Y lo
          que te llega ya no es un string: es un <strong>arreglo</strong>, con un
          elemento por cada pedazo de la dirección.
        </p>

        <Codigo
          archivo="app/react/routing/demo/[...resto]/page.js · recortado"
          resaltar={[3, 4]}
          codigo={`// [...resto] atrapa todos los segmentos que sobren. params.resto NO es un
// string: es un arreglo con un elemento por segmento de la URL.
export default async function Pagina({ params }) {
  const { resto } = await params;

  return (
    <ul>
      {resto.map((segmento, i) => (
        <li key={\`\${i}-\${segmento}\`}>
          <code>resto[{i}]</code> → <strong>{segmento}</strong>
        </li>
      ))}
    </ul>
  );
}`}
        />

        <Codigo
          archivo="qué recibe el atrapa-todo"
          codigo={`/react/routing/demo/norte             → resto = ["norte"]
/react/routing/demo/norte/sur         → resto = ["norte", "sur"]
/react/routing/demo/norte/sur/este    → resto = ["norte", "sur", "este"]`}
        />

        <p className="fila">
          <Link className="boton" href="/react/routing/demo/norte/sur/este">
            Probar /demo/norte/sur/este
          </Link>
        </p>

        <p className="tenue">
          Sirve cuando no sabés de antemano cuántos niveles va a tener la
          dirección: la documentación de un producto, el árbol de carpetas de un
          repositorio.
        </p>

        <h3>(paréntesis) — agrupar sin que se note</h3>

        <p>
          Una carpeta con el nombre entre paréntesis{" "}
          <strong>no aparece en la URL</strong>. Existe solo para vos: junta
          archivos que van de la mano sin agregar un nivel a la dirección.
        </p>

        <Codigo
          archivo="grupos de rutas"
          resaltar={[2]}
          codigo={`app/react/routing/demo/(vitrina)/atajo/page.js
                        ↑ entre paréntesis: NO cuenta para la URL

// La dirección que queda es:
/react/routing/demo/atajo`}
        />

        <p className="fila">
          <Link className="boton" href="/react/routing/demo/atajo">
            Probar /demo/atajo
          </Link>
        </p>

        <p className="tenue">
          En un proyecto grande sirve para separar las páginas públicas de las
          del panel, sin que nadie escriba <code>/publico/…</code> en la barra.
        </p>
      </Seccion>

      <Seccion titulo="Navegar desde el código" id="navegar">
        <p>
          <code>&lt;Link&gt;</code> es para cuando el usuario decide ir a algún
          lado. A veces el que decide es tu código: se guardó el formulario y hay
          que ir al listado, se venció la sesión y hay que ir al login. Para eso
          está <code>useRouter</code>.
        </p>

        <Codigo
          archivo="lo que devuelve useRouter()"
          resaltar={[1, 2]}
          codigo={`"use client";
import { useRouter } from "next/navigation";

const router = useRouter();

router.push("/react/routing/demo");     // va, y deja una entrada en el historial
router.replace("/react/routing/demo");  // va, y PISA la entrada actual
router.back();                          // una atrás, como el botón del navegador
router.forward();                       // una adelante
router.refresh();                       // vuelve a pedir esta misma ruta al servidor`}
        />

        <p>
          La diferencia entre <code>push</code> y <code>replace</code> es puro
          historial: uno apila una entrada más, el otro reemplaza la que estabas
          usando. Se nota recién cuando apretás atrás.
        </p>

        <Demo titulo="Demo en vivo · push, replace y back">
          <Suspense fallback={<Cargando />}>
            <NavegacionDemo />
          </Suspense>
        </Demo>

        <Nota tipo="atencion" titulo="Importa de next/navigation">
          <p style={{ marginBottom: 0 }}>
            Hay otro <code>useRouter</code> que viene de{" "}
            <code>next/router</code>: es el del Pages Router, el sistema viejo de
            Next, y tiene otra API. En el App Router{" "}
            <strong>todo sale de <code>next/navigation</code></strong>. Si
            copiaste código de internet y te explota, revisá primero esa línea.
          </p>
        </Nota>

        <h3>usePathname: saber dónde estás</h3>

        <p>
          <code>usePathname()</code> devuelve la dirección actual como string,
          sin lo que venga después del <code>?</code>. Y no hace falta que te lo
          imagines: <strong>la barra lateral de este sitio lo usa</strong>, y es
          así como sabe cuál lección estás leyendo. El arranque del archivo, tal
          cual:
        </p>

        <Codigo
          archivo="components/BarraLateral.js"
          resaltar={[9, 13]}
          codigo={`"use client";

// "use client" convierte a este archivo en un componente de cliente: se ejecuta
// en el navegador. Lo necesitamos porque usa usePathname() y useState, y los
// hooks solo funcionan del lado del cliente.

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PISTAS, pistaDe } from "@/app/lecciones";

export default function BarraLateral() {
  const rutaActual = usePathname();
  const pistaActiva = pistaDe(rutaActual);`}
        />

        <p>
          Y más abajo, cuando dibuja cada enlace, compara esa ruta con la de la
          lección:
        </p>

        <Codigo
          archivo="components/BarraLateral.js"
          resaltar={[4, 5, 6]}
          codigo={`<Link
  href={leccion.slug}
  className="barra-link"
  aria-current={
    rutaActual === leccion.slug ? "page" : undefined
  }
  onClick={() => setVisible(false)}
>
  {leccion.titulo}
</Link>`}
        />

        <p className="tenue">
          Fijate que no hay ninguna clase <code>activo</code> inventada: la marca
          es <code>aria-current=&quot;page&quot;</code>, el atributo que los
          lectores de pantalla anuncian como “página actual”. El fondo celeste
          sale de una regla de <code>globals.css</code> que engancha en ese mismo
          atributo: sirve para la accesibilidad y de paso para el estilo.
        </p>
      </Seccion>

      <Seccion titulo="El estado que vive en la URL" id="parametros">
        <p>
          Todo lo que va después del <code>?</code> son los{" "}
          <strong>parámetros de búsqueda</strong>:{" "}
          <code>?pista=react&amp;buscar=hook</code>. Pares de clave y valor que
          no forman parte de la ruta: la carpeta es la misma, cambia el dato.
        </p>

        <p>
          ¿Cuándo conviene poner algo ahí en vez de en un{" "}
          <code>useState</code>? Cuando ese dato <strong>merece un link</strong>.
        </p>

        <ul>
          <li>
            <strong>Se comparte.</strong> Copiás la dirección, se la mandás a un
            compañero y ve exactamente lo mismo que vos. Con{" "}
            <code>useState</code> le mandás la página en blanco.
          </li>
          <li>
            <strong>El botón atrás funciona.</strong> Cambiar un filtro pasa a
            ser un paso del historial.
          </li>
          <li>
            <strong>Sobrevive al F5.</strong> Sin guardar nada en ningún lado.
          </li>
        </ul>

        <p>
          En este demo <strong>no hay un solo <code>useState</code></strong>: el
          filtro es la URL. Tocá los botones, escribí en el campo, y mirá la
          barra de direcciones mientras lo hacés.
        </p>

        <Demo titulo="Demo en vivo · un filtro que vive en la dirección">
          <Suspense fallback={<Cargando />}>
            <FiltroDemo />
          </Suspense>
        </Demo>

        <p>
          Se lee con <code>useSearchParams()</code>, que devuelve un{" "}
          <code>URLSearchParams</code> de solo lectura. Para <em>escribir</em> no
          hay setter: se arma la dirección nueva y se navega con el router. El
          corazón del demo, tal cual está en el archivo:
        </p>

        <Codigo
          archivo="app/react/routing/FiltroDemo.js"
          resaltar={[1, 2, 3, 8]}
          codigo={`// NO hay useState acá adentro. El estado del filtro es la URL.
const pista = parametros.get("pista") ?? "todas";
const buscar = parametros.get("buscar") ?? "";

// Devuelve la dirección con un parámetro cambiado. Si el valor es el de por
// defecto lo borramos, así la URL no se llena de basura.
function conParametro(clave, valor) {
  const copia = new URLSearchParams(parametros);
  if (valor === "" || valor === "todas") copia.delete(clave);
  else copia.set(clave, valor);
  const consulta = copia.toString();
  return consulta === "" ? ruta : \`\${ruta}?\${consulta}\`;
}`}
        />

        <p>
          Ese <code>new URLSearchParams(parametros)</code> es el detalle que más
          se olvida: <strong>copiás lo que ya había</strong> y cambiás una sola
          clave. Si armaras la dirección a mano te comerías el resto de los
          parámetros, que en esta página los puso el otro demo.
        </p>

        <p>
          Y fijate cuál botón usa <code>push</code> y cuál{" "}
          <code>replace</code>: elegir una pista es una decisión y merece una
          entrada en el historial; cada tecla del buscador, no. Si escribieras
          con <code>push</code>, para volver atrás habría que apretar una vez por
          letra.
        </p>

        <Nota tipo="atencion" titulo="Por qué el demo está adentro de un Suspense">
          <p>
            Next arma el HTML de esta lección en el servidor, antes de que
            exista una URL con <code>?</code>. Como{" "}
            <code>useSearchParams()</code> no puede saber todavía qué hay ahí,
            hay que envolver al componente que lo usa en un{" "}
            <code>&lt;Suspense&gt;</code>: el resto de la página se manda armada
            y ese pedacito se completa en el navegador. En el{" "}
            <code>page.js</code> de esta lección es literalmente esto:
          </p>
          <Codigo
            codigo={`<Suspense fallback={<Cargando />}>
  <FiltroDemo />
</Suspense>`}
          />
        </Nota>

        <p>
          Si la página es un Server Component, ni siquiera hace falta el hook:
          los parámetros llegan como prop. Con la misma regla que{" "}
          <code>params</code>, ojo, porque también es una promesa:
        </p>

        <Codigo
          archivo="una página de servidor con searchParams"
          resaltar={[2]}
          codigo={`export default async function Pagina({ searchParams }) {
  const { pista = "todas" } = await searchParams;

  // Acá ya podés filtrar del lado del servidor y mandar el HTML listo.
  return <h1>Mostrando la pista {pista}</h1>;
}`}
        />
      </Seccion>

      <Seccion titulo="not-found.js: tu propio 404" id="cuatrocientos-cuatro">
        <p>
          Cuando alguien pide una dirección que no existe, o cuando tu código se
          da cuenta de que el dato pedido no está, hay que responder{" "}
          <strong>404</strong>. Son dos piezas: <code>notFound()</code>, que
          importás de <code>next/navigation</code> y llamás desde tu página
          —corta el renderizado en el acto, ni siquiera hace falta escribir{" "}
          <code>return</code>—, y <code>not-found.js</code>, el archivo que dice
          qué se ve, válido para su carpeta y para todas las de abajo.
        </p>

        <p>
          En este laboratorio las fichas son números. Pedile una que no lo sea y
          vas a caer en el 404 propio de esa rama:
        </p>

        <p className="fila">
          <Link className="boton" href="/react/routing/demo/kiwi">
            Probar /demo/kiwi
          </Link>
          <Link className="boton boton-suave" href="/react/routing/demo/42">
            /demo/42 sí existe
          </Link>
        </p>

        <Codigo
          archivo="app/react/routing/demo/not-found.js · recortado"
          resaltar={[1, 2]}
          codigo={`// not-found.js se dibuja cuando alguien llama a notFound() en esta rama, y
// también cuando la URL no coincide con ninguna ruta de acá abajo.
export default function NoEncontrado() {
  return <h1>404 · Esa ficha no existe</h1>;
}`}
        />

        <p>
          Ese archivo está en <code>app/react/routing/demo/</code>, así que es el
          404 <strong>de esa rama</strong> nada más. Si lo ponés en{" "}
          <code>app/not-found.js</code> pasa a ser el de todo el sitio, y es el
          que ve cualquiera que escriba mal una dirección.
        </p>

        <p className="tenue">
          Un 404 no es un error tuyo: es una respuesta normal de la web, y el
          navegador la entiende. Por eso conviene llamar a{" "}
          <code>notFound()</code> y no dibujar un{" "}
          <code>&lt;p&gt;No encontrado&lt;/p&gt;</code> a mano, que devolvería un
          200 diciendo “todo bien” con una página vacía.
        </p>
      </Seccion>

      <Seccion titulo="Ojo: esto es Next, no React" id="react-pelado">
        <p>
          Vale la pena separarlo, porque en otro proyecto te va a aparecer
          distinto. <strong>React no trae ruteo.</strong> React sabe dibujar
          componentes; de direcciones, historial y carpetas no sabe nada. Todo lo
          de esta lección lo pone Next.
        </p>

        <p>
          En un proyecto de React sin Next lo más común es usar{" "}
          <strong>React Router</strong>, una librería aparte, donde las rutas las
          declarás vos en el código, como componentes.
        </p>

        <Comparacion>
          <Columna tono="bien" titulo="React pelado + React Router">
            <Codigo
              codigo={`// Las rutas se declaran en el código.
<Routes>
  <Route path="/" element={<Inicio />} />
  <Route path="/fichas/:id" element={<Ficha />} />
</Routes>

function Ficha() {
  const { id } = useParams();  // sin promesa
  return <h1>Ficha {id}</h1>;
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Next.js con App Router">
            <Codigo
              codigo={`// Las rutas SON las carpetas.
app/fichas/[id]/page.js

// y adentro de ese archivo:
export default async function Ficha({ params }) {
  const { id } = await params;
  return <h1>Ficha {id}</h1>;
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          Las dos ideas son legítimas. Lo que cambia es dónde vive la verdad: en
          un archivo de configuración o en el árbol de carpetas.
        </p>

        <p className="tenue">
          La columna de la izquierda es el aire de la cosa, no una receta para
          copiar: React Router cambió bastante entre sus versiones y no está
          instalado acá. Si algún día lo usás, mirá su documentación.
        </p>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Tres errores en una ruta dinámica"
          pista={
            <p style={{ marginBottom: 0 }}>
              El primero está en <strong>cómo se lee</strong>{" "}
              <code>params</code>: en Next 16 es una promesa, y para hacerle{" "}
              <code>await</code> la función tiene que ser <code>async</code>. El
              segundo está en el enlace de volver. El tercero, en lo que pasa
              cuando el id no sirve: hoy devuelve una página que dice “no existe”
              pero con estado 200, como si todo estuviera bien.
            </p>
          }
          solucion={
            <div>
              <Codigo
                archivo="app/tienda/[id]/page.js"
                resaltar={[2, 4, 5, 8, 14]}
                codigo={`import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Pagina({ params }) {
  const { id } = await params;
  const producto = PRODUCTOS.find((p) => p.id === id);

  if (!producto) notFound();

  return (
    <div>
      <h1>{producto.nombre}</h1>
      <p>{producto.precio}</p>
      <Link href="/tienda">Volver al listado</Link>
    </div>
  );
}`}
              />
              <p className="tenue" style={{ marginBottom: 0 }}>
                Con <code>notFound()</code> la respuesta es un 404 de verdad y
                además se dibuja el <code>not-found.js</code> más cercano, así
                que el mensaje lo escribís una sola vez para toda la rama.
              </p>
            </div>
          }
        >
          <p>
            Esta página compila y hasta parece andar, pero tiene tres problemas.
            Encontralos y arreglala.
          </p>
          <Codigo
            archivo="app/tienda/[id]/page.js"
            resaltar={[1, 2, 5, 12]}
            codigo={`export default function Pagina({ params }) {
  const producto = PRODUCTOS.find((p) => p.id === params.id);

  if (!producto) {
    return <p>Ese producto no existe.</p>;
  }

  return (
    <div>
      <h1>{producto.nombre}</h1>
      <p>{producto.precio}</p>
      <a href="/tienda">Volver al listado</a>
    </div>
  );
}`}
          />
        </Desafio>

        <Desafio
          titulo="2. Mudá el filtro a la URL"
          pista={
            <p style={{ marginBottom: 0 }}>
              Se va el <code>useState</code> entero. El valor se <em>lee</em> con{" "}
              <code>useSearchParams().get(&quot;orden&quot;)</code>, con un valor
              por defecto para cuando el parámetro no está. Para{" "}
              <em>escribirlo</em> no hay setter: copiá los parámetros actuales en
              un <code>URLSearchParams</code> nuevo, cambiá la clave que te
              interesa y navegá con el router. Como elegir un orden es una
              decisión del usuario, va con <code>push</code>.
            </p>
          }
          solucion={
            <div>
              <Codigo
                archivo="Listado.js"
                resaltar={[2, 10, 13, 14, 15]}
                codigo={`"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Listado({ productos }) {
  const router = useRouter();
  const ruta = usePathname();
  const parametros = useSearchParams();

  // La URL es la fuente de verdad. Sin parámetro, ordenamos por precio.
  const orden = parametros.get("orden") ?? "precio";

  function ordenarPor(nuevo) {
    const copia = new URLSearchParams(parametros); // no pisamos los demás
    copia.set("orden", nuevo);
    router.push(\`\${ruta}?\${copia.toString()}\`);
  }

  // El sort no cambia. Los botones ahora llaman a ordenarPor("precio")
  // y ordenarPor("nombre") en vez de a setOrden.
}`}
              />
              <p className="tenue">
                <code>ordenados</code> no es estado: se calcula en cada render a
                partir de la URL, igual que cualquier valor derivado de las{" "}
                <Link href="/react/props">props</Link>. Y acordate de envolver a
                este componente en un <code>&lt;Suspense&gt;</code>.
              </p>
            </div>
          }
        >
          <p>
            Este listado ordena bien, pero el orden elegido no se puede compartir
            por link, se pierde al recargar y el botón de atrás no lo deshace.
            Sacale el <code>useState</code> y hacé que el orden viva en la URL,
            como <code>?orden=nombre</code>.
          </p>
          <Codigo
            archivo="Listado.js"
            resaltar={[5, 13, 16]}
            codigo={`"use client";
import { useState } from "react";

export default function Listado({ productos }) {
  const [orden, setOrden] = useState("precio");

  const ordenados = [...productos].sort((a, b) =>
    orden === "precio" ? a.precio - b.precio : a.nombre.localeCompare(b.nombre),
  );

  return (
    <div>
      <button type="button" onClick={() => setOrden("precio")}>
        Por precio
      </button>
      <button type="button" onClick={() => setOrden("nombre")}>
        Por nombre
      </button>
      <ul>
        {ordenados.map((p) => (
          <li key={p.id}>{p.nombre} — {p.precio}</li>
        ))}
      </ul>
    </div>
  );
}`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
