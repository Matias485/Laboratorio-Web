import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "Grid" };

export default function Pagina() {
  return (
    <Leccion
      slug="/css/grid"
      titulo="Grid"
      resumen="Acomodar cosas en dos dimensiones. Filas, columnas, áreas con nombre y grillas que se adaptan solas."
    >
      <Seccion titulo="Para qué sirve: dos dimensiones a la vez">
        <p>
          <Link href="/css/flexbox">Flexbox</Link> acomoda cosas{" "}
          <strong>a lo largo de una dirección</strong>. Grid acomoda cosas{" "}
          <strong>en filas y columnas al mismo tiempo</strong>: vos dibujás una
          cuadrícula en el contenedor y después decidís qué elemento ocupa qué
          celda, o cuántas celdas ocupa.
        </p>

        <p>
          La diferencia no es de potencia, es de <em>quién manda</em>. En Flexbox
          manda el contenido: cada elemento arranca con lo que mide y el
          contenedor reparte lo que sobra. En Grid manda el contenedor: la grilla
          existe antes que los elementos, y los elementos se acomodan adentro. De
          ahí sale el criterio práctico:
        </p>

        <Nota tipo="info" titulo="Cómo elegir en diez segundos">
          <ul>
            <li>
              <strong>¿Puedo dibujar el resultado con una regla?</strong> Si
              podés describir el diseño como &quot;esta columna mide 240 y la de
              al lado se lleva el resto&quot;, o si hay cosas que tienen que{" "}
              <strong>alinearse con las de la fila de abajo</strong>, es Grid.
            </li>
            <li>
              <strong>¿Es una tira de cosas que se acomodan según lo que
              miden?</strong> Una barra de navegación, una fila de botones, un
              ícono al lado de un texto: eso es Flexbox.
            </li>
          </ul>
          <p>
            En una página real usás los dos: <strong>Grid para el esqueleto</strong>{" "}
            (header, barra lateral, contenido, footer) y{" "}
            <strong>Flexbox adentro de cada pieza</strong>. No compiten, se
            anidan.
          </p>
        </Nota>

        <p>
          Se activa con un valor de <Link href="/css/display">display</Link>,
          puesto en el <strong>contenedor</strong>. Igual que con Flexbox, los
          nietos no se enteran de nada:
        </p>

        <Editor
          alto={220}
          consigna="Agregale grid-template-columns: 1fr 1fr 1fr al contenedor y mirá cómo las seis cajas se ordenan solas en dos filas de tres."
          html={`<div class="contenedor">
  <div class="caja">uno</div>
  <div class="caja">dos</div>
  <div class="caja">tres</div>
  <div class="caja">cuatro</div>
  <div class="caja">cinco</div>
  <div class="caja">seis</div>
</div>`}
          css={`.contenedor {
  display: grid;        /* por ahora: una sola columna */
  gap: 10px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 14px 20px;
}`}
        />

        <p>
          Con solo <code>display: grid</code> no pasó casi nada: obtuviste una
          grilla de <strong>una sola columna</strong>. Eso ya es útil (es una pila
          vertical con <code>gap</code>, sin márgenes), pero lo interesante empieza
          cuando le decís cuántas columnas querés.
        </p>

        <p>
          También existe <code>display: inline-grid</code>, que por dentro es
          idéntico pero hacia afuera se comporta como un{" "}
          <code>inline-block</code>. Se usa muy poco.
        </p>
      </Seccion>

      <Seccion titulo="Dibujar la grilla: columnas, filas y la unidad fr">
        <p>
          Las dos propiedades centrales son{" "}
          <code>grid-template-columns</code> y <code>grid-template-rows</code>. No
          reciben un número de columnas: reciben{" "}
          <strong>la lista de tamaños de cada pista</strong>, separados por
          espacios. Tres valores, tres columnas.
        </p>

        <Editor
          alto={230}
          consigna="Probá 200px 1fr, después 1fr 1fr 1fr 1fr, y después 30% 1fr auto. La cantidad de valores es la cantidad de columnas."
          html={`<div class="contenedor">
  <div class="caja">uno</div>
  <div class="caja">dos</div>
  <div class="caja">tres</div>
  <div class="caja">cuatro</div>
  <div class="caja">cinco</div>
</div>`}
          css={`.contenedor {
  display: grid;
  grid-template-columns: 120px 1fr 2fr;   /* tres pistas, tres tamaños */
  gap: 10px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 14px 10px;
  text-align: center;
}`}
        />

        <h3>La unidad fr, que es la que cambia todo</h3>
        <p>
          <code>fr</code> viene de <em>fracción</em>, y es una unidad que solo
          existe dentro de Grid. No significa &quot;tanto por ciento del
          contenedor&quot;: significa{" "}
          <strong>una parte de lo que sobra después de repartir todo lo
          demás</strong>. Primero el navegador resta los tamaños fijos y{" "}
          <strong>los gaps</strong>, y recién con el resto hace las cuentas.
        </p>

        <p>
          Esa es la diferencia con un porcentaje, y no es un detalle: cuatro
          columnas de <code>25%</code> con <code>gap: 16px</code> suman el 100% del
          ancho <em>más</em> tres huecos de 16px, así que se desbordan. Cuatro
          columnas de <code>1fr</code> nunca se desbordan, porque el gap ya está
          descontado antes de repartir.
        </p>

        <Editor
          alto={280}
          consigna="La primera fila se sale del recuadro rojo. Cambiá los cuatro 25% por 1fr y mirá cómo entra justo, con los mismos 16px de gap."
          html={`<p class="rotulo">grid-template-columns: 25% 25% 25% 25%</p>
<div class="contenedor porcentaje">
  <div class="caja">25%</div>
  <div class="caja">25%</div>
  <div class="caja">25%</div>
  <div class="caja">25%</div>
</div>

<p class="rotulo">grid-template-columns: 1fr 1fr 1fr 1fr</p>
<div class="contenedor fracciones">
  <div class="caja">1fr</div>
  <div class="caja">1fr</div>
  <div class="caja">1fr</div>
  <div class="caja">1fr</div>
</div>`}
          css={`.contenedor {
  display: grid;
  gap: 16px;
  background: #ffe0e0;
  border: 2px solid #b4243a;
  margin-bottom: 14px;
}

.porcentaje { grid-template-columns: 25% 25% 25% 25%; }
.fracciones { grid-template-columns: 1fr 1fr 1fr 1fr; }

.caja {
  background: #14538f;
  color: white;
  padding: 14px 0;
  text-align: center;
  font-size: 13px;
}

.rotulo { margin: 0 0 4px; font-size: 12px; font-weight: 700;
          font-family: ui-monospace, Consolas, monospace; color: #103e6b; }`}
        />

        <p>
          Los <code>fr</code> también se mezclan con tamaños fijos, y ahí se ve
          mejor todavía: en <code>240px 1fr 2fr</code> el navegador reserva los
          240px y los gaps, y lo que queda lo parte en tres, una parte para la
          segunda columna y dos para la tercera.
        </p>

        <Editor
          alto={240}
          consigna="Cambiá el 1fr 2fr por 2fr 1fr y después por 1fr 1fr. La columna de 240px nunca se mueve: el reparto pasa solo entre las otras dos."
          html={`<div class="contenedor">
  <div class="caja fija">240px</div>
  <div class="caja">1fr</div>
  <div class="caja">2fr</div>
</div>`}
          css={`.contenedor {
  display: grid;
  grid-template-columns: 240px 1fr 2fr;
  gap: 12px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 18px 8px;
  text-align: center;
}

.fija { background: #0f7a52; }`}
        />

        <h3>Filas y gap</h3>
        <p>
          <code>grid-template-rows</code> funciona igual, pero se usa mucho menos:
          en general las filas se dejan en <code>auto</code> para que cada una mida
          lo que mida su contenido. Donde sí se usa es en el esqueleto de una
          página: <code>auto 1fr auto</code> significa{" "}
          <em>header lo que mida, contenido todo lo que sobre, footer lo que
          mida</em>.
        </p>

        <p>
          <code>gap</code> es el mismo de Flexbox: separa las pistas entre sí{" "}
          <strong>sin agregar espacio contra los bordes</strong>. Con un valor va
          para los dos ejes; con dos, el primero es entre filas y el segundo entre
          columnas. También podés escribirlas por separado con{" "}
          <code>row-gap</code> y <code>column-gap</code>.
        </p>

        <Editor
          alto={300}
          consigna="Cambiá gap: 10px 30px por un solo valor, y después reemplazalo por row-gap: 40px sin column-gap para ver cada uno por separado."
          html={`<div class="contenedor">
  <div class="caja">cabecera</div>
  <div class="caja">a</div>
  <div class="caja">b</div>
  <div class="caja">pie</div>
</div>`}
          css={`.contenedor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;   /* alto, resto, alto */
  gap: 10px 30px;                      /* entre filas / entre columnas */

  height: 260px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 12px;
  text-align: center;
}`}
        />
      </Seccion>

      <Seccion titulo="repeat, minmax y la grilla que se adapta sola">
        <p>
          Escribir <code>1fr 1fr 1fr 1fr 1fr 1fr</code> es horrible.{" "}
          <code>repeat(6, 1fr)</code> dice lo mismo, y admite listas:{" "}
          <code>repeat(3, 200px 1fr)</code> son seis columnas alternadas.
        </p>

        <p>
          <code>minmax(min, max)</code> le pone un piso y un techo a una pista:{" "}
          <code>minmax(220px, 1fr)</code> significa{" "}
          <em>nunca menos de 220px, y si sobra espacio crecé</em>.
        </p>

        <p>
          Y ahora la línea que resuelve el 80% de los casos reales, la que
          conviene que te aprendas de memoria:
        </p>

        <Codigo
          archivo="estilos.css"
          resaltar={[3]}
          codigo={`.grilla {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}`}
        />

        <p>Pieza por pieza, de adentro hacia afuera:</p>

        <ul>
          <li>
            <code>minmax(220px, 1fr)</code> — cada columna mide{" "}
            <strong>al menos 220px</strong>; si sobra lugar, se estira.
          </li>
          <li>
            <code>repeat(auto-fit, …)</code> — <strong>no sabés cuántas
            columnas</strong> vas a tener: que el navegador ponga todas las que
            entren con ese mínimo. Cuando la pantalla se angosta, entran menos, y
            las que quedan bajan de renglón solas.
          </li>
          <li>
            El resultado es una grilla responsive{" "}
            <strong>sin una sola media query</strong>. El punto de corte no lo
            elegís vos: lo calcula el navegador a partir del ancho mínimo que
            pediste.
          </li>
        </ul>

        <Editor
          alto={330}
          consigna="Cambiá el 220px por 130px y después por 400px, y mirá cuántas tarjetas entran por fila. Ninguna media query en todo el ejemplo."
          html={`<div class="grilla">
  <article class="tarjeta"><h4>HTML</h4><p>La estructura.</p></article>
  <article class="tarjeta"><h4>CSS</h4><p>La presentación.</p></article>
  <article class="tarjeta"><h4>JavaScript</h4><p>El comportamiento.</p></article>
  <article class="tarjeta"><h4>React</h4><p>Componentes.</p></article>
  <article class="tarjeta"><h4>Redux</h4><p>Estado global.</p></article>
  <article class="tarjeta"><h4>TypeScript</h4><p>Tipos.</p></article>
</div>`}
          css={`.grilla {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.tarjeta {
  background: white;
  border: 1px solid #d3e0f0;
  border-top: 3px solid #14538f;
  border-radius: 8px;
  padding: 12px 14px;
}

.tarjeta h4 { margin: 0 0 4px; color: #103e6b; }
.tarjeta p  { margin: 0; font-size: 13px; color: #55697f; }`}
        />

        <h3>auto-fill contra auto-fit</h3>
        <p>
          Las dos palabras hacen lo mismo mientras haya elementos de sobra. La
          diferencia aparece <strong>cuando sobran pistas</strong>, o sea cuando
          entrarían más columnas que las que tenés elementos:
        </p>

        <ul>
          <li>
            <code>auto-fill</code> <strong>crea igual</strong> las pistas que
            entren, aunque queden vacías. Los elementos se quedan chicos y queda
            un hueco a la derecha.
          </li>
          <li>
            <code>auto-fit</code> crea las mismas pistas pero después{" "}
            <strong>colapsa a cero</strong> las que quedaron vacías, así que los{" "}
            <code>1fr</code> de las que sí tienen contenido se llevan todo el
            ancho.
          </li>
        </ul>

        <p>
          Abajo están las dos con <strong>tres elementos</strong> y una grilla
          donde entrarían más columnas. El mínimo es chico a propósito, para que
          sobren pistas y se note:
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="auto-fill: quedan pistas vacías">
            <Vista
              alto={110}
              html={`<div class="g">
  <span>1</span><span>2</span><span>3</span>
</div>`}
              css={`body { padding: 12px; }

.g {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 8px;
  border: 2px solid #b4243a;
  padding: 6px;
}

.g span {
  background: #14538f; color: white;
  padding: 14px 0; text-align: center; font-weight: 700;
}`}
            />
            <p className="tenue">
              Las tres cajas se quedan del ancho de una pista y el resto de la
              fila queda vacío.
            </p>
          </Columna>
          <Columna tono="bien" titulo="auto-fit: las vacías se colapsan">
            <Vista
              alto={110}
              html={`<div class="g">
  <span>1</span><span>2</span><span>3</span>
</div>`}
              css={`body { padding: 12px; }

.g {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 8px;
  border: 2px solid #0f7a52;
  padding: 6px;
}

.g span {
  background: #14538f; color: white;
  padding: 14px 0; text-align: center; font-weight: 700;
}`}
            />
            <p className="tenue">
              Las pistas vacías miden cero, así que las tres cajas se reparten
              todo el ancho.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="atencion" titulo="Cuál usar">
          <p>
            <code>auto-fit</code> es el que querés casi siempre: te da
            elementos parejos que llenan la fila. <code>auto-fill</code> sirve
            cuando la grilla tiene que mantener el ancho de columna pase lo que
            pase —por ejemplo un calendario, o una lista que se va llenando y no
            querés que las cajas cambien de tamaño cada vez que agregás una—.
          </p>
        </Nota>

        <Editor
          alto={230}
          consigna="Cambiá auto-fill por auto-fit. Después agregá cajas al HTML hasta que llenen la fila: ahí las dos palabras hacen exactamente lo mismo."
          html={`<div class="grilla">
  <div class="caja">1</div>
  <div class="caja">2</div>
  <div class="caja">3</div>
</div>`}
          css={`.grilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 10px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 16px 0;
  text-align: center;
  font-weight: 700;
}`}
        />

        <Nota tipo="atencion" titulo="minmax(0, 1fr): el min-width: 0 de Grid">
          <p>
            Un <code>1fr</code> no es lo mismo que <code>minmax(0, 1fr)</code>.{" "}
            <code>1fr</code> es en realidad <code>minmax(auto, 1fr)</code>, y ese{" "}
            <code>auto</code> significa <em>nunca más chico que mi contenido</em>.
            Por eso una URL larga, una tabla o un <code>white-space: nowrap</code>{" "}
            adentro de una celda <strong>agrandan la columna</strong> y te rompen
            el diseño, exactamente igual que pasaba en{" "}
            <Link href="/css/flexbox">Flexbox</Link> con{" "}
            <code>min-width: 0</code>.
          </p>
          <p>
            El arreglo es escribir <code>minmax(0, 1fr)</code> en la columna que
            tiene que poder achicarse. Si alguna vez tu grilla desborda a lo
            ancho y no entendés por qué, probá eso primero.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Colocar elementos: líneas, span y el -1">
        <p>
          Hasta acá los elementos se acomodaron solos, uno detrás del otro. Ahora
          vamos a ubicarlos a mano, y para eso hay que cambiar de forma de
          contar: <strong>Grid no numera las celdas, numera las líneas</strong>{" "}
          que las separan.
        </p>

        <Nota tipo="info" titulo="Las líneas empiezan en 1 y hay una más que columnas">
          <p>
            Una grilla de <strong>3 columnas tiene 4 líneas verticales</strong>:
            la del borde izquierdo es la 1 y la del borde derecho es la 4. Lo
            mismo con las filas. Por eso ocupar la primera columna se escribe{" "}
            <code>grid-column: 1 / 2</code>: <em>desde la línea 1 hasta la
            línea 2</em>, no &quot;la columna 1 a la 2&quot;.
          </p>
          <p>
            Y se pueden contar desde el final con números negativos:{" "}
            <strong><code>-1</code> es siempre la última línea</strong>, sin
            importar cuántas columnas haya. Por eso{" "}
            <code>grid-column: 1 / -1</code> es <em>ocupá todo el ancho</em>, y
            es de lo que más vas a escribir.
          </p>
        </Nota>

        <Editor
          alto={330}
          consigna="La caja verde va de la línea 1 a la 3. Cambiala por 2 / 4 y mirá cómo se corre una columna entera."
          html={`<div class="contenedor">
  <div class="caja ubicada">1 / 3</div>
  <div class="caja">a</div>
  <div class="caja">b</div>
  <div class="caja">c</div>
  <div class="caja">d</div>
  <div class="caja">e</div>
</div>`}
          css={`.contenedor {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 columnas = 4 líneas */
  grid-auto-rows: 70px;
  gap: 10px;
  background: #ffe0e0;
  padding: 10px;
}

.ubicada {
  grid-column: 1 / 3;   /* desde la línea 1 hasta la línea 3 */
  grid-row: 1 / 3;      /* dos filas de alto */
  background: #0f7a52;
}

.caja {
  background: #14538f;
  color: white;
  padding: 10px;
  text-align: center;
}`}
        />

        <p>
          Contar líneas a mano se vuelve insoportable apenas cambiás la cantidad
          de columnas. Por eso existen dos atajos que vas a usar mucho más que
          los números sueltos:
        </p>

        <ul>
          <li>
            <code>span N</code> — <em>ocupá N pistas desde donde te toque</em>,
            sin decir dónde empieza. <code>grid-column: span 2</code> se lee
            solo.
          </li>
          <li>
            <code>1 / -1</code> — de punta a punta. Es la forma correcta de hacer
            que un título o un banner ocupe toda la fila.
          </li>
        </ul>

        <Editor
          alto={360}
          consigna="Cambiá el repeat(4, 1fr) por repeat(3, 1fr). El banner con 1 / -1 sigue ocupando todo; si hubieras escrito 1 / 5 se te rompía."
          html={`<div class="contenedor">
  <div class="caja banner">grid-column: 1 / -1</div>
  <div class="caja doble">span 2</div>
  <div class="caja">a</div>
  <div class="caja">b</div>
  <div class="caja">c</div>
  <div class="caja doble">span 2</div>
  <div class="caja">d</div>
</div>`}
          css={`.contenedor {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 64px;
  gap: 10px;
  background: #ffe0e0;
  padding: 10px;
}

.banner {
  grid-column: 1 / -1;    /* de la primera línea a la última, siempre */
  background: #92600a;
}

.doble {
  grid-column: span 2;    /* dos pistas, donde sea que caiga */
  background: #0f7a52;
}

.caja {
  background: #14538f;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 13px;
}`}
        />

        <p>
          También existe el atajo <code>grid-area</code>, que junta las cuatro
          líneas en un renglón con el orden{" "}
          <em>fila-inicio / columna-inicio / fila-fin / columna-fin</em>. Se usa
          poco con números, porque es difícil de leer, pero es el mismo nombre de
          propiedad que vamos a usar en la sección que viene con nombres en vez de
          números.
        </p>

        <Nota tipo="ok" titulo="Abrí el inspector de Grid: es la mejor forma de entender esto">
          <p>
            Apretá <strong>F12</strong>, andá a la pestaña de elementos y
            seleccioná un contenedor con <code>display: grid</code>. Al lado del
            elemento, en el HTML, te va a aparecer una insignia chiquita que dice{" "}
            <strong>grid</strong>. Hacele click.
          </p>
          <p>
            El navegador dibuja encima de la página{" "}
            <strong>las líneas de la grilla con sus números</strong>, incluidos
            los negativos, y te marca los gaps con rayas. En el panel de estilos,
            además, podés prender los nombres de las áreas y el tamaño de cada
            pista. Con eso dejás de adivinar: ves exactamente dónde está la línea
            3 y por qué tu caja no arranca donde esperabas. Chrome, Firefox y Edge
            lo tienen; el de Firefox es el más completo.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="grid-template-areas: maquetar dibujando un mapa">
        <p>
          Esta es la parte de Grid que no tiene equivalente en ninguna otra
          herramienta de CSS. En vez de posicionar cada elemento con números de
          línea, le ponés <strong>un nombre a cada uno</strong> con{" "}
          <code>grid-area</code> y después{" "}
          <strong>dibujás el layout con texto</strong> en el contenedor.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Con números de línea">
            <Codigo
              archivo="estilos.css"
              codigo={`/* ¿Qué layout es este? Hay que
   armarlo en la cabeza. Y si agregás
   una columna, se rompe todo. */
.cabecera  { grid-column: 1 / 3; grid-row: 1; }
.menu      { grid-column: 1;     grid-row: 2; }
.principal { grid-column: 2;     grid-row: 2; }
.pie       { grid-column: 1 / 3; grid-row: 3; }`}
            />
          </Columna>
          <Columna tono="bien" titulo="Con áreas con nombre">
            <Codigo
              archivo="estilos.css"
              codigo={`/* El layout se ve en el CSS.
   Lo entiende cualquiera que lo abra,
   incluso vos dentro de seis meses. */
.pagina {
  grid-template-areas:
    "cabecera cabecera"
    "menu     principal"
    "pie      pie";
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          Las reglas son pocas: cada cadena entre comillas es una fila, cada
          palabra adentro es una celda, repetir el mismo nombre en celdas vecinas
          las une, y un punto (<code>.</code>) deja una celda vacía. Todas las
          filas tienen que tener la misma cantidad de palabras y el área que
          formes tiene que ser <strong>un rectángulo</strong>: si no, el navegador
          descarta la declaración entera.
        </p>

        <Editor
          alto={360}
          consigna="Cambiá la fila del medio por &quot;principal menu&quot; y la barra se pasa a la derecha. Probá también poner un punto en lugar de menu."
          html={`<div class="pagina">
  <header class="cabecera">cabecera</header>
  <aside class="menu">menu</aside>
  <main class="principal">principal</main>
  <footer class="pie">pie</footer>
</div>`}
          css={`body { padding: 0; }

.pagina {
  display: grid;
  grid-template-columns: 160px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "cabecera cabecera"
    "menu     principal"
    "pie      pie";
  gap: 8px;
  height: 320px;
  padding: 8px;
  background: #ffe0e0;
}

.cabecera  { grid-area: cabecera;  background: #92600a; }
.menu      { grid-area: menu;      background: #0f7a52; }
.principal { grid-area: principal; background: #14538f; }
.pie       { grid-area: pie;       background: #55697f; }

.pagina > * {
  color: white;
  padding: 12px;
  font-weight: 700;
}`}
        />

        <p>
          Y ahora la mejor parte: para el celular no hace falta tocar el HTML ni
          reescribir posiciones. Volvés a dibujar el mapa adentro de una media
          query y listo. Los nombres siguen siendo los mismos, así que el orden
          visual cambia por completo con seis líneas de CSS.
        </p>

        <Nota tipo="atencion" titulo="Ojo con lo que mide la media query acá adentro">
          <p>
            El resultado de estos editores vive dentro de un marco aislado, así
            que la media query compara contra el{" "}
            <strong>ancho del panel de resultado</strong>, no contra el de tu
            pantalla. Para verla disparar tenés dos caminos: achicar la ventana
            del navegador, o —mucho más rápido— cambiar el número del{" "}
            <code>max-width</code> en el editor y ver el layout darse vuelta al
            instante.
          </p>
        </Nota>

        <Editor
          alto={380}
          consigna="Cambiá el 380px de la media query por 900px: el layout de celular aparece al toque. Volvelo a 380px y probá achicando la ventana."
          html={`<div class="pagina">
  <header class="cabecera">cabecera</header>
  <aside class="menu">menu</aside>
  <main class="principal">principal</main>
  <footer class="pie">pie</footer>
</div>`}
          css={`body { padding: 0; }

.pagina {
  display: grid;
  grid-template-columns: 160px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "cabecera cabecera"
    "menu     principal"
    "pie      pie";
  gap: 8px;
  height: 340px;
  padding: 8px;
  background: #ffe0e0;
}

/* En pantalla angosta: todo en una sola columna, y el menú
   debajo del contenido. Ni una línea de HTML cambió. */
@media (max-width: 380px) {
  .pagina {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto auto;
    grid-template-areas:
      "cabecera"
      "principal"
      "menu"
      "pie";
  }
}

.cabecera  { grid-area: cabecera;  background: #92600a; }
.menu      { grid-area: menu;      background: #0f7a52; }
.principal { grid-area: principal; background: #14538f; }
.pie       { grid-area: pie;       background: #55697f; }

.pagina > * {
  color: white;
  padding: 12px;
  font-weight: 700;
}`}
        />

        <Nota tipo="atencion" titulo="Reordenar visualmente no reordena el documento">
          <p>
            Igual que <code>order</code> en Flexbox, mover un área en la media
            query cambia <strong>dónde se ve</strong> el elemento, pero no dónde
            está en el HTML. El foco del teclado y los lectores de pantalla siguen
            el documento. Mover el menú abajo del contenido está bien; invertir el
            orden de los enlaces de un menú, no.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Alineación: el contenido en la celda y la grilla en el contenedor">
        <p>
          Grid tiene cuatro propiedades de alineación en el contenedor y dos en
          cada hijo. Suena a mucho, pero se ordenan solas con una pregunta:{" "}
          <strong>¿qué estás moviendo?</strong>
        </p>

        <ul>
          <li>
            <code>justify-items</code> y <code>align-items</code> mueven{" "}
            <strong>cada elemento dentro de su celda</strong>. La grilla no se
            mueve.
          </li>
          <li>
            <code>justify-content</code> y <code>align-content</code> mueven{" "}
            <strong>la grilla entera dentro del contenedor</strong>. Solo hacen
            algo si la grilla es más chica que el contenedor.
          </li>
        </ul>

        <p>
          Y para saber cuál es <code>justify-</code> y cuál <code>align-</code>,
          en Grid es más fácil que en Flexbox porque no depende de ninguna
          dirección: <strong><code>justify-</code> es siempre el eje de las
          columnas (horizontal)</strong> y{" "}
          <strong><code>align-</code> es siempre el de las filas
          (vertical)</strong>. Siempre.
        </p>

        <Editor
          alto={330}
          consigna="Las celdas tienen 140px de ancho pero las cajas son chicas. Probá justify-items: center, end y stretch, y lo mismo con align-items."
          html={`<div class="contenedor">
  <div class="caja">uno</div>
  <div class="caja">dos</div>
  <div class="caja">tres</div>
  <div class="caja">cuatro</div>
  <div class="caja">cinco</div>
  <div class="caja">seis</div>
</div>`}
          css={`.contenedor {
  display: grid;
  grid-template-columns: repeat(3, 140px);
  grid-auto-rows: 90px;

  justify-items: start;   /* start | center | end | stretch (por defecto) */
  align-items: start;     /* start | center | end | stretch (por defecto) */

  gap: 8px;
  background: #ffe0e0;
  padding: 10px;
  /* Las celdas se ven porque el fondo se transparenta entre las cajas. */
}

.caja {
  background: #14538f;
  color: white;
  padding: 8px 12px;
  font-size: 13px;
}`}
        />

        <p>
          Ahora las otras dos. Fijate que en el ejemplo de abajo la grilla mide
          tres columnas de 90px, o sea bastante menos que el contenedor: por eso{" "}
          <code>justify-content</code> tiene espacio sobrante para repartir. Si
          las columnas fueran <code>1fr</code> no habría nada que repartir y no
          verías ninguna diferencia.
        </p>

        <Editor
          alto={360}
          consigna="Probá justify-content: center, end, space-between y space-evenly. Después poné align-content: center para mover el bloque entero para abajo."
          html={`<div class="contenedor">
  <div class="caja">1</div>
  <div class="caja">2</div>
  <div class="caja">3</div>
  <div class="caja">4</div>
  <div class="caja">5</div>
  <div class="caja">6</div>
</div>`}
          css={`.contenedor {
  display: grid;
  grid-template-columns: repeat(3, 90px);   /* la grilla NO llena el ancho */
  grid-auto-rows: 60px;

  justify-content: start;   /* mueve la grilla entera en horizontal */
  align-content: start;     /* mueve la grilla entera en vertical   */

  gap: 8px;
  height: 300px;
  background: #ffe0e0;
  border: 2px dashed #b4243a;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  display: grid;
  place-items: center;
  font-weight: 700;
}`}
        />

        <Nota tipo="atencion" titulo="Esta es la confusión número uno de Grid">
          <p>
            Si escribiste <code>justify-content: center</code> y no pasó nada,
            casi seguro tus columnas son <code>1fr</code>: la grilla ya ocupa todo
            el contenedor, no hay sobrante que repartir y lo que querías era{" "}
            <code>justify-items: center</code>.
          </p>
          <p>
            Al revés también: si escribiste <code>align-items: center</code> y
            todo se centró dentro de su celda pero el bloque sigue pegado arriba,
            lo que querías era <code>align-content: center</code>.
          </p>
        </Nota>

        <p>
          Cada hijo puede desobedecer al contenedor con <code>justify-self</code>{" "}
          y <code>align-self</code>. Y existen los atajos{" "}
          <code>place-items</code>, <code>place-content</code> y{" "}
          <code>place-self</code>, que reciben{" "}
          <em>align primero y justify después</em> (sí, al revés de lo que uno
          escribiría). <code>place-items: center</code>, con un solo valor, es la
          forma más corta que existe en CSS de centrar algo en los dos ejes.
        </p>

        <Editor
          alto={320}
          consigna="La caja verde desobedece. Probá justify-self: end y align-self: stretch, y agregale place-self: center a otra caja."
          html={`<div class="contenedor">
  <div class="caja">uno</div>
  <div class="caja rebelde">rebelde</div>
  <div class="caja">tres</div>
  <div class="caja">cuatro</div>
  <div class="caja">cinco</div>
  <div class="caja">seis</div>
</div>`}
          css={`.contenedor {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;

  place-items: center;   /* align-items y justify-items, en ese orden */

  gap: 8px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 8px 12px;
  font-size: 13px;
}

.rebelde {
  justify-self: start;   /* solo esta caja se va al borde izquierdo */
  align-self: end;       /* y al piso de su celda */
  background: #0f7a52;
}`}
        />
      </Seccion>

      <Seccion titulo="Filas implícitas, dense y una galería tipo mosaico">
        <p>
          Cuando ponés más elementos de los que entran en las pistas que
          declaraste, Grid <strong>no se queja: crea filas nuevas solo</strong>.
          Esas se llaman <em>filas implícitas</em>, y por defecto miden{" "}
          <code>auto</code>, o sea lo que mida su contenido. Ahí entra{" "}
          <code>grid-auto-rows</code>, que les fija un tamaño a todas de una.
        </p>

        <Editor
          alto={320}
          consigna="Cambiá grid-auto-rows: 80px por minmax(80px, auto): ahora la fila crece si el contenido no entra, pero nunca baja de 80px."
          html={`<div class="contenedor">
  <div class="caja">uno</div>
  <div class="caja">dos</div>
  <div class="caja">tres</div>
  <div class="caja">cuatro</div>
  <div class="caja largo">Este texto es bastante más largo que el resto y no
    entra en ochenta píxeles de alto, así que se desborda.</div>
  <div class="caja">seis</div>
</div>`}
          css={`.contenedor {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 80px;      /* probá: minmax(80px, auto) */
  gap: 10px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 10px;
  font-size: 13px;
}

.largo { background: #0f7a52; }`}
        />

        <p>
          El hermano de <code>grid-auto-rows</code> es{" "}
          <code>grid-auto-flow</code>, que decide en qué orden se van llenando las
          celdas. Vale <code>row</code> por defecto (se llena fila por fila) y
          también acepta <code>column</code>. Pero lo interesante es la palabra
          que se le agrega: <code>dense</code>.
        </p>

        <p>
          Sin <code>dense</code>, Grid nunca retrocede: si un elemento pide dos
          columnas y en la fila actual queda una sola libre,{" "}
          <strong>deja el hueco y baja</strong>. Con{" "}
          <code>grid-auto-flow: row dense</code>, cada vez que aparece un elemento
          chico el navegador vuelve para atrás y{" "}
          <strong>rellena los huecos que habían quedado</strong>.
        </p>

        <Editor
          alto={330}
          consigna="Agregale dense: escribí grid-auto-flow: row dense y mirá cómo desaparecen los dos huecos de la primera fila."
          html={`<div class="contenedor">
  <div class="caja ancha">1 (span 2)</div>
  <div class="caja triple">2 (span 3)</div>
  <div class="caja">3</div>
  <div class="caja">4</div>
  <div class="caja ancha">5 (span 2)</div>
  <div class="caja">6</div>
  <div class="caja">7</div>
  <div class="caja">8</div>
</div>`}
          css={`.contenedor {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 64px;
  grid-auto-flow: row;     /* probá: row dense */
  gap: 8px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  display: grid;
  place-items: center;
  font-size: 13px;
}

.ancha  { grid-column: span 2; background: #0f7a52; }
.triple { grid-column: span 3; background: #92600a; }`}
        />

        <Nota tipo="atencion" titulo="dense reordena de verdad">
          <p>
            <code>dense</code> puede hacer que el elemento número 7 aparezca
            visualmente antes que el 5. Para una galería de fotos eso da igual;
            para una lista de resultados que alguien va a recorrer con el teclado,
            es un problema de accesibilidad, porque el orden visual y el orden de
            tabulación dejan de coincidir. Usalo cuando el orden{" "}
            <strong>no signifique nada</strong>.
          </p>
        </Nota>

        <h3>La galería tipo mosaico</h3>
        <p>
          Juntando todo: una grilla que se adapta sola con{" "}
          <code>auto-fit</code> y <code>minmax</code>, filas implícitas de altura
          fija con <code>grid-auto-rows</code>, algunos elementos que ocupan más
          de una celda con <code>span</code>, y <code>dense</code> para que no
          queden agujeros. Son nueve líneas de CSS.
        </p>

        <Editor
          alto={460}
          consigna="Poné la clase destacada en otra foto y mirá cómo se reacomoda todo el mosaico solo. Probá también sacarle dense."
          html={`<div class="galeria">
  <div class="foto destacada">1</div>
  <div class="foto">2</div>
  <div class="foto ancha">3</div>
  <div class="foto">4</div>
  <div class="foto alta">5</div>
  <div class="foto">6</div>
  <div class="foto ancha">7</div>
  <div class="foto">8</div>
  <div class="foto">9</div>
  <div class="foto">10</div>
</div>`}
          css={`.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  grid-auto-rows: 80px;      /* todas las celdas, del mismo alto base */
  grid-auto-flow: dense;     /* sin agujeros */
  gap: 8px;
}

.destacada {
  grid-column: span 2;       /* dos columnas... */
  grid-row: span 2;          /* ...y dos filas */
  background: #92600a;
}

.ancha { grid-column: span 2; background: #0f7a52; }
.alta  { grid-row: span 2;    background: #14538f; }

.foto {
  background: #2f6fb5;
  color: white;
  border-radius: 6px;
  display: grid;
  place-items: center;
  font-weight: 700;
}`}
        />

        <Nota tipo="ok" titulo="La portada de este mismo sitio usa Grid">
          <p>
            Las tarjetas de las cinco pistas que ves en el inicio del laboratorio
            son una grilla de una sola línea. Abrí{" "}
            <code>app/globals.css</code> y buscá la clase{" "}
            <code>.pistas</code>:
          </p>
          <Codigo
            archivo="app/globals.css"
            resaltar={[3]}
            codigo={`.pistas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 16px;
  margin: 0 0 32px;
}`}
          />
          <p>
            Es exactamente la línea de la sección de <code>auto-fit</code>: en una
            pantalla ancha entran tres tarjetas, en una notebook dos, en un
            celular una, y no hay ni una media query. Un poco más abajo, en{" "}
            <code>.tarjetas</code>, vas a encontrar la misma idea pero con{" "}
            <code>auto-fill</code>: compará las dos y fijate cuándo se notaría la
            diferencia. Cada tarjeta, por dentro, es Flexbox en columna: Grid para
            el conjunto, Flexbox para la pieza.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Dos cosas que vas a ver y conviene que reconozcas">
          <p>
            <strong><code>subgrid</code></strong> — hace que una grilla anidada
            use las pistas de su padre en vez de crear las suyas. Es lo que
            resuelve el caso de &quot;quiero que los títulos de todas las tarjetas
            queden alineados entre sí aunque tengan distinto largo&quot;. Ya anda
            en todos los navegadores actuales.
          </p>
          <p>
            <strong>Nombres de línea</strong> — podés bautizar las líneas al
            declarar las pistas, con{" "}
            <code>grid-template-columns: [inicio] 1fr [medio] 1fr [fin]</code>, y
            después usarlas con <code>grid-column: inicio / medio</code>. Es una
            alternativa a las áreas; en la práctica las áreas ganan casi siempre
            porque se leen mejor.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <p>
          Dos ejercicios para resolver vos. Escribilos en cualquiera de los
          editores de arriba —el botón <em>reiniciar</em> te devuelve el
          original— y recién después mirá la solución. Y tené el inspector de
          Grid abierto mientras los hacés.
        </p>

        <Desafio
          titulo="1. El esqueleto de una aplicación, con áreas"
          pista={
            <div>
              <p>
                Son cuatro áreas y tres filas. La fila del medio es la única que
                tiene dos columnas, así que las otras dos usan el mismo nombre
                repetido para ocupar el ancho completo.
              </p>
              <p>
                Para que la barra lateral mida siempre lo mismo y el contenido se
                quede con el resto, las columnas son{" "}
                <code>200px 1fr</code>. Para que el pie quede abajo aunque el
                contenido sea corto, las filas son <code>auto 1fr auto</code> y el
                contenedor tiene una altura.
              </p>
              <p>
                Para el celular no toques el HTML: volvé a escribir{" "}
                <code>grid-template-areas</code> y{" "}
                <code>grid-template-columns</code> dentro de la media query.
              </p>
            </div>
          }
          solucion={
            <div>
              <p>
                Las dos piezas clave son el mapa de texto y que el HTML no cambie
                entre una versión y la otra. Cambiá el <code>420px</code> de la
                media query por <code>900px</code> para ver el layout de celular
                sin achicar nada:
              </p>
              <Editor
                alto={420}
                consigna="Cambiá el 420px por 900px para ver la versión de celular. Después probá poner el buscador con grid-area: cabecera y un punto donde estaba."
                html={`<div class="app">
  <header class="cabecera">Laboratorio</header>
  <nav class="menu">
    <p>HTML</p>
    <p>CSS</p>
    <p>React</p>
  </nav>
  <main class="contenido">
    <h4>Contenido</h4>
    <p>Yo me quedo con todo el espacio que sobra.</p>
  </main>
  <footer class="pie">Taller de Programación II</footer>
</div>`}
                css={`body { padding: 0; }

.app {
  display: grid;
  grid-template-columns: 200px 1fr;     /* barra fija + resto */
  grid-template-rows: auto 1fr auto;    /* alto, resto, alto  */
  grid-template-areas:
    "cabecera cabecera"
    "menu     contenido"
    "pie      pie";
  gap: 8px;
  height: 380px;
  padding: 8px;
  background: #eef3fa;
}

@media (max-width: 420px) {
  .app {
    grid-template-columns: 1fr;          /* una sola columna */
    grid-template-rows: auto auto 1fr auto;
    grid-template-areas:
      "cabecera"
      "menu"
      "contenido"
      "pie";
  }
}

.cabecera  { grid-area: cabecera;  background: #14538f; color: white; }
.menu      { grid-area: menu;      background: #ffffff; border: 1px solid #d3e0f0; }
.contenido { grid-area: contenido; background: #ffffff; border: 1px solid #d3e0f0; }
.pie       { grid-area: pie;       background: #55697f; color: white; }

.app > * { padding: 12px; border-radius: 6px; }
.cabecera, .pie { font-weight: 700; }
.menu p { margin: 0 0 6px; font-size: 13px; }
.contenido h4 { margin: 0 0 6px; }
.contenido p  { margin: 0; font-size: 13px; color: #55697f; }`}
              />
            </div>
          }
        >
          <p>
            Armá el esqueleto de una aplicación con cuatro zonas:{" "}
            <strong>cabecera</strong> arriba de punta a punta,{" "}
            <strong>menú</strong> a la izquierda, <strong>contenido</strong> a la
            derecha y <strong>pie</strong> abajo de punta a punta. Tiene que
            cumplir cuatro cosas:
          </p>
          <ol>
            <li>Usar <code>grid-template-areas</code>, no números de línea.</li>
            <li>El menú mide 200px fijos y el contenido se lleva el resto.</li>
            <li>
              La cabecera y el pie miden lo que mida su contenido; el contenido se
              come todo el espacio vertical sobrante.
            </li>
            <li>
              En pantalla angosta, todo pasa a una sola columna{" "}
              <strong>sin tocar una línea de HTML</strong>.
            </li>
          </ol>
          <p className="tenue">
            Si dudás de dónde sale el espacio interno de cada zona, repasá{" "}
            <Link href="/css/caja">el modelo de caja</Link>.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Una grilla de productos responsive, sin media queries"
          pista={
            <div>
              <p>
                Para las columnas, la línea de la sección 3:{" "}
                <code>repeat(auto-fit, minmax(200px, 1fr))</code>. Eso ya te
                resuelve el punto 1 y el 2 sin escribir ninguna media query.
              </p>
              <p>
                Para que el destacado ocupe toda la fila, acordate del{" "}
                <code>-1</code>: <code>grid-column: 1 / -1</code> funciona sin
                importar cuántas columnas haya en ese momento.
              </p>
              <p>
                Para que los botones queden todos a la misma altura, la grilla no
                te alcanza: cada tarjeta por dentro tiene que ser un{" "}
                <Link href="/css/flexbox">Flexbox</Link> en columna con{" "}
                <code>margin-top: auto</code> en el botón.
              </p>
            </div>
          }
          solucion={
            <div>
              <p>
                Grid afuera, Flexbox adentro: el patrón que vas a repetir siempre.
                Notá que el HTML no tiene ni una clase de posicionamiento y que no
                hay una sola media query en todo el ejemplo.
              </p>
              <Editor
                alto={520}
                consigna="Achicá la ventana o cambiá el 200px del minmax: las tarjetas se reacomodan y el destacado sigue ocupando la fila entera."
                html={`<div class="catalogo">
  <article class="producto destacado">
    <h4>Oferta de la semana</h4>
    <p>Ocupa la fila entera, entren dos columnas o entren cuatro.</p>
    <button class="boton">Ver</button>
  </article>
  <article class="producto">
    <h4>Teclado</h4>
    <p>Mecánico.</p>
    <button class="boton">Comprar</button>
  </article>
  <article class="producto">
    <h4>Monitor</h4>
    <p>Veintisiete pulgadas, con una descripción bastante más larga que
       las otras para que se note la diferencia de altura.</p>
    <button class="boton">Comprar</button>
  </article>
  <article class="producto">
    <h4>Mouse</h4>
    <p>Inalámbrico.</p>
    <button class="boton">Comprar</button>
  </article>
  <article class="producto">
    <h4>Auriculares</h4>
    <p>Con cable.</p>
    <button class="boton">Comprar</button>
  </article>
</div>`}
                css={`body { padding: 12px; background: #eef3fa; }

.catalogo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  /* align-items: stretch es el valor por defecto: por eso todas las
     tarjetas de una fila salen igual de altas sin pedirlo. */
}

.destacado {
  grid-column: 1 / -1;     /* toda la fila, haya las columnas que haya */
  border-top-color: #92600a;
}

.producto {
  display: flex;            /* cada tarjeta, por dentro, es Flexbox */
  flex-direction: column;

  background: white;
  border: 1px solid #d3e0f0;
  border-top: 3px solid #14538f;
  border-radius: 8px;
  padding: 14px;
}

.producto h4 { margin: 0 0 6px; color: #103e6b; }
.producto p  { margin: 0 0 14px; font-size: 13px; color: #55697f; }

.producto .boton {
  margin-top: auto;         /* empuja el botón hasta el piso de la tarjeta */
  align-self: flex-start;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 14px;
  border: 0;
  border-radius: 6px;
  background: #14538f;
  color: white;
  cursor: pointer;
}`}
              />
            </div>
          }
        >
          <p>
            Armá un catálogo de cinco productos donde el primero sea un{" "}
            <strong>destacado</strong> que ocupe la fila entera. Tiene que cumplir
            cuatro cosas:
          </p>
          <ol>
            <li>
              Las tarjetas normales entran las que entren por fila, con un ancho
              mínimo de 200px, y <strong>sin media queries</strong>.
            </li>
            <li>
              El destacado ocupa todo el ancho{" "}
              <strong>sin importar cuántas columnas haya</strong> en ese momento.
            </li>
            <li>Las tarjetas de una misma fila quedan de la misma altura.</li>
            <li>
              Los botones quedan todos pegados al piso de su tarjeta, aunque las
              descripciones tengan largos distintos.
            </li>
          </ol>
          <p className="tenue">
            Los puntos 3 y 4 no se resuelven con Grid: fijate cuál de las dos
            herramientas te conviene adentro de cada tarjeta.
          </p>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
