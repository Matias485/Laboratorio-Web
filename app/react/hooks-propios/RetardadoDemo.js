"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// useRetardado (debounce): devuelve el mismo valor que le pasás, pero recién
// después de que se quedó quieto durante "retardo" milisegundos.
//
// La limpieza es TODO el truco: si el valor cambia antes de que se cumpla el
// tiempo, React ejecuta el return del efecto, se cancela el timeout viejo y
// arranca uno nuevo. Mientras vos tipeás, el reloj se reinicia en cada tecla.
// ---------------------------------------------------------------------------
// El tercer parámetro es opcional: una función a la que el hook avisa en el
// momento exacto en que el valor se estabiliza. Así quien lo usa puede hacer
// algo una sola vez por pausa (pedir datos, registrar la búsqueda) sin tener
// que escribir otro efecto por su cuenta.
function useRetardado(valor, retardo = 400, alEstabilizar) {
  const [retrasado, setRetrasado] = useState(valor);

  // Guardamos la función en una ref y la mantenemos al día con un efecto. Si la
  // pusiéramos en las dependencias del efecto de abajo, el temporizador se
  // reiniciaría en cada renderizado, porque es una función nueva cada vez.
  const refAviso = useRef(alEstabilizar);
  useEffect(() => {
    refAviso.current = alEstabilizar;
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setRetrasado(valor);
      if (refAviso.current) refAviso.current(valor);
    }, retardo);
    return () => clearTimeout(id);
  }, [valor, retardo]);

  return retrasado;
}

const LENGUAJES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "Go",
  "Rust",
  "Kotlin",
  "Swift",
  "PHP",
  "Ruby",
  "Scala",
];

// Función común: no usa hooks, así que vive afuera del componente.
function buscar(consulta) {
  const texto = consulta.trim().toLowerCase();
  if (texto === "") return [];
  return LENGUAJES.filter((lenguaje) =>
    lenguaje.toLowerCase().includes(texto),
  );
}

const estiloPanel = {
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.78rem",
  lineHeight: 1.8,
  margin: 0,
  padding: "12px 14px",
  background: "var(--superficie-2)",
  border: "1px solid var(--borde)",
  borderRadius: 8,
  minHeight: 120,
  overflowX: "auto",
};

export default function RetardadoDemo() {
  const [texto, setTexto] = useState("");
  const [retardo, setRetardo] = useState(500);
  const [teclas, setTeclas] = useState(0);
  const [registro, setRegistro] = useState([]);

  // El valor "tranquilo": cambia solo cuando dejás de escribir. El tercer
  // argumento es lo que el hook llama cuando eso pasa.
  const consulta = useRetardado(texto, retardo, registrarBusqueda);

  // Esto simula el pedido al servidor: ocurre una sola vez por pausa, no una
  // vez por tecla. Comparalo con el contador de teclas de la izquierda.
  function registrarBusqueda(valor) {
    const limpia = valor.trim();
    if (limpia === "") return;
    setRegistro((lista) => [
      { numero: lista.length + 1, consulta: limpia, cuantos: buscar(limpia).length },
      ...lista,
    ]);
  }

  const resultados = buscar(consulta);

  function reiniciar() {
    setTexto("");
    setTeclas(0);
    setRegistro([]);
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 12, alignItems: "flex-end" }}>
        <div style={{ flex: "1 1 220px" }}>
          <label htmlFor="hp-buscador" style={{ display: "block" }}>
            Buscar un lenguaje
          </label>
          <input
            id="hp-buscador"
            className="entrada"
            type="search"
            value={texto}
            placeholder="escribí rápido: java, scr, ty…"
            onChange={(evento) => {
              setTexto(evento.target.value);
              setTeclas((n) => n + 1);
            }}
            style={{ width: "100%", marginTop: 4 }}
          />
        </div>
        <div>
          <label htmlFor="hp-retardo" style={{ display: "block" }}>
            Retardo
          </label>
          <select
            id="hp-retardo"
            className="entrada"
            value={retardo}
            onChange={(evento) => setRetardo(Number(evento.target.value))}
            style={{ marginTop: 4 }}
          >
            <option value={0}>0 ms (sin debounce)</option>
            <option value={200}>200 ms</option>
            <option value={500}>500 ms</option>
            <option value={1200}>1200 ms</option>
          </select>
        </div>
        <button type="button" className="boton boton-suave" onClick={reiniciar}>
          Reiniciar
        </button>
      </div>

      <p className="tenue" style={{ margin: "0 0 12px" }}>
        Tocaste el teclado <strong>{teclas}</strong>{" "}
        {teclas === 1 ? "vez" : "veces"} y se dispararon{" "}
        <strong>{registro.length}</strong>{" "}
        {registro.length === 1 ? "consulta" : "consultas"}. Sin el hook habría
        salido una por tecla.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 14,
        }}
      >
        <div>
          <p className="tenue" style={{ margin: "0 0 6px" }}>
            Resultados de <code>{consulta || "—"}</code>
          </p>
          {resultados.length === 0 ? (
            <p className="tenue" style={{ margin: 0 }}>
              {consulta.trim() === ""
                ? "Escribí algo para buscar."
                : "Ningún lenguaje coincide."}
            </p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 22 }}>
              {resultados.map((lenguaje) => (
                <li key={lenguaje}>{lenguaje}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="tenue" style={{ margin: "0 0 6px" }}>
            Consultas que salieron (las últimas primero)
          </p>
          <pre style={estiloPanel}>
            {registro.length === 0
              ? "todavía no salió ninguna"
              : registro
                  .slice(0, 6)
                  .map(
                    (linea) =>
                      `#${linea.numero}  "${linea.consulta}"  → ${linea.cuantos} resultados`,
                  )
                  .join("\n")}
          </pre>
        </div>
      </div>
    </div>
  );
}
