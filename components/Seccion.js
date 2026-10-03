/**
 * Un bloque temático dentro de una lección.
 *
 * Props:
 *   titulo (string)
 *   id     (string, opcional) para poder enlazar directo a esta sección
 */
export default function Seccion({ titulo, id, children }) {
  return (
    <section className="seccion" id={id}>
      {titulo && <h2>{titulo}</h2>}
      {children}
    </section>
  );
}
