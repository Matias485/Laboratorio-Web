"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementado,
  pasoCambiado,
  tareaAgregada,
  elegirValor,
  elegirPendientes,
} from "./almacen";

// Los contadores de renderizados viven afuera de React, en un objeto común.
// Si fueran estado, actualizarlos provocaría otro renderizado y estaríamos
// midiendo el termómetro con el termómetro.
const cuentas = { fino: 0, gordo: 0, memorizado: 0 };

// Contar es un efecto secundario, así que va en un useEffect SIN arreglo de
// dependencias —corre después de cada dibujo— y no en medio del render. Eso
// resuelve además la hidratación: en el servidor los efectos no corren, así
// que el HTML inicial siempre dice 0 y coincide con el primer dibujo del
// navegador. A cambio, el número que ves es el de los dibujos anteriores al
// que estás mirando.
function useContarRenderizados(clave) {
  const veces = cuentas[clave];
  useEffect(() => {
    cuentas[clave] += 1;
  });
  return veces;
}

const CAJA = {
  border: "1px solid var(--borde)",
  borderRadius: 10,
  background: "var(--superficie-2)",
  padding: "10px 12px",
};

const ETIQUETA = {
  margin: "0 0 4px",
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.72rem",
  fontWeight: 700,
  color: "var(--texto-suave)",
};

function Marca({ veces }) {
  return (
    <p style={{ margin: "6px 0 0", fontSize: "0.85rem" }}>
      renderizados:{" "}
      <strong
        style={{
          fontFamily: "var(--fuente-mono)",
          fontSize: "1.3rem",
          color: "var(--pista, var(--azul-700))",
        }}
      >
        {veces}
      </strong>
    </p>
  );
}

// 1. Selector fino: devuelve un número. Solo se vuelve a dibujar cuando ese
//    número cambia, porque 3 === 3.
function Fino() {
  const veces = useContarRenderizados("fino");
  const valor = useSelector(elegirValor);

  return (
    <div style={CAJA}>
      <p style={ETIQUETA}>useSelector(elegirValor)</p>
      <p className="tenue" style={{ margin: 0, fontSize: "0.8rem" }}>
        Devuelve un número.
      </p>
      <p className="marcador" style={{ fontSize: "1.5rem" }}>
        {valor}
      </p>
      <Marca veces={veces} />
    </div>
  );
}

// 2. Selector que arma un objeto nuevo en cada llamada: dos objetos distintos
//    con los mismos datos NUNCA son ===, así que se vuelve a dibujar siempre.
function Gordo() {
  const veces = useContarRenderizados("gordo");
  const resumen = useSelector((estado) => ({
    valor: estado.contador.valor,
    cuantas: estado.tareas.length,
  }));

  return (
    <div style={CAJA}>
      <p style={ETIQUETA}>useSelector(() =&gt; ({"{ ... }"}))</p>
      <p className="tenue" style={{ margin: 0, fontSize: "0.8rem" }}>
        Devuelve un objeto nuevo.
      </p>
      <p className="marcador" style={{ fontSize: "1.5rem" }}>
        {resumen.valor} · {resumen.cuantas}
      </p>
      <Marca veces={veces} />
    </div>
  );
}

// 3. El mismo cálculo derivado, pero memorizado con createSelector: mientras
//    estado.tareas sea el mismo arreglo, devuelve el mismo resultado.
function Memorizado() {
  const veces = useContarRenderizados("memorizado");
  const pendientes = useSelector(elegirPendientes);

  return (
    <div style={CAJA}>
      <p style={ETIQUETA}>useSelector(elegirPendientes)</p>
      <p className="tenue" style={{ margin: 0, fontSize: "0.8rem" }}>
        createSelector, memorizado.
      </p>
      <p className="marcador" style={{ fontSize: "1.5rem" }}>
        {pendientes.length}
      </p>
      <Marca veces={veces} />
    </div>
  );
}

export default function SelectoresDemo() {
  // Este componente de afuera NO usa useSelector a propósito: si se volviera a
  // dibujar, arrastraría a los tres hijos y la medición no serviría de nada.
  const despachar = useDispatch();

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <button
          type="button"
          className="boton"
          onClick={() => despachar(incrementado())}
        >
          Cambiar el contador
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => despachar(pasoCambiado(1))}
        >
          Despachar paso = 1
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => despachar(tareaAgregada("Tarea de prueba"))}
        >
          Agregar una tarea
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 12,
          alignItems: "start",
        }}
      >
        <Fino />
        <Gordo />
        <Memorizado />
      </div>
    </div>
  );
}
