import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "Armar una página entera" };

// El logo de la materia. Es un SVG metido en la propia URL, así que el ejemplo
// no depende de ningún archivo ni de internet.
const ESCUDO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%231b5e8f'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-family='sans-serif' font-weight='700' font-size='13' fill='%23ffffff'%3ESO%3C/text%3E%3C/svg%3E";

// --------------------------------------------------------------------------
// La página terminada. Se arma por partes a lo largo de la lección y al final
// aparece entera en un editor, así que la guardamos acá para no escribirla dos
// veces.
// --------------------------------------------------------------------------

const PAGINA_HTML = `<div class="pagina">

  <header class="cabecera">
    <div class="contenedor cabecera-fila">
      <a class="marca" href="#inicio">
        <img src="${ESCUDO}" alt="" width="32" height="32">
        <span class="marca-nombre">Sistemas Operativos</span>
      </a>
      <nav class="menu" aria-label="Secciones de la materia">
        <a href="#unidades">Unidades</a>
        <a href="#cronograma">Cronograma</a>
        <a href="#equipo">Equipo</a>
      </nav>
    </div>
  </header>

  <main id="inicio">

    <section class="hero">
      <div class="contenedor">
        <p class="hero-dato">Segundo año · Cursada 2026 · 6 h semanales</p>
        <h1>Sistemas Operativos</h1>
        <p class="hero-bajada">Procesos, concurrencia, memoria y archivos: cómo
          el programa que nadie ve reparte una máquina entre todo lo que corre
          encima.</p>
        <a class="boton" href="#unidades">Ver el programa</a>
      </div>
    </section>

    <section class="bloque" id="unidades">
      <div class="contenedor">
        <h2>Unidades del programa</h2>
        <p class="bajada">Seis unidades, dos parciales y un trabajo práctico
          integrador que se entrega en la semana 14.</p>

        <div class="unidades">
          <article class="unidad">
            <p class="unidad-numero">Unidad 1</p>
            <h3>Qué hace un sistema operativo</h3>
            <p>Modo núcleo y modo usuario, llamadas al sistema, arranque de la máquina.</p>
          </article>
          <article class="unidad">
            <p class="unidad-numero">Unidad 2</p>
            <h3>Procesos e hilos</h3>
            <p>El bloque de control, los estados, el cambio de contexto y su costo real.</p>
          </article>
          <article class="unidad">
            <p class="unidad-numero">Unidad 3</p>
            <h3>Planificación de CPU</h3>
            <p>FCFS, SJF, round robin y colas multinivel. Qué optimiza cada uno.</p>
          </article>
          <article class="unidad">
            <p class="unidad-numero">Unidad 4</p>
            <h3>Concurrencia</h3>
            <p>Sección crítica, semáforos, monitores e interbloqueos.</p>
          </article>
          <article class="unidad">
            <p class="unidad-numero">Unidad 5</p>
            <h3>Memoria</h3>
            <p>Paginación, memoria virtual y algoritmos de reemplazo.</p>
          </article>
          <article class="unidad">
            <p class="unidad-numero">Unidad 6</p>
            <h3>Archivos y entrada/salida</h3>
            <p>Sistemas de archivos, journaling, planificación de disco y RAID.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bloque" id="cronograma">
      <div class="contenedor">
        <h2>Cronograma</h2>
        <p class="bajada">Primer cuatrimestre. Las fechas de parcial se
          confirman en clase la semana anterior.</p>

        <div class="tabla-marco">
          <table>
            <caption>Semanas 1 a 6</caption>
            <thead>
              <tr>
                <th scope="col">Semana</th>
                <th scope="col">Tema</th>
                <th scope="col">Entrega</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Introducción y llamadas al sistema</td><td>—</td></tr>
              <tr><td>2</td><td>Procesos e hilos</td><td>Guía 1</td></tr>
              <tr><td>3</td><td>Planificación de CPU</td><td>—</td></tr>
              <tr><td>4</td><td>Sincronización</td><td>Guía 2</td></tr>
              <tr><td>5</td><td>Interbloqueos</td><td>—</td></tr>
              <tr><td>6</td><td>Repaso y primer parcial</td><td>Parcial 1</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="bloque franja" id="equipo">
      <div class="contenedor">
        <h2>Equipo docente</h2>
        <p class="bajada">Consultas los martes de 16 a 18 en el box 214, o por
          el campus virtual.</p>

        <ul class="equipo">
          <li class="docente">
            <span class="avatar" aria-hidden="true">LB</span>
            <div>
              <p class="docente-nombre">Ing. Laura Benítez</p>
              <p class="docente-rol">Profesora titular</p>
            </div>
          </li>
          <li class="docente">
            <span class="avatar" aria-hidden="true">MR</span>
            <div>
              <p class="docente-nombre">Lic. Martín Rearte</p>
              <p class="docente-rol">Jefe de trabajos prácticos</p>
            </div>
          </li>
          <li class="docente">
            <span class="avatar" aria-hidden="true">CS</span>
            <div>
              <p class="docente-nombre">Ing. Carla Sosa</p>
              <p class="docente-rol">Ayudante de primera</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

  </main>

  <footer class="pie">
    <div class="contenedor pie-fila">
      <p>Facultad de Ingeniería · Cátedra de Sistemas Operativos</p>
      <nav class="pie-menu" aria-label="Enlaces del pie">
        <a href="#">Reglamento</a>
        <a href="#">Biblioteca</a>
        <a href="#">Contacto</a>
      </nav>
    </div>
    <div class="contenedor">
      <p class="pie-legal">Última actualización: marzo de 2026</p>
    </div>
  </footer>

</div>`;

const PAGINA_CSS = `/* ======================================================
   1. RESET MÍNIMO — antes de cualquier decisión de diseño
   ====================================================== */

*, *::before, *::after { box-sizing: border-box; }

body { margin: 0; padding: 0; line-height: 1.6; }

h1, h2, h3, p, figure { margin: 0; }

ul[class] { list-style: none; margin: 0; padding: 0; }

img { max-width: 100%; display: block; }

input, button, textarea, select { font: inherit; }


/* ======================================================
   2. EL SISTEMA — los números se eligen UNA vez
   ====================================================== */

:root {
  /* Colores nombrados por su ROL, no por su color. */
  --marca: #1b5e8f;
  --marca-oscura: #0f3f61;
  --marca-clara: #e7f0f7;
  --acento: #a8480f;
  --tinta: #16202c;
  --tinta-suave: #56677a;
  --papel: #f5f8fb;
  --superficie: #ffffff;
  --borde: #d8e2ec;
  --sobre-marca: #cfe2ef;

  /* Escala de espaciado: 4 · 8 · 16 · 24 · 48 */
  --e1: 4px;
  --e2: 8px;
  --e3: 16px;
  --e4: 24px;
  --e5: 48px;

  /* Escala tipográfica */
  --t-mini:   0.75rem;
  --t-chico:  0.875rem;
  --t-base:   1rem;
  --t-medio:  1.125rem;
  --t-grande: 1.5rem;
  --t-titulo: 2rem;

  --radio: 10px;
  --ancho: 900px;
  --sombra: 0 1px 2px rgba(16, 32, 44, 0.06), 0 6px 18px rgba(16, 32, 44, 0.08);
}

body {
  background: var(--papel);
  color: var(--tinta);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: var(--t-base);
}


/* ======================================================
   3. ESQUELETO — contenedor centrado y footer al pie
   ====================================================== */

.contenedor {
  max-width: var(--ancho);
  margin-inline: auto;
  padding-inline: var(--e3);
}

.pagina {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main { flex: 1; }


/* ======================================================
   4. CABECERA — Flexbox
   ====================================================== */

.cabecera {
  background: var(--superficie);
  border-bottom: 1px solid var(--borde);
  position: sticky;
  top: 0;
  z-index: 10;
}

.cabecera-fila {
  display: grid;          /* base (celular): apilado */
  gap: var(--e2);
  padding-block: var(--e2);
}

.marca {
  display: flex;
  align-items: center;
  gap: var(--e2);
  color: var(--tinta);
  text-decoration: none;
  font-weight: 700;
}

.marca-nombre { font-size: var(--t-medio); }

.menu {
  display: flex;
  flex-wrap: wrap;
  gap: var(--e1);
}

.menu a {
  padding: var(--e1) var(--e2);
  border-radius: 6px;
  color: var(--tinta-suave);
  text-decoration: none;
  font-size: var(--t-chico);
  font-weight: 600;
}

.menu a:hover {
  background: var(--marca-clara);
  color: var(--marca-oscura);
}

/* El foco visible NO es decoración: es cómo se ve el teclado. */
.marca:focus-visible,
.menu a:focus-visible,
.pie a:focus-visible {
  outline: 2px solid var(--marca);
  outline-offset: 2px;
  border-radius: 6px;
}


/* ======================================================
   5. HERO
   ====================================================== */

.hero {
  background: var(--marca);
  color: #fff;
  padding-block: var(--e4);
}

.hero-dato {
  font-size: var(--t-mini);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--sobre-marca);
  margin-bottom: var(--e2);
}

.hero h1 {
  font-size: clamp(1.6rem, 5vw, var(--t-titulo));
  line-height: 1.15;
  margin-bottom: var(--e2);
}

.hero-bajada {
  color: var(--sobre-marca);
  max-width: 60ch;
  margin-bottom: var(--e4);
}

.boton {
  display: inline-block;
  background: var(--superficie);
  color: var(--marca-oscura);
  font-size: var(--t-chico);
  font-weight: 700;
  text-decoration: none;
  padding: var(--e2) var(--e4);
  border-radius: 999px;
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.boton:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.boton:active { transform: translateY(0); }

.boton:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 3px;
}


/* ======================================================
   6. BLOQUES Y GRILLA DE UNIDADES — Grid
   ====================================================== */

.bloque { padding-block: var(--e4); }

.bloque h2 {
  font-size: var(--t-grande);
  line-height: 1.2;
  margin-bottom: var(--e1);
}

.bajada {
  color: var(--tinta-suave);
  font-size: var(--t-chico);
  max-width: 60ch;
  margin-bottom: var(--e4);
}

.unidades {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--e3);
}

.unidad {
  background: var(--superficie);
  border: 1px solid var(--borde);
  border-top: 3px solid var(--marca);
  border-radius: var(--radio);
  padding: var(--e3);
  box-shadow: var(--sombra);
}

.unidad-numero {
  font-size: var(--t-mini);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--acento);
  margin-bottom: var(--e1);
}

.unidad h3 { font-size: var(--t-base); margin-bottom: var(--e1); }

.unidad p { font-size: var(--t-chico); color: var(--tinta-suave); }


/* ======================================================
   7. CRONOGRAMA
   ====================================================== */

.tabla-marco {
  overflow-x: auto;       /* la tabla scrollea sola, la página no */
  background: var(--superficie);
  border: 1px solid var(--borde);
  border-radius: var(--radio);
}

table { width: 100%; border-collapse: collapse; font-size: var(--t-chico); }

caption {
  text-align: left;
  padding: var(--e2) var(--e3);
  font-size: var(--t-mini);
  color: var(--tinta-suave);
}

th, td {
  text-align: left;
  padding: var(--e2) var(--e3);
  border-bottom: 1px solid var(--borde);
}

thead th {
  background: var(--marca-clara);
  color: var(--marca-oscura);
  white-space: nowrap;
}

tbody tr:last-child td { border-bottom: 0; }


/* ======================================================
   8. FRANJA DEL EQUIPO
   ====================================================== */

.franja { background: var(--marca-clara); }

.equipo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: var(--e2);
}

.docente {
  display: flex;
  align-items: center;
  gap: var(--e2);
  background: var(--superficie);
  border-radius: var(--radio);
  padding: var(--e2);
}

.avatar {
  flex-shrink: 0;         /* el círculo nunca se deforma */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--marca);
  color: #fff;
  font-size: var(--t-chico);
  font-weight: 700;
}

.docente-nombre { font-size: var(--t-chico); font-weight: 600; }
.docente-rol { font-size: var(--t-mini); color: var(--tinta-suave); }


/* ======================================================
   9. PIE
   ====================================================== */

.pie {
  background: var(--marca-oscura);
  color: var(--sobre-marca);
  padding-block: var(--e4);
  font-size: var(--t-chico);
}

.pie-fila {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--e2) var(--e4);
}

.pie-menu { display: flex; flex-wrap: wrap; gap: var(--e3); }
.pie a { color: #fff; }
.pie-legal { font-size: var(--t-mini); opacity: 0.7; margin-top: var(--e3); }


/* ======================================================
   10. LA ÚNICA MEDIA QUERY — mobile first: solo AGREGA
   ====================================================== */

@media (min-width: 400px) {
  .cabecera-fila {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .hero   { padding-block: var(--e5); }
  .bloque { padding-block: var(--e5); }
}`;

