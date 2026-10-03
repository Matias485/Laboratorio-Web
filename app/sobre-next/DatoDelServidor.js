// OJO: este archivo NO tiene "use client" arriba.
// Se ejecuta en el servidor, y al navegador le llega solamente el HTML con el
// resultado ya calculado. Acá no podés usar useState ni onClick: no existe el
// navegador todavía cuando corre esta función.
//
// "process" es el objeto de Node.js que representa al programa que está
// corriendo en el servidor. En el navegador ni siquiera existe: si copiás esta
// línea a un componente de cliente, explota con "process is not defined".
export default function DatoDelServidor() {
  const versionDeNode = process.version;
  const sistema = process.platform;

  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 4px" }}>
        Componente de servidor
      </p>
      <p className="marcador">{versionDeNode}</p>
      <p className="tenue" style={{ marginBottom: 0 }}>
        La versión de Node.js que corre en <code>{sistema}</code>, leída del
        servidor. No hay botón que la cambie: para verla de nuevo hay que
        pedirle la página al servidor otra vez.
      </p>
    </div>
  );
}
