import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "Selectores, cascada y especificidad" };

export default function Pagina() {
  return (
    <Leccion
      slug="/css/selectores"
      titulo="Selectores, cascada y especificidad"
      resumen="Por qué a veces un estilo no se aplica y la respuesta casi nunca es !important."
    >
      <Seccion titulo="El catálogo de selectores">
        <p>
          Una regla de CSS tiene dos partes: el <strong>selector</strong>, que
          responde a la pregunta <em>¿a qué elementos le aplico esto?</em>, y el{" "}
          <strong>bloque de declaraciones</strong>, que dice qué cambiar. Toda
          esta lección es sobre la primera parte, porque el 90% de las veces que
          un estilo no se ve, el problema está ahí y no en la propiedad.
        </p>

        <Codigo
          archivo="anatomía de una regla"
          codigo={`.tarjeta.destacada {   /* ← selector: a quién le pega */
  color: crimson;      /* ← declaración: propiedad: valor; */
  padding: 12px;
}`}
        />

        <p>
          Los cuatro selectores básicos son los que vas a escribir todo el
          tiempo. Tocá el CSS de abajo y mirá qué se mueve.
        </p>

        <Editor
          consigna="Cambiá p.destacado por div.destacado y mirá qué caja se queda sin el borde naranja."
          html={`<p>Un párrafo cualquiera.</p>
<p class="destacado">Este párrafo tiene class="destacado".</p>
<p id="unico">Este párrafo tiene id="unico".</p>
<div class="destacado">Un div, que también está destacado.</div>`}
          css={`/* Por etiqueta: todos los <p> del documento. */
p { color: #334155; }

/* Por clase: cualquier elemento con class="destacado". */
.destacado { background: #fef3c7; padding: 6px 10px; }

/* Etiqueta Y clase pegadas: solo los <p> que además son destacados. */
p.destacado { border-left: 4px solid #d97706; }

/* Por id: como mucho un elemento por página. */
#unico { color: crimson; font-weight: 700; }

/* Universal: absolutamente todos los elementos. */
* { font-family: system-ui, sans-serif; }`}
        />

        <Nota tipo="atencion" titulo="El espacio cambia todo">
          <p>
            <code>p.destacado</code> (sin espacio) significa{" "}
            <em>un p que además tiene la clase destacado</em>.{" "}
            <code>p .destacado</code> (con espacio) significa{" "}
            <em>algo con la clase destacado que está adentro de un p</em>. Son
            dos reglas completamente distintas y el único aviso que vas a tener
            es que no pasa nada.
          </p>
        </Nota>

        <h3>Selectores de atributo</h3>

        <p>
          Podés seleccionar por cualquier atributo del HTML, no solo por{" "}
          <code>class</code> y <code>id</code>. Es especialmente útil con
          formularios y con enlaces, donde el atributo <em>es</em> el dato que te
          importa.
        </p>

        <Editor
          consigna='Escribí una regla nueva con a[href^="/"] para pintar de azul los enlaces internos.'
          html={`<ul>
  <li><a href="https://developer.mozilla.org">Documentación externa</a></li>
  <li><a href="/css/grid">Una lección de este sitio</a></li>
  <li><a href="/apuntes/parcial.pdf">Apunte para el parcial</a></li>
  <li><a href="mailto:catedra@ejemplo.com">Escribirle a la cátedra</a></li>
</ul>

<p><input type="email" placeholder="tu@mail.com"></p>
<p><input type="text" placeholder="un texto cualquiera"></p>`}
          css={`/* [attr] — tiene el atributo, sin importar el valor. */
a[href] { text-decoration-thickness: 2px; }

/* [attr="valor"] — vale exactamente eso. */
input[type="email"] { border: 2px solid seagreen; }

/* [attr^="x"] — EMPIEZA con x. */
a[href^="https"]::after { content: " ↗"; }

/* [attr$="x"] — TERMINA con x. */
a[href$=".pdf"]::after { content: " (PDF)"; color: crimson; }

/* [attr*="x"] — CONTIENE x en cualquier posición. */
a[href*="mailto"] { color: rebeccapurple; }

/* La i final ignora mayúsculas y minúsculas: .PDF, .Pdf, .pdf. */
a[href$=".PDF" i] { font-weight: 700; }`}
        />

        <p>
          Hay dos variantes más que casi no vas a usar pero conviene reconocer:{" "}
          <code>[lang|=&quot;es&quot;]</code> busca el valor exacto o el valor
          seguido de un guión (sirve para <code>es-AR</code>), y{" "}
          <code>[class~=&quot;chip&quot;]</code> busca una palabra completa dentro
          de una lista separada por espacios.
        </p>

        <h3>Agrupar con coma</h3>

        <p>
          La coma junta varios selectores que comparten el mismo bloque. No es un{" "}
          <em>y</em>, es un <em>o</em>: la regla se aplica a cada uno por
          separado.
        </p>

        <Codigo
          archivo="agrupar.css"
          codigo={`h1, h2, h3 {
  font-family: Georgia, serif;
  line-height: 1.2;
}

/* Es exactamente lo mismo que escribir las tres reglas por separado. */`}
        />

        <Nota tipo="atencion" titulo="Una coma con un selector roto tira la regla entera">
          <p>
            Si uno solo de los selectores de la lista es inválido (un typo, o un
            selector que ese navegador todavía no entiende), el navegador
            descarta <strong>toda la regla</strong>, no solo esa línea. Por eso{" "}
            <code>h1, h2, :hover-nuevo-invento</code> deja a los{" "}
            <code>h1</code> y <code>h2</code> sin estilo.
          </p>
          <Codigo
            codigo={`/* ✗ Si el navegador no entiende :has(), pierde también el .tarjeta. */
.tarjeta, .caja:has(img) { border: 1px solid gray; }

/* ✓ :is() perdona: los selectores que no entiende los ignora solos. */
:is(.tarjeta, .caja:has(img)) { border: 1px solid gray; }`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="Combinadores: la relación entre elementos">
        <p>
          Un combinador es el signo que va <em>entre</em> dos selectores y
          describe qué relación tienen en el árbol del documento. Son cuatro y
          los confunde todo el mundo al principio, así que lo mejor es verlos
          actuar sobre el mismo HTML.
        </p>

        <Editor
          alto={260}
          consigna="Destapá las reglas de a una (sacale la barra y el asterisco) y mirá exactamente a quién afecta cada combinador."
          html={`<section class="ficha">
  <h3>Título de la ficha</h3>
  <p>Párrafo hijo directo de la ficha.</p>
  <div class="caja">
    <p>Párrafo nieto: vive adentro de .caja.</p>
  </div>
  <span>Un span, hermano de los párrafos.</span>
  <p>Párrafo que viene justo después del span.</p>
  <p>Otro párrafo más abajo.</p>
</section>

<p>Un párrafo de afuera de la ficha.</p>`}
          css={`.ficha { border: 1px solid #cbd5e1; padding: 10px; }
.caja { background: #f1f5f9; padding: 6px; }

/* DESCENDIENTE (espacio): todos los <p> de adentro, a cualquier nivel. */
.ficha p { background: #dbeafe; }

/* HIJO DIRECTO (>): solo los <p> que cuelgan directo de .ficha.
   El párrafo de adentro de .caja queda afuera. */
/* .ficha > p { outline: 2px solid #2563eb; } */

/* HERMANO ADYACENTE (+): el <p> que viene JUSTO después de un <span>.
   Uno solo, el inmediato. */
/* span + p { color: crimson; font-weight: 700; } */

/* HERMANO GENERAL (~): todos los <p> que vengan después de un <span>,
   aunque haya cosas en el medio. */
/* span ~ p { text-decoration: underline; } */`}
        />

        <Comparacion>
          <Columna tono="mal" titulo="Cadena larga y frágil">
            <Codigo
              codigo={`body div.contenedor > ul li a span {
  color: crimson;
}`}
            />
            <p className="tenue">
              Depende de que nadie toque nunca la estructura del HTML. El día que
              alguien envuelve el <code>ul</code> en un div, la regla deja de
              aplicarse y no hay error en ningún lado.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Una clase en el elemento">
            <Codigo
              codigo={`.link-de-menu {
  color: crimson;
}`}
            />
            <p className="tenue">
              Sobrevive a cualquier reacomodo del HTML, se lee de un vistazo y
              tiene especificidad baja, así que después es fácil de pisar cuando
              hace falta.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="info" titulo="Los hermanos miran para adelante">
          <p>
            <code>+</code> y <code>~</code> solo pueden seleccionar hermanos{" "}
            <em>posteriores</em>. No existe un combinador de hermano anterior: si
            necesitás eso, la salida es <code>:has()</code>, que vemos en un
            rato.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Pseudo-clases: estado y posición">
        <p>
          Una pseudo-clase empieza con <strong>dos puntos</strong> y selecciona
          elementos por algo que no está escrito en el HTML: en qué estado están
          ahora mismo, o qué lugar ocupan entre sus hermanos.
        </p>

        <h3>Las de estado</h3>

        <Editor
          alto={230}
          consigna="Tabulá con Tab hasta el botón y después hacele clic con el mouse: :focus-visible aparece solo con el teclado."
          html={`<p><button class="accion">Pasá el mouse, o llegá con Tab</button></p>

<p><input type="text" placeholder="escribí algo acá"></p>
<p><input type="text" value="este no se puede tocar" disabled></p>

<label>
  <input type="checkbox">
  <span>Acepto los términos</span>
</label>`}
          css={`.accion {
  padding: 8px 14px;
  border: 1px solid #94a3b8;
  border-radius: 8px;
  background: white;
}

/* El puntero encima. */
.accion:hover { background: #e0f2fe; }

/* Mientras lo tenés apretado. */
.accion:active { transform: translateY(1px); }

/* :focus se enciende también al hacer clic con el mouse. */
/* .accion:focus { outline: 3px solid orange; } */

/* :focus-visible: solo cuando el foco llegó por teclado. Es el que querés
   casi siempre, porque no molesta al que usa mouse. */
.accion:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }

input:focus { border-color: #2563eb; }

/* El control está deshabilitado desde el HTML. */
input:disabled { background: #e2e8f0; color: #64748b; cursor: not-allowed; }

/* :checked mira el estado real del control, no el atributo del HTML. */
input:checked + span { color: seagreen; font-weight: 700; }`}
        />

        <Nota tipo="atencion" titulo="Nunca escribas outline: none a secas">
          <p>
            Sacar el contorno del foco deja la página inusable para cualquiera
            que navegue con teclado. Si no te gusta el contorno del navegador,
            reemplazalo por uno tuyo en <code>:focus-visible</code>, no lo borres.
            Hay más sobre esto en{" "}
            <Link href="/html/accesibilidad">Accesibilidad</Link>.
          </p>
        </Nota>

        <h3>Las de posición y la fórmula de nth-child</h3>

        <p>
          <code>:nth-child()</code> recibe una fórmula del tipo{" "}
          <code>an + b</code>, donde <code>n</code> arranca en 0 y va subiendo de
          a uno. Con <code>2n + 1</code> los valores son 1, 3, 5, 7… o sea los
          impares; con <code>3n</code> son 3, 6, 9… Las palabras{" "}
          <code>odd</code> y <code>even</code> son atajos para{" "}
          <code>2n + 1</code> y <code>2n</code>. Y un truco que vale oro:{" "}
          <code>-n + 3</code> da 3, 2, 1, o sea <em>los primeros tres</em>.
        </p>

        <Editor
          alto={300}
          consigna="Cambiá el 3n por 4n, después probá -n + 3 y por último n + 4 (todos menos los tres primeros)."
          html={`<ol class="lista">
  <li>Uno</li>
  <li>Dos</li>
  <li>Tres</li>
  <li>Cuatro</li>
  <li>Cinco</li>
  <li class="fuera">Seis (tiene class="fuera")</li>
  <li>Siete</li>
  <li>Ocho</li>
</ol>`}
          css={`.lista li { padding: 3px 6px; }

/* Los impares: 1, 3, 5, 7. "odd" es lo mismo que "2n + 1". */
.lista li:nth-child(odd) { background: #f1f5f9; }

/* De a tres: 3, 6, 9... */
.lista li:nth-child(3n) { color: #2563eb; font-weight: 700; }

/* El primero y el último de sus hermanos. */
.lista li:first-child { border-left: 4px solid seagreen; }
.lista li:last-child { border-left: 4px solid crimson; }

/* :not() invierte: todos los <li> menos los que tengan .fuera. */
.lista li:not(.fuera) { border-bottom: 1px dotted #cbd5e1; }`}
        />

        <Nota tipo="atencion" titulo="nth-child cuenta hermanos, no coincidencias">
          <p>
            <code>p:nth-child(2)</code> no significa <em>el segundo párrafo</em>:
            significa <em>un p que además sea el segundo hijo de su padre</em>. Si
            el segundo hijo es un <code>h2</code>, no selecciona nada. El que
            cuenta solo los del mismo tipo es <code>:nth-of-type()</code>.
          </p>
        </Nota>

        <h3>:has(), el selector del padre</h3>

        <p>
          Durante veinte años CSS no tuvo forma de decir{" "}
          <em>estilá este elemento según lo que tiene adentro</em>. Ahora sí:{" "}
          <code>:has()</code> selecciona el elemento de afuera y usa lo de adentro
          como condición. Funciona en todos los navegadores modernos y cambia
          bastante lo que se puede hacer sin JavaScript.
        </p>

        <Editor
          alto={280}
          consigna="Sacale la clase oferta al segundo artículo en el HTML y mirá cómo el borde verde se va solo."
          html={`<article class="producto">
  <h3>Yerba</h3>
  <p>Sin promoción esta semana.</p>
</article>

<article class="producto">
  <h3>Mate de calabaza</h3>
  <p class="oferta">2x1 hasta el domingo</p>
</article>

<form>
  <p><label>Mail <input type="email" required></label></p>
  <p><label>Apodo <input type="text"></label></p>
</form>`}
          css={`.producto {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 10px;
}

/* El padre se estila según lo que tiene adentro. */
.producto:has(.oferta) { border-color: #16a34a; background: #f0fdf4; }

/* Combinado con :not(): los que NO tienen oferta. */
.producto:not(:has(.oferta)) { opacity: 0.6; }

/* También sirve para mirar hermanos: un label cuyo input es obligatorio. */
label:has(input:required)::after { content: " *"; color: crimson; }`}
        />

        <Nota tipo="info" titulo=":is() y :where(), los dos que agrupan">
          <p>
            Los dos hacen lo mismo que una lista con comas, pero se pueden meter
            en el medio de un selector. La diferencia está en la especificidad:{" "}
            <code>:is()</code> toma la del argumento más fuerte y{" "}
            <code>:where()</code> vale <strong>cero</strong>. Por eso{" "}
            <code>:where()</code> es ideal para estilos de base que querés poder
            pisar con una sola clase.
          </p>
          <Codigo
            codigo={`/* Sin agrupar: tres veces lo mismo. */
.articulo h1, .articulo h2, .articulo h3 { margin-top: 1.5em; }

/* Con :is(): igual de específico, mucho más corto. */
.articulo :is(h1, h2, h3) { margin-top: 1.5em; }

/* Con :where(): especificidad (0,0,0), cualquier clase después lo pisa. */
:where(.articulo h1, .articulo h2) { margin-top: 1.5em; }`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="Pseudo-elementos: partes que no existen en el HTML">
        <p>
          Un pseudo-<strong>elemento</strong> no selecciona un elemento que
          existe: crea uno, o apunta a un pedazo de otro que vos nunca escribiste.
          Se escriben con <strong>cuatro puntos</strong> (<code>::</code>) para
          distinguirlos de las pseudo-clases, que llevan dos.
        </p>

        <Editor
          alto={320}
          consigna="Borrá la línea del content en .precio::before y mirá cómo desaparece el signo pesos entero."
          html={`<p class="nota">Esta primera línea se ve distinta gracias a ::first-line, y
se recalcula sola si cambiás el ancho de la ventana. Seleccioná este texto con
el mouse para ver ::selection en acción. El resto es relleno para que haya más
de un renglón y se note bien la diferencia.</p>

<p class="precio">1500</p>

<p><input placeholder="Buscar productos..."></p>`}
          css={`/* ::before y ::after crean cajas que no están en el HTML. */
.precio::before { content: "$"; color: #64748b; }
.precio::after { content: " ARS"; font-size: 0.8em; color: #64748b; }
.precio { font-size: 1.6em; font-weight: 700; }

/* Sin content no aparece nada: ni siquiera una caja vacía. */
.nota::before { content: "📌 "; }

/* La primera línea renderizada, sea cual sea el ancho. */
.nota::first-line { font-weight: 700; color: #1d4ed8; }

/* El texto que el usuario selecciona con el mouse. */
::selection { background: #fde68a; }

/* El texto de ayuda de un input. */
input::placeholder { color: #94a3b8; font-style: italic; }`}
        />

        <Nota tipo="atencion" titulo="Dos trampas de ::before y ::after">
          <p>
            La primera: <strong>sin <code>content</code> no existen</strong>. Si
            querés una caja decorativa vacía, igual necesitás{" "}
            <code>content: &quot;&quot;;</code>.
          </p>
          <p>
            La segunda: no funcionan en elementos reemplazados, o sea los que el
            navegador rellena con contenido externo. <code>&lt;img&gt;</code>,{" "}
            <code>&lt;input&gt;</code>, <code>&lt;br&gt;</code> y{" "}
            <code>&lt;iframe&gt;</code> no tienen adentro donde meter nada.
            Escribirlo no da error, simplemente no pasa nada.
          </p>
        </Nota>

        <Nota tipo="info" titulo="El texto de content no siempre se lee">
          <p>
            Los lectores de pantalla tratan al <code>content</code> de manera
            despareja. Sirve perfecto para decoración (comillas, flechitas,
            íconos), pero si el texto es información que el usuario necesita,
            escribilo en el HTML.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La cascada: quién gana cuando dos reglas chocan">
        <p>
          La C de CSS es la de <em>cascading</em>. Cuando dos reglas quieren darle
          un valor distinto a la misma propiedad del mismo elemento, el navegador
          desempata siempre en el mismo orden, y solo pasa al criterio siguiente
          si el anterior quedó empatado:
        </p>

        <ol>
          <li>
            <strong>Origen e importancia.</strong> Primero el origen (los estilos
            del navegador, los del usuario y los tuyos) cruzado con si la
            declaración lleva <code>!important</code> o no. Tus estilos normales
            le ganan a los del navegador, y por eso un <code>h1</code> tuyo puede
            cambiarle el tamaño al que trae Chrome de fábrica.
          </li>
          <li>
            <strong>Especificidad.</strong> Si las dos reglas vienen del mismo
            origen, gana la del selector más específico. Es el criterio que más
            vas a usar y el de la sección que sigue.
          </li>
          <li>
            <strong>Orden de aparición.</strong> Si empataron los dos anteriores,
            gana la que está escrita <em>más abajo</em> en la hoja, o en la hoja
            que se carga después.
          </li>
        </ol>

        <Editor
          solapas="css"
          alto={120}
          consigna="Invertí el orden de las dos reglas y mirá cómo cambia el color. Después probá cambiar el orden dentro del atributo class: no pasa nada."
          html={`<p class="aviso destacado">¿De qué color soy?</p>`}
          css={`/* Las dos tienen una clase: misma especificidad, (0,1,0).
   Como empatan, gana la que está más abajo. */
.aviso { color: crimson; }
.destacado { color: seagreen; }`}
        />

        <Nota tipo="atencion" titulo="El orden del atributo class no importa">
          <p>
            Escribir <code>class=&quot;destacado aviso&quot;</code> en vez de{" "}
            <code>class=&quot;aviso destacado&quot;</code> no cambia
            absolutamente nada. Lo único que manda es el orden en la{" "}
            <strong>hoja de estilos</strong>.
          </p>
        </Nota>

        <Nota tipo="info" titulo="La cascada trabaja propiedad por propiedad">
          <p>
            No gana una regla entera: gana cada declaración por separado. Si una
            regla te define <code>color</code> y otra <code>background</code>,
            conviven sin problema. El conflicto existe solo cuando las dos tocan
            la misma propiedad.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Herencia no es cascada">
          <p>
            Si ninguna regla le da valor a una propiedad, algunas (las de texto:{" "}
            <code>color</code>, <code>font-family</code>,{" "}
            <code>line-height</code>) se heredan del padre y otras (
            <code>border</code>, <code>padding</code>, <code>background</code>)
            no. La herencia es el último recurso, después de que la cascada no
            encontró nada. Un valor heredado lo pisa{" "}
            <strong>cualquier</strong> regla que apunte al elemento, por débil
            que sea.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Especificidad: la terna (id, clase, etiqueta)">
        <p>
          Para comparar dos selectores, el navegador arma un número de tres
          casilleros contando qué hay en cada uno:
        </p>

        <ul>
          <li>
            <strong>Primer casillero:</strong> cuántos <code>#id</code> tiene.
          </li>
          <li>
            <strong>Segundo casillero:</strong> cuántas clases, selectores de
            atributo y pseudo-clases tiene. <code>.activo</code>,{" "}
            <code>[type=&quot;text&quot;]</code> y <code>:hover</code> valen todos
            lo mismo.
          </li>
          <li>
            <strong>Tercer casillero:</strong> cuántas etiquetas y
            pseudo-elementos tiene. <code>div</code>, <code>a</code> y{" "}
            <code>::before</code> cuentan acá.
          </li>
        </ul>

        <p>
          El <code>*</code> y los combinadores (<code>&gt;</code>,{" "}
          <code>+</code>, <code>~</code>, el espacio) no suman nada. Se comparan
          de izquierda a derecha, como si fueran las horas, los minutos y los
          segundos.
        </p>

        <Vista
          html={`<table>
  <caption>Siete selectores reales, de menor a mayor especificidad</caption>
  <thead>
    <tr><th>Selector</th><th>id</th><th>clase</th><th>etiqueta</th><th>Terna</th></tr>
  </thead>
  <tbody>
    <tr><td><code>*</code></td><td>0</td><td>0</td><td>0</td><td>(0,0,0)</td></tr>
    <tr><td><code>li</code></td><td>0</td><td>0</td><td>1</td><td>(0,0,1)</td></tr>
    <tr><td><code>ul &gt; li a</code></td><td>0</td><td>0</td><td>3</td><td>(0,0,3)</td></tr>
    <tr><td><code>.menu</code></td><td>0</td><td>1</td><td>0</td><td>(0,1,0)</td></tr>
    <tr><td><code>a[href^="http"]:hover</code></td><td>0</td><td>2</td><td>1</td><td>(0,2,1)</td></tr>
    <tr><td><code>ul li.activo a:hover</code></td><td>0</td><td>2</td><td>3</td><td>(0,2,3)</td></tr>
    <tr><td><code>#barra</code></td><td>1</td><td>0</td><td>0</td><td>(1,0,0)</td></tr>
    <tr><td><code>#barra .menu a:not(.off)</code></td><td>1</td><td>2</td><td>1</td><td>(1,2,1)</td></tr>
  </tbody>
</table>`}
          css={`table { border-collapse: collapse; width: 100%; font-size: 0.9rem; }
caption { text-align: left; font-weight: 700; padding-bottom: 8px; }
th, td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center; }
th { background: #f1f5f9; }
td:first-child, th:first-child { text-align: left; }
td:last-child { font-family: ui-monospace, monospace; font-weight: 700; }
code { font-family: ui-monospace, "Cascadia Code", monospace; font-size: 0.92em; }
tbody tr:nth-child(odd) { background: #f8fafc; }`}
        />

        <p>
          Prestá atención a la anteúltima fila: <code>#barra</code> tiene{" "}
          <em>menos cosas</em> que <code>ul li.activo a:hover</code> y sin embargo
          le gana, porque el primer casillero decide antes que los otros dos.
        </p>

        <Nota tipo="atencion" titulo="La especificidad no tiene acarreo">
          <p>
            No es un número en base diez: <code>(0,11,0)</code> no se convierte en{" "}
            <code>(1,1,0)</code>. Once clases siguen perdiendo contra un solo id.
            Y mil etiquetas pierden contra una sola clase. Por eso no tiene
            sentido intentar &quot;juntar puntos&quot; agregando selectores.
          </p>
        </Nota>

        <p>
          Ahora probalo vos. Las cuatro reglas de abajo apuntan al mismo enlace y
          están escritas <strong>de menor a mayor especificidad al revés</strong>{" "}
          a propósito, para que veas que el orden no alcanza.
        </p>

        <Editor
          solapas="css"
          alto={120}
          consigna="Antes de destapar cada regla, anotá su terna. Después destapalas de a una y fijate si ganó la que pensabas."
          html={`<nav id="menu" class="barra">
  <a class="link activo" href="#">Inicio</a>
</nav>`}
          css={`/* (0,1,0) — una clase. */
.activo { color: crimson; }

/* (0,2,0) — dos clases. Gana a la de arriba. */
.link.activo { color: seagreen; }

/* (0,2,2) — dos clases y dos etiquetas. */
/* nav.barra a.activo { color: rebeccapurple; } */

/* (1,1,0) — un id y una clase. Le gana a todas las de arriba
   aunque esté escrita antes que ellas. */
/* #menu .activo { color: darkorange; } */`}
        />

        <Nota tipo="info" titulo="Arriba de todo está el atributo style">
          <p>
            Un estilo escrito en línea (<code>style=&quot;color: red&quot;</code>)
            no participa de la terna: le gana a cualquier selector. Es una de las
            razones por las que{" "}
            <Link href="/css/bases">no conviene estilar en línea</Link>. Después
            de eso solo queda <code>!important</code>, que es lo que sigue.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Cómo verlo sin calcular a mano">
          <p>
            Abrí las herramientas del navegador con <code>F12</code>, elegí el
            elemento y mirá el panel <em>Styles</em>: las declaraciones que
            perdieron aparecen <s>tachadas</s>, y arriba de cada regla dice el
            archivo y la línea. Es más rápido que contar casilleros y nunca se
            equivoca.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="!important, @layer y cómo mantener esto sano">
        <p>
          <code>!important</code> se escribe al final de una declaración y la
          saca de la competencia normal: gana sin importar la especificidad.
          Suena práctico y por eso es la primera reacción de todo el mundo cuando
          algo no se aplica. El problema es que no resuelve nada, mueve el
          problema a mañana.
        </p>

        <Codigo
          archivo="sintaxis"
          codigo={`.boton {
  color: white !important;   /* va en la declaración, no en el selector */
}`}
        />

        <Comparacion>
          <Columna tono="mal" titulo="Tapar el síntoma">
            <Codigo
              codigo={`/* Alguien escribió esto en algún lado: */
#sidebar .widget p { color: gray; }

/* Y para que mi texto se vea, esto: */
.destacado { color: crimson !important; }

/* La semana que viene, para pisar aquello: */
#main .otra-cosa { color: blue !important; }`}
            />
            <p className="tenue">
              A un <code>!important</code> solo lo pisa otro{" "}
              <code>!important</code> más específico. Terminás con una carrera
              armamentística y sin forma de volver atrás.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Bajar la especificidad del otro">
            <Codigo
              codigo={`/* Lo que estaba de más era el id y la cadena larga. */
.widget-texto { color: gray; }

/* Ahora esto alcanza y sobra: */
.destacado { color: crimson; }`}
            />
            <p className="tenue">
              Si todas tus reglas son de una clase, ganar es cuestión de escribir
              la tuya después. Nunca necesitás escalar.
            </p>
          </Columna>
        </Comparacion>

        <p>
          Hay tres casos en los que <code>!important</code> sí se justifica: para
          pisar estilos en línea que mete una librería de terceros y no podés
          tocar; en clases utilitarias de una sola propiedad del tipo{" "}
          <code>.oculto {"{"} display: none !important; {"}"}</code>; y para
          depurar, cuando querés confirmar en cinco segundos que estás editando
          el selector correcto. En ese último caso, sacalo antes de guardar.
        </p>

        <Nota tipo="info" titulo="@layer: ordenar la cascada a mano">
          <p>
            Las capas te dejan declarar un orden de prioridad{" "}
            <strong>antes</strong> que la especificidad. Cualquier regla de una
            capa posterior le gana a cualquier regla de una capa anterior, por
            más débil que sea su selector. Es la forma moderna de convivir con un
            framework sin pelearse a fuerza de <code>!important</code>.
          </p>
          <Codigo
            archivo="estilos.css"
            codigo={`/* Se declara el orden una vez, arriba de todo. */
@layer base, framework, componentes;

@layer framework {
  #sidebar .widget p { color: gray; }   /* (1,1,1), pero está antes */
}

@layer componentes {
  .destacado { color: crimson; }        /* (0,1,0) y gana igual */
}`}
          />
          <p>
            Lo que está fuera de toda capa gana a lo que está adentro de
            cualquiera, así que tu CSS suelto de siempre sigue funcionando igual.
          </p>
        </Nota>

        <h3>Las cuatro reglas que te ahorran todos estos problemas</h3>

        <ol>
          <li>
            <strong>Usá clases para casi todo.</strong> Una sola clase por regla
            deja a toda tu hoja en <code>(0,1,0)</code>, y con todo empatado el
            desempate es el orden, que es fácil de razonar.
          </li>
          <li>
            <strong>No estiles por id.</strong> El id sirve para enlazar (
            <code>#seccion</code> en la URL) y para el <code>for</code> de un{" "}
            <code>&lt;label&gt;</code>. Para estilar, mete un salto de
            especificidad que después no hay cómo pisar.
          </li>
          <li>
            <strong>Nombrá la cosa, no el lugar.</strong>{" "}
            <code>.tarjeta-precio</code> sobrevive a que la muevas de sección;{" "}
            <code>.sidebar div p</code> no.
          </li>
          <li>
            <strong>Si estás por escribir <code>!important</code>, andá a mirar
            la regla que te está ganando.</strong> Nueve de cada diez veces la
            solución es borrarle un <code>#id</code> a ella, no agregarle fuerza a
            la tuya.
          </li>
        </ol>

        <p>
          Con esto ya podés leer cualquier hoja de estilos. Lo que sigue es qué
          hacen las propiedades: arrancá por{" "}
          <Link href="/css/caja">El modelo de caja</Link>, que es lo que explica
          por qué las cosas ocupan el espacio que ocupan.
        </p>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. El estilo que no se aplica"
          pista={
            <div>
              <p>
                Contá la terna de las dos reglas. <code>#caja p</code> tiene un
                id y una etiqueta: <code>(1,0,1)</code>. <code>.destacado</code>{" "}
                tiene una clase: <code>(0,1,0)</code>. El primer casillero decide
                antes que el segundo, así que el orden en la hoja ni se mira.
              </p>
              <p>
                Hay dos salidas posibles. Una es <em>subir</em> la tuya hasta
                pasar el id. La otra, la que vas a querer en un proyecto de
                verdad, es <em>bajar</em> la de ellos. Probá las dos.
              </p>
            </div>
          }
          solucion={
            <div>
              <p>
                La solución de emergencia, cuando no podés tocar la regla del id,
                es agregarle especificidad a la tuya hasta superarla:{" "}
                <code>#caja p.destacado</code> queda en <code>(1,1,1)</code> y
                gana. Funciona, pero acabás de subir el piso para el próximo que
                quiera pisar esto.
              </p>
              <p>
                La solución buena es reemplazar el id por una clase en la regla
                que estorba. Las dos quedan en <code>(0,1,0)</code> y entonces sí
                manda el orden de la hoja:
              </p>
              <Editor
                solapas="css"
                alto={110}
                consigna="Este es el resultado: las dos reglas empatadas en (0,1,0) y la de abajo ganando."
                html={`<div id="caja" class="caja">
  <p>Un párrafo normal.</p>
  <p class="destacado">Este tendría que verse rojo y grande.</p>
</div>`}
                css={`/* Antes decía #caja p — ahora es una clase, (0,1,0). */
.caja p { color: #64748b; font-size: 1rem; }

/* Misma especificidad y está más abajo: gana. Sin !important. */
.destacado { color: crimson; font-size: 1.4rem; }`}
              />
            </div>
          }
        >
          <p>
            En el editor de abajo, el párrafo con <code>class=&quot;destacado&quot;</code>{" "}
            tendría que verse rojo y grande, pero se ve gris y chico. Averiguá por
            qué y arreglalo <strong>sin usar <code>!important</code></strong> y
            sin tocar el HTML.
          </p>
          <Editor
            solapas="css"
            alto={110}
            consigna="Arreglalo acá mismo. Pista: contá la terna de cada una de las dos reglas."
            html={`<div id="caja" class="caja">
  <p>Un párrafo normal.</p>
  <p class="destacado">Este tendría que verse rojo y grande.</p>
</div>`}
            css={`#caja p { color: #64748b; font-size: 1rem; }

.destacado { color: crimson; font-size: 1.4rem; }`}
          />
        </Desafio>

        <Desafio
          titulo="2. Una lista de tareas sin una línea de JavaScript"
          pista={
            <div>
              <p>Son cuatro reglas y ninguna necesita tocar el HTML:</p>
              <ul>
                <li>
                  Para las filas alternadas, <code>:nth-child(odd)</code> sobre
                  los <code>li</code>.
                </li>
                <li>
                  Para tachar el texto, acordate de que{" "}
                  <code>:checked</code> mira el estado real del control, y que el
                  texto está en un <code>&lt;span&gt;</code> que es{" "}
                  <strong>hermano posterior</strong> del input.
                </li>
                <li>
                  Para pintar el <code>&lt;li&gt;</code> entero necesitás mirar
                  hacia adentro: ahí entra <code>:has()</code>.
                </li>
                <li>
                  Para el contador, un <code>::after</code> en el{" "}
                  <code>&lt;ul&gt;</code> con un <code>content</code> de texto.
                </li>
              </ul>
            </div>
          }
          solucion={
            <Editor
              solapas="css"
              alto={220}
              consigna="Tildá y destildá los checkboxes: todo esto es CSS puro, no hay una sola línea de JavaScript."
              html={`<ul class="tareas">
  <li><label><input type="checkbox"> <span>Leer la lección de selectores</span></label></li>
  <li><label><input type="checkbox" checked> <span>Hacer el editor de la cascada</span></label></li>
  <li><label><input type="checkbox"> <span>Repasar especificidad</span></label></li>
  <li><label><input type="checkbox"> <span>Dormir</span></label></li>
</ul>`}
              css={`.tareas { list-style: none; padding: 0; margin: 0; max-width: 360px; }

.tareas li { padding: 6px 10px; border-bottom: 1px solid #e2e8f0; }

/* 1. Filas alternadas. */
.tareas li:nth-child(odd) { background: #f8fafc; }

/* 2. El texto tachado: el span es hermano posterior del input. */
input:checked + span { text-decoration: line-through; color: #94a3b8; }

/* 3. La fila entera, mirando hacia adentro con :has(). */
.tareas li:has(input:checked) { background: #f0fdf4; }

/* 4. Un encabezado generado con ::before en el <ul>. */
.tareas::before {
  content: "Pendientes de hoy";
  display: block;
  font-weight: 700;
  padding: 6px 10px;
  background: #e0f2fe;
}

/* Extra: el primero y el último, redondeados. */
.tareas li:first-child { border-radius: 6px 6px 0 0; }
.tareas li:last-child { border-bottom: 0; border-radius: 0 0 6px 6px; }`}
            />
          }
        >
          <p>
            Esta lista no tiene ni una clase en los <code>&lt;li&gt;</code> y no
            se puede tocar el HTML. Escribí el CSS para que: las filas impares
            tengan fondo gris claro, el texto de una tarea tildada aparezca
            tachado y gris, el <code>&lt;li&gt;</code> entero de una tarea tildada
            se pinte de verde suave, y arriba de la lista aparezca un título{" "}
            <em>Pendientes de hoy</em> que no está escrito en el HTML.
          </p>
          <Editor
            solapas="css"
            alto={220}
            consigna="Resolvelo acá. Vas a necesitar :nth-child, :checked con un combinador, :has() y un pseudo-elemento."
            html={`<ul class="tareas">
  <li><label><input type="checkbox"> <span>Leer la lección de selectores</span></label></li>
  <li><label><input type="checkbox" checked> <span>Hacer el editor de la cascada</span></label></li>
  <li><label><input type="checkbox"> <span>Repasar especificidad</span></label></li>
  <li><label><input type="checkbox"> <span>Dormir</span></label></li>
</ul>`}
            css={`.tareas { list-style: none; padding: 0; margin: 0; max-width: 360px; }

.tareas li { padding: 6px 10px; border-bottom: 1px solid #e2e8f0; }

/* Escribí acá las cuatro reglas que faltan. */`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
