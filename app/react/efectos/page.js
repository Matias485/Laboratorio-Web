import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import BuscadorEspejoDemo from "./BuscadorEspejoDemo";
import DependenciasDemo from "./DependenciasDemo";
import RelojDemo from "./RelojDemo";
import ModoEstrictoDemo from "./ModoEstrictoDemo";
import AnchoVentanaDemo from "./AnchoVentanaDemo";
import DatosDemo from "./DatosDemo";

export const metadata = { title: "Efectos" };

// Estilo compartido por las cajitas de los diagramas. Son divs con estilos en
// línea: no hace falta ninguna librería para dibujar algo así.
const CAJA = {
  border: "1px solid var(--borde)",
  borderRadius: "var(--radio)",
  background: "var(--superficie)",
  padding: "10px 14px",
  minWidth: 0,
};

// Diagrama: lo que está adentro de React y lo que está afuera.
function DiagramaAfuera() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 14,
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
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>Adentro de React</p>
        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            fontSize: "0.88rem",
            lineHeight: 1.7,
          }}
        >
          <li>props</li>
          <li>estado</li>
          <li>valores calculados</li>
          <li>el JSX que devolvés</li>
        </ul>
        <p className="tenue" style={{ margin: "8px 0 0" }}>
          React se encarga solo. Acá <strong>no</strong> va un efecto.
        </p>
      </div>

      <div style={{ ...CAJA, borderColor: "var(--ambar)" }}>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>Afuera de React</p>
        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            fontSize: "0.88rem",
            lineHeight: 1.7,
          }}
        >
          <li>el navegador (window, document, el título de la pestaña)</li>
          <li>el servidor (un fetch)</li>
          <li>localStorage</li>
          <li>temporizadores</li>
          <li>suscripciones y sockets</li>
          <li>librerías que no saben nada de React</li>
        </ul>
        <p className="tenue" style={{ margin: "8px 0 0" }}>
          React no lo controla. <strong>Acá</strong> viven los efectos.
        </p>
      </div>
    </div>
  );
}

// Diagrama: dos pedidos que se cruzan en el tiempo.
function LineaDeTiempo() {
  const PISTA = {
    position: "relative",
    height: 26,
    borderRadius: 6,
    background: "var(--superficie)",
    border: "1px solid var(--borde)",
  };
  const BARRA = {
    position: "absolute",
    top: 3,
    height: 18,
    borderRadius: 4,
    fontSize: "0.72rem",
    lineHeight: "18px",
    color: "#fff",
    paddingLeft: 8,
    whiteSpace: "nowrap",
    overflow: "hidden",
  };

  return (
    <div
      style={{
        margin: "0 0 16px",
        padding: "16px 14px",
        border: "1px solid var(--borde)",
        borderRadius: "var(--radio)",
        background: "var(--superficie-2)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(110px, 150px) 1fr",
          gap: "8px 12px",
          alignItems: "center",
          fontSize: "0.84rem",
        }}
      >
        <span>tocás “Álgebra”</span>
        <div style={PISTA}>
          <div style={{ ...BARRA, left: "2%", width: "80%", background: "var(--rojo)" }}>
            pedido lento · 2500 ms
          </div>
        </div>

        <span>tocás “Bases”</span>
        <div style={PISTA}>
          <div style={{ ...BARRA, left: "14%", width: "16%", background: "var(--verde)" }}>
            400 ms
          </div>
        </div>

        <span className="tenue">qué se ve</span>
        <div style={PISTA}>
          <div style={{ ...BARRA, left: "30%", width: "52%", background: "var(--verde)" }}>
            Bases de datos ✓
          </div>
          <div style={{ ...BARRA, left: "82%", width: "17%", background: "var(--rojo)" }}>
            Álgebra ✗
          </div>
        </div>
      </div>

      <p className="tenue" style={{ margin: "12px 0 0" }}>
        El pedido viejo llega <strong>último</strong> y pisa al nuevo. La pantalla
        termina mostrando algo que el usuario ya no pidió.
      </p>
    </div>
  );
}

