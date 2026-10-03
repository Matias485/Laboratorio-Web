"use client";

import { useEffect, useRef, useState } from "react";

const TARJETA = {
  border: "1px solid var(--borde)",
  borderRadius: "var(--radio)",
  background: "var(--superficie-2)",
  padding: "12px 14px",
};

const FIRMA = {
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.76rem",
  color: "var(--texto-suave)",
  margin: "0 0 6px",
  wordBreak: "break-word",
};

function Caso({ firma, titulo, cuenta, detalle }) {
  return (
    <div style={TARJETA}>
      <p style={FIRMA}>{firma}</p>
      <h3 style={{ margin: "0 0 2px" }}>{titulo}</h3>
      <p className="marcador" style={{ fontSize: "1.9rem" }}>
        {cuenta}
      </p>
      <p className="tenue" style={{ margin: 0 }}>
        {detalle}
      </p>
    </div>
  );
}

export default function DependenciasDemo() {
  const [texto, setTexto] = useState("");
  const [otro, setOtro] = useState(0);

  // --- Caso 1: sin arreglo de dependencias -> corre después de CADA render.
  //
  // Este contador no puede ser un useState. Si lo fuera, el efecto lo
  // actualizaría, eso provocaría otro render, el efecto volvería a correr, y
  // así para siempre: el bucle infinito clásico. Por eso lo guardamos en un
  // ref, que no dispara renders.
  const cuentaCadaRender = useRef(0);
  useEffect(() => {
    cuentaCadaRender.current += 1;
  });

  // --- Caso 2: arreglo vacío -> corre una sola vez, al montar.
  const [cuentaMontaje, setCuentaMontaje] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Instrumento de la demo: es la única forma de mostrar en pantalla cuántas veces corrió el efecto. Este arreglo vacío hace que termine enseguida, así que no hay bucle; igual, en código de verdad esto sería el error que enseña la lección.
    setCuentaMontaje((cuenta) => cuenta + 1);
  }, []);

  // --- Caso 3: con valores -> corre cuando alguno de ellos cambia.
  const [cuentaTexto, setCuentaTexto] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Instrumento de la demo, igual que el de arriba. El efecto solo vuelve a correr si cambia `texto`, y actualizar este contador no cambia `texto`, así que no hay bucle.
    setCuentaTexto((cuenta) => cuenta + 1);
  }, [texto]);

  // eslint-disable-next-line react-hooks/refs -- solo para mostrar el número en pantalla
  const cadaRender = cuentaCadaRender.current;

  return (
    <div>
      <div className="fila" style={{ marginBottom: 6 }}>
        <label htmlFor="ef-dep-texto">Un estado que el efecto 3 sí mira</label>
      </div>
      <div className="fila" style={{ marginBottom: 16 }}>
        <input
          id="ef-dep-texto"
          className="entrada"
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
          placeholder="escribí acá"
          style={{ flex: "1 1 180px" }}
        />
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setOtro(otro + 1)}
        >
          Forzar un render ({otro})
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
        }}
      >
        <Caso
          firma="useEffect(() => { … })"
          titulo="Sin arreglo"
          cuenta={cadaRender}
          detalle="Corre después de cada render. Sube con el botón y con cada tecla."
        />
        <Caso
          firma="useEffect(() => { … }, [])"
          titulo="Arreglo vacío"
          cuenta={cuentaMontaje}
          detalle="Corre una sola vez, al montar. No se mueve más, toques lo que toques."
        />
        <Caso
          firma="useEffect(() => { … }, [texto])"
          titulo="Con dependencias"
          cuenta={cuentaTexto}
          detalle="Corre al montar y cada vez que cambia texto. El botón no lo mueve."
        />
      </div>

      <p className="tenue" style={{ margin: "14px 0 0" }}>
        El primer contador se actualiza <em>en el render siguiente</em>: está
        guardado en un ref para no provocar un bucle infinito. Tocá el botón dos
        veces seguidas y vas a verlo acompañar.
      </p>
      <p className="tenue" style={{ margin: "6px 0 0" }}>
        ¿El segundo arrancó en 2 y no en 1? No está roto: es el modo estricto de
        desarrollo, y lo explicamos dos secciones más abajo.
      </p>
    </div>
  );
}
