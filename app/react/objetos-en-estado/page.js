import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import PuntoIncorrectoDemo from "./PuntoIncorrectoDemo";
import PuntoCorrectoDemo from "./PuntoCorrectoDemo";
import SpreadDemo from "./SpreadDemo";
import FichaArtistaDemo from "./FichaArtistaDemo";
import UnManejadorDemo from "./UnManejadorDemo";

export const metadata = { title: "Objetos en estado" };

export default function Pagina() {
  return (
    <Leccion
      slug="/react/objetos-en-estado"
      titulo="Objetos en estado"
      resumen="Mutar es incorrecto: hay que crear un objeto nuevo. Spread y objetos anidados."
    >
      <Seccion titulo="Un punto que debería seguir al mouse">
        <p>
          Los dos recuadros de abajo son casi el mismo componente: el mismo
          estado <code>{"{ x, y }"}</code> y el mismo{" "}
          <code>onPointerMove</code>. La diferencia que importa son dos líneas
          del manejador. Pasá el mouse por cada uno.
        </p>

        <Demo titulo="Demo en vivo · pasá el mouse por los dos recuadros">
          <Comparacion>
            <Columna tono="mal" titulo="Muta el objeto">
              <PuntoIncorrectoDemo />
            </Columna>
            <Columna tono="bien" titulo="Crea un objeto nuevo">
              <PuntoCorrectoDemo />
            </Columna>
          </Comparacion>
        </Demo>

        <p>
          En el recuadro rojo el punto se queda clavado donde arrancó por más
          que muevas el mouse, y los números de abajo tampoco cambian. Ahora
          apretá <strong>Forzar un re-render</strong>: el punto salta de golpe
          a donde dejaste el mouse y los números aparecen actualizados. Las
          coordenadas se estaban guardando bien todo el tiempo. Lo que faltaba
          era que alguien le avisara a React.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Incorrecto">
            <Codigo
              archivo="app/react/objetos-en-estado/PuntoIncorrectoDemo.js"
              resaltar={[16, 17]}
              codigo={`
"use client";

import { useState } from "react";

export default function PuntoIncorrectoDemo() {
  const [posicion, setPosicion] = useState({ x: 70, y: 85 }); // adentro del recuadro

  function alMover(e) {
    // getBoundingClientRect() nos dice dónde está el recuadro en la pantalla,
    // así las coordenadas quedan relativas al recuadro y no a la ventana.
    const caja = e.currentTarget.getBoundingClientRect();

    // ✗ Mutamos el objeto que ya está guardado en el estado.
    //   El linter marca estas dos líneas; las dejamos así a propósito.
    /* eslint-disable react-hooks/immutability */
    posicion.x = e.clientX - caja.left;
    posicion.y = e.clientY - caja.top;
    /* eslint-enable react-hooks/immutability */
  }

  return (
    <div style={estiloArea} onPointerMove={alMover}>
      <div
        style={{
          ...estiloPunto,
          transform: \`translate(\${posicion.x - 10}px, \${posicion.y - 10}px)\`,
        }}
      />
    </div>
  );
}

// El archivo real tiene además el contador forzados (el del botón "Forzar un
// re-render"), el botón "Reiniciar" (que sí usa setPosicion) y los dos objetos
// de estilo estiloArea y estiloPunto, más abajo en el mismo archivo.
`}
            />
          </Columna>
          <Columna tono="bien" titulo="Correcto">
            <Codigo
              archivo="app/react/objetos-en-estado/PuntoCorrectoDemo.js"
              resaltar={[12, 13, 14, 15]}
              codigo={`
"use client";

import { useState } from "react";

export default function PuntoCorrectoDemo() {
  const [posicion, setPosicion] = useState({ x: 70, y: 85 }); // adentro del recuadro

  function alMover(e) {
    const caja = e.currentTarget.getBoundingClientRect();

    // ✓ Objeto NUEVO. La referencia cambió, así que React vuelve a dibujar.
    setPosicion({
      x: e.clientX - caja.left,
      y: e.clientY - caja.top,
    });
  }

  return (
    <div style={estiloArea} onPointerMove={alMover}>
      <div
        style={{
          ...estiloPunto,
          transform: \`translate(\${posicion.x - 10}px, \${posicion.y - 10}px)\`,
        }}
      />
    </div>
  );
}

// El archivo real tiene además el botón "Reiniciar" y los objetos de estilo
// estiloArea y estiloPunto, iguales a los del otro demo.
`}
            />
          </Columna>
        </Comparacion>

        <Nota tipo="info" titulo="Por qué el recuadro y no toda la pantalla">
          <p>
            En la diapositiva el área ocupaba <code>100vw</code> por{" "}
            <code>100vh</code> y alcanzaba con <code>e.clientX</code>. Acá el
            recuadro está metido adentro de la página, así que le restamos la
            esquina del recuadro con <code>getBoundingClientRect()</code>: sin
            eso, el punto quedaría corrido hacia abajo y a la derecha.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Por qué no se movió">
        <p>
          React trata el estado como <strong>inmutable</strong>: de solo
          lectura. Cuando llamás a una función <code>set</code>, React compara
          el valor nuevo con el viejo usando <code>Object.is</code>, que para
          objetos compara <strong>referencias</strong>, no contenido. Le pregunta
          "¿es exactamente el mismo objeto?", no "¿tiene los mismos datos?".
        </p>

        <Codigo
          archivo="probalo en la consola del navegador"
          resaltar={[5, 9]}
          codigo={`
const a = { x: 0, y: 0 };
const b = a;              // b NO es una copia: es el mismo objeto
b.x = 100;                // esto también cambia a.x

Object.is(a, b);          // true  → React concluye: "no cambió nada"

const c = { ...a, x: 100 };  // esto sí es un objeto distinto

Object.is(a, c);          // false → React: "hay algo nuevo, redibujo"
`}
        />

        <p>
          Cuando hacés <code>posicion.x = 100</code> estás cambiando el interior
          del objeto, pero el objeto sigue siendo el mismo: la referencia no
          cambió. A partir de ahí hay dos finales posibles, y los dos dejan la
          pantalla igual que antes.
        </p>
        <ul>
          <li>
            <strong>Mutás y nunca llamás a <code>set</code></strong> — es lo que
            hace el recuadro rojo de arriba. React no vigila tus objetos: se
            entera de que algo cambió únicamente porque vos llamás a una función{" "}
            <code>set</code>. Si no la llamás, nadie pidió un render nuevo y la
            pantalla se queda con el dibujo viejo.
          </li>
          <li>
            <strong>
              Mutás y después llamás a <code>set</code> con el mismo objeto
            </strong>{" "}
            — <code>setPosicion(posicion)</code>. Acá React sí compara, y{" "}
            <code>Object.is</code> le devuelve <code>true</code>: es literalmente
            el mismo objeto de antes. React concluye que no hay nada nuevo y
            descarta la actualización.
          </li>
        </ul>
        <p>
          En los dos casos pasa lo mismo: tu dato cambió, la pantalla no. Por eso
          el error es tan molesto de encontrar.
        </p>

        <Nota tipo="atencion" titulo="Mutar no es ilegal en JavaScript, es ilegal en React">
          <p>
            <code>posicion.x = 100</code> es JavaScript perfectamente válido y
            no tira ningún error. Nadie te va a avisar. La regla la pone React,
            y el castigo no es una excepción: es una pantalla que no se
            actualiza, que es mucho más difícil de encontrar.
          </p>
          <p>
            Ojo: el linter de este proyecto sí lo detecta, y por eso el archivo
            del demo incorrecto tiene un <code>eslint-disable</code> arriba de
            las dos líneas. Si te aparece{" "}
            <em>"This value cannot be modified"</em>, no lo silencies: estás
            mutando el estado.
          </p>
          <p>
            La regla vale para el objeto que <em>ya está</em> en el estado. Un
            objeto que creás adentro de una función, antes de pasárselo a{" "}
            <code>set</code>, lo podés modificar todo lo que quieras: todavía no
            lo vio nadie.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Cómo se crea un objeto nuevo: el spread">
        <p>
          Casi nunca querés reemplazar el objeto entero: querés cambiar una
          propiedad y dejar las demás como estaban. Para eso está el operador de
          propagación, <code>...</code> (spread): copia todas las propiedades del
          objeto viejo dentro de uno nuevo, y después vos pisás las que quieras.
        </p>

        <Codigo
          archivo="la idea, en dos líneas"
          codigo={`
// ✗ Objeto nuevo, pero perdiste todo lo demás:
setPersona({ edad: 31 });

// ✓ Copiás lo que había y pisás una sola propiedad:
setPersona({ ...persona, edad: 31 });
`}
        />

        <p>
          El orden importa: lo que ponés <em>después</em> del spread gana. Probá
          los dos botones del demo y mirá cómo queda el objeto abajo.
        </p>

        <Demo titulo="Demo en vivo · con spread y sin spread">
          <SpreadDemo />
        </Demo>

        <Codigo
          archivo="app/react/objetos-en-estado/SpreadDemo.js"
          resaltar={[3, 8]}
          codigo={`
function cumplirSinSpread() {
  // ✗ El objeto nuevo tiene SOLO edad: nombre y apellido se pierden.
  setPersona({ edad: persona.edad + 1 });
}

function cumplirConSpread() {
  // ✓ Copiamos todo lo que ya había y encima pisamos la edad.
  setPersona({ ...persona, edad: persona.edad + 1 });
}
`}
        />
      </Seccion>

      <Seccion titulo="Objetos adentro de objetos">
        <p>
          El spread hace una <strong>copia superficial</strong>: copia un solo
          nivel. Si una propiedad es otro objeto, lo que se copia es la
          referencia a ese objeto, no su contenido. Los dos objetos terminan
          compartiendo el de adentro.
        </p>

        <Codigo
          archivo="probalo en la consola del navegador"
          resaltar={[5, 7]}
          codigo={`
const persona = { nombre: "Niki", obra: { ciudad: "Hamburgo" } };
const copia = { ...persona };

Object.is(persona, copia);            // false → son dos personas distintas
Object.is(persona.obra, copia.obra);  // true  → ¡pero la obra es LA MISMA!

copia.obra.ciudad = "Nueva Delhi";    // y esto cambia también persona.obra.ciudad
`}
        />

        <p>
          Este es el ejemplo de la diapositiva: la artista Niki de Saint Phalle
          y su obra. Editá los campos y mirá cómo cambia el objeto de estado
          completo.
        </p>

        <Demo titulo="Demo en vivo · ficha de la artista">
          <FichaArtistaDemo />
        </Demo>

        <p>
          Para mudar la obra a Nueva Delhi no alcanza con un spread: hay que
          copiar <strong>los dos niveles</strong>, uno adentro del otro.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Muta el objeto de adentro">
            <Codigo
              archivo="así no"
              codigo={`
function mudarObra() {
  // ✗ persona.obra es el mismo objeto que ya estaba en el estado.
  persona.obra.ciudad = "Nueva Delhi";
  setPersona(persona); // y encima le pasamos el MISMO objeto de siempre
}
`}
            />
          </Columna>
          <Columna tono="bien" titulo="Copia los dos niveles">
            <Codigo
              archivo="app/react/objetos-en-estado/FichaArtistaDemo.js"
              resaltar={[3, 5]}
              codigo={`
function mudarObra() {
  setPersona({
    ...persona,               // copia el nivel 1: nombre y obra
    obra: {
      ...persona.obra,        // copia el nivel 2: titulo, ciudad e imagen
      ciudad: "Nueva Delhi",  // y recién ahora pisamos la ciudad
    },
  });
}
`}
            />
          </Columna>
        </Comparacion>

        <p>
          Leído de adentro hacia afuera: armamos una obra nueva con los datos de
          la vieja más la ciudad cambiada, y después armamos una persona nueva
          con los datos de la vieja más esa obra nueva. Un nivel, un spread.
        </p>

        <Nota tipo="info" titulo="Sí, existen librerías para esto">
          <p>
            Con tres o cuatro niveles anidados esto se vuelve incómodo, y hay
            librerías como <strong>Immer</strong> que te dejan escribir{" "}
            <code>persona.obra.ciudad = "Nueva Delhi"</code> y se encargan de
            armar las copias por atrás. Pero primero entendé el spread a mano:
            Immer hace exactamente esto, y si no sabés qué está haciendo, cuando
            algo falle no vas a saber dónde mirar.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Un solo manejador para todos los campos">
        <p>
          Si un formulario tiene cinco campos no hace falta escribir cinco
          funciones casi idénticas. Le ponés a cada <code>input</code> el
          atributo <code>name</code> con el nombre de la propiedad, y usás ese
          nombre dentro del objeto nuevo.
        </p>

        <Demo titulo="Demo en vivo · tres inputs, un manejador">
          <UnManejadorDemo />
        </Demo>

        <Codigo
          archivo="app/react/objetos-en-estado/UnManejadorDemo.js"
          resaltar={[4]}
          codigo={`
function alCambiar(e) {
  setFormulario({
    ...formulario,
    [e.target.name]: e.target.value,
  });
}

// ...y cada input dice a qué propiedad pertenece con su atributo name.
// En el archivo real los tres salen de un map sobre la lista CAMPOS, pero
// el de la ciudad termina siendo exactamente esto:
<input name="ciudad" value={formulario.ciudad} onChange={alCambiar} />
`}
        />

        <p>
          Las llaves alrededor de <code>e.target.name</code> son la sintaxis de{" "}
          <strong>propiedad calculada</strong>. Sin llaves,{" "}
          <code>{"{ e.target.name: ... }"}</code> ni siquiera es válido; con
          llaves, JavaScript evalúa la expresión y usa el resultado como nombre
          de la propiedad. Si el input tiene <code>name="ciudad"</code>, esa
          línea termina siendo <code>ciudad: e.target.value</code>.
        </p>

        <Nota tipo="atencion" titulo="El name tiene que coincidir">
          <p>
            Si escribís <code>name="cuidad"</code> con la d antes de la a, no
            falla nada: React crea alegremente una propiedad nueva llamada{" "}
            <code>cuidad</code> y el campo de la ciudad queda congelado. Cuando
            un input no responde, mirá primero el JSON del estado.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. El input que no escribe"
          pista={
            <p>
              El manejador cambia el contenido del objeto pero le entrega a{" "}
              <code>setNota</code> la misma referencia de siempre. React compara
              con <code>Object.is</code>, ve que es idéntica y no redibuja: el{" "}
              <code>input</code> vuelve a mostrar el valor viejo. Necesitás un
              objeto nuevo.
            </p>
          }
          solucion={
            <Codigo
              archivo="solución"
              resaltar={[2]}
              codigo={`
function cambiarTitulo(e) {
  setNota({ ...nota, titulo: e.target.value });
}

// El spread copia autor y cuerpo, y encima pisa titulo con lo que
// escribiste. Como es un objeto nuevo, React redibuja y el input
// muestra la letra que acabás de tipear.
`}
            />
          }
        >
          <p>
            Este formulario está roto: tipeás en el campo y no aparece nada.
            Arreglá <code>cambiarTitulo</code> sin cambiar ninguna otra línea.
          </p>
          <Codigo
            archivo="el código roto"
            resaltar={[8]}
            codigo={`
const [nota, setNota] = useState({
  titulo: "Sin título",
  autor: "Camila",
  cuerpo: "",
});

function cambiarTitulo(e) {
  nota.titulo = e.target.value;   // 🐛 acá está el problema
  setNota(nota);
}

return <input value={nota.titulo} onChange={cambiarTitulo} />;
`}
          />
        </Desafio>

        <Desafio
          titulo="2. Cambiar algo de un objeto anidado"
          pista={
            <p>
              Contá los niveles: <code>equipo</code> es el nivel 1 y{" "}
              <code>capitan</code> el nivel 2. Vas a necesitar dos spreads, uno
              adentro del otro. El de adentro tiene que copiar{" "}
              <code>equipo.capitan</code>, no <code>equipo</code>.
            </p>
          }
          solucion={
            <Codigo
              archivo="solución"
              resaltar={[3, 5]}
              codigo={`
function ascenderCapitan() {
  setEquipo({
    ...equipo,                  // nivel 1: nombre, ciudad y capitan
    capitan: {
      ...equipo.capitan,        // nivel 2: nombre y numero
      numero: 10,
    },
  });
}

// Ojo con el error clásico: poner ...equipo adentro del segundo objeto.
// Eso metería nombre, ciudad y capitan ADENTRO de capitan.
`}
            />
          }
        >
          <p>
            Escribí <code>ascenderCapitan</code> para que el capitán pase a
            tener el número 10, sin perder ningún otro dato y sin mutar nada.
          </p>
          <Codigo
            archivo="para completar"
            codigo={`
const [equipo, setEquipo] = useState({
  nombre: "Los Pumas",
  ciudad: "Rosario",
  capitan: {
    nombre: "Julián",
    numero: 7,
  },
});

function ascenderCapitan() {
  // Tu código acá: el resultado tiene que ser
  // { nombre: "Los Pumas", ciudad: "Rosario", capitan: { nombre: "Julián", numero: 10 } }
}
`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
