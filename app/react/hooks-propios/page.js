import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import AlternarDemo from "./AlternarDemo";
import FormularioDemo from "./FormularioDemo";
import AlmacenamientoDemo from "./AlmacenamientoDemo";
import RetardadoDemo from "./RetardadoDemo";

export const metadata = { title: "Hooks propios" };

export default function Pagina() {
  return (
    <Leccion
      slug="/react/hooks-propios"
      titulo="Hooks propios"
      resumen="Extraer lógica repetida a tu propio hook. Es más simple de lo que suena."
    >
      <Seccion titulo="El problema, y la extracción">
        <p>
          Dos componentes de tu app no se parecen en nada por fuera, pero adentro
          tienen exactamente el mismo mecanismo: un booleano y una función que lo
          da vuelta.
        </p>

        <Codigo
          archivo="Panel.js"
          resaltar={[2, 4, 5, 6, 20, 22, 23, 24]}
          codigo={`function PanelDeAyuda() {
  const [abierto, setAbierto] = useState(false);

  function alternar() {
    setAbierto((anterior) => !anterior);
  }

  return (
    <section>
      <button type="button" onClick={alternar}>
        {abierto ? "Ocultar ayuda" : "Ver ayuda"}
      </button>
      {abierto && <p>Escribí tu consulta y apretá Enter.</p>}
    </section>
  );
}

function Suscripcion() {
  // Las mismas cuatro líneas, con otros nombres.
  const [activa, setActiva] = useState(true);

  function alternar() {
    setActiva((anterior) => !anterior);
  }

  return (
    <section>
      <p>Estado: {activa ? "suscripto" : "sin suscribir"}</p>
      <button type="button" onClick={alternar}>Alternar</button>
    </section>
  );
}`}
        />

        <p>
          El JSX es distinto. Lo que se repite es la <strong>lógica</strong>. Si
          fueran cuatro líneas de JavaScript común las sacarías a una función y
          listo, pero acá adentro hay un <code>useState</code>, y una función
          cualquiera no puede llamar a un hook: React solo acepta llamadas a
          hooks desde un componente o desde otro hook.
        </p>

        <Nota tipo="ok" titulo="Qué es un hook propio">
          <p>
            Una <strong>función cuyo nombre empieza con <code>use</code></strong>{" "}
            y que adentro usa otros hooks. Eso es todo: no hay nada que importar,
            nada que registrar y ninguna API nueva que aprender.
          </p>
          <p className="tenue">
            El prefijo <code>use</code> no es decoración. Es lo que le avisa a
            React —y sobre todo al linter— que ahí adentro hay hooks y que valen
            las reglas de los hooks.
          </p>
        </Nota>

        <Comparacion>
          <Columna tono="mal" titulo="Antes: la lógica adentro del componente">
            <Codigo
              codigo={`function PanelDeAyuda() {
  const [abierto, setAbierto] = useState(false);

  function alternar() {
    setAbierto((anterior) => !anterior);
  }

  // …y las mismas cuatro líneas
  // otra vez en Suscripcion,
  // otra vez en MenuLateral,
  // otra vez en Acordeon.
}`}
            />
          </Columna>

          <Columna tono="bien" titulo="Después: la lógica en un hook">
            <Codigo
              codigo={`// Escrito una sola vez.
function useAlternar(inicial = false) {
  const [activo, setActivo] = useState(inicial);

  function alternar() {
    setActivo((anterior) => !anterior);
  }

  return { activo, alternar };
}

function PanelDeAyuda() {
  const { activo, alternar } = useAlternar(false);
  // …y nada más.
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          El componente pasó de <em>tener</em> la lógica a <em>usarla</em>, y se
          quedó con lo único que le importa: el JSX. Fijate que{" "}
          <code>useAlternar</code> no devuelve JSX. Esa es la diferencia entre un
          hook y un componente: el componente devuelve pantalla, el hook devuelve
          datos y funciones.
        </p>
      </Seccion>

      <Seccion titulo="Lo que se comparte es la lógica, no el estado">
        <p>
          Esta es la pregunta que aparece siempre: si los dos componentes llaman
          a la misma función, ¿no van a terminar compartiendo el mismo booleano?
          No. Tocá un panel y mirá el otro.
        </p>

        <Demo titulo="Dos llamadas al mismo hook">
          <AlternarDemo />
        </Demo>

        <Codigo
          archivo="app/react/hooks-propios/AlternarDemo.js"
          resaltar={[6, 7]}
          codigo={`// ---------------------------------------------------------------------------
// EL HOOK PROPIO.
// Es una función común y silvestre. Lo único que la convierte en hook es que
// el nombre empieza con "use"; gracias a eso puede llamar a useState adentro.
// ---------------------------------------------------------------------------
function useAlternar(inicial = false) {
  const [activo, setActivo] = useState(inicial);

  function alternar() {
    setActivo((anterior) => !anterior);
  }

  // Devolvemos un objeto porque son cuatro cosas: con nombres no hay que
  // acordarse ningún orden.
  return {
    activo,
    alternar,
    prender: () => setActivo(true),
    apagar: () => setActivo(false),
  };
}`}
        />

        <p>
          Cada llamada a <code>useAlternar</code> ejecuta su propio{" "}
          <code>useState</code>, y React le da a cada uno su casillero. El
          casillero no pertenece al hook: pertenece al componente que lo llamó,
          en el orden en que lo llamó. Dos llamadas, dos casilleros, cero
          contacto entre ellos.
        </p>

        <p>
          Es la misma intuición que las clausuras de{" "}
          <Link href="/js/fundamentos">los fundamentos de JavaScript</Link>:
          llamar dos veces a la misma función crea dos juegos de variables
          independientes.
        </p>

        <Nota tipo="atencion" titulo="Si lo que querés es compartir el estado">
          <p>
            Entonces un hook propio no es la herramienta. Para que dos
            componentes vean y modifiquen <em>el mismo</em> dato hay que{" "}
            <Link href="/react/estado-compartido">levantar el estado al padre</Link>{" "}
            y bajarlo por props. Un hook propio duplica el mecanismo; levantar el
            estado comparte el valor.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Las reglas">
        <p>
          <strong>1. El nombre tiene que empezar con <code>use</code>.</strong>{" "}
          No es un capricho de estilo: el plugin de ESLint decide qué funciones
          revisar mirando el nombre. Si a tu hook lo llamás{" "}
          <code>obtenerAncho</code>, el linter lo trata como una función común y
          deja de avisarte cuando lo llamás adentro de un <code>if</code>, que es
          justo el error que más caro sale.
        </p>

        <p>
          <strong>2. Se llama en el nivel superior.</strong> Igual que{" "}
          <code>useState</code> o <code>useEffect</code>: arriba de todo en el
          componente, nunca dentro de un <code>if</code>, de un bucle, de un{" "}
          <code>try</code> ni después de un <code>return</code> temprano. React
          identifica cada estado por el orden de las llamadas, y ese orden tiene
          que ser el mismo en todos los renderizados.
        </p>

        <p>
          <strong>3. Puede devolver lo que quieras.</strong> No hay una forma
          obligatoria, hay tres formas cómodas.
        </p>

        <Codigo
          codigo={`// Un valor solo: cuando el hook entrega una cosa y nada más.
const consulta = useRetardado(texto, 500);

// Un arreglo, estilo useState: cuando son dos o tres y quien lo usa
// va a querer ponerles el nombre que le convenga.
const [tema, setTema] = useAlmacenamientoLocal("tema", "claro");

// Un objeto: cuando son varias. Con nombres no hay que acordarse
// ningún orden y podés agregar una más sin romper a nadie.
const { activo, alternar, prender, apagar } = useAlternar();`}
        />

        <p className="tenue">
          Regla práctica: uno, devolvé el valor; dos, un arreglo; tres o más, un
          objeto.
        </p>
      </Seccion>

      <Seccion titulo="Un par de hooks útiles">
        <p>
          Estos tres son de los que terminás escribiendo en cualquier proyecto.
          Mirá el código al lado de cada demo: ninguno tiene nada raro adentro,
          son los hooks que ya conocés metidos en una función con buen nombre.
        </p>

        <h3>useEntrada: un input controlado completo</h3>

        <p>
          Un formulario{" "}
          <Link href="/react/formularios">controlado</Link> de tres campos son
          tres <code>useState</code>, tres <code>onChange</code> y tres
          validaciones repetidas. <code>useEntrada</code> se lleva todo eso, y
          devuelve un objeto <code>props</code> listo para hacerle spread al{" "}
          <code>&lt;input&gt;</code>.
        </p>

        <Codigo
          archivo="app/react/hooks-propios/FormularioDemo.js"
          resaltar={[7, 18, 19, 20, 21, 22]}
          codigo={`function useEntrada(inicial = "", validar) {
  const [valor, setValor] = useState(inicial);
  const [tocado, setTocado] = useState(false);

  // El error se CALCULA en cada render a partir del valor. No va en otro
  // useState: sería una segunda fuente de verdad que se desincroniza.
  const error = validar ? validar(valor) : null;

  return {
    valor,
    error,
    // Solo molestamos con el error después de que el usuario pasó por el campo.
    mostrarError: tocado && error !== null,
    limpiar() {
      setValor(inicial);
      setTocado(false);
    },
    props: {
      value: valor,
      onChange: (evento) => setValor(evento.target.value),
      onBlur: () => setTocado(true),
    },
  };
}`}
        />

        <Demo titulo="Dos campos, el mismo hook">
          <FormularioDemo />
        </Demo>

        <p className="tenue">
          Lo vas a querer en cuanto tengas el segundo formulario. El truco que
          más rinde es el de <code>tocado</code>: el error existe desde el
          principio, pero recién se muestra cuando el usuario se fue del campo.
        </p>

        <h3>useAlmacenamientoLocal: un useState que sobrevive al F5</h3>

        <p>
          Acá el hook encapsula <Link href="/react/efectos">un efecto</Link>, que
          es donde más se nota la ganancia: el componente que lo usa no se entera
          de que existe <code>localStorage</code>, ni de que en el servidor no
          hay <code>window</code>. Lo usa como si fuera <code>useState</code>.
        </p>

        <Codigo
          archivo="app/react/hooks-propios/AlmacenamientoDemo.js"
          resaltar={[33]}
          codigo={`function useAlmacenamientoLocal(clave, inicial) {
  const [valor, setValor] = useState(inicial);
  const [listo, setListo] = useState(false);

  // 1) Al montar: leemos lo que haya guardado.
  //
  // El linter avisa cuando se llama a una función setEstado dentro de un efecto,
  // porque casi siempre significa que ese efecto sobra. Acá es una de las pocas
  // excepciones legítimas: localStorage es un sistema externo que solo existe en
  // el navegador, así que no podemos leerlo mientras se arma el HTML en el
  // servidor. Leerlo al montar es exactamente para lo que sirve useEffect.
  useEffect(() => {
    try {
      const crudo = window.localStorage.getItem(clave);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- ver el comentario de arriba
      if (crudo !== null) setValor(JSON.parse(crudo));
    } catch {
      // JSON corrupto o almacenamiento bloqueado: seguimos con el inicial.
    }
    setListo(true);
  }, [clave]);

  // 2) Cada vez que el valor cambia: lo escribimos.
  useEffect(() => {
    if (!listo) return; // no pisamos lo guardado antes de haberlo leído
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // Modo incógnito o cuota llena: la app tiene que seguir funcionando.
    }
  }, [clave, valor, listo]);

  return [valor, setValor, listo];
}`}
        />

        <Demo titulo="Escribí algo y recargá con F5">
          <AlmacenamientoDemo />
        </Demo>

        <p className="tenue">
          Devuelve un arreglo a propósito: quien lo llama le pone el nombre que
          quiera, igual que con <code>useState</code>. El tercer elemento,{" "}
          <code>listo</code>, sirve para no pisar lo guardado antes de haberlo
          leído.
        </p>

        <h3>useRetardado: esperar a que el usuario pare de escribir</h3>

        <p>
          Si pedís resultados al servidor en cada tecla, escribir{" "}
          <code>javascript</code> dispara diez pedidos y el último puede llegar
          antes que el anterior. <code>useRetardado</code> te devuelve el mismo
          valor, pero recién cuando se quedó quieto.
        </p>

        <Codigo
          archivo="app/react/hooks-propios/RetardadoDemo.js"
          resaltar={[13, 17]}
          codigo={`function useRetardado(valor, retardo = 400, alEstabilizar) {
  const [retrasado, setRetrasado] = useState(valor);

  // Guardamos la función en una ref y la mantenemos al día con un efecto. Si la
  // pusiéramos en las dependencias del efecto de abajo, el temporizador se
  // reiniciaría en cada renderizado, porque es una función nueva cada vez.
  const refAviso = useRef(alEstabilizar);
  useEffect(() => {
    refAviso.current = alEstabilizar;
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setRetrasado(valor);
      if (refAviso.current) refAviso.current(valor);
    }, retardo);
    return () => clearTimeout(id);
  }, [valor, retardo]);

  return retrasado;
}`}
        />

        <Demo titulo="Escribí rápido y mirá el contador de consultas">
          <RetardadoDemo />
        </Demo>

        <p className="tenue">
          Todo el mecanismo es la línea de limpieza: si el valor cambia antes de
          que se cumpla el tiempo, se cancela el temporizador viejo y arranca uno
          nuevo. Probá el demo en 0 ms y en 1200 ms para verlo.
        </p>

        <Nota tipo="atencion" titulo="Cuándo NO hacer un hook propio">
          <p>
            Cuando la lógica no se repite. Un <code>useState</code> suelto adentro
            de un componente que se entiende de un vistazo no necesita mudarse a
            ningún lado: sacarlo a un hook solo agrega un archivo más que abrir
            para saber qué pasa.
          </p>
          <p>
            Y si la función que querés extraer <strong>no usa ningún hook</strong>
            , entonces no es un hook: es una función común. Dejala afuera del
            componente, sin prefijo <code>use</code>, y listo.
          </p>
          <p className="tenue">
            El disparador razonable es la tercera repetición, o la primera vez que
            la lógica tiene un efecto con su limpieza. Antes de eso, esperá.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Extraé el hook que está escondido"
          pista={
            <div>
              <p>
                Lo que se repite es el <code>useState</code> del arreglo más las
                dos funciones que lo modifican sin mutarlo. El JSX no, ese se
                queda en cada componente.
              </p>
              <p>
                El hook recibe la lista inicial y devuelve tres cosas, así que
                conviene un objeto. Acordate de que cada componente va a tener su
                propia lista: ese es el punto.
              </p>
            </div>
          }
          solucion={
            <div>
              <Codigo
                archivo="useLista.js"
                resaltar={[1, 13]}
                codigo={`function useLista(inicial = []) {
  const [items, setItems] = useState(inicial);

  function agregar(texto) {
    if (texto.trim() === "") return;
    setItems((lista) => [...lista, { id: crypto.randomUUID(), texto }]);
  }

  function borrar(id) {
    setItems((lista) => lista.filter((item) => item.id !== id));
  }

  return { items, agregar, borrar };
}

