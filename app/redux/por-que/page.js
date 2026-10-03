import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Comparacion, { Columna } from "@/components/Comparacion";
import TaladroDemo from "./TaladroDemo";
import ComposicionDemo from "./ComposicionDemo";
import ContextoDemo from "./ContextoDemo";

export const metadata = { title: "Por qué existe Redux" };

// --------------------------------------------------------------- la tabla ---

const tabla = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.86rem",
  marginBottom: 14,
};

const th = {
  textAlign: "left",
  fontSize: "0.72rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "var(--texto-suave)",
  padding: "7px 10px",
  borderBottom: "2px solid var(--borde)",
};

const td = {
  padding: "8px 10px",
  borderBottom: "1px solid var(--borde)",
  verticalAlign: "top",
};

const tdNombre = { ...td, fontWeight: 700, color: "var(--pista, var(--azul-700))" };

const TECNICAS = [
  {
    nombre: "Estado local",
    alcance: "Un componente",
    costo: "Cero",
    cuando: "El dato no le importa a nadie más. Siempre se arranca acá.",
  },
  {
    nombre: "Levantar el estado",
    alcance: "Un padre y sus hijos",
    costo: "Bajo: unas props más",
    cuando:
      "Dos o tres componentes cercanos tienen que ver el mismo dato.",
  },
  {
    nombre: "children",
    alcance: "El árbol que arma un componente",
    costo: "Bajo: reordenar el JSX",
    cuando:
      "El dato solo tiene que atravesar componentes que no lo usan.",
  },
  {
    nombre: "useContext",
    alcance: "Todo un subárbol",
    costo: "Medio: un proveedor, y renders de más",
    cuando:
      "Un dato que cambia poco y lee medio árbol: usuario, tema, idioma.",
  },
  {
    nombre: "Redux",
    alcance: "Toda la aplicación",
    costo: "Alto: una librería, un store y un patrón que hay que aprender",
    cuando:
      "Mucho estado compartido que cambia seguido, con lógica propia, y un equipo que necesita que todos lo escriban igual.",
  },
];

// ------------------------------------------------------ diagrama estático ---

const CAJA = {
  border: "1px solid var(--borde)",
  borderRadius: 8,
  background: "var(--superficie)",
  padding: "7px 12px",
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.78rem",
  textAlign: "center",
};

const CAJA_USA = {
  ...CAJA,
  borderColor: "var(--verde)",
  background: "var(--verde-fondo)",
  color: "var(--verde)",
  fontWeight: 700,
};

// Dos ramas lejanas del árbol que necesitan el mismo dato. El padre común más
// cercano es la raíz, así que "levantar el estado" termina poniéndolo arriba
// de todo y bajándolo por los dos lados.
function DiagramaDosRamas() {
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
        &lt;App /&gt;
        <div className="tenue" style={{ fontFamily: "var(--fuente)" }}>
          el único padre común de los dos
        </div>
      </div>

      <div style={{ color: "var(--texto-suave)" }}>↓ usuario ↓</div>

      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "grid", gap: 8, justifyItems: "center" }}>
          <div style={CAJA}>&lt;Encabezado /&gt;</div>
          <div className="tenue">↓</div>
          <div style={CAJA}>&lt;MenuUsuario /&gt;</div>
          <div className="tenue">↓</div>
          <div style={CAJA_USA}>&lt;Avatar /&gt;</div>
        </div>

        <div style={{ display: "grid", gap: 8, justifyItems: "center" }}>
          <div style={CAJA}>&lt;Contenido /&gt;</div>
          <div className="tenue">↓</div>
          <div style={CAJA}>&lt;ListaDeNotas /&gt;</div>
          <div className="tenue">↓</div>
          <div style={CAJA_USA}>&lt;BotonBorrar /&gt;</div>
        </div>
      </div>

      <p className="tenue" style={{ margin: "4px 0 0", textAlign: "center" }}>
        Los dos verdes necesitan <code>usuario</code>. Entre ellos hay cuatro
        componentes a los que no les importa.
      </p>
    </div>
  );
}

