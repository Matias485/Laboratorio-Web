"use client";

import { useEffect, useRef, useState } from "react";

export default function BloqueoDemo() {
  // Este contador es el "signo vital" de la página: sube solo, cada 100 ms.
  // Si la pila de llamadas está ocupada, el navegador no puede ejecutarlo y
  // el número se queda clavado.
  const [latidos, setLatidos] = useState(0);
  const [ultimo, setUltimo] = useState(null);
  const [esperando, setEsperando] = useState(false);
  const montado = useRef(true);

  useEffect(() => {
    montado.current = true;
    const id = setInterval(() => setLatidos((n) => n + 1), 100);
    return () => {
      montado.current = false;
      clearInterval(id);
    };
  }, []);

  function bloquear() {
    const inicio = performance.now();
    // Bucle que no suelta el hilo: hasta que no termine, nada más puede correr.
    while (performance.now() - inicio < 2000) {
      /* quema tiempo del único hilo que hay */
    }
    setUltimo({
      modo: "bloqueante",
      ms: Math.round(performance.now() - inicio),
    });
  }

  async function noBloquear() {
    setEsperando(true);
    const inicio = performance.now();
    // El temporizador lo maneja el navegador por afuera, y esta función se
    // suspende —sin ocupar el hilo— hasta que la promesa se cumpla.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (!montado.current) return;
    setEsperando(false);
    setUltimo({
      modo: "no bloqueante",
      ms: Math.round(performance.now() - inicio),
    });
  }

  // Un cuadradito que rebota de izquierda a derecha, movido por JavaScript.
  const posicion = Math.abs((latidos % 20) - 10) * 9;

  return (
    <div>
      <div
        style={{
          height: 14,
          borderRadius: 7,
          background: "var(--superficie-2)",
          border: "1px solid var(--borde)",
          position: "relative",
          overflow: "hidden",
          marginBottom: 10,
        }}
        aria-hidden="true"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "10%",
            left: posicion + "%",
            borderRadius: 7,
            background: "var(--azul-600)",
          }}
        />
      </div>

      <p className="marcador" style={{ fontSize: "1.6rem" }}>
        {latidos} latidos
      </p>
      <p className="tenue" style={{ marginTop: 0 }}>
        Sube uno cada 100 ms mientras el hilo esté libre.
      </p>

      <div className="fila" style={{ marginBottom: 12 }}>
        <button type="button" className="boton" onClick={bloquear}>
          Bloquear 2 segundos
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={noBloquear}
          disabled={esperando}
        >
          {esperando ? "Esperando…" : "Esperar 2 segundos sin bloquear"}
        </button>
      </div>

      <label htmlFor="bloqueo-prueba" style={{ display: "block" }}>
        Probá escribir acá mientras tanto
      </label>
      <input
        id="bloqueo-prueba"
        className="entrada"
        type="text"
        placeholder="escribí durante los 2 segundos"
        style={{ width: "100%", maxWidth: 340, marginTop: 4 }}
      />

      {ultimo && (
        <p style={{ marginBottom: 0 }}>
          Última corrida <strong>{ultimo.modo}</strong>: {ultimo.ms} ms.{" "}
          {ultimo.modo === "bloqueante"
            ? "El contador no se movió ni un latido, y lo que tipeaste apareció recién ahora, todo junto."
            : "El contador siguió sumando y el casillero respondió normalmente."}
        </p>
      )}
    </div>
  );
}
