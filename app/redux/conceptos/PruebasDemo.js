"use client";

import { useState } from "react";

// --- Los dos reducers que vamos a poner a prueba ---------------------------

const AGREGADA = "tareas/tareaAgregada";

// El correcto: devuelve un arreglo nuevo.
function reducirTareas(estado = [], accion) {
  switch (accion.type) {
    case AGREGADA:
      return [...estado, accion.payload];
    default:
      return estado;
  }
}

// El mismo, con una mutación escondida. En pantalla la aplicación parece
// andar: la tarea aparece. Pero el arreglo que llegó quedó modificado.
function reducirTareasRoto(estado = [], accion) {
  switch (accion.type) {
    case AGREGADA:
      estado.push(accion.payload);
      return estado;
    default:
      return estado;
  }
}

// --- El corredor de pruebas, escrito a mano --------------------------------
// No hay librería acá. Un test es una función que compara lo que esperabas con
// lo que salió, y anota si coincidieron.

function correrPruebas(reducir) {
  const resultados = [];

  function esperar(nombre, ok, detalle) {
    resultados.push({ nombre, ok, detalle });
  }

  const nueva = { id: 9, texto: "tarea nueva", hecha: false };
  const base = () => [{ id: 1, texto: "primera", hecha: false }];

  // 1. Una acción que el reducer no conoce no cambia nada.
  const a = base();
  esperar(
    "una acción desconocida devuelve el MISMO estado",
    reducir(a, { type: "otra/cosa" }) === a,
    "reducir(estado, { type: 'otra/cosa' }) === estado",
  );

  // 2. La tarea aparece al final.
  const b = base();
  const conTarea = reducir(b, { type: AGREGADA, payload: nueva });
  esperar(
    "agrega la tarea al final de la lista",
    conTarea.length === 2 && conTarea[1].texto === "tarea nueva",
    "largo esperado 2, obtenido " + conTarea.length,
  );

  // 3. El estado que entró sigue igual que antes.
  const c = base();
  reducir(c, { type: AGREGADA, payload: nueva });
  esperar(
    "no toca el arreglo que recibió",
    c.length === 1,
    "el estado viejo tenía 1 tarea, ahora tiene " + c.length,
  );

  // 4. Devuelve un objeto distinto, que es como React se entera.
  const d = base();
  esperar(
    "devuelve un arreglo nuevo, no el mismo",
    reducir(d, { type: AGREGADA, payload: nueva }) !== d,
    "resultado !== estado viejo",
  );

  // 5. Es pura: dos veces lo mismo, con la misma entrada.
  const e = base();
  const primera = reducir(e, { type: AGREGADA, payload: nueva });
  const segunda = reducir(e, { type: AGREGADA, payload: nueva });
  esperar(
    "con las mismas entradas da siempre lo mismo",
    JSON.stringify(primera) === JSON.stringify(segunda),
    "dos llamadas sobre el mismo estado viejo",
  );

  return resultados;
}

// --- La pantallita ---------------------------------------------------------

export default function PruebasDemo() {
  const [corrida, setCorrida] = useState(null);

  function correr(roto) {
    setCorrida({
      roto,
      resultados: correrPruebas(roto ? reducirTareasRoto : reducirTareas),
    });
  }

  const pasaron = corrida
    ? corrida.resultados.filter((r) => r.ok).length
    : 0;
  const total = corrida ? corrida.resultados.length : 0;

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <button type="button" className="boton" onClick={() => correr(false)}>
          Correr con el reducer correcto
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => correr(true)}
        >
          Correr con el reducer que muta
        </button>
      </div>

      {corrida === null ? (
        <p className="tenue" style={{ margin: 0 }}>
          Tocá uno de los dos botones. Son las mismas cinco pruebas contra dos
          reducers distintos.
        </p>
      ) : (
        <div>
          <p
            style={{
              margin: "0 0 10px",
              fontFamily: "var(--fuente-mono)",
              fontSize: "0.8rem",
              color: pasaron === total ? "var(--verde)" : "var(--rojo)",
            }}
          >
            {corrida.roto ? "reducirTareasRoto" : "reducirTareas"} ·{" "}
            {pasaron}/{total} pruebas pasaron
          </p>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {corrida.resultados.map((resultado) => (
              <li
                key={resultado.nombre}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  padding: "7px 10px",
                  marginBottom: 6,
                  borderRadius: 8,
                  borderLeft: "3px solid",
                  borderLeftColor: resultado.ok ? "var(--verde)" : "var(--rojo)",
                  background: resultado.ok
                    ? "var(--verde-fondo)"
                    : "var(--rojo-fondo)",
                }}
              >
                <strong
                  style={{
                    fontFamily: "var(--fuente-mono)",
                    fontSize: "0.72rem",
                    color: resultado.ok ? "var(--verde)" : "var(--rojo)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {resultado.ok ? "✓ OK  " : "✗ FALLA"}
                </strong>
                <span style={{ fontSize: "0.85rem" }}>
                  {resultado.nombre}
                  <span
                    className="tenue"
                    style={{ display: "block", fontSize: "0.75rem" }}
                  >
                    {resultado.detalle}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
