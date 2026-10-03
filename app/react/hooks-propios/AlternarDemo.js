"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// EL HOOK PROPIO.
// Es una función común y silvestre. Lo único que la convierte en hook es que
// el nombre empieza con "use"; gracias a eso puede llamar a useState adentro.
// ---------------------------------------------------------------------------
function useAlternar(inicial = false) {
  const [activo, setActivo] = useState(inicial);

  function alternar() {
    setActivo((anterior) => !anterior);
  }

  // Devolvemos un objeto porque son cuatro cosas: con nombres no hay que
  // acordarse ningún orden.
  return {
    activo,
    alternar,
    prender: () => setActivo(true),
    apagar: () => setActivo(false),
  };
}

const estiloPanel = {
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.78rem",
  lineHeight: 1.8,
  margin: 0,
  padding: "12px 14px",
  background: "var(--superficie-2)",
  border: "1px solid var(--borde)",
  borderRadius: 8,
  overflowX: "auto",
};

export default function AlternarDemo() {
  // DOS llamadas al MISMO hook. Cada una se lleva su propio useState.
  const ayuda = useAlternar(false);
  const avisos = useAlternar(true);

  return (
    <div>
      <div
        className="fila"
        style={{ alignItems: "stretch", marginBottom: 16, gap: 14 }}
      >
        <section className="tarjeta" style={{ flex: "1 1 240px" }}>
          <h3>Panel de ayuda</h3>
          <button type="button" className="boton" onClick={ayuda.alternar}>
            {ayuda.activo ? "Ocultar ayuda" : "Ver ayuda"}
          </button>
          {ayuda.activo && (
            <p className="tenue" style={{ marginTop: 10, marginBottom: 0 }}>
              Escribí tu consulta y apretá Enter. Este párrafo aparece porque
              <code> ayuda.activo</code> vale <code>true</code>.
            </p>
          )}
        </section>

        <section className="tarjeta" style={{ flex: "1 1 240px" }}>
          <h3>Avisos por mail</h3>
          <p className="tenue" style={{ marginTop: 0 }}>
            Estado:{" "}
            <strong>{avisos.activo ? "suscripto" : "sin suscribir"}</strong>
          </p>
          <div className="fila">
            <button
              type="button"
              className="boton boton-suave"
              onClick={avisos.alternar}
            >
              Alternar
            </button>
            <button
              type="button"
              className="boton boton-suave"
              onClick={avisos.prender}
            >
              Prender
            </button>
            <button
              type="button"
              className="boton boton-suave"
              onClick={avisos.apagar}
            >
              Apagar
            </button>
          </div>
        </section>
      </div>

      <p className="tenue" style={{ margin: "0 0 6px" }}>
        Lo que devuelve cada llamada, ahora mismo
      </p>
      <pre style={estiloPanel}>
        {`const ayuda  = useAlternar(false);   // ayuda.activo  === ${String(
          ayuda.activo,
        )}
const avisos = useAlternar(true);    // avisos.activo === ${String(
          avisos.activo,
        )}`}
      </pre>
      <p className="tenue" style={{ marginBottom: 0 }}>
        Tocá un panel y mirá el otro: no se mueve. Compartieron el código, no la
        memoria.
      </p>
    </div>
  );
}
