import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Comparacion, { Columna } from "@/components/Comparacion";
import Desafio from "@/components/Desafio";
import CicloDemo from "./CicloDemo";
import PruebasDemo from "./PruebasDemo";
import TiendaDemo from "./TiendaDemo";

export const metadata = { title: "Store, acciones y reducers" };

// ------------------------------------------------------------- la lección ---

export default function Pagina() {
  return (
    <Leccion
      slug="/redux/conceptos"
      titulo="Store, acciones y reducers"
      resumen="Las tres piezas y el flujo en una sola dirección. Redux a mano, sin librerías, para entenderlo."
    >
      <Seccion titulo="Hoy no instalamos nada">
        <p>
          En <Link href="/redux/por-que">la lección anterior</Link> quedó la
          promesa: Redux es mucho más simple de lo que su fama sugiere. Esta es
          la lección donde se cumple.
        </p>

        <p>
          No vamos a usar <code>@reduxjs/toolkit</code> ni{" "}
          <code>react-redux</code>. Los vas a instalar en la próxima, y para
          entonces no te van a parecer magia, porque el núcleo entero de Redux lo
          vas a haber escrito vos: unas veinte líneas de JavaScript común, un
          objeto, una función y un arreglo de avisados. Redux no es una librería
          con poderes especiales, es un <strong>patrón</strong>, y la librería
          existe para ahorrarte tipeo. Todo lo de acá corre de verdad, con los
          archivos reales al lado de cada demo.
        </p>
      </Seccion>

      <Seccion titulo="El flujo en una sola dirección" id="flujo">
        <p>
          Redux tiene tres piezas y ninguna es complicada por separado. Lo que
          hay que entender es cómo se encadenan.
        </p>

        <ul>
          <li>
            <strong>El store</strong> es un objeto que guarda el estado de toda
            la aplicación. Es uno solo y vive afuera de React.
          </li>
          <li>
            <strong>La acción</strong> es un objeto plano que describe algo que
            pasó: un <code>type</code> y, si hace falta, un{" "}
            <code>payload</code>.
          </li>
          <li>
            <strong>El reducer</strong> es una función pura que recibe el estado
            viejo y la acción, y devuelve el estado nuevo.
          </li>
        </ul>

        <p>
          El ciclo es siempre el mismo y siempre va para el mismo lado. La vista
          <strong> despacha</strong> una acción. El reducer{" "}
          <strong>calcula</strong> el estado nuevo. El store lo{" "}
          <strong>guarda y avisa</strong>. La vista se{" "}
          <strong>vuelve a dibujar</strong>. Y de nuevo. Tocá el botón de abajo y
          seguí cómo se enciende cada etapa: está frenado a propósito, porque en
          la realidad las cuatro pasan en el mismo suspiro.
        </p>

        <Demo titulo="Demo · el ciclo, en cámara lenta">
          <CicloDemo />
        </Demo>

        <Codigo
          archivo="app/redux/conceptos/CicloDemo.js"
          codigo={`// Un store mínimo, solo para esta demo: un número y una acción.
function reducirClics(estado = { clics: 0 }, accion) {
  switch (accion.type) {
    case "ciclo/botonTocado":
      return { clics: estado.clics + 1 };
    default:
      return estado;
  }
}

const store = crearStore(reducirClics);`}
        />

        <p>
          Lo importante no es la cantidad de pasos: es que{" "}
          <strong>no hay atajos</strong>. No existe una forma de escribir{" "}
          <code>store.estado.clics = 5</code> y que la pantalla se entere. El
          único camino es despachar. Por eso, cuando un dato aparece mal, la
          pregunta siempre tiene respuesta: qué acción lo dejó así.
        </p>

        <Nota tipo="info" titulo="Comparalo con lo que ya sabés">
          <p>
            En <Link href="/react/estado">useState</Link> el estado vive{" "}
            <em>adentro</em> del componente y se cambia llamando a su setter. En{" "}
            <Link href="/react/estado-compartido">estado compartido</Link> lo
            subiste al padre y lo bajaste por props. Acá el estado se va del
            árbol: vive en un objeto suelto, y los componentes se anotan para
            que les avisen.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El reducer, que es el corazón" id="reducer">
        <p>
          Si entendés el reducer, entendés Redux. Es una función con una firma
          fija, <code>(estadoViejo, accion) =&gt; estadoNuevo</code>, y con tres
          reglas que no se negocian:
        </p>

        <ul>
          <li>
            <strong>No muta.</strong> Nunca toca el estado que recibió. Arma uno
            nuevo y lo devuelve.
          </li>
          <li>
            <strong>No pide datos ni hace nada afuera.</strong> Sin{" "}
            <code>fetch</code>, sin <code>Math.random()</code>, sin{" "}
            <code>Date.now()</code>, sin escribir en el navegador.
          </li>
          <li>
            <strong>Con las mismas entradas da siempre lo mismo.</strong> Es la
            consecuencia de las dos anteriores, y es la que lo hace testeable.
          </li>
        </ul>

        <p>
          A una función así se le dice <strong>pura</strong>. No es un término
          nuevo de Redux: lo viste en{" "}
          <Link href="/js/fundamentos">los fundamentos del lenguaje</Link>. Lo
          nuevo es que acá es obligatorio.
        </p>

        <h3>El switch y su caso por defecto</h3>

        <p>
          Casi todos los reducers tienen la misma forma: un <code>switch</code>{" "}
          sobre <code>accion.type</code>, un <code>case</code> por cada hecho que
          sabe manejar, y un <code>default</code> al final.
        </p>

        <Codigo
          archivo="app/redux/conceptos/store.js"
          resaltar={[9, 10]}
          codigo={`function reducirContador(estado = 0, accion) {
  switch (accion.type) {
    case PUNTO_SUMADO:
      return estado + 1;
    case PUNTO_RESTADO:
      return estado - 1;
    case DEMO_REINICIADA:
      return 0;
    default:
      return estado;
  }
}`}
        />

        <p>
          Ese <code>default</code> no es un detalle de prolijidad:{" "}
          <strong>es obligatorio</strong>. Cuando despachás una acción, el store
          se la pasa a <em>todos</em> los reducers, no solo al que le interesa.
          Si el de tareas no devolviera el estado tal cual al recibir{" "}
          <code>contador/puntoSumado</code>, devolvería <code>undefined</code> y
          la lista de tareas desaparecería cada vez que alguien toca el{" "}
          <strong>+1</strong>.
        </p>

        <p>
          Y el valor por defecto del primer parámetro —ese{" "}
          <code>estado = 0</code>— es el estado inicial de esa área. Cuando el
          store arranca despacha una acción que ningún reducer conoce: cada uno
          cae en su <code>default</code> y, como <code>estado</code> llegó vacío,
          devuelve su valor inicial. Así se arma el estado completo sin
          escribirlo a mano en ningún lado.
        </p>

        <h3>No mutar: la misma regla de siempre</h3>

        <p>
          Esta parte ya la sabés y no la vamos a repetir: es idéntica a lo que
          viste en{" "}
          <Link href="/react/objetos-en-estado">objetos en estado</Link> y{" "}
          <Link href="/react/arreglos-en-estado">arreglos en estado</Link>. Para
          cambiar algo se copia lo de antes y se reemplaza la parte que cambió,
          con <code>...</code> para objetos y con <code>map</code>,{" "}
          <code>filter</code> o un arreglo nuevo para listas. Nunca{" "}
          <code>push</code>, nunca <code>sort</code>, nunca{" "}
          <code>estado.algo = otraCosa</code>.
        </p>

        <Nota tipo="atencion" titulo="Por qué importa tanto acá">
          <p>
            Si mutás, el estado viejo y el nuevo son <strong>el mismo
            objeto</strong>, y nadie se entera del cambio. Peor todavía: las
            DevTools pierden el historial, porque todos los pasos del viaje en el
            tiempo apuntan a ese objeto, que ahora dice lo último.
          </p>
        </Nota>

        <h3>Un reducer se testea sin React</h3>

        <p>
          Esta es la consecuencia práctica de todo lo anterior, y es la que más
          se pasa por alto. Un reducer es una función común: entra un objeto,
          sale otro. Para probarlo no hace falta montar un componente, ni abrir
          un navegador, ni simular un clic. Abajo hay un corredor de pruebas
          escrito a mano, sin ninguna librería: cinco pruebas, las mismas dos
          veces, contra un reducer correcto y contra uno que muta.
        </p>

        <Demo titulo="Demo · cinco pruebas contra dos reducers">
          <PruebasDemo />
        </Demo>

        <p>
          Mirá cuáles fallan con el reducer que muta: la que dice que no toca el
          arreglo recibido, la que pide un arreglo nuevo y la que exige que dos
          llamadas iguales den lo mismo. La que comprueba que{" "}
          <em>la tarea aparece</em> pasa igual en los dos casos. Por eso el bug
          sobrevive tanto tiempo en una aplicación de verdad: en pantalla se ve
          bien.
        </p>

        <Codigo
          archivo="app/redux/conceptos/PruebasDemo.js"
          codigo={`function correrPruebas(reducir) {
  const resultados = [];

  function esperar(nombre, ok, detalle) {
    resultados.push({ nombre, ok, detalle });
  }

  const nueva = { id: 9, texto: "tarea nueva", hecha: false };
  const base = () => [{ id: 1, texto: "primera", hecha: false }];

  // 1. Una acción que el reducer no conoce no cambia nada.
  const a = base();
  esperar(
    "una acción desconocida devuelve el MISMO estado",
    reducir(a, { type: "otra/cosa" }) === a,
    "reducir(estado, { type: 'otra/cosa' }) === estado",
  );`}
        />

        <p>
          Con Jest o Vitest escribirías <code>expect(...).toEqual(...)</code> en
          vez de ese <code>esperar</code>, y listo: la idea es la misma, y se
          puede hacer porque el reducer es puro.
        </p>
      </Seccion>

      <Seccion titulo="Las acciones son hechos, no órdenes" id="acciones">
        <p>
          Una acción es un objeto plano. Nada más. Tiene un{" "}
          <code>type</code> obligatorio, que es un texto, y opcionalmente un{" "}
          <code>payload</code> con los datos que el reducer necesita.
        </p>

        <Codigo
          archivo="tres acciones"
          codigo={`{ type: "contador/puntoSumado" }
{ type: "tareas/tareaBorrada", payload: 7 }
{ type: "tareas/tareaAgregada", payload: { id: 101, texto: "Estudiar" } }`}
        />

        <p>
          El <code>type</code> se escribe <code>area/loQuePaso</code>: adelante
          el área del estado, atrás el hecho. Así no chocan los nombres y en las
          DevTools se ve de un vistazo de dónde salió cada cosa.
        </p>

        <h3>Pasado, no imperativo</h3>

        <p>
          Esto parece una preferencia de estilo y no lo es. Una acción describe
          algo que <strong>pasó</strong>, no una orden que alguien tiene que
          obedecer.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Nombres de orden">
            <Codigo
              codigo={`agregarProducto
borrarTarea
mostrarError`}
            />
          </Columna>
          <Columna tono="bien" titulo="Nombres de hecho">
            <Codigo
              codigo={`carrito/productoAgregado
tareas/tareaBorrada
sesion/ingresoRechazado`}
            />
          </Columna>
        </Comparacion>

        <p>
          La razón de fondo es esta:{" "}
          <strong>una acción puede tener varios reducers escuchándola</strong>.
          Si la llamás <code>agregarProducto</code>, estás diciendo quién tiene
          que hacer qué, y eso solo sirve si hay un único destinatario. Si la
          llamás <code>carrito/productoAgregado</code>, estás contando algo que
          ocurrió, y cada área decide por su cuenta si le importa.
        </p>

        <p>
          En el demo de más abajo esto pasa de verdad: al agregar una tarea se
          despacha <code>tareas/tareaAgregada</code> y la escuchan{" "}
          <strong>dos</strong> reducers, el de la lista y el de estadísticas.
          Ninguno sabe que el otro existe, y el botón que despachó tampoco.
        </p>

        <Codigo
          archivo="app/redux/conceptos/store.js"
          resaltar={[5, 6]}
          codigo={`// Este reducer escucha las MISMAS acciones que el de arriba. Ninguno de los
// dos sabe que el otro existe, y la vista que despacha tampoco.
function reducirEstadisticas(estado = { agregadas: 0, borradas: 0 }, accion) {
  switch (accion.type) {
    case TAREA_AGREGADA:
      return { ...estado, agregadas: estado.agregadas + 1 };
    case TAREA_BORRADA:
      return { ...estado, borradas: estado.borradas + 1 };
    case DEMO_REINICIADA:
      return { agregadas: 0, borradas: 0 };
    default:
      return estado;
  }
}`}
        />

        <p>
          Para agregar mañana un historial de actividad no hay que tocar ni el
          botón ni los reducers que ya están: se escribe un reducer más que
          escuche esa misma acción. Eso es lo que compra el nombre en pasado.
        </p>

        <h3>Creadores de acciones</h3>

        <p>
          Escribir el objeto a mano en cada <code>onClick</code> funciona, pero
          repite el <code>type</code> por toda la aplicación. Un{" "}
          <em>creador de acciones</em> es una función de una línea que lo
          devuelve armado.
        </p>

        <Codigo
          archivo="app/redux/conceptos/store.js"
          resaltar={[12, 13, 14, 15]}
          codigo={`export const puntoSumado = () => ({ type: PUNTO_SUMADO });
export const puntoRestado = () => ({ type: PUNTO_RESTADO });
export const tareaAlternada = (id) => ({ type: TAREA_ALTERNADA, payload: id });
export const tareaBorrada = (id) => ({ type: TAREA_BORRADA, payload: id });
export const demoReiniciada = () => ({ type: DEMO_REINICIADA });

// El id se genera acá, en el creador, y no adentro del reducer. El reducer
// tiene que ser puro: con las mismas entradas, la misma salida. Un contador
// que sube solo, o un Date.now(), lo dejarían de ser.
let siguienteId = 100;

export const tareaAgregada = (texto) => ({
  type: TAREA_AGREGADA,
  payload: { id: siguienteId++, texto, hecha: false },
});`}
        />

        <p>Lo que ganás con eso:</p>

        <ul>
          <li>
            El texto del <code>type</code> vive en{" "}
            <strong>un solo lugar</strong>. Un typo deja de ser un bug mudo, y{" "}
            <code>despachar(tareaBorrada(7))</code> se lee mejor que el objeto
            crudo.
          </li>
          <li>
            Es el lugar natural para lo que{" "}
            <strong>no puede ir en el reducer</strong>: generar un id, poner la
            fecha, leer algo de afuera. El reducer sigue puro y recibe el dato ya
            cocinado.
          </li>
        </ul>

        <p>
          Lo mismo vale para las constantes: los <code>case</code> del reducer
          dicen <code>TAREA_AGREGADA</code> y no el texto suelto. Si escribís mal
          una constante, el programa falla al instante; si escribís mal un texto,
          no pasa nada y la acción cae en el <code>default</code> para siempre.
        </p>
      </Seccion>

      <Seccion titulo="El store, escrito a mano" id="store">
        <p>
          Llegamos al núcleo. Esto es <strong>todo</strong> lo que un store es:
          una variable con el estado, un arreglo de avisados y tres funciones.
        </p>

        <Codigo
          archivo="app/redux/conceptos/redux-casero.js"
          resaltar={[14, 15, 16]}
          codigo={`// Crea un store: guarda un estado, deja despachar acciones y avisa a quien se
// haya suscrito. Esto es todo lo que un store es.
export function crearStore(reducer, estadoInicial) {
  let estado = estadoInicial;
  let oyentes = [];

  // Leer el estado de ahora. Devuelve la referencia, no una copia.
  function getState() {
    return estado;
  }

  // La única forma de cambiarlo: pasar una acción por el reducer y avisar.
  function dispatch(accion) {
    estado = reducer(estado, accion);
    for (const oyente of oyentes) oyente();
    return accion;
  }

  // Anotarse para que te avisen. Devuelve la función para desanotarte.
  function subscribe(oyente) {
    oyentes = [...oyentes, oyente];
    return function desuscribir() {
      oyentes = oyentes.filter((otro) => otro !== oyente);
    };
  }

  // Una acción que ningún reducer conoce: cada uno cae en su default y
  // devuelve su estado inicial, así el store arranca armado.
  dispatch({ type: "@@init" });

  return { getState, dispatch, subscribe };
}`}
        />

        <p>Veinte líneas. Leelas de nuevo y fijate qué hace cada una:</p>

        <ul>
          <li>
            <code>dispatch(accion)</code> son las tres líneas resaltadas, y es
            literalmente todo Redux. Pasa el estado y la acción por el reducer,
            se queda con lo que devolvió, y llama a todos los avisados.
          </li>
          <li>
            <code>subscribe(oyente)</code> anota una función y devuelve otra para
            desanotarla. Ese valor de retorno importa: así quien se suscribe
            puede limpiar lo suyo cuando se va.
          </li>
          <li>
            El <code>dispatch</code> del final manda una acción que nadie conoce,
            solo para que cada reducer devuelva su valor por defecto y el store
            arranque con el estado inicial armado.
          </li>
        </ul>

        <Nota tipo="ok" titulo="Esto no es una versión de juguete">
          <p>
            El <code>createStore</code> de la librería tiene más cosas —soporte
            para middlewares y la conexión con las DevTools— pero el corazón es
            exactamente este. Si lo entendiste acá, lo entendiste allá.
          </p>
        </Nota>

        <h3>Conectarlo a React</h3>

        <p>
          El store no sabe nada de React, y está bien que sea así. Para que un
          componente lea de él hace falta un puente, y React trae el hook justo
          para esto: <code>useSyncExternalStore</code>.
        </p>

        <Codigo
          archivo="app/redux/conceptos/useEstado.js"
          codigo={`import { useSyncExternalStore } from "react";

export function useEstado(store) {
  return useSyncExternalStore(store.subscribe, store.getState, store.getState);
}`}
        />

        <p>
          Le pasás tres cosas: cómo suscribirse, cómo leer el valor en el
          navegador y cómo leerlo en el servidor para el primer HTML. React se
          anota solo cuando el componente se monta, se desanota cuando se va, y
          vuelve a dibujar cuando el valor que devuelve <code>getState</code>{" "}
          deja de ser <code>===</code> al anterior. Es un{" "}
          <Link href="/react/hooks-propios">hook propio</Link> de una línea, y es
          la forma correcta de hacerlo: la tentación es un{" "}
          <code>useEffect</code> que se suscribe y llama a un{" "}
          <code>setEstado</code>, y eso parpadea, se desincroniza en el primer
          render y React lo desaconseja explícitamente.
        </p>

        <Nota tipo="atencion" titulo="Acá se cierra el círculo">
          <p>
            Si el reducer mutara, <code>getState()</code> devolvería siempre la
            misma referencia, la comparación con <code>===</code> daría verdadero
            y la pantalla no se actualizaría nunca. La regla de no mutar no es
            estética: es lo que hace funcionar al dibujo.
          </p>
          <p className="tenue">
            Este archivo lleva{" "}
            <Link href="/sobre-next">&quot;use client&quot;</Link>, como todo
            archivo con hooks. El del store no lo necesita: es JavaScript puro y
            corre en los dos lados.
          </p>
        </Nota>

        <h3>Todo junto, funcionando</h3>

        <p>
          Esta es la aplicación entera corriendo sobre ese store de veinte
          líneas: un contador, una lista de tareas y unas estadísticas. A la
          derecha tenés el estado completo tal como lo devuelve{" "}
          <code>getState()</code>, y abajo el registro de cada acción
          despachada, en orden, con su <code>type</code> y su{" "}
          <code>payload</code>.
        </p>

        <Demo titulo="Demo · un store de verdad, con el estado a la vista">
          <TiendaDemo />
        </Demo>

        <p>Cosas para mirar mientras tocás:</p>

        <ul>
          <li>
            Agregá una tarea y seguí <code>estadisticas.agregadas</code>: sube
            con la misma acción que agregó la tarea. Un hecho, dos reducers.
          </li>
          <li>
            Tocá el <strong>+1</strong>: en el JSON cambia solo{" "}
            <code>contador</code>, porque el reducer de tareas cayó en su{" "}
            <code>default</code>. Marcá una tarea como hecha y las estadísticas
            tampoco se mueven: ese reducer no escucha esa acción.
          </li>
          <li>
            El registro es, en chiquito, lo que dan las Redux DevTools: con esa
            lista podés reconstruir el estado desde cero, porque el estado no es
            más que el resultado de aplicar todas esas acciones en orden.
          </li>
        </ul>

        <p>
          El componente que ves no tiene <code>useState</code> para nada de eso.
          Solo pide el estado y despacha:
        </p>

        <Codigo
          archivo="app/redux/conceptos/TiendaDemo.js"
          resaltar={[2, 3]}
          codigo={`export default function TiendaDemo() {
  // Lo único que React necesita saber del store: su estado de ahora.
  const estado = useEstado(store);

  function despachar(accion) {
    store.dispatch(accion);
    setRegistro((previo) => [{ n: previo.length + 1, accion }, ...previo]);
  }`}
        />

        <Nota tipo="info" titulo="El store vive afuera de React">
          <p>
            El <code>store</code> se crea una vez, al cargar el módulo, no
            adentro de ningún componente. Probá: cambiá el contador, andá a otra
            lección con el menú de la izquierda y volvé. El número sigue donde lo
            dejaste, porque el store nunca se desmontó. Con{" "}
            <code>useState</code> habrías vuelto a cero.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Partir el reducer: combinarReducers" id="combinar">
        <p>
          Un reducer con un <code>switch</code> de ochenta casos, que arma un
          objeto con doce campos, se vuelve imposible de leer y de tocar entre
          varias personas. La solución es partirlo{" "}
          <strong>por área del estado</strong>: un reducer chico por cada rama,
          cada uno con su estado inicial y sus casos.
        </p>

        <p>
          Después se pegan con una función que también entra en pocas líneas:
        </p>

        <Codigo
          archivo="app/redux/conceptos/redux-casero.js"
          codigo={`// Parte el estado por área. Recibe { contador: reducirContador, tareas: ... }
// y devuelve UN solo reducer que llama a cada uno con su pedazo del estado.
export function combinarReducers(reducers) {
  const areas = Object.keys(reducers);

  return function reducerRaiz(estado = {}, accion) {
    let cambio = false;
    const siguiente = {};

    for (const area of areas) {
      siguiente[area] = reducers[area](estado[area], accion);
      if (siguiente[area] !== estado[area]) cambio = true;
    }

    // Si ningún área cambió devolvemos el objeto viejo, no uno nuevo igual.
    // Así quien compara con === sabe que no hay nada para redibujar.
    return cambio ? siguiente : estado;
  };
}`}
        />

        <p>
          Devuelve un reducer común y corriente, con la misma firma de siempre:
          el store no se entera de que adentro hay tres. Para cada acción llama a{" "}
          <strong>todos</strong> los reducers con <em>su</em> pedazo del estado y
          junta las respuestas en un objeto, donde las claves que le pasaste son
          las claves del estado. Esto de acá:
        </p>

        <Codigo
          archivo="app/redux/conceptos/store.js"
          codigo={`export const reducerRaiz = combinarReducers({
  contador: reducirContador,
  tareas: reducirTareas,
  estadisticas: reducirEstadisticas,
});

export const store = crearStore(reducerRaiz);`}
        />

        <p>
          produce un estado con esas tres claves: andá al panel del demo de
          arriba y vas a ver <code>contador</code>, <code>tareas</code> y{" "}
          <code>estadisticas</code>, en ese orden. <code>reducirContador</code>{" "}
          solo ve un número y no sabe que existen las tareas.{" "}
          <code>reducirTareas</code> solo ve un arreglo. Cada uno se lee, se
          prueba y se cambia solo.
        </p>

        <Nota tipo="atencion" titulo="El último detalle, el de las dos líneas finales">
          <p>
            Si ningún área cambió, <code>combinarReducers</code> devuelve el{" "}
            <strong>objeto viejo</strong> en vez de uno nuevo con los mismos
            valores. Parece una microoptimización y es lo que hace que todo
            ande: sin eso, cada acción crearía un objeto raíz distinto,{" "}
            <code>useSyncExternalStore</code> vería un valor nuevo y React
            redibujaría la aplicación entera por cada tecla que apretás.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Para cerrar" id="cierre">
        <h3>Los tres principios</h3>

        <p>
          Todo lo que escribimos sale de tres reglas, que ahora que viste el
          código deberían sonar a descripción y no a eslogan.
        </p>

        <ul>
          <li>
            <strong>Una sola fuente de verdad.</strong> Todo el estado de la
            aplicación vive en un solo objeto, adentro de un solo store. No hay
            dos lugares que puedan contradecirse.
          </li>
          <li>
            <strong>El estado es de solo lectura.</strong> La única forma de
            cambiarlo es despachar una acción. No hay setters, ni asignaciones, y
            no existe nada parecido a <code>store.estado.contador = 5</code>.
          </li>
          <li>
            <strong>Los cambios se hacen con funciones puras.</strong> Quién
            decide el estado nuevo es un reducer: recibe lo viejo y la acción, y
            devuelve lo nuevo sin tocar nada más.
          </li>
        </ul>

        <h3>Y los middlewares, en una idea</h3>

        <p>
          Falta una pieza que vas a escuchar nombrar todo el tiempo. Un{" "}
          <strong>middleware</strong> es algo que se mete{" "}
          <em>entre el dispatch y el reducer</em>: la acción pasa primero por
          ahí, el middleware hace lo suyo, y recién después sigue camino.
        </p>

        <Codigo
          archivo="la idea"
          codigo={`dispatch(accion)  →  [ middleware ]  →  reducer  →  estado nuevo`}
        />

        <p>
          Se usa sobre todo para dos cosas. Una es el{" "}
          <strong>registro y las herramientas</strong>: anotar cada acción con el
          estado de antes y el de después. El panel de la derecha del demo es un
          middleware hecho a mano y sin querer; las Redux DevTools son uno de
          verdad. La otra es la <strong>asincronía</strong>: el reducer no puede
          pedir datos porque es puro, el middleware sí porque está afuera de él,
          así que pedirle algo al servidor y despachar{" "}
          <code>pedido/listo</code> cuando llega es trabajo suyo.
        </p>

        <p className="tenue">
          No lo vamos a implementar. Con saber dónde se enchufa alcanza, y la
          próxima lección ya te lo trae puesto.
        </p>

        <h3>El remate</h3>

        <p>
          Mirá para atrás un segundo. Para un contador y una lista de tareas
          escribimos seis constantes de texto, seis creadores de acciones, tres
          reducers con su <code>switch</code>, un <code>combinarReducers</code> y
          un <code>crearStore</code>. Funciona, se entiende y se testea, pero es{" "}
          <strong>mucho</strong> para lo que hace. Multiplicalo por treinta áreas
          de estado y ahí tenés la fama de verboso, que no era injusta: así se
          escribió Redux durante años.
        </p>

        <p>
          Por eso existe <strong>Redux Toolkit</strong>, que es la próxima
          lección y es como se escribe Redux hoy. Con <code>createSlice</code>{" "}
          declarás el estado inicial y los casos juntos, y te genera los{" "}
          <code>type</code>, los creadores y el reducer; con{" "}
          <code>configureStore</code> armás el store con las DevTools y los
          middlewares ya enchufados; y <code>useSelector</code> con{" "}
          <code>useDispatch</code> reemplazan a nuestro <code>useEstado</code>.
          Después viene <strong>Un carrito completo</strong>, con varias áreas,
          selectores derivados y datos que llegan de afuera.
        </p>

        <Nota tipo="ok" titulo="Lo único que hay que acordarse">
          <p>
            Redux Toolkit no agrega conceptos nuevos: esconde tipeo. Abajo de{" "}
            <code>createSlice</code> hay un reducer con un <code>switch</code>, y
            abajo de <code>configureStore</code> hay un objeto con{" "}
            <code>getState</code>, <code>dispatch</code> y <code>subscribe</code>.
            Los escribiste vos hoy.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos" id="desafios">
        <DesafioReducer />
        <DesafioMutacion />
      </Seccion>
    </Leccion>
  );
}

