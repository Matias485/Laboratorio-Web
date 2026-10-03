"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Un monitor de temporizadores, para poder VER lo que normalmente es invisible.
// Vive afuera de los componentes a propósito: tiene que sobrevivir a que el
// reloj se desmonte, que es justamente lo que queremos observar.
// ---------------------------------------------------------------------------
const monitor = { creados: 0, cerrados: 0, tics: 0 };

// Los intervalos que quedaron vivos sin que nadie los cierre. En una app de
// verdad no existiría esta lista: los perdés y listo, siguen corriendo hasta
// que se recarga la página.
const huerfanos = new Set();

// Red de seguridad de la demo: si alguien se entusiasma con el botón, no
// dejamos la página con cientos de temporizadores encima.
const TOPE_DE_HUERFANOS = 24;

function registrarHuerfano(id) {
  huerfanos.add(id);
  if (huerfanos.size > TOPE_DE_HUERFANOS) {
    const masViejo = huerfanos.values().next().value;
    clearInterval(masViejo);
    huerfanos.delete(masViejo);
    monitor.cerrados += 1;
  }
}

function matarHuerfanos() {
  for (const id of huerfanos) {
    clearInterval(id);
    monitor.cerrados += 1;
  }
  huerfanos.clear();
}

// ---------------------------------------------------------------------------
// El reloj. Es el mismo componente en los dos modos; lo único que cambia es si
// el efecto devuelve una función de limpieza o no.
// ---------------------------------------------------------------------------
function Reloj({ conLimpieza, cadaCuanto }) {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    monitor.creados += 1;

    const id = setInterval(() => {
      monitor.tics += 1;
      setSegundos((anterior) => anterior + 1);
    }, cadaCuanto);

    if (!conLimpieza) {
      // Sin limpieza el efecto no devuelve nada. React no tiene forma de
      // cerrar este intervalo: queda corriendo para siempre.
      registrarHuerfano(id);
      return undefined;
    }

    // Con limpieza: React ejecuta esto antes de volver a correr el efecto y
    // también cuando el componente se desmonta.
    return () => {
      clearInterval(id);
      monitor.cerrados += 1;
    };
  }, [conLimpieza, cadaCuanto]);

  return (
    <div
      className="tarjeta"
      style={{
        borderColor: conLimpieza ? "var(--verde)" : "var(--rojo)",
        boxShadow: "none",
        textAlign: "center",
      }}
    >
      <p className="tenue" style={{ margin: 0 }}>
        el reloj está montado · un tic cada {cadaCuanto} ms
      </p>
      <p
        className="marcador"
        style={{ color: conLimpieza ? "var(--verde)" : "var(--rojo)" }}
      >
        {segundos}
      </p>
      <p className="tenue" style={{ margin: 0 }}>
        tics que llegaron a ESTE reloj
      </p>
    </div>
  );
}

const NUMERO = {
  fontFamily: "var(--fuente-mono)",
  fontSize: "1.4rem",
  fontWeight: 700,
  margin: 0,
  lineHeight: 1.2,
};

function Dato({ etiqueta, valor, color }) {
  return (
    <div>
      <p style={{ ...NUMERO, color }}>{valor}</p>
      <p className="tenue" style={{ margin: 0, fontSize: "0.78rem" }}>
        {etiqueta}
      </p>
    </div>
  );
}

export default function RelojDemo() {
  const [conLimpieza, setConLimpieza] = useState(true);
  const [cadaCuanto, setCadaCuanto] = useState(1000);
  const [montado, setMontado] = useState(true);

  // Espejo del monitor, para poder dibujarlo. Se refresca solo cuatro veces por
  // segundo y, si no cambió nada, devuelve el objeto anterior: React ve que es
  // el mismo y no vuelve a renderizar.
  const [vista, setVista] = useState(() => ({ ...monitor }));
  useEffect(() => {
    const id = setInterval(() => {
      setVista((anterior) =>
        anterior.creados === monitor.creados &&
        anterior.cerrados === monitor.cerrados &&
        anterior.tics === monitor.tics
          ? anterior
          : { ...monitor },
      );
    }, 250);
    return () => clearInterval(id);
  }, []);

  const vivos = vista.creados - vista.cerrados;

  function reiniciar() {
    matarHuerfanos();
    monitor.creados = 0;
    monitor.cerrados = 0;
    monitor.tics = 0;
    setVista({ ...monitor });
    setMontado(false);
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <label className="fila" style={{ gap: 6 }}>
          <input
            type="checkbox"
            checked={conLimpieza}
            onChange={(evento) => setConLimpieza(evento.target.checked)}
          />
          con función de limpieza
        </label>

        <label className="fila" style={{ gap: 6 }} htmlFor="ef-reloj-ritmo">
          un tic cada
        </label>
        <select
          id="ef-reloj-ritmo"
          className="entrada"
          value={cadaCuanto}
          onChange={(evento) => setCadaCuanto(Number(evento.target.value))}
        >
          <option value={1000}>1000 ms</option>
          <option value={700}>700 ms</option>
          <option value={400}>400 ms</option>
        </select>

        <button
          type="button"
          className="boton"
          onClick={() => setMontado(!montado)}
        >
          {montado ? "Desmontar el reloj" : "Montar el reloj"}
        </button>
      </div>

      {montado ? (
        <Reloj conLimpieza={conLimpieza} cadaCuanto={cadaCuanto} />
      ) : (
        <div
          className="tarjeta"
          style={{ boxShadow: "none", textAlign: "center" }}
        >
          <p className="tenue" style={{ margin: 0 }}>
            el reloj está desmontado
          </p>
          <p className="marcador" style={{ color: "var(--texto-suave)" }}>
            —
          </p>
          <p className="tenue" style={{ margin: 0 }}>
            no hay ningún componente en pantalla
          </p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 12,
          marginTop: 14,
          padding: "12px 14px",
          border: "1px solid var(--borde)",
          borderRadius: "var(--radio)",
          background: "var(--superficie-2)",
        }}
      >
        <Dato etiqueta="intervalos creados" valor={vista.creados} />
        <Dato etiqueta="intervalos cerrados" valor={vista.cerrados} />
        <Dato
          etiqueta="intervalos vivos ahora"
          valor={vivos}
          color={vivos > 1 ? "var(--rojo)" : "var(--verde)"}
        />
        <Dato etiqueta="tics totales" valor={vista.tics} />
      </div>

      <div className="fila" style={{ marginTop: 14 }}>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => {
            matarHuerfanos();
            setVista({ ...monitor });
          }}
        >
          Matar los intervalos huérfanos
        </button>
        <button type="button" className="boton boton-suave" onClick={reiniciar}>
          Reiniciar todo
        </button>
      </div>

      <ol className="tenue" style={{ margin: "14px 0 0", paddingLeft: 20 }}>
        <li>
          Con la limpieza puesta, cambiá el ritmo tres o cuatro veces:{" "}
          <em>intervalos vivos</em> se queda siempre en 1.
        </li>
        <li>
          Ahora destildá la limpieza y volvé a cambiar el ritmo. Los vivos se
          acumulan y el reloj <strong>se acelera</strong>: cada intervalo viejo
          sigue sumando de a uno sobre el mismo estado.
        </li>
        <li>
          Desmontá el reloj. Con limpieza, los tics se frenan. Sin limpieza,{" "}
          <strong>siguen subiendo</strong> aunque no haya ningún componente en
          pantalla. Eso es una pérdida de memoria.
        </li>
      </ol>
    </div>
  );
}
