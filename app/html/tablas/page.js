import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "Tablas" };

export default function Pagina() {
  return (
    <Leccion
      slug="/html/tablas"
      titulo="Tablas"
      resumen="Tablas de datos bien armadas, accesibles y responsive. Y cuándo no usar una tabla."
    >
      <Seccion titulo="Una tabla es para datos, no para acomodar cosas">
        <p>
          Una tabla sirve cuando tus datos tienen <strong>dos dimensiones</strong>:
          cada fila es una cosa y cada columna es una propiedad de esa cosa. El
          test rápido: si podés leer un dato en voz alta como{" "}
          <em>&ldquo;la comisión 2 tiene 34 inscriptos&rdquo;</em> cruzando una
          fila con una columna, es una tabla. Si no cruza nada, no lo es.
        </p>

        <p>
          La tabla más chica que existe son tres etiquetas:{" "}
          <code>{"<table>"}</code> envuelve todo, <code>{"<tr>"}</code> es una
          fila (<em>table row</em>) y <code>{"<td>"}</code> es una celda de datos
          (<em>table data</em>). Las columnas no se declaran en ningún lado: el
          navegador cuenta cuántos <code>{"<td>"}</code> hay en cada fila y arma
          la grilla solo.
        </p>

        <Editor
          consigna="Agregá una cuarta fila con otro alumno. Después borrale una celda a una fila y mirá el agujero que queda."
          html={`<table>
  <tr>
    <td>Alumno</td>
    <td>Comisión</td>
    <td>Nota</td>
  </tr>
  <tr>
    <td>Belén Ortiz</td>
    <td>2</td>
    <td>8</td>
  </tr>
  <tr>
    <td>Marcos Ruiz</td>
    <td>1</td>
    <td>6</td>
  </tr>
</table>`}
          css={`table {
  border-collapse: collapse;
}

td {
  border: 1px solid #b9c6d6;
  padding: 6px 12px;
}`}
        />

        <p>
          Esa tabla se ve bien y está mal. La primera fila son títulos, pero
          están escritos como <code>{"<td>"}</code>: para el navegador
          &ldquo;Alumno&rdquo; es un dato más, igual que &ldquo;8&rdquo;. Eso lo
          arreglamos en un rato. Primero sacate de encima el uso equivocado más
          famoso.
        </p>

        <Nota tipo="atencion" titulo="Maquetar con tablas: no">
          <p>
            En los 90 no había forma de poner dos cosas una al lado de la otra,
            así que se armaban páginas enteras con tablas invisibles: una fila
            para el encabezado, una fila con tres celdas para menú, contenido y
            publicidad, otra fila para el pie. Lo vas a seguir viendo en
            plantillas viejas y en mails HTML (ahí todavía hace falta, porque los
            clientes de correo no soportan CSS moderno). En una página web de hoy
            eso es <Link href="/css/flexbox">Flexbox</Link> o{" "}
            <Link href="/css/grid">Grid</Link>.
          </p>
        </Nota>

        <Comparacion>
          <Columna tono="mal" titulo="Layout con tabla">
            <Codigo
              archivo="index.html"
              codigo={`<table>
  <tr>
    <td colspan="2">Mi sitio</td>
  </tr>
  <tr>
    <td>Menú</td>
    <td>Contenido</td>
  </tr>
</table>`}
            />
            <p className="tenue">
              Un lector de pantalla anuncia &ldquo;tabla de 2 filas por 2
              columnas&rdquo; y se pone a leer celdas. No se puede reordenar en
              el celular. Y el orden visual queda clavado al orden del HTML.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Layout con Grid">
            <Codigo
              archivo="index.html"
              codigo={`<header>Mi sitio</header>
<div class="cuerpo">
  <nav>Menú</nav>
  <main>Contenido</main>
</div>

<style>
  .cuerpo {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
</style>`}
            />
            <p className="tenue">
              Cada etiqueta dice qué es (eso es{" "}
              <Link href="/html/semantica">HTML semántico</Link>) y el acomodo lo
              hace el CSS, que sí se puede cambiar según el tamaño de pantalla.
            </p>
          </Columna>
        </Comparacion>
      </Seccion>

      <Seccion titulo="La estructura completa">
        <p>
          Además de <code>table</code>, <code>tr</code> y <code>td</code> hay
          cuatro piezas más, y ninguna es decorativa:
        </p>

        <ul>
          <li>
            <code>{"<caption>"}</code> — el título de la tabla. Va como{" "}
            <strong>primer hijo</strong> de <code>{"<table>"}</code>.
          </li>
          <li>
            <code>{"<th>"}</code> — celda de encabezado (<em>table header</em>).
            Es un <code>td</code> que dice &ldquo;yo soy el rótulo de estos
            datos&rdquo;.
          </li>
          <li>
            <code>{"<thead>"}</code>, <code>{"<tbody>"}</code> y{" "}
            <code>{"<tfoot>"}</code> — agrupan las filas en encabezado, cuerpo y
            pie. Sirven para darles estilo por separado, para el encabezado
            pegajoso que vemos más abajo, y para que al imprimir una tabla larga
            el <code>thead</code> se repita arriba de cada hoja.
          </li>
        </ul>

        <Editor
          consigna="Agregale una comisión más al tbody: vas a ver que el tfoot se queda abajo, pero el total deja de cerrar. Corregilo."
          html={`<table>
  <caption>Inscriptos por comisión — Taller de Programación II</caption>

  <thead>
    <tr>
      <th>Comisión</th>
      <th>Turno</th>
      <th>Inscriptos</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>1</td>
      <td>Mañana</td>
      <td>28</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Noche</td>
      <td>34</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <td>Total</td>
      <td></td>
      <td>62</td>
    </tr>
  </tfoot>
</table>`}
          css={`table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid #b9c6d6;
  padding: 6px 12px;
  text-align: left;
}

caption {
  font-weight: 700;
  padding-bottom: 8px;
}

/* Cada grupo de filas se puede pintar distinto sin tocar el HTML. */
thead {
  background: #e4eefb;
}

tfoot {
  background: #f2f5f9;
  font-weight: 700;
}`}
        />

        <p>
          Fijate que <code>th</code> viene en negrita y centrado de fábrica, sin
          una sola línea de CSS. No es casualidad: el navegador ya sabe que es un
          encabezado.
        </p>

        <Nota tipo="info" titulo="El tbody aparece aunque vos no lo escribas">
          <p>
            Si armás una tabla con puros <code>{"<tr>"}</code> sueltos, el
            navegador igual crea un <code>{"<tbody>"}</code> alrededor al
            construir el DOM. Por eso un selector CSS como{" "}
            <code>table &gt; tr</code> no matchea nunca nada, y por eso{" "}
            <code>tabla.tBodies[0]</code> existe en JavaScript aunque tu HTML no
            lo tenga. Escribilo igual: te obliga a separar los títulos de los
            datos.
          </p>
        </Nota>

        <p>
          Sobre el orden en el archivo: <code>tfoot</code> va{" "}
          <strong>después</strong> de <code>tbody</code>. En HTML 4 iba antes
          (así el navegador dibujaba el pie sin esperar a que bajaran todas las
          filas) y todavía se tolera por compatibilidad, pero hoy la forma
          correcta es la natural: cabeza, cuerpo, pie.
        </p>

        <h3>caption contra un h3 arriba de la tabla</h3>

        <Comparacion>
          <Columna tono="mal" titulo="Un h3 suelto">
            <Codigo
              codigo={`<h3>Notas del primer parcial</h3>
<table>
  ...
</table>`}
            />
            <p className="tenue">
              El título y la tabla son dos cosas que casualmente están una arriba
              de la otra. Si alguien navega saltando de tabla en tabla —cosa que
              los lectores de pantalla hacen— escucha &ldquo;tabla, 4 columnas,
              12 filas&rdquo; y nada más. Tampoco se lleva el título si copiás la
              tabla a otro lado.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Un caption adentro">
            <Codigo
              codigo={`<table>
  <caption>Notas del primer parcial</caption>
  ...
</table>`}
            />
            <p className="tenue">
              El título es <strong>parte</strong> de la tabla. Se anuncia junto
              con ella, viaja con ella, y si lo querés ver abajo alcanza con{" "}
              <code>caption-side: bottom</code>: no hay que tocar el HTML.
            </p>
          </Columna>
        </Comparacion>
      </Seccion>

      <Seccion titulo="th y scope: que se entienda quién manda sobre qué">
        <p>
          Una tabla con <code>th</code> ya está mejor que una de puros{" "}
          <code>td</code>, pero falta un dato: <strong>en qué dirección</strong>{" "}
          manda cada encabezado. <code>scope=&quot;col&quot;</code> dice
          &ldquo;soy el título de la columna que tengo debajo&rdquo;;{" "}
          <code>scope=&quot;row&quot;</code> dice &ldquo;soy el título de la fila
          que tengo a la derecha&rdquo;.
        </p>

        <p>
          Sin eso, un lector de pantalla parado sobre la celda del 34 dice
          literalmente <em>&ldquo;34&rdquo;</em>. Con eso, dice{" "}
          <em>&ldquo;Comisión 2, inscriptos, 34&rdquo;</em>. Es la diferencia
          entre una tabla usable y una grilla de números sueltos. Y la tabla se
          ve <strong>exactamente igual</strong> en los dos casos: por eso es tan
          fácil olvidárselo.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Lo que se escucha sin scope">
            <Codigo
              archivo="lector de pantalla"
              codigo={`Tabla. 3 columnas, 3 filas.
Fila 3, columna 3: 34.`}
            />
          </Columna>
          <Columna tono="bien" titulo="Lo que se escucha con scope">
            <Codigo
              archivo="lector de pantalla"
              codigo={`Tabla: Inscriptos por comisión.
3 columnas, 3 filas.
Comisión 2. Inscriptos: 34.`}
            />
          </Columna>
        </Comparacion>

        <p>
          La primera celda de cada fila del cuerpo casi siempre es también un
          encabezado: es el nombre de la cosa que describe esa fila. Ahí va{" "}
          <code>{'<th scope="row">'}</code>, no un <code>td</code>.
        </p>

        <Editor
          consigna="Cambiá los th del thead por td: se ve distinto y el significado se pierde. Después volvé atrás y sacale los scope: no cambia nada a la vista, y ahí está el problema."
          html={`<table>
  <caption>Inscriptos por comisión</caption>
  <thead>
    <tr>
      <th scope="col">Comisión</th>
      <th scope="col">Turno</th>
      <th scope="col">Inscriptos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Comisión 1</th>
      <td>Mañana</td>
      <td>28</td>
    </tr>
    <tr>
      <th scope="row">Comisión 2</th>
      <td>Noche</td>
      <td>34</td>
    </tr>
  </tbody>
</table>`}
          css={`table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid #b9c6d6;
  padding: 6px 12px;
  text-align: left;
}

caption {
  font-weight: 700;
  padding-bottom: 8px;
  text-align: left;
}

/* Los encabezados de fila se distinguen de los de columna. */
tbody th {
  background: #f2f5f9;
}`}
        />

        <Nota tipo="info" titulo="Cuando la tabla es realmente complicada">
          <p>
            <code>scope</code> alcanza para el 95% de los casos. Si tenés
            encabezados en dos niveles —por ejemplo &ldquo;Primer
            cuatrimestre&rdquo; arriba y &ldquo;Parcial 1 / Parcial 2&rdquo;
            debajo— existen <code>scope=&quot;colgroup&quot;</code> y{" "}
            <code>scope=&quot;rowgroup&quot;</code>. Y para los casos imposibles
            se le pone un <code>id</code> a cada encabezado y se listan en la
            celda con <code>headers</code>:
          </p>
          <Codigo
            codigo={`<th id="c2" scope="col">Comisión 2</th>
<th id="p1" scope="col">Parcial 1</th>
...
<td headers="c2 p1">7</td>`}
          />
          <p>
            Antes de llegar ahí, pensá si no conviene partirla en dos tablas
            simples. Casi siempre conviene.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="colspan y rowspan">
        <p>
          A veces una celda tiene que ocupar el lugar de varias.{" "}
          <code>colspan=&quot;3&quot;</code> la estira a lo ancho, sobre tres
          columnas. <code>rowspan=&quot;2&quot;</code> la estira a lo alto, sobre
          dos filas. La regla que más cuesta: cuando una celda se estira hacia
          abajo, <strong>las filas siguientes no escriben esa celda</strong>,
          porque ya está ocupada.
        </p>

        <p>
          El ejemplo donde de verdad hacen falta es un horario: el recreo cruza
          todos los días, y una materia de dos módulos ocupa dos filas.
        </p>

        <Editor
          consigna={
            'Hacé que "Taller de Programación II" ocupe también las 21:00 (rowspan="3") y acordate de borrar la celda que sobra en esa fila.'
          }
          html={`<table>
  <caption>Horario — Comisión 2, turno noche</caption>
  <thead>
    <tr>
      <th scope="col">Hora</th>
      <th scope="col">Lunes</th>
      <th scope="col">Miércoles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">19:00</th>
      <!-- Esta celda baja dos filas: ocupa 19:00 y 20:00. -->
      <td rowspan="2" class="materia">Taller de Programación II</td>
      <td>Base de Datos</td>
    </tr>
    <tr>
      <th scope="row">20:00</th>
      <!-- Ojo: acá va UNA sola celda. La del medio la ocupó el rowspan. -->
      <td>Base de Datos</td>
    </tr>
    <tr>
      <td colspan="3" class="recreo">Recreo</td>
    </tr>
    <tr>
      <th scope="row">21:00</th>
      <td>Redes</td>
      <td>Redes</td>
    </tr>
  </tbody>
</table>`}
          css={`table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #b9c6d6;
  padding: 8px 10px;
  text-align: left;
}

caption {
  font-weight: 700;
  text-align: left;
  padding-bottom: 8px;
}

.materia {
  background: #e4eefb;
  vertical-align: middle;
}

.recreo {
  background: #f2f5f9;
  text-align: center;
  font-style: italic;
}`}
        />

        <Nota tipo="atencion" titulo="El error de contar celdas">
          <p>
            Si te pasás con el <code>colspan</code> o te olvidás de sacar la
            celda que tapa un <code>rowspan</code>, la tabla termina con más
            columnas de las que declaraste y se desarma sola: aparece una columna
            fantasma a la derecha. No hay mensaje de error, solo se ve raro.
            Contá siempre así: <em>celdas escritas + celdas heredadas de un
            rowspan de arriba = cantidad de columnas</em>, en todas las filas.
          </p>
        </Nota>

        <Nota
          tipo="atencion"
          titulo="Tablas anidadas y divs que juegan a ser tabla"
        >
          <p>
            Dos tentaciones para resistir. Meter una <code>{"<table>"}</code>{" "}
            adentro de un <code>{"<td>"}</code> de otra deja a quien usa lector
            de pantalla adivinando en cuál de las dos está parado, y a vos con un
            CSS imposible; casi siempre lo que querías era un{" "}
            <code>colspan</code>, un <code>tbody</code> más, o dos tablas
            separadas.
          </p>
          <p>
            Y armar la tabla con <code>{"<div>"}</code> más{" "}
            <code>display: table</code> te da el mismo dibujo y{" "}
            <strong>cero semántica</strong>: sin encabezados, sin scope, sin
            navegación por celdas. Si son datos tabulares, usá las etiquetas de
            tabla; si lo que querés es acomodar cajas, usá{" "}
            <Link href="/css/grid">Grid</Link>, que para eso está.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Darle estilo">
        <p>
          Una tabla sin CSS se ve como en 1997. Con cinco propiedades queda
          presentable, y la primera es la más importante:{" "}
          <code>border-collapse</code>. Por defecto vale <code>separate</code> y
          cada celda dibuja su propio borde, así que entre dos celdas vecinas te
          quedan <strong>dos líneas</strong> con un huequito en el medio.
        </p>

        <Editor
          solapas="css"
          consigna="Cambiá collapse por separate y mirá los bordes dobles. Después probá separate junto con border-spacing: 6px."
          html={`<table>
  <caption>Con border-collapse</caption>
  <thead>
    <tr><th scope="col">Materia</th><th scope="col">Nota</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Taller II</th><td>8</td></tr>
    <tr><th scope="row">Base de Datos</th><td>7</td></tr>
  </tbody>
</table>`}
          css={`table {
  /* collapse: un solo borde compartido entre celdas vecinas. */
  border-collapse: collapse;
}

th, td {
  border: 1px solid #b9c6d6;
  /* El padding va en las celdas, NUNCA en la tabla. */
  padding: 8px 12px;
  text-align: left;
}

caption {
  font-weight: 700;
  text-align: left;
  padding-bottom: 8px;
}`}
        />

        <p>
          Lo demás son tres cosas que vas a repetir en cada tabla de tu vida:
          filas cebradas para no perder el renglón, números alineados a la
          derecha para poder compararlos de un vistazo, y una línea más gruesa
          debajo del encabezado.
        </p>

        <Editor
          solapas="css"
          consigna="Sacale text-align: right a .num y fijate lo difícil que se vuelve comparar 9 con 130. Después cambiá even por odd."
          html={`<table>
  <caption>Ventas por sucursal</caption>
  <thead>
    <tr>
      <th scope="col">Sucursal</th>
      <th scope="col" class="num">Unidades</th>
      <th scope="col" class="num">Importe</th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">Centro</th><td class="num">9</td><td class="num">124.500</td></tr>
    <tr><th scope="row">Norte</th><td class="num">130</td><td class="num">1.980.300</td></tr>
    <tr><th scope="row">Oeste</th><td class="num">27</td><td class="num">96.000</td></tr>
    <tr><th scope="row">Sur</th><td class="num">4</td><td class="num">7.250</td></tr>
  </tbody>
</table>`}
          css={`table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

caption {
  font-weight: 700;
  text-align: left;
  padding-bottom: 8px;
}

/* Una línea más marcada para cerrar el encabezado. */
thead th {
  border-bottom: 2px solid #8fa8c4;
}

/* Filas cebradas: :nth-child(even) son la 2, la 4, la 6... */
tbody tr:nth-child(even) {
  background: #f4f7fb;
}

tbody tr:hover {
  background: #e4eefb;
}

/* Números: a la derecha y con dígitos del mismo ancho, así las
   unidades, las decenas y las centenas quedan una debajo de la otra. */
.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}`}
        />

        <Nota tipo="info" titulo="Pintar una columna entera sin tocar las celdas">
          <p>
            Si no querés escribir <code>class=&quot;num&quot;</code> en cada
            celda, podés apuntarle a la columna con <code>{"<colgroup>"}</code> y{" "}
            <code>{"<col>"}</code>, o con el selector{" "}
            <code>:nth-child(3)</code>. Ojo: por cómo funciona el modelo de
            tablas, <code>{"<col>"}</code> solo acepta unas pocas propiedades
            —fondo, ancho, borde, visibilidad—; <code>text-align</code> no es una
            de ellas.
          </p>
          <Codigo
            codigo={`<table>
  <colgroup>
    <col>
    <col class="destacada">
  </colgroup>
  ...
</table>

<style>
  .destacada { background: #fdf3e0; }
  /* Para alinear hay que ir a la celda: */
  td:nth-child(2) { text-align: right; }
</style>`}
          />
        </Nota>

        <p>
          Con tablas largas el encabezado se va para arriba y a las diez filas ya
          no sabés qué columna estás mirando. <code>position: sticky</code> en el{" "}
          <code>th</code> lo deja pegado al borde del contenedor que scrollea.
        </p>

        <Editor
          alto={260}
          solapas="css"
          consigna="Scrolleá la tabla del resultado. Después sacale el position: sticky y compará."
          html={`<div class="caja">
  <table>
    <thead>
      <tr>
        <th scope="col">Alumno</th>
        <th scope="col">Nota</th>
      </tr>
    </thead>
    <tbody>
      <tr><th scope="row">Acosta, Lucía</th><td>8</td></tr>
      <tr><th scope="row">Benítez, Tomás</th><td>6</td></tr>
      <tr><th scope="row">Cabrera, Mora</th><td>9</td></tr>
      <tr><th scope="row">Duarte, Iván</th><td>4</td></tr>
      <tr><th scope="row">Escobar, Nadia</th><td>7</td></tr>
      <tr><th scope="row">Ferrari, Bruno</th><td>10</td></tr>
      <tr><th scope="row">Gómez, Julieta</th><td>5</td></tr>
      <tr><th scope="row">Herrera, Pablo</th><td>8</td></tr>
      <tr><th scope="row">Ibarra, Sofía</th><td>6</td></tr>
      <tr><th scope="row">Juárez, Ramiro</th><td>9</td></tr>
    </tbody>
  </table>
</div>`}
          css={`/* El que scrollea es el contenedor, no la tabla. */
.caja {
  max-height: 190px;
  overflow: auto;
  border: 1px solid #c9d6e4;
  border-radius: 8px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 7px 12px;
  text-align: left;
}

tbody tr:nth-child(even) {
  background: #f4f7fb;
}

thead th {
  position: sticky;
  top: 0;
  /* Sin fondo propio, las filas se ven pasando por abajo. */
  background: #14538f;
  color: #fff;
  /* Con border-collapse el borde se queda atrás al scrollear,
     así que la línea de abajo se dibuja con sombra. */
  box-shadow: inset 0 -2px 0 #0c2c4d;
}`}
        />

        <Nota
          tipo="atencion"
          titulo="sticky con border-collapse: la línea que desaparece"
        >
          <p>
            Es el bug más confuso de este tema. Con{" "}
            <code>border-collapse: collapse</code> el borde deja de pertenecer a
            la celda y pasa a ser de la tabla, así que cuando el{" "}
            <code>th</code> se despega y queda flotando,{" "}
            <strong>
              el borde se queda abajo y el contenido le pasa por detrás
            </strong>
            . Las dos salidas: dibujar la línea con <code>box-shadow</code>{" "}
            (como arriba) o usar <code>border-collapse: separate</code> con{" "}
            <code>border-spacing: 0</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Tablas en pantalla chica">
        <p>
          Una tabla de seis columnas no entra en un celular y no hay CSS mágico
          que la haga entrar: los datos son los que son. La solución honesta, y
          la que usan casi todos los sistemas de diseño, es{" "}
          <strong>
            envolverla en un contenedor con <code>overflow-x: auto</code>
          </strong>{" "}
          y dejar que se desplace de costado con el resto de la página quieta.
        </p>

        <p>
          Son tres detalles: el <code>div</code> de afuera scrollea, la tabla de
          adentro tiene un <code>min-width</code> (si no, se comprime sola y
          nunca desborda), y el contenedor lleva{" "}
          <code>tabindex=&quot;0&quot;</code> con{" "}
          <code>role=&quot;region&quot;</code> para que también se pueda
          desplazar con el teclado, no solo arrastrando.
        </p>

        <Editor
          solapas="css"
          consigna="Sacale el min-width a la tabla: se comprime y las palabras se parten. Volvelo a poner y achicá la ventana del navegador."
          html={`<div class="scroll-x" tabindex="0" role="region" aria-label="Detalle de materias">
  <table>
    <caption>Materias del segundo año</caption>
    <thead>
      <tr>
        <th scope="col">Materia</th>
        <th scope="col">Cátedra</th>
        <th scope="col">Turno</th>
        <th scope="col">Horas</th>
        <th scope="col">Correlativa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Taller de Programación II</th>
        <td>Ing. Medina</td>
        <td>Noche</td>
        <td>96</td>
        <td>Taller de Programación I</td>
      </tr>
      <tr>
        <th scope="row">Base de Datos</th>
        <td>Lic. Suárez</td>
        <td>Noche</td>
        <td>128</td>
        <td>Algoritmos II</td>
      </tr>
    </tbody>
  </table>
</div>`}
          css={`.scroll-x {
  overflow-x: auto;
  border: 1px solid #c9d6e4;
  border-radius: 8px;
}

/* Que se vea el foco cuando llegás con Tab. */
.scroll-x:focus-visible {
  outline: 2px solid #14538f;
  outline-offset: 2px;
}

table {
  border-collapse: collapse;
  /* Sin esto la tabla se achica sola y nunca hay scroll. */
  min-width: 620px;
  width: 100%;
}

th, td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}

caption {
  font-weight: 700;
  text-align: left;
  padding: 10px 12px;
}

tbody tr:nth-child(even) {
  background: #f4f7fb;
}`}
        />

        <Nota tipo="info" titulo="La otra técnica: una tarjeta por fila">
          <p>
            Para tablas de pocas columnas se puede, con una media query, apagar
            el <code>display: table</code> y convertir cada fila en una tarjeta,
            repitiendo el nombre de la columna adelante de cada dato con{" "}
            <code>content: attr(data-titulo)</code>. Queda lindo, pero tenés que
            duplicar los rótulos en atributos y, al apagar el display, se rompe
            el modelo de tabla para los lectores de pantalla. Como primera
            opción, el contenedor que scrollea es mejor negocio.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Todo junto: la tabla de notas">
        <p>
          Esta es la tabla completa, con todo lo de arriba puesto al mismo
          tiempo: caption, los tres grupos de filas, <code>scope</code> en los
          dos sentidos, notas a la derecha, filas cebradas, contenedor que
          scrollea de costado y un <code>tfoot</code> con los promedios.
        </p>

        <Editor
          consigna="Agregá una materia más al tbody y actualizá los promedios del tfoot. Después probá poner caption-side: bottom."
          html={`<div class="tabla-scroll" tabindex="0" role="region" aria-label="Notas de la cursada">
  <table class="notas">
    <caption>Notas de la cursada — Belén Ortiz, comisión 2</caption>

    <thead>
      <tr>
        <th scope="col">Materia</th>
        <th scope="col" class="num">Parcial 1</th>
        <th scope="col" class="num">Parcial 2</th>
        <th scope="col" class="num">Final</th>
        <th scope="col">Condición</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <th scope="row">Taller de Programación II</th>
        <td class="num">8</td>
        <td class="num">9</td>
        <td class="num">9</td>
        <td><span class="chip ok">Aprobada</span></td>
      </tr>
      <tr>
        <th scope="row">Base de Datos</th>
        <td class="num">7</td>
        <td class="num">6</td>
        <td class="num">7</td>
        <td><span class="chip ok">Aprobada</span></td>
      </tr>
      <tr>
        <th scope="row">Sistemas Operativos</th>
        <td class="num">4</td>
        <td class="num">6</td>
        <td class="num">sin rendir</td>
        <td><span class="chip pend">Adeuda final</span></td>
      </tr>
    </tbody>

    <tfoot>
      <tr>
        <th scope="row">Promedio</th>
        <td class="num">6,33</td>
        <td class="num">7,00</td>
        <td class="num">8,00</td>
        <td></td>
      </tr>
    </tfoot>
  </table>
</div>`}
          css={`.tabla-scroll {
  overflow-x: auto;
  border: 1px solid #c9d6e4;
  border-radius: 10px;
  background: #fff;
}

.tabla-scroll:focus-visible {
  outline: 2px solid #14538f;
  outline-offset: 2px;
}

.notas {
  border-collapse: collapse;
  width: 100%;
  min-width: 580px;
}

.notas caption {
  text-align: left;
  font-weight: 700;
  padding: 12px 14px;
  border-bottom: 1px solid #e2e8f0;
}

.notas th,
.notas td {
  padding: 9px 14px;
  text-align: left;
  border-bottom: 1px solid #eef2f7;
  white-space: nowrap;
}

.notas thead th {
  background: #f4f7fb;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #55697f;
  border-bottom: 2px solid #c9d6e4;
}

.notas tbody tr:nth-child(even) {
  background: #fafcfe;
}

.notas tfoot th,
.notas tfoot td {
  background: #f4f7fb;
  font-weight: 700;
  border-top: 2px solid #c9d6e4;
  border-bottom: 0;
}

.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.chip {
  display: inline-block;
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.ok {
  background: #e3f6ee;
  color: #0f7a52;
}

.pend {
  background: #fdf3e0;
  color: #92600a;
}`}
        />

        <p>Las decisiones, una por una:</p>

        <ul>
          <li>
            El <code>caption</code> dice de quién son las notas: la tabla se
            explica sola aunque la saques de contexto.
          </li>
          <li>
            El nombre de la materia es <code>{'<th scope="row">'}</code>, así
            cada nota se anuncia con su materia adelante.
          </li>
          <li>
            La condición no está solo en el color: dice &ldquo;Aprobada&rdquo; o
            &ldquo;Adeuda final&rdquo; con palabras. Si la información está
            únicamente en un color, no existe para quien no lo distingue.
          </li>
          <li>
            El final que todavía no rindió dice &ldquo;sin rendir&rdquo;, no es
            una celda vacía: una celda vacía se lee como un error de carga.
          </li>
          <li>
            Los promedios van en <code>tfoot</code>, no como una fila más del{" "}
            <code>tbody</code>: no son un alumno, son un resumen.
          </li>
        </ul>

        <p className="tenue">
          Así se ve la misma tabla metida en 330 píxeles de ancho, con el scroll
          horizontal haciendo su trabajo:
        </p>

        <Vista
          alto={230}
          html={`<div style="width: 330px; overflow-x: auto; border: 1px solid #c9d6e4; border-radius: 10px;">
  <table>
    <caption>Notas de la cursada</caption>
    <thead>
      <tr>
        <th scope="col">Materia</th>
        <th scope="col">P1</th>
        <th scope="col">P2</th>
        <th scope="col">Final</th>
        <th scope="col">Condición</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Taller de Programación II</th>
        <td>8</td><td>9</td><td>9</td><td>Aprobada</td>
      </tr>
      <tr>
        <th scope="row">Base de Datos</th>
        <td>7</td><td>6</td><td>7</td><td>Aprobada</td>
      </tr>
    </tbody>
  </table>
</div>
<p style="font-size: 0.85rem; color: #55697f; margin-bottom: 0;">
  Arrastrá la tabla de costado: la página no se mueve.
</p>`}
          css={`table {
  border-collapse: collapse;
  min-width: 520px;
  width: 100%;
  font-size: 0.9rem;
}

caption {
  text-align: left;
  font-weight: 700;
  padding: 10px 12px;
}

th, td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #eef2f7;
  white-space: nowrap;
}

thead th {
  background: #f4f7fb;
}`}
        />
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Rescatá esta tabla"
          pista={
            <div>
              <p>Hay cinco cosas para arreglar. En orden:</p>
              <ol>
                <li>
                  El <code>{"<h3>"}</code> tiene que entrar adentro de la tabla
                  como <code>{"<caption>"}</code>.
                </li>
                <li>
                  La primera fila son títulos: <code>th</code> con{" "}
                  <code>scope=&quot;col&quot;</code>, envuelta en{" "}
                  <code>{"<thead>"}</code>. Los <code>{"<b>"}</code> sobran: un{" "}
                  <code>th</code> ya viene en negrita.
                </li>
                <li>
                  El resto de las filas van en <code>{"<tbody>"}</code>, y la
                  primera celda de cada una es{" "}
                  <code>{'<th scope="row">'}</code>.
                </li>
                <li>
                  La fila del total es un resumen: va en{" "}
                  <code>{"<tfoot>"}</code>.
                </li>
                <li>Los importes son números: alineados a la derecha.</li>
              </ol>
            </div>
          }
          solucion={
            <div>
              <p>
                Fijate que el HTML corregido no tiene ni una celda de más: son
                las mismas, con el nombre correcto.
              </p>
              <Editor
                consigna="Compará este código con el del enunciado, línea por línea."
                html={`<table>
  <caption>Gastos del laboratorio — marzo</caption>

  <thead>
    <tr>
      <th scope="col">Concepto</th>
      <th scope="col">Proveedor</th>
      <th scope="col" class="num">Importe</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th scope="row">Hosting</th>
      <td>Vercel</td>
      <td class="num">18.400</td>
    </tr>
    <tr>
      <th scope="row">Dominio</th>
      <td>NIC.ar</td>
      <td class="num">2.100</td>
    </tr>
    <tr>
      <th scope="row">Monitores</th>
      <td>Compras UTN</td>
      <td class="num">340.000</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <th scope="row" colspan="2">Total</th>
      <td class="num">360.500</td>
    </tr>
  </tfoot>
</table>`}
                css={`table {
  border-collapse: collapse;
  width: 100%;
}

caption {
  font-weight: 700;
  text-align: left;
  padding-bottom: 8px;
}

th, td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

thead th {
  border-bottom: 2px solid #8fa8c4;
}

tbody tr:nth-child(even) {
  background: #f4f7fb;
}

tfoot th, tfoot td {
  border-top: 2px solid #8fa8c4;
  font-weight: 700;
}

.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}`}
              />
              <p className="tenue">
                El detalle fino está en el <code>tfoot</code>: el rótulo
                &ldquo;Total&rdquo; usa <code>colspan=&quot;2&quot;</code> para
                cubrir las columnas de concepto y proveedor, así la fila sigue
                teniendo tres columnas y no se desarma.
              </p>
            </div>
          }
        >
          <p>
            Esta tabla se ve bien y no tiene una sola etiqueta correcta. Tocá el
            HTML hasta que tenga <code>caption</code>, <code>thead</code>,{" "}
            <code>tbody</code>, <code>tfoot</code>, encabezados de columna y de
            fila con <code>scope</code>, y los importes alineados a la derecha.
          </p>
          <Editor
            consigna="Arreglala acá mismo. El resultado se tiene que ver parecido, pero el HTML tiene que decir la verdad."
            html={`<h3>Gastos del laboratorio — marzo</h3>

<table>
  <tr>
    <td><b>Concepto</b></td>
    <td><b>Proveedor</b></td>
    <td><b>Importe</b></td>
  </tr>
  <tr>
    <td>Hosting</td>
    <td>Vercel</td>
    <td>18.400</td>
  </tr>
  <tr>
    <td>Dominio</td>
    <td>NIC.ar</td>
    <td>2.100</td>
  </tr>
  <tr>
    <td>Monitores</td>
    <td>Compras UTN</td>
    <td>340.000</td>
  </tr>
  <tr>
    <td><b>Total</b></td>
    <td></td>
    <td><b>360.500</b></td>
  </tr>
</table>`}
            css={`h3 {
  margin: 0 0 8px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

td {
  padding: 8px 12px;
  border-bottom: 1px solid #e2e8f0;
}`}
          />
        </Desafio>

        <Desafio
          titulo="2. El cronograma con celdas combinadas"
          pista={
            <div>
              <p>
                Dibujalo en papel primero. La tabla tiene{" "}
                <strong>3 columnas</strong>: Semana, Tema y Entrega. Todas las
                filas tienen que sumar 3, contando lo que baja de arriba.
              </p>
              <ul>
                <li>
                  La entrega que abarca las semanas 1 y 2 es{" "}
                  <code>rowspan=&quot;2&quot;</code> en la fila de la semana 1, y
                  en la fila de la semana 2 <strong>no escribís</strong> esa
                  celda.
                </li>
                <li>
                  La fila del parcial ocupa el ancho completo:{" "}
                  <code>{'<td colspan="3">'}</code> y nada más en esa fila.
                </li>
              </ul>
            </div>
          }
          solucion={
            <div>
              <Editor
                consigna="Contá las celdas de cada fila: 3, 2 (más la heredada), 1 (que vale por 3), 3."
                html={`<table>
  <caption>Cronograma — primer tramo</caption>
  <thead>
    <tr>
      <th scope="col">Semana</th>
      <th scope="col">Tema</th>
      <th scope="col">Entrega</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Repaso de HTML</td>
      <!-- Baja dos filas: cubre la semana 1 y la 2. -->
      <td rowspan="2" class="entrega">TP 1 — Página personal</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>HTML semántico y tablas</td>
      <!-- Sin tercera celda: la ocupa el rowspan de arriba. -->
    </tr>
    <tr>
      <!-- Una sola celda que cruza las 3 columnas. -->
      <td colspan="3" class="parcial">Primer parcial</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>CSS: display y Flexbox</td>
      <td>sin entrega</td>
    </tr>
  </tbody>
</table>`}
                css={`table {
  border-collapse: collapse;
  width: 100%;
}

caption {
  font-weight: 700;
  text-align: left;
  padding-bottom: 8px;
}

th, td {
  padding: 8px 12px;
  text-align: left;
  border: 1px solid #c9d6e4;
}

thead th {
  background: #f4f7fb;
}

.entrega {
  background: #e4eefb;
  vertical-align: middle;
}

.parcial {
  background: #fdf3e0;
  text-align: center;
  font-weight: 700;
}`}
              />
              <p className="tenue">
                Si en la fila de la semana 2 dejás igual la tercera celda,
                aparece una cuarta columna fantasma a la derecha. Probalo en el
                editor: es la forma más rápida de entender qué hace{" "}
                <code>rowspan</code>.
              </p>
            </div>
          }
        >
          <p>
            Armá desde cero una tabla de 3 columnas (Semana, Tema, Entrega) con:
          </p>
          <ul>
            <li>
              un <code>caption</code> que diga &ldquo;Cronograma — primer
              tramo&rdquo;;
            </li>
            <li>
              filas para las semanas 1, 2 y 3, con el número de semana como{" "}
              <code>{'<th scope="row">'}</code>;
            </li>
            <li>
              una entrega que abarque las semanas 1 y 2 en una sola celda
              combinada;
            </li>
            <li>
              entre la semana 2 y la 3, una fila que diga &ldquo;Primer
              parcial&rdquo; cruzando las tres columnas.
            </li>
          </ul>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
