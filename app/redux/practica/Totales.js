"use client";

// Los totales. Este componente no despacha nada y no guarda nada: solo lee
// tres selectores derivados. Si mañana cambia cómo se calcula el descuento,
// este archivo no se toca.

import { useSelector } from "react-redux";
import {
  elegirSubtotal,
  elegirDescuento,
  elegirTotal,
  elegirEstadoDelCupon,
} from "./selectores";
import { MONO, pesos } from "./piezas";

function Fila({ etiqueta, valor, fuerte }) {
  return (
    <div
      className="fila"
      style={{ justifyContent: "space-between", padding: "4px 0" }}
    >
      <span style={{ fontSize: fuerte ? "0.95rem" : "0.86rem" }}>
        {etiqueta}
      </span>
      <span style={{ ...MONO, fontSize: fuerte ? "1.1rem" : "0.82rem" }}>
        {valor}
      </span>
    </div>
  );
}

export default function Totales() {
  const subtotal = useSelector(elegirSubtotal);
  const descuento = useSelector(elegirDescuento);
  const total = useSelector(elegirTotal);
  const cupon = useSelector(elegirEstadoDelCupon);

  return (
    <div>
      <Fila etiqueta="Subtotal" valor={pesos(subtotal)} />
      <Fila
        etiqueta={
          descuento > 0 ? `Descuento (${cupon.codigo})` : "Descuento"
        }
        valor={descuento > 0 ? `− ${pesos(descuento)}` : pesos(0)}
      />
      <div style={{ borderTop: "1px solid var(--borde)", marginTop: 6 }}>
        <Fila etiqueta="Total" valor={pesos(total)} fuerte />
      </div>
      <p className="tenue" style={{ margin: "6px 0 0", fontSize: "0.76rem" }}>
        Ninguno de estos tres números está guardado en el store.
      </p>
    </div>
  );
}
