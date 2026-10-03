import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "Cómo funciona la web" };

// El mismo HTML se usa dos veces: una sin CSS y otra con CSS.
const HTML_TARJETA = `<h1>Mate cocido</h1>
<p class="bajada">Cinco minutos, dos ingredientes.</p>
<ul>
  <li>Yerba</li>
  <li>Agua caliente</li>
</ul>
<a href="#">Ver la receta</a>`;

const CSS_TARJETA = `body { font-family: system-ui, sans-serif; }
h1 { font-size: 1.2rem; color: #14538f; margin: 0 0 2px; }
.bajada { color: #55697f; font-size: 0.85rem; margin: 0 0 12px; }
ul { list-style: none; padding: 0; margin: 0 0 14px; display: flex; gap: 8px; }
li { background: #e4eefb; border-radius: 999px; padding: 4px 12px; font-size: 0.85rem; }
a {
  display: inline-block;
  background: #14538f;
  color: #fff;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
}`;

export default function Pagina() {
  return (
    <Leccion
      slug="/html/bases"
      titulo="Cómo funciona la web"
      resumen="Qué pasa entre que escribís una dirección y ves la página. Anatomía de un documento HTML."
    >
      <Seccion titulo="El viaje de una dirección">
        <p>
          Escribís <code>utn.edu.ar</code> y apretás Enter. Entre ese Enter y la
          página dibujada pasan un montón de cosas, y todas tardan menos de lo
          que tardás en soltar la tecla. Vale la pena conocerlas: casi todo lo
          que después te va a fallar —una imagen que no carga, un estilo que no
          aparece, una página en blanco— se explica en alguno de estos pasos.
        </p>

        <p>
          Lo primero que hace el navegador es{" "}
          <strong>buscar una dirección</strong>. Las máquinas no se hablan por
          nombre sino por número, así que le pregunta al DNS —una especie de guía
          telefónica distribuida— a qué IP corresponde ese dominio. La respuesta
          queda guardada un rato en tu máquina, por eso la segunda visita
          arranca más rápido.
        </p>

        <p>
          Con la IP en la mano <strong>abre una conexión</strong> con ese
          servidor y, si la dirección empieza con <code>https</code>, negocia el
          cifrado: intercambian certificados y a partir de ahí todo lo que viaja
          va codificado. Recién entonces el navegador{" "}
          <strong>manda un pedido</strong>: un texto cortito que dice qué método
          usa, qué ruta quiere y qué tipo de respuesta acepta.
        </p>

        <Codigo
          archivo="lo que manda el navegador"
          codigo={`GET /materias/taller-2 HTTP/1.1
Host: www.utn.edu.ar
Accept: text/html
Accept-Language: es-AR
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/141.0`}
        />

        <p>
          El servidor <strong>responde</strong>. Primero una línea con el código
          de estado, después unos encabezados y, tras una línea en blanco, el
          cuerpo: en este caso, texto HTML.
        </p>

        <Codigo
          archivo="lo que contesta el servidor"
          resaltar={[1, 2]}
          codigo={`HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 1843

<!doctype html>
<html lang="es">
  <head> ... </head>
  <body> ... </body>
</html>`}
        />

        <p>
          Y acá viene la parte que más se subestima: ese HTML{" "}
          <strong>no trae la página, trae las instrucciones para armarla</strong>
          . El navegador lo lee de arriba hacia abajo y, cada vez que encuentra
          un <code>&lt;link&gt;</code> a una hoja de estilos, un{" "}
          <code>&lt;img&gt;</code> o un <code>&lt;script&gt;</code>, dispara{" "}
          <em>otro</em> pedido. Una página común hace entre treinta y cien
          pedidos. Por eso a veces ves el texto un instante antes de que aparezca
          el diseño: el HTML ya llegó y el CSS todavía no.
        </p>

        <Nota tipo="info" titulo="Los códigos de estado que vas a ver">
          <ul>
            <li>
              <strong>200 OK</strong>: acá está lo que pediste.
            </li>
            <li>
              <strong>301 / 302</strong>: se mudó, pedilo en esta otra dirección.
            </li>
            <li>
              <strong>304 Not Modified</strong>: no cambió desde la última vez,
              usá el que ya tenés guardado. Esto es la caché, y es la razón por
              la que a veces seguís viendo tu CSS viejo: probá recargar con{" "}
              <code>Ctrl + F5</code>.
            </li>
            <li>
              <strong>404 Not Found</strong>: esa ruta no existe en este
              servidor. El problema está del lado del que pide.
            </li>
            <li>
              <strong>500</strong>: el servidor se rompió solo. El problema es de
              ellos.
            </li>
          </ul>
        </Nota>

        <p>
          La dirección que escribiste tiene partes, y cada una cumple un papel
          distinto en todo este viaje:
        </p>

        <Demo titulo="Las partes de una URL">
          <Vista
            html={`<p class="url"><span class="p1">https://</span><span class="p2">www.utn.edu.ar</span><span class="p3">/materias/taller-2</span><span class="p4">?tema=html</span><span class="p5">#semantica</span></p>
<ul class="leyenda">
  <li><b class="p1">https://</b> el <b>esquema</b>: qué protocolo hablar. La <b>s</b> es de cifrado.</li>
  <li><b class="p2">www.utn.edu.ar</b> el <b>dominio</b>: el nombre que el DNS traduce a un número de IP.</li>
  <li><b class="p3">/materias/taller-2</b> la <b>ruta</b>: qué cosa de ese servidor querés.</li>
  <li><b class="p4">?tema=html</b> los <b>parámetros</b>: datos extra que viajan con el pedido.</li>
  <li><b class="p5">#semantica</b> el <b>fragmento</b>: a qué parte de la página bajar. Este no sale de tu máquina: el servidor ni se entera.</li>
</ul>`}
            css={`.url {
  font-family: ui-monospace, Consolas, monospace;
  font-size: 15px;
  word-break: break-all;
  margin: 0 0 14px;
}
.leyenda { margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.7; }
.leyenda b[class] { font-family: ui-monospace, Consolas, monospace; }
.p1 { color: #8250c4; }
.p2 { color: #b4243a; }
.p3 { color: #0f7a52; }
.p4 { color: #92600a; }
.p5 { color: #14538f; }`}
          />
        </Demo>

        <Nota
          tipo="atencion"
          titulo="Nunca pongas datos sensibles en los parámetros"
        >
          <p>
            Lo que va después del <code>?</code> queda escrito en el historial
            del navegador, en los registros del servidor y en el encabezado que
            se manda al hacer click hacia otro sitio. Una contraseña o un DNI ahí
            adentro son un problema de seguridad, no un detalle de estilo.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Tres capas que hacen cosas distintas">
        <p>
          Una página web es siempre la suma de tres lenguajes, y cada uno tiene
          un trabajo bien delimitado:
        </p>

        <ul>
          <li>
            <strong>HTML</strong> es la <em>estructura</em>: dice qué es cada
            cosa. Esto es un título, esto es una lista, esto es un enlace.
          </li>
          <li>
            <strong>CSS</strong> es la <em>presentación</em>: dice cómo se ve y
            dónde se ubica cada cosa.
          </li>
          <li>
            <strong>JavaScript</strong> es el <em>comportamiento</em>: dice qué
            pasa cuando el usuario hace algo.
          </li>
        </ul>

        <p>
          El mismo HTML, sin una línea de CSS y con CSS. Fijate que el contenido
          es idéntico y el orden también: lo único que cambia es la pintura.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Solo HTML">
            <Vista html={HTML_TARJETA} />
            <p className="tenue">
              No está roto: así se ve el HTML con los estilos que trae el
              navegador de fábrica. Se entiende qué es cada cosa.
            </p>
          </Columna>
          <Columna tono="bien" titulo="HTML + CSS">
            <Vista html={HTML_TARJETA} css={CSS_TARJETA} />
            <p className="tenue">
              Mismas etiquetas, mismo texto, mismo orden. Cambió una sola cosa:
              las reglas de estilo.
            </p>
          </Columna>
        </Comparacion>

        <p>
          La tercera capa se nota recién cuando tocás algo. Probá el editor:
          borrá todo el CSS y mirá la página desnuda; después borrá el bloque{" "}
          <code>script</code> y fijate que el botón sigue estando —porque es
          HTML— pero ya no hace absolutamente nada.
        </p>

        <Editor
          html={`<h1>Taller de Programación II</h1>
<p class="bajada">Segundo año · Ingeniería en Informática</p>

<button id="boton">Contar un click</button>
<p id="salida">Todavía no tocaste nada.</p>

<script>
  // El comportamiento: JavaScript escucha el click y cambia el texto.
  let clicks = 0;
  document.getElementById("boton").addEventListener("click", function () {
    clicks = clicks + 1;
    document.getElementById("salida").textContent =
      "Llevás " + clicks + " click(s).";
  });
</script>`}
          css={`body { font-family: system-ui, sans-serif; }
h1 { color: #14538f; font-size: 1.25rem; margin: 0 0 2px; }
.bajada { color: #55697f; margin: 0 0 16px; font-size: 0.9rem; }
button {
  background: #14538f;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
}
#salida { font-weight: 700; }`}
          consigna="Borrá todo el CSS y mirá la página desnuda; después borrá el bloque script y fijate que el botón sigue ahí pero ya no responde."
        />

        <Nota tipo="ok" titulo="Por qué conviene mantenerlas separadas">
          <p>
            Si el HTML está bien armado, la página <em>funciona igual</em> aunque
            el CSS tarde en llegar, aunque el JavaScript falle, aunque la lea un
            lector de pantalla o un buscador. Esa es la idea de fondo detrás de{" "}
            <Link href="/html/semantica">HTML semántico</Link> y de{" "}
            <Link href="/html/accesibilidad">Accesibilidad</Link>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Anatomía de un documento HTML">
        <p>
          Todo documento tiene siempre la misma osamenta. Estas quince líneas son
          el punto de partida de cualquier página que escribas:
        </p>

        <Codigo
          archivo="index.html"
          resaltar={[1, 2, 4, 5]}
          codigo={`<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Recetas de la abuela</title>
    <meta name="description" content="Las diez recetas que sí salen.">
    <link rel="stylesheet" href="estilos.css">
    <link rel="icon" href="favicon.ico">
  </head>
  <body>
    <h1>Ñoquis del 29</h1>
    <p>Se comen el 29 de cada mes.</p>
    <script src="app.js" defer></script>
  </body>
</html>`}
        />

        <ul>
          <li>
            <code>&lt;!doctype html&gt;</code> — no es una etiqueta, es un aviso:
            esto es HTML moderno. Si falta, el navegador entra en{" "}
            <em>modo peculiar</em> (quirks mode) y simula errores de hace
            veinticinco años para no romper páginas viejas; tu CSS empieza a
            comportarse raro sin motivo aparente. Va siempre en la primera línea.
          </li>
          <li>
            <code>&lt;html lang=&quot;es&quot;&gt;</code> — el elemento raíz. El{" "}
            <code>lang</code> le dice al lector de pantalla con qué acento leer,
            al navegador qué diccionario usar para el corrector y al buscador en
            qué idioma está la página. Una línea, mucho rendimiento.
          </li>
          <li>
            <code>&lt;head&gt;</code> — información <em>sobre</em> la página. No
            se dibuja nada de lo que está acá adentro.
          </li>
          <li>
            <code>&lt;meta charset=&quot;utf-8&quot;&gt;</code> — con qué tabla
            de caracteres interpretar los bytes. Tiene que estar entre los
            primeros mil bytes del documento, así que va lo más arriba posible.
          </li>
          <li>
            <code>&lt;meta name=&quot;viewport&quot;&gt;</code> — cómo tratar el
            ancho de la pantalla en un celular. Sin esto, tu diseño responsive no
            existe.
          </li>
          <li>
            <code>&lt;title&gt;</code> — el texto de la pestaña, el nombre del
            marcador y el renglón azul del resultado de Google. Es lo único del{" "}
            <code>head</code> que el usuario ve.
          </li>
          <li>
            <code>&lt;body&gt;</code> — el contenido visible. Todo lo que se ve
            está acá adentro.
          </li>
        </ul>

        <h3>Qué pasa si falta el charset</h3>

        <p>
          Sin <code>&lt;meta charset=&quot;utf-8&quot;&gt;</code> el navegador
          tiene que adivinar cómo interpretar los bytes, y suele elegir una tabla
          vieja de un byte por carácter. Los acentos, las eñes y los símbolos se
          rompen de una forma muy reconocible:
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Sin charset: el navegador adivina">
            <Vista
              html={`<h3>ProgramaciÃ³n Web â€” Unidad 1</h3>
<p>DeberÃ­a decir "Programación Web — Unidad 1".</p>`}
              css={`h3, p { font-family: system-ui, sans-serif; }
h3 { font-size: 1rem; margin: 0 0 8px; }
p { font-size: 0.85rem; margin: 0; color: #55697f; }`}
            />
            <p className="tenue">
              Cada carácter no inglés se muestra como dos símbolos basura. Si ves
              una <code>Ã</code> o un <code>â€</code> en una página, el problema
              es siempre el mismo.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Con charset utf-8">
            <Vista
              html={`<h3>Programación Web — Unidad 1</h3>
<p>Acentos, eñes, comillas tipográficas y hasta emojis: 🧉</p>`}
              css={`h3, p { font-family: system-ui, sans-serif; }
h3 { font-size: 1rem; margin: 0 0 8px; }
p { font-size: 0.85rem; margin: 0; color: #55697f; }`}
            />
            <p className="tenue">
              UTF-8 cubre prácticamente todos los idiomas del mundo. No hay
              ningún motivo para usar otra cosa.
            </p>
          </Columna>
        </Comparacion>

        <h3>Qué pasa si falta el viewport</h3>

        <p>
          Los celulares tienen un truco heredado de cuando ninguna página estaba
          pensada para ellos: si no les decís nada,{" "}
          <strong>mienten sobre el ancho de la pantalla</strong>. Dibujan la
          página como si midiera 980 píxeles de ancho y después achican todo para
          que entre. El resultado es una maqueta perfecta, ilegible.
        </p>

        <Demo titulo="El mismo diseño en un celular, con y sin la etiqueta">
          <Vista
            html={`<div class="par">
  <figure>
    <div class="pantalla"><div class="lienzo ancho">
      <h1>Taller de Programación II</h1>
      <p>Trabajo práctico 1: armar una página con HTML semántico y una grilla de tarjetas.</p>
      <button>Entregar</button>
    </div></div>
    <figcaption>Sin meta viewport</figcaption>
  </figure>
  <figure>
    <div class="pantalla"><div class="lienzo angosto">
      <h1>Taller de Programación II</h1>
      <p>Trabajo práctico 1: armar una página con HTML semántico y una grilla de tarjetas.</p>
      <button>Entregar</button>
    </div></div>
    <figcaption>Con meta viewport</figcaption>
  </figure>
</div>`}
            css={`.par {
  display: flex;
  gap: 28px;
  justify-content: center;
  font-family: system-ui, sans-serif;
}
figure { margin: 0; text-align: center; }
figcaption { font-size: 12px; color: #55697f; margin-top: 8px; }
.pantalla {
  width: 160px;
  height: 250px;
  overflow: hidden;
  border: 8px solid #2b3a4a;
  border-radius: 18px;
  background: #fff;
}
.lienzo { transform-origin: top left; padding: 10px; }
.angosto { width: 144px; }
.ancho { width: 980px; transform: scale(0.147); }
.lienzo h1 { font-size: 20px; margin: 0 0 8px; color: #14538f; line-height: 1.2; }
.lienzo p { font-size: 14px; margin: 0 0 12px; }
.lienzo button {
  font-family: inherit;
  font-size: 14px;
  padding: 7px 14px;
  border: 0;
  border-radius: 6px;
  background: #14538f;
  color: #fff;
}`}
          />
        </Demo>

        <Nota tipo="atencion" titulo="El error más caro de una sola línea">
          <p>
            <code>width=device-width</code> le dice al celular que use el ancho
            real de su pantalla, e <code>initial-scale=1</code>, que no achique
            nada. Si te olvidás de esta etiqueta, tus{" "}
            <Link href="/css/responsive">media queries</Link> nunca se activan:
            el teléfono dice medir 980px, así que una regla{" "}
            <code>@media (max-width: 600px)</code> jamás se cumple. La página se
            ve diminuta en el celular con el CSS perfecto, y podés pasarte una
            tarde buscando el error en el lugar equivocado.
          </p>
        </Nota>

        <Nota tipo="info" titulo="En este sitio no hay ningún index.html">
          <p>
            Estás leyendo una app de Next.js: el <code>&lt;head&gt;</code> lo
            arma el framework a partir del <code>export const metadata</code> que
            hay arriba de cada página, y el HTML final lo genera React. La
            estructura que llega al navegador es exactamente esta; lo que cambia
            es quién la escribe. Está contado en{" "}
            <Link href="/sobre-next">Cómo funciona este proyecto</Link>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Etiquetas, atributos y anidamiento">
        <p>
          Una <strong>etiqueta</strong> es lo que va entre <code>&lt;</code> y{" "}
          <code>&gt;</code>. Un <strong>elemento</strong> es el combo completo:
          etiqueta de apertura, contenido y etiqueta de cierre. Los{" "}
          <strong>atributos</strong> van en la de apertura y configuran ese
          elemento. Tocá el editor y probá cada cosa:
        </p>

        <Editor
          html={`<!-- Elemento con contenido: apertura, contenido y cierre. -->
<p>Un <strong>párrafo</strong> con una palabra en negrita.</p>

<!-- Atributos: nombre="valor", separados por espacios. -->
<a href="https://developer.mozilla.org" title="La mejor documentación que hay">
  Ir a MDN
</a>

<!-- Elementos vacíos: no tienen contenido ni etiqueta de cierre. -->
<hr>
Una línea<br>y otra.

<!-- Atributo booleano: alcanza con que esté escrito. -->
<p><input type="text" value="No se puede editar" disabled></p>

<!-- class e id sirven para engancharlos desde CSS y desde JavaScript. -->
<p class="destacado" id="final">Este párrafo tiene clase.</p>`}
          css={`body { font-family: system-ui, sans-serif; font-size: 0.95rem; }
.destacado {
  background: #fdf3e0;
  border-left: 4px solid #92600a;
  padding: 8px 12px;
}`}
          consigna="Sacale el disabled al input y probá escribir. Después ponele class=&quot;destacado&quot; al primer párrafo y mirá qué pasa."
        />

        <p>
          Los <strong>elementos vacíos</strong> —también llamados{" "}
          <em>void elements</em>— no encierran nada, así que no llevan cierre:{" "}
          <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code>,{" "}
          <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>,{" "}
          <code>&lt;meta&gt;</code> y <code>&lt;link&gt;</code> son los que vas a
          usar. Escribir <code>&lt;br&gt;&lt;/br&gt;</code> está mal; escribir{" "}
          <code>&lt;br /&gt;</code> es válido y además es obligatorio en JSX, que
          es el motivo por el que lo vas a ver tanto cuando llegues a{" "}
          <Link href="/react/jsx">JSX</Link>.
        </p>

        <p>
          Los elementos se anidan unos adentro de otros, como cajas. La única
          regla es que <strong>se cierran en el orden inverso al que se
          abrieron</strong>: el último que abriste es el primero que cerrás.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Etiquetas cruzadas">
            <Codigo
              codigo={`<p>Un <strong>texto <em>mal</strong> anidado</em>.</p>`}
            />
            <Vista
              html={`<p>Un <strong>texto <em>mal</strong> anidado</em>.</p>`}
              css={`p { font-family: system-ui, sans-serif; font-size: 0.95rem; margin: 0; }`}
            />
            <p className="tenue">
              No explota nada: el navegador lo arregla como puede e inventa un
              árbol distinto del que escribiste. Mirá dónde termina la negrita y
              dónde la cursiva.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Cerradas en orden">
            <Codigo
              codigo={`<p>Un <strong>texto <em>bien</em> anidado</strong>.</p>`}
            />
            <Vista
              html={`<p>Un <strong>texto <em>bien</em> anidado</strong>.</p>`}
              css={`p { font-family: system-ui, sans-serif; font-size: 0.95rem; margin: 0; }`}
            />
            <p className="tenue">
              Abrís <code>strong</code>, abrís <code>em</code>, cerrás{" "}
              <code>em</code>, cerrás <code>strong</code>. Lo que ves es lo que
              escribiste.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="atencion" titulo="El HTML no tiene errores de compilación">
          <p>
            Esto es distinto de todo lo demás que programaste. Si te olvidás un
            punto y coma en C, no compila. Si te olvidás de cerrar un{" "}
            <code>&lt;div&gt;</code>, el navegador lo cierra solo donde le
            parezca y sigue como si nada. Nadie te avisa; simplemente algo se ve
            mal y no sabés por qué. Por eso hay dos costumbres que vale la pena
            adoptar desde hoy: <strong>indentá siempre</strong> —el anidamiento
            mal cerrado salta a la vista— y{" "}
            <strong>mirá el árbol en las herramientas de desarrollo</strong>, que
            es lo que viene un poco más abajo.
          </p>
        </Nota>

        <Nota
          tipo="info"
          titulo="Convenciones que no son obligatorias pero sí universales"
        >
          <ul>
            <li>Etiquetas y atributos en minúscula.</li>
            <li>
              Valores de atributo siempre entre comillas, aunque HTML te deje
              omitirlas cuando no hay espacios.
            </li>
            <li>
              Un elemento no puede repetir el mismo atributo dos veces, y el{" "}
              <code>id</code> tiene que ser único en toda la página.
            </li>
            <li>
              No inventes etiquetas: <code>&lt;titulo&gt;</code> no existe y el
              navegador la trata como un elemento sin ningún significado.
            </li>
          </ul>
        </Nota>
      </Seccion>

      <Seccion titulo="El DOM: el árbol que arma el navegador">
        <p>
          Cuando el navegador termina de leer tu HTML no se queda con el texto:
          construye un <strong>árbol de objetos en memoria</strong>. Cada
          elemento es un nodo, cada nodo conoce a su padre y a sus hijos, y hasta
          el texto suelto es un nodo. Ese árbol es el <strong>DOM</strong>{" "}
          (Document Object Model), y es lo que realmente se dibuja en pantalla.
        </p>

        <Codigo
          archivo="lo que escribiste"
          codigo={`<body>
  <article class="nota">
    <h2>Mate</h2>
    <p>Infusión <em>nacional</em>.</p>
  </article>
</body>`}
        />

        <Demo titulo="El árbol que arma el navegador con eso">
          <Vista
            html={`<ul class="arbol">
  <li><span class="et">body</span>
    <ul>
      <li><span class="et">article</span> <span class="at">class="nota"</span>
        <ul>
          <li><span class="et">h2</span>
            <ul><li><span class="tx">"Mate"</span></li></ul>
          </li>
          <li><span class="et">p</span>
            <ul>
              <li><span class="tx">"Infusión "</span></li>
              <li><span class="et">em</span>
                <ul><li><span class="tx">"nacional"</span></li></ul>
              </li>
              <li><span class="tx">"."</span></li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
<p class="pie">Los recuadros azules son nodos de elemento. Los grises, nodos de texto.</p>`}
            css={`.arbol, .arbol ul {
  list-style: none;
  margin: 0;
  padding: 0 0 0 20px;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 13px;
}
.arbol { padding-left: 0; }
.arbol ul { border-left: 1px dashed #a8c8f0; margin-left: 8px; }
.arbol li { margin: 3px 0; }
.et {
  background: #e4eefb;
  color: #14538f;
  border-radius: 4px;
  padding: 1px 6px;
  font-weight: 700;
}
.at { color: #92600a; font-size: 12px; }
.tx {
  background: #eef3fa;
  color: #55697f;
  border-radius: 4px;
  padding: 1px 6px;
}
.pie {
  font-family: system-ui, sans-serif;
  font-size: 12px;
  color: #55697f;
  margin: 14px 0 0;
}`}
          />
        </Demo>

        <p>
          La distinción importante es esta:{" "}
          <strong>el DOM no es tu archivo</strong>. El archivo se leyó una sola
          vez, al principio, y después nadie lo volvió a mirar. Todo lo que pasa
          de ahí en más —un menú que se abre, un ítem que se agrega, una clase
          que cambia— son modificaciones al árbol que está en memoria. Probalo:
          tocá el botón varias veces y fijate que el HTML de la izquierda no
          cambia ni una letra.
        </p>

        <Editor
          html={`<ul id="lista">
  <li>Yerba</li>
  <li>Termo</li>
</ul>
<button id="agregar">Agregar un ítem</button>

<script>
  // Esto no toca el archivo HTML: le cuelga un nodo nuevo al árbol
  // que el navegador ya tiene armado en memoria.
  document.getElementById("agregar").addEventListener("click", function () {
    const cuantos = document.querySelectorAll("#lista li").length;
    const item = document.createElement("li");
    item.textContent = "Ítem número " + (cuantos + 1);
    document.getElementById("lista").appendChild(item);
  });
</script>`}
          css={`body { font-family: system-ui, sans-serif; font-size: 0.95rem; }
li { margin-bottom: 4px; }
button {
  background: #0f7a52;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
}`}
          consigna="Tocá el botón tres veces. El HTML de la izquierda sigue teniendo dos li: lo que creció es el DOM."
        />

        <Nota tipo="info" titulo="Todo lo que sigue se apoya en esto">
          <p>
            Cuando en{" "}
            <Link href="/css/selectores">Selectores, cascada y especificidad</Link>{" "}
            escribís <code>article p</code>, estás diciendo: los nodos{" "}
            <code>p</code> que cuelgan de un nodo <code>article</code>. Cuando en{" "}
            <Link href="/js/dom">El DOM y los eventos</Link> hacés{" "}
            <code>querySelector</code>, estás buscando un nodo en este árbol. Y
            React existe justamente para que dejes de tocar el árbol a mano:
            describís cómo tendría que quedar y él calcula los cambios mínimos.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Comentarios">
        <p>
          Un comentario abre con <code>&lt;!--</code> y cierra con{" "}
          <code>--&gt;</code>. El navegador lo ignora al dibujar, aunque igual lo
          guarda como un nodo del DOM. Sirven para explicar una decisión rara,
          para marcar dónde termina una sección larga y, sobre todo, para{" "}
          <strong>apagar un pedazo de HTML sin borrarlo</strong> mientras probás
          algo.
        </p>

        <Editor
          html={`<!-- Esto es un comentario: el navegador lo ignora. -->
<h2>Lista de precios</h2>

<!--
  También pueden ocupar
  varias líneas seguidas.
-->
<ul>
  <li>Yerba $3.200</li>
  <!-- <li>Termo $18.000</li> -->
  <li>Bombilla $4.500</li>
</ul>

<p>Fin de la lista.</p>`}
          css={`body { font-family: system-ui, sans-serif; font-size: 0.95rem; }
h2 { font-size: 1.1rem; color: #14538f; margin: 0 0 10px; }`}
          consigna="Destapá el termo sacándole los guiones a ese comentario, y después apagá el h2 comentándolo."
        />

        <Nota tipo="atencion" titulo="Un comentario no es un secreto">
          <p>
            Cualquiera abre tu página, aprieta <code>Ctrl + U</code> y lee todos
            tus comentarios. No dejes ahí adentro contraseñas, direcciones de
            servidores internos, datos de prueba con información real ni
            comentarios sobre el cliente. Todo lo que mandás al navegador es
            público, siempre.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Dos detalles de sintaxis">
          <ul>
            <li>
              Los comentarios <strong>no se anidan</strong>: el primer{" "}
              <code>--&gt;</code> cierra todo. Si comentás un bloque que ya tenía
              un comentario adentro, el resto queda suelto y se dibuja.
            </li>
            <li>
              No pongas <code>--</code> adentro del texto del comentario: es
              inválido y hay parsers que cierran ahí.
            </li>
          </ul>
        </Nota>
      </Seccion>

      <Seccion titulo="Ver todo esto con las herramientas de desarrollo">
        <p>
          Todo lo que leíste lo podés mirar funcionando en cualquier página,
          incluida esta. Abrí las herramientas de desarrollo con{" "}
          <code>F12</code> o <code>Ctrl + Shift + I</code> (en Mac,{" "}
          <code>Cmd + Option + I</code>). El atajo más cómodo es otro: click
          derecho sobre cualquier cosa de la página y después{" "}
          <strong>Inspeccionar</strong>, que abre el panel ya parado en ese
          elemento.
        </p>

        <ul>
          <li>
            <strong>Elements</strong> (o <em>Inspector</em>, en Firefox) es el
            DOM en vivo. Podés desplegar el árbol, pasar el mouse por un nodo
            para que se ilumine en la página, editar el texto, agregar clases y
            probar reglas de CSS en la columna de la derecha. Nada de lo que
            toques ahí se guarda: se va con <code>F5</code>.
          </li>
          <li>
            <strong>Console</strong> es donde aparecen los errores de JavaScript
            y los avisos de React. Cuando algo no anda, este es el primer lugar
            donde mirar, siempre.
          </li>
          <li>
            <strong>Network</strong> es la lista de todos los pedidos de la
            primera sección: cada archivo, su código de estado, cuánto pesa y
            cuánto tardó. Recargá con el panel abierto y vas a ver primero el
            HTML y después todo lo demás. Un 404 acá explica la mitad de los
            no me carga la imagen.
          </li>
          <li>
            El ícono de celular (<code>Ctrl + Shift + M</code>) simula pantallas
            chicas. Es la forma rápida de comprobar lo del <code>viewport</code>{" "}
            sin sacar el teléfono del bolsillo.
          </li>
        </ul>

        <Nota tipo="info" titulo="Ctrl + U no es lo mismo que Elements">
          <p>
            <code>Ctrl + U</code> te muestra el <strong>código fuente</strong>:
            el texto exacto que mandó el servidor, congelado.{" "}
            <strong>Elements</strong> te muestra el <strong>DOM actual</strong>,
            con todo lo que JavaScript agregó, sacó o cambió desde entonces. En
            una página moderna los dos son bien distintos, y confundirlos es un
            clásico: buscás en el fuente un elemento que existe solo en el DOM y
            terminás pensando que estás loco.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. El esqueleto de memoria"
          pista={
            <p>
              Son siete líneas de estructura antes de llegar al contenido:
              doctype, <code>html</code> con idioma, <code>head</code>, dos{" "}
              <code>meta</code>, <code>title</code> y <code>body</code>. Acordate
              de cuál de las dos <code>meta</code> tiene que ir lo más arriba
              posible, y por qué.
            </p>
          }
          solucion={
            <div>
              <Codigo
                archivo="index.html"
                resaltar={[4, 5]}
                codigo={`<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mi primera página</title>
  </head>
  <body>
    <h1>Hola, mundo</h1>
    <p>Esta es mi primera página escrita a mano.</p>
  </body>
</html>`}
              />
              <p>
                El <code>charset</code> va antes que todo lo demás porque el
                navegador necesita saber cómo leer los bytes <em>antes</em> de
                encontrarse con el primer acento. El <code>viewport</code> puede
                ir después, pero si no está, en el celular se ve diminuta.
              </p>
            </div>
          }
        >
          <p>
            Sin mirar para arriba, escribí en un archivo <code>index.html</code>{" "}
            el documento completo más chico que sea correcto: que declare que es
            HTML moderno, que esté en español, que no rompa los acentos, que se
            vea bien en un celular, que tenga un título en la pestaña y un{" "}
            <code>&lt;h1&gt;</code> con tu nombre. Abrilo con doble click y
            comprobá el título en la pestaña.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Siete errores"
          pista={
            <p>
              Tres están en el <code>head</code> (uno por lo que dice, dos por lo
              que falta) y cuatro en el <code>body</code>. Pegá el código en un
              archivo, abrilo en el navegador, apretá <code>F12</code> y compará
              el árbol de Elements con lo que escribiste: dos de los errores
              saltan solos ahí.
            </p>
          }
          solucion={
            <div>
              <Codigo
                archivo="recetas.html · corregido"
                resaltar={[2, 4, 5, 9, 10, 11, 12]}
                codigo={`<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Recetas de la abuela</title>
  </head>
  <body>
    <h1>Ñoquis del 29</h1>
    <p>Se comen <strong>el <em>día</em> 29</strong> de cada mes.</p>
    <!-- TODO: agregar las fotos, faltan las de la tarta -->
    <br>
  </body>
</html>`}
              />
              <ol>
                <li>
                  <code>lang=&quot;en&quot;</code> con el contenido en
                  castellano: el lector de pantalla lo lee con acento inglés y el
                  corrector subraya todo. Va <code>lang=&quot;es&quot;</code>.
                </li>
                <li>
                  Falta <code>&lt;meta charset=&quot;utf-8&quot;&gt;</code>: la Ñ
                  y la í salen rotas.
                </li>
                <li>
                  Falta <code>&lt;meta name=&quot;viewport&quot;&gt;</code>: en
                  el celular se ve diminuta.
                </li>
                <li>
                  <code>&lt;h1&gt;Ñoquis del 29&lt;h1&gt;</code>: el cierre
                  perdió la barra, así que abre un segundo <code>h1</code> y todo
                  el resto de la página queda adentro del título.
                </li>
                <li>
                  <code>&lt;strong&gt;</code> y <code>&lt;em&gt;</code> cruzados:
                  se cierra <code>strong</code> antes que <code>em</code>, que se
                  había abierto después.
                </li>
                <li>
                  El comentario tiene <code>--</code> adentro del texto, que es
                  inválido.
                </li>
                <li>
                  <code>&lt;br&gt;&lt;/br&gt;</code>: <code>br</code> es un
                  elemento vacío y no se cierra. Va <code>&lt;br&gt;</code> a
                  secas, o <code>&lt;br /&gt;</code>.
                </li>
              </ol>
            </div>
          }
        >
          <p>
            Este documento tiene siete problemas. Ninguno hace que el navegador
            muestre un error: todos se ven apenas como algo raro. Encontralos y
            escribí la versión corregida.
          </p>
          <Codigo
            archivo="recetas.html"
            codigo={`<!doctype html>
<html lang="en">
  <head>
    <title>Recetas de la abuela</title>
  </head>
  <body>
    <h1>Ñoquis del 29<h1>
    <p>Se comen <strong>el <em>día</strong> 29</em> de cada mes.</p>
    <!-- TODO: agregar las fotos -- faltan las de la tarta -->
    <br></br>
  </body>
</html>`}
          />
        </Desafio>

        <Desafio
          titulo="3. Del árbol al HTML"
          pista={
            <p>
              Cada sangría del árbol es un nivel de anidamiento. Los nodos entre
              comillas son texto, no etiquetas: fijate que el{" "}
              <code>&lt;p&gt;</code> tiene tres hijos y que solo el del medio es
              un elemento.
            </p>
          }
          solucion={
            <Editor
              html={`<section class="tarjeta">
  <h3>Mate</h3>
  <ul>
    <li>Yerba</li>
    <li>Agua a 80°</li>
  </ul>
  <p>Listo en <strong>5 minutos</strong>.</p>
</section>`}
              css={`body { font-family: system-ui, sans-serif; font-size: 0.95rem; }
.tarjeta {
  border: 1px solid #d3e0f0;
  border-radius: 10px;
  padding: 14px 16px;
  max-width: 260px;
}
h3 { margin: 0 0 8px; color: #14538f; }
ul { margin: 0 0 10px; padding-left: 20px; }
p { margin: 0; }`}
              consigna="Agregale un li más y pensá cómo crecería el árbol de la consigna."
            />
          }
        >
          <p>
            Al revés que en la sección del DOM: acá tenés el árbol y te falta el
            HTML. Escribí el fragmento que el navegador tendría que leer para
            armar exactamente esto.
          </p>
          <Codigo
            archivo="árbol del DOM"
            codigo={`section  class="tarjeta"
├── h3
│   └── "Mate"
├── ul
│   ├── li → "Yerba"
│   └── li → "Agua a 80°"
└── p
    ├── "Listo en "
    ├── strong → "5 minutos"
    └── "."`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
