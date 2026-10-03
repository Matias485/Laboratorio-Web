import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import ListaArtistas from "./ListaArtistas";
import ListaQueMuta from "./ListaQueMuta";
import ListaQueCopia from "./ListaQueCopia";
import TareasDemo from "./TareasDemo";
import InsertarEnMedio from "./InsertarEnMedio";

export const metadata = { title: "Arreglos en estado" };

const celda = {
  border: "1px solid var(--borde)",
  padding: "9px 12px",
  verticalAlign: "top",
  textAlign: "left",
};

const encabezado = {
  ...celda,
  background: "var(--superficie-2)",
  fontSize: "0.8rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

export default function Pagina() {
  return (
    <Leccion
      slug="/react/arreglos-en-estado"
      titulo="Arreglos en estado"
      resumen="Agregar, borrar, modificar y ordenar sin mutar el arreglo original."
    >
      <Seccion titulo="La regla no cambió: no se toca, se reemplaza">
        <p>
          Un arreglo guardado en estado es igual de intocable que{" "}
          <Link href="/react/objetos-en-estado">un objeto</Link>. Podés leerlo todo lo
          que quieras, pero no podés modificarlo: tenés que armar un arreglo{" "}
          <strong>nuevo</strong> y pasárselo a la función <code>set</code>.
        </p>
        <p>
          El problema es que JavaScript te deja mutar sin quejarse. <code>push</code>{" "}
          funciona, no tira ningún error, y sin embargo la pantalla no cambia.
          React no revisa el contenido del arreglo: solamente compara si el arreglo
          que le pasaste es <em>el mismo de antes</em>. Si es el mismo, se queda
          quieto.
        </p>
        <Comparacion>
          <Columna tono="mal" titulo="Mutar el arreglo del estado">
            <Codigo
              archivo="así no"
              codigo={`artistas.push(nuevo);   // toca el arreglo que ya estaba
setArtistas(artistas);  // le paso el MISMO arreglo: no pasa nada`}
            />
          </Columna>
          <Columna tono="bien" titulo="Armar uno nuevo">
            <Codigo
              archivo="así sí"
              codigo={`setArtistas([...artistas, nuevo]);  // arreglo nuevo, React redibuja`}
            />
          </Columna>
        </Comparacion>
      </Seccion>

      <Seccion titulo="La tabla que conviene tener a mano">
        <p>
          Casi todo se reduce a saber cuál de los dos métodos parecidos muta y cuál
          devuelve uno nuevo. Esta tabla es lo más útil de la lección: copiala en tu
          carpeta.
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
                <th style={encabezado}>Querés…</th>
                <th style={{ ...encabezado, color: "var(--rojo)" }}>
                  Muta · prohibido
                </th>
                <th style={{ ...encabezado, color: "var(--verde)" }}>
                  Devuelve uno nuevo · correcto
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={celda}>agregar</td>
                <td style={celda}>
                  <code>push</code>, <code>unshift</code>
                </td>
                <td style={celda}>
                  spread: <code>[...arr, nuevo]</code> o <code>[nuevo, ...arr]</code>
                </td>
              </tr>
              <tr>
                <td style={celda}>borrar</td>
                <td style={celda}>
                  <code>pop</code>, <code>shift</code>, <code>splice</code>
                </td>
                <td style={celda}>
                  <code>filter</code>
                </td>
              </tr>
              <tr>
                <td style={celda}>reemplazar</td>
                <td style={celda}>
                  asignar por índice: <code>arr[0] = x</code>
                </td>
                <td style={celda}>
                  <code>map</code>
                </td>
              </tr>
              <tr>
                <td style={celda}>ordenar o dar vuelta</td>
                <td style={celda}>
                  <code>sort</code>, <code>reverse</code>
                </td>
                <td style={celda}>
                  copiar primero: <code>[...arr].sort()</code>
                </td>
              </tr>
              <tr>
                <td style={celda}>insertar en el medio</td>
                <td style={celda}>
                  <code>splice</code>
                </td>
                <td style={celda}>
                  <code>slice</code> + spread
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Nota tipo="atencion" titulo="slice y splice no son lo mismo">
          <p>
            Se escriben casi igual y hacen cosas opuestas. <code>slice</code>{" "}
            <strong>corta una copia</strong> y deja el original intacto:{" "}
            <code>arr.slice(1, 3)</code> te devuelve un pedazo. <code>splice</code>{" "}
            <strong>opera sobre el original</strong>, le saca o le mete elementos
            adentro. En estado, <code>slice</code> es tu amigo y <code>splice</code>{" "}
            está prohibido.
          </p>
        </Nota>
        <Nota tipo="info" titulo="Cómo reconocerlos sin memorizar la tabla">
          <p>
            Los que mutan son casi todos los que aprendiste primero en Programación
            I: <code>push</code>, <code>pop</code>, <code>shift</code>,{" "}
            <code>unshift</code>, <code>splice</code>, <code>sort</code> y{" "}
            <code>reverse</code>. Los que sirven en React son los que arman un
            arreglo <strong>nuevo</strong> y dejan el original intacto:{" "}
            <code>filter</code>, <code>map</code>, <code>slice</code>,{" "}
            <code>concat</code> y el spread.
          </p>
          <p>
            Cuidado con la regla fácil de &quot;si devuelve algo, está bien&quot;:{" "}
            <code>sort</code> y <code>reverse</code> también devuelven un arreglo,
            pero te devuelven <em>el mismo</em> que acaban de revolver. La pregunta
            correcta no es si el método devuelve algo, sino si el arreglo original
            quedó tal como estaba.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Agregar y borrar">
        <p>
          Estos son los tres bloques de la diapositiva, copiados tal cual del
          archivo del demo que viene abajo: por eso aparecen también las guardas
          contra el campo vacío y alguna línea de limpieza. Mirá la línea resaltada
          de cada uno y vas a ver que los tres hacen lo mismo: construyen un arreglo
          nuevo y se lo dan a <code>setArtistas</code>.
        </p>
        <Codigo
          archivo="app/react/arreglos-en-estado/ListaArtistas.js"
          resaltar={[5]}
          codigo={`// Agregar al final: primero lo que ya estaba, después el nuevo.
function agregarAlFinal(evento) {
  evento.preventDefault();
  if (nombre.trim() === "") return;
  setArtistas([...artistas, { id: siguienteId++, nombre: nombre.trim() }]);
  setNombre("");
}`}
        />
        <Codigo
          archivo="app/react/arreglos-en-estado/ListaArtistas.js"
          resaltar={[4]}
          codigo={`// Agregar al principio: el objeto nuevo va ANTES del spread.
function agregarAlPrincipio() {
  if (nombre.trim() === "") return;
  setArtistas([{ id: siguienteId++, nombre: nombre.trim() }, ...artistas]);
  setNombre("");
}`}
        />
        <Codigo
          archivo="app/react/arreglos-en-estado/ListaArtistas.js"
          resaltar={[3]}
          codigo={`// Borrar: filter deja pasar a todos menos al del id que le pedimos.
function borrar(artista) {
  setArtistas(artistas.filter((a) => a.id !== artista.id));
  if (editandoId === artista.id) setEditandoId(null);
}`}
        />
        <p>
          Abajo está todo junto y andando: agregar por los dos lados, borrar,
          editar el nombre en línea, ordenar e invertir. Mirá el bloque gris del
          final mientras tocás los botones: ese es el arreglo del estado de verdad.
        </p>
        <Demo titulo="Lista de artistas · el demo principal">
          <ListaArtistas />
        </Demo>
        <h3>El id no sale de la posición</h3>
        <p>
          Cada artista trae un <code>id</code> propio que se genera una sola vez,
          cuando lo creás, y no vuelve a cambiar nunca. Podrías haber usado la
          posición en el arreglo, pero la posición se mueve: si ordenás la lista,
          el tercero pasa a ser el primero, y de golpe el botón &quot;borrar&quot;
          de una fila borra otra.
        </p>
        <Codigo
          archivo="app/react/arreglos-en-estado/ListaArtistas.js"
          codigo={`// El contador de ids vive AFUERA del componente: si estuviera adentro se
// reiniciaría en cada dibujo y todos los artistas nuevos tendrían el id 4.
let siguienteId = 4;`}
        />
        <Nota tipo="info" titulo="Esto sigue en la próxima lección">
          <p>
            Ese mismo id es el que después va en <code>key</code> cuando dibujás la
            lista con <code>map</code>. En{" "}
            <Link href="/react/listas-y-keys">Listas y key</Link> vas a ver qué se rompe
            exactamente cuando la key es la posición.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="El error en vivo: push no rompe nada, y ese es el problema">
        <p>
          Las dos listas de abajo son idénticas salvo por una línea. En la de la
          izquierda el botón usa <code>push</code> y después llama a{" "}
          <code>setLista(lista)</code> con el mismo arreglo. Tocala tres veces: no
          se mueve nada, no hay ningún error en la consola.
        </p>
        <Comparacion>
          <Columna tono="mal" titulo="push + setLista(lista)">
            <Codigo
              archivo="app/react/arreglos-en-estado/ListaQueMuta.js"
              resaltar={[5]}
              codigo={`function agregar() {
  // push MUTA el arreglo que ya estaba en el estado.
  lista.push("Ítem " + (lista.length + 1));
  // Le devolvemos a React el mismo arreglo: no ve ninguna diferencia.
  setLista(lista);
}`}
            />
            <ListaQueMuta />
          </Columna>
          <Columna tono="bien" titulo="spread">
            <Codigo
              archivo="app/react/arreglos-en-estado/ListaQueCopia.js"
              resaltar={[3]}
              codigo={`function agregar() {
  // [...lista, algo] no toca el viejo: devuelve un arreglo nuevo.
  setLista([...lista, "Ítem " + (lista.length + 1)]);
}`}
            />
            <ListaQueCopia />
          </Columna>
        </Comparacion>
        <p>
          Lo peor no es que la pantalla no se actualice: es que el dato{" "}
          <strong>sí cambió</strong>. El botón &quot;Forzar un re-dibujo&quot; de la
          columna roja no agrega nada, solamente cambia otro estado cualquiera para
          obligar al componente a dibujarse; ahí aparecen de golpe todos los ítems
          que <code>push</code> había metido a escondidas, y el contador de largo
          salta. Tu estado y tu pantalla venían diciendo cosas distintas.
        </p>
        <Nota tipo="error" titulo="Por qué no alcanza con avisarle a React">
          <p>
            <code>setLista(lista)</code> no es una orden de redibujar, es un
            &quot;guardá esto&quot;. React lo guarda, lo compara con lo que ya tenía
            —el mismo arreglo— y como no hay diferencia se ahorra el trabajo. La
            copia no es una formalidad: es la única manera que tiene de darse cuenta.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Cambiar un objeto que vive adentro del arreglo">
        <p>
          Este es el caso que más vas a escribir: una lista de objetos y querés
          tocar uno solo. Necesitás dos copias, una adentro de la otra:{" "}
          <code>map</code> arma el arreglo nuevo y el spread arma el objeto nuevo
          de la fila que cambia. Los demás objetos se devuelven tal cual, sin
          copiarlos.
        </p>
        <Codigo
          archivo="app/react/arreglos-en-estado/TareasDemo.js"
          resaltar={[4]}
          codigo={`function alternar(id) {
  setTareas(
    tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea,
    ),
  );
}`}
        />
        <p>
          Leelo como una frase: &quot;dame un arreglo nuevo donde, si la tarea es
          esta, va una copia de la tarea con <code>hecha</code> dado vuelta, y si no,
          va la tarea de antes&quot;.
        </p>
        <Demo titulo="Tareas · map + spread">
          <TareasDemo />
        </Demo>
        <Comparacion>
          <Columna tono="mal" titulo="Buscar y modificar">
            <Codigo
              archivo="así no"
              codigo={`const tarea = tareas.find((t) => t.id === id);
tarea.hecha = !tarea.hecha;  // mutaste el objeto del estado
setTareas(tareas);           // y encima el arreglo es el mismo`}
            />
          </Columna>
          <Columna tono="bien" titulo="map + spread">
            <Codigo
              archivo="así sí"
              codigo={`setTareas(
  tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)),
);`}
            />
          </Columna>
        </Comparacion>
      </Seccion>

      <Seccion titulo="Ordenar, invertir e insertar en el medio">
        <p>
          <code>sort</code> y <code>reverse</code> ordenan el arreglo{" "}
          <em>en su lugar</em> y además te devuelven el mismo arreglo, así que{" "}
          <code>setArtistas(artistas.sort(...))</code> muta y encima no redibuja.
          La receta es siempre la misma: copiá con spread y ordená la copia.
        </p>
        <Codigo
          archivo="app/react/arreglos-en-estado/ListaArtistas.js"
          resaltar={[3, 8]}
          codigo={`// Ordenar: sort muta, así que copiamos con spread y ordenamos la copia.
function ordenar() {
  setArtistas([...artistas].sort((a, b) => a.nombre.localeCompare(b.nombre)));
}

// Invertir: reverse también muta. Misma receta: copia y después reverse.
function invertir() {
  setArtistas([...artistas].reverse());
}`}
        />
        <Nota tipo="atencion" titulo="El spread copia una sola capa">
          <p>
            <code>[...artistas]</code> te da un arreglo nuevo, pero los objetos de
            adentro son los mismos de antes. Para ordenar alcanza, porque solo
            cambia el orden. Si además querés cambiar el contenido de un objeto,
            necesitás el spread del objeto también: <code>{"{ ...artista }"}</code>.
          </p>
        </Nota>
        <Nota tipo="info" titulo="Dato extra: toSorted y toReversed">
          <p>
            JavaScript sumó hace poco <code>toSorted()</code>,{" "}
            <code>toReversed()</code> y <code>toSpliced()</code>, que hacen lo mismo
            que sus primos pero devolviendo un arreglo nuevo, sin tocar el original.
            O sea que <code>artistas.toSorted(...)</code> es equivalente a{" "}
            <code>[...artistas].sort(...)</code>. Conocelos, pero en la cursada
            escribí la versión con spread: es la que aparece en las diapositivas y
            la que vas a ver en cualquier código de React un poco más viejo.
          </p>
        </Nota>
        <p>
          Para meter algo en el medio no hay un método directo: se arma con dos{" "}
          <code>slice</code> y un spread. Cambiá la posición en el demo y mirá cómo
          quedan los dos pedazos.
        </p>
        <Codigo
          archivo="app/react/arreglos-en-estado/InsertarEnMedio.js"
          resaltar={[5, 6, 7]}
          codigo={`function insertar() {
  if (texto.trim() === "") return;
  // slice NO muta: devuelve copias. Con dos cortes y un spread armamos
  // el arreglo nuevo con el paso metido justo en el medio.
  const antes = pasos.slice(0, posicion); // copia del principio
  const despues = pasos.slice(posicion); // copia del resto
  setPasos([...antes, { id: siguienteId++, texto: texto.trim() }, ...despues]);
}`}
        />
        <Demo titulo="Insertar un paso con slice">
          <InsertarEnMedio />
        </Demo>
      </Seccion>

      <Seccion titulo="Practicá vos">
        <Desafio
          titulo="1 · Borrar todas las completadas"
          pista={
            <p>
              No tenés que recorrer nada a mano ni borrar de a una.{" "}
              <code>filter</code> arma un arreglo nuevo con los que cumplen la
              condición: pedile los que <strong>no</strong> están hechos.
            </p>
          }
          solucion={
            <Codigo
              archivo="para agregar en TareasDemo.js"
              codigo={`function borrarCompletadas() {
  // Nos quedamos solo con las que NO están hechas.
  setTareas(tareas.filter((tarea) => !tarea.hecha));
}

// En el JSX, al lado de "Marcar todas":
<button type="button" className="boton boton-suave" onClick={borrarCompletadas}>
  Borrar completadas
</button>`}
            />
          }
        >
          <p>
            Agregale al demo de tareas un botón <strong>Borrar completadas</strong>{" "}
            que saque de la lista todas las que están tildadas, sin tocar las otras.
          </p>
        </Desafio>

        <Desafio
          titulo="2 · Subir un elemento una posición"
          pista={
            <p>
              Asignar por índice está prohibido sobre el arreglo{" "}
              <em>del estado</em>, pero sobre una copia tuya podés hacer lo que
              quieras: copiá con spread, intercambiá dos posiciones en la copia y
              recién ahí llamá a la función <code>set</code>. Acordate del caso del
              primer elemento.
            </p>
          }
          solucion={
            <Codigo
              archivo="para agregar en InsertarEnMedio.js"
              resaltar={[3]}
              codigo={`function subir(indice) {
  if (indice === 0) return;         // el primero no puede subir más
  const copia = [...pasos];         // copia nueva: el original queda intacto
  const anterior = copia[indice - 1];
  copia[indice - 1] = copia[indice];
  copia[indice] = anterior;
  setPasos(copia);
}

// Otra forma, sin asignar por índice, usando slice:
function subirConSlice(indice) {
  if (indice === 0) return;
  setPasos([
    ...pasos.slice(0, indice - 1),
    pasos[indice],
    pasos[indice - 1],
    ...pasos.slice(indice + 1),
  ]);
}`}
            />
          }
        >
          <p>
            Escribí una función <code>subir(indice)</code> que mueva un paso una
            posición hacia arriba sin mutar el arreglo, y ponele un botón{" "}
            <strong>↑</strong> a cada fila del demo de los pasos. El primero de la
            lista no se tiene que poder subir.
          </p>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
