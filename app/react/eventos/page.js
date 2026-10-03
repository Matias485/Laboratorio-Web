import Link from "next/link";

import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";

import BotonBasicoDemo from "./BotonBasicoDemo";
import LlamarOPasarDemo from "./LlamarOPasarDemo";
import BotonDeAvisoDemo from "./BotonDeAvisoDemo";
import ObjetoDelEventoDemo from "./ObjetoDelEventoDemo";
import PropagacionDemo from "./PropagacionDemo";
import FormularioDemo from "./FormularioDemo";

export const metadata = { title: "Eventos" };

export default function Pagina() {
  return (
    <Leccion
      slug="/react/eventos"
      titulo="Eventos"
      resumen="onClick, propagación de eventos, stopPropagation y preventDefault."
    >
      <Seccion titulo="Un botón que responde">
        <p>
          Hasta acá tus componentes dibujaban cosas. Un{" "}
          <strong>manejador de evento</strong> es una función común que React
          ejecuta cuando el usuario hace algo: un click, escribir en un input,
          enviar un formulario.
        </p>
        <p>
          Son dos pasos. Definís la función adentro del componente, y se la
          pasás al elemento por una prop que arranca con <code>on</code>.
        </p>

        <Codigo
          codigo={`export default function Boton() {
  function manejarClick() {
    alert("¡Me tocaste!");
  }

  return <button onClick={manejarClick}>Tocame</button>;
}`}
        />

        <p>
          Ese mismo manejador se puede escribir de tres maneras. Las tres hacen
          exactamente lo mismo: lo único que cambia es dónde escribís la
          función.
        </p>

        <Codigo
          codigo={`// 1. Como una función aparte, definida adentro del componente.
function manejarClick() {
  alert("¡Me tocaste!");
}

<button onClick={manejarClick}>Tocame</button>

// 2. Escrita en el lugar, adentro de las llaves del onClick.
<button onClick={function manejarClick() {
  alert("¡Me tocaste!");
}}>
  Tocame
</button>

// 3. Con una función flecha, que es lo mismo pero más corto.
//    Para manejadores de una o dos líneas es la forma más común.
<button onClick={() => {
  alert("¡Me tocaste!");
}}>
  Tocame
</button>`}
        />

        <Nota tipo="atencion" titulo="En los tres casos el alert queda adentro">
          <p>
            Fijate que en las tres formas el <code>alert</code> está{" "}
            <em>adentro</em> de una función. Esa es toda la clave, y en la
            sección que sigue vas a ver qué pasa cuando no lo está.
          </p>
        </Nota>

        <p>
          El primero es el ejemplo de la diapositiva. Acá abajo tenés ese mismo
          botón, pero en vez de <code>alert()</code> escribe en un panel: un{" "}
          <code>alert</code> frena la página entera hasta que le das
          &quot;Aceptar&quot;, y para un laboratorio es insoportable.
        </p>

        <Demo titulo="Demo en vivo · el botón básico">
          <BotonBasicoDemo />
        </Demo>

        <Codigo
          archivo="app/react/eventos/BotonBasicoDemo.js"
          resaltar={[24]}
          codigo={`"use client";

import { useState } from "react";
import PanelRegistro from "./PanelRegistro";

let proximoId = 1;

export default function BotonBasicoDemo() {
  const [registro, setRegistro] = useState([]);

  // 1. La función manejadora se define ADENTRO del componente.
  //    En la diapositiva esta función hacía alert("¡Me tocaste!").
  function manejarClick() {
    const id = proximoId++;
    setRegistro((anteriores) =>
      [...anteriores, { id, texto: "¡Me tocaste!" }].slice(-6),
    );
  }

  // 2. Se la pasás al botón SIN paréntesis: pasás la función, no la llamás.
  return (
    <div>
      <div className="fila">
        <button type="button" className="boton" onClick={manejarClick}>
          Tocame
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setRegistro([])}
        >
          Limpiar
        </button>
      </div>
      <PanelRegistro lineas={registro} />
    </div>
  );
}`}
        />

        <Nota tipo="info" titulo="Dos líneas que todavía no vimos">
          <p>
            <code>useState</code> es el tema de la clase que viene. Por ahora
            leelo como &quot;una caja donde el componente se acuerda de algo
            entre un click y el otro&quot;. Lo que importa en esta lección es
            todo lo demás.
          </p>
          <p>
            Y ese <code>&quot;use client&quot;</code> de la primera línea es
            cosa de Next.js: sin él, el archivo se ejecutaría solo en el
            servidor y no habría clicks que manejar. Está contado en{" "}
            <Link href="/sobre-next">Cómo funciona este proyecto</Link>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La trampa: pasar la función, no llamarla">
        <p>
          Esta es la confusión número uno con eventos, y la vas a cometer. La
          diferencia entre <code>manejarClick</code> y{" "}
          <code>manejarClick()</code> es enorme:
        </p>
        <ul>
          <li>
            <code>manejarClick</code> (sin paréntesis) es <em>la función</em>.
            Se la das a React y React la guarda para ejecutarla cuando haya un
            click.
          </li>
          <li>
            <code>manejarClick()</code> (con paréntesis) es{" "}
            <em>el resultado de ejecutarla ahora mismo</em>. Se ejecuta durante
            el render y a React le llega lo que esa función haya devuelto:
            normalmente <code>undefined</code>.
          </li>
        </ul>

        <Comparacion>
          <Columna tono="mal" titulo="Se dispara al renderizar">
            <Codigo
              codigo={`// Se ejecuta apenas React dibuja el componente.
<button onClick={alert("hola")}>Tocame</button>

// Lo mismo con tu función: los paréntesis la llaman.
<button onClick={manejarClick()}>Tocame</button>`}
            />
          </Columna>
          <Columna tono="bien" titulo="Se dispara al hacer click">
            <Codigo
              codigo={`// La flecha es una función nueva que envuelve la llamada.
<button onClick={() => alert("hola")}>Tocame</button>

// O directamente pasás la función, sin llamarla.
<button onClick={manejarClick}>Tocame</button>`}
            />
          </Columna>
        </Comparacion>

        <p>
          En el demo, el primer botón está roto a propósito. Fijate que el aviso
          rojo aparece <strong>antes</strong> de que toques nada, y que el botón
          roto no hace absolutamente nada cuando lo clickeás.
        </p>

        <Demo titulo="Demo en vivo · un botón roto y dos que andan">
          <LlamarOPasarDemo />
        </Demo>

        <Codigo
          archivo="app/react/eventos/LlamarOPasarDemo.js"
          resaltar={[14]}
          codigo={`// Esta lista se crea de cero en cada render. Si al terminar de armar el
// JSX tiene algo adentro, es porque alguien ejecutó la función de abajo
// mientras React dibujaba, sin que nadie tocara nada.
const avisosDelRender = [];

// ✗ Este es el manejador "roto". Fijate abajo: lo llamamos con paréntesis.
function avisarAlRenderizar() {
  avisosDelRender.push(registro.length);
}

return (
  <div className="fila">
    {/* ✗ MAL: los paréntesis la ejecutan AHORA, durante el render. */}
    <button type="button" className="boton" onClick={avisarAlRenderizar()}>
      Botón roto
    </button>

    {/* ✓ BIEN: pasás la función y React la guarda para después. */}
    <button type="button" className="boton" onClick={manejarClick}>
      Botón correcto
    </button>

    {/* ✓ BIEN: la flecha es una función nueva que envuelve la llamada. */}
    <button
      type="button"
      className="boton"
      onClick={() => anotar("onClick={() => anotar(...)} → click ✓")}
    >
      Botón con flecha
    </button>
  </div>
);`}
        />

        <Nota tipo="atencion" titulo="Cómo se nota en la vida real">
          <p>
            Si el manejador hace un <code>alert</code>, el cartel te aparece
            apenas carga la pantalla y{" "}
            <strong>otra vez en cada re-render</strong>. Y si lo que hace es
            cambiar estado, es peor todavía: cambiar estado provoca un
            re-render, el re-render vuelve a ejecutar la función, y se te
            cuelga la pestaña en un bucle infinito. Cuando veas eso, andá a
            mirar los <code>onClick</code>: te sobran paréntesis.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Nombres, props y datos para el manejador">
        <p>Hay dos convenciones que vas a ver en todo el código de React:</p>
        <ul>
          <li>
            La función que responde a un evento se llama{" "}
            <code>manejarAlgo</code> (en inglés, <code>handleSomething</code>):{" "}
            <code>manejarClick</code>, <code>manejarEnvio</code>,{" "}
            <code>manejarCambio</code>.
          </li>
          <li>
            La prop por la que un componente <em>recibe</em> una función se
            llama <code>onAlgo</code>: <code>onClick</code>,{" "}
            <code>onPedir</code>, <code>onCerrar</code>.
          </li>
        </ul>

        <Codigo
          archivo="app/react/eventos/BotonDeAvisoDemo.js"
          codigo={`// La función manejadora: manejarAlgo.
// La prop por la que llega una función desde el padre: onAlgo.
function BotonPedido({ plato, onPedir }) {
  function manejarClick() {
    onPedir(plato);
  }

  return (
    <button type="button" className="boton" onClick={manejarClick}>
      Pedir {plato}
    </button>
  );
}`}
        />

        <p>
          ¿Y si el manejador necesita un dato? No podés escribir{" "}
          <code>{"onClick={avisar(mensaje)}"}</code>, porque eso lo llama al
          renderizar. Lo envolvés en una <strong>función flecha</strong>: esa
          flecha se acuerda del valor de <code>mensaje</code> que había cuando
          se creó.
        </p>

        <Codigo
          archivo="app/react/eventos/BotonDeAvisoDemo.js"
          resaltar={[5]}
          codigo={`function BotonDeAviso({ mensaje, avisar, children }) {
  return (
    <button
      type="button"
      onClick={() => avisar(mensaje)}
    >
      {children}
    </button>
  );
}

// El padre decide qué avisa cada uno:
<BotonDeAviso mensaje="¡Reproduciendo!" avisar={avisar}>Reproducir película</BotonDeAviso>
<BotonDeAviso mensaje="¡Subiendo imagen!" avisar={avisar}>Subir imagen</BotonDeAviso>`}
        />

        <Demo titulo="Demo en vivo · el mismo botón con props distintas">
          <BotonDeAvisoDemo />
        </Demo>
      </Seccion>

      <Seccion titulo="El objeto del evento">
        <p>
          React le pasa a todo manejador un argumento con la información de lo
          que pasó. Por convención se lo llama <code>e</code>. Los tres que vas
          a usar todo el tiempo:
        </p>
        <ul>
          <li>
            <code>e.target</code>: el elemento exacto donde ocurrió el evento.
            Si tocaste una imagen adentro de un div, es la imagen.
          </li>
          <li>
            <code>e.currentTarget</code>: el elemento que tiene puesto{" "}
            <em>este</em> manejador. Siempre el div.
          </li>
          <li>
            <code>e.target.value</code>: en un input, lo que hay escrito.
          </li>
        </ul>

        <Demo titulo="Demo en vivo · target vs currentTarget">
          <ObjetoDelEventoDemo />
        </Demo>

        <Codigo
          archivo="app/react/eventos/ObjetoDelEventoDemo.js"
          codigo={`function manejarClickEnLaCaja(e) {
  // e.target: el elemento exacto que tocaste.
  // e.currentTarget: el elemento que tiene puesto este onClick.
  const donde = \`e.target = <\${e.target.tagName.toLowerCase()}>\`;
  const quien = \`e.currentTarget = <\${e.currentTarget.tagName.toLowerCase()}>\`;
  anotar(\`\${donde}   ·   \${quien}\`);
}

// En un input, lo que escribiste vive en e.target.value.
function manejarCambio(e) {
  setTexto(e.target.value);
}

// El onClick está en el div de afuera. Adentro hay un botón, un texto y una
// imagen: cada uno de ellos va a aparecer como e.target cuando lo toques,
// mientras que e.currentTarget siempre va a ser este div.
<div onClick={manejarClickEnLaCaja}>
  <button type="button" className="boton">un botón</button>
  <strong>un texto</strong>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</div>

<input className="entrada" value={texto} onChange={manejarCambio} />`}
        />

        <Nota tipo="info" titulo="Si no lo usás, no lo escribas">
          <p>
            El parámetro <code>e</code> llega siempre, pero solo lo declarás si
            lo vas a usar. <code>function manejarClick()</code> sin parámetros
            es perfectamente válido.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La propagación: el evento sube">
        <p>
          Cuando hacés click en un botón que está adentro de un div que también
          tiene <code>onClick</code>, <strong>se disparan los dos</strong>.
          Primero el de adentro, después el de afuera, hasta llegar a la raíz.
          A eso se le dice <em>propagación</em> o <em>burbujeo</em>: el evento
          sube como una burbuja.
        </p>
        <p>
          Tocá el botón del demo y mirá el orden. Después tocá el borde de la
          caja del medio: solo se disparan los dos de afuera, porque el evento
          arranca donde tocaste.
        </p>

        <Demo titulo="Demo en vivo · tres cajas anidadas">
          <PropagacionDemo />
        </Demo>

        <p>
          Para cortarlo, el manejador de adentro llama a{" "}
          <code>e.stopPropagation()</code>. El evento se frena ahí y los padres
          no se enteran. Prendé y apagá el checkbox del demo para ver la
          diferencia.
        </p>

        <Codigo
          archivo="app/react/eventos/PropagacionDemo.js"
          resaltar={[4]}
          codigo={`function manejarClickBoton(e) {
  anotar(e, "onClick del BOTÓN (lo más de adentro)");
  if (cortar) {
    e.stopPropagation();
    anotar(e, "e.stopPropagation() → el evento no sube más");
  }
}

return (
  <div onClick={manejarClickExterna}>
    caja EXTERNA
    <div onClick={manejarClickMedia}>
      caja DEL MEDIO
      <button type="button" onClick={manejarClickBoton}>
        Botón de adentro
      </button>
    </div>
  </div>
);`}
        />

        <Nota tipo="atencion" titulo="Esto explica bugs raros">
          <p>
            El caso clásico: una tarjeta entera es clickeable y adentro tiene un
            botón de &quot;Borrar&quot;. Tocás Borrar y además se abre el
            detalle de la tarjeta. No está roto: el evento subió. La solución es{" "}
            <code>e.stopPropagation()</code> en el manejador del botón.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="preventDefault: cancelar lo que hace el navegador">
        <p>
          Algunos elementos del HTML tienen un comportamiento propio, de fábrica,
          que no tiene nada que ver con React. Un <code>&lt;form&gt;</code>{" "}
          recarga la página al enviarse; un <code>&lt;a&gt;</code> navega a otra
          dirección. Para cancelarlo se usa <code>e.preventDefault()</code>.
        </p>
        <p>
          En el demo, probá primero con el checkbox apagado: lo que enviás
          aparece abajo y la página ni se mueve. Después prendelo y volvé a
          enviar: se recarga todo y los datos terminan en la barra de
          direcciones.
        </p>

        <Demo titulo="Demo en vivo · un formulario que no recarga">
          <FormularioDemo />
        </Demo>

        <Codigo
          archivo="app/react/eventos/FormularioDemo.js"
          resaltar={[7]}
          codigo={`function manejarEnvio(e) {
  // Esta primera línea es del demo, no de React: el checkbox de arriba saltea
  // el preventDefault a propósito, para que veas qué pasa cuando no está.
  if (dejarRecargar) return;

  // Sin esta línea el navegador manda el formulario y RECARGA la página.
  e.preventDefault();

  // En un submit, e.target es el <form>, así que podemos leerle los campos.
  const formulario = e.target;
  setEnviado({
    nombre: formulario.elements.nombre.value,
    materia: formulario.elements.materia.value,
  });
}

return (
  <form onSubmit={manejarEnvio}>
    <label htmlFor="eventos-alumno">Nombre</label>
    <input id="eventos-alumno" name="nombre" className="entrada" defaultValue="Ada" />

    <label htmlFor="eventos-materia">Materia</label>
    <input
      id="eventos-materia"
      name="materia"
      className="entrada"
      defaultValue="Taller de Programación II"
    />

    <button type="submit" className="boton">Enviar</button>
  </form>
);`}
        />

        <p>
          Se confunden todo el tiempo, así que quedate con esto: uno habla del{" "}
          <em>viaje del evento</em> y el otro de la <em>acción del navegador</em>
          . No son alternativas, son cosas distintas.
        </p>

        <Comparacion>
          <Columna tono="bien" titulo="e.stopPropagation()">
            <p>
              Corta el viaje del evento hacia arriba. Los manejadores de los
              elementos padres no se ejecutan.
            </p>
            <p className="tenue">
              Lo usás cuando un click de adentro está disparando también el de
              afuera.
            </p>
          </Columna>
          <Columna tono="bien" titulo="e.preventDefault()">
            <p>
              Cancela el comportamiento de fábrica del navegador: enviar el
              formulario, seguir un enlace, abrir el menú contextual.
            </p>
            <p className="tenue">
              El evento sigue subiendo igual. Solo evitás lo que iba a hacer el
              navegador.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="error" titulo="El error que vas a cometer">
          <p>
            Poner <code>e.preventDefault()</code> para que un botón adentro de
            una tarjeta no dispare el click de la tarjeta.{" "}
            <strong>No funciona</strong>: un botón no tiene comportamiento por
            defecto que cancelar (salvo el submit de un formulario). Lo que
            necesitás ahí es <code>e.stopPropagation()</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. El botón que avisa antes de tiempo"
          pista={
            <p>
              Mirá bien la última línea. ¿Le estás dando a <code>onClick</code>{" "}
              la función, o el resultado de ejecutarla?
            </p>
          }
          solucion={
            <>
              <p>
                Los paréntesis llaman a la función durante el render. Sacalos y
                pasá la función pelada:
              </p>
              <Codigo
                codigo={`// ✓ Le pasás la función. React la llama cuando haya un click.
<button type="button" onClick={manejarClick}>Borrar</button>

// ✓ Y si necesitás mandarle un dato, la envolvés en una flecha.
<button type="button" onClick={() => manejarBorrar(id)}>Borrar</button>`}
              />
            </>
          }
        >
          <p>
            Este botón muestra su aviso apenas carga la página, y después no
            responde a los clicks. Arreglalo cambiando una sola cosa.
          </p>
          <Codigo
            codigo={`export default function BotonDeBorrar() {
  function manejarClick() {
    alert("¿Seguro que querés borrar?");
  }

  return <button onClick={manejarClick()}>Borrar</button>;
}`}
          />
        </Desafio>

        <Desafio
          titulo="2. El botón adentro de la tarjeta clickeable"
          pista={
            <p>
              El problema no es el navegador, es que el evento sube. Necesitás
              frenarlo en el manejador del botón, y para eso te hace falta el
              objeto <code>e</code>.
            </p>
          }
          solucion={
            <>
              <p>
                Le damos al botón su propio manejador, que recibe <code>e</code>{" "}
                y corta la propagación antes de hacer lo suyo:
              </p>
              <Codigo
                codigo={`function Tarjeta({ producto }) {
  function manejarAgregar(e) {
    // Cortamos el viaje del evento: nunca llega al onClick del div.
    e.stopPropagation();
    agregarAlCarrito(producto);
  }

  return (
    <div onClick={() => abrirDetalle(producto)}>
      <h3>{producto.nombre}</h3>
      <button type="button" onClick={manejarAgregar}>
        Agregar al carrito
      </button>
    </div>
  );
}`}
              />
              <p className="tenue">
                Ojo: <code>e.preventDefault()</code> acá no sirve para nada. Un{" "}
                <code>&lt;button type=&quot;button&quot;&gt;</code> no tiene
                comportamiento por defecto que cancelar.
              </p>
            </>
          }
        >
          <p>
            La tarjeta entera abre el detalle del producto, y adentro hay un
            botón para agregar al carrito. Hoy, al tocar &quot;Agregar al
            carrito&quot;, se agrega <em>y además</em> se abre el detalle.
            Hacé que el botón haga solo lo suyo, sin tocar el{" "}
            <code>onClick</code> del div.
          </p>
          <Codigo
            codigo={`function Tarjeta({ producto }) {
  return (
    <div onClick={() => abrirDetalle(producto)}>
      <h3>{producto.nombre}</h3>
      <button type="button" onClick={() => agregarAlCarrito(producto)}>
        Agregar al carrito
      </button>
    </div>
  );
}`}
          />
        </Desafio>

        <Desafio
          titulo="3. El buscador que recarga la página"
          pista={
            <p>
              El <code>&lt;form&gt;</code> no está roto: está haciendo lo que
              hace un formulario de HTML desde siempre. Para que no lo haga, el
              manejador del <code>onSubmit</code> tiene que recibir{" "}
              <code>e</code> y cancelar ese comportamiento de fábrica.
            </p>
          }
          solucion={
            <>
              <p>
                Son dos cambios chiquitos: el manejador declara el parámetro{" "}
                <code>e</code> y arranca cancelando lo que iba a hacer el
                navegador.
              </p>
              <Codigo
                codigo={`// El manejador recibe el objeto del evento.
function manejarEnvio(e) {
  // Y lo primero que hace es cancelar el envío del navegador.
  e.preventDefault();
  setResultado("Buscando: " + consulta);
}`}
              />
              <p className="tenue">
                Acá <code>e.stopPropagation()</code> no sirve de nada: el
                problema no es que el evento suba, es lo que hace el navegador
                con el formulario.
              </p>
            </>
          }
        >
          <p>
            Este buscador va mostrando bien lo que tipeás, pero al apretar
            &quot;Buscar&quot; la página se recarga entera y se pierde todo.
            Arreglalo sin sacar el <code>&lt;form&gt;</code> ni cambiar el{" "}
            <code>type</code> del botón.
          </p>
          <Codigo
            codigo={`function Buscador() {
  const [consulta, setConsulta] = useState("");
  const [resultado, setResultado] = useState("");

  function manejarEnvio() {
    setResultado("Buscando: " + consulta);
  }

  return (
    <form onSubmit={manejarEnvio}>
      <input
        className="entrada"
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
      />
      <button type="submit" className="boton">Buscar</button>
      <p>{resultado}</p>
    </form>
  );
}`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