// ------------------------------------------------------------- la lección ---

export default function Pagina() {
  return (
    <Leccion
      slug="/redux/por-que"
      titulo="Por qué existe Redux"
      resumen="El problema que resuelve, las alternativas más baratas, y cuándo de verdad conviene."
    >
      <Seccion titulo="Esta lección casi no habla de Redux">
        <p>
          Redux no es un tema. Es una <strong>respuesta</strong> a un problema
          concreto, y la respuesta solo tiene sentido si antes entendés bien la
          pregunta. Así que vamos a dedicar casi toda la lección al problema y a
          las tres formas más baratas de resolverlo. Redux aparece al final.
        </p>

        <p>
          Esto no es un rodeo. La mitad de las aplicaciones que usan Redux no lo
          necesitan: lo trajeron porque el tutorial lo traía. Una dependencia
          más, un <em>store</em>, un patrón nuevo que todo el equipo tiene que
          aprender, y todo eso para guardar un booleano que abre un menú.
        </p>

        <Nota tipo="ok" titulo="La idea que te tenés que llevar">
          <p>
            Antes de traer Redux, probá tres cosas más baratas. Y si igual lo
            traés, que sea por una razón que puedas <strong>nombrar</strong> en
            voz alta.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El problema: el taladro de props">
        <p>
          El dato vive arriba. Se usa cinco pisos abajo. En React la información
          viaja de padre a hijo y nada más, así que para que llegue hay que
          pasarla por <strong>todos</strong> los componentes del medio, uno por
          uno, aunque ninguno de ellos la use.
        </p>

        <p>
          A eso se le dice <em>prop drilling</em>: el taladro de props. Mirá el
          código y contá cuántas veces aparece la palabra{" "}
          <code>usuario</code>.
        </p>

        <Codigo
          archivo="App.js"
          resaltar={[9, 13, 17]}
          codigo={`export default function App() {
  const [usuario, setUsuario] = useState("Ana");

  return <Tablero usuario={usuario} />;
}

// Los tres de abajo no usan el usuario para nada. Lo reciben, lo
// miran de reojo y se lo pasan al que sigue.
function Tablero({ usuario }) {
  return <BarraLateral usuario={usuario} />;
}

function BarraLateral({ usuario }) {
  return <MenuUsuario usuario={usuario} />;
}

function MenuUsuario({ usuario }) {
  return <Avatar usuario={usuario} />;
}

// Este es el único que necesitaba el dato.
function Avatar({ usuario }) {
  return <img src={"/avatares/" + usuario + ".png"} alt={usuario} />;
}`}
        />

        <p>
          Cinco componentes escriben <code>usuario</code> en su firma. Uno solo
          lo usa. Tocá los botones y mirá la prop bajar escalón por escalón.
        </p>

        <Demo titulo="Demo · la prop bajando por cinco niveles">
          <TaladroDemo />
        </Demo>

        <p>
          El diagrama es React común y silvestre: un componente que se dibuja a
          sí mismo adentro de sí mismo, y un{" "}
          <Link href="/react/efectos">efecto</Link> con un temporizador que hace
          avanzar la animación un nivel por vez.
        </p>

        <Codigo
          archivo="app/redux/por-que/TaladroDemo.js"
          resaltar={[6, 7]}
          codigo={`  // La prop baja un nivel cada 450 ms hasta llegar al fondo. El setLlegada no
  // está en el cuerpo del efecto sino adentro del temporizador, así que no es
  // una actualización sincrónica: es la forma correcta de animar esto.
  useEffect(() => {
    if (llegada >= NIVELES.length) return undefined;
    const id = setTimeout(() => setLlegada((n) => n + 1), 450);
    return () => clearTimeout(id);
  }, [llegada]);

  function elegir(nombre) {
    setUsuario(nombre);
    setLlegada(1); // App ya lo tiene; el viaje empieza de nuevo
  }`}
        />

        <h3>Por qué molesta de verdad</h3>

        <p>
          El problema no es escribir de más. Es lo que pasa después, cuando la
          aplicación crece:
        </p>

        <ul>
          <li>
            <strong>Agregar un dato cuesta cinco archivos.</strong> Mañana el
            avatar también necesita el idioma. Son cinco componentes a modificar
            para un cambio que afecta a uno.
          </li>
          <li>
            <strong>Renombrar también.</strong> Si <code>usuario</code> pasa a
            ser <code>usuarioActual</code>, hay que buscarlo en todos los pisos.
          </li>
          <li>
            <strong>Los componentes del medio quedan atados.</strong>{" "}
            <code>BarraLateral</code> ya no se puede reusar en otra pantalla sin
            darle un <code>usuario</code> que no le sirve para nada.
          </li>
          <li>
            <strong>Leer el código se vuelve adivinar.</strong> Cuando ves{" "}
            <code>&lt;Tablero usuario={"{u}"} tema={"{t}"} idioma={"{i}"} /&gt;</code>{" "}
            no tenés forma de saber cuál de las tres usa Tablero y cuáles son de
            paso.
          </li>
        </ul>

        <Nota tipo="atencion" titulo="Dos niveles no son un problema">
          <p>
            Pasar una prop de un padre a un hijo, o de un abuelo a un nieto, es
            React funcionando exactamente como tiene que funcionar. Es explícito
            y se lee bien. El taladro empieza a doler recién cuando hay{" "}
            <strong>tres o más niveles de puro tránsito</strong>, o cuando la
            misma prop aparece en media docena de firmas. No busques una
            herramienta para un problema que todavía no tenés.
          </p>
        </Nota>

        <h3>El segundo problema: dos ramas lejanas</h3>

        <p>
          El taladro es largo pero recto. Esta otra forma es peor: dos
          componentes que están en <strong>ramas distintas</strong> del árbol
          necesitan el mismo dato. El avatar arriba a la derecha y un botón de
          borrar perdido en el medio del contenido.
        </p>

        <DiagramaDosRamas />

        <p>
          El padre común más cercano de los dos es la raíz. Así que el dato
          termina arriba de todo y baja por <strong>los dos lados</strong>: dos
          taladros en vez de uno. Y si mañana un tercer componente, en una
          tercera rama, también lo necesita, abrís un tercer agujero.
        </p>

        <p>
          Guardate esta imagen, porque es exactamente la que Redux dice resolver.
          Pero antes hay tres cosas más baratas para probar.
        </p>
      </Seccion>

      <Seccion titulo="Alternativa 1: levantar el estado">
        <p>
          La primera y la que más veces alcanza. Si dos componentes necesitan el
          mismo dato, el dato se muda al padre común más cercano y baja por
          props. Ya la conocés entera:{" "}
          <Link href="/react/estado-compartido">estado compartido</Link> la
          explica con el acordeón y el conversor de temperatura, y la regla de
          una sola fuente de verdad sale de ahí.
        </p>

        <p>
          Antes de pasar a lo que sigue, hacete la pregunta honesta:{" "}
          <em>¿el padre común está realmente lejos, o me da fiaca escribir tres
          props?</em> Si los componentes que comparten el dato están a uno o dos
          niveles, levantar el estado es la respuesta correcta y no hay nada más
          que discutir. Las dos alternativas que siguen son para cuando el camino
          es largo de verdad.
        </p>

        <Nota tipo="info" titulo="Y el estado derivado">
          <p>
            La otra mitad del problema casi siempre es que hay{" "}
            <strong>estado de más</strong>. Antes de pensar en cómo compartir un
            dato, revisá si ese dato no se puede <em>calcular</em> a partir de
            otro. Mucho estado “global” que la gente mete en Redux es un{" "}
            <code>filter</code> o un <code>reduce</code> que nunca se escribió.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Alternativa 2: pasar componentes como children">
        <p>
          Esta la conoce poca gente y resuelve la mitad de los casos de taladro.
          La idea es dar vuelta la pregunta. En vez de preguntarte{" "}
          <em>¿cómo hago llegar el dato hasta abajo?</em>, preguntate{" "}
          <em>¿por qué el componente del medio tiene que saber qué va adentro
          suyo?</em>
        </p>

        <p>
          Si <code>BarraLateral</code> recibe <code>children</code> en lugar de{" "}
          <code>usuario</code>, deja de necesitar la prop: el{" "}
          <code>&lt;Avatar /&gt;</code> ya viene armado desde arriba, con su
          dato puesto. La barra solo le hace lugar. Es la misma prop{" "}
          <code>children</code> de <Link href="/react/props">props</Link>, usada
          para resolver un problema de arquitectura.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="El dato atraviesa tres componentes">
            <Codigo
              archivo="App.js"
              resaltar={[7, 11]}
              codigo={`function App() {
  const [usuario] = useState("Ana");

  return <Tablero usuario={usuario} />;
}

function Tablero({ usuario }) {
  return <BarraLateral usuario={usuario} />;
}

function BarraLateral({ usuario }) {
  return <Avatar usuario={usuario} />;
}`}
            />
            <p className="tenue">
              Tablero y BarraLateral deciden qué va adentro suyo, así que están
              obligados a conocer el dato.
            </p>
          </Columna>

          <Columna tono="bien" titulo="El dato no se mueve de App">
            <Codigo
              archivo="App.js"
              resaltar={[8, 14, 18]}
              codigo={`function App() {
  const [usuario] = useState("Ana");

  // El árbol se arma acá, donde el dato ya está a mano.
  return (
    <Tablero>
      <BarraLateral>
        <Avatar usuario={usuario} />
      </BarraLateral>
    </Tablero>
  );
}

function Tablero({ children }) {
  return <section className="tablero">{children}</section>;
}

function BarraLateral({ children }) {
  return <aside>{children}</aside>;
}`}
            />
            <p className="tenue">
              Tablero y BarraLateral pasaron a ser cajas vacías. No nombran el
              usuario, así que las podés usar en cualquier otra pantalla.
            </p>
          </Columna>
        </Comparacion>

        <p>
          Cambiá el modo en la demo y mirá cómo cambian las firmas de los
          componentes del medio. El dato es el mismo y el resultado en pantalla
          también; lo que cambia es cuántos componentes están enterados.
        </p>

        <Demo titulo="Demo · las mismas cinco cajas, con props y con children">
          <ComposicionDemo />
        </Demo>

        <p>
          Lo que ves abajo es el corazón de la demo. Son los dos árboles, uno al
          lado del otro, en el mismo archivo:
        </p>

        <Codigo
          archivo="app/redux/por-que/ComposicionDemo.js"
          resaltar={[3, 10]}
          codigo={`{conProps ? (
  // El dato arranca arriba y baja de la mano en mano.
  <TableroConProps usuario={usuario} />
) : (
  // El árbol se declara acá, así que <Avatar /> ya nace con su prop
  // puesta: los del medio solo lo transportan como children.
  <TableroConHuecos>
    <BarraConHuecos>
      <MenuConHuecos>
        <Avatar usuario={usuario} />
      </MenuConHuecos>
    </BarraConHuecos>
  </TableroConHuecos>
)}`}
        />

        <Nota tipo="atencion" titulo="Cuándo esto no alcanza">
          <p>
            La técnica funciona cuando el componente del medio{" "}
            <strong>solo transporta</strong>. No sirve si:
          </p>
          <ul>
            <li>
              el componente del medio necesita el dato para{" "}
              <em>decidir algo</em> (mostrar u ocultar, filtrar, elegir un
              color);
            </li>
            <li>
              el árbol no lo armás vos sino el router, que te entrega la página
              ya montada;
            </li>
            <li>
              el dato cambia tan seguido que armar todo arriba hace renderizar
              media pantalla cada vez.
            </li>
          </ul>
          <p>
            Aun así, probala siempre primero: es gratis, no agrega ninguna
            herramienta nueva y deja los componentes más reusables que antes.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Alternativa 3: useContext">
        <p>
          Viene con React. No hay nada que instalar. Un contexto es un{" "}
          <strong>canal</strong>: un componente de arriba deja un valor adentro y
          cualquier componente del subárbol lo lee directo, sin que la prop pase
          por el medio.
        </p>

        <p>Son tres piezas y ninguna es difícil.</p>

        <h3>1. El contexto</h3>

        <Codigo
          archivo="app/redux/por-que/ContextoDemo.js"
          codigo={`// 1) EL CONTEXTO. Es un canal vacío. No guarda nada y no sabe nada: solo le
//    da un nombre al dato que va a viajar por adentro del árbol.
const SesionContexto = createContext(null);`}
        />

        <h3>2. El proveedor</h3>

        <p>
          El que pone el valor adentro del canal. Fijate que el estado sigue
          siendo <code>useState</code>: lo único nuevo es el envoltorio.
        </p>

        <Codigo
          archivo="app/redux/por-que/ContextoDemo.js"
          resaltar={[5, 6, 17]}
          codigo={`// 2) EL PROVEEDOR. Acá vive el estado de verdad, con useState de toda la vida.
//    Lo único nuevo es que, en vez de bajar las props una por una, envolvemos
//    al subárbol y le entregamos el valor al canal.
function ProveedorSesion({ children }) {
  const [usuario, setUsuario] = useState("Ana");
  const [tema, setTema] = useState("claro");

  // Ojo con esta línea: es un objeto nuevo en cada render del proveedor.
  const valor = {
    usuario,
    tema,
    cambiarUsuario: setUsuario,
    cambiarTema: setTema,
  };

  return (
    <SesionContexto.Provider value={valor}>{children}</SesionContexto.Provider>
  );
}`}
        />

        <h3>3. El lector</h3>

        <p>
          <code>useContext</code> devuelve el valor del proveedor más cercano
          hacia arriba. Conviene envolverlo en un{" "}
          <Link href="/react/hooks-propios">hook propio</Link>: te ahorra repetir
          el import y te da un error entendible si alguien lo usa afuera.
        </p>

        <Codigo
          archivo="app/redux/por-que/ContextoDemo.js"
          resaltar={[4]}
          codigo={`// 3) EL LECTOR. Un hook propio de dos líneas que evita repetir el useContext
//    y avisa claro si alguien lo usa afuera del proveedor.
function useSesion() {
  const valor = useContext(SesionContexto);
  if (valor === null) {
    throw new Error("useSesion() tiene que usarse adentro de <ProveedorSesion>");
  }
  return valor;
}`}
        />

        <p>
          Y listo: <code>&lt;FichaUsuario /&gt;</code> está tres niveles abajo y
          lee el usuario con una línea. Ni <code>Tablero</code> ni{" "}
          <code>Panel</code> saben que existe.
        </p>

        <Codigo
          archivo="app/redux/por-que/ContextoDemo.js"
          resaltar={[3]}
          codigo={`function FichaUsuario() {
  // Solo le importa el usuario. El tema no lo mira ni de casualidad.
  const { usuario, tema } = useSesion();
  // …
}`}
        />

        <h3>Su limitación real</h3>

        <p>
          Acá viene lo que casi ningún tutorial cuenta.{" "}
          <strong>
            Todo componente que llama a <code>useContext</code> se vuelve a
            renderizar cuando cambia cualquier parte del valor
          </strong>
          , aunque esa parte no le interese.
        </p>

        <p>
          En la demo hay un contador de renders por componente. Tocá{" "}
          <strong>Pasar a oscuro</strong>, que cambia solamente el tema, y mirá{" "}
          <code>&lt;FichaUsuario /&gt;</code>, que solo usa el usuario.
        </p>

        <Demo titulo="Demo · useContext, con el costo a la vista">
          <ContextoDemo />
        </Demo>

        <p>
          <code>&lt;Tablero /&gt;</code> y <code>&lt;Panel /&gt;</code>, que no
          llaman a <code>useSesion()</code>, no se mueven. Los dos consumidores
          suben juntos siempre. React no tiene forma de saber que a{" "}
          <code>FichaUsuario</code> solo le importaba un campo: lo que cambió es{" "}
          <em>el valor</em>, y el valor es un objeto nuevo en cada render del
          proveedor.
        </p>

        <Codigo
          archivo="app/redux/por-que/ContextoDemo.js"
          resaltar={[7]}
          codigo={`// Instrumento de la demo: cuántas veces React dibujó este componente. Va en un
// ref y se actualiza en un efecto, porque guardarlo en un useState provocaría
// otro render y nunca pararía.
function useRenders() {
  const renders = useRef(0);
  useEffect(() => {
    renders.current += 1;
  });
  // eslint-disable-next-line react-hooks/refs -- solo para mostrar el número en pantalla
  return renders.current + 1;
}`}
        />

        <p>
          Con un tema y un usuario esto no se nota. Con un contexto que lleva el
          carrito, los filtros, la sesión y la lista de notificaciones, y que
          cambia en cada tecla que apretás, sí: media aplicación se redibuja por
          un campo. Lo que se hace es <strong>partirlo en varios contextos</strong>{" "}
          chicos, uno por tema, y envolver el valor en <code>useMemo</code> para
          que no sea un objeto nuevo cada vez. Son parches: ayudan, pero el
          mecanismo sigue siendo ese.
        </p>

        <Nota tipo="atencion" titulo="Context NO es un gestor de estado">
          <p>
            Esta confusión es la más común de toda la pista. Un contexto no
            guarda nada: es un <strong>transporte</strong>. El estado sigue
            siendo <code>useState</code> adentro del proveedor. Si le sacás el{" "}
            <code>useState</code>, el contexto se queda sin nada que repartir.
          </p>
          <p className="tenue">
            Dicho de otra forma: <code>useContext</code> reemplaza{" "}
            <em>el camino</em> que recorre el dato, no el lugar donde vive. Por
            eso no resuelve nada de lo que Redux resuelve además de esto.
          </p>
        </Nota>

        <Nota tipo="info" titulo="Dos detalles de React 19">
          <p>
            Desde React 19 podés escribir{" "}
            <code>&lt;SesionContexto value={"{valor}"}&gt;</code> sin el{" "}
            <code>.Provider</code>. Las dos formas funcionan; en este
            laboratorio dejamos <code>.Provider</code> porque es la que vas a
            encontrar en el 99% del código y de la documentación que leas.
          </p>
          <p>
            Y acordate del <Link href="/sobre-next">&quot;use client&quot;</Link>:{" "}
            <code>createContext</code> y <code>useContext</code> son hooks del
            cliente, así que el archivo que los use lleva esa línea arriba de
            todo.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Recién ahora: qué agrega Redux">
        <p>
          Si llegaste hasta acá con un problema que las tres alternativas no
          resuelven, es el momento de mirar Redux. Esto es lo que trae, y
          conviene leerlo sabiendo que cada punto es también un costo:
        </p>

        <ul>
          <li>
            <strong>Un solo estado global, afuera del árbol.</strong> No vive
            adentro de ningún componente, así que cualquiera lo lee desde donde
            esté. Las ramas lejanas dejan de ser un problema de topología.
          </li>
          <li>
            <strong>Los cambios son explícitos y rastreables.</strong> Nada se
            modifica a mano: se <em>despacha una acción</em> con nombre, y una
            función pura decide el estado nuevo. Siempre podés responder quién
            cambió qué.
          </li>
          <li>
            <strong>Herramientas de desarrollo con viaje en el tiempo.</strong>{" "}
            Las Redux DevTools muestran la lista de acciones y te dejan volver
            atrás, paso por paso, hasta el momento exacto en que se rompió. Esto
            no lo tenés con <code>useState</code> ni con Context.
          </li>
          <li>
            <strong>La lógica sale de los componentes.</strong> Un{" "}
            <em>reducer</em> es una función común que recibe el estado y una
            acción y devuelve el estado nuevo. Se testea sin montar ni un solo
            componente, sin React y sin navegador.
          </li>
          <li>
            <strong>Un patrón uniforme.</strong> Cuando son diez personas
            tocando el mismo código, que el estado compartido se escriba{" "}
            <em>siempre igual</em> vale más de lo que parece. Es la razón menos
            técnica y, en equipos grandes, la más importante.
          </li>
        </ul>

        <Nota tipo="error" titulo="Cuándo NO usarlo">
          <ul>
            <li>
              <strong>La app es chica.</strong> Tres pantallas y cinco
              componentes no tienen el problema que Redux resuelve. Vas a
              escribir más código del que ahorrás.
            </li>
            <li>
              <strong>El estado es local.</strong> Un input, un menú abierto, un
              acordeón, el paso de un formulario. Eso es <code>useState</code> y
              no sube a ningún lado. Meterlo en un store global es la forma más
              rápida de hacer lento y confuso algo simple.
            </li>
            <li>
              <strong>
                El problema es cachear datos del servidor.
              </strong>{" "}
              Si lo que querés es pedir datos, guardarlos, no volver a pedirlos y
              refrescarlos cada tanto, eso <em>no es estado de la interfaz</em>:
              es una copia de datos ajenos. Para eso hay librerías de datos
              —React Query, SWR, el propio RTK Query— que ya traen caché,
              reintentos y estados de carga resueltos. Redux a secas te deja todo
              eso para escribir a mano.
            </li>
            <li>
              <strong>Lo trajiste porque sí.</strong> Si no podés terminar la
              frase “uso Redux porque…” con algo concreto, todavía no lo
              necesitás.
            </li>
          </ul>
        </Nota>

        <h3>Las cinco opciones, una al lado de la otra</h3>

        <p>
          Esta es la tabla a la que vas a volver cuando tengas que decidir en un
          proyecto de verdad. Se lee de arriba hacia abajo: empezás en la primera
          fila y solo bajás cuando la de arriba te quedó chica.
        </p>

        <div style={{ overflowX: "auto", marginBottom: 14 }}>
          <table style={tabla}>
            <thead>
              <tr>
                <th scope="col" style={th}>
                  Técnica
                </th>
                <th scope="col" style={th}>
                  Alcance
                </th>
                <th scope="col" style={th}>
                  Costo
                </th>
                <th scope="col" style={th}>
                  Cuándo conviene
                </th>
              </tr>
            </thead>
            <tbody>
              {TECNICAS.map((tecnica) => (
                <tr key={tecnica.nombre}>
                  <th scope="row" style={tdNombre}>
                    {tecnica.nombre}
                  </th>
                  <td style={td}>{tecnica.alcance}</td>
                  <td style={td}>{tecnica.costo}</td>
                  <td style={td}>{tecnica.cuando}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Nota tipo="ok" titulo="La regla en una línea">
          <p>
            Bajá un escalón de la tabla solo cuando puedas explicar por qué el
            escalón anterior no te alcanzó. Esa explicación es toda la
            justificación que necesitás, y es la que te van a pedir en cualquier
            revisión de código seria.
          </p>
        </Nota>

        <h3>Lo que viene</h3>

        <p>
          Dicho todo esto: Redux existe, se usa muchísimo y vas a trabajar con
          él. Y es mucho más simple de lo que su fama sugiere. La próxima
          lección, <strong>Store, acciones y reducers</strong>, lo arma a mano,
          sin instalar nada, en unas pocas líneas de JavaScript común: un objeto
          con el estado, una función que lo cambia y una lista de avisados.
          Cuando lo veas construido deja de ser magia para siempre.
        </p>

        <p>
          Después viene <strong>Redux Toolkit</strong>, que es lo que se usa hoy
          y hace lo mismo con un cuarto del código, y al final{" "}
          <strong>Un carrito completo</strong>, con varios slices, selectores
          derivados y las DevTools funcionando.
        </p>

        <p className="tenue">
          Si al terminar la pista decidís que tu proyecto no necesita Redux,
          la pista cumplió igual su objetivo. Saber cuándo no usar una
          herramienta es parte de saber usarla.
        </p>
      </Seccion>
    </Leccion>
  );
}