export default function Pagina() {
  return (
    <Leccion
      slug="/react/efectos"
      titulo="Efectos"
      resumen="useEffect: sincronizar tu componente con algo de afuera, y por qué casi siempre no lo necesitás."
    >
      <Seccion titulo="Qué es un efecto (y qué no)">
        <Nota tipo="info" titulo="Esto todavía no lo viste en clase">
          <p>
            Es el hook que más se usa mal en React, por lejos. La mayor parte de
            esta lección no es sobre cómo escribir un <code>useEffect</code>:
            es sobre <strong>cómo darte cuenta de que no hace falta</strong>.
            Lo que sigue te va a ahorrar días de debugging.
          </p>
        </Nota>

        <p>
          Un <strong>efecto</strong> es código que sincroniza tu componente con
          algo que está <strong>afuera de React</strong>: el navegador, el
          servidor, una suscripción, un temporizador, otra librería. Nada más
          que eso.
        </p>

        <Nota tipo="error" titulo="La definición equivocada">
          <p>
            “Un efecto es código que corre después de renderizar.” Es lo que dice
            todo el mundo y es la raíz de todos los abusos. Describe{" "}
            <em>cuándo</em> corre, no <em>para qué sirve</em>, y con esa
            definición en la cabeza cualquier cosa parece un efecto: calcular un
            total, filtrar una lista, guardar lo que el usuario escribió, avisarle
            al padre que algo cambió. Nada de eso lo es.
          </p>
        </Nota>

        <p>
          La pregunta correcta no es “¿cuándo quiero que corra esto?”, sino{" "}
          <strong>“¿esto toca algo que React no controla?”</strong>. Si la
          respuesta es no, no es un efecto.
        </p>

        <DiagramaAfuera />

        <p>
          El componente que ya sabés escribir es una función pura: recibe props,
          lee estado y devuelve JSX. Todo lo que pasa adentro de esa caja lo
          maneja React. Pero una aplicación de verdad tiene que hablar con el
          mundo: pedirle datos a un servidor, escuchar el teclado, arrancar un
          temporizador. <code>useEffect</code> es la puerta por la que se sale de
          la caja, y es una puerta angosta a propósito.
        </p>

        <Nota tipo="ok" titulo="La regla en una línea">
          <p>
            Si podés escribirlo sin salir de React, no es un efecto. Y si no es
            un efecto, meterlo en un <code>useEffect</code> lo hace más lento,
            más difícil de leer y más fácil de romper.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Antes que nada: casi nunca lo necesitás">
        <p>
          Esta sección va primera a propósito. La mayoría de los{" "}
          <code>useEffect</code> que vas a ver en código ajeno —y los que vas a
          escribir en tus primeros TP— no tendrían que existir. Son tres
          situaciones, y las tres se reconocen de lejos.
        </p>

        <h3>1. Calcular algo a partir de props o de estado</h3>

        <p>
          Este es el más común. Tenés un dato y querés otro que sale de él: el
          nombre completo, el total del carrito, la lista filtrada, cuántos
          elementos quedan. La tentación es guardarlo en un estado y usar un
          efecto para mantenerlo al día. No hace falta: durante el render tenés
          todo lo que necesitás, así que <strong>calculalo ahí</strong>.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Con estado espejo y efecto">
            <Codigo
              codigo={`function Perfil({ nombre, apellido }) {
  const [completo, setCompleto] = useState("");

  // Un render con el valor viejo, después el
  // efecto, después OTRO render con el bueno.
  useEffect(() => {
    setCompleto(nombre + " " + apellido);
  }, [nombre, apellido]);

  return <h1>{completo}</h1>;
}`}
            />
            <p className="tenue">
              Tres líneas de más, dos renders por cada cambio, y un instante en
              el que la pantalla muestra el nombre viejo.
            </p>
          </Columna>

          <Columna tono="bien" titulo="Calculado durante el render">
            <Codigo
              resaltar={[2]}
              codigo={`function Perfil({ nombre, apellido }) {
  const completo = nombre + " " + apellido;

  return <h1>{completo}</h1>;
}`}
            />
            <p className="tenue">
              Una variable común. Es imposible que quede desactualizada, porque
              se vuelve a calcular en cada render.
            </p>
          </Columna>
        </Comparacion>

        <p>
          Esto ya lo viste con otro nombre en{" "}
          <Link href="/react/estado-compartido">Estado compartido</Link>: se
          llama <strong>estado derivado</strong>, y la regla era “un dato, un
          dueño”. Acá es la misma regla con un agravante: el efecto te hace creer
          que el problema está resuelto, porque el número se actualiza… casi
          siempre.
        </p>

        <p>
          Mirá las dos versiones del mismo buscador funcionando. Escribí una
          letra en cada casillero y mirá el contador de renders de abajo.
        </p>

        <Demo titulo="Demo · el mismo buscador, con efecto y sin efecto">
          <BuscadorEspejoDemo />
        </Demo>

        <Comparacion>
          <Columna tono="mal" titulo="Estado espejo + efecto">
            <Codigo
              archivo="app/react/efectos/BuscadorEspejoDemo.js"
              resaltar={[3, 5, 6, 7]}
              codigo={`function ConEfecto() {
  const [texto, setTexto] = useState("");
  const [resultados, setResultados] = useState(LENGUAJES);

  useEffect(() => {
    setResultados(filtrar(texto));
  }, [texto]);

  return (
    <div>
      <input value={texto} onChange={...} />
      <Resultados nombres={resultados} />
    </div>
  );
}`}
            />
            <p className="tenue">
              Dos estados, un efecto y dos renders por tecla. Si mañana agregás
              un botón de “limpiar” que toca <code>resultados</code> sin tocar{" "}
              <code>texto</code>, los dos se contradicen.
            </p>
          </Columna>

          <Columna tono="bien" titulo="Calculado">
            <Codigo
              archivo="app/react/efectos/BuscadorEspejoDemo.js"
              resaltar={[4]}
              codigo={`function SinEfecto() {
  const [texto, setTexto] = useState("");

  const resultados = filtrar(texto);

  return (
    <div>
      <input value={texto} onChange={...} />
      <Resultados nombres={resultados} />
    </div>
  );
}`}
            />
            <p className="tenue">
              La mitad del código, un solo render por tecla, y{" "}
              <code>resultados</code> no puede mentir: es una función del texto.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="atencion" titulo="“¿No es lento recalcular en cada render?”">
          <p>
            Casi nunca. Filtrar un arreglo de cien o mil elementos tarda menos que
            un parpadeo, y React ya estaba renderizando igual. Recién cuando
            medís y comprobás que un cálculo es caro de verdad existe{" "}
            <code>useMemo</code>, que guarda el resultado hasta que cambien sus
            dependencias. Pero <code>useMemo</code> es una optimización, no una
            solución de diseño: primero escribí el cálculo derecho.
          </p>
        </Nota>

        <h3>2. Responder a algo que hizo el usuario</h3>

        <p>
          Si el código tiene que correr <em>porque el usuario hizo click</em>,
          entonces va en el manejador del click. No en un efecto que espía un
          estado para adivinar que hubo un click.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="El efecto espía el estado">
            <Codigo
              codigo={`const [enviado, setEnviado] = useState(false);

// ¿Qué pasó exactamente para que esto corra?
// Hay que leer todo el componente para saberlo.
useEffect(() => {
  if (enviado) {
    mandarAlServidor(datos);
    mostrarCartel("¡Listo!");
  }
}, [enviado]);

function alEnviar() {
  setEnviado(true);
}`}
            />
            <p className="tenue">
              Aparece un estado que no describe nada de la pantalla:{" "}
              <code>enviado</code> existe solo para disparar el efecto. Y si el
              componente se vuelve a montar con <code>enviado</code> en{" "}
              <code>true</code>, manda el formulario otra vez.
            </p>
          </Columna>

          <Columna tono="bien" titulo="En el manejador del evento">
            <Codigo
              resaltar={[2, 3]}
              codigo={`function alEnviar() {
  mandarAlServidor(datos);
  mostrarCartel("¡Listo!");
}`}
            />
            <p className="tenue">
              Se lee de arriba abajo y dice exactamente cuándo pasa: cuando
              tocan el botón. Cero estados de más.
            </p>
          </Columna>
        </Comparacion>

        <p>
          La pregunta que separa los dos casos es:{" "}
          <strong>¿esto tiene que pasar porque el componente se está mostrando,
          o porque alguien hizo algo?</strong> Lo primero es un efecto. Lo
          segundo es un manejador de evento, de los que ya viste en{" "}
          <Link href="/react/eventos">Eventos</Link> y en{" "}
          <Link href="/react/formularios">Formularios controlados</Link>.
        </p>

        <h3>3. Mantener dos estados sincronizados</h3>

        <p>
          Si estás escribiendo un efecto cuyo trabajo es copiar un estado dentro
          de otro, no te falta código: <strong>te sobra un estado</strong>.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Un efecto que copia">
            <Codigo
              codigo={`const [productos, setProductos] = useState([]);
const [hayProductos, setHayProductos] = useState(false);
const [total, setTotal] = useState(0);

useEffect(() => {
  setHayProductos(productos.length > 0);
}, [productos]);

useEffect(() => {
  setTotal(productos.reduce((s, p) => s + p.precio, 0));
}, [productos]);`}
            />
            <p className="tenue">
              Tres estados para un solo dato real. Cada cambio de{" "}
              <code>productos</code> provoca tres renders en cadena.
            </p>
          </Columna>

          <Columna tono="bien" titulo="Un solo dueño del dato">
            <Codigo
              resaltar={[3, 4]}
              codigo={`const [productos, setProductos] = useState([]);

const hayProductos = productos.length > 0;
const total = productos.reduce((s, p) => s + p.precio, 0);`}
            />
            <p className="tenue">
              Dos cuentas arriba del <code>return</code>. Imposible que se
              desincronicen, porque salen de la misma fuente.
            </p>
          </Columna>
        </Comparacion>

        <p>
          El mismo razonamiento aplica cuando el dato viene de un componente
          hermano. Copiar una prop a un estado con un efecto es exactamente el
          problema que resolviste levantando el estado: el dato tiene que tener
          un solo dueño, y los demás lo reciben.
        </p>

        <Nota tipo="ok" titulo="Dónde va cada cosa">
          <ul style={{ margin: 0 }}>
            <li>
              <strong>Durante el render</strong>: todo lo que se pueda calcular a
              partir de props y estado.
            </li>
            <li>
              <strong>En un manejador de evento</strong>: todo lo que pasa porque
              el usuario hizo algo.
            </li>
            <li>
              <strong>En un efecto</strong>: solo lo que tiene que pasar porque el
              componente <em>está en pantalla</em> y hay algo de afuera con lo que
              sincronizarse.
            </li>
          </ul>
        </Nota>
      </Seccion>

      <Seccion titulo="La sintaxis">
        <p>
          Un efecto se escribe con el hook <code>useEffect</code>, que se importa
          de React y recibe dos cosas: una función y un arreglo.
        </p>

        <Codigo
          archivo="forma general"
          resaltar={[1, 3, 5, 9, 11]}
          codigo={`import { useEffect } from "react";

useEffect(() => {
  // 1. El cuerpo: acá arrancás la sincronización.
  //    Corre DESPUÉS de que el navegador pintó la pantalla.

  return () => {
    // 2. La limpieza (opcional): acá la deshacés.
    //    Corre antes del próximo efecto y al desmontar.
  };
}, [dependencias]);
// 3. El arreglo: los valores que el efecto mira.`}
        />

        <p>Tres piezas, tres preguntas:</p>

        <ul>
          <li>
            <strong>El cuerpo</strong>: ¿qué tengo que hacer para conectarme con
            eso de afuera?
          </li>
          <li>
            <strong>La limpieza</strong>: ¿qué tengo que hacer para
            desconectarme?
          </li>
          <li>
            <strong>Las dependencias</strong>: ¿de qué valores depende esa
            conexión?
          </li>
        </ul>

        <p>
          El <code>useEffect</code> va en el <strong>nivel superior</strong> del
          componente, junto a los <code>useState</code>, antes del{" "}
          <code>return</code>. Y no corre durante el render: React primero dibuja
          la pantalla, la muestra, y recién después ejecuta los efectos. Por eso
          el usuario nunca se queda mirando una pantalla en blanco mientras un
          efecto trabaja.
        </p>

        <Nota tipo="atencion" titulo="No devuelvas una promesa">
          <p>
            La función del efecto solo puede devolver la función de limpieza, o
            nada. Si le ponés <code>async</code>, devuelve una promesa y React se
            confunde. Cuando necesites <code>await</code>, declarás una función
            adentro y la llamás.
          </p>
          <Codigo
            codigo={`// ✗ una función async devuelve una promesa, no una limpieza
useEffect(async () => {
  const datos = await pedirDatos();
}, []);

// ✓ la async va adentro
useEffect(() => {
  async function traer() {
    const datos = await pedirDatos();
  }
  traer();
}, []);`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="El arreglo de dependencias">
        <p>
          El segundo argumento le dice a React <em>cuándo</em> volver a ejecutar
          el efecto. Antes de cada render nuevo, React compara uno por uno los
          valores del arreglo con los del render anterior. Si todos son iguales,
          se saltea el efecto. Si alguno cambió, ejecuta la limpieza del anterior
          y corre el efecto de nuevo.
        </p>

        <p>Hay tres formas, y son tres significados distintos:</p>

        <Codigo
          archivo="los tres casos"
          resaltar={[2, 7, 12]}
          codigo={`// 1. SIN arreglo: después de cada render, siempre.
useEffect(() => {
  console.log("dibujé");
});

// 2. Arreglo VACÍO: una sola vez, cuando el componente se monta.
useEffect(() => {
  console.log("llegué");
}, []);

// 3. CON valores: al montar, y cada vez que alguno cambia.
useEffect(() => {
  console.log("cambió el id: " + id);
}, [id]);`}
        />

        <p>
          En la demo hay un efecto de cada tipo, cada uno con su contador de
          ejecuciones. Escribí en el casillero y tocá el botón, que cambia un
          estado distinto.
        </p>

        <Demo titulo="Demo · los tres arreglos, contando ejecuciones">
          <DependenciasDemo />
        </Demo>

        <Codigo
          archivo="app/react/efectos/DependenciasDemo.js"
          resaltar={[6, 11, 16]}
          codigo={`const [texto, setTexto] = useState("");
const [otro, setOtro] = useState(0);

// 1. Sin arreglo: cada tecla y cada click lo disparan.
useEffect(() => {
  cuentaCadaRender.current += 1;
});

// 2. Arreglo vacío: se ejecuta al montar y no se mueve más.
useEffect(() => {
  setCuentaMontaje((cuenta) => cuenta + 1);
}, []);

// 3. Con dependencias: solo cuando cambia texto.
useEffect(() => {
  setCuentaTexto((cuenta) => cuenta + 1);
}, [texto]);`}
        />

        <p>
          Fijate en el detalle del primer contador: está guardado en un{" "}
          <code>useRef</code> y no en un <code>useState</code>. Si fuera estado,
          el efecto lo actualizaría, eso provocaría otro render, el efecto
          volvería a correr, actualizaría otra vez… es el{" "}
          <strong>bucle infinito</strong> más clásico de React, y sale
          justamente de un efecto sin arreglo que toca su propio estado.
        </p>

        <Nota tipo="error" titulo="El bucle infinito">
          <p>
            Si alguna vez ves la pestaña del navegador clavada y el ventilador de
            la notebook a full, buscá un <code>useEffect</code> que cambie un
            estado del que él mismo depende. Es siempre esto:
          </p>
          <Codigo
            codigo={`// ✗ el efecto cambia lo que mira: nunca para
const [items, setItems] = useState([]);

useEffect(() => {
  setItems([...items, "otro"]);
}, [items]);`}
          />
        </Nota>

        <h3>Las dependencias no se eligen: se descubren</h3>

        <p>
          El arreglo no es una preferencia tuya. Tiene que contener{" "}
          <strong>todos</strong> los valores reactivos que el efecto usa adentro:
          props, estados y variables calculadas a partir de ellos. El linter de
          React lee el cuerpo del efecto y te dice exactamente cuáles faltan.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Mentirle al arreglo">
            <Codigo
              codigo={`function Chat({ sala }) {
  useEffect(() => {
    conectar(sala);
  }, []); // ← "solo al montar"

  // Cambiás de sala y el chat sigue
  // conectado a la anterior. El efecto
  // usa la prop sala pero no la mira.
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Declarar lo que se usa">
            <Codigo
              resaltar={[4]}
              codigo={`function Chat({ sala }) {
  useEffect(() => {
    conectar(sala);
  }, [sala]);

  // Cambia la sala, se reconecta.
  // El efecto queda sincronizado con
  // el valor que realmente usa.
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          Si el linter te pide una dependencia que “no querés que esté ahí”, la
          respuesta casi nunca es sacarla del arreglo: es cambiar el código para
          que el efecto no la necesite. Sacar una dependencia a mano no arregla
          nada, solo esconde el bug hasta que aparece en la demo frente al
          profesor.
        </p>

        <Nota tipo="atencion" titulo="Ojo con los objetos en el arreglo">
          <p>
            React compara las dependencias por <em>identidad</em>, no por
            contenido. Un objeto o una función que creás adentro del componente
            es <strong>nuevo en cada render</strong>, así que un efecto que
            dependa de él corre siempre, como si no tuviera arreglo. Poné en el
            arreglo los valores sueltos (<code>[sala, usuario]</code>), no el
            objeto que los envuelve. Es la misma idea de identidad que viste con
            las <Link href="/react/listas-y-keys">keys</Link>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La función de limpieza">
        <p>
          Todo lo que se conecta se tiene que poder desconectar. Si el efecto
          arranca un temporizador, abre una suscripción o agrega un oyente de
          eventos, alguien tiene que apagarlo cuando el componente desaparece de
          la pantalla. Ese alguien es la <strong>función de limpieza</strong>: la
          función que devuelve el efecto.
        </p>

        <Codigo
          archivo="la forma"
          resaltar={[2, 5]}
          codigo={`useEffect(() => {
  const id = setInterval(tictac, 1000);   // me conecto

  return () => {
    clearInterval(id);                    // me desconecto
  };
}, []);`}
        />

        <p>React la ejecuta en dos momentos, y los dos importan:</p>

        <ol>
          <li>
            <strong>Antes de volver a correr el efecto</strong>, cuando cambió
            alguna dependencia. Primero limpia lo viejo, después conecta lo
            nuevo.
          </li>
          <li>
            <strong>Cuando el componente se desmonta</strong>, o sea cuando deja
            de estar en pantalla.
          </li>
        </ol>

        <p>
          Sin limpieza, cada ejecución del efecto deja algo vivo atrás. No se
          nota enseguida: se nota cuando el reloj empieza a ir más rápido de lo
          que debería, o cuando el chat recibe el mismo mensaje cuatro veces.
          Probalo acá.
        </p>

        <Demo titulo="Demo · un reloj con limpieza y sin limpieza">
          <RelojDemo />
        </Demo>

        <p>
          El componente es exactamente el mismo en los dos modos. Lo único que
          cambia es si el efecto devuelve una función o no.
        </p>

        <Codigo
          archivo="app/react/efectos/RelojDemo.js"
          resaltar={[4, 5, 6, 7, 12, 18, 19, 20, 21]}
          codigo={`function Reloj({ conLimpieza, cadaCuanto }) {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSegundos((anterior) => anterior + 1);
    }, cadaCuanto);

    if (!conLimpieza) {
      // Sin limpieza el efecto no devuelve nada. React no tiene
      // forma de cerrar este intervalo: queda corriendo para siempre.
      return undefined;
    }

    // Con limpieza: React ejecuta esto antes de volver a correr el
    // efecto y también cuando el componente se desmonta.
    return () => clearInterval(id);
  }, [conLimpieza, cadaCuanto]);

  return <p className="marcador">{segundos}</p>;
}`}
        />

        <p>
          Cuando cambiás el ritmo, <code>cadaCuanto</code> cambia y el efecto se
          vuelve a ejecutar. Con limpieza, el intervalo viejo muere y nace uno
          nuevo: siempre hay exactamente uno. Sin limpieza, el viejo{" "}
          <strong>sigue vivo</strong> y sumando sobre el mismo estado, así que el
          reloj se acelera: dos intervalos suman de a dos por segundo, tres de a
          tres.
        </p>

        <p>
          Y cuando desmontás el reloj sin limpieza, los tics{" "}
          <strong>siguen llegando</strong>: no hay ningún componente en pantalla
          y los temporizadores corren igual hasta que recargues la página. Eso es
          una pérdida de memoria, y en una app real son decenas, porque el
          usuario entra y sale de la misma pantalla todo el tiempo.
        </p>

        <Nota tipo="error" titulo="Qué pide limpieza, siempre">
          <ul style={{ margin: 0 }}>
            <li>
              <code>setInterval</code> y <code>setTimeout</code> →{" "}
              <code>clearInterval</code> / <code>clearTimeout</code>
            </li>
            <li>
              <code>addEventListener</code> →{" "}
              <code>removeEventListener</code> (con la <em>misma</em> función,
              ojo)
            </li>
            <li>
              una conexión, un socket, una suscripción → cerrarla o darse de baja
            </li>
            <li>
              un pedido al servidor que todavía no volvió → una bandera{" "}
              <code>ignorar</code> o un <code>AbortController</code>
            </li>
            <li>
              un observador (<code>IntersectionObserver</code>,{" "}
              <code>ResizeObserver</code>) → <code>disconnect()</code>
            </li>
          </ul>
        </Nota>

        <p>
          Un efecto que solo lee algo y no deja nada encendido —por ejemplo,
          medir el ancho de un elemento una vez— no necesita limpieza. La
          pregunta es siempre la misma: <strong>¿este efecto dejó algo prendido
          afuera de React?</strong>
        </p>
      </Seccion>

      <Seccion titulo="Por qué en desarrollo el efecto corre dos veces">
        <p>
          Lo primero que le pasa a todo el mundo: ponés un{" "}
          <code>console.log</code> adentro de un efecto con arreglo vacío, y en
          la consola aparece dos veces. No está roto, no es un bug de React y no
          pasa en producción.
        </p>

        <p>
          En desarrollo, React envuelve tu aplicación en el{" "}
          <strong>modo estricto</strong>. Al montar un componente hace esto a
          propósito:
        </p>

        <ol>
          <li>monta el componente y ejecuta el efecto;</li>
          <li>lo desmonta enseguida y ejecuta la limpieza;</li>
          <li>lo vuelve a montar y ejecuta el efecto otra vez.</li>
        </ol>

        <p>
          Es un simulacro. React está revisando que tu efecto{" "}
          <strong>sobreviva a montarse dos veces</strong>, porque en una app real
          eso pasa todo el tiempo: el usuario navega a otra página y vuelve, un
          padre se re-renderiza, una ruta se remonta. Si tu efecto tiene su
          limpieza bien puesta, el ciclo termina igual que si hubiera corrido una
          sola vez. Si no la tiene, el modo estricto te lo muestra el primer día
          en vez del día de la entrega.
        </p>

        <Demo titulo="Demo · lo que hace el modo estricto al montar">
          <ModoEstrictoDemo />
        </Demo>

        <Codigo
          archivo="app/react/efectos/ModoEstrictoDemo.js"
          resaltar={[3, 8]}
          codigo={`function Chat({ conLimpieza }) {
  useEffect(() => {
    anotar("efecto → abrí la conexión #" + numero, "efecto");

    if (!conLimpieza) return undefined;

    return () =>
      anotar("limpieza → cerré la conexión #" + numero, "limpieza");
  }, [conLimpieza]);

  return <p>El chat está montado y conectado.</p>;
}`}
        />

        <p>
          Con la limpieza puesta, la bitácora dice{" "}
          <strong>abrí · cerré · abrí</strong> y queda una sola conexión abierta:
          el simulacro no dejó basura. Sin limpieza dice{" "}
          <strong>abrí · abrí</strong> y quedan dos conexiones vivas para siempre.
          Ese “2” es el que en producción va a ser “7” después de que el usuario
          entre y salga siete veces de la pantalla.
        </p>

        <Nota tipo="error" titulo="No lo tapes con un ref">
          <p>
            La solución que aparece en cualquier foro es guardar una bandera para
            que el efecto corra una sola vez. No hagas eso: apaga el detector de
            incendios en vez de apagar el incendio. El problema no es que corra
            dos veces; el problema es que tu efecto no se puede limpiar.
          </p>
          <Codigo
            codigo={`// ✗ esconde el síntoma y deja el bug adentro
const yaCorri = useRef(false);
useEffect(() => {
  if (yaCorri.current) return;
  yaCorri.current = true;
  conectar();
}, []);

// ✓ arreglá la limpieza: montar dos veces deja de importar
useEffect(() => {
  const conexion = conectar();
  return () => conexion.cerrar();
}, []);`}
          />
        </Nota>

        <Nota tipo="info" titulo="En producción no pasa">
          <p>
            El doble montaje existe solo cuando corrés <code>next dev</code>. En
            la versión compilada (<code>next build</code>) el efecto corre una
            sola vez. Igual, el criterio no cambia: si te molesta que corra dos
            veces, tenés un efecto sin limpieza.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Los casos legítimos">
        <p>
          Después de tanta advertencia, esto es para lo que{" "}
          <strong>sí</strong> existe <code>useEffect</code>. Todos tienen la misma
          forma: algo de afuera que se enciende cuando el componente aparece y se
          apaga cuando desaparece.
        </p>

        <h3>Escuchar un evento del navegador</h3>

        <p>
          El ancho de la ventana no es props ni estado: es un dato del navegador
          que cambia por su cuenta. Para saberlo hay que suscribirse al evento{" "}
          <code>resize</code> de <code>window</code>, y para no dejar oyentes
          colgados hay que darse de baja en la limpieza.
        </p>

        <Demo titulo="Demo · el ancho de la ventana, en vivo">
          <AnchoVentanaDemo />
        </Demo>

        <Codigo
          archivo="app/react/efectos/AnchoVentanaDemo.js"
          resaltar={[4, 10, 12, 15]}
          codigo={`const [ancho, setAncho] = useState(null);

useEffect(() => {
  // Medición inicial: el dato vive en el navegador, no se puede
  // calcular durante el render.
  setAncho(window.innerWidth);

  function alRedimensionar() {
    setAncho(window.innerWidth);
  }

  window.addEventListener("resize", alRedimensionar);

  // Sin esto, cada vez que el efecto se vuelve a ejecutar quedaría
  // un oyente más escuchando el mismo evento.
  return () => window.removeEventListener("resize", alRedimensionar);
}, []);`}
        />

        <p>
          Dos detalles que valen oro. El primero:{" "}
          <code>removeEventListener</code> tiene que recibir{" "}
          <strong>exactamente la misma función</strong> que le pasaste a{" "}
          <code>addEventListener</code>. Por eso se declara con nombre adentro
          del efecto; si le pasaras dos funciones flecha distintas, el oyente no
          se sacaría nunca.
        </p>

        <p>
          El segundo: <code>ancho</code> arranca en <code>null</code>, no en{" "}
          <code>window.innerWidth</code>. El primer HTML de esta página lo arma
          Next.js <strong>en el servidor</strong>, donde no existe{" "}
          <code>window</code>: si lo leyeras durante el render, la página
          explotaría al construirse. Dentro de un efecto no hay problema, porque
          los efectos solo corren en el navegador. Eso está explicado en{" "}
          <Link href="/sobre-next">Cómo funciona este proyecto</Link>.
        </p>

        <Nota tipo="atencion" titulo="El linter y el setEstado del arranque">
          <p>
            Ese <code>setAncho(window.innerWidth)</code> suelto adentro del
            efecto es exactamente lo que la regla{" "}
            <code>react-hooks/set-state-in-effect</code> marca como error, y hace
            bien: en el 95% de los casos significa que el efecto sobra. Este es
            del 5% restante, así que en el archivo real lleva un{" "}
            <code>eslint-disable-next-line</code> con el motivo escrito al lado.
            Silenciar una regla sin explicar por qué es la forma más rápida de
            perder la confianza del que lea tu código después.
          </p>
        </Nota>

        <h3>Leer y escribir localStorage</h3>

        <p>
          <code>localStorage</code> es un cajón del navegador donde podés guardar
          texto que sobrevive al recargar la página. Es un sistema externo de
          manual: no existe en el servidor y React no sabe nada de él.
        </p>

        <Codigo
          archivo="Preferencias.js"
          resaltar={[5, 9, 17]}
          codigo={`function Preferencias() {
  const [tema, setTema] = useState("claro");
  const [listo, setListo] = useState(false);

  // 1. Al montar: leemos lo que haya guardado.
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem("tema");
      if (guardado !== null) setTema(guardado);
    } catch {
      // Modo incógnito o almacenamiento bloqueado: seguimos con el inicial.
    }
    setListo(true);
  }, []);

  // 2. Cada vez que cambia: lo escribimos.
  useEffect(() => {
    if (!listo) return; // no pisar lo guardado antes de haberlo leído
    window.localStorage.setItem("tema", tema);
  }, [tema, listo]);

  // …
}`}
        />

        <p>
          Tres cosas que parecen detalles y no lo son. El estado{" "}
          <strong>arranca con el valor por defecto</strong>, no con lo que hay
          guardado: si no, el HTML del servidor y el primer dibujo del navegador
          no coincidirían. La lectura va <strong>adentro de un try/catch</strong>,
          porque el usuario puede tener el almacenamiento bloqueado y tu app
          tiene que seguir andando. Y la bandera <code>listo</code> evita que el
          segundo efecto escriba el valor por defecto encima de lo guardado
          durante el primer render.
        </p>

        <p>
          Esta lógica se repite en cualquier app que recuerde algo. Cuando la
          copies por tercera vez, lo que corresponde es meterla en un hook propio
          —algo como <code>useAlmacenamientoLocal</code>— y eso es justo el tema
          de la lección de hooks propios, todavía pendiente en este laboratorio.
        </p>

        <h3>Un temporizador</h3>

        <p>
          Ya lo viste con el reloj. La versión más simple es un{" "}
          <code>setTimeout</code> que hace algo una vez: mostrar un cartel de
          “guardado” que se va solo, por ejemplo. Aunque corra una sola vez,{" "}
          <strong>también necesita limpieza</strong>: si el componente se
          desmonta antes de que el tiempo termine, el temporizador sigue vivo.
        </p>

        <Codigo
          archivo="Cartel.js"
          resaltar={[6, 8]}
          codigo={`function Cartel({ mensaje }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Cada mensaje nuevo arranca su propia cuenta regresiva…
    const id = setTimeout(() => setVisible(false), 3000);

    // …y cancela la del mensaje anterior.
    return () => clearTimeout(id);
  }, [mensaje]);

  if (!visible) return null;
  return <p className="nota">{mensaje}</p>;
}`}
        />

        <p>
          Sin ese <code>clearTimeout</code>, dos mensajes seguidos dejan dos
          cuentas regresivas corriendo y el cartel se cierra antes de tiempo. Es
          el mismo bug del reloj, con otra ropa. (De paso: mirá cómo{" "}
          <code>return null</code> saca el componente de la pantalla, como viste
          en <Link href="/react/renderizado-condicional">Renderizado
          condicional</Link>.)
        </p>
      </Seccion>

      <Seccion titulo="Pedir datos: el caso que más se usa mal">
        <p>
          Traer datos de un servidor es el efecto más común y el que más
          problemas trae. No porque el <code>fetch</code> sea difícil —eso ya lo
          viste en{" "}
          <Link href="/js/dom-y-asincronia">El DOM y la asincronía</Link>— sino
          porque hay que manejar tres estados y una trampa que no se ve.
        </p>

        <h3>Los tres estados</h3>

        <p>
          Un pedido nunca es “tengo los datos o no los tengo”. Son tres
          situaciones, y la pantalla tiene que saber dibujar las tres:{" "}
          <strong>cargando</strong>, <strong>error</strong> y{" "}
          <strong>éxito</strong>. Si te olvidás del error, tu app se queda
          cargando para siempre cuando el servidor se cae.
        </p>

        <Codigo
          archivo="la forma completa"
          resaltar={[9, 14, 17, 22]}
          codigo={`function Temas({ materia }) {
  const [estado, setEstado] = useState({ fase: "cargando" });

  useEffect(() => {
    let ignorar = false;

    setEstado({ fase: "cargando" });

    pedirTemas(materia).then(
      (datos) => {
        if (ignorar) return;
        setEstado({ fase: "ok", datos });
      },
      (error) => {
        if (ignorar) return;
        setEstado({ fase: "error", mensaje: error.message });
      },
    );

    return () => {
      ignorar = true;
    };
  }, [materia]);

  if (estado.fase === "cargando") return <p>Cargando…</p>;
  if (estado.fase === "error") return <p>Falló: {estado.mensaje}</p>;
  return <Lista temas={estado.datos.temas} />;
}`}
        />

        <p>
          Fijate que los tres estados viven en <strong>un solo</strong>{" "}
          <code>useState</code> con una propiedad <code>fase</code>, y no en tres
          booleanos sueltos (<code>cargando</code>, <code>error</code>,{" "}
          <code>datos</code>). Con tres booleanos existen combinaciones
          imposibles —cargando y con error al mismo tiempo— y tarde o temprano el
          código las produce. Con una sola <code>fase</code>, el estado
          imposible no se puede escribir.
        </p>

        <h3>La condición de carrera</h3>

        <p>
          Acá está la trampa. Los pedidos tardan distinto y{" "}
          <strong>no llegan necesariamente en el orden en que salieron</strong>.
          Si el usuario cambia de búsqueda rápido, puede pasar esto:
        </p>

        <LineaDeTiempo />

        <p>
          El usuario pidió “Bases de datos”, lo vio, y dos segundos después la
          pantalla cambió sola a “Álgebra”, que es lo que había pedido{" "}
          <em>antes</em>. Nada falló: las dos respuestas llegaron bien, solo que
          en el orden equivocado. Este bug es invisible en tu máquina con la red
          local y aparece siempre en la máquina del que lo corrige.
        </p>

        <p>
          La solución es la función de limpieza. Cada ejecución del efecto tiene
          su propia variable <code>ignorar</code>; cuando el efecto se vuelve a
          ejecutar, la limpieza del anterior levanta <em>su</em> bandera. La
          respuesta vieja llega igual, pero se descarta.
        </p>

        <Demo titulo="Demo · provocá la condición de carrera">
          <DatosDemo />
        </Demo>

        <Codigo
          archivo="app/react/efectos/DatosDemo.js"
          resaltar={[2, 8, 14, 18]}
          codigo={`useEffect(() => {
  let ignorar = false;

  setEstado({ fase: "cargando", pedido: clave });

  pedirTemas(clave).then(
    (datos) => {
      if (ignorar) return;          // llegó tarde: la tiramos
      setEstado({ fase: "ok", datos });
    },
    (error) => {
      if (ignorar) return;
      setEstado({ fase: "error", mensaje: error.message });
    },
  );

  return () => {
    ignorar = true;                 // esta ejecución quedó vieja
  };
}, [clave]);`}
        />

        <p>
          Lo que hace que esto funcione es que <code>ignorar</code> es una{" "}
          <strong>variable local de cada ejecución del efecto</strong>. No es un
          estado ni un ref compartido: cada vez que el efecto corre se crea una
          nueva, y la limpieza que devuelve esa ejecución es la única que puede
          tocarla. Cuatro pedidos en vuelo son cuatro banderas independientes.
        </p>

        <h3>La otra forma: AbortController</h3>

        <p>
          La bandera descarta la respuesta, pero el pedido igual viaja y el
          servidor igual trabaja. Con <code>AbortController</code> se cancela de
          verdad: se le pasa una <em>señal</em> al <code>fetch</code> y la
          limpieza la aborta.
        </p>

        <Codigo
          archivo="con AbortController"
          resaltar={[2, 5, 15]}
          codigo={`useEffect(() => {
  const control = new AbortController();

  setEstado({ fase: "cargando" });

  fetch("/api/temas/" + materia, { signal: control.signal })
    .then((respuesta) => respuesta.json())
    .then((datos) => setEstado({ fase: "ok", datos }))
    .catch((error) => {
      // Abortar también entra por acá: no es un error de verdad.
      if (error.name === "AbortError") return;
      setEstado({ fase: "error", mensaje: error.message });
    });

  return () => control.abort();
}, [materia]);`}
        />

        <p>
          Las dos formas son correctas. La bandera sirve para cualquier promesa,
          venga de donde venga; <code>AbortController</code> sirve para{" "}
          <code>fetch</code> y para todo lo que acepte una señal, y además ahorra
          trabajo del lado del servidor. Lo que no es una opción es no hacer
          ninguna de las dos.
        </p>

        <Nota tipo="info" titulo="En una app de verdad esto no lo escribís vos">
          <p>
            Todo lo de esta sección —los tres estados, la condición de carrera,
            además del caché, los reintentos y no volver a pedir lo mismo dos
            veces— es un problema resuelto. En React se delega a una librería
            como <strong>TanStack Query</strong> o <strong>SWR</strong>, que
            hacen esto por vos en una línea.
          </p>
          <p>
            Y en Next.js muchas veces el pedido ni siquiera pasa por el
            navegador: los datos se piden en un{" "}
            <strong>Server Component</strong>, que corre en el servidor, sin
            ningún efecto y sin estado de carga. Está contado en{" "}
            <Link href="/sobre-next">Cómo funciona este proyecto</Link>. Igual te
            conviene entender el patrón a mano: es la única manera de saber qué
            está haciendo la librería cuando algo sale mal.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Las reglas de los hooks, otra vez">
        <p>
          <code>useEffect</code> es un hook, así que juega con las mismas reglas
          que <code>useState</code>: se llama <strong>siempre</strong> en el
          nivel superior del componente y <strong>siempre en el mismo orden</strong>.
          Nunca adentro de un <code>if</code>, de un <code>for</code>, de una
          función anidada ni después de un <code>return</code> anticipado.
        </p>

        <Codigo
          archivo="Perfil.js"
          resaltar={[3, 10, 11]}
          codigo={`function Perfil({ usuario }) {
  // ✗ el return corta antes, así que a veces el hook se llama y a veces no
  if (!usuario) return <p>Sin usuario</p>;

  useEffect(() => { registrarVisita(usuario.id); }, [usuario]);
}

function Perfil({ usuario }) {
  // ✓ el hook siempre se llama; la condición va adentro
  useEffect(() => {
    if (!usuario) return;
    registrarVisita(usuario.id);
  }, [usuario]);

  if (!usuario) return <p>Sin usuario</p>;
}`}
        />

        <p>
          React identifica cada hook por el orden en el que lo llamás, no por su
          nombre. Si ese orden cambia entre un render y otro, el estado del
          componente se mezcla. La condición no va afuera del hook: va adentro.
        </p>
      </Seccion>

      <Seccion titulo="Lista de control">
        <p>
          Antes de escribir un <code>useEffect</code>, pasá por estas preguntas.
          Si alguna te hace decir “ah, cierto”, no escribas el efecto.
        </p>

        <ol>
          <li>
            <strong>¿Puedo calcularlo durante el render?</strong> Si sale de props
            o de estado, es una variable, no un efecto.
          </li>
          <li>
            <strong>¿Esto pasa porque el usuario hizo algo?</strong> Entonces va
            en el manejador del evento.
          </li>
          <li>
            <strong>¿Estoy copiando un estado dentro de otro?</strong> Sobra uno
            de los dos.
          </li>
          <li>
            <strong>¿Hay algo de afuera de React acá?</strong> Si la respuesta es
            no, ya está: no es un efecto.
          </li>
          <li>
            <strong>¿Qué tengo que desconectar?</strong> Si el efecto enciende
            algo, escribí la limpieza <em>en el mismo momento</em>, no después.
          </li>
          <li>
            <strong>¿Están todas las dependencias?</strong> Lo que el efecto usa
            adentro va en el arreglo. Si te molesta una, cambiá el código, no el
            arreglo.
          </li>
          <li>
            <strong>¿Aguanta montarse dos veces?</strong> Si el modo estricto te
            rompe algo, te acaba de avisar gratis.
          </li>
          <li>
            <strong>¿Puede llegar una respuesta vieja?</strong> Si adentro hay una
            promesa, necesitás la bandera <code>ignorar</code> o un{" "}
            <code>AbortController</code>.
          </li>
        </ol>

        <Nota tipo="ok" titulo="Resumen de la lección">
          <p>
            Los efectos no son “la parte de React donde va el código raro”. Son
            una puerta a lo que está afuera, con una llave —las dependencias— y
            un cerrojo —la limpieza—. Si el código que querés escribir no sale de
            la casa, no uses la puerta.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Sacá el efecto que sobra"
          pista={
            <div>
              <p>
                Preguntate qué dato es realmente <em>nuevo</em> acá. El nombre
                completo y las iniciales salen enteros de <code>nombre</code> y{" "}
                <code>apellido</code>, que son props: no hay nada que recordar
                entre un render y otro.
              </p>
              <p>
                Si un valor se puede calcular a partir de props o de estado, no
                es estado: es una variable arriba del <code>return</code>. Se
                borran dos <code>useState</code> y los dos efectos.
              </p>
            </div>
          }
          solucion={
            <div>
              <Codigo
                archivo="Tarjeta.js"
                resaltar={[2, 3, 4, 5]}
                codigo={`function Tarjeta({ nombre, apellido }) {
  // Dos cuentas, cero estados, cero efectos.
  const completo = nombre + " " + apellido;
  const iniciales =
    nombre.charAt(0).toUpperCase() + apellido.charAt(0).toUpperCase();

  return (
    <div className="tarjeta">
      <span className="marcador">{iniciales}</span>
      <h3>{completo}</h3>
    </div>
  );
}`}
              />
              <p className="tenue">
                De catorce líneas a cinco. Además desapareció el parpadeo: antes,
                el primer render mostraba las cadenas vacías y recién el segundo
                mostraba el nombre. Ahora está bien desde el primer dibujo.
              </p>
              <p>
                El bonus: con la versión original, si el padre cambia el apellido
                a mitad de camino hay un instante en el que la tarjeta muestra el
                nombre nuevo con las iniciales viejas. Eso no es un caso raro: es
                lo que pasa siempre que un dato se guarda en dos lugares.
              </p>
            </div>
          }
        >
          <p>
            Esta tarjeta arma el nombre completo y las iniciales con dos estados y
            dos efectos. Dejala haciendo exactamente lo mismo con ninguno de los
            cuatro.
          </p>
          <Codigo
            archivo="Tarjeta.js"
            resaltar={[2, 3, 5, 6, 7, 9, 10, 11]}
            codigo={`function Tarjeta({ nombre, apellido }) {
  const [completo, setCompleto] = useState("");
  const [iniciales, setIniciales] = useState("");

  useEffect(() => {
    setCompleto(nombre + " " + apellido);
  }, [nombre, apellido]);

  useEffect(() => {
    setIniciales(
      nombre.charAt(0).toUpperCase() + apellido.charAt(0).toUpperCase(),
    );
  }, [nombre, apellido]);

  return (
    <div className="tarjeta">
      <span className="marcador">{iniciales}</span>
      <h3>{completo}</h3>
    </div>
  );
}`}
          />
        </Desafio>

        <Desafio
          titulo="2. Agregale la limpieza que le falta"
          pista={
            <div>
              <p>
                Hay <strong>dos</strong> cosas encendidas: un intervalo y un
                oyente de <code>window</code>. Las dos hay que apagarlas, y las
                dos se apagan desde la misma función de limpieza.
              </p>
              <Codigo
                codigo={`useEffect(() => {
  const id = setInterval(…);
  function alTocarTecla(evento) { … }
  window.addEventListener("keydown", alTocarTecla);

  return () => {
    clearInterval(id);
    window.removeEventListener("keydown", alTocarTecla);
  };
}, []);`}
              />
              <p>
                Ojo con el oyente: <code>removeEventListener</code> tiene que
                recibir la <em>misma</em> función que recibió{" "}
                <code>addEventListener</code>. Si escribís dos funciones flecha
                distintas, no saca nada.
              </p>
            </div>
          }
          solucion={
            <div>
              <Codigo
                archivo="Cronometro.js"
                resaltar={[5, 12, 14, 15, 16, 17]}
                codigo={`function Cronometro() {
  const [decimas, setDecimas] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDecimas((anterior) => anterior + 1);
    }, 100);

    function alTocarTecla(evento) {
      if (evento.key === "r") setDecimas(0);
    }
    window.addEventListener("keydown", alTocarTecla);

    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", alTocarTecla);
    };
  }, []);

  return <p className="marcador">{(decimas / 10).toFixed(1)} s</p>;
}`}
              />
              <p className="tenue">
                Una sola función de limpieza puede apagar todo lo que encendió el
                efecto. No hace falta un efecto por cosa… aunque separarlos en dos{" "}
                <code>useEffect</code>, uno para el cronómetro y otro para el
                teclado, también es correcto y suele leerse mejor: cada efecto,
                una sola responsabilidad.
              </p>
              <p>
                Para comprobarlo: con la limpieza puesta, montar y desmontar el
                cronómetro veinte veces deja cero intervalos y cero oyentes. Sin
                ella, deja veinte de cada uno, y el número empieza a saltar de a
                veinte.
              </p>
            </div>
          }
        >
          <p>
            Este cronómetro anda perfecto… hasta que lo desmontás. El intervalo
            sigue corriendo y el oyente de teclado sigue escuchando, para siempre.
            Agregale la limpieza.
          </p>
          <Codigo
            archivo="Cronometro.js"
            resaltar={[5, 12]}
            codigo={`function Cronometro() {
  const [decimas, setDecimas] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setDecimas((anterior) => anterior + 1);
    }, 100);

    function alTocarTecla(evento) {
      if (evento.key === "r") setDecimas(0);
    }
    window.addEventListener("keydown", alTocarTecla);
  }, []);

  return <p className="marcador">{(decimas / 10).toFixed(1)} s</p>;
}`}
          />
        </Desafio>

        <Nota tipo="info" titulo="Lo que viene: hooks propios">
          <p>
            Si releés esta lección vas a notar que los efectos se repiten mucho:
            leer localStorage, escuchar el ancho de la ventana, pedir datos con
            su bandera. Cuando el mismo par de “conectar y desconectar” aparece en
            tres componentes, lo que corresponde es sacarlo a una función tuya que
            empiece con <code>use</code>. Eso es un hook propio, y es la lección
            que sigue en esta pista.
          </p>
        </Nota>
      </Seccion>
    </Leccion>
  );
}
