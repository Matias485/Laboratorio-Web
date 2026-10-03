"use client";

import { useRef, useState, useSyncExternalStore } from "react";

const CLAVE = "laboratorio:nota";

// location.origin solo existe en el navegador, así que lo leemos con el hook
// que sabe distinguir los dos lados: en el servidor devuelve la cadena vacía.
const sinSuscripcion = () => () => {};
const origenDelNavegador = () => window.location.origin;
const sinOrigen = () => "";

export default function AlmacenDemo() {
  const [texto, setTexto] = useState("");
  const [lineas, setLineas] = useState([]);
  const contador = useRef(0);
  const origen = useSyncExternalStore(
    sinSuscripcion,
    origenDelNavegador,
    sinOrigen,
  );

  function anotar(linea) {
    contador.current += 1;
    const id = contador.current;
    setLineas((viejas) => [...viejas, { id, linea }].slice(-7));
  }

  function guardar() {
    localStorage.setItem(CLAVE, texto);
    anotar(`localStorage.setItem("${CLAVE}", ${JSON.stringify(texto)})`);
  }

  function leer() {
    const valor = localStorage.getItem(CLAVE);
    anotar(
      `localStorage.getItem("${CLAVE}") → ${JSON.stringify(valor)}` +
        `  ·  typeof: ${typeof valor}`,
    );
  }

  function guardarUnNumero() {
    // Le pasamos el NÚMERO 42, no el texto "42".
    localStorage.setItem("laboratorio:numero", 42);
    const leido = localStorage.getItem("laboratorio:numero");
    anotar(
      `Guardé el número 42 y me devolvió ${JSON.stringify(leido)}` +
        `  ·  typeof: ${typeof leido}`,
    );
  }

  function borrar() {
    localStorage.removeItem(CLAVE);
    localStorage.removeItem("laboratorio:numero");
    anotar("localStorage.removeItem(...) — las dos claves borradas");
  }

  function mirarElArchivo(evento) {
    const archivo = evento.target.files[0];
    if (!archivo) return;
    // Fijate todo lo que la página NO sabe: en qué carpeta estaba, qué más hay
    // al lado, ni siquiera el contenido hasta que lo pida explícitamente.
    anotar(
      `Elegiste "${archivo.name}" · ${archivo.size} bytes · tipo "${
        archivo.type || "desconocido"
      }"`,
    );
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 12 }}>
        <label htmlFor="nota-del-almacen">Tu nota:</label>
        <input
          id="nota-del-almacen"
          className="entrada"
          type="text"
          value={texto}
          placeholder="escribí cualquier cosa"
          onChange={(evento) => setTexto(evento.target.value)}
          style={{ flex: 1, minWidth: 180 }}
        />
      </div>

      <div className="fila" style={{ marginBottom: 14 }}>
        <button type="button" className="boton" onClick={guardar}>
          Guardar
        </button>
        <button type="button" className="boton boton-suave" onClick={leer}>
          Leer
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={guardarUnNumero}
        >
          Guardar el número 42
        </button>
        <button type="button" className="boton boton-suave" onClick={borrar}>
          Borrar
        </button>
      </div>

      <div className="fila" style={{ marginBottom: 14 }}>
        <label htmlFor="archivo-del-almacen" className="tenue">
          Y el único camino al disco:
        </label>
        <input
          id="archivo-del-almacen"
          className="entrada"
          type="file"
          onChange={mirarElArchivo}
        />
      </div>

      <p className="tenue" style={{ margin: "0 0 8px" }}>
        Lo que devolvió cada llamada, de verdad{" "}
        {origen && (
          <>
            — este cajón es solo de <code>{origen}</code>
          </>
        )}
        :
      </p>

      {lineas.length === 0 ? (
        <p className="tenue" style={{ margin: 0 }}>
          Todavía no tocaste ningún botón.
        </p>
      ) : (
        <ol
          style={{
            margin: 0,
            paddingLeft: 26,
            fontFamily: "var(--fuente-mono)",
            fontSize: "0.8rem",
            lineHeight: 1.9,
            wordBreak: "break-word",
          }}
        >
          {lineas.map((item) => (
            <li key={item.id}>{item.linea}</li>
          ))}
        </ol>
      )}

      <p className="tenue" style={{ marginBottom: 0 }}>
        Guardá algo, recargá la página con <strong>F5</strong> y tocá{" "}
        <em>Leer</em>: sigue ahí. Cerrá el navegador entero y también sigue ahí.
      </p>
    </div>
  );
}
