import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "Responsive y variables" };

export default function Pagina() {
  return (
    <Leccion
      slug="/css/responsive"
      titulo="Responsive y variables"
      resumen="Media queries, variables CSS, tema oscuro y las funciones que evitan la mitad de los breakpoints."
    >
      <Seccion titulo="Responsive no es &quot;hacer una versión para el celular&quot;">
        <p>
          La idea que hay que sacarse de la cabeza primero es que existan{" "}
          <em>dos sitios</em>. Hace quince años sí: estaba{" "}
          <code>sitio.com</code> y estaba <code>m.sitio.com</code>, dos
          proyectos, dos deploys y dos lugares donde arreglar el mismo bug.{" "}
          <strong>Responsive es lo contrario</strong>: un solo documento HTML,
          un solo CSS, que se acomoda al espacio que le toca.
        </p>

        <p>
          Y &quot;el espacio que le toca&quot; no es una lista de tres tamaños.
          Es un <strong>rango continuo</strong>: un celular parado, el mismo
          celular acostado, un iPad con la pantalla partida en dos, tu navegador
          a media pantalla al lado del editor, un monitor de 4K, el navegador de
          un televisor. No podés enumerarlos. Lo único que podés hacer es
          escribir CSS que aguante cualquier ancho.
        </p>

        <Nota tipo="info" titulo="El HTML ya viene responsive; vos lo rompés">
          <p>
            Un documento sin una sola línea de CSS funciona perfecto en
            cualquier pantalla: los párrafos se reacomodan solos, las imágenes
            bajan de renglón, nada se desborda. El problema aparece en el
            momento exacto en que escribís un <strong>ancho fijo</strong>. Por
            eso buena parte de esta lección no es &quot;agregar cosas para que
            se adapte&quot;, sino <strong>dejar de romper lo que ya andaba</strong>.
          </p>
        </Nota>

        <p>
          Mirá la diferencia entre <code>width</code> y <code>max-width</code>.
          Es la primera regla responsive que vas a escribir en tu vida y sigue
          siendo de las más importantes:
        </p>

        <Editor
          consigna="La caja roja se desborda. Cambiale width: 560px por max-width: 560px y mirá cómo se adapta sin dejar de tener su tope."
          html={`<div class="fija">width: 560px — me desbordo sin pedir permiso</div>
<div class="flexible">max-width: 560px — me achico si hace falta</div>`}
          css={`.fija {
  width: 560px;          /* SIEMPRE 560, entre o no entre */
  background: #fdeaed;
  border: 2px solid #b4243a;
  padding: 14px;
  margin-bottom: 12px;
}

.flexible {
  max-width: 560px;      /* como mucho 560, si no lo que haya */
  background: #e3f6ee;
  border: 2px solid #0f7a52;
  padding: 14px;
}`}
        />

        <p>
          <code>width: 560px</code> es una orden. <code>max-width: 560px</code>{" "}
          es un techo: el elemento sigue siendo flexible como era, pero no pasa
          de ahí. Como regla práctica,{" "}
          <strong>
            en un layout responsive casi nunca escribís <code>width</code> en
            píxeles
          </strong>
          . Escribís <code>max-width</code>, o dejás que{" "}
          <Link href="/css/flexbox">Flexbox</Link> y{" "}
          <Link href="/css/grid">Grid</Link> repartan.
        </p>

        <h3>Sin el meta viewport no funciona nada de esto</h3>
        <p>
          Esta línea va en el <code>&lt;head&gt;</code> y ya la viste en{" "}
          <Link href="/html/bases">Cómo funciona la web</Link>. No es
          decorativa: <strong>es el interruptor</strong> que hace que todo lo
          demás de esta lección exista.
        </p>

        <Codigo
          archivo="index.html"
          codigo={`<meta name="viewport" content="width=device-width, initial-scale=1">`}
        />

        <p>
          ¿Por qué hace falta? Cuando los celulares empezaron a tener navegador,
          la web entera estaba hecha para monitores. Si un teléfono se hubiera
          declarado de 390px de ancho, todos los sitios del mundo se habrían
          visto rotos. Así que hicieron trampa:{" "}
          <strong>
            el celular miente y dice que mide 980px
          </strong>
          , dibuja la página con ese ancho imaginario y después la achica toda
          junta, como una foto. Por eso los sitios viejos en el celular se ven
          enteros pero con la letra ilegible.
        </p>

        <p>Traducida, la línea dice dos cosas:</p>
        <ul>
          <li>
            <code>width=device-width</code> — dejá de mentir, el ancho del
            viewport es el ancho real del dispositivo.
          </li>
          <li>
            <code>initial-scale=1</code> — y arrancá sin zoom, 1 píxel CSS = 1
            píxel de los tuyos.
          </li>
        </ul>

        <Nota tipo="atencion" titulo="Lo que NO va en esa línea">
          <p>
            Vas a encontrar copiada por ahí la versión con{" "}
            <code>user-scalable=no</code> o <code>maximum-scale=1</code>. Eso le
            prohíbe al usuario hacer zoom con los dedos. Para alguien que ve
            poco es directamente dejarlo afuera del sitio, y las auditorías de
            accesibilidad lo marcan como error. Nunca lo agregues: si tu diseño
            se rompe cuando alguien hace zoom, el problema es el diseño.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Mobile first y media queries">
        <p>
          Una <strong>media query</strong> es un bloque de CSS que solo se
          aplica si se cumple una condición. La sintaxis mínima es esta, y
          siempre va en el <strong>nivel de arriba del archivo</strong>, nunca
          adentro de un selector:
        </p>

        <Codigo
          archivo="estilos.css"
          resaltar={[1]}
          codigo={`@media (min-width: 720px) {
  /* Acá adentro van reglas completas, con su selector y todo.
     Solo se aplican cuando el viewport mide 720px o más. */
  .tarjetas {
    grid-template-columns: 1fr 1fr;
  }
}`}
        />

        <p>Las dos condiciones que vas a usar el 95% del tiempo:</p>
        <ul>
          <li>
            <code>min-width: 720px</code> — <em>de 720 para arriba</em>. Es la
            de mobile first.
          </li>
          <li>
            <code>max-width: 719.98px</code> — <em>de 720 para abajo</em>. Es la
            de desktop first.
          </li>
        </ul>

        <h3>Por qué conviene empezar por lo chico</h3>
        <p>
          Las dos formas producen el mismo resultado en pantalla. La diferencia
          está en cuál de las dos vas a poder mantener dentro de seis meses:
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Desktop first: con max-width">
            <Codigo
              archivo="estilos.css"
              codigo={`/* El estilo base es el caso COMPLICADO,
   y después vas deshaciéndolo. */
.panel {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 32px;
  padding: 48px;
}

@media (max-width: 720px) {
  .panel {
    grid-template-columns: 1fr;  /* deshacer */
    gap: 16px;                   /* deshacer */
    padding: 16px;               /* deshacer */
  }
}`}
            />
            <p className="tenue">
              Cada regla de arriba tiene su contra-regla abajo. Agregás una
              propiedad y te olvidás de anularla: bug en el celular.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Mobile first: con min-width">
            <Codigo
              archivo="estilos.css"
              codigo={`/* El estilo base es el caso SIMPLE:
   una columna, que es como ya venía. */
.panel {
  display: grid;
  gap: 16px;
  padding: 16px;
}

@media (min-width: 720px) {
  .panel {
    grid-template-columns: 240px 1fr;  /* agregar */
    gap: 32px;
    padding: 48px;
  }
}`}
            />
            <p className="tenue">
              La media query solo <strong>agrega</strong>. Si mañana borrás el
              bloque entero, el sitio sigue funcionando: se ve angosto, pero
              entero.
            </p>
          </Columna>
        </Comparacion>

        <p>Los tres argumentos concretos a favor de mobile first:</p>
        <ul>
          <li>
            <strong>El caso base es el más simple.</strong> Una columna, sin
            posicionamiento, es casi el comportamiento por defecto del
            navegador. Estás empujando el CSS a favor de la corriente.
          </li>
          <li>
            <strong>Nunca escribís &quot;deshacer&quot;.</strong> Solo sumás
            reglas cuando hay lugar. Menos reglas peleándose es menos
            <Link href="/css/selectores"> problemas de cascada</Link>.
          </li>
          <li>
            <strong>Si algo falla, falla del lado seguro.</strong> Un navegador
            raro que no entiende tu media query muestra la versión simple, que
            se lee igual. Con desktop first muestra la versión de escritorio
            apretada en 360px.
          </li>
        </ul>

        <Nota tipo="info" titulo="Ojo con lo que mide una media query acá adentro">
          <p>
            El resultado de estos editores vive dentro de un marco aislado, así
            que una media query escrita acá compara contra el{" "}
            <strong>ancho del panel de resultado</strong> (unos 430px en
            pantalla ancha), no contra el de tu ventana. Por eso vas a ver
            puntos de corte raros como 380px o 420px en los ejemplos.
          </p>
          <p>
            Y eso nos conviene: en vez de andar arrastrando el borde de la
            ventana, <strong>cambiale el número a la media query</strong> y la
            ves disparar al instante. Las dos cosas son equivalentes; mover el
            umbral es mucho más rápido que mover la pantalla.
          </p>
        </Nota>

        <Editor
          consigna="Subí el 400px del min-width a 900px: el layout de escritorio desaparece al instante. Bajalo a 200px y vuelve. Ese número es el punto de corte."
          html={`<div class="panel">
  <aside class="menu">menú</aside>
  <main class="contenido">
    <h3>Mobile first</h3>
    <p>El estilo base es de una columna. La media query solo agrega.</p>
  </main>
</div>`}
          css={`/* --- Estilo base: pantalla chica. Nada de media queries. --- */
.panel {
  display: grid;
  gap: 10px;
}

.menu, .contenido {
  background: #eef3fa;
  border: 1px solid #d3e0f0;
  border-radius: 8px;
  padding: 12px;
}

.contenido h3 { margin: 0 0 6px; }
.contenido p  { margin: 0; font-size: 13px; color: #55697f; }

/* --- De acá para arriba hay lugar para dos columnas. --- */
@media (min-width: 400px) {
  .panel {
    grid-template-columns: 130px 1fr;
    gap: 16px;
  }
  .menu { background: #e3f6ee; }
}`}
        />

        <h3>Combinar condiciones</h3>
        <p>
          Con <code>and</code> tienen que cumplirse las dos. Con una{" "}
          <strong>coma</strong> alcanza con que se cumpla alguna (la coma es el{" "}
          <em>o</em>). También existe <code>not</code>, que se usa poco.
        </p>

        <Codigo
          archivo="estilos.css"
          codigo={`/* Solo en la franja del medio: de 600 a 900 inclusive. */
@media (min-width: 600px) and (max-width: 900px) { … }

/* Ancho grande Y pantalla apaisada. */
@media (min-width: 900px) and (orientation: landscape) { … }

/* Muy angosto O muy ancho (la coma es "o"). */
@media (max-width: 400px), (min-width: 1600px) { … }

/* Sintaxis moderna de rangos: se lee como una desigualdad
   y evita el problema del 719.98px. */
@media (width >= 720px) { … }
@media (600px <= width <= 900px) { … }`}
        />

        <Nota tipo="atencion" titulo="El píxel del medio">
          <p>
            Si escribís <code>(max-width: 720px)</code> y{" "}
            <code>(min-width: 720px)</code>, en exactamente 720px{" "}
            <strong>se aplican las dos</strong> y gana la que esté última en el
            archivo. Peor: con el zoom o en un monitor de alta densidad el ancho
            del viewport puede ser <code>720.5px</code> y no entrar en ninguna
            de las dos. Por eso históricamente se escribía{" "}
            <code>max-width: 719.98px</code>. La sintaxis de rangos{" "}
            <code>(width &lt; 720px)</code> resuelve esto de raíz y ya anda en
            todos los navegadores actuales.
          </p>
        </Nota>

        <h3>Dónde poner los puntos de corte</h3>
        <p>
          Acá está el error más común de la materia: buscar en Google &quot;los
          breakpoints de iPhone&quot; y copiar una lista. No sirve, por dos
          motivos. Uno, esa lista cambia todos los años y en el medio hay mil
          Android distintos. Dos, y más importante:{" "}
          <strong>
            el punto donde tu diseño se rompe no tiene nada que ver con el ancho
            de ningún teléfono
          </strong>
          . Depende de cuánto mide tu menú, cuántas tarjetas querés por fila y
          qué largo tiene tu título más largo.
        </p>

        <p>El método correcto es aburrido y lleva dos minutos:</p>
        <ol>
          <li>Abrí tu página en la pantalla más angosta que soportes.</li>
          <li>
            Ensanchá la ventana <strong>de a poco</strong>, mirando.
          </li>
          <li>
            En algún momento algo se va a ver mal: queda demasiado blanco al
            costado, una línea de texto se vuelve larguísima, dos cosas que
            deberían estar juntas quedan lejos.{" "}
            <strong>Ese ancho es tu punto de corte.</strong>
          </li>
          <li>Escribís la media query ahí y seguís ensanchando.</li>
        </ol>

        <p>
          Vas a terminar con dos o tres cortes, no con ocho. Y van a caer en
          números arbitrarios como 640 o 880, que es exactamente como tiene que
          ser.
        </p>

        <Editor
          consigna="Este ejemplo tiene dos cortes. Movelos: poné 300 y 520 en vez de 340 y 460, y fijate que el layout va pasando por tres estados distintos."
          html={`<div class="tarjetas">
  <article>HTML</article>
  <article>CSS</article>
  <article>JavaScript</article>
  <article>React</article>
</div>
<p class="estado">Estado actual: <b>1 columna</b></p>`}
          css={`.tarjetas {
  display: grid;
  grid-template-columns: 1fr;      /* base: pantalla chica */
  gap: 8px;
}

article {
  background: #14538f;
  color: white;
  padding: 16px 10px;
  text-align: center;
  border-radius: 6px;
  font-weight: 700;
}

.estado { font-size: 13px; color: #55697f; }
.estado b { color: #b4243a; }

/* Primer corte: entran dos. */
@media (min-width: 340px) {
  .tarjetas { grid-template-columns: 1fr 1fr; }
  .estado b { color: #92600a; }
}

/* Segundo corte: entran las cuatro. */
@media (min-width: 460px) {
  .tarjetas { grid-template-columns: repeat(4, 1fr); }
  .estado b { color: #0f7a52; }
}`}
        />

        <Nota tipo="ok" titulo="El modo dispositivo de las devtools">
          <p>
            Apretá <strong>F12</strong> y después el ícono de{" "}
            <strong>celular y tablet</strong> arriba a la izquierda del panel
            (o <strong>Ctrl+Shift+M</strong>). Eso te da tres cosas que valen
            oro:
          </p>
          <ul>
            <li>
              Una <strong>regla con el ancho actual</strong> arriba de la
              página, y manijas para arrastrar. Ahí es donde hacés el paso 2 del
              método de arriba, y encima te muestra el número exacto.
            </li>
            <li>
              La lista de dispositivos, para ver cómo queda en un tamaño
              concreto, y el botón de <strong>rotar</strong>.
            </li>
            <li>
              La <strong>simulación de red lenta</strong> (&quot;Slow 4G&quot;),
              que es el otro 50% de lo que significa que un sitio ande bien en
              un celular.
            </li>
          </ul>
          <p>
            Lo que <em>no</em> simula es el dedo: los eventos siguen siendo de
            mouse, y el rendimiento sigue siendo el de tu computadora. Para eso
            no hay atajo, hay que probar en un teléfono de verdad.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Más allá del ancho: las condiciones que preguntan por el usuario">
        <p>
          El ancho es la condición más famosa, pero las media queries preguntan
          muchas otras cosas, y varias no son sobre la pantalla sino sobre{" "}
          <strong>quién está del otro lado y con qué está navegando</strong>.
          Estas cuatro son las que de verdad vas a usar.
        </p>

        <h3>prefers-color-scheme: el tema del sistema operativo</h3>
        <p>
          El usuario eligió claro u oscuro en su sistema, y el navegador te lo
          cuenta. No hace falta ningún botón para respetarlo. Le dedicamos una
          sección entera más abajo, porque combinado con variables es donde
          esto se vuelve realmente potente.
        </p>

        <h3>prefers-reduced-motion: animaciones que marean de verdad</h3>
        <p>
          No es una preferencia estética. Para gente con trastornos
          vestibulares, una animación de <em>parallax</em> o algo que entra
          deslizándose de costado produce mareo y náuseas reales. Todos los
          sistemas tienen una opción de &quot;reducir movimiento&quot;, y esta
          media query te la expone.
        </p>

        <p>
          La forma correcta de usarla es al revés de lo que uno piensa. En vez
          de animar siempre y apagar en el caso especial, conviene tener{" "}
          <strong>un interruptor general al final de tu hoja de estilos</strong>
          , para que la promesa se cumpla aunque agregues animaciones nuevas y
          te olvides:
        </p>

        <Codigo
          archivo="estilos.css"
          codigo={`/* Al final del archivo. Apaga TODO de una, incluido el
   scroll suave, sin que tengas que acordarte caso por caso. */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}
        />

        <Nota tipo="info" titulo="¿Por qué 0.01ms y no 0s?">
          <p>
            Porque una animación de duración cero{" "}
            <strong>nunca dispara el evento</strong> <code>animationend</code>,
            y hay código JavaScript que espera ese evento para, por ejemplo,
            sacar un cartel de la pantalla. Con 0.01ms el evento llega igual,
            instantáneamente, y nada se cuelga. Es uno de esos detalles que no
            entra en ninguna clase y te ahorra una tarde.
          </p>
        </Nota>

        <Editor
          alto={200}
          consigna="Cambiá el reduce por no-preference: vas a ver la caja frenar en seco en tu propia máquina. Ese es exactamente el efecto que siente alguien con la opción activada."
          html={`<div class="pelota"></div>
<p class="pie">Si tenés &quot;reducir movimiento&quot; activado en tu sistema,
esta caja ya está quieta.</p>`}
          css={`.pelota {
  width: 46px;
  height: 46px;
  border-radius: 8px;
  background: #14538f;
  animation: ir-y-venir 1.6s ease-in-out infinite alternate;
}

@keyframes ir-y-venir {
  from { transform: translateX(0); }
  to   { transform: translateX(180px); }
}

/* Probá cambiar "reduce" por "no-preference" acá abajo. */
@media (prefers-reduced-motion: reduce) {
  .pelota { animation: none; }
}

.pie { font-size: 12px; color: #55697f; margin: 14px 0 0; }`}
        />

        <h3>hover y pointer: distinguir un mouse de un dedo</h3>
        <p>
          Un menú que se abre al pasar el mouse por encima es{" "}
          <strong>inusable con el dedo</strong>: no existe el &quot;pasar por
          encima&quot;, el primer toque ya es un click. Estas dos condiciones te
          dejan preguntar por el dispositivo de entrada:
        </p>

        <ul>
          <li>
            <code>(hover: hover)</code> — el puntero principal puede quedarse
            encima de algo. O sea: hay mouse o trackpad.{" "}
            <code>(hover: none)</code> es pantalla táctil.
          </li>
          <li>
            <code>(pointer: fine)</code> — puntero preciso, un mouse.{" "}
            <code>(pointer: coarse)</code> — puntero grueso: un dedo. Sirve para
            agrandar las zonas clickeables donde hace falta.
          </li>
        </ul>

        <Editor
          consigna="Cambiá (hover: hover) por (hover: none) y el efecto desaparece en tu compu, porque vos tenés mouse. Así ve esa tarjeta alguien desde el celular."
          html={`<div class="tarjeta">
  <h3>Pasame el mouse por encima</h3>
  <p>Me levanto y me pongo azul. En un celular, no.</p>
</div>

<button class="accion">Tocame</button>`}
          css={`.tarjeta {
  background: #eef3fa;
  border: 1px solid #d3e0f0;
  border-radius: 8px;
  padding: 14px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.tarjeta h3 { margin: 0 0 4px; font-size: 15px; }
.tarjeta p  { margin: 0; font-size: 13px; color: #55697f; }

/* El efecto de hover solo se define si hay con qué hacer hover. */
@media (hover: hover) {
  .tarjeta:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(16, 62, 107, 0.18);
    border-color: #2f6fb5;
  }
}

.accion {
  font: inherit;
  margin-top: 12px;
  padding: 6px 12px;
  border: 1px solid #14538f;
  border-radius: 6px;
  background: white;
  color: #14538f;
}

/* Con el dedo hace falta más superficie para no errarle. */
@media (pointer: coarse) {
  .accion { padding: 14px 22px; font-size: 17px; }
}`}
        />

        <h3>print: la hoja de estilos que nadie escribe</h3>
        <p>
          Cualquier página que alguien vaya a imprimir o guardar como PDF —una
          factura, un comprobante, un apunte— merece diez líneas de CSS. Se
          activa con <code>@media print</code> y el criterio es simple:{" "}
          <strong>sacá todo lo que no sea el contenido</strong>.
        </p>

        <Codigo
          archivo="estilos.css"
          codigo={`@media print {
  /* Nada de esto tiene sentido en papel. */
  nav, .barra, .botones, footer, video { display: none; }

  /* Tinta: fondo blanco y texto negro. */
  body { background: white; color: black; }

  /* Un enlace impreso no se puede clickear: mostrá adónde iba. */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #555;
  }

  /* No partas un título del párrafo que sigue. */
  h2, h3 { break-after: avoid; }
  table, figure { break-inside: avoid; }
}`}
        />

        <Nota tipo="ok" titulo="Cómo lo probás sin gastar papel">
          <p>
            Dos caminos. El rápido: <strong>Ctrl+P</strong> y mirás la vista
            previa. El bueno, porque te deja inspeccionar: en las devtools,{" "}
            <strong>Ctrl+Shift+P</strong>, escribís{" "}
            <em>Show Rendering</em>, y en ese panel ponés{" "}
            <strong>Emulate CSS media type: print</strong>. La página se queda
            en modo impresión y podés seguir tocando estilos en vivo.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="clamp(), min() y max(): las media queries que no escribís">
        <p>
          Una media query es un <strong>salto</strong>: en 719px tenés una cosa
          y en 720px otra. Pero muchas veces lo que querés no es saltar, es{" "}
          <strong>acompañar</strong>: que el título crezca de a poco, que el
          margen se agrande solo, que la caja se estire hasta cierto punto. Para
          eso están estas tres funciones, y son la parte más útil de toda la
          lección: cada una que usás bien te borra dos o tres media queries.
        </p>

        <p>
          Funcionan <strong>en cualquier lugar donde vaya un número</strong>:
          ancho, alto, padding, margin, gap, font-size, border-radius, columnas
          de Grid. Y aceptan mezclar unidades, que es justamente lo que no podés
          hacer a mano.
        </p>

        <h3>min() y max(), que están dados vuelta</h3>
        <p>
          Esta es la parte que confunde a todo el mundo, así que vale la pena
          decirla despacio:
        </p>

        <ul>
          <li>
            <code>min(a, b)</code> devuelve <strong>el más chico</strong> de los
            dos. Como nunca puede devolver algo más grande que el menor, en la
            práctica te está poniendo un <strong>techo</strong>. Sí:{" "}
            <em>min</em> se usa para un máximo.
          </li>
          <li>
            <code>max(a, b)</code> devuelve <strong>el más grande</strong>, así
            que te está poniendo un <strong>piso</strong>. <em>max</em> se usa
            para un mínimo.
          </li>
        </ul>

        <p>
          El caso clásico, el contenedor de contenido. Estas dos escrituras
          hacen exactamente lo mismo, pero la de la derecha es una línea y se
          puede meter adentro de otra función:
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Dos propiedades">
            <Codigo
              archivo="estilos.css"
              codigo={`.contenedor {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Una sola, con min()">
            <Codigo
              archivo="estilos.css"
              codigo={`.contenedor {
  width: min(100%, 900px);
  margin: 0 auto;
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          Y ahora la versión que de verdad se usa en producción, que además
          resuelve los márgenes laterales sin padding:{" "}
          <code>width: min(100% - 2rem, 900px)</code>. Fijate que adentro de
          estas funciones{" "}
          <strong>
            podés restar unidades distintas sin escribir <code>calc()</code>
          </strong>
          : la aritmética ya está permitida ahí adentro.
        </p>

        <Editor
          consigna="Cambiá el 900px por 200px: el ancho deja de mandar el 100% y manda el tope. Después probá min(100% - 4rem, 900px) para que aparezcan márgenes."
          html={`<div class="caja">width: min(100% - 2rem, 900px)</div>
<div class="caja b">width: min(100%, 900px) — sin restar</div>`}
          css={`.caja {
  /* El 100% - 2rem gana mientras la pantalla sea angosta;
     el 900px gana cuando hay lugar de sobra. */
  width: min(100% - 2rem, 900px);
  margin: 0 auto 12px;

  background: #e3f6ee;
  border: 2px solid #0f7a52;
  padding: 14px;
  text-align: center;
  font-size: 13px;
}

.b {
  width: min(100%, 900px);
  background: #eef3fa;
  border-color: #2f6fb5;
}`}
        />

        <h3>clamp(): el que resuelve la tipografía</h3>
        <p>
          <code>clamp()</code> recibe tres valores y se leen así, de izquierda a
          derecha:
        </p>

        <Codigo
          archivo="estilos.css"
          resaltar={[2]}
          codigo={`h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  /*                 │      │     └── TECHO: nunca más de 3rem
                     │      └──────── IDEAL: lo que querría medir (varía)
                     └─────────────── PISO: nunca menos de 1.5rem      */
}`}
        />

        <p>
          Es literalmente lo mismo que escribir{" "}
          <code>max(1.5rem, min(5vw, 3rem))</code>, solo que legible. El valor
          del medio <strong>tiene que ser algo que varíe</strong> —un{" "}
          <code>vw</code>, un porcentaje, un <code>%</code> del contenedor— o la
          función no hace nada: si ponés tres valores fijos siempre te va a dar
          el mismo número.
        </p>

        <Editor
          consigna="Subí el 6vw a 14vw y mirá el título chocar contra el techo. Después bajá el techo de 2rem a 1.2rem y fijate que el piso y el techo se pisan."
          html={`<h1>Tipografía fluida</h1>
<p class="bajada">Este párrafo también crece, pero mucho menos que el título.</p>
<p class="fijo">Este es de 14px fijos, para comparar.</p>`}
          css={`h1 {
  /* piso 1.1rem — ideal 6vw — techo 2rem */
  font-size: clamp(1.1rem, 6vw, 2rem);
  margin: 0 0 8px;
  line-height: 1.15;
  color: #103e6b;
}

.bajada {
  font-size: clamp(0.85rem, 2.5vw, 1.1rem);
  margin: 0 0 10px;
  color: #55697f;
}

.fijo {
  font-size: 14px;
  margin: 0;
  color: #b4243a;
}`}
        />

        <Nota tipo="atencion" titulo="Nunca uses vw solo para el tamaño de la letra">
          <p>
            <code>font-size: 5vw</code> a secas es un problema de accesibilidad
            serio: el <code>vw</code> no cambia cuando el usuario hace zoom con{" "}
            <strong>Ctrl +</strong> ni cuando sube el tamaño de letra del
            navegador, así que la persona que necesita agrandar el texto{" "}
            <strong>no puede</strong>.
          </p>
          <p>
            La solución es que el piso y el techo estén en <code>rem</code>{" "}
            —porque el <code>rem</code> sí responde al zoom— y, mejor todavía,
            que el valor del medio mezcle las dos:{" "}
            <code>clamp(1rem, 0.9rem + 0.6vw, 1.4rem)</code>. Esa parte fija en{" "}
            <code>rem</code> adentro del ideal hace que el texto siga creciendo
            con el zoom aunque el ancho de la ventana no cambie.
          </p>
        </Nota>

        <p>
          Lo mismo sirve para el espaciado, que es donde más se nota y donde
          casi nadie lo usa. Un <code>padding</code> de 48px se ve bárbaro en el
          monitor y ridículo en un celular; con <code>clamp()</code> se resuelve
          en una línea sin ninguna media query:
        </p>

        <Editor
          consigna="El padding y el gap son fluidos. Cambiá el clamp(12px, 5vw, 48px) por un 48px fijo y mirá cómo el contenido queda ahogado cuando el panel es angosto."
          html={`<section class="hero">
  <h2>Espaciado fluido</h2>
  <p>El aire alrededor crece y se achica solo, igual que la letra.</p>
  <div class="fila"><span>uno</span><span>dos</span><span>tres</span></div>
</section>`}
          css={`.hero {
  /* Probá reemplazar este clamp por 48px a secas. */
  padding: clamp(12px, 5vw, 48px);

  background: #eef3fa;
  border-radius: clamp(6px, 2vw, 18px);
}

.hero h2 {
  font-size: clamp(1.1rem, 5vw, 1.8rem);
  margin: 0 0 6px;
}

.hero p { margin: 0 0 14px; font-size: 13px; color: #55697f; }

.fila {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(6px, 3vw, 24px);
}

.fila span {
  background: #14538f;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
}`}
        />

        <p>
          Las dos columnas de acá abajo tienen el mismo ancho y el mismo
          contenido. La única diferencia es esa línea:
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="padding: 48px fijo">
            <Vista
              html={`<div class="caja">
  <h4>Título</h4>
  <p>Me queda muy poco lugar para el texto.</p>
</div>`}
              css={`body { padding: 8px; }

.caja {
  padding: 48px;
  background: #fdeaed;
  border: 2px solid #b4243a;
  border-radius: 8px;
}

.caja h4 { margin: 0 0 4px; font-size: 14px; }
.caja p  { margin: 0; font-size: 13px; color: #55697f; }`}
            />
            <p className="tenue">
              Los 48px están pensados para el monitor. En una columna angosta
              se comen el contenido.
            </p>
          </Columna>
          <Columna tono="bien" titulo="padding: clamp(12px, 5vw, 48px)">
            <Vista
              html={`<div class="caja">
  <h4>Título</h4>
  <p>Acá el aire se achicó solo y entra más texto por renglón.</p>
</div>`}
              css={`body { padding: 8px; }

.caja {
  padding: clamp(12px, 5vw, 48px);
  background: #e3f6ee;
  border: 2px solid #0f7a52;
  border-radius: 8px;
}

.caja h4 { margin: 0 0 4px; font-size: 14px; }
.caja p  { margin: 0; font-size: 13px; color: #55697f; }`}
            />
            <p className="tenue">
              El mismo CSS da 48px en el monitor y unos 20px acá. Sin ninguna
              media query.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="ok" titulo="La regla de oro para decidir">
          <p>
            Si lo que querés es que algo <strong>cambie de tamaño</strong> a
            medida que hay más lugar, usá <code>clamp()</code>,{" "}
            <code>min()</code> o <code>max()</code>. Si lo que querés es que
            algo <strong>cambie de forma</strong> —de una columna a dos, de menú
            desplegable a menú horizontal, de tarjeta vertical a tarjeta
            horizontal—, ahí sí necesitás una media query. El tamaño es
            continuo; la forma es un salto.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Variables CSS: un valor, muchos lugares">
        <p>
          Se llaman técnicamente <strong>propiedades personalizadas</strong>{" "}
          (<em>custom properties</em>). Son propiedades comunes de CSS, solo que
          el nombre te lo inventás vos y tiene que empezar con{" "}
          <strong>dos guiones</strong>. Se leen con la función{" "}
          <code>var()</code>:
        </p>

        <Codigo
          archivo="estilos.css"
          resaltar={[2, 7]}
          codigo={`:root {
  --acento: #14538f;          /* declarar: el nombre lleva dos guiones */
}

.boton {
  background: var(--acento);  /* leer */
  border: 1px solid var(--borde-boton, #ccc);   /* con valor de respaldo */
}`}
        />

        <p>Tres detalles de la sintaxis que conviene fijar de entrada:</p>
        <ul>
          <li>
            <code>:root</code> es el elemento <code>&lt;html&gt;</code>, pero
            como selector tiene un poquito más de{" "}
            <Link href="/css/selectores">especificidad</Link>. Es el lugar
            habitual para las variables globales, aunque no es obligatorio.
          </li>
          <li>
            El segundo argumento de <code>var()</code> es el{" "}
            <strong>valor de respaldo</strong>: se usa si la variable no está
            definida. Sirve para componentes que quieren ser configurables pero
            tienen que funcionar igual si nadie los configura.
          </li>
          <li>
            Distinguen mayúsculas de minúsculas: <code>--Acento</code> y{" "}
            <code>--acento</code> son dos variables distintas.
          </li>
        </ul>

        <h3>Se heredan, y esa es toda la diferencia con Sass</h3>
        <p>
          Si venís de ver variables de Sass o Less, la confusión es inevitable,
          así que va la diferencia sin vueltas. Una variable de Sass{" "}
          <strong>no existe en el navegador</strong>: el compilador la reemplaza
          por su valor y desaparece, como un buscar-y-reemplazar. Una variable
          CSS <strong>sí existe en el navegador</strong>, es parte del estilo
          calculado de cada elemento, y por lo tanto:
        </p>

        <ul>
          <li>
            <strong>Se hereda.</strong> Si la declarás en un elemento, todos sus
            descendientes la ven.
          </li>
          <li>
            <strong>Se puede redefinir en cualquier selector</strong>, incluso
            en un <code>:hover</code>, en una media query o en una clase
            modificadora. Y a partir de ahí, hacia adentro, vale el valor nuevo.
          </li>
          <li>
            <strong>Se puede cambiar desde JavaScript</strong> en vivo con{" "}
            <code>elemento.style.setProperty(&quot;--acento&quot;, &quot;#b4243a&quot;)</code>
            . Con Sass eso es directamente imposible.
          </li>
        </ul>

        <p>
          Esa herencia es lo que hace que cinco variables alcancen para vestir
          una página entera. Tocás <code>:root</code> y cambia todo:
        </p>

        <Editor
          consigna="Cambiá el --acento a #8250c4 y el --radio a 0. Después tocá --texto-suave. Cinco variables mandan sobre todo el panel, y ni una regla más cambió."
          html={`<div class="panel">
  <h3>Panel de control</h3>
  <p>Todo lo que ves acá sale de las cinco variables de arriba del CSS.</p>
  <button class="boton">Aceptar</button>
  <span class="chip">nuevo</span>
</div>`}
          css={`:root {
  --acento: #14538f;
  --fondo: #eef3fa;
  --texto: #15212e;
  --texto-suave: #55697f;
  --radio: 10px;
}

.panel {
  background: var(--fondo);
  color: var(--texto);
  border: 2px solid var(--acento);
  border-radius: var(--radio);
  padding: 16px;
}

.panel h3 {
  margin: 0 0 6px;
  color: var(--acento);
}

.panel p { margin: 0 0 12px; font-size: 13px; color: var(--texto-suave); }

.boton {
  font: inherit;
  background: var(--acento);
  color: white;
  border: 0;
  border-radius: var(--radio);
  padding: 8px 16px;
  cursor: pointer;
}

.chip {
  display: inline-block;
  margin-left: 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--acento);
  border: 1px solid var(--acento);
  border-radius: var(--radio);
  padding: 2px 8px;
}`}
        />

        <h3>Variantes: redefinir la variable, no la propiedad</h3>
        <p>
          Este es el patrón que cambia cómo escribís componentes. En vez de
          repetir todas las reglas para cada variante, el componente lee una
          variable y <strong>cada variante solo cambia esa variable</strong>:
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Repitiendo propiedades">
            <Codigo
              archivo="estilos.css"
              codigo={`.boton-peligro {
  background: #b4243a;
  border-color: #b4243a;
}
.boton-peligro:hover { background: #8e1b2e; }
.boton-peligro .icono { fill: #b4243a; }

/* …y lo mismo otra vez para cada
   variante nueva que aparezca. */`}
            />
          </Columna>
          <Columna tono="bien" titulo="Redefiniendo la variable">
            <Codigo
              archivo="estilos.css"
              codigo={`/* El botón ya lee var(--acento) en
   todas sus reglas. La variante es
   una línea, y no repite nada. */
.boton-peligro { --acento: #b4243a; }
.boton-exito   { --acento: #0f7a52; }
.boton-aviso   { --acento: #92600a; }`}
            />
          </Columna>
        </Comparacion>

        <Editor
          consigna="Agregá una variante .boton-violeta con --acento: #8250c4 y ponésela a un botón. Una sola línea de CSS y anda todo: fondo, borde y hover."
          html={`<button class="boton">normal</button>
<button class="boton boton-peligro">peligro</button>
<button class="boton boton-exito">éxito</button>

<p class="aviso">Sin la variable definida, el respaldo de var() me salva.</p>`}
          css={`.boton {
  font: inherit;
  /* Si nadie definió --acento, uso el gris del respaldo. */
  background: var(--acento, #55697f);
  border: 2px solid var(--acento, #55697f);
  color: white;
  border-radius: 8px;
  padding: 8px 16px;
  margin-right: 6px;
  cursor: pointer;
  filter: none;
}

.boton:hover { filter: brightness(0.85); }

/* Cada variante: UNA línea. */
.boton-peligro { --acento: #b4243a; }
.boton-exito   { --acento: #0f7a52; }

.aviso {
  border-left: 4px solid var(--acento, #55697f);
  padding-left: 10px;
  font-size: 13px;
  color: #55697f;
  margin-top: 16px;
}`}
        />

        <Nota tipo="info" titulo="Este sitio usa las dos cosas, y lo podés ver">
          <p>
            Cada pista del laboratorio tiene su color, y no hay una hoja de
            estilos por pista: hay una variable que se redefine según un
            atributo. Abrí <code>app/globals.css</code> y buscá esto:
          </p>
          <Codigo
            archivo="app/globals.css"
            codigo={`/* Acento propio de cada pista. */
[data-pista="html"] { --pista: #d2553a; }
[data-pista="css"] { --pista: #2f6fb5; }
[data-pista="js"] { --pista: #b58900; }
[data-pista="react"] { --pista: #199aad; }
[data-pista="redux"] { --pista: #8250c4; }`}
          />
          <p>
            El componente <code>Leccion</code> le pone{" "}
            <code>data-pista=&quot;css&quot;</code> al{" "}
            <code>&lt;article&gt;</code> que envuelve esta página, y por{" "}
            <strong>herencia</strong> todo lo de adentro —títulos, enlaces,
            recuadros de desafío— se pinta de azul. En la pista de Redux, el
            mismo CSS se pinta de violeta. Y unas líneas más arriba está el
            valor de respaldo en acción:
          </p>
          <Codigo
            archivo="app/globals.css"
            codigo={`a {
  color: var(--pista, var(--azul-700));
}`}
          />
          <p>
            Fijate que el respaldo es otro <code>var()</code>: si el enlace no
            está dentro de ninguna pista, cae al azul general del sitio. Eso se
            puede anidar todo lo que quieras.
          </p>
        </Nota>

        <Nota tipo="atencion" titulo="Dos límites y una trampa">
          <ul>
            <li>
              <strong>No se pueden usar en las condiciones de una media
              query.</strong> <code>@media (min-width: var(--corte))</code> no
              funciona: la media query se evalúa antes de que existan los
              estilos del elemento.
            </li>
            <li>
              <strong>No se puede armar el nombre de una propiedad.</strong> La
              variable reemplaza el <em>valor</em>, no el nombre ni parte de él.
            </li>
            <li>
              <strong>La trampa:</strong> si <code>var()</code> termina dando un
              valor inválido, la propiedad no vuelve a la regla anterior como
              pasa normalmente en CSS: queda{" "}
              <em>inválida en tiempo de cálculo</em> y toma el valor heredado o
              el inicial. Un <code>background: var(--x)</code> con{" "}
              <code>--x: 12px</code> te deja el fondo transparente, no el color
              de antes. Si un color desaparece misteriosamente, mirá ahí.
            </li>
          </ul>
        </Nota>
      </Seccion>

      <Seccion titulo="Tema oscuro de verdad">
        <p>
          Acá se juntan las dos mitades de la lección. El tema oscuro{" "}
          <strong>no es escribir la página dos veces</strong>: es escribirla una
          sola vez contra variables y después, adentro de una media query,{" "}
          <strong>cambiar el valor de esas variables y nada más</strong>.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Duplicando reglas">
            <Codigo
              archivo="estilos.css"
              codigo={`@media (prefers-color-scheme: dark) {
  body    { background: #0b1520; color: #e6eef7; }
  .panel  { background: #121f2e; }
  .panel h3 { color: #7db0e8; }
  .boton  { background: #5c96d8; }
  .chip   { border-color: #5c96d8; }
  /* …y una línea por cada regla que
     mencione un color en todo el sitio.
     Agregás un componente y te olvidás. */
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Cambiando solo las variables">
            <Codigo
              archivo="estilos.css"
              codigo={`@media (prefers-color-scheme: dark) {
  :root {
    --fondo: #0b1520;
    --superficie: #121f2e;
    --texto: #e6eef7;
    --acento: #5c96d8;
  }
}

/* Listo. Todo el sitio ya cambió,
   incluidos los componentes que
   todavía no escribiste. */`}
            />
          </Columna>
        </Comparacion>

        <Editor
          alto={300}
          consigna="Cambiá el dark del @media por light: el tema se da vuelta al instante (salvo que ya tengas el sistema en oscuro). Después agregale una variable --borde y usala en las dos."
          html={`<div class="tarjeta">
  <h3>Hola</h3>
  <p>Ninguna de mis reglas menciona un color: todas leen variables.</p>
  <button class="boton">Aceptar</button>
</div>`}
          css={`:root {
  color-scheme: light dark;   /* que los controles del navegador acompañen */
  --fondo: #f5f8fc;
  --superficie: #ffffff;
  --texto: #15212e;
  --texto-suave: #55697f;
  --acento: #14538f;
}

/* Probá cambiar "dark" por "light" en esta línea. */
@media (prefers-color-scheme: dark) {
  :root {
    --fondo: #0b1520;
    --superficie: #121f2e;
    --texto: #e6eef7;
    --texto-suave: #92a8c0;
    --acento: #7db0e8;
  }
}

body { background: var(--fondo); color: var(--texto); }

.tarjeta {
  background: var(--superficie);
  border: 1px solid var(--acento);
  border-radius: 10px;
  padding: 16px;
}

.tarjeta h3 { margin: 0 0 6px; color: var(--acento); }
.tarjeta p  { margin: 0 0 12px; font-size: 13px; color: var(--texto-suave); }

.boton {
  font: inherit;
  background: var(--acento);
  color: var(--fondo);
  border: 0;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
}`}
        />

        <Nota tipo="ok" titulo="Este mismo sitio está hecho exactamente así">
          <p>
            No es un ejemplo de laboratorio: es el CSS que estás mirando ahora
            mismo. Abrí <code>app/globals.css</code>, está en las primeras
            setenta líneas del archivo:
          </p>
          <Codigo
            archivo="app/globals.css"
            codigo={`:root {
  --fondo: #f5f8fc;
  --superficie: #ffffff;
  --superficie-2: #eef3fa;
  --borde: #d3e0f0;
  --texto: #15212e;
  --texto-suave: #55697f;
  /* …y siguen los azules, los colores del código, el radio y las fuentes. */
}

@media (prefers-color-scheme: dark) {
  :root {
    --fondo: #0b1520;
    --superficie: #121f2e;
    --superficie-2: #16273a;
    --borde: #23384f;
    --texto: #e6eef7;
    --texto-suave: #92a8c0;
    /* …y sigue: los azules, el verde, el rojo, el ámbar y la sombra. */
  }
}`}
          />
          <p>
            Y después, en las casi mil líneas que vienen abajo,{" "}
            <strong>no hay un solo color escrito a mano</strong>: la barra
            lateral, las notas, los bloques de código, este mismo recuadro. Por
            eso el sitio entero cambia de tema con ese bloque de once líneas. Si
            querés convencerte, cambiá un valor de <code>--fondo</code> en el
            archivo y mirá qué pasa.
          </p>
        </Nota>

        <h3>color-scheme: la línea que casi nadie pone</h3>
        <p>
          Tus variables pintan <em>tus</em> elementos, pero no las cosas que
          dibuja el navegador: las barras de scroll, los{" "}
          <code>&lt;input&gt;</code> sin estilo, los <code>&lt;select&gt;</code>
          , el fondo blanco que aparece un instante antes de que cargue tu CSS.{" "}
          <code>color-scheme: light dark</code> en <code>:root</code> le avisa
          al navegador que tu página soporta los dos temas, y todo eso se pone
          oscuro solo. Es una línea y se nota muchísimo.
        </p>

        <h3>Un botón para elegir, sin perder el automático</h3>
        <p>
          Respetar el sistema está bien, pero mucha gente quiere el botoncito.
          El patrón habitual son <strong>tres estados</strong> —automático,
          claro y oscuro— y se arma poniendo un atributo en{" "}
          <code>&lt;html&gt;</code> desde JavaScript:
        </p>

        <Codigo
          archivo="estilos.css"
          codigo={`/* 1. El tema claro, por defecto. */
:root { --fondo: #f5f8fc; --texto: #15212e; }

/* 2. Automático: seguí al sistema, salvo que el usuario haya
      forzado el claro con el botón. */
@media (prefers-color-scheme: dark) {
  :root:not([data-tema="claro"]) { --fondo: #0b1520; --texto: #e6eef7; }
}

/* 3. Forzado a oscuro desde el botón, tenga lo que tenga el sistema. */
:root[data-tema="oscuro"] { --fondo: #0b1520; --texto: #e6eef7; }`}
        />

        <p>
          Desde JavaScript son dos líneas:{" "}
          <code>
            document.documentElement.dataset.tema = &quot;oscuro&quot;
          </code>{" "}
          y guardarlo en <code>localStorage</code> para la próxima visita. Sin
          el botón, el sitio igual anda: cae en el caso 2 y sigue al sistema.
        </p>

        <Nota tipo="ok" titulo="Simular el tema oscuro sin tocar tu sistema">
          <p>
            En las devtools: <strong>Ctrl+Shift+P</strong>, escribí{" "}
            <em>Show Rendering</em>, y en ese panel vas a encontrar{" "}
            <strong>Emulate CSS media feature prefers-color-scheme</strong>.
            Elegís <code>dark</code> y la página cambia sin que tengas que
            tocar la configuración de Windows.
          </p>
          <p>
            En ese mismo panel está{" "}
            <strong>Emulate prefers-reduced-motion</strong> para probar lo de la
            sección anterior, <strong>Emulate CSS media type</strong> para la
            impresión, y también <code>forced-colors</code>, que simula el modo
            de alto contraste de Windows. Es el panel más útil de las devtools y
            está escondidísimo.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Imágenes, unidades de viewport y container queries">
        <h3>Las dos líneas que arreglan el 90% de los desbordes</h3>
        <p>
          Una imagen tiene un tamaño propio: si el archivo mide 1200 píxeles de
          ancho, el <code>&lt;img&gt;</code> va a querer medir 1200 píxeles y{" "}
          <strong>va a empujar el contenedor</strong> hasta desbordar la
          pantalla. Por eso todo proyecto arranca con esta regla:
        </p>

        <Codigo
          archivo="estilos.css"
          resaltar={[2, 3]}
          codigo={`img, video, svg, canvas {
  max-width: 100%;   /* nunca más ancha que su contenedor */
  height: auto;      /* y que el alto siga la proporción */
  display: block;    /* de paso, saca el espacio fantasma de abajo */
}`}
        />

        <p>
          El <code>height: auto</code> no es opcional. Si dejás el atributo{" "}
          <code>height</code> en el HTML —y conviene dejarlo, porque{" "}
          <strong>evita que la página salte</strong> cuando la imagen termina de
          cargar—, al achicarse el ancho el alto quedaría fijo y la imagen se
          vería aplastada. <code>height: auto</code> le devuelve la proporción.
        </p>

        <Editor
          consigna="La imagen azul se desborda. Descomentá las dos líneas de .contenido img y mirá cómo entra. Después sacale solo el height: auto y fijate cómo se deforma."
          html={`<div class="contenido">
  <p>Una foto de 900 x 300 metida en una columna angosta:</p>
  <img
    width="900" height="300" alt="Foto de ejemplo"
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='300'%3E%3Crect width='900' height='300' fill='%2314538f'/%3E%3C/svg%3E">
</div>`}
          css={`.contenido {
  border: 2px dashed #b4243a;
  padding: 10px;
}

.contenido p { margin: 0 0 8px; font-size: 13px; }

.contenido img {
  /* max-width: 100%; */
  /* height: auto;    */
  display: block;
}`}
        />

        <h3>srcset y sizes: que el navegador elija el archivo</h3>
        <p>
          Mandarle una foto de 2400px a un celular con 4G es tirar megabytes a
          la basura. Con <code>srcset</code> le ofrecés{" "}
          <strong>varios archivos y le decís cuánto mide cada uno</strong>, y
          con <code>sizes</code> le contás{" "}
          <strong>qué ancho va a ocupar el hueco</strong> en tu layout. Con esos
          dos datos, más la densidad de la pantalla y la red, el navegador elige
          solo. Vos no podrías: no sabés nada de eso desde el CSS.
        </p>

        <Codigo
          archivo="index.html"
          resaltar={[4, 5, 6, 7]}
          codigo={`<!-- src es el de siempre: lo usa cualquier navegador
     que no entienda srcset, y nunca sobra. -->
<img
  src="foto-800.jpg"
  srcset="foto-400.jpg   400w,
          foto-800.jpg   800w,
          foto-1600.jpg 1600w"
  sizes="(min-width: 900px) 800px, 100vw"
  width="800" height="450"
  alt="Vista del puerto">`}
        />

        <p>
          Se lee así: <code>400w</code> significa{" "}
          <em>este archivo tiene 400 píxeles de ancho reales</em> (no es el
          ancho en pantalla, es el del archivo). Y <code>sizes</code> dice{" "}
          <em>
            si la ventana mide 900 o más, la imagen va a ocupar 800px; si no,
            todo el ancho
          </em>
          . Sin <code>sizes</code>, el navegador asume <code>100vw</code> y suele
          bajar una imagen más grande de la necesaria.
        </p>

        <p>
          Existe también el descriptor <code>2x</code>, más simple:{" "}
          <code>srcset=&quot;logo.png 1x, logo@2x.png 2x&quot;</code>. Ese se usa
          cuando la imagen siempre se ve del mismo tamaño y lo único que cambia
          es la densidad de la pantalla: un logo, un ícono.
        </p>

        <h3>picture: cambiar el recorte, no solo el tamaño</h3>
        <p>
          <code>srcset</code> sirve para{" "}
          <strong>la misma imagen en distintas resoluciones</strong>. Cuando lo
          que querés es <strong>otra imagen</strong> —una panorámica en el
          monitor y un recorte vertical en el celular, porque en la panorámica
          achicada no se ve la cara de nadie— eso se llama{" "}
          <em>dirección de arte</em> y se hace con <code>&lt;picture&gt;</code>.
        </p>

        <Editor
          alto={320}
          consigna="Subí el 420px del media a 900px: la imagen cambia de recorte al instante. Acordate de que acá el media mide el panel, no la ventana."
          html={`<picture>
  <source
    media="(min-width: 420px)"
    srcset="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='640'%20height='200'%3E%3Crect%20width='640'%20height='200'%20fill='%230f7a52'/%3E%3C/svg%3E">
  <img
    alt="Foto del producto"
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Crect width='260' height='260' fill='%2392600a'/%3E%3C/svg%3E">
</picture>
<p class="pie">Verde apaisada = pantalla ancha · Ámbar cuadrada = pantalla angosta</p>`}
          css={`img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.pie { font-size: 12px; color: #55697f; margin: 8px 0 0; }`}
        />

        <p>
          El navegador recorre los <code>&lt;source&gt;</code> de arriba hacia
          abajo y <strong>se queda con el primero que coincida</strong>, así que
          el orden importa. El <code>&lt;img&gt;</code> del final no es opcional:
          es el que realmente se muestra, el que lleva el <code>alt</code> y el
          que se usa si ningún <code>source</code> aplica. La otra gran razón
          para usar <code>&lt;picture&gt;</code> son los formatos modernos:
        </p>

        <Codigo
          archivo="index.html"
          codigo={`<picture>
  <source srcset="foto.avif" type="image/avif">
  <source srcset="foto.webp" type="image/webp">
  <img src="foto.jpg" alt="Vista del puerto">   <!-- el que entiende todo el mundo -->
</picture>`}
        />

        <p>
          Y dos atributos que van en casi cualquier <code>&lt;img&gt;</code> y
          valen una línea cada uno:{" "}
          <code>loading=&quot;lazy&quot;</code> —no la descargues hasta que esté
          por entrar en pantalla, nunca en la imagen principal de arriba de
          todo— y <code>decoding=&quot;async&quot;</code>.
        </p>

        <h3>vw, vh y los primos dvh, svh y lvh</h3>
        <p>
          <code>1vw</code> es el 1% del ancho del viewport y{" "}
          <code>1vh</code> el 1% del alto. Hay también <code>vmin</code> y{" "}
          <code>vmax</code>, que toman el menor y el mayor de los dos: un{" "}
          <code>font-size: 4vmin</code> es útil porque no explota al rotar la
          pantalla.
        </p>

        <Nota tipo="atencion" titulo="100vw no es el ancho que ves">
          <p>
            En una computadora con barra de scroll visible,{" "}
            <code>100vw</code> incluye el ancho de la barra, así que un elemento
            de <code>width: 100vw</code> te genera{" "}
            <strong>una barra de scroll horizontal</strong> de unos 15px. Para
            ancho completo usá <code>width: 100%</code>. Si de verdad necesitás
            romper el contenedor, existe <code>100dvw</code> o el truco de{" "}
            <code>margin-inline: calc(50% - 50vw)</code>.
          </p>
        </Nota>

        <p>
          El problema del <code>vh</code> es distinto y es del celular. La barra
          de direcciones <strong>aparece y desaparece</strong> mientras
          scrolleás, así que la altura visible cambia sin que cambie nada de tu
          CSS. Durante años <code>100vh</code> significó{" "}
          <em>la altura con las barras escondidas</em>, y por eso el clásico{" "}
          <code>height: 100vh</code> de una portada dejaba el botón cortado
          abajo. Ahora hay tres unidades explícitas:
        </p>

        <ul>
          <li>
            <code>svh</code> — <strong>small</strong>: la altura{" "}
            <em>más chica</em> posible, con las barras a la vista. Nunca se
            corta nada. Es la más segura.
          </li>
          <li>
            <code>lvh</code> — <strong>large</strong>: la altura más grande, con
            las barras escondidas. Es lo que hacía <code>100vh</code>.
          </li>
          <li>
            <code>dvh</code> — <strong>dynamic</strong>: la de este instante, va
            cambiando mientras scrolleás. Queda precioso, pero ojo: como el
            valor cambia en vivo, todo lo que dependa de él se reacomoda
            mientras el dedo se mueve, y eso puede quedar tembloroso.
          </li>
        </ul>

        <p>
          En la práctica: para una portada a pantalla completa,{" "}
          <code>min-height: 100svh</code> es la opción aburrida y correcta.
        </p>

        <Editor
          alto={260}
          consigna="Cambiá el 100% del .portada por 100vh: como el iframe mide 260px, vas a ver la diferencia entre el alto del contenedor y el del viewport."
          html={`<section class="portada">
  <h2>Una portada</h2>
  <p>El título mide 7vw: depende del ancho, no del alto.</p>
</section>`}
          css={`body { padding: 0; }

.portada {
  /* Probá: 100vh, 100svh, 100dvh */
  min-height: 100%;

  display: grid;
  place-content: center;
  text-align: center;
  padding: 16px;
  background: #14538f;
  color: white;
}

.portada h2 {
  font-size: clamp(1.1rem, 7vw, 2.4rem);
  margin: 0 0 6px;
}

.portada p { margin: 0; font-size: 13px; opacity: 0.85; }`}
        />

        <Nota tipo="info" titulo="Container queries: preguntar por el contenedor, no por la ventana">
          <p>
            Todo lo que vimos hasta acá mide <strong>la ventana</strong>. Pero
            pensá en una tarjeta de producto: la misma tarjeta va a aparecer en
            la barra lateral (angosta), en la grilla del catálogo (mediana) y
            sola en la página de detalle (ancha). El ancho de la ventana{" "}
            <strong>no le dice nada</strong> sobre cuánto lugar tiene ella. Esa
            es la limitación de fondo de las media queries, y es lo que arreglan
            las <em>container queries</em>.
          </p>
          <p>Son dos pasos:</p>
          <ol>
            <li>
              En el <strong>padre</strong>, declarar que es un contenedor
              consultable con <code>container-type: inline-size</code> (o el
              atajo <code>container: tarjetas / inline-size</code> si además le
              querés poner nombre).
            </li>
            <li>
              Escribir <code>@container (min-width: 300px)</code> con reglas
              para los <strong>descendientes</strong>. Ojo con esto: se consulta
              al contenedor, así que las reglas de adentro no pueden apuntar al
              contenedor mismo.
            </li>
          </ol>
          <p>
            Ya funcionan en todos los navegadores actuales. Y traen sus propias
            unidades: <code>cqw</code> y <code>cqi</code> son el 1% del ancho{" "}
            <em>del contenedor</em>, el equivalente de <code>vw</code> pero
            local.
          </p>
          <Editor
            alto={420}
            consigna="Las dos tarjetas tienen el MISMO CSS y están en la misma ventana. Subí el 260px del @container a 400px y mirá cómo la ancha también se pone vertical."
            html={`<div class="angosta">
  <article class="tarjeta">
    <div class="foto"></div>
    <div class="texto"><h3>Teclado</h3><p>Columna angosta.</p></div>
  </article>
</div>

<div class="ancha">
  <article class="tarjeta">
    <div class="foto"></div>
    <div class="texto"><h3>Teclado</h3><p>Columna ancha: la misma tarjeta se acomoda en fila.</p></div>
  </article>
</div>`}
            css={`/* Los dos contenedores se declaran consultables. */
.angosta, .ancha {
  container-type: inline-size;
  border: 2px dashed #2f6fb5;
  padding: 8px;
  margin-bottom: 14px;
}

.angosta { width: 170px; }
.ancha   { width: 100%; }

/* Estilo base de la tarjeta: apilada. */
.tarjeta {
  display: grid;
  gap: 8px;
  background: #eef3fa;
  border-radius: 8px;
  padding: 8px;
}

.foto {
  height: 60px;
  background: #14538f;
  border-radius: 6px;
}

.tarjeta h3 { margin: 0 0 2px; font-size: 14px; }
.tarjeta p  { margin: 0; font-size: 12px; color: #55697f; }

/* Cuando SU contenedor tiene 260px o más, pasa a fila. */
@container (min-width: 260px) {
  .tarjeta {
    grid-template-columns: 90px 1fr;
    align-items: center;
  }
  .foto { height: 70px; }
}`}
          />
        </Nota>

        <Nota tipo="ok" titulo="Cuándo usar cuál">
          <p>
            <strong>Media query</strong> para el esqueleto de la página: dónde
            va la barra lateral, si el menú es horizontal o desplegable.{" "}
            <strong>Container query</strong> para los componentes reutilizables,
            que tienen que saber acomodarse solos sin preguntarle nada a la
            página que los usa. Es el mismo criterio que{" "}
            <Link href="/css/grid">Grid</Link> afuera y{" "}
            <Link href="/css/flexbox">Flexbox</Link> adentro: cada herramienta
            en su escala.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <p>
          Dos ejercicios para resolver vos. Escribilos en cualquiera de los
          editores de arriba —el botón <em>reiniciar</em> te devuelve el
          original— y recién después mirá la solución. Todo lo que vas a
          necesitar está en esta página; nada requiere una librería.
        </p>

        <Desafio
          titulo="1. Un tema entero con seis variables y modo oscuro"
          pista={
            <div>
              <p>
                Empezá por escribir el CSS <strong>sin ningún color literal</strong>{" "}
                abajo de <code>:root</code>. Si en alguna regla te aparece un{" "}
                <code>#</code>, es que falta una variable.
              </p>
              <p>
                Para el tema oscuro no toques ninguna regla: agregá un bloque{" "}
                <code>@media (prefers-color-scheme: dark)</code> con un{" "}
                <code>:root</code> adentro y volvé a declarar las mismas seis.
                Como para probarlo necesitás el sistema en oscuro, cambiá el{" "}
                <code>dark</code> por <code>light</code> mientras trabajás.
              </p>
              <p>
                Para la variante destacada acordate del patrón:{" "}
                <code>.tarjeta-destacada &#123; --acento: … &#125;</code> y
                nada más. Y que <code>--radio</code> también es una variable, no
                solo los colores.
              </p>
            </div>
          }
          solucion={
            <div>
              <p>
                La prueba de que está bien resuelto es que abajo de{" "}
                <code>@media</code> hay <strong>seis líneas</strong> y el resto
                del archivo no se enteró de nada. Fijate que la variante
                destacada es una sola declaración:
              </p>
              <Editor
                alto={420}
                consigna="Cambiá el dark por light para ver el tema oscuro. Después agregá una .tarjeta-alerta con --acento: #b4243a y ponésela a la tercera tarjeta."
                html={`<div class="lista">
  <article class="tarjeta">
    <h3>Flexbox</h3>
    <p>Una dirección.</p>
  </article>
  <article class="tarjeta tarjeta-destacada">
    <h3>Grid</h3>
    <p>Dos dimensiones. Esta es la destacada.</p>
  </article>
  <article class="tarjeta">
    <h3>Responsive</h3>
    <p>Un solo documento que se acomoda.</p>
  </article>
</div>`}
                css={`:root {
  color-scheme: light dark;

  --fondo: #f5f8fc;
  --superficie: #ffffff;
  --borde: #d3e0f0;
  --texto: #15212e;
  --texto-suave: #55697f;
  --acento: #2f6fb5;
  --radio: 10px;
}

/* Lo ÚNICO que cambia para el tema oscuro. */
@media (prefers-color-scheme: dark) {
  :root {
    --fondo: #0b1520;
    --superficie: #121f2e;
    --borde: #23384f;
    --texto: #e6eef7;
    --texto-suave: #92a8c0;
    --acento: #6ba7e8;
  }
}

body {
  background: var(--fondo);
  color: var(--texto);
}

.lista {
  display: grid;
  gap: clamp(8px, 3vw, 18px);
}

.tarjeta {
  background: var(--superficie);
  border: 1px solid var(--borde);
  border-left: 4px solid var(--acento);
  border-radius: var(--radio);
  padding: clamp(10px, 4vw, 20px);
}

.tarjeta h3 {
  margin: 0 0 4px;
  color: var(--acento);
  font-size: clamp(0.95rem, 4vw, 1.2rem);
}

.tarjeta p {
  margin: 0;
  font-size: 13px;
  color: var(--texto-suave);
}

/* La variante: una línea. Cambia el borde Y el título. */
.tarjeta-destacada { --acento: #92600a; }`}
              />
            </div>
          }
        >
          <p>
            Armá una lista de tres tarjetas que cumpla estas cuatro condiciones:
          </p>
          <ol>
            <li>
              Ninguna regla del archivo escribe un color a mano: todas leen{" "}
              <code>var()</code>. Las variables son seis y viven en{" "}
              <code>:root</code>.
            </li>
            <li>
              El tema oscuro se logra{" "}
              <strong>sin duplicar ni una sola regla</strong>, solo redefiniendo
              variables adentro de <code>prefers-color-scheme: dark</code>.
            </li>
            <li>
              Hay una variante <code>.tarjeta-destacada</code> con otro color de
              acento, escrita en <strong>una sola línea</strong>.
            </li>
            <li>
              El padding, el gap y el tamaño de los títulos son fluidos con{" "}
              <code>clamp()</code>. <strong>Cero media queries de ancho</strong>
              .
            </li>
          </ol>
          <p className="tenue">
            Si dudás de dónde sale el espacio interno de cada tarjeta, repasá{" "}
            <Link href="/css/caja">el modelo de caja</Link>.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Una cabecera que cambia de forma, mobile first"
          pista={
            <div>
              <p>
                El estilo base es el de <strong>celular</strong>: todo apilado
                con <code>display: grid</code> y un <code>gap</code>. No
                escribas nada de la versión de escritorio ahí.
              </p>
              <p>
                Para el ancho del contenido no uses{" "}
                <code>width</code> + <code>max-width</code>: una sola línea con{" "}
                <code>width: min(100% - 2rem, 700px)</code> y{" "}
                <code>margin-inline: auto</code>.
              </p>
              <p>
                En la media query, la cabecera pasa a{" "}
                <Link href="/css/flexbox">Flexbox</Link> en fila con{" "}
                <code>justify-content: space-between</code>, y el menú también.
                El título no necesita media query: ya lo resuelve el{" "}
                <code>clamp()</code>.
              </p>
              <p>
                Para el efecto de hover, envolvelo en{" "}
                <code>@media (hover: hover)</code> para que no quede pegado en
                pantallas táctiles.
              </p>
            </div>
          }
          solucion={
            <div>
              <p>
                Hay <strong>una sola</strong> media query de ancho en todo el
                ejemplo, y adentro solo hay reglas que{" "}
                <em>agregan</em>. El tamaño del título, el ancho del contenedor
                y el espaciado se resuelven sin ninguna:
              </p>
              <Editor
                alto={420}
                consigna="Subí el 420px del min-width a 900px: volvés a la versión de celular al instante. Después probá borrar toda la media query: el sitio sigue andando, solo que angosto."
                html={`<header class="cabecera">
  <a class="marca" href="#">laboratorio</a>
  <nav class="menu">
    <a href="#">HTML</a>
    <a href="#">CSS</a>
    <a href="#">React</a>
  </nav>
</header>

<main class="contenido">
  <h1>Mobile first, de verdad</h1>
  <p>El estilo base es el de pantalla chica. La media query solo agrega.</p>
</main>`}
                css={`body { padding: 0; background: #f5f8fc; }

/* ====== BASE: pantalla chica. Nada de media queries. ====== */

.cabecera {
  display: grid;            /* apilado */
  gap: 10px;
  padding: clamp(10px, 4vw, 20px);
  background: #14538f;
}

.marca {
  color: white;
  font-weight: 700;
  text-decoration: none;
  font-size: clamp(0.95rem, 4vw, 1.2rem);
}

.menu {
  display: grid;            /* los enlaces también apilados */
  gap: 6px;
}

.menu a {
  color: #a8c8f0;
  text-decoration: none;
  font-size: 14px;
  padding: 4px 0;
}

.contenido {
  /* Ancho y márgenes laterales en una sola línea. */
  width: min(100% - 2rem, 700px);
  margin-inline: auto;
  padding-block: clamp(16px, 6vw, 40px);
}

.contenido h1 {
  font-size: clamp(1.2rem, 6vw, 2.2rem);
  margin: 0 0 8px;
  color: #103e6b;
  line-height: 1.15;
}

.contenido p { margin: 0; color: #55697f; font-size: 14px; }

/* ====== De acá para arriba hay lugar: AGREGAMOS. ====== */

@media (min-width: 420px) {
  .cabecera {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .menu {
    display: flex;
    gap: 16px;
  }
}

/* Solo si hay con qué hacer hover. */
@media (hover: hover) {
  .menu a:hover { color: white; }
}`}
              />
            </div>
          }
        >
          <p>
            Armá la cabecera de un sitio con una marca a la izquierda y un menú
            de tres enlaces. Tiene que cumplir cinco cosas:
          </p>
          <ol>
            <li>
              Escrita <strong>mobile first</strong>: el estilo base es el
              apilado, y la media query usa <code>min-width</code>.
            </li>
            <li>
              Tiene que haber <strong>una sola media query de ancho</strong> en
              todo el archivo.
            </li>
            <li>
              El título y el espaciado cambian de tamaño{" "}
              <strong>sin media queries</strong>, con <code>clamp()</code>.
            </li>
            <li>
              El contenido no pasa de 700px de ancho y tiene margen lateral en
              pantalla angosta, resuelto con <code>min()</code> en una línea.
            </li>
            <li>
              El efecto de <code>:hover</code> del menú solo se declara si hay
              un mouse.
            </li>
          </ol>
          <p className="tenue">
            Si el menú en fila te queda raro, repasá{" "}
            <Link href="/css/flexbox">Flexbox</Link>. Y si no te acordás de
            dónde se aplica cada hoja de estilos, está en{" "}
            <Link href="/css/bases">Qué es CSS y cómo se aplica</Link>.
          </p>
        </Desafio>

        <Nota tipo="info" titulo="Lo que sigue">
          <p>
            Con esto ya tenés las cinco herramientas de CSS que se usan todos
            los días: el modelo de caja, los selectores, Flexbox, Grid y lo de
            esta página. La lección <em>Armar una página entera</em> junta todo
            en una landing real, decisión por decisión.
          </p>
        </Nota>
      </Seccion>
    </Leccion>
  );
}