function Compras() {
  const { items, agregar, borrar } = useLista();
  // …el JSX de la lista de compras
}

function Tareas() {
  const { items, agregar, borrar } = useLista();
  // …el JSX de las tareas, con su propia lista
}`}
              />
              <p className="tenue">
                Las funciones actualizadoras (<code>(lista) =&gt; …</code>) no son
                un detalle: adentro del hook no tenés forma de saber cuántas veces
                seguidas te van a llamar. Es lo mismo que viste en{" "}
                <Link href="/react/arreglos-en-estado">arreglos en estado</Link>.
              </p>
            </div>
          }
        >
          <p>
            Estos dos componentes manejan listas de cosas distintas con el mismo
            mecanismo. Extraé un hook <code>useLista</code> y dejá los dos
            componentes con una sola línea de lógica.
          </p>
          <Codigo
            archivo="Listas.js"
            resaltar={[2, 4, 5, 6, 7, 9, 10, 11, 17, 19, 20, 21, 24, 25, 26]}
            codigo={`function Compras() {
  const [items, setItems] = useState([]);

  function agregar(texto) {
    if (texto.trim() === "") return;
    setItems((lista) => [...lista, { id: crypto.randomUUID(), texto }]);
  }

  function borrar(id) {
    setItems((lista) => lista.filter((item) => item.id !== id));
  }

  // …el JSX de la lista de compras
}

