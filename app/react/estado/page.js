import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import ContadorConVariable from "./ContadorConVariable";
import ContadorConEstado from "./ContadorConEstado";
import GaleriaDemo from "./GaleriaDemo";
import DosContadores from "./DosContadores";
import BuscadorDemo from "./BuscadorDemo";

export const metadata = { title: "useState" };

export default function Pagina() {
  return (
    <Leccion
      slug="/react/estado"
      titulo="useState"
      resumen="Por qué una variable común no alcanza, y cómo el estado le da memoria a un componente."
    >
      <Seccion titulo="Una variable común no alcanza">
        <p>
          Armemos un contador con lo que ya sabés de JavaScript: una variable,
          un botón, y en el click le sumás uno. Debería andar. No anda. Al lado
          está el mismo contador hecho con estado.
        </p>

        <Demo titulo="Demo en vivo · el mismo contador, hecho de dos maneras">
          <Comparacion>
            <Columna tono="mal" titulo="let numero = 0">
              <ContadorConVariable />
            </Columna>
            <Columna tono="bien" titulo="useState(0)">
              <ContadorConEstado />
            </Columna>
          </Comparacion>
        </Demo>

        <p>
          Apretá varias veces el botón de la izquierda. El registro de abajo te
          muestra cuánto vale la variable <code>numero</code> justo después de
          sumarle uno: <strong>la variable sí cambia</strong>, pero el número
          grande se queda clavado en cero. Y hay algo peor todavía: nunca pasa
          de 1.
        </p>
        <p>Son dos problemas distintos, y el estado resuelve los dos.</p>
        <ol>
          <li>
            <strong>
              Las variables locales no se conservan entre renderizados.
            </strong>{" "}
            Un componente es una función. Cada vez que React lo vuelve a
            renderizar, la ejecuta otra vez de arriba abajo:{" "}
            <code>let numero = 0</code> se vuelve a ejecutar y la variable nace
            de nuevo en cero. Por eso el registro nunca llega a 2.
          </li>
          <li>
            <strong>
              Cambiar una variable local no dispara un renderizado.
            </strong>{" "}
            React no vigila tus variables. Podés cambiarles el valor mil veces:
            si nadie le avisa que hay algo nuevo para mostrar, no vuelve a
            dibujar nada.
          </li>
        </ol>

        <Nota tipo="atencion" titulo="Ojo: ¿por qué el registro sí se actualiza?">
          <p>
            Porque el registro <em>es</em> estado, y es lo único que hace que
            React vuelva a dibujar ese componente. Justamente por eso se ve tan
            bien el problema: cada vez que React lo redibuja,{" "}
            <code>let numero = 0</code> se ejecuta de nuevo y borra lo que
            habías sumado. Si sacaras el registro, la pantalla no se movería
            nunca.
          </p>
        </Nota>

        <Comparacion>
          <Columna tono="mal" titulo="Con una variable común">
            <Codigo
              archivo="app/react/estado/ContadorConVariable.js"
              resaltar={[4, 9]}
              codigo={`import { useState } from "react";

export default function ContadorConVariable() {
  let numero = 0; // una variable común: no es estado

  const [registro, setRegistro] = useState([]);

  function manejarClick() {
    numero = numero + 1; // la variable sí cambia acá adentro...
    setRegistro([...registro, { id: registro.length + 1, valor: numero }]);
  }

  return (
    <div>
      {/* ...pero esto siempre muestra 0 */}
      <p className="marcador">{numero}</p>
      <button type="button" className="boton" onClick={manejarClick}>
        Sumar uno
      </button>
    </div>
  );
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Con estado">
            <Codigo
              archivo="app/react/estado/ContadorConEstado.js"
              resaltar={[4, 10]}
              codigo={`import { useState } from "react";

export default function ContadorConEstado() {
  const [numero, setNumero] = useState(0); // ahora sí es estado

  const [registro, setRegistro] = useState([]);

  function manejarClick() {
    const siguiente = numero + 1;
    setNumero(siguiente); // guarda el valor Y pide un renderizado nuevo
    setRegistro([...registro, { id: registro.length + 1, valor: siguiente }]);
  }

  return (
    <div>
      <p className="marcador">{numero}</p>
      <button type="button" className="boton" onClick={manejarClick}>
        Sumar uno
      </button>
    </div>
  );
}`}
            />
          </Columna>
        </Comparacion>
      </Seccion>

      <Seccion titulo="Entonces, ¿qué es el estado?">
        <p>
          El estado es <strong>la memoria de un componente</strong>: información
          que cambia con el tiempo y que el componente tiene que recordar entre
          un renderizado y el siguiente. El texto que escribiste en un input, la
          foto que estás mirando en una galería, si el menú está abierto o
          cerrado, cuántas tazas de té pediste.
        </p>
        <p>
          Lo importante no es solo que se guarde, sino qué pasa cuando cambia:{" "}
          <strong>
            cuando el estado cambia, React vuelve a renderizar el componente
          </strong>{" "}
          para mostrar el valor nuevo. Guardar y redibujar vienen juntos, en el
          mismo paquete.
        </p>

        <h3>useState es un hook</h3>
        <p>
          Los hooks son funciones especiales que React pone a tu disposición
          mientras está renderizando. Se importan de <code>react</code> y se
          reconocen porque el nombre arranca con <code>use</code>:{" "}
          <code>useState</code>, <code>useEffect</code>, <code>useContext</code>
          . En este laboratorio, además, todo archivo que use un hook lleva{" "}
          <code>"use client"</code> en la primera línea.
        </p>
        <Codigo
          archivo="app/react/estado/ContadorConEstado.js"
          resaltar={[1, 3]}
          codigo={`"use client";

import { useState } from "react";`}
        />
        <p>
          Los hooks tienen una regla que no se negocia: se llaman{" "}
          <strong>en el nivel superior del componente</strong>, arriba de todo,
          antes de cualquier <code>if</code>, <code>for</code> o{" "}
          <code>return</code>. Nunca adentro de una condición, de un bucle ni de
          una función anidada.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Un hook escondido adentro de un if">
            <Codigo
              archivo="Formulario.js"
              resaltar={[5]}
              codigo={`function Formulario({ pedirApellido }) {
  const [nombre, setNombre] = useState("");

  if (pedirApellido) {
    const [apellido, setApellido] = useState(""); // React se rompe
  }

  // ...
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Los dos hooks siempre arriba">
            <Codigo
              archivo="Formulario.js"
              resaltar={[2, 3]}
              codigo={`function Formulario({ pedirApellido }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  // La condición va después, en el JSX, no en la llamada al hook.
  // ...
}`}
            />
          </Columna>
        </Comparacion>

        <Nota tipo="atencion" titulo="Por qué React es tan estricto con esto">
          <p>
            React no mira cómo llamaste a tus variables: identifica a cada
            estado <strong>por el orden en que se llamó al hook</strong> durante
            el renderizado. El primer <code>useState</code> es el estado número
            uno, el segundo es el número dos, y así. Si un <code>if</code> hace
            que un renderizado llame a dos hooks y el siguiente llame a uno
            solo, se desacomoda la cuenta. En el mejor de los casos React se da
            cuenta y corta con un error en la consola (
            <code>Rendered fewer hooks than expected</code>); en el peor la
            cuenta cierra igual y te devuelve el estado de otro{" "}
            <code>useState</code> sin avisarte nada.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La sintaxis, parte por parte">
        <Codigo
          archivo="app/react/estado/GaleriaDemo.js"
          codigo={`const [indice, setIndice] = useState(0);`}
        />
        <p>Esa línea sola tiene tres cosas adentro:</p>
        <ul>
          <li>
            <code>indice</code> es <strong>el valor actual</strong> del estado
            en este renderizado. Se lee como cualquier variable, pero{" "}
            <em>no se le asigna</em> nunca a mano.
          </li>
          <li>
            <code>setIndice</code> es <strong>la función para cambiarlo</strong>
            . Es la única manera de tocarlo, y cuando la llamás React agenda un
            renderizado nuevo del componente.
          </li>
          <li>
            El <code>0</code> que va adentro de <code>useState()</code> es{" "}
            <strong>el valor inicial</strong>. Se usa nada más que en el primer
            renderizado; de ahí en adelante React ignora ese argumento, porque
            ya se acuerda del valor que tiene guardado.
          </li>
        </ul>

        <Demo titulo="Demo en vivo · una galería con un solo estado">
          <GaleriaDemo />
        </Demo>

        <Codigo
          archivo="app/react/estado/GaleriaDemo.js"
          resaltar={[4, 10, 17]}
          codigo={`const CIENTIFICOS = [/* ...los datos, que no cambian nunca... */];

export default function GaleriaDemo() {
  const [indice, setIndice] = useState(0);

  // Esto NO es estado: se calcula a partir del índice en cada renderizado.
  const cientifico = CIENTIFICOS[indice];

  function siguiente() {
    setIndice((indice + 1) % CIENTIFICOS.length);
  }

  return (
    <div>
      <h3>{cientifico.nombre}</h3>
      <p>{cientifico.campo}</p>
      <button type="button" className="boton" onClick={siguiente}>
        Siguiente
      </button>
    </div>
  );
}`}
        />

        <Nota tipo="info" titulo="Guardá lo mínimo indispensable">
          <p>
            Fijate que el nombre y la especialidad del científico <em>no</em>{" "}
            son estado: se deducen del índice. Si un dato se puede calcular a
            partir de otro, no lo guardes; calculalo durante el renderizado y te
            ahorrás dos datos que después se pueden contradecir.
          </p>
        </Nota>

        <h3>La convención de nombres</h3>
        <p>
          A la función de cambio se le pone el nombre del valor con{" "}
          <code>set</code> adelante y la primera letra en mayúscula: si el valor
          es <code>edad</code>, la función es <code>setEdad</code>. No es una
          regla del lenguaje, es una costumbre que respeta todo el mundo; si no
          la seguís, tu código va a parecer raro.
        </p>
        <Codigo
          archivo="convención"
          codigo={`const [edad, setEdad] = useState(18);
const [nombre, setNombre] = useState("");
const [estaEncendido, setEstaEncendido] = useState(false);`}
        />
      </Seccion>

      <Seccion titulo="Por qué useState devuelve un arreglo">
        <p>
          Los corchetes de <code>const [indice, setIndice]</code> no son magia
          de React: es <strong>destructuración de arreglos</strong>, JavaScript
          puro. Sirve para sacarle los elementos a un arreglo y meterlos en
          variables sueltas, de una sola pasada.
        </p>
        <Codigo
          archivo="JavaScript"
          codigo={`let a, b, resto;

[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

[a, b, ...resto] = [10, 20, 30, 40, 50];
console.log(resto); // [30, 40, 50]`}
        />
        <p>
          <code>useState</code> devuelve siempre un arreglo de dos elementos: en
          la posición 0 el valor actual, en la posición 1 la función para
          cambiarlo. Lo podrías escribir sin destructurar y sería exactamente lo
          mismo, nada más que mucho más largo.
        </p>
        <Comparacion>
          <Columna tono="mal" titulo="Sin destructurar: anda, pero nadie lo escribe así">
            <Codigo
              archivo="Galeria.js"
              codigo={`const par = useState(0);
const indice = par[0];
const setIndice = par[1];`}
            />
          </Columna>
          <Columna tono="bien" titulo="Destructurando">
            <Codigo
              archivo="Galeria.js"
              codigo={`const [indice, setIndice] = useState(0);`}
            />
          </Columna>
        </Comparacion>
        <p>
          Como lo que manda es la posición y no el nombre, los nombres los
          elegís vos. Lo único que no podés cambiar es el orden: el primero
          siempre es el valor, el segundo siempre es la función.
        </p>
      </Seccion>

      <Seccion titulo="Cada componente se acuerda de lo suyo">
        <p>
          El estado es <strong>privado de cada instancia</strong> del
          componente. Si ponés dos veces el mismo componente en la pantalla,
          cada uno tiene su propio estado, independiente del otro: el de al lado
          ni se entera.
        </p>

        <Demo titulo="Demo en vivo · dos veces el mismo componente">
          <DosContadores />
        </Demo>

        <Codigo
          archivo="app/react/estado/DosContadores.js"
          resaltar={[2, 11, 12]}
          codigo={`function Contador({ mesa }) {
  const [tazas, setTazas] = useState(0); // un estado por cada uso

  // ...
}

export default function DosContadores() {
  return (
    <div className="fila">
      {/* el mismo componente, dos veces, con dos estados distintos */}
      <Contador mesa="Mesa 1" />
      <Contador mesa="Mesa 2" />
    </div>
  );
}`}
        />
        <p>
          Esto es lo que hace que un componente sea de verdad reutilizable:
          escribís <code>Contador</code> una vez y lo usás dos, diez o cien
          veces sin que se pisen entre ellos. Cuando <em>sí</em> necesitás que
          dos componentes compartan un dato, el estado se mueve al padre en
          común, y eso lo vas a ver en{" "}
          <Link href="/react/estado-compartido">Estado compartido</Link>.
        </p>
      </Seccion>

      <Seccion titulo="Varios estados en el mismo componente">
        <p>
          Un componente puede tener todos los <code>useState</code> que
          necesite, y cada uno vive su vida por separado. La regla práctica: si
          dos datos cambian por motivos distintos, van en estados distintos.
        </p>

        <Demo titulo="Demo en vivo · un buscador con tres estados">
          <BuscadorDemo />
        </Demo>

        <p>
          Escribí <code>datos</code> en el buscador y después tocá el casillero
          de las aprobadas y los botones de año. Cada control cambia{" "}
          <em>un</em> estado distinto y la lista se vuelve a calcular con los
          tres a la vez: con <code>datos</code> quedan dos materias, el casillero
          deja una sola, y si además pedís 2° año no queda ninguna.
        </p>

        <Codigo
          archivo="app/react/estado/BuscadorDemo.js"
          resaltar={[2, 3, 4]}
          codigo={`export default function BuscadorDemo() {
  const [texto, setTexto] = useState("");                    // un string
  const [soloAprobadas, setSoloAprobadas] = useState(false); // un booleano
  const [anio, setAnio] = useState(0);                       // un número

  // La lista visible no es estado: se calcula con los tres filtros.
  const visibles = MATERIAS.filter((materia) => {
    const coincideTexto = materia.nombre
      .toLowerCase()
      .includes(texto.trim().toLowerCase());
    const coincideNota = !soloAprobadas || materia.nota >= 4;
    const coincideAnio = anio === 0 || materia.anio === anio;
    return coincideTexto && coincideNota && coincideAnio;
  });

  // ...
}`}
        />

        <h3>Qué podés guardar adentro</h3>
        <p>
          Cualquier valor de JavaScript: números, strings, booleanos, objetos y
          arreglos.
        </p>
        <Codigo
          archivo="ejemplos"
          codigo={`const [cantidad, setCantidad] = useState(0);               // número
const [nombre, setNombre] = useState("");                  // string
const [visible, setVisible] = useState(true);              // booleano
const [usuario, setUsuario] = useState({ nombre: "Ana" }); // objeto
const [tareas, setTareas] = useState([]);                  // arreglo`}
        />
        <Nota tipo="atencion" titulo="Los objetos y los arreglos tienen su vuelta de rosca">
          <p>
            Guardarlos se puede, pero modificarlos tiene una regla que todavía
            no vimos: no se tocan en el lugar, hay que crear uno nuevo. De eso
            se tratan las lecciones{" "}
            <Link href="/react/objetos-en-estado">Objetos en estado</Link> y{" "}
            <Link href="/react/arreglos-en-estado">Arreglos en estado</Link>. Por
            ahora, quedate con números, strings y booleanos.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <p>
          Creá los archivos adentro de <code>app/react/estado/</code>, acordate del{" "}
          <code>"use client"</code> en la primera línea y probalos importándolos
          en alguna página. Intentá antes de mirar la solución.
        </p>

        <Desafio
          titulo="1. Un interruptor de encendido y apagado"
          pista={
            <p>
              Te alcanza con un solo estado, y no es un número: es un{" "}
              <code>true</code> o un <code>false</code>. Para darlo vuelta no
              hace falta ningún <code>if</code>, con el operador <code>!</code>{" "}
              ya está.
            </p>
          }
          solucion={
            <Codigo
              archivo="Interruptor.js"
              resaltar={[6, 9]}
              codigo={`"use client";

import { useState } from "react";

export default function Interruptor() {
  const [encendido, setEncendido] = useState(false);

  function cambiar() {
    setEncendido(!encendido); // lo da vuelta: true pasa a false y al revés
  }

  return (
    <div>
      <p className="marcador">{encendido ? "ENCENDIDO" : "APAGADO"}</p>
      <button type="button" className="boton" onClick={cambiar}>
        {encendido ? "Apagar" : "Encender"}
      </button>
    </div>
  );
}`}
            />
          }
        >
          <p>
            Hacé un componente <code>Interruptor</code> con un botón. Cada click
            lo pasa de apagado a encendido y de encendido a apagado. Arriba del
            botón mostrá en qué estado está, y que el texto del botón diga{" "}
            <em>Encender</em> o <em>Apagar</em> según corresponda.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Un contador que no baja de cero"
          pista={
            <p>
              Un solo estado con un número adentro. Lo único con algo de trampa
              es restar: antes de guardar, fijate que el resultado no quede
              negativo. Te sirve un <code>if</code>, o directamente{" "}
              <code>Math.max(0, cuenta - 1)</code>. Bonus: dejá el botón de
              restar con <code>disabled</code> cuando la cuenta ya esté en cero.
            </p>
          }
          solucion={
            <Codigo
              archivo="ContadorCompleto.js"
              resaltar={[6, 13, 17]}
              codigo={`"use client";

import { useState } from "react";

export default function ContadorCompleto() {
  const [cuenta, setCuenta] = useState(0);

  function sumar() {
    setCuenta(cuenta + 1);
  }

  function restar() {
    setCuenta(Math.max(0, cuenta - 1)); // nunca por debajo de cero
  }

  function reiniciar() {
    setCuenta(0); // volver al inicio es simplemente asignar el valor inicial
  }

  return (
    <div>
      <p className="marcador">{cuenta}</p>
      <div className="fila">
        <button type="button" className="boton" onClick={sumar}>
          Sumar
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={restar}
          disabled={cuenta === 0}
        >
          Restar
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={reiniciar}
          disabled={cuenta === 0}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}`}
            />
          }
        >
          <p>
            Hacé un componente <code>ContadorCompleto</code> con tres botones:
            sumar, restar y reiniciar. La cuenta arranca en cero y{" "}
            <strong>nunca puede quedar en negativo</strong>: si está en cero y
            apretás restar, se tiene que quedar en cero.
          </p>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
