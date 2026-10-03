"use client";

import { useState } from "react";

// Terminal de mentira: no ejecuta nada, solo muestra qué contestaría cada
// comando. Sirve para ver de un vistazo en qué se diferencian npm y npx.
const COMANDOS = [
  {
    id: "npm-v",
    comando: "npm -v",
    salida: ["11.6.2"],
    explicacion: "npm viene instalado junto con Node.js. Si esto contesta un número, ya lo tenés.",
  },
  {
    id: "npx-v",
    comando: "npx -v",
    salida: ["11.6.2"],
    explicacion: "npx también viene con Node.js, y por eso contesta la misma versión que npm.",
  },
  {
    id: "crear",
    comando: "npx create-next-app@latest mi-primer-app",
    salida: [
      "Need to install the following packages:",
      "  create-next-app@latest",
      "Ok to proceed? (y) y",
      "",
      "√ Would you like to use TypeScript? ... No",
      "√ Would you like to use ESLint? ... Yes",
      "√ Would you like to use App Router? ... Yes",
      "",
      "Creating a new Next.js app in C:\\proyectos\\mi-primer-app.",
      "Success! Created mi-primer-app",
    ],
    explicacion:
      "npx bajó create-next-app, lo corrió una sola vez y no lo dejó instalado. Es el comando con el que nació este proyecto.",
  },
  {
    id: "install",
    comando: "npm install",
    salida: ["added 312 packages in 14s"],
    explicacion:
      "npm install lee package.json y baja todo a node_modules. Es lo primero que corrés cuando te bajás un proyecto de otra persona.",
  },
  {
    id: "dev",
    comando: "npm run dev",
    salida: [
      "> laboratorio-react@0.1.0 dev",
      "> next dev",
      "",
      "  ▲ Next.js 16.3.6",
      "  - Local:  http://localhost:3000",
      "",
      "✓ Ready in 1.4s",
    ],
    explicacion:
      "npm run <nombre> ejecuta un script del package.json de ESTE proyecto. Mientras esto corre, la página se actualiza sola cuando guardás un archivo.",
  },
];

export default function TerminalDeComandos() {
  const [historial, setHistorial] = useState([]);
  const [proximoId, setProximoId] = useState(1);

  function correr(comando) {
    // Cada entrada del historial necesita una key estable: usamos un contador
    // propio en vez del índice del arreglo. Los renglones de salida también
    // reciben la suya, armada a partir de esa misma clave.
    const entrada = {
      ...comando,
      clave: proximoId,
      salida: comando.salida.map((texto, numero) => ({
        clave: `${proximoId}-${numero}`,
        texto,
      })),
    };
    setHistorial([...historial, entrada]);
    setProximoId(proximoId + 1);
  }

  const ultimo = historial[historial.length - 1];

  return (
    <div>
      <div
        style={{
          background: "var(--codigo-fondo)",
          color: "var(--codigo-texto)",
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.82rem",
          lineHeight: 1.55,
          borderRadius: "var(--radio)",
          padding: "14px 16px",
          minHeight: 150,
          maxHeight: 280,
          overflow: "auto",
          marginBottom: 14,
        }}
      >
        {historial.length === 0 ? (
          <p style={{ margin: 0, color: "var(--codigo-tenue)" }}>
            Tocá un comando de abajo para ver qué contesta la terminal.
          </p>
        ) : (
          historial.map((linea) => (
            <div key={linea.clave} style={{ marginBottom: 10 }}>
              <p style={{ margin: 0 }}>
                <span style={{ color: "var(--codigo-funcion)" }}>
                  C:\mi-primer-app&gt;{" "}
                </span>
                {linea.comando}
              </p>
              {linea.salida.map((renglon) => (
                <p
                  key={renglon.clave}
                  style={{ margin: 0, color: "var(--codigo-tenue)" }}
                >
                  {renglon.texto === "" ? "\u00a0" : renglon.texto}
                </p>
              ))}
            </div>
          ))
        )}
      </div>

      <div className="fila">
        {COMANDOS.map((comando) => (
          <button
            key={comando.id}
            type="button"
            className="boton boton-suave"
            onClick={() => correr(comando)}
          >
            {comando.comando}
          </button>
        ))}
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setHistorial([])}
          disabled={historial.length === 0}
        >
          limpiar
        </button>
      </div>

      {ultimo && (
        <p className="tenue" style={{ marginBottom: 0, marginTop: 12 }}>
          {ultimo.explicacion}
        </p>
      )}
    </div>
  );
}