// Los dos ejercicios del final, separados para que la lección se lea de corrido.

function DesafioReducer() {
  return (
    <Desafio
      titulo="Escribí un reducer de filtros"
      pista={
        <div>
          <p style={{ marginTop: 0 }}>
            Arrancá por la firma y el valor por defecto del primer parámetro: ese
            es tu estado inicial. Después, un <code>case</code> por acción y el{" "}
            <code>default</code> al final devolviendo <code>estado</code> tal
            cual.
          </p>
          <p style={{ marginBottom: 0 }}>
            Para el tercer caso no hace falta copiar nada: podés devolver
            directamente un objeto con los valores iniciales.
          </p>
        </div>
      }
      solucion={
        <Codigo
          archivo="solución"
          codigo={`const FILTROS_INICIALES = { texto: "", soloPendientes: false };

function reducirFiltros(estado = FILTROS_INICIALES, accion) {
  switch (accion.type) {
    case "filtros/textoCambiado":
      // Copiamos lo que había y pisamos solo el campo que cambió.
      return { ...estado, texto: accion.payload };
    case "filtros/soloPendientesAlternado":
      return { ...estado, soloPendientes: !estado.soloPendientes };
    case "filtros/limpiados":
      return FILTROS_INICIALES;
    default:
      return estado;
  }
}

// Y el creador del primero, para no escribir el objeto en cada onChange:
const textoCambiado = (texto) => ({
  type: "filtros/textoCambiado",
  payload: texto,
});`}
        />
      }
    >
      <p>
        Una lista de tareas tiene dos filtros: un texto para buscar y un{" "}
        <em>checkbox</em> que muestra solo las pendientes. El estado del área
        arranca en <code>{"{ texto: \"\", soloPendientes: false }"}</code>.
      </p>
      <p style={{ marginBottom: 0 }}>
        Escribí <code>reducirFiltros</code> con sus tres casos:{" "}
        <code>filtros/textoCambiado</code> (que trae el texto nuevo en el{" "}
        <code>payload</code>), <code>filtros/soloPendientesAlternado</code> (que
        da vuelta el booleano y no necesita payload) y{" "}
        <code>filtros/limpiados</code> (que vuelve todo al inicio). No te olvides
        del <code>default</code>.
      </p>
    </Desafio>
  );
}

