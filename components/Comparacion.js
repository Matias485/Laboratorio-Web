/**
 * Dos columnas lado a lado para contrastar lo que está mal con lo que está bien.
 *
 * Uso:
 *   <Comparacion>
 *     <Columna tono="mal" titulo="Incorrecto">…</Columna>
 *     <Columna tono="bien" titulo="Correcto">…</Columna>
 *   </Comparacion>
 */
export default function Comparacion({ children }) {
  return <div className="comparacion">{children}</div>;
}

export function Columna({ tono = "mal", titulo, children }) {
  return (
    <div className={`columna columna-${tono}`}>
      {titulo && (
        <h3 className="columna-titulo">
          {tono === "mal" ? "✗ " : "✓ "}
          {titulo}
        </h3>
      )}
      <div className="columna-cuerpo">{children}</div>
    </div>
  );
}
