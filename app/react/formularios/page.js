import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import EspejoDemo from "./EspejoDemo";
import CampoCongeladoDemo from "./CampoCongeladoDemo";
import ControlesDemo from "./ControlesDemo";
import InscripcionDemo from "./InscripcionDemo";

export const metadata = { title: "Formularios controlados" };

const celda = {
  border: "1px solid var(--borde)",
  padding: "9px 12px",
  verticalAlign: "top",
  textAlign: "left",
};

const encabezado = {
  ...celda,
  background: "var(--superficie-2)",
  fontSize: "0.8rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

export default function Pagina() {
  return (
    <Leccion
      slug="/react/formularios"
      titulo="Formularios controlados"
      resumen="Inputs, checkboxes y selects manejados por el estado de React."
    >
      <Seccion titulo="Quién manda en el campo">
        <Nota tipo="info" titulo="Esto todavía no lo viste en clase">
          <p>
            Las clases 5 y 6 llegan hasta el estado de un componente. Los
            formularios son la primera aplicación grande de eso: son la pantalla
            donde el usuario carga datos, y en el trabajo práctico los vas a
            necesitar sí o sí.
          </p>
        </Nota>

        <p>
          En HTML puro, un <code>&lt;input&gt;</code> se acuerda solo de lo que
          escribiste: el valor vive adentro del nodo del DOM y vos se lo pedís
          cuando lo necesitás. En React se da vuelta la responsabilidad. Un{" "}
          <strong>input controlado</strong> es el que no se acuerda de nada: lo
          que se ve en pantalla lo manda el estado.
        </p>

        <p>Son dos props y siempre van juntas:</p>

        <ul>
          <li>
            <code>value={"{texto}"}</code> le dice al input qué mostrar. Sale del
            estado.
          </li>
          <li>
            <code>onChange={"{(e) => setTexto(e.target.value)}"}</code> escucha
            cada tecla y guarda en el estado lo que el usuario quiso escribir.
          </li>
        </ul>

        <p>
          El recorrido es un círculo: tecla → <code>onChange</code> →{" "}
          <code>setTexto</code> → renderizado → <code>value</code> nuevo en
          pantalla. Parece dar una vuelta de más, y la da: la ventaja es que el
          estado y lo que se ve <strong>nunca</strong> pueden estar en
          desacuerdo.
        </p>

        <Demo titulo="Demo · el input más chiquito posible">
          <EspejoDemo />
        </Demo>

        <Codigo
          archivo="app/react/formularios/EspejoDemo.js"
          resaltar={[5, 7]}
          codigo={`const [texto, setTexto] = useState("");

<input
  className="entrada"
  // Lo que se ve en pantalla lo decide el estado, no el navegador.
  value={texto}
  // Cada tecla avisa a React, que guarda el valor nuevo y redibuja.
  onChange={(e) => setTexto(e.target.value)}
/>`}
        />

        <p>
          Tocá <em>A MAYÚSCULAS</em> y mirá el campo. Nadie tocó el input: se
          cambió el estado, y el input se acomodó. Eso es lo que te compra tener
          el valor en React.
        </p>

        <Codigo
          archivo="app/react/formularios/EspejoDemo.js"
          codigo={`<button className="boton boton-suave" onClick={() => setTexto("")}>
  Vaciar
</button>
<button
  className="boton boton-suave"
  onClick={() => setTexto(texto.toUpperCase())}
>
  A MAYÚSCULAS
</button>`}
        />
      </Seccion>

      <Seccion titulo="Cada tecla es un renderizado">
        <p>
          Abajo del demo hay un contador de renderizados. Escribí{" "}
          <em>hola</em> y fijate que sube de a uno por letra: cada{" "}
          <code>setTexto</code> vuelve a ejecutar la función del componente
          entera.
        </p>

        <Codigo
          archivo="app/react/formularios/EspejoDemo.js"
          codigo={`// useRef es una caja que sobrevive a los renderizados y que, al cambiarla,
// NO provoca uno nuevo. Acá la usamos solo para contar cuántas veces React
// volvió a dibujar este componente.
const renderizados = useRef(0);
renderizados.current += 1;`}
        />

        <p>
          No te fijes en el número exacto: mientras trabajás con el servidor de
          desarrollo, React dibuja cada componente dos veces a propósito para
          detectar código mal escrito, y cada vez que guardás un archivo se
          redibuja todo de nuevo. Lo que importa es que el contador{" "}
          <strong>suba con cada tecla</strong>, no en cuánto va.
        </p>

        <p>
          Que se renderice por cada tecla suena caro, pero no lo es: React
          compara el resultado con el anterior y toca del DOM solamente lo que
          cambió. Vos escribís tu componente como si se dibujara de cero siempre,
          y eso es justamente lo que lo hace fácil de leer.
        </p>

        <Nota tipo="atencion" titulo="Un useRef no es un useState">
          <p>
            El contador de arriba usa <code>useRef</code> a propósito: si lo
            hubiéramos hecho con <code>useState</code>, contar un renderizado
            provocaría otro renderizado, que contaría otro… y el componente se
            quedaría en un bucle infinito. <code>useRef</code> guarda un valor
            entre renderizados <strong>sin</strong> disparar uno nuevo. Lo vas a
            ver en detalle más adelante; por ahora alcanza con saber que está ahí
            para espiar. Eso sí: tocar un ref mientras el componente se dibuja no
            se hace en código de verdad, y el linter del proyecto te lo marca.
            Este demo lo hace a propósito y tiene el aviso apagado a mano en esa
            línea.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="value sin onChange: el campo congelado">
        <p>
          Es el error número uno de la primera semana. Ponés{" "}
          <code>value</code> porque querés mostrar algo, te olvidás del{" "}
          <code>onChange</code>, y el campo queda de adorno: podés tipear todo lo
          que quieras que no se mueve una letra.
        </p>

        <p>
          El motivo es exactamente el círculo de antes, pero roto por la mitad:
          el navegador escribe la letra, React se vuelve a renderizar por
          cualquier otro motivo y le vuelve a poner el <code>value</code> del
          estado, que nunca cambió.
        </p>

        <Demo titulo="Demo · el mismo input, con y sin onChange">
          <CampoCongeladoDemo />
        </Demo>

        <Comparacion>
          <Columna tono="mal" titulo="Congelado">
            <Codigo
              codigo={`// Falta el onChange: React nunca se entera
// de lo que el usuario escribe.
<input value={texto} />`}
            />
            <p className="tenue">
              Si además le sacás el <code>value</code> el campo anda, pero el
              estado y la pantalla quedan por su cuenta: dejaría de ser
              controlado.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Controlado">
            <Codigo
              codigo={`// Las dos props siempre viajan juntas.
<input
  value={texto}
  onChange={(e) => setTexto(e.target.value)}
/>`}
            />
            <p className="tenue">
              Regla corta: si escribís <code>value</code> en un campo, la línea
              de abajo es el <code>onChange</code>.
            </p>
          </Columna>
        </Comparacion>

        <p>
          React no te deja pasar esto en silencio. Destildá el checkbox del demo,
          abrí la consola del navegador con <code>F12</code> y vas a ver este
          aviso:
        </p>

        <Codigo
          archivo="consola del navegador"
          codigo={`You provided a \`value\` prop to a form field without an
\`onChange\` handler. This will render a read-only field. If
the field should be mutable use \`defaultValue\`. Otherwise,
set either \`onChange\` or \`readOnly\`.`}
        />

        <p>
          Traducido: <em>le diste un value a un campo sin darle un onChange, así
          que va a quedar de solo lectura</em>. Las dos salidas que te ofrece son
          las legítimas: <code>onChange</code> si el campo tiene que ser editable,
          o <code>readOnly</code> si de verdad querés mostrar un dato fijo.
        </p>

        <Nota tipo="atencion" titulo="El aviso aparece una sola vez">
          <p>
            React lo imprime la primera vez y después se calla. Si abrís la
            consola cuando ya venías tipeando, no lo vas a ver: recargá la página
            con el panel abierto.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Un control, una propiedad">
        <p>
          Hasta acá vimos <code>value</code>, que sirve para casi todos los
          campos de texto. Los demás controles usan otra propiedad, y ahí es
          donde se traba todo el mundo. Esta tabla es lo más útil de la lección.
        </p>

        <div style={{ overflowX: "auto", marginBottom: 16 }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr>
                <th style={encabezado}>Control</th>
                <th style={encabezado}>Prop que lleva</th>
                <th style={encabezado}>Qué leés del evento</th>
                <th style={encabezado}>Ojo con…</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={celda}>
                  <code>&lt;input&gt;</code> de texto, email o password
                </td>
                <td style={celda}>
                  <code>value</code>
                </td>
                <td style={celda}>
                  <code>e.target.value</code>
                </td>
                <td style={celda}>Siempre es un string.</td>
              </tr>
              <tr>
                <td style={celda}>
                  <code>&lt;textarea&gt;</code>
                </td>
                <td style={celda}>
                  <code>value</code>
                </td>
                <td style={celda}>
                  <code>e.target.value</code>
                </td>
                <td style={celda}>
                  En HTML el texto va entre las etiquetas. En React,{" "}
                  <strong>no</strong>: va en <code>value</code>.
                </td>
              </tr>
              <tr>
                <td style={celda}>
                  <code>&lt;input type=&quot;number&quot;&gt;</code>
                </td>
                <td style={celda}>
                  <code>value</code>
                </td>
                <td style={celda}>
                  <code>e.target.value</code>
                </td>
                <td style={celda}>
                  Devuelve un <strong>string</strong>, no un número. Convertilo
                  con <code>Number(...)</code>.
                </td>
              </tr>
              <tr>
                <td style={celda}>
                  <code>&lt;input type=&quot;checkbox&quot;&gt;</code>
                </td>
                <td style={celda}>
                  <code>checked</code>
                </td>
                <td style={celda}>
                  <code>e.target.checked</code>
                </td>
                <td style={celda}>
                  Es un booleano. <code>value</code> acá no hace nada.
                </td>
              </tr>
              <tr>
                <td style={celda}>
                  <code>&lt;input type=&quot;radio&quot;&gt;</code>
                </td>
                <td style={celda}>
                  <code>checked={"{turno === \"noche\"}"}</code>
                </td>
                <td style={celda}>
                  <code>e.target.value</code>
                </td>
                <td style={celda}>
                  Todas las opciones del grupo comparten el mismo{" "}
                  <code>name</code>.
                </td>
              </tr>
              <tr>
                <td style={celda}>
                  <code>&lt;select&gt;</code>
                </td>
                <td style={celda}>
                  <code>value</code> en el <code>&lt;select&gt;</code>
                </td>
                <td style={celda}>
                  <code>e.target.value</code>
                </td>
                <td style={celda}>
                  Nunca <code>selected</code> en la <code>&lt;option&gt;</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Demo titulo="Demo · un ejemplar de cada control">
          <ControlesDemo />
        </Demo>

        <p>
          Tocá todo y mirá el bloque gris: ese es el estado de verdad. Fijate que{" "}
          <code>acepta</code> es <code>true</code> o <code>false</code> sin
          comillas, y que <code>cantidad</code> sí las tiene aunque sea un campo
          numérico.
        </p>

        <Codigo
          archivo="app/react/formularios/ControlesDemo.js"
          codigo={`{/* checkbox: propiedad checked y e.target.checked */}
<input
  type="checkbox"
  checked={acepta}
  onChange={(e) => setAcepta(e.target.checked)}
/>

{/* radio: checked compara el valor del grupo con el de cada opción */}
{["mañana", "noche"].map((opcion) => (
  <label key={opcion}>
    <input
      type="radio"
      name="ctrl-turno"
      value={opcion}
      checked={turno === opcion}
      onChange={(e) => setTurno(e.target.value)}
    />
    {opcion}
  </label>
))}

{/* select: el value va en el <select>, no en las <option> */}
<select value={comision} onChange={(e) => setComision(e.target.value)}>
  <option value="1K1">1K1</option>
  <option value="1K2">1K2</option>
  <option value="2K1">2K1</option>
</select>`}
        />

        <Nota tipo="atencion" titulo="El number que no suma">
          <p>
            <code>e.target.value</code> es un string aunque el input sea{" "}
            <code>type=&quot;number&quot;</code>. Con <code>cantidad</code>{" "}
            valiendo <code>&quot;2&quot;</code>, la cuenta{" "}
            <code>cantidad + 1</code> te da <code>&quot;21&quot;</code>, porque
            el <code>+</code> entre un string y un número pega los dos textos.
            Convertí una sola vez, donde necesitás el número:
          </p>
          <Codigo
            codigo={`const total = Number(cantidad) + 1;      // 3
const total = parseInt(cantidad, 10) + 1; // 3, y descarta lo que no sea número`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="Muchos campos, un solo objeto">
        <p>
          Un formulario real tiene seis o siete campos. Con un{" "}
          <code>useState</code> por campo terminás con catorce líneas de
          declaraciones y catorce manejadores idénticos. La alternativa es
          guardar todo el formulario en <strong>un objeto</strong>, que es
          exactamente lo que practicaste en{" "}
          <Link href="/react/objetos-en-estado">Objetos en estado</Link>.
        </p>

        <p>
          El truco tiene dos partes. Primero, cada control lleva un atributo{" "}
          <code>name</code> igual a la propiedad del objeto que le corresponde.
          Segundo, un único manejador usa ese nombre como clave con la{" "}
          <strong>sintaxis de propiedad calculada</strong>: los corchetes de{" "}
          <code>[e.target.name]</code> le dicen a JavaScript{" "}
          <em>evaluá esto y usá el resultado como nombre de la propiedad</em>.
        </p>

        <Codigo
          archivo="app/react/formularios/InscripcionDemo.js"
          resaltar={[2, 3]}
          codigo={`function alCambiar(e) {
  const { name, type, value, checked } = e.target;
  setDatos({ ...datos, [name]: type === "checkbox" ? checked : value });
}`}
        />

        <p>
          Se lee así: copiá todo lo que ya había en <code>datos</code> y pisá
          solamente la propiedad que se llama como el campo que se tocó. El{" "}
          <code>type === &quot;checkbox&quot;</code> está porque los checkboxes
          traen el dato en <code>checked</code> y no en <code>value</code>. Con
          eso, un solo manejador atiende a todos los campos del formulario.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Mutar el objeto del estado">
            <Codigo
              codigo={`function alCambiar(e) {
  // Modifica el objeto que ya está en el
  // estado: React no ve ningún cambio
  // y no vuelve a renderizar.
  datos[e.target.name] = e.target.value;
  setDatos(datos);
}`}
            />
            <p className="tenue">
              El campo queda congelado otra vez, pero ahora por un motivo
              distinto: <code>setDatos</code> recibe el mismo objeto de siempre.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Armar un objeto nuevo">
            <Codigo
              codigo={`function alCambiar(e) {
  // Spread: copia lo viejo y pisa una
  // sola propiedad. Objeto nuevo,
  // renderizado seguro.
  setDatos({
    ...datos,
    [e.target.name]: e.target.value,
  });
}`}
            />
            <p className="tenue">
              Misma regla de siempre: el estado no se toca, se reemplaza.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="atencion" titulo="Sin corchetes creás una propiedad llamada name">
          <p>
            <code>{"{ name: valor }"}</code> crea una propiedad que se llama
            literalmente <code>name</code>. <code>{"{ [name]: valor }"}</code>{" "}
            evalúa la variable y crea la propiedad{" "}
            <code>nombre</code>, <code>legajo</code> o la que corresponda. Es un
            corchete de diferencia y rompe todo el formulario.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Enviar el formulario y validarlo">
        <p>
          El envío va en el <code>&lt;form&gt;</code> con{" "}
          <code>onSubmit</code>, no en el botón con <code>onClick</code>. Es el
          mismo <code>preventDefault</code> que viste en{" "}
          <Link href="/react/eventos">Eventos</Link>: sin él, el navegador hace lo que
          hacía en 1999, manda el formulario por HTTP y recarga la página entera.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="onClick en el botón">
            <Codigo
              codigo={`<form>
  <input value={nombre} onChange={alCambiar} />
  <button type="button" onClick={enviar}>
    Inscribirme
  </button>
</form>`}
            />
            <p className="tenue">
              Con el cursor en el campo y la tecla Enter no pasa nada: el usuario
              está obligado a usar el mouse. Y si un día alguien le saca el{" "}
              <code>type=&quot;button&quot;</code>, la página se recarga.
            </p>
          </Columna>
          <Columna tono="bien" titulo="onSubmit en el form">
            <Codigo
              codigo={`<form onSubmit={alEnviar}>
  <input value={nombre} onChange={alCambiar} />
  <button type="submit">Inscribirme</button>
</form>`}
            />
            <p className="tenue">
              Enter y click entran por la misma puerta, y el navegador ya te
              avisa cuál es el botón principal del formulario.
            </p>
          </Columna>
        </Comparacion>

        <Codigo
          archivo="app/react/formularios/InscripcionDemo.js"
          resaltar={[2]}
          codigo={`function alEnviar(e) {
  e.preventDefault(); // sin esto el navegador recarga la página
  if (hayErrores) return;
  setEnviado(datos);
}`}
        />

        <p>
          La validación no necesita nada nuevo: es una función común que recibe
          los datos y devuelve un objeto con un mensaje por cada campo que está
          mal. Si el objeto queda vacío, el formulario se puede enviar.
        </p>

        <Codigo
          archivo="app/react/formularios/InscripcionDemo.js"
          codigo={`function validar(datos) {
  const errores = {};
  if (datos.nombre.trim().length < 3) {
    errores.nombre = "Escribí al menos 3 letras.";
  }
  if (!/^\\d{4,6}$/.test(datos.legajo)) {
    errores.legajo = "El legajo son entre 4 y 6 números, sin letras.";
  }
  if (!datos.condiciones) {
    errores.condiciones = "Hay que aceptar las condiciones.";
  }
  return errores;
}

// Los errores NO son estado: se calculan en cada renderizado a partir de
// los datos. Guardarlos sería tener la misma información en dos lugares.
const errores = validar(datos);
const hayErrores = Object.keys(errores).length > 0;`}
        />

        <Demo titulo="Demo · inscripción a una materia">
          <InscripcionDemo />
        </Demo>

        <p>
          Probá tres cosas. Una: tocá un campo, salí sin escribir nada y mirá
          aparecer el error. Dos: poné el cursor en cualquier campo y apretá
          Enter con el formulario completo. Tres: enviá y fijate que la página no
          se recarga, el JSON aparece abajo.
        </p>

        <Codigo
          archivo="app/react/formularios/InscripcionDemo.js"
          codigo={`// El botón se deshabilita solo mientras falte algo.
<button type="submit" className="boton" disabled={hayErrores}>
  Inscribirme
</button>

// Marcamos el campo como "visitado" cuando el usuario se va de él, así no
// le gritamos un error antes de que haya llegado a escribir.
function alSalir(e) {
  setTocados({ ...tocados, [e.target.name]: true });
}

function errorDe(campo) {
  return tocados[campo] ? errores[campo] : undefined;
}`}
        />

        <Nota tipo="atencion" titulo="Deshabilitar el botón no alcanza">
          <p>
            El <code>disabled</code> es una comodidad visual, no una defensa: el
            usuario puede sacarlo desde las herramientas del navegador en diez
            segundos. Por eso <code>alEnviar</code> igual revisa{" "}
            <code>hayErrores</code> antes de hacer nada, y por eso el servidor
            tiene que volver a validar todo cuando le llegan los datos. La
            validación del navegador es para ayudar al que carga, no para
            confiar.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La otra opción: no controlados">
        <p>
          No todo formulario necesita estado. Si solamente te interesa el valor
          final, podés dejar que el DOM se acuerde y leerlo al enviar. Eso es un
          componente <strong>no controlado</strong>, y ahí el valor inicial se
          pone con <code>defaultValue</code> (o <code>defaultChecked</code> para
          los checkboxes), nunca con <code>value</code>.
        </p>

        <Codigo
          archivo="BusquedaSimple.js"
          codigo={`// No controlado: React no se entera de nada hasta que apretás enviar.
function BusquedaSimple() {
  function alEnviar(e) {
    e.preventDefault();
    // Los datos salen del formulario, no del estado.
    const datos = new FormData(e.target);
    console.log(datos.get("busqueda"));
  }

  return (
    <form onSubmit={alEnviar}>
      <input name="busqueda" defaultValue="React" />
      <button type="submit">Buscar</button>
    </form>
  );
}`}
        />

        <Nota tipo="info" titulo="Cuál usar">
          <p>
            Controlado es el que vas a usar el 90% de las veces, porque es el
            único que te deja validar mientras el usuario escribe, deshabilitar
            el botón, formatear el texto o mostrar el dato en otro lado de la
            pantalla. No controlado sirve para formularios de un solo paso donde
            no pasa nada hasta el envío. Lo que <strong>no</strong> podés hacer
            es mezclar los dos en el mismo campo: si le ponés{" "}
            <code>value</code> y <code>defaultValue</code> juntos, React te avisa
            por consola.
          </p>
        </Nota>

        <Nota tipo="ok" titulo="Lo que te tenés que llevar">
          <ul>
            <li>
              <code>value</code> + <code>onChange</code> viajan siempre juntos.
            </li>
            <li>
              Checkbox usa <code>checked</code> y <code>e.target.checked</code>.
            </li>
            <li>
              Todo lo que sale de un input es texto, incluso el{" "}
              <code>type=&quot;number&quot;</code>.
            </li>
            <li>
              Varios campos → un objeto en estado + un manejador con{" "}
              <code>[e.target.name]</code>.
            </li>
            <li>
              El envío va en <code>onSubmit</code> del form, con{" "}
              <code>e.preventDefault()</code>.
            </li>
          </ul>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Un campo más, con su validación"
          pista={
            <div>
              <p>
                Son tres lugares y ninguno es <code>alCambiar</code>: el
                manejador ya sabe atender cualquier campo que tenga{" "}
                <code>name</code>.
              </p>
              <ol>
                <li>
                  El objeto <code>VACIO</code>, para que la propiedad exista
                  desde el primer renderizado.
                </li>
                <li>
                  La función <code>validar</code>, con un <code>if</code> más.
                </li>
                <li>
                  El JSX, con <code>name=&quot;telefono&quot;</code> y{" "}
                  <code>value={"{datos.telefono}"}</code>.
                </li>
              </ol>
              <p>
                Si arrancás la propiedad en <code>undefined</code> (o sea, si te
                olvidás del paso 1), el campo nace no controlado y React te avisa
                cuando escribís la primera letra.
              </p>
            </div>
          }
          solucion={
            <Codigo
              archivo="app/react/formularios/InscripcionDemo.js"
              resaltar={[5, 12, 22]}
              codigo={`// 1. Arranca vacío, como todos los demás.
const VACIO = {
  nombre: "",
  legajo: "",
  telefono: "",
  email: "",
  comision: "",
  condiciones: false,
  comentarios: "",
};

// 2. Su regla, al lado de las otras. Sacamos todo lo que no sea número
// para que el usuario pueda escribir espacios o guiones si quiere.
function validar(datos) {
  const errores = {};
  // …las reglas que ya estaban…
  const soloNumeros = datos.telefono.replace(/\\D/g, "");
  if (soloNumeros.length < 8) {
    errores.telefono = "Poné al menos 8 números.";
  }
  return errores;
}

// 3. El control. alCambiar y alSalir no se tocan: el name hace todo.
<Campo id="ins-telefono" etiqueta="Teléfono" error={errorDe("telefono")}>
  <input
    id="ins-telefono"
    name="telefono"
    className="entrada"
    value={datos.telefono}
    onChange={alCambiar}
    onBlur={alSalir}
  />
</Campo>`}
            />
          }
        >
          <p>
            Agregale al formulario de inscripción un campo{" "}
            <strong>Teléfono</strong>, con su mensaje de error propio, que tiene
            que tener al menos 8 números. Mientras esté mal, el botón{" "}
            <em>Inscribirme</em> tiene que quedar deshabilitado, y el teléfono
            tiene que aparecer en el JSON del final.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Caracteres restantes en el textarea"
          pista={
            <div>
              <p>
                No guardes el contador en un <code>useState</code>: es una resta
                entre el máximo y lo que ya hay escrito, así que se recalcula
                solo en cada renderizado. La misma idea que los errores de recién.
              </p>
              <Codigo codigo={`const restantes = MAXIMO - datos.comentarios.length;`} />
              <p>
                Para que no se pase del máximo tenés dos caminos:{" "}
                <code>maxLength</code> en el <code>&lt;textarea&gt;</code>, que
                lo frena el navegador, o cortar el texto en el manejador con{" "}
                <code>slice</code>. El segundo también te cubre cuando el usuario
                pega texto con el mouse.
              </p>
            </div>
          }
          solucion={
            <div>
              <Codigo
                archivo="app/react/formularios/InscripcionDemo.js"
                resaltar={[4, 14]}
                codigo={`const MAXIMO = 200;

// No es estado: se calcula a partir de los datos en cada renderizado.
const restantes = MAXIMO - datos.comentarios.length;

<textarea
  id="ins-comentarios"
  name="comentarios"
  className="entrada"
  rows={3}
  maxLength={MAXIMO}
  value={datos.comentarios}
  onChange={alCambiar}
/>
<span className="tenue">
  Quedan {restantes} caracteres
</span>`}
              />
              <p>
                Si además querés avisarle al usuario cuando se está por quedar
                sin lugar, el color sale de un ternario, igual que cualquier otro
                valor calculado:
              </p>
              <Codigo
                codigo={`<span
  className="tenue"
  style={{ color: restantes < 20 ? "var(--rojo)" : undefined }}
>
  Quedan {restantes} caracteres
</span>`}
              />
              <p>
                Y si preferís cortar el texto vos en lugar de usar{" "}
                <code>maxLength</code>, el manejador propio del textarea queda
                así:
              </p>
              <Codigo
                codigo={`function alEscribirComentario(e) {
  setDatos({ ...datos, comentarios: e.target.value.slice(0, MAXIMO) });
}`}
              />
            </div>
          }
        >
          <p>
            Ponele al campo de comentarios un máximo de 200 caracteres y, debajo,
            un cartelito que diga cuántos quedan y que se actualice mientras
            escribís. Cuando falten menos de 20, que el número se ponga rojo.
            Pista de arranque: el número de caracteres restantes{" "}
            <strong>no</strong> va en el estado.
          </p>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