function DesafioMutacion() {
  return (
    <Desafio
      titulo="Encontrá la mutación escondida"
      pista={
        <p style={{ margin: 0 }}>
          El <code>...</code> copia un nivel y nada más. El objeto de arriba es
          nuevo, pero <code>nuevo.productos</code> y{" "}
          <code>estado.productos</code> son <strong>el mismo arreglo</strong>. Y
          acordate de cuáles métodos de arreglo devuelven uno nuevo y cuáles
          modifican el que tenían: <code>sort</code> está en el segundo grupo.
        </p>
      }
      solucion={
        <div>
          <Codigo
            archivo="solución"
            resaltar={[4, 7, 11]}
            codigo={`function reducirCarrito(estado = { productos: [], total: 0 }, accion) {
  switch (accion.type) {
    case "carrito/productoAgregado":
      return {
        ...estado,
        // Arreglo nuevo, sin tocar el de antes.
        productos: [...estado.productos, accion.payload],
        total: estado.total + accion.payload.precio,
      };
    case "carrito/ordenadoPorPrecio":
      // Copiamos primero y ordenamos la copia.
      return {
        ...estado,
        productos: [...estado.productos].sort((a, b) => a.precio - b.precio),
      };
    default:
      return estado;
  }
}`}
          />
          <p className="tenue" style={{ margin: 0 }}>
            Desde ES2023 existe <code>toSorted()</code>, que devuelve un arreglo
            ordenado nuevo y te ahorra la copia:{" "}
            <code>estado.productos.toSorted(...)</code>.
          </p>
        </div>
      }
    >
      <p>
        Este reducer parece correcto. Usa <code>...</code> en los dos casos y
        devuelve un objeto nuevo cada vez. Tiene{" "}
        <strong>dos mutaciones</strong>, y las dos son la misma idea.
      </p>
      <Codigo
        archivo="¿dónde está el problema?"
        codigo={`function reducirCarrito(estado = { productos: [], total: 0 }, accion) {
  switch (accion.type) {
    case "carrito/productoAgregado": {
      const nuevo = { ...estado };
      nuevo.productos.push(accion.payload);
      nuevo.total = nuevo.total + accion.payload.precio;
      return nuevo;
    }
    case "carrito/ordenadoPorPrecio":
      return {
        ...estado,
        productos: estado.productos.sort((a, b) => a.precio - b.precio),
      };
    default:
      return estado;
  }
}`}
      />
      <p style={{ marginBottom: 0 }}>
        Encontralas y escribí la versión correcta. Si dudás, repasá{" "}
        <Link href="/react/objetos-en-estado">objetos en estado</Link> y{" "}
        <Link href="/react/arreglos-en-estado">arreglos en estado</Link>.
      </p>
    </Desafio>
  );
}
