import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import BotonesVarLet from "./BotonesVarLet";
import InspectorDeTipos from "./InspectorDeTipos";
import FabricaDeContadores from "./FabricaDeContadores";
import MetodosDemo from "./MetodosDemo";

export const metadata = { title: "Los fundamentos del lenguaje" };

// Tabla de métodos que mutan contra los que devuelven uno nuevo. Va acá arriba
// para que el JSX de abajo se lea de un saque.
const MUTAN = [
  ["push / pop", "muta", "[...arreglo, nuevo] o arreglo.slice(0, -1)"],
  ["shift / unshift", "muta", "arreglo.slice(1) o [nuevo, ...arreglo]"],
  ["splice", "muta", "filter, o toSpliced"],
  ["sort", "muta", "[...arreglo].sort(...) o toSorted"],
  ["reverse", "muta", "[...arreglo].reverse() o toReversed"],
  ["map / filter / slice / concat", "devuelve uno nuevo", "ya está bien"],
];

const th = {
  textAlign: "left",
  fontSize: "0.74rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "var(--texto-suave)",
  padding: "7px 10px",
  borderBottom: "2px solid var(--borde)",
};

const td = { padding: "7px 10px", borderBottom: "1px solid var(--borde)" };

const mono = { ...td, fontFamily: "var(--fuente-mono)" };

