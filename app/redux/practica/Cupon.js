"use client";

// El campo del cupón: el ejemplo más claro de la frontera entre el estado
// local y el global.

import { useId, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cuponAplicado, cuponQuitado, CUPONES } from "./carritoSlice";
import { elegirEstadoDelCupon } from "./selectores";
import { CHICO, pesos } from "./piezas";

const COLOR = {
  "sin-cupon": "var(--texto-suave)",
  desconocido: "var(--rojo)",
  "no-alcanza": "var(--ambar)",
  aplicado: "var(--verde)",
};

export default function Cupon() {
  // Lo que la persona está tecleando vive acá nomás. Al store solo llega el
  // código cuando lo confirma: si cada tecla despachara una acción, las
  // DevTools se llenarían de basura y todo lo conectado se volvería a dibujar.
  const [texto, setTexto] = useState("");
  const cupon = useSelector(elegirEstadoDelCupon);
  const despachar = useDispatch();
  // Esta página muestra el campo dos veces. useId le da a cada copia un id
  // propio, estable entre el servidor y el navegador, para que cada label
  // apunte a su input y no los dos al primero.
  const idCampo = useId();

  function aplicar(evento) {
    evento.preventDefault();
    if (texto.trim() === "") return;
    despachar(cuponAplicado(texto));
    setTexto("");
  }

  return (
    <div>
      <form onSubmit={aplicar} className="fila" style={{ gap: 8 }}>
        <label htmlFor={idCampo} className="tenue">
          Cupón
        </label>
        <input
          id={idCampo}
          className="entrada"
          style={{ flex: "1 1 120px", padding: "5px 10px" }}
          value={texto}
          placeholder="ESTUDIANTE10"
          onChange={(evento) => setTexto(evento.target.value)}
        />
        <button type="submit" className="boton" style={CHICO}>
          Aplicar
        </button>
      </form>

      <p
        style={{
          margin: "8px 0 0",
          fontSize: "0.84rem",
          color: COLOR[cupon.estado],
        }}
        aria-live="polite"
      >
        {cupon.estado === "sin-cupon" &&
          `Probá con ${Object.keys(CUPONES).join(" o ")}.`}
        {cupon.estado === "desconocido" &&
          `No existe ningún cupón "${cupon.codigo}".`}
        {cupon.estado === "no-alcanza" &&
          `${cupon.codigo} arranca en ${pesos(
            CUPONES[cupon.codigo].minimo,
          )}. Te faltan ${pesos(cupon.faltan)}.`}
        {cupon.estado === "aplicado" &&
          `${cupon.codigo} aplicado: ${CUPONES[cupon.codigo].texto}`}
      </p>

      {cupon.codigo && (
        <button
          type="button"
          className="boton boton-suave"
          style={{ ...CHICO, marginTop: 8 }}
          onClick={() => despachar(cuponQuitado())}
        >
          Quitar el cupón
        </button>
      )}
    </div>
  );
}
