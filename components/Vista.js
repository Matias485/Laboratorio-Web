"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muestra HTML y CSS sueltos dentro de un iframe, aislados del estilo de este
 * sitio. Es lo que permite que los ejemplos de las lecciones de HTML y CSS se
 * vean tal cual se verían en una página en blanco.
 *
 * Props:
 *   html   (string) el contenido que va adentro de <body>
 *   css    (string) las reglas que van adentro de <style>
 *   alto   (number) alto fijo en píxeles. Si no lo pasás, se ajusta solo.
 *   fondo  (string) color de fondo del documento. Por defecto blanco.
 */
export default function Vista({ html = "", css = "", alto, fondo = "#ffffff" }) {
  const refMarco = useRef(null);
  const [altoMedido, setAltoMedido] = useState(alto ?? 160);

  useEffect(() => {
    if (alto) return; // si el alto lo fijó quien usa el componente, no medimos

    function alRecibir(evento) {
      const marco = refMarco.current;
      if (!marco || evento.source !== marco.contentWindow) return;
      if (evento.data && evento.data.tipo === "alto-de-la-vista") {
        setAltoMedido(Math.max(60, Math.ceil(evento.data.valor)));
      }
    }

    window.addEventListener("message", alRecibir);
    return () => window.removeEventListener("message", alRecibir);
  }, [alto]);

  return (
    <iframe
      ref={refMarco}
      className="vista"
      title="Ejemplo en vivo"
      sandbox="allow-scripts"
      style={{ height: alto ?? altoMedido }}
      srcDoc={documento(html, css, fondo, !alto)}
    />
  );
}

// Arma el documento completo que va adentro del iframe.
function documento(html, css, fondo, midiendo) {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 16px;
    background: ${fondo};
    color: #15212e;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    line-height: 1.5;
  }
${css}
</style>
</head>
<body>
${html}
${midiendo ? GUION_DE_MEDIDA : ""}
</body>
</html>`;
}

// Le avisa al sitio de afuera cuánto mide el contenido, para que el iframe
// crezca solo en vez de quedar con una barra de scroll.
const GUION_DE_MEDIDA = `<script>
  function avisarAlto() {
    var alto = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    parent.postMessage({ tipo: "alto-de-la-vista", valor: alto }, "*");
  }
  window.addEventListener("load", avisarAlto);
  if (window.ResizeObserver) {
    new ResizeObserver(avisarAlto).observe(document.body);
  }
  avisarAlto();
</script>`;
