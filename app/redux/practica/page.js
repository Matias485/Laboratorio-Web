import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Comparacion, { Columna } from "@/components/Comparacion";
import Desafio from "@/components/Desafio";
import Proveedor from "./Proveedor";
import CatalogoDemo from "./CatalogoDemo";
import Catalogo from "./Catalogo";
import LineasDelCarrito from "./LineasDelCarrito";
import Cupon from "./Cupon";
import Totales from "./Totales";
import TiendaDemo from "./TiendaDemo";

export const metadata = { title: "Un carrito completo" };

// Dos columnas que se apilan solas. Lo usamos para los demos que muestran dos
// componentes al mismo tiempo sin que haga falta un archivo nuevo.
const DOS_COLUMNAS = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 14,
  alignItems: "start",
};

const PANEL = {
  border: "1px solid var(--borde)",
  borderRadius: 10,
  background: "var(--superficie-2)",
  padding: "10px 12px",
};

const TITULO_PANEL = {
  margin: "0 0 8px",
  fontSize: "0.7rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--texto-suave)",
};

// --------------------------------------------------------------- la lección ---

export default function Pagina() {
  return (
    <Leccion
      slug="/redux/practica"
      titulo="Un carrito completo"
      resumen="Varios slices, selectores derivados, datos que llegan de afuera y las DevTools."
    >
      <Seccion titulo="El plan: qué vamos a construir" id="plan">
        <p>
          Esta no es una lección más de Redux: es un <strong>taller</strong>. Ya
          tenés las piezas —
          <Link href="/redux/conceptos">acciones, reducers y store</Link> y{" "}
          <Link href="/redux/toolkit">Redux Toolkit</Link>— y lo que falta es
          armar algo entero con ellas, que es donde aparecen las decisiones que
          ninguna documentación toma por vos.
        </p>

        <p>
          Vamos a construir la tienda de la <strong>librería del campus</strong>
          : libros de la carrera, apuntes e insumos. Al final de la página vas a
          poder, acá mismo, sin salir de la lección:
        </p>

        <ul>
          <li>Pedir el catálogo y ver los tres estados de esa espera.</li>
          <li>Agregar productos, subir y bajar cantidades, quitar y vaciar.</li>
          <li>Aplicar un cupón y ver el total cambiar.</li>
          <li>
            Mirar, al lado, el estado completo del store y la lista de acciones
            que fuiste despachando, en orden.
          </li>
        </ul>

        <p>
          Lo vamos a hacer por partes. Cada sección construye un pedazo real y
          lo deja funcionando antes de seguir. Estos son los archivos que vamos
          a escribir:
        </p>

        <Codigo
          archivo="app/redux/practica/"
          codigo={`catalogoApi.js        el servidor falso: la tabla de productos y un setTimeout
catalogoSlice.js      los productos y en qué situación está el pedido
carritoSlice.js       agregar, quitar, cambiar cantidad, vaciar, cupón
registroSlice.js      escucha todas las acciones (solo para los demos)
selectores.js         subtotal, descuento, total: TODO lo que se calcula
almacen.js            configureStore: junta los tres reducers

Proveedor.js          "use client" + <Provider store={almacen}>
Catalogo.js           la grilla de productos
LineasDelCarrito.js   una línea por producto, con cantidad y quitar
Cupon.js              el campo del cupón
Totales.js            los tres números de abajo
piezas.js             estilos en línea y el formateador de precios

CatalogoDemo.js       el demo de la sección 2
TiendaDemo.js         el demo final, con todo junto
page.js               esta lección`}
        />

        <p>
          Son catorce archivos chicos en vez de tres grandes, y eso no es
          casualidad: a la última sección llegamos con una lista de buenas
          prácticas, y la primera es exactamente esta.
        </p>

        <Nota tipo="atencion" titulo="Los demos de esta página comparten un store">
          <p style={{ marginBottom: 0 }}>
            Hay <strong>un solo</strong> <code>almacen</code> para toda la
            lección. Lo que agregues al carrito en la sección 4 va a aparecer en
            los totales de la sección 5 y en el demo final. Es a propósito: así
            se ve que los componentes no se pasan datos entre ellos, sino que
            todos leen del mismo lugar. Si en algún demo falta el catálogo, vas
            a ver un botón para pedirlo.
          </p>
        </Nota>
      </Seccion>

      {/* =============================================== 1. modelar estado === */}

      <Seccion titulo="1. Modelar el estado" id="modelar">
        <p>
          Antes de escribir un reducer hay que contestar una pregunta:{" "}
          <strong>qué datos hacen falta y con qué forma se guardan</strong>. Es
          la decisión más cara de deshacer, porque todos los reducers y todos
          los selectores van a estar escritos contra esa forma.
        </p>

        <p>La tienda tiene tres cosas, y vienen de lugares distintos:</p>

        <ul>
          <li>
            <strong>El catálogo.</strong> Viene de afuera. Nosotros no lo
            inventamos: lo pedimos y lo guardamos tal cual llegó.
          </li>
          <li>
            <strong>El carrito.</strong> Lo arma la persona, clic a clic. Es el
            único estado que de verdad nos pertenece.
          </li>
          <li>
            <strong>El cupón.</strong> Un texto que alguien escribió. Un dato
            suelto.
          </li>
        </ul>

        <h3>La decisión: arreglo contra objeto indexado</h3>

        <p>
          El carrito es una lista de líneas. Hay dos formas de guardar una
          lista, y las dos son defendibles. Mirálas antes de que te diga cuál
          elegimos.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Un arreglo de líneas">
            <Codigo
              archivo="la forma que NO elegimos"
              codigo={`carrito: [
  { id: "tanenbaum", cantidad: 2 },
  { id: "pendrive-64", cantidad: 1 },
]

// Cambiar una cantidad: hay que buscarla primero.
const linea = estado.find((l) => l.id === id);
if (linea) linea.cantidad = cantidad;

// Quitar: recorrer todo el arreglo.
return estado.filter((l) => l.id !== id);`}
            />
            <p className="tenue" style={{ margin: 0 }}>
              <strong>A favor:</strong> el orden está guardado solo, y
              dibujarlo es un <code>map</code> directo.
              <br />
              <strong>En contra:</strong> toda operación es por id, y buscar por
              id en un arreglo es recorrerlo entero.
            </p>
          </Columna>

          <Columna tono="bien" titulo="Un objeto indexado, más el orden">
            <Codigo
              archivo="la forma que elegimos"
              codigo={`carrito: {
  porId: {
    "tanenbaum": { id: "tanenbaum", cantidad: 2 },
    "pendrive-64": { id: "pendrive-64", cantidad: 1 },
  },
  orden: ["tanenbaum", "pendrive-64"],
}

// Cambiar una cantidad: una sola línea, sin buscar.
estado.porId[id].cantidad = cantidad;

// Quitar: borrar la clave y sacarla del orden.
delete estado.porId[id];
estado.orden = estado.orden.filter((otro) => otro !== id);`}
            />
            <p className="tenue" style={{ margin: 0 }}>
              <strong>A favor:</strong> llegar a una línea por su id es
              inmediato, y es lo que hacen las cinco acciones del carrito.
              <br />
              <strong>En contra:</strong> un objeto no garantiza orden, así que
              hay que guardarlo aparte y mantener las dos cosas sincronizadas.
            </p>
          </Columna>
        </Comparacion>

        <p>
          La cruz de la izquierda no quiere decir que esté mal: quiere decir que
          no la elegimos. Y el motivo es concreto:{" "}
          <strong>
            las cinco acciones del carrito empiezan con un id en la mano
          </strong>
          . Agregar, cambiar la cantidad, sumar, restar y quitar, todas. Si el
          acceso por id es lo que hacés siempre, conviene que sea lo barato. El
          orden lo necesitamos una sola vez, para dibujar, y para eso alcanza
          con un arreglo de strings.
        </p>

        <Nota tipo="info" titulo="Esto tiene nombre y viene hecho">
          <p style={{ marginBottom: 0 }}>
            La forma <code>{"{ porId, orden }"}</code> se llama{" "}
            <strong>estado normalizado</strong> y es tan común que Redux Toolkit
            la trae resuelta: <code>createEntityAdapter</code> te genera{" "}
            <code>{"{ ids, entities }"}</code> con los reducers de agregar,
            actualizar y borrar ya escritos. Acá la escribimos a mano por la
            misma razón por la que en{" "}
            <Link href="/redux/conceptos">la lección de conceptos</Link>{" "}
            escribiste el store a mano: para que cuando la uses sepas qué está
            haciendo.
          </p>
        </Nota>

        <h3>Qué guarda cada línea del carrito</h3>

        <p>
          Segunda decisión, y es la que más bugs evita. Una línea del carrito
          guarda <strong>solo</strong> <code>{"{ id, cantidad }"}</code>. No
          guarda el nombre, ni el precio, ni el stock. Esos datos ya están en el
          catálogo.
        </p>

        <p>
          Si los copiás, tenés el mismo dato en dos lugares. El día que la
          librería cambie un precio, el carrito va a seguir mostrando el viejo,
          y vas a perder una tarde buscando por qué. Un dato, un dueño. Cuando
          hagan falta juntos, se juntan al leer, que es lo que hace el selector
          de la sección 5.
        </p>

        <h3>Y lo que NO va en el store</h3>

        <p>
          Tan importante como qué entra es qué queda afuera. En esta aplicación
          quedan afuera tres cosas:
        </p>

        <ul>
          <li>
            <strong>El subtotal, el descuento y el total.</strong> Se calculan a
            partir del carrito y del catálogo. Si los guardaras, cada acción
            tendría que acordarse de actualizarlos, y el día que te olvides de
            una el total queda mintiendo. Es el tema entero de la sección 5.
          </li>
          <li>
            <strong>Lo que la persona está tecleando</strong> en el campo del
            cupón. Eso es <code>useState</code> en el componente del cupón.
            Despachar una acción por cada tecla llenaría las DevTools de ruido y
            volvería a dibujar todo lo conectado con cada letra.
          </li>
          <li>
            <strong>Si un panel está abierto o cerrado.</strong> No le importa a
            nadie más que al panel.
          </li>
        </ul>

        <p>
          La regla, en una línea: <strong>al store va lo que comparten varios
          componentes y tiene que sobrevivir a que uno de ellos desaparezca</strong>
          . Lo demás es estado local, y el estado local es más barato. Si querés
          repasar por qué, está en{" "}
          <Link href="/redux/por-que">Por qué existe Redux</Link>.
        </p>

        <h3>El estado completo, entonces</h3>

        <p>Juntando todo, así queda el store de la tienda:</p>

        <Codigo
          archivo="la forma del estado (no es un archivo: es el plano)"
          codigo={`{
  catalogo: {
    // Una sola palabra en vez de dos booleanos. La sección 3 explica por qué.
    situacion: "listo",          // "inicial" | "cargando" | "listo" | "error"
    porId: {
      "tanenbaum": { id: "tanenbaum", nombre: "Sistemas Operativos Modernos — Tanenbaum",
                     categoria: "Libros", precio: 68900, stock: 4 },
      "cormen":    { id: "cormen", nombre: "Introduction to Algorithms — Cormen",
                     categoria: "Libros", precio: 112500, stock: 2 },
      // … seis más
    },
    orden: ["tanenbaum", "cormen", "clean-code", "apunte-redes", "casio-fx82",
            "pendrive-64", "cuaderno-a4", "auriculares"],
    error: null,
  },

  carrito: {
    porId: {
      "tanenbaum":   { id: "tanenbaum", cantidad: 2 },
      "pendrive-64": { id: "pendrive-64", cantidad: 1 },
    },
    orden: ["tanenbaum", "pendrive-64"],
    cupon: "ESTUDIANTE10",       // el texto que escribió la persona, nada más
  },

  registro: [ /* las acciones despachadas, solo para los demos de esta página */ ],
}`}
        />

        <Nota tipo="atencion" titulo="El cupón guarda el código, no el descuento">
          <p style={{ marginBottom: 0 }}>
            Fijate que <code>cupon</code> es <code>&quot;ESTUDIANTE10&quot;</code>{" "}
            y no <code>{"{ porcentaje: 10 }"}</code>. Lo que pasó es un hecho:
            alguien escribió ese código. Si ese código existe, si todavía está
            vigente y si la compra llega al mínimo, eso{" "}
            <strong>se decide al leer</strong>. El día que cambien los
            porcentajes no vas a tener que migrar ningún carrito guardado.
          </p>
        </Nota>
      </Seccion>

      {/* ==================================================== 2. catálogo === */}

      <Seccion titulo="2. El catálogo, con carga simulada" id="catalogo">
        <p>
          El catálogo viene de afuera. &quot;Afuera&quot; acá es un archivo con
          una tabla fija y un <code>setTimeout</code>: nada de esta lección
          depende de internet, así que el demo funciona siempre y el único
          retraso es el que elegimos nosotros.
        </p>

        <Codigo
          archivo="app/redux/practica/catalogoApi.js"
          resaltar={[13, 14, 15]}
          codigo={`export const CATALOGO = [
  {
    id: "tanenbaum",
    nombre: "Sistemas Operativos Modernos — Tanenbaum",
    categoria: "Libros",
    precio: 68900,
    stock: 4,
  },
  // … siete productos más
];

// Devuelve una promesa que tarda casi un segundo, como tardaría una de verdad.
// Con modo === "falla" rechaza, para poder mirar el camino del error sin
// desenchufar el wifi.
export function pedirCatalogo(modo = "ok") {
  return new Promise((entregar, fallar) => {
    setTimeout(() => {
      if (modo === "falla") {
        fallar(new Error("La librería devolvió 500: el catálogo no está."));
      } else {
        entregar(CATALOGO);
      }
    }, 900);
  });
}`}
        />

        <p>
          Este archivo no sabe nada de Redux ni de React, y está aparte por eso:
          el día que sea un <code>fetch</code> de verdad, se cambia solo acá. Si
          las promesas te quedan lejos, están en{" "}
          <Link href="/js/dom-y-asincronia">El DOM y la asincronía</Link>.
        </p>

        <h3>createAsyncThunk: la parte sucia, afuera del reducer</h3>

        <p>
          Un reducer tiene que ser <strong>puro</strong>: mismos argumentos,
          mismo resultado, sin efectos. Una llamada que tarda y puede fallar es
          exactamente lo contrario. <code>createAsyncThunk</code> es el lugar
          donde va eso: recibe un prefijo y una función <code>async</code>, y a
          cambio despacha tres acciones por cada llamada.
        </p>

        <Codigo
          archivo="app/redux/practica/catalogoSlice.js"
          resaltar={[8, 9, 10, 11, 12]}
          codigo={`// El estado inicial lo devuelve una función, no una constante compartida.
// Así, cada vez que alguien reinicia, recibe objetos nuevos y no hay manera de
// mutar sin querer el molde original.
function estadoInicial() {
  return { situacion: "inicial", porId: {}, orden: [], error: null };
}

export const catalogoPedido = createAsyncThunk(
  "catalogo/pedido",
  async (modo = "ok") => {
    const productos = await pedirCatalogo(modo);
    return productos; // esto termina siendo accion.payload de fulfilled
  },
);`}
        />

        <p>
          Despachás <code>catalogoPedido()</code> una vez y se despachan tres
          acciones solas, en este orden:
        </p>

        <ul>
          <li>
            <code>catalogo/pedido/pending</code> apenas arranca.
          </li>
          <li>
            <code>catalogo/pedido/fulfilled</code> si la promesa resuelve, con
            lo que devolviste en <code>payload</code>.
          </li>
          <li>
            <code>catalogo/pedido/rejected</code> si falla. Y ojo con esto: el
            mensaje <strong>no</strong> viene en <code>payload</code>, viene en{" "}
            <code>accion.error</code>.
          </li>
        </ul>

        <p>
          Esas tres acciones no las declaramos nosotros, así que no van en{" "}
          <code>reducers</code>: van en <code>extraReducers</code>.
        </p>

        <Codigo
          archivo="app/redux/practica/catalogoSlice.js"
          resaltar={[20, 21, 22, 23]}
          codigo={`const catalogoSlice = createSlice({
  name: "catalogo",
  initialState: estadoInicial(),
  reducers: {
    // Solo para el demo: vuelve al estado inicial y deja volver a mirar la
    // secuencia completa de carga.
    catalogoOlvidado: () => estadoInicial(),
  },
  // Los casos de un thunk no son acciones nuestras: las generó
  // createAsyncThunk. Por eso van en extraReducers y no en reducers.
  extraReducers: (constructor) => {
    constructor
      .addCase(catalogoPedido.pending, (estado) => {
        estado.situacion = "cargando";
        estado.error = null;
      })
      .addCase(catalogoPedido.fulfilled, (estado, accion) => {
        estado.situacion = "listo";
        estado.porId = {};
        estado.orden = [];
        for (const producto of accion.payload) {
          estado.porId[producto.id] = producto;
          estado.orden.push(producto.id);
        }
      })
      .addCase(catalogoPedido.rejected, (estado, accion) => {
        estado.situacion = "error";
        // Ojo: cuando el thunk falla, el mensaje NO viene en payload.
        // Viene en accion.error.
        estado.error = accion.error.message;
      });
  },
});`}
        />

        <p>
          El reducer de <code>fulfilled</code> es el que normaliza: recorre el
          arreglo que llegó y lo guarda en las dos estructuras que decidimos en
          la sección anterior. Es el único lugar de toda la aplicación donde se
          arma esa forma.
        </p>

        <h3>Una palabra, no dos booleanos</h3>

        <p>
          Hay una tentación clásica acá, y es guardar{" "}
          <code>cargando: false</code> y <code>error: null</code> como dos
          campos independientes.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Dos booleanos">
            <Codigo
              archivo="estados imposibles"
              codigo={`{ cargando: true, error: "500", datos: [...] }

// ¿Qué dibujo? ¿El spinner, el error o la lista?
// Peor: nada impide que esto pase. Basta con que un
// reducer se olvide de poner cargando en false.`}
            />
          </Columna>
          <Columna tono="bien" titulo="Una situación">
            <Codigo
              archivo="una sola verdad"
              codigo={`{ situacion: "error", error: "500", porId: {} }

// Cuatro valores posibles y nada más.
// El componente hace una sola pregunta y dibuja
// una sola cosa. No existe el estado contradictorio.`}
            />
          </Columna>
        </Comparacion>

        <p>
          Con dos booleanos tenés cuatro combinaciones y dos de ellas no quieren
          decir nada. Con una palabra, los estados imposibles{" "}
          <strong>no se pueden escribir</strong>. Es la misma idea que está
          detrás de los tipos unión de{" "}
          <Link href="/js/typescript">TypeScript</Link>: achicar lo que se puede
          representar hasta que solo quede lo que tiene sentido.
        </p>

        <h3>Probalo</h3>

        <p>
          Pedí el catálogo, hacelo fallar, volvé al inicio. Mirá el campo{" "}
          <code>situacion</code> arriba: todo lo que cambia en la pantalla sale
          de esa palabra.
        </p>

        <Demo titulo="Los tres estados de un pedido">
          <Proveedor>
            <CatalogoDemo />
          </Proveedor>
        </Demo>

        <Nota tipo="info" titulo="Nadie pide el catálogo solo">
          <p style={{ marginBottom: 0 }}>
            En una aplicación de verdad este pedido lo dispara un{" "}
            <Link href="/react/efectos">efecto</Link> al montar la pantalla, con
            una guarda para no pedirlo dos veces. Acá lo dejamos en un botón a
            propósito: queremos que puedas ver el estado{" "}
            <code>&quot;inicial&quot;</code>, que de otro modo dura cuarenta
            milisegundos y nunca lo ves.
          </p>
        </Nota>
      </Seccion>

      {/* ===================================================== 3. carrito === */}

      <Seccion titulo="3. El slice del carrito" id="carrito">
        <p>
          Ahora sí, el corazón. Cinco acciones, cinco reducers, y cada uno tiene
          que caber en la pantalla sin hacer scroll. Si un reducer crece,
          probablemente esté haciendo dos cosas.
        </p>

        <h3>Agregar, y el problema del stock</h3>

        <p>
          Agregar un producto tiene una validación obvia: no te podés pasar del
          stock. Pero acá aparece algo que todavía no te había pasado:{" "}
          <strong>un reducer solo ve su pedazo del estado</strong>. El reducer
          del carrito recibe <code>estado.carrito</code>, y el stock vive en{" "}
          <code>estado.catalogo</code>. No lo puede mirar.
        </p>

        <p>Hay dos salidas, y las dos son legítimas:</p>

        <ol>
          <li>
            <strong>Pasarlo en el payload.</strong> Quien despacha ya tiene el
            producto en la mano, así que manda el stock junto con el id.
          </li>
          <li>
            <strong>Escribir un thunk</strong> que lea el store entero con{" "}
            <code>getState()</code> y despache la acción con todo masticado.
          </li>
        </ol>

        <p>
          Elegimos la primera, porque deja el reducer trivial de leer y de
          testear: entra un objeto, sale un estado. Y para que quien despacha no
          tenga que acordarse de armar ese objeto, usamos{" "}
          <code>prepare</code>, que corre antes del reducer y afuera de él.
        </p>

        <Codigo
          archivo="app/redux/practica/carritoSlice.js"
          resaltar={[20, 21, 22]}
          codigo={`    // Un reducer solo ve SU pedazo del estado: desde acá no se puede mirar el
    // catálogo. Por eso el stock entra en el payload, y prepare se encarga de
    // extraerlo del producto para que quien despacha no tenga que pensarlo.
    productoAgregado: {
      reducer(estado, accion) {
        const { id, stock } = accion.payload;
        if (stock <= 0) return; // agotado: la acción no cambia nada

        const linea = estado.porId[id];
        if (linea) {
          linea.cantidad = Math.min(linea.cantidad + 1, stock);
        } else {
          estado.porId[id] = { id, cantidad: 1 };
          estado.orden.push(id);
        }
      },
      prepare(producto) {
        return { payload: { id: producto.id, stock: producto.stock } };
      },
    },`}
        />

        <p>
          Desde el componente eso se despacha así:{" "}
          <code>despachar(productoAgregado(producto))</code>. Le pasás el
          producto entero y <code>prepare</code> se queda con las dos cosas que
          el carrito necesita. El payload no se llena de datos que el reducer no
          va a usar.
        </p>

        <p>
          Fijate también en el <code>return</code> temprano: si no hay stock,{" "}
          <strong>el reducer no hace nada</strong>. Devolver el estado sin tocar
          es una respuesta perfectamente válida a una acción. No tira
          excepciones, no avisa nada: la acción ocurrió y no cambió el mundo.
        </p>

        <h3>Cambiar la cantidad, y el NaN que arruina todo</h3>

        <Codigo
          archivo="app/redux/practica/carritoSlice.js"
          resaltar={[7, 8]}
          codigo={`    cantidadCambiada(estado, accion) {
      const { id, cantidad, stock } = accion.payload;
      const linea = estado.porId[id];
      if (!linea) return;
      // Un input vacío llega como NaN. Si no lo frenamos acá, el carrito
      // termina con cantidad NaN y todos los totales se vuelven NaN.
      if (!Number.isFinite(cantidad)) return;
      // Nunca menos de 1 —para eso está quitar— ni más de lo que hay.
      linea.cantidad = Math.max(1, Math.min(Math.trunc(cantidad), stock));
    },`}
        />

        <p>
          Ese <code>Number.isFinite</code> no es paranoia. Un{" "}
          <code>&lt;input type=&quot;number&quot;&gt;</code> vacío devuelve la
          cadena vacía, <code>Number(&quot;&quot;)</code> da <code>0</code>, pero
          si la persona escribe <code>&quot;2e&quot;</code> da <code>NaN</code>.
          Y <code>NaN</code> es contagioso: se guarda en el carrito, el subtotal
          se vuelve <code>NaN</code>, el total también, y la pantalla entera
          muestra <code>$NaN</code> sin que ningún error aparezca en la consola.
        </p>

        <p>
          Las validaciones viven <strong>acá</strong>, en el reducer, y no en el
          componente. Un componente es una de las formas de despachar esa
          acción; mañana puede haber otro, o un test, o las DevTools repitiendo
          una acción vieja. El reducer es el único portero.
        </p>

        <h3>Quitar, vaciar y el cupón</h3>

        <Codigo
          archivo="app/redux/practica/carritoSlice.js"
          resaltar={[9, 15, 16]}
          codigo={`    productoQuitado(estado, accion) {
      const id = accion.payload;
      if (!estado.porId[id]) return;
      delete estado.porId[id];
      estado.orden = estado.orden.filter((otro) => otro !== id);
    },

    carritoVaciado: () => estadoInicial(),

    // El código se normaliza en prepare: sin espacios y en mayúsculas. Así el
    // reducer recibe siempre lo mismo y no tiene que limpiar nada.
    cuponAplicado: {
      reducer(estado, accion) {
        estado.cupon = accion.payload;
      },
      prepare(texto) {
        return { payload: String(texto).trim().toUpperCase() };
      },
    },

    cuponQuitado(estado) {
      estado.cupon = null;
    },`}
        />

        <p>
          Tres cosas para mirar de cerca. El <code>delete</code> sobre{" "}
          <code>estado.porId</code>: eso es mutación, y acá está{" "}
          <strong>bien</strong>, porque <code>estado</code> es un borrador de
          Immer, no el estado real. La regla de no mutar sigue intacta en todo
          el resto de <Link href="/react/objetos-en-estado">React</Link>; adentro
          de un reducer de slice es al revés.
        </p>

        <p>
          El <code>orden</code> se recalcula con <code>filter</code> en la misma
          acción que borra la clave. Las dos estructuras tienen que quedar
          sincronizadas siempre, y el único lugar donde eso se garantiza es acá.
          Es el precio que pagamos por el acceso rápido por id, y es un precio
          que se paga una vez, en un archivo.
        </p>

        <p>
          Y <code>cuponAplicado</code> usa <code>prepare</code> para limpiar el
          texto. Si alguien escribe <code>&quot; estudiante10 &quot;</code>, al
          reducer le llega <code>&quot;ESTUDIANTE10&quot;</code>. La
          normalización de la entrada va en <code>prepare</code>, no en el
          componente: así vale para todos los que despachen esa acción.
        </p>

        <h3>Probalo: catálogo y carrito, sin totales todavía</h3>

        <p>
          Agregá, subí y bajá cantidades, quitá, vaciá. Vas a ver que el botón
          se desactiva cuando llegás al stock, que no podés bajar de 1 y que{" "}
          <em>Auriculares con micrófono USB</em> no se puede agregar porque está
          agotado.
        </p>

        <p>
          Lo que todavía <strong>no</strong> hay es ningún total. Eso es a
          propósito: es la sección que viene.
        </p>

        <Demo titulo="El carrito, sin un solo total">
          <Proveedor>
            <div style={DOS_COLUMNAS}>
              <div style={PANEL}>
                <p style={TITULO_PANEL}>catálogo</p>
                <Catalogo />
              </div>
              <div style={PANEL}>
                <p style={TITULO_PANEL}>carrito</p>
                <LineasDelCarrito />
              </div>
            </div>
          </Proveedor>
        </Demo>

        <Nota tipo="atencion" titulo="El input de cantidad pelea un poco">
          <p>
            El campo de cantidad está controlado por el store: lo que ves es lo
            que hay en Redux. Si lo borrás del todo, el reducer frena el{" "}
            <code>NaN</code> y el campo vuelve al valor anterior. Correcto, pero
            incómodo de escribir.
          </p>
          <p style={{ marginBottom: 0 }}>
            En una aplicación de verdad se resuelve como el campo del cupón: el
            texto que se está escribiendo vive en <code>useState</code> y recién
            se despacha al salir del campo o al apretar Enter. Lo dejamos
            controlado acá porque el objetivo del demo es que veas el store
            cambiar en tiempo real.{" "}
            <Link href="/react/formularios">Formularios controlados</Link> tiene
            el detalle.
          </p>
        </Nota>
      </Seccion>

      {/* ================================================== 4. selectores === */}

      <Seccion titulo="4. Los totales no se guardan: se calculan" id="selectores">
        <Nota tipo="ok" titulo="Si te llevás una sola cosa de esta lección, que sea esta">
          <p style={{ marginBottom: 0 }}>
            Si un dato se puede calcular a partir de otro que ya está en el
            store, <strong>no se guarda</strong>. Se deriva al leer. Esta sola
            regla evita más bugs que todas las demás juntas.
          </p>
        </Nota>

        <p>
          Mirá por qué, con el ejemplo más chiquito posible. Ésta es la versión
          que guarda el total —y es, textualmente, la que aparecía en el segundo
          desafío de <Link href="/redux/toolkit">Redux Toolkit</Link>—:
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="El total guardado en el estado">
            <Codigo
              archivo="cada acción tiene que acordarse"
              codigo={`initialState: { porId: {}, orden: [], total: 0 }

productoAgregado(estado, accion) {
  // … agrega la línea
  estado.total += accion.payload.precio;   // ✓ se acordó
},
cantidadCambiada(estado, accion) {
  linea.cantidad = accion.payload.cantidad;
  // ✗ se olvidó. El total quedó mintiendo.
},
productoQuitado(estado, accion) {
  delete estado.porId[accion.payload];
  // ✗ y acá también.
},`}
            />
            <p className="tenue" style={{ margin: 0 }}>
              Cada acción nueva es una oportunidad nueva de olvidarse. Y cuando
              el total queda mal, no hay error: hay un número equivocado en
              pantalla.
            </p>
          </Columna>

          <Columna tono="bien" titulo="El total derivado al leer">
            <Codigo
              archivo="una sola línea, imposible de olvidar"
              codigo={`// Los reducers no saben que el total existe.

export const elegirSubtotal = createSelector(
  [elegirLineas],
  (lineas) => lineas.reduce((suma, l) => suma + l.subtotal, 0),
);

// Agregás una acción nueva mañana, la que sea:
// el subtotal ya está bien. No hay nada que actualizar.`}
            />
            <p className="tenue" style={{ margin: 0 }}>
              El estado guardado es más chico, y no existe la posibilidad de que
              dos números se contradigan.
            </p>
          </Columna>
        </Comparacion>

        <p>
          No es una idea de Redux. Es la misma de{" "}
          <Link href="/react/estado-compartido">Estado compartido</Link>: si lo
          podés calcular durante el render, no es estado. Lo que cambia con
          Redux es dónde se escribe ese cálculo —en un archivo de selectores— y
          que ahí se puede memorizar.
        </p>

        <h3>El selector que junta las dos mitades</h3>

        <p>
          El carrito guarda ids y cantidades. El catálogo guarda nombres y
          precios. La pantalla necesita las dos cosas juntas. Ese{" "}
          <em>join</em> es el selector más importante de la aplicación:
        </p>

        <Codigo
          archivo="app/redux/practica/selectores.js"
          resaltar={[4, 5]}
          codigo={`// El "join" del carrito: el carrito guarda id y cantidad, el catálogo guarda
// nombre y precio, y acá se juntan. Es el selector más importante de la
// aplicación.
export const elegirLineas = createSelector(
  [elegirLineasPorId, elegirOrdenDelCarrito, elegirProductosPorId],
  (lineas, orden, productos) =>
    orden.map((id) => {
      const producto = productos[id];
      const cantidad = lineas[id].cantidad;
      const precio = producto ? producto.precio : 0;
      return {
        id,
        cantidad,
        precio,
        nombre: producto ? producto.nombre : "Producto que ya no está",
        stock: producto ? producto.stock : 0,
        subtotal: precio * cantidad,
      };
    }),
);`}
        />

        <p>
          Devuelve lo que la interfaz quiere dibujar, ya masticado: una línea
          por producto, en orden, con el nombre, el precio, el stock y su
          subtotal. Los componentes no tienen que saber que el estado está
          partido en dos slices.
        </p>

        <h3>Por qué estos van con createSelector y otros no</h3>

        <p>
          <code>elegirLineas</code> arma un arreglo nuevo cada vez que corre.
          Eso importa, y mucho: <code>useSelector</code> vuelve a ejecutar tu
          selector después de <strong>cada</strong> acción despachada en toda la
          aplicación, y compara el resultado nuevo con el anterior usando{" "}
          <code>===</code>. Dos arreglos distintos con el mismo contenido nunca
          son <code>===</code>.
        </p>

        <p>
          Sin memorizar, el componente del carrito se volvería a dibujar cuando
          llega el catálogo, cuando cambia el cupón y cuando se despacha
          cualquier cosa de cualquier otra parte.{" "}
          <code>createSelector</code> arregla eso: guarda las entradas y el
          último resultado, y si las entradas son las mismas devuelve{" "}
          <strong>el mismo arreglo</strong>, no uno igual.
        </p>

        <Codigo
          archivo="app/redux/practica/selectores.js"
          codigo={`// --------------------------------------------------- selectores de entrada ---
// Baratos: devuelven algo que ya está en el estado, sin crear nada nuevo.
// No hace falta memorizarlos.

export const elegirSituacion = (estado) => estado.catalogo.situacion;
export const elegirErrorDelCatalogo = (estado) => estado.catalogo.error;
export const elegirCupon = (estado) => estado.carrito.cupon;`}
        />

        <p>
          Esos tres no necesitan nada: devuelven una referencia que ya existe en
          el estado, así que la comparación con <code>===</code> da verdadero
          sola. La regla práctica es corta:{" "}
          <strong>
            si tu selector tiene un <code>map</code>, un <code>filter</code> o
            unas llaves que arman un objeto, memorizalo
          </strong>
          . Si solo mete un punto, dejalo suelto.
        </p>

        <h3>La cadena: subtotal, cupón, descuento, total</h3>

        <p>
          Un selector memorizado puede recibir otros selectores memorizados como
          entrada. Eso arma una cadena donde cada eslabón solo recalcula si el
          anterior cambió.
        </p>

        <Codigo
          archivo="app/redux/practica/selectores.js"
          resaltar={[1, 2, 3, 10, 11]}
          codigo={`export const elegirSubtotal = createSelector([elegirLineas], (lineas) =>
  lineas.reduce((suma, linea) => suma + linea.subtotal, 0),
);

// Un selector puede recibir otros selectores como entrada, no solo pedazos del
// estado. Eso arma una cadena: si el subtotal no cambió, el descuento ni se
// vuelve a calcular.
export const elegirDescuento = createSelector(
  [elegirSubtotal, elegirEstadoDelCupon],
  (subtotal, cupon) => Math.round((subtotal * cupon.porcentaje) / 100),
);

export const elegirTotal = createSelector(
  [elegirSubtotal, elegirDescuento],
  (subtotal, descuento) => subtotal - descuento,
);`}
        />

        <p>
          Y el cupón es el mejor ejemplo de por qué conviene derivar. En el
          store hay un texto. Todo lo demás —si existe, si la compra llega al
          mínimo, cuánto falta para que sirva— se calcula, y depende del
          subtotal, que también es derivado:
        </p>

        <Codigo
          archivo="app/redux/practica/selectores.js"
          resaltar={[6, 7, 8, 9, 10, 11, 12, 13]}
          codigo={`export const elegirEstadoDelCupon = createSelector(
  [elegirCupon, elegirSubtotal],
  (codigo, subtotal) => {
    if (!codigo) {
      return { codigo: null, estado: "sin-cupon", porcentaje: 0, faltan: 0 };
    }
    const cupon = CUPONES[codigo];
    if (!cupon) {
      return { codigo, estado: "desconocido", porcentaje: 0, faltan: 0 };
    }
    if (subtotal < cupon.minimo) {
      return {
        codigo,
        estado: "no-alcanza",
        porcentaje: 0,
        faltan: cupon.minimo - subtotal,
      };
    }
    return {
      codigo,
      estado: "aplicado",
      porcentaje: cupon.porcentaje,
      faltan: 0,
    };
  },
);`}
        />

        <p>
          Si esto estuviera guardado, pensá lo que haría falta: aplicás{" "}
          <code>FINALES25</code> con la compra en $60.000 y se guarda un
          descuento de $15.000. Después quitás un libro y el subtotal baja a
          $45.000. ¿Quién se acuerda de volver a chequear el mínimo? Derivado,
          la pregunta ni existe: el cupón deja de aplicarse solo, y vuelve a
          aplicarse solo si agregás algo.
        </p>

        <Nota tipo="info" titulo="Qué devuelve el selector y qué devuelve la pantalla">
          <p style={{ marginBottom: 0 }}>
            Fijate que el selector devuelve <code>faltan: 45000</code> y no el
            texto <code>&quot;Te faltan $45.000&quot;</code>. Los selectores
            devuelven datos; armar la frase es trabajo del componente. Si
            mañana la tienda se traduce, no se toca ni un selector.
          </p>
        </Nota>

        <h3>Probalo: los mismos datos de arriba, leídos distinto</h3>

        <p>
          Este demo no agrega ningún reducer. Solo lee tres selectores nuevos
          sobre el <strong>mismo</strong> carrito que armaste en la sección
          anterior. Si subís ahí una cantidad, acá cambia el total; no hay
          ningún cable entre los dos demos más que el store.
        </p>

        <p>
          Probá <code>ESTUDIANTE10</code>, probá <code>FINALES25</code> con menos
          de $50.000 encima, y probá cualquier cosa que no exista.
        </p>

        <Demo titulo="Cupón y totales, 100% derivados">
          <Proveedor>
            <div style={DOS_COLUMNAS}>
              <div style={PANEL}>
                <p style={TITULO_PANEL}>cupón</p>
                <Cupon />
              </div>
              <div style={PANEL}>
                <p style={TITULO_PANEL}>totales</p>
                <Totales />
              </div>
            </div>
          </Proveedor>
        </Demo>
      </Seccion>

      {/* =================================================== 5. interfaz === */}

      <Seccion titulo="5. La interfaz conectada" id="interfaz">
        <p>
          El estado está modelado, los reducers escritos y los totales
          derivados. Falta la parte que se ve, y es la más corta de todas:
          cuatro componentes, ninguno de más de cien líneas, cada uno pidiendo
          exactamente lo que necesita.
        </p>

        <h3>Primero, el Provider</h3>

        <p>
          El layout raíz de este sitio es un componente de servidor, y{" "}
          <code>&lt;Provider&gt;</code> usa contexto, que solo existe en el
          cliente. La solución es la misma de{" "}
          <Link href="/redux/toolkit">la lección anterior</Link>: un archivo
          propio con <code>&quot;use client&quot;</code> que envuelve nada más
          que lo que lo necesita.
        </p>

        <Codigo
          archivo="app/redux/practica/almacen.js"
          resaltar={[6]}
          codigo={`import { configureStore } from "@reduxjs/toolkit";
import catalogo from "./catalogoSlice";
import carrito from "./carritoSlice";
import registro from "./registroSlice";

export const almacen = configureStore({
  reducer: { catalogo, carrito, registro },
});`}
        />

        <p>
          Eso es todo el archivo. Cada feature trae su reducer ya armado y acá
          solo se eligen los nombres de las ramas: <code>estado.catalogo</code>,{" "}
          <code>estado.carrito</code>. Esos nombres los vas a escribir cien
          veces en los selectores, así que vale pensarlos una vez.
        </p>

        <Codigo
          archivo="app/redux/practica/Proveedor.js"
          resaltar={[11, 12, 13]}
          codigo={`"use client";

// El <Provider> de react-redux usa contexto, y el contexto solo existe del
// lado del cliente. Como el layout raíz de este sitio es un componente de
// servidor, no podemos envolver la aplicación entera ahí: armamos este
// componente de cliente y envolvemos solo los demos de la lección.

import { Provider } from "react-redux";
import { almacen } from "./almacen";

export default function Proveedor({ children }) {
  return <Provider store={almacen}>{children}</Provider>;
}`}
        />

        <h3>Componentes chicos, que piden poco</h3>

        <p>
          El componente de los totales es el más claro de todos: no despacha
          nada, no guarda nada, y lee tres números.
        </p>

        <Codigo
          archivo="app/redux/practica/Totales.js"
          resaltar={[2, 3, 4, 5]}
          codigo={`export default function Totales() {
  const subtotal = useSelector(elegirSubtotal);
  const descuento = useSelector(elegirDescuento);
  const total = useSelector(elegirTotal);
  const cupon = useSelector(elegirEstadoDelCupon);

  return (
    <div>
      <Fila etiqueta="Subtotal" valor={pesos(subtotal)} />
      {/* … */}
    </div>
  );
}`}
        />

        <p>
          Cuatro <code>useSelector</code> separados y no uno que devuelva un
          objeto con las cuatro cosas. Si hiciéramos{" "}
          <code>
            useSelector((estado) =&gt; ({"{ subtotal, descuento, total }"}))
          </code>
          , ese objeto sería nuevo en cada llamada y el componente se dibujaría
          con cada acción de la aplicación. Varios selectores finos son más
          baratos que uno gordo. Eso lo medimos en{" "}
          <Link href="/redux/toolkit#selectores">la lección anterior</Link>.
        </p>

        <p>
          El del cupón es el otro que vale la pena mirar, porque es donde se ve
          la frontera entre el estado local y el global:
        </p>

        <Codigo
          archivo="app/redux/practica/Cupon.js"
          resaltar={[2, 3, 4, 5]}
          codigo={`export default function Cupon() {
  // Lo que la persona está tecleando vive acá nomás. Al store solo llega el
  // código cuando lo confirma: si cada tecla despachara una acción, las
  // DevTools se llenarían de basura y todo lo conectado se volvería a dibujar.
  const [texto, setTexto] = useState("");
  const cupon = useSelector(elegirEstadoDelCupon);
  const despachar = useDispatch();
  // Esta página muestra el campo dos veces. useId le da a cada copia un id
  // propio, estable entre el servidor y el navegador, para que cada label
  // apunte a su input y no los dos al primero.
  const idCampo = useId();

  function aplicar(evento) {
    evento.preventDefault();
    if (texto.trim() === "") return;
    despachar(cuponAplicado(texto));
    setTexto("");
  }`}
        />

        <h3>Que se pueda usar sin mouse y sin ver</h3>

        <p>
          La pantalla tiene ocho botones que dicen &quot;Agregar&quot; y cinco
          campos que dicen un número. Mirándolos se entiende cuál es cuál porque
          el nombre del producto está al lado; escuchándolos, no.
        </p>

        <Codigo
          archivo="app/redux/practica/LineasDelCarrito.js"
          resaltar={[1, 2, 3, 4, 5, 6]}
          codigo={`                {/* La etiqueta existe en el documento aunque no se vea: el
                    nombre del producto ya está arriba y repetirlo ensuciaría
                    la pantalla, pero un lector de pantalla necesita saber de
                    qué es este campo. */}
                <label htmlFor={\`\${prefijo}-\${linea.id}\`} style={SOLO_LECTORES}>
                  Cantidad de {linea.nombre}
                </label>
                <input
                  id={\`\${prefijo}-\${linea.id}\`}
                  className="entrada"
                  type="number"
                  min={1}
                  max={linea.stock}`}
        />

        <p>
          <code>SOLO_LECTORES</code> es un puñado de propiedades que sacan el
          elemento de la vista sin sacarlo del documento.{" "}
          <code>display: none</code> no sirve: eso lo saca del árbol de
          accesibilidad también. Y ese <code>prefijo</code> sale de{" "}
          <code>useId()</code>, un hook de React: esta página muestra el carrito
          dos veces, y dos <code>input</code> con el mismo <code>id</code>{" "}
          dejarían a los dos <code>label</code> apuntando al primero.{" "}
          <code>useId</code> le da a cada copia un prefijo propio y, a
          diferencia de un número al azar, devuelve lo mismo en el servidor y en
          el navegador, así que no rompe la hidratación. Los botones usan la
          otra herramienta,{" "}
          <code>aria-label</code>, que reemplaza el nombre accesible sin tocar
          lo que se ve:
        </p>

        <Codigo
          archivo="app/redux/practica/Catalogo.js"
          resaltar={[3, 4]}
          codigo={`                <button
                  type="button"
                  className="boton"
                  // El nombre visible dice "Agregar" ocho veces. Para quien
                  // escucha la página, aria-label dice cuál.
                  aria-label={\`Agregar \${producto.nombre} al carrito\`}
                  onClick={() => despachar(productoAgregado(producto))}
                >`}
        />

        <p>
          Nada de esto costó tiempo y está todo en{" "}
          <Link href="/html/accesibilidad">Accesibilidad</Link>. Es la última
          lección del laboratorio: lo mínimo es predicar con el ejemplo.
        </p>

        <h3>Y ahora sí, todo junto</h3>

        <p>
          Éste es el demo que la lección venía armando. A la izquierda la
          tienda: catálogo, carrito, cupón y totales, los cuatro componentes que
          escribimos, sin un solo <code>prop</code> entre ellos. A la derecha, el
          store de verdad y el registro de acciones.
        </p>

        <p>Mientras comprás, mirá tres cosas:</p>

        <ul>
          <li>
            Cuántas acciones hace falta despachar para una compra entera.{" "}
            <strong>Son pocas, y cada una dice qué pasó</strong>, no qué hacer.
          </li>
          <li>
            Que el panel de la derecha, el del store, nunca tiene un total
            adentro. Los números del panel punteado no existen en ninguna parte:
            se vuelven a calcular en cada acción.
          </li>
          <li>
            Que el carrito guarda <code>cantidad</code> y nada más. El nombre y
            el precio que ves a la izquierda los puso un selector.
          </li>
        </ul>

        <Demo titulo="La tienda entera, y el store al lado">
          <Proveedor>
            <TiendaDemo />
          </Proveedor>
        </Demo>

        <Nota tipo="ok" titulo="Esto es el flujo de Redux, completo">
          <p style={{ marginBottom: 0 }}>
            Tocás un botón → se despacha un hecho → el reducer devuelve un
            estado nuevo → los selectores derivan lo que haga falta → los
            componentes que leían algo que cambió se vuelven a dibujar. El mismo
            dibujo de <Link href="/redux/conceptos#flujo">Store, acciones y
            reducers</Link>, ahora con una aplicación de verdad adentro.
          </p>
        </Nota>
      </Seccion>

      {/* ============================================ 6. buenas prácticas === */}

      <Seccion titulo="6. Lo que conviene hacer siempre" id="practicas">
        <p>
          Seis costumbres. No son opiniones de estilo: cada una resuelve un
          problema concreto que vas a tener.
        </p>

        <h3>1. Organizá por feature, no por tipo de archivo</h3>

        <Comparacion>
          <Columna tono="mal" titulo="Por tipo">
            <Codigo
              archivo="carpetas por lo que las cosas SON"
              codigo={`src/
  acciones/
    carrito.js
    catalogo.js
  reducers/
    carrito.js
    catalogo.js
  selectores/
    carrito.js
    catalogo.js`}
            />
            <p className="tenue" style={{ margin: 0 }}>
              Tocar el carrito significa abrir tres archivos en tres carpetas.
              Y borrar la feature significa buscarla en todas.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Por feature">
            <Codigo
              archivo="carpetas por lo que las cosas HACEN"
              codigo={`src/
  carrito/
    carritoSlice.js
    selectores.js
    LineasDelCarrito.js
    Cupon.js
  catalogo/
    catalogoSlice.js
    catalogoApi.js
    Catalogo.js`}
            />
            <p className="tenue" style={{ margin: 0 }}>
              Todo lo del carrito, junto. Si la feature se va, se borra la
              carpeta y listo.
            </p>
          </Columna>
        </Comparacion>

        <p>
          Esta lección está escrita plana —todo en{" "}
          <code>app/redux/practica/</code>— porque son catorce archivos y
          carpetas de a dos archivos serían ridículas. Pero los{" "}
          <strong>nombres</strong> ya están agrupados por feature:{" "}
          <code>catalogoApi</code>, <code>catalogoSlice</code>,{" "}
          <code>Catalogo</code>. Cuando la aplicación crezca, mover eso a
          carpetas es arrastrar archivos.
        </p>

        <h3>2. Las acciones son hechos en pasado</h3>

        <p>
          Esto ya venía de{" "}
          <Link href="/redux/conceptos#acciones">
            Store, acciones y reducers
          </Link>
          , y acá se ve para qué sirve. Mirá los nombres que usamos:{" "}
          <code>productoAgregado</code>, <code>cantidadCambiada</code>,{" "}
          <code>cuponAplicado</code>, <code>catalogoPedido</code>. Ninguno es una
          orden.
        </p>

        <p>
          La diferencia no es cosmética. <code>actualizarTotal(1500)</code> tiene
          un solo destinatario, y el día que aparezca un segundo interesado hay
          que agregar otra orden. <code>productoAgregado</code> lo escucha
          cualquiera: nuestro <code>registroSlice</code> los escucha{" "}
          <strong>todos</strong> y ninguno de los otros slices sabe siquiera que
          existe.
        </p>

        <h3>3. Normalizá, y que cada dato tenga un solo dueño</h3>

        <p>
          Ya lo hicimos dos veces: el catálogo se guarda indexado por id, y el
          carrito guarda ids en vez de copiar nombres y precios. La prueba de
          que estuvo bien es que el día que cambie un precio en la librería{" "}
          <strong>no hay nada que sincronizar</strong>: el carrito lo lee del
          catálogo cada vez que dibuja.
        </p>

        <h3>4. Los reducers se mantienen puros</h3>

        <p>
          Nada de <code>fetch</code>, nada de <code>Math.random()</code>, nada de{" "}
          <code>Date.now()</code>, nada de escribir en{" "}
          <code>localStorage</code> adentro de un reducer. Si hace falta un id o
          una fecha, va en <code>prepare</code>; si hace falta pedir algo, va en
          un thunk.
        </p>

        <p>
          El motivo es práctico y lo vas a agradecer en cinco minutos: si los
          reducers son puros, aplicar la misma lista de acciones da siempre el
          mismo estado. Eso es lo que hace posible el viaje en el tiempo de las
          DevTools, y lo que hace que un test de reducer sea tres líneas sin
          montar nada.
        </p>

        <h3>5. Al store va lo compartido, y nada más</h3>

        <p>
          La pregunta para decidir es: <em>si este componente desaparece de la
          pantalla, ¿este dato tiene que seguir existiendo?</em>
        </p>

        <ul>
          <li>
            <strong>Sí:</strong> el carrito, el catálogo, la sesión, los
            favoritos. Van al store.
          </li>
          <li>
            <strong>No:</strong> el texto a medio escribir en el campo del
            cupón, si un acordeón está abierto, qué fila del listado está con el
            mouse encima, el valor de un formulario antes de confirmarlo. Van a{" "}
            <code>useState</code>.
          </li>
        </ul>

        <p>
          Poner todo en el store no te hace más prolijo: te hace escribir tres
          veces más código para lo mismo, y te llena las DevTools de acciones que
          no le importan a nadie.
        </p>

        <h3>6. Instalá las DevTools de Redux</h3>

        <p>
          El panel de la derecha del demo final es una versión pobre de algo que
          ya existe. Buscá <strong>Redux DevTools</strong> en la tienda de
          extensiones de tu navegador, instalala, recargá esta página y abrí la
          pestaña Redux: <code>configureStore</code> ya la dejó enchufada.
        </p>

        <p>Con el carrito de arriba, probá esto:</p>

        <ol>
          <li>
            Agregá tres productos y cambiá una cantidad. Mirá la lista de
            acciones de la izquierda del panel.
          </li>
          <li>
            Hacé clic en una acción y mirá la solapa <strong>Diff</strong>:
            exactamente qué campo cambió y de qué valor a qué valor.
          </li>
          <li>
            Hacé clic en una acción de hace cinco pasos. La página entera vuelve
            a como estaba. Seguí adelante de nuevo. Eso es el{" "}
            <em>viaje en el tiempo</em>, y solo es posible porque los reducers
            son puros y el estado es inmutable.
          </li>
        </ol>

        <p>
          Cuando alguien te reporte un bug que &quot;a vos no te pasa&quot;, las
          DevTools te dejan exportar su lista de acciones e importarla en tu
          máquina. Deja de ser una discusión y pasa a ser un archivo.
        </p>

        <Nota tipo="info" titulo="Si lo tuyo va a ser pedir datos todo el tiempo">
          <p style={{ marginBottom: 0 }}>
            <code>createAsyncThunk</code> está bien para pedidos sueltos como el
            de esta lección. Si tu aplicación es, sobre todo, traer datos de una
            API, cachearlos, refrescarlos y no pedirlos dos veces, eso ya está
            resuelto: <strong>RTK Query</strong> viene adentro de{" "}
            <code>@reduxjs/toolkit</code>. Mirarlo antes de escribir tu décimo
            thunk a mano te ahorra un mes.
          </p>
        </Nota>
      </Seccion>

      {/* ================================================== 7. desafíos === */}

      <Seccion titulo="Desafíos" id="desafios">
        <p>
          Los dos son extensiones de esta misma tienda. Si tenés el proyecto
          corriendo, se pueden escribir y probar de verdad.
        </p>

        <DesafioFavoritos />
        <DesafioEnvio />
      </Seccion>

      {/* ==================================================== 8. cierre === */}

      <Seccion titulo="Hasta acá llega el recorrido" id="cierre">
        <p>
          Ésta es la última lección del laboratorio. Cuarenta lecciones, cinco
          pistas, y un recorrido que fue siempre en la misma dirección: de lo
          que la página <em>es</em> a lo que la página <em>hace</em>.
        </p>

        <div className="tarjetas">
          <div className="tarjeta">
            <h3>HTML</h3>
            <p>
              Qué es cada cosa, antes de un solo color.{" "}
              <Link href="/html/semantica">Semántica</Link> y{" "}
              <Link href="/html/accesibilidad">accesibilidad</Link> son las dos
              que siguen pagando años después.
            </p>
          </div>
          <div className="tarjeta">
            <h3>CSS</h3>
            <p>
              Cómo se ve y cómo se acomoda.{" "}
              <Link href="/css/pagina-completa">Armar una página entera</Link> es
              el taller equivalente a éste.
            </p>
          </div>
          <div className="tarjeta">
            <h3>JavaScript y TypeScript</h3>
            <p>
              El lenguaje:{" "}
              <Link href="/js/fundamentos">los fundamentos</Link>,{" "}
              <Link href="/js/dom-y-asincronia">el DOM y la asincronía</Link> y{" "}
              <Link href="/js/typescript">TypeScript</Link>.
            </p>
          </div>
          <div className="tarjeta">
            <h3>React</h3>
            <p>
              Componentes, estado y efectos.{" "}
              <Link href="/react/estado-compartido">Estado compartido</Link>,{" "}
              <Link href="/react/listas-y-keys">listas y key</Link> y{" "}
              <Link href="/react/efectos">efectos</Link> son las tres que más vas
              a releer.
            </p>
          </div>
          <div className="tarjeta">
            <h3>Redux</h3>
            <p>
              <Link href="/redux/por-que">Cuándo conviene</Link>,{" "}
              <Link href="/redux/conceptos">las tres piezas</Link>,{" "}
              <Link href="/redux/toolkit">Toolkit</Link> y esta tienda.
            </p>
          </div>
        </div>

        <h3>Lo que podés hacer ahora</h3>

        <p>
          Armar algo tuyo. No una copia de los demos: algo que quieras usar, con
          datos que te importen. Tres ideas con nombre y con el mapa de qué
          parte del recorrido usa cada una.
        </p>

        <div className="recorrido">
          <h3>1. El seguimiento de tu cursada</h3>
          <p>
            Las materias del año, con su estado —cursando, final pendiente,
            aprobada—, las correlativas y el promedio. Guardado en{" "}
            <code>localStorage</code> para que sobreviva a recargar.
          </p>
          <p style={{ marginBottom: 0 }}>
            Usa <Link href="/html/tablas">tablas</Link> y{" "}
            <Link href="/html/semantica">HTML semántico</Link>,{" "}
            <Link href="/css/grid">Grid</Link>,{" "}
            <Link href="/react/formularios">formularios controlados</Link>,{" "}
            <Link href="/react/arreglos-en-estado">arreglos en estado</Link> y un{" "}
            <Link href="/react/efectos">efecto</Link> para persistir.{" "}
            <strong>No necesita Redux</strong>, y darte cuenta de eso es parte
            del ejercicio: el promedio es un selector derivado que podés escribir
            con un <code>reduce</code> suelto.
          </p>
        </div>

        <div className="recorrido">
          <h3>2. Un buscador sobre una API pública</h3>
          <p>
            Elegí una API gratis —el clima, libros, el dólar— y armá una pantalla
            con búsqueda, lista de resultados y detalle. Que maneje bien la
            espera y el error, no solo el caso feliz.
          </p>
          <p style={{ marginBottom: 0 }}>
            Usa <Link href="/js/dom-y-asincronia">promesas y async/await</Link>,{" "}
            <Link href="/react/efectos">efectos</Link>,{" "}
            <Link href="/react/listas-y-keys">listas y key</Link>,{" "}
            <Link href="/react/routing">routing</Link> para el detalle, y{" "}
            <code>createAsyncThunk</code> con las cuatro situaciones de la
            sección 2 de esta página. Es el proyecto donde Redux empieza a
            justificarse, porque los resultados los quiere más de una pantalla.
          </p>
        </div>

        <div className="recorrido">
          <h3>3. El inventario del laboratorio</h3>
          <p>
            Qué equipos hay, quién los tiene prestados, desde cuándo. Alta, baja,
            préstamo, devolución, y un panel con lo que está vencido.
          </p>
          <p style={{ marginBottom: 0 }}>
            Es esta misma tienda con otro nombre: varios{" "}
            <Link href="/redux/toolkit">slices</Link>, estado normalizado,
            selectores derivados para &quot;vencidos&quot; y &quot;disponibles&quot;,
            y acciones que son hechos (<code>equipoPrestado</code>,{" "}
            <code>equipoDevuelto</code>). Escribilo con{" "}
            <Link href="/js/typescript">TypeScript</Link>: Redux Toolkit es una
            de las librerías donde los tipos más se notan, porque te completa
            solo los <code>payload</code> de cada acción.
          </p>
        </div>

        <h3>Lo que este laboratorio no cubrió</h3>

        <p>
          Para que sepas qué buscar cuando lo necesites, y no te agarre de
          sorpresa:
        </p>

        <ul>
          <li>
            <strong>Tests.</strong> Vitest o Jest más Testing Library. Empezá por
            los reducers: son funciones puras, se testean en tres líneas y sin
            montar ningún componente.
          </li>
          <li>
            <strong>El backend.</strong> Acá todas las APIs fueron{" "}
            <code>setTimeout</code>. Del otro lado hay un servidor, una base de
            datos y autenticación, y eso es otra materia entera.
          </li>
          <li>
            <strong>Publicarlo.</strong> Un proyecto que solo corre en{" "}
            <code>localhost:3000</code> está a mitad de camino.{" "}
            <Link href="/sobre-next">Cómo funciona este proyecto</Link> explica
            qué hace <code>npm run build</code>; de ahí a Vercel o a Netlify hay
            un paso.
          </li>
        </ul>

        <Nota tipo="ok" titulo="Y una última cosa">
          <p style={{ marginBottom: 0 }}>
            Todo este sitio está hecho con lo que enseña: Next.js, React y, en
            esta página, Redux Toolkit. Los archivos están ahí, en{" "}
            <code>app/</code> y en <code>components/</code>, y ninguno es mágico.
            Abrí <code>components/Codigo.js</code> y mirá cómo colorea el código
            con una expresión regular, o <code>app/lecciones.js</code> y mirá
            cómo un solo arreglo genera la barra lateral, el índice y los
            botones de anterior y siguiente. Leer código que funciona y que
            podés romper es, de lejos, la forma más rápida de aprender lo que
            falta.
          </p>
        </Nota>
      </Seccion>
    </Leccion>
  );
}

