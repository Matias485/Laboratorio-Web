import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import Link from "next/link";
import Perfil from "./Perfil";
import GaleriaDemo from "./GaleriaDemo";
import MayusculaDemo from "./MayusculaDemo";
import DondeSeDefineDemo from "./DondeSeDefineDemo";
import ArmadorDeGaleriaDemo from "./ArmadorDeGaleriaDemo";

export const metadata = { title: "Componentes" };

export default function Pagina() {
  return (
    <Leccion
      slug="/react/componentes"
      titulo="Componentes"
      resumen="Un componente es una función que devuelve JSX. Por qué el nombre va en mayúscula."
    >
      <Seccion titulo="Un componente es una función">
        <p>
          No hay magia acá: un componente de React es una función común de
          JavaScript que devuelve JSX, o sea algo que se parece mucho a HTML.
          Una vez que la escribiste, la usás como si fuera una etiqueta HTML que
          inventaste vos: <code>&lt;Perfil /&gt;</code>.
        </p>
        <p>Son tres pasos, y siempre los mismos:</p>
        <ol>
          <li>
            <strong>Exportarlo</strong> con <code>export default</code>, así
            otro archivo lo puede importar.
          </li>
          <li>
            <strong>Definir la función</strong>. Su nombre empieza con{" "}
            <strong>mayúscula</strong>, sin excepción.
          </li>
          <li>
            <strong>Devolver JSX</strong> con <code>return</code>.
          </li>
        </ol>

        <Codigo
          archivo="app/react/componentes/Perfil.js"
          resaltar={[3, 4]}
          codigo={`// El ejemplo de la clase, tal cual sale de la documentación de React.
// Lo único que le agregamos es el ancho, para que la foto no salga gigante.
export default function Perfil() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
      style={{ width: 120, borderRadius: 10 }}
    />
  );
}`}
        />

        <p>
          Ese archivo existe de verdad en este proyecto, y esta página lo importa
          y lo usa. Esto es lo que devuelve:
        </p>

        <Demo titulo="Perfil.js">
          <Perfil />
        </Demo>

        <Nota tipo="info" titulo="Devuelve un solo elemento raíz">
          <p style={{ marginBottom: 0 }}>
            Fijate que el <code>return</code> devuelve{" "}
            <strong>un solo elemento</strong>: la <code>&lt;img&gt;</code>. Una
            función devuelve un valor y nada más, así que si necesitás dos cosas
            al mismo nivel hay que envolverlas en un elemento que las contenga (
            <code>&lt;div&gt;</code>, <code>&lt;section&gt;</code>,{" "}
            <code>&lt;figure&gt;</code>…) o en unas etiquetas vacías{" "}
            <code>&lt;&gt;...&lt;/&gt;</code>.
          </p>
        </Nota>

        <Comparacion>
          <Columna tono="mal" titulo="Dos elementos sueltos">
            <Codigo
              archivo="PerfilConNombre.js"
              codigo={`function PerfilConNombre() {
  return (
    <img src="https://i.imgur.com/lICfvbD.jpg" alt="Aklilu Lemma" />
    <p>Aklilu Lemma</p>
  );
}`}
            />
            <p className="tenue" style={{ marginBottom: 0 }}>
              Ni siquiera compila: la <code>&lt;img&gt;</code> y el{" "}
              <code>&lt;p&gt;</code> están al mismo nivel y no hay nada que los
              envuelva.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Un solo elemento raíz">
            <Codigo
              archivo="PerfilConNombre.js"
              codigo={`function PerfilConNombre() {
  return (
    <figure>
      <img src="https://i.imgur.com/lICfvbD.jpg" alt="Aklilu Lemma" />
      <figcaption>Aklilu Lemma</figcaption>
    </figure>
  );
}`}
            />
            <p className="tenue" style={{ marginBottom: 0 }}>
              Los dos van adentro de una <code>&lt;figure&gt;</code>. El{" "}
              <code>return</code> devuelve una sola cosa y listo.
            </p>
          </Columna>
        </Comparacion>

        <p className="tenue">
          Esa regla y el resto de las reglas de JSX las ves en detalle en{" "}
          <Link href="/react/jsx">JSX</Link>, la lección que sigue.
        </p>

        <Nota tipo="atencion" titulo="Los paréntesis después de return">
          <p>
            Si escribís <code>return</code> solo y el JSX en la línea de abajo,
            JavaScript te mete un punto y coma automático: tu componente devuelve{" "}
            <code>undefined</code> y no se dibuja nada, sin ningún mensaje de
            error. O arrancás el JSX en la misma línea del <code>return</code>, o
            abrís paréntesis ahí mismo, como en el ejemplo de arriba.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Por qué se inventaron los componentes">
        <p>
          Con HTML y CSS a mano, repetir una tarjeta tres veces es copiar y pegar
          tres veces. Y cuando hay que cambiarle el borde, te tenés que acordar
          de cambiarlo en los tres lados (y en las otras nueve páginas donde
          también estaba). El componente da vuelta el problema: lo escribís una
          vez, lo usás muchas, y cuando lo cambiás cambia en todos lados.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Frontend tradicional">
            <Codigo
              archivo="index.html"
              codigo={`<!-- La misma foto copiada y pegada tres veces. -->
<img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart">
<img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart">
<img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart">`}
            />
            <p className="tenue" style={{ marginBottom: 0 }}>
              Para cambiar la foto hay que tocar tres líneas. Si te olvidás de
              una, queda distinta y nadie se entera hasta que lo ve un usuario.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Con componentes">
            <Codigo
              archivo="Galeria.js"
              codigo={`// La definís una sola vez...
function Perfil() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
}

// ...y la usás las veces que quieras.
export default function Galeria() {
  return (
    <section>
      <Perfil />
      <Perfil />
      <Perfil />
    </section>
  );
}`}
            />
            <p className="tenue" style={{ marginBottom: 0 }}>
              Para cambiar la foto tocás una sola línea y cambian las tres.
            </p>
          </Columna>
        </Comparacion>
      </Seccion>

      <Seccion titulo="Un componente adentro de otro">
        <p>
          Este es el ejemplo de la diapositiva de reutilización:{" "}
          <code>Galeria</code> usa <code>Perfil</code> tres veces adentro de una{" "}
          <code>&lt;section&gt;</code>. <code>Galeria</code> es el{" "}
          <strong>padre</strong> y cada <code>Perfil</code> es un{" "}
          <strong>hijo</strong>.
        </p>

        <Codigo
          archivo="app/react/componentes/GaleriaDemo.js"
          resaltar={[20, 21, 22]}
          codigo={`"use client";

// Un componente es una función de JavaScript que devuelve JSX.
function Perfil() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
      style={{ width: 96, height: 96, borderRadius: 10, objectFit: "cover" }}
    />
  );
}

// Y otro componente lo usa tres veces, como si fuera una etiqueta HTML propia.
export default function GaleriaDemo() {
  return (
    <section>
      <h3>Científicos increíbles</h3>
      <div className="fila">
        <Perfil />
        <Perfil />
        <Perfil />
      </div>
    </section>
  );
}`}
        />

        <Demo titulo="La galería de la diapositiva">
          <GaleriaDemo />
        </Demo>

        <p className="tenue">
          En la documentación de React el título de la galería es un{" "}
          <code>&lt;h1&gt;</code>; acá lo bajamos a <code>&lt;h3&gt;</code> para
          no pelearle al título de la página. Lo demás es igual.
        </p>

        <Nota tipo="atencion" titulo="Usar adentro sí, definir adentro no">
          <p>
            <code>Galeria</code> <strong>usa</strong> a <code>Perfil</code>{" "}
            adentro de su JSX: eso está perfecto y es lo normal. Lo que no se
            hace nunca es <strong>definir</strong> la función{" "}
            <code>Perfil</code> adentro de la función <code>Galeria</code>. Dos
            secciones más abajo vas a ver, funcionando, qué se rompe cuando lo
            hacés.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="La mayúscula no es un detalle de estilo">
        <p>
          Esta es la trampa número uno, y la vas a pisar igual aunque te la
          avisen. Cuando React se encuentra con una etiqueta en tu JSX, mira{" "}
          <strong>la primera letra</strong> para decidir qué es.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="perfil (minúscula)">
            <Codigo archivo="Galeria.js" codigo={`<perfil />`} />
            <p style={{ marginBottom: 0 }}>
              Empieza en minúscula, así que React lo trata como una etiqueta de
              HTML: escribe literalmente <code>&lt;perfil&gt;</code> en el
              documento. El navegador no conoce esa etiqueta, no dibuja nada, y
              en pantalla no aparece <strong>nada</strong>.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Perfil (mayúscula)">
            <Codigo archivo="Galeria.js" codigo={`<Perfil />`} />
            <p style={{ marginBottom: 0 }}>
              Empieza en mayúscula, así que React busca una variable llamada{" "}
              <code>Perfil</code> en ese archivo, ejecuta la función y dibuja lo
              que devuelve.
            </p>
          </Columna>
        </Comparacion>

        <p>
          Probalo acá. El botón de la izquierda usa <code>&lt;Perfil /&gt;</code>{" "}
          y el de la derecha <code>&lt;perfil /&gt;</code>. El componente es
          exactamente el mismo en los dos casos: lo único que cambia es una
          letra.
        </p>

        <Demo titulo="Mayúscula vs minúscula">
          <MayusculaDemo />
        </Demo>

        <Codigo
          archivo="app/react/componentes/MayusculaDemo.js"
          resaltar={[10, 11, 12, 16, 17, 18]}
          codigo={`// (recortado: el archivo completo tiene además los dos botones)
export default function MayusculaDemo() {
  const [mayuscula, setMayuscula] = useState(true);

  return (
    <div>
      {/* ...los botones que cambian el estado... */}
      {mayuscula ? (
        <div className="fila">
          <Perfil />
          <Perfil />
          <Perfil />
        </div>
      ) : (
        <div className="fila">
          <perfil />
          <perfil />
          <perfil />
        </div>
      )}
    </div>
  );
}`}
        />

        <Nota tipo="atencion" titulo="React te avisa, pero por consola">
          <p>
            Lo peligroso de este error es que <strong>no explota nada</strong>:
            la página carga, no hay pantalla roja, simplemente falta un pedazo.
            La única pista está en la consola del navegador (F12, solapa{" "}
            <em>Console</em>), donde React deja un mensaje parecido a este:
          </p>
          <Codigo
            archivo="consola del navegador"
            codigo={`The tag <perfil> is unrecognized in this browser.
If you meant to render a React component, start its name with an uppercase letter.`}
          />
          <p>
            Traducido: “no conozco la etiqueta <code>perfil</code>; si querías
            usar un componente, empezá el nombre con mayúscula”. Cuando algo que
            escribiste no aparece en pantalla, el primer lugar donde mirar es la
            consola.
          </p>
          <p style={{ marginBottom: 0 }}>
            Ojo con un detalle: React deja ese aviso{" "}
            <strong>una sola vez por etiqueta</strong> y por carga de página. Si
            apretás el botón de nuevo no lo vas a volver a ver. Para que
            aparezca, dejá la consola abierta y recargá la página.
          </p>
        </Nota>

        <Nota tipo="info" titulo="La regla completa">
          <p>
            Minúscula = etiqueta del navegador (<code>div</code>,{" "}
            <code>img</code>, <code>section</code>). Mayúscula = componente tuyo.
            Por eso los nombres de componentes se escriben siempre en{" "}
            <code>PascalCase</code>: <code>Perfil</code>,{" "}
            <code>TarjetaDeUsuario</code>, <code>BarraLateral</code>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Dónde se define un componente">
        <p>
          Un componente se define{" "}
          <strong>en el nivel de arriba del archivo</strong>, nunca adentro de
          otro componente. Es tentador meterlo adentro porque “total lo usa uno
          solo”, pero se rompe de una manera bastante difícil de diagnosticar.
        </p>
        <p>
          El motivo: la función del componente de afuera se vuelve a ejecutar en
          cada render. Si el de adentro está definido ahí, se{" "}
          <strong>crea una función nueva cada vez</strong>. React compara la
          función vieja con la nueva, ve que son distintas y asume que es otro
          componente: destruye el que había y monta uno nuevo desde cero. Todo lo
          que ese componente tenía guardado (el estado, el texto tipeado, el
          scroll) desaparece.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Definido adentro">
            <Codigo
              archivo="Galeria.js"
              codigo={`export default function Galeria() {
  // Mal: se redefine en cada render.
  function Perfil() {
    return <img src="..." alt="..." />;
  }

  return (
    <section>
      <Perfil />
    </section>
  );
}`}
            />
          </Columna>
          <Columna tono="bien" titulo="Definido afuera">
            <Codigo
              archivo="Galeria.js"
              codigo={`// Bien: los dos en el nivel de arriba del
// archivo, uno al lado del otro.
function Perfil() {
  return <img src="..." alt="..." />;
}

export default function Galeria() {
  return (
    <section>
      <Perfil />
    </section>
  );
}`}
            />
          </Columna>
        </Comparacion>

        <p>
          En este demo los dos contadores tienen el código idéntico: uno está
          definido adentro del demo y el otro afuera. Subilos a 3 los dos y
          después apretá <em>Redibujar</em>.
        </p>

        <Demo titulo="Qué le pasa al estado">
          <DondeSeDefineDemo />
        </Demo>

        <p>
          El de la derecha se acuerda de sus clicks; el de la izquierda vuelve a
          cero cada vez que el padre se redibuja. Lo único que cambia entre los
          dos es <em>dónde</em> está escrita la función.
        </p>

        <Codigo
          archivo="app/react/componentes/DondeSeDefineDemo.js"
          resaltar={[4, 13]}
          codigo={`// (recortado: acá está lo que importa)

// Afuera: React lo ve siempre como el mismo componente.
function ContadorDeAfuera() {
  const [clicks, setClicks] = useState(0);
  return <button type="button" onClick={() => setClicks(clicks + 1)}>Clicks: {clicks}</button>;
}

export default function DondeSeDefineDemo() {
  const [redibujos, setRedibujos] = useState(0);

  // Adentro: se vuelve a crear en cada render y pierde el estado.
  function ContadorDeAdentro() {
    const [clicks, setClicks] = useState(0);
    return <button type="button" onClick={() => setClicks(clicks + 1)}>Clicks: {clicks}</button>;
  }

  return (
    <div>
      <ContadorDeAdentro />
      <ContadorDeAfuera />
      <button type="button" onClick={() => setRedibujos(redibujos + 1)}>
        Redibujar el demo
      </button>
    </div>
  );
}`}
        />

        <Nota tipo="ok" titulo="El linter te cubre">
          <p>
            Este error es tan común que <code>npm run lint</code> lo detecta
            solo. Si alguna vez te sale este mensaje, ya sabés qué significa:
          </p>
          <Codigo
            archivo="npm run lint"
            codigo={`Error: Cannot create components during render
Components created during render will reset their state each time
they are created. Declare components outside of render.`}
          />
          <p style={{ marginBottom: 0 }}>
            Para que el demo de arriba pudiera romperse a propósito, tuvimos que
            apagar esa regla con un comentario{" "}
            <code>{"/* eslint-disable react-hooks/static-components */"}</code>{" "}
            arriba del archivo. En código de verdad no la apagues: está
            justamente para salvarte de este error.
          </p>
        </Nota>

        <Nota tipo="atencion" titulo="Varios componentes en un archivo, sí">
          <p>
            Podés tener varios componentes en el mismo archivo, siempre que estén
            uno al lado del otro y no uno adentro del otro. El que lleva{" "}
            <code>export default</code> es uno solo; los demás quedan para uso
            interno de ese archivo, que es exactamente lo que hacen los demos de
            esta página.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Armá tu propia galería">
        <p>
          Acá se ve para qué sirve todo esto. Cada vez que agregás una tarjeta se
          ejecuta <strong>el mismo componente</strong> <code>Perfil</code> una
          vez más. Vos no repetís HTML: repetís una etiqueta. Mirá cómo crece el
          JSX de abajo mientras apretás los botones.
        </p>

        <Demo titulo="Armador de galería">
          <ArmadorDeGaleriaDemo />
        </Demo>

        <Codigo
          archivo="app/react/componentes/ArmadorDeGaleriaDemo.js"
          resaltar={[18, 19, 20, 21, 22, 23, 24]}
          codigo={`// (recortado: el archivo completo tiene también los botones)
function Perfil({ nombre, foto }) {
  return (
    <figure>
      <img src={foto} alt={nombre} />
      <figcaption className="tenue">{nombre}</figcaption>
    </figure>
  );
}

export default function ArmadorDeGaleriaDemo() {
  const [cantidad, setCantidad] = useState(3);
  const visibles = CIENTIFICOS.slice(0, cantidad);

  return (
    <section>
      <h3>Científicos increíbles</h3>
      {visibles.map((cientifico) => (
        <Perfil
          key={cientifico.nombre}
          nombre={cientifico.nombre}
          foto={cientifico.foto}
        />
      ))}
    </section>
  );
}`}
        />

        <Nota tipo="info" titulo="Eso que va entre llaves son props">
          <p>
            Cada tarjeta muestra un nombre y una foto distintos, pero el
            componente es uno solo. Lo que le mandamos al usarlo (
            <code>nombre</code> y <code>foto</code>) se llama{" "}
            <strong>props</strong>, y tiene su propia lección:{" "}
            <Link href="/react/props">Props</Link>. El <code>map</code> y esa{" "}
            <code>key</code> los vas a ver en{" "}
            <Link href="/react/listas-y-keys">Listas y key</Link>.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="Escribí un componente Saludo"
          pista={
            <p>
              Son los tres pasos de la primera sección:{" "}
              <code>export default</code>, <code>function Saludo()</code> y un{" "}
              <code>return</code> con el JSX. Ojo con la primera letra del
              nombre.
            </p>
          }
          solucion={
            <Codigo
              archivo="app/react/componentes/Saludo.js"
              codigo={`export default function Saludo() {
  return <h2>¡Hola, Taller de Programación II!</h2>;
}

// Y en la página donde lo quieras usar:
// import Saludo from "./Saludo";
// ...
// <Saludo />`}
            />
          }
        >
          <p>
            Creá el archivo <code>app/react/componentes/Saludo.js</code> con un
            componente <code>Saludo</code> que devuelva un{" "}
            <code>&lt;h2&gt;</code> que diga{" "}
            <em>¡Hola, Taller de Programación II!</em>. Después importalo en una
            página y usalo. Cuando lo tengas andando, escribilo a propósito como{" "}
            <code>&lt;saludo /&gt;</code> y mirá qué dice la consola.
          </p>
        </Desafio>

        <Desafio
          titulo="Una galería de tres materias"
          pista={
            <p>
              <code>GaleriaDeMaterias</code> no repite el contenido de la
              tarjeta: repite <code>&lt;Tarjeta /&gt;</code>. Acordate de que{" "}
              <code>Tarjeta</code> va definida <strong>al lado</strong> de{" "}
              <code>GaleriaDeMaterias</code> y no adentro, y de que cada
              componente devuelve un solo elemento: envolvé todo en la{" "}
              <code>&lt;section&gt;</code>.
            </p>
          }
          solucion={
            <Codigo
              archivo="app/react/componentes/GaleriaDeMaterias.js"
              codigo={`// Los dos componentes, uno al lado del otro.
function Tarjeta() {
  return (
    <div className="tarjeta">
      <h3>Taller de Programación II</h3>
      <p>Segundo año.</p>
    </div>
  );
}

export default function GaleriaDeMaterias() {
  return (
    <section>
      <h3>Mis materias</h3>
      <div className="tarjetas">
        <Tarjeta />
        <Tarjeta />
        <Tarjeta />
      </div>
    </section>
  );
}`}
            />
          }
        >
          <p>
            Escribí un componente <code>Tarjeta</code> que muestre el nombre de
            una materia, y un componente <code>GaleriaDeMaterias</code> que lo
            use tres veces adentro de una <code>&lt;section&gt;</code> con un
            título. Las tres tarjetas van a salir iguales: está bien, todavía no
            sabemos cómo pasarle datos distintos a cada una. De eso se trata la
            lección de <Link href="/react/props">Props</Link>.
          </p>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
