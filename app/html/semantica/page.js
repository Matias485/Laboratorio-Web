import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Demo from "@/components/Demo";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "HTML semántico" };

// --------------------------------------------------------------------------
// Las dos versiones de la misma página. Los estilos están escritos a propósito
// para que el resultado visual sea idéntico: en una versión los selectores
// apuntan a clases y en la otra a etiquetas.
// --------------------------------------------------------------------------

const HTML_DIVS = `<div class="tapa">
  <div class="logo">Radio Mate</div>
  <div class="menu">
    <a href="#">Programas</a>
    <a href="#">Contacto</a>
  </div>
</div>

<div class="cuerpo">
  <div class="nota">
    <div class="titulo">Vuelve "Trasnoche"</div>
    <div class="fecha">12 de marzo de 2025</div>
    <div class="texto">El ciclo vuelve los jueves a las 23.</div>
  </div>
</div>

<div class="pie">Radio Mate · La Plata</div>`;

const CSS_DIVS = `.tapa {
  display: flex; flex-wrap: wrap; gap: 8px;
  justify-content: space-between; align-items: center;
  padding: 10px 14px; background: #14538f; color: #fff; border-radius: 8px;
}
.logo { font-weight: 700; font-size: 1.05rem; }
.menu a { color: #fff; text-decoration: none; margin-left: 14px; font-size: .9rem; }
.cuerpo { padding: 14px 0; }
.nota { border: 1px solid #d3e0f0; border-radius: 8px; padding: 14px; }
.titulo { font-size: 1.2rem; font-weight: 700; margin: 0 0 4px; }
.fecha { font-size: .8rem; color: #55697f; margin: 0 0 8px; }
.texto { margin: 0; }
.pie {
  border-top: 1px solid #d3e0f0; padding-top: 10px;
  font-size: .85rem; color: #55697f;
}`;

const HTML_SEMANTICO = `<header>
  <div class="logo">Radio Mate</div>
  <nav>
    <a href="#">Programas</a>
    <a href="#">Contacto</a>
  </nav>
</header>

<main>
  <article>
    <h2>Vuelve "Trasnoche"</h2>
    <time datetime="2025-03-12">12 de marzo de 2025</time>
    <p>El ciclo vuelve los jueves a las 23.</p>
  </article>
</main>

<footer>Radio Mate · La Plata</footer>`;

const CSS_SEMANTICO = `header {
  display: flex; flex-wrap: wrap; gap: 8px;
  justify-content: space-between; align-items: center;
  padding: 10px 14px; background: #14538f; color: #fff; border-radius: 8px;
}
.logo { font-weight: 700; font-size: 1.05rem; }
nav a { color: #fff; text-decoration: none; margin-left: 14px; font-size: .9rem; }
main { display: block; padding: 14px 0; }
article { border: 1px solid #d3e0f0; border-radius: 8px; padding: 14px; }
article h2 { font-size: 1.2rem; font-weight: 700; margin: 0 0 4px; }
article time { display: block; font-size: .8rem; color: #55697f; margin: 0 0 8px; }
article p { margin: 0; }
footer {
  border-top: 1px solid #d3e0f0; padding-top: 10px;
  font-size: .85rem; color: #55697f;
}`;