export default function Pagina() {
  return (
    <Leccion
      slug="/css/pagina-completa"
      titulo="Armar una página entera"
      resumen="Todo junto: una landing con header, hero, grilla de tarjetas y footer, explicada decisión por decisión."
    >
      <Seccion titulo="El plan: qué vamos a armar y en qué orden">
        <p>
          Esta no es una lección más de CSS: es un <strong>taller</strong>. Ya
          tenés todas las piezas —el{" "}
          <Link href="/css/caja">modelo de caja</Link>, los{" "}
          <Link href="/css/selectores">selectores</Link>,{" "}
          <Link href="/css/flexbox">Flexbox</Link>,{" "}
          <Link href="/css/grid">Grid</Link> y{" "}
          <Link href="/css/responsive">responsive y variables</Link>— y lo que
          falta es lo único que las materias nunca enseñan:{" "}
          <strong>en qué orden se usan y por qué</strong>.
        </p>

        <p>
          Vamos a construir el sitio de una materia: <em>Sistemas Operativos</em>
          . Nada de &quot;Producto 1 / Producto 2&quot;: contenido creíble,
          porque las decisiones de diseño dependen del contenido real. Y lo
          vamos a hacer por partes, cada una en su editor, explicando qué se
          eligió y por qué.
        </p>

        <p>Ésta es la anatomía. Seis piezas y nada más:</p>

        <Vista
          html={`<div class="mapa">
  <div class="z z-header"><b>&lt;header&gt;</b> marca + &lt;nav&gt; · Flexbox</div>
  <div class="z z-hero"><b>&lt;section&gt;</b> hero: título, bajada y un botón</div>
  <div class="z z-main">
    <span class="et">&lt;main&gt;</span>
    <div class="z z-grilla">
      <i>&lt;article&gt;</i><i>&lt;article&gt;</i><i>&lt;article&gt;</i>
      <i>&lt;article&gt;</i><i>&lt;article&gt;</i><i>&lt;article&gt;</i>
      <b class="rot">grilla de unidades · Grid auto-fit</b>
    </div>
    <div class="z z-tabla">&lt;table&gt; cronograma</div>
    <div class="z z-equipo">franja del equipo docente</div>
  </div>
  <div class="z z-pie"><b>&lt;footer&gt;</b> pegado al pie</div>
</div>`}
          css={`body { padding: 14px; background: #f5f8fb; font-size: 13px; }

.mapa { display: grid; gap: 8px; }

.z {
  border: 2px dashed #56677a;
  border-radius: 8px;
  padding: 10px;
  color: #16202c;
}

.z-header { background: #ffffff; }
.z-hero   { background: #1b5e8f; color: white; border-color: #0f3f61; padding: 18px 10px; }
.z-main   { background: #ffffff; border-style: solid; border-color: #d8e2ec; }
.et       { font-weight: 700; color: #56677a; font-size: 12px; }

.z-grilla {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 6px;
  background: #f5f8fb;
  border-color: #a8480f;
  margin: 6px 0;
}

.z-grilla i {
  display: block;
  background: #ffffff;
  border: 1px solid #d8e2ec;
  border-top: 3px solid #1b5e8f;
  border-radius: 6px;
  padding: 10px 6px;
  font-style: normal;
  font-size: 11px;
  color: #56677a;
  text-align: center;
}

.rot { grid-column: 1 / -1; font-size: 11px; color: #a8480f; }

.z-tabla  { background: #ffffff; border-color: #d8e2ec; border-style: solid; margin-bottom: 6px; }
.z-equipo { background: #e7f0f7; border-color: #1b5e8f; }
.z-pie    { background: #0f3f61; color: white; border-color: #0f3f61; }`}
        />

        <p>El orden de trabajo es siempre el mismo, y no es caprichoso:</p>
        <ol>
          <li>
            <strong>El reset.</strong> Emparejar el punto de partida antes de
            decidir nada.
          </li>
          <li>
            <strong>El sistema.</strong> Los colores, los espacios y los tamaños
            de letra, decididos <em>una sola vez</em>.
          </li>
          <li>
            <strong>El esqueleto.</strong> El HTML semántico y el contenedor
            centrado.
          </li>
          <li>
            <strong>Las piezas.</strong> Cabecera, hero, grilla, tabla, franja,
            pie.
          </li>
          <li>
            <strong>El repaso.</strong> Teclado, pantalla chica, contraste,
            scroll horizontal.
          </li>
        </ol>

        <Nota tipo="atencion" titulo="Cómo mirar los ejemplos de esta página">
          <p>
            El panel de resultado mide unos <strong>430px</strong>, así que ves
            la página casi como en un celular apaisado. Las media queries de
            adentro comparan contra <em>ese</em> ancho, no contra tu ventana —
            ya lo explicamos en{" "}
            <Link href="/css/responsive">Responsive y variables</Link>—. Por eso
            los puntos de corte de los ejemplos son números chicos como 400px:{" "}
            <strong>subilos a 900px</strong> y vas a ver la versión de celular
            al instante.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Antes de la primera regla: el reset mínimo">
        <p>
          Todo navegador trae su propia hoja de estilos. Es la que hace que un{" "}
          <code>&lt;h1&gt;</code> sea grande y negrita sin que vos escribas
          nada. El problema es que también trae{" "}
          <strong>márgenes que nadie pidió</strong>, un{" "}
          <code>line-height</code> apretado y un modelo de caja que te va a
          hacer perder una tarde.
        </p>

        <p>
          Un <strong>reset</strong> es un puñado de reglas al principio del
          archivo que emparejan ese punto de partida. Empecemos por la más
          importante de todas:
        </p>

        <Editor
          alto={260}
          solapas="css"
          consigna="Cambiá content-box por border-box en .rota y mirá cómo entra en su lugar. Después subí el padding de las dos a 40px: la verde sigue entrando, la roja se desborda más."
          html={`<div class="caja rota">box-sizing: content-box</div>
<div class="caja sana">box-sizing: border-box</div>
<p class="pie">Las dos dicen width: 100%. Sólo una lo cumple.</p>`}
          css={`.caja {
  width: 100%;
  padding: 16px;
  border: 5px solid;
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 13px;
}

/* Lo que trae el navegador: el width NO incluye padding ni borde,
   así que esta caja mide 100% + 32 + 10 y se va del panel. */
.rota {
  box-sizing: content-box;
  background: #fdeaed;
  border-color: #b4243a;
}

/* Lo que pone el reset: el width es el ancho FINAL, todo incluido. */
.sana {
  box-sizing: border-box;
  background: #e3f6ee;
  border-color: #0f7a52;
}

.pie { font-size: 13px; color: #55697f; }`}
        />

        <p>
          Fijate que la caja roja te generó <strong>scroll horizontal</strong>.
          Ése es el síntoma más común de una página rota en el celular, y en el
          90% de los casos el culpable es un ancho fijo o un{" "}
          <code>content-box</code> olvidado. Volvemos a esto en la lista de
          control del final.
        </p>

        <h3>El reset completo: seis reglas</h3>
        <p>
          No hace falta más que esto. Copialo al principio de tu hoja de estilos
          y olvidate:
        </p>

        <Codigo
          archivo="estilos.css"
          resaltar={[3, 5, 7, 11, 13, 15]}
          codigo={`/* --- Reset mínimo --------------------------------------------- */

*, *::before, *::after { box-sizing: border-box; }

body { margin: 0; line-height: 1.6; }

h1, h2, h3, h4, p, figure, blockquote { margin: 0; }

/* Sólo las listas que vos estilás: una lista de contenido normal
   tiene que seguir teniendo sus viñetas. */
ul[class], ol[class] { list-style: none; margin: 0; padding: 0; }

img, picture, svg, video { max-width: 100%; display: block; }

input, button, textarea, select { font: inherit; }`}
        />

        <ul>
          <li>
            <strong>
              <code>box-sizing: border-box</code>
            </strong>{" "}
            en todo (incluidos los pseudoelementos): el <code>width</code> pasa
            a ser el ancho final. Es la regla que más bugs evita en tu vida.
          </li>
          <li>
            <strong>
              <code>margin: 0</code> en el <code>body</code>
            </strong>
            : el navegador trae 8px de margen que se ven como una franja blanca
            alrededor de tu cabecera de color.
          </li>
          <li>
            <strong>
              <code>line-height: 1.6</code>
            </strong>
            : el valor por defecto ronda 1.2 y para texto seguido es
            incómodo de leer. 1.5–1.65 es la zona sana.
          </li>
          <li>
            <strong>Márgenes de títulos y párrafos en cero</strong>: el
            espaciado lo vas a poner vos, con tu escala, y así no peleás contra
            el <em>colapso de márgenes</em>.
          </li>
          <li>
            <strong>
              <code>img &#123; max-width: 100%; display: block &#125;</code>
            </strong>
            : la primera línea evita que una foto de 3000px rompa el layout; la
            segunda saca el hueco fantasma de 4px que queda abajo de una imagen
            en línea.
          </li>
          <li>
            <strong>
              <code>font: inherit</code> en los controles
            </strong>
            : los <code>&lt;input&gt;</code> y <code>&lt;button&gt;</code>{" "}
            <em>no</em> heredan la tipografía del documento. Sin esta línea tu
            formulario se ve con la letra del sistema operativo.
          </li>
        </ul>

        <Comparacion>
          <Columna tono="mal" titulo="El reset de 300 líneas">
            <p>
              Los resets clásicos (el de Eric Meyer, <code>normalize.css</code>)
              ponen en cero absolutamente todo: negritas, viñetas, tamaños de
              título, tablas.
            </p>
            <p className="tenue">
              Terminás escribiendo de nuevo lo que el navegador ya hacía bien, y
              si te olvidás de algo la página queda sin jerarquía visual.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Seis reglas y seguimos">
            <p>
              Arreglás sólo lo que molesta y dejás intacto lo que el navegador
              hace bien: la jerarquía de títulos, los enlaces subrayados, las
              tablas.
            </p>
            <p className="tenue">
              Menos código, menos cosas que anular, y si borrás el reset la
              página sigue siendo legible.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="info" titulo="Los editores de esta página ya traen medio reset">
          <p>
            El marco donde corren estos ejemplos ya aplica{" "}
            <code>box-sizing: border-box</code> y <code>margin: 0</code> en el{" "}
            <code>body</code>, para que los ejemplos de todas las lecciones se
            vean parejos. Por eso el ejemplo de arriba tuvo que escribir{" "}
            <code>content-box</code> <em>a mano</em> para mostrar el problema.
            En una página tuya, de verdad, el defecto es <code>content-box</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El sistema: elegí los números una sola vez">
        <p>
          Ésta es la idea más valiosa de toda la lección, y la que separa una
          página de alumno de una página que parece hecha por alguien que sabe.
          Va así:
        </p>

        <Nota tipo="ok" titulo="La regla">
          <p>
            <strong>
              Los números no se eligen cada vez que los escribís. Se eligen una
              vez, se les pone nombre, y después se reutilizan.
            </strong>{" "}
            Si en el medio de tu CSS escribís <code>padding: 13px</code>, la
            pregunta no es &quot;¿queda bien?&quot; sino &quot;¿de dónde salió
            el 13?&quot;.
          </p>
        </Nota>

        <p>
          Un sistema son tres listas cortas: <strong>colores</strong>,{" "}
          <strong>espacios</strong> y <strong>tamaños de letra</strong>. Se
          escriben en <code>:root</code> como{" "}
          <Link href="/css/responsive">variables CSS</Link> y no se tocan más.
        </p>

        <h3>Los colores se nombran por su rol</h3>
        <p>
          Una variable que se llama <code>--azul</code> es una bomba de tiempo:
          el día que la cátedra cambia el color institucional a bordó vas a
          tener un <code>--azul: #8b1d3f</code> en tu archivo. Nombralas por{" "}
          <strong>para qué sirven</strong>, no por qué color son.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Nombradas por color">
            <Codigo
              archivo="estilos.css"
              codigo={`:root {
  --azul: #1b5e8f;
  --azul-claro: #e7f0f7;
  --gris: #56677a;
  --gris-clarito: #f5f8fb;
  --naranja: #a8480f;
}

.unidad { border-top: 3px solid var(--azul); }
.bajada { color: var(--gris); }`}
            />
            <p className="tenue">
              Cuando cambie la paleta, o el nombre miente o hay que renombrar
              todo el archivo.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Nombradas por rol">
            <Codigo
              archivo="estilos.css"
              codigo={`:root {
  --marca: #1b5e8f;
  --marca-clara: #e7f0f7;
  --tinta-suave: #56677a;
  --papel: #f5f8fb;
  --acento: #a8480f;
}

.unidad { border-top: 3px solid var(--marca); }
.bajada { color: var(--tinta-suave); }`}
            />
            <p className="tenue">
              El nombre sigue siendo verdad pase lo que pase. Y encima te da el
              tema oscuro casi gratis.
            </p>
          </Columna>
        </Comparacion>

        <h3>La escala de espaciado: 4 · 8 · 16 · 24 · 48</h3>
        <p>
          Cinco valores. Con cinco alcanza para una página entera. Cada paso es
          claramente distinto del anterior, así que cuando dos cosas tienen
          espacios distintos <em>se nota que es a propósito</em>. Con valores
          arbitrarios (12, 14, 15, 18, 20) nadie sabe si la diferencia es
          intención o distracción.
        </p>

        <Codigo
          archivo="estilos.css"
          codigo={`:root {
  --e1: 4px;    /* pegado: un ícono y su texto */
  --e2: 8px;    /* dentro de un componente chico */
  --e3: 16px;   /* padding de una tarjeta, gap de una grilla */
  --e4: 24px;   /* entre elementos distintos de un bloque */
  --e5: 48px;   /* entre secciones de la página */
}`}
        />

        <h3>La escala tipográfica</h3>
        <p>
          Lo mismo con la letra: seis tamaños, cada uno un poco más grande que
          el anterior (acá multiplicando por ~1.2). Y{" "}
          <strong>siempre en <code>rem</code></strong>, no en píxeles: si
          alguien agrandó la letra por defecto de su navegador porque ve poco,
          con <code>rem</code> tu página lo respeta y con <code>px</code> lo
          ignora.
        </p>

        <Codigo
          archivo="estilos.css"
          codigo={`:root {
  --t-mini:   0.75rem;    /* 12px — etiquetas, letra chica legal */
  --t-chico:  0.875rem;   /* 14px — texto secundario, tablas */
  --t-base:   1rem;       /* 16px — el texto normal */
  --t-medio:  1.125rem;   /* 18px — subtítulos */
  --t-grande: 1.5rem;     /* 24px — títulos de sección (h2) */
  --t-titulo: 2rem;       /* 32px — el h1 del hero */
}`}
        />

        <p>
          Ahora mirá lo que pasa cuando todo el CSS lee de ahí. En este editor{" "}
          <strong>no hay un solo número suelto</strong>:
        </p>

        <Editor
          alto={330}
          solapas="css"
          consigna="Cambiá --marca por #7a3ba8: se pintan el borde, el número, el botón y el hover de una sola vez. Después poné --e3 en 32px y mirá respirar toda la tarjeta. Ningún selector se enteró."
          html={`<article class="unidad">
  <p class="unidad-numero">Unidad 3</p>
  <h3>Planificación de CPU</h3>
  <p class="unidad-texto">FCFS, SJF, round robin y colas multinivel.
    Qué optimiza cada uno y a costa de qué.</p>
  <a class="boton" href="#">Ver el apunte</a>
</article>`}
          css={`:root {
  --marca: #1b5e8f;
  --marca-oscura: #0f3f61;
  --acento: #a8480f;
  --tinta: #16202c;
  --tinta-suave: #56677a;
  --superficie: #ffffff;
  --borde: #d8e2ec;

  --e1: 4px;  --e2: 8px;  --e3: 16px;  --e4: 24px;

  --t-mini: 0.75rem;  --t-chico: 0.875rem;  --t-base: 1rem;

  --radio: 10px;
}

body { background: #f5f8fb; color: var(--tinta); }

.unidad {
  background: var(--superficie);
  border: 1px solid var(--borde);
  border-top: 3px solid var(--marca);
  border-radius: var(--radio);
  padding: var(--e3);
  max-width: 320px;
}

.unidad-numero {
  margin: 0 0 var(--e1);
  font-size: var(--t-mini);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--acento);
}

.unidad h3 { margin: 0 0 var(--e1); font-size: var(--t-base); }

.unidad-texto {
  margin: 0 0 var(--e4);
  font-size: var(--t-chico);
  color: var(--tinta-suave);
}

.boton {
  display: inline-block;
  padding: var(--e2) var(--e4);
  border-radius: 999px;
  background: var(--marca);
  color: white;
  font-size: var(--t-chico);
  font-weight: 700;
  text-decoration: none;
}

.boton:hover { background: var(--marca-oscura); }`}
        />

        <Nota tipo="atencion" titulo="El test de los cinco segundos">
          <p>
            Abrí tu CSS y buscá los <code>#</code> y los <code>px</code>.{" "}
            <strong>Cada uno que no esté adentro de <code>:root</code> es una
            decisión que tomaste dos veces.</strong>{" "}
            No es una regla de estilo: es la diferencia entre cambiar el color
            de la materia en una línea o en cuarenta.
          </p>
          <p>
            Hay excepciones razonables —un <code>border-radius: 50%</code>, un{" "}
            <code>999px</code> de píldora, un <code>1px</code> de borde— pero
            son cinco, no cincuenta.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El esqueleto: contenedor centrado y HTML semántico">
        <p>
          Antes de escribir una regla de color, el marcado. La estructura de
          esta página son cinco etiquetas y se leen solas:
        </p>

        <Codigo
          archivo="index.html"
          codigo={`<body>
  <div class="pagina">
    <header class="cabecera">…marca y <nav>…</header>

    <main id="inicio">
      <section class="hero">…</section>
      <section class="bloque" id="unidades">…</section>
      <section class="bloque" id="cronograma">…</section>
      <section class="bloque franja" id="equipo">…</section>
    </main>

    <footer class="pie">…</footer>
  </div>
</body>`}
        />

        <p>
          El único <code>&lt;div&gt;</code> es <code>.pagina</code>, y está por
          una razón concreta de layout que vemos en un minuto. Todo lo demás
          tiene nombre. Si esto te suena a repetición de{" "}
          <Link href="/html/semantica">HTML semántico</Link>, es exactamente
          eso: acá se cobra.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Sopa de divs">
            <Codigo
              archivo="index.html"
              codigo={`<div class="top">
  <div class="logo">…</div>
  <div class="links">…</div>
</div>
<div class="body">
  <div class="cards">
    <div class="card">…</div>
  </div>
</div>
<div class="bottom">…</div>`}
            />
            <p className="tenue">
              Funciona. Se ve idéntico. Pero un lector de pantalla no puede
              saltar al contenido, el buscador no distingue el menú del texto, y
              dentro de seis meses vos tampoco.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Con nombre propio">
            <Codigo
              archivo="index.html"
              codigo={`<header>
  <a class="marca">…</a>
  <nav aria-label="Secciones">…</nav>
</header>
<main>
  <section id="unidades">
    <article>…</article>
  </section>
</main>
<footer>…</footer>`}
            />
            <p className="tenue">
              Las mismas cajas, el mismo CSS, cero líneas extra. Y la página
              pasa a tener un mapa que las máquinas pueden recorrer.
            </p>
          </Columna>
        </Comparacion>

        <h3>El contenedor centrado: tres líneas</h3>
        <p>
          El patrón más repetido de la web: el fondo de una franja llega de
          borde a borde de la pantalla, pero el <em>contenido</em> se queda en
          una columna centrada. Se resuelve con una clase que reusás en todas
          las franjas:
        </p>

        <Codigo
          archivo="estilos.css"
          resaltar={[2, 3, 4]}
          codigo={`.contenedor {
  max-width: var(--ancho);   /* un techo: nunca más ancho que esto */
  margin-inline: auto;       /* el sobrante se reparte a los dos lados */
  padding-inline: var(--e3); /* aire a los costados SIEMPRE */
}`}
        />

        <ul>
          <li>
            <code>max-width</code> y no <code>width</code>: es un techo, no una
            orden. En una pantalla angosta el contenedor se achica solo.
          </li>
          <li>
            <code>margin-inline: auto</code> es el atajo moderno de{" "}
            <code>margin-left: auto; margin-right: auto</code>. Centra
            horizontalmente cualquier caja de bloque que tenga un ancho.
          </li>
          <li>
            <code>padding-inline</code> es <strong>imprescindible</strong>. El
            día que la pantalla mida menos que <code>--ancho</code>, el{" "}
            <code>max-width</code> no hace nada y el texto queda pegado al vidrio
            del teléfono. Ese padding es lo único que lo separa.
          </li>
        </ul>

        <Editor
          alto={300}
          solapas="css"
          consigna="Borrá padding-inline y mirá el texto pegarse al borde del panel: eso es exactamente lo que ve alguien en un celular. Después subí max-width a 1400px: el padding sigue siendo lo único que te salva."
          html={`<header class="franja-marca">
  <div class="contenedor">Cátedra de Sistemas Operativos</div>
</header>

<main>
  <div class="contenedor">
    <h2>El contenedor centrado</h2>
    <p>El fondo azul llega de borde a borde. El texto, no: vive en una
      columna con un ancho máximo y aire a los costados.</p>
  </div>
</main>`}
          css={`:root { --ancho: 640px; --e3: 16px; --e4: 24px; }

body { padding: 0; background: #f5f8fb; }

/* La clase que se repite en TODAS las franjas de la página. */
.contenedor {
  max-width: var(--ancho);
  margin-inline: auto;
  padding-inline: var(--e3);
}

.franja-marca {
  background: #1b5e8f;
  color: white;
  font-weight: 700;
  padding-block: var(--e3);
}

main { padding-block: var(--e4); }

h2 { margin: 0 0 8px; font-size: 1.5rem; }
p  { margin: 0; color: #56677a; }`}
        />

        <Nota tipo="info" titulo="La versión de una sola línea">
          <p>
            También podés escribir <code>margin-inline</code> y{" "}
            <code>padding-inline</code> juntos con la función{" "}
            <code>min()</code> que viste en{" "}
            <Link href="/css/responsive">Responsive y variables</Link>:
          </p>
          <Codigo
            archivo="estilos.css"
            codigo={`.contenedor {
  width: min(100% - 2 * var(--e3), var(--ancho));
  margin-inline: auto;
}`}
          />
          <p>
            Hace exactamente lo mismo. Usá la que te resulte más fácil de leer a
            vos: en un trabajo práctico que va a corregir otra persona, la
            versión de tres líneas se entiende sin pensar.
          </p>
        </Nota>

        <h3>El footer pegado al pie</h3>
        <p>
          Ese <code>&lt;div class=&quot;pagina&quot;&gt;</code> está para esto:
          una página con poco contenido deja el footer flotando en el medio de
          la pantalla, con un vacío blanco abajo. El arreglo lo viste en{" "}
          <Link href="/css/flexbox">Flexbox</Link> y son cuatro líneas:
        </p>

        <Editor
          alto={300}
          solapas="css"
          consigna="Borrá flex: 1 del main y mirá subirse al footer. Después volvé a ponerlo y agregá párrafos en el HTML: el footer baja solo, sin tocar el CSS."
          html={`<div class="pagina">
  <header>Sistemas Operativos</header>
  <main>
    <p>Todavía no cargamos casi nada de contenido.</p>
  </main>
  <footer>Facultad de Ingeniería · 2026</footer>
</div>`}
          css={`body { padding: 0; background: #f5f8fb; font-size: 14px; }

.pagina {
  display: flex;
  flex-direction: column;
  min-height: 100vh;    /* al menos el alto de la pantalla */
}

main {
  flex: 1;              /* el main se come todo el sobrante */
  padding: 16px;
}

header {
  background: white;
  border-bottom: 1px solid #d8e2ec;
  padding: 16px;
  font-weight: 700;
}

footer {
  background: #0f3f61;
  color: #cfe2ef;
  padding: 16px;
}`}
        />

        <p>
          Hay dos variantes y conviene que sepas la diferencia:{" "}
          <code>flex: 1</code> en el <code>&lt;main&gt;</code> hace que el main{" "}
          <em>crezca de verdad</em>, así que si le ponés un color de fondo llega
          hasta abajo. <code>margin-top: auto</code> en el{" "}
          <code>&lt;footer&gt;</code> logra lo mismo visualmente, pero el
          sobrante queda vacío. Para esta página queremos la primera.
        </p>
      </Seccion>

      <Seccion titulo="La cabecera y el hero: Flexbox, botones y foco visible">
        <p>
          La cabecera tiene dos cosas —la marca y el menú— que van en{" "}
          <strong>una sola dirección</strong>, una a cada punta, y que miden lo
          que miden. Eso es <Link href="/css/flexbox">Flexbox</Link> de manual:{" "}
          <code>display: flex</code> + <code>justify-content: space-between</code>.
        </p>

        <p>
          Grid acá sería peor: tendrías que inventar columnas para dos elementos
          que no forman ninguna grilla. La regla práctica no cambió:{" "}
          <strong>
            una fila o una columna de cosas que miden distinto → Flexbox
          </strong>
          ; una cuadrícula de cosas parejas → Grid.
        </p>

        <Editor
          alto={330}
          consigna="Apretá Tab dentro del resultado: el recuadro azul salta de enlace en enlace. Ahora borrá el bloque de :focus-visible y volvé a intentar: no sabés dónde estás parado. Eso es exactamente lo que le pasa a quien no usa mouse."
          html={`<header class="cabecera">
  <div class="contenedor cabecera-fila">
    <a class="marca" href="#">
      <img src="${ESCUDO}" alt="" width="32" height="32">
      <span class="marca-nombre">Sistemas Operativos</span>
    </a>
    <nav class="menu" aria-label="Secciones de la materia">
      <a href="#">Unidades</a>
      <a href="#">Cronograma</a>
      <a href="#">Equipo</a>
    </nav>
  </div>
</header>
<p class="ayuda">Hacé clic acá y después apretá Tab varias veces.</p>`}
          css={`:root {
  --marca: #1b5e8f;
  --marca-oscura: #0f3f61;
  --marca-clara: #e7f0f7;
  --tinta: #16202c;
  --tinta-suave: #56677a;
  --superficie: #ffffff;
  --borde: #d8e2ec;
  --e1: 4px;  --e2: 8px;  --e3: 16px;
  --t-chico: 0.875rem;  --t-medio: 1.125rem;
  --ancho: 900px;
}

body { padding: 0; background: #f5f8fb; }

.contenedor {
  max-width: var(--ancho);
  margin-inline: auto;
  padding-inline: var(--e3);
}

.cabecera {
  background: var(--superficie);
  border-bottom: 1px solid var(--borde);
}

/* Base (celular): apilado. La media query de abajo lo pasa a fila. */
.cabecera-fila {
  display: grid;
  gap: var(--e2);
  padding-block: var(--e2);
}

.marca {
  display: flex;
  align-items: center;     /* el escudo centrado con el texto */
  gap: var(--e2);
  color: var(--tinta);
  text-decoration: none;
  font-weight: 700;
}

.marca-nombre { font-size: var(--t-medio); }

.menu {
  display: flex;
  flex-wrap: wrap;         /* si no entran, bajan de renglón */
  gap: var(--e1);
}

.menu a {
  padding: var(--e1) var(--e2);
  border-radius: 6px;
  color: var(--tinta-suave);
  text-decoration: none;
  font-size: var(--t-chico);
  font-weight: 600;
}

/* Estado de mouse. */
.menu a:hover {
  background: var(--marca-clara);
  color: var(--marca-oscura);
}

/* Estado de TECLADO. Esto no es opcional. */
.marca:focus-visible,
.menu a:focus-visible {
  outline: 2px solid var(--marca);
  outline-offset: 2px;
  border-radius: 6px;
}

.ayuda { font-size: 13px; color: #56677a; padding: var(--e3); }

@media (min-width: 400px) {
  .cabecera-fila {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}`}
        />

        <Nota tipo="error" titulo="outline: none es el bug de accesibilidad más repetido de la web">
          <p>
            En algún tutorial vas a encontrar{" "}
            <code>*:focus &#123; outline: none &#125;</code> porque &quot;el
            recuadro es feo&quot;. Lo que hacés con esa línea es{" "}
            <strong>
              dejar sin puntero a todo el que navega con teclado
            </strong>
            : lector de pantalla, alguien con una lesión en la mano, alguien que
            simplemente prefiere el Tab. Es como apagar el cursor del mouse.
          </p>
          <p>
            Si el recuadro por defecto no te gusta,{" "}
            <strong>reemplazalo, no lo borres</strong>. Tenés{" "}
            <code>outline-color</code>, <code>outline-offset</code>,{" "}
            <code>box-shadow</code> o un cambio de fondo. Lo único inaceptable
            es que no se vea nada.
          </p>
        </Nota>

        <Nota tipo="info" titulo="focus contra focus-visible">
          <p>
            <code>:focus</code> se dispara siempre, incluso cuando hacés clic
            con el mouse —y ahí sí el recuadro queda raro—.{" "}
            <code>:focus-visible</code> lo deja al navegador: aparece cuando
            navegás con teclado y no aparece en un clic común. Es el que querés
            el 99% de las veces, y anda en todos los navegadores actuales.
          </p>
        </Nota>

        <h3>El hero y su botón</h3>
        <p>
          El hero es la franja que contesta &quot;¿dónde estoy y qué puedo hacer
          acá?&quot;: un dato corto, el título, una bajada de dos líneas y{" "}
          <strong>una sola</strong> acción. Si ponés tres botones, no hay
          ninguno importante.
        </p>

        <Editor
          alto={360}
          consigna="Pasale el mouse al botón y después apretá Tab hasta llegar. Son dos estados distintos y los dos tienen que existir. Probá también achicar el 5vw del clamp a 3vw: el título deja de crecer."
          html={`<section class="hero">
  <div class="contenedor">
    <p class="hero-dato">Segundo año · Cursada 2026 · 6 h semanales</p>
    <h1>Sistemas Operativos</h1>
    <p class="hero-bajada">Procesos, concurrencia, memoria y archivos: cómo
      el programa que nadie ve reparte una máquina entre todo lo que corre
      encima.</p>
    <a class="boton" href="#">Ver el programa</a>
  </div>
</section>`}
          css={`:root {
  --marca: #1b5e8f;
  --marca-oscura: #0f3f61;
  --sobre-marca: #cfe2ef;
  --superficie: #ffffff;
  --e2: 8px;  --e3: 16px;  --e4: 24px;  --e5: 48px;
  --t-mini: 0.75rem;  --t-chico: 0.875rem;  --t-titulo: 2rem;
  --ancho: 900px;
}

body { padding: 0; }

.contenedor {
  max-width: var(--ancho);
  margin-inline: auto;
  padding-inline: var(--e3);
}

.hero {
  background: var(--marca);
  color: white;
  padding-block: var(--e5);
}

.hero-dato {
  margin: 0 0 var(--e2);
  font-size: var(--t-mini);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--sobre-marca);
}

/* El título crece con la pantalla sin ninguna media query. */
.hero h1 {
  margin: 0 0 var(--e2);
  font-size: clamp(1.6rem, 5vw, var(--t-titulo));
  line-height: 1.15;
}

.hero-bajada {
  margin: 0 0 var(--e4);
  max-width: 60ch;         /* el largo de línea cómodo de leer */
  color: var(--sobre-marca);
}

.boton {
  display: inline-block;
  padding: var(--e2) var(--e4);
  border-radius: 999px;
  background: var(--superficie);
  color: var(--marca-oscura);
  font-size: var(--t-chico);
  font-weight: 700;
  text-decoration: none;
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.boton:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.boton:active { transform: translateY(0); }

.boton:focus-visible {
  outline: 3px solid white;
  outline-offset: 3px;
}`}
        />

        <p>Tres decisiones de este bloque que vale la pena nombrar:</p>
        <ul>
          <li>
            <strong>
              <code>max-width: 60ch</code> en la bajada.
            </strong>{" "}
            La unidad <code>ch</code> es el ancho del carácter &quot;0&quot;, así
            que 60ch son unos 60 caracteres. Entre 45 y 75 es el rango donde el
            ojo vuelve al principio del renglón sin perderse. Un párrafo de 140
            caracteres de ancho es incómodo aunque entre.
          </li>
          <li>
            <strong>
              <code>padding: var(--e2) var(--e4)</code> en el botón.
            </strong>{" "}
            8px arriba y abajo, 24px a los costados. Salió de la escala: no
            probé cuatro valores hasta que quedó lindo.
          </li>
          <li>
            <strong>Tres estados y no uno.</strong> <code>:hover</code> para el
            mouse, <code>:active</code> para el momento del clic,{" "}
            <code>:focus-visible</code> para el teclado. Un botón con un solo
            estado se siente muerto.
          </li>
        </ul>
      </Seccion>

      <Seccion titulo="La grilla de unidades: Grid que se acomoda solo">
        <p>
          Seis tarjetas parejas que tienen que entrar de a tres, de a dos o de a
          una según el lugar. Eso es <Link href="/css/grid">Grid</Link>, y es{" "}
          <strong>una línea</strong>:
        </p>

        <Codigo
          archivo="estilos.css"
          resaltar={[3]}
          codigo={`.unidades {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--e3);
}`}
        />

        <p>
          Traducido: <em>hacé tantas columnas como entren, cada una de 220px
          como mínimo, y si sobra espacio repartilo en partes iguales</em>. No
          hay media query. No hay que decidir cuántas columnas van en cada
          tamaño. El navegador hace la cuenta mejor que vos.
        </p>

        <p>
          El <strong>220px</strong> sí es una decisión y hay que justificarla:
          es el ancho mínimo donde el título de una unidad entra en dos renglones
          y la descripción no se convierte en una columna de palabras sueltas.
          Salió de mirar el contenido, no de una tabla de breakpoints.
        </p>

        <Editor
          alto={420}
          consigna="Subí el 220px a 400px: las tarjetas pasan a una sola columna. Bajalo a 120px y entran las seis en fila. Ese número es todo tu diseño responsive para esta sección."
          html={`<section class="bloque">
  <div class="contenedor">
    <h2>Unidades del programa</h2>
    <p class="bajada">Seis unidades, dos parciales y un trabajo práctico
      integrador que se entrega en la semana 14.</p>

    <div class="unidades">
      <article class="unidad">
        <p class="unidad-numero">Unidad 1</p>
        <h3>Qué hace un sistema operativo</h3>
        <p>Modo núcleo y modo usuario, llamadas al sistema, arranque.</p>
      </article>
      <article class="unidad">
        <p class="unidad-numero">Unidad 2</p>
        <h3>Procesos e hilos</h3>
        <p>Estados, bloque de control y el costo del cambio de contexto.</p>
      </article>
      <article class="unidad">
        <p class="unidad-numero">Unidad 3</p>
        <h3>Planificación de CPU</h3>
        <p>FCFS, SJF, round robin y colas multinivel.</p>
      </article>
      <article class="unidad">
        <p class="unidad-numero">Unidad 4</p>
        <h3>Concurrencia</h3>
        <p>Sección crítica, semáforos, monitores e interbloqueos.</p>
      </article>
    </div>
  </div>
</section>`}
          css={`:root {
  --marca: #1b5e8f;
  --acento: #a8480f;
  --tinta: #16202c;
  --tinta-suave: #56677a;
  --superficie: #ffffff;
  --borde: #d8e2ec;
  --e1: 4px;  --e3: 16px;  --e4: 24px;
  --t-mini: 0.75rem;  --t-chico: 0.875rem;  --t-base: 1rem;  --t-grande: 1.5rem;
  --radio: 10px;
  --ancho: 900px;
}

body { padding: 0; background: #f5f8fb; color: var(--tinta); }

.contenedor {
  max-width: var(--ancho);
  margin-inline: auto;
  padding-inline: var(--e3);
}

.bloque { padding-block: var(--e4); }
.bloque h2 { margin: 0 0 var(--e1); font-size: var(--t-grande); }

.bajada {
  margin: 0 0 var(--e4);
  max-width: 60ch;
  font-size: var(--t-chico);
  color: var(--tinta-suave);
}

/* La línea que resuelve toda la sección. */
.unidades {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--e3);
}

.unidad {
  background: var(--superficie);
  border: 1px solid var(--borde);
  border-top: 3px solid var(--marca);
  border-radius: var(--radio);
  padding: var(--e3);
}

.unidad-numero {
  margin: 0 0 var(--e1);
  font-size: var(--t-mini);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--acento);
}

.unidad h3 { margin: 0 0 var(--e1); font-size: var(--t-base); }

.unidad p { margin: 0; font-size: var(--t-chico); color: var(--tinta-suave); }`}
        />

        <Nota tipo="info" titulo="Por qué article y no div">
          <p>
            Cada unidad es <strong>una pieza que se entiende sola</strong>: si
            la sacaras de la página y la pegaras en otro lado seguiría teniendo
            sentido. Ése es el criterio exacto de{" "}
            <code>&lt;article&gt;</code> que viste en{" "}
            <Link href="/html/semantica">HTML semántico</Link>. El contenedor de
            las seis, en cambio, es un <code>&lt;div&gt;</code> sin remordimiento:
            existe sólo para tener algo a lo que ponerle{" "}
            <code>display: grid</code>.
          </p>
        </Nota>

        <Nota tipo="atencion" titulo="El día que una tarjeta rompa la grilla">
          <p>
            Si una tarjeta tiene adentro una URL larguísima o algo con{" "}
            <code>white-space: nowrap</code>, la columna se va a ensanchar y te
            va a aparecer scroll horizontal. El arreglo es{" "}
            <code>minmax(0, 1fr)</code> en la columna, o directamente{" "}
            <code>overflow-wrap: anywhere</code> en el texto. Está explicado en{" "}
            <Link href="/css/grid">Grid</Link>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El cronograma y la franja del equipo">
        <p>
          Un cronograma es <strong>datos en filas y columnas</strong>, así que
          va en una <code>&lt;table&gt;</code> de verdad, no en divs con Grid.
          La diferencia no es visual: es que en una tabla real cada celda sabe a
          qué encabezado pertenece, y un lector de pantalla puede anunciar
          &quot;Semana 4, Entrega, Guía 2&quot;.
        </p>

        <Editor
          alto={380}
          consigna="Cambiá el min-width de la tabla a 700px: aparece el scroll horizontal DENTRO del marco, y la página sigue quieta. Después sacale overflow-x: auto al marco y mirá cómo se rompe la página entera."
          html={`<section class="bloque">
  <div class="contenedor">
    <h2>Cronograma</h2>
    <p class="bajada">Primer cuatrimestre. Las fechas de parcial se
      confirman en clase la semana anterior.</p>

    <div class="tabla-marco">
      <table>
        <caption>Semanas 1 a 6</caption>
        <thead>
          <tr>
            <th scope="col">Semana</th>
            <th scope="col">Tema</th>
            <th scope="col">Entrega</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Introducción y llamadas al sistema</td><td>—</td></tr>
          <tr><td>2</td><td>Procesos e hilos</td><td>Guía 1</td></tr>
          <tr><td>3</td><td>Planificación de CPU</td><td>—</td></tr>
          <tr><td>4</td><td>Sincronización</td><td>Guía 2</td></tr>
          <tr><td>5</td><td>Interbloqueos</td><td>—</td></tr>
          <tr><td>6</td><td>Repaso y primer parcial</td><td>Parcial 1</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>`}
          css={`:root {
  --marca-clara: #e7f0f7;
  --marca-oscura: #0f3f61;
  --tinta: #16202c;
  --tinta-suave: #56677a;
  --superficie: #ffffff;
  --borde: #d8e2ec;
  --e1: 4px;  --e2: 8px;  --e3: 16px;  --e4: 24px;
  --t-mini: 0.75rem;  --t-chico: 0.875rem;  --t-grande: 1.5rem;
  --radio: 10px;
  --ancho: 900px;
}

body { padding: 0; background: #f5f8fb; color: var(--tinta); }

.contenedor { max-width: var(--ancho); margin-inline: auto; padding-inline: var(--e3); }
.bloque { padding-block: var(--e4); }
.bloque h2 { margin: 0 0 var(--e1); font-size: var(--t-grande); }
.bajada { margin: 0 0 var(--e4); max-width: 60ch; font-size: var(--t-chico); color: var(--tinta-suave); }

/* El marco scrollea; la página no. */
.tabla-marco {
  overflow-x: auto;
  background: var(--superficie);
  border: 1px solid var(--borde);
  border-radius: var(--radio);
}

table {
  width: 100%;
  min-width: 340px;          /* abajo de esto, mejor scrollear */
  border-collapse: collapse; /* sin esto quedan bordes dobles */
  font-size: var(--t-chico);
}

caption {
  text-align: left;
  padding: var(--e2) var(--e3);
  font-size: var(--t-mini);
  color: var(--tinta-suave);
}

th, td {
  text-align: left;
  padding: var(--e2) var(--e3);
  border-bottom: 1px solid var(--borde);
}

thead th {
  background: var(--marca-clara);
  color: var(--marca-oscura);
  white-space: nowrap;
}

tbody tr:last-child td { border-bottom: 0; }`}
        />

        <ul>
          <li>
            <code>scope=&quot;col&quot;</code> en cada <code>&lt;th&gt;</code>{" "}
            dice que ese encabezado manda sobre su columna. Son cuatro
            caracteres y es la diferencia entre una tabla navegable y una grilla
            de texto suelto. Más en <Link href="/html/tablas">Tablas</Link>.
          </li>
          <li>
            El <code>&lt;caption&gt;</code> es el título de la tabla{" "}
            <em>dentro</em> de la tabla. No es un párrafo arriba: se anuncia
            cuando alguien entra a la tabla.
          </li>
          <li>
            <code>overflow-x: auto</code> en el marco es el patrón estándar para
            tablas en pantalla chica: <strong>que scrollee la tabla, no la
            página</strong>. Una página con scroll horizontal se siente rota; una
            tabla con scroll horizontal se entiende.
          </li>
        </ul>

        <h3>La franja del equipo</h3>
        <p>
          Una franja es una sección con el fondo distinto, para cortar el ritmo
          visual y que la página no sea una sábana blanca. El truco:{" "}
          <strong>el fondo lo pone la <code>&lt;section&gt;</code>, no el
          contenedor</strong>, así llega de borde a borde.
        </p>

        <Editor
          alto={360}
          consigna="Movete el fondo: sacale background a .franja y ponéselo a .franja .contenedor. El color deja de llegar a los bordes y se nota por qué van separados. Después achicá el minmax a 140px."
          html={`<section class="bloque franja">
  <div class="contenedor">
    <h2>Equipo docente</h2>
    <p class="bajada">Consultas los martes de 16 a 18 en el box 214.</p>

    <ul class="equipo">
      <li class="docente">
        <span class="avatar" aria-hidden="true">LB</span>
        <div>
          <p class="docente-nombre">Ing. Laura Benítez</p>
          <p class="docente-rol">Profesora titular</p>
        </div>
      </li>
      <li class="docente">
        <span class="avatar" aria-hidden="true">MR</span>
        <div>
          <p class="docente-nombre">Lic. Martín Rearte</p>
          <p class="docente-rol">Jefe de trabajos prácticos</p>
        </div>
      </li>
      <li class="docente">
        <span class="avatar" aria-hidden="true">CS</span>
        <div>
          <p class="docente-nombre">Ing. Carla Sosa</p>
          <p class="docente-rol">Ayudante de primera</p>
        </div>
      </li>
    </ul>
  </div>
</section>`}
          css={`:root {
  --marca: #1b5e8f;
  --marca-clara: #e7f0f7;
  --tinta: #16202c;
  --tinta-suave: #56677a;
  --superficie: #ffffff;
  --e1: 4px;  --e2: 8px;  --e3: 16px;  --e4: 24px;
  --t-mini: 0.75rem;  --t-chico: 0.875rem;  --t-grande: 1.5rem;
  --radio: 10px;
  --ancho: 900px;
}

body { padding: 0; color: var(--tinta); }

.contenedor { max-width: var(--ancho); margin-inline: auto; padding-inline: var(--e3); }
.bloque { padding-block: var(--e4); }
.bloque h2 { margin: 0 0 var(--e1); font-size: var(--t-grande); }
.bajada { margin: 0 0 var(--e4); font-size: var(--t-chico); color: var(--tinta-suave); }

/* El fondo va en la SECCIÓN para que llegue de borde a borde. */
.franja { background: var(--marca-clara); }

.equipo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: var(--e2);
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Cada ficha: dos cosas de distinto tamaño en fila → Flexbox. */
.docente {
  display: flex;
  align-items: center;
  gap: var(--e2);
  background: var(--superficie);
  border-radius: var(--radio);
  padding: var(--e2);
}

.avatar {
  flex-shrink: 0;          /* el círculo nunca se achata */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;     /* centrar en las dos direcciones */
  background: var(--marca);
  color: white;
  font-size: var(--t-chico);
  font-weight: 700;
}

.docente-nombre { margin: 0; font-size: var(--t-chico); font-weight: 600; }
.docente-rol { margin: 0; font-size: var(--t-mini); color: var(--tinta-suave); }`}
        />

        <p>
          Dos decisiones más para justificar. El equipo es una{" "}
          <code>&lt;ul&gt;</code> porque <em>es</em> una lista de personas: el
          lector de pantalla anuncia &quot;lista de 3 elementos&quot; y eso es
          información útil. Y las iniciales son un{" "}
          <code>&lt;span&gt;</code> con <code>aria-hidden</code>, no una{" "}
          <code>&lt;img&gt;</code>: no son una foto, son un adorno que repite el
          nombre que está al lado.
        </p>

        <Nota tipo="atencion" titulo="Cuándo va alt y qué se escribe adentro">
          <p>
            La regla es corta:{" "}
            <strong>
              el atributo <code>alt</code> va SIEMPRE, lo que cambia es si está
              vacío
            </strong>
            .
          </p>
          <ul>
            <li>
              La imagen <strong>aporta información</strong> (un gráfico, una
              foto del laboratorio) → <code>alt</code> con lo que la imagen dice.
              No &quot;foto&quot;, no el nombre del archivo:{" "}
              <code>alt=&quot;Diagrama de estados de un proceso&quot;</code>.
            </li>
            <li>
              La imagen es <strong>decorativa</strong>, o repite un texto que ya
              está al lado —como el escudo de la cabecera, que tiene el nombre
              de la materia pegado— → <code>alt=&quot;&quot;</code> vacío. Así
              el lector de pantalla la saltea en vez de leer basura.
            </li>
            <li>
              Sin atributo <code>alt</code> es el único caso malo: el lector no
              sabe qué hacer y termina leyendo la URL entera.
            </li>
          </ul>
          <p>
            Esto se ve completo en la lección de <em>Accesibilidad</em> de la
            pista de HTML.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El pie, la media query y la página entera">
        <p>
          El footer cierra con lo aburrido y necesario: quién es, cuatro
          enlaces, la fecha de actualización. Reusa todo lo que ya existe —el{" "}
          <code>.contenedor</code>, la escala, los colores— así que no trae
          ninguna idea nueva:
        </p>

        <Codigo
          archivo="estilos.css"
          codigo={`.pie {
  background: var(--marca-oscura);
  color: var(--sobre-marca);
  padding-block: var(--e4);
  font-size: var(--t-chico);
}

.pie-fila {
  display: flex;
  flex-wrap: wrap;                  /* en angosto bajan de renglón */
  justify-content: space-between;
  gap: var(--e2) var(--e4);         /* 8px entre filas, 24px entre columnas */
}

.pie-menu { display: flex; flex-wrap: wrap; gap: var(--e3); }
.pie a { color: #fff; }
.pie-legal { font-size: var(--t-mini); opacity: 0.7; margin-top: var(--e3); }`}
        />

        <h3>La media query: una sola, y sólo agrega</h3>
        <p>
          Fijate lo que pasó: la grilla de unidades, la franja del equipo, el
          pie y el menú <strong>ya se adaptan solos</strong>. Los resolvieron{" "}
          <code>auto-fit</code>, <code>flex-wrap</code> y{" "}
          <code>clamp()</code>. La media query queda para lo único que{" "}
          <em>de verdad</em> cambia de forma: la cabecera, y el aire entre
          secciones.
        </p>

        <Codigo
          archivo="estilos.css"
          resaltar={[1]}
          codigo={`/* Todo lo de arriba es el estilo de CELULAR: es el caso base.
   De 400px para arriba hay lugar, así que AGREGAMOS. */

@media (min-width: 400px) {
  .cabecera-fila {
    display: flex;                  /* deja de estar apilada */
    align-items: center;
    justify-content: space-between;
  }

  .hero   { padding-block: var(--e5); }   /* 24px → 48px */
  .bloque { padding-block: var(--e5); }
}`}
        />

        <p>
          Eso es <Link href="/css/responsive">mobile first</Link> hecho bien:
          adentro de la media query{" "}
          <strong>no hay ni una regla que deshaga algo</strong>. Si mañana
          borrás el bloque entero, la página sigue funcionando: se ve apretada,
          pero entera. Y el salto de espaciado no es un número nuevo, es pasar
          de <code>--e4</code> a <code>--e5</code>: el sistema también decide
          esto.
        </p>

        <h3>La página completa</h3>
        <p>
          Acá está todo junto, andando. Son{" "}
          <strong>unas 150 líneas de CSS</strong> y no hay ninguna librería.
          Llevátela: es una base perfectamente razonable para el próximo trabajo
          práctico.
        </p>

        <Editor
          alto={560}
          consigna="Empezá por el sistema: cambiá --marca a #7a3ba8 y --ancho a 1200px, y mirá cambiar la página entera. Después subí el 400px de la media query a 900px para ver la versión de celular, y probá agregarle una séptima unidad al HTML."
          html={PAGINA_HTML}
          css={PAGINA_CSS}
        />

        <Nota tipo="ok" titulo="Lo que hay que llevarse">
          <p>
            Ninguna pieza de esta página es difícil. Lo difícil —y lo que la
            hace verse terminada— es que <strong>todas usan los mismos cinco
            espacios, los mismos seis tamaños de letra y la misma paleta</strong>
            . Cuando una página tuya &quot;se ve rara y no sabés por qué&quot;,
            el 80% de las veces es esto: veinte números distintos donde tendría
            que haber cinco.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Antes de entregar: la lista de control">
        <p>
          Esto no es un adorno: es literalmente lo que hay que revisar antes de
          subir un trabajo práctico. Lleva diez minutos y evita la mayoría de
          las devoluciones.
        </p>

        <ol>
          <li>
            <strong>HTML semántico.</strong> ¿Hay un <code>&lt;header&gt;</code>
            , un <code>&lt;main&gt;</code>, un <code>&lt;footer&gt;</code>?
            ¿Los <code>&lt;div&gt;</code> que quedan están sólo para envolver
            algo que necesita CSS? ¿Los títulos van <code>h1 → h2 → h3</code>{" "}
            sin saltear niveles, y hay <strong>un solo</strong>{" "}
            <code>&lt;h1&gt;</code>?
          </li>
          <li>
            <strong>Todas las imágenes tienen <code>alt</code>.</strong>{" "}
            Descriptivo si la imagen dice algo, vacío (<code>alt=&quot;&quot;</code>)
            si es decorativa. Nunca ausente.
          </li>
          <li>
            <strong>Contraste suficiente.</strong> Texto normal necesita 4.5:1
            contra su fondo; el texto grande, 3:1. Se mide en dos clics: en las
            devtools, inspeccioná el texto y pasale el mouse al cuadradito de
            color — Chrome y Firefox te muestran el número y si pasa AA. El gris
            clarito sobre blanco es el error de siempre.
          </li>
          <li>
            <strong>El foco se ve.</strong> Apretá <kbd>Tab</kbd> desde el
            principio y recorré la página entera. Tenés que saber{" "}
            <em>en todo momento</em> dónde estás parado, y el orden tiene que
            seguir el orden visual. Si algo se puede clickear pero el Tab no
            llega, está mal.
          </li>
          <li>
            <strong>
              Está el <code>&lt;meta name=&quot;viewport&quot;&gt;</code>.
            </strong>{" "}
            Sin esa línea en el <code>&lt;head&gt;</code> no funciona una sola
            media query en el celular. Y que <strong>no</strong> diga{" "}
            <code>user-scalable=no</code>.
          </li>
          <li>
            <strong>Probala angosta.</strong> Devtools → modo dispositivo
            (Ctrl+Shift+M) → llevala a 320px, que es la pantalla real más chica
            que vas a encontrar. Nada se corta, nada se superpone, todo se lee.
          </li>
          <li>
            <strong>Probala sólo con el teclado.</strong> Soltá el mouse. Tab,
            Shift+Tab, Enter, Espacio. Si podés llegar a todos los enlaces y
            botones y usar la página, aprobaste. Es el test de accesibilidad más
            barato que existe y detecta la mitad de los problemas.
          </li>
          <li>
            <strong>Cero scroll horizontal.</strong> En ningún ancho. Si
            aparece, el culpable casi siempre es uno de estos cuatro: un{" "}
            <code>width</code> en píxeles, una imagen sin{" "}
            <code>max-width: 100%</code>, un <code>100vw</code> (que no cuenta la
            barra de scroll) o una tabla sin su marco con{" "}
            <code>overflow-x: auto</code>.
          </li>
        </ol>

        <Nota tipo="ok" titulo="Cómo cazar al culpable del scroll horizontal">
          <p>
            Pegá esto en la consola del navegador y te dice exactamente qué
            elemento se está yendo del ancho:
          </p>
          <Codigo
            archivo="consola del navegador"
            codigo={`document.querySelectorAll("*").forEach((el) => {
  if (el.getBoundingClientRect().right > document.documentElement.clientWidth) {
    console.log(el);
  }
});`}
          />
          <p>
            La otra versión, más cavernícola pero infalible:{" "}
            <code>* &#123; outline: 1px solid red &#125;</code> en el CSS y
            mirás cuál rectángulo sobresale.
          </p>
        </Nota>

        <p>
          Y una cosa que <em>no</em> está en la lista pero conviene: abrí la
          pestaña <strong>Lighthouse</strong> de las devtools de Chrome y
          corré el informe. Te da un puntaje de accesibilidad, rendimiento y
          buenas prácticas con la lista de qué arreglar. No reemplaza probar con
          el teclado, pero encuentra lo que se te pasó.
        </p>

        <h3>Dos desafíos sobre esta misma página</h3>
        <p>
          Los dos se resuelven en el editor grande de la sección anterior: el
          botón <em>reiniciar</em> te devuelve el original si rompés algo.
        </p>

        <Desafio
          titulo="1. Agregarle una sección de bibliografía"
          pista={
            <div>
              <p>
                El marcado es una <code>&lt;section class=&quot;bloque&quot;
                id=&quot;bibliografia&quot;&gt;</code> con su{" "}
                <code>.contenedor</code> adentro, igual que las otras tres.
                Copiala de la de unidades y cambiale el contenido.
              </p>
              <p>
                Para la lista usá una <code>&lt;ul class=&quot;libros&quot;&gt;</code>{" "}
                —que por tener <code>class</code> ya entra en la regla{" "}
                <code>ul[class]</code> del reset y pierde las viñetas—, con un{" "}
                <code>&lt;li&gt;</code> por libro.
              </p>
              <p>
                La parte importante:{" "}
                <strong>
                  no escribas ni un <code>#</code> ni un <code>px</code> nuevo
                </strong>
                . Todo sale de <code>var(--e2)</code>, <code>var(--e3)</code>,{" "}
                <code>var(--t-chico)</code>, <code>var(--borde)</code>… Si
                necesitás un valor que no existe en el sistema, la pregunta es
                si de verdad lo necesitás.
              </p>
              <p>
                Y acordate de sumar el enlace al <code>.menu</code> de la
                cabecera, apuntando a <code>#bibliografia</code>.
              </p>
            </div>
          }
          solucion={
            <div>
              <p>
                Ocho reglas y ningún valor nuevo. Fijate que el CSS es aburrido{" "}
                <em>a propósito</em>: cuando el sistema está bien armado, agregar
                una sección es rellenar un molde.
              </p>
              <Codigo
                archivo="index.html — dentro del <main>, después del cronograma"
                codigo={`<section class="bloque" id="bibliografia">
  <div class="contenedor">
    <h2>Bibliografía</h2>
    <p class="bajada">Los tres primeros están en la biblioteca central;
      el último es de descarga libre.</p>

    <ul class="libros">
      <li class="libro">
        <p class="libro-titulo">Sistemas operativos modernos</p>
        <p class="libro-dato">Tanenbaum · 4.ª edición · Unidades 1 a 4</p>
      </li>
      <li class="libro">
        <p class="libro-titulo">Fundamentos de sistemas operativos</p>
        <p class="libro-dato">Silberschatz, Galvin y Gagne · Unidades 3 a 6</p>
      </li>
      <li class="libro">
        <p class="libro-titulo">Operating Systems: Three Easy Pieces</p>
        <p class="libro-dato">Arpaci-Dusseau · descarga libre · complementario</p>
      </li>
    </ul>
  </div>
</section>`}
              />
              <Codigo
                archivo="estilos.css — al final, antes de la media query"
                codigo={`.libros {
  display: grid;
  gap: var(--e2);
}

.libro {
  background: var(--superficie);
  border: 1px solid var(--borde);
  border-left: 3px solid var(--acento);
  border-radius: var(--radio);
  padding: var(--e2) var(--e3);
}

.libro-titulo {
  font-size: var(--t-chico);
  font-weight: 600;
}

.libro-dato {
  font-size: var(--t-mini);
  color: var(--tinta-suave);
}`}
              />
              <p className="tenue">
                Y en la cabecera, un enlace más:{" "}
                <code>
                  &lt;a href=&quot;#bibliografia&quot;&gt;Bibliografía&lt;/a&gt;
                </code>
                . Como <code>.menu</code> tiene <code>flex-wrap: wrap</code>, el
                cuarto enlace baja solo de renglón si no entra: no hay que tocar
                nada más.
              </p>
            </div>
          }
        >
          <p>
            Agregale a la página una sección <strong>Bibliografía</strong>, entre
            el cronograma y el equipo, con tres libros. Tiene que cumplir:
          </p>
          <ol>
            <li>
              Marcado semántico: <code>&lt;section&gt;</code> con{" "}
              <code>id</code>, su <code>&lt;h2&gt;</code> y una lista de verdad.
            </li>
            <li>
              <strong>Cero valores nuevos.</strong> Todos los colores, espacios y
              tamaños salen de las variables que ya existen.
            </li>
            <li>
              Se ve como parte de la página, no pegada: mismo{" "}
              <code>.contenedor</code>, mismo <code>.bloque</code>, mismo radio
              de borde.
            </li>
            <li>El enlace nuevo en el menú de la cabecera funciona.</li>
          </ol>
        </Desafio>

        <Desafio
          titulo="2. Que las unidades se apilen de a una en el celular"
          pista={
            <div>
              <p>
                Ojo con el instinto: <em>no</em> agregues una media query.{" "}
                <code>repeat(auto-fit, minmax(220px, 1fr))</code> ya decide solo
                cuántas columnas entran — el problema es que en un teléfono de
                320px de ancho, con los 16px de padding del contenedor, quedan
                288px útiles y entra <strong>una</strong> tarjeta de 220px con
                68px sobrando que se reparten. O sea que ya se apila.
              </p>
              <p>
                Lo que sí puede pasar es lo contrario: que el{" "}
                <code>220px</code> sea tan chico que entren <em>dos</em> tarjetas
                apretadas en un ancho intermedio. Ahí la solución elegante no es
                una media query sino subir el mínimo con{" "}
                <code>min()</code>:{" "}
                <code>minmax(min(100%, 260px), 1fr)</code>.
              </p>
              <p>
                El <code>min(100%, 260px)</code> se lee &quot;260px, salvo que
                no haya 260px, en cuyo caso ocupá todo&quot;. Sin ese{" "}
                <code>min()</code>, un contenedor más angosto que 260px produce
                desborde, porque <code>minmax</code> respeta el mínimo aunque no
                entre.
              </p>
              <p>
                Para la parte del orden mirá <code>grid-column: 1 / -1</code>,
                que ya viste en <Link href="/css/grid">Grid</Link>.
              </p>
            </div>
          }
          solucion={
            <div>
              <p>
                Una línea cambiada y una regla nueva. Sin media queries, y sin
                que la primera tarjeta deje de ser la primera en el HTML —cosa
                que importa para quien navega con teclado—:
              </p>
              <Editor
                alto={420}
                solapas="css"
                consigna="Bajá el 260px a 120px y mirá aparecer tres columnas. Después sacá el min() y dejá minmax(260px, 1fr): en un panel más angosto que 260px la grilla desborda."
                html={`<div class="unidades">
  <article class="unidad destacada">
    <p class="unidad-numero">Unidad 1</p>
    <h3>Qué hace un sistema operativo</h3>
    <p>La destacada: ocupa toda la fila en cualquier ancho.</p>
  </article>
  <article class="unidad">
    <p class="unidad-numero">Unidad 2</p>
    <h3>Procesos e hilos</h3>
    <p>Estados y cambio de contexto.</p>
  </article>
  <article class="unidad">
    <p class="unidad-numero">Unidad 3</p>
    <h3>Planificación de CPU</h3>
    <p>FCFS, SJF y round robin.</p>
  </article>
  <article class="unidad">
    <p class="unidad-numero">Unidad 4</p>
    <h3>Concurrencia</h3>
    <p>Semáforos e interbloqueos.</p>
  </article>
</div>`}
                css={`:root {
  --marca: #1b5e8f;
  --acento: #a8480f;
  --tinta-suave: #56677a;
  --superficie: #ffffff;
  --borde: #d8e2ec;
  --e1: 4px;  --e3: 16px;
  --t-mini: 0.75rem;  --t-chico: 0.875rem;  --t-base: 1rem;
  --radio: 10px;
}

body { background: #f5f8fb; padding: var(--e3); }

/* El min() es todo el truco: nunca pide más ancho del que hay. */
.unidades {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: var(--e3);
}

/* De la primera a la última línea: la fila entera, siempre. */
.destacada {
  grid-column: 1 / -1;
  border-top-color: var(--acento);
  background: #fdf6f1;
}

.unidad {
  background: var(--superficie);
  border: 1px solid var(--borde);
  border-top: 3px solid var(--marca);
  border-radius: var(--radio);
  padding: var(--e3);
}

.unidad-numero {
  margin: 0 0 var(--e1);
  font-size: var(--t-mini);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--acento);
}

.unidad h3 { margin: 0 0 var(--e1); font-size: var(--t-base); }
.unidad p { margin: 0; font-size: var(--t-chico); color: var(--tinta-suave); }`}
              />
              <p className="tenue">
                El <code>1 / -1</code> significa &quot;de la línea 1 hasta la
                última&quot;, y funciona sin saber cuántas columnas hay — que es
                justamente lo que <code>auto-fit</code> no te deja saber.
              </p>
            </div>
          }
        >
          <p>
            Cambiá cómo se comporta la grilla de unidades, con{" "}
            <strong>cero media queries nuevas</strong>:
          </p>
          <ol>
            <li>
              Que una tarjeta &quot;destacada&quot; ocupe{" "}
              <strong>la fila entera</strong> en cualquier ancho, sin saber
              cuántas columnas hay en ese momento.
            </li>
            <li>
              Que el resto nunca quede más angosto que 260px…{" "}
              <strong>salvo</strong> que el contenedor mida menos que eso, en
              cuyo caso tienen que ocupar el 100% sin desbordar.
            </li>
            <li>
              Que el orden del HTML no cambie: la destacada sigue siendo el
              primer <code>&lt;article&gt;</code> del documento.
            </li>
          </ol>
          <p className="tenue">
            Si te trabás con <code>minmax</code> o con las líneas de la grilla,
            está todo en <Link href="/css/grid">Grid</Link>; y si dudás de dónde
            sale el ancho disponible, en{" "}
            <Link href="/css/caja">el modelo de caja</Link>.
          </p>
        </Desafio>

        <Nota tipo="info" titulo="Con esto cierra la pista de CSS">
          <p>
            Tenés el <Link href="/css/caja">modelo de caja</Link>, los{" "}
            <Link href="/css/selectores">selectores</Link>,{" "}
            <Link href="/css/display">display</Link>,{" "}
            <Link href="/css/flexbox">Flexbox</Link>,{" "}
            <Link href="/css/grid">Grid</Link>,{" "}
            <Link href="/css/responsive">responsive y variables</Link>, y ahora
            el método para juntarlos. De acá en adelante la página deja de ser
            un archivo estático: empieza a <em>hacer cosas</em>, y eso es
            JavaScript.
          </p>
        </Nota>
      </Seccion>
    </Leccion>
  );
}
