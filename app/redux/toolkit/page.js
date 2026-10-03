import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Comparacion, { Columna } from "@/components/Comparacion";
import Desafio from "@/components/Desafio";
import Proveedor from "./Proveedor";
import AplicacionDemo from "./AplicacionDemo";
import SelectoresDemo from "./SelectoresDemo";
import CotizacionDemo from "./CotizacionDemo";

export const metadata = { title: "Redux Toolkit" };

// ------------------------------------------------------------- la lección ---

export default function Pagina() {
  return (
    <Leccion
      slug="/redux/toolkit"
      titulo="Redux Toolkit"
      resumen="createSlice, configureStore, useSelector y useDispatch: lo mismo de antes con un cuarto del código."
    >
      <Seccion titulo="El mismo contador, antes y después">
        <p>
          En <Link href="/redux/conceptos">la lección anterior</Link> escribiste
          Redux a mano y terminaste con una queja justa: para un contador y una
          lista de tareas hicieron falta constantes de texto, creadores de
          acciones, reducers con <code>switch</code>, un{" "}
          <code>combinarReducers</code> y un <code>crearStore</code>. Funciona,
          pero es mucho. Hoy entran las librerías de verdad, y son dos:{" "}
          <code>@reduxjs/toolkit</code>, que es Redux más las herramientas para
          escribirlo sin sufrir, y <code>react-redux</code>, el puente con React
          que reemplaza a tu <code>useEstado</code>.
        </p>

        <Codigo
          archivo="la terminal"
          codigo={`npm install @reduxjs/toolkit react-redux`}
        />

        <p>
          Antes de explicar nada, mirá el mismo contador escrito de las dos
          formas. A la izquierda, el código real de{" "}
          <code>app/redux/conceptos/store.js</code>, con los nombres acortados
          para que las dos columnas digan exactamente lo mismo.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="A mano · 20 líneas de código">
            <Codigo
              archivo="como en /redux/conceptos"
              codigo={`// 1. Un texto por cada type, en constantes.
export const INCREMENTADO = "contador/incrementado";
export const DECREMENTADO = "contador/decrementado";
export const REINICIADO = "contador/reiniciado";

// 2. Un creador de acciones por cada uno.
export const incrementado = () => ({ type: INCREMENTADO });
export const decrementado = () => ({ type: DECREMENTADO });
export const reiniciado = () => ({ type: REINICIADO });

// 3. El reducer, con su switch y su default.
function reducirContador(estado = 0, accion) {
  switch (accion.type) {
    case INCREMENTADO:
      return estado + 1;
    case DECREMENTADO:
      return estado - 1;
    case REINICIADO:
      return 0;
    default:
      return estado;
  }
}

// 4. Y el armado del store.
const reducerRaiz = combinarReducers({ contador: reducirContador });
export const store = crearStore(reducerRaiz);`}
            />
            <p className="tenue" style={{ margin: 0 }}>
              Más las 61 líneas de <code>redux-casero.js</code>, que escribiste
              para que esas dos funciones existieran.
            </p>
          </Columna>

          <Columna tono="bien" titulo="Con Redux Toolkit · 15 líneas">
            <Codigo
              archivo="lo mismo, con createSlice"
              codigo={`import { createSlice, configureStore } from "@reduxjs/toolkit";

const contadorSlice = createSlice({
  name: "contador",
  initialState: 0,
  reducers: {
    incrementado: (estado) => estado + 1,
    decrementado: (estado) => estado - 1,
    reiniciado: () => 0,
  },
});

export const { incrementado, decrementado, reiniciado } =
  contadorSlice.actions;

export const store = configureStore({
  reducer: { contador: contadorSlice.reducer },
});`}
            />
            <p className="tenue" style={{ margin: 0 }}>
              Y ningún archivo extra.
            </p>
          </Columna>
        </Comparacion>

        <p>
          Ochenta y una líneas contra quince, y el resultado es{" "}
          <strong>mejor</strong>: la versión de la derecha trae además las
          DevTools enchufadas y dos chequeos que te avisan si metiste la pata.
          La cruz de la izquierda no quiere decir que esté mal escrita: quiere
          decir que <strong>eso ya no se escribe</strong>. Redux Toolkit es la
          forma <strong>oficial</strong> de usar Redux desde 2019: no es un
          atajo para principiantes ni una librería de terceros, la mantiene el
          mismo equipo, y la documentación oficial desaconseja armar un store a
          mano. En un proyecto viejo te vas a encontrar con la columna
          izquierda; todo lo que escribas vos va a ser la derecha.
        </p>

        <Nota tipo="ok" titulo="Nada de lo de ayer se tira">
          <p style={{ marginBottom: 0 }}>
            Redux Toolkit no agrega conceptos nuevos: sigue habiendo un store,
            acciones y reducers, y el flujo sigue yendo en una sola dirección.
            Lo único que cambia es cuánto tenés que tipear. Si algo te parece
            magia, acordate de que abajo hay un <code>switch</code> y un objeto
            con <code>getState</code> y <code>dispatch</code>: los escribiste vos.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="createSlice" id="crear-slice">
        <p>
          Un <strong>slice</strong> es una rebanada del estado: un área, con
          todo lo suyo junto. <code>createSlice</code> recibe tres cosas.
        </p>

        <ul>
          <li>
            <code>name</code>: cómo se llama el área, que es el prefijo de todos
            los <code>type</code> que genere.
          </li>
          <li>
            <code>initialState</code>: con qué arranca. Reemplaza al{" "}
            <code>estado = 0</code> del primer parámetro.
          </li>
          <li>
            <code>reducers</code>: cada clave es un hecho que puede pasar y cada
            valor es qué hacer. Reemplaza al <code>switch</code> entero.
          </li>
        </ul>

        <p>Y devuelve todo lo que antes había que escribir a mano:</p>

        <Codigo
          archivo="lo que genera createSlice"
          codigo={`contadorSlice.reducer              // (estado, accion) => estadoNuevo
contadorSlice.actions.incrementado // () => ({ type: "contador/incrementado" })
contadorSlice.actions.incrementado.type // "contador/incrementado"`}
        />

        <p>
          El <code>type</code> sale de juntar el <code>name</code> del slice con
          la clave del reducer: el mismo convenio <code>area/loQuePaso</code>{" "}
          que venías escribiendo a mano, pero sin forma de equivocarse
          tipeándolo.
        </p>

        <p>
          Y fijate en lo que <em>no</em> está: no hay{" "}
          <code>default: return estado</code>. <code>createSlice</code> pone el
          caso por defecto solo.
        </p>

        <h3>La sorpresa: acá adentro sí se muta</h3>

        <p>
          Esto es lo que más confunde al llegar a Redux Toolkit. Los dos
          reducers de abajo hacen <strong>lo mismo</strong>, y los dos son
          correctos:
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Reducer a mano">
            <Codigo
              codigo={`case TAREA_AGREGADA:
  // Arreglo nuevo. Nunca push.
  return [...estado, accion.payload];`}
            />
          </Columna>
          <Columna tono="bien" titulo="Adentro de un slice">
            <Codigo
              codigo={`tareaAgregada(estado, accion) {
  // ¿push? Sí. Y está bien.
  estado.push(accion.payload);
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          Después de dos lecciones insistiendo con que mutar es incorrecto, esto
          suena a contradicción. No lo es, y el motivo tiene nombre:{" "}
          <strong>Immer</strong>, una librería que Redux Toolkit trae adentro.
          Lo que llega como <code>estado</code> a un reducer de{" "}
          <code>createSlice</code> <strong>no es el estado</strong>: es un{" "}
          <em>borrador</em>, un envoltorio que anota todo lo que le hacés.
          Cuando el reducer termina, Immer lee esa lista de cambios y construye
          un objeto nuevo, inmutable, copiando solo las ramas que tocaste y
          reusando las que no. El estado viejo queda intacto, el nuevo es otro
          objeto, y la comparación con <code>===</code> sigue funcionando igual
          que siempre.
        </p>

        <Nota tipo="atencion" titulo="La regla de no mutar sigue valiendo">
          <p style={{ marginBottom: 0 }}>
            La excepción vale <strong>solo</strong> adentro de un reducer de
            Redux Toolkit. En{" "}
            <Link href="/react/objetos-en-estado">objetos en estado</Link>,{" "}
            <Link href="/react/arreglos-en-estado">arreglos en estado</Link>, en
            cualquier <code>useState</code> y en cualquier función fuera de un
            slice, mutar sigue siendo un error silencioso que rompe el
            redibujado. La regla corta: si estás adentro de{" "}
            <code>createSlice</code>, es un borrador; en cualquier otro lado es
            el estado de verdad y no se toca.
          </p>
        </Nota>

        <h3>Mutar o devolver, pero no las dos cosas</h3>

        <p>
          Un reducer de slice tiene dos formas válidas: modificar el borrador y
          no devolver nada, o ignorarlo y devolver un valor nuevo. Mezclarlas no
          se puede: si tocás el borrador <em>y</em> devolvés algo, Immer no sabe
          con cuál quedarse y tira un error.
        </p>

        <Codigo
          archivo="las dos formas, y la que rompe"
          resaltar={[2, 7, 12, 13]}
          codigo={`// Forma 1: tocar el borrador y no devolver nada.
incrementado(estado) {
  estado.valor += estado.paso;
},

// Forma 2: ignorarlo y devolver el estado nuevo. También vale.
reiniciado() {
  return { valor: 0, paso: 1 };
},

// Las dos juntas: error de Immer apenas la despachás.
reiniciado(estado) {
  estado.valor = 0;
  return { valor: 0, paso: 1 };
},`}
        />

        <p>
          Y una variante del mismo error que no avisa nada: escribir{" "}
          <code>estado = []</code> no vacía nada, solo apunta la variable local
          a otro lado. Para reemplazar el estado entero, <code>return []</code>.
        </p>

        <h3>prepare, cuando el payload hay que cocinarlo</h3>

        <p>
          Un reducer es puro, así que no puede generar un id ni leer la fecha.
          En la lección anterior lo resolviste poniendo el{" "}
          <code>siguienteId++</code> en el creador de acciones; acá el creador
          lo genera la librería, así que hay un lugar para meterse en el medio:{" "}
          <code>prepare</code>.
        </p>

        <Codigo
          archivo="app/redux/toolkit/almacen.js"
          resaltar={[8, 9, 10]}
          codigo={`// Cuando el payload necesita prepararse —un id, una fecha— se escribe el
// reducer y el prepare por separado. prepare corre ANTES, afuera del
// reducer, así que puede usar nanoid() sin ensuciar nada.
tareaAgregada: {
  reducer(estado, accion) {
    estado.push(accion.payload);
  },
  prepare(texto) {
    return { payload: { id: nanoid(), texto, hecha: false } };
  },
},`}
        />

        <p>
          En vez de una función, la clave recibe un objeto con{" "}
          <code>reducer</code> y <code>prepare</code>. Quien despacha escribe{" "}
          <code>tareaAgregada(&quot;Comprar pan&quot;)</code> y el id aparece
          solo. <code>nanoid</code> viene incluido en Redux Toolkit.
        </p>
      </Seccion>

      <Seccion titulo="configureStore" id="configurar-store">
        <p>
          La segunda función que vas a usar siempre. Recibe un objeto con la
          clave <code>reducer</code>, y si ahí le pasás otro objeto, llama a{" "}
          <code>combineReducers</code> por su cuenta.
        </p>

        <Codigo
          archivo="app/redux/toolkit/almacen.js"
          codigo={`export const almacen = configureStore({
  reducer: {
    contador: contadorSlice.reducer,
    tareas: tareasSlice.reducer,
    cotizacion: cotizacionSlice.reducer,
    registro: registroSlice.reducer,
  },
});`}
        />

        <p>
          Las claves de ese objeto son las claves del estado, igual que en tu{" "}
          <code>combinarReducers</code>. Lo que cambia es lo que viene de regalo:
        </p>

        <ul>
          <li>
            <strong>Las Redux DevTools</strong>, conectadas solas en desarrollo.
          </li>
          <li>
            <strong>El middleware por defecto</strong>, que incluye{" "}
            <code>redux-thunk</code> —lo que hace posible la asincronía de más
            abajo— y dos chequeos que corren solo en desarrollo.
          </li>
          <li>
            <strong>Esos dos chequeos.</strong> El de mutaciones accidentales te
            dice el camino exacto si mutaste el estado fuera de un reducer de
            Immer, en vez de dejarte una pantalla que no se actualiza. El de
            serializabilidad te avisa si guardaste algo que no se convierte a
            JSON —una fecha, una promesa, una función—, que es lo que haría
            imposible el viaje en el tiempo de las DevTools.
          </li>
        </ul>

        <Nota tipo="info" titulo="Si ves un aviso largo en la consola">
          <p style={{ marginBottom: 0 }}>
            Un <code>A non-serializable value was detected in the state</code>{" "}
            es ese chequeo haciendo su trabajo: guardá un <code>string</code> con
            la fecha en vez del objeto <code>Date</code> y desaparece. Y para
            agregar middlewares propios sin perder los que vienen:{" "}
            <code>middleware: (porDefecto) =&gt; porDefecto().concat(elMio)</code>
            .
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Conectarlo con React" id="conectar">
        <p>
          Hasta acá no apareció React: el store es JavaScript suelto. El puente
          lo pone <code>react-redux</code>, y son tres piezas.{" "}
          <code>{"<Provider store={almacen}>"}</code> envuelve al árbol y pone el
          store a disposición de todo lo que está adentro.{" "}
          <code>useSelector(fn)</code> lee: le pasás una función que recibe el
          estado entero y devuelve el pedacito que te interesa.{" "}
          <code>useDispatch()</code> devuelve la función <code>dispatch</code>{" "}
          del store.
        </p>

        <Codigo
          archivo="un componente cualquiera"
          codigo={`function Contador() {
  const valor = useSelector((estado) => estado.contador.valor);
  const despachar = useDispatch();

  return (
    <button type="button" onClick={() => despachar(incrementado())}>
      {valor}
    </button>
  );
}`}
        />

        <p>
          <code>useSelector</code> reemplaza a tu <code>useEstado(store)</code>{" "}
          y le agrega lo importante: no trae el estado entero, trae{" "}
          <strong>solo lo que pediste</strong>, y redibuja el componente
          únicamente cuando eso cambió.
        </p>

        <h3>Dónde va el Provider en el App Router</h3>

        <p>
          Acá hay un detalle que los tutoriales suelen saltear. El{" "}
          <code>Provider</code> usa contexto de React, y el contexto solo existe
          del lado del cliente. En este proyecto el layout raíz es un{" "}
          <strong>componente de servidor</strong> —todo lo que viste en{" "}
          <Link href="/sobre-next">cómo funciona este proyecto</Link>— así que
          envolver la aplicación entera ahí lo convertiría en componente de
          cliente, que es justo lo que no querés. La solución es un archivo
          propio, chiquito, con <code>&quot;use client&quot;</code>:
        </p>

        <Codigo
          archivo="app/redux/toolkit/Proveedor.js"
          resaltar={[1, 7]}
          codigo={`"use client";

import { Provider } from "react-redux";
import { almacen } from "./almacen";

export default function Proveedor({ children }) {
  return <Provider store={almacen}>{children}</Provider>;
}`}
        />

        <p>
          Y la página, que sigue siendo de servidor, lo usa envolviendo solo lo
          que lo necesita:
        </p>

        <Codigo
          archivo="app/redux/toolkit/page.js"
          codigo={`<Demo titulo="Demo · la aplicación entera">
  <Proveedor>
    <AplicacionDemo />
  </Proveedor>
</Demo>`}
        />

        <p>
          Funciona porque <code>AplicacionDemo</code> también es de cliente. En
          una aplicación real el <code>Proveedor</code> va una sola vez, en el
          layout más alto que lo necesite, envolviendo a <code>children</code>.
        </p>

        <Nota tipo="atencion" titulo="El store de este sitio está mal hecho a propósito">
          <p>
            <code>almacen.js</code> crea el store al cargar el módulo, con un{" "}
            <code>export const almacen = configureStore(...)</code>. En el
            navegador eso está perfecto: hay un solo usuario y un solo store. En
            el servidor <strong>no</strong>: el módulo se carga una vez por
            proceso, así que ese mismo store lo comparten todos los pedidos que
            atienda. Si ahí metieras datos del usuario, el siguiente visitante
            podría ver los del anterior.
          </p>
          <p style={{ marginBottom: 0 }}>
            La forma correcta es una <em>fábrica</em>:{" "}
            <code>crearAlmacen()</code> devuelve un store nuevo, y el proveedor
            la llama una vez por montaje con{" "}
            <code>const [almacen] = useState(crearAlmacen)</code>. Acá no hace
            falta: el estado arranca siempre igual y nada depende de quién esté
            mirando.
          </p>
        </Nota>

        <h3>Todo junto, funcionando</h3>

        <p>
          Esta es la misma aplicación de la lección anterior —un contador y una
          lista de tareas— sobre el store de Redux Toolkit, con el estado y el
          registro de acciones despachadas a la derecha.
        </p>

        <Demo titulo="Demo · la aplicación entera, con el estado a la vista">
          <Proveedor>
            <AplicacionDemo />
          </Proveedor>
        </Demo>

        <ul>
          <li>
            Los <code>type</code> del registro dicen{" "}
            <code>contador/incrementado</code> y{" "}
            <code>tareas/tareaAgregada</code>. Nadie escribió esos textos.
          </li>
          <li>
            Agregá una tarea y mirá el <code>payload</code>: trae un{" "}
            <code>id</code> que no pasaste vos. Eso es <code>prepare</code>.
          </li>
          <li>
            Andá a otra lección y volvé: el contador sigue donde lo dejaste. El
            store vive afuera de React y nunca se desmontó.
          </li>
        </ul>
      </Seccion>

      <Seccion titulo="useSelector y los renderizados" id="selectores">
        <p>
          <code>useSelector</code> parece inofensivo y es donde se pierde el
          rendimiento. Después de <strong>cada</strong> acción despachada en
          toda la aplicación, react-redux corre tu función selectora con el
          estado nuevo y compara el resultado con el anterior usando{" "}
          <code>===</code>. Si da igual, no hace nada. Si da distinto, vuelve a
          dibujar tu componente.
        </p>

        <p>De ahí salen las dos reglas, que son la misma vista de dos lados:</p>

        <ul>
          <li>
            <strong>Seleccioná lo más chico que puedas.</strong> Un número o un
            texto se compara por valor y nunca da falsos positivos.
          </li>
          <li>
            <strong>Nunca devuelvas un objeto o un arreglo nuevo.</strong> Dos
            objetos con los mismos datos nunca son <code>===</code>, así que el
            resultado siempre va a parecer distinto y tu componente se va a
            redibujar en cada acción, venga de donde venga.
          </li>
        </ul>

        <p>
          Dos <code>useSelector</code> finos no son el doble de caro que uno
          gordo. Abajo está la diferencia medida: los tres recuadros leen del
          mismo store y cada uno cuenta cuántas veces se dibujó. Arrancan en
          cero y el primer salto es de dos, porque en desarrollo React monta
          todo dos veces para detectar efectos mal escritos; lo que importa es
          cuál se mueve y cuál no.
        </p>

        <Demo titulo="Demo · tres selectores, tres contadores de renderizados">
          <Proveedor>
            <SelectoresDemo />
          </Proveedor>
        </Demo>

        <ul>
          <li>
            <strong>Cambiar el contador</strong> mueve a los dos primeros, y{" "}
            <strong>agregar una tarea</strong> mueve al segundo y al tercero. Es
            lo esperable.
          </li>
          <li>
            <strong>Despachar paso = 1</strong> no cambia absolutamente nada del
            estado, y el del medio igual se redibuja. Ese es el problema entero
            en un botón.
          </li>
        </ul>

        <Codigo
          archivo="app/redux/toolkit/SelectoresDemo.js"
          resaltar={[3, 7]}
          codigo={`// 1. Selector fino: devuelve un número. Solo se vuelve a dibujar cuando ese
//    número cambia, porque 3 === 3.
const valor = useSelector(elegirValor);

// 2. Selector que arma un objeto nuevo en cada llamada: dos objetos distintos
//    con los mismos datos NUNCA son ===, así que se vuelve a dibujar siempre.
const resumen = useSelector((estado) => ({
  valor: estado.contador.valor,
  cuantas: estado.tareas.length,
}));`}
        />

        <Nota tipo="info" titulo="react-redux te avisa">
          <p style={{ marginBottom: 0 }}>
            Abrí la consola del navegador: vas a encontrar un{" "}
            <code>
              Selector ... returned a different result when called with the same
              parameters
            </code>
            . Es react-redux corriendo tu selector dos veces con el mismo
            estado para ver si devuelve lo mismo. Sale solo en desarrollo y
            apunta siempre al mismo pecado.
          </p>
        </Nota>

        <h3>createSelector, para lo derivado y caro</h3>

        <p>
          A veces el valor que querés hay que calcularlo: las tareas pendientes,
          el total del carrito. Si lo calculás adentro del selector caés en el
          caso malo de recién, porque <code>filter</code> y <code>map</code>{" "}
          devuelven un arreglo nuevo siempre. <code>createSelector</code> arma
          un selector <strong>memorizado</strong>: le decís de qué depende y
          cómo calcularlo, y mientras las entradas sean las mismas devuelve{" "}
          <em>el mismo resultado</em>.
        </p>

        <Codigo
          archivo="app/redux/toolkit/almacen.js"
          codigo={`export const elegirPendientes = createSelector(
  // 1. De qué depende.
  [(estado) => estado.tareas],
  // 2. Qué hacer con eso. Solo corre si lo de arriba cambió de verdad.
  (tareas) => tareas.filter((tarea) => !tarea.hecha),
);`}
        />

        <p>
          Ese es el tercer recuadro del demo: no se mueve cuando tocás el
          contador, porque <code>estado.tareas</code> siguió siendo el mismo
          arreglo. Ya viene adentro de Redux Toolkit. Para un{" "}
          <code>estado.contador.valor</code> es innecesario: guardalo para lo
          que de verdad calcula algo.
        </p>
      </Seccion>

      <Seccion titulo="Asincronía: createAsyncThunk" id="thunk">
        <p>
          Un reducer es puro y no puede pedir datos. Lo que falta es dónde va lo
          que tarda, y la respuesta la adelantó el final de la lección anterior:
          en un <strong>middleware</strong>, entre el <code>dispatch</code> y el
          reducer. <code>configureStore</code> ya trae puesto el que hace falta.
        </p>

        <p>
          <code>createAsyncThunk</code> recibe un prefijo y una función{" "}
          <code>async</code>, y devuelve un creador de acciones especial. Cuando
          lo despachás no despacha una acción: despacha <strong>tres</strong>,
          en orden.
        </p>

        <Codigo
          archivo="los tres estados"
          codigo={`cotizacion/pedida/pending     ← apenas arranca
cotizacion/pedida/fulfilled   ← si la promesa salió bien
cotizacion/pedida/rejected    ← si la promesa falló`}
        />

        <p>
          Los tres estados de cualquier pedido —cargando, listo, falló— los
          tenés sin escribir un solo <code>try</code>.
        </p>

        <Codigo
          archivo="app/redux/toolkit/almacen.js"
          resaltar={[7]}
          codigo={`// createAsyncThunk recibe un prefijo y una función async. Despacha solo tres
// acciones por cada llamada: pedida/pending, pedida/fulfilled y
// pedida/rejected. El reducer sigue siendo puro; lo sucio pasa acá.
export const cotizacionPedida = createAsyncThunk(
  "cotizacion/pedida",
  async (moneda) => {
    const respuesta = await pedirCotizacion(moneda);
    return respuesta; // esto termina siendo el payload de fulfilled
  },
);`}
        />

        <p>
          Esas tres acciones no pertenecen a ningún slice: las creó el thunk.
          Por eso no van en <code>reducers</code> sino en{" "}
          <code>extraReducers</code>, que es exactamente para reaccionar a
          acciones que el slice <strong>no declaró</strong>.
        </p>

        <Codigo
          archivo="app/redux/toolkit/almacen.js"
          resaltar={[7, 14, 18]}
          codigo={`const cotizacionSlice = createSlice({
  name: "cotizacion",
  initialState: { situacion: "inicial", moneda: null, valor: null, error: null },
  reducers: {},
  extraReducers: (constructor) => {
    constructor
      .addCase(cotizacionPedida.pending, (estado, accion) => {
        estado.situacion = "cargando";
        estado.moneda = accion.meta.arg; // el argumento con el que se llamó
        estado.valor = null;
        estado.error = null;
      })
      .addCase(cotizacionPedida.fulfilled, (estado, accion) => {
        estado.situacion = "listo";
        estado.valor = accion.payload.valor;
      })
      .addCase(cotizacionPedida.rejected, (estado, accion) => {
        estado.situacion = "error";
        // El error NO viene en payload: viene en accion.error.
        estado.error = accion.error.message;
      });
  },
});`}
        />

        <p>
          En el demo la petición es falsa: un <code>setTimeout</code> de 1,2
          segundos con una tabla fija adentro, sin salir a internet. El tercer
          botón pide una moneda que el servidor inventado rechaza.
        </p>

        <Demo titulo="Demo · un pedido que tarda, con sus tres estados">
          <Proveedor>
            <CotizacionDemo />
          </Proveedor>
        </Demo>

        <p>
          Mirá la lista de la derecha: por cada clic entran{" "}
          <strong>dos</strong> acciones, el <code>pending</code> y el{" "}
          <code>fulfilled</code> (o el <code>rejected</code>). El componente no
          tiene ningún <code>useState</code> de carga ni de error: todo eso es
          estado del store, y lo puede leer cualquier otro componente sin que
          nadie se lo pase por props. Compará con lo que costaba lo mismo con{" "}
          <Link href="/react/efectos">useEffect</Link> y{" "}
          <Link href="/js/dom-y-asincronia">promesas a mano</Link>.
        </p>
      </Seccion>

      <Seccion titulo="Para cerrar" id="cierre">
        <h3>Instalá las DevTools. En serio.</h3>

        <p>
          Esto es lo único de la lección que te pedimos hacer fuera de la
          página. Buscá <strong>Redux DevTools</strong> en la tienda de
          extensiones de tu navegador, instalala, recargá esta lección y abrí la
          pestaña Redux. <code>configureStore</code> ya la dejó conectada, así
          que no hay nada que configurar. Vas a ver:
        </p>

        <ul>
          <li>
            <strong>Cada acción despachada</strong>, en orden, con su{" "}
            <code>type</code> y su <code>payload</code>, y el estado antes y
            después de cada una, con el <em>diff</em>: qué campo cambió y de qué
            valor a qué valor.
          </li>
          <li>
            <strong>Viaje en el tiempo.</strong> Hacés clic en una acción de
            hace diez pasos y la aplicación vuelve a como estaba. Después seguís
            adelante de nuevo.
          </li>
        </ul>

        <p>
          Ese último punto es el mejor argumento a favor de Redux, y solo es
          posible por lo que viniste respetando: si el estado es inmutable, cada
          paso quedó guardado entero; si los reducers son puros, volver a
          aplicarlos da siempre lo mismo. Un bug ajeno deja de ser &quot;a mí no
          me pasa&quot; y pasa a ser una lista de acciones reproducible.
        </p>

        <Nota tipo="info" titulo="Si lo que necesitás son datos del servidor">
          <p style={{ marginBottom: 0 }}>
            <code>createAsyncThunk</code> está bien para pedidos sueltos. Pero
            si lo que vas a hacer es traer datos de una API, guardarlos,
            refrescarlos y no pedirlos dos veces, eso ya está resuelto:{" "}
            <strong>RTK Query</strong> viene adentro de{" "}
            <code>@reduxjs/toolkit</code> y hace el caché, los estados de
            carga y la invalidación por vos. Antes de escribir tu décimo thunk a
            mano, miralo.
          </p>
        </Nota>

        <p>
          Lo que falta es verlo a escala: la próxima lección,{" "}
          <strong>Un carrito completo</strong>, arma una aplicación con varios
          slices, selectores derivados de verdad y datos que llegan de afuera.
        </p>
      </Seccion>

      <Seccion titulo="Desafíos" id="desafios">
        <DesafioSlice />
        <DesafioErrores />
      </Seccion>
    </Leccion>
  );
}

// Los dos ejercicios del final, aparte para que la lección se lea de corrido.

function DesafioSlice() {
  return (
    <Desafio
      titulo="Pasá este reducer a createSlice"
      pista={
        <p style={{ margin: 0 }}>
          El valor por defecto del primer parámetro se va a{" "}
          <code>initialState</code>. Cada <code>case</code> se vuelve una clave
          de <code>reducers</code>, y el texto del <code>type</code> desaparece:
          el nombre de la clave lo reemplaza. El <code>default</code> no se
          escribe. Para el caso que vuelve todo al inicio, acordate de que un
          reducer de slice puede <strong>devolver</strong> en vez de mutar.
        </p>
      }
      solucion={
        <div>
          <Codigo
            archivo="solución"
            resaltar={[8, 11, 15]}
            codigo={`import { createSlice } from "@reduxjs/toolkit";

const FILTROS_INICIALES = { texto: "", soloPendientes: false };

const filtrosSlice = createSlice({
  name: "filtros",
  initialState: FILTROS_INICIALES,
  reducers: {
    // Mutamos el borrador: no hace falta copiar nada.
    textoCambiado(estado, accion) {
      estado.texto = accion.payload;
    },
    soloPendientesAlternado(estado) {
      estado.soloPendientes = !estado.soloPendientes;
    },
    // Acá devolvemos, porque reemplazamos el estado entero.
    limpiados: () => FILTROS_INICIALES,
  },
});

export const { textoCambiado, soloPendientesAlternado, limpiados } =
  filtrosSlice.actions;
export default filtrosSlice.reducer;`}
          />
          <p className="tenue" style={{ margin: 0 }}>
            Los <code>type</code> que genera son los mismos que habías escrito a
            mano.
          </p>
        </div>
      }
    >
      <p>
        El reducer de filtros del desafío de{" "}
        <Link href="/redux/conceptos">la lección anterior</Link>, tal cual quedó.
      </p>
      <Codigo
        archivo="lo que hay que convertir"
        codigo={`const FILTROS_INICIALES = { texto: "", soloPendientes: false };

function reducirFiltros(estado = FILTROS_INICIALES, accion) {
  switch (accion.type) {
    case "filtros/textoCambiado":
      return { ...estado, texto: accion.payload };
    case "filtros/soloPendientesAlternado":
      return { ...estado, soloPendientes: !estado.soloPendientes };
    case "filtros/limpiados":
      return FILTROS_INICIALES;
    default:
      return estado;
  }
}`}
      />
      <p style={{ marginBottom: 0 }}>
        Escribilo con <code>createSlice</code> y exportá los tres creadores de
        acciones y el reducer. Tiene que quedar menos de la mitad de largo.
      </p>
    </Desafio>
  );
}

function DesafioErrores() {
  return (
    <Desafio
      titulo="Dos errores en un slice"
      pista={
        <p style={{ margin: 0 }}>
          El primero lo tira Immer apenas lo ejecutás, con un mensaje que habla
          de un <em>producer</em> que devolvió un valor nuevo <em>y además</em>{" "}
          modificó su borrador. El segundo no avisa nada y rompe la pureza del
          reducer: hay algo ahí adentro que devuelve un valor distinto cada vez
          que lo llamás.
        </p>
      }
      solucion={
        <div>
          <Codigo
            archivo="solución"
            resaltar={[6, 11]}
            codigo={`const carritoSlice = createSlice({
  name: "carrito",
  initialState: { productos: [], total: 0 },
  reducers: {
    productoAgregado: {
      // 1. Solo mutamos el borrador. No devolvemos nada.
      reducer(estado, accion) {
        estado.productos.push(accion.payload);
        estado.total += accion.payload.precio;
      },
      // 2. El id se arma en prepare, que corre afuera del reducer.
      prepare(nombre, precio) {
        return { payload: { id: nanoid(), nombre, precio } };
      },
    },
  },
});`}
          />
          <p className="tenue" style={{ margin: 0 }}>
            El <code>total</code> se recalcula adentro del mismo reducer, que es
            donde corresponde: una acción, un estado nuevo coherente.
          </p>
        </div>
      }
    >
      <p>
        Este slice compila y parece razonable. Tiene{" "}
        <strong>dos problemas</strong>: uno revienta con un error en la consola
        y el otro es silencioso, y rompe una regla que venís respetando desde la
        lección anterior.
      </p>
      <Codigo
        archivo="¿dónde están?"
        codigo={`let siguienteId = 1;

const carritoSlice = createSlice({
  name: "carrito",
  initialState: { productos: [], total: 0 },
  reducers: {
    productoAgregado(estado, accion) {
      const producto = { id: siguienteId++, ...accion.payload };
      estado.productos.push(producto);
      return { ...estado, total: estado.total + producto.precio };
    },
  },
});`}
      />
      <p style={{ marginBottom: 0 }}>
        Encontralos y escribí la versión correcta.
      </p>
    </Desafio>
  );
}
