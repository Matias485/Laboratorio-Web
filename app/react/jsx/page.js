import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import ListaDeTareas from "./ListaDeTareas";
import ListaDeTareasDemo from "./ListaDeTareasDemo";
import LlavesDemo from "./LlavesDemo";
import TraductorHtmlJsxDemo from "./TraductorHtmlJsxDemo";

export const metadata = { title: "JSX" };

// Los atributos que más cambian al pasar de HTML a JSX.
const ATRIBUTOS = [
  ["class", "className", "en el DOM ya era elemento.className: class es palabra reservada"],
  ["for", "htmlFor", "en el DOM es elemento.htmlFor: for también es reservada"],
  ["onclick", "onClick", "todos los eventos van en camelCase"],
  ["onchange", "onChange", "lo mismo: onInput, onSubmit, onMouseOver…"],
  ["tabindex", "tabIndex", "camelCase, como en el DOM"],
  ["maxlength", "maxLength", "camelCase, como en el DOM"],
  ["readonly", "readOnly", "camelCase, como en el DOM"],
  ["colspan", "colSpan", "camelCase, como en el DOM"],
  ["stroke-width", "strokeWidth", "también adentro de un svg: el guion no puede ir"],
  ["aria-label", "aria-label", "¡no cambia! aria-* mantiene los guiones"],
  ["data-id", "data-id", "¡no cambia! data-* mantiene los guiones"],
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

export default function Pagina() {
  return (
    <Leccion
      slug="/react/jsx"
      titulo="JSX"
      resumen="Las reglas de JSX: un solo elemento raíz, etiquetas cerradas, className y llaves."
    >
      <Seccion titulo="Qué es JSX (y qué no es)">
        <p>
          JSX es una extensión de sintaxis para JavaScript. Te deja escribir algo
          muy parecido a HTML adentro de un archivo <code>.js</code>. Ojo con las
          dos trampas del nombre: <strong>no es HTML</strong> y{" "}
          <strong>tampoco es un string</strong>. Es sintaxis que se compila, antes
          de llegar al navegador, a llamadas a funciones comunes y corrientes.
        </p>
        <Codigo
          archivo="Saludo.js"
          codigo={`// Lo que escribís vos
function Saludo() {
  return <h1 className="titulo">Hola</h1>;
}

// En lo que lo convierte el compilador, antes de llegar al navegador
import { jsx as _jsx } from "react/jsx-runtime";

function Saludo() {
  return _jsx("h1", { className: "titulo", children: "Hola" });
}`}
        />
        <p>
          Si en algún tutorial viste <code>React.createElement</code>, es lo
          mismo con otra cara: así escribía el compilador hasta React 16. Desde
          React 17 usa esa función <code>jsx</code> de{" "}
          <code>react/jsx-runtime</code> y la importa solo, y por eso los
          archivos de este laboratorio no llevan arriba{" "}
          <code>{'import React from "react"'}</code>.
        </p>
        <p>
          Esa traducción explica casi todas las reglas que vienen abajo: si el
          marcado termina siendo una llamada a función, entonces tiene que
          devolver <strong>un solo valor</strong>, y cada atributo termina siendo{" "}
          <strong>una clave de un objeto de JavaScript</strong>.
        </p>
        <Nota tipo="info" titulo="Por qué el marcado y la lógica viven juntos">
          <p>
            Durante años nos enseñaron a separar el HTML del JavaScript en
            archivos distintos. React los junta a propósito: un botón y el código
            que responde a su click cambian siempre al mismo tiempo, así que
            conviene tenerlos a la vista uno al lado del otro.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Regla 1: un solo elemento raíz">
        <p>
          Un componente es una función, y una función devuelve un solo valor. Si
          querés devolver dos elementos hermanos, hay que envolverlos.
        </p>
        <Comparacion>
          <Columna tono="mal" titulo="No compila">
            <Codigo
              archivo="Perfil.js"
              codigo={`function Perfil() {
  return (
    <h1>Gregorio Y. Zara</h1>
    <img src="https://i.imgur.com/7vQD0fPs.jpg" />
  );
}
// Error: JSX expressions must have one parent element`}
            />
          </Columna>
          <Columna tono="bien" titulo="Con un Fragment">
            <Codigo
              archivo="Perfil.js"
              resaltar={[3, 6]}
              codigo={`function Perfil() {
  return (
    <>
      <h1>Gregorio Y. Zara</h1>
      <img src="https://i.imgur.com/7vQD0fPs.jpg" />
    </>
  );
}`}
            />
          </Columna>
        </Comparacion>
        <p>
          Esa etiqueta vacía <code>{"<> … </>"}</code> es un{" "}
          <strong>Fragment</strong>: agrupa elementos para React, pero no aparece
          en el HTML final. Envolver todo en un <code>{"<div>"}</code> también
          sirve, con una diferencia importante: el <code>{"<div>"}</code> sí queda
          en la página y puede desacomodarte el CSS (un <code>{"<div>"}</code> de
          más adentro de un grid o de un <code>{"<ul>"}</code> rompe el diseño).
          Si no necesitás el contenedor, usá el Fragment.
        </p>
        <Nota tipo="atencion" titulo="Los paréntesis del return no son decoración">
          <p>
            Si escribís <code>return</code> y en la línea siguiente arrancás con{" "}
            <code>{"<div>"}</code>, JavaScript te mete un punto y coma automático
            justo después del <code>return</code> y tu componente devuelve{" "}
            <code>undefined</code>. O ponés el <code>{"<"}</code> en la misma
            línea del <code>return</code>, o abrís paréntesis.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Regla 2: todas las etiquetas se cierran">
        <p>
          En HTML el navegador te perdona una etiqueta abierta. En JSX no: el
          compilador necesita saber exactamente dónde termina cada elemento.
        </p>
        <Comparacion>
          <Columna tono="mal" titulo="HTML válido que en JSX no compila">
            <Codigo
              archivo="pagina.html"
              codigo={`<img src="https://i.imgur.com/7vQD0fPs.jpg">
<br>
<input type="text">
<li>Mejorar el videoteléfono`}
            />
          </Columna>
          <Columna tono="bien" titulo="JSX">
            <Codigo
              archivo="Componente.js"
              codigo={`<img src="https://i.imgur.com/7vQD0fPs.jpg" />
<br />
<input type="text" />
<li>Mejorar el videoteléfono</li>`}
            />
          </Columna>
        </Comparacion>
        <p>
          Las etiquetas que en HTML nunca llevan cierre — <code>{"<img>"}</code>,{" "}
          <code>{"<br>"}</code>, <code>{"<input>"}</code>, <code>{"<hr>"}</code> —
          en JSX se <strong>autocierran</strong>: barra antes del mayor,{" "}
          <code>{"<img />"}</code>. Las demás se cierran como siempre.
        </p>
      </Seccion>

      <Seccion titulo="Regla 3: casi todo pasa a camelCase">
        <p>
          Los atributos de JSX no son atributos de HTML: son claves de un objeto,
          y React eligió llamarlas igual que las propiedades del DOM, esas que ya
          usabas desde JavaScript. En el DOM van en camelCase porque un nombre
          con guion no se puede escribir después de un punto: a{" "}
          <code>elemento.stroke-width</code> JavaScript lo lee como una resta. Y
          los dos cambios que más se olvidan, <code>className</code> y{" "}
          <code>htmlFor</code>, se llaman así porque <code>class</code> y{" "}
          <code>for</code> son palabras reservadas del lenguaje.
        </p>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.92rem",
            marginBottom: 16,
          }}
        >
          <thead>
            <tr>
              <th style={th}>En HTML</th>
              <th style={th}>En JSX</th>
              <th style={th}>Por qué</th>
            </tr>
          </thead>
          <tbody>
            {ATRIBUTOS.map(([html, jsx, motivo]) => (
              <tr key={html}>
                <td style={td}>
                  <code>{html}</code>
                </td>
                <td style={td}>
                  <code>{jsx}</code>
                </td>
                <td style={{ ...td, color: "var(--texto-suave)" }}>{motivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Nota tipo="atencion" titulo="Las dos excepciones">
          <p>
            <code>aria-*</code> y <code>data-*</code> se escriben con guiones,
            igual que en HTML: React no les toca el nombre, los manda al DOM tal
            cual. Son las dos excepciones con las que te vas a cruzar.
          </p>
        </Nota>
        <p>
          Ya tenés las tres reglas. Probalas acá: elegí un pedazo de HTML y mirá
          qué hay que tocarle para que sea JSX válido.
        </p>
        <Demo titulo="Traductor de HTML a JSX">
          <TraductorHtmlJsxDemo />
        </Demo>
        <Nota tipo="ok" titulo="Atajo para cuando tengas apuro">
          <p>
            Existen conversores automáticos de HTML a JSX. Sirven para pegar un
            bloque grande, pero hacé a mano los primeros diez: las reglas se
            aprenden equivocándose.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Las llaves: JavaScript adentro del marcado">
        <p>
          Las comillas te dan texto fijo. Las llaves te devuelven a JavaScript:
          adentro de <code>{"{ }"}</code> podés poner cualquier{" "}
          <strong>expresión</strong> — una variable, una cuenta, una llamada a una
          función. Se usan en dos lugares.
        </p>
        <Codigo
          archivo="Perfil.js"
          resaltar={[4, 7]}
          codigo={`const persona = { nombre: "Gregorio", foto: "https://i.imgur.com/7vQD0fPs.jpg" };

// 1. Como texto, adentro de una etiqueta
<h1>Hola, {persona.nombre}</h1>

// 2. Como valor de un atributo, en el lugar de las comillas
<img src={persona.foto} />`}
        />
        <p>
          Y hay dos lugares donde <strong>no</strong> se pueden usar: para el
          nombre de un atributo y para el nombre de una etiqueta.
        </p>
        <Codigo
          archivo="asi-no.js"
          codigo={`<img {atributo}="foto.jpg" />   // ✗ el nombre del atributo no puede ser variable
<{etiqueta}>Hola</{etiqueta}>   // ✗ el nombre de la etiqueta tampoco`}
        />
        <Demo titulo="Tocá los valores y mirá las llaves trabajar">
          <LlavesDemo />
        </Demo>
        <Codigo
          archivo="app/react/jsx/LlavesDemo.js"
          resaltar={[5, 6, 7, 8]}
          codigo={`const [nombre, setNombre] = useState("Gregorio");
const [tamano, setTamano] = useState(90);
const persona = { nombre: nombre, foto: FOTO };

<h3>Hola, {persona.nombre}</h3>
<img src={persona.foto} alt={\`Foto de \${persona.nombre}\`} width={tamano} />
<p>Tu nombre tiene {persona.nombre.length} letras y al revés se escribe
  {persona.nombre.split("").reverse().join("")}.</p>`}
        />
        <Nota tipo="atencion" titulo="Llaves o comillas, nunca los dos">
          <p>
            <code>{'src="{persona.foto}"'}</code> no da error, y eso es lo
            peligroso: le pasa a la imagen el texto literal{" "}
            <code>{"{persona.foto}"}</code> y ves el ícono de imagen rota.
          </p>
        </Nota>
        <p>
          Los comentarios adentro del marcado también van entre llaves, porque
          son JavaScript: se escriben con barra y asterisco,{" "}
          <code>{"{/* así */}"}</code>. El comentario de dos barras no sirve acá:
          si lo escribís suelto entre las etiquetas, para JSX es texto y lo vas a
          ver impreso en la página.
        </p>
        <Codigo
          archivo="Componente.js"
          resaltar={[2]}
          codigo={`<div>
  {/* Esto es un comentario: no aparece en la página */}
  <h1>Hola</h1>
</div>`}
        />
        <Nota tipo="atencion" titulo="El comentario de dos barras, adentro de las llaves">
          <p>
            <code>{"{// nota}"}</code> tampoco anda, y el error despista: las dos
            barras comentan todo lo que sigue en esa línea, incluida la llave que
            cerraba. Si lo querés así, la llave de cierre tiene que ir en la
            línea de abajo. Es más fácil acordarse de{" "}
            <code>{"{/* … */}"}</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La doble llave de style">
        <p>
          El <code>style</code> de JSX no recibe un texto como el de HTML: recibe
          un <strong>objeto de JavaScript</strong>. Por eso ves dos llaves
          seguidas, y por eso confunde tanto. Son dos cosas distintas, una al lado
          de la otra:
        </p>
        <Codigo
          archivo="asi-se-lee.js"
          codigo={`style={{ backgroundColor: "black" }}
//    ↑↑                            ↑↑
//    ││                            └┴── las llaves del objeto de JavaScript
//    └┴─────────────────────────────── las llaves de JSX: "acá viene código"`}
        />
        <p>
          Adentro del objeto, las propiedades CSS también van en camelCase:{" "}
          <code>backgroundColor</code> y no <code>background-color</code>,{" "}
          <code>fontSize</code> y no <code>font-size</code>. Y como es un objeto
          común, podés guardarlo en una variable y pasarlo con{" "}
          <strong>una sola llave</strong>. Eso es justo lo que hace el ejemplo de
          la clase:
        </p>
        <Codigo
          archivo="app/react/jsx/ListaDeTareas.js"
          resaltar={[3, 4, 5, 13]}
          codigo={`const persona = {
  nombre: "Gregorio Y. Zara",
  tema: {
    backgroundColor: "black",
    color: "pink",
    padding: 16,        // sin unidad: React le agrega "px" solo
    borderRadius: 10,
  },
};

export default function ListaDeTareas() {
  return (
    <div style={persona.tema}>
      <h1>Tareas de {persona.nombre}</h1>
      <img
        width={90}
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Mejorar el videoteléfono</li>
        <li>Preparar las clases de aeronáutica</li>
        <li>Trabajar en el motor a alcohol</li>
      </ul>
    </div>
  );
}`}
        />
        <p>
          Fijate que ahí hay <strong>una</strong> sola llave:{" "}
          <code>{"style={persona.tema}"}</code>. No hacen falta dos porque{" "}
          <code>persona.tema</code> ya <em>es</em> el objeto. Las dos llaves
          aparecen solamente cuando escribís el objeto ahí mismo. Este es ese
          componente corriendo de verdad:
        </p>
        <Demo titulo="El ejemplo de la clase, tal cual">
          <ListaDeTareas />
        </Demo>
        <p>
          Ahora lo mismo, pero con los colores atados al estado. Cambiá el tema y
          mirá abajo el objeto que le está llegando a <code>style</code>: es un
          objeto de JavaScript vivo, no un texto.
        </p>
        <Demo titulo="El tema, en tus manos">
          <ListaDeTareasDemo />
        </Demo>
        <Codigo
          archivo="app/react/jsx/ListaDeTareasDemo.js"
          resaltar={[8, 9, 15]}
          codigo={`const [fondo, setFondo] = useState("#000000");
const [texto, setTexto] = useState("#ffc0cb");

// Este objeto se arma de nuevo en cada render, con los colores actuales.
const persona = {
  nombre: "Gregorio Y. Zara",
  tema: {
    backgroundColor: fondo,
    color: texto,
    padding: 16,
    borderRadius: 10,
  },
};

return <div style={persona.tema}> … </div>;`}
        />
        <Nota tipo="atencion" titulo="El detalle de los números">
          <p>
            <code>padding: 16</code> se convierte en <code>16px</code>, pero{" "}
            <code>fontWeight: 700</code> se queda en <code>700</code>: React sabe
            cuáles propiedades llevan unidad y cuáles no. Si querés otra unidad,
            va como texto: <code>{'padding: "2rem"'}</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="Convertí este HTML a JSX válido"
          pista={
            <p>
              Pasá las tres reglas una por una: ¿cuántos elementos sueltos hay en
              el nivel de arriba? ¿quedó alguna etiqueta sin cerrar? ¿qué
              atributos hay que renombrar y cuál deja de ir entre comillas? Son
              seis cambios en total.
            </p>
          }
          solucion={
            <Codigo
              archivo="Formulario.js"
              resaltar={[3, 4, 5, 6, 7, 8, 9]}
              codigo={`function Formulario() {
  return (
    <>
      <h1 className="titulo">Suscribite</h1>
      <label htmlFor="mail">Tu mail</label>
      <input id="mail" type="email" maxLength={40} />
      <br />
      <button type="button" onClick={enviar}>Enviar</button>
    </>
  );
}
// 1. Fragment, porque son cinco elementos sueltos
// 2. class pasa a className
// 3. for pasa a htmlFor
// 4. maxlength pasa a maxLength, y el 40 va entre llaves porque es número
// 5. <input> y <br> se autocierran
// 6. onclick="enviar()" pasa a onClick={enviar}: la función, sin paréntesis
// El type="button" no es parte de la conversión: es una buena costumbre.`}
            />
          }
        >
          <p>
            Escribí un componente <code>Formulario</code> que devuelva esto:
          </p>
          <Codigo
            archivo="pagina.html"
            codigo={`<h1 class="titulo">Suscribite</h1>
<label for="mail">Tu mail</label>
<input id="mail" type="email" maxlength="40">
<br>
<button onclick="enviar()">Enviar</button>`}
          />
        </Desafio>

        <Desafio
          titulo="Mostrá una cuenta y una fecha con llaves"
          pista={
            <p>
              Adentro de las llaves va cualquier <strong>expresión</strong>: una
              multiplicación, una llamada a un método. Lo que no entra es una
              sentencia, o sea nada de <code>if</code> ni de <code>for</code> ahí
              adentro. Para la fecha te sirve{" "}
              <code>{'new Date().toLocaleDateString("es-AR")'}</code>. Y ojo: el
              signo <code>$</code> del precio es texto común, no tiene nada que
              ver con las llaves.
            </p>
          }
          solucion={
            <Codigo
              archivo="Ticket.js"
              resaltar={[9, 11]}
              codigo={`function Ticket() {
  const precio = 1500;
  const cantidad = 3;
  const hoy = new Date();

  return (
    <>
      <p>
        {cantidad} entradas a \${precio} cada una: \${precio * cantidad}
      </p>
      <p>Emitido el {hoy.toLocaleDateString("es-AR")}</p>
    </>
  );
}
// El signo $ es texto común; lo que está entre llaves es JavaScript.`}
            />
          }
        >
          <p>
            Escribí un componente <code>Ticket</code> con{" "}
            <code>const precio = 1500</code> y <code>const cantidad = 3</code> que
            muestre esto, sin escribir ningún número a mano en el marcado:
          </p>
          <ul>
            <li>
              <em>3 entradas a $1500 cada una: $4500</em>
            </li>
            <li>
              <em>Emitido el 3/11/2026</em> — pero con la fecha de hoy, en
              formato argentino (día/mes/año)
            </li>
          </ul>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
