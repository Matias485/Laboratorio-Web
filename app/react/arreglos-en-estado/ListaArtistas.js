"use client";

import { useState } from "react";

// El contador de ids vive AFUERA del componente: si estuviera adentro se
// reiniciaría en cada dibujo y todos los artistas nuevos tendrían el id 4.
let siguienteId = 4;

const INICIALES = [
  { id: 1, nombre: "Marta Minujín" },
  { id: 2, nombre: "Xul Solar" },
  { id: 3, nombre: "Antonio Berni" },
];

export default function ListaArtistas() {
  const [artistas, setArtistas] = useState(INICIALES);
  const [nombre, setNombre] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [borrador, setBorrador] = useState("");

  // Agregar al final: primero lo que ya estaba, después el nuevo.
  function agregarAlFinal(evento) {
    evento.preventDefault();
    if (nombre.trim() === "") return;
    setArtistas([...artistas, { id: siguienteId++, nombre: nombre.trim() }]);
    setNombre("");
  }

  // Agregar al principio: el objeto nuevo va ANTES del spread.
  function agregarAlPrincipio() {
    if (nombre.trim() === "") return;
    setArtistas([{ id: siguienteId++, nombre: nombre.trim() }, ...artistas]);
    setNombre("");
  }

  // Borrar: filter deja pasar a todos menos al del id que le pedimos.
  function borrar(artista) {
    setArtistas(artistas.filter((a) => a.id !== artista.id));
    if (editandoId === artista.id) setEditandoId(null);
  }

  function empezarEdicion(artista) {
    setEditandoId(artista.id);
    setBorrador(artista.nombre);
  }

  // Reemplazar: map devuelve un arreglo nuevo; solo el que coincide se copia
  // con el nombre cambiado, el resto pasa tal cual.
  function guardarEdicion() {
    setArtistas(
      artistas.map((a) =>
        a.id === editandoId ? { ...a, nombre: borrador.trim() || a.nombre } : a,
      ),
    );
    setEditandoId(null);
  }

  // Ordenar: sort muta, así que copiamos con spread y ordenamos la copia.
  function ordenar() {
    setArtistas([...artistas].sort((a, b) => a.nombre.localeCompare(b.nombre)));
  }

  // Invertir: reverse también muta. Misma receta: copia y después reverse.
  function invertir() {
    setArtistas([...artistas].reverse());
  }

  function reiniciar() {
    setArtistas(INICIALES);
    setEditandoId(null);
    setBorrador("");
    setNombre("");
  }

  return (
    <div>
      <form onSubmit={agregarAlFinal} className="fila">
        <label htmlFor="artista-nuevo">Nombre</label>
        <input
          id="artista-nuevo"
          className="entrada"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escribí un artista"
        />
        <button type="submit" className="boton">
          Agregar al final
        </button>
        <button type="button" className="boton boton-suave" onClick={agregarAlPrincipio}>
          Agregar al principio
        </button>
      </form>

      <div className="fila" style={{ marginTop: 12 }}>
        <button type="button" className="boton boton-suave" onClick={ordenar}>
          Ordenar de la A a la Z
        </button>
        <button type="button" className="boton boton-suave" onClick={invertir}>
          Invertir el orden
        </button>
        <button type="button" className="boton boton-suave" onClick={reiniciar}>
          Reiniciar
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0" }}>
        {artistas.map((artista) => (
          <li
            key={artista.id}
            className="fila"
            style={{
              borderBottom: "1px solid var(--borde)",
              padding: "8px 0",
              justifyContent: "space-between",
            }}
          >
            {editandoId === artista.id ? (
              <>
                <label htmlFor={`editar-${artista.id}`} className="tenue">
                  Nuevo nombre
                </label>
                <input
                  id={`editar-${artista.id}`}
                  className="entrada"
                  value={borrador}
                  onChange={(e) => setBorrador(e.target.value)}
                />
                <button type="button" className="boton" onClick={guardarEdicion}>
                  Guardar
                </button>
              </>
            ) : (
              <>
                <span>
                  <span className="tenue" style={{ fontFamily: "var(--fuente-mono)" }}>
                    id {artista.id}
                  </span>{" "}
                  {artista.nombre}
                </span>
                <span className="fila">
                  <button
                    type="button"
                    className="boton boton-suave"
                    onClick={() => empezarEdicion(artista)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="boton boton-suave"
                    onClick={() => borrar(artista)}
                  >
                    Borrar
                  </button>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>

      {artistas.length === 0 && (
        <p className="tenue" style={{ marginTop: 12 }}>
          No queda ninguno. Agregá uno o tocá Reiniciar.
        </p>
      )}

      <p className="tenue" style={{ marginTop: 18, marginBottom: 6 }}>
        El estado, en vivo:
      </p>
      <pre
        style={{
          background: "var(--superficie-2)",
          border: "1px solid var(--borde)",
          borderRadius: "var(--radio)",
          padding: 12,
          margin: 0,
          overflowX: "auto",
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.8rem",
        }}
      >
        {JSON.stringify(artistas, null, 2)}
      </pre>
    </div>
  );
}
