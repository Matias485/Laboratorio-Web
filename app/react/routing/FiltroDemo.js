"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FICHAS = [
  { titulo: "HTML semántico", pista: "html" },
  { titulo: "Tablas", pista: "html" },
  { titulo: "Flexbox", pista: "css" },
  { titulo: "Grid", pista: "css" },
  { titulo: "Los fundamentos del lenguaje", pista: "js" },
  { titulo: "TypeScript", pista: "js" },
  { titulo: "Props", pista: "react" },
  { titulo: "Efectos", pista: "react" },
  { titulo: "Hooks propios", pista: "react" },
];

const PISTAS = ["todas", "html", "css", "js", "react"];

export default function FiltroDemo() {
  const router = useRouter();
  const ruta = usePathname();
  const parametros = useSearchParams();

  // NO hay useState acá adentro. El estado del filtro es la URL.
  const pista = parametros.get("pista") ?? "todas";
  const buscar = parametros.get("buscar") ?? "";

  // Devuelve la dirección con un parámetro cambiado. Si el valor es el de por
  // defecto lo borramos, así la URL no se llena de basura.
  function conParametro(clave, valor) {
    const copia = new URLSearchParams(parametros);
    if (valor === "" || valor === "todas") copia.delete(clave);
    else copia.set(clave, valor);
    const consulta = copia.toString();
    return consulta === "" ? ruta : `${ruta}?${consulta}`;
  }

  const visibles = FICHAS.filter(
    (ficha) =>
      (pista === "todas" || ficha.pista === pista) &&
      ficha.titulo.toLowerCase().includes(buscar.toLowerCase()),
  );

  return (
    <div>
      <div className="fila" style={{ marginBottom: 12 }}>
        {PISTAS.map((nombre) => (
          <button
            key={nombre}
            type="button"
            className={pista === nombre ? "boton" : "boton boton-suave"}
            // push: elegir una pista es una decisión, merece entrada en el historial.
            onClick={() =>
              router.push(conParametro("pista", nombre), { scroll: false })
            }
          >
            {nombre}
          </button>
        ))}
      </div>

      <div className="fila" style={{ marginBottom: 14 }}>
        <label htmlFor="buscar-filtro" className="tenue">
          Buscar en el título
        </label>
        <input
          id="buscar-filtro"
          className="entrada"
          value={buscar}
          placeholder="grid, props, type…"
          // replace: cada tecla NO merece una entrada en el historial.
          onChange={(evento) =>
            router.replace(conParametro("buscar", evento.target.value), {
              scroll: false,
            })
          }
        />
      </div>

      <p className="tenue" style={{ margin: "0 0 6px" }}>
        La dirección, ahora mismo
      </p>
      <pre
        style={{
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.78rem",
          margin: "0 0 14px",
          padding: "10px 14px",
          background: "var(--superficie-2)",
          border: "1px solid var(--borde)",
          borderRadius: 8,
          overflowX: "auto",
        }}
      >
        {parametros.toString() === "" ? ruta : `${ruta}?${parametros.toString()}`}
      </pre>

      {visibles.length === 0 ? (
        <p className="tenue">Ninguna ficha coincide.</p>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 22 }}>
          {visibles.map((ficha) => (
            <li key={ficha.titulo}>
              {ficha.titulo} <span className="tenue">· {ficha.pista}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="tenue" style={{ margin: "14px 0 0" }}>
        Copiá la dirección de la barra del navegador y abrila en otra pestaña:
        aparece con el mismo filtro puesto. Eso es lo que no podés hacer cuando
        el filtro vive en un <code>useState</code>.
      </p>
    </div>
  );
}