// Los dos ejercicios del final, aparte para que la lección se lea de corrido.

function DesafioFavoritos() {
  return (
    <Desafio
      titulo="1. Una lista de favoritos, con su propio slice"
      pista={
        <div>
          <p>
            Favoritos es una feature nueva, así que va un slice nuevo: archivo
            propio y una rama propia en <code>configureStore</code>. No lo metas
            adentro del carrito, aunque las dos cosas hablen de productos.
          </p>
          <p style={{ marginBottom: 0 }}>
            Para la forma del estado tenés la misma decisión de la sección 1,
            pero esta vez el orden no importa y no hay cantidades: cada producto
            está o no está. Un objeto <code>{"{ [id]: true }"}</code> alcanza y
            la pregunta &quot;¿es favorito?&quot; es directa. Y guardá ids, no
            productos: el nombre ya está en el catálogo.
          </p>
        </div>
      }
      solucion={
        <div>
          <Codigo
            archivo="solución · app/redux/practica/favoritosSlice.js"
            resaltar={[8, 9, 10, 11, 12]}
            codigo={`import { createSlice } from "@reduxjs/toolkit";

const favoritosSlice = createSlice({
  name: "favoritos",
  // Solo ids. Un objeto como conjunto: la clave existe o no existe.
  initialState: {},
  reducers: {
    // Un solo reducer alcanza para las dos cosas: el hecho es que alguien
    // tocó la estrella, y el resultado depende de cómo estaba.
    favoritoAlternado(estado, accion) {
      const id = accion.payload;
      if (estado[id]) delete estado[id];
      else estado[id] = true;
    },
    favoritosVaciados: () => ({}),
  },
});

export const { favoritoAlternado, favoritosVaciados } = favoritosSlice.actions;
export default favoritosSlice.reducer;`}
          />
          <p>
            Se enchufa en el store y se lee con un selector derivado, igual que
            las líneas del carrito:
          </p>
          <Codigo
            archivo="solución · almacen.js y selectores.js"
            resaltar={[4, 11, 12]}
            codigo={`// almacen.js
export const almacen = configureStore({
  reducer: { catalogo, carrito, favoritos, registro },
});

// selectores.js — el mismo join que elegirLineas, más simple.
const elegirFavoritosPorId = (estado) => estado.favoritos;

export const elegirFavoritos = createSelector(
  [elegirFavoritosPorId, elegirProductosPorId, elegirOrdenDelCatalogo],
  // Recorremos el ORDEN del catálogo, no las claves del objeto: así los
  // favoritos salen en el mismo orden en que aparecen en la tienda.
  (favoritos, productos, orden) =>
    orden.filter((id) => favoritos[id]).map((id) => productos[id]),
);

export const elegirCuantosFavoritos = (estado) =>
  Object.keys(estado.favoritos).length;`}
          />
          <p className="tenue" style={{ marginBottom: 0 }}>
            En el componente del catálogo, el botón de la estrella es{" "}
            <code>
              onClick={"{"}() =&gt; despachar(favoritoAlternado(producto.id)){"}"}
            </code>
            , con <code>aria-pressed</code> para que se note si está activo y un{" "}
            <code>aria-label</code> que diga de qué producto.
          </p>
        </div>
      }
    >
      <p>
        Agregale a la tienda una lista de favoritos: una estrella en cada
        producto del catálogo que se prende y se apaga, y un panel con los
        marcados.
      </p>
      <p style={{ marginBottom: 0 }}>
        Tiene que ser un <strong>slice propio</strong>, no un campo del carrito.
        Pensá tres cosas: qué forma le das al estado, si hacen falta dos
        acciones o una sola, y cómo hacés para que el panel muestre nombres y
        precios sin guardarlos ahí adentro.
      </p>
    </Desafio>
  );
}

