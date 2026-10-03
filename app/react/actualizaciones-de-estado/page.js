import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import ContadorMasTres from "./ContadorMasTres";
import SustitucionDemo from "./SustitucionDemo";
import MasTresDirecto from "./MasTresDirecto";
import MasTresActualizador from "./MasTresActualizador";
import ColaDeActualizaciones from "./ColaDeActualizaciones";
import RegistroConRetraso from "./RegistroConRetraso";
import NoEsRecarga from "./NoEsRecarga";

export const metadata = { title: "Cómo se actualiza el estado" };

export default function Pagina() {
  return (
    <Leccion
      slug="/react/actualizaciones-de-estado"
      titulo="Cómo se actualiza el estado"
      resumen="La instantánea del render, por qué setNumber tres veces suma uno, y las funciones actualizadoras."
    >
      <Seccion titulo="El ejemplo que no cierra">
        <p>
          Este contador tiene un botón <strong>+3</strong>. Su manejador llama
          tres veces seguidas a <code>setNumero(numero + 1)</code>. Antes de leer
          una línea más, apretalo.
        </p>

        <Demo titulo="Demo en vivo · el contador de la diapositiva">
          <ContadorMasTres />
        </Demo>

        <Codigo
          archivo="app/react/actualizaciones-de-estado/ContadorMasTres.js"
          resaltar={[4, 5, 6]}
          codigo={`const [numero, setNumero] = useState(0);

function manejarMasTres() {
  setNumero(numero + 1);
  setNumero(numero + 1);
  setNumero(numero + 1);
}`}
        />

        <p>
          Sube <strong>de a uno</strong>. No es un bug de React ni una carrera
          entre las tres llamadas: es exactamente lo que le pediste. Falta ver
          por qué.
        </p>
      </Seccion>

      <Seccion titulo="La instantánea del render">
        <p>
          Mirá la primera línea: <code>const [numero, setNumero]</code>. Es una{" "}
          <strong>constante</strong>. Dentro de un render, <code>numero</code> no
          cambia nunca: es una <strong>instantánea</strong> (una foto) del valor
          que el estado tenía cuando ese render arrancó.
        </p>
        <p>
          <code>setNumero</code> no le asigna nada a esa constante. Lo que hace
          es anotarle a React: «para el próximo render, el estado tiene que
          valer esto». La constante de <em>este</em> render no cambia nunca: el
          valor nuevo aparece en el render <em>siguiente</em>, que se ejecuta de
          cero y tiene su propia constante <code>numero</code>.
        </p>

        <Demo titulo="Demo en vivo · reemplazá la variable por su valor">
          <SustitucionDemo />
        </Demo>

        <Codigo
          archivo="app/react/actualizaciones-de-estado/SustitucionDemo.js"
          codigo={`function manejarMasTres() {
  // Supongamos que numero vale 0 en este render.
  setNumero(numero + 1); // es setNumero(0 + 1) -> "poné 1"
  setNumero(numero + 1); // es setNumero(0 + 1) -> "poné 1"
  setNumero(numero + 1); // es setNumero(0 + 1) -> "poné 1"
}`}
        />

        <p>
          Las tres llamadas piden lo mismo. React se queda con el último pedido y
          el próximo render arranca con <code>numero</code> valiendo 1.
        </p>
      </Seccion>

      <Seccion titulo="La función actualizadora">
        <p>
          Cuando el valor nuevo <strong>depende del anterior</strong>, en vez de
          pasarle un valor a <code>setNumero</code> pasale una{" "}
          <strong>función</strong>: <code>setNumero(n =&gt; n + 1)</code>. React
          la guarda en la cola y después se la aplica al último valor que haya en
          esa cola, no al de la instantánea.
        </p>

        <Demo titulo="Demo en vivo · los dos botones +3, lado a lado">
          <Comparacion>
            <Columna tono="mal" titulo="Tres veces con el valor">
              <MasTresDirecto />
            </Columna>
            <Columna tono="bien" titulo="Tres veces con la función">
              <MasTresActualizador />
            </Columna>
          </Comparacion>
        </Demo>

        <Comparacion>
          <Columna tono="mal" titulo="Suma uno">
            <Codigo
              archivo="app/react/actualizaciones-de-estado/MasTresDirecto.js"
              codigo={`function manejarMasTres() {
  setNumero(numero + 1);
  setNumero(numero + 1);
  setNumero(numero + 1);
}`}
            />
            <p className="tenue">
              Las tres leen la misma foto de <code>numero</code>.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Suma tres">
            <Codigo
              archivo="app/react/actualizaciones-de-estado/MasTresActualizador.js"
              codigo={`function manejarMasTres() {
  setNumero((n) => n + 1);
  setNumero((n) => n + 1);
  setNumero((n) => n + 1);
}`}
            />
            <p className="tenue">
              Cada una recibe en <code>n</code> lo que dejó la anterior.
            </p>
          </Columna>
        </Comparacion>

        <p>
          La regla práctica es corta: si el valor nuevo se calcula{" "}
          <strong>a partir del anterior</strong>, usá la función actualizadora.
          Si no depende del anterior (un reinicio, el texto de un input, una
          opción elegida), pasá el valor directo y listo.
        </p>

        <Codigo
          archivo="las dos formas, una al lado de la otra"
          codigo={`setNumero(0);              // no depende del anterior: valor directo
setNumero((n) => n + 1);   // depende del anterior: función actualizadora`}
        />

        <Nota tipo="info" titulo="El nombre del parámetro da igual">
          <p>
            <code>n</code>, <code>anterior</code>, <code>numeroActual</code>: es
            un parámetro común, elegí el que se lea mejor. La convención en la
            documentación de React es la inicial del estado.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La cola de actualizaciones y el agrupado">
        <p>
          React no re-renderiza después de cada <code>setNumero</code>. Espera a
          que el manejador termine, y recién ahí procesa todas las llamadas
          juntas y dibuja una vez. A eso se le dice{" "}
          <strong>agrupado de actualizaciones</strong> (en inglés,{" "}
          <em>batching</em>). Por eso tres llamadas no producen tres renders: es
          como un mozo que espera a que termines de pedir antes de ir a la
          cocina.
        </p>
        <p>
          Desde React 18 el agrupado es <strong>automático</strong> y no pasa
          solo en los manejadores: si hacés dos <code>setEstado</code> adentro de
          un <code>setTimeout</code> o de una promesa, React también los junta en
          un solo render.
        </p>
        <p>
          Armá tu propia cola y mirá cómo la procesa. Ojo a la diferencia: un
          valor <strong>reemplaza</strong> lo que había, una función lo{" "}
          <strong>actualiza</strong>.
        </p>

        <Demo titulo="Demo en vivo · armá la cola y mirá el resultado">
          <ColaDeActualizaciones />
        </Demo>

        <Codigo
          archivo="app/react/actualizaciones-de-estado/ColaDeActualizaciones.js"
          codigo={`// Simulamos lo que hace React cuando termina el manejador: arranca del valor de
// la instantánea y va aplicando la cola en orden, una llamada atrás de la otra.
// El resultado de una es la entrada de la siguiente.
function procesarCola(instantanea, cola) {
  const pasos = [];
  let valor = instantanea;

  for (const item of cola) {
    const accion = ACCIONES[item.tipo];
    const anterior = valor;
    valor = accion.calcular(anterior, instantanea);
    pasos.push({ id: item.id, accion, anterior, resultado: valor });
  }

  return { pasos, valor };
}`}
        />

        <Nota tipo="ok" titulo="Se puede mezclar">
          <p>
            Dejá <code>numero</code> en 0 y agregá{" "}
            <code>setNumero(numero + 5)</code> y después{" "}
            <code>setNumero(n =&gt; n + 1)</code>: termina en 6. El valor pisa lo
            que hubiera en la cola y la función suma sobre ese 5. Probalo arriba.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La instantánea también viaja en el setTimeout">
        <p>
          Si adentro del manejador arrancás algo que va a pasar más tarde, esa
          función se lleva puesta la instantánea del render en el que nació.
          Apretá el botón y esperá tres segundos.
        </p>

        <Demo titulo="Demo en vivo · +5 y un aviso tres segundos después">
          <RegistroConRetraso />
        </Demo>

        <Codigo
          archivo="app/react/actualizaciones-de-estado/RegistroConRetraso.js"
          resaltar={[8]}
          codigo={`function manejarClick() {
  setNumero(numero + 5);
  anotar(\`Click: numero valía \${numero}, así que pedí \${numero} + 5 = \${numero + 5}.\`);

  setTimeout(() => {
    // Esta función nació en aquel render y se llevó puesta su instantánea:
    // numero adentro del setTimeout sigue siendo el valor de ese momento.
    anotar(\`3 segundos después: adentro del setTimeout, numero todavía vale \${numero}.\`);
  }, 3000);
}`}
        />

        <p>
          El número grande ya cambió, pero el registro anota el valor viejo. No
          está desactualizado por lento: está leyendo la variable del render en
          el que se creó, que es una constante y nunca cambió.
        </p>
      </Seccion>

      <Seccion titulo="Re-renderizar no es recargar la página">
        <p>
          Re-renderizar es que React <strong>vuelva a llamar a la función</strong>{" "}
          de tu componente con el estado nuevo, compare el JSX que devuelve con
          lo que ya había dibujado y toque en el DOM solo lo que cambió. El
          navegador no recarga nada: no se pierden los otros estados, ni el
          scroll, ni lo que el usuario venía escribiendo.
        </p>

        <Demo titulo="Demo en vivo · el texto sobrevive al re-render">
          <NoEsRecarga />
        </Demo>

        <Nota tipo="atencion" titulo="Nunca llames a setEstado en el cuerpo del componente">
          <p>
            Si escribís <code>setNumero(numero + 1)</code> suelto en el cuerpo
            del componente, provocás un render, que vuelve a ejecutar el cuerpo,
            que provoca otro render... Es un bucle infinito. El síntoma es
            inconfundible: el componente deja de dibujarse y aparece el error{" "}
            <code>Too many re-renders</code> (React corta a los pocos ciclos
            justamente para que no te quede la pestaña colgada) o, si el bucle
            pasa por un efecto,{" "}
            <code>Maximum update depth exceeded</code>. Los{" "}
            <code>setEstado</code> van <strong>adentro de un manejador</strong>{" "}
            (o de un efecto, que vas a ver más adelante).
          </p>
        </Nota>

        <Comparacion>
          <Columna tono="mal" titulo="Bucle infinito">
            <Codigo
              archivo="Contador.js (roto, no lo copies)"
              codigo={`function Contador() {
  const [numero, setNumero] = useState(0);

  // Se ejecuta en cada render y pide otro render. Para nunca.
  setNumero(numero + 1);

  return <p>{numero}</p>;
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Adentro de un manejador">
            <Codigo
              archivo="Contador.js (arreglado)"
              codigo={`function Contador() {
  const [numero, setNumero] = useState(0);

  // Corre solo cuando el usuario hace click.
  return (
    <button type="button" onClick={() => setNumero(numero + 1)}>
      {numero}
    </button>
  );
}`}
            />
          </Columna>
        </Comparacion>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="Este botón debería sumar dos"
          pista={
            <p>
              Las dos llamadas leen la misma instantánea de <code>puntos</code>,
              así que las dos piden <code>puntos + 1</code>. Necesitás que la
              segunda vea lo que dejó la primera.
            </p>
          }
          solucion={
            <Codigo
              archivo="Marcador.js"
              resaltar={[2, 3]}
              codigo={`function sumarDos() {
  setPuntos((p) => p + 1);
  setPuntos((p) => p + 1);
}`}
            />
          }
        >
          <p>
            Arreglá el manejador para que el marcador suba de a dos, sin cambiar
            la cantidad de llamadas a <code>setPuntos</code>.
          </p>
          <Codigo
            archivo="Marcador.js"
            codigo={`const [puntos, setPuntos] = useState(0);

function sumarDos() {
  setPuntos(puntos + 1);
  setPuntos(puntos + 1);
}`}
          />
        </Desafio>

        <Desafio
          titulo="Duplicar y después sumar uno"
          pista={
            <p>
              Son dos llamadas, las dos con función actualizadora, y el orden
              importa: primero la que duplica, después la que suma. Cada una
              recibe en su parámetro lo que dejó la anterior.
            </p>
          }
          solucion={
            <Codigo
              archivo="Marcador.js"
              codigo={`function duplicarYSumarUno() {
  setPuntos((p) => p * 2);  // 3 -> 6
  setPuntos((p) => p + 1);  // 6 -> 7
}

// Con puntos = 3, la pantalla muestra 7 después de un solo render.`}
            />
          }
        >
          <p>
            Escribí el manejador <code>duplicarYSumarUno</code>: tiene que
            duplicar el valor actual de <code>puntos</code> y después sumarle
            uno, usando funciones actualizadoras. Si <code>puntos</code> vale 3,
            tiene que quedar en 7.
          </p>
          <Codigo
            archivo="Marcador.js"
            codigo={`const [puntos, setPuntos] = useState(3);

function duplicarYSumarUno() {
  // completá acá
}`}
          />
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
