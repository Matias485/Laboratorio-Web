"use client";

import { useEffect, useRef, useState } from "react";

// Tres pedidos simulados. Nada sale a internet: cada uno es un setTimeout con
// una demora distinta, para que se vea quién arranca cuándo y quién termina.
const PEDIDOS = [
  { nombre: "perfil", ms: 600 },
  { nombre: "materias", ms: 800 },
  { nombre: "notas", ms: 500 },
];

// Milisegundos que ocupan el ancho completo de la barra. Fijo, así las dos
// corridas se comparan a la misma escala.
const ESCALA = 2000;

function pedir(pedido) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(pedido.nombre), pedido.ms);
  });
}

// marcar() solo dibuja la barra en pantalla; lo que importa es dónde está
// cada await.
async function correrSecuencial(marcar) {
  const t0 = performance.now();
  const desde = () => performance.now() - t0;

  for (const pedido of PEDIDOS) {
    const inicio = desde();
    await pedir(pedido); // ✗ frena la vuelta siguiente del for
    marcar(pedido.nombre, inicio, desde());
  }
  return Math.round(desde());
}

async function correrEnParalelo(marcar) {
  const t0 = performance.now();
  const desde = () => performance.now() - t0;

  // map arranca las tres promesas de una: ya están corriendo acá.
  const tareas = PEDIDOS.map(async (pedido) => {
    const inicio = desde();
    await pedir(pedido);
    marcar(pedido.nombre, inicio, desde());
  });
  await Promise.all(tareas); // ✓ recién acá esperamos, a las tres juntas
  return Math.round(desde());
}

export default function ParaleloDemo() {
  const [modo, setModo] = useState(null);
  const [barras, setBarras] = useState([]);
  const [totales, setTotales] = useState({});
  const [corriendo, setCorriendo] = useState(false);
  const vivo = useRef(true);

  useEffect(() => {
    vivo.current = true;
    return () => {
      vivo.current = false;
    };
  }, []);

  async function correr(cual) {
    setCorriendo(true);
    setModo(cual);
    setBarras([]);

    function marcar(nombre, inicio, fin) {
      if (!vivo.current) return;
      setBarras((actuales) => [...actuales, { nombre, inicio, fin }]);
    }

    const ms =
      cual === "secuencial"
        ? await correrSecuencial(marcar)
        : await correrEnParalelo(marcar);

    if (!vivo.current) return;
    setTotales((actuales) => ({ ...actuales, [cual]: ms }));
    setCorriendo(false);
  }

  const color = modo === "secuencial" ? "var(--rojo)" : "var(--verde)";

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <button
          type="button"
          className="boton"
          onClick={() => correr("secuencial")}
          disabled={corriendo}
        >
          await adentro del for
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => correr("paralelo")}
          disabled={corriendo}
        >
          Promise.all
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        {PEDIDOS.map((pedido) => {
          const barra = barras.find((b) => b.nombre === pedido.nombre);
          return (
            <div
              key={pedido.nombre}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <span
                style={{
                  width: 82,
                  flexShrink: 0,
                  fontFamily: "var(--fuente-mono)",
                  fontSize: "0.8rem",
                  color: "var(--texto-suave)",
                }}
              >
                {pedido.nombre}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 18,
                  borderRadius: 5,
                  background: "var(--superficie-2)",
                  border: "1px solid var(--borde)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {barra && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: (barra.inicio / ESCALA) * 100 + "%",
                      width: ((barra.fin - barra.inicio) / ESCALA) * 100 + "%",
                      background: color,
                      borderRadius: 5,
                    }}
                  />
                )}
              </div>
              <span
                style={{
                  width: 62,
                  flexShrink: 0,
                  textAlign: "right",
                  fontFamily: "var(--fuente-mono)",
                  fontSize: "0.8rem",
                  color: "var(--texto-suave)",
                }}
              >
                {barra ? Math.round(barra.fin) + " ms" : "—"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="fila" style={{ gap: 24 }}>
        <p className="marcador" style={{ fontSize: "1.3rem", color: "var(--rojo)" }}>
          for + await:{" "}
          {totales.secuencial != null ? totales.secuencial + " ms" : "—"}
        </p>
        <p className="marcador" style={{ fontSize: "1.3rem", color: "var(--verde)" }}>
          Promise.all:{" "}
          {totales.paralelo != null ? totales.paralelo + " ms" : "—"}
        </p>
      </div>

      <p className="tenue" style={{ marginBottom: 0 }}>
        Los tres pedidos tardan 600, 800 y 500 ms. Secuencial da la suma; en
        paralelo da el más lento de los tres.
      </p>
    </div>
  );
}
