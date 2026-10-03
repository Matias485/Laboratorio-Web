import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import BancoDeBugs from "./BancoDeBugs";
import ListaDeTareas from "./ListaDeTareas";

export const metadata = { title: "Desafíos" };

export default function Pagina() {
  return (
    <Leccion
      slug="/react/desafios"
      titulo="Desafíos"
      resumen="Ejercicios para resolver vos, con pista y solución escondidas."
    >
      <Seccion titulo="Dónde escribir el código">
        <p>
          Creá una carpeta <code>app/practica</code> con un archivo{" "}
          <code>page.js</code> adentro y trabajá ahí. Apenas lo guardes vas a
          poder entrar a <code>http://localhost:3000/practica</code>. Empezá con
          esto:
        </p>
        <Codigo
          archivo="app/practica/page.js"
          codigo={`"use client";

import { useState } from "react";

export default function Practica() {
  return (
    <div>
      <h1>Mi banco de pruebas</h1>
      {/* acá abajo van tus ejercicios */}
    </div>
  );
}`}
        />
        <Nota tipo="info" titulo="Un consejo">
          <p>
            Resolvé primero y mirá la solución después, aunque te salga fea. La
            solución que vas a ver acá no es la única posible: si la tuya
            funciona y se entiende, está bien.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Encontrá el bug">
        <p>
          Cuatro pantallas rotas. Cada una tiene un error clásico, de los que
          vas a cometer sin darte cuenta. Miralas funcionando (o no funcionando),
          adiviná qué pasa y recién después tocá los botones.
        </p>
        <BancoDeBugs />
      </Seccion>

      <Seccion titulo="Nivel 1 · Componentes y JSX">
        <Desafio
          titulo="Tarjeta de materia"
          pista={
            <p>
              Un componente es una función que empieza con mayúscula y devuelve
              JSX. Acordate de que solo puede devolver un elemento raíz: envolvé
              todo en un <code>&lt;div&gt;</code> o en un Fragment.
            </p>
          }
          solucion={
            <Codigo
              archivo="solución"
              codigo={`function TarjetaDeMateria() {
  return (
    <div style={{ border: "1px solid gray", padding: 12 }}>
      <h3>Taller de Programación II</h3>
      <p>Ingeniería en Informática · 2026</p>
    </div>
  );
}

export default function Practica() {
  return (
    <div>
      <TarjetaDeMateria />
      <TarjetaDeMateria />
    </div>
  );
}`}
            />
          }
        >
          <p>
            Escribí un componente <code>TarjetaDeMateria</code> que muestre el
            nombre de la materia en un <code>h3</code> y la carrera en un{" "}
            <code>p</code>, todo adentro de un <code>div</code> con borde.
            Después usalo dos veces seguidas.
          </p>
        </Desafio>

        <Desafio
          titulo="De HTML a JSX"
          pista={
            <p>
              Hay cuatro cosas para cambiar: el atributo de clase, el atributo
              del label, una etiqueta que no está cerrada y otra que tampoco.
            </p>
          }
          solucion={
            <Codigo
              archivo="solución"
              codigo={`<form className="formulario">
  <label htmlFor="mail">Correo</label>
  <input id="mail" type="email" />
  <br />
  <button>Enviar</button>
</form>`}
            />
          }
        >
          <p>Convertí este HTML en JSX válido:</p>
          <Codigo
            archivo="html"
            codigo={`<form class="formulario">
  <label for="mail">Correo</label>
  <input id="mail" type="email">
  <br>
  <button>Enviar</button>
</form>`}
          />
        </Desafio>

        <Desafio
          titulo="Llaves por todos lados"
          pista={
            <p>
              Todo lo que va entre llaves es JavaScript común: podés hacer
              cuentas, llamar funciones y armar objetos. Para{" "}
              <code>style</code> necesitás dos llaves porque le estás pasando un
              objeto.
            </p>
          }
          solucion={
            <Codigo
              archivo="solución"
              codigo={`const alumno = { nombre: "Ana", notas: [8, 6, 10] };

export default function Boletin() {
  const promedio = alumno.notas.reduce((a, b) => a + b, 0) / alumno.notas.length;
  const aprobo = promedio >= 6;

  return (
    <p style={{ color: aprobo ? "green" : "red" }}>
      {alumno.nombre} tiene un promedio de {promedio.toFixed(2)}.
    </p>
  );
}`}
            />
          }
        >
          <p>
            Partiendo de un objeto{" "}
            <code>{"{ nombre: \"Ana\", notas: [8, 6, 10] }"}</code>, mostrá un
            párrafo que diga el nombre y el promedio con dos decimales. El texto
            tiene que salir verde si el promedio llega a 6 y rojo si no.
          </p>
        </Desafio>
      </Seccion>

      <Seccion titulo="Nivel 2 · Props y eventos">
        <Desafio
          titulo="Tarjeta configurable"
          pista={
            <p>
              Las props se reciben destructurando el objeto que llega como
              parámetro, y ahí mismo se les puede poner un valor por defecto:{" "}
              <code>{"function Tarjeta({ color = \"gray\" })"}</code>.
            </p>
          }
          solucion={
            <Codigo
              archivo="solución"
              codigo={`function Tarjeta({ titulo, color = "gray", children }) {
  return (
    <div style={{ border: "2px solid " + color, padding: 12, marginBottom: 8 }}>
      <h3 style={{ color: color, marginTop: 0 }}>{titulo}</h3>
      {children}
    </div>
  );
}

export default function Practica() {
  return (
    <div>
      <Tarjeta titulo="Aprobado" color="green">
        <p>Promedio 8.5</p>
      </Tarjeta>
      <Tarjeta titulo="Sin color">
        <p>Uso el color por defecto.</p>
      </Tarjeta>
    </div>
  );
}`}
            />
          }
        >
          <p>
            Hacé un componente <code>Tarjeta</code> que reciba{" "}
            <code>titulo</code>, <code>color</code> (con &quot;gray&quot; por
            defecto) y <code>children</code>. El borde y el título usan el color
            recibido. Usalo dos veces, una con color y otra sin.
          </p>
        </Desafio>

        <Desafio
          titulo="Que no se disparen los dos"
          pista={
            <p>
              El evento viaja de adentro hacia afuera. Para cortarlo, el
              manejador de adentro tiene que recibir el evento y llamar a{" "}
              <code>e.stopPropagation()</code>.
            </p>
          }
          solucion={
            <Codigo
              archivo="solución"
              codigo={`<div onClick={() => abrirDetalle()}>
  <h3>Producto</h3>
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      agregarAlCarrito();
    }}
  >
    Agregar al carrito
  </button>
</div>`}
            />
          }
        >
          <p>
            Tenés una tarjeta de producto que al hacerle click abre el detalle, y
            adentro un botón &quot;Agregar al carrito&quot;. Hoy, al tocar el
            botón, también se abre el detalle. Arreglalo.
          </p>
        </Desafio>

        <Desafio
          titulo="El botón que se dispara solo"
          pista={
            <p>
              Fijate si en algún lado hay paréntesis de más. Y acordate de que
              para pasarle un argumento a un manejador hay que envolverlo en una
              función flecha.
            </p>
          }
          solucion={
            <Codigo
              archivo="solución"
              codigo={`export default function Lista() {
  function borrar(id) {
    console.log("borrando", id);
  }

  return (
    <ul>
      <li>
        Item 1
        <button type="button" onClick={() => borrar(1)}>Borrar</button>
      </li>
    </ul>
  );
}`}
            />
          }
        >
          <p>Este código borra el item apenas se carga la página. ¿Por qué?</p>
          <Codigo
            archivo="con el bug"
            codigo={`<button onClick={borrar(1)}>Borrar</button>`}
          />
        </Desafio>
      </Seccion>

      <Seccion titulo="Nivel 3 · Estado">
        <Desafio
          titulo="Contador con límites"
          pista={
            <p>
              Como el valor nuevo depende del anterior, usá la función
              actualizadora: <code>{"setCuenta((c) => c + 1)"}</code>. Para los
              límites te sirven <code>Math.min</code> y <code>Math.max</code>, o
              un <code>if</code> adentro del manejador.
            </p>
          }
          solucion={
            <Codigo
              archivo="solución"
              codigo={`import { useState } from "react";

export default function Contador() {
  const [cuenta, setCuenta] = useState(0);

  return (
    <div>
      <p>{cuenta}</p>
      <button type="button" onClick={() => setCuenta((c) => Math.max(0, c - 1))} disabled={cuenta === 0}>
        −
      </button>
      <button type="button" onClick={() => setCuenta((c) => Math.min(10, c + 1))} disabled={cuenta === 10}>
        +
      </button>
      <button type="button" onClick={() => setCuenta(0)}>Reiniciar</button>
    </div>
  );
}`}
            />
          }
        >
          <p>
            Un contador con botones de sumar, restar y reiniciar, que no pueda
            bajar de 0 ni pasar de 10. Cuando llega a un límite, el botón
            correspondiente se deshabilita.
          </p>
        </Desafio>

        <Desafio
          titulo="Ficha editable"
          pista={
            <p>
              Un solo <code>useState</code> con un objeto, y un solo manejador
              que use el atributo <code>name</code> de cada input:{" "}
              <code>{"setFicha({ ...ficha, [e.target.name]: e.target.value })"}</code>
              .
            </p>
          }
          solucion={
            <Codigo
              archivo="solución"
              codigo={`import { useState } from "react";

export default function Ficha() {
  const [ficha, setFicha] = useState({ nombre: "", legajo: "", carrera: "" });

  function manejarCambio(e) {
    setFicha({ ...ficha, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <input name="nombre" value={ficha.nombre} onChange={manejarCambio} />
      <input name="legajo" value={ficha.legajo} onChange={manejarCambio} />
      <input name="carrera" value={ficha.carrera} onChange={manejarCambio} />
      <pre>{JSON.stringify(ficha, null, 2)}</pre>
    </div>
  );
}`}
            />
          }
        >
          <p>
            Una ficha de alumno con tres campos (nombre, legajo, carrera)
            guardados en un <strong>solo</strong> objeto de estado y manejados
            por un <strong>solo</strong> manejador. Abajo, mostrá el objeto
            completo con <code>JSON.stringify(ficha, null, 2)</code> adentro de
            un <code>pre</code>.
          </p>
        </Desafio>

        <Desafio
          titulo="Subir un elemento de lugar"
          pista={
            <p>
              <code>sort</code> y <code>reverse</code> mutan el arreglo: no
              sirven. Copiá primero con el spread y después intercambiá las dos
              posiciones en la copia.
            </p>
          }
          solucion={
            <Codigo
              archivo="solución"
              codigo={`function subir(indice) {
  if (indice === 0) return; // ya está arriba de todo

  const copia = [...items];
  copia[indice - 1] = items[indice];
  copia[indice] = items[indice - 1];
  setItems(copia);
}`}
            />
          }
        >
          <p>
            Dada una lista en el estado, escribí la función{" "}
            <code>subir(indice)</code> que mueva un elemento una posición hacia
            arriba, <strong>sin mutar</strong> el arreglo original. Si ya está
            primero, no hace nada.
          </p>
        </Desafio>
      </Seccion>

      <Seccion titulo="Proyecto final · Lista de tareas">
        <p>
          Este junta todo: componentes, props, eventos, estado, arreglos,
          objetos, listas con <code>key</code>, renderizado condicional y un
          formulario controlado. Es el ejercicio que más se parece a algo real.
        </p>

        <Desafio
          titulo="Armá tu lista de tareas"
          pista={
            <>
              <p>El estado te alcanza con tres valores:</p>
              <Codigo
                archivo="pista"
                codigo={`const [tareas, setTareas] = useState([]);   // arreglo de objetos
const [texto, setTexto] = useState("");     // el input controlado
const [filtro, setFiltro] = useState("todas");`}
              />
              <p>
                Cada tarea es un objeto{" "}
                <code>{"{ id, texto, completada }"}</code>. Para marcarla usá{" "}
                <code>map</code> con spread, para borrarla <code>filter</code>.
                El contador de pendientes <strong>no</strong> va en un estado
                aparte: calculalo con <code>filter</code> en cada render.
              </p>
            </>
          }
          solucion={
            <>
              <p>Así queda funcionando:</p>
              <Demo titulo="Solución de referencia">
                <ListaDeTareas />
              </Demo>
              <p>
                El código completo está en{" "}
                <code>app/react/desafios/ListaDeTareas.js</code>: abrilo y comparalo
                con el tuyo.
              </p>
            </>
          }
        >
          <p>Tiene que poder:</p>
          <ol>
            <li>Agregar una tarea escribiendo en un input y apretando Enter.</li>
            <li>Marcar y desmarcar una tarea como completada.</li>
            <li>Borrar una tarea.</li>
            <li>Filtrar entre todas, pendientes y completadas.</li>
            <li>Mostrar cuántas tareas quedan pendientes.</li>
            <li>Borrar de una todas las completadas.</li>
          </ol>
          <p>
            No se puede agregar una tarea vacía, y el botón de agregar tiene que
            estar deshabilitado mientras el input esté vacío.
          </p>
        </Desafio>

        <Nota tipo="ok" titulo="Si te salió">
          <p>
            Probá agregarle una cosa más: que al hacer doble click sobre el texto
            de una tarea se pueda editar. Vas a necesitar un estado que guarde
            qué tarea se está editando.
          </p>
        </Nota>
      </Seccion>
    </Leccion>
  );
}
