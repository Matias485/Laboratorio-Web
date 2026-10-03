import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "Accesibilidad" };

// --------------------------------------------------------------------------
// El mismo menú escrito dos veces: cambia una sola regla de CSS, la del foco.
// --------------------------------------------------------------------------

const HTML_FOCO = `<nav>
  <a href="#">Inicio</a>
  <a href="#">Precios</a>
  <a href="#">Ayuda</a>
</nav>

<p class="ayuda">
  Hacé clic en el fondo blanco y apretá Tab tres veces.
</p>`;

const CSS_FOCO_BASE = `nav { display: flex; gap: 14px; margin-bottom: 10px; }
a { color: #14538f; border-radius: 4px; }
.ayuda { font-size: 13px; color: #55697f; margin: 0; }`;

// El contador que usan las dos columnas de "usá el elemento correcto".
const GUION_CONTADOR = `<script>
  function contar(el) {
    el.dataset.n = (Number(el.dataset.n) || 0) + 1;
    el.textContent = "Me gusta (" + el.dataset.n + ")";
  }
</script>`;

export default function Pagina() {
  return (
    <Leccion
      slug="/html/accesibilidad"
      titulo="Accesibilidad"
      resumen="Cómo se lee tu página con un lector de pantalla y con el teclado. Lo que cambia con muy poco esfuerzo."
    >
      <Seccion titulo="El argumento que te sirve hoy">
        <p>
          Hay un argumento moral para hacer páginas accesibles y es válido, pero
          no es el que más te va a servir esta semana. El que sirve es este:{" "}
          <strong>
            casi todo lo que hace accesible a una página la mejora para todo el
            mundo
          </strong>
          . El mismo trabajo te deja una página que se puede usar con el
          teclado, que los buscadores entienden, que aguanta el zoom al 200% y
          que se lee con sol en la pantalla. Y en muchos países es, además,
          obligación legal: en Argentina la ley 26.653 alcanza a los sitios del
          Estado y a los que reciben fondos públicos, y en Europa y en Estados
          Unidos las demandas por sitios inaccesibles son rutina.
        </p>

        <p>
          La otra idea que conviene sacarse de encima: esto no se trata solo de
          ceguera. La mayoría de la gente a la que le arruinás el día ve
          perfectamente.
        </p>

        <ul>
          <li>
            <strong>Motriz.</strong> Con temblor o con una lesión se navega con
            el teclado, con un switch o con la voz. Si tu botón no se puede
            tabular, para esa persona no existe.
          </li>
          <li>
            <strong>Baja visión.</strong> Zoom al 200%. Si el layout se rompe o
            el texto se corta, la página se terminó ahí.
          </li>
          <li>
            <strong>Daltonismo.</strong> Cerca del 8% de los varones no
            distingue bien el rojo del verde: el campo marcado solo en rojo,
            para ellos, está igual que los demás.
          </li>
          <li>
            <strong>Temporal y situacional.</strong> Un brazo enyesado, un mouse
            sin pila, sol directo sobre la pantalla, un bebé en brazos. Son
            todos el mismo problema con otro nombre.
          </li>
        </ul>

        <Nota tipo="info" titulo="Esta lección cierra la pista de HTML">
          <p>
            Dos piezas ya las viste:{" "}
            <Link href="/html/semantica">HTML semántico</Link> explica las
            regiones que un lector de pantalla usa para saltar por la página, y{" "}
            <Link href="/html/formularios">
              Formularios y validación nativa
            </Link>{" "}
            explica los controles y las etiquetas. Acá va el resto: teclado,
            foco, elemento correcto, texto alternativo, contraste y ARIA.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Navegar con el teclado">
        <p>
          Soltá el mouse y la página se vuelve cinco teclas. Son estas y no hay
          más:
        </p>

        <ul>
          <li>
            <kbd>Tab</kbd> va al siguiente elemento interactivo.{" "}
            <kbd>Shift</kbd>+<kbd>Tab</kbd>, al anterior.
          </li>
          <li>
            <kbd>Enter</kbd> activa un enlace o un botón, y envía un formulario
            desde cualquier campo de texto.
          </li>
          <li>
            <kbd>Espacio</kbd> activa un botón y marca un checkbox. En cualquier
            otro lado baja la página.
          </li>
          <li>
            <kbd>Escape</kbd> cierra lo que esté abierto: un modal, un menú
            desplegable, un autocompletado. Si vos lo abrís, vos programás que
            se cierre.
          </li>
          <li>
            Las flechas se mueven <em>adentro</em> de un control: las opciones
            de un <code>&lt;select&gt;</code>, los radios de un grupo, que
            recibe <strong>un solo</strong> Tab y no uno por opción.
          </li>
        </ul>

        <p>
          Reciben foco por sí solos: <code>&lt;a&gt;</code> con{" "}
          <code>href</code>, <code>&lt;button&gt;</code>,{" "}
          <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code>,{" "}
          <code>&lt;textarea&gt;</code>, <code>&lt;summary&gt;</code> y lo que
          tenga <code>tabindex</code>. Nada más: un <code>&lt;div&gt;</code> o
          un <code>&lt;span&gt;</code> son invisibles para el Tab por más{" "}
          <code>cursor: pointer</code> que les pongas.
        </p>

        <p>
          Y el dato que sorprende a todos la primera vez:{" "}
          <strong>
            el orden del foco sale del orden del HTML, no de cómo se ven las
            cosas en la pantalla
          </strong>
          . El CSS mueve los píxeles; el Tab sigue el código fuente.
        </p>

        <Editor
          alto={250}
          consigna="Hacé clic en el fondo blanco del resultado y apretá Tab: el foco va Inicio, Catálogo, Contacto, aunque se vean al revés. Después borrá la línea flex-direction: row-reverse y volvé a probar."
          html={`<nav class="barra">
  <a href="#">Inicio</a>
  <a href="#">Catálogo</a>
  <a href="#">Contacto</a>
</nav>

<form class="buscador">
  <label for="q">Buscar</label>
  <input id="q" type="search" placeholder="Escribí algo">
  <button type="submit">Ir</button>
</form>

<details>
  <summary>Más opciones</summary>
  <p>El summary también entra en el recorrido del teclado.</p>
</details>

<p class="ayuda">Este párrafo no recibe foco: no es interactivo.</p>`}
          css={`.barra {
  /* El CSS invierte lo que se VE. El Tab no se entera. */
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  gap: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d3e0f0;
}
.buscador { display: flex; gap: 8px; align-items: center; margin: 12px 0; }
.buscador input {
  padding: 6px 8px; border: 1px solid #8a9cb0; border-radius: 6px;
}
.buscador button {
  font: inherit; padding: 6px 14px; border-radius: 6px;
  border: 1px solid #14538f; background: #14538f; color: #fff;
}
:focus-visible { outline: 3px solid #d2553a; outline-offset: 3px; }
.ayuda { font-size: 13px; color: #55697f; }`}
        />

        <Nota tipo="atencion" titulo="tabindex tiene tres valores y solo dos sirven">
          <p>
            <code>tabindex="0"</code> mete un elemento en el recorrido, en la
            posición que le toca según el HTML. <code>tabindex="-1"</code> lo
            saca del recorrido pero permite enfocarlo desde JavaScript con{" "}
            <code>.focus()</code>: se usa para mandar el foco a un modal recién
            abierto o al contenido principal. <code>tabindex="1"</code> y
            cualquier número positivo <strong>no se usan nunca</strong>: crean
            un recorrido paralelo que va antes que todo lo demás, y alcanza uno
            solo perdido en un rincón para desordenar la página entera.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El foco se tiene que ver">
        <p>
          Si navegás con teclado, el anillo de foco es tu cursor: es lo único
          que te dice dónde estás parado. Las dos columnas de abajo tienen el
          mismo HTML y se diferencian en una sola regla de CSS. Hacé clic
          adentro de cada resultado y tabulá.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="outline: none">
            <Editor
              alto={150}
              solapas="css"
              html={HTML_FOCO}
              css={`${CSS_FOCO_BASE}

/* El bug de accesibilidad más repetido de la web. */
a:focus { outline: none; }`}
            />
          </Columna>
          <Columna tono="bien" titulo="focus-visible">
            <Editor
              alto={150}
              solapas="css"
              html={HTML_FOCO}
              css={`${CSS_FOCO_BASE}

a:focus-visible {
  outline: 3px solid #14538f;
  outline-offset: 3px;
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          La diferencia entre las dos pseudoclases vale la pena entenderla,
          porque la de la izquierda es la excusa con la que se saca el outline:
        </p>

        <ul>
          <li>
            <code>:focus</code> se aplica <strong>siempre</strong> que el
            elemento tiene el foco, incluso cuando llegó ahí por un clic del
            mouse. Por eso molesta: hacés clic en un botón y te queda el anillo
            puesto.
          </li>
          <li>
            <code>:focus-visible</code> se aplica solo cuando{" "}
            <strong>el navegador cree que el usuario necesita verlo</strong>:
            llegaste con Tab, o es un campo de texto. Clic con el mouse en un
            botón: no aparece. Es el que querés el 95% de las veces.
          </li>
        </ul>

        <p>
          Entonces la regla no es "nunca toques el outline", es{" "}
          <strong>nunca lo saques sin reemplazarlo</strong>. Con esto arrancás
          cualquier proyecto:
        </p>

        <Codigo
          archivo="estilos.css"
          resaltar={[2, 3, 4, 10]}
          codigo={`/* Un foco visible para todo el sitio, en cuatro líneas. */
:focus-visible {
  outline: 3px solid #14538f;
  outline-offset: 2px;
}

/* Si necesitás otra forma, la reemplazás EN LA MISMA REGLA.
   Lo que nunca escribís es el outline: none solo. */
.boton-oscuro:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px #0c2c4d, 0 0 0 6px #ffffff;
}`}
        />

        <p>
          Dos detalles del anillo: tiene que llegar a <strong>3:1</strong> de
          contraste contra lo que tenga alrededor —uno gris claro sobre blanco
          no sirve— y el <code>outline-offset</code> de dos o tres píxeles
          existe para que se despegue y se vea contra los dos fondos.
        </p>
      </Seccion>

      <Seccion titulo="Usá el elemento correcto (la regla que más rinde)">
        <p>
          Si te tenés que llevar una sola cosa de esta lección, llevate esta.
          No es una técnica de accesibilidad: es dejar de pelearte con el
          navegador. Las dos columnas hacen lo mismo con el mouse. Probalas con
          el teclado.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="div con onclick · el Tab nunca llega">
            <Editor
              alto={90}
              solapas="html"
              html={`<div class="boton" onclick="contar(this)">Me gusta (0)</div>
${GUION_CONTADOR}`}
              css={`.boton {
  display: inline-block; font-size: 15px;
  background: #b4243a; color: #fff;
  padding: 8px 16px; border-radius: 8px;
  cursor: pointer; user-select: none;
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="button · Tab, Enter y Espacio">
            <Editor
              alto={90}
              solapas="html"
              html={`<button class="boton" onclick="contar(this)">Me gusta (0)</button>
${GUION_CONTADOR}`}
              css={`.boton {
  font: inherit; font-size: 15px; border: 0;
  background: #0f7a52; color: #fff;
  padding: 8px 16px; border-radius: 8px; cursor: pointer;
}
.boton:focus-visible { outline: 3px solid #0f7a52; outline-offset: 3px; }`}
            />
          </Columna>
        </Comparacion>

        <p>
          El <code>&lt;div&gt;</code> de la izquierda está roto de cuatro
          maneras a la vez, y ninguna se ve en la pantalla:
        </p>

        <ul>
          <li>
            <strong>No se puede tabular.</strong> Quien no usa mouse no puede
            apretarlo. Punto.
          </li>
          <li>
            <strong>No se activa con Enter ni con Espacio.</strong> Un{" "}
            <code>onclick</code> en un div solo escucha clics de verdad.
          </li>
          <li>
            <strong>Un lector de pantalla no lo anuncia como botón.</strong> Lee
            "Me gusta" como texto suelto y sigue de largo: el usuario nunca se
            entera de que ahí había algo para apretar.
          </li>
          <li>
            <strong>No tiene estados.</strong> No hay <code>:disabled</code> ni{" "}
            <code>type="submit"</code>, no aparece en el modo de alto contraste
            de Windows y el dictado por voz no lo encuentra.
          </li>
        </ul>

        <p>
          Se puede emparejar a mano. Esto es lo mínimo, y todavía queda corto:
        </p>

        <Codigo
          archivo="no-hagas-esto.html"
          resaltar={[5, 13]}
          codigo={`<!-- role="button" para que se ANUNCIE como botón.
     tabindex="0" para que el Tab llegue.
     Y el teclado, a mano: Enter y Espacio, con preventDefault
     porque si no el Espacio baja la página. -->
<div class="boton" role="button" tabindex="0"
     onclick="activar()"
     onkeydown="if (event.key === 'Enter' || event.key === ' ')
                { event.preventDefault(); activar(); }">
  Me gusta
</div>

<!-- Lo mismo, con todo eso ya resuelto por el navegador: -->
<button onclick="activar()">Me gusta</button>`}
        />

        <Nota tipo="error" titulo="role no cambia el comportamiento, solo lo que se anuncia">
          <p>
            Poner <code>role="button"</code> y nada más es{" "}
            <strong>peor que no poner nada</strong>: el lector de pantalla
            anuncia "botón", el usuario aprieta Enter y no pasa absolutamente
            nada. ARIA describe; no implementa. Esa es la trampa en la que cae
            casi todo el mundo la primera vez.
          </p>
        </Nota>

        <p>
          Y la otra mitad de la regla: <code>&lt;a href&gt;</code> si{" "}
          <strong>te lleva a otro lado</strong>, <code>&lt;button&gt;</code> si{" "}
          <strong>hace algo acá</strong>. Un <code>&lt;a&gt;</code> sin{" "}
          <code>href</code> no es tabulable y no es nada: es un{" "}
          <code>&lt;span&gt;</code> con otro nombre.
        </p>
      </Seccion>

      <Seccion titulo="Texto alternativo">
        <p>
          El <code>alt</code> es lo que el lector de pantalla dice en lugar de
          la imagen, y lo que el navegador muestra si la imagen no carga. La
          pregunta para escribirlo no es "qué se ve en la foto", es{" "}
          <strong>
            si tuviera que borrar la imagen, ¿qué texto pondría en su lugar para
            que la página siga teniendo sentido?
          </strong>
        </p>

        <Codigo
          archivo="alt.html"
          resaltar={[2, 6, 9, 12]}
          codigo={`<img src="ventas.png">                        <!-- lee "ventas punto png" -->
<img src="ventas.png" alt="Las ventas subieron de 120 a 310 unidades
                           entre enero y junio.">

<img src="logo.png" alt="logo.png">           <!-- no es el nombre del archivo -->
<img src="logo.png" alt="Taller de Programación II">

<img src="equipo.jpg" alt="imagen de un equipo">   <!-- "imagen" sobra -->
<img src="equipo.jpg" alt="">                 <!-- decorativa: la saltea -->

<img src="adorno.svg" alt="línea decorativa">      <!-- no aporta nada -->
<img src="adorno.svg" alt="">`}
        />

        <ul>
          <li>
            <strong>El atributo va siempre.</strong> Lo que cambia es si está
            vacío. <code>alt=""</code> le dice al lector "esta imagen no aporta
            nada, salteala", y la saltea.{" "}
            <strong>Sin atributo es otra cosa:</strong> el lector no sabe qué
            hacer y termina leyendo el nombre del archivo o la URL entera.
          </li>
          <li>
            <strong>No escribas "imagen de".</strong> El lector ya anuncia
            "imagen" antes del texto. <code>alt="imagen de un equipo"</code> se
            escucha "imagen, imagen de un equipo".
          </li>
          <li>
            <strong>Decorativa es la que no agrega información:</strong> un
            adorno, un degradado, una foto genérica que ya está explicada por el
            texto de al lado, el ícono que está pegado a su propia etiqueta. Esa
            lleva <code>alt=""</code>.
          </li>
          <li>
            <strong>Si la imagen es el contenido de un enlace o de un botón, el
            alt es el destino o la acción</strong>, no el dibujo. Una lupa que
            busca lleva <code>alt="Buscar"</code>, no <code>alt="lupa"</code>.
          </li>
          <li>
            <strong>Si es un gráfico con datos</strong>, el alt resume la
            conclusión y los números van abajo, en una{" "}
            <Link href="/html/tablas">tabla</Link> de verdad. Un alt de cuarenta
            números no lo escucha nadie. Y un SVG decorativo escrito en el HTML
            no lleva alt sino <code>aria-hidden="true"</code>.
          </li>
        </ul>

      </Seccion>

      <Seccion titulo="Contraste, y por qué el color no alcanza">
        <p>
          El contraste se mide como una relación entre la luminosidad del texto
          y la del fondo, de 1:1 (invisible) a 21:1 (negro sobre blanco). Los
          dos números que tenés que recordar son:
        </p>

        <ul>
          <li>
            <strong>4.5:1</strong> para texto normal.
          </li>
          <li>
            <strong>3:1</strong> para texto grande: desde 24px, o desde 18.7px
            si está en negrita. También 3:1 para lo que no es texto pero hay que
            ver —el borde de un campo, un ícono informativo, el anillo de foco—.
          </li>
        </ul>

        <Comparacion>
          <Columna tono="mal" titulo="#999999 sobre blanco · 2.85:1">
            <Vista
              html={`<h3>Pedido confirmado</h3>
<p>Te mandamos el detalle por correo. Llega en 48 horas hábiles.</p>`}
              css={`h3 { font-size: 17px; margin: 0 0 6px; color: #999999; }
p { color: #999999; margin: 0; font-size: 15px; }`}
            />
          </Columna>
          <Columna tono="bien" titulo="#595959 sobre blanco · 7:1">
            <Vista
              html={`<h3>Pedido confirmado</h3>
<p>Te mandamos el detalle por correo. Llega en 48 horas hábiles.</p>`}
              css={`h3 { font-size: 17px; margin: 0 0 6px; color: #595959; }
p { color: #595959; margin: 0; font-size: 15px; }`}
            />
          </Columna>
        </Comparacion>

        <p>
          Las dos columnas dicen lo mismo, y la de la izquierda se lee
          perfectamente en tu monitor, de noche, a los 22 años. En un celular al
          sol, no. Ese gris clarito es el error más común de todos y aparece
          siempre en los mismos lugares: el texto secundario, los{" "}
          <code>placeholder</code>, las leyendas chiquitas y el texto blanco
          sobre un botón de color claro. Medirlo son dos clics: en las devtools,
          inspeccioná el texto, hacé clic en el cuadradito de la propiedad{" "}
          <code>color</code> y abajo del selector dice{" "}
          <strong>Contrast ratio</strong>, con el número y un tilde si pasa AA.
        </p>

        <h3>El color no puede ser la única señal</h3>

        <p>
          Marcar un campo con borde rojo y nada más es decirle a quien no
          distingue el rojo: adiviná. Y no hace falta daltonismo: alcanza con
          una pantalla en blanco y negro o con el modo de alto contraste. El
          editor de abajo tiene el truco: todo está en escala de grises.
        </p>

        <Editor
          alto={270}
          solapas="css"
          consigna="Mirá los dos campos así, sin color: el de arriba no se entiende. Ahora borrá la línea filter: grayscale(1) y mirá de nuevo. El de abajo se entiende en los dos casos, y ese es el punto."
          html={`<p class="caso">
  <label for="a">Correo</label><br>
  <input id="a" class="malo" value="juan.ejemplo">
</p>

<p class="caso">
  <label for="b">Correo</label><br>
  <input id="b" class="bueno" value="juan.ejemplo" aria-describedby="e">
  <span id="e" class="error">⚠ Falta el @ en el correo.</span>
</p>`}
          css={`body {
  /* Sacá esta línea para ver los dos campos con color. */
  filter: grayscale(1);
}

label { font-size: 14px; font-weight: 600; }
input { font: inherit; padding: 7px 9px; border-radius: 6px; width: 220px; }
.caso { margin: 0 0 20px; }

/* Mal: la única señal es el color del borde. */
.malo { border: 2px solid #d93025; }

/* Bien: borde + ícono + texto. Tres señales, una sola es el color. */
.bueno { border: 2px solid #b4243a; }
.error {
  display: block; margin-top: 4px;
  color: #b4243a; font-size: 13px; font-weight: 600;
}`}
        />

        <p>
          La misma regla vale para todo lo demás: un estado "activo" que solo
          cambia de color, una leyenda de gráfico que solo distingue las líneas
          por el color, un enlace dentro de un párrafo que no está subrayado y
          solo se diferencia por el azul. Siempre una segunda señal: texto,
          ícono, subrayado, negrita o forma.
        </p>
      </Seccion>

      <Seccion titulo="ARIA: lo último que hay que sacar">
        <p>
          ARIA es un conjunto de atributos que le cambian a un elemento el{" "}
          <em>nombre</em>, el <em>rol</em> o el <em>estado</em> que se le
          anuncia a un lector de pantalla. Y arranca con esta advertencia, que
          está escrita tal cual en la especificación:
        </p>

        <Nota tipo="atencion" titulo="La primera regla de ARIA">
          <p>
            Si podés usar un elemento HTML que ya tiene el rol y el
            comportamiento que necesitás, <strong>usá ese elemento</strong> en
            vez de inventarlo con ARIA. Un ARIA mal puesto es peor que no poner
            nada: sin ARIA el lector al menos describe lo que hay; con ARIA mal
            puesto describe algo que no existe.
          </p>
        </Nota>

        <p>
          Dicho eso, hay cinco cosas que vas a usar de verdad y que el HTML solo
          no resuelve:
        </p>

        <Codigo
          archivo="aria.html"
          resaltar={[2, 6, 10, 14, 17]}
          codigo={`<!-- 1. aria-label: le da nombre a algo que no tiene texto visible. -->
<button aria-label="Cerrar">✕</button>

<!-- 2. aria-labelledby: el nombre ya está escrito al lado. Si existe, SIEMPRE preferilo. -->
<h2 id="t-envio">Datos de envío</h2>
<section aria-labelledby="t-envio"> … </section>

<!-- 3. aria-describedby: info extra. Se lee DESPUÉS del nombre: una ayuda o un error. -->
<label for="clave">Contraseña</label>
<input id="clave" type="password" aria-describedby="ayuda-clave">
<p id="ayuda-clave">Mínimo 8 caracteres y un número.</p>

<!-- 4. aria-current: cuál de todos es el actual. -->
<a href="/precios" aria-current="page">Precios</a>

<!-- 5. role: SOLO cuando no existe la etiqueta HTML. Para un aviso urgente no hay. -->
<div role="alert">No pudimos guardar los cambios.</div>`}
        />

        <p>
          La sexta es <code>aria-live</code>, y hace falta apenas empezás a
          cambiar cosas con JavaScript. Cuando aparece un mensaje, quien ve lo
          nota al instante; quien usa un lector de pantalla{" "}
          <strong>no se entera de nada</strong>, porque el lector está parado en
          otro lugar del documento. Una región viva le avisa.
        </p>

        <Editor
          alto={200}
          solapas="html"
          consigna="Apretá Guardar varias veces. Lo que ves es un texto que cambia; lo que no ves es que un lector de pantalla lo lee en voz alta cada vez, sin que el foco se mueva del botón."
          html={`<button onclick="guardar()">Guardar</button>

<!-- La región tiene que existir ANTES de que llegue el mensaje.
     Vacía está bien: lo que no se puede es crearla en el momento. -->
<p id="estado" role="status" aria-live="polite" class="estado"></p>

<p class="ayuda">
  role="status" ya implica aria-live="polite": con uno de los dos alcanza.
</p>

<script>
  var n = 0;
  function guardar() {
    n = n + 1;
    document.getElementById("estado").textContent =
      "Borrador guardado (" + n + ")";
  }
</script>`}
          css={`button {
  font: inherit; padding: 8px 16px; border: 0; border-radius: 8px;
  background: #14538f; color: #fff; cursor: pointer;
}
button:focus-visible { outline: 3px solid #14538f; outline-offset: 3px; }
.estado { min-height: 22px; color: #0f7a52; font-weight: 600; margin: 12px 0; }
.ayuda { font-size: 13px; color: #55697f; margin: 0; }`}
        />

        <p>
          <code>polite</code> espera a que el lector termine lo que estaba
          diciendo: es lo que querés casi siempre. <code>assertive</code>{" "}
          interrumpe en el acto y se reserva para lo grave —"se perdió la
          conexión"—. Un <code>assertive</code> en cada guardado automático es
          insoportable.
        </p>

        <Nota tipo="error" titulo="Las tres formas de romper ARIA">
          <ul>
            <li>
              <code>aria-label</code> en un <code>&lt;div&gt;</code> sin rol
              interactivo: <strong>no se anuncia</strong>. El atributo está, no
              hace nada.
            </li>
            <li>
              <code>aria-hidden="true"</code> encima de algo que recibe foco: el
              Tab cae ahí y el lector no dice nada. Un agujero negro.
            </li>
            <li>
              <code>aria-label</code> pisando un texto visible distinto: quien
              usa dictado por voz dice lo que lee en la pantalla y el navegador
              no encuentra el botón.
            </li>
          </ul>
        </Nota>
      </Seccion>

      <Seccion titulo="El enlace de saltar al contenido">
        <p>
          Todos los sitios grandes lo tienen y casi nadie lo vio nunca. El
          motivo es simple: si el menú tiene veinte enlaces, quien navega con
          teclado se los come enteros{" "}
          <strong>en cada página que abre</strong>. El salto es un enlace común,
          puesto primero de todo, que apunta al <code>&lt;main&gt;</code> y que
          está escondido hasta que recibe foco.
        </p>

        <Editor
          alto={230}
          consigna="Hacé clic en el fondo del resultado, bien arriba a la derecha, y apretá Tab una vez: aparece el enlace. Apretá Enter y el foco se saltea el menú entero."
          html={`<a class="saltar" href="#contenido">Saltar al contenido</a>

<header>
  <strong>Mercado Pampa</strong>
  <nav>
    <a href="#">Ofertas</a>
    <a href="#">Almacén</a>
    <a href="#">Bebidas</a>
    <a href="#">Mi cuenta</a>
  </nav>
</header>

<!-- El tabindex="-1" es necesario: sin él, en varios navegadores
     el scroll baja pero el foco se queda arriba, en el menú. -->
<main id="contenido" tabindex="-1">
  <h1>Ofertas de la semana</h1>
  <p>Acá empieza lo que la persona vino a leer.</p>
  <a href="#">Ver todas</a>
</main>`}
          css={`.saltar {
  position: absolute;
  top: 0; left: -9999px;   /* fuera de la pantalla, pero sigue tabulable */
  z-index: 10;
  background: #0c2c4d; color: #fff;
  padding: 8px 14px; border-radius: 0 0 8px 0;
  text-decoration: none;
}

.saltar:focus { left: 0; }   /* aparece solo cuando recibe el foco */

header {
  display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #14538f; padding-bottom: 8px;
}
nav { display: flex; gap: 12px; font-size: 14px; }
h1 { font-size: 1.2rem; }
:focus-visible { outline: 3px solid #d2553a; outline-offset: 4px; }`}
        />

        <p>
          Fijate en el detalle que arruina la mitad de las implementaciones:{" "}
          <code>display: none</code> y <code>visibility: hidden</code>{" "}
          <strong>sacan el enlace del recorrido del teclado</strong>, así que no
          sirven para esconderlo. Hay que moverlo fuera de la pantalla y
          traerlo de vuelta con <code>:focus</code>. Esa misma técnica es la que
          usan las clases tipo <code>.visually-hidden</code> para texto que solo
          tiene que escuchar un lector de pantalla.
        </p>
      </Seccion>

      <Seccion titulo="Formularios: etiquetas y errores que se anuncian">
        <p>
          Los controles y la validación nativa ya están en{" "}
          <Link href="/html/formularios">Formularios y validación nativa</Link>.
          Acá van las cuatro decisiones que separan un formulario usable de uno
          que no se puede completar sin ver la pantalla:
        </p>

        <ul>
          <li>
            <strong>Cada control con su <code>&lt;label for&gt;</code>.</strong>{" "}
            Un <code>placeholder</code> no es una etiqueta: desaparece apenas
            escribís y tiene contraste bajo.
          </li>
          <li>
            <strong>
              Radios y checkboxes relacionados, adentro de un{" "}
              <code>&lt;fieldset&gt;</code> con <code>&lt;legend&gt;</code>.
            </strong>{" "}
            Sin eso el lector anuncia "Por mail" sin decir nunca de qué era la
            pregunta.
          </li>
          <li>
            <strong>
              El error va en texto, al lado del campo, asociado con{" "}
              <code>aria-describedby</code>.
            </strong>{" "}
            Así se lee cuando el foco entra al campo. Sumale{" "}
            <code>aria-invalid="true"</code> para que se anuncie "no válido".
          </li>
          <li>
            <strong>Al enviar con errores, mandá el foco al primer campo que
            falló.</strong> Un cartel rojo arriba de todo, con el foco en el
            botón, es un cartel que nadie escucha.
          </li>
        </ul>

        <Editor
          alto={320}
          solapas="html"
          consigna="Dejá el correo sin @ y mandá: el mensaje aparece, el campo queda marcado y el foco vuelve solo al campo. Probá a tabular de nuevo hasta el correo y fijate que el error está asociado, no suelto."
          html={`<form id="f" novalidate>
  <p>
    <label for="correo">Correo</label><br>
    <input id="correo" type="email" aria-describedby="e-correo">
    <span id="e-correo" class="error" role="alert"></span>
  </p>

  <fieldset>
    <legend>¿Cómo preferís que te contestemos?</legend>
    <p><input type="radio" id="c1" name="canal"> <label for="c1">Por mail</label></p>
    <p><input type="radio" id="c2" name="canal"> <label for="c2">Por teléfono</label></p>
  </fieldset>

  <button type="submit">Enviar</button>
</form>

<script>
  document.getElementById("f").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var campo = document.getElementById("correo");
    var error = document.getElementById("e-correo");
    if (campo.value.indexOf("@") === -1) {
      error.textContent = "Escribí un correo con @.";
      campo.setAttribute("aria-invalid", "true");
      campo.focus();                 // el foco al campo que falló
    } else {
      error.textContent = "";
      campo.removeAttribute("aria-invalid");
    }
  });
</script>`}
          css={`label { font-size: 14px; font-weight: 600; }
input[type="email"] {
  font: inherit; padding: 7px 9px; width: 230px;
  border: 1px solid #8a9cb0; border-radius: 6px;
}
input[aria-invalid="true"] { border: 2px solid #b4243a; }
.error { display: block; margin-top: 4px; color: #b4243a; font-size: 13px; font-weight: 600; }
fieldset { border: 1px solid #b9c6d6; border-radius: 8px; padding: 8px 14px; margin: 0 0 14px; }
legend { font-weight: 700; font-size: 14px; padding: 0 6px; }
fieldset p { margin: 4px 0; }
fieldset label { font-weight: 400; }
button { font: inherit; padding: 8px 16px; border: 0; border-radius: 8px; background: #14538f; color: #fff; cursor: pointer; }
:focus-visible { outline: 3px solid #d2553a; outline-offset: 2px; }`}
        />
      </Seccion>

      <Seccion titulo="Animaciones: prefers-reduced-motion">
        <p>
          Para mucha gente con trastornos vestibulares, un carrusel que se
          desliza o un fondo con parallax produce mareo o náuseas de verdad. El
          sistema operativo ya tiene esa preferencia marcada y el navegador te
          la pasa gratis: lo único que hay que hacer es escucharla. Tres líneas
          al final de tu hoja de estilos cubren el sitio entero. En{" "}
          <Link href="/css/responsive">Responsive y variables</Link> está la
          versión larga, con cómo emularla desde las devtools.
        </p>

        <Codigo
          archivo="estilos.css"
          codigo={`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}
        />
      </Seccion>

      <Seccion titulo="Cómo probarlo, concretamente">
        <ol>
          <li>
            <strong>Guardá el mouse en un cajón.</strong> Hacé clic en la barra
            de direcciones y volvé a la página con <kbd>Tab</kbd>. Recorré todo:
            ¿llegás a cada enlace, botón y campo? ¿Ves siempre dónde estás?
            ¿El orden sigue al orden visual? ¿Enter y Espacio activan lo que
            tienen que activar? ¿<kbd>Escape</kbd> cierra lo que abriste? Es el
            test más barato que existe y encuentra la mitad de los problemas.
          </li>
          <li>
            <strong>Zoom al 200%.</strong> <kbd>Ctrl</kbd>+<kbd>+</kbd> hasta
            llegar a 200% (<kbd>Ctrl</kbd>+<kbd>0</kbd> para volver). Nada se
            puede cortar, superponer ni exigir scroll horizontal.
          </li>
          <li>
            <strong>El árbol de accesibilidad.</strong> Devtools →{" "}
            <em>Elements</em> → solapa <em>Accessibility</em> (al lado de{" "}
            <em>Styles</em> y <em>Computed</em>). Seleccioná tu botón y mirá dos
            campos: <strong>Name</strong> y <strong>Role</strong>. Si el nombre
            está vacío o dice el nombre de un archivo, nadie sabe qué es eso.
            Más abajo está <em>Full-page accessibility tree</em>: tu página como
            la ve un lector de pantalla, sin un solo píxel.
          </li>
          <li>
            <strong>Lighthouse.</strong> Devtools → solapa <em>Lighthouse</em>{" "}
            → marcá solo <em>Accessibility</em> → <em>Analyze page load</em>. Te
            lista alt faltantes, contrastes flojos, labels sueltos y jerarquías
            de encabezados rotas.
          </li>
          <li>
            <strong>Un lector de pantalla, aunque sean cinco minutos.</strong>{" "}
            En Windows el Narrador se prende y se apaga con{" "}
            <kbd>Ctrl</kbd>+<kbd>Win</kbd>+<kbd>Enter</kbd>; en Mac, VoiceOver
            con <kbd>Cmd</kbd>+<kbd>F5</kbd>. Aprendete primero el atajo para
            apagarlo. Cerrá los ojos y tratá de completar tu formulario.
          </li>
        </ol>

        <Nota tipo="atencion" titulo="Ninguna herramienta automática te aprueba la página">
          <p>
            Lighthouse puede darte 100 en una página inservible: no sabe si el{" "}
            <code>alt</code> dice lo correcto, si el orden de tabulación tiene
            sentido, ni si el mensaje de error se entiende. Las herramientas
            encuentran lo que se te pasó; el teclado encuentra lo que está
            realmente roto.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Y cuando pases a React, esto no cambia">
          <p>
            Nada de esta lección es "de HTML plano". React dibuja los mismos
            elementos: un <code>&lt;div onClick&gt;</code> en JSX sigue siendo
            un div que el Tab no alcanza. Lo único que cambia es la escritura:{" "}
            <code>className</code> en lugar de <code>class</code>,{" "}
            <code>htmlFor</code> en lugar de <code>for</code>,{" "}
            <code>tabIndex</code> en camelCase — pero los{" "}
            <code>aria-*</code> y el <code>role</code> se escriben igual, con
            guion. El teclado se maneja con <code>onKeyDown</code> (ver{" "}
            <Link href="/react/eventos">Eventos</Link>) y los formularios
            controlados llevan las mismas etiquetas y los mismos{" "}
            <code>aria-describedby</code> (ver{" "}
            <Link href="/react/formularios">Formularios controlados</Link>).
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. La tarjeta clickeable"
          pista={
            <p>
              El <code>&lt;div&gt;</code> de afuera no tiene que ser clickeable:
              lo que tiene que ser clickeable es el título. Convertilo en un{" "}
              <code>&lt;a href&gt;</code> de verdad y, si querés que toda la
              tarjeta responda al clic, estirá ese enlace con{" "}
              <code>::after</code> y <code>position: absolute</code>. La imagen
              es decorativa: el título dice lo mismo.
            </p>
          }
          solucion={
            <Codigo
              archivo="tarjeta.html"
              resaltar={[4, 12]}
              codigo={`<article class="tarjeta">
  <!-- Un enlace de verdad: tabulable, Enter lo activa, y el lector
       lo anuncia como enlace diciendo a dónde va. -->
  <h3><a href="/notas/mate">Cómo tomar mate en la oficina</a></h3>
  <p>El termo va lejos del teclado. Esa es toda la técnica.</p>
</article>

<style>
  .tarjeta { position: relative; }
  /* Estira el área clickeable a toda la tarjeta sin sumar un segundo
     elemento interactivo al recorrido del teclado. */
  .tarjeta h3 a::after { content: ""; position: absolute; inset: 0; }
  .tarjeta:focus-within { outline: 3px solid #14538f; outline-offset: 3px; }
</style>`}
            />
          }
        >
          <p>
            Esta tarjeta funciona perfecto con el mouse y es inusable sin él.
            Arreglala en el editor: tiene que poder tabularse, activarse con
            Enter y anunciarse como lo que es.
          </p>
          <Editor
            alto={190}
            solapas="html"
            html={`<div class="tarjeta" onclick="location.href='#'">
  <img src="foto.jpg" class="foto">
  <div class="titulo">Cómo tomar mate en la oficina</div>
  <p>El termo va lejos del teclado. Esa es toda la técnica.</p>
</div>`}
            css={`.tarjeta {
  border: 1px solid #d3e0f0; border-radius: 10px;
  padding: 14px; cursor: pointer; max-width: 320px;
}
.foto { display: block; width: 100%; height: 50px; background: #e4eefb; }
.titulo { font-size: 17px; font-weight: 700; color: #14538f; margin: 8px 0 4px; }
p { margin: 0; font-size: 14px; }`}
          />
        </Desafio>

        <Desafio
          titulo="2. El formulario sin etiquetas"
          pista={
            <p>
              Tres problemas: los <code>placeholder</code> haciendo de etiqueta,
              los dos radios sueltos sin pregunta, y el asterisco rojo como
              única señal de obligatorio. Cada <code>&lt;input&gt;</code>{" "}
              necesita un <code>id</code> y un <code>&lt;label for&gt;</code>{" "}
              que apunte a ese <code>id</code>.
            </p>
          }
          solucion={
            <Codigo
              archivo="alta.html"
              resaltar={[2, 7, 13, 14]}
              codigo={`<p>
  <label for="nombre">Nombre y apellido (obligatorio)</label><br>
  <input id="nombre" name="nombre" required>
</p>

<p>
  <label for="mail">Correo (obligatorio)</label><br>
  <input id="mail" name="mail" type="email" required
         aria-describedby="ayuda-mail">
  <span id="ayuda-mail">Te mandamos ahí la confirmación.</span>
</p>

<fieldset>
  <legend>Tipo de entrada</legend>
  <p><input type="radio" id="g" name="tipo"> <label for="g">General</label></p>
  <p><input type="radio" id="e" name="tipo"> <label for="e">Estudiante</label></p>
</fieldset>

<button type="submit">Inscribirme</button>`}
            />
          }
        >
          <p>
            Con el mouse se completa sin problema. Con un lector de pantalla,
            los campos se anuncian "edición, en blanco" y los radios no dicen de
            qué pregunta son. Reescribilo.
          </p>
          <Codigo
            archivo="roto.html"
            codigo={`<p><input placeholder="Nombre y apellido *"></p>
<p><input type="email" placeholder="Correo *"></p>

<p>
  <input type="radio" name="tipo"> General
  <input type="radio" name="tipo"> Estudiante
</p>

<div class="boton-falso" onclick="enviar()">Inscribirme</div>`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
