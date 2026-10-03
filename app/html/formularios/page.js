import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Editor from "@/components/Editor";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

export const metadata = { title: "Formularios y validación nativa" };

// Estilos que comparten casi todos los ejemplos, para que los formularios se
// vean prolijos adentro del iframe sin repetir veinte líneas en cada uno.
const CSS_BASE = `
  body { font-size: 15px; }
  form { display: grid; gap: 12px; max-width: 440px; }
  label { display: block; font-weight: 600; font-size: 14px; margin-bottom: 3px; }
  input, select, textarea {
    font: inherit;
    padding: 6px 8px;
    border: 1px solid #b9c6d6;
    border-radius: 6px;
  }
  input[type="checkbox"], input[type="radio"] { width: auto; }
  input:not([type="checkbox"]):not([type="radio"]):not([type="color"]):not([type="range"]),
  select, textarea { width: 100%; }
  button {
    font: inherit;
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid #14538f;
    background: #14538f;
    color: #fff;
    cursor: pointer;
    justify-self: start;
  }
  p { margin: 0; }
  pre {
    background: #0f1b2b;
    color: #dbe6f3;
    padding: 10px 12px;
    border-radius: 6px;
    font-size: 13px;
    white-space: pre-wrap;
    word-break: break-all;
    margin: 0;
  }
  .rotulo { font-size: 13px; color: #55697f; margin: 14px 0 4px; }
`;

