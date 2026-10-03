import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "Flexbox" };

export default function Pagina() {
  return (
    <Leccion
      slug="/css/flexbox"
      titulo="Flexbox"
      resumen="Acomodar cosas en una dirección. El eje principal, el cruzado, y los patrones que vas a repetir siempre."
    >
      <Seccion titulo="Para qué sirve (y para qué no)">
        <p>
          Flexbox resuelve un problema muy concreto:{" "}
          <strong>acomodar un grupo de elementos a lo largo de una sola
          dirección</strong>, en fila o en columna, repartiendo entre ellos el
          espacio que sobra o el que falta. Una barra de navegación, una lista de
          botones, una tarjeta con el ícono a un costado, un footer pegado abajo:
          todo eso es una dirección.
        </p>

        <p>
          Si lo que necesitás es controlar <em>filas y columnas a la vez</em>, o
          sea que las cosas se alineen tanto en horizontal como en vertical entre
          distintas líneas, eso ya es trabajo de <strong>Grid</strong> (esa
          lección todavía no está escrita). No son rivales: en una página real
          casi siempre usás Grid para el esqueleto general y Flexbox para el
          contenido de cada pieza.
        </p>

        <p>
          Se activa con un solo valor de la propiedad{" "}
          <Link href="/css/display">display</Link>, puesto en el{" "}
          <strong>contenedor</strong>, no en los hijos:
        </p>

        <Editor
          alto={170}
          consigna="Borrá la línea display: flex y mirá cómo los tres divs vuelven a apilarse uno abajo del otro."
          html={`<div class="contenedor">
  <div class="caja">uno</div>
  <div class="caja">dos</div>
  <div class="caja">tres</div>
</div>`}
          css={`.contenedor {
  display: flex;        /* la única línea que importa acá */
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
          Pasaron dos cosas de golpe. Los tres <code>&lt;div&gt;</code>, que son
          elementos de bloque y por lo tanto se apilaban, ahora están en fila. Y
          además dejaron de ocupar todo el ancho: cada uno se achicó hasta el
          tamaño de su contenido. Ninguna de las dos cosas la pediste: son las
          reglas nuevas que rigen adentro de un contenedor flex.
        </p>

        <Nota tipo="info" titulo="Flex solo alcanza a los hijos directos">
          <p>
            <code>display: flex</code> cambia cómo se acomodan los{" "}
            <strong>hijos inmediatos</strong> del contenedor. Los nietos no se
            enteran de nada: siguen en el flujo normal adentro de su propio
            padre. Por eso es tan común anidar dos contenedores flex, uno adentro
            del otro.
          </p>
        </Nota>

        <Editor
          alto={200}
          consigna="Los dos nietos siguen apilados. Agregale display: flex a .grupo y recién ahí se acomodan en fila."
          html={`<div class="contenedor">
  <div class="caja">hijo directo</div>
  <div class="grupo">
    <div class="caja">nieto</div>
    <div class="caja">nieto</div>
  </div>
</div>`}
          css={`.contenedor {
  display: flex;
  gap: 10px;
  background: #ffe0e0;
  padding: 10px;
}

.grupo {
  /* acá falta un display: flex */
  background: gold;
  padding: 6px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 12px 16px;
}`}
        />

        <p>
          También existe <code>display: inline-flex</code>: por dentro funciona
          igual, pero hacia afuera la caja se comporta como un{" "}
          <code>inline-block</code>, o sea que no corta la línea y se acomoda al
          lado del texto. Sirve para cosas chicas, tipo una etiqueta con un ícono
          y un número adentro de un párrafo.
        </p>
      </Seccion>

      <Seccion titulo="Los dos ejes: el concepto que hay que fijar">
        <p>
          Este es el único concepto de la lección que, si lo entendés bien, hace
          que todo lo demás sea acordarse de nombres. Un contenedor flex tiene{" "}
          <strong>dos ejes</strong>:
        </p>

        <ul>
          <li>
            El <strong>eje principal</strong>, que es la dirección en la que se
            van ubicando los elementos, uno detrás del otro.
          </li>
          <li>
            El <strong>eje cruzado</strong>, que es el perpendicular al
            principal.
          </li>
        </ul>

        <p>
          Cuál es cuál <strong>lo decide <code>flex-direction</code></strong>, y
          nada más que <code>flex-direction</code>. Con el valor por defecto,{" "}
          <code>row</code>, el eje principal es el horizontal. Con{" "}
          <code>column</code>, el eje principal pasa a ser el vertical y el
          cruzado el horizontal: <strong>se dan vuelta los dos</strong>.
        </p>

        <Vista
          html={`<div class="mapa">
  <div class="bloque">
    <p class="rotulo">flex-direction: row <em>(por defecto)</em></p>
    <p class="principal">← eje principal: justify-content →</p>
    <div class="demo demo-fila">
      <span>1</span><span>2</span><span>3</span>
    </div>
    <p class="cruzado">↕ eje cruzado: align-items</p>
  </div>

  <div class="bloque">
    <p class="rotulo">flex-direction: column</p>
    <p class="principal">↕ eje principal: justify-content</p>
    <div class="demo demo-columna">
      <span>1</span><span>2</span><span>3</span>
    </div>
    <p class="cruzado">← eje cruzado: align-items →</p>
  </div>
</div>`}
          css={`.mapa { display: flex; flex-wrap: wrap; gap: 14px; }

.bloque {
  flex: 1 1 250px;
  border: 1px solid #d3e0f0;
  border-radius: 8px;
  padding: 12px;
  background: #f5f8fc;
}

.rotulo { margin: 0 0 10px; font-weight: 700; font-family: ui-monospace, Consolas, monospace;
          font-size: 13px; color: #103e6b; }
.rotulo em { font-style: normal; color: #55697f; font-weight: 400; }

.principal { margin: 0 0 6px; font-size: 12px; font-weight: 700; color: #b4243a; }
.cruzado   { margin: 6px 0 0; font-size: 12px; font-weight: 700; color: #0f7a52; }

.demo { display: flex; gap: 8px; background: white; border: 1px dashed #a8c8f0; padding: 8px; }
.demo-fila { flex-direction: row; }
.demo-columna { flex-direction: column; }

.demo span {
  background: #14538f; color: white; padding: 8px 14px;
  font-weight: 700; font-size: 13px; text-align: center;
}`}
        />

        <p>
          Ahora la consecuencia práctica, que es lo que confunde a todo el mundo:{" "}
          <strong><code>justify-content</code> trabaja siempre sobre el eje
          principal</strong> y{" "}
          <strong><code>align-items</code> siempre sobre el cruzado</strong>. No
          son <em>horizontal</em> y <em>vertical</em>. Si cambiás la dirección a{" "}
          <code>column</code>, las dos propiedades siguen haciendo exactamente lo
          mismo, pero sobre el eje que ahora les toca, y visualmente parece que se
          dieron vuelta.
        </p>

        <Editor
          alto={280}
          consigna="Cambiá row por column. No toques nada más: justify-content pasa a mandar en vertical y align-items en horizontal."
          html={`<div class="contenedor">
  <div class="caja">uno</div>
  <div class="caja">dos</div>
  <div class="caja">tres</div>
</div>`}
          css={`.contenedor {
  display: flex;
  flex-direction: row;        /* ← cambiá esto por column */

  justify-content: flex-end;  /* manda sobre el eje PRINCIPAL */
  align-items: center;        /* manda sobre el eje CRUZADO */

  height: 230px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 14px 20px;
}`}
        />

        <Nota tipo="atencion" titulo="Cómo acordarse sin repasar">
          <p>
            <code>justify-</code> reparte a lo largo de la dirección en la que
            fluyen los elementos. <code>align-</code> los mueve{" "}
            <em>en la otra</em>. Si alguna vez dudás, poné un{" "}
            <code>border</code> de colores en el contenedor, cambiá{" "}
            <code>justify-content</code> a <code>flex-end</code> y mirá para dónde
            se fueron: ese es el eje principal.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Las propiedades del contenedor">
        <p>
          Son siete, contando <code>display</code>. Van todas en el padre y ya
          conocés dos. Vamos con el resto, una por una.
        </p>

        <h3>flex-direction</h3>
        <p>
          Además de <code>row</code> y <code>column</code> existen{" "}
          <code>row-reverse</code> y <code>column-reverse</code>, que invierten el
          orden visual sin tocar el HTML.
        </p>

        <Editor
          alto={190}
          consigna="Probá los cuatro valores. Con row-reverse fijate que el 1 queda a la derecha pero sigue siendo el primero para el teclado."
          html={`<div class="contenedor">
  <a href="#" class="caja">1</a>
  <a href="#" class="caja">2</a>
  <a href="#" class="caja">3</a>
</div>
<p class="ayuda">Hacé click acá adentro y después apretá Tab varias veces.</p>`}
          css={`.contenedor {
  display: flex;
  flex-direction: row;   /* row | row-reverse | column | column-reverse */
  gap: 10px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 14px 22px;
  text-decoration: none;
  font-weight: 700;
}

.ayuda { font-size: 13px; color: #55697f; }`}
        />

        <Nota tipo="atencion" titulo="El orden visual no cambia el orden real">
          <p>
            <code>row-reverse</code>, <code>column-reverse</code> y la propiedad{" "}
            <code>order</code> mueven las cajas en la pantalla, pero{" "}
            <strong>no mueven nada en el documento</strong>. El foco del teclado,
            el lector de pantalla y el orden en que se copia el texto siguen el
            HTML. Si lo que ve una persona con el mouse y lo que recorre una
            persona con Tab no coinciden, eso es un bug de accesibilidad: cuando
            el orden importa de verdad, cambialo en el HTML.
          </p>
        </Nota>

        <h3>flex-wrap</h3>
        <p>
          Por defecto vale <code>nowrap</code>: los elementos{" "}
          <strong>nunca bajan de renglón</strong>, se aprietan todo lo que haga
          falta con tal de entrar en una sola línea. Esa es la causa de la mitad
          de los diseños que se deforman en un celular.
        </p>

        <Editor
          alto={230}
          consigna="Con nowrap las cinco cajas se aplastan aunque pidan 150px. Poné wrap y mirá cómo bajan solas."
          html={`<div class="contenedor">
  <div class="caja">uno</div>
  <div class="caja">dos</div>
  <div class="caja">tres</div>
  <div class="caja">cuatro</div>
  <div class="caja">cinco</div>
</div>`}
          css={`.contenedor {
  display: flex;
  flex-wrap: nowrap;   /* nowrap | wrap | wrap-reverse */
  gap: 10px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  width: 150px;        /* lo piden, pero con nowrap no se los respeta */
  background: #14538f;
  color: white;
  padding: 14px 0;
  text-align: center;
}`}
        />

        <p>
          Vas a ver escrito el atajo <code>flex-flow</code>, que junta dirección y
          wrap en una línea: <code>flex-flow: row wrap</code>. Es correcto, pero
          se usa poco porque escribir las dos propiedades por separado se lee
          mejor.
        </p>

        <h3>justify-content</h3>
        <p>
          Reparte el espacio sobrante <strong>sobre el eje principal</strong>.
          Tiene seis valores y los tres que empiezan con <code>space-</code> se
          confunden todo el tiempo. La diferencia está en{" "}
          <strong>cuánto espacio queda contra los bordes</strong>:
        </p>

        <Editor
          alto={430}
          consigna="Mirá los tres space- juntos: between no deja aire en los bordes, around deja medio y evenly deja el mismo que entre las cajas."
          html={`<p class="rotulo">flex-start <em>(por defecto)</em></p>
<div class="fila v-start"><span>1</span><span>2</span><span>3</span></div>

<p class="rotulo">flex-end</p>
<div class="fila v-end"><span>1</span><span>2</span><span>3</span></div>

<p class="rotulo">center</p>
<div class="fila v-center"><span>1</span><span>2</span><span>3</span></div>

<p class="rotulo">space-between</p>
<div class="fila v-between"><span>1</span><span>2</span><span>3</span></div>

<p class="rotulo">space-around</p>
<div class="fila v-around"><span>1</span><span>2</span><span>3</span></div>

<p class="rotulo">space-evenly</p>
<div class="fila v-evenly"><span>1</span><span>2</span><span>3</span></div>`}
          css={`.fila {
  display: flex;
  background: #ffe0e0;
  margin-bottom: 10px;
}

.v-start   { justify-content: flex-start; }
.v-end     { justify-content: flex-end; }
.v-center  { justify-content: center; }
.v-between { justify-content: space-between; }
.v-around  { justify-content: space-around; }
.v-evenly  { justify-content: space-evenly; }

.fila span {
  background: #14538f;
  color: white;
  padding: 10px 18px;
  font-weight: 700;
}

.rotulo { margin: 0 0 3px; font-size: 12px; font-family: ui-monospace, Consolas, monospace;
          color: #103e6b; font-weight: 700; }
.rotulo em { font-style: normal; color: #55697f; font-weight: 400; }`}
        />

        <ul>
          <li>
            <code>space-between</code> — el primero pega contra un borde, el
            último contra el otro, y todo el sobrante se reparte{" "}
            <em>entre</em> ellos. Es el más usado de los tres.
          </li>
          <li>
            <code>space-around</code> — cada elemento recibe la misma cantidad de
            espacio a cada lado, así que el hueco del medio termina midiendo el
            doble que el de los bordes. Casi nunca es lo que querés.
          </li>
          <li>
            <code>space-evenly</code> — todos los huecos miden igual, incluidos
            los de los bordes.
          </li>
        </ul>

        <Nota tipo="info" titulo="flex-start contra start">
          <p>
            También podés escribir <code>start</code>, <code>end</code> y{" "}
            <code>center</code> a secas: son los valores del estándar nuevo de
            alineación, que vale para flex y para grid por igual. Los{" "}
            <code>flex-start</code> y <code>flex-end</code> son los viejos, solo
            de flex, y siguen siendo los más compatibles. Cualquiera de los dos
            anda; lo importante es no mezclarlos en el mismo proyecto.
          </p>
        </Nota>

        <h3>align-items</h3>
        <p>
          Lo mismo pero <strong>sobre el eje cruzado</strong>. El valor por
          defecto es <code>stretch</code>, y explica un comportamiento que
          sorprende: en una fila, todas las cajas salen con la altura de la más
          alta aunque no se lo hayas pedido a nadie.
        </p>

        <Editor
          alto={260}
          consigna="Probá los cinco valores. Prestale atención a baseline: alinea por el renglón del texto, no por el borde de la caja."
          html={`<div class="contenedor">
  <div class="caja chica">chica</div>
  <div class="caja grande">grande</div>
  <div class="caja">dos<br>renglones</div>
</div>`}
          css={`.contenedor {
  display: flex;
  align-items: stretch;   /* stretch | flex-start | flex-end | center | baseline */
  gap: 10px;
  height: 200px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 12px 18px;
}

.chica  { font-size: 12px; }
.grande { font-size: 26px; }`}
        />

        <Nota tipo="atencion" titulo="stretch se pierde apenas fijás una altura">
          <p>
            <code>stretch</code> solo estira a los elementos que{" "}
            <strong>no tienen medida propia</strong> en el eje cruzado. Si a una
            caja le ponés <code>height: 60px</code>, esa caja deja de estirarse y
            queda alineada al principio. Es la explicación de la mitad de los{" "}
            <em>por qué esta tarjeta no es igual de alta que las otras</em>.
          </p>
        </Nota>

        <h3>align-content</h3>
        <p>
          Esta es la que más cuesta. <code>align-content</code>{" "}
          <strong>no alinea elementos: alinea líneas</strong>. Solo tiene sentido
          cuando se cumplen dos condiciones a la vez: que haya{" "}
          <code>flex-wrap: wrap</code> y que las líneas resultantes ocupen menos
          que el contenedor en el eje cruzado. Si el contenedor no tiene altura de
          sobra, no vas a ver ninguna diferencia.
        </p>

        <Editor
          alto={320}
          consigna="Probá center y space-between. Después sacale flex-wrap: wrap al contenedor y fijate que align-content deja de hacer efecto."
          html={`<div class="contenedor">
  <div class="caja">uno</div>
  <div class="caja">dos</div>
  <div class="caja">tres</div>
  <div class="caja">cuatro</div>
  <div class="caja">cinco</div>
</div>`}
          css={`.contenedor {
  display: flex;
  flex-wrap: wrap;             /* sin esto no hay líneas que alinear */
  align-content: flex-start;   /* flex-start | center | flex-end |
                                  space-between | space-around | stretch */
  gap: 10px;
  height: 280px;               /* y sin altura de sobra tampoco se nota */
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  width: 120px;
  background: #14538f;
  color: white;
  padding: 14px 0;
  text-align: center;
}`}
        />

        <Comparacion>
          <Columna tono="mal" titulo="Lo que se suele confundir">
            <p>
              <code>align-items</code> mueve <strong>cada elemento</strong>{" "}
              dentro de su propia línea.
            </p>
            <Codigo
              archivo="estilos.css"
              codigo={`/* Con una sola línea de elementos,
   align-content no hace nada.
   La que querías era align-items. */
.galeria {
  display: flex;
  align-content: center;
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Cuándo va cada una">
            <p>
              <code>align-content</code> mueve{" "}
              <strong>el bloque de líneas entero</strong>.
            </p>
            <Codigo
              archivo="estilos.css"
              codigo={`.galeria {
  display: flex;
  flex-wrap: wrap;
  align-items: center;    /* dentro de cada línea */
  align-content: center;  /* el conjunto de líneas */
  height: 400px;
}`}
            />
          </Columna>
        </Comparacion>

        <h3>gap</h3>
        <p>
          Separa a los elementos entre sí <strong>sin agregar espacio en los
          bordes</strong> y sin tocar el primero ni el último. Antes de que
          existiera había que hacer malabares con <code>margin</code> y después
          anular el del último con <code>:last-child</code>. Hoy es una línea.
        </p>

        <Editor
          alto={250}
          consigna="Cambiá gap: 14px 40px por un solo valor y mirá la diferencia. Con dos valores, el primero es entre filas y el segundo entre columnas."
          html={`<div class="contenedor">
  <div class="caja">uno</div>
  <div class="caja">dos</div>
  <div class="caja">tres</div>
  <div class="caja">cuatro</div>
</div>`}
          css={`.contenedor {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 40px;     /* fila columna. También: row-gap y column-gap */
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  width: 130px;
  background: #14538f;
  color: white;
  padding: 14px 0;
  text-align: center;
}`}
        />

        <Nota tipo="info" titulo="gap contra margin">
          <p>
            <code>gap</code> vive en el contenedor, así que la separación es una
            decisión del layout y no de cada hijo. Eso hace que los componentes
            sean reusables: la misma tarjeta puede ir con 8px de separación en un
            lado y 24px en otro sin cambiarle una sola línea de CSS. Cuando veas
            un componente con <code>margin-right: 12px</code> adentro, casi
            siempre está mal puesto y el arreglo es un <code>gap</code> en el
            padre.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El tablero de control">
        <p>
          Todo lo anterior junto, en un solo contenedor, con la lista de valores
          posibles escrita al lado de cada propiedad. Cambiá de a una y mirá qué
          se mueve. Es la forma más rápida de que se te fije: cinco minutos acá
          valen más que releer la sección de arriba.
        </p>

        <Editor
          alto={380}
          consigna="Empezá por flex-direction: column, que da vuelta el significado de justify-content y de align-items al mismo tiempo."
          html={`<div class="tablero">
  <div class="caja">uno</div>
  <div class="caja alta">dos<br>más<br>alto</div>
  <div class="caja">tres</div>
  <div class="caja ancha">cuatro, bastante más ancho</div>
  <div class="caja">cinco</div>
</div>`}
          css={`.tablero {
  display: flex;                 /* flex | inline-flex */

  flex-direction: row;           /* row | row-reverse | column | column-reverse */
  flex-wrap: wrap;               /* nowrap | wrap | wrap-reverse */

  justify-content: flex-start;   /* flex-start | flex-end | center |
                                    space-between | space-around | space-evenly */
  align-items: stretch;          /* stretch | flex-start | flex-end |
                                    center | baseline */
  align-content: flex-start;     /* flex-start | flex-end | center | space-between |
                                    space-around | space-evenly | stretch */
  gap: 10px;                     /* un valor, o dos: fila columna */

  /* Nada de esto es Flexbox: es para que se vea el contenedor. */
  height: 320px;
  background: #ffe0e0;
  padding: 10px;
  border: 2px dashed #b4243a;
}

.caja {
  background: #14538f;
  color: white;
  padding: 12px 16px;
  text-align: center;
}

.alta  { background: #0f7a52; }
.ancha { background: #92600a; }`}
        />
      </Seccion>

      <Seccion titulo="Las propiedades de los hijos">
        <p>
          Hasta acá le dimos órdenes al contenedor sobre todos sus hijos a la vez.
          Ahora vamos al otro lado: las propiedades que van{" "}
          <strong>en cada elemento</strong> y le dicen cómo comportarse frente al
          espacio que sobra o falta.
        </p>

        <h3>flex-grow: cómo repartir lo que sobra</h3>
        <p>
          Vale <code>0</code> por defecto, o sea{" "}
          <em>no crezcas</em>. Cuando le ponés un número, ese número es una{" "}
          <strong>proporción</strong>, no un tamaño: si hay tres elementos con{" "}
          <code>1</code>, <code>1</code> y <code>2</code>, el espacio sobrante se
          parte en cuatro y el último se lleva la mitad.
        </p>

        <Editor
          alto={210}
          consigna="Poné flex-grow: 1 en las tres cajas y quedan iguales de ancho. Después subile a 3 solo a la del medio."
          html={`<div class="contenedor">
  <div class="caja uno">grow: 0</div>
  <div class="caja dos">grow: 1</div>
  <div class="caja tres">grow: 2</div>
</div>`}
          css={`.contenedor {
  display: flex;
  gap: 10px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 14px 10px;
  text-align: center;
}

.uno  { flex-grow: 0; }   /* el valor por defecto: se queda con su tamaño */
.dos  { flex-grow: 1; }   /* se lleva 1 de cada 3 partes del sobrante */
.tres { flex-grow: 2; }   /* se lleva 2 de cada 3 */`}
        />

        <h3>flex-shrink y flex-basis</h3>
        <p>
          <code>flex-shrink</code> es el espejo: vale <code>1</code> por defecto,
          o sea que <strong>todos los elementos aceptan achicarse</strong> cuando
          no entran. Ponerle <code>0</code> a uno es la forma de decir{" "}
          <em>a este no lo toques</em>, y es lo que salva a los logos, a los
          íconos y a las barras laterales.
        </p>
        <p>
          <code>flex-basis</code> es el tamaño <em>de partida</em> sobre el eje
          principal, antes de crecer o achicarse. Con el valor por defecto,{" "}
          <code>auto</code>, ese punto de partida es el <code>width</code> del
          elemento o, si no tiene, el tamaño de su contenido. Y algo importante:{" "}
          <strong>si hay <code>flex-basis</code>, le gana al{" "}
          <code>width</code></strong>.
        </p>

        <Editor
          alto={230}
          consigna="Achicá el ancho del contenedor a 300px y mirá cuál de las tres cajas no cede un píxel."
          html={`<div class="contenedor">
  <div class="caja fija">shrink: 0</div>
  <div class="caja">shrink: 1</div>
  <div class="caja">shrink: 1</div>
</div>`}
          css={`.contenedor {
  display: flex;
  gap: 10px;
  width: 100%;          /* probá 300px */
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  flex-basis: 220px;    /* punto de partida, no un ancho fijo */
  background: #14538f;
  color: white;
  padding: 14px 10px;
  text-align: center;
}

.fija {
  flex-shrink: 0;       /* este se planta en 220px y no se mueve */
  background: #0f7a52;
}`}
        />

        <h3>El atajo flex</h3>
        <p>
          En la vida real casi nadie escribe las tres propiedades por separado: se
          usa el atajo <code>flex</code>. Lo que hay que saber es que{" "}
          <strong>el atajo reescribe las tres</strong>, incluso las que no
          pusiste, y que los valores que rellena no son los mismos que los valores
          por defecto.
        </p>

        <Codigo
          archivo="atajos.css"
          resaltar={[4]}
          codigo={`/*              grow   shrink   basis                      */
flex: initial;   /*  0      1        auto   ← el estado por defecto   */
flex: none;      /*  0      0        auto   ← no crece ni se achica   */
flex: 1;         /*  1      1        0%     ← ojo con este            */
flex: 2;         /*  2      1        0%                               */
flex: auto;      /*  1      1        auto                             */
flex: 1 1 200px; /*  los tres escritos a mano                         */`}
        />

        <p>
          El renglón marcado es el que sorprende:{" "}
          <strong><code>flex: 1</code> equivale a{" "}
          <code>flex: 1 1 0%</code></strong>. Ese <code>0%</code> significa{" "}
          <em>arrancá midiendo cero y después repartí</em>, así que el contenido
          deja de importar y todos los elementos terminan del mismo ancho. Con{" "}
          <code>flex: auto</code>, en cambio, cada uno arranca midiendo lo que
          mide su contenido y solo se reparte el sobrante: los anchos quedan
          distintos.
        </p>

        <Editor
          alto={260}
          consigna="Las dos filas tienen el mismo texto. Cambiá flex: auto por flex: 1 en la segunda y mirá cómo se emparejan."
          html={`<p class="rotulo">flex: 1 — todos iguales, el contenido no importa</p>
<div class="fila a">
  <div class="caja">ok</div>
  <div class="caja">un texto bastante más largo que el resto</div>
  <div class="caja">medio</div>
</div>

<p class="rotulo">flex: auto — cada uno arranca con lo que mide su contenido</p>
<div class="fila b">
  <div class="caja">ok</div>
  <div class="caja">un texto bastante más largo que el resto</div>
  <div class="caja">medio</div>
</div>`}
          css={`.fila {
  display: flex;
  gap: 10px;
  background: #ffe0e0;
  padding: 10px;
  margin-bottom: 14px;
}

.a .caja { flex: 1; }      /* = 1 1 0%   */
.b .caja { flex: auto; }   /* = 1 1 auto */

.caja {
  background: #14538f;
  color: white;
  padding: 12px;
  text-align: center;
  font-size: 14px;
}

.rotulo { margin: 0 0 4px; font-size: 12px; font-family: ui-monospace, Consolas, monospace;
          color: #103e6b; font-weight: 700; }`}
        />

        <Nota tipo="info" titulo="El combo que más se usa">
          <p>
            <code>flex: 1 1 280px</code> es la receta de las grillas de tarjetas:{" "}
            <em>quiero 280px, pero si no entran crecé o achicate</em>. Combinado
            con <code>flex-wrap: wrap</code> te da un diseño que se adapta solo,
            sin escribir una sola media query.
          </p>
        </Nota>

        <h3>align-self y order</h3>
        <p>
          <code>align-self</code> es la excepción a <code>align-items</code>: el
          contenedor dice cómo se alinean todos y un hijo puede desobedecer.{" "}
          <code>order</code> cambia la posición visual de un elemento sin tocar el
          HTML; por defecto todos valen <code>0</code> y se ordenan como están
          escritos.
        </p>

        <Editor
          alto={250}
          consigna="Poné order: -1 en la caja azul: se va al principio sin moverse del HTML. Y probá align-self: flex-end en otra."
          html={`<div class="contenedor">
  <div class="caja">uno</div>
  <div class="caja especial">dos (rebelde)</div>
  <div class="caja">tres</div>
  <div class="caja">cuatro</div>
</div>`}
          css={`.contenedor {
  display: flex;
  align-items: flex-start;   /* la orden general para todos */
  gap: 10px;
  height: 200px;
  background: #ffe0e0;
  padding: 10px;
}

.caja {
  background: #14538f;
  color: white;
  padding: 12px 16px;
}

.especial {
  align-self: center;   /* stretch | flex-start | flex-end | center | baseline */
  order: 0;             /* probá -1, o 1 */
  background: #0f7a52;
}`}
        />

        <Nota tipo="atencion" titulo="Los márgenes auto son un truco excelente">
          <p>
            Adentro de un contenedor flex, un <code>margin</code> en{" "}
            <code>auto</code> se come <strong>todo el espacio libre de ese
            lado</strong>. <code>margin-left: auto</code> empuja un elemento
            contra la derecha, <code>margin-top: auto</code> lo empuja contra
            abajo, y <code>margin: auto</code> lo centra en los dos ejes a la vez.
            Son la herramienta correcta cuando querés mover{" "}
            <em>un solo elemento</em> y <code>justify-content</code> los mueve a
            todos.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El bug del desborde horizontal: min-width: 0">
        <p>
          Este merece su propia sección porque es, lejos, el problema más común de
          Flexbox y el que más tiempo hace perder. La regla escondida es esta:
        </p>

        <Nota tipo="atencion" titulo="Un item de flex no se achica por debajo de su contenido">
          <p>
            El tamaño mínimo automático de un elemento flex no es cero: es{" "}
            <code>min-width: auto</code>, que significa{" "}
            <em>el tamaño de mi contenido</em>. Por eso un{" "}
            <code>flex: 1</code> que por dentro tiene una URL larga, un nombre de
            archivo sin espacios, una tabla o un{" "}
            <code>white-space: nowrap</code> <strong>se niega a achicarse</strong>{" "}
            y empuja al contenedor hasta que aparece la barra de scroll horizontal
            de toda la página.
          </p>
          <p>
            El arreglo es una línea: <code>min-width: 0</code> en el item que
            tiene que poder achicarse (o <code>min-height: 0</code> si la
            dirección es <code>column</code>). Con eso volvés al comportamiento
            que esperabas.
          </p>
        </Nota>

        <p>
          Las dos vistas de abajo tienen exactamente el mismo HTML y el mismo CSS,
          salvo una línea. Mirá la barra de scroll horizontal que aparece en la
          primera:
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Sin min-width: 0">
            <Vista
              alto={150}
              html={`<div class="fila">
  <div class="avatar">MB</div>
  <div class="texto">
    <p class="nombre">Matías</p>
    <p class="mensaje">te-mando-el-informe-trimestral-consolidado-final-v3.pdf</p>
  </div>
</div>`}
              css={`body { padding: 10px; }

.fila {
  display: flex;
  gap: 10px;
  border: 2px solid #b4243a;
  padding: 8px;
}

.texto {
  flex: 1;
  /* falta min-width: 0 */
}

.avatar {
  flex-shrink: 0;
  width: 40px; height: 40px;
  border-radius: 50%;
  background: #14538f; color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
}

.nombre  { margin: 0; font-weight: 700; font-size: 14px; }
.mensaje { margin: 0; font-size: 13px; color: #55697f;
           white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`}
            />
            <p className="tenue">
              El <code>text-overflow: ellipsis</code> no se aplica nunca, porque
              la caja jamás llega a ser más chica que su texto.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Con min-width: 0">
            <Vista
              alto={150}
              html={`<div class="fila">
  <div class="avatar">MB</div>
  <div class="texto">
    <p class="nombre">Matías</p>
    <p class="mensaje">te-mando-el-informe-trimestral-consolidado-final-v3.pdf</p>
  </div>
</div>`}
              css={`body { padding: 10px; }

.fila {
  display: flex;
  gap: 10px;
  border: 2px solid #0f7a52;
  padding: 8px;
}

.texto {
  flex: 1;
  min-width: 0;    /* ← la única diferencia */
}

.avatar {
  flex-shrink: 0;
  width: 40px; height: 40px;
  border-radius: 50%;
  background: #14538f; color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
}

.nombre  { margin: 0; font-weight: 700; font-size: 14px; }
.mensaje { margin: 0; font-size: 13px; color: #55697f;
           white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`}
            />
            <p className="tenue">
              Ahora sí: la caja se achica, el texto se corta y aparecen los tres
              puntos.
            </p>
          </Columna>
        </Comparacion>

        <p>
          Guardate el síntoma: <strong>si tu página tiene scroll horizontal y no
          entendés por qué, buscá un contenedor flex y probá ponerle{" "}
          <code>min-width: 0</code> al hijo que crece</strong>. Ocho de cada diez
          veces es eso. Las otras dos, un <code>overflow-x: hidden</code> puesto
          para tapar el problema en vez de arreglarlo.
        </p>
      </Seccion>

      <Seccion titulo="Cinco patrones que vas a repetir siempre">
        <p>
          Con lo de arriba ya sabés Flexbox. Lo que sigue son las cinco recetas
          concretas que vas a escribir en cada proyecto de tu vida. Vale la pena
          que las reconozcas de memoria.
        </p>

        <h3>1. Centrar algo, de una vez por todas</h3>
        <p>
          Centrar en vertical era, literalmente, un chiste recurrente entre
          desarrolladores. Hoy son tres líneas.
        </p>

        <Editor
          alto={260}
          consigna="Cambiá el texto del centro por uno larguísimo, o agregale una imagen: sigue centrado sin tocar nada."
          html={`<div class="pantalla">
  <div class="cartel">Estoy centrado</div>
</div>`}
          css={`.pantalla {
  display: flex;
  justify-content: center;   /* eje principal: horizontal */
  align-items: center;       /* eje cruzado: vertical */

  height: 230px;
  background: #ffe0e0;
}

.cartel {
  background: #14538f;
  color: white;
  padding: 16px 26px;
}

/* La alternativa, si el contenedor ya es flex por otra razón:
   .cartel { margin: auto; }  ← centra en los dos ejes a la vez */`}
        />

        <h3>2. Barra de navegación: logo a la izquierda, enlaces a la derecha</h3>

        <Editor
          alto={200}
          consigna="Borrá margin-right: auto del logo y poné justify-content: space-between en .nav: mismo resultado, otro camino."
          html={`<nav class="nav">
  <a class="logo" href="#">Laboratorio</a>
  <a href="#">Lecciones</a>
  <a href="#">Desafíos</a>
  <a class="boton" href="#">Entrar</a>
</nav>`}
          css={`.nav {
  display: flex;
  align-items: center;   /* todo alineado al medio en vertical */
  gap: 20px;
  padding: 12px 18px;
  background: #14538f;
}

.logo {
  margin-right: auto;    /* se come todo el sobrante y empuja al resto */
  font-weight: 700;
  font-size: 18px;
}

.nav a { color: white; text-decoration: none; font-size: 14px; }

.nav a.boton {          /* dos clases: le gana a .nav a sin usar !important */
  background: white;
  color: #14538f;
  padding: 7px 14px;
  border-radius: 6px;
  font-weight: 700;
}`}
        />

        <p>
          Los dos caminos funcionan, pero no son iguales.{" "}
          <code>space-between</code> reparte el sobrante entre{" "}
          <em>todos</em> los huecos, así que sirve cuando hay exactamente dos
          grupos. El <code>margin-right: auto</code> pone todo el sobrante en{" "}
          <strong>un solo lugar</strong>, y por eso es el que aguanta cuando
          mañana aparece un tercer grupo en el medio.
        </p>

        <h3>3. Una fila de tarjetas que baja de línea sola</h3>

        <Editor
          alto={330}
          consigna="Cambiá el 200px del flex por 320px y mirá cuántas tarjetas entran ahora por fila. Ni una media query."
          html={`<div class="grilla">
  <article class="tarjeta"><h4>HTML</h4><p>La estructura.</p></article>
  <article class="tarjeta"><h4>CSS</h4><p>La presentación.</p></article>
  <article class="tarjeta"><h4>JavaScript</h4><p>El comportamiento.</p></article>
  <article class="tarjeta"><h4>React</h4><p>Componentes.</p></article>
  <article class="tarjeta"><h4>Redux</h4><p>Estado global.</p></article>
</div>`}
          css={`.grilla {
  display: flex;
  flex-wrap: wrap;   /* sin esto se aplastan todas en una línea */
  gap: 14px;
}

.tarjeta {
  flex: 1 1 200px;   /* quiero 200px; si no entran, crecé o achicate */
  background: white;
  border: 1px solid #d3e0f0;
  border-top: 3px solid #14538f;
  border-radius: 8px;
  padding: 12px 14px;
}

.tarjeta h4 { margin: 0 0 4px; color: #103e6b; }
.tarjeta p  { margin: 0; font-size: 13px; color: #55697f; }`}
        />

        <Nota tipo="info" titulo="El detalle del último renglón">
          <p>
            Con <code>flex-grow</code>, las tarjetas que quedan solas en la última
            línea se estiran para llenarla, así que no siempre quedan del mismo
            ancho que las de arriba. Si querés que todas midan exactamente igual,
            poné <code>flex: 0 1 200px</code> (que no crezcan) y asumí el hueco a
            la derecha, o pasate a Grid, que resuelve justo este caso con{" "}
            <code>repeat(auto-fill, minmax(200px, 1fr))</code>.
          </p>
        </Nota>

        <h3>4. El footer pegado abajo aunque no haya contenido</h3>
        <p>
          El clásico: una página con poco contenido y el footer flotando en el
          medio de la pantalla, con un vacío blanco debajo. La solución es hacer
          que el contenedor de toda la página sea una columna flex de altura
          mínima igual a la pantalla, y empujar el footer con{" "}
          <code>margin-top: auto</code>.
        </p>

        <Editor
          alto={330}
          consigna="Borrá margin-top: auto del footer y mirá cómo se sube. Después agregá párrafos al main hasta que baje solo."
          html={`<div class="pagina">
  <header>Encabezado</header>
  <main>
    <p>Muy poquito contenido.</p>
  </main>
  <footer>Footer pegado abajo</footer>
</div>`}
          css={`body { padding: 0; }

.pagina {
  display: flex;
  flex-direction: column;
  min-height: 100vh;       /* al menos el alto de la pantalla */
}

footer {
  margin-top: auto;        /* se come todo el sobrante de arriba */
  background: #14538f;
  color: white;
  padding: 14px 16px;
}

header { background: #e4eefb; padding: 14px 16px; font-weight: 700; }
main   { padding: 14px 16px; }`}
        />

        <p>
          La variante que también vas a ver es ponerle{" "}
          <code>flex: 1</code> al <code>&lt;main&gt;</code> en vez de{" "}
          <code>margin-top: auto</code> al footer. Hacen lo mismo, con una
          diferencia: con <code>flex: 1</code> el <code>&lt;main&gt;</code> crece
          de verdad, así que un fondo de color le queda hasta abajo. Con el{" "}
          <code>margin-top: auto</code> el sobrante queda vacío.
        </p>

        <h3>5. Barra lateral fija con el contenido flexible al lado</h3>

        <Editor
          alto={300}
          consigna="Sacale flex-shrink: 0 a la barra y mirá cómo se empieza a achicar cuando el contenido empuja."
          html={`<div class="layout">
  <aside class="barra">
    <p>Barra</p>
    <p>272px siempre</p>
  </aside>
  <main class="contenido">
    <h4>Contenido</h4>
    <p>Yo me quedo con todo lo que sobra, sea mucho o poco.</p>
  </main>
</div>`}
          css={`body { padding: 0; }

.layout {
  display: flex;
  min-height: 250px;
}

.barra {
  width: 272px;
  flex-shrink: 0;      /* la barra NO se achica nunca */
  background: #e4eefb;
  padding: 14px;
}

.contenido {
  flex: 1;             /* se queda con todo el resto */
  min-width: 0;        /* y puede achicarse si adentro hay algo largo */
  padding: 14px;
}

.barra p { margin: 0 0 6px; font-size: 13px; }
h4 { margin: 0 0 6px; }`}
        />

        <Nota tipo="ok" titulo="Este mismo sitio está armado así">
          <p>
            El layout general del laboratorio —la barra de la izquierda con las
            lecciones y esta columna de texto— es exactamente ese patrón. Abrí{" "}
            <code>app/globals.css</code> y buscá la clase{" "}
            <code>.layout</code>:
          </p>
          <Codigo
            archivo="app/globals.css"
            codigo={`.layout {
  display: flex;
  min-height: 100vh;
}

.contenido {
  flex: 1;
  min-width: 0;     /* el min-width: 0 de la sección anterior, en vivo */
  padding: 40px 32px 96px;
}

.barra {
  width: var(--ancho-barra);
  flex-shrink: 0;
}

/* Y en pantallas angostas, una sola línea da vuelta todo el layout: */
@media (max-width: 900px) {
  .layout { flex-direction: column; }
}`}
          />
          <p>
            Fijate el detalle del final: pasar de barra lateral a barra de arriba
            en un celular es <strong>una sola propiedad</strong>. Eso es lo que
            hace que Flexbox valga la pena.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <p>
          Dos ejercicios para resolver vos. Escribilos en cualquiera de los
          editores de arriba —el botón <em>reiniciar</em> te devuelve el original—
          y recién después mirá la solución.
        </p>

        <Desafio
          titulo="1. Una barra de navegación de tres zonas"
          pista={
            <div>
              <p>
                Son tres grupos: el logo, el buscador y los botones. El logo y los
                botones tienen que medir lo que miden, así que van con{" "}
                <code>flex-shrink: 0</code>. El buscador es el único que tiene que
                crecer y achicarse: <code>flex: 1</code>.
              </p>
              <p>
                Cuando lo pruebes con un texto largo adentro del buscador te va a
                desbordar. Ahí es donde entra la propiedad de la sección del bug.
              </p>
            </div>
          }
          solucion={
            <Editor
              alto={230}
              consigna="Sacale min-width: 0 al buscador y después achicá el ancho de .nav a 400px: ahí ves el desborde."
              html={`<nav class="nav">
  <a class="logo" href="#">Lab</a>
  <input class="buscar" type="search" placeholder="Buscar en las lecciones...">
  <div class="acciones">
    <button>Ayuda</button>
    <button class="primario">Entrar</button>
  </div>
</nav>`}
              css={`.nav {
  display: flex;
  align-items: center;   /* todo al medio en vertical */
  gap: 14px;
  padding: 10px 14px;
  background: #14538f;
}

.logo {
  flex-shrink: 0;        /* el logo nunca se deforma */
  color: white;
  font-weight: 700;
  text-decoration: none;
}

.buscar {
  flex: 1;               /* = 1 1 0%: se queda con todo el sobrante */
  min-width: 0;          /* y puede achicarse de verdad */
  font: inherit;
  padding: 7px 10px;
  border: 0;
  border-radius: 6px;
}

.acciones {
  display: flex;         /* un flex adentro del otro */
  flex-shrink: 0;        /* los botones tampoco se achican */
  gap: 8px;
}

.acciones button {
  font: inherit;
  font-size: 14px;
  padding: 7px 12px;
  border: 1px solid white;
  border-radius: 6px;
  background: transparent;
  color: white;
  cursor: pointer;
}

.primario { background: white; color: #14538f; font-weight: 700; }`}
            />
          }
        >
          <p>
            Armá una barra con tres zonas: el <strong>logo</strong> a la
            izquierda, un <strong>buscador</strong> en el medio que se lleve todo
            el espacio sobrante, y a la derecha un grupo de{" "}
            <strong>dos botones</strong>. Tiene que cumplir tres condiciones:
          </p>
          <ol>
            <li>Todo alineado al centro en vertical.</li>
            <li>
              Cuando la barra se angosta, el único que se achica es el buscador:
              ni el logo ni los botones pierden un píxel.
            </li>
            <li>
              Aunque el buscador se achique mucho, <strong>nada desborda</strong>{" "}
              hacia afuera de la barra.
            </li>
          </ol>
        </Desafio>

        <Desafio
          titulo="2. Tarjetas parejas con el botón siempre abajo"
          pista={
            <div>
              <p>
                Vas a necesitar <strong>dos contenedores flex anidados</strong>:
                el de afuera acomoda las tarjetas en fila con{" "}
                <code>wrap</code>, y cada tarjeta por dentro es{" "}
                <code>flex-direction: column</code>.
              </p>
              <p>
                Que todas las tarjetas queden igual de altas es gratis: es el{" "}
                <code>align-items: stretch</code> que viene por defecto. Lo que
                tenés que resolver es el botón, y la herramienta es la misma que
                usaste para el footer.
              </p>
            </div>
          }
          solucion={
            <div>
              <p>
                La clave son tres líneas: <code>display: flex</code> +{" "}
                <code>flex-direction: column</code> en la tarjeta, y{" "}
                <code>margin-top: auto</code> en el botón, que se come todo el
                espacio sobrante de arriba y queda pegado al piso.
              </p>
              <Editor
                alto={400}
                consigna="Borrá margin-top: auto de .tarjeta .boton y mirá cómo los tres botones quedan a distinta altura."
                html={`<div class="grilla">
  <article class="tarjeta">
    <h4>Básico</h4>
    <p>Lo mínimo para arrancar.</p>
    <button class="boton">Elegir</button>
  </article>
  <article class="tarjeta">
    <h4>Completo</h4>
    <p>Una descripción bastante más larga, que hace que esta tarjeta
       tenga más texto que las otras dos y arrastre la altura.</p>
    <button class="boton">Elegir</button>
  </article>
  <article class="tarjeta">
    <h4>Pro</h4>
    <p>Todo.</p>
    <button class="boton">Elegir</button>
  </article>
</div>`}
                css={`body { padding: 12px; }

.grilla {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: stretch;   /* es el valor por defecto: las tarjetas quedan parejas */
}

.tarjeta {
  flex: 1 1 200px;

  display: flex;            /* cada tarjeta es, por dentro, otro flex */
  flex-direction: column;   /* y esta vez el eje principal es el vertical */

  background: white;
  border: 1px solid #d3e0f0;
  border-top: 3px solid #14538f;
  border-radius: 8px;
  padding: 14px;
}

.tarjeta h4 { margin: 0 0 6px; color: #103e6b; }
.tarjeta p  { margin: 0 0 14px; font-size: 13px; color: #55697f; }

.tarjeta .boton {
  margin-top: auto;   /* se come el sobrante y empuja el botón hasta abajo */
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
            Armá una fila de tres tarjetas de precios donde cada una tenga un
            título, una descripción de largo distinto y un botón al final. Tienen
            que cumplir tres cosas:
          </p>
          <ol>
            <li>Las tres quedan de la misma altura, la de la más larga.</li>
            <li>
              Los tres botones quedan alineados{" "}
              <strong>al ras del piso de la tarjeta</strong>, sin importar cuánto
              texto tenga cada una.
            </li>
            <li>En una pantalla angosta, las tarjetas bajan de renglón solas.</li>
          </ol>
          <p className="tenue">
            Pista de arranque: la altura pareja no hay que programarla, ya viene
            puesta. Repasá <Link href="/css/caja">el modelo de caja</Link> si
            dudás de dónde sale el padding de la tarjeta.
          </p>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
