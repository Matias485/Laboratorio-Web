import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "Texto, enlaces e imágenes" };

// Imágenes de ejemplo. Van como data URI (el SVG entero metido adentro del
// src) para que los editores funcionen sin conexión y sin depender de ningún
// archivo del repositorio.
const FOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Crect width='320' height='200' fill='%23bcdcf5'/%3E%3Ccircle cx='72' cy='52' r='26' fill='%23ffd98e'/%3E%3Cpath d='M0 200 L110 96 L176 140 L240 86 L320 200 Z' fill='%234a7fb5'/%3E%3C/svg%3E";

const GRAFICO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='180'%3E%3Crect width='300' height='180' fill='%23eef3fa'/%3E%3Crect x='34' y='104' width='44' height='56' fill='%234a7fb5'/%3E%3Crect x='98' y='64' width='44' height='96' fill='%234a7fb5'/%3E%3Crect x='162' y='34' width='44' height='126' fill='%234a7fb5'/%3E%3Crect x='226' y='84' width='44' height='76' fill='%234a7fb5'/%3E%3C/svg%3E";

const ADORNO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Ccircle cx='11' cy='11' r='9' fill='%23f2b544'/%3E%3C/svg%3E";

export default function Pagina() {
  return (
    <Leccion
      slug="/html/texto"
      titulo="Texto, enlaces e imágenes"
      resumen="Encabezados con jerarquía, listas, enlaces que no mienten e imágenes con alt."
    >
      <Seccion titulo="Encabezados: importancia, no tamaño">
        <p>
          Hay seis niveles, de <code>&lt;h1&gt;</code> a{" "}
          <code>&lt;h6&gt;</code>. La tentación es elegirlos por el tamaño con
          el que se ven, y esa es justamente la decisión equivocada: el nivel
          dice{" "}
          <strong>
            qué tan importante es ese título dentro del documento
          </strong>
          , no qué tan grande se dibuja. El tamaño lo decide el CSS, y lo podés
          cambiar cuando quieras sin tocar el HTML.
        </p>

        <p>
          En el editor de abajo hay un <code>&lt;h3&gt;</code> enorme y un{" "}
          <code>&lt;h1&gt;</code> chiquito. Visualmente están dados vuelta, pero
          para el navegador, para Google y para un lector de pantalla la
          jerarquía sigue siendo la misma: el <code>&lt;h1&gt;</code> es el
          título principal.
        </p>

        <Editor
          consigna="Borrá las tres reglas del CSS y mirá los tamaños por defecto. La jerarquía no cambió: siempre fue la misma."
          html={`<h1>Manual de la cafetera</h1>
<h3>Advertencia importante</h3>
<p>El tamaño de arriba es CSS. El nivel es HTML.</p>`}
          css={`h1 { font-size: 0.95rem; color: gray; }
h3 { font-size: 2.4rem; color: crimson; }
p  { font-size: 0.9rem; }`}
        />

        <p>
          De ahí salen las tres reglas que se repiten en toda la web:{" "}
          <strong>
            un solo <code>&lt;h1&gt;</code> por página
          </strong>
          , que dice de qué se trata; <strong>no saltearse niveles</strong>{" "}
          (después de un <code>&lt;h2&gt;</code> viene un{" "}
          <code>&lt;h3&gt;</code>, nunca un <code>&lt;h5&gt;</code>); y{" "}
          <strong>nada de encabezados decorativos</strong>: si algo es grande y
          está en negrita pero no es un título, es un <code>&lt;p&gt;</code> con
          CSS.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Elegidos por tamaño">
            <Codigo
              codigo={`<h1>Recetas</h1>
<h4>Entradas</h4>     <!-- salto: 1 → 4 -->
<h2>Empanadas</h2>    <!-- y ahora sube -->
<h1>Postres</h1>      <!-- segundo h1 -->
<h3>¡Suscribite!</h3> <!-- no es un título -->`}
            />
          </Columna>
          <Columna tono="bien" titulo="Elegidos por jerarquía">
            <Codigo
              codigo={`<h1>Recetas</h1>
<h2>Entradas</h2>
<h3>Empanadas</h3>
<h2>Postres</h2>
<p class="llamada">¡Suscribite!</p>`}
            />
          </Columna>
        </Comparacion>

        <Nota tipo="info" titulo="Para qué sirve de verdad la jerarquía">
          <p>
            Quien usa un lector de pantalla casi nunca lee la página de arriba
            abajo: pide la <strong>lista de encabezados</strong> y salta al que
            le interesa, igual que vos usás el índice de un apunte. Si los
            niveles están mal, ese índice queda desordenado. Lo mismo hacen los
            buscadores y el modo lectura del navegador.
          </p>
          <p>
            Hay más sobre esto en{" "}
            <Link href="/html/accesibilidad">Accesibilidad</Link>.
          </p>
        </Nota>

        <p>
          Este es el índice que le queda a una página bien armada. Fijate que se
          entiende sola, sin ver ni un color:
        </p>

        <Vista
          html={`<h1>Cómo hacer pan</h1>
<h2>Ingredientes</h2>
<h3>La harina</h3>
<h3>La levadura</h3>
<h2>El procedimiento</h2>
<h3>Amasado</h3>
<h3>Leudado</h3>
<h2>Problemas frecuentes</h2>`}
          css={`body { font-family: ui-monospace, monospace; font-size: 13px; }
h1, h2, h3 { font-size: 13px; font-weight: 700; margin: 3px 0; }
h1 { color: #103e6b; }
h2 { margin-left: 22px; color: #14538f; font-weight: 600; }
h3 { margin-left: 44px; color: #55697f; font-weight: 400; }
h2::before, h3::before { content: "└ "; }`}
        />

        <Nota tipo="atencion" titulo="El section no crea niveles">
          <p>
            Durante años se dijo que metiendo cosas adentro de{" "}
            <code>&lt;section&gt;</code> el navegador recalculaba los niveles
            solo, y que por eso podías usar <code>&lt;h1&gt;</code> en todos
            lados. Ese algoritmo{" "}
            <strong>nunca se implementó y ya se sacó del estándar</strong>. Los
            niveles son los que vos escribís, punto. De{" "}
            <code>&lt;section&gt;</code> se ocupa{" "}
            <Link href="/html/semantica">HTML semántico</Link>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Párrafos, saltos y espacios">
        <p>
          El HTML <strong>colapsa los espacios en blanco</strong>: veinte
          espacios seguidos, un tabulador y tres saltos de línea en el código
          fuente se ven todos igual, como un único espacio. Los renglones no se
          separan apretando Enter: se separan con etiquetas.
        </p>

        <Editor
          solapas="html"
          consigna="Agregale más espacios y más Enter al primer párrafo: no va a cambiar nada. Después partí el segundo en dos <p>."
          html={`<p>Este      texto      tiene
   muchísimos       espacios
      y saltos de línea en el código.</p>

<p>Los dos párrafos están separados porque son dos etiquetas distintas, no porque haya un renglón en blanco entre medio.</p>`}
        />

        <p>
          El <code>&lt;br&gt;</code> existe para los saltos que{" "}
          <strong>son parte del texto</strong>: una dirección postal, los versos
          de un poema, la letra de una canción. No es un separador de párrafos.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="br como separador">
            <Codigo
              codigo={`Hola, cómo va.<br><br>
Te escribo por el pedido.<br><br>
Saludos.`}
            />
            <p className="tenue">
              Acá no hay párrafos: es un solo bloque de texto con agujeros. No
              podés darle <code>margin</code> ni <code>text-indent</code> a algo
              que no existe, el lector de pantalla no anuncia ningún corte, y el
              día que quieras cambiar la separación tenés que editar el texto.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Un p por párrafo">
            <Codigo
              codigo={`<p>Hola, cómo va.</p>
<p>Te escribo por el pedido.</p>
<p>Saludos.</p>`}
            />
            <p className="tenue">
              Tres bloques de verdad. La separación la decidís desde el CSS con
              una sola regla, y el día que la quieras más chica la cambiás en un
              solo lugar.
            </p>
          </Columna>
        </Comparacion>

        <Editor
          consigna="Cambiá el margin de p a 4px: el bloque de arriba obedece, el de abajo (hecho con br) ni se entera."
          html={`<h3>Con párrafos</h3>
<p>Primera idea.</p>
<p>Segunda idea.</p>

<h3>Con saltos de línea</h3>
Primera idea.<br><br>
Segunda idea.

<h3>Un uso legítimo del br</h3>
<p>
  Universidad Nacional<br>
  Av. Siempre Viva 742<br>
  B1878 Quilmes
</p>`}
          css={`p { margin: 22px 0; background: lightyellow; }`}
        />

        <Nota tipo="atencion" titulo="Un párrafo no puede contener bloques">
          <p>
            Si escribís un <code>&lt;div&gt;</code>, un <code>&lt;ul&gt;</code>{" "}
            o incluso otro <code>&lt;p&gt;</code> adentro de un párrafo, el
            navegador <strong>cierra el párrafo solo</strong> antes de abrirlo.
            El resultado no se parece a lo que escribiste y no hay ningún error
            en la consola: simplemente sale distinto.
          </p>
        </Nota>

        <Editor
          consigna="Mirá el borde punteado: el párrafo se corta antes del div y queda un tercer párrafo vacío. Sacá el div y se arregla solo."
          html={`<p>Antes del div.
  <div>Yo soy un bloque.</div>
  Después del div.
</p>`}
          css={`p { border: 2px dashed crimson; padding: 6px; }
div { background: lightyellow; }`}
        />

        <p>
          Cuando sí necesitás que se respeten los espacios tal cual los
          escribiste —código, arte ASCII, la salida de un comando— está{" "}
          <code>&lt;pre&gt;</code>. Y para un corte temático entre dos partes de
          un texto está <code>&lt;hr&gt;</code>, que no significa "una rayita"
          sino "acá cambia el tema". Si lo que querés es decorar, la línea la
          hacés con <code>border</code> desde{" "}
          <Link href="/css/bases">CSS</Link>.
        </p>

        <Editor
          solapas="html"
          consigna="Copiá el contenido del <pre> adentro de un <p> y compará: en el párrafo se aplasta todo en un renglón."
          html={`<pre>
function saludar(nombre) {
    return "Hola, " + nombre;
}
</pre>

<hr>

<p>Después del corte temático empieza otra cosa.</p>`}
        />
      </Seccion>

      <Seccion titulo="Énfasis que significa algo">
        <p>
          <code>&lt;strong&gt;</code> y <code>&lt;b&gt;</code> se ven idénticos
          (negrita), igual que <code>&lt;em&gt;</code> y <code>&lt;i&gt;</code>{" "}
          (itálica). La diferencia no está en cómo se ven sino en{" "}
          <strong>qué dicen</strong>, y eso importa el día que alguien que no ve
          la pantalla lee tu texto, o que querés cambiar el estilo sin tocar el
          contenido.
        </p>

        <ul>
          <li>
            <code>&lt;strong&gt;</code>: <strong>esto es importante</strong>,
            grave o urgente. Advertencias, plazos, datos que no se pueden pasar
            por alto.
          </li>
          <li>
            <code>&lt;em&gt;</code>: <em>énfasis de entonación</em>. Es la
            palabra que subirías de tono al leer en voz alta, y que cambia el
            sentido de la frase.
          </li>
          <li>
            <code>&lt;b&gt;</code>: destacado <b>sin</b> mayor importancia. Una
            palabra clave en un resumen, el nombre de un producto en una reseña.
          </li>
          <li>
            <code>&lt;i&gt;</code>: otra <i>voz</i> o registro. Términos en otro
            idioma, nombres científicos, pensamientos, un término técnico que
            recién se introduce.
          </li>
        </ul>

        <p>
          Lo de <code>&lt;em&gt;</code> no es teoría: mové la etiqueta de
          palabra y la frase quiere decir otra cosa.
        </p>

        <Vista
          html={`<p><em>Yo</em> no dije que él robó la plata.</p>
<p>Yo no dije que <em>él</em> robó la plata.</p>
<p>Yo no dije que él <em>robó</em> la plata.</p>
<p>Yo no dije que él robó la <em>plata</em>.</p>`}
          css={`p { margin: 4px 0; }
em { background: #fdf3e0; }`}
        />

        <p>
          Con eso alcanza para el 90% de los casos, pero el HTML tiene varias
          etiquetas más que te ahorran CSS y dicen algo de verdad. Probalas
          todas juntas:
        </p>

        <Editor
          consigna="Cambiá el <b> por un <strong> y el <i> por un <em>. No cambia nada a la vista: ese es justamente el punto."
          html={`<p>
  <strong>No apagues la máquina</strong> mientras actualiza.
</p>
<p>
  Probá el <b>Mate Listo 3000</b>, que en <i>latín</i> sería
  <i>Ilex paraguariensis instantanea</i>.
</p>
<p>
  Resultado de tu búsqueda: la <mark>yerba</mark> se guarda seca.
</p>
<p>
  Precio: <del>$4.500</del> <ins>$3.200</ins>
  <small>(promo hasta el viernes)</small>
</p>
<p>
  Nos vemos el <time datetime="2026-03-14">14 de marzo</time>,
  organiza la <abbr title="Universidad Nacional de Quilmes">UNQ</abbr>.
</p>
<p>
  Para guardar apretá <kbd>Ctrl</kbd> + <kbd>S</kbd> y corré
  <code>npm run build</code>.
</p>
<blockquote cite="https://example.org/manual">
  <p>Cualquier tecnología suficientemente avanzada es indistinguible de la magia.</p>
  <footer>— <cite>Arthur C. Clarke</cite></footer>
</blockquote>`}
          css={`abbr[title] { border-bottom: 1px dotted; cursor: help; }
kbd { border: 1px solid #999; border-radius: 4px; padding: 0 5px; font-size: 0.9em; }
blockquote { border-left: 4px solid #bcdcf5; margin-left: 0; padding-left: 12px; }`}
        />

        <Nota tipo="info" titulo="Un dato honesto">
          <p>
            Los lectores de pantalla más usados{" "}
            <strong>no anuncian por defecto</strong> el{" "}
            <code>&lt;strong&gt;</code> ni el <code>&lt;em&gt;</code>. Entonces,
            ¿para qué molestarse? Porque la semántica también la usan el modo
            lectura, los traductores automáticos, los buscadores y el próximo
            que lea tu código. Y porque el énfasis que de verdad no se puede
            perder se escribe con palabras, no con negrita:{" "}
            <em>"Atención: esto borra todo"</em> se entiende aunque el estilo
            desaparezca.
          </p>
        </Nota>

        <Nota tipo="atencion" titulo="Nunca uses una etiqueta por cómo se ve">
          <p>
            Poner <code>&lt;h4&gt;</code> porque "queda del tamaño justo", o{" "}
            <code>&lt;blockquote&gt;</code> porque "indenta lindo", es el error
            más común del principio. Elegí la etiqueta por lo que significa y
            después corregí el aspecto con CSS: eso es exactamente lo que hace
            la clase <code>tenue</code> de este sitio.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Listas: ul, ol y dl">
        <p>
          Tres listas, tres significados distintos. <code>&lt;ul&gt;</code>{" "}
          cuando el orden no importa (ingredientes, etiquetas, enlaces del
          menú). <code>&lt;ol&gt;</code> cuando el orden{" "}
          <strong>es información</strong> (pasos, ranking, resultados).{" "}
          <code>&lt;dl&gt;</code> para pares de término y descripción (un
          glosario, una ficha técnica, metadatos).
        </p>

        <p>
          El <code>&lt;ol&gt;</code> tiene tres atributos que casi nadie conoce
          y resuelven problemas reales: <code>start</code> para continuar una
          numeración cortada, <code>reversed</code> para contar al revés (un top
          5), <code>type</code> para numerar con letras o romanos, y{" "}
          <code>value</code> en un <code>&lt;li&gt;</code> suelto para saltar a
          un número.
        </p>

        <Editor
          solapas="html"
          consigna="Cambiá start a 10, sacá el reversed y probá type=&quot;I&quot; en la primera lista."
          html={`<h3>Pasos (continúa de la página anterior)</h3>
<ol start="4">
  <li>Calentar el agua a 80 grados</li>
  <li>Cebar el primero para uno mismo</li>
  <li>Pasar el mate a la derecha</li>
</ol>

<h3>Top 3 al revés</h3>
<ol reversed>
  <li>Bronce</li>
  <li>Plata</li>
  <li>Oro</li>
</ol>

<h3>Con letras, y un salto</h3>
<ol type="a">
  <li>Primera opción</li>
  <li>Segunda opción</li>
  <li value="10">Décima, porque sí</li>
  <li>La que sigue</li>
</ol>`}
        />

        <Nota tipo="atencion" titulo="La lista anidada va adentro del li">
          <p>
            Lo único que puede colgar directo de un <code>&lt;ul&gt;</code> o un{" "}
            <code>&lt;ol&gt;</code> son <code>&lt;li&gt;</code>. Una sublista no
            va entre dos <code>&lt;li&gt;</code>: va{" "}
            <strong>adentro</strong> del <code>&lt;li&gt;</code> del que
            depende, antes de cerrarlo.
          </p>
        </Nota>

        <Editor
          consigna="La lista de la derecha está mal anidada. Movele el </li> para que el <ul> de adentro quede dentro del item."
          html={`<h3>Bien</h3>
<ul>
  <li>Bebidas
    <ul>
      <li>Mate</li>
      <li>Café</li>
    </ul>
  </li>
  <li>Comida</li>
</ul>

<h3>Mal</h3>
<ul>
  <li>Bebidas</li>
  <ul>
    <li>Mate</li>
    <li>Café</li>
  </ul>
  <li>Comida</li>
</ul>`}
          css={`ul { background: #f3f6fa; padding: 6px 6px 6px 28px; }
ul ul { background: #fdf3e0; }`}
        />

        <p>
          La <code>&lt;dl&gt;</code> es la más olvidada y la más útil para
          fichas. Un <code>&lt;dt&gt;</code> puede tener varios{" "}
          <code>&lt;dd&gt;</code> (un término con dos acepciones) y varios{" "}
          <code>&lt;dt&gt;</code> pueden compartir un <code>&lt;dd&gt;</code>{" "}
          (dos sinónimos). Además es el único caso en que se permite envolver
          cada par en un <code>&lt;div&gt;</code>, que es lo que hace falta para
          acomodarla con <Link href="/css/grid">Grid</Link>.
        </p>

        <Editor
          consigna="Cambiá grid-template-columns a 1fr y fijate cómo la ficha pasa de dos columnas a lista apilada."
          html={`<dl>
  <div><dt>Procesador</dt><dd>8 núcleos</dd></div>
  <div><dt>Memoria</dt><dd>16 GB</dd></div>
  <div>
    <dt>Pantalla</dt>
    <dd>14 pulgadas</dd>
    <dd>1920 × 1080</dd>
  </div>
</dl>`}
          css={`dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; margin: 0; }
dl > div { display: contents; }
dt { font-weight: 700; color: #14538f; }
dd { margin: 0; }`}
        />

        <Nota tipo="info" titulo="Truco que vale oro">
          <p>
            Cuando le ponés <code>list-style: none</code> a una lista, Safari
            con VoiceOver <strong>deja de anunciarla como lista</strong> y quien
            escucha pierde el "lista de 5 elementos". Se arregla con un atributo:
          </p>
          <Codigo codigo={`<ul role="list" class="menu">`} />
          <p className="tenue">
            Por eso casi todos los menús de navegación del mundo son un{" "}
            <code>&lt;ul&gt;</code> sin viñetas: la lista está ahí para que se
            anuncie, aunque no se vea.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Enlaces">
        <p>
          El enlace es lo que convierte a un montón de documentos en "la web".
          Un <code>&lt;a&gt;</code> con <code>href</code> es focusable con Tab,
          se abre con Enter, se puede abrir en pestaña nueva con el botón del
          medio, se puede copiar y compartir. Un <code>&lt;div&gt;</code> con un{" "}
          <code>onclick</code> no hace nada de eso.
        </p>

        <p>El <code>href</code> acepta cuatro formas que vas a usar siempre:</p>

        <Codigo
          archivo="las cuatro formas de href"
          codigo={`<!-- 1. Absoluta: a otro sitio. Va completa, con https:// -->
<a href="https://developer.mozilla.org/es/">documentación de MDN</a>

<!-- 2. Relativa a la raíz: adentro de tu propio sitio. Empieza con / -->
<a href="/css/flexbox">la lección de Flexbox</a>

<!-- 3. Relativa al archivo actual: depende de dónde estás parado -->
<a href="../contacto.html">contacto</a>

<!-- 4. Ancla: a un id de esta misma página -->
<a href="#precios">ver los precios</a>`}
        />

        <p>
          El ancla es el que más se usa mal: necesita que{" "}
          <strong>exista un elemento con ese id exacto</strong> en la página.
          Probalo acá (la vista tiene alto fijo justamente para que se vea el
          salto):
        </p>

        <Editor
          alto={210}
          consigna='Agregá un cuarto ítem al índice apuntando a "#envios" y ponele id="envios" al último h2.'
          html={`<h1>Preguntas frecuentes</h1>
<nav>
  <ul>
    <li><a href="#pagos">Formas de pago</a></li>
    <li><a href="#cambios">Cambios</a></li>
    <li><a href="#garantia">Garantía</a></li>
  </ul>
</nav>

<h2 id="pagos">Formas de pago</h2>
<p>Tarjeta, transferencia o efectivo.</p>

<h2 id="cambios">Cambios</h2>
<p>Dentro de los 30 días, con el ticket.</p>

<h2 id="garantia">Garantía</h2>
<p>Un año contra defectos de fábrica.</p>

<h2>Envíos</h2>
<p>A todo el país.</p>

<p><a href="#">Volver arriba</a></p>`}
          css={`h2 { scroll-margin-top: 10px; }
nav ul { margin: 0; }`}
        />

        <p>
          Después están los <code>href</code> que no llevan a una página:{" "}
          <code>mailto:</code> abre el cliente de correo,{" "}
          <code>tel:</code> llama desde el celular, y{" "}
          <code>download</code> le dice al navegador que baje el archivo en vez
          de abrirlo.
        </p>

        <Codigo
          archivo="enlaces que no navegan"
          codigo={`<!-- mailto admite asunto y cuerpo ya escritos -->
<a href="mailto:hola@ejemplo.com?subject=Consulta%20del%20TP">
  hola@ejemplo.com
</a>

<!-- tel: siempre con el código de país, sin espacios ni guiones -->
<a href="tel:+5491122334455">+54 9 11 2233-4455</a>

<!-- download: el nombre con el que se guarda -->
<a href="/archivos/programa.pdf" download="programa-2026.pdf">
  Programa de la materia (PDF, 240 kB)
</a>`}
        />

        <h3>target=&quot;_blank&quot; y su acompañante obligatorio</h3>

        <p>
          <code>target=&quot;_blank&quot;</code> abre el enlace en una pestaña
          nueva. Tiene dos letras chicas. La primera es de seguridad: la página
          que se abre recibe una referencia a la tuya en{" "}
          <code>window.opener</code> y podría cambiarte de dirección a un sitio
          falso. Por eso va siempre con{" "}
          <code>rel=&quot;noopener noreferrer&quot;</code>.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Pestaña nueva a secas">
            <Codigo
              codigo={`<a href="https://otro-sitio.com"
   target="_blank">
  Ver el catálogo
</a>`}
            />
            <p className="tenue">
              Le entregás <code>window.opener</code> al otro sitio, y quien
              navega con teclado o lector de pantalla se encuentra de golpe en
              una pestaña nueva sin que nada se lo haya avisado.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Con rel y con aviso">
            <Codigo
              codigo={`<a href="https://otro-sitio.com"
   target="_blank"
   rel="noopener noreferrer">
  Ver el catálogo
  <span> (abre en pestaña nueva)</span>
</a>`}
            />
            <p className="tenue">
              <code>noopener</code> corta la referencia,{" "}
              <code>noreferrer</code> además no le cuenta al otro sitio de dónde
              venís, y el texto avisa lo que va a pasar.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="info" titulo="Los navegadores modernos ya lo hacen solos">
          <p>
            Desde 2021 Chrome, Firefox y Safari aplican{" "}
            <code>noopener</code> de forma implícita cuando ven{" "}
            <code>target=&quot;_blank&quot;</code>. Se sigue escribiendo igual:
            cuesta veinte caracteres y te cubre en navegadores viejos, en
            WebViews de aplicaciones y en cualquier auditoría de seguridad, que
            lo va a marcar igual.
          </p>
        </Nota>

        <h3>El texto del enlace es el enlace</h3>

        <p>
          Esta es la parte que más se ignora y la que más cambia las cosas.
          Quien navega con lector de pantalla puede pedir{" "}
          <strong>la lista de todos los enlaces de la página</strong>, fuera de
          contexto, para moverse rápido. Mirá cómo suena esa lista en las dos
          versiones de la misma página:
        </p>

        <Vista
          html={`<div class="panel">
  <p class="titulo">Lista de enlaces · versión A</p>
  <ol>
    <li>hacé click acá</li>
    <li>hacé click acá</li>
    <li>más info</li>
    <li>más info</li>
    <li>leer más</li>
    <li>https://sitio.com/docs/2026/03/programa-final-v2.pdf</li>
  </ol>
</div>

<div class="panel ok">
  <p class="titulo">Lista de enlaces · versión B</p>
  <ol>
    <li>Programa de la materia (PDF)</li>
    <li>Cronograma de parciales</li>
    <li>Inscribirse a la cursada</li>
    <li>Reglamento de promoción</li>
    <li>Contactar a la cátedra</li>
    <li>Mesa de examen de marzo</li>
  </ol>
</div>`}
          css={`body { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; }
.panel { border: 1px solid #d3e0f0; border-top: 4px solid #b4243a; border-radius: 10px; padding: 10px 14px; }
.panel.ok { border-top-color: #0f7a52; }
.titulo { font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #55697f; margin: 0 0 6px; }
ol { margin: 0; padding-left: 20px; font-size: 0.9rem; }
li { margin-bottom: 3px; }`}
        />

        <p>
          En la versión A no se puede elegir nada: hay que volver al texto de
          alrededor para saber qué es cada cosa, y la última es una URL cruda que
          el lector deletrea entera. En la B cada enlace{" "}
          <strong>se entiende solo</strong>.
        </p>

        <ul>
          <li>
            Escribí en el enlace{" "}
            <strong>a dónde lleva, no qué tenés que hacer con el mouse</strong>.
            "Hacé click acá" no le sirve ni siquiera a quien usa mouse.
          </li>
          <li>
            Que dos enlaces con el mismo texto lleven al mismo lado. Si van a
            lugares distintos, diferenciá el texto.
          </li>
          <li>
            Avisá el formato y el peso cuando no es una página web:{" "}
            <em>Programa (PDF, 240 kB)</em>.
          </li>
          <li>
            El atributo <code>title</code>{" "}
            <strong>no arregla un texto malo</strong>: no se ve en celulares, no
            aparece con teclado y muchos lectores de pantalla lo ignoran.
          </li>
          <li>
            Nunca le saques el subrayado a un enlace que está en medio de un
            párrafo dejando solo el color: quien no distingue bien los colores no
            lo ve.
          </li>
        </ul>

        <Nota tipo="atencion" titulo="Enlace o botón">
          <p>
            La regla es de una línea:{" "}
            <strong>si navega, es un <code>&lt;a href&gt;</code>; si hace algo
            en esta misma página, es un <code>&lt;button&gt;</code></strong>
            . Un <code>&lt;a href=&quot;#&quot;&gt;</code> que abre un menú es un
            botón disfrazado, y se nota apenas alguien lo abre en una pestaña
            nueva y le aparece la misma página vacía.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Imágenes">
        <p>
          Una imagen mínima necesita dos cosas: <code>src</code>, la dirección
          del archivo, y <code>alt</code>, el texto que ocupa su lugar cuando la
          imagen no está. <code>&lt;img&gt;</code> es una etiqueta vacía: no
          lleva cierre.
        </p>

        <p>
          El <code>alt</code> no es un adorno ni un pie de foto: es{" "}
          <strong>la imagen escrita</strong>. Lo escucha quien usa lector de
          pantalla, lo lee el buscador, y aparece en pantalla cuando el archivo
          no carga. Borrale el <code>src</code> a la primera imagen del editor y
          vas a ver aparecer el texto.
        </p>

        <Editor
          solapas="html"
          consigna="Rompé el src de la primera imagen (cambiale una letra) y mirá qué queda en su lugar. Después rompé el de la tercera."
          html={`<p>Con alt bien escrito:</p>
<img src="${FOTO}" alt="Sol sobre una cadena de montañas azules" width="320" height="200">

<p>Con alt vacío (decorativa: el lector la saltea):</p>
<img src="${ADORNO}" alt="" width="22" height="22">

<p>Sin alt (mal: el lector lee el nombre del archivo):</p>
<img src="${GRAFICO}" width="300" height="180">`}
        />

        <h3>Cómo se escribe un alt</h3>

        <p>
          No hay un alt correcto para una imagen: hay un alt correcto{" "}
          <strong>para esa imagen en ese lugar</strong>. La pregunta que
          funciona siempre es: <em>si tapo la imagen, ¿qué le tengo que contar a
          alguien para que no se pierda nada?</em>
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="alt que no sirve">
            <Codigo
              codigo={`<img src="grafico.png" alt="gráfico">
<img src="foto.jpg" alt="imagen de una foto">
<img src="logo.svg" alt="logo.svg">
<img src="deco.png" alt="línea decorativa">
<img src="boton.png" alt="botón">
<img src="p.jpg" alt="perro perro cachorro
  cachorros comprar cachorro barato">`}
            />
          </Columna>
          <Columna tono="bien" titulo="alt que sí">
            <Codigo
              codigo={`<img src="grafico.png"
  alt="Las ventas subieron de 20 a 95
       unidades entre enero y abril">
<img src="foto.jpg" alt="Mujer cebando mate">
<img src="logo.svg" alt="Universidad de Quilmes">
<img src="deco.png" alt="">
<a href="/carrito">
  <img src="boton.png" alt="Ver el carrito">
</a>`}
            />
          </Columna>
        </Comparacion>

        <ul>
          <li>
            No empieza con "imagen de" ni "foto de": el lector de pantalla ya
            anunció que es una imagen.
          </li>
          <li>
            Si la imagen es <strong>puramente decorativa</strong>, poné{" "}
            <code>alt=&quot;&quot;</code> (vacío, pero presente): así se saltea.
            Sin el atributo, en cambio, muchos lectores leen la URL entera.
          </li>
          <li>
            Si la imagen <strong>es el enlace o el botón</strong>, el{" "}
            <code>alt</code> describe la acción, no el dibujo:{" "}
            <em>Ver el carrito</em>, no <em>ícono de changuito</em>.
          </li>
          <li>
            Si la imagen es un gráfico o un dato,{" "}
            <strong>contá el dato</strong>, no la forma del gráfico.
          </li>
          <li>
            Nada de meter palabras clave para SEO: se nota, molesta y hoy hasta
            penaliza.
          </li>
        </ul>

        <h3>width, height y el salto de la página</h3>

        <p>
          Los atributos <code>width</code> y <code>height</code> van{" "}
          <strong>sin unidad</strong> y con las medidas reales del archivo. No
          están para estirar la imagen: están para que el navegador{" "}
          <strong>sepa la proporción antes de descargarla</strong> y reserve el
          hueco. Sin ellos, el texto de abajo salta hacia abajo justo cuando la
          imagen termina de cargar, y vos ya habías apoyado el dedo en el botón.
        </p>

        <Editor
          consigna="Las dos imágenes tienen el src roto. Sacale width y height a la de la izquierda y fijate cómo se le desarma el lugar."
          html={`<div class="fila">
  <figure>
    <img src="rota.png" alt="Gráfico de ventas" width="300" height="180">
    <figcaption>Con width y height: el hueco está reservado</figcaption>
  </figure>
  <figure>
    <img src="rota.png" alt="Gráfico de ventas">
    <figcaption>Sin ellos: la página se acomoda después</figcaption>
  </figure>
</div>`}
          css={`.fila { display: flex; gap: 16px; align-items: flex-start; }
figure { margin: 0; flex: 1; }
img { max-width: 100%; height: auto; background: #eef3fa; border: 1px dashed #b4243a; }
figcaption { font-size: 0.8rem; color: #55697f; margin-top: 6px; }`}
        />

        <Nota tipo="atencion" titulo="La regla de CSS que va con esto">
          <p>
            Si ponés <code>width</code> y <code>height</code> en el HTML y
            después en CSS escribís solamente{" "}
            <code>img &#123; max-width: 100%; &#125;</code>, la imagen se achica
            de ancho pero conserva el alto del atributo y sale deformada. Van
            siempre juntos:
          </p>
          <Codigo
            codigo={`img {
  max-width: 100%;
  height: auto;   /* sin esto, se deforma al achicarse */
}`}
          />
        </Nota>

        <h3>loading, decoding y las variantes</h3>

        <Codigo
          archivo="atributos que casi no cuestan nada"
          codigo={`<!-- lazy: no la descarga hasta que está por entrar en pantalla.
     NO se lo pongas a la imagen principal de arriba de todo:
     ahí la retrasa y empeora la carga percibida. -->
<img src="galeria-7.jpg" alt="..." width="600" height="400"
     loading="lazy" decoding="async">

<!-- srcset: varias resoluciones, el navegador elige según la pantalla -->
<img src="foto-800.jpg"
     srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1600.jpg 1600w"
     sizes="(max-width: 600px) 100vw, 600px"
     alt="Vista del campus" width="800" height="500">

<!-- picture: formatos nuevos con respaldo, o recortes distintos por pantalla -->
<picture>
  <source srcset="foto.avif" type="image/avif">
  <source srcset="foto.webp" type="image/webp">
  <img src="foto.jpg" alt="Vista del campus" width="800" height="500">
</picture>`}
        />

        <h3>figure y figcaption</h3>

        <p>
          <code>&lt;figure&gt;</code> agrupa un contenido{" "}
          <strong>autocontenido</strong> —una imagen, un gráfico, un fragmento
          de código, una tabla— con su pie en{" "}
          <code>&lt;figcaption&gt;</code>. La diferencia con el{" "}
          <code>alt</code> es quién los ve: el pie lo lee{" "}
          <strong>todo el mundo</strong>, el <code>alt</code> solo quien no ve la
          imagen. Por eso no se repiten: el <code>alt</code> describe, el pie
          aporta contexto, fuente o interpretación.
        </p>

        <Editor
          consigna="Mové el <figcaption> al principio del <figure>: también es válido, y el pie pasa a ser un encabezado de la figura."
          html={`<figure>
  <img src="${GRAFICO}" alt="Las ventas suben de 20 a 95 unidades entre enero y abril, con una caída en mayo" width="300" height="180">
  <figcaption>
    <strong>Figura 1.</strong> Ventas mensuales del primer semestre.
    Fuente: sistema interno, mayo de 2026.
  </figcaption>
</figure>`}
          css={`figure { margin: 0; max-width: 340px; }
img { max-width: 100%; height: auto; border-radius: 8px; }
figcaption { font-size: 0.85rem; color: #55697f; margin-top: 8px; }`}
        />

        <h3>img contra background-image</h3>

        <p>
          Las dos ponen una imagen en la pantalla, pero no significan lo mismo, y
          la decisión se toma con una sola pregunta:{" "}
          <strong>
            si la imagen no estuviera, ¿faltaría información?
          </strong>
        </p>

        <Comparacion>
          <Columna tono="bien" titulo="&lt;img&gt;: es contenido">
            <p className="tenue">
              La foto del producto, el gráfico del informe, la portada del libro.
              Tiene <code>alt</code>, aparece en la búsqueda de imágenes, se
              imprime, se puede guardar con el botón derecho y el navegador
              puede priorizar su carga.
            </p>
          </Columna>
          <Columna tono="bien" titulo="background-image: es decoración">
            <p className="tenue">
              La textura del encabezado, el degradado detrás del hero, un ícono
              repetido. No tiene <code>alt</code> porque no hay nada que contar,
              y a cambio te da <code>cover</code>, <code>repeat</code> y
              posicionamiento fino desde el CSS.
            </p>
          </Columna>
        </Comparacion>

        <Editor
          consigna="Ponele display:none a la regla de background en el CSS: el texto sigue entendiéndose. Hacé lo mismo tapando el <img> y fijate qué se pierde."
          html={`<div class="hero">
  <h3>Contenido contra decoración</h3>
</div>

<figure>
  <img src="${GRAFICO}" alt="Ventas de enero a mayo: 20, 55, 95 y 45 unidades" width="300" height="180">
  <figcaption>Esto sí es información.</figcaption>
</figure>`}
          css={`.hero {
  background-image: url("${ADORNO}");
  background-repeat: repeat;
  padding: 24px 16px;
  border-radius: 10px;
  margin-bottom: 14px;
}
.hero h3 { margin: 0; }
figure { margin: 0; }
img { max-width: 100%; height: auto; }
figcaption { font-size: 0.85rem; color: #55697f; }`}
        />

        <Nota tipo="info" titulo="Por qué los ejemplos tienen un src tan raro">
          <p>
            El <code>src</code> larguísimo que empieza con{" "}
            <code>data:image/svg+xml</code> es la imagen entera escrita adentro
            del atributo, en vez de estar en un archivo aparte. Se llama{" "}
            <em>data URI</em> y sirve para íconos muy chiquitos o, como acá, para
            que un ejemplo funcione sin depender de ningún archivo. En una página
            de verdad ponés la ruta de siempre:{" "}
            <code>src=&quot;/img/grafico.png&quot;</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Entidades y caracteres especiales">
        <p>
          Tres caracteres tienen significado para el parser de HTML y por eso hay
          que escribirlos con su nombre cuando los querés como texto:
        </p>

        <ul>
          <li>
            <code>&amp;lt;</code> para <code>&lt;</code> — si no, el navegador
            cree que arrancás una etiqueta.
          </li>
          <li>
            <code>&amp;amp;</code> para <code>&amp;</code> — porque es el
            arranque de toda entidad.
          </li>
          <li>
            <code>&amp;gt;</code> para <code>&gt;</code> — no siempre es
            obligatorio, pero se escribe igual por simetría y para evitar
            sorpresas.
          </li>
          <li>
            Adentro de un atributo, además, la comilla que usaste para abrirlo:{" "}
            <code>&amp;quot;</code> o <code>&amp;#39;</code>.
          </li>
        </ul>

        <p>
          Después están las de conveniencia. La más útil es{" "}
          <code>&amp;nbsp;</code>, un espacio{" "}
          <strong>por el que la línea no se corta</strong>: sirve para que
          &quot;10 kg&quot;, &quot;Sr. Pérez&quot; o &quot;página 7&quot; no
          queden partidos entre dos renglones.
        </p>

        <Editor
          consigna="Angostá la ventana del resultado o alargá los textos: el primer bloque parte los números, el segundo no."
          html={`<h3>Sin nbsp</h3>
<p>El paquete pesa 10 kg y lo firmó el Sr. Pérez en la página 7 del acta.</p>

<h3>Con nbsp</h3>
<p>El paquete pesa 10&nbsp;kg y lo firmó el Sr.&nbsp;Pérez en la página&nbsp;7 del acta.</p>

<h3>Etiquetas escritas como texto</h3>
<p>Para abrir un párrafo se escribe &lt;p class="nota"&gt; y se cierra con &lt;/p&gt;.</p>
<p>Una empresa: Pérez &amp; Hijos. Un símbolo: &copy; 2026. Un guión largo: &mdash;</p>
<p>Doble escapado: si escribís &amp;amp;lt; en el archivo, en pantalla aparece &amp;lt;</p>`}
          css={`p { max-width: 260px; background: #eef3fa; padding: 6px; }`}
        />

        <Nota tipo="atencion" titulo="&amp;nbsp; no es para indentar">
          <p>
            El abuso clásico es poner diez <code>&amp;nbsp;</code> seguidos para
            separar dos cosas. Eso no es un espacio: es texto, y el lector de
            pantalla lo puede anunciar o pegar palabras. La separación entre
            elementos es trabajo de <code>margin</code>,{" "}
            <code>padding</code> o <Link href="/css/flexbox">Flexbox</Link>.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Los acentos no necesitan entidades">
          <p>
            Con <code>&lt;meta charset=&quot;utf-8&quot;&gt;</code> en el{" "}
            <code>&lt;head&gt;</code> —ver{" "}
            <Link href="/html/bases">Cómo funciona la web</Link>— escribís{" "}
            <em>á</em>, <em>ñ</em>, <em>€</em> o <em>🙂</em> directo y salen
            bien. <code>&amp;aacute;</code> es de los años noventa. Si ves{" "}
            <code>Ã¡</code> en pantalla, no te falta una entidad: te falta el{" "}
            <code>charset</code>, o el archivo no está guardado en UTF-8.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Ordená la jerarquía del artículo"
          pista={
            <div>
              <p>
                Ignorá los tamaños y leé solo el contenido. Preguntate:{" "}
                <em>¿de qué se trata TODO el artículo?</em> Eso es el{" "}
                <code>&lt;h1&gt;</code>, y hay uno solo.
              </p>
              <p>
                Después marcá los tres bloques grandes: son los{" "}
                <code>&lt;h2&gt;</code>. Lo que depende de cada bloque es{" "}
                <code>&lt;h3&gt;</code>. Y ojo con el último: "Compartí esta
                nota" no es un título, es una llamada a la acción.
              </p>
              <p>
                Para chequearte: leídos en orden, los niveles no pueden saltar
                más de uno hacia abajo.
              </p>
            </div>
          }
          solucion={
            <div>
              <Editor
                solapas="html"
                consigna="Así queda el índice: un h1, tres h2 y los h3 colgando de su h2."
                html={`<h1>Cómo preparar un buen mate</h1>
<p>Una guía corta para dejar de tomar mate lavado.</p>

<h2>Lo que necesitás</h2>
<h3>La yerba</h3>
<p>Con palo aguanta más cebadas; sin palo rinde menos pero es más intensa.</p>
<h3>El agua</h3>
<p>Entre 75 y 80 grados. Si hierve, quema la yerba y amarga.</p>

<h2>Paso a paso</h2>
<h3>Armar la montañita</h3>
<p>Llená tres cuartos del mate y tapalo con la mano para inclinarlo.</p>
<h3>Cebar el primero</h3>
<p>El primero se lo toma quien ceba: sale fuerte y con polvo.</p>

<h2>Errores frecuentes</h2>
<h3>Mover la bombilla</h3>
<p>Se tapa y se acabó el mate.</p>

<p class="llamada"><strong>Compartí esta nota</strong></p>`}
              />
              <p>
                Los tres cambios que importan: el <code>&lt;h3&gt;</code> del
                título pasó a <code>&lt;h1&gt;</code> y el{" "}
                <code>&lt;h1&gt;</code> del medio bajó a{" "}
                <code>&lt;h2&gt;</code> (había dos <code>&lt;h1&gt;</code>); los{" "}
                <code>&lt;h4&gt;</code> y <code>&lt;h5&gt;</code> se
                normalizaron a <code>&lt;h3&gt;</code> (no se saltean niveles); y
                el "Compartí esta nota" dejó de ser encabezado, porque no abre
                ninguna sección. Si lo querés grande y en negrita, eso es CSS.
              </p>
            </div>
          }
        >
          <p>
            Este artículo se ve pasable pero su índice es un desastre: hay dos{" "}
            <code>&lt;h1&gt;</code>, hay saltos de nivel y hay un encabezado que
            no es un título. Arreglá <strong>solamente los niveles</strong>, sin
            tocar el texto ni agregar CSS.
          </p>
          <Editor
            solapas="html"
            consigna="Cambiá los números de las etiquetas hasta que el índice tenga sentido. No muevas ni un párrafo de lugar."
            html={`<h3>Cómo preparar un buen mate</h3>
<p>Una guía corta para dejar de tomar mate lavado.</p>

<h2>Lo que necesitás</h2>
<h4>La yerba</h4>
<p>Con palo aguanta más cebadas; sin palo rinde menos pero es más intensa.</p>
<h5>El agua</h5>
<p>Entre 75 y 80 grados. Si hierve, quema la yerba y amarga.</p>

<h1>Paso a paso</h1>
<h4>Armar la montañita</h4>
<p>Llená tres cuartos del mate y tapalo con la mano para inclinarlo.</p>
<h6>Cebar el primero</h6>
<p>El primero se lo toma quien ceba: sale fuerte y con polvo.</p>

<h2>Errores frecuentes</h2>
<h5>Mover la bombilla</h5>
<p>Se tapa y se acabó el mate.</p>

<h4>Compartí esta nota</h4>`}
          />
        </Desafio>

        <Desafio
          titulo="2. La nota del club"
          pista={
            <div>
              <p>Hay siete problemas. Buscalos en este orden:</p>
              <ul>
                <li>
                  ¿Cuántos párrafos de verdad hay? ¿Y cuántos parecen párrafos?
                </li>
                <li>
                  Leé en voz alta <strong>solo</strong> los textos de los tres
                  enlaces, sin el resto. ¿Se entienden?
                </li>
                <li>
                  ¿Qué le falta al enlace que abre en pestaña nueva, además del
                  aviso?
                </li>
                <li>
                  Tapá la imagen con la mano: ¿qué información se perdió y dónde
                  debería estar escrita?
                </li>
                <li>
                  La lista de requisitos: ¿el orden importa? ¿Y está armada con
                  una lista?
                </li>
              </ul>
            </div>
          }
          solucion={
            <div>
              <Editor
                solapas="html"
                consigna="Compará renglón por renglón con la versión rota. Probá romperle el src a la imagen: ahora el alt cuenta algo."
                html={`<h2>Torneo de ajedrez 2026</h2>

<p>Ya está abierta la inscripción al torneo anual del club.</p>
<p>Las partidas arrancan el sábado a las 14.</p>

<figure>
  <img src="${FOTO}" alt="El salón del club con ocho mesas de ajedrez preparadas"
       width="320" height="200" loading="lazy">
  <figcaption>El salón durante la edición 2025.</figcaption>
</figure>

<p>Para anotarte necesitás:</p>
<ul>
  <li>Ser socio con la cuota al día</li>
  <li>Traer tu propio reloj</li>
  <li>Confirmar antes del jueves</li>
</ul>

<p>
  Podés leer el
  <a href="/reglamento.pdf">reglamento del torneo (PDF, 180 kB)</a>,
  consultar el
  <a href="https://fada.org.ar/ranking" target="_blank"
     rel="noopener noreferrer">ranking nacional de la FADA
     <span class="aviso">(abre en pestaña nueva)</span></a>
  o escribirnos a
  <a href="mailto:ajedrez@club.org.ar">ajedrez@club.org.ar</a>.
</p>`}
              />
              <ol>
                <li>
                  Los <code>&lt;br&gt;&lt;br&gt;</code> pasaron a ser dos{" "}
                  <code>&lt;p&gt;</code>.
                </li>
                <li>
                  Los tres "hacé click acá" ahora dicen a dónde van, y el PDF
                  avisa formato y peso.
                </li>
                <li>
                  El <code>target=&quot;_blank&quot;</code> ganó su{" "}
                  <code>rel=&quot;noopener noreferrer&quot;</code> y un aviso
                  visible.
                </li>
                <li>
                  La imagen tiene <code>alt</code> descriptivo,{" "}
                  <code>width</code> y <code>height</code> para reservar el
                  lugar, y <code>loading=&quot;lazy&quot;</code> porque no está
                  arriba de todo.
                </li>
                <li>
                  El pie de foto quedó en un{" "}
                  <code>&lt;figcaption&gt;</code> adentro de un{" "}
                  <code>&lt;figure&gt;</code>: es un dato que le sirve a todo el
                  mundo, no solo a quien no ve la imagen. Fijate que el{" "}
                  <code>alt</code> y el pie <strong>no dicen lo mismo</strong>.
                </li>
                <li>
                  Los requisitos son una <code>&lt;ul&gt;</code> de verdad: el
                  orden no importa, así que no va <code>&lt;ol&gt;</code>. El
                  lector de pantalla ahora anuncia "lista de 3 elementos".
                </li>
                <li>
                  El correo dejó de ser texto suelto y es un{" "}
                  <code>mailto:</code> en el que se puede hacer click.
                </li>
              </ol>
            </div>
          }
        >
          <p>
            Esta nota se ve bien y está mal por dentro. Encontrá los{" "}
            <strong>siete problemas</strong> y arreglalos sin cambiar lo que
            dice. Podés editarla acá mismo.
          </p>
          <Editor
            solapas="html"
            consigna="Arreglala acá. Cuando termines, abrí la solución y compará."
            html={`<h2>Torneo de ajedrez 2026</h2>

Ya está abierta la inscripción al torneo anual del club.<br><br>
Las partidas arrancan el sábado a las 14.<br><br>

<img src="${FOTO}" alt="foto">
<p>El salón durante la edición 2025.</p>

<p>Para anotarte necesitás:</p>
<p>- Ser socio con la cuota al día<br>
- Traer tu propio reloj<br>
- Confirmar antes del jueves</p>

<p>
  Para ver el reglamento <a href="/reglamento.pdf">hacé click acá</a>,
  para el ranking nacional <a href="https://fada.org.ar/ranking"
  target="_blank">hacé click acá</a> y para escribirnos
  <a href="#">hacé click acá</a>: ajedrez@club.org.ar
</p>`}
          />
        </Desafio>

        <Desafio
          titulo="3. ¿Qué alt le ponés?"
          pista={
            <p>
              Para cada caso preguntate dos cosas:{" "}
              <em>¿qué pasa si tapo la imagen?</em> y{" "}
              <em>¿el texto de alrededor ya lo dice?</em> Si la respuesta a la
              segunda es sí, el <code>alt</code> va vacío. Y si la imagen{" "}
              <strong>es</strong> el enlace, el <code>alt</code> tiene que decir
              a dónde lleva.
            </p>
          }
          solucion={
            <div>
              <Codigo
                archivo="uno por uno"
                codigo={`<!-- a) La imagen es el enlace: el alt es el destino, no el dibujo. -->
<a href="/"><img src="logo.svg" alt="Inicio · Club Social"></a>

<!-- b) El pie ya dice todo: si el alt repite, se escucha dos veces.
        Igual conviene describir lo que se VE, que el pie no cuenta. -->
<figure>
  <img src="equipo.jpg" alt="Once jugadoras formadas antes del partido">
  <figcaption>El plantel 2025 antes de la final.</figcaption>
</figure>

<!-- c) Decorativa: alt presente y vacío para que se saltee. -->
<img src="ondas.svg" alt="">

<!-- d) El dato está en la imagen: hay que escribirlo.
        Si es muy largo, poné un resumen en el alt y la tabla completa
        al lado, con <figcaption> o un enlace. -->
<img src="grafico.png"
     alt="Las inscripciones pasaron de 120 en 2023 a 310 en 2026">

<!-- e) Captura de pantalla en un instructivo: describí la ACCIÓN,
        que es para lo que está la captura. -->
<img src="paso3.png"
     alt="El botón Guardar, abajo a la derecha del formulario">`}
              />
              <p>
                La trampa está en (b) y en (d). En (b) mucha gente copia el pie
                adentro del <code>alt</code>: quien escucha la página recibe la
                misma frase dos veces seguidas. En (d) es tentador poner{" "}
                <code>alt=&quot;gráfico de barras&quot;</code>, que describe la
                forma y no comunica ni un dato.
              </p>
            </div>
          }
        >
          <p>
            Escribí el <code>alt</code> de estas cinco imágenes. Ninguna tiene
            una única respuesta correcta, pero todas tienen varias equivocadas.
          </p>
          <ol>
            <li>El logo del club, arriba, que es el enlace a la página de inicio.</li>
            <li>
              Una foto del equipo dentro de un <code>&lt;figure&gt;</code> cuyo
              pie ya dice "El plantel 2025 antes de la final".
            </li>
            <li>Una onda decorativa que separa dos secciones.</li>
            <li>
              Un gráfico de barras que muestra que las inscripciones pasaron de
              120 en 2023 a 310 en 2026.
            </li>
            <li>
              Una captura de pantalla en un instructivo, donde se ve el botón
              "Guardar" abajo a la derecha.
            </li>
          </ol>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
