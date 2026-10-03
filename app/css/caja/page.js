import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "El modelo de caja" };

export default function Pagina() {
  return (
    <Leccion
      slug="/css/caja"
      titulo="El modelo de caja"
      resumen="Todo elemento es una caja. Padding, border, margin, box-sizing y las unidades que conviene usar."
    >
      <Seccion titulo="Todo lo que ves es un rectángulo">
        <p>
          Un título, un párrafo, una foto, un botón, un ícono: para el navegador
          todos son lo mismo, una caja rectangular. Lo único que cambia es qué
          tan grande es, cuánto aire tiene adentro y cuánto tiene afuera. Si
          entendés esas tres cosas, dejás de pelearte con el CSS por acomodar
          elementos.
        </p>

        <p>Cada caja tiene cuatro capas, de adentro hacia afuera:</p>

        <ul>
          <li>
            <strong>content</strong> — el contenido de verdad: el texto, los
            píxeles de la imagen.
          </li>
          <li>
            <strong>padding</strong> — el aire <em>adentro</em> del borde. Se
            pinta con el fondo del elemento.
          </li>
          <li>
            <strong>border</strong> — la línea del borde. Ocupa lugar aunque sea
            transparente.
          </li>
          <li>
            <strong>margin</strong> — el aire <em>afuera</em> del borde.{" "}
            <strong>Nunca</strong> se pinta: ahí se ve lo que haya atrás.
          </li>
        </ul>

        <Vista
          html={`
            <div class="capa margen">margin
              <div class="capa borde">border
                <div class="capa relleno">padding
                  <div class="capa contenido">content</div>
                </div>
              </div>
            </div>
          `}
          css={`
            .capa {
              padding: 26px;
              font: 700 12px system-ui, sans-serif;
              text-align: center;
              letter-spacing: 0.06em;
              text-transform: uppercase;
              color: #3c2b12;
            }
            .margen { background: #f7c99b; }
            .borde { background: #fde68a; }
            .relleno { background: #c3ddb0; }
            .contenido {
              background: #9dc3e6;
              padding: 22px;
              color: #10283d;
            }
          `}
        />

        <p>
          Estos colores no son inventados: son los mismos que usa el inspector
          de Chrome y de Firefox. Abrí las herramientas con <code>F12</code>,
          hacé click en cualquier elemento de esta página y en la pestaña{" "}
          <em>Computed</em> vas a ver este mismo diagrama con los números reales
          de esa caja. Es la forma más rápida de entender por qué algo no está
          donde vos querés.
        </p>

        <p>
          En el editor de abajo el fondo rayado es el del contenedor: se ve
          justo donde está el margen, porque el margen no se pinta.
        </p>

        <Editor
          consigna="Subí el padding a 40px: la caja crece hacia adentro. Subí el margin: crece el hueco rayado de afuera."
          html={`
            <div class="marco">
              <p class="caja">Soy una caja. Todo esto es content.</p>
            </div>
          `}
          css={`
            .marco {
              /* Fondo rayado, solo para que se vea dónde queda el margen. */
              background: repeating-linear-gradient(
                45deg, #eef2f7 0 8px, #dbe3ee 8px 16px
              );
              border: 1px solid #94a3b8;
            }

            .caja {
              margin: 24px;               /* aire de afuera: se ve el rayado */
              border: 6px solid #2f6fb5;  /* el borde ocupa lugar */
              padding: 16px;              /* aire de adentro: se pinta de azul */
              background: #dbeafe;
              font: 600 14px system-ui, sans-serif;
            }
          `}
        />

        <Nota tipo="info" titulo="El atajo de las cuatro direcciones">
          <p>
            <code>padding</code>, <code>margin</code> y <code>border-width</code>{" "}
            aceptan uno, dos, tres o cuatro valores, y el orden es siempre el
            mismo: arriba, derecha, abajo, izquierda (como las agujas del
            reloj).
          </p>
          <Codigo
            archivo="estilos.css"
            codigo={`padding: 10px;              /* los cuatro lados */
padding: 10px 20px;         /* vertical | horizontal */
padding: 10px 20px 5px;     /* arriba | horizontal | abajo */
padding: 10px 20px 5px 0;   /* arriba | derecha | abajo | izquierda */

/* También existen las propiedades sueltas, útiles para pisar un solo lado: */
padding-inline: 20px;       /* izquierda y derecha, en un renglón */
padding-block: 10px;        /* arriba y abajo */`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="box-sizing: el ancho que pedís y el que ocupa">
        <p>
          Este es <strong>el</strong> concepto de la lección. Le ponés{" "}
          <code>width: 200px</code> a una caja, la medís en pantalla y mide 250.
          No es un bug: por defecto, <code>width</code> mide{" "}
          <strong>solamente el content</strong>. El padding y el borde se suman
          después.
        </p>

        <p>
          En las dos columnas de abajo la barra negra mide exactamente 200px y
          está ahí como regla. Las dos cajas dicen <code>width: 200px</code> y
          tienen el mismo padding y el mismo borde. Mirá dónde termina cada una.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="content-box (el valor por defecto)">
            <Codigo
              archivo="estilos.css"
              codigo={`.caja {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid;
}
/* Ocupa 250px:
   200 + 20 + 20 + 5 + 5 */`}
            />
            <Vista
              html={`
                <div class="regla">200 px</div>
                <div class="caja">width: 200px</div>
              `}
              css={`
                .regla {
                  width: 200px;
                  height: 16px;
                  margin-bottom: 8px;
                  background: #0f172a;
                  color: #fff;
                  font: 700 10px system-ui, sans-serif;
                  text-align: center;
                }
                .caja {
                  box-sizing: content-box;
                  width: 200px;
                  padding: 20px;
                  border: 5px solid #b4243a;
                  background: #fdeaed;
                  font: 600 13px system-ui, sans-serif;
                }
              `}
            />
            <p className="tenue">
              Se pasa 50px de la regla. Si tuvieras cuatro de estas cajas en una
              fila de 800px, no entran.
            </p>
          </Columna>

          <Columna tono="bien" titulo="border-box">
            <Codigo
              archivo="estilos.css"
              codigo={`.caja {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid;
}
/* Ocupa 200px:
   al content le quedan 150 */`}
            />
            <Vista
              html={`
                <div class="regla">200 px</div>
                <div class="caja">width: 200px</div>
              `}
              css={`
                .regla {
                  width: 200px;
                  height: 16px;
                  margin-bottom: 8px;
                  background: #0f172a;
                  color: #fff;
                  font: 700 10px system-ui, sans-serif;
                  text-align: center;
                }
                .caja {
                  box-sizing: border-box;
                  width: 200px;
                  padding: 20px;
                  border: 5px solid #0f7a52;
                  background: #e3f6ee;
                  font: 600 13px system-ui, sans-serif;
                }
              `}
            />
            <p className="tenue">
              Termina justo donde dice la regla. El padding y el borde se comen
              el espacio de adentro.
            </p>
          </Columna>
        </Comparacion>

        <p>
          Con <code>border-box</code>, <code>width</code> pasa a significar lo
          que uno intuitivamente espera: <em>cuánto lugar ocupa esta caja</em>.
          Probalo en vivo.
        </p>

        <Editor
          solapas="css"
          consigna="Cambiá content-box por border-box en .a y mirá cómo se acomoda a la regla, sin tocar el width."
          html={`
            <div class="regla">200 px exactos</div>
            <div class="caja a">box-sizing: content-box</div>

            <div class="regla">200 px exactos</div>
            <div class="caja b">box-sizing: border-box</div>
          `}
          css={`
            .regla {
              width: 200px;
              height: 16px;
              margin-bottom: 6px;
              background: #0f172a;
              color: #fff;
              font: 700 10px system-ui, sans-serif;
              text-align: center;
            }

            .caja {
              width: 200px;
              padding: 20px;
              border: 5px solid #334155;
              background: #dbeafe;
              margin-bottom: 22px;
              font: 600 12px system-ui, sans-serif;
            }

            .a { box-sizing: content-box; }
            .b { box-sizing: border-box; }
          `}
        />

        <p>
          Como <code>content-box</code> es incómodo prácticamente siempre, hoy
          todo proyecto arranca con este reset en la primera línea de la hoja de
          estilos:
        </p>

        <Codigo
          archivo="globals.css"
          resaltar={[4, 5, 6, 7]}
          codigo={`/* El reset universal. Va antes que cualquier otra regla. */
*,
*::before,
*::after {
  box-sizing: border-box;
}`}
        />

        <p>
          El <code>*</code> alcanza a todos los elementos, y{" "}
          <code>::before</code> / <code>::after</code> son los pseudoelementos,
          que el <code>*</code> solo no toca. Este mismo sitio lo tiene puesto:
          está en <code>app/globals.css</code>. Si te interesa por qué esa regla
          con especificidad cero igual funciona, eso lo cuenta{" "}
          <Link href="/css/selectores">Selectores, cascada y especificidad</Link>.
        </p>

        <Nota tipo="atencion" titulo="border-box NO incluye el margin">
          <p>
            El nombre engaña: <code>border-box</code> llega hasta el borde y ahí
            termina. El margen siempre queda afuera. Por eso{" "}
            <code>width: 100%</code> más <code>margin: 0 10px</code> sigue
            desbordando: son 100% del padre <em>más</em> 20px.
          </p>
          <p>
            La solución casi nunca es calcular: un <code>&lt;div&gt;</code> ya
            ocupa todo el ancho disponible sin que le pongas nada. Borrá el{" "}
            <code>width: 100%</code> y listo.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Los iframes de esta lección">
          <p>
            Los ejemplos de esta página corren adentro de un iframe que{" "}
            <em>ya tiene</em> el reset a <code>border-box</code>. Por eso en los
            ejemplos de arriba escribimos <code>box-sizing</code> a mano: si no,
            las dos cajas se verían iguales.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Ancho, alto y los límites">
        <p>
          <code>width</code> y <code>height</code> fijan una medida. Los{" "}
          <code>min-</code> y <code>max-</code> fijan un rango, y en pantallas
          que cambian de tamaño casi siempre querés el rango, no la medida.
        </p>

        <ul>
          <li>
            <code>max-width: 720px</code> — “crecé todo lo que puedas, pero no
            más de 720”. Es el patrón de toda columna de texto.
          </li>
          <li>
            <code>min-width: 0</code> — el antídoto para los hijos de flex y
            grid que se niegan a achicarse (su ancho mínimo por defecto es{" "}
            <code>auto</code>, o sea el tamaño de su contenido).
          </li>
          <li>
            <code>min-height: 100dvh</code> — “ocupá al menos toda la pantalla,
            pero si el contenido es más largo, seguí creciendo”. Casi siempre es
            lo que querías cuando escribiste <code>height: 100vh</code>.
          </li>
          <li>
            <code>max-height</code> + <code>overflow: auto</code> — una lista que
            no puede crecer infinito y a partir de cierto punto scrollea.
          </li>
        </ul>

        <p>
          Y ahora la regla que te va a ahorrar más tiempo que ninguna otra de
          esta lección: <strong>las imágenes no se achican solas</strong>. Una
          foto de 600px adentro de una columna de 300px sobresale y arrastra una
          barra de scroll horizontal a toda la página.
        </p>

        <Editor
          solapas="css"
          consigna="Descomentá las dos líneas de img y mirá cómo desaparece el desborde."
          html={`
            <p class="pie">Un párrafo se acomoda solo al ancho que haya.</p>
            <img
              alt="Rectángulo azul de 600 px de ancho"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='180'%3E%3Crect width='600' height='180' fill='%235183c9'/%3E%3C/svg%3E">
            <p class="pie">Esta imagen mide 600 px de ancho de verdad.</p>
          `}
          css={`
            body {
              border: 2px dashed #b4243a;   /* el ancho real disponible */
            }

            img {
              /* max-width: 100%; */
              /* height: auto;    */
            }

            .pie {
              font: 600 13px system-ui, sans-serif;
              margin: 8px 0;
            }
          `}
        />

        <Comparacion>
          <Columna tono="mal" titulo="Cada imagen por su cuenta">
            <Codigo
              archivo="estilos.css"
              codigo={`.foto-del-hero { max-width: 100%; }
.avatar { max-width: 100%; }
/* …y la que te olvidás rompe
   el layout en el celular. */`}
            />
          </Columna>
          <Columna tono="bien" titulo="Una sola regla para todas">
            <Codigo
              archivo="globals.css"
              codigo={`img,
video,
svg,
canvas {
  max-width: 100%;
  height: auto;   /* mantiene la proporción */
  display: block; /* saca el hueco de abajo */
}`}
            />
          </Columna>
        </Comparacion>

        <Nota tipo="atencion" titulo="Por qué va también height: auto">
          <p>
            Si el HTML trae <code>width="600" height="180"</code> (y{" "}
            <strong>conviene</strong> que los traiga, así el navegador reserva el
            lugar y la página no salta mientras carga), al achicar el ancho con{" "}
            <code>max-width</code> el alto quedaría clavado en 180 y la imagen se
            deformaría. <code>height: auto</code> lo recalcula solo. De los
            atributos de <code>&lt;img&gt;</code> habla{" "}
            <Link href="/html/texto">Texto, enlaces e imágenes</Link>.
          </p>
        </Nota>

        <Nota tipo="info" titulo="aspect-ratio, el reemplazo del truco viejo">
          <p>
            Durante años, para que un video de YouTube mantuviera la proporción
            16:9 se usaba <code>padding-top: 56.25%</code> (porque los
            porcentajes de padding se calculan sobre el <em>ancho</em>, incluso
            los verticales). Hoy eso se escribe en una línea:
          </p>
          <Codigo
            archivo="estilos.css"
            codigo={`.video {
  width: 100%;
  aspect-ratio: 16 / 9;   /* el alto sale del ancho, solo */
}

.avatar {
  width: 48px;
  aspect-ratio: 1;        /* un cuadrado perfecto */
}`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="Márgenes que colapsan">
        <p>
          Esta es la parte que sorprende a todo el mundo, incluso a gente que
          hace años que escribe CSS. Cuando dos márgenes verticales se tocan,{" "}
          <strong>no se suman: se quedan con el más grande</strong>. En el
          ejemplo de abajo A tiene 40px abajo y B tiene 20px arriba. El hueco
          amarillo no mide 60.
        </p>

        <Editor
          solapas="css"
          consigna="El hueco mide 40, no 60. Bajá el margin-bottom de A a 10px: ahora mide 20, el de B. Siempre gana el mayor."
          html={`
            <div class="marco">
              <p class="a">A — margin-bottom: 40px</p>
              <p class="b">B — margin-top: 20px</p>
            </div>
          `}
          css={`
            .marco {
              border: 2px dashed #94a3b8;
              background: #fef3c7;   /* el amarillo ES el hueco */
            }

            .a, .b {
              margin: 0;
              background: #dbeafe;
              border: 1px solid #5183c9;
              padding: 8px;
              font: 600 13px system-ui, sans-serif;
            }

            .a { margin-bottom: 40px; }
            .b { margin-top: 20px; }
          `}
        />

        <p>
          El colapso existe a propósito: hace que una sucesión de párrafos y
          títulos quede con separaciones parejas sin que tengas que pensar. El
          problema es que solo pasa <strong>a veces</strong>, y las excepciones
          son las que te vuelven loco.
        </p>

        <p>
          La excepción más importante: dentro de un contenedor{" "}
          <code>flex</code> o <code>grid</code> los márgenes{" "}
          <strong>nunca</strong> colapsan. El mismo HTML de recién, con una sola
          línea más:
        </p>

        <Editor
          solapas="css"
          consigna="Acá el hueco sí mide 60. Comentá la línea display: flex y volvés a los 40 de antes."
          html={`
            <div class="marco">
              <p class="a">A — margin-bottom: 40px</p>
              <p class="b">B — margin-top: 20px</p>
            </div>
          `}
          css={`
            .marco {
              display: flex;           /* ← la única diferencia */
              flex-direction: column;
              border: 2px dashed #94a3b8;
              background: #fef3c7;
            }

            .a, .b {
              margin: 0;
              background: #dbeafe;
              border: 1px solid #5183c9;
              padding: 8px;
              font: 600 13px system-ui, sans-serif;
            }

            .a { margin-bottom: 40px; }
            .b { margin-top: 20px; }
          `}
        />

        <p>
          Esa es una de las razones por las que hoy casi todo layout se arma con{" "}
          <Link href="/css/flexbox">Flexbox</Link> o con{" "}
          <Link href="/css/grid">Grid</Link> y con <code>gap</code> en vez de
          márgenes: <code>gap</code> no colapsa nunca y el espacio entre
          elementos es exactamente el que escribiste.
        </p>

        <p>Resumido, dos márgenes verticales colapsan cuando:</p>

        <ul>
          <li>
            Son <strong>hermanos</strong> pegados: el de abajo de uno con el de
            arriba del siguiente.
          </li>
          <li>
            Son <strong>padre e hijo</strong>: el margen de arriba del primer
            hijo se escapa del padre si entre los dos no hay nada.
          </li>
          <li>
            Es un <strong>elemento vacío</strong>: su propio margen de arriba
            colapsa con el de abajo.
          </li>
        </ul>

        <p>
          Y <strong>no</strong> colapsan si hay un <code>padding</code> o un{" "}
          <code>border</code> en el medio, si el contenedor es{" "}
          <code>flex</code>, <code>grid</code> o <code>flow-root</code>, si el
          elemento tiene <code>position: absolute</code> o <code>float</code>, o
          si el contenedor tiene <code>overflow</code> distinto de{" "}
          <code>visible</code>. Los márgenes horizontales{" "}
          <strong>nunca</strong> colapsan.
        </p>

        <Nota tipo="atencion" titulo="El caso que te va a pasar de verdad">
          <p>
            Le ponés <code>margin-top: 40px</code> al primer hijo y{" "}
            <strong>se mueve el padre</strong>, no el hijo: el margen se escapó
            hacia afuera. Es el colapso padre-hijo.
          </p>
          <Codigo
            archivo="estilos.css"
            codigo={`/* ✗ El fondo de .tarjeta arranca 40px más abajo y el título
   queda pegado al borde de arriba. */
.tarjeta { background: white; }
.tarjeta h2 { margin-top: 40px; }

/* ✓ Tres formas de frenarlo, de mejor a peor: */
.tarjeta { padding: 40px 0 0; }   /* 1. usá padding en el padre */
.tarjeta { display: flow-root; }  /* 2. contexto de formato propio */
.tarjeta { overflow: hidden; }    /* 3. funciona, pero recorta */`}
          />
          <p>
            <code>display: flow-root</code> existe justo para esto: crea un
            contexto de formato nuevo (nada entra ni sale) sin cambiar nada de
            cómo se ven los hijos.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="margin: auto, o centrar sin dolor">
        <p>
          <code>auto</code> en un margen horizontal significa “repartí todo el
          espacio que sobre”. Si lo ponés de los dos lados, el sobrante se parte
          al medio y la caja queda centrada. Hay una condición:{" "}
          <strong>la caja tiene que tener un ancho</strong> menor al del padre.
          Un <code>&lt;div&gt;</code> sin <code>width</code> ya ocupa todo, así
          que no sobra nada para repartir y no pasa nada.
        </p>

        <p>
          Con los márgenes verticales no funciona igual: en el flujo normal un{" "}
          <code>margin-top: auto</code> vale 0. Por eso <code>margin: auto</code>{" "}
          centra a lo ancho pero deja la caja arriba de todo.
        </p>

        <Editor
          solapas="css"
          consigna="Agregale display: flex al .contenedor: ahora el auto vertical SÍ centra, y la caja queda en el medio."
          html={`
            <div class="contenedor">
              <div class="caja">margin: auto</div>
            </div>
          `}
          css={`
            .contenedor {
              /* display: flex; */
              height: 170px;
              border: 2px dashed #94a3b8;
              background: #f8fafc;
            }

            .caja {
              width: 220px;
              margin: auto;         /* horizontal sí, vertical no… por ahora */
              padding: 12px;
              background: #dbeafe;
              border: 1px solid #5183c9;
              text-align: center;
              font: 600 13px system-ui, sans-serif;
            }
          `}
        />

        <p>
          Adentro de flex y de grid, <code>auto</code> sí funciona en las cuatro
          direcciones, y es el truco más limpio para empujar un elemento al
          costado de una barra:
        </p>

        <Codigo
          archivo="estilos.css"
          codigo={`/* El logo a la izquierda y el resto de los botones a la derecha,
   sin un solo margen fijo ni un div de relleno. */
.barra { display: flex; align-items: center; }
.barra .logo { margin-right: auto; }`}
        />

        <Nota tipo="atencion" titulo="text-align: center no centra la caja">
          <p>
            <code>text-align: center</code> centra el <em>contenido de adentro</em>{" "}
            de la caja. <code>margin: 0 auto</code> centra{" "}
            <em>la caja adentro de su padre</em>. Son cosas distintas y se usan
            juntas todo el tiempo.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="overflow: qué pasa cuando no entra">
        <p>
          Si le fijás un alto a una caja y el contenido es más largo, por defecto{" "}
          <strong>se sale y se sigue viendo</strong>: eso es{" "}
          <code>overflow: visible</code>. Los otros valores deciden qué hacer con
          lo que sobra.
        </p>

        <Editor
          solapas="css"
          consigna="Probá hidden, después auto y después scroll. Mirá que scroll deja la barra puesta aunque el texto entre."
          html={`
            <div class="caja">
              <p>Este texto es más largo que la caja que lo contiene, así que
              algo tiene que pasar con la parte que sobra. Cambiá el valor de
              overflow acá al lado y mirá la diferencia entre cada uno.</p>
            </div>
            <p class="pie">Esto va abajo de la caja.</p>
          `}
          css={`
            .caja {
              overflow: visible;   /* ← probá: hidden | scroll | auto | clip */

              width: 260px;
              height: 110px;
              padding: 10px;
              border: 2px solid #5183c9;
              background: #eef3fa;
              font: 400 13px system-ui, sans-serif;
            }

            .caja p { margin: 0; }

            .pie {
              font: 600 13px system-ui, sans-serif;
              color: #b4243a;
            }
          `}
        />

        <ul>
          <li>
            <code>visible</code> — el default. Se desborda y se ve. Ojo: se puede
            montar arriba de lo que venga después.
          </li>
          <li>
            <code>hidden</code> — se recorta y no hay forma de ver el resto{" "}
            <em>con el mouse</em>, pero sigue siendo scrolleable desde el código
            y desde el teclado.
          </li>
          <li>
            <code>scroll</code> — barra siempre presente, entre o no entre. Útil
            para que el layout no salte.
          </li>
          <li>
            <code>auto</code> — barra solo si hace falta. Es el que querés el 90%
            de las veces.
          </li>
          <li>
            <code>clip</code> — recorta como <code>hidden</code> pero prohíbe
            todo scroll, incluso el programático. Más barato y sin efectos raros.
          </li>
        </ul>

        <Nota tipo="atencion" titulo="Dos efectos colaterales de hidden y auto">
          <p>
            Cualquier valor distinto de <code>visible</code> crea un contexto de
            formato nuevo: los márgenes dejan de colapsar hacia afuera (por eso
            aparece como “solución” al caso de arriba) y un{" "}
            <code>position: sticky</code> adentro de esa caja{" "}
            <strong>deja de pegarse</strong>. Si tu header sticky no funciona,
            buscá un <code>overflow: hidden</code> en algún ancestro.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Los ejes por separado">
          <p>
            <code>overflow-x</code> y <code>overflow-y</code> controlan un eje
            cada uno. Y para texto que no entra en una línea existe{" "}
            <code>text-overflow: ellipsis</code>, que necesita además{" "}
            <code>white-space: nowrap</code> y un <code>overflow: hidden</code>{" "}
            para funcionar:
          </p>
          <Codigo
            archivo="estilos.css"
            codigo={`.titulo-de-una-linea {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;   /* corta con "…" */
}`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="Las unidades, y cuándo usar cada una">
        <p>
          Elegir mal la unidad es lo que hace que una página se vea bien en tu
          monitor y rota en el celular. Estas son las que vas a usar de verdad.
        </p>

        <h3>px — la medida absoluta</h3>
        <p>
          Un píxel de CSS. Es la única que no depende de nada, y por eso sirve
          para lo que tiene que ser exactamente igual siempre: bordes, radios,
          sombras, líneas finas. Para <strong>tamaños de texto</strong> conviene
          evitarla: si alguien agranda la letra por defecto del navegador porque
          no ve bien, los <code>px</code> lo ignoran.
        </p>

        <h3>rem y em — las relativas al texto</h3>
        <p>
          <code>1rem</code> es el tamaño de letra del elemento{" "}
          <code>&lt;html&gt;</code> (16px salvo que el usuario lo haya cambiado).{" "}
          <code>1em</code> es el tamaño de letra <strong>del elemento actual</strong>,
          y esa diferencia se nota cuando anidás.
        </p>

        <Editor
          solapas="css"
          consigna="Los em se multiplican entre sí en cada nivel; los rem siempre miden lo mismo. Cambiá 1.3 por 1.6 y mirá cómo se dispara la columna roja."
          html={`
            <div class="em">em — nivel 1
              <div class="em">em — nivel 2
                <div class="em">em — nivel 3</div>
              </div>
            </div>

            <div class="rem">rem — nivel 1
              <div class="rem">rem — nivel 2
                <div class="rem">rem — nivel 3</div>
              </div>
            </div>
          `}
          css={`
            html { font-size: 16px; }

            .em {
              font-size: 1.3em;    /* 1.3 veces el de SU PADRE */
              border-left: 3px solid #b4243a;
              padding-left: 10px;
              margin-top: 6px;
            }

            .rem {
              font-size: 1.3rem;   /* 1.3 veces el del <html>, siempre */
              border-left: 3px solid #0f7a52;
              padding-left: 10px;
              margin-top: 6px;
            }
          `}
        />

        <p>
          Regla práctica: <strong>rem</strong> para tamaños de texto y para
          espaciados generales (si el usuario agranda la letra, el aire crece
          con ella). <strong>em</strong> cuando querés que algo escale{" "}
          <em>con el texto de ese componente en particular</em>: el padding de un
          botón en <code>em</code> hace que un botón chico y uno grande se vean
          proporcionados con una sola regla.
        </p>

        <h3>% — relativo al padre, pero ojo a cuál medida</h3>
        <p>
          Un <code>width: 50%</code> es la mitad del ancho de contenido del
          padre. Lo que sorprende es el resto:
        </p>
        <ul>
          <li>
            <code>padding</code> y <code>margin</code> en porcentaje se calculan
            sobre el <strong>ancho</strong> del padre,{" "}
            <em>incluso los verticales</em>. Por eso funcionaba el truco del
            16:9.
          </li>
          <li>
            <code>height: 100%</code> solo funciona si el padre tiene una altura
            definida. Si no, el navegador no tiene contra qué calcular y lo
            ignora.
          </li>
          <li>
            <code>font-size: 120%</code> es lo mismo que <code>1.2em</code>.
          </li>
        </ul>

        <h3>vw, vh y dvh — relativas a la pantalla</h3>
        <p>
          <code>1vw</code> es el 1% del ancho del viewport y <code>1vh</code> el
          1% del alto. Sirven para secciones a pantalla completa. Tienen dos
          trampas conocidas:
        </p>
        <ul>
          <li>
            <code>100vw</code> incluye el ancho de la barra de scroll vertical.
            En una página larga en escritorio, un elemento con{" "}
            <code>width: 100vw</code> es unos 15px más ancho que la ventana y
            aparece una barra horizontal de la nada. Usá <code>100%</code>.
          </li>
          <li>
            <code>100vh</code> en el celular mide la pantalla{" "}
            <strong>sin</strong> la barra del navegador, que aparece y desaparece
            al scrollear. Resultado: el botón que pusiste abajo de todo queda
            tapado.
          </li>
        </ul>
        <p>
          Para eso existen las unidades dinámicas, y hoy tienen soporte en todos
          los navegadores:
        </p>
        <Codigo
          archivo="estilos.css"
          codigo={`/* svh = small: la pantalla CON la barra del navegador visible.
   lvh = large: la pantalla SIN la barra.
   dvh = dynamic: la que haya en este momento, y cambia sola. */

.pantalla-completa {
  min-height: 100dvh;   /* ✓ nunca queda nada tapado */
}

.hero {
  height: 100vh;        /* ✗ en el celular te come ~60px abajo */
}`}
        />
        <p>
          Fijate además que va <code>min-height</code> y no{" "}
          <code>height</code>: si el contenido resulta más largo que la pantalla,
          con <code>height</code> se desborda y con <code>min-height</code> la
          sección simplemente crece.
        </p>

        <h3>ch — el ancho de un caracter</h3>
        <p>
          <code>1ch</code> es el ancho del carácter <code>0</code> en la
          tipografía actual. Sirve para una sola cosa, pero importante: limitar
          el largo de la línea de texto. Entre 45 y 75 caracteres es el rango en
          el que el ojo no se pierde al saltar de renglón.
        </p>

        <Vista
          html={`
            <p class="ancho">Sin límite de ancho, la línea se estira todo lo que
            dé la pantalla y en un monitor grande el ojo se pierde al volver al
            principio del renglón siguiente, que es exactamente lo que estás
            sintiendo ahora mismo mientras leés esta oración larguísima.</p>

            <p class="ancho limitado">Con max-width de 60ch la medida de línea
            se queda cómoda, sin importar el tamaño de la pantalla, porque la
            unidad está atada a la tipografía y no a la ventana.</p>
          `}
          css={`
            .ancho {
              font: 400 14px/1.6 system-ui, sans-serif;
              background: #fdeaed;
              padding: 8px;
            }
            .limitado {
              max-width: 60ch;
              background: #e3f6ee;
            }
          `}
        />

        <h3>fr — solo adentro de grid</h3>
        <p>
          <code>fr</code> es una fracción del espacio sobrante y{" "}
          <strong>no es una longitud</strong>: solo vale en{" "}
          <code>grid-template-columns</code> y <code>grid-template-rows</code>.{" "}
          <code>1fr 2fr</code> reparte el sobrante en tres partes, una para la
          primera columna y dos para la segunda. Lo ves en detalle en{" "}
          <Link href="/css/grid">Grid</Link>.
        </p>

        <Nota tipo="info" titulo="calc, min, max y clamp">
          <p>
            Las unidades se mezclan con <code>calc()</code>, y hay tres funciones
            que reemplazan un montón de media queries. De ellas habla{" "}
            <Link href="/css/responsive">Responsive y variables</Link>, pero
            quedate con esta:
          </p>
          <Codigo
            archivo="estilos.css"
            codigo={`/* Mínimo 1.1rem, ideal el 4% del ancho, máximo 2rem.
   El título crece con la pantalla sin un solo breakpoint. */
h1 { font-size: clamp(1.1rem, 4vw, 2rem); }

/* "El ancho que haya, pero nunca más de 720px" en una línea. */
.contenido { width: min(100%, 720px); }`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. La tarjeta de medidas exactas"
          pista={
            <div>
              <p>
                Con el reset de <code>border-box</code> puesto (el iframe ya lo
                tiene), <code>width</code> es el ancho total: el padding y el
                borde se descuentan de adentro. Así que el <code>width</code> es
                literalmente el número que te piden.
              </p>
              <p>
                Para el centrado necesitás repartir el sobrante a los dos lados,
                y para el aire de abajo acordate de que un margen vertical solo
                mide lo que mide si nada lo colapsa.
              </p>
            </div>
          }
          solucion={
            <div>
              <p>
                Con <code>border-box</code> no hay ninguna cuenta que hacer:{" "}
                <code>width: 300px</code> y listo. El content interno queda en{" "}
                <code>300 − 24 − 24 − 3 − 3 = 246px</code>, pero eso lo calcula
                el navegador, no vos.
              </p>
              <Editor
                solapas="css"
                html={`
                  <div class="regla">300 px exactos</div>
                  <div class="tarjeta">
                    <h3>Tarjeta</h3>
                    <p>Tiene que medir 300 px de punta a punta.</p>
                  </div>
                `}
                css={`
                  .regla {
                    width: 300px;
                    height: 16px;
                    margin: 0 auto 10px;
                    background: #0f172a;
                    color: #fff;
                    font: 700 10px system-ui, sans-serif;
                    text-align: center;
                  }

                  .tarjeta {
                    box-sizing: border-box;   /* la clave de todo */
                    width: 300px;             /* ancho TOTAL, sin cuentas */
                    margin: 0 auto;           /* centrada */
                    padding: 24px;
                    border: 3px solid #2f6fb5;
                    border-radius: 10px;
                    background: #eef3fa;
                    font: 400 13px system-ui, sans-serif;
                  }

                  .tarjeta h3 { margin: 0 0 6px; font-size: 15px; }
                  .tarjeta p  { margin: 0; }
                `}
              />
              <p>
                Si el reset <em>no</em> estuviera (o sea, con{" "}
                <code>content-box</code>), el mismo resultado se consigue con{" "}
                <code>width: 246px</code>. Y cada vez que cambiaras el padding o
                el borde tendrías que volver a hacer la cuenta. Por eso el reset
                está en todos los proyectos.
              </p>
              <Nota tipo="atencion" titulo="El detalle del h3">
                <p>
                  El <code>margin: 0</code> del <code>&lt;h3&gt;</code> no es
                  decorativo: los títulos traen margen de arriba por defecto y,
                  como el <code>.tarjeta</code> tiene padding, ese margen{" "}
                  <em>no</em> colapsa hacia afuera pero sí suma aire adentro y te
                  descuadra el diseño.
                </p>
              </Nota>
            </div>
          }
        >
          <p>
            La barra negra mide 300px. Ajustá <code>.tarjeta</code> para que:
          </p>
          <ul>
            <li>
              ocupe <strong>exactamente 300px</strong> de ancho total, borde
              incluido;
            </li>
            <li>
              tenga <strong>24px</strong> de aire adentro y un borde de{" "}
              <strong>3px</strong>;
            </li>
            <li>quede centrada horizontalmente.</li>
          </ul>
          <p>
            No vale cambiar el padding ni el borde para que “cierre la cuenta”.
          </p>
          <Editor
            solapas="css"
            consigna="Que la tarjeta termine justo donde termina la barra negra, sin tocar el padding ni el borde."
            html={`
              <div class="regla">300 px exactos</div>
              <div class="tarjeta">
                <h3>Tarjeta</h3>
                <p>Tiene que medir 300 px de punta a punta.</p>
              </div>
            `}
            css={`
              .regla {
                width: 300px;
                height: 16px;
                margin: 0 auto 10px;
                background: #0f172a;
                color: #fff;
                font: 700 10px system-ui, sans-serif;
                text-align: center;
              }

              .tarjeta {
                box-sizing: content-box;   /* ← tocá acá */
                width: 300px;              /* ← y acá si hace falta */
                padding: 24px;
                border: 3px solid #2f6fb5;
                border-radius: 10px;
                background: #eef3fa;
                font: 400 13px system-ui, sans-serif;
              }

              .tarjeta h3 { margin: 0 0 6px; font-size: 15px; }
              .tarjeta p  { margin: 0; }
            `}
          />
        </Desafio>

        <Desafio
          titulo="2. La barra horizontal fantasma"
          pista={
            <p>
              Son <strong>dos</strong> problemas distintos, no uno. Achicá el
              panel del resultado hasta que aparezca la barra de abajo y fijate
              qué es lo primero que se sale: ¿la caja azul o la imagen? Después
              arreglá el otro. Para el ancho de un bloque, acordate de que un{" "}
              <code>&lt;div&gt;</code> ya ocupa todo sin que le pidas nada.
            </p>
          }
          solucion={
            <div>
              <p>Los dos culpables clásicos:</p>
              <ol>
                <li>
                  <code>width: 100%</code> más <code>padding: 20px</code> con{" "}
                  <code>content-box</code>: la caja ocupa el 100% del padre{" "}
                  <em>más</em> 40px. Se arregla con <code>border-box</code>, o
                  mejor todavía borrando el <code>width: 100%</code>, que no
                  hacía falta.
                </li>
                <li>
                  La imagen de 600px sin <code>max-width</code>: se sale sola
                  apenas la ventana es más angosta que la foto.
                </li>
              </ol>
              <Editor
                solapas="css"
                html={`
                  <div class="panel">
                    <p>Ahora nada se sale del borde punteado.</p>
                    <img
                      alt="Rectángulo verde de 600 px de ancho"
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='120'%3E%3Crect width='600' height='120' fill='%230f7a52'/%3E%3C/svg%3E">
                  </div>
                `}
                css={`
                  body { border: 2px dashed #b4243a; }

                  .panel {
                    /* Sin width: un div de bloque ya ocupa todo el ancho. */
                    box-sizing: border-box;
                    padding: 20px;
                    background: #dbeafe;
                    font: 400 13px system-ui, sans-serif;
                  }

                  img {
                    max-width: 100%;   /* nunca más ancha que su contenedor */
                    height: auto;      /* y sin deformarse */
                    display: block;
                  }
                `}
              />
              <p>
                En una página real esto mismo se previene con tres líneas en el{" "}
                <code>globals.css</code>: el reset de <code>box-sizing</code>, el{" "}
                <code>max-width: 100%</code> para medios, y listo. El 90% de los
                desbordes horizontales son uno de estos dos.
              </p>
            </div>
          }
        >
          <p>
            Este ejemplo tiene una barra de scroll horizontal que no debería
            existir: algo se sale del borde rojo punteado, que marca el ancho
            disponible. Encontrá <strong>las dos</strong> causas y arreglalas sin
            usar <code>overflow-x: hidden</code> (eso tapa el problema, no lo
            resuelve).
          </p>
          <Editor
            solapas="css"
            consigna="Que nada se salga del borde rojo. Sin overflow-x: hidden."
            html={`
              <div class="panel">
                <p>Algo acá adentro se sale del borde rojo.</p>
                <img
                  alt="Rectángulo verde de 600 px de ancho"
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='120'%3E%3Crect width='600' height='120' fill='%230f7a52'/%3E%3C/svg%3E">
              </div>
            `}
            css={`
              body { border: 2px dashed #b4243a; }

              .panel {
                box-sizing: content-box;
                width: 100%;
                padding: 20px;
                background: #dbeafe;
                font: 400 13px system-ui, sans-serif;
              }

              img {
                display: block;
              }
            `}
          />
        </Desafio>

        <Desafio
          titulo="3. El margen que mueve al padre"
          pista={
            <p>
              Mirá dónde arranca el fondo blanco de la tarjeta y dónde arranca el
              fondo gris de la página. El margen del <code>&lt;h3&gt;</code>{" "}
              quedó <em>afuera</em> de la tarjeta. ¿Qué hay entre el borde de
              arriba de <code>.tarjeta</code> y su primer hijo? Nada. Ese es el
              problema.
            </p>
          }
          solucion={
            <div>
              <p>
                Es el colapso padre-hijo: como <code>.tarjeta</code> no tiene ni
                padding ni borde arriba, el <code>margin-top: 32px</code> del{" "}
                <code>&lt;h3&gt;</code> se escapa y termina empujando a la
                tarjeta entera. El título queda pegado al techo y el hueco
                aparece del lado equivocado.
              </p>
              <Codigo
                archivo="estilos.css"
                resaltar={[3, 9]}
                codigo={`/* Opción A — la que vas a usar el 99% de las veces:
   el aire de adentro de una tarjeta es padding, no margin. */
.tarjeta { padding: 32px 20px; }
.tarjeta h3 { margin-top: 0; }

/* Opción B — si por lo que sea necesitás mantener el margin
   del hijo, frenás el colapso con un contexto nuevo. */
.tarjeta { display: flow-root; }`}
              />
              <Editor
                solapas="css"
                html={`
                  <div class="tarjeta">
                    <h3>Ahora sí</h3>
                    <p>El aire de arriba está adentro de la tarjeta.</p>
                  </div>
                `}
                css={`
                  body { background: #cbd5e1; }

                  .tarjeta {
                    padding: 32px 20px;   /* el aire va acá */
                    background: #fff;
                    border-radius: 10px;
                    font: 400 13px system-ui, sans-serif;
                  }

                  .tarjeta h3 { margin-top: 0; }
                  .tarjeta p  { margin-bottom: 0; }
                `}
              />
            </div>
          }
        >
          <p>
            Acá el <code>&lt;h3&gt;</code> tiene <code>margin-top: 32px</code>{" "}
            para separarse del borde de arriba de la tarjeta… y el título sigue
            pegado al borde, mientras que la tarjeta entera se corrió hacia
            abajo. Explicá por qué y arreglalo de dos formas distintas.
          </p>
          <Editor
            solapas="css"
            consigna="Que los 32px queden ADENTRO de la tarjeta blanca, no arriba de ella."
            html={`
              <div class="tarjeta">
                <h3>Se corrió la tarjeta</h3>
                <p>Y el título sigue pegado al borde de arriba.</p>
              </div>
            `}
            css={`
              body { background: #cbd5e1; }

              .tarjeta {
                padding: 0 20px 20px;
                background: #fff;
                border-radius: 10px;
                font: 400 13px system-ui, sans-serif;
              }

              .tarjeta h3 {
                margin-top: 32px;   /* se escapa de la tarjeta */
              }

              .tarjeta p { margin-bottom: 0; }
            `}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