export default function Pagina() {
  return (
    <Leccion
      slug="/js/fundamentos"
      titulo="Los fundamentos del lenguaje"
      resumen="Variables, tipos, funciones, arreglos y objetos: lo que hay que tener firme antes de seguir."
    >
      <Seccion titulo="Variables: const, let y var">
        <p>
          Ya sabés{" "}
          <Link href="/js/donde-se-ejecuta">dónde se ejecuta JavaScript</Link>.
          Esta lección es el piso mínimo del lenguaje para poder entrar a React
          sin tropezar. Es corta a propósito: solo lo que vas a usar.
        </p>

        <p>La regla, sin vueltas:</p>
        <ul>
          <li>
            <code>const</code> por defecto, siempre.
          </li>
          <li>
            <code>let</code> solo cuando el valor de verdad se reasigna.
          </li>
          <li>
            <code>var</code> nunca. Existe por compatibilidad con código de hace
            quince años.
          </li>
        </ul>

        <Codigo
          archivo="variables.js"
          codigo={`const nombre = "Ana";      // no se va a reasignar: const
let intentos = 0;          // esto sí va a cambiar: let
intentos = intentos + 1;   // ✔

nombre = "Bruno";          // ✘ TypeError: Assignment to constant variable`}
        />

        <h3>Alcance: dónde vive cada variable</h3>
        <p>
          <code>let</code> y <code>const</code> viven adentro del bloque —el par
          de llaves— donde los declaraste. <code>var</code> ignora los bloques:
          vive en toda la función, sin importar dónde lo escribiste.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="var: se escapa del bloque">
            <Codigo
              archivo="alcance-var.js"
              codigo={`function probar() {
  if (true) {
    var x = 1;
  }
  return x;   // 1 — la var sobrevivió al if
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="let: queda adentro">
            <Codigo
              archivo="alcance-let.js"
              codigo={`function probar() {
  if (true) {
    let x = 1;
  }
  return x;   // ReferenceError: x is not defined
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          El error de <code>let</code> es <em>mejor</em> que el resultado de{" "}
          <code>var</code>: te avisa al toque, en vez de dejarte seguir con una
          variable fantasma.
        </p>

        <h3>El caso donde más se nota</h3>
        <p>
          Este ejemplo es el clásico y vale por toda la explicación. Creamos tres
          botones dentro de un <code>for</code>, y cada uno se guarda una función
          que menciona <code>i</code>. Probá los seis:
        </p>

        <Demo titulo="Demo · tres botones creados con var y tres con let">
          <BotonesVarLet />
        </Demo>

        <Codigo
          archivo="app/js/fundamentos/BotonesVarLet.js"
          resaltar={[3]}
          codigo={`function manejadoresConVar() {
  const lista = [];
  for (var i = 0; i < 3; i++) {
    // Hay UNA sola i para todo el for: var no conoce los bloques.
    lista.push(() => \`Soy el botón \${i}\`);
  }
  return lista;   // los tres dicen "Soy el botón 3"
}

// La otra función es idéntica palabra por palabra, salvo el "let" del for.
// let crea una i nueva en cada vuelta y cada función se lleva la suya:
// esos tres botones dicen 0, 1 y 2.`}
        />

        <p>
          Con <code>var</code> las tres funciones miran la misma variable, y para
          cuando las llamás el <code>for</code> ya terminó: vale 3. En React vas
          a crear manejadores dentro de un <code>map</code> todo el tiempo, así
          que esto te importa.
        </p>

        <h3>const no congela el objeto</h3>
        <p>
          <code>const</code> no significa &quot;constante&quot;: significa{" "}
          <strong>no se reasigna</strong>. Lo que queda fijo es a qué apunta la
          variable, no lo que hay adentro.
        </p>

        <Codigo
          archivo="const-objeto.js"
          resaltar={[3, 6]}
          codigo={`const alumno = { nombre: "Ana", nota: 7 };

alumno.nota = 9;             // ✔ perfectamente legal: el objeto es el mismo
alumno.comision = "A";       // ✔ también

alumno = { nombre: "Bruno" };  // ✘ TypeError: eso sí es reasignar`}
        />

        <Nota tipo="info" titulo="Hoisting, en dos frases">
          <p style={{ marginBottom: 0 }}>
            JavaScript &quot;sube&quot; las declaraciones al principio de su
            alcance antes de ejecutar nada. Con <code>var</code> eso te deja usar
            la variable antes de declararla y obtener <code>undefined</code>; con{" "}
            <code>let</code> y <code>const</code> te tira un error, que es lo que
            querés. Una razón más para no usar <code>var</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Tipos y comparaciones">
        <p>Los tipos que vas a manejar el 99% del tiempo son cinco:</p>
        <ul>
          <li>
            <code>string</code> — texto. <code>number</code> — todos los
            números, con coma o sin ella. <code>boolean</code> —{" "}
            <code>true</code> o <code>false</code>.
          </li>
          <li>
            <code>undefined</code> — no hay valor porque nadie lo puso todavía.
          </li>
          <li>
            <code>null</code> — no hay valor <em>a propósito</em>. Esa es toda
            la diferencia entre los dos.
          </li>
        </ul>
        <p>
          Y una regla que ordena todo lo demás:{" "}
          <strong>si no es uno de esos, es un objeto</strong>. Los arreglos son
          objetos. Las funciones son objetos. Las fechas también.
        </p>

        <Demo titulo="Demo · qué dice typeof, y qué pasa en un if">
          <InspectorDeTipos />
        </Demo>

        <h3>Truthy y falsy</h3>
        <p>
          Cuando un valor cae en un <code>if</code>, JavaScript lo convierte a{" "}
          <code>true</code> o <code>false</code>. La lista de los que dan{" "}
          <code>false</code> es corta y conviene sabérsela de memoria:{" "}
          <code>false</code>, <code>0</code>, <code>&quot;&quot;</code>,{" "}
          <code>null</code>, <code>undefined</code> y <code>NaN</code>.
        </p>
        <p>
          <strong>Todo lo demás es truthy</strong>, incluidos{" "}
          <code>&quot;0&quot;</code>, <code>[]</code> y <code>{"{}"}</code>. Para
          saber si un arreglo tiene elementos se pregunta por{" "}
          <code>arreglo.length</code>.
        </p>

        <h3>=== siempre, == nunca</h3>
        <p>
          <code>==</code> convierte los tipos antes de comparar, y las reglas de
          esa conversión no las recuerda nadie. <code>===</code> compara valor y
          tipo, sin magia.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="== convierte y te miente">
            <Codigo
              archivo="igualdad-suelta.js"
              codigo={`"5" == 5        // true
0 == ""         // true
0 == "0"        // true
null == undefined  // true
[] == false     // true (en serio)`}
            />
          </Columna>
          <Columna tono="bien" titulo="=== compara de verdad">
            <Codigo
              archivo="igualdad-estricta.js"
              codigo={`"5" === 5       // false
0 === ""        // false
0 === "0"       // false
null === undefined  // false
[] === false    // false`}
            />
          </Columna>
        </Comparacion>

        <p>
          Si tenés que comparar un texto con un número, convertilo vos:{" "}
          <code>Number(entrada) === 5</code>. Explícito y sin sorpresas.
        </p>

        <h3>?? contra ||, y la trampa del cero</h3>
        <p>
          <code>||</code> devuelve lo de la derecha cuando lo de la izquierda es{" "}
          <strong>falsy</strong>. <code>??</code> lo hace solo cuando es{" "}
          <code>null</code> o <code>undefined</code>. La diferencia aparece justo
          cuando el valor válido es <code>0</code> o una cadena vacía.
        </p>

        <Codigo
          archivo="defecto.js"
          resaltar={[3, 4]}
          codigo={`const faltas = 0;   // cero faltas: un dato perfectamente válido

faltas || "sin datos"   // "sin datos" ← mal: 0 es falsy
faltas ?? "sin datos"   // 0           ← bien: 0 no es null ni undefined

const apodo = null;
apodo ?? "sin apodo"    // "sin apodo" ← ?? también cubre el caso real`}
        />

        <p>
          El mismo malentendido hace que un <code>0</code> termine imprimiéndose
          solo en la pantalla:{" "}
          <Link href="/react/renderizado-condicional">la trampa del cero</Link>.
        </p>

        <Nota tipo="atencion" titulo="0.1 + 0.2 no da 0.3">
          <p style={{ marginBottom: 0 }}>
            Da <code>0.30000000000000004</code>. Los números se guardan en base
            2 y algunos decimales no entran justo, igual que 1/3 no entra en
            base 10. Para plata, trabajá en centavos con números enteros.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Funciones">
        <p>Tres formas de escribir la misma función:</p>

        <Codigo
          archivo="formas.js"
          codigo={`// 1. Declaración: se puede usar antes de la línea donde está escrita.
function sumar(a, b) {
  return a + b;
}

// 2. Expresión: es un valor guardado en una variable.
const restar = function (a, b) {
  return a - b;
};

// 3. Flecha: lo mismo, más corta. Si el cuerpo es una sola expresión,
//    se puede omitir el return.
const multiplicar = (a, b) => a * b;`}
        />

        <p>
          En la práctica cambian dos cosas. La <strong>declaración</strong> está
          disponible en todo su alcance, aunque la llames más arriba; la
          expresión y la flecha existen recién a partir de la línea que las
          crea. Y la <strong>flecha</strong> no tiene <code>this</code> propio,
          que es de lo que hablamos al final de esta sección.
        </p>

        <h3>Parámetros por defecto y rest</h3>

        <Codigo
          archivo="parametros.js"
          resaltar={[2, 9]}
          codigo={`// Valor por defecto: se usa solo si el argumento es undefined.
function saludar(nombre, saludo = "Hola") {
  return \`\${saludo}, \${nombre}\`;
}
saludar("Ana");            // "Hola, Ana"
saludar("Ana", "Buenas");  // "Buenas, Ana"

// Rest: junta todo lo que sobra en un arreglo de verdad.
function total(...precios) {
  return precios.reduce((suma, p) => suma + p, 0);
}
total(100, 250, 30);       // 380`}
        />

        <h3>Funciones que reciben funciones</h3>
        <p>
          Una función es un valor: se guarda en una variable, se pasa como
          argumento y se devuelve. Sobre eso está construido todo React.
        </p>

        <Codigo
          archivo="funciones-como-valor.js"
          codigo={`// map recibe una función y la llama una vez por elemento.
const nombres = alumnos.map((alumno) => alumno.nombre);

// onClick recibe una función y React la guarda para llamarla cuando haga falta.
<button onClick={() => setContador(contador + 1)}>Sumar</button>

// ✘ El error clásico: acá NO pasás la función, pasás el resultado de llamarla
// ahora mismo. Se ejecuta durante el render, no cuando alguien hace clic.
<button onClick={setContador(contador + 1)}>Sumar</button>`}
        />

        <p>
          Confundir <em>la función</em> con <em>llamar a la función</em> es la
          mitad de los errores con <Link href="/react/eventos">eventos</Link>.
        </p>

        <h3>Closures: la función se lleva puesto dónde nació</h3>
        <p>
          Una función recuerda las variables del lugar donde fue creada, incluso
          después de que ese lugar terminó de ejecutarse. Eso es un{" "}
          <strong>closure</strong>, y con un ejemplo se entiende solo:
        </p>

        <Demo titulo="Demo · dos contadores salidos de la misma fábrica">
          <FabricaDeContadores />
        </Demo>

        <Codigo
          archivo="app/js/fundamentos/FabricaDeContadores.js"
          resaltar={[2, 6]}
          codigo={`function crearContador(inicial = 0) {
  let cuenta = inicial;        // variable privada de esta llamada

  return {
    sumar() {
      cuenta = cuenta + 1;     // la sigue viendo aunque crearContador ya terminó
      return cuenta;
    },
    reiniciar() {
      cuenta = inicial;
      return cuenta;
    },
  };
}

const a = crearContador(0);
const b = crearContador(100);
a.sumar();   // 1  — b no se entera`}
        />

        <p>
          Cada llamada fabrica su propia <code>cuenta</code>, invisible desde
          afuera. Esto es <strong>exactamente</strong> la idea detrás de{" "}
          <Link href="/react/estado">useState</Link>: React guarda un valor que
          vos no ves y te devuelve cómo leerlo y cómo cambiarlo.
        </p>

        <Nota tipo="info" titulo="this, en dos frases">
          <p style={{ marginBottom: 0 }}>
            En una función común, <code>this</code> depende de cómo la llamaron,
            y esa ambigüedad causó años de bugs. Las flechas{" "}
            <strong>no tienen <code>this</code> propio</strong>: usan el del
            lugar donde se escribieron, que es siempre lo que esperás. Por eso en
            React casi todo se escribe con flechas y el tema deja de existir.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Arreglos y objetos">
        <p>
          Un objeto son pares clave/valor. Se lee con punto o con corchetes, y
          se recorre con <code>Object.entries</code>:
        </p>

        <Codigo
          archivo="objetos.js"
          resaltar={[4, 11]}
          codigo={`const alumno = { nombre: "Ana", nota: 7 };

alumno.nombre          // "Ana"
alumno["nota"]         // 7 — corchetes cuando la clave está en una variable
alumno.telefono        // undefined, no explota

alumno.comision = "A"; // agregar una propiedad es asignarle un valor
delete alumno.nota;    // y así se borra

// Recorrer: entries devuelve un arreglo de pares [clave, valor].
for (const [clave, valor] of Object.entries(alumno)) {
  // clave: "nombre", valor: "Ana" ...
}`}
        />

        <h3>map, filter, find y reduce</h3>
        <p>
          Estos cuatro resuelven casi todo lo que vas a hacer con una lista.
          Reciben una función y{" "}
          <strong>ninguno toca el arreglo original</strong>:
        </p>

        <Demo titulo="Demo · los cuatro métodos sobre los mismos datos">
          <MetodosDemo />
        </Demo>

        <p>
          <code>reduce</code> es el que más cuesta y el más simple: recorre el
          arreglo arrastrando un acumulador que vos vas armando.
        </p>

        <Codigo
          archivo="reduce.js"
          resaltar={[4]}
          codigo={`const notas = [9, 4, 7];

//               acumulador  elemento        valor inicial
const total = notas.reduce((suma, nota) => suma + nota, 0);
// vuelta 1: suma=0, nota=9 → 9
// vuelta 2: suma=9, nota=4 → 13
// vuelta 3: suma=13, nota=7 → 20
total;  // 20`}
        />

        <h3>Los que mutan y los que devuelven uno nuevo</h3>
        <p>
          Esta distinción es la que más te va a costar en React. Los que{" "}
          <em>mutan</em> modifican el arreglo original, y de esos cambios React
          no se entera: la pantalla no se actualiza.
        </p>

        <div style={{ overflowX: "auto", marginBottom: 16 }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr>
                <th style={th} scope="col">Método</th>
                <th style={th} scope="col">Qué hace</th>
                <th style={th} scope="col">En React usá</th>
              </tr>
            </thead>
            <tbody>
              {MUTAN.map(([metodo, que, alternativa]) => (
                <tr key={metodo}>
                  <td style={mono}>{metodo}</td>
                  <td
                    style={{
                      ...td,
                      color: que === "muta" ? "var(--rojo)" : "var(--verde)",
                    }}
                  >
                    {que}
                  </td>
                  <td style={mono}>{alternativa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Agregar, borrar y ordenar sin mutar está en{" "}
          <Link href="/react/arreglos-en-estado">arreglos en estado</Link>.
        </p>

        <h3>Destructuración y spread</h3>
        <p>
          Destructurar es sacar valores de un objeto o un arreglo y meterlos en
          variables sueltas, en una línea. Está en cada componente con props.
        </p>

        <Codigo
          archivo="destructurar.js"
          resaltar={[4, 7, 13]}
          codigo={`const alumno = { nombre: "Ana", nota: 7, comision: "A" };

// De objeto: los nombres tienen que coincidir con las claves.
const { nombre, nota } = alumno;

// Con valor por defecto para lo que no venga.
const { telefono = "sin teléfono" } = alumno;

// De arreglo: acá manda la posición, no el nombre.
const [primera, segunda] = [9, 4, 7];

// Spread: copiar y cambiar algo, sin tocar el original.
const promovido = { ...alumno, nota: 10 };
const conUnoMas = [...notas, 6];`}
        />

        <Nota tipo="atencion" titulo="La copia con spread es superficial">
          <p style={{ marginBottom: 0 }}>
            <code>{"{ ...alumno }"}</code> copia el primer nivel y nada más. Si
            alguna propiedad es a su vez un objeto, la copia y el original
            apuntan al <em>mismo</em> objeto interno: tocar uno toca el otro.
            Para anidados hay que spreadear cada nivel, y eso está en{" "}
            <Link href="/react/objetos-en-estado">objetos en estado</Link>.
          </p>
        </Nota>

        <h3>Encadenamiento opcional</h3>
        <p>
          <code>?.</code> corta la lectura y devuelve <code>undefined</code> si
          lo de la izquierda es <code>null</code> o <code>undefined</code>, en
          vez del clásico <em>Cannot read properties of undefined</em>.
        </p>

        <Codigo
          archivo="opcional.js"
          codigo={`respuesta.alumno.contacto.mail    // ✘ explota si no vino "contacto"
respuesta.alumno?.contacto?.mail  // undefined, sin error
respuesta.alumno?.contacto?.mail ?? "sin mail"  // y con valor por defecto`}
        />
      </Seccion>

      <Seccion titulo="Para practicar">
        <Desafio
          titulo="1. El promedio de los aprobados"
          pista={
            <p>
              Son dos pasos encadenados: primero <code>filter</code> para
              quedarte con los que llegan al corte, después <code>reduce</code>{" "}
              para sumar sus notas. Dividí por el largo del arreglo{" "}
              <em>filtrado</em>, no del original. Y contemplá el caso en que no
              aprobó nadie: dividir por cero da <code>NaN</code>.
            </p>
          }
          solucion={
            <Codigo
              archivo="promedio.js"
              resaltar={[2, 4]}
              codigo={`function promedioDeAprobados(alumnos, corte = 6) {
  const aprobados = alumnos.filter((a) => a.nota >= corte);
  if (aprobados.length === 0) return 0;
  const suma = aprobados.reduce((total, a) => total + a.nota, 0);
  return suma / aprobados.length;
}`}
            />
          }
        >
          <p>
            Escribí <code>promedioDeAprobados(alumnos, corte)</code>: recibe un
            arreglo de objetos <code>{"{ nombre, nota }"}</code> y devuelve el
            promedio de las notas mayores o iguales al corte. Si no aprobó
            nadie, devolvé <code>0</code>.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Sumar un punto sin mutar"
          pista={
            <p>
              <code>push</code> y asignar a <code>alumnos[i].nota</code> están
              prohibidos: los dos mutan. Usá <code>map</code> para devolver un
              arreglo nuevo, y adentro spread para devolver un objeto nuevo.
              Acordate de que la flecha necesita paréntesis alrededor de las
              llaves para devolver un objeto.
            </p>
          }
          solucion={
            <Codigo
              archivo="sumar-punto.js"
              resaltar={[2, 5]}
              codigo={`function sumarUnPunto(alumnos) {
  return alumnos.map((alumno) =>
    // Los que ya tienen 10 se devuelven tal cual: si no cambian, no hace
    // falta crear un objeto nuevo. El arreglo original queda intacto.
    alumno.nota < 10 ? { ...alumno, nota: alumno.nota + 1 } : alumno,
  );
}`}
            />
          }
        >
          <p>
            Escribí <code>sumarUnPunto(alumnos)</code>: devuelve un arreglo{" "}
            <strong>nuevo</strong> donde cada alumno tiene un punto más, sin
            pasarse de 10 y <strong>sin modificar</strong> el arreglo ni los
            objetos originales.
          </p>
        </Desafio>

        <Nota tipo="info" titulo="Esto es un piso, no un techo">
          <p>
            Quedó afuera a propósito: <code>class</code> y los prototipos,{" "}
            <code>Map</code> y <code>Set</code>, generadores, símbolos,
            expresiones regulares y los métodos de <code>String</code> uno por
            uno. Nada de eso hace falta para arrancar con React.
          </p>
          <p style={{ marginBottom: 0 }}>
            Lo asincrónico —promesas, <code>async</code> / <code>await</code>,{" "}
            <code>fetch</code>— sí lo vas a necesitar, y tiene su propia lección
            en esta pista: <em>El DOM y la asincronía</em>. Para el resto, la
            referencia es{" "}
            <a href="https://developer.mozilla.org/es/docs/Web/JavaScript">MDN</a>
            : está en español y la escriben los mismos que hacen el lenguaje.
          </p>
        </Nota>
      </Seccion>
    </Leccion>
  );
}
