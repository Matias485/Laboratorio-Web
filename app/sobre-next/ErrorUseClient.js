"use client";

import { useState } from "react";
import Codigo from "@/components/Codigo";
import Nota from "@/components/Nota";

// Mismo contador que el de ContadorCliente.js, recortado a lo indispensable:
// los nombres y la lógica son los del archivo de al lado.
const CUERPO = `import { useState } from "react";

export default function ContadorCliente() {
  const [clicks, setClicks] = useState(0);

  return (
    <div>
      <p className="marcador">{clicks}</p>
      <button
        type="button"
        className="boton"
        onClick={() => setClicks(clicks + 1)}
      >
        Sumar uno
      </button>
    </div>
  );
}`;

// Este es el texto que escupe la terminal de verdad con Next.js 16 cuando un
// archivo con useState no está marcado como componente de cliente.
const ERROR_REAL = ` ⨯ ./app/sobre-next/ContadorCliente.js
Error:   × You're importing a component that imports \`useState\`.
  │ It only works in a Client Component but none of its parents are marked
  │ with "use client", so they're Server Components by default.
  │ Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
  │
   ╭─[./app/sobre-next/ContadorCliente.js:1:1]
 1 │ import { useState } from "react";
   ·          ────────
 2 │
   ╰────`;

export default function ErrorUseClient() {
  const [conUseClient, setConUseClient] = useState(true);

  const fuente = conUseClient ? `"use client";\n\n${CUERPO}` : CUERPO;

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <button
          type="button"
          className="boton"
          onClick={() => setConUseClient(!conUseClient)}
        >
          {conUseClient ? 'Borrar la línea "use client"' : 'Volver a poner "use client"'}
        </button>
        <span className="tenue">
          {conUseClient ? "El archivo está bien." : "El archivo está roto."}
        </span>
      </div>

      {/* Con la línea puesta resaltamos la línea 1 porque es la que arregla
          todo; sin ella, la línea 1 pasa a ser el import que el error señala. */}
      <Codigo
        archivo="app/sobre-next/ContadorCliente.js"
        resaltar={[1]}
        codigo={fuente}
      />

      {conUseClient ? (
        <Nota tipo="ok" titulo="Compila">
          <p style={{ marginBottom: 0 }}>
            La primera línea marca el archivo como componente de cliente, así
            que useState y onClick tienen permiso de existir.
          </p>
        </Nota>
      ) : (
        <Nota tipo="error" titulo="Esto es lo que ves en la terminal">
          <Codigo archivo="terminal" codigo={ERROR_REAL} />
          <p style={{ marginBottom: 0 }}>
            No te asustes con los dibujitos: el error te dice exactamente qué
            archivo, qué línea y qué palabra lo causaron.
          </p>
        </Nota>
      )}
    </div>
  );
}
