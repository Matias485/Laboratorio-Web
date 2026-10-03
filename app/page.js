import Link from "next/link";
import { PISTAS } from "./lecciones";
import Seccion from "@/components/Seccion";
import Nota from "@/components/Nota";
import Codigo from "@/components/Codigo";

// La primera lección de una pista que ya se pueda leer.
function primeraDisponible(pista) {
  return pista.lecciones.find((leccion) => !leccion.pendiente) ?? null;
}

export default function Inicio() {
  // La primera pista es "Empezar acá", que ya está representada por esta misma
  // página: en el mapa mostramos las cinco pistas de contenido.
  const pistas = PISTAS.filter((pista) => pista.id !== "empezar");
  const todas = PISTAS.flatMap((p) => p.lecciones);
  const listas = todas.filter((l) => !l.pendiente).length - 1;
  const total = todas.length - 1;

  return (
    <article>
      <header className="leccion-encabezado">
        <p className="leccion-etiqueta">Laboratorio</p>
        <h1>Desarrollo web, de punta a punta</h1>
        <p className="resumen">
          Un recorrido de {total} lecciones para tocar, romper y volver a armar:
          HTML, CSS, JavaScript, TypeScript, React y Redux. Cada una explica una
          idea, la muestra funcionando en la misma página y te deja el código al
          lado.
          {listas < total &&
            ` Hay ${listas} listas para leer; el resto está en preparación y figura en gris.`}
        </p>
      </header>

      <Seccion titulo="Las cinco pistas">
        <div className="pistas">
          {pistas.map((pista) => (
            <div className="pista-tarjeta" key={pista.id} data-pista={pista.id}>
              <h3>{pista.nombre}</h3>
              <p className="pista-cuenta">
                {pista.lecciones.length} lecciones
              </p>
              <p>{pista.descripcion}</p>
              <ul className="pista-lista">
                {pista.lecciones.map((leccion) => (
                  <li key={leccion.slug}>
                    {leccion.pendiente ? (
                      <span className="pendiente">
                        {leccion.titulo} · en preparación
                      </span>
                    ) : (
                      <Link href={leccion.slug}>{leccion.titulo}</Link>
                    )}
                  </li>
                ))}
              </ul>
              {primeraDisponible(pista) && (
                <Link className="boton" href={primeraDisponible(pista).slug}>
                  Empezar
                </Link>
              )}
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion titulo="Por dónde arrancar">
        <p>
          Las pistas están en orden: cada una da por sabido lo de la anterior.
          Pero si ya venís con algo encima, no hace falta empezar de cero.
        </p>

        <div className="recorrido">
          <h3>Nunca hice una página</h3>
          <p>
            Arrancá por HTML y hacé las seis lecciones en orden. Sin estructura
            no hay nada que estilar ni que programar.
          </p>
          <Link href="/html/bases">Cómo funciona la web →</Link>
        </div>

        <div className="recorrido">
          <h3>Sé HTML, quiero que se vea bien</h3>
          <p>
            La pista de CSS empieza por cómo se aplica una hoja de estilos y
            termina armando una página entera. Las lecciones de selectores y del
            modelo de caja son las que más ordenan la cabeza.
          </p>
          <Link href="/css/bases">Qué es CSS y cómo se aplica →</Link>
        </div>

        <div className="recorrido">
          <h3>Vengo por React</h3>
          <p>
            Andá directo a la pista de React. Si algo de JSX o de los arreglos
            en el estado te suena raro, las lecciones de JavaScript están a un
            click y linkeadas desde adentro.
          </p>
          <Link href="/react/componentes">Componentes →</Link>
        </div>

        <div className="recorrido">
          <h3>Quiero entender qué carajo es este proyecto</h3>
          <p>
            Este mismo sitio está hecho con Next.js y React. La lección de
            entorno explica cómo nació, qué hace cada carpeta y por qué algunos
            archivos arrancan con <code>&quot;use client&quot;</code>.
          </p>
          <Link href="/sobre-next">Cómo funciona este proyecto →</Link>
        </div>
      </Seccion>

      <Seccion titulo="Cómo se usa">
        <p>
          Leer no alcanza. Lo que hace que esto sirva es que después de cada
          lección <strong>abras el archivo</strong> que dice arriba del bloque
          de código y lo modifiques. Los ejemplos están hechos para romperse.
        </p>
        <ol>
          <li>
            Arrancá el servidor con <code>npm run dev</code> y abrí{" "}
            <code>http://localhost:3000</code>.
          </li>
          <li>Leé la lección y jugá con los demos en vivo.</li>
          <li>
            Editá el archivo del demo. La página se actualiza sola al guardar.
          </li>
          <li>
            Cerrá con los <strong>desafíos</strong>: tienen pista y solución,
            pero probá antes de mirarlas.
          </li>
        </ol>

        <Codigo
          archivo="terminal"
          codigo={`npm run dev     // arranca el servidor en http://localhost:3000
npm run build   // compila el proyecto como si fueras a publicarlo
npm run lint    // revisa el código en busca de errores comunes`}
        />

        <Nota tipo="atencion" titulo="Si algo deja de andar">
          <p>
            Cortá el servidor con <code>Ctrl + C</code> y volvé a correr{" "}
            <code>npm run dev</code>. Si el error persiste, borrá la carpeta{" "}
            <code>.next</code> y arrancá de nuevo: es solo caché, no se pierde
            nada de tu código.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="De dónde sale esto">
        <p>
          El recorrido sigue los temas de{" "}
          <em>Taller de Programación II</em>, pero no se queda ahí: cada lección
          suma lo que en la práctica te vas a encontrar igual, aunque no haya
          entrado en una diapositiva. Varios ejemplos de React —la galería de
          científicos, las tazas de té, el punto que sigue al mouse— son los
          mismos de la cursada, para poder ir y venir entre la teoría y acá.
        </p>
        <p>
          Fuentes de referencia:{" "}
          <a href="https://developer.mozilla.org/es/" target="_blank" rel="noreferrer">
            MDN
          </a>
          ,{" "}
          <a href="https://es.react.dev/learn" target="_blank" rel="noreferrer">
            react.dev
          </a>{" "}
          y{" "}
          <a href="https://redux-toolkit.js.org/" target="_blank" rel="noreferrer">
            Redux Toolkit
          </a>
          .
        </p>
      </Seccion>
    </article>
  );
}
