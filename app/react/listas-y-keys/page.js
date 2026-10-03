import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import MapDemo from "./MapDemo";
import BuscadorDemo from "./BuscadorDemo";
import KeysIndiceDemo from "./KeysIndiceDemo";
import GlosarioDemo from "./GlosarioDemo";

export const metadata = { title: "Listas y key" };

export default function Pagina() {
  return (
    <Leccion
      slug="/react/listas-y-keys"
      titulo="Listas y key"
      resumen="Renderizar arreglos con map y por qué la key importa más de lo que parece."
    >
      <Seccion titulo="De un arreglo a una lista">
        <Nota tipo="info" titulo="Esto todavía no lo viste en clase">
          <p>
            Las diapositivas 5 y 6 llegan hasta el estado interno. Listas y{" "}
            <code>key</code> es lo que sigue, y lo vas a necesitar en{" "}
            <em>todos</em> los ejercicios de acá en adelante: apenas tenés datos
            de verdad, tenés un arreglo que dibujar.
          </p>
        </Nota>

        <p>
          En React no existe ningún <code>for</code> especial ni una directiva
          tipo <code>v-for</code>. Para dibujar una lista usás el JavaScript que
          ya sabés: <code>map</code> recorre el arreglo de datos y devuelve otro
          arreglo, del mismo largo, pero lleno de elementos JSX. Ese arreglo lo
          metés adentro de las llaves y listo.
        </p>

        <Codigo
          archivo="Lista.js"
          resaltar={[7, 8, 9]}
          codigo={`const productos = [
  { id: 1, nombre: "Yerba" },
  { id: 2, nombre: "Mate" },
];

export default function Lista() {
  const filas = productos.map((producto) => (
    <li key={producto.id}>{producto.nombre}</li>
  ));

  // Un arreglo de elementos se puede poner tal cual adentro del JSX.
  return <ul>{filas}</ul>;
}`}
        />

        <p>
          En la práctica casi nadie guarda el arreglo en una variable: se escribe
          el <code>map</code> directamente adentro del JSX. Es exactamente lo
          mismo.
        </p>

        <Codigo
          archivo="Lista.js"
          codigo={`<ul>
  {productos.map((producto) => (
    <li key={producto.id}>{producto.nombre}</li>
  ))}
</ul>`}
        />

        <Demo titulo="Demo · los datos y la lista, lado a lado">
          <MapDemo />
        </Demo>

        <p>
          Tocá los botones y mirá las dos columnas: vos cambiás el{" "}
          <strong>arreglo</strong>, y la lista de la derecha se reacomoda sola.
          Nunca tocás el <code>&lt;ul&gt;</code> a mano.
        </p>

        <Codigo
          archivo="app/react/listas-y-keys/MapDemo.js"
          codigo={`const filas = alumnos.map((alumno) => (
  <li key={alumno.id}>
    {alumno.nombre} — nota {alumno.nota}
  </li>
));`}
        />

        <Comparacion>
          <Columna tono="mal" titulo="Llaves sin return">
            <Codigo
              codigo={`productos.map((p) => {
  <li key={p.id}>{p.nombre}</li>;
})`}
            />
            <p className="tenue">
              Con <code>{"{"}</code> después de la flecha abrís un cuerpo de
              función: si no ponés <code>return</code>, cada vuelta devuelve{" "}
              <code>undefined</code> y no se dibuja nada. Pantalla en blanco, sin
              error.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Paréntesis: devuelve solo">
            <Codigo
              codigo={`productos.map((p) => (
  <li key={p.id}>{p.nombre}</li>
))`}
            />
            <p className="tenue">
              Con <code>(</code> la flecha devuelve directamente lo que está
              adentro. Por eso vas a ver siempre paréntesis en los ejemplos.
            </p>
          </Columna>
        </Comparacion>
      </Seccion>

      <Seccion titulo="filter antes de map">
        <p>
          Cuando querés mostrar solo una parte de los datos, filtrás primero y
          mapeás después. Los dos son métodos comunes de arreglos y ninguno
          modifica el original: devuelven arreglos nuevos.
        </p>

        <Codigo
          archivo="Aprobados.js"
          codigo={`// En dos pasos, para leerlo tranquilo:
const aprobados = alumnos.filter((alumno) => alumno.nota >= 6);
const filas = aprobados.map((alumno) => (
  <li key={alumno.id}>{alumno.nombre}</li>
));`}
        />

        <p>
          Como <code>filter</code> devuelve un arreglo, se le puede encadenar el{" "}
          <code>map</code> directamente. Estas dos versiones hacen exactamente lo
          mismo; la de abajo es la que vas a ver escrita en la práctica.
        </p>

        <Codigo
          archivo="Aprobados.js"
          codigo={`// Lo mismo, encadenado:
const filas = alumnos
  .filter((alumno) => alumno.nota >= 6)
  .map((alumno) => <li key={alumno.id}>{alumno.nombre}</li>);`}
        />

        <p>
          Con eso ya tenés un buscador: el texto que escribe el usuario vive en
          el estado, el filtro se recalcula en cada render y la lista se redibuja
          sola. Escribí <code>el</code> en el casillero y mirá cómo se achica la
          lista; después probá con algo que no exista, tipo <code>zzz</code>,
          para ver el caso en el que no queda ninguna.
        </p>

        <Demo titulo="Demo · buscador con filter + map">
          <BuscadorDemo />
        </Demo>

        <Codigo
          archivo="app/react/listas-y-keys/BuscadorDemo.js"
          resaltar={[3, 4, 5, 6]}
          codigo={`const [texto, setTexto] = useState("");

const busqueda = texto.trim().toLowerCase();
const encontradas = PELICULAS.filter((pelicula) =>
  pelicula.titulo.toLowerCase().includes(busqueda),
);

// El caso "no hay resultados" hay que dibujarlo a mano:
// una lista vacía no muestra nada y parece que la página se rompió.
{encontradas.length === 0 ? (
  <p>
    No hay ninguna película que contenga <strong>{texto}</strong>. Probá
    con otra cosa.
  </p>
) : (
  <ul>
    {encontradas.map((pelicula) => (
      <li key={pelicula.id}>
        {pelicula.titulo} <span className="tenue">({pelicula.anio})</span>
      </li>
    ))}
  </ul>
)}`}
        />

        <Nota tipo="atencion" titulo="No guardes el resultado filtrado en estado">
          <p>
            El filtro se calcula a partir del texto y de los datos, así que se
            recalcula solo en cada render. Si además lo guardás con un{" "}
            <code>useState</code> vas a tener dos fuentes de verdad que se
            desincronizan.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La prop key">
        <p>
          Cada vez que el estado cambia, React vuelve a ejecutar tu componente y
          compara la lista vieja con la nueva para tocar lo mínimo posible del
          DOM. Para eso necesita saber <strong>qué elemento es cuál</strong>. La{" "}
          <code>key</code> es eso: el documento de identidad de cada fila.
        </p>

        <ul>
          <li>
            Tiene que ser <strong>única entre hermanos</strong>: dos listas
            distintas pueden repetir keys sin problema, lo que no puede haber son
            dos hermanos con la misma.
          </li>
          <li>
            Tiene que ser <strong>estable en el tiempo</strong>: el mismo dato
            tiene que tener la misma key en el render de hoy y en el de dentro de
            tres clicks.
          </li>
          <li>
            Va en el elemento <strong>de más afuera</strong> del{" "}
            <code>map</code>, no adentro.
          </li>
        </ul>

        <p>
          Si te la olvidás, React te avisa en la consola del navegador (se abre
          con <code>F12</code>):
        </p>

        <Codigo
          archivo="consola del navegador"
          codigo={`Each child in a list should have a unique "key" prop.

Check the render method of \`ListaDeProductos\`.`}
        />

        <p>
          Se lee de atrás para adelante: el nombre entre comillas invertidas es{" "}
          <strong>el componente que tiene el map sin key</strong>. Abrís ese
          archivo, buscás el <code>map</code> y le agregás la <code>key</code> al
          elemento que devuelve.
        </p>

        <Nota tipo="atencion" titulo="key no te llega como prop">
          <p>
            React se queda con la <code>key</code> para uso interno: adentro del
            componente vale <code>undefined</code>. Si necesitás el id ahí
            adentro, pasalo dos veces.
          </p>
          <Codigo
            codigo={`<Fila key={persona.id} id={persona.id} persona={persona} />

function Fila({ key, id }) {
  // key es undefined. id, que es una prop común, sí llega.
}`}
          />
        </Nota>
      </Seccion>

      <Seccion titulo="Por qué el índice no sirve como key">
        <p>
          Es la trampa más famosa de React y la más difícil de creer hasta que la
          ves. Abajo hay <strong>dos listas idénticas</strong> con los mismos
          datos: la de la izquierda usa <code>key={"{indice}"}</code> y la de la
          derecha <code>key={"{persona.id}"}</code>. Los casilleros de texto{" "}
          <strong>no están controlados</strong>: lo que escribís no lo guarda
          ningún <code>useState</code> nuestro, vive adentro del nodo del DOM (de
          los inputs controlados se ocupa{" "}
          <Link href="/react/formularios">Formularios controlados</Link>). Por eso son
          un espía perfecto para ver qué nodos reusa React.
        </p>

        <Demo titulo="Demo · la misma lista con dos keys distintas">
          <KeysIndiceDemo />
        </Demo>

        <p>
          Hacelo de verdad antes de seguir leyendo: escribí el nombre de cada
          persona en el casillero que tiene al lado y recién ahí tocá{" "}
          <em>Insertar al principio</em> o <em>Dar vuelta</em>. En la columna de
          la derecha el texto se fue con su fila. En la izquierda se quedó pegado
          a la posición y ahora acompaña a la persona equivocada.
        </p>

        <p>
          El motivo: con el índice, las keys de la lista son siempre{" "}
          <code>0, 1, 2</code>. Después de insertar al principio siguen siendo{" "}
          <code>0, 1, 2, 3</code>, solo que ahora la key <code>0</code> apunta a
          otra persona. React ve la misma key en la misma posición, concluye que
          es la misma fila de antes, <strong>reusa el mismo input</strong> (con
          el texto que tenía) y solo le cambia el nombre. Con el id, React ve una
          key nueva, crea una fila nueva y <strong>mueve</strong> las que ya
          existían junto con su input.
        </p>

        <p>
          Con <em>Dar vuelta</em> pasa lo mismo y ni siquiera cambia la cantidad
          de filas: las keys de índice siguen siendo <code>0, 1, 2</code> en ese
          mismo orden, así que React no mueve ningún nodo, solo reescribe los
          nombres. Los tres casilleros se quedan clavados donde estaban. Del otro
          lado, las keys <code>101, 102, 103</code> aparecen en orden invertido y
          React mueve los nodos que ya tenía.
        </p>

        <Codigo
          archivo="app/react/listas-y-keys/KeysIndiceDemo.js"
          resaltar={[3, 8]}
          codigo={`{/* ✗ la key es la posición: cambia de dueño cuando la lista se mueve */}
{personas.map((persona, indice) => (
  <Fila key={indice} persona={persona} />
))}

{/* ✓ la key es el dato: viaja con la persona a donde sea que vaya */}
{personas.map((persona) => (
  <Fila key={persona.id} persona={persona} />
))}`}
        />

        <Nota tipo="atencion" titulo="Esto también se lleva puesto el useState">
          <p>
            El input sin controlar es solo lo más visible. Lo mismo pasa con el
            estado interno de cada fila: si <code>Fila</code> tuviera su propio{" "}
            <code>useState</code> (un menú abierto, un modo edición, un
            contador), con key de índice ese estado se queda en la posición y
            aparece en la fila equivocada.
          </p>
        </Nota>

        <p>
          El índice solo es inofensivo si la lista es fija: nunca se reordena,
          nunca se borra nada y nunca se inserta en el medio. Como eso casi nunca
          se puede prometer, la regla práctica es no usarlo.
        </p>
      </Seccion>

      <Seccion titulo="Qué no sirve como key">
        <Comparacion>
          <Columna tono="mal" titulo="Keys rotas">
            <Codigo
              codigo={`// La posición: no identifica al dato.
<li key={indice}>…</li>

// Un valor nuevo en cada render: nunca coincide
// con el de antes, así que React borra toda la
// lista y la crea de cero cada vez. Lento, y
// perdés el foco y el texto de los inputs.
<li key={Math.random()}>…</li>

// Un valor que se puede repetir: dos personas
// que se llaman igual pelean por la misma key.
<li key={persona.nombre}>…</li>`}
            />
          </Columna>
          <Columna tono="bien" titulo="Keys sanas">
            <Codigo
              codigo={`// El id que ya viene con el dato.
<li key={producto.id}>…</li>

// Un id generado UNA vez, al crear el dato,
// y guardado adentro del objeto.
const nueva = { id: crypto.randomUUID(), texto };
setTareas([...tareas, nueva]);

// Un campo que es único por definición.
<li key={pais.codigoIso}>…</li>`}
            />
          </Columna>
        </Comparacion>

        <Nota tipo="error" titulo="El clásico: generar el id en el render">
          <p>
            <code>key={"{Math.random()}"}</code> y{" "}
            <code>key={"{crypto.randomUUID()}"}</code> escritos adentro del{" "}
            <code>map</code> se ejecutan en <em>cada</em> renderizado. El id hay
            que generarlo cuando nace el dato, no cuando se dibuja.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Varios elementos por item: Fragment con key">
        <p>
          A veces cada dato necesita devolver dos o más etiquetas hermanas y no
          las podés envolver en un <code>&lt;div&gt;</code>: adentro de un{" "}
          <code>&lt;tr&gt;</code> el HTML solo acepta celdas, y en una lista de
          definiciones los pares <code>&lt;dt&gt;</code> /{" "}
          <code>&lt;dd&gt;</code> quedan mucho más claros colgando directo del{" "}
          <code>&lt;dl&gt;</code>. Para esos casos está el fragmento, pero el
          fragmento corto <code>&lt;&gt; &lt;/&gt;</code> no acepta props: no
          tiene dónde ponerle la <code>key</code>. Por eso hay que escribirlo con
          el nombre completo, <code>&lt;Fragment&gt;</code>.
        </p>

        <Codigo
          archivo="Glosario.js"
          resaltar={[1, 13]}
          codigo={`import { Fragment } from "react";

// ✗ El fragmento corto no tiene dónde poner la key.
{terminos.map((termino) => (
  <>
    <dt>{termino.palabra}</dt>
    <dd>{termino.definicion}</dd>
  </>
))}

// ✓ La forma larga sí.
{terminos.map((termino) => (
  <Fragment key={termino.id}>
    <dt>{termino.palabra}</dt>
    <dd>{termino.definicion}</dd>
  </Fragment>
))}`}
        />

        <Demo titulo="Demo · un glosario con dos etiquetas por término">
          <GlosarioDemo />
        </Demo>

        <Nota tipo="ok" titulo="Regla corta">
          <p>
            La <code>key</code> va siempre en el elemento que devuelve el{" "}
            <code>map</code>, sea un <code>&lt;li&gt;</code>, un componente tuyo
            o un <code>Fragment</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Lista agrupada por categoría"
          pista={
            <div>
              <p>
                Necesitás dos <code>map</code>, uno adentro del otro. El de
                afuera recorre las categorías <em>sin repetir</em>; para sacar
                esa lista, <code>Set</code> te descarta los duplicados:
              </p>
              <Codigo
                codigo={`const categorias = [...new Set(PRODUCTOS.map((p) => p.categoria))];`}
              />
              <p>
                El de adentro recorre los productos de esa categoría. Ojo con las
                dos keys: cada una compite solo con sus hermanas.
              </p>
            </div>
          }
          solucion={
            <Codigo
              archivo="ListaAgrupada.js"
              resaltar={[10, 15, 19]}
              codigo={`const PRODUCTOS = [
  { id: 1, nombre: "Yerba", categoria: "Almacén" },
  { id: 2, nombre: "Mate", categoria: "Bazar" },
  { id: 3, nombre: "Azúcar", categoria: "Almacén" },
  { id: 4, nombre: "Termo", categoria: "Bazar" },
];

export default function ListaAgrupada() {
  // Set descarta los repetidos; el spread lo vuelve arreglo otra vez.
  const categorias = [...new Set(PRODUCTOS.map((p) => p.categoria))];

  return (
    <div>
      {categorias.map((categoria) => (
        <section key={categoria}>
          <h3>{categoria}</h3>
          <ul>
            {PRODUCTOS.filter((p) => p.categoria === categoria).map((p) => (
              <li key={p.id}>{p.nombre}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}`}
            />
          }
        >
          <p>
            Tenés un arreglo de productos donde cada uno trae una{" "}
            <code>categoria</code>. Armá un componente que muestre un{" "}
            <code>&lt;h3&gt;</code> por categoría y, debajo, la lista de los
            productos de esa categoría. Que no se repita ninguna categoría y que
            no quede ningún aviso de <code>key</code> en la consola.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Encontrá el bug"
          pista={
            <p>
              El <code>&lt;input type="checkbox" /&gt;</code> no está controlado:
              nadie guarda si está tildado, eso vive en el nodo del DOM. Anotá
              qué key tiene cada <code>&lt;li&gt;</code> antes de borrar y cuál
              tiene después. ¿Qué tarea le toca ahora a la key <code>1</code>?
            </p>
          }
          solucion={
            <div>
              <p>
                El bug está en <code>key={"{i}"}</code>. Antes de borrar, las
                keys son <code>0</code> (Estudiar React), <code>1</code> (Hacer
                el TP) y <code>2</code> (Dormir), y el tilde quedó en el{" "}
                <code>&lt;li&gt;</code> de key <code>1</code>. Al borrar la
                primera tarea quedan dos filas y las keys vuelven a ser{" "}
                <code>0, 1</code>: React ve las mismas keys en el mismo orden,
                concluye que son las mismas filas de antes, reusa los dos{" "}
                <code>&lt;li&gt;</code> con sus checkboxes tal cual estaban y les
                cambia solo el texto. Resultado: la fila <code>1</code> ahora
                dice <em>Dormir</em> pero conserva el tilde que era de{" "}
                <em>Hacer el TP</em>. Con <code>key={"{tarea.id}"}</code> cada{" "}
                <code>&lt;li&gt;</code> viaja con su tarea, y el checkbox se va
                con él.
              </p>
              <Codigo
                archivo="ListaDeTareas.js"
                resaltar={[2]}
                codigo={`{tareas.map((tarea) => (
  <li key={tarea.id}>
    <input type="checkbox" />
    {tarea.texto}
    <button type="button" onClick={() => borrar(tarea.id)}>
      borrar
    </button>
  </li>
))}`}
              />
              <p>
                Fijate que ya no hace falta el parámetro <code>i</code> del{" "}
                <code>map</code>: si no lo usás para nada más, sacalo.
              </p>
            </div>
          }
        >
          <p>
            Este componente tiene un bug que solo aparece cuando lo usás. Tildá
            el checkbox de <em>Hacer el TP</em> y recién después borrá{" "}
            <em>Estudiar React</em>: el tilde se muda solo, y termina en{" "}
            <em>Dormir</em>. Encontrá la línea culpable y arreglala.
          </p>
          <Codigo
            archivo="ListaDeTareas.js"
            codigo={`function ListaDeTareas() {
  const [tareas, setTareas] = useState([
    { id: 1, texto: "Estudiar React" },
    { id: 2, texto: "Hacer el TP" },
    { id: 3, texto: "Dormir" },
  ]);

  function borrar(id) {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  }

  return (
    <ul>
      {tareas.map((tarea, i) => (
        <li key={i}>
          <input type="checkbox" />
          {tarea.texto}
          <button type="button" onClick={() => borrar(tarea.id)}>
            borrar
          </button>
        </li>
      ))}
    </ul>
  );
}`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
