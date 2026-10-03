"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// useEntrada: un input controlado completo. Devuelve el valor, el error, y un
// objeto "props" con todo lo que el <input> necesita para que le hagas spread.
// ---------------------------------------------------------------------------
function useEntrada(inicial = "", validar) {
  const [valor, setValor] = useState(inicial);
  const [tocado, setTocado] = useState(false);

  // El error se CALCULA en cada render a partir del valor. No va en otro
  // useState: sería una segunda fuente de verdad que se desincroniza.
  const error = validar ? validar(valor) : null;

  return {
    valor,
    error,
    // Solo molestamos con el error después de que el usuario pasó por el campo.
    mostrarError: tocado && error !== null,
    limpiar() {
      setValor(inicial);
      setTocado(false);
    },
    props: {
      value: valor,
      onChange: (evento) => setValor(evento.target.value),
      onBlur: () => setTocado(true),
    },
  };
}

const estiloPanel = {
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.78rem",
  lineHeight: 1.7,
  margin: 0,
  padding: "12px 14px",
  background: "var(--superficie-2)",
  border: "1px solid var(--borde)",
  borderRadius: 8,
  overflowX: "auto",
};

export default function FormularioDemo() {
  const nombre = useEntrada("", (v) =>
    v.trim().length < 3 ? "Poné al menos 3 letras." : null,
  );
  const mail = useEntrada("", (v) =>
    v.includes("@") ? null : "Falta el arroba.",
  );

  const [inscriptos, setInscriptos] = useState([]);
  const hayErrores = nombre.error !== null || mail.error !== null;

  function enviar(evento) {
    evento.preventDefault();
    if (hayErrores) return;
    setInscriptos((lista) => [
      { id: crypto.randomUUID(), nombre: nombre.valor, mail: mail.valor },
      ...lista,
    ]);
    nombre.limpiar();
    mail.limpiar();
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 18,
      }}
    >
      <form onSubmit={enviar}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="hp-nombre" style={{ display: "block" }}>
            Nombre y apellido
          </label>
          <input
            id="hp-nombre"
            className="entrada"
            type="text"
            style={{ width: "100%", marginTop: 4 }}
            {...nombre.props}
          />
          {nombre.mostrarError && (
            <p className="tenue" style={{ color: "var(--rojo)", margin: "4px 0 0" }}>
              {nombre.error}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="hp-mail" style={{ display: "block" }}>
            Correo
          </label>
          <input
            id="hp-mail"
            className="entrada"
            type="text"
            style={{ width: "100%", marginTop: 4 }}
            {...mail.props}
          />
          {mail.mostrarError && (
            <p className="tenue" style={{ color: "var(--rojo)", margin: "4px 0 0" }}>
              {mail.error}
            </p>
          )}
        </div>

        <button type="submit" className="boton" disabled={hayErrores}>
          Inscribirme
        </button>
      </form>

      <div>
        <p className="tenue" style={{ margin: "0 0 6px" }}>
          El estado que manejan los dos hooks
        </p>
        <pre style={estiloPanel}>
          {JSON.stringify(
            {
              nombre: { valor: nombre.valor, error: nombre.error },
              mail: { valor: mail.valor, error: mail.error },
              hayErrores,
            },
            null,
            2,
          )}
        </pre>

        <p className="tenue" style={{ margin: "14px 0 6px" }}>
          Inscriptos ({inscriptos.length})
        </p>
        {inscriptos.length === 0 ? (
          <p className="tenue" style={{ margin: 0 }}>
            Todavía no mandaste ninguno.
          </p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 22 }}>
            {inscriptos.map((persona) => (
              <li key={persona.id}>
                {persona.nombre} <span className="tenue">· {persona.mail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