function DesafioEnvio() {
  return (
    <Desafio
      titulo="2. Envío gratis a partir de cierto monto"
      pista={
        <div>
          <p>
            Es un selector y nada más. Ningún reducer se toca, ningún campo
            nuevo en el store: el costo del envío se puede calcular a partir de
            algo que ya existe.
          </p>
          <p style={{ marginBottom: 0 }}>
            Lo que sí tenés que decidir es <strong>sobre qué monto</strong> se
            mide el mínimo: ¿sobre el subtotal, o sobre el total después del
            descuento? Las dos son defendibles, y cada tienda elige. Elegí una,
            escribila en un comentario y bancátela. Y acordate de que si el envío
            se suma, el &quot;total&quot; que ve la persona ya no es{" "}
            <code>elegirTotal</code>: hace falta un eslabón más en la cadena.
          </p>
        </div>
      }
      solucion={
        <div>
          <Codigo
            archivo="solución · app/redux/practica/selectores.js"
            resaltar={[8, 9, 10, 11]}
            codigo={`export const ENVIO = { costo: 7500, gratisDesde: 90000 };

// Decisión: el mínimo se mide sobre el total YA con descuento, que es lo que
// la persona realmente paga. Con el subtotal, un cupón grande podría dejar
// envío gratis en una compra chica.
export const elegirEnvio = createSelector([elegirTotal], (total) => {
  if (total === 0) return { costo: 0, gratis: false, faltan: 0 };
  if (total >= ENVIO.gratisDesde) {
    return { costo: 0, gratis: true, faltan: 0 };
  }
  return {
    costo: ENVIO.costo,
    gratis: false,
    faltan: ENVIO.gratisDesde - total,
  };
});

// El total a pagar es otro eslabón de la cadena, no un reemplazo.
export const elegirTotalAPagar = createSelector(
  [elegirTotal, elegirEnvio],
  (total, envio) => total + envio.costo,
);`}
          />
          <p>
            El carrito vacío es el caso que se escapa: sin el primer{" "}
            <code>if</code>, un carrito en cero mostraría &quot;te faltan
            $90.000 para el envío gratis&quot; antes de que la persona haya
            agregado nada.
          </p>
          <Codigo
            archivo="solución · en Totales.js"
            codigo={`const envio = useSelector(elegirEnvio);
const totalAPagar = useSelector(elegirTotalAPagar);

// …

<Fila
  etiqueta="Envío"
  valor={envio.gratis ? "¡gratis!" : pesos(envio.costo)}
/>
{!envio.gratis && envio.faltan > 0 && (
  <p className="tenue" style={{ margin: "2px 0 0", fontSize: "0.78rem" }}>
    Agregá {pesos(envio.faltan)} más y el envío te sale gratis.
  </p>
)}
<Fila etiqueta="Total" valor={pesos(totalAPagar)} fuerte />`}
          />
          <p className="tenue" style={{ marginBottom: 0 }}>
            Ese aviso de &quot;te faltan tanto&quot; es, en las tiendas de
            verdad, de las cosas que más venden. Y salió gratis: ya estaba en el
            estado, solo había que derivarlo.
          </p>
        </div>
      }
    >
      <p>
        La librería cobra $7.500 de envío, pero lo regala a partir de $90.000.
        Agregá a la tienda el costo del envío, el total final que incluye el
        envío, y un aviso que diga cuánto falta para que sea gratis.
      </p>
      <p style={{ marginBottom: 0 }}>
        La consigna de fondo es la de la sección 5:{" "}
        <strong>no agregues ningún campo al store</strong>. Si lo lográs, el
        ejercicio está bien resuelto.
      </p>
    </Desafio>
  );
}
