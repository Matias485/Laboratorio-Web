"use client";

import { useState } from "react";

// Una sola pantalla que usa las tres técnicas al mismo tiempo:
//   - una variable con JSX para el título
//   - un ternario para el texto del subtítulo
//   - && para el bloque de seguimiento
//   - y un sub-componente que devuelve null cuando el pedido está cancelado.

const ESTADOS = [
  { id: "pendiente", texto: "Pendiente" },
  { id: "en-camino", texto: "En camino" },
  { id: "entregado", texto: "Entregado" },
  { id: "cancelado", texto: "Cancelado" },
];

function DatosDeEnvio({ estado }) {
  // Salida temprana: un pedido cancelado no tiene nada que enviar.
  if (estado === "cancelado") return null;

  return (
    <p style={{ margin: "0 0 10px" }}>
      Envío a <strong>Av. Siempreviva 742</strong>
      {estado === "entregado"
        ? " · entregado el martes 14:20"
        : " · llega el martes"}
    </p>
  );
}

export default function PanelPedidoDemo() {
  const [estado, setEstado] = useState("pendiente");
  const [verSeguimiento, setVerSeguimiento] = useState(false);

  // Variable con JSX: la decisión es larga, así el return de abajo queda corto.
  let titulo;
  if (estado === "pendiente") {
    titulo = <h3>Estamos preparando tu pedido</h3>;
  } else if (estado === "en-camino") {
    titulo = <h3>Tu pedido salió del depósito</h3>;
  } else if (estado === "entregado") {
    titulo = <h3>Entregado, ¡que lo disfrutes!</h3>;
  } else {
    titulo = <h3>Pedido cancelado</h3>;
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 16 }}>
        {ESTADOS.map((e) => (
          <button
            key={e.id}
            type="button"
            className={estado === e.id ? "boton" : "boton boton-suave"}
            onClick={() => setEstado(e.id)}
          >
            {e.texto}
          </button>
        ))}
      </div>

      <div className="tarjeta">
        {titulo}

        {/* Ternario: en el mismo lugar, una cosa u otra. */}
        <p style={{ margin: "0 0 10px" }}>
          {estado === "cancelado"
            ? "Te devolvemos la plata en 48 horas."
            : "Pedido #4821 · 3 productos · $42.500"}
        </p>

        <DatosDeEnvio estado={estado} />

        {/* && : o aparece el botón, o no aparece nada. */}
        {estado === "en-camino" && (
          <button
            type="button"
            className="boton"
            onClick={() => setVerSeguimiento(!verSeguimiento)}
          >
            {verSeguimiento ? "Ocultar seguimiento" : "Ver seguimiento"}
          </button>
        )}

        {estado === "en-camino" && verSeguimiento && (
          <p className="tenue" style={{ marginBottom: 0 }}>
            09:10 salió del depósito · 11:45 en el centro de distribución ·
            13:30 en reparto
          </p>
        )}
      </div>
    </div>
  );
}