function Tareas() {
  const [items, setItems] = useState([]);

  function agregar(texto) {
    if (texto.trim() === "") return;
    setItems((lista) => [...lista, { id: crypto.randomUUID(), texto }]);
  }

  function borrar(id) {
    setItems((lista) => lista.filter((item) => item.id !== id));
  }

  // …el JSX de las tareas
}`}
          />
        </Desafio>

        <Desafio
          titulo="2. Acá hay dos reglas rotas"
          pista={
            <div>
              <p>
                Una está en el <strong>nombre</strong> de la función. La otra está
                en <strong>dónde</strong> se la llama.
              </p>
              <p>
                Para la segunda: el hook tiene que correr siempre, en todos los
                renderizados. Lo que puede ser condicional es lo que hacés con lo
                que devuelve.
              </p>
            </div>
          }
          solucion={
            <div>
              <Codigo
                archivo="Buscador.js"
                resaltar={[1, 8]}
                codigo={`function useConsulta(inicial = "") {
  const [texto, setTexto] = useState(inicial);
  return [texto, setTexto];
}

function Buscador({ habilitado }) {
  // El hook siempre se llama, pase lo que pase.
  const [texto, setTexto] = useConsulta("");

  // Lo condicional es el JSX, no la llamada.
  if (!habilitado) return <p>El buscador está apagado.</p>;

  return (
    <input
      className="entrada"
      value={texto}
      onChange={(evento) => setTexto(evento.target.value)}
    />
  );
}`}
              />
              <p className="tenue">
                Con el nombre arreglado el linter empieza a mirar la función, y te
                habría marcado solo el segundo error. Por eso el prefijo{" "}
                <code>use</code> va primero: es lo que enciende la ayuda.
              </p>
            </div>
          }
        >
          <p>
            Este código compila y a veces hasta funciona, pero rompe dos de las
            tres reglas. Encontralas y arreglalo.
          </p>
          <Codigo
            archivo="Buscador.js"
            resaltar={[1, 7, 9]}
            codigo={`function crearConsulta(inicial = "") {
  const [texto, setTexto] = useState(inicial);
  return [texto, setTexto];
}

function Buscador({ habilitado }) {
  if (!habilitado) return <p>El buscador está apagado.</p>;

  const [texto, setTexto] = crearConsulta("");

  return (
    <input
      className="entrada"
      value={texto}
      onChange={(evento) => setTexto(evento.target.value)}
    />
  );
}`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
