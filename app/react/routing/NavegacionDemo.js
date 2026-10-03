"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function NavegacionDemo() {
  const router = useRouter();
  const ruta = usePathname();
  const parametros = useSearchParams();

  const paso = Number(parametros.get("paso") ?? "0") || 0;

  // Arma la dirección nueva CONSERVANDO los demás parámetros que ya estaban.
  // Si armáramos la URL a mano pisaríamos lo que puso el otro demo.
  function conPaso(valor) {
    const copia = new URLSearchParams(parametros);
    copia.set("paso", String(valor));
    return `${ruta}?${copia.toString()}`;
  }

  return (
    <div>
      <p className="tenue" style={{ marginTop: 0 }}>
        Lo que ven los hooks ahora mismo
      </p>
      <pre
        style={{
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.78rem",
          lineHeight: 1.8,
          margin: "0 0 16px",
          padding: "12px 14px",
          background: "var(--superficie-2)",
          border: "1px solid var(--borde)",
          borderRadius: 8,
          overflowX: "auto",
        }}
      >
        {`usePathname()                  → "${ruta}"
useSearchParams().get("paso")  → ${JSON.stringify(parametros.get("paso"))}`}
      </pre>

      <div className="fila" style={{ marginBottom: 14 }}>
        <p className="marcador" style={{ minWidth: 56 }}>
          {paso}
        </p>
        <button
          type="button"
          className="boton"
          onClick={() => router.push(conPaso(paso + 1), { scroll: false })}
        >
          push · paso {paso + 1}
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => router.replace(conPaso(paso + 1), { scroll: false })}
        >
          replace · paso {paso + 1}
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => router.back()}
        >
          ← back()
        </button>
      </div>

      <p className="tenue">
        Apretá <strong>push</strong> cuatro veces y después{" "}
        <strong>back</strong> cuatro veces: vas a recorrer 4, 3, 2, 1. Ahora
        hacé lo mismo con <strong>replace</strong>: el número sube igual, pero{" "}
        <strong>back</strong> te saca de la lección de una, porque no quedó
        ninguna entrada en el historial.
      </p>

      <p className="tenue" style={{ marginBottom: 0 }}>
        El botón de atrás del navegador hace exactamente lo mismo que{" "}
        <code>router.back()</code>: no hay dos historiales, hay uno solo.
      </p>
    </div>
  );
}
