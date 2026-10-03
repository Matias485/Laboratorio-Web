import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import SalidaTempranaDemo from "./SalidaTempranaDemo";
import CeroFantasmaDemo from "./CeroFantasmaDemo";
import PanelPedidoDemo from "./PanelPedidoDemo";
import MapaDeEstadosDemo from "./MapaDeEstadosDemo";

export const metadata = { title: "Renderizado condicional" };

export default function Pagina() {
  return (
    <Leccion
      slug="/react/renderizado-condicional"
      titulo="Renderizado condicional"
      resumen="if, operador ternario, && y la trampa clásica del cero."
    >
      <Seccion titulo="Mostrar una cosa u otra">
        <p>
          Hasta acá tus componentes devolvían siempre lo mismo. En una pantalla
          de verdad eso casi nunca pasa: si el usuario inició sesión ves tu
          perfil y si no ves el botón de ingresar; si el carrito está vacío ves
          un cartel y si tiene cosas ves la lista. Eso es{" "}
          <strong>renderizado condicional</strong>, y no hay nada nuevo que
          aprender: son el <code>if</code> y el operador ternario de JavaScript
          de siempre, usados adentro de una función que devuelve JSX.
        </p>
        <p>
          Lo único que tenés que tener claro es <em>dónde</em> podés poner cada
          cosa. Afuera del <code>return</code> escribís JavaScript normal, con{" "}
          <code>if</code> y todo. Adentro de las llaves del JSX solo entran{" "}
          <strong>expresiones</strong>, o sea cosas que devuelven un valor: ahí
          el <code>if</code> no se puede usar, y por eso aparecen el ternario y
          el <code>&&</code>.
        </p>
        <Nota tipo="info" titulo="Ojo: esto todavía no lo vieron en clase">
          <p>
            Las clases 5 y 6 llegaron hasta componentes, props, eventos y{" "}
            <code>useState</code>. Esta lección es material que viene después,
            así que tomala como un adelanto. Nada de lo que sigue necesita
            librerías ni conceptos nuevos de React: es JavaScript aplicado al
            JSX.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Con un if y dos return">
        <p>
          La forma más legible cuando las dos versiones son{" "}
          <strong>muy distintas</strong>: preguntás arriba de todo y devolvés
          una cosa u otra. Se llama <em>salida temprana</em> porque si entrás al{" "}
          <code>if</code>, el <code>return</code> corta la función y el resto ni
          se ejecuta.
        </p>
        <Codigo
          archivo="app/react/renderizado-condicional/SalidaTempranaDemo.js"
          resaltar={[3, 4, 5, 17]}
          codigo={`function Bienvenida({ usuario }) {
  // Salida temprana: si no hay usuario, el resto de la función ni se ejecuta.
  if (usuario === null) {
    return <p>Todavía no iniciaste sesión.</p>;
  }

  return (
    <p>
      Hola de nuevo, <strong>{usuario.nombre}</strong>.
      Tenés {usuario.mensajes} mensajes sin leer.
    </p>
  );
}

function AvisoDeMantenimiento({ activo }) {
  // null no es un string vacío ni un div escondido: no llega nada al HTML.
  if (!activo) return null;

  return <p>El sistema se actualiza hoy a las 23:00.</p>;
}`}
        />
        <p>
          El segundo componente devuelve <code>null</code>. React entiende{" "}
          <code>null</code> como <q>no pongas nada en pantalla</q>: no deja un
          div vacío ni un espacio, directamente no existe en el HTML. Tocá los
          dos botones y mirá cómo cambia cada recuadro.
        </p>
        <Demo titulo="Salida temprana y null">
          <SalidaTempranaDemo />
        </Demo>
        <Nota tipo="atencion" titulo="Escribí return null, no un return pelado">
          <p>
            Un <code>return</code> sin nada devuelve <code>undefined</code>.
            Desde React 18 eso ya no tira error: React tampoco dibuja nada, igual
            que con <code>null</code>. Aun así escribí <code>return null;</code>,
            porque deja clarísimo que <em>querías</em> no mostrar nada y no que
            te olvidaste de devolver algo.
          </p>
          <p className="tenue">
            Además te salva de un clásico: si escribís <code>return</code> y
            arrancás el JSX en la línea de abajo, JavaScript te mete un punto y
            coma después del <code>return</code> y la función termina devolviendo{" "}
            <code>undefined</code> (pantalla en blanco, sin ningún error). Por eso
            el JSX de varias líneas va entre paréntesis abiertos en la misma línea
            del <code>return</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El ternario adentro del JSX">
        <p>
          Cuando la diferencia es chica y está en el medio de la pantalla, no
          tiene sentido duplicar todo el <code>return</code>. Ahí va el ternario,
          que es una expresión y entonces sí entra entre llaves:
        </p>
        <Codigo
          archivo="jsx"
          codigo={`// condición ? loQueVaSiEsVerdadero : loQueVaSiEsFalso

<div>
  {estaConectado ? <Perfil /> : <Ingresar />}
</div>

// También sirve para un texto suelto...
<p>{estaConectado ? "En línea" : "Desconectado"}</p>

// ...o para el valor de un atributo.
<button className={activo ? "boton" : "boton boton-suave"}>Guardar</button>`}
        />
        <p>
          Si alguna de las dos ramas ocupa varias líneas, envolvela en
          paréntesis para que se lea bien. Y acordate de que{" "}
          <strong>siempre se elige una de las dos</strong>: si querés <q>o se
          muestra o no hay nada</q>, lo que necesitás es lo que viene ahora.
        </p>
      </Seccion>

      <Seccion titulo="El operador && y la trampa del cero">
        <p>
          Para el caso <q>o se muestra, o no se muestra nada</q> el ternario
          queda feo (<code>{"cond ? <Aviso /> : null"}</code>). Se escribe con{" "}
          <code>&&</code>: si la izquierda es verdadera, React dibuja lo de la
          derecha; si es falsa, no dibuja nada.
        </p>
        <Codigo
          archivo="jsx"
          codigo={`// Si hayErrores es true se dibuja el <p>. Si es false, no se dibuja nada.
{hayErrores && <p>Revisá el formulario.</p>}`}
        />
        <p>
          Hasta ahí todo bien. El problema es que <code>&&</code> no devuelve{" "}
          <code>true</code> o <code>false</code>: cuando el valor de la izquierda
          es <em>falsy</em>, devuelve <strong>ese mismo valor</strong>. Y el{" "}
          <code>0</code> es falsy... pero React sí dibuja los números. Poné un{" "}
          <code>0</code> en el input y mirá la columna de la izquierda:
        </p>
        <Demo titulo="El cero fantasma">
          <CeroFantasmaDemo />
        </Demo>
        <Comparacion>
          <Columna tono="mal" titulo="Aparece un 0 suelto">
            <Codigo
              archivo="Carrito.js"
              codigo={`// Con cantidad = 0 esto no deja el lugar vacío:
// la expresión vale 0 y React dibuja un 0 suelto.
{cantidad && <p>Tenés {cantidad} productos.</p>}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Comparás y listo">
            <Codigo
              archivo="Carrito.js"
              codigo={`// cantidad > 0 ya es true o false,
// y los booleanos React no los dibuja.
{cantidad > 0 && <p>Tenés {cantidad} productos.</p>}`}
            />
          </Columna>
        </Comparacion>
        <Nota tipo="atencion" titulo="La trampa del cero: el bug más frecuente de React">
          <p>
            Pasa siempre con longitudes y contadores:{" "}
            <code>{"{lista.length && ...}"}</code> con una lista vacía te planta
            un <code>0</code> en el medio del diseño. La regla es simple: a la
            izquierda del <code>&&</code> tiene que haber una{" "}
            <strong>comparación</strong>, no un número. Escribí{" "}
            <code>lista.length &gt; 0 &&</code> y el fantasma desaparece.
          </p>
          <p className="tenue">
            ¿Por qué el <code>0</code> sí se ve y <code>false</code> no? Porque
            React ignora <code>null</code>, <code>undefined</code>,{" "}
            <code>true</code> y <code>false</code>, pero los números y los
            strings los muestra tal cual. Con un string vacío pasa lo mismo:{" "}
            <code>{'nombre && <p>Hola</p>'}</code> con <code>nombre = &quot;&quot;</code> no
            rompe nada visualmente, pero por la misma razón conviene escribir{" "}
            <code>nombre !== &quot;&quot;</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Guardar el JSX en una variable">
        <p>
          El JSX es un valor como cualquier otro: lo podés guardar en una
          variable, pasarlo por props o meterlo en un arreglo. Cuando la
          decisión tiene tres o cuatro ramas, armá la variable arriba con{" "}
          <code>if</code> / <code>else if</code> y usala abajo. El{" "}
          <code>return</code> queda corto y se entiende de un vistazo.
        </p>
        <p>
          Este panel de pedido usa las tres técnicas en la misma pantalla:
          variable para el título, ternario para el subtítulo, <code>&&</code>{" "}
          para el seguimiento, y un sub-componente que devuelve{" "}
          <code>null</code> cuando el pedido está cancelado. Probá los cuatro
          estados.
        </p>
        <Demo titulo="Panel de estado de un pedido">
          <PanelPedidoDemo />
        </Demo>
        <Codigo
          archivo="app/react/renderizado-condicional/PanelPedidoDemo.js"
          resaltar={[19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 36]}
          codigo={`function DatosDeEnvio({ estado }) {
  // Salida temprana: un pedido cancelado no tiene nada que enviar.
  if (estado === "cancelado") return null;

  return (
    <p>
      Envío a <strong>Av. Siempreviva 742</strong>
      {estado === "entregado"
        ? " · entregado el martes 14:20"
        : " · llega el martes"}
    </p>
  );
}

export default function PanelPedidoDemo() {
  const [estado, setEstado] = useState("pendiente");
  const [verSeguimiento, setVerSeguimiento] = useState(false);

  // 1) Variable con JSX: la decisión es larga, así el return queda corto.
  let titulo;
  if (estado === "pendiente") {
    titulo = <h3>Estamos preparando tu pedido</h3>;
  } else if (estado === "en-camino") {
    titulo = <h3>Tu pedido salió del depósito</h3>;
  } else if (estado === "entregado") {
    titulo = <h3>Entregado, ¡que lo disfrutes!</h3>;
  } else {
    titulo = <h3>Pedido cancelado</h3>;
  }

  return (
    <div>
      {/* Acá va la fila de botones que llama a setEstado. */}

      <div className="tarjeta">
        {titulo}

        {/* 2) Ternario: en el mismo lugar, una cosa u otra. */}
        <p>
          {estado === "cancelado"
            ? "Te devolvemos la plata en 48 horas."
            : "Pedido #4821 · 3 productos · $42.500"}
        </p>

        <DatosDeEnvio estado={estado} />

        {/* 3) && : o aparece el botón, o no aparece nada. */}
        {estado === "en-camino" && (
          <button
            type="button"
            className="boton"
            onClick={() => setVerSeguimiento(!verSeguimiento)}
          >
            {verSeguimiento ? "Ocultar seguimiento" : "Ver seguimiento"}
          </button>
        )}

        {/* Dos condiciones encadenadas: solo si está en camino Y lo pediste. */}
        {estado === "en-camino" && verSeguimiento && (
          <p className="tenue">
            09:10 salió del depósito · 11:45 en el centro de distribución ·
            13:30 en reparto
          </p>
        )}
      </div>
    </div>
  );
}`}
        />
      </Seccion>

      <Seccion titulo="Muchos estados: un objeto, no ternarios anidados">
        <p>
          La tentación, cuando hay cuatro casos, es encadenar ternarios. Escribir
          eso lleva dos minutos; leerlo dentro de un mes, media hora. Si cada
          estado tiene un contenido asociado, guardalo en un objeto y buscá por
          clave: el JSX se vuelve una sola línea y agregar un estado nuevo es
          agregar un renglón al objeto.
        </p>
        <Comparacion>
          <Columna tono="mal" titulo="Ternarios anidados">
            <Codigo
              archivo="PanelPedido.js"
              codigo={`<p>
  {estado === "pendiente"
    ? "Preparando"
    : estado === "en-camino"
      ? "En camino"
      : estado === "entregado"
        ? "Entregado"
        : "Cancelado"}
</p>`}
            />
          </Columna>
          <Columna tono="bien" titulo="Un objeto que mapea estado a contenido">
            <Codigo
              archivo="app/react/renderizado-condicional/MapaDeEstadosDemo.js"
              codigo={`// En el archivo real cada cartel lleva además un color.
const CARTELES = {
  pendiente: { icono: "🕒", texto: "Estamos preparando tu pedido." },
  "en-camino": { icono: "🚚", texto: "Tu pedido está en camino." },
  entregado: { icono: "📦", texto: "Entregado el martes a las 14:20." },
  cancelado: { icono: "🚫", texto: "Pedido cancelado." },
};

// Plan B para cualquier estado que no esté en el objeto.
const DESCONOCIDO = {
  icono: "❔",
  texto: "Estado desconocido, escribinos.",
};

// ?? usa el plan B solo si CARTELES[estado] es undefined o null.
const cartel = CARTELES[estado] ?? DESCONOCIDO;

<div className="fila">
  <span>{cartel.icono}</span>
  <strong>{cartel.texto}</strong>
</div>`}
            />
          </Columna>
        </Comparacion>
        <Demo titulo="Un objeto en vez de cuatro ternarios">
          <MapaDeEstadosDemo />
        </Demo>
        <p>
          Tocá el botón <code>devuelto</code>: ese estado no está en el objeto,
          así que <code>CARTELES[&quot;devuelto&quot;]</code> vale{" "}
          <code>undefined</code> y entra el plan B del <code>??</code>. Sin esa
          red de seguridad la página rompería al leer <code>.texto</code> de{" "}
          <code>undefined</code>.
        </p>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. La lista vacía"
          pista={
            <p>
              <code>tareas.length</code> es un número. Si lo ponés pelado a la
              izquierda de un <code>&&</code> ya sabés lo que va a pasar. Acá
              además querés mostrar <strong>dos cosas distintas</strong>, no una
              o nada: pensá en el ternario, o en un <code>if</code> arriba del{" "}
              <code>return</code>.
            </p>
          }
          solucion={
            <Codigo
              archivo="ListaDeTareas.js"
              codigo={`function ListaDeTareas({ tareas }) {
  // Con salida temprana, que es lo más legible cuando el caso vacío
  // se ve totalmente distinto.
  if (tareas.length === 0) {
    return <p>No tenés tareas pendientes. 🎉</p>;
  }

  return (
    <ul>
      {tareas.map((tarea) => (
        <li key={tarea.id}>{tarea.texto}</li>
      ))}
    </ul>
  );
}

// La misma idea con un ternario, si preferís tener un solo return:
// {tareas.length === 0
//   ? <p>No tenés tareas pendientes. 🎉</p>
//   : <ul>{tareas.map(...)}</ul>}`}
            />
          }
        >
          <p>
            Escribí un componente <code>ListaDeTareas</code> que reciba un
            arreglo <code>tareas</code> y muestre{" "}
            <q>No tenés tareas pendientes</q> cuando está vacío, y la lista con{" "}
            <code>map</code> cuando tiene elementos. Probalo con un arreglo vacío
            y con uno de tres tareas.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Cazar al cero fantasma"
          pista={
            <p>
              Fijate qué valor tiene <code>noLeidos</code> cuando la bandeja está
              al día, y qué devuelve <code>&&</code> con ese valor. Hay dos
              líneas para arreglar, no una: revisá también la del carrito.
            </p>
          }
          solucion={
            <Codigo
              archivo="Notificaciones.js"
              resaltar={[4, 7]}
              codigo={`function Notificaciones({ noLeidos, productos }) {
  return (
    <div>
      {noLeidos > 0 && <p>Tenés {noLeidos} mensajes sin leer.</p>}

      {/* Con arreglos pasa lo mismo: .length es un número. */}
      {productos.length > 0 && <p>{productos.length} productos en el carrito.</p>}
    </div>
  );
}

// Con noLeidos = 0 y productos = [] ahora no se dibuja nada,
// porque las dos condiciones son comparaciones: true o false.`}
            />
          }
        >
          <p>
            Este componente muestra dos ceros sueltos en pantalla cuando no hay
            nada que avisar. Arreglalo sin cambiar lo que muestra en los demás
            casos.
          </p>
          <Codigo
            archivo="Notificaciones.js"
            codigo={`function Notificaciones({ noLeidos, productos }) {
  return (
    <div>
      {noLeidos && <p>Tenés {noLeidos} mensajes sin leer.</p>}
      {productos.length && <p>{productos.length} productos en el carrito.</p>}
    </div>
  );
}

// <Notificaciones noLeidos={0} productos={[]} />  →  se ven dos ceros`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
