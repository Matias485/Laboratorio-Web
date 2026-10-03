"use client";

import { useState } from "react";

const VACIO = {
  nombre: "",
  legajo: "",
  email: "",
  comision: "",
  condiciones: false,
  comentarios: "",
};

const EJEMPLO = {
  nombre: "Ada Lovelace",
  legajo: "48122",
  email: "ada@frre.utn.edu.ar",
  comision: "2K1",
  condiciones: true,
  comentarios: "Curso también Análisis Matemático II los martes.",
};

// Recibe los datos y devuelve un objeto con un mensaje por cada campo que está
// mal. Si el objeto queda vacío, el formulario se puede enviar.
function validar(datos) {
  const errores = {};
  if (datos.nombre.trim().length < 3) {
    errores.nombre = "Escribí al menos 3 letras.";
  }
  if (!/^\d{4,6}$/.test(datos.legajo)) {
    errores.legajo = "El legajo son entre 4 y 6 números, sin letras.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
    errores.email = "Eso no parece un email.";
  }
  if (datos.comision === "") {
    errores.comision = "Elegí una comisión.";
  }
  if (!datos.condiciones) {
    errores.condiciones = "Hay que aceptar las condiciones.";
  }
  if (datos.comentarios.length > 200) {
    errores.comentarios = "Máximo 200 caracteres.";
  }
  return errores;
}

export default function InscripcionDemo() {
  const [datos, setDatos] = useState(VACIO);
  const [tocados, setTocados] = useState({});
  const [enviado, setEnviado] = useState(null);

  // Los errores NO son estado: se calculan en cada renderizado a partir de los
  // datos. Guardarlos sería tener la misma información en dos lugares.
  const errores = validar(datos);
  const hayErrores = Object.keys(errores).length > 0;

  // Un solo manejador para todos los campos, gracias al atributo name.
  function alCambiar(e) {
    const { name, type, value, checked } = e.target;
    setDatos({ ...datos, [name]: type === "checkbox" ? checked : value });
  }

  // Marcamos el campo como "visitado" cuando el usuario se va de él, así no le
  // gritamos un error antes de que haya llegado a escribir.
  function alSalir(e) {
    setTocados({ ...tocados, [e.target.name]: true });
  }

  function alEnviar(e) {
    e.preventDefault(); // sin esto el navegador recarga la página
    if (hayErrores) return;
    setEnviado(datos);
  }

  // El error se muestra solamente si ya pasaste por el campo.
  function errorDe(campo) {
    return tocados[campo] ? errores[campo] : undefined;
  }

  return (
    <div>
      <form onSubmit={alEnviar} noValidate>
        <Campo id="ins-nombre" etiqueta="Nombre y apellido" error={errorDe("nombre")}>
          <input
            id="ins-nombre"
            name="nombre"
            className="entrada"
            style={anchoCompleto}
            value={datos.nombre}
            onChange={alCambiar}
            onBlur={alSalir}
            aria-invalid={errorDe("nombre") ? true : undefined}
          />
        </Campo>

        <Campo id="ins-legajo" etiqueta="Legajo" error={errorDe("legajo")}>
          <input
            id="ins-legajo"
            name="legajo"
            className="entrada"
            style={{ width: 140 }}
            value={datos.legajo}
            onChange={alCambiar}
            onBlur={alSalir}
            aria-invalid={errorDe("legajo") ? true : undefined}
          />
        </Campo>

        <Campo id="ins-email" etiqueta="Email" error={errorDe("email")}>
          <input
            id="ins-email"
            name="email"
            type="email"
            className="entrada"
            style={anchoCompleto}
            value={datos.email}
            onChange={alCambiar}
            onBlur={alSalir}
            aria-invalid={errorDe("email") ? true : undefined}
          />
        </Campo>

        <Campo id="ins-comision" etiqueta="Comisión" error={errorDe("comision")}>
          <select
            id="ins-comision"
            name="comision"
            className="entrada"
            value={datos.comision}
            onChange={alCambiar}
            onBlur={alSalir}
          >
            <option value="">Elegí una…</option>
            <option value="1K1">1K1 — lunes y miércoles</option>
            <option value="1K2">1K2 — martes y jueves</option>
            <option value="2K1">2K1 — viernes</option>
          </select>
        </Campo>

        <Campo
          id="ins-comentarios"
          etiqueta="Comentarios (opcional)"
          error={errorDe("comentarios")}
        >
          <textarea
            id="ins-comentarios"
            name="comentarios"
            className="entrada"
            rows={3}
            style={anchoCompleto}
            value={datos.comentarios}
            onChange={alCambiar}
            onBlur={alSalir}
          />
        </Campo>

        <div style={{ margin: "0 0 14px" }}>
          <label className="fila" style={{ gap: 8 }}>
            <input
              type="checkbox"
              name="condiciones"
              checked={datos.condiciones}
              onChange={alCambiar}
              onBlur={alSalir}
            />
            Acepto cursar con 75% de asistencia
          </label>
          {errorDe("condiciones") && (
            <span style={estiloError}>{errorDe("condiciones")}</span>
          )}
        </div>

        <div className="fila">
          <button type="submit" className="boton" disabled={hayErrores}>
            Inscribirme
          </button>
          <button
            type="button"
            className="boton boton-suave"
            onClick={() => {
              setDatos(EJEMPLO);
              setTocados({});
            }}
          >
            Rellenar con un ejemplo
          </button>
          <button
            type="button"
            className="boton boton-suave"
            onClick={() => {
              setDatos(VACIO);
              setTocados({});
              setEnviado(null);
            }}
          >
            Vaciar
          </button>
        </div>

        <p className="tenue" style={{ margin: "10px 0 0" }}>
          {hayErrores
            ? "Falta algo: el botón está deshabilitado."
            : "Todo en orden, ya podés enviar."}
        </p>
      </form>

      {enviado && (
        <div style={{ marginTop: 16 }}>
          <p style={{ margin: "0 0 6px", color: "var(--verde)", fontWeight: 600 }}>
            Enviado sin recargar la página. Esto es lo que mandarías al servidor:
          </p>
          <pre style={estiloJson}>{JSON.stringify(enviado, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Envuelve un control con su etiqueta y su mensaje de error.
function Campo({ id, etiqueta, error, children }) {
  return (
    <div style={{ margin: "0 0 14px" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: 4 }}>
        {etiqueta}
      </label>
      {children}
      {error && <span style={estiloError}>{error}</span>}
    </div>
  );
}

const anchoCompleto = { width: "100%", maxWidth: 340 };

const estiloError = {
  display: "block",
  marginTop: 4,
  color: "var(--rojo)",
  fontSize: "0.85rem",
};

const estiloJson = {
  margin: 0,
  padding: "10px 12px",
  background: "var(--superficie-2)",
  border: "1px solid var(--borde)",
  borderRadius: 8,
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.82rem",
  overflowX: "auto",
};
