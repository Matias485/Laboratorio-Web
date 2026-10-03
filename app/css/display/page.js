import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "La propiedad display" };

export default function Pagina() {
  return (
    <Leccion
      slug="/css/display"
      titulo="La propiedad display"
      resumen="block, inline, inline-block, none y el flujo normal del documento. La base de todo lo demás."
    >
      <Seccion titulo="El flujo normal del documento">
        <p>
          Antes de que escribas una sola línea de CSS, el navegador ya acomodó
          todo. Ese acomodo por defecto se llama <strong>flujo normal</strong>, y
          funciona con dos reglas muy simples:
        </p>

        <ul>
          <li>
            Las cajas <strong>de bloque</strong> se apilan una debajo de otra y
            cada una ocupa <em>todo el ancho disponible</em> de su contenedor,
            aunque su contenido sea una sola letra.
          </li>
          <li>
            Las cajas <strong>en línea</strong> se acomodan una al lado de la
            otra, como si fueran palabras de un párrafo, y cuando no entran más
            saltan al renglón siguiente.
          </li>
        </ul>

        <p>
          Por eso un <code>&lt;div&gt;</code> ocupa todo el ancho y un{" "}
          <code>&lt;span&gt;</code> mide lo que mide su texto: no es magia de la
          etiqueta, es el valor de <code>display</code> que el navegador les da
          por defecto en su hoja de estilos interna. Y ese valor lo podés
          cambiar: <code>display</code> es la propiedad que decide{" "}
          <strong>qué tipo de caja genera un elemento</strong>.
        </p>

        <Editor
          alto={200}
          consigna="Agregale width: 120px; height: 40px; a la regla .caja y fijate cuál de las dos parejas obedece."
          html={`<div class="caja">soy un div</div>
<div class="caja">otro div</div>

<span class="caja">soy un span</span>
<span class="caja">otro span</span>`}
          css={`.caja {
  background: gold;
  border: 2px solid #b8860b;
}`}
        />

        <Nota tipo="info" titulo="La etiqueta no define el layout, lo sugiere">
          <p>
            Elegí la etiqueta por lo que <em>significa</em> (de eso habla{" "}
            <Link href="/html/semantica">HTML semántico</Link>) y después
            arreglá cómo se ve con <code>display</code>. Un{" "}
            <code>&lt;nav&gt;</code> con <code>display: flex</code> sigue siendo
            una navegación para un lector de pantalla; un{" "}
            <code>&lt;div&gt;</code> con aspecto de navegación, no.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="block, inline e inline-block">
        <p>
          Los tres valores que vas a escribir el 90% del tiempo. La diferencia
          entre ellos se resume en tres preguntas: ¿corta la línea?, ¿le podés
          fijar el tamaño?, ¿empuja a los vecinos de arriba y de abajo?
        </p>

        <Editor
          alto={320}
          consigna="Los tres elementos amarillos tienen el mismo width, height y margin. Mirá cuál los respeta. Después cambiá .es-inline-block por display: block y observá el salto de renglón."
          html={`<p>Texto antes <span class="etiqueta">inline</span> texto después.</p>

<p>Texto antes <span class="etiqueta es-inline-block">inline-block</span> texto después.</p>

<p>Texto antes <span class="etiqueta es-block">block</span> texto después.</p>`}
          css={`.etiqueta {
  background: gold;
  border: 2px solid #b8860b;
  /* Las tres propiedades que separan los valores entre sí: */
  width: 160px;
  height: 46px;
  margin: 28px;
  padding: 4px;
}

.es-inline-block { display: inline-block; }
.es-block        { display: block; }

/* Solo para ver dónde termina cada párrafo. */
p { background: #eef3fa; margin: 0 0 6px; }`}
        />

        <p>
          El <code>inline</code> ignora el <code>width</code>, ignora el{" "}
          <code>height</code> y —lo más traicionero— ignora el margen de arriba y
          de abajo: no separa nada. El <code>padding</code> vertical sí lo dibuja,
          pero <strong>se le monta encima a los renglones vecinos</strong> en vez
          de empujarlos. Por eso un enlace con <code>padding: 12px</code> te
          arruina el interlineado de un párrafo.
        </p>

        <Vista
          alto={320}
          html={`<div class="scroll-x"><table>
  <thead>
    <tr>
      <th>display</th>
      <th>¿corta la línea?</th>
      <th>width / height</th>
      <th>margen vertical</th>
      <th>ejemplos por defecto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"><code>block</code></th>
      <td class="si">sí</td>
      <td class="si">sí</td>
      <td class="si">sí</td>
      <td>div, p, h1, section, ul, form</td>
    </tr>
    <tr>
      <th scope="row"><code>inline</code></th>
      <td class="no">no</td>
      <td class="no">no</td>
      <td class="no">no</td>
      <td>span, a, strong, em, code, label</td>
    </tr>
    <tr>
      <th scope="row"><code>inline-block</code></th>
      <td class="no">no</td>
      <td class="si">sí</td>
      <td class="si">sí</td>
      <td>button, input, select, textarea</td>
    </tr>
    <tr>
      <th scope="row"><code>none</code></th>
      <td colspan="4">no genera ninguna caja: desaparece del documento</td>
    </tr>
  </tbody>
</table></div>`}
          css={`.scroll-x { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; min-width: 640px; font-size: 14px; }
th, td { border: 1px solid #d3e0f0; padding: 8px 10px; text-align: left; }
thead th { background: #e4eefb; color: #103e6b; }
tbody th { background: #f5f8fc; font-weight: 600; white-space: nowrap; }
code { font-family: ui-monospace, Consolas, monospace; background: #eef3fa;
       padding: 1px 5px; border-radius: 4px; }
.si { color: #0f7a52; font-weight: 700; }
.no { color: #b4243a; font-weight: 700; }`}
        />

        <p>
          <code>inline-block</code> es el híbrido: se acomoda al lado de sus
          hermanos como un <code>inline</code>, pero por dentro se comporta como
          un bloque y acepta tamaño, padding y margen en las cuatro direcciones.
          Es lo que te permite convertir una lista de enlaces en una barra de
          botones sin tocar el HTML.
        </p>

        <Editor
          alto={150}
          consigna="Sacale display: inline-block a .menu a y mirá cómo se desarma la barra: los enlaces vuelven a ser texto corrido."
          html={`<nav class="menu">
  <a href="#">Inicio</a>
  <a href="#">Productos</a>
  <a href="#">Contacto</a>
</nav>`}
          css={`.menu a {
  display: inline-block;   /* sin esto, el padding se monta sobre el texto */
  padding: 10px 18px;
  min-width: 110px;
  text-align: center;
  background: #14538f;
  color: white;
  text-decoration: none;
  border-radius: 6px;
}`}
        />

        <Nota tipo="atencion" titulo="Los inline-block se alinean por la base del texto">
          <p>
            Dos <code>inline-block</code> vecinos no se alinean por arriba sino
            por la <strong>línea base</strong> de su última línea de texto. Si
            uno tiene dos renglones y el otro uno, quedan desfasados. La
            solución de siempre es <code>vertical-align: top</code>, y la
            solución de verdad es usar{" "}
            <Link href="/css/flexbox">Flexbox</Link>.
          </p>
          <Codigo
            archivo="tarjetas.css"
            codigo={`.tarjeta {
  display: inline-block;
  vertical-align: top;   /* sin esta línea, las tarjetas quedan escalonadas */
  width: 180px;
}`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="El espacio fantasma entre elementos inline">
        <p>
          Este es el detalle que vuelve loco a todo el mundo la primera vez.
          Entre dos elementos <code>inline</code> o <code>inline-block</code>, el{" "}
          <strong>salto de línea de tu HTML se renderiza como un espacio</strong>
          , igual que el espacio entre dos palabras. Mide más o menos 4px y no
          hay forma de sacarlo con <code>margin: 0</code>.
        </p>

        <Editor
          alto={240}
          consigna="Las dos filas tienen exactamente los mismos elementos. En la segunda, las etiquetas están pegadas sin saltos de línea. Contá los píxeles."
          html={`<div class="fila">
  <span class="chip">uno</span>
  <span class="chip">dos</span>
  <span class="chip">tres</span>
</div>

<div class="fila"><span class="chip">uno</span><span class="chip">dos</span><span class="chip">tres</span></div>`}
          css={`.fila {
  background: #ffe0e0;
  margin-bottom: 14px;
}

.chip {
  display: inline-block;
  margin: 0;              /* no sirve de nada: el hueco no es un margen */
  padding: 8px 14px;
  background: #14538f;
  color: white;
}`}
        />

        <p>Las salidas posibles, de la peor a la mejor:</p>

        <Comparacion>
          <Columna tono="mal" titulo="Parches sobre el HTML">
            <Codigo
              archivo="index.html"
              codigo={`<!-- 1. Todo en una línea: ilegible apenas crece. -->
<span>uno</span><span>dos</span><span>tres</span>

<!-- 2. Cerrar la etiqueta en el renglón siguiente. -->
<span>uno</span
><span>dos</span
><span>tres</span>

<!-- 3. Tapar el espacio con un comentario. -->
<span>uno</span><!--
--><span>dos</span>`}
            />
            <p className="tenue">
              Funcionan, pero atan el diseño al formato del archivo: el día que
              alguien pasa un formateador automático, se rompe.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Arreglarlo desde el CSS">
            <Codigo
              archivo="estilos.css"
              codigo={`/* Truco viejo: matar la fuente del padre
   y devolvérsela a los hijos. Frágil si
   usás unidades relativas. */
.fila { font-size: 0; }
.fila .chip { font-size: 1rem; }

/* La respuesta real de hoy: el padre deja
   de ser un contexto inline. El espacio
   desaparece y además ganás gap. */
.fila {
  display: flex;
  gap: 8px;
}`}
            />
          </Columna>
        </Comparacion>

        <Editor
          alto={150}
          consigna="El HTML sigue teniendo saltos de línea entre los chips y ya no hay hueco. Probá cambiar el gap de 8px a 0."
          html={`<div class="fila">
  <span class="chip">uno</span>
  <span class="chip">dos</span>
  <span class="chip">tres</span>
</div>`}
          css={`.fila {
  display: flex;   /* los hijos dejan de ser cajas inline */
  gap: 8px;        /* y ahora el espacio lo decidís vos */
  background: #ffe0e0;
}

.chip {
  padding: 8px 14px;
  background: #14538f;
  color: white;
}`}
        />

        <Nota tipo="info" titulo="Por qué esto casi no se ve en proyectos nuevos">
          <p>
            Desde que existen Flexbox y Grid, casi nadie acomoda cosas con{" "}
            <code>inline-block</code>. El espacio fantasma sigue apareciendo,
            eso sí, en el texto corrido (enlaces, <code>&lt;code&gt;</code>,
            íconos dentro de un párrafo) y en código heredado. Conviene
            reconocerlo para no perder media hora buscando un margen que no
            existe.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Tres formas de esconder algo (y no son equivalentes)">
        <p>
          <code>display: none</code>, <code>visibility: hidden</code> y{" "}
          <code>opacity: 0</code> hacen que no veas el elemento. Ahí termina el
          parecido. Elegir mal es la causa de la mitad de los bugs de
          accesibilidad y de los clicks que “no funcionan”.
        </p>

        <Vista
          alto={340}
          html={`<div class="scroll-x"><table>
  <thead>
    <tr>
      <th></th>
      <th><code>display: none</code></th>
      <th><code>visibility: hidden</code></th>
      <th><code>opacity: 0</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Ocupa lugar en la página</th>
      <td class="no">no</td><td class="si">sí</td><td class="si">sí</td>
    </tr>
    <tr>
      <th scope="row">Se puede clickear</th>
      <td class="no">no</td><td class="no">no</td><td class="si">sí (!)</td>
    </tr>
    <tr>
      <th scope="row">Entra con la tecla Tab</th>
      <td class="no">no</td><td class="no">no</td><td class="si">sí (!)</td>
    </tr>
    <tr>
      <th scope="row">Lo lee un lector de pantalla</th>
      <td class="no">no</td><td class="no">no</td><td class="si">sí</td>
    </tr>
    <tr>
      <th scope="row">Se anima con transition</th>
      <td class="no">no</td><td class="no">no</td><td class="si">sí</td>
    </tr>
    <tr>
      <th scope="row">Un hijo puede volver a mostrarse</th>
      <td class="no">no</td><td class="si">sí</td><td class="no">no</td>
    </tr>
  </tbody>
</table></div>`}
          css={`.scroll-x { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; min-width: 600px; font-size: 14px; }
th, td { border: 1px solid #d3e0f0; padding: 8px 10px; text-align: left; }
thead th { background: #e4eefb; color: #103e6b; }
tbody th { background: #f5f8fc; font-weight: 600; }
td { text-align: center; }
code { font-family: ui-monospace, Consolas, monospace; font-size: 12px; }
.si { color: #0f7a52; font-weight: 700; }
.no { color: #b4243a; font-weight: 700; }`}
        />

        <p>
          Las dos filas marcadas con <strong>(!)</strong> son las importantes. Un
          elemento con <code>opacity: 0</code> sigue estando ahí entero: le podés
          pegar un click sin querer y el teclado se para en él. Probalo: hacé un
          click adentro del resultado y después andá apretando <kbd>Tab</kbd>.
        </p>

        <Editor
          alto={260}
          consigna="Clickeá donde debería estar el botón transparente y mirá el renglón de abajo. Después cambiá opacity: 0 por visibility: hidden y volvé a intentar."
          html={`<div class="barra">
  <button class="b apagado" onclick="avisar(this)">display none</button>
  <button class="b invisible" onclick="avisar(this)">visibility hidden</button>
  <button class="b transparente" onclick="avisar(this)">opacity 0</button>
  <button class="b" onclick="avisar(this)">normal</button>
</div>

<p id="log">Todavía no clickeaste nada.</p>

<script>
  function avisar(boton) {
    document.getElementById("log").textContent =
      "Clickeaste el botón: " + boton.textContent;
  }
</script>`}
          css={`.barra { background: #ffe0e0; padding: 10px; }

.b {
  padding: 10px 14px;
  background: #14538f;
  color: white;
  border: 0;
  border-radius: 6px;
  font: inherit;
}

.apagado     { display: none; }
.invisible   { visibility: hidden; }
.transparente { opacity: 0; }

#log { font-weight: 700; color: #b4243a; }`}
        />

        <p>La regla práctica para elegir:</p>

        <ul>
          <li>
            <code>display: none</code> — cuando el elemento{" "}
            <strong>no tiene que existir</strong>: un panel de una pestaña que no
            está activa, un menú cerrado. Nadie lo ve, nadie lo tabula, nadie lo
            escucha.
          </li>
          <li>
            <code>visibility: hidden</code> — cuando querés que{" "}
            <strong>el hueco se quede</strong> para que el resto no salte. El
            caso típico es un mensaje de error que aparece y desaparece debajo de
            un input sin mover el formulario.
          </li>
          <li>
            <code>opacity: 0</code> — solo para <strong>animar</strong>. Y casi
            siempre acompañado, porque por sí solo deja un fantasma clickeable.
          </li>
        </ul>

        <Comparacion>
          <Columna tono="mal" titulo="Un modal que sigue ahí">
            <Codigo
              archivo="modal.css"
              codigo={`.modal {
  opacity: 0;
  transition: opacity 0.2s;
}
/* El modal es invisible, pero tapa toda
   la pantalla: los clicks del usuario
   pegan contra él y no llegan a la
   página. Y el Tab se mete adentro. */`}
            />
          </Columna>
          <Columna tono="bien" titulo="Invisible y ausente">
            <Codigo
              archivo="modal.css"
              codigo={`.modal {
  opacity: 0;
  visibility: hidden;          /* saca clicks y foco */
  transition: opacity 0.2s, visibility 0.2s;
}

.modal.abierto {
  opacity: 1;
  visibility: visible;
}`}
            />
            <p className="tenue">
              Se anima igual (la opacidad sí transiciona) y mientras está cerrado
              no intercepta nada.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="atencion" titulo="display: none no se puede animar">
          <p>
            <code>display</code> es una propiedad <em>discreta</em>: salta de un
            valor al otro sin pasos intermedios, así que un{" "}
            <code>transition</code> sobre ella no hace nada. Por eso existen los
            patrones de arriba, y por eso CSS agregó hace poco{" "}
            <code>transition-behavior: allow-discrete</code> junto con{" "}
            <code>@starting-style</code> para animar la aparición de algo que
            estaba en <code>none</code>.
          </p>
        </Nota>

        <Nota tipo="info" titulo="El atributo hidden y display: contents">
          <p>
            En HTML existe el atributo <code>hidden</code>:{" "}
            <code>&lt;div hidden&gt;</code> equivale a{" "}
            <code>display: none</code> puesto por la hoja de estilos del
            navegador. Ojo, que cualquier regla tuya con <code>display</code> le
            gana, incluso un <code>div &#123; display: block &#125;</code>.
          </p>
          <p>
            Y hay un valor raro que vale la pena conocer:{" "}
            <code>display: contents</code>. El elemento{" "}
            <strong>no genera su propia caja</strong>, pero sus hijos siguen
            existiendo y pasan a ser hijos directos —para el layout— del abuelo.
            Sirve justo cuando un componente te obliga a meter un{" "}
            <code>&lt;div&gt;</code> envoltorio en el medio de un{" "}
            <code>flex</code> o de un <code>grid</code> y ese div te rompe la
            grilla.
          </p>
          <Codigo
            archivo="grilla.css"
            codigo={`/* El envoltorio desaparece del layout y sus hijos
   se convierten en ítems de la grilla del abuelo. */
.envoltorio { display: contents; }`}
          />
          <p>
            Tiene letra chica: el envoltorio pierde su fondo, su borde y su
            padding (no tiene caja donde dibujarlos), y no conviene usarlo sobre
            elementos con semántica fuerte como <code>&lt;ul&gt;</code>,{" "}
            <code>&lt;table&gt;</code> o <code>&lt;button&gt;</code>, porque
            algunos navegadores todavía se llevan puesta la información de
            accesibilidad.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="position: sacar una caja del flujo">
        <p>
          <code>display</code> decide qué tipo de caja sos;{" "}
          <code>position</code> decide si esa caja respeta el flujo o se va por
          su cuenta. Las dos trabajan juntas, y las propiedades{" "}
          <code>top</code>, <code>right</code>, <code>bottom</code>,{" "}
          <code>left</code> y <code>z-index</code>{" "}
          <strong>no hacen absolutamente nada</strong> hasta que cambiás{" "}
          <code>position</code>.
        </p>

        <ul>
          <li>
            <code>static</code> — el valor por defecto. Está en el flujo y los
            desplazamientos se ignoran.
          </li>
          <li>
            <code>relative</code> — <strong>sigue en el flujo</strong>: su hueco
            queda reservado donde estaba, pero se dibuja corrido. Además se
            convierte en punto de referencia para los <code>absolute</code> que
            tenga adentro.
          </li>
          <li>
            <code>absolute</code> — <strong>sale del flujo</strong>: los demás
            elementos se acomodan como si no existiera, y se achica hasta el
            tamaño de su contenido.
          </li>
        </ul>

        <Editor
          alto={300}
          consigna="Cambiá position: relative por absolute en .movida y mirá qué pasa con el hueco que dejaba: los hermanos se corren para tapar el lugar."
          html={`<div class="caja">uno</div>
<div class="caja movida">dos (corrida)</div>
<div class="caja">tres</div>`}
          css={`.caja {
  background: #e4eefb;
  border: 2px solid #14538f;
  padding: 10px;
  margin-bottom: 8px;
}

.movida {
  position: relative;   /* el hueco original NO se pierde */
  top: 20px;
  left: 60px;
  background: gold;
}`}
        />

        <p>
          Ahora lo importante de <code>absolute</code>: ¿respecto de qué se
          posiciona? De su{" "}
          <strong>ancestro posicionado más cercano</strong>, o sea el primer
          antepasado que tenga un <code>position</code> distinto de{" "}
          <code>static</code>. Si no encuentra ninguno, sube hasta el documento
          entero y se posiciona respecto de la página. Por eso el patrón que vas
          a escribir mil veces es:{" "}
          <strong>el padre lleva <code>position: relative</code></strong> aunque
          no lo mueva ni un píxel, solo para marcar el territorio.
        </p>

        <Editor
          alto={280}
          consigna="Borrá la línea position: relative de .tarjeta y mirá cómo el cartel se escapa hasta la esquina de la página."
          html={`<div class="tarjeta">
  <span class="cartel">-30%</span>
  <h3>Teclado mecánico</h3>
  <p>Switches azules, 87 teclas.</p>
</div>`}
          css={`.tarjeta {
  position: relative;   /* el ancla del cartel */
  width: 230px;
  padding: 16px;
  border: 2px solid #14538f;
  border-radius: 8px;
  background: white;
}

.cartel {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #b4243a;
  color: white;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
}

h3, p { margin: 0 0 6px; }`}
        />

        <Nota tipo="atencion" titulo="Con dos lados opuestos, el elemento se estira">
          <p>
            Un <code>absolute</code> se achica hasta el tamaño de su contenido…
            salvo que le des los dos lados de un mismo eje. Con{" "}
            <code>left: 0; right: 0;</code> se estira de punta a punta sin
            necesidad de <code>width: 100%</code>, y eso funciona mucho mejor
            cuando el padre tiene padding.
          </p>
        </Nota>

        <p>
          Cuando dos cajas se superponen, gana la que está más abajo en el HTML.
          Para cambiar ese orden está <code>z-index</code>, que —insisto— solo
          funciona sobre elementos posicionados (y sobre ítems de{" "}
          <Link href="/css/flexbox">flex</Link> o{" "}
          <Link href="/css/grid">grid</Link>).
        </p>

        <Editor
          alto={260}
          consigna="Poné z-index: 3 en .verde y pasa al frente. Después sacale el position: relative dejando el z-index: vuelve atrás, porque el z-index solo no alcanza."
          html={`<div class="ficha roja">z-index: 1</div>
<div class="ficha verde">sin z-index</div>
<div class="ficha azul">z-index: 2</div>`}
          css={`.ficha {
  position: relative;
  width: 130px;
  height: 90px;
  padding: 8px;
  color: white;
  font-weight: 700;
  border: 2px solid white;
  display: inline-block;
  margin-right: -50px;   /* para que se pisen */
}

.roja  { background: #b4243a; z-index: 1; }
.verde { background: #0f7a52; }
.azul  { background: #14538f; z-index: 2; }`}
        />

        <Nota tipo="info" titulo="Contextos de apilamiento">
          <p>
            Un <code>z-index: 999</code> que “no funciona” casi siempre es un
            problema de <strong>contexto de apilamiento</strong>: si un ancestro
            tuyo tiene <code>z-index</code>, <code>opacity</code> menor a 1,{" "}
            <code>transform</code>, <code>filter</code> o{" "}
            <code>isolation: isolate</code>, todos sus descendientes compiten{" "}
            <em>entre ellos</em> y después el bloque entero compite con el resto.
            Tu 999 nunca va a pasar por encima de un tío que está en un contexto
            hermano.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="fixed y sticky">
        <p>
          <code>fixed</code> también sale del flujo, pero se posiciona respecto
          de la <strong>ventana del navegador</strong> y no se mueve cuando
          scrolleás. Es la barra superior que te sigue, el botón flotante de
          chat, el fondo oscuro de un modal.
        </p>

        <Editor
          alto={300}
          consigna="Scrolleá el resultado: la barra azul se queda y el texto pasa por debajo. Ahora sacale el padding-top al body y mirá cómo la barra tapa el primer párrafo."
          html={`<div class="barra">Barra fija: yo no me muevo</div>

<p>Párrafo 1 — scrolleá para abajo.</p>
<p>Párrafo 2</p>
<p>Párrafo 3</p>
<p>Párrafo 4</p>
<p>Párrafo 5</p>
<p>Párrafo 6 — la barra sigue arriba.</p>`}
          css={`body {
  padding-top: 60px;   /* le hacemos lugar a mano: la barra no ocupa espacio */
}

.barra {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;            /* dos lados opuestos: se estira sola */
  padding: 14px 16px;
  background: #14538f;
  color: white;
  font-weight: 700;
}

p { background: #e4eefb; padding: 14px; }`}
        />

        <Nota tipo="atencion" titulo="El bug de fixed que nadie encuentra">
          <p>
            Si un ancestro tiene <code>transform</code>, <code>filter</code>,{" "}
            <code>backdrop-filter</code>, <code>perspective</code> o{" "}
            <code>will-change</code>, ese ancestro pasa a ser el marco de
            referencia y tu <code>fixed</code>{" "}
            <strong>se comporta como un absolute</strong>: scrollea junto con la
            página. Aparece cuando alguien le agrega una animación a un
            contenedor lejano y, de golpe, el header fijo deja de serlo.
          </p>
        </Nota>

        <p>
          <code>sticky</code> es el híbrido y el que más se usa hoy: el elemento
          se comporta como <code>relative</code> (queda en el flujo, conserva su
          hueco) hasta que el scroll lo lleva al umbral que vos fijaste, y a
          partir de ahí se queda pegado como un <code>fixed</code> —{" "}
          <strong>pero solo mientras su contenedor siga en pantalla</strong>.
          Cuando el contenedor termina, el sticky se va con él.
        </p>

        <Editor
          alto={340}
          consigna="Scrolleá y mirá cómo cada título empuja al anterior. Después borrá la línea top: 0 de .titulo: sin umbral, sticky no hace nada."
          html={`<div class="lista">
  <h3 class="titulo">Frutas</h3>
  <p>Manzana</p><p>Banana</p><p>Naranja</p>
  <h3 class="titulo">Verduras</h3>
  <p>Zapallo</p><p>Acelga</p><p>Papa</p>
  <h3 class="titulo">Lácteos</h3>
  <p>Leche</p><p>Queso</p><p>Yogur</p>
</div>`}
          css={`.lista {
  height: 260px;
  overflow-y: auto;        /* este es el contenedor que scrollea */
  border: 2px solid #d3e0f0;
}

.titulo {
  position: sticky;
  top: 0;                  /* sin esta línea no se pega nada */
  margin: 0;
  padding: 8px 12px;
  background: #14538f;
  color: white;
}

p { margin: 0; padding: 12px; border-bottom: 1px solid #eef3fa; }`}
        />

        <p>
          Las dos condiciones que hay que cumplir sí o sí, y que explican el 99%
          de los <em>“me puse sticky y no pasa nada”</em>:
        </p>

        <ol>
          <li>
            <strong>Tiene que tener un umbral.</strong> Al menos uno de{" "}
            <code>top</code>, <code>right</code>, <code>bottom</code> o{" "}
            <code>left</code>. Sin ninguno, el elemento nunca sabe dónde
            frenarse y se queda como si fuera <code>relative</code>. Y ojo:{" "}
            <code>top: 0</code> no es lo mismo que no poner nada.
          </li>
          <li>
            <strong>Ningún ancestro entre el sticky y el contenedor que
            scrollea puede tener <code>overflow</code> distinto de{" "}
            <code>visible</code>.</strong> Un <code>overflow: hidden</code>{" "}
            puesto tres niveles más arriba para tapar un desborde —el más común
            de todos— convierte a ese ancestro en el nuevo contenedor de scroll;
            si ese contenedor no scrollea, el sticky no se despega nunca.
          </li>
        </ol>

        <Comparacion>
          <Columna tono="mal" titulo="No se pega">
            <Codigo
              archivo="estilos.css"
              codigo={`.contenedor {
  overflow-x: hidden;  /* ← el culpable */
}

.header {
  position: sticky;
  /* falta el umbral */
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Se pega">
            <Codigo
              archivo="estilos.css"
              codigo={`.contenedor {
  /* si era para evitar scroll horizontal: */
  overflow-x: clip;    /* clip no rompe sticky */
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;         /* para que no lo tape el contenido */
}`}
            />
          </Columna>
        </Comparacion>

        <Nota tipo="info" titulo="El otro límite de sticky">
          <p>
            Un sticky nunca sale de su <strong>padre directo</strong>. Si le
            ponés <code>position: sticky</code> a un elemento cuyo padre mide
            exactamente lo mismo que él, no va a tener por dónde deslizarse y va
            a parecer que no funciona, aunque el CSS esté perfecto. Es el caso
            típico de un <code>&lt;th&gt;</code> sticky adentro de una tabla mal
            armada (ver{" "}
            <Link href="/html/tablas">Tablas</Link>).
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="flex y grid también son valores de display">
        <p>
          Todo lo que viste hasta acá sucede en el{" "}
          <strong>flujo normal</strong>. Pero <code>display</code> tiene otros
          dos valores que cambian por completo las reglas del juego para los{" "}
          <em>hijos</em> del elemento:
        </p>

        <Codigo
          archivo="estilos.css"
          codigo={`/* El elemento sigue siendo un bloque hacia afuera,
   pero por dentro sus hijos se acomodan en una fila
   o en una columna, con gap y alineación. */
.barra { display: flex; }

/* Lo mismo pero en dos dimensiones: filas y columnas
   a la vez, con áreas que podés nombrar. */
.galeria { display: grid; }`}
        />

        <p>
          Fijate que en realidad <code>display</code> guarda{" "}
          <strong>dos datos</strong>: cómo se comporta la caja{" "}
          <em>hacia afuera</em> (block o inline) y cómo acomoda a sus hijos{" "}
          <em>hacia adentro</em> (flow, flex, grid). Por eso existe{" "}
          <code>inline-flex</code>, que es un flex container que no corta la
          línea, y por eso la sintaxis moderna se escribe con dos palabras:{" "}
          <code>display: inline flex</code>.
        </p>

        <p>Y con eso arrancan las dos lecciones que siguen:</p>

        <div className="tarjetas">
          <Link className="tarjeta" href="/css/flexbox">
            <h3>Flexbox →</h3>
            <p>
              Acomodar cosas en una dirección: el eje principal, el cruzado y los
              patrones que vas a repetir siempre.
            </p>
          </Link>
          <Link className="tarjeta" href="/css/grid">
            <h3>Grid →</h3>
            <p>
              Acomodar cosas en dos dimensiones: filas, columnas, áreas con
              nombre y grillas que se adaptan solas.
            </p>
          </Link>
        </div>

        <p className="tenue">
          Si todavía no tenés claro de dónde sale el tamaño de una caja, conviene
          pasar antes por <Link href="/css/caja">El modelo de caja</Link>.
        </p>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Una franja de avisos que se puede cerrar"
          pista={
            <div>
              <p>
                Pensá primero cuál de las tres formas de esconder corresponde: la
                franja cerrada no tiene que ocupar lugar{" "}
                <em>ni</em> que la lea nadie, así que es{" "}
                <code>display: none</code>. La franja abierta tiene que quedarse
                arriba mientras scrolleás, y no tiene que tapar el contenido
                cuando está: eso es <code>sticky</code>, no{" "}
                <code>fixed</code>.
              </p>
              <p>
                Para la crucecita de cerrar, acordate del patrón de la tarjeta
                con el cartel: padre <code>relative</code>, hijo{" "}
                <code>absolute</code> con <code>top</code> y{" "}
                <code>right</code>.
              </p>
            </div>
          }
          solucion={
            <Editor
              alto={340}
              consigna="Sacá la clase cerrada del div para ver la franja abierta, y volvé a ponerla para ver que no queda ningún hueco."
              html={`<div class="franja">
  <span>Envío gratis a todo el país durante septiembre.</span>
  <button class="cerrar" aria-label="Cerrar aviso">×</button>
</div>

<div class="cuerpo">
  <p>Párrafo 1</p><p>Párrafo 2</p><p>Párrafo 3</p>
  <p>Párrafo 4</p><p>Párrafo 5</p><p>Párrafo 6</p>
</div>`}
              css={`.franja {
  position: sticky;      /* queda en el flujo y se pega al llegar arriba */
  top: 0;
  z-index: 10;           /* para que el contenido pase por debajo */
  padding: 12px 44px 12px 16px;   /* lugar para la × a la derecha */
  background: #0f7a52;
  color: white;
}

.cerrar {
  position: absolute;    /* se ancla a .franja, que está posicionada */
  top: 6px;
  right: 8px;
  background: transparent;
  border: 0;
  color: white;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

/* Cerrada: no ocupa lugar, no la lee un lector de pantalla,
   no se puede tabular. Ninguna de las otras dos formas de
   esconder cumple las tres cosas. */
.franja.cerrada { display: none; }

.cuerpo p { background: #e4eefb; padding: 14px; margin: 0 0 8px; }`}
            />
          }
        >
          <p>
            Armá una franja de aviso arriba de la página que cumpla cuatro
            cosas: (1) se queda pegada arriba mientras el usuario scrollea, (2)
            tiene una <code>×</code> pegada a su esquina superior derecha, (3) el
            contenido de la página pasa por debajo y no por encima, y (4) cuando
            le agregás la clase <code>cerrada</code> desaparece{" "}
            <strong>sin dejar hueco y sin que el teclado pueda llegar a la
            ×</strong>.
          </p>
          <p className="tenue">
            No hace falta JavaScript: alcanza con escribir o borrar la clase{" "}
            <code>cerrada</code> a mano en el editor.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Encontrá los tres errores"
          pista={
            <p>
              Hay uno en cada tema de la lección. Uno tiene que ver con un
              elemento que no acepta <code>width</code>. Otro, con un{" "}
              <code>absolute</code> que no encuentra a su ancla. El tercero, con
              un <code>sticky</code> al que le falta algo que sí o sí necesita.
            </p>
          }
          solucion={
            <div>
              <ol>
                <li>
                  <code>.etiqueta</code> es un <code>&lt;span&gt;</code>, o sea{" "}
                  <code>inline</code>: ignora <code>width</code>,{" "}
                  <code>height</code> y el margen vertical. Se arregla con{" "}
                  <code>display: inline-block</code> (o{" "}
                  <code>block</code> si querés que corte la línea).
                </li>
                <li>
                  El <code>.globo</code> es <code>absolute</code> pero ningún
                  ancestro está posicionado, así que se ancla al documento y
                  termina en la esquina de la página en vez de la de la tarjeta.
                  Se arregla agregándole <code>position: relative</code> a{" "}
                  <code>.tarjeta</code>.
                </li>
                <li>
                  <code>.encabezado</code> tiene <code>position: sticky</code>{" "}
                  pero no tiene umbral. Sin <code>top</code> nunca se despega. Y
                  aunque se lo agregues, el <code>overflow: hidden</code> de{" "}
                  <code>.panel</code> lo deja preso: hay que sacarlo o cambiarlo
                  por <code>overflow: clip</code>.
                </li>
              </ol>
              <Editor
                alto={380}
                consigna="Este es el CSS ya corregido. Compará línea por línea con el de arriba."
                html={`<span class="etiqueta">Oferta</span>

<div class="tarjeta">
  <span class="globo">nuevo</span>
  <h3>Producto</h3>
</div>

<div class="panel">
  <h3 class="encabezado">Encabezado pegajoso</h3>
  <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
</div>`}
                css={`.etiqueta {
  display: inline-block;   /* 1. arreglado: un span inline ignora el tamaño */
  width: 120px;
  height: 34px;
  margin-bottom: 16px;
  background: gold;
  text-align: center;
}

.tarjeta {
  position: relative;      /* 2. arreglado: el ancla que le faltaba al globo */
  width: 200px;
  padding: 14px;
  border: 2px solid #14538f;
  margin-bottom: 16px;
}

.globo {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #b4243a;
  color: white;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
}

.panel {
  height: 160px;
  overflow-y: auto;        /* 3. arreglado: antes era overflow: hidden */
  border: 2px solid #d3e0f0;
}

.encabezado {
  position: sticky;
  top: 0;                  /* 3. arreglado: sticky sin umbral no se pega */
  margin: 0;
  padding: 8px 12px;
  background: #14538f;
  color: white;
}

h3 { margin: 0; }
.panel p { margin: 0; padding: 12px; border-bottom: 1px solid #eef3fa; }`}
              />
            </div>
          }
        >
          <p>
            Este CSS tiene tres bugs y los tres son de esta lección. Pegalo en el
            editor, mirá el resultado y arreglalos: la etiqueta amarilla no mide
            120×34, el globo <em>nuevo</em> no aparece en la esquina de la
            tarjeta, y el encabezado del panel no se pega al scrollear.
          </p>
          <Codigo
            archivo="estilos.css"
            codigo={`.etiqueta {
  width: 120px;
  height: 34px;
  margin-bottom: 16px;
  background: gold;
  text-align: center;
}

.tarjeta {
  width: 200px;
  padding: 14px;
  border: 2px solid #14538f;
}

.globo {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #b4243a;
  color: white;
  padding: 2px 10px;
  border-radius: 999px;
}

.panel {
  height: 160px;
  overflow: hidden;
  border: 2px solid #d3e0f0;
}

.encabezado {
  position: sticky;
  background: #14538f;
  color: white;
  padding: 8px 12px;
  margin: 0;
}`}
          />
          <p className="tenue">
            El HTML es <code>&lt;span class="etiqueta"&gt;</code>, una{" "}
            <code>.tarjeta</code> que adentro tiene el{" "}
            <code>.globo</code>, y un <code>.panel</code> con el{" "}
            <code>.encabezado</code> y varios párrafos.
          </p>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
