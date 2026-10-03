import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import AcordeonSeparadoDemo from "./AcordeonSeparadoDemo";
import AcordeonLevantadoDemo from "./AcordeonLevantadoDemo";
import ConversorDemo from "./ConversorDemo";
import DerivadoDemo from "./DerivadoDemo";

export const metadata = { title: "Estado compartido" };

// Estilo de las cajitas del diagrama. Lo dejamos en una constante para no
// repetir el mismo objeto tres veces.
const CAJA = {
  border: "1px solid var(--borde)",
  borderRadius: "var(--radio)",
  background: "var(--superficie)",
  padding: "10px 14px",
  textAlign: "center",
  minWidth: 0,
};

// Diagrama del dato bajando y el aviso subiendo. Son divs y estilos en línea:
// no hace falta ninguna librería para dibujar algo así.
function DiagramaLevantar() {
  return (
    <div
      style={{
        display: "grid",
        gap: 10,
        justifyItems: "center",
        margin: "0 0 16px",
        padding: "18px 14px",
        border: "1px solid var(--borde)",
        borderRadius: "var(--radio)",
        background: "var(--superficie-2)",
      }}
    >
      <div
        style={{
          ...CAJA,
          borderColor: "var(--azul-600)",
          background: "var(--azul-100)",
        }}
      >
        <strong>Acordeon</strong> · el padre
        <div className="tenue">
          acá vive <code>indiceActivo</code>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 30,
          flexWrap: "wrap",
          justifyContent: "center",
          fontSize: "0.85rem",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        <div style={{ color: "var(--azul-700)" }}>
          <div style={{ fontSize: "1.4rem", lineHeight: 1 }}>↓</div>
          baja el dato
          <div className="tenue">
            <code>abierto</code>
          </div>
        </div>
        <div style={{ color: "var(--verde)" }}>
          <div style={{ fontSize: "1.4rem", lineHeight: 1 }}>↑</div>
          sube el aviso
          <div className="tenue">
            <code>alMostrar()</code>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div style={CAJA}>
          <strong>Panel 1</strong>
          <div className="tenue">sin estado propio</div>
        </div>
        <div style={CAJA}>
          <strong>Panel 2</strong>
          <div className="tenue">sin estado propio</div>
        </div>
      </div>
    </div>
  );
}