export default function Pagina() {
  return (
    <Leccion
      slug="/html/semantica"
      titulo="HTML semántico"
      resumen="Por qué <section> no es lo mismo que <div>, y qué gana tu página cuando elegís bien."
    >
      <Seccion titulo="La misma página, dos códigos distintos">
        <p>
          Abajo está la misma tapa de radio escrita de dos maneras. A la
          izquierda, todo con <code>&lt;div&gt;</code> y clases. A la derecha,
          con las etiquetas que significan lo que el bloque es. Mirá los dos
          resultados: <strong>son idénticos, píxel por píxel</strong>.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Sopa de divs">
            <Codigo archivo="index.html" codigo={HTML_DIVS} />
            <Vista html={HTML_DIVS} css={CSS_DIVS} />
          </Columna>
          <Columna tono="bien" titulo="HTML semántico">
            <Codigo archivo="index.html" codigo={HTML_SEMANTICO} />
            <Vista html={HTML_SEMANTICO} css={CSS_SEMANTICO} />
          </Columna>
        </Comparacion>

        <p>
          Ese es exactamente el punto de la lección:{" "}
          <strong>lo que cambia no se ve</strong>. Un navegador dibuja las dos
          igual porque <code>&lt;div&gt;</code>, <code>&lt;header&gt;</code> y{" "}
          <code>&lt;article&gt;</code> son todos cajas de bloque sin estilo
          propio. La diferencia aparece cuando la página deja de ser una imagen
          y pasa a ser <em>información</em>: cuando la lee un programa, un lector
          de pantalla o vos mismo dentro de seis meses.
        </p>

        <Nota tipo="info" titulo="Semántico quiere decir “que significa algo”">
          <p>
            <code>&lt;div&gt;</code> y <code>&lt;span&gt;</code> son las dos
            únicas etiquetas de HTML que <em>no significan nada</em> a propósito:
            existen para colgarles estilos. Todas las demás dicen qué es lo que
            envuelven. Elegir la etiqueta correcta no es una regla de buenas
            costumbres, es completar un dato que ya tenías.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Qué gana la versión de la derecha">
        <p>
          Nada de esto se ve en la pantalla, y todo esto lo perdés con la versión
          de divs:
        </p>

        <ul>
          <li>
            <strong>Lectores de pantalla.</strong> Las etiquetas de estructura se
            convierten en <em>regiones</em> (landmarks) y el usuario salta de una
            a otra con una tecla, sin escuchar el menú entero cada vez que entra
            a una página.
          </li>
          <li>
            <strong>Buscadores.</strong> Google no adivina qué parte es el
            contenido y qué parte es el menú repetido en las 200 páginas del
            sitio: se lo estás diciendo.
          </li>
          <li>
            <strong>Modo lectura del navegador.</strong> Firefox y Safari usan,
            entre otras señales, el <code>&lt;article&gt;</code> y el{" "}
            <code>&lt;main&gt;</code> para decidir qué texto mostrar limpio. Una
            página de puros divs suele quedar afuera.
          </li>
          <li>
            <strong>Tu propio CSS.</strong> Si el bloque ya es{" "}
            <code>&lt;nav&gt;</code>, no necesitás inventar{" "}
            <code>class="menu"</code>; y cuando volvés al archivo, el HTML solo
            ya te cuenta la estructura sin que tengas que leer las clases.
          </li>
          <li>
            <strong>Extensiones, lectores RSS, el modo impresión, el que scrapea
            tu página.</strong> Todos leen lo mismo.
          </li>
        </ul>

        <p>
          Así se ve, más o menos, la lista de regiones que un lector de pantalla
          te ofrece para saltar por la página semántica:
        </p>

        <Demo titulo="Simulación · lista de regiones de un lector de pantalla">
          <Vista
            fondo="#0f1b2b"
            html={`<p class="cap">Regiones de esta página (5)</p>
<ol class="rotor">
  <li><b>banner</b> · encabezado del sitio &mdash; &lt;header&gt;</li>
  <li><b>navigation</b> · "Principal" &mdash; &lt;nav&gt;</li>
  <li><b>main</b> · contenido principal &mdash; &lt;main&gt;</li>
  <li><b>complementary</b> · "Notas relacionadas" &mdash; &lt;aside&gt;</li>
  <li><b>contentinfo</b> · pie de página &mdash; &lt;footer&gt;</li>
</ol>
<p class="pie">Con la versión de puros divs, esta lista sale vacía.</p>`}
            css={`body { color: #dbe6f3; font-family: ui-monospace, Consolas, monospace; font-size: .82rem; }
.cap { margin: 0 0 8px; color: #64809f; text-transform: uppercase; letter-spacing: .06em; font-size: .72rem; }
.rotor { margin: 0; padding-left: 20px; }
.rotor li { padding: 3px 0; }
.rotor b { color: #f2c97d; }
.pie { margin: 10px 0 0; color: #64809f; font-style: italic; }`}
          />
        </Demo>

        <Nota tipo="atencion" titulo="No es una etiqueta que “agrega accesibilidad”">
          <p>
            Un <code>&lt;header&gt;</code> no hace accesible una página mal
            hecha. Lo que hace es <em>no destruir</em> información que ya estaba
            ahí. La accesibilidad de verdad se trabaja con esto más teclado,
            contraste y textos alternativos:{" "}
            <Link href="/html/accesibilidad">Accesibilidad</Link> sigue por ese
            lado.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Las siete etiquetas de estructura">
        <p>
          Con estas siete armás el esqueleto de casi cualquier página. Para cada
          una, lo único que importa es cuándo sí y cuándo no:
        </p>

        <ul>
          <li>
            <code>&lt;header&gt;</code> — el encabezado <em>de lo que lo
            contiene</em>. <strong>Sí:</strong> logo y menú arriba de todo; o el
            título, el autor y la fecha arriba de un artículo.{" "}
            <strong>No:</strong> “la parte de arriba” de cualquier cajita.
          </li>
          <li>
            <code>&lt;nav&gt;</code> — un bloque de navegación{" "}
            <em>importante</em>. <strong>Sí:</strong> el menú principal, las
            migas de pan, el índice de una lección. <strong>No:</strong>{" "}
            cualquier grupo de tres enlaces, ni los enlaces sueltos dentro de un
            párrafo.
          </li>
          <li>
            <code>&lt;main&gt;</code> — lo que esta página tiene y las otras no.{" "}
            <strong>Uno solo</strong> por documento, y no va adentro de{" "}
            <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>,{" "}
            <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code> ni{" "}
            <code>&lt;nav&gt;</code>.
          </li>
          <li>
            <code>&lt;section&gt;</code> — una parte temática del documento,{" "}
            <strong>con su propio título</strong>. Si no le podés poner un{" "}
            <code>&lt;h2&gt;</code> razonable, no era una sección: era un{" "}
            <code>&lt;div&gt;</code>.
          </li>
          <li>
            <code>&lt;article&gt;</code> — una unidad que{" "}
            <strong>se entiende sola</strong>, fuera de esta página. Una nota de
            blog, un producto del listado, un comentario, una tarjeta del feed.
          </li>
          <li>
            <code>&lt;aside&gt;</code> — contenido relacionado pero{" "}
            <strong>que se puede sacar</strong> sin romper el sentido de lo
            principal: notas relacionadas, un glosario al costado, publicidad.
            No significa “la columna de la derecha”.
          </li>
          <li>
            <code>&lt;footer&gt;</code> — el pie <em>de lo que lo contiene</em>.
            Puede haber varios: el del sitio y el de cada artículo.
          </li>
        </ul>

        <p>
          Este es el esqueleto completo. Tocalo: agregá un segundo{" "}
          <code>&lt;article&gt;</code>, movelo, sacale el <code>&lt;aside&gt;</code>.
        </p>

        <Editor
          consigna="Fijate que el <article> tiene su propio <header> y su propio <footer>: no hay uno solo por página. Probá duplicar el artículo entero."
          html={`<header>
  <h1>Bloc de notas</h1>
  <nav aria-label="Principal">
    <a href="#">Inicio</a>
    <a href="#">Archivo</a>
  </nav>
</header>

<main>
  <article>
    <header>
      <h2>Cómo tomar mate en la oficina</h2>
      <p class="meta">
        Por Ana · <time datetime="2025-04-02">2 de abril de 2025</time>
      </p>
    </header>

    <p>El termo va lejos del teclado. Esa es toda la técnica.</p>

    <footer class="meta">Etiquetas: mate, oficina</footer>
  </article>

  <aside>
    <h2>Notas relacionadas</h2>
    <ul>
      <li><a href="#">Bombilla tapada: qué hacer</a></li>
      <li><a href="#">Termos que no pierden temperatura</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>Bloc de notas · 2025</p>
</footer>`}
          css={`body > header {
  display: flex; flex-wrap: wrap; gap: 10px;
  align-items: baseline; justify-content: space-between;
  border-bottom: 2px solid #14538f; padding-bottom: 8px;
}
body > header h1 { font-size: 1.3rem; margin: 0; }
nav a { margin-left: 12px; font-size: .9rem; }

main { display: grid; gap: 16px; grid-template-columns: 2fr 1fr; margin: 16px 0; }
article { border: 1px solid #d3e0f0; border-radius: 8px; padding: 14px; }
article h2 { font-size: 1.15rem; margin: 0 0 4px; }
.meta { font-size: .8rem; color: #55697f; margin: 0; }
article footer { margin-top: 10px; border-top: 1px dashed #d3e0f0; padding-top: 8px; }

aside { background: #eef3fa; border-radius: 8px; padding: 14px; }
aside h2 { font-size: .95rem; margin: 0 0 6px; }
aside ul { margin: 0; padding-left: 18px; font-size: .88rem; }

body > footer {
  border-top: 1px solid #d3e0f0; font-size: .85rem; color: #55697f;
}`}
        />

        <Nota tipo="info" titulo="El nivel del título no lo calcula section">
          <p>
            Hubo un plan (el <em>outline algorithm</em>) para que un{" "}
            <code>&lt;h1&gt;</code> adentro de un <code>&lt;section&gt;</code>{" "}
            contara automáticamente como <code>&lt;h2&gt;</code>. Nunca lo
            implementó ningún navegador y quedó descartado del estándar: la
            jerarquía la seguís eligiendo vos con el número del encabezado. Está
            explicado en{" "}
            <Link href="/html/texto">Texto, enlaces e imágenes</Link>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="section, article o div: cómo decidir en dos segundos">
        <p>
          Es la duda más común y se resuelve con una sola pregunta por etiqueta:
        </p>

        <ul>
          <li>
            <strong>¿Esto tendría sentido solo, publicado aparte?</strong> Si un
            lector RSS se lo lleva y sigue entendiéndose, es un{" "}
            <code>&lt;article&gt;</code>.
          </li>
          <li>
            <strong>¿Es una parte temática del todo, con título?</strong>{" "}
            Entonces es un <code>&lt;section&gt;</code>.
          </li>
          <li>
            <strong>¿Existe solamente para poder ponerle estilos?</strong> Es un{" "}
            <code>&lt;div&gt;</code>, y está perfecto que lo sea.
          </li>
        </ul>

        <Comparacion>
          <Columna tono="mal" titulo="Etiquetas puestas por costumbre">
            <Codigo
              archivo="mal.html"
              codigo={`<!-- No tiene título: no es una sección. -->
<section class="franja-azul">
  <p>Envíos a todo el país.</p>
</section>

<!-- Un contenedor para centrar. -->
<article class="contenedor">
  <section class="fila">
    <section class="col">…</section>
  </section>
</article>`}
            />
            <p className="tenue">
              Acá <code>&lt;section&gt;</code> se usa como sinónimo elegante de{" "}
              <code>&lt;div&gt;</code>. Resultado: el lector de pantalla anuncia
              cuatro regiones sin nombre y ninguna sirve para nada.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Cada una donde corresponde">
            <Codigo
              archivo="bien.html"
              codigo={`<!-- Solo estilo: div. -->
<div class="franja-azul">
  <p>Envíos a todo el país.</p>
</div>

<!-- Parte temática, con su título: section. -->
<section>
  <h2>Ofertas de la semana</h2>

  <!-- Se entiende solo: article. -->
  <article>
    <h3>Taladro 500W</h3>
    <p>$ 48.000</p>
  </article>
</section>`}
            />
            <p className="tenue">
              Regla corta: <em>article</em> se entiende solo,{" "}
              <em>section</em> es una parte del todo, <em>div</em> no significa
              nada.
            </p>
          </Columna>
        </Comparacion>

        <p>
          Probalo vos. Este listado está bien armado salvo por el último bloque:
        </p>

        <Editor
          consigna="El último <section> no tiene título propio: cambialo por un <div> y comprobá que el resultado visual no cambia en absoluto."
          html={`<main>
  <h1>Ferretería Don Pedro</h1>

  <section>
    <h2>Ofertas de la semana</h2>

    <article>
      <h3>Taladro 500W</h3>
      <p class="precio">$ 48.000</p>
    </article>

    <article>
      <h3>Set de destornilladores</h3>
      <p class="precio">$ 12.500</p>
    </article>
  </section>

  <section class="franja">
    <p>Envíos a todo el país en 48 horas.</p>
  </section>
</main>`}
          css={`h1 { font-size: 1.4rem; margin: 0 0 12px; }
h2 { font-size: 1.1rem; margin: 0 0 10px; }
h3 { font-size: .95rem; margin: 0 0 4px; }

section article {
  display: inline-block; width: 46%; vertical-align: top;
  border: 1px solid #d3e0f0; border-radius: 8px; padding: 12px; margin-right: 6px;
}
.precio { margin: 0; font-weight: 700; color: #0f7a52; }

.franja {
  margin-top: 14px; background: #14538f; color: #fff;
  border-radius: 8px; padding: 10px 14px; text-align: center;
}
.franja p { margin: 0; font-size: .9rem; }`}
        />

        <Nota tipo="atencion" titulo="La prueba del RSS">
          <p>
            Antes de escribir <code>&lt;article&gt;</code>, preguntate si lo
            pondrías en un mail, solo, sin el resto de la página. Una nota de
            blog sí. Un comentario de esa nota, también. La barra de filtros de
            un buscador, no.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Los errores que se repiten siempre">
        <p>
          Estos cinco aparecen en casi todos los trabajos prácticos. Ninguno
          rompe la página, y esa es justamente la trampa.
        </p>

        <ol>
          <li>
            <strong>Dos <code>&lt;main&gt;</code> en el mismo documento.</strong>{" "}
            El validador lo marca como error. Si tenés dos columnas de contenido,
            son un <code>&lt;main&gt;</code> con dos hijos adentro.
          </li>
          <li>
            <strong><code>&lt;section&gt;</code> sin encabezado.</strong> Casi
            siempre era un <code>&lt;div&gt;</code>. Si de verdad querés la
            región pero no querés el título visible, usá{" "}
            <code>aria-label</code>.
          </li>
          <li>
            <strong>El <code>&lt;main&gt;</code> envolviendo al{" "}
            <code>&lt;header&gt;</code> del sitio.</strong> El encabezado y el
            pie del sitio van <em>afuera</em>: se repiten en todas las páginas, y{" "}
            <code>&lt;main&gt;</code> es lo que no se repite.
          </li>
          <li>
            <strong>Un <code>&lt;nav&gt;</code> por cada grupo de enlaces.</strong>{" "}
            Si marcás cinco navegaciones, la lista de regiones deja de servir
            para saltar. Y si hay más de una, cada una necesita su{" "}
            <code>aria-label</code>.
          </li>
          <li>
            <strong><code>&lt;address&gt;</code> para una dirección postal.</strong>{" "}
            No es para eso: es para los datos de contacto{" "}
            <em>del autor</em> del artículo o de la página. La dirección de la
            sucursal va en un <code>&lt;p&gt;</code>.
          </li>
        </ol>

        <Comparacion>
          <Columna tono="mal" titulo="Estructura inflada">
            <Codigo
              archivo="mal.html"
              codigo={`<main>
  <header>…el header del SITIO…</header>

  <nav>…menú…</nav>
  <nav>…tres links de ayuda…</nav>

  <section class="hero">
    <p>Bienvenidos</p>
  </section>

  <main>…la otra columna…</main>
</main>`}
            />
          </Columna>
          <Columna tono="bien" titulo="Estructura plana y honesta">
            <Codigo
              archivo="bien.html"
              codigo={`<header>
  <nav aria-label="Principal">…menú…</nav>
</header>

<main>
  <div class="hero">
    <p>Bienvenidos</p>
  </div>

  <article>…</article>
  <aside>…la otra columna…</aside>
</main>

<footer>
  <a href="#">…tres links de ayuda…</a>
</footer>`}
            />
          </Columna>
        </Comparacion>

        <Nota tipo="info" titulo="El validador te lo dice gratis">
          <p>
            <code>validator.w3.org</code> revisa justamente esto: dos{" "}
            <code>&lt;main&gt;</code>, un <code>&lt;article&gt;</code> adentro de
            donde no va, encabezados salteados. Es medio minuto y encuentra cosas
            que mirando la pantalla no vas a ver nunca.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Etiquetas que casi nadie usa y valen la pena">
        <p>
          Más allá del esqueleto, hay etiquetas chicas que resuelven cosas
          concretas. La estrella es <code>&lt;details&gt;</code>: es un acordeón
          que abre y cierra <strong>sin una línea de JavaScript</strong>.
        </p>

        <Editor
          consigna={`Agregale open al primer <details> para que arranque abierto; después poné name="faq" en los dos y fijate que abrir uno cierra el otro.`}
          html={`<h2>Preguntas frecuentes</h2>

<details>
  <summary>¿Cuánto tarda el envío?</summary>
  <p>Entre 2 y 5 días hábiles a todo el país.</p>
</details>

<details>
  <summary>¿Puedo cambiar el producto?</summary>
  <p>Sí, dentro de los 30 días y con el ticket.</p>
</details>

<details>
  <summary>¿Hacen factura A?</summary>
  <p>Sí, cargando el CUIT antes de pagar.</p>
</details>`}
          css={`h2 { font-size: 1.15rem; margin: 0 0 10px; }

details {
  border: 1px solid #d3e0f0; border-radius: 8px;
  padding: 8px 12px; margin-bottom: 8px; background: #fff;
}
details[open] { background: #eef3fa; }

summary {
  cursor: pointer; font-weight: 600; font-size: .95rem;
}
summary:hover { color: #14538f; }

details p { margin: 8px 0 0; font-size: .9rem; color: #55697f; }`}
        />

        <Nota tipo="info" titulo="Tres detalles de details">
          <ul>
            <li>
              El <code>&lt;summary&gt;</code> va <strong>primero</strong> y es
              obligatorio: es la parte visible cuando está cerrado.
            </li>
            <li>
              El navegador ya lo hace accesible: se abre con Enter, es
              enfocable con Tab y anuncia si está abierto o cerrado.
            </li>
            <li>
              Con el atributo <code>name</code> compartido entre varios, se
              comporta como un acordeón exclusivo (se cierra el anterior). Ojo:
              es relativamente nuevo, así que no pongas ahí nada crítico.
            </li>
          </ul>
        </Nota>

        <p>
          Las otras cuatro que conviene tener a mano aparecen todas juntas acá
          abajo. Pasá el mouse por <code>HTML</code> para ver el{" "}
          <code>title</code> del <code>&lt;abbr&gt;</code>:
        </p>

        <Editor
          consigna="Cambiá el datetime del 4 de agosto por otra fecha y fijate que el texto visible no se mueve: son dos datos distintos, uno para la persona y otro para la máquina."
          html={`<article>
  <h2>Resultados de la búsqueda</h2>

  <p>
    El curso de <abbr title="HyperText Markup Language">HTML</abbr>
    empieza el <time datetime="2025-08-04">4 de agosto</time> y cada
    clase dura <time datetime="PT2H30M">dos horas y media</time>.
  </p>

  <p>Coincidencia encontrada: el <mark>termo</mark> va lejos del teclado.</p>

  <figure>
    <blockquote>La etiqueta correcta no se ve, pero se nota.</blockquote>
    <figcaption>Cualquier profesor de Taller, 2025</figcaption>
  </figure>

  <address>
    Escribinos a <a href="mailto:hola@ejemplo.com">hola@ejemplo.com</a>
  </address>
</article>`}
          css={`h2 { font-size: 1.15rem; margin: 0 0 10px; }
p { margin: 0 0 10px; }

abbr[title] { text-decoration: underline dotted; cursor: help; }
time { font-variant-numeric: tabular-nums; }
mark { background: #fdf3e0; color: #92600a; padding: 0 3px; border-radius: 3px; }

figure {
  margin: 0 0 12px; border-left: 4px solid #14538f;
  background: #eef3fa; padding: 10px 14px; border-radius: 0 8px 8px 0;
}
blockquote { margin: 0; font-style: italic; }
figcaption { font-size: .8rem; color: #55697f; margin-top: 6px; }

address { font-style: normal; font-size: .88rem; color: #55697f; }`}
        />

        <ul>
          <li>
            <code>&lt;time datetime="…"&gt;</code> — el texto visible lo escribís
            como quieras (“ayer”, “4 de agosto”) y el atributo lleva el formato
            que entienden las máquinas: <code>2025-08-04</code>,{" "}
            <code>2025-08-04T21:00</code>, o una duración como{" "}
            <code>PT2H30M</code>.
          </li>
          <li>
            <code>&lt;mark&gt;</code> — resaltado <em>por relevancia</em>: el
            término buscado dentro del resultado. No es un subrayador para
            decorar.
          </li>
          <li>
            <code>&lt;abbr title="…"&gt;</code> — la sigla y su significado
            juntos.
          </li>
          <li>
            <code>&lt;figure&gt;</code> y <code>&lt;figcaption&gt;</code> — un
            contenido autocontenido (imagen, cita, tabla, código) con su
            epígrafe atado. Sirve para cualquier cosa, no solo imágenes.
          </li>
          <li>
            <code>&lt;address&gt;</code> — los datos de contacto del autor.
            Fijate que el navegador lo pone en itálica por defecto y casi
            siempre se lo saca con <code>font-style: normal</code>.
          </li>
        </ul>

        <Nota tipo="atencion" titulo="El title no llega a todos">
          <p>
            El globito de <code>title</code> (el del <code>&lt;abbr&gt;</code>)
            no aparece en pantallas táctiles y es difícil de alcanzar con el
            teclado. Está bien como dato extra, nunca como la única forma de
            entender algo importante.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Landmarks: cómo recorre tu página un lector de pantalla">
        <p>
          Cada etiqueta de estructura se convierte automáticamente en una región
          con un rol, sin que escribas ni un <code>role=</code>:
        </p>

        <Codigo
          archivo="etiqueta → rol de la región"
          codigo={`<header>   (hijo directo de <body>) → banner
<nav>                            → navigation
<main>                           → main
<aside>                          → complementary
<footer>   (hijo directo de <body>) → contentinfo
<form aria-label="…">            → form
<search>                         → search`}
        />

        <p>
          Dos cosas prácticas que salen de ahí. La primera: si{" "}
          <code>&lt;header&gt;</code> o <code>&lt;footer&gt;</code> están{" "}
          <strong>adentro</strong> de un <code>&lt;article&gt;</code> o de un{" "}
          <code>&lt;section&gt;</code>, dejan de ser regiones y pasan a ser el
          encabezado y el pie de ese artículo. Es la razón por la que puede haber
          varios sin ambigüedad.
        </p>

        <p>
          La segunda: cuando hay más de una navegación, todas se anuncian igual
          (“navegación”) salvo que les pongas nombre.
        </p>

        <Editor
          consigna="Sacale los aria-label a los dos <nav> y pensá qué escucha alguien que solo oye “navegación, navegación”. Después volvé a ponerlos."
          html={`<header>
  <nav aria-label="Principal">
    <a href="#">Inicio</a>
    <a href="#">Cursos</a>
    <a href="#">Contacto</a>
  </nav>
</header>

<nav aria-label="Migas de pan">
  <a href="#">Inicio</a> ›
  <a href="#">Cursos</a> ›
  <span aria-current="page">HTML semántico</span>
</nav>

<main>
  <h1>HTML semántico</h1>
  <p>Contenido de la página.</p>
</main>`}
          css={`nav { font-size: .9rem; }
header nav {
  background: #14538f; border-radius: 8px; padding: 8px 12px;
}
header nav a { color: #fff; text-decoration: none; margin-right: 14px; }

nav[aria-label="Migas de pan"] { margin: 12px 0; color: #55697f; }
nav[aria-label="Migas de pan"] a { color: #14538f; }
[aria-current="page"] { font-weight: 700; color: #15212e; }

h1 { font-size: 1.4rem; margin: 0 0 8px; }`}
        />

        <Nota tipo="info" titulo="Un landmark nuevo que casi nadie conoce">
          <p>
            <code>&lt;search&gt;</code> envuelve el formulario de búsqueda y le
            da el rol <code>search</code>. Antes había que escribir{" "}
            <code>role="search"</code> a mano sobre un{" "}
            <code>&lt;form&gt;</code>; hoy la etiqueta existe y hace lo mismo
            sola. De formularios se ocupa{" "}
            <Link href="/html/formularios">
              Formularios y validación nativa
            </Link>
            .
          </p>
        </Nota>

        <Nota tipo="ok" titulo="Regla de oro">
          <p>
            La etiqueta nativa siempre le gana al <code>role</code> puesto a
            mano. Antes de escribir <code>&lt;div role="navigation"&gt;</code>,
            preguntate por qué no es directamente un <code>&lt;nav&gt;</code>.
            Todo esto se profundiza en{" "}
            <Link href="/html/accesibilidad">Accesibilidad</Link>; el armado
            visual del esqueleto, en{" "}
            <Link href="/css/pagina-completa">Armar una página entera</Link>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Convertí esta página a HTML semántico"
          pista={
            <div>
              <p>
                Andá de afuera para adentro. Primero las tres regiones grandes:
                lo de arriba es el <code>&lt;header&gt;</code>, lo de abajo el{" "}
                <code>&lt;footer&gt;</code>, y todo lo del medio va adentro de un{" "}
                <strong>único</strong> <code>&lt;main&gt;</code>.
              </p>
              <p>Después, adentro:</p>
              <ul>
                <li>
                  El grupo de enlaces de arriba es una navegación.
                </li>
                <li>
                  Cada receta se entendería sola publicada aparte: eso tiene
                  nombre.
                </li>
                <li>
                  Los títulos falsos hechos con <code>&lt;div&gt;</code> tienen
                  que pasar a ser encabezados de verdad, con jerarquía:{" "}
                  <code>&lt;h1&gt;</code>, después <code>&lt;h2&gt;</code>.
                </li>
                <li>
                  La fecha merece un <code>&lt;time&gt;</code> con{" "}
                  <code>datetime</code>.
                </li>
                <li>
                  La columna de “Más leídas” se puede sacar sin romper nada.
                </li>
              </ul>
              <p>
                Vas a tener que tocar también el CSS: si sacás las clases, los
                selectores tienen que apuntar a las etiquetas nuevas.
              </p>
            </div>
          }
          solucion={
            <div>
              <p>
                Una versión posible. Lo importante no es que coincida letra por
                letra, sino que haya <strong>un solo</strong>{" "}
                <code>&lt;main&gt;</code>, que cada receta sea un{" "}
                <code>&lt;article&gt;</code>, que los títulos sean encabezados
                reales y que “Más leídas” quede como <code>&lt;aside&gt;</code>:
              </p>
              <Editor
                consigna="Compará con tu versión: si elegiste otras etiquetas, preguntate qué diría cada una en la lista de regiones."
                html={`<header>
  <h1>Cocina rápida</h1>
  <nav aria-label="Principal">
    <a href="#">Recetas</a>
    <a href="#">Técnicas</a>
    <a href="#">Nosotros</a>
  </nav>
</header>

<main>
  <section>
    <h2>Últimas recetas</h2>

    <article>
      <h3>Tarta de puerros</h3>
      <p class="meta">
        <time datetime="2025-05-18">18 de mayo de 2025</time> · 40 minutos
      </p>
      <p>Puerro, crema y una masa que se compra hecha.</p>
    </article>

    <article>
      <h3>Ñoquis de calabaza</h3>
      <p class="meta">
        <time datetime="2025-05-11">11 de mayo de 2025</time> · 1 hora
      </p>
      <p>Calabaza asada, harina y paciencia.</p>
    </article>
  </section>

  <aside>
    <h2>Más leídas</h2>
    <ul>
      <li><a href="#">Pan sin amasado</a></li>
      <li><a href="#">Salsa de tomate</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>Cocina rápida · 2025</p>
</footer>`}
                css={`body > header {
  display: flex; flex-wrap: wrap; gap: 8px;
  justify-content: space-between; align-items: center;
  border-bottom: 2px solid #14538f; padding-bottom: 10px;
}
body > header h1 { font-size: 1.3rem; margin: 0; }
nav a { margin-left: 12px; font-size: .9rem; }

main { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin: 16px 0; }
section h2, aside h2 { font-size: 1rem; margin: 0 0 10px; }

article {
  border: 1px solid #d3e0f0; border-radius: 8px;
  padding: 12px; margin-bottom: 10px;
}
article h3 { font-size: 1rem; margin: 0 0 4px; }
.meta { font-size: .8rem; color: #55697f; margin: 0 0 6px; }
article p { margin: 0; font-size: .9rem; }

aside { background: #eef3fa; border-radius: 8px; padding: 12px; }
aside ul { margin: 0; padding-left: 18px; font-size: .88rem; }

body > footer {
  border-top: 1px solid #d3e0f0; padding-top: 10px;
  font-size: .85rem; color: #55697f;
}`}
              />
              <p className="tenue">
                Fijate que el <code>&lt;h1&gt;</code> quedó uno solo, que las
                recetas bajaron a <code>&lt;h3&gt;</code> porque cuelgan de{" "}
                <code>&lt;h2&gt;</code>, y que el CSS ahora se lee casi como el
                HTML.
              </p>
            </div>
          }
        >
          <p>
            Esta página está hecha íntegramente de <code>&lt;div&gt;</code>.
            Reescribila en el editor usando las etiquetas que corresponden, sin
            cambiar ni un píxel del resultado. Empezá por el HTML y después
            arreglá los selectores del CSS.
          </p>
          <Editor
            consigna="Reemplazá los divs por header, nav, main, section, article, aside, footer, h1, h2, h3 y time. El resultado tiene que verse igual."
            html={`<div class="tapa">
  <div class="titulo-sitio">Cocina rápida</div>
  <div class="menu">
    <a href="#">Recetas</a>
    <a href="#">Técnicas</a>
    <a href="#">Nosotros</a>
  </div>
</div>

<div class="cuerpo">
  <div class="columna-principal">
    <div class="titulo-bloque">Últimas recetas</div>

    <div class="receta">
      <div class="titulo-receta">Tarta de puerros</div>
      <div class="meta">18 de mayo de 2025 · 40 minutos</div>
      <div class="texto">Puerro, crema y una masa que se compra hecha.</div>
    </div>

    <div class="receta">
      <div class="titulo-receta">Ñoquis de calabaza</div>
      <div class="meta">11 de mayo de 2025 · 1 hora</div>
      <div class="texto">Calabaza asada, harina y paciencia.</div>
    </div>
  </div>

  <div class="columna-lateral">
    <div class="titulo-bloque">Más leídas</div>
    <ul>
      <li><a href="#">Pan sin amasado</a></li>
      <li><a href="#">Salsa de tomate</a></li>
    </ul>
  </div>
</div>

<div class="pie">Cocina rápida · 2025</div>`}
            css={`.tapa {
  display: flex; flex-wrap: wrap; gap: 8px;
  justify-content: space-between; align-items: center;
  border-bottom: 2px solid #14538f; padding-bottom: 10px;
}
.titulo-sitio { font-size: 1.3rem; font-weight: 700; }
.menu a { margin-left: 12px; font-size: .9rem; }

.cuerpo { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin: 16px 0; }
.titulo-bloque { font-size: 1rem; font-weight: 700; margin-bottom: 10px; }

.receta {
  border: 1px solid #d3e0f0; border-radius: 8px;
  padding: 12px; margin-bottom: 10px;
}
.titulo-receta { font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
.meta { font-size: .8rem; color: #55697f; margin-bottom: 6px; }
.texto { font-size: .9rem; }

.columna-lateral { background: #eef3fa; border-radius: 8px; padding: 12px; }
.columna-lateral ul { margin: 0; padding-left: 18px; font-size: .88rem; }

.pie {
  border-top: 1px solid #d3e0f0; padding-top: 10px;
  font-size: .85rem; color: #55697f;
}`}
          />
        </Desafio>

        <Desafio
          titulo="2. Encontrá los cinco errores"
          pista={
            <p>
              Contá primero cuántos <code>&lt;main&gt;</code> hay. Después
              preguntale a cada <code>&lt;section&gt;</code> dónde está su
              título, a cada <code>&lt;article&gt;</code> si se entiende solo, y
              a <code>&lt;address&gt;</code> de quién son esos datos de contacto.
              El quinto está en el <code>&lt;nav&gt;</code>.
            </p>
          }
          solucion={
            <div>
              <ol>
                <li>
                  <strong>Dos <code>&lt;main&gt;</code>.</strong> El segundo
                  tiene que ser un <code>&lt;aside&gt;</code>: es contenido
                  complementario, y va adentro del <code>&lt;main&gt;</code>{" "}
                  verdadero o al lado, pero <code>&lt;main&gt;</code> hay uno
                  solo.
                </li>
                <li>
                  <strong>El <code>&lt;header&gt;</code> del sitio adentro del{" "}
                  <code>&lt;main&gt;</code>.</strong> Va afuera: se repite en
                  todas las páginas.
                </li>
                <li>
                  <strong><code>&lt;section class="hero"&gt;</code> sin
                  título.</strong> Es un <code>&lt;div&gt;</code>.
                </li>
                <li>
                  <strong><code>&lt;article&gt;</code> envolviendo el bloque de
                  botones.</strong> Tres botones no se entienden solos fuera de
                  la página: también es un <code>&lt;div&gt;</code>.
                </li>
                <li>
                  <strong><code>&lt;address&gt;</code> con la dirección de la
                  sucursal.</strong> Esa dirección es un dato del negocio, no los
                  datos de contacto del autor: va en un <code>&lt;p&gt;</code>.
                  Bonus: los dos <code>&lt;nav&gt;</code> no tienen{" "}
                  <code>aria-label</code>, así que se anuncian igual.
                </li>
              </ol>
              <Codigo
                archivo="corregido.html"
                resaltar={[1, 7, 13, 19]}
                codigo={`<header>
  <nav aria-label="Principal">…</nav>
</header>

<main>
  <!-- Solo estilo: div. -->
  <div class="hero">
    <h1>Ofertas</h1>
  </div>

  <article>…la nota, que sí se entiende sola…</article>

  <div class="acciones">
    <button>Comprar</button>
    <button>Compartir</button>
  </div>

  <!-- Lo que antes era el segundo <main>. -->
  <aside>
    <h2>También te puede interesar</h2>
    …
  </aside>
</main>

<footer>
  <nav aria-label="Legales">…</nav>
  <p>Sucursal: Calle Falsa 123, La Plata.</p>
</footer>`}
              />
            </div>
          }
        >
          <p>
            Este código <em>parece</em> semántico: tiene todas las etiquetas
            lindas. Pero hay cinco decisiones equivocadas. Encontralas antes de
            abrir la solución.
          </p>
          <Codigo
            archivo="roto.html"
            codigo={`<main>
  <header>
    <nav>…menú principal…</nav>
  </header>

  <section class="hero">
    <h1>Ofertas</h1>
  </section>

  <article>…la nota…</article>

  <article class="acciones">
    <button>Comprar</button>
    <button>Compartir</button>
  </article>
</main>

<main class="lateral">
  <h2>También te puede interesar</h2>
  …
</main>

<footer>
  <nav>…legales…</nav>
  <address>Sucursal: Calle Falsa 123, La Plata.</address>
</footer>`}
          />
        </Desafio>

        <Desafio
          titulo="3. Un FAQ sin JavaScript"
          pista={
            <p>
              Un <code>&lt;details&gt;</code> por pregunta, el{" "}
              <code>&lt;summary&gt;</code> primero adentro de cada uno, y los
              cuatro con el mismo atributo <code>name</code> para que se
              comporten como acordeón. La sección necesita su{" "}
              <code>&lt;h2&gt;</code> para ser un <code>&lt;section&gt;</code>{" "}
              legítimo. La fecha de actualización es un{" "}
              <code>&lt;time&gt;</code>.
            </p>
          }
          solucion={
            <Codigo
              archivo="faq.html"
              resaltar={[4, 9, 14]}
              codigo={`<section>
  <h2>Preguntas frecuentes</h2>

  <details name="faq" open>
    <summary>¿Hacen envíos?</summary>
    <p>Sí, a todo el país.</p>
  </details>

  <details name="faq">
    <summary>¿Cuánto tardan?</summary>
    <p>Entre 2 y 5 días hábiles.</p>
  </details>

  <details name="faq">
    <summary>¿Puedo cambiar el producto?</summary>
    <p>Dentro de los 30 días, con el ticket.</p>
  </details>

  <p class="tenue">
    Actualizado el <time datetime="2025-06-01">1 de junio de 2025</time>.
  </p>
</section>`}
            />
          }
        >
          <p>
            Armá, desde cero y sin una línea de JavaScript, una sección de
            preguntas frecuentes con tres preguntas que se abran y se cierren, de
            manera que <strong>abrir una cierre la anterior</strong>, y con la
            fecha de última actualización marcada para que la lea una máquina.
            Volvé al editor de más arriba si necesitás recordar la forma.
          </p>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
