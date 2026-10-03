import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "Qué es CSS y cómo se aplica" };

// Filas de la tabla que compara las tres formas de aplicar CSS.
const FORMAS = [
  [
    "Dónde se escribe",
    "En el atributo style del elemento",
    "En un <style> dentro del <head>",
    "En un archivo .css aparte, enlazado con <link>",
  ],
  [
    "A cuántos elementos llega",
    "A uno solo",
    "A todos los de esa página",
    "A todos los de todas las páginas que lo enlacen",
  ],
  [
    "Reutilización",
    "Ninguna: hay que repetirlo en cada elemento",
    "Dentro de esa página nomás",
    "Total: una regla, mil páginas",
  ],
  [
    "¿Se cachea?",
    "No: viaja adentro del HTML en cada visita",
    "No: viaja adentro del HTML en cada visita",
    "Sí: el navegador lo baja una vez y lo reusa",
  ],
  [
    "Especificidad",
    "Altísima: le gana a cualquier selector",
    "La del selector que escribas",
    "La del selector que escribas",
  ],
  [
    "¿Se puede pisar con una clase?",
    "No, solo con !important",
    "Sí",
    "Sí",
  ],
  [
    "¿Acepta :hover, ::before, media queries?",
    "No. No hay dónde escribirlos",
    "Sí",
    "Sí",
  ],
  [
    "Cuándo usarlo",
    "Casi nunca a mano (sí cuando el valor lo calcula JavaScript)",
    "Una prueba, un mail, una página suelta de un archivo",
    "Siempre que haya más de una página o más de una persona",
  ],
];

// Filas de la tabla de unidades.
const UNIDADES = [
  [
    "px",
    "Un píxel de CSS, fijo",
    "Bordes, sombras, radios y todo lo que no tiene que crecer si el usuario agranda la letra",
  ],
  [
    "rem",
    "El font-size de <html> (16px si nadie lo tocó)",
    "Tu unidad por defecto: tipografías, espaciados, anchos máximos, breakpoints",
  ],
  [
    "em",
    "El font-size del propio elemento (o el del padre, si estás escribiendo font-size)",
    "Espaciado que tiene que crecer junto con el texto: el padding de un botón, la sangría de una cita",
  ],
  [
    "%",
    "La misma medida del elemento padre (width con width, height con height)",
    "Anchos fluidos: una columna que ocupe el 50% de lo que le den",
  ],
];

const th = {
  textAlign: "left",
  padding: "8px 10px",
  borderBottom: "2px solid var(--borde)",
  fontSize: "0.74rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--texto-suave)",
};

const td = {
  padding: "7px 10px",
  borderBottom: "1px solid var(--borde)",
  verticalAlign: "top",
};

const tabla = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.9rem",
  marginBottom: 16,
};

