"use client";

/**
 * Panelito para mostrar en pantalla lo que fue pasando.
 *
 * En las diapositivas los ejemplos usan alert(), pero acá no: un alert frena
 * toda la página hasta que le das "Aceptar" y arruina el demo. Así que en vez
 * de avisar con un cartel, escribimos en esta lista.
 *
 * Props:
 *   lineas (array de { id, texto })
 *   vacio  (string) qué decir cuando todavía no pasó nada
 */
export default function PanelRegistro({
  lineas = [],
  vacio = "Todavía no pasó nada. Tocá algo acá arriba.",
}) {
  return (
    <div
      style={{
        background: "var(--superficie-2)",
        border: "1px solid var(--borde)",
        borderRadius: 10,
        padding: "12px 14px",
        minHeight: 62,
      }}
    >
      {lineas.length === 0 ? (
        <p className="tenue" style={{ margin: 0 }}>
          {vacio}
        </p>
      ) : (
        <ol style={{ margin: 0, paddingLeft: 22 }}>
          {lineas.map((linea) => (
            <li
              key={linea.id}
              style={{
                fontFamily: "var(--fuente-mono)",
                fontSize: "0.82rem",
                lineHeight: 1.7,
              }}
            >
              {linea.texto}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
