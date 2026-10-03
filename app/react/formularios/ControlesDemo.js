"use client";

import { useState } from "react";

/**
 * Un ejemplar de cada control, para ver qué propiedad usa cada uno.
 * Abajo se ve el estado completo en vivo.
 */
export default function ControlesDemo() {
  const [texto, setTexto] = useState("Ada");
  const [clave, setClave] = useState("");
  const [cantidad, setCantidad] = useState("2"); // ojo: es un string
  const [acepta, setAcepta] = useState(false);
  const [turno, setTurno] = useState("noche");
  const [comision, setComision] = useState("1K2");
  const [comentario, setComentario] = useState("");

  return (
    <div>
      {/* texto y password: propiedad value */}
      <div style={fila}>
        <label htmlFor="ctrl-texto" style={etiqueta}>
          Texto
        </label>
        <input
          id="ctrl-texto"
          className="entrada"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </div>

      <div style={fila}>
        <label htmlFor="ctrl-clave" style={etiqueta}>
          Password
        </label>
        <input
          id="ctrl-clave"
          type="password"
          className="entrada"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
      </div>

      {/* number: e.target.value SIEMPRE es un string */}
      <div style={fila}>
        <label htmlFor="ctrl-cantidad" style={etiqueta}>
          Número
        </label>
        <input
          id="ctrl-cantidad"
          type="number"
          className="entrada"
          style={{ width: 90 }}
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
      </div>

      {/* checkbox: propiedad checked y e.target.checked */}
      <div style={fila}>
        <span style={etiqueta}>Checkbox</span>
        <label className="fila" style={{ gap: 8 }}>
          <input
            type="checkbox"
            checked={acepta}
            onChange={(e) => setAcepta(e.target.checked)}
          />
          Acepto las condiciones
        </label>
      </div>

      {/* radio: checked compara el valor del grupo con el de cada opción */}
      <div style={fila}>
        <span style={etiqueta}>Radio</span>
        <div className="fila" style={{ gap: 16 }}>
          {["mañana", "noche"].map((opcion) => (
            <label key={opcion} className="fila" style={{ gap: 6 }}>
              <input
                type="radio"
                name="ctrl-turno"
                value={opcion}
                checked={turno === opcion}
                onChange={(e) => setTurno(e.target.value)}
              />
              {opcion}
            </label>
          ))}
        </div>
      </div>

      {/* select: el value va en el <select>, no en las <option> */}
      <div style={fila}>
        <label htmlFor="ctrl-comision" style={etiqueta}>
          Select
        </label>
        <select
          id="ctrl-comision"
          className="entrada"
          value={comision}
          onChange={(e) => setComision(e.target.value)}
        >
          <option value="1K1">1K1</option>
          <option value="1K2">1K2</option>
          <option value="2K1">2K1</option>
        </select>
      </div>

      {/* textarea: en React lleva value, no texto adentro de la etiqueta */}
      <div style={fila}>
        <label htmlFor="ctrl-comentario" style={etiqueta}>
          Textarea
        </label>
        <textarea
          id="ctrl-comentario"
          className="entrada"
          rows={2}
          style={{ width: "100%", maxWidth: 320 }}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
      </div>

      <pre style={estiloJson}>
        {JSON.stringify(
          { texto, clave, cantidad, acepta, turno, comision, comentario },
          null,
          2,
        )}
      </pre>
      <p className="tenue" style={{ margin: "8px 0 0" }}>
        cantidad es un <strong>{typeof cantidad}</strong>, por eso{" "}
        <code>cantidad + 1</code> da &quot;{cantidad + 1}&quot; y{" "}
        <code>Number(cantidad) + 1</code> da {Number(cantidad) + 1}.
      </p>
    </div>
  );
}

const fila = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 10,
};

const etiqueta = {
  width: 90,
  flexShrink: 0,
  color: "var(--texto-suave)",
  fontSize: "0.85rem",
};

const estiloJson = {
  margin: "14px 0 0",
  padding: "10px 12px",
  background: "var(--superficie-2)",
  border: "1px solid var(--borde)",
  borderRadius: 8,
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.82rem",
  overflowX: "auto",
};