export default function Pagina() {
  return (
    <Leccion
      slug="/css/bases"
      titulo="Qué es CSS y cómo se aplica"
      resumen="Las tres formas de aplicar estilos —en línea, interno y externo— y cuál conviene."
    >
      <Seccion titulo="Qué es CSS y cómo se lee una regla">
        <p>
          CSS son las iniciales de <strong>Cascading Style Sheets</strong>, hojas
          de estilo en cascada. Es un lenguaje aparte del HTML, con su propia
          sintaxis, y hace una sola cosa: decirle al navegador{" "}
          <strong>cómo se ve</strong> cada elemento. El HTML dice{" "}
          <em>qué es</em> cada cosa —esto es un título, esto una lista— y el CSS
          dice de qué color, de qué tamaño y en qué lugar de la pantalla.
        </p>

        <p>
          Lo de <em>en cascada</em> no es decoración del nombre: cuando dos
          reglas quieren pintar el mismo elemento, hay un algoritmo que decide
          cuál gana. De eso se ocupa{" "}
          <Link href="/css/selectores">Selectores, cascada y especificidad</Link>
          . Acá vamos a lo primero: cómo se escribe una regla y cómo la hacés
          llegar a tu página.
        </p>

        <Codigo
          archivo="anatomía de una regla"
          codigo={`selector {
  propiedad: valor;
  propiedad: valor;
}

/* Un ejemplo de verdad: */
.destacado {
  color: crimson;        /* declaración: propiedad + valor + punto y coma */
  background: #fdf3e0;
}`}
        />

        <ul>
          <li>
            El <strong>selector</strong> elige a qué elementos les toca (
            <code>p</code>, <code>.destacado</code>, <code>#menu</code>).
          </li>
          <li>
            Las <strong>llaves</strong> encierran el bloque de declaraciones.
          </li>
          <li>
            Cada <strong>declaración</strong> es{" "}
            <code>propiedad: valor;</code>. Los dos puntos separan; el punto y
            coma termina.
          </li>
          <li>
            Los <strong>comentarios</strong> van entre <code>{"/*"}</code> y{" "}
            <code>{"*/"}</code>. CSS no tiene comentario de una sola línea: el{" "}
            <code>{"//"}</code> que usás en JavaScript acá no existe y rompe la
            regla.
          </li>
        </ul>

        <p>
          El punto y coma parece un detalle hasta que te lo olvidás. Probalo:
        </p>

        <Editor
          consigna="Borrale el punto y coma al color y fijate que también desaparece el borde de abajo."
          html={`<h2 class="titulo">Laboratorio de CSS</h2>
<p>Un párrafo cualquiera, sin clase.</p>
<p class="destacado">Este párrafo sí tiene clase.</p>`}
          css={`.titulo {
  color: #2f6fb5;
  border-bottom: 3px solid #2f6fb5;
  padding-bottom: 6px;
}

.destacado {
  background: #fdf3e0;
  padding: 10px 12px;
  border-radius: 8px;
}`}
        />

        <Nota tipo="atencion" titulo="El CSS roto no avisa">
          <p>
            Si sacás ese punto y coma, el navegador no muestra ningún error: lee{" "}
            <code>color: #2f6fb5 border-bottom: 3px solid #2f6fb5</code> como una
            sola declaración inválida, la tira a la basura entera y sigue. Por
            eso perdés dos propiedades de un saque. En JavaScript un error te
            frena el programa; en CSS te deja la página a medio pintar y en
            silencio. Cuando algo no se aplica, mirá la declaración{" "}
            <em>de arriba</em>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Las tres formas de aplicarlo">
        <p>
          El CSS puede llegar a la página por tres caminos. Los tres funcionan,
          pero no valen lo mismo. Vamos uno por uno con el mismo ejemplo: tres
          párrafos rojos.
        </p>

        <h3>1. En línea: el atributo style</h3>

        <p>
          Se escriben las declaraciones sueltas —sin selector y sin llaves—
          adentro del atributo <code>style</code> del elemento.
        </p>

        <Editor
          solapas="html"
          consigna="Agregá un cuarto párrafo rojo. Tuviste que copiar el style de nuevo, ¿no? Ese es el problema."
          html={`<p style="color: crimson; font-size: 20px;">
  Este párrafo se estiliza a sí mismo.
</p>
<p style="color: crimson; font-size: 20px;">
  Y este repite exactamente las mismas dos declaraciones.
</p>
<p>
  Este no tiene style, así que se ve como el navegador quiera.
</p>`}
        />

        <h3>2. Interno: una etiqueta style en el documento</h3>

        <p>
          Un bloque <code>&lt;style&gt;</code> con reglas completas. Va{" "}
          <strong>en el <code>&lt;head&gt;</code></strong> del documento, aunque
          técnicamente funcione en cualquier lado (acá abajo el editor solo te
          deja escribir el cuerpo, así que lo vas a ver dentro del{" "}
          <code>&lt;body&gt;</code>: en un archivo de verdad, arriba).
        </p>

        <Editor
          solapas="html"
          consigna="Agregá un cuarto párrafo sin ningún atributo. Se pinta solo: la regla ya existía."
          html={`<style>
  p {
    color: crimson;
    font-size: 20px;
  }
</style>

<p>Una sola regla…</p>
<p>…alcanza para los tres párrafos.</p>
<p>Y para todos los que agregues después.</p>`}
        />

        <h3>3. Externo: un archivo .css aparte</h3>

        <p>
          El CSS vive en su propio archivo y el HTML lo llama con un{" "}
          <code>&lt;link&gt;</code> en el <code>&lt;head&gt;</code>. Son dos
          archivos que el navegador baja por separado y junta al dibujar.
        </p>

        <Comparacion>
          <Columna tono="bien" titulo="index.html">
            <Codigo
              archivo="index.html"
              resaltar={[5]}
              codigo={`<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="estilos.css">
    <title>Mi página</title>
  </head>
  <body>
    <p>Una sola regla…</p>
    <p>…alcanza para los tres párrafos.</p>
    <p>Y para todas las demás páginas del sitio.</p>
  </body>
</html>`}
            />
          </Columna>
          <Columna tono="bien" titulo="estilos.css">
            <Codigo
              archivo="estilos.css"
              codigo={`/* Acá adentro NO van etiquetas <style>:
   el archivo entero ya es CSS. */
p {
  color: crimson;
  font-size: 20px;
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          El resultado en pantalla es idéntico a los dos anteriores —por eso no
          hace falta un editor acá: lo que cambia no se ve, se nota cuando el
          sitio tiene diez páginas.
        </p>

        <Vista
          html={`<p>Una sola regla…</p>
<p>…alcanza para los tres párrafos.</p>
<p>Y para todas las demás páginas del sitio.</p>`}
          css={`p { color: crimson; font-size: 20px; }`}
        />

        <Nota tipo="info" titulo="Tres detalles del link que conviene saber">
          <ul>
            <li>
              <code>href</code> es una ruta como la de cualquier enlace:{" "}
              <code>estilos.css</code> (al lado del HTML),{" "}
              <code>css/estilos.css</code> (en una subcarpeta),{" "}
              <code>../estilos.css</code> (una carpeta para arriba).
            </li>
            <li>
              Podés poner <strong>varios</strong> <code>&lt;link&gt;</code>. Se
              aplican en orden: si dos archivos tocan lo mismo, gana el que está
              más abajo.
            </li>
            <li>
              El CSS <strong>bloquea el dibujado</strong>: el navegador no pinta
              nada hasta terminar de bajar las hojas de estilo. Por eso van en el{" "}
              <code>&lt;head&gt;</code> —para pedirlas lo antes posible— y por
              eso conviene que sean pocas y chicas.
            </li>
          </ul>
        </Nota>

        <h3>La comparación completa</h3>

        <table style={tabla}>
          <thead>
            <tr>
              <th style={th}>Criterio</th>
              <th style={th}>En línea</th>
              <th style={th}>Interno</th>
              <th style={th}>Externo</th>
            </tr>
          </thead>
          <tbody>
            {FORMAS.map(([criterio, linea, interno, externo]) => (
              <tr key={criterio}>
                <td style={{ ...td, fontWeight: 600 }}>{criterio}</td>
                <td style={td}>{linea}</td>
                <td style={td}>{interno}</td>
                <td style={td}>{externo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Nota tipo="ok" titulo="La conclusión, sin vueltas">
          <p>
            <strong>En un proyecto real se usa el externo.</strong> Siempre. El{" "}
            <strong>interno</strong> es para una página sola que vive en un
            archivo único: una prueba, un ejercicio, algo que mandás por mail. El{" "}
            <strong>en línea</strong>, a mano, casi nunca.
          </p>
        </Nota>

        <p>Los cuatro motivos por los que el <code>style=</code> a mano está mal:</p>

        <ol>
          <li>
            <strong>No se reutiliza.</strong> Diez botones iguales son diez
            copias de lo mismo. Cambiar el color de la marca pasa a ser buscar y
            reemplazar en todo el proyecto, en vez de tocar una línea.
          </li>
          <li>
            <strong>Le gana a todo.</strong> Un estilo en línea pesa más que
            cualquier selector de tu hoja: ni <code>.boton</code> ni{" "}
            <code>#menu .boton</code> pueden pisarlo. La única salida es{" "}
            <code>!important</code>, que es el principio de una guerra que no vas
            a ganar.
          </li>
          <li>
            <strong>No se puede cachear.</strong> El archivo externo se baja una
            vez y el navegador lo reusa en todas las páginas siguientes. El CSS
            en línea viaja adentro del HTML en cada visita, inflando cada página.
          </li>
          <li>
            <strong>Ensucia el HTML.</strong> El marcado deja de leerse: entre
            tanto atributo ya no ves la estructura del documento. Y no hay lugar
            donde escribir un <code>:hover</code>, un <code>::before</code> ni un{" "}
            <code>@media</code>, porque esos necesitan un selector.
          </li>
        </ol>

        <Comparacion>
          <Columna tono="mal" titulo="Estilo pegado a cada etiqueta">
            <Codigo
              codigo={`<ul>
  <li style="color:#14538f;font-weight:700;">Uno</li>
  <li style="color:#14538f;font-weight:700;">Dos</li>
  <li style="color:#14538f;font-weight:700;">Tres</li>
</ul>`}
            />
            <p className="tenue">
              Tres copias. Agregar un cuarto ítem es copiar y pegar otra vez, y
              cambiar el color es editar cuatro lugares.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Una clase y una regla">
            <Codigo
              codigo={`<ul>
  <li class="clave">Uno</li>
  <li class="clave">Dos</li>
  <li class="clave">Tres</li>
</ul>

/* en estilos.css */
.clave {
  color: #14538f;
  font-weight: 700;
}`}
            />
            <p className="tenue">
              El HTML dice qué es cada cosa. El CSS dice cómo se ve. Cambiar el
              color es una línea.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="info" titulo="El caso legítimo del style en línea">
          <p>
            Hay uno: cuando el valor <strong>lo calcula el programa</strong> y no
            se puede saber de antemano. Una barra de progreso que va al 37%, una
            tarjeta que se posiciona donde el usuario la soltó. Ahí el que
            escribe el <code>style</code> es JavaScript, no vos, y no hay clase
            que sirva porque los valores son infinitos.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Cómo se ve todo esto en React">
          <p>
            En React el atributo <code>style</code> no recibe un texto sino un{" "}
            <strong>objeto</strong> —{" "}
            <code>{"style={{ color: \"crimson\", fontSize: 20 }}"}</code>, con
            las propiedades en camelCase— y para las hojas separadas se usan los{" "}
            <strong>CSS Modules</strong>: un archivo{" "}
            <code>Boton.module.css</code> que importás y que te da clases con
            nombre único, sin pisarte con las de otro componente. Lo del objeto
            lo vas a ver en <Link href="/react/jsx">JSX</Link>; el resto de las
            reglas que aprendas acá valen igual.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La hoja de estilos del navegador">
        <p>
          Abrí un HTML sin una sola línea de CSS: el <code>&lt;h1&gt;</code> se
          ve enorme y con espacio arriba y abajo, la <code>&lt;ul&gt;</code>{" "}
          tiene viñetas y sangría, los enlaces son azules y subrayados. Eso no lo
          hace el HTML. Cada navegador trae su propia hoja de estilos —la{" "}
          <em>user agent stylesheet</em>— que le da un aspecto por defecto a todo.
        </p>

        <p>
          O sea que tu CSS nunca arranca de cero:{" "}
          <strong>siempre está pisando algo</strong>. Sacá los comentarios del
          bloque de abajo y fijate cuánto de lo que veías no lo habías escrito
          vos.
        </p>

        <Editor
          solapas="css"
          consigna="Borrá la primera línea y la última para encender las cuatro reglas. Después volvé a escribirlas y compará."
          html={`<h1>Un título de nivel 1</h1>
<p>Un párrafo común y silvestre.</p>
<ul>
  <li>Un ítem</li>
  <li>Otro ítem</li>
</ul>
<p><a href="#">Un enlace</a> y un <button>botón</button>.</p>`}
          css={`/* Todo lo de abajo está apagado: borrá esta línea entera…
h1     { font-size: 1.4rem; margin: 0 0 8px; }
ul     { list-style: none; padding-left: 0; }
a      { color: inherit; text-decoration: none; }
button { font: inherit; }
*/`}
        />

        <p>
          Lo que apareció al activarlo lo estabas viendo por defecto:{" "}
          <code>h1</code> viene con <code>font-size: 2em</code> y{" "}
          <code>margin: 0.67em 0</code>, <code>ul</code> con{" "}
          <code>padding-left: 40px</code> y viñetas, <code>a</code> con color y
          subrayado. Si alguna vez te preguntaste de dónde sale el espacio que
          nadie puso, la respuesta suele ser esta.
        </p>

        <Nota tipo="atencion" titulo="button e input no heredan la tipografía">
          <p>
            La hoja del navegador les pone a los controles de formulario su
            propia fuente y su propio tamaño, así que tu{" "}
            <code>font-family</code> del <code>body</code> no les llega. Por eso
            casi todas las hojas de estilo del mundo empiezan con{" "}
            <code>button, input, select, textarea {"{"} font: inherit; {"}"}</code>
            . Probalo en el editor de arriba: es el cambio que más se nota.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Reset, normalize y por qué hoy alcanza con poco">
          <p>
            Como cada navegador traía defaults distintos, se popularizaron los{" "}
            <em>resets</em> (borrar todo y empezar de cero) y{" "}
            <em>normalize.css</em> (emparejar las diferencias sin borrar). Hoy
            los navegadores están mucho más parecidos entre sí y a la mayoría de
            los proyectos le alcanza con cinco o seis reglas propias:{" "}
            <code>box-sizing: border-box</code> para todo (lo ves en{" "}
            <Link href="/css/caja">El modelo de caja</Link>), sacar los márgenes
            por defecto, <code>font: inherit</code> en los controles y poco más.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Unidades: con cuatro te alcanza para empezar">
        <table style={tabla}>
          <thead>
            <tr>
              <th style={th}>Unidad</th>
              <th style={th}>Relativa a qué</th>
              <th style={th}>Para qué la usás</th>
            </tr>
          </thead>
          <tbody>
            {UNIDADES.map(([unidad, relativa, uso]) => (
              <tr key={unidad}>
                <td style={td}>
                  <code>{unidad}</code>
                </td>
                <td style={td}>{relativa}</td>
                <td style={{ ...td, color: "var(--texto-suave)" }}>{uso}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          La regla práctica: <strong>rem por defecto</strong>, px para los
          detalles finos, % para los anchos, y em solo cuando querés que la
          medida siga al texto del elemento. La diferencia entre{" "}
          <code>em</code> y <code>rem</code> se ve mejor cuando algo está
          anidado:
        </p>

        <Editor
          solapas="css"
          consigna="Cambiá los 1.25em por 1.25rem y mirá cómo las tres cajas pasan a medir lo mismo."
          html={`<div class="caja">
  Nivel 1
  <div class="caja">
    Nivel 2
    <div class="caja">Nivel 3</div>
  </div>
</div>`}
          css={`.caja {
  /* em se mide contra el padre, así que se va acumulando:
     1.25 × 1.25 × 1.25 = casi el doble en tres niveles. */
  font-size: 1.25em;
  border: 1px solid #a8c8f0;
  padding: 8px;
  margin-top: 6px;
}`}
        />

        <Nota tipo="atencion" titulo="Por qué rem y no px para el texto">
          <p>
            Si un usuario entra a la configuración del navegador y sube el tamaño
            de letra por defecto, todo lo que esté en <code>rem</code> crece con
            él. Lo que esté en <code>px</code> se queda clavado y le ignora la
            decisión. Es una de las cosas más baratas que podés hacer por la{" "}
            <Link href="/html/accesibilidad">accesibilidad</Link> de tu página.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Tres unidades más que vas a cruzarte">
          <ul>
            <li>
              <code>vw</code> y <code>vh</code>: 1% del ancho y del alto de la
              ventana. Ojo con <code>100vh</code> en el celular, donde la barra
              del navegador aparece y desaparece; para eso están{" "}
              <code>100dvh</code> y <code>100svh</code>.
            </li>
            <li>
              <code>ch</code>: el ancho del carácter <code>0</code> en la fuente
              actual. <code>max-width: 65ch</code> es el truco más rápido para
              que una columna de texto se lea cómoda.
            </li>
            <li>
              <code>fr</code>: existe solo adentro de{" "}
              <Link href="/css/grid">Grid</Link> y significa una fracción del
              espacio libre.
            </li>
          </ul>
        </Nota>
      </Seccion>

      <Seccion titulo="Colores: cuatro formas de decir lo mismo">
        <Codigo
          archivo="las cuatro notaciones"
          codigo={`color: crimson;                  /* nombre: 147 palabras que el navegador conoce */
color: #dc143c;                  /* hex: rojo, verde y azul en dos dígitos cada uno */
color: #d14;                     /* hex corto: se duplica cada dígito → #dd1144 */
color: rgb(220 20 60);           /* rgb: los mismos tres canales, en decimal 0–255 */
color: rgb(220 20 60 / 50%);     /* con transparencia al final, después de la barra */
color: hsl(348 83% 47%);         /* hsl: tono, saturación, luminosidad */
color: hsl(348 83% 47% / 50%);   /* también acepta transparencia */`}
        />

        <p>
          Las cuatro producen exactamente el mismo color. Los nombres son cómodos
          para probar, el hex es lo que te va a dar cualquier diseñador y lo que
          vas a copiar de internet. Pero para <em>razonar</em> sobre un color, el
          mejor es <code>hsl</code>:
        </p>

        <ul>
          <li>
            <strong>Tono (hue)</strong>: 0 a 360, la vuelta del círculo
            cromático. 0 rojo, 120 verde, 240 azul.
          </li>
          <li>
            <strong>Saturación</strong>: 0% gris, 100% color puro.
          </li>
          <li>
            <strong>Luminosidad</strong>: 0% negro, 50% el color pleno, 100%
            blanco.
          </li>
        </ul>

        <p>
          La ventaja práctica es enorme: para una variante más clara o más oscura
          del mismo color <strong>movés un solo número</strong>. En hex tendrías
          que buscar el valor en algún sitio y pegarlo, y no hay forma de mirar{" "}
          <code>#e4eefb</code> y <code>#14538f</code> y darse cuenta de que son
          el mismo azul.
        </p>

        <Editor
          solapas="css"
          consigna="Cambiá los cinco 210 por 150 y mirá cómo toda la tarjeta se vuelve verde sin perder el contraste."
          html={`<div class="tarjeta">
  <h3>Una tarjeta</h3>
  <p>El fondo, el borde, el texto y el botón salen todos del mismo tono.</p>
  <button class="accion">Aceptar</button>
</div>`}
          css={`/* Un solo tono (210 = azul). Lo único que cambia es la luminosidad. */
.tarjeta {
  background: hsl(210 100% 96%);   /* casi blanco */
  border: 1px solid hsl(210 90% 82%);
  color: hsl(210 90% 22%);         /* casi negro */
  padding: 14px 16px;
  border-radius: 10px;
  max-width: 340px;
}

.accion {
  background: hsl(210 90% 38%);
  color: hsl(210 100% 98%);
  border: 0;
  padding: 8px 14px;
  border-radius: 8px;
  font: inherit;
  cursor: pointer;
}

.tarjeta h3 { margin: 0 0 6px; }`}
        />

        <Nota tipo="info" titulo="La sintaxis vieja con comas también vale">
          <p>
            Vas a ver <code>rgb(220, 20, 60)</code> y{" "}
            <code>rgba(220, 20, 60, 0.5)</code> en todos lados: es la forma
            original y sigue funcionando. La nueva usa espacios y una barra para
            la transparencia, y hace que <code>rgba()</code> y{" "}
            <code>hsla()</code> ya no hagan falta. Escribí la que quieras, pero
            no mezcles comas y espacios adentro de la misma función.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Herencia: lo que baja solo y lo que no">
        <p>
          Algunas propiedades se le pasan solas a los elementos de adentro. Si
          ponés <code>color</code> en el <code>&lt;body&gt;</code>, todos los
          párrafos, títulos y listas lo reciben sin que escribas una regla más.
          Otras no: un borde en un <code>&lt;div&gt;</code> no le pone borde a
          cada elemento de adentro, y menos mal.
        </p>

        <Comparacion>
          <Columna tono="bien" titulo="Se heredan (cosas de texto)">
            <p className="tenue">
              <code>color</code>, <code>font-family</code>,{" "}
              <code>font-size</code>, <code>font-weight</code>,{" "}
              <code>font-style</code>, <code>line-height</code>,{" "}
              <code>letter-spacing</code>, <code>text-align</code>,{" "}
              <code>text-transform</code>, <code>list-style</code>,{" "}
              <code>cursor</code>, <code>visibility</code>.
            </p>
          </Columna>
          <Columna tono="mal" titulo="No se heredan (cosas de caja)">
            <p className="tenue">
              <code>margin</code>, <code>padding</code>, <code>border</code>,{" "}
              <code>background</code>, <code>width</code>, <code>height</code>,{" "}
              <code>display</code>, <code>position</code>,{" "}
              <code>overflow</code>, <code>box-shadow</code>,{" "}
              <code>text-decoration</code>.
            </p>
          </Columna>
        </Comparacion>

        <p>
          La regla mental es sencilla: <strong>lo que tiene que ver con el texto
          se hereda; lo que tiene que ver con la caja, no</strong>. Y es
          justamente lo que querés, porque así una sola regla en el{" "}
          <code>body</code> te resuelve la tipografía de toda la página:
        </p>

        <Editor
          solapas="css"
          consigna="Borrá la línea de font-family del body y mirá cuántos elementos vuelven de golpe al tipo por defecto."
          html={`<h2>Un título</h2>
<p>Un párrafo con <strong>algo en negrita</strong> y <em>algo en itálica</em>.</p>
<ul>
  <li>Un ítem de lista</li>
  <li>Otro ítem</li>
</ul>
<div class="marco">
  <p>Este párrafo está adentro de un div con borde punteado.</p>
</div>`}
          css={`body {
  /* Estas dos bajan solas a TODO lo de adentro. */
  font-family: Georgia, "Times New Roman", serif;
  color: #3b2f2f;
}

.marco {
  /* Estas tres se quedan acá: el <p> de adentro no las copia. */
  border: 2px dashed #c08a5a;
  padding: 10px;
  background: #fbf5ee;
}`}
        />

        <Nota tipo="atencion" titulo="Herencia no es lo mismo que cascada">
          <p>
            Se confunden todo el tiempo. La <strong>herencia</strong> baja un
            valor de padre a hijo cuando el hijo no tiene nada dicho para esa
            propiedad. La <strong>cascada</strong> decide cuál gana entre varias
            reglas que apuntan al <em>mismo</em> elemento. Cualquier regla que
            apunte directo al hijo —incluso una tan floja como{" "}
            <code>p {"{ color: black; }"}</code>— le gana a lo heredado, por más
            específico que sea el selector del padre.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="inherit, initial, unset, revert y el comodín all">
        <p>
          Hay cinco valores que sirven para <em>cualquier</em> propiedad y que
          existen para manejar justamente esto de la herencia y los defaults.
        </p>

        <ul>
          <li>
            <code>inherit</code>: tomá el valor del padre.{" "}
            <strong>Funciona incluso en las que no se heredan.</strong> Es como
            se hace que un enlace use el color del texto que lo rodea:{" "}
            <code>a {"{ color: inherit; }"}</code>.
          </li>
          <li>
            <code>initial</code>: el valor inicial que define la{" "}
            <strong>especificación de CSS</strong>, no el que te da el navegador.
          </li>
          <li>
            <code>unset</code>: el combo. Si la propiedad se hereda se comporta
            como <code>inherit</code>; si no se hereda, como{" "}
            <code>initial</code>.
          </li>
          <li>
            <code>revert</code>: volvé a lo que decía la hoja del navegador. Es
            casi siempre lo que en realidad querías cuando escribiste{" "}
            <code>initial</code>.
          </li>
          <li>
            <code>all</code>: no es un valor sino una propiedad atajo que aplica
            uno de los anteriores a <strong>todas</strong> las propiedades de
            golpe (menos <code>direction</code> y <code>unicode-bidi</code>).
          </li>
        </ul>

        <Nota tipo="atencion" titulo="La trampa de initial">
          <p>
            <code>display: initial</code> no devuelve al elemento a como venía:
            el valor inicial de <code>display</code> en la especificación es{" "}
            <code>inline</code>. Así que un <code>&lt;div&gt;</code> con{" "}
            <code>display: initial</code> se vuelve <em>inline</em> y te rompe el
            layout. Para "dejalo como estaba" el valor correcto es{" "}
            <code>revert</code>.
          </p>
        </Nota>

        <p>
          El uso más común de <code>all</code> es dejar un botón completamente
          pelado para construirlo de cero, sin pelear con la hoja del navegador
          declaración por declaración:
        </p>

        <Editor
          solapas="css"
          consigna="Cambiá all: unset por all: revert y mirá cómo vuelve el botón gris del sistema."
          html={`<div class="barra">
  <button class="pestania">Tal cual viene</button>
  <button class="pestania limpia">Reconstruido</button>
</div>`}
          css={`.barra {
  display: flex;
  gap: 10px;
  align-items: center;
}

.pestania {
  padding: 8px 16px;
  border-radius: 999px;
}

.limpia {
  /* Borra TODO: fondo, borde, padding, la fuente del sistema,
     y también el display (queda inline, hay que reponerlo). */
  all: unset;

  /* Y ahora se construye lo que sí querés: */
  display: inline-block;
  padding: 8px 16px;
  border-radius: 999px;
  background: #14538f;
  color: white;
  font: inherit;
  cursor: pointer;
}`}
        />

        <Nota tipo="info" titulo="Úsalo con cuidado">
          <p>
            <code>all: unset</code> también borra cosas que te servían, como el
            anillo de foco del teclado. Si limpiás un botón así, acordate de
            devolverle un <code>:focus-visible</code> visible: sin eso, quien
            navega con Tab deja de ver dónde está parado.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Sacar el CSS de adentro del HTML"
          pista={
            <div>
              <p>
                Buscá lo que se repite: los tres <code>&lt;li&gt;</code> tienen
                exactamente el mismo <code>style</code>. Eso es una clase. El{" "}
                <code>&lt;h2&gt;</code> tiene el suyo propio, así que es otra.
              </p>
              <p>
                Pasos: 1) armá el bloque <code>&lt;style&gt;</code>, 2) moví cada
                grupo de declaraciones a una regla con un nombre que diga{" "}
                <em>qué es</em> el elemento (no de qué color es), 3) reemplazá
                cada <code>style="…"</code> por <code>class="…"</code>.
              </p>
            </div>
          }
          solucion={
            <div>
              <p>
                Quedan dos reglas y el HTML vuelve a leerse. Fijate que las
                clases se llaman <code>titulo-seccion</code> y{" "}
                <code>clave</code>, no <code>azul</code> ni{" "}
                <code>texto-grande</code>: el día que el azul pase a ser verde,
                el nombre sigue teniendo sentido.
              </p>
              <Editor
                solapas="html"
                consigna="Agregá un cuarto ítem con class='clave'. Un atributo, cero declaraciones."
                html={`<style>
  .titulo-seccion {
    color: #14538f;
    font-size: 22px;
    border-bottom: 2px solid #a8c8f0;
    padding-bottom: 4px;
  }

  .clave {
    color: #14538f;
    font-weight: 700;
    margin-bottom: 4px;
  }
</style>

<h2 class="titulo-seccion">Temas de la clase</h2>
<ul>
  <li class="clave">Qué es CSS</li>
  <li class="clave">Cómo se aplica</li>
  <li class="clave">Herencia</li>
</ul>`}
              />
              <p>
                Para llegar a la versión externa el paso que falta es mecánico:
                todo lo que está entre las etiquetas{" "}
                <code>&lt;style&gt;</code> se corta y se pega en un archivo{" "}
                <code>estilos.css</code>, y en el <code>&lt;head&gt;</code> queda{" "}
                <code>{'<link rel="stylesheet" href="estilos.css">'}</code>. Las
                etiquetas <code>&lt;style&gt;</code> no se copian: adentro de un{" "}
                <code>.css</code> serían un error de sintaxis.
              </p>
            </div>
          }
        >
          <p>
            Este HTML funciona pero es insostenible: cada elemento carga con su
            propio <code>style</code>. Pasalo a CSS interno, con clases, sin que
            cambie nada de lo que se ve. Después decí en una frase qué habría que
            hacer para convertirlo en CSS externo.
          </p>
          <Editor
            solapas="html"
            consigna="Editalo acá mismo: el resultado de la derecha tiene que quedar igual al de ahora."
            html={`<h2 style="color:#14538f;font-size:22px;border-bottom:2px solid #a8c8f0;padding-bottom:4px;">
  Temas de la clase
</h2>
<ul>
  <li style="color:#14538f;font-weight:700;margin-bottom:4px;">Qué es CSS</li>
  <li style="color:#14538f;font-weight:700;margin-bottom:4px;">Cómo se aplica</li>
  <li style="color:#14538f;font-weight:700;margin-bottom:4px;">Herencia</li>
</ul>`}
          />
        </Desafio>

        <Desafio
          titulo="2. Dos avisos, un solo número de diferencia"
          pista={
            <div>
              <p>
                Escribí todos los colores como <code>hsl(TONO S% L%)</code> y
                usá el <strong>mismo</strong> par de saturación y luminosidad en
                los dos avisos: fondo bien claro (cerca de 95%), borde intermedio
                (cerca de 80%) y texto bien oscuro (cerca de 25%).
              </p>
              <p>
                Si lo hacés bien, la segunda regla es de tres líneas y la única
                diferencia entre las dos es el primer número. Tonos útiles: 150
                es verde, 0 es rojo, 40 es ámbar.
              </p>
            </div>
          }
          solucion={
            <div>
              <Editor
                solapas="css"
                consigna="Cambiá el 0 de .aviso-error por 40 y tenés un aviso ámbar completo, sin tocar nada más."
                html={`<p class="aviso">Los cambios se guardaron.</p>
<p class="aviso aviso-error">No se pudo conectar con el servidor.</p>`}
                css={`/* La forma: la escribo una sola vez. */
.aviso {
  padding: 12px 14px;
  border-radius: 8px;
  border-left: 5px solid;
  margin: 0 0 10px;
}

/* El color: mismo S y mismo L, solo cambia el tono. */
.aviso {
  background: hsl(150 60% 95%);
  border-color: hsl(150 50% 80%);
  color: hsl(150 70% 25%);
}

.aviso-error {
  background: hsl(0 60% 95%);
  border-color: hsl(0 50% 80%);
  color: hsl(0 70% 25%);
}`}
              />
              <p>
                Todavía se repiten tres declaraciones. El paso siguiente es
                guardar el tono en una variable y escribir la regla una sola vez:{" "}
                <code>--tono: 150</code> y{" "}
                <code>{"background: hsl(var(--tono) 60% 95%)"}</code>. Eso lo
                tenés en{" "}
                <Link href="/css/responsive">Responsive y variables</Link>.
              </p>
            </div>
          }
        >
          <p>
            Armá un aviso verde de "todo salió bien" con fondo claro, borde
            izquierdo grueso y texto oscuro, y después una variante roja de
            error. La consigna es que <strong>entre las dos versiones cambie un
            solo número</strong>, y que ese número sea el tono.
          </p>
        </Desafio>

        <Desafio
          titulo="3. Por qué este párrafo no se pone verde"
          pista={
            <p>
              Mirá de dónde viene cada uno de los dos colores. Uno está en la
              hoja de estilos; el otro, pegado al elemento. Revisá la fila
              "Especificidad" de la tabla de más arriba.
            </p>
          }
          solucion={
            <div>
              <p>
                El <code>style</code> en línea le gana a cualquier selector de la
                hoja, por más largo que sea. No importa si escribís{" "}
                <code>p.ok</code>, <code>body p.ok</code> o{" "}
                <code>#contenido p.ok</code>: todos pierden.
              </p>
              <p>
                Hay dos salidas y solo una es buena:
              </p>
              <Codigo
                archivo="las dos salidas"
                resaltar={[2, 7]}
                codigo={`/* ✓ La correcta: sacar el style del HTML.
   <p class="ok">Todo en orden.</p>   ← sin atributo style */
.ok {
  color: green;
}

/* ✗ La que parece resolverlo: !important.
   Gana esta vez, pero ahora la única forma de pisar .ok
   es otro !important, y arranca la escalada. */
.ok {
  color: green !important;
}`}
              />
              <p>
                <code>!important</code> no es "más importante": es un nivel
                aparte de la cascada que se salta el cálculo de especificidad.
                Cada vez que lo usás para tapar un problema, el próximo problema
                es más caro de arreglar. Por qué, en detalle, está en{" "}
                <Link href="/css/selectores">
                  Selectores, cascada y especificidad
                </Link>
                .
              </p>
            </div>
          }
        >
          <p>
            El primer párrafo tiene la clase <code>ok</code> y la hoja dice bien
            claro <code>color: green</code>, pero se ve rojo. Explicá por qué y
            arreglalo <strong>sin usar <code>!important</code></strong>.
          </p>
          <Editor
            consigna="Tocá el CSS todo lo que quieras: no vas a poder. La solución está en el HTML."
            html={`<p class="ok" style="color: crimson;">Todo en orden.</p>
<p class="ok">Este sí obedece a la hoja de estilos.</p>`}
            css={`.ok {
  color: green;
  font-weight: 700;
}`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