export default function Pagina() {
  return (
    <Leccion
      slug="/react/estado-compartido"
      titulo="Estado compartido"
      resumen="Levantar el estado al padre para que dos componentes se mantengan sincronizados."
    >
      <Seccion titulo="El problema: el estado es privado">
        <Nota tipo="info" titulo="Esto todavía no lo viste en clase">
          <p>
            Las diapositivas 5 y 6 terminan con el estado adentro de un
            componente. Esta lección es el paso siguiente y aparece apenas tu
            pantalla tiene más de un componente que depende del mismo dato: un
            filtro y una lista, un input y un resumen, dos paneles que no pueden
            estar abiertos a la vez.
          </p>
        </Nota>

        <p>
          En <Link href="/react/estado">useState</Link> quedó claro que cada llamada a{" "}
          <code>useState</code> crea una memoria <strong>privada</strong> de esa
          copia del componente. Dos <code>&lt;Contador /&gt;</code> son dos
          contadores independientes, y eso normalmente es lo que querés.
        </p>

        <p>
          Pero mirá este acordeón. Cada panel guarda su propio{" "}
          <code>abierto</code>, así que podés abrir los dos al mismo tiempo. Si
          la consigna fuera “que haya uno solo abierto”, ninguno de los dos
          paneles puede resolverla: para cerrarse tendría que enterarse de que el
          otro se abrió, y no tiene forma de saberlo.
        </p>

        <Demo titulo="Demo · cada panel con su propio estado">
          <AcordeonSeparadoDemo />
        </Demo>

        <Codigo
          archivo="app/react/estado-compartido/AcordeonSeparadoDemo.js"
          resaltar={[2]}
          codigo={`function Panel({ titulo, children }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="tarjeta">
      <h3>{titulo}</h3>
      {abierto && <p>{children}</p>}
      <button type="button" onClick={() => setAbierto(!abierto)}>
        {abierto ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  );
}`}
        />

        <p>
          El dato no puede vivir ahí adentro, porque un hermano no puede leer ni
          cambiar el estado del otro. En React la información viaja{" "}
          <strong>de arriba hacia abajo</strong>, de padre a hijo, por props. No
          existe nada que la haga viajar de costado.
        </p>
      </Seccion>

      <Seccion titulo="La solución: levantar el estado">
        <p>
          Si dos hermanos necesitan el mismo dato, el dato se muda al{" "}
          <strong>padre común más cercano</strong>. A eso se le dice{" "}
          <em>levantar el estado</em> (<em>lifting state up</em>). Son tres
          movimientos:
        </p>

        <ol>
          <li>
            Sacás el <code>useState</code> de los hijos.
          </li>
          <li>
            Lo ponés en el padre y le pasás el dato a cada hijo{" "}
            <strong>como prop</strong>.
          </li>
          <li>
            Le pasás también una <strong>función</strong> como prop, para que el
            hijo avise hacia arriba cuando el usuario hace algo.
          </li>
        </ol>

        <DiagramaLevantar />

        <p>
          El hijo no decide nada: dibuja lo que le mandan y grita cuando lo
          tocan. El que decide es siempre el padre, que es el único que tiene el{" "}
          <code>useState</code>.
        </p>

        <Demo titulo="Demo · el mismo acordeón con el estado levantado">
          <AcordeonLevantadoDemo />
        </Demo>

        <p>
          Ahora abrir uno cierra el otro, y los paneles siguen sin hablarse entre
          sí: el padre guarda un solo número y cada panel se pregunta “¿ese
          número es el mío?”.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Estado en cada hijo">
            <Codigo
              archivo="AcordeonSeparadoDemo.js"
              codigo={`function Panel({ titulo, children }) {
  // El dato es privado de este panel.
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="tarjeta">
      <h3>{titulo}</h3>
      {abierto && <p>{children}</p>}
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
      >
        {abierto ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  );
}

export default function Acordeon() {
  return (
    <div>
      <Panel titulo="Almaty">…</Panel>
      <Panel titulo="Bariloche">…</Panel>
    </div>
  );
}`}
            />
            <p className="tenue">
              Dos estados sueltos. El padre no sabe qué está pasando abajo y no
              hay forma de coordinarlos.
            </p>
          </Columna>

          <Columna tono="bien" titulo="Estado levantado al padre">
            <Codigo
              archivo="AcordeonLevantadoDemo.js"
              resaltar={[2, 17]}
              codigo={`// El panel se quedó sin useState: recibe todo por props.
function Panel({ titulo, abierto, alMostrar, children }) {
  return (
    <div className="tarjeta">
      <h3>{titulo}</h3>
      {abierto ? (
        <p>{children}</p>
      ) : (
        <button type="button" onClick={alMostrar}>Mostrar</button>
      )}
    </div>
  );
}

export default function Acordeon() {
  // Único dueño del dato: 0 = el primero, 1 = el segundo.
  const [indiceActivo, setIndiceActivo] = useState(0);

  return (
    <div>
      <Panel
        titulo="Almaty"
        abierto={indiceActivo === 0}
        alMostrar={() => setIndiceActivo(0)}
      >…</Panel>
      <Panel
        titulo="Bariloche"
        abierto={indiceActivo === 1}
        alMostrar={() => setIndiceActivo(1)}
      >…</Panel>
    </div>
  );
}`}
            />
            <p className="tenue">
              Un solo estado, arriba. Los dos paneles leen del mismo lugar, así
              que no hay manera de que se contradigan.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="atencion" titulo="La función se pasa, no se llama">
          <p>
            <code>alMostrar={"{"}setIndiceActivo(0){"}"}</code> ejecuta{" "}
            <code>setIndiceActivo</code> <em>durante el render</em>: React
            vuelve a renderizar, se ejecuta otra vez, y terminás con el error{" "}
            <code>Too many re-renders</code>. Lo que hay que pasarle al hijo es
            la función, no su resultado.
          </p>
          <Codigo
            codigo={`// ✗ se ejecuta mientras se dibuja
<Panel alMostrar={setIndiceActivo(0)} />

// ✓ se ejecuta recién cuando hacen click
<Panel alMostrar={() => setIndiceActivo(0)} />`}
          />
        </Nota>

        <p>
          Es la misma idea que ya viste con <code>onClick</code>: una prop puede
          ser un número, un texto, un objeto… o una función. Por convención en
          este laboratorio las nombramos empezando con <code>al</code> (
          <code>alMostrar</code>, <code>alCambiar</code>, <code>alBorrar</code>
          ), igual que React usa <code>on</code> en las suyas.
        </p>
      </Seccion>

      <Seccion titulo="Controlado y no controlado">
        <p>
          Un componente es <strong>controlado</strong> cuando la información que
          importa le llega <strong>por props</strong> y no sale de su propio
          estado: no manda, obedece. Es <strong>no controlado</strong> cuando se
          guarda el dato para él solo y el padre no tiene ni voz ni voto.
        </p>

        <Codigo
          archivo="dos versiones del mismo Panel"
          codigo={`// No controlado: el dato es suyo. Se usa solo, sin configuración,
// pero desde afuera no lo podés abrir, cerrar ni leer.
function Panel({ titulo, children }) {
  const [abierto, setAbierto] = useState(false);
  // …
}

// Controlado: el dato viene de arriba y los cambios se avisan hacia
// arriba. Hay que escribir más en el padre, pero se puede coordinar.
function Panel({ titulo, abierto, alMostrar, children }) {
  // …
}`}
        />

        <p>
          Ninguno de los dos es “el correcto”. Un buscador que no le importa a
          nadie más puede quedarse con su estado adentro. En cuanto{" "}
          <strong>otro componente necesita ese dato</strong> —para mostrarlo,
          para coordinarse o para mandarlo a un servidor—, se levanta y el hijo
          pasa a ser controlado.
        </p>

        <Nota tipo="atencion" titulo="No copies una prop adentro de un estado">
          <p>
            Es la trampa más común cuando recién levantás un estado:{" "}
            <code>useState(props.algo)</code> usa ese valor{" "}
            <strong>solo en el primer render</strong>. Si después el padre manda
            otro, el hijo sigue mostrando el viejo y volvés a tener dos datos
            que se desincronizan.
          </p>
          <Codigo
            codigo={`// ✗ una foto del valor inicial, que nunca se entera de los cambios
function Panel({ abiertoInicial }) {
  const [abierto, setAbierto] = useState(abiertoInicial);
}

// ✓ se usa la prop directamente
function Panel({ abierto }) {
  // …
}`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="El conversor de temperatura">
        <p>
          Dos casilleros, Celsius y Fahrenheit, siempre sincronizados: escribís
          en uno y el otro se acomoda. Es el ejemplo que deja más claro por qué
          el estado no puede vivir adentro de cada input.
        </p>

        <Demo titulo="Demo · dos inputs, un solo dato">
          <ConversorDemo />
        </Demo>

        <p>
          Cada <code>EntradaTemperatura</code> es un componente controlado de
          manual: recibe <code>valor</code>, lo muestra, y en cada tecla llama a{" "}
          <code>alCambiar</code>. No tiene <code>useState</code> por ningún lado.
        </p>

        <Codigo
          archivo="app/react/estado-compartido/ConversorDemo.js"
          resaltar={[8, 9]}
          codigo={`function EntradaTemperatura({ id, etiqueta, valor, alCambiar }) {
  return (
    <div>
      <label htmlFor={id}>{etiqueta}</label>
      <input
        id={id}
        className="entrada"
        value={valor}
        onChange={(evento) => alCambiar(evento.target.value)}
      />
    </div>
  );
}`}
        />

        <p>
          Lo interesante está en el padre. No guarda dos temperaturas: guarda{" "}
          <strong>una sola</strong>, más en qué escala la escribiste. El otro
          casillero es una cuenta.
        </p>

        <Codigo
          archivo="app/react/estado-compartido/ConversorDemo.js"
          resaltar={[2, 3, 6, 7, 8, 9]}
          codigo={`export default function ConversorDemo() {
  const [valor, setValor] = useState("20");
  const [escala, setEscala] = useState("c");

  // El que tocaste se muestra tal cual; el otro se calcula.
  const celsius =
    escala === "c" ? valor : convertir(valor, (f) => ((f - 32) * 5) / 9);
  const fahrenheit =
    escala === "f" ? valor : convertir(valor, (c) => (c * 9) / 5 + 32);

  return (
    <div className="fila">
      <EntradaTemperatura
        etiqueta="Grados Celsius"
        valor={celsius}
        alCambiar={(texto) => {
          setEscala("c");
          setValor(texto);
        }}
      />
      <EntradaTemperatura
        etiqueta="Grados Fahrenheit"
        valor={fahrenheit}
        alCambiar={(texto) => {
          setEscala("f");
          setValor(texto);
        }}
      />
    </div>
  );
}`}
        />

        <Comparacion>
          <Columna tono="mal" titulo="Dos estados, dos verdades">
            <Codigo
              codigo={`const [celsius, setCelsius] = useState("20");
const [fahrenheit, setFahrenheit] = useState("68");

// Cada vez que cambia uno hay que acordarse
// de recalcular el otro. Una función que se
// olvide de hacerlo deja los dos números
// diciendo temperaturas distintas.`}
            />
          </Columna>
          <Columna tono="bien" titulo="Un estado, una verdad">
            <Codigo
              codigo={`const [valor, setValor] = useState("20");
const [escala, setEscala] = useState("c");

// El segundo casillero se calcula a partir
// del primero, así que es imposible que se
// contradigan: no hay dos datos, hay uno.`}
            />
          </Columna>
        </Comparacion>

        <Nota tipo="atencion" titulo="value sin onChange deja el input trabado">
          <p>
            Si le ponés <code>value</code> a un <code>&lt;input&gt;</code> pero
            te olvidás de <code>onChange</code>, el casillero muestra siempre lo
            mismo y no podés escribir: el valor lo manda React y nadie lo está
            cambiando. React te lo avisa en la consola.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Una sola fuente de verdad">
        <p>
          Levantar el estado es un caso particular de una regla más grande:{" "}
          <strong>cada dato tiene un único dueño</strong>. Ese componente lo
          guarda y lo modifica; todos los demás lo reciben por props. Si el mismo
          dato está guardado en dos lugares, tarde o temprano se desincronizan,
          porque alguna función va a actualizar uno y olvidarse del otro.
        </p>

        <p>Para saber quién tiene que ser el dueño, hacete dos preguntas:</p>

        <ul>
          <li>
            <strong>¿Quiénes usan este dato?</strong> Anotá todos los
            componentes que lo leen o lo cambian.
          </li>
          <li>
            <strong>¿Cuál es el padre común más cercano de todos ellos?</strong>{" "}
            Ese es el lugar. Ni más arriba —el estado que sube de más hace
            renderizar media pantalla al pedo— ni más abajo.
          </li>
        </ul>

        <Nota tipo="ok" titulo="Regla corta">
          <p>
            Un dato, un dueño. Si te encontrás escribiendo código para{" "}
            <em>mantener dos estados iguales</em>, no te falta código: te sobra
            un estado.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Estado derivado: calculalo, no lo guardes">
        <p>
          El hermano gemelo del problema anterior: guardar en un estado algo que
          se puede <strong>calcular</strong> a partir de otro estado. La cantidad
          de tareas completadas, el total del carrito, si la lista está vacía, el
          nombre completo a partir del nombre y el apellido… nada de eso es un
          dato nuevo.
        </p>

        <p>
          En esta demo conviven las dos formas. Tildá y destildá: los dos números
          coinciden. Ahora <strong>borrá una tarea tildada</strong> y mirá qué
          pasa.
        </p>

        <Demo titulo="Demo · el mismo número, guardado y calculado">
          <DerivadoDemo />
        </Demo>

        <p>
          La función <code>borrar</code> se olvidó de actualizar la copia. No es
          descuido de programador novato: es lo que pasa siempre, porque hay que
          acordarse en <em>todos</em> los lugares que tocan las tareas, hoy y
          dentro de seis meses.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Guardado en otro estado">
            <Codigo
              archivo="app/react/estado-compartido/DerivadoDemo.js"
              codigo={`const [tareas, setTareas] = useState(TAREAS_INICIALES);
const [hechasGuardadas, setHechasGuardadas] = useState(1);

function alternar(id) {
  const nuevas = tareas.map((tarea) =>
    tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea,
  );
  setTareas(nuevas);
  // Hay que acordarse acá…
  setHechasGuardadas(nuevas.filter((t) => t.hecha).length);
}

function borrar(id) {
  // …y acá. Este se olvidó, y el número quedó mintiendo.
  setTareas(tareas.filter((tarea) => tarea.id !== id));
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Calculado en el render">
            <Codigo
              archivo="app/react/estado-compartido/DerivadoDemo.js"
              resaltar={[4]}
              codigo={`const [tareas, setTareas] = useState(TAREAS_INICIALES);

// Se recalcula en cada render, a partir del único dato real.
const hechasCalculadas = tareas.filter((tarea) => tarea.hecha).length;

function borrar(id) {
  // No hay nada más que mantener al día.
  setTareas(tareas.filter((tarea) => tarea.id !== id));
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          Un componente se vuelve a ejecutar entero en cada render, así que el{" "}
          <code>filter</code> se rehace solo. Recorrer un arreglo de diez, cien o
          mil elementos no se nota; lo que sí se nota es un contador que muestra
          cualquier cosa.
        </p>

        <Nota tipo="atencion" titulo="Cómo darte cuenta">
          <p>
            Antes de escribir un <code>useState</code>, preguntate:{" "}
            <em>¿puedo sacar este valor de otro estado o de una prop?</em> Si la
            respuesta es sí, no es estado: es una variable común arriba del{" "}
            <code>return</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Que el saludo diga lo que escribís"
          pista={
            <div>
              <p>
                Hoy hay dos <code>useState</code> con el mismo nombre de
                variable pero que no son el mismo dato: el de{" "}
                <code>Saludo</code> nunca cambia. Borrá los dos y poné uno solo
                en <code>App</code>, que es el padre común.
              </p>
              <p>
                A <code>Formulario</code> pasale dos props: el texto y la
                función que lo cambia. A <code>Saludo</code>, solo el texto.
              </p>
            </div>
          }
          solucion={
            <div>
              <Codigo
                archivo="App.js"
                resaltar={[2, 13, 19, 23, 24]}
                codigo={`// Controlado: el texto llega por props y los cambios suben.
function Formulario({ nombre, alCambiar }) {
  return (
    <input
      className="entrada"
      value={nombre}
      onChange={(evento) => alCambiar(evento.target.value)}
    />
  );
}

// Controlado también: solo dibuja lo que le mandan.
function Saludo({ nombre }) {
  return <p>Hola, {nombre || "desconocido"}!</p>;
}

export default function App() {
  // El dueño del dato es el padre común más cercano.
  const [nombre, setNombre] = useState("");

  return (
    <div>
      <Formulario nombre={nombre} alCambiar={setNombre} />
      <Saludo nombre={nombre} />
    </div>
  );
}`}
              />
              <p className="tenue">
                Fijate que a <code>alCambiar</code> le pasamos{" "}
                <code>setNombre</code> pelada: ya es una función que recibe el
                texto nuevo, así que no hace falta envolverla.
              </p>
            </div>
          }
        >
          <p>
            Este componente tiene un casillero y un saludo, y el saludo nunca se
            entera de nada. Levantá el estado a <code>App</code> para que al
            escribir el nombre el saludo cambie en vivo.
          </p>
          <Codigo
            archivo="App.js"
            codigo={`function Formulario() {
  const [nombre, setNombre] = useState("");

  return (
    <input
      className="entrada"
      value={nombre}
      onChange={(evento) => setNombre(evento.target.value)}
    />
  );
}

function Saludo() {
  const [nombre] = useState("");

  return <p>Hola, {nombre || "desconocido"}!</p>;
}

export default function App() {
  return (
    <div>
      <Formulario />
      <Saludo />
    </div>
  );
}`}
          />
        </Desafio>

        <Desafio
          titulo="2. Un carrito que no miente"
          pista={
            <div>
              <p>
                <code>total</code> y <code>cantidad</code> salen enteros de{" "}
                <code>items</code>, así que no son estado. Borralos y calculalos
                arriba del <code>return</code>.
              </p>
              <Codigo
                codigo={`// La cantidad es el largo del arreglo.
const cantidad = items.length;

// El total es la suma de los precios: reduce arranca en 0 y
// va acumulando el resultado de cada vuelta.
const total = items.reduce((suma, item) => suma + item.precio, 0);`}
              />
            </div>
          }
          solucion={
            <div>
              <Codigo
                archivo="Carrito.js"
                resaltar={[4, 5, 6]}
                codigo={`export default function Carrito() {
  const [items, setItems] = useState(INICIALES);

  // Dos cuentas, cero estados. Siempre están al día.
  const cantidad = items.length;
  const total = items.reduce((suma, item) => suma + item.precio, 0);

  function agregar(item) {
    setItems([...items, item]);
  }

  function borrar(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div>
      <p>{cantidad} productos — total: \${total}</p>
      {/* … */}
    </div>
  );
}`}
              />
              <p className="tenue">
                Quedó imposible que el total no coincida con la lista: sale de la
                lista. Además desaparecieron tres líneas de cada función.
              </p>
            </div>
          }
        >
          <p>
            Agregá un producto y después borrá uno: el total y la cantidad se van
            quedando cada vez más lejos de la realidad. Sacá los dos estados que
            sobran y reemplazalos por cuentas.
          </p>
          <Codigo
            archivo="Carrito.js"
            resaltar={[3, 4]}
            codigo={`export default function Carrito() {
  const [items, setItems] = useState(INICIALES);
  const [total, setTotal] = useState(0);
  const [cantidad, setCantidad] = useState(0);

  function agregar(item) {
    setItems([...items, item]);
    setTotal(total + item.precio);
    setCantidad(cantidad + 1);
  }

  function borrar(id) {
    setItems(items.filter((item) => item.id !== id));
    // Acá había que restar el precio del item borrado… y nadie lo hizo.
    setCantidad(cantidad - 1);
  }

  // …
}`}
          />
        </Desafio>

        <Nota tipo="info" titulo="Lo que viene: useContext">
          <p>
            Levantar el estado resuelve el 90% de los casos, pero cuando el dato
            tiene que bajar muchos niveles —el usuario logueado, el tema claro u
            oscuro— pasarlo de prop en prop por cinco componentes que no lo usan
            se vuelve incómodo. Para eso existe <code>useContext</code>, que lo
            deja disponible para todo un subárbol. Lo vas a ver más adelante en
            la materia; por ahora, con levantar el estado te alcanza.
          </p>
        </Nota>
      </Seccion>
    </Leccion>
  );
}