export default function Pagina() {
  return (
    <Leccion
      slug="/html/formularios"
      titulo="Formularios y validación nativa"
      resumen="Los controles, las etiquetas, y todo lo que el navegador valida gratis antes de que escribas JavaScript."
    >
      <Seccion titulo="Un formulario es un paquete con destino">
        <p>
          Un <code>&lt;form&gt;</code> no es un contenedor decorativo. Es la
          unidad que el navegador sabe empaquetar: cuando se envía, recorre los
          controles que tiene adentro, arma una lista de pares{" "}
          <strong>nombre = valor</strong> y la manda a algún lado. Dos atributos
          deciden todo:
        </p>

        <ul>
          <li>
            <code>action</code>: la dirección a la que va el paquete. Si no lo
            ponés, se manda a la misma URL en la que estás.
          </li>
          <li>
            <code>method="get"</code>: los datos viajan{" "}
            <strong>en la URL</strong>, como <code>?ciudad=Rosario&amp;dias=3</code>.
            Es lo correcto para búsquedas y filtros, porque la URL queda
            compartible y se puede guardar en favoritos.
          </li>
          <li>
            <code>method="post"</code>: los datos viajan{" "}
            <strong>en el cuerpo del pedido</strong>, no en la URL. Es lo
            correcto para todo lo que cambia algo (crear una cuenta, publicar,
            borrar) y para cualquier dato que no quieras ver en el historial.
          </li>
        </ul>

        <Codigo
          archivo="alta.html"
          resaltar={[1]}
          codigo={`<form action="/usuarios" method="post">
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre">

  <button type="submit">Crear cuenta</button>
</form>`}
        />

        <p>
          La pieza que nadie mira y que decide si un dato existe o no es el
          atributo <code>name</code>. Un campo sin <code>name</code> se ve, se
          escribe, se valida&hellip; y no se envía. Comprobalo: el recuadro negro
          de abajo muestra, en vivo, el paquete exacto que se armaría.
        </p>

        <Editor
          solapas="html"
          css={CSS_BASE}
          html={`<form id="alta">
  <p>
    <label for="nombre">Nombre</label>
    <input type="text" id="nombre" name="nombre" value="Ana">
  </p>
  <p>
    <label for="apellido">Apellido</label>
    <input type="text" id="apellido" name="apellido" value="Pérez">
  </p>
  <p>
    <label for="edad">Edad</label>
    <input type="number" id="edad" name="edad" value="20">
  </p>
</form>

<p class="rotulo">Esto es lo que se enviaría:</p>
<pre id="salida"></pre>

<!-- Este script NO es parte de la lección de formularios:
     solo arma el paquete para que lo puedas mirar. -->
<script>
  var formulario = document.getElementById("alta");
  var salida = document.getElementById("salida");
  function mostrar() {
    var pares = new URLSearchParams(new FormData(formulario));
    salida.textContent = pares.toString() || "(nada: ningún control tiene name)";
  }
  formulario.addEventListener("input", mostrar);
  mostrar();
</script>`}
          consigna={`Borrale name="apellido" al segundo campo: el campo sigue ahí, pero el dato deja de viajar.`}
        />

        <p>
          Fijate también en la <code>é</code> de &quot;Pérez&quot;: viaja como{" "}
          <code>P%C3%A9rez</code>. Eso es codificación de URL, la hace el
          navegador solo y el servidor la deshace solo. No tenés que tocarla.
        </p>

        <Nota tipo="atencion" titulo="Un &lt;button&gt; sin type es un botón de envío">
          <p>
            Adentro de un <code>&lt;form&gt;</code>, un{" "}
            <code>&lt;button&gt;</code> sin atributo <code>type</code> vale{" "}
            <code>type="submit"</code>. Por eso el clásico botón de
            &quot;Mostrar más&quot; puesto dentro de un formulario recarga la
            página entera y parece que se borró todo. Si el botón no envía,
            escribile <code>type="button"</code> siempre.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La etiqueta: el detalle de dos líneas que más se nota">
        <p>
          Todo control necesita un <code>&lt;label&gt;</code> asociado. No es una
          formalidad: cuando la asociación existe, el texto se convierte en parte
          del control. Hacer click en la palabra enfoca el campo, y en un
          checkbox directamente lo tilda &mdash; un área clickeable mucho más
          grande, que en un celular es la diferencia entre acertar y no. Además,
          el lector de pantalla lee la etiqueta al llegar al campo; sin ella
          anuncia &quot;cuadro de edición&quot; y nada más.
        </p>

        <p>Hay dos formas de asociarlos, y las dos valen igual:</p>

        <Codigo
          archivo="dos formas equivalentes"
          codigo={`<!-- 1. El for del label apunta al id del input (el id, no el name). -->
<label for="correo">Correo</label>
<input type="email" id="correo" name="correo">

<!-- 2. El label envuelve al input. Acá no hace falta ni id ni for. -->
<label>
  Correo
  <input type="email" name="correo">
</label>`}
        />

        <p>
          Probalo en vivo. Hacé click en las palabras, no en los recuadros: los
          dos primeros campos se enfocan solos, el tercero no, y el texto del
          checkbox lo tilda.
        </p>

        <Editor
          solapas="html"
          css={CSS_BASE}
          html={`<form>
  <p>
    <label for="correo">Correo (label con for)</label>
    <input type="email" id="correo" name="correo">
  </p>

  <p>
    <label>Teléfono (label que envuelve)
      <input type="tel" name="telefono">
    </label>
  </p>

  <p>
    Ciudad (texto suelto, no es un label)
    <input type="text" name="ciudad">
  </p>

  <p>
    <input type="checkbox" id="promos" name="promos">
    <label for="promos">Quiero recibir promociones</label>
  </p>
</form>`}
          consigna="Hacé click en cada texto. Después convertí el de Ciudad en un label bien asociado y probá de nuevo."
        />

        <Comparacion>
          <Columna tono="mal" titulo="El placeholder como etiqueta">
            <Codigo
              codigo={`<input type="email" name="correo"
       placeholder="Correo">`}
            />
            <p className="tenue">
              Desaparece apenas escribís, así que el usuario pierde de vista qué
              estaba cargando. Tiene poco contraste, no siempre lo leen los
              lectores de pantalla, y no se puede clickear para enfocar.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Label visible + placeholder de ejemplo">
            <Codigo
              codigo={`<label for="correo">Correo</label>
<input type="email" id="correo" name="correo"
       placeholder="ana@ejemplo.com">`}
            />
            <p className="tenue">
              La etiqueta queda siempre a la vista y el placeholder se usa para
              lo que sirve: mostrar el <em>formato</em> esperado, no el nombre
              del campo.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="info" titulo="En React se llama htmlFor">
          <p>
            <code>for</code> es una palabra reservada de JavaScript, así que en
            JSX el atributo cambia de nombre. Es lo único que cambia.
          </p>
          <Codigo
            codigo={`<label htmlFor="correo">Correo</label>
<input type="email" id="correo" name="correo" />`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="Los tipos de input que valen la pena">
        <p>
          <code>type</code> no es cosmético. Cambia el teclado que aparece en el
          celular, el control que dibuja el navegador, qué se valida gratis y en
          qué formato viaja el valor. Elegir bien el tipo es la forma más barata
          de mejorar un formulario.
        </p>

        <Vista
          fondo="#ffffff"
          css={`
            table { border-collapse: collapse; width: 100%; font-size: 13.5px; }
            th, td { border: 1px solid #d3e0f0; padding: 6px 9px; text-align: left; vertical-align: top; }
            thead th { background: #eef3fa; }
            tbody tr:nth-child(even) { background: #f8fbff; }
            code { font-family: ui-monospace, Consolas, monospace; background: #eef3fa; padding: 1px 4px; border-radius: 4px; }
          `}
          html={`<table>
  <thead>
    <tr><th>type</th><th>Para qué es</th><th>Lo que te da gratis</th></tr>
  </thead>
  <tbody>
    <tr><td><code>text</code></td><td>Texto libre de una línea</td><td>Nada especial. Es el que queda cuando ningún otro encaja.</td></tr>
    <tr><td><code>email</code></td><td>Direcciones de correo</td><td>Valida el formato. Teclado con <code>@</code> en el celular. Acepta <code>multiple</code>.</td></tr>
    <tr><td><code>password</code></td><td>Contraseñas</td><td>Oculta lo tecleado. Ojo: <em>oculta</em>, no cifra nada.</td></tr>
    <tr><td><code>number</code></td><td>Cantidades sobre las que se hace cuentas</td><td>Flechitas, <code>min</code>, <code>max</code>, <code>step</code>, teclado numérico.</td></tr>
    <tr><td><code>tel</code></td><td>Teléfonos</td><td>Teclado de discado. <strong>No valida nada</strong>: los formatos cambian por país. Usá <code>pattern</code>.</td></tr>
    <tr><td><code>url</code></td><td>Direcciones web</td><td>Exige esquema: <code>ejemplo.com</code> no pasa, <code>https://ejemplo.com</code> sí.</td></tr>
    <tr><td><code>search</code></td><td>Cajas de búsqueda</td><td>Varios navegadores agregan la X para vaciar el campo.</td></tr>
    <tr><td><code>date</code></td><td>Fechas</td><td>Calendario nativo. El valor siempre viaja como <code>aaaa-mm-dd</code>, se vea como se vea.</td></tr>
    <tr><td><code>time</code></td><td>Horas</td><td>Selector de hora. El valor viaja en 24 h: <code>14:30</code>.</td></tr>
    <tr><td><code>color</code></td><td>Elegir un color</td><td>Paleta del sistema. El valor es <code>#rrggbb</code> y nunca está vacío.</td></tr>
    <tr><td><code>range</code></td><td>Un número aproximado</td><td>Barra deslizante. Siempre tiene valor, así que <code>required</code> no aplica.</td></tr>
    <tr><td><code>file</code></td><td>Subir archivos</td><td><code>accept</code>, <code>multiple</code>, <code>capture</code>. Necesita <code>method="post"</code> y <code>enctype="multipart/form-data"</code>.</td></tr>
    <tr><td><code>checkbox</code></td><td>Un sí/no, o varias opciones a la vez</td><td>Solo viaja si está tildado. Sin <code>value</code>, se envía <code>on</code>.</td></tr>
    <tr><td><code>radio</code></td><td>Una opción entre varias</td><td>Los que comparten <code>name</code> se excluyen entre sí.</td></tr>
    <tr><td><code>hidden</code></td><td>Datos que el usuario no toca</td><td>Viaja como cualquier otro. No es secreto: se lee en el código fuente.</td></tr>
  </tbody>
</table>`}
        />

        <p>
          Ahora tocalos. Prestá atención a tres cosas: el control que dibuja cada
          uno, qué muestra el recuadro negro cuando el checkbox está tildado y
          cuando no, y que <code>date</code> envía{" "}
          <code>aaaa-mm-dd</code> aunque en pantalla lo veas en formato argentino.
        </p>

        <Editor
          solapas="html"
          css={CSS_BASE}
          html={`<form id="muestrario">
  <p><label for="a">text</label>
     <input type="text" id="a" name="texto" value="hola"></p>

  <p><label for="b">email</label>
     <input type="email" id="b" name="correo" placeholder="ana@ejemplo.com"></p>

  <p><label for="c">password</label>
     <input type="password" id="c" name="clave"></p>

  <p><label for="d">number</label>
     <input type="number" id="d" name="cantidad" min="0" max="10" step="1" value="3"></p>

  <p><label for="e">tel</label>
     <input type="tel" id="e" name="telefono" placeholder="341 555-0000"></p>

  <p><label for="f">date</label>
     <input type="date" id="f" name="fecha" value="2026-03-15"></p>

  <p><label for="g">time</label>
     <input type="time" id="g" name="hora" value="14:30"></p>

  <p><label for="h">color</label>
     <input type="color" id="h" name="color" value="#2f6fb5"></p>

  <p><label for="i">range</label>
     <input type="range" id="i" name="nivel" min="0" max="100" value="40"></p>

  <p><label for="j">file</label>
     <input type="file" id="j" name="foto" accept="image/*"></p>

  <p><input type="checkbox" id="k" name="acepto" value="si">
     <label for="k">checkbox (value="si")</label></p>
</form>

<p class="rotulo">Esto es lo que se enviaría:</p>
<pre id="salida"></pre>

<script>
  var f = document.getElementById("muestrario");
  var salida = document.getElementById("salida");
  function mostrar() {
    salida.textContent = new URLSearchParams(new FormData(f)).toString();
  }
  f.addEventListener("input", mostrar);
  mostrar();
</script>`}
          consigna="Tildá y destildá el checkbox mirando el recuadro negro. Después cambiá el type del primer campo por url y fijate cómo cambia el teclado en el celular."
        />

        <Nota tipo="atencion" titulo="number no es para números que no son cantidades">
          <p>
            Un DNI, un teléfono, un código postal o un número de tarjeta{" "}
            <em>parecen</em> números pero no lo son: no se suman, pueden empezar
            con cero y a veces tienen guiones. Con <code>type="number"</code> el
            navegador te borra el cero inicial y te agrega flechitas para
            incrementar un DNI. Para esos casos usá <code>type="text"</code>{" "}
            (o <code>tel</code>) con <code>inputmode="numeric"</code> y{" "}
            <code>pattern</code>.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Un type desconocido no rompe nada">
          <p>
            Si el navegador no entiende un <code>type</code>, lo trata como{" "}
            <code>text</code>. Por eso escribir <code>type="email"</code> o{" "}
            <code>type="date"</code> es siempre seguro: en el peor de los casos
            te queda un campo de texto común.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="select, textarea y agrupar con fieldset">
        <p>
          Tres controles que no son <code>&lt;input&gt;</code> y que tienen cada
          uno su detalle:
        </p>

        <ul>
          <li>
            <strong>
              <code>&lt;select&gt;</code>
            </strong>{" "}
            agrupa opciones con <code>&lt;optgroup label="..."&gt;</code>. Lo que
            viaja es el <code>value</code> de la <code>&lt;option&gt;</code>{" "}
            elegida; si la opción no tiene <code>value</code>, viaja su texto.
          </li>
          <li>
            <strong>
              <code>&lt;textarea&gt;</code>
            </strong>{" "}
            <strong>no usa un atributo <code>value</code></strong>: su contenido
            es el texto que ponés entre la etiqueta de apertura y la de cierre.
            Eso es así porque tiene que poder guardar saltos de línea, y un
            atributo HTML es una sola línea. Cuidado con los espacios: todo lo
            que escribas ahí adentro, sangría incluida, es parte del valor.
          </li>
          <li>
            <strong>
              <code>&lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code>
            </strong>{" "}
            agrupan controles relacionados. Es casi obligatorio con los radios:
            sin el <code>&lt;legend&gt;</code>, un lector de pantalla lee
            &quot;Efectivo&quot;, &quot;Tarjeta&quot;, &quot;Transferencia&quot;
            sueltos, sin decir nunca que la pregunta era la forma de pago.
          </li>
        </ul>

        <Editor
          solapas="html"
          css={
            CSS_BASE +
            `
  fieldset { border: 1px solid #b9c6d6; border-radius: 8px; padding: 10px 14px; }
  legend { font-weight: 700; font-size: 14px; padding: 0 6px; }
  fieldset p { display: flex; align-items: center; gap: 8px; margin: 4px 0; }
  fieldset label { font-weight: 400; margin: 0; }
`
          }
          html={`<form id="pedido">
  <p>
    <label for="sucursal">Sucursal</label>
    <select id="sucursal" name="sucursal">
      <optgroup label="Santa Fe">
        <option value="ros">Rosario centro</option>
        <option value="sfe">Santa Fe capital</option>
      </optgroup>
      <optgroup label="Córdoba">
        <option value="cba">Córdoba nueva córdoba</option>
        <option value="vcp">Villa Carlos Paz</option>
      </optgroup>
    </select>
  </p>

  <fieldset>
    <legend>Forma de pago</legend>
    <p><input type="radio" id="p1" name="pago" value="efectivo" checked>
       <label for="p1">Efectivo</label></p>
    <p><input type="radio" id="p2" name="pago" value="tarjeta">
       <label for="p2">Tarjeta</label></p>
    <p><input type="radio" id="p3" name="pago" value="transferencia">
       <label for="p3">Transferencia</label></p>
  </fieldset>

  <p>
    <label for="nota">Aclaraciones</label>
    <textarea id="nota" name="nota" rows="3" maxlength="200">Sin sal, por favor.</textarea>
  </p>
</form>

<p class="rotulo">Esto es lo que se enviaría:</p>
<pre id="salida"></pre>

<script>
  var f = document.getElementById("pedido");
  var salida = document.getElementById("salida");
  function mostrar() {
    salida.textContent = new URLSearchParams(new FormData(f)).toString();
  }
  f.addEventListener("input", mostrar);
  mostrar();
</script>`}
          consigna={`Cambiale el name a uno de los radios (por ejemplo pago2) y fijate que ahora podés tener dos opciones elegidas a la vez.`}
        />

        <Nota tipo="atencion" titulo="Los radios se agrupan por name, no por fieldset">
          <p>
            Lo que hace que elegir uno apague al otro es compartir el mismo{" "}
            <code>name</code>. El <code>&lt;fieldset&gt;</code> es para el
            significado y la accesibilidad, no para la exclusión. Y como el{" "}
            <code>name</code> es el mismo en los tres, lo que los distingue es el{" "}
            <code>value</code>: sin <code>value</code>, los tres envían{" "}
            <code>on</code> y no sabés cuál eligió el usuario.
          </p>
        </Nota>

        <Nota tipo="info" titulo="En React el textarea sí usa value">
          <p>
            React unifica el manejo de todos los controles, así que ahí{" "}
            <code>&lt;textarea value={"{texto}"} /&gt;</code> es lo normal y
            poner contenido adentro da error. Lo mismo con{" "}
            <code>&lt;select value={"{...}"}&gt;</code> en vez de{" "}
            <code>selected</code>. Está explicado en{" "}
            <Link href="/react/formularios">Formularios controlados</Link>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Validación nativa: lo que el navegador hace gratis">
        <p>
          Esta es la parte que casi nadie usa y la que más código ahorra. Con
          atributos, sin una sola línea de JavaScript, el navegador frena el
          envío, enfoca el primer campo que está mal y muestra un globo con el
          error, traducido al idioma del usuario.
        </p>

        <ul>
          <li>
            <code>required</code>: no puede quedar vacío.
          </li>
          <li>
            <code>minlength</code> / <code>maxlength</code>: cantidad de
            caracteres. Importante:{" "}
            <strong>
              <code>maxlength</code> impide seguir tecleando
            </strong>
            , mientras que <code>minlength</code> deja escribir de menos y recién
            frena al enviar.
          </li>
          <li>
            <code>min</code> / <code>max</code> / <code>step</code>: rango y
            salto. Andan en <code>number</code>, <code>range</code>,{" "}
            <code>date</code> y <code>time</code>. En una fecha,{" "}
            <code>min="2026-01-01"</code> es perfectamente válido.
          </li>
          <li>
            <code>pattern</code>: una expresión regular que el valor tiene que
            cumplir <strong>entera</strong> (va anclada sola, no hace falta{" "}
            <code>^</code> ni <code>$</code>). Solo aplica a los tipos de texto.
          </li>
          <li>
            <code>title</code>: el texto de ayuda que el navegador agrega al
            globo cuando falla un <code>pattern</code>. Sin <code>title</code>,
            el mensaje es &quot;Coincidí con el formato solicitado&quot; y el
            usuario no tiene idea de qué formato es. Con <code>pattern</code>{" "}
            siempre va <code>title</code>.
          </li>
          <li>El propio <code>type</code>: <code>email</code> y <code>url</code> validan solos.</li>
        </ul>

        <p>
          Probá el formulario de abajo: tocá <em>Crear cuenta</em> con todo vacío
          y mirá el globo. Después escribí <code>Ana Pérez</code> en el usuario y
          volvé a intentar &mdash; ahí aparece el <code>title</code>.
        </p>

        <Editor
          solapas="html"
          css={CSS_BASE + `
  #salida-ok { color: #0f7a52; font-weight: 700; font-size: 14px; }
`}
          html={`<form id="registro">
  <p>
    <label for="usuario">Usuario</label>
    <input type="text" id="usuario" name="usuario"
           required minlength="3" maxlength="12"
           pattern="[a-z0-9_]+"
           title="De 3 a 12 caracteres: minúsculas, números y guión bajo.">
  </p>

  <p>
    <label for="mail">Correo</label>
    <input type="email" id="mail" name="mail" required
           placeholder="ana@ejemplo.com">
  </p>

  <p>
    <label for="edad">Edad</label>
    <input type="number" id="edad" name="edad" required min="16" max="120" step="1">
  </p>

  <p>
    <label for="clave">Contraseña (mínimo 8)</label>
    <input type="password" id="clave" name="clave" required minlength="8">
  </p>

  <button type="submit">Crear cuenta</button>
  <p id="salida-ok"></p>
</form>

<script>
  // El navegador ya frena el envío solo. Este listener es únicamente
  // para avisarte cuando el formulario SÍ pasó la validación.
  document.getElementById("registro").addEventListener("submit", function (evento) {
    evento.preventDefault();
    document.getElementById("salida-ok").textContent =
      "✓ Válido. Acá recién arrancaría el envío de verdad.";
  });
</script>`}
          consigna="Escribí solo 2 letras en Usuario y enviá: el globo te dice el mínimo. Después sacale el atributo title y mirá qué pobre queda el mensaje."
        />

        <Nota tipo="atencion" titulo="Esto es comodidad, no seguridad">
          <p>
            Todo lo de esta sección corre en la máquina del usuario, y el usuario
            manda ahí. Se desactiva con <code>F12</code> borrando un atributo, o
            directamente mandando el pedido sin pasar por la página. La
            validación del navegador existe para que la persona se entere del
            error antes de esperar la respuesta del servidor, nada más.{" "}
            <strong>
              Todo dato que llega al servidor se vuelve a validar en el servidor
            </strong>
            , sin excepciones, aunque el formulario ya lo haya validado.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Patrones que vas a reusar">
          <Codigo
            codigo={`<!-- Solo dígitos, exactamente 4 (código postal viejo) -->
pattern="[0-9]{4}" title="Cuatro números."

<!-- DNI: 7 u 8 dígitos -->
pattern="[0-9]{7,8}" title="7 u 8 números, sin puntos."

<!-- Patente nueva: AB123CD -->
pattern="[A-Z]{2}[0-9]{3}[A-Z]{2}" title="Formato AB123CD, en mayúsculas."

<!-- Al menos una minúscula, una mayúscula y un número -->
pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
title="Mínimo 8, con mayúscula, minúscula y número."`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="Pintar el error: :user-invalid contra :invalid">
        <p>
          CSS puede leer el estado de validación de un campo. Los selectores que
          importan son cuatro:
        </p>

        <ul>
          <li>
            <code>:required</code> &mdash; el campo es obligatorio. Sirve para
            marcarlo sin escribir un asterisco a mano en cada label.
          </li>
          <li>
            <code>:valid</code> / <code>:invalid</code> &mdash; el valor cumple o
            no cumple las reglas. Se aplican{" "}
            <strong>desde que carga la página</strong>.
          </li>
          <li>
            <code>:user-invalid</code> / <code>:user-valid</code> &mdash; lo
            mismo, pero solo después de que el usuario{" "}
            <strong>interactuó con ese campo</strong> (escribió y se fue, o
            intentó enviar).
          </li>
        </ul>

        <p>
          Ahí está toda la diferencia. Un formulario vacío es, por definición,
          inválido: si usás <code>:invalid</code>, el usuario abre la página y
          encuentra todo pintado de rojo antes de haber hecho nada mal. Eso es
          exactamente lo contrario de lo que querés.{" "}
          <code>:user-invalid</code> espera a que la persona tenga la culpa.
        </p>

        <Editor
          css={`
  body { font-size: 15px; }
  form { display: grid; gap: 14px; max-width: 420px; }
  label { display: block; font-weight: 600; font-size: 14px; margin-bottom: 3px; }
  input { font: inherit; width: 100%; padding: 7px 9px; border-radius: 6px;
          border: 2px solid #b9c6d6; }

  /* Marca los obligatorios sin tocar el HTML. */
  label:has(+ input:required)::after { content: " *"; color: #b4243a; }

  /* Rojo solo después de que el usuario tocó el campo. */
  input:user-invalid { border-color: #b4243a; background: #fdeaed; }
  input:user-valid   { border-color: #0f7a52; background: #e3f6ee; }

  /* El mensajito de ayuda aparece únicamente cuando hay error. */
  .ayuda { display: none; font-size: 13px; color: #b4243a; margin: 4px 0 0; }
  p:has(input:user-invalid) .ayuda { display: block; }
`}
          html={`<form>
  <p>
    <label for="correo">Correo</label>
    <input type="email" id="correo" name="correo" required>
    <span class="ayuda">Escribí una dirección con arroba y dominio.</span>
  </p>

  <p>
    <label for="cp">Código postal</label>
    <input type="text" id="cp" name="cp" required
           pattern="[0-9]{4}" title="Cuatro números.">
    <span class="ayuda">Son cuatro números, sin letras.</span>
  </p>

  <p>
    <label for="apodo">Apodo (opcional)</label>
    <input type="text" id="apodo" name="apodo">
  </p>
</form>`}
          consigna="Escribí cualquier cosa en Correo y salí del campo. Después, en la solapa CSS, cambiá :user-invalid por :invalid y :user-valid por :valid: ahora está todo rojo desde el arranque."
        />

        <Comparacion>
          <Columna tono="mal" titulo=":invalid">
            <Codigo
              codigo={`input:invalid {
  border-color: crimson;
}`}
            />
            <p className="tenue">
              Pinta de rojo un formulario recién abierto, donde el usuario
              todavía no escribió nada. Genera ansiedad y deja de significar
              algo: si todo está en rojo, el rojo no avisa nada.
            </p>
          </Columna>
          <Columna tono="bien" titulo=":user-invalid">
            <Codigo
              codigo={`input:user-invalid {
  border-color: crimson;
}`}
            />
            <p className="tenue">
              El rojo aparece cuando la persona efectivamente se equivocó, y
              desaparece apenas lo corrige. Es el comportamiento que antes había
              que programar a mano con eventos de <code>blur</code>.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="info" titulo="Los otros estados que se pueden estilar">
          <p>
            <code>:checked</code> (checkbox y radio tildados),{" "}
            <code>:disabled</code>, <code>:read-only</code>,{" "}
            <code>:placeholder-shown</code> (el campo está vacío y se ve el
            placeholder) y <code>:focus-visible</code> (el foco llegó por
            teclado, no por click). Con esos cinco y <code>:has()</code> se arman
            casi todos los formularios sin JavaScript.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Los atributos que cambian la experiencia">
        <p>
          <code>autocomplete</code> es el que más tiempo le ahorra al usuario y
          el que más se escribe mal. No es un sí/no: es una etiqueta que le dice
          al navegador <em>qué significa</em> ese campo, para que ofrezca el dato
          guardado correcto y para que el gestor de contraseñas entienda la
          pantalla.
        </p>

        <Codigo
          archivo="valores de autocomplete que se usan todo el tiempo"
          codigo={`<input name="nombre"   autocomplete="name">
<input name="mail"     autocomplete="email">
<input name="tel"      autocomplete="tel">
<input name="calle"    autocomplete="street-address">
<input name="cp"       autocomplete="postal-code">

<!-- Iniciar sesión -->
<input type="password" autocomplete="current-password">
<!-- Registrarse o cambiar la clave: así el navegador OFRECE una clave fuerte -->
<input type="password" autocomplete="new-password">
<!-- El código que llega por SMS: el celular lo completa solo -->
<input type="text" inputmode="numeric" autocomplete="one-time-code">`}
        />

        <p>
          <code>autocomplete="off"</code> casi nunca es la respuesta: los
          navegadores lo ignoran en varios casos y lo único que lográs es que la
          gente escriba su dirección a mano. Reservalo para campos que de verdad
          no se repiten nunca, como un código de un solo uso generado por vos.
        </p>

        <p>
          El otro par que se confunde siempre es <code>disabled</code> contra{" "}
          <code>readonly</code>. Se parecen en pantalla y son distintos en todo
          lo demás. Mirá el recuadro negro:
        </p>

        <Editor
          solapas="html"
          css={CSS_BASE + `
  input[readonly] { background: #eef3fa; }
  input[disabled] { background: #eef3fa; color: #90a2b6; }
`}
          html={`<form id="cuenta">
  <p>
    <label for="u">Usuario (readonly: se puede enfocar, copiar, y VIAJA)</label>
    <input type="text" id="u" name="usuario" value="ana.perez" readonly>
  </p>

  <p>
    <label for="pl">Plan (disabled: no se enfoca, no se copia, NO viaja)</label>
    <input type="text" id="pl" name="plan" value="gratuito" disabled>
  </p>

  <p>
    <label for="c">Comentario</label>
    <input type="text" id="c" name="comentario" value="hola">
  </p>
</form>

<p class="rotulo">Esto es lo que se enviaría:</p>
<pre id="salida"></pre>

<script>
  var f = document.getElementById("cuenta");
  var salida = document.getElementById("salida");
  function mostrar() {
    salida.textContent = new URLSearchParams(new FormData(f)).toString();
  }
  f.addEventListener("input", mostrar);
  mostrar();
</script>`}
          consigna="Intentá seleccionar el texto de cada campo con el mouse. Después cambiá disabled por readonly en el campo Plan y mirá aparecer el dato en el paquete."
        />

        <Nota tipo="info" titulo="Cuando querés apagar la validación a propósito">
          <p>
            <code>novalidate</code> en el <code>&lt;form&gt;</code> desactiva
            toda la validación nativa. Sirve cuando vas a validar vos con
            JavaScript y querés mostrar tus propios mensajes en vez de los globos
            del navegador.
          </p>
          <p>
            Más fino:{" "}
            <code>formnovalidate</code> en un botón puntual apaga la validación{" "}
            <em>solo para ese botón</em>. Es exactamente lo que necesita un
            &quot;Guardar borrador&quot; que tiene que poder guardar un
            formulario a medio llenar.
          </p>
          <Codigo
            codigo={`<button type="submit">Publicar</button>
<button type="submit" formnovalidate formaction="/borradores">
  Guardar borrador
</button>`}
          />
        </Nota>

        <Nota tipo="atencion" titulo="autofocus: uno solo, y casi nunca">
          <p>
            <code>autofocus</code> mueve el foco al cargar la página. En una
            pantalla que es solo un buscador está perfecto. En una página larga
            es un desastre: te saltea el encabezado, te hace scroll solo y en un
            celular te abre el teclado tapando media pantalla.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Un formulario de contacto que valide sin JavaScript"
          pista={
            <div>
              <p>Repasá qué necesita cada campo:</p>
              <ul>
                <li>
                  Nombre: <code>required</code> más un{" "}
                  <code>minlength</code> chico.
                </li>
                <li>
                  Correo: el <code>type</code> correcto ya valida solo, pero
                  vacío igual pasa si no le ponés <code>required</code>.
                </li>
                <li>
                  Teléfono: <code>type="tel"</code> no valida nada, así que el
                  formato lo tenés que exigir con <code>pattern</code> &mdash; y
                  donde hay <code>pattern</code> hay <code>title</code>.
                </li>
                <li>
                  Los radios se excluyen porque comparten el <code>name</code>, y
                  se distinguen por el <code>value</code>.
                </li>
                <li>
                  El texto del <code>&lt;textarea&gt;</code> no va en un
                  atributo.
                </li>
              </ul>
            </div>
          }
          solucion={
            <Editor
              solapas="html"
              css={
                CSS_BASE +
                `
  fieldset { border: 1px solid #b9c6d6; border-radius: 8px; padding: 10px 14px; }
  legend { font-weight: 700; font-size: 14px; padding: 0 6px; }
  fieldset p { display: flex; align-items: center; gap: 8px; margin: 4px 0; }
  fieldset label { font-weight: 400; margin: 0; }
  input:user-invalid, textarea:user-invalid { border-color: #b4243a; background: #fdeaed; }
  #ok { color: #0f7a52; font-weight: 700; font-size: 14px; }
`
              }
              html={`<form id="contacto" action="/contacto" method="post">
  <p>
    <label for="nombre">Nombre y apellido</label>
    <input type="text" id="nombre" name="nombre" required minlength="2"
           autocomplete="name">
  </p>

  <p>
    <label for="correo">Correo</label>
    <input type="email" id="correo" name="correo" required
           autocomplete="email" placeholder="ana@ejemplo.com">
  </p>

  <p>
    <label for="tel">Teléfono</label>
    <input type="tel" id="tel" name="telefono" required
           autocomplete="tel"
           pattern="[0-9]{10}"
           title="10 números, sin 0 ni 15, sin espacios ni guiones.">
  </p>

  <p>
    <label for="motivo">Motivo</label>
    <select id="motivo" name="motivo" required>
      <option value="">Elegí una opción</option>
      <optgroup label="Antes de comprar">
        <option value="precio">Precios y planes</option>
        <option value="demo">Pedir una demo</option>
      </optgroup>
      <optgroup label="Ya soy cliente">
        <option value="soporte">Soporte técnico</option>
        <option value="factura">Facturación</option>
      </optgroup>
    </select>
  </p>

  <fieldset>
    <legend>¿Cómo preferís que te contestemos?</legend>
    <p><input type="radio" id="r1" name="canal" value="correo" checked>
       <label for="r1">Por correo</label></p>
    <p><input type="radio" id="r2" name="canal" value="telefono">
       <label for="r2">Por teléfono</label></p>
  </fieldset>

  <p>
    <label for="mensaje">Mensaje</label>
    <textarea id="mensaje" name="mensaje" rows="4"
              required minlength="20" maxlength="500"></textarea>
  </p>

  <button type="submit">Enviar consulta</button>
  <p id="ok"></p>
</form>

<script>
  document.getElementById("contacto").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("ok").textContent = "✓ Pasó toda la validación nativa.";
  });
</script>`}
              consigna="Enviá con el mensaje a medio escribir para ver cómo actúa minlength, y fijate que el select obligatorio necesita una option con value vacío."
            />
          }
        >
          <p>
            Armá un formulario de contacto con: nombre (obligatorio), correo
            (obligatorio y con formato de correo), teléfono (obligatorio, 10
            dígitos exactos), un <code>&lt;select&gt;</code> de motivo con dos{" "}
            <code>&lt;optgroup&gt;</code> y donde{" "}
            <strong>no se pueda dejar la opción vacía</strong>, un{" "}
            <code>&lt;fieldset&gt;</code> con dos radios para el canal de
            respuesta, y un mensaje de entre 20 y 500 caracteres. Cada control
            con su <code>&lt;label&gt;</code> y su <code>name</code>. Ni una
            línea de JavaScript para validar.
          </p>
          <p className="tenue">
            El detalle fino: para que un <code>&lt;select&gt;</code> con{" "}
            <code>required</code> sirva de algo, la primera opción tiene que
            tener <code>value=&quot;&quot;</code>. Si no, siempre hay algo
            elegido y <code>required</code> no frena nunca.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Encontrá los seis errores"
          pista={
            <div>
              <p>Recorrelo con esta lista en la mano:</p>
              <ul>
                <li>
                  ¿El <code>for</code> de cada label apunta a un{" "}
                  <code>id</code> que existe? (apunta al <code>id</code>, no al{" "}
                  <code>name</code>)
                </li>
                <li>¿Qué hace que dos radios se excluyan entre sí?</li>
                <li>
                  ¿Cómo se pone el texto inicial de un{" "}
                  <code>&lt;textarea&gt;</code>?
                </li>
                <li>
                  ¿Qué <code>type</code> tiene un <code>&lt;button&gt;</code> que
                  no lo declara?
                </li>
                <li>¿Qué atributo hace que un dato viaje?</li>
                <li>
                  ¿Qué mensaje muestra un <code>pattern</code> que falla y no
                  tiene <code>title</code>?
                </li>
              </ul>
            </div>
          }
          solucion={
            <div>
              <p>Los seis, en orden:</p>
              <ol>
                <li>
                  <code>&lt;label for="correo"&gt;</code> apuntaba al{" "}
                  <code>name</code>; el <code>id</code> del campo era{" "}
                  <code>mail</code>. La etiqueta no enfocaba nada. Van{" "}
                  <code>for</code> e <code>id</code> iguales.
                </li>
                <li>
                  Los dos radios tenían <code>name</code> distinto
                  (<code>envio1</code> y <code>envio2</code>), así que se podían
                  elegir los dos. Comparten <code>name="envio"</code> y se
                  distinguen por <code>value</code>.
                </li>
                <li>
                  El <code>&lt;textarea&gt;</code> traía{" "}
                  <code>value="..."</code>, que ahí no existe: el texto va entre
                  las etiquetas.
                </li>
                <li>
                  <code>&lt;button&gt;Ver ayuda&lt;/button&gt;</code> sin{" "}
                  <code>type</code> enviaba el formulario. Le falta{" "}
                  <code>type="button"</code>.
                </li>
                <li>
                  El campo de ciudad no tenía <code>name</code>: se completaba y
                  no llegaba nunca al servidor.
                </li>
                <li>
                  El <code>pattern</code> del código postal no tenía{" "}
                  <code>title</code>, así que el error era el inútil
                  &quot;coincidí con el formato solicitado&quot;.
                </li>
              </ol>
              <Editor
                solapas="html"
                css={
                  CSS_BASE +
                  `
  fieldset { border: 1px solid #b9c6d6; border-radius: 8px; padding: 10px 14px; }
  legend { font-weight: 700; font-size: 14px; padding: 0 6px; }
  fieldset p { display: flex; align-items: center; gap: 8px; margin: 4px 0; }
  fieldset label { font-weight: 400; margin: 0; }
`
                }
                html={`<form id="arreglado">
  <p>
    <label for="mail">Correo</label>
    <input type="email" id="mail" name="correo" required autocomplete="email">
  </p>

  <p>
    <label for="ciudad">Ciudad</label>
    <input type="text" id="ciudad" name="ciudad" required>
  </p>

  <p>
    <label for="cp">Código postal</label>
    <input type="text" id="cp" name="cp" required
           pattern="[0-9]{4}" title="Cuatro números, sin letras.">
  </p>

  <fieldset>
    <legend>Envío</legend>
    <p><input type="radio" id="e1" name="envio" value="domicilio" checked>
       <label for="e1">A domicilio</label></p>
    <p><input type="radio" id="e2" name="envio" value="sucursal">
       <label for="e2">Retiro en sucursal</label></p>
  </fieldset>

  <p>
    <label for="nota">Aclaraciones</label>
    <textarea id="nota" name="nota" rows="3">Tocar timbre 2B.</textarea>
  </p>

  <p>
    <button type="submit">Confirmar</button>
    <button type="button">Ver ayuda</button>
  </p>
</form>

<p class="rotulo">Esto es lo que se enviaría:</p>
<pre id="salida"></pre>

<script>
  var f = document.getElementById("arreglado");
  var salida = document.getElementById("salida");
  function mostrar() {
    salida.textContent = new URLSearchParams(new FormData(f)).toString();
  }
  f.addEventListener("input", mostrar);
  f.addEventListener("submit", function (e) { e.preventDefault(); });
  mostrar();
</script>`}
                consigna="Comprobá que ahora las cuatro etiquetas enfocan su campo y que los dos radios se excluyen."
              />
            </div>
          }
        >
          <p>
            Este formulario tiene seis problemas. Dos se ven mirando el código,
            cuatro solo aparecen cuando lo usás. Encontralos y arreglalos; podés
            pegarlo en cualquiera de los editores de arriba para probarlo.
          </p>
          <Codigo
            archivo="pedido.html"
            codigo={`<form action="/pedido" method="post">
  <label for="correo">Correo</label>
  <input type="email" id="mail" name="correo" required>

  <label for="ciudad">Ciudad</label>
  <input type="text" id="ciudad" required>

  <label for="cp">Código postal</label>
  <input type="text" id="cp" name="cp" required pattern="[0-9]{4}">

  <fieldset>
    <legend>Envío</legend>
    <input type="radio" id="e1" name="envio1" value="domicilio">
    <label for="e1">A domicilio</label>
    <input type="radio" id="e2" name="envio2" value="sucursal">
    <label for="e2">Retiro en sucursal</label>
  </fieldset>

  <label for="nota">Aclaraciones</label>
  <textarea id="nota" name="nota" value="Tocar timbre 2B."></textarea>

  <button type="submit">Confirmar</button>
  <button>Ver ayuda</button>
</form>`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
