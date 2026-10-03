"use client";

import { useEffect, useRef, useState } from "react";

const MILISEGUNDOS = 1500;
const CADA = 100;

export default function HiloUnicoDemo() {
  const [tics, setTics] = useState(0);
  const [informe, setInforme] = useState(null);
  const [texto, setTexto] = useState("");
  const refTics = useRef(0);

  // Un reloj que intenta avanzar 10 veces por segundo, pase lo que pase.
  useEffect(() => {
    const id = setInterval(() => {
      refTics.current += 1;
      setTics(refTics.current);
    }, CADA);
    return () => clearInterval(id);
  }, []);

  function bloquear() {
    const ticsAntes = refTics.current;
    const arranque = performance.now();
    let vueltas = 0;

    // Este bucle no hace nada útil: lo único que hace es NO devolver el hilo.
    // Mientras esté acá adentro, el navegador no puede correr el setInterval,
    // ni atender tus clicks, ni redibujar la pantalla.
    while (performance.now() - arranque < MILISEGUNDOS) {
      vueltas += 1;
    }

    const duracion = Math.round(performance.now() - arranque);
    // Leemos el contador justo al salir, antes de devolverle el hilo al
    // navegador: así vemos cuántas vueltas se perdieron.
    const ticsDespues = refTics.current;

    setInforme({
      duracion,
      vueltas,
      esperados: Math.round(duracion / CADA),
      reales: ticsDespues - ticsAntes,
    });
  }

  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 2px" }}>
        Un setInterval que suma 1 cada {CADA} ms
      </p>
      <p className="marcador" style={{ marginBottom: 12 }}>
        {tics}
      </p>

      <div className="fila" style={{ marginBottom: 12 }}>
        <button type="button" className="boton" onClick={bloquear}>
          Ocupar el hilo {MILISEGUNDOS} ms
        </button>
        <label htmlFor="tipeo-del-hilo" className="tenue">
          Probá escribir acá mientras tanto:
        </label>
        <input
          id="tipeo-del-hilo"
          className="entrada"
          type="text"
          value={texto}
          placeholder="tipeá durante el bloqueo"
          onChange={(evento) => setTexto(evento.target.value)}
          style={{ flex: 1, minWidth: 160 }}
        />
      </div>

      {informe === null ? (
        <p className="tenue" style={{ margin: 0 }}>
          Tocá el botón y mirá el número de arriba: se queda congelado. Las
          teclas que aprietes durante ese rato aparecen todas juntas al final.
        </p>
      ) : (
        <ol
          style={{
            margin: 0,
            paddingLeft: 26,
            fontFamily: "var(--fuente-mono)",
            fontSize: "0.82rem",
            lineHeight: 1.9,
          }}
        >
          <li>El bucle ocupó el hilo {informe.duracion} ms.</li>
          <li>
            Dio {informe.vueltas.toLocaleString("es-AR")} vueltas sin hacer nada
            útil.
          </li>
          <li>
            El contador tendría que haber avanzado ~{informe.esperados} veces.
          </li>
          <li style={{ fontWeight: 700 }}>
            Avanzó {informe.reales}.
          </li>
        </ol>
      )}
    </div>
  );
}
