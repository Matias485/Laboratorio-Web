"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Una bitácora compartida, afuera de React, para ver el orden exacto en el que
// pasan las cosas. `lineas` se reemplaza por un arreglo nuevo en cada anotación:
// así el componente que la dibuja puede darse cuenta de que cambió.
// ---------------------------------------------------------------------------
const bitacora = { lineas: [] };
let proximoId = 0;
let proximaConexion = 0;

function anotar(texto, tipo) {
  proximoId += 1;
  bitacora.lineas = [...bitacora.lineas, { id: proximoId, texto, tipo }];
}

// ---------------------------------------------------------------------------
// Un componente que se "conecta" a algo de afuera al montarse. La conexión es
// de mentira, pero se comporta igual que una de verdad: se abre y hay que
// cerrarla.
// ---------------------------------------------------------------------------
function Chat({ conLimpieza }) {
  useEffect(() => {
    proximaConexion += 1;
    const numero = proximaConexion;
    anotar("efecto → abrí la conexión #" + numero, "efecto");

    if (!conLimpieza) return undefined;

    return () => anotar("limpieza → cerré la conexión #" + numero, "limpieza");
  }, [conLimpieza]);

  return (
    <p style={{ margin: 0 }}>
      💬 El chat está montado y conectado.
    </p>
  );
}

const COLORES = {
  efecto: "var(--azul-700)",
  limpieza: "var(--verde)",
};

export default function ModoEstrictoDemo() {
  const [montado, setMontado] = useState(false);
  const [conLimpieza, setConLimpieza] = useState(true);

  // Espejo de la bitácora. Si no cambió nada, `setLineas` recibe exactamente el
  // mismo arreglo de antes y React no vuelve a renderizar.
  const [lineas, setLineas] = useState([]);
  useEffect(() => {
    const id = setInterval(() => setLineas(bitacora.lineas), 150);
    return () => clearInterval(id);
  }, []);

  const efectos = lineas.filter((linea) => linea.tipo === "efecto").length;
  const limpiezas = lineas.filter((linea) => linea.tipo === "limpieza").length;
  const abiertas = efectos - limpiezas;

  function borrar() {
    bitacora.lineas = [];
    setLineas(bitacora.lineas);
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <button
          type="button"
          className="boton"
          onClick={() => setMontado(!montado)}
        >
          {montado ? "Desmontar el chat" : "Montar el chat"}
        </button>
        <label className="fila" style={{ gap: 6 }}>
          <input
            type="checkbox"
            checked={conLimpieza}
            onChange={(evento) => setConLimpieza(evento.target.checked)}
          />
          el efecto devuelve limpieza
        </label>
        <button type="button" className="boton boton-suave" onClick={borrar}>
          Borrar la bitácora
        </button>
      </div>

      <div
        className="tarjeta"
        style={{ boxShadow: "none", marginBottom: 14, minHeight: 58 }}
      >
        {montado ? (
          <Chat conLimpieza={conLimpieza} />
        ) : (
          <p className="tenue" style={{ margin: 0 }}>
            El chat está desmontado.
          </p>
        )}
      </div>

      <p className="tenue" style={{ margin: "0 0 6px" }}>
        Bitácora (lo que React hizo, en orden)
      </p>
      <ol
        style={{
          margin: "0 0 12px",
          padding: "10px 10px 10px 34px",
          border: "1px solid var(--borde)",
          borderRadius: 8,
          background: "var(--superficie-2)",
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.78rem",
          minHeight: 92,
          maxHeight: 190,
          overflowY: "auto",
        }}
      >
        {lineas.length === 0 && (
          <li style={{ listStyle: "none", marginLeft: -20 }} className="tenue">
            Todavía no pasó nada. Tocá “Montar el chat”.
          </li>
        )}
        {lineas.map((linea) => (
          <li key={linea.id} style={{ color: COLORES[linea.tipo] }}>
            {linea.texto}
          </li>
        ))}
      </ol>

      <div className="fila">
        <span className="tenue">
          efectos: <strong>{efectos}</strong>
        </span>
        <span className="tenue">
          limpiezas: <strong>{limpiezas}</strong>
        </span>
        <span
          style={{
            fontWeight: 700,
            color: abiertas > 1 ? "var(--rojo)" : "var(--verde)",
          }}
        >
          conexiones abiertas: {abiertas}
        </span>
      </div>

      <p className="tenue" style={{ margin: "14px 0 0" }}>
        Montá el chat con la limpieza puesta: vas a leer{" "}
        <strong>abrí · cerré · abrí</strong>. React montó, desmontó y volvió a
        montar a propósito, y queda una sola conexión abierta. Ahora borrá la
        bitácora, destildá la limpieza y montalo de nuevo: dos{" "}
        <strong>abrí</strong> seguidos y ninguna conexión cerrada. El modo
        estricto acaba de delatar el error.
      </p>
    </div>
  );
}
