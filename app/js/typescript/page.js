import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import InferenciaDemo from "./InferenciaDemo";
import EstrechamientoDemo from "./EstrechamientoDemo";
import CompilaDemo from "./CompilaDemo";

export const metadata = { title: "TypeScript" };

// Las cuatro utilidades que aparecen en cualquier proyecto. Van acá arriba para
// que el JSX de la sección se lea de un saque.
const UTILIDADES = [
  ["Partial<T>", "Todas las propiedades de T pasan a ser opcionales. Para un formulario a medio llenar o una actualización parcial."],
  ['Pick<T, "a" | "b">', "Se queda solo con esas propiedades de T: le pasás a un componente la parte que necesita y nada más."],
  ['Omit<T, "clave">', "Al revés: todas las de T menos esa. El clásico es Omit<Usuario, “password”> para lo que sale del servidor."],
  ["Record<K, V>", "Un objeto usado como diccionario: claves de tipo K y valores de tipo V. Por ejemplo Record<string, number>."],
];

const tabla = { width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", marginBottom: 14 };

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

const mono = { ...td, fontFamily: "var(--fuente-mono)", whiteSpace: "nowrap", verticalAlign: "top" };

export default function Pagina() {
  return (
    <Leccion
      slug="/js/typescript"
      titulo="TypeScript"
      resumen="Qué agrega sobre JavaScript, los tipos que vas a usar el 90% del tiempo, y cuánto cuesta adoptarlo."
    >
      <Seccion titulo="Qué es, en una frase">
        <p>
          TypeScript es JavaScript con tipos que se revisan{" "}
          <strong>antes</strong> de ejecutar. Todo lo que viste en{" "}
          <Link href="/js/fundamentos">los fundamentos del lenguaje</Link> y en{" "}
          <Link href="/js/dom-y-asincronia">el DOM y la asincronía</Link> sigue
          valiendo igual: no reemplaza nada, agrega una capa de control encima.
        </p>

        <Nota tipo="atencion" titulo="Lo más importante de toda la lección">
          <p style={{ marginBottom: 0 }}>
            TypeScript se compila a JavaScript común y{" "}
            <strong>en tiempo de ejecución no queda nada</strong>. Ni una
            anotación, ni una interface, ni un chequeo. El navegador nunca ve
            TypeScript. Si entendés esto, te ahorrás la mitad de la confusión que
            tiene todo el mundo con este tema.
          </p>
        </Nota>

        <p>A la izquierda lo que escribís; a la derecha lo que se ejecuta:</p>

        <Comparacion>
          <Columna tono="bien" titulo="Lo que escribís (.ts)">
            <Codigo
              archivo="saludo.ts"
              codigo={`interface Alumno {
  nombre: string;
  legajo: number;
}

function saludar(a: Alumno): string {
  return "Hola " + a.nombre;
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Lo que se ejecuta (.js)">
            <Codigo
              archivo="saludo.js"
              codigo={`function saludar(a) {
  return "Hola " + a.nombre;
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          La <code>interface</code> y las anotaciones desaparecieron: quedó
          JavaScript idéntico al que hubieras escrito a mano. Eso tiene un
          corolario grande:
        </p>

        <Nota tipo="error" titulo="TypeScript NO valida los datos que llegan de afuera">
          <p style={{ marginBottom: 0 }}>
            Si escribís <code>const usuario: Usuario = await res.json()</code>,
            le estás <em>prometiendo</em> a TypeScript que eso va a ser un{" "}
            <code>Usuario</code>. Nadie lo verifica. Si el servidor manda otra
            cosa, tu programa explota igual que en JavaScript. Para validar datos
            de verdad hace falta código que corra en ejecución.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El problema que resuelve">
        <p>
          Una función que suma un subtotal y un costo de envío. El envío salió de
          un <code>input</code>: es texto, aunque parezca un número.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="JavaScript: falla en producción">
            <Codigo
              archivo="carrito.js"
              resaltar={[6, 7]}
              codigo={`function totalConEnvio(subtotal, envio) {
  return subtotal + envio;
}

const total = totalConEnvio(1000, "500");

console.log(total);             // "1000500"  ← ¿?
console.log(total.toFixed(2));  // TypeError`}
            />
          </Columna>
          <Columna tono="bien" titulo="TypeScript: ni compila">
            <Codigo
              archivo="carrito.ts"
              resaltar={[5]}
              codigo={`function totalConEnvio(subtotal: number, envio: number): number {
  return subtotal + envio;
}

const total = totalConEnvio(1000, "500");
//                                ~~~~~
// El editor subraya en rojo acá mismo, mientras escribís.`}
            />
          </Columna>
        </Comparacion>

        <p>
          En JavaScript el <code>+</code> con un texto concatena en vez de sumar:
          te queda la cadena <code>&quot;1000500&quot;</code>. No hay error, hay
          un resultado raro que sigue viajando por el programa hasta que alguien
          le pide <code>.toFixed()</code> y recién ahí revienta, lejos del lugar
          donde estuvo el problema. En TypeScript no llegás a ejecutar nada; esto
          es lo que imprime el compilador:
        </p>

        <Codigo
          archivo="Terminal"
          codigo={`$ npx tsc --noEmit

carrito.ts:5:35 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

5 const total = totalConEnvio(1000, "500");
                                    ~~~~~

Found 1 error in carrito.ts:5`}
        />

        <p>
          Leelo despacio, porque todos los mensajes tienen la misma forma:{" "}
          <strong>archivo, línea y columna</strong>,{" "}
          <strong>el código del error</strong> (<code>TS2345</code>), la
          explicación —el argumento es <code>string</code> y el parámetro
          esperaba <code>number</code>— y la línea con el tramo subrayado.
        </p>

        <Nota tipo="info" titulo="TS2345 y ts(2345) son el mismo error">
          <p style={{ marginBottom: 0 }}>
            En la terminal sale como <code>error TS2345</code>; en el editor, al
            pasar el mouse por el subrayado rojo, sale como <code>ts(2345)</code>{" "}
            al final del mensaje. Buscar ese número junto con el texto del
            mensaje resuelve casi todos los casos.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Los tipos que vas a escribir">
        <p>La anotación va después del nombre, separada por dos puntos:</p>

        <Codigo
          archivo="tipos.ts"
          codigo={`let nombre: string = "Ana";
let edad: number = 20;             // enteros y decimales, todo junto
let activo: boolean = true;
let notas: number[] = [7, 9, 10];

// En funciones: cada parámetro, y opcionalmente el retorno.
function promedio(valores: number[]): number {
  return valores.reduce((a, b) => a + b, 0) / valores.length;
}`}
        />

        <h3>any contra unknown</h3>
        <p>
          Estos dos son los que de verdad importan: aparecen cuando no sabés qué
          tenés entre manos, o sea con un <code>fetch</code> o un{" "}
          <code>JSON.parse</code>.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="any: apagar el sistema de tipos">
            <Codigo
              archivo="con-any.ts"
              codigo={`function procesar(datos: any) {
  // No se revisa NADA de acá adentro.
  return datos.usuario.nombre;
}

procesar(null);   // compila perfecto
// Y en ejecución: TypeError`}
            />
          </Columna>
          <Columna tono="bien" titulo="unknown: no sé, y voy a averiguar">
            <Codigo
              archivo="con-unknown.ts"
              resaltar={[2, 3]}
              codigo={`function procesar(datos: unknown) {
  if (typeof datos === "string") {
    return datos.toUpperCase();   // ✔
  }
  return "no era texto";
}
// Sin el if: ts(18046)`}
            />
          </Columna>
        </Comparacion>

        <p>
          Los dos significan <em>no sé qué hay acá</em>; la diferencia es qué te
          dejan hacer después. Con <code>any</code> nadie te frena: es una
          rendición, y encima se contagia, porque todo lo que sale de un{" "}
          <code>any</code> también es <code>any</code>. Con <code>unknown</code>{" "}
          no podés tocar nada hasta demostrar qué es —el mensaje completo es{" "}
          <code>{"'datos' is of type 'unknown'. ts(18046)"}</code>—. Cuando
          dudes, poné <code>unknown</code>.
        </p>

        <h3>null, undefined y strictNullChecks</h3>
        <p>
          Con <code>strictNullChecks</code> prendido —viene dentro del modo{" "}
          <code>strict</code>, y siempre querés eso—, <code>null</code> y{" "}
          <code>undefined</code> no entran en cualquier lado. Si algo puede
          faltar, tenés que decirlo:
        </p>

        <Codigo
          archivo="buscar.ts"
          resaltar={[1, 6]}
          codigo={`function buscarAlumno(legajo: number): Alumno | null {
  return baseDeDatos.find((a) => a.legajo === legajo) ?? null;
}

const alumno = buscarAlumno(4210);
console.log(alumno.nombre);       // ✘ 'alumno' is possibly 'null'. ts(18047)
console.log(alumno?.nombre);      // ✔ encadenamiento opcional
if (alumno !== null) { … }        // ✔ acá adentro ya es Alumno, sin el null`}
        />

        <p>
          Ese error es justo el que te salva: la función avisó que puede devolver{" "}
          <code>null</code>, así que no podés leerle una propiedad sin preguntar.
        </p>
      </Seccion>

      <Seccion titulo="La inferencia hace casi todo el trabajo">
        <p>
          El error más común de quien arranca es anotar todo. No hace falta:
          TypeScript deduce el tipo de casi cualquier cosa mirando el valor.
        </p>

        <Demo titulo="Demo · qué tipo infiere TypeScript, y por qué">
          <InferenciaDemo />
        </Demo>

        <p>La regla práctica para decidir cuándo anotar:</p>
        <ul>
          <li>
            <strong>Sí</strong> los parámetros de toda función: ahí TypeScript no
            tiene de dónde deducir nada y te lo exige.
          </li>
          <li>
            <strong>Sí</strong> el retorno de las funciones que{" "}
            <em>exportás</em>: congela el contrato, así que si mañana devuelve
            otra cosa el error aparece en la función y no en los diez archivos
            que la usan.
          </li>
          <li>
            <strong>No</strong> en una <code>const</code> con un valor literal
            adelante: <code>const edad: number = 20</code> es ruido.
          </li>
          <li>
            <strong>No</strong> en los parámetros de un <code>map</code>, un{" "}
            <code>filter</code> o un manejador de evento: ya vienen tipados por
            el contexto.
          </li>
        </ul>
      </Seccion>

      <Seccion titulo="Describir objetos: type e interface">
        <p>
          Casi todo lo que vas a tipar en serio son objetos. Hay dos formas de
          darles nombre, y acá hacen lo mismo:
        </p>

        <Codigo
          archivo="usuario.ts"
          codigo={`interface Usuario {          // …o bien: type Usuario = {
  id: number;
  nombre: string;
  apodo?: string;            // opcional: puede no venir
  readonly creado: string;   // se lee, no se reasigna
}`}
        />

        <p>Los dos modificadores que aparecen ahí valen por sí solos:</p>
        <ul>
          <li>
            <code>apodo?: string</code> — el signo de pregunta dice{" "}
            <strong>puede no estar</strong>. El tipo real pasa a ser{" "}
            <code>string | undefined</code>, así que TypeScript te obliga a
            contemplar que falte.
          </li>
          <li>
            <code>readonly creado: string</code> — se lee, no se reasigna. Si lo
            intentás:{" "}
            <code>
              {"Cannot assign to 'creado' because it is a read-only property. ts(2540)"}
            </code>
          </li>
        </ul>

        <Nota tipo="info" titulo="Cuál de los dos uso">
          <p style={{ marginBottom: 0 }}>
            Criterio práctico, sin dogma: <code>interface</code> para la forma de
            un objeto —las props de un componente, una entidad—, y{" "}
            <code>type</code> para todo lo demás, que es donde{" "}
            <code>interface</code> no llega: uniones, alias, tipos de funciones.
            Si el equipo ya eligió uno, usá ese. Es la discusión menos importante
            de TypeScript.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Uniones y literales: lo que más rinde">
        <p>
          Si te llevás una sola herramienta de esta lección, llevate esta. Una{" "}
          <strong>unión</strong> son varios tipos posibles separados por{" "}
          <code>|</code>, y un tipo puede ser un valor exacto, no solo una
          categoría:
        </p>

        <Codigo
          archivo="estado.ts"
          resaltar={[1]}
          codigo={`type Estado = "pendiente" | "cargando" | "listo" | "error";

let estado: Estado = "pendiente";

estado = "listo";     // ✔
estado = "Listo";     // ✘ Type '"Listo"' is not assignable to type 'Estado'. ts(2322)
estado = "list";      // ✘ mismo error: los typos no pasan`}
        />

        <p>Comparalo con la versión de siempre:</p>

        <Comparacion>
          <Columna tono="mal" titulo="estado: string">
            <Codigo
              archivo="flojo.ts"
              codigo={`let estado: string = "pendiente";

estado = "listo";    // ✔
estado = "Listo";    // ✔
estado = "lsito";    // ✔
estado = "";         // ✔`}
            />
            <p className="tenue" style={{ marginBottom: 0 }}>
              Todo compila. El error aparece cuando el <code>if</code> que
              comparaba con <code>&quot;listo&quot;</code> nunca entra.
            </p>
          </Columna>
          <Columna tono="bien" titulo="estado: Estado">
            <Codigo
              archivo="firme.ts"
              codigo={`let estado: Estado = "pendiente";

estado = "listo";    // ✔
estado = "Listo";    // ✘ ts(2322)
estado = "lsito";    // ✘ ts(2322)
estado = "";         // ✘ ts(2322)`}
            />
            <p className="tenue" style={{ marginBottom: 0 }}>
              Y de yapa: al escribir <code>estado = &quot;</code> el editor te
              ofrece los cuatro valores en una lista. Autocompletado gratis.
            </p>
          </Columna>
        </Comparacion>

        <h3>Estrechamiento: el tipo se achica a medida que preguntás</h3>
        <p>
          Si una variable puede ser dos cosas, TypeScript no te deja tratarla
          como si fuera una sola hasta que preguntás. Cada <code>if</code> que
          descarta una posibilidad achica el tipo dentro de esa rama: se llama{" "}
          <em>narrowing</em>, y lo hace solo.
        </p>

        <Demo titulo="Demo · cómo se achica el tipo línea por línea">
          <EstrechamientoDemo />
        </Demo>

        <p>
          Las dos preguntas que más vas a usar son{" "}
          <code>{'typeof valor === "number"'}</code> para los tipos primitivos, y
          la comparación directa (<code>estado === &quot;error&quot;</code>) para
          las uniones de literales. Y hay un beneficio que no se ve en el
          código: si hacés un <code>switch (estado)</code>, el editor te escribe
          los cuatro <code>case</code> solo, y el día que agregues un quinto
          valor a <code>Estado</code> todas las funciones que se olvidaron de
          contemplarlo dejan de compilar.
        </p>
      </Seccion>

      <Seccion titulo="Genéricos: para qué existen">
        <p>
          Asustan por la sintaxis, así que vamos al problema primero. Queremos
          una función que devuelva el primer elemento de un arreglo. Intento uno:
        </p>

        <Codigo
          archivo="primero.ts"
          codigo={`function primero(lista: number[]): number {
  return lista[0];
}

primero(["a", "b"]);   // ✘ ts(2345): esperaba number[]`}
        />

        <p>
          Funciona, pero solo para números, y escribir{" "}
          <code>primeroDeStrings</code> aparte es absurdo. Intento dos, con{" "}
          <code>any</code>:
        </p>

        <Codigo
          archivo="primero.ts"
          resaltar={[6, 7]}
          codigo={`function primero(lista: any[]): any {
  return lista[0];
}

const letra = primero(["a", "b"]);
letra.toFixed(2);   // compila sin una queja
// En ejecución: TypeError: letra.toFixed is not a function`}
        />

        <p>
          Anda con todo, y perdimos toda la información: entró un arreglo de
          textos y devuelve <code>any</code>, como si no supiera nada. Ese es el
          agujero que tapan los genéricos:
        </p>

        <Codigo
          archivo="primero.ts"
          resaltar={[1]}
          codigo={`function primero<T>(lista: T[]): T {
  return lista[0];
}

const letra = primero(["a", "b"]);   // letra es string
const numero = primero([1, 2, 3]);   // numero es number

letra.toFixed(2);  // ✘ Property 'toFixed' does not exist on type 'string'. ts(2339)`}
        />

        <p>
          La <code>T</code> es una variable, pero de tipos: la completa
          TypeScript en cada llamada mirando lo que le pasaste. La firma se lee
          como una frase: <em>si me das un arreglo de algo, te devuelvo ese mismo
          algo</em>. No hace falta escribir genéricos para aprovecharlos: los vas
          a leer en <code>Array&lt;T&gt;</code>, <code>Promise&lt;T&gt;</code> y{" "}
          <code>useState&lt;T&gt;</code>, que te toca en dos minutos.
        </p>
      </Seccion>

      <Seccion titulo="Cuatro utilidades que vas a ver siempre">
        <p>
          TypeScript trae tipos que fabrican otros tipos a partir de uno que ya
          tenés. Se escriben con <code>&lt;&gt;</code> en vez de paréntesis
          —son genéricos, los mismos de recién— y con estos cuatro cubrís casi
          todo:
        </p>

        <table style={tabla}>
          <thead>
            <tr>
              <th scope="col" style={th}>Utilidad</th>
              <th scope="col" style={th}>Qué hace</th>
            </tr>
          </thead>
          <tbody>
            {UTILIDADES.map(([nombre, que]) => (
              <tr key={nombre}>
                <td style={mono}>{nombre}</td>
                <td style={td}>{que}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </Seccion>

      <Seccion titulo="¿Esto compila?">
        <p>Antes de pasar a React, probá el ojo. Apostá y después mirá:</p>

        <Demo titulo="Demo · apostá y después mirá qué dice tsc">
          <CompilaDemo />
        </Demo>
      </Seccion>

      <Seccion titulo="TypeScript en React">
        <p>
          Esta es la parte que más vas a usar. Un archivo de React con TypeScript
          se llama <code>.tsx</code>, y son tres cosas las que hay que saber
          tipar.
        </p>

        <h3>1. Las props de un componente</h3>
        <p>
          Lo que en <Link href="/react/props">props</Link> era un objeto que
          llegaba y confiabas, acá es un contrato escrito:
        </p>

        <Codigo
          archivo="Tarjeta.tsx"
          resaltar={[1, 9]}
          codigo={`interface Props {
  nombre: string;
  nota: number;
  destacada?: boolean;                  // opcional
  onBorrar: (legajo: number) => void;   // una función, con su firma
  children?: React.ReactNode;           // el contenido de adentro
}

export default function Tarjeta({ nombre, nota, destacada = false }: Props) {
  return <article className="tarjeta">{nombre}: {nota}</article>;
}`}
        />

        <p>
          El <code>: Props</code> después de la desestructuración es toda la
          conexión. Quien use mal el componente se entera al escribirlo:
        </p>

        <Nota tipo="error" titulo="Falta una prop obligatoria">
          <p style={{ marginBottom: 6 }}>
            <code>{"<Tarjeta nombre=\"Ana\" onBorrar={borrar} />"}</code>
          </p>
          <p style={{ marginBottom: 0 }}>
            <code>
              {"Property 'nota' is missing in type '{ nombre: string; onBorrar: (legajo: number) => void; }' but required in type 'Props'. ts(2741)"}
            </code>
          </p>
        </Nota>

        <p>
          <code>React.ReactNode</code> es el tipo del contenido: cubre texto,
          JSX, números y <code>null</code>.
        </p>

        <h3>2. useState cuando la inferencia no alcanza</h3>
        <p>
          El <Link href="/react/estado">estado</Link> casi siempre se infiere
          solo, igual que una variable normal:
        </p>

        <Codigo
          archivo="Formulario.tsx"
          codigo={`const [texto, setTexto] = useState("");        // string
const [abierto, setAbierto] = useState(false);  // boolean
const [items, setItems] = useState([1, 2, 3]);  // number[]`}
        />

        <p>
          El caso donde se rompe conviene tenerlo memorizado: estado que arranca
          vacío y después se llena.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Sin anotar">
            <Codigo
              archivo="Perfil.tsx"
              codigo={`const [usuario, setUsuario] = useState(null);
// usuario es de tipo null. Y nada más.

setUsuario({ id: 1, nombre: "Ana" });
// Argument of type '{ id: number;
// nombre: string; }' is not assignable
// to parameter of type
// 'SetStateAction<null>'. ts(2345)`}
            />
          </Columna>
          <Columna tono="bien" titulo="Con el genérico">
            <Codigo
              archivo="Perfil.tsx"
              resaltar={[1]}
              codigo={`const [usuario, setUsuario] =
  useState<Usuario | null>(null);

setUsuario({ id: 1, nombre: "Ana" });  // ✔

// Y al leerlo te obliga a contemplar
// el null: if (usuario !== null) { … }`}
            />
          </Columna>
        </Comparacion>

        <p>
          Ahí está el genérico de recién, trabajando: <code>useState&lt;T&gt;</code>{" "}
          le dice al hook qué va a guardar. Regla: si el valor inicial no
          representa todos los valores futuros, anotá.
        </p>

        <h3>3. El evento de un onChange</h3>
        <p>
          En un <Link href="/react/formularios">formulario controlado</Link> el
          evento tiene tipo, y ese tipo incluye qué elemento lo disparó:
        </p>

        <Codigo
          archivo="Buscador.tsx"
          resaltar={[3]}
          codigo={`import { useState, type ChangeEvent } from "react";

function alEscribir(evento: ChangeEvent<HTMLInputElement>) {
  setTexto(evento.target.value);   // value es string, garantizado
}

<input value={texto} onChange={alEscribir} />`}
        />

        <p>
          El <code>HTMLInputElement</code> es lo que hace que{" "}
          <code>evento.target.value</code> exista; en un{" "}
          <code>&lt;select&gt;</code> sería <code>HTMLSelectElement</code>. Y hay
          un atajo importante:
        </p>

        <Nota tipo="ok" titulo="Si la función va inline, no anotes nada">
          <p style={{ marginBottom: 0 }}>
            <code>{"onChange={(e) => setTexto(e.target.value)}"}</code> no
            necesita ninguna anotación: React ya sabe qué evento recibe el{" "}
            <code>onChange</code> de un <code>input</code> y se lo pasa a la
            flecha. Solo anotás cuando sacás la función afuera del JSX. Lo mismo
            vale para los <Link href="/react/eventos">eventos</Link> en general.
          </p>
        </Nota>

        <p>
          Con esas tres cosas —props, <code>useState</code> y eventos— escribís
          el 90% de una aplicación React tipada. Los efectos, los hooks propios y
          las rutas se tipan con las mismas ideas.
        </p>
      </Seccion>

      <Seccion titulo="Un malentendido muy frecuente">
        <Nota tipo="atencion" titulo="ES6 no es TypeScript">
          <p>
            Se nombran juntos todo el tiempo y no tienen nada que ver.{" "}
            <strong>
              <code>let</code> y <code>const</code>, las funciones flecha, las
              clases, los módulos, las plantillas con backticks, la
              desestructuración, el spread y las promesas son ES6
            </strong>{" "}
            —o sea ECMAScript 2015— y son <strong>JavaScript</strong>: corren
            hoy en cualquier navegador sin compilar nada.
          </p>
          <p style={{ marginBottom: 0 }}>
            ES6 es una versión del estándar de JavaScript; desde 2015 sale una
            por año (ES2020 trajo <code>?.</code> y <code>??</code>). TypeScript
            es otra cosa: un lenguaje aparte que se apoya en JavaScript y le
            agrega tipos. Si un ejemplo usa flechas y <code>const</code>, eso no
            lo hace TypeScript.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Cuánto cuesta adoptarlo">
        <p>Poco, si no lo hacés de golpe. Entra de a pedazos:</p>

        <Codigo
          archivo="Terminal"
          codigo={`npm install --save-dev typescript
npx tsc --init          # crea el tsconfig.json
npx tsc --noEmit        # revisa los tipos sin generar archivos`}
        />

        <p>
          El <code>tsconfig.json</code> configura el compilador, igual que{" "}
          <Link href="/sobre-next">el package.json</Link> configura npm. De todas
          sus opciones, dos importan al principio:
        </p>

        <Codigo
          archivo="tsconfig.json"
          resaltar={[3, 4]}
          codigo={`{
  "compilerOptions": {
    "strict": true,      // prendelo desde el día uno
    "allowJs": true,     // deja convivir archivos .js y .ts
    "target": "ES2020"
  }
}`}
        />

        <p>
          <code>strict</code> es el paquete de controles serios, con{" "}
          <code>strictNullChecks</code> adentro: prenderlo después duele mucho
          más que empezar con él prendido. Y <code>allowJs</code> habilita el
          único plan realista, que es migrar de a poco: renombrás{" "}
          <strong>un</strong> archivo <code>.js</code> a <code>.ts</code> —uno de
          utilidades, sin dependencias—, arreglás los errores de ese archivo y
          solo de ese, y mañana seguís con otro.
        </p>

        <p>
          Hay un paso previo aún más barato: <code>{"// @ts-check"}</code> en la
          primera línea de un archivo <code>.js</code>. El editor lo revisa con
          las reglas de TypeScript sin que renombres nada.
        </p>

        <Nota tipo="info" titulo="Y este proyecto, por qué está en JavaScript">
          <p style={{ marginBottom: 0 }}>
            A propósito: meter TypeScript encima sumaría una segunda cosa nueva
            en cada ejemplo, y los errores del compilador se mezclarían con los
            de React. Esta lección enseña TypeScript, el sitio no lo usa. En un
            proyecto real que arranca de cero hoy, en cambio, la respuesta corta
            es que sí conviene.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Para practicar">
        <Desafio
          titulo="1. Tipar una función que ya existe"
          pista={
            <p>
              Son tres anotaciones: los dos parámetros y el retorno.{" "}
              <code>.toFixed()</code> solo existe en los números, así que eso te
              dice qué es <code>monto</code>. Y ojo: un parámetro con valor por
              defecto <strong>ya es opcional</strong>, no le agregues encima el{" "}
              <code>?</code>.
            </p>
          }
          solucion={
            <Codigo
              archivo="formatear.ts"
              resaltar={[1]}
              codigo={`function formatearPrecio(monto: number, moneda: string = "$"): string {
  return moneda + " " + monto.toFixed(2);
}

formatearPrecio(1500);          // "$ 1500.00"
formatearPrecio("1500");        // ✘ ts(2345)

// El retorno : string lo infiere solo, pero si la función se exporta
// conviene escribirlo igual.`}
            />
          }
        >
          <p>
            Pasá esta función a TypeScript anotando lo que haga falta. La moneda
            tiene que poder omitirse, y cuando se omite vale{" "}
            <code>&quot;$&quot;</code>.
          </p>
          <Codigo
            archivo="formatear.js"
            codigo={`function formatearPrecio(monto, moneda = "$") {
  return moneda + " " + monto.toFixed(2);
}`}
          />
        </Desafio>

        <Desafio
          titulo="2. string o unión de literales"
          pista={
            <p>
              Preguntate qué deja pasar cada opción: con <code>string</code>,{" "}
              <code>&quot;enviadoo&quot;</code> es válido. Declará el conjunto de
              estados con su propio nombre, aparte de la interface, para poder
              reusarlo.
            </p>
          }
          solucion={
            <Codigo
              archivo="pedido.ts"
              resaltar={[1, 5]}
              codigo={`type EstadoPedido = "nuevo" | "enviado" | "entregado";

interface Pedido {
  id: number;
  estado: EstadoPedido;
}

const p: Pedido = { id: 1, estado: "enviadoo" };
// ✘ Type '"enviadoo"' is not assignable to type 'EstadoPedido'. ts(2322)

// Y de yapa, esta firma ya se explica sola:
function puedeCancelarse(estado: EstadoPedido): boolean {
  return estado !== "entregado";
}`}
            />
          }
        >
          <p>
            En el sistema, el estado de un pedido solo puede ser{" "}
            <code>&quot;nuevo&quot;</code>, <code>&quot;enviado&quot;</code> o{" "}
            <code>&quot;entregado&quot;</code>. Reescribí esta interface para que
            el compilador lo sepa.
          </p>
          <Codigo
            archivo="pedido.ts"
            codigo={`interface Pedido {
  id: number;
  estado: string;
}`}
          />
        </Desafio>

        <Nota tipo="info" titulo="Qué quedó afuera">
          <p style={{ marginBottom: 0 }}>
            A propósito: <code>enum</code>, <code>never</code>,{" "}
            <code>void</code>, las tuplas, los tipos condicionales y los mapeados.
            Nada de eso hace falta para leer o escribir una aplicación React
            tipada. Cuando te los cruces, la referencia es{" "}
            <a href="https://www.typescriptlang.org/docs/handbook/intro.html">
              el handbook oficial
            </a>.
          </p>
        </Nota>
      </Seccion>
    </Leccion>
  );
}
