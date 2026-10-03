import Link from "next/link";
import Leccion from "@/components/Leccion";
import Seccion from "@/components/Seccion";
import Codigo from "@/components/Codigo";
import Demo from "@/components/Demo";
import Nota from "@/components/Nota";
import Desafio from "@/components/Desafio";
import Comparacion, { Columna } from "@/components/Comparacion";
import JuegoDeTe from "./JuegoDeTe";
import JuegoDeTeDemo from "./JuegoDeTeDemo";
import ConstructorDePerfil from "./ConstructorDePerfil";
import BotonConDefecto from "./BotonConDefecto";
import PanelDemo from "./PanelDemo";
import SoloLecturaDemo from "./SoloLecturaDemo";

export const metadata = { title: "Props" };

export default function Pagina() {
  return (
    <Leccion
      slug="/react/props"
      titulo="Props"
      resumen="Cómo un componente padre le pasa información a un hijo, y qué es children."
    >
      <Seccion titulo="Las props son los argumentos del componente">
        <p>
          Un componente es una función, así que como toda función recibe
          argumentos. Esos argumentos se llaman <strong>props</strong> y son la
          única manera que tiene un padre de mandarle datos a un hijo. Este es el
          ejemplo que viste en la clase, tal cual:
        </p>

        <Codigo
          archivo="app/react/props/JuegoDeTe.js"
          resaltar={[1, 8, 9, 10]}
          codigo={`function Taza({ invitado }) {
  return <h2>Taza de té para el invitado #{invitado}</h2>;
}

export default function JuegoDeTe() {
  return (
    <>
      <Taza invitado={1} />
      <Taza invitado={2} />
      <Taza invitado={3} />
    </>
  );
}`}
        />

        <Demo titulo="El ejemplo de la clase, andando">
          <JuegoDeTe />
        </Demo>

        <p>
          Escribiste <strong>un solo</strong> componente <code>Taza</code> y lo
          usaste tres veces. React llamó a la función tres veces, cada vez con un
          objeto distinto: <code>{"{ invitado: 1 }"}</code>,{" "}
          <code>{"{ invitado: 2 }"}</code> y <code>{"{ invitado: 3 }"}</code>.
          Eso es todo lo que son las props.
        </p>

        <h3>React siempre pasa UN objeto</h3>
        <p>
          Aunque le mandes ocho props, la función recibe un único argumento: un
          objeto con todas adentro. Por eso hay dos formas de escribir lo mismo.
        </p>

        <Comparacion>
          <Columna tono="mal" titulo="Funciona, pero nadie lo escribe así">
            <Codigo
              archivo="Taza.js"
              codigo={`function Taza(props) {
  // props es UN objeto: { invitado: 1 }
  return <h2>Taza #{props.invitado}</h2>;
}`}
            />
            <p className="tenue">
              Tenés que escribir <code>props.</code> adelante de todo, y desde
              afuera no se ve qué props usa este componente.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Destructurando, que es lo normal">
            <Codigo
              archivo="Taza.js"
              codigo={`function Taza({ invitado }) {
  // sacamos invitado del objeto
  return <h2>Taza #{invitado}</h2>;
}`}
            />
            <p className="tenue">
              La firma te dice de una qué recibe el componente. Es la forma que
              vas a ver siempre.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="info" titulo="Ya sabías hacer esto">
          <p>
            Las llaves en <code>{"function Taza({ invitado })"}</code> no son
            magia de React: es la misma destructuración de JavaScript que usaste
            con arreglos (<code>const [a, b] = lista</code>) y con objetos. De
            hecho, escribir <code>{"function Taza({ invitado })"}</code> es
            idéntico a escribir <code>function Taza(props)</code> y después{" "}
            <code>{"const { invitado } = props;"}</code> en la primera línea.
          </p>
        </Nota>

        <p>
          Lo interesante aparece cuando el valor de la prop cambia: el mismo
          componente dibuja otra cosa. Movés el número y React vuelve a llamar a{" "}
          <code>Taza</code> con las props nuevas.
        </p>

        <Demo titulo="Tazas de té a pedido">
          <JuegoDeTeDemo />
        </Demo>

        <Codigo
          archivo="app/react/props/JuegoDeTeDemo.js"
          resaltar={[25, 26, 27]}
          codigo={`"use client";

import { useState } from "react";

function Taza({ invitado }) {
  return <h2>Taza de té para el invitado #{invitado}</h2>;
}

export default function JuegoDeTeDemo() {
  const [invitados, setInvitados] = useState(3);

  // Un arreglo [1, 2, 3, ...] con un número por invitado.
  const numeros = Array.from({ length: invitados }, (_, i) => i + 1);

  return (
    <div>
      <label htmlFor="cantidad-invitados">¿Cuántos invitados hay?</label>
      <input
        id="cantidad-invitados"
        type="number"
        value={invitados}
        onChange={(evento) => setInvitados(Number(evento.target.value))}
      />

      {numeros.map((numero) => (
        <Taza key={numero} invitado={numero} />
      ))}
    </div>
  );
}`}
        />
        <p className="tenue">
          En el archivo real hay además un recorte de 0 a 12, un mensaje para
          cuando no queda ningún invitado y algunas clases de CSS; acá se los
          saqué para que se vea lo importante.
        </p>
      </Seccion>

      <Seccion titulo="Cómo se pasa cada tipo de valor">
        <p>
          Si la prop es un texto fijo, va entre comillas. Cualquier otra cosa va
          entre llaves, porque las llaves en JSX significan{" "}
          <em>&quot;acá adentro viene JavaScript&quot;</em>.
        </p>

        <Codigo
          archivo="Ejemplo.js"
          codigo={`<Perfil
  nombre="Ada"                  // texto: comillas
  apellido={"Lovelace"}         // texto: con llaves también vale
  edad={36}                     // número: SIEMPRE llaves
  activa                        // atajo de activa={true}
  tema={{ fondo: "azul" }}      // objeto: llaves de prop + llaves de objeto
  etiquetas={["react", "jsx"]}  // arreglo
  alSaludar={saludar}           // función: sin paréntesis
/>`}
        />

        <Nota tipo="atencion" titulo="El clásico: un número escrito como texto">
          <p>
            <code>cantidad=&quot;3&quot;</code> le pasa el <em>texto</em>{" "}
            <code>&quot;3&quot;</code>, no el número. Adentro del componente,{" "}
            <code>cantidad + 1</code> te da <code>&quot;31&quot;</code> y no{" "}
            <code>4</code>. Los números van siempre entre llaves.
          </p>
        </Nota>

        <Comparacion>
          <Columna tono="mal" titulo="Así no">
            <Codigo
              archivo="Ejemplo.js"
              codigo={`<Bolsa cantidad="3" />
<Bolsa alComprar={comprar()} />`}
            />
            <p className="tenue">
              La primera manda un texto. La segunda ejecuta{" "}
              <code>comprar</code> durante el render y le pasa al hijo lo que esa
              función devolvió.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Así sí">
            <Codigo
              archivo="Ejemplo.js"
              codigo={`<Bolsa cantidad={3} />
<Bolsa alComprar={comprar} />`}
            />
            <p className="tenue">
              Un número de verdad, y la función <strong>sin paréntesis</strong>{" "}
              para que la llame el hijo cuando corresponda.
            </p>
          </Columna>
        </Comparacion>

        <p>
          Este demo es el corazón de la lección. Moviendo los controles estás
          cambiando las props que recibe <code>TarjetaPerfil</code>: abajo de
          todo se ve, escrita, la etiqueta JSX exacta que React está dibujando en
          ese momento.
        </p>

        <Demo titulo="Armá las props de una tarjeta">
          <ConstructorDePerfil />
        </Demo>

        <p>
          El hijo es una función boba: recibe props y dibuja. No tiene estado, no
          sabe que existe un panel de controles arriba.
        </p>

        <Codigo
          archivo="app/react/props/TarjetaPerfil.js"
          resaltar={[1, 2, 3, 4, 5, 6, 7]}
          codigo={`export default function TarjetaPerfil({
  nombre,
  rol,
  color,
  experiencia,
  mostrarAvatar,
}) {
  return (
    <div className="tarjeta" style={{ borderTop: "4px solid " + color }}>
      <div className="fila">
        {mostrarAvatar && (
          <img src="https://i.imgur.com/1bX5QH6.jpg" alt={"Foto de " + nombre} />
        )}
        <div>
          <h3 style={{ color: color }}>{nombre}</h3>
          <p>{rol}</p>
        </div>
      </div>
      <p>
        {experiencia} {experiencia === 1 ? "año" : "años"} de experiencia
      </p>
    </div>
  );
}`}
        />

        <p>
          Y el padre, que guarda los valores en estado y se los pasa hacia abajo:
        </p>

        <Codigo
          archivo="app/react/props/ConstructorDePerfil.js"
          resaltar={[15, 16, 17, 18, 19, 20, 21]}
          codigo={`"use client";

import { useState } from "react";
import TarjetaPerfil from "./TarjetaPerfil";

export default function ConstructorDePerfil() {
  const [nombre, setNombre] = useState("Ada Lovelace");
  const [rol, setRol] = useState("Estudiante");
  // ...un useState por cada control del panel

  return (
    <div>
      {/* acá van los inputs y los selects */}

      <TarjetaPerfil
        nombre={nombre}
        rol={rol}
        color={color}
        experiencia={experiencia}
        mostrarAvatar={mostrarAvatar}
      />
    </div>
  );
}`}
        />
      </Seccion>

      <Seccion titulo="Valores por defecto">
        <p>
          Si una prop puede faltar, dale un valor por defecto en la misma
          destructuración. Sirve para que el componente no se rompa cuando lo usa
          otra persona (o vos, tres semanas después).
        </p>

        <Codigo
          archivo="app/react/props/BotonConDefecto.js"
          resaltar={[1]}
          codigo={`function BotonAmable({ texto = "Aceptar" }) {
  return (
    <button type="button" className="boton">
      {texto}
    </button>
  );
}

// <BotonAmable />              → dice "Aceptar"
// <BotonAmable texto="Borrar" /> → dice "Borrar"`}
        />

        <Demo titulo="Con prop y sin prop">
          <BotonConDefecto />
        </Demo>

        <Nota tipo="atencion" titulo="El defecto entra sólo si la prop es undefined">
          <p>
            Destildá la casilla y el botón dice <code>Aceptar</code>: no le
            llegó la prop. Pero si dejás la casilla tildada y borrás todo el
            texto, la prop llega como <code>&quot;&quot;</code> (cadena vacía),
            que no es <code>undefined</code>, así que el valor por defecto{" "}
            <strong>no</strong> se usa y el botón queda vacío. Probalo.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="children: lo que va entre las etiquetas">
        <p>
          Cuando en vez de <code>{"<Panel />"}</code> escribís{" "}
          <code>{"<Panel>...</Panel>"}</code>, todo lo que pusiste en el medio le
          llega al componente en una prop especial llamada{" "}
          <strong>children</strong>. Es lo que te permite escribir componentes
          tipo tarjeta, panel o modal, que sirven de marco para cualquier
          contenido.
        </p>

        <Codigo
          archivo="app/react/props/PanelDemo.js"
          resaltar={[1, 5]}
          codigo={`function Panel({ titulo, children }) {
  return (
    <div style={{ border: "1px solid var(--borde)", borderRadius: 10 }}>
      <p style={{ margin: 0, padding: "8px 14px", fontWeight: 700 }}>{titulo}</p>
      <div style={{ padding: 14 }}>{children}</div>
    </div>
  );
}

// Y se usa así:
<Panel titulo="Recordatorio">
  <p>Esto de acá adentro es children.</p>
</Panel>`}
        />

        <Demo titulo="Un panel, tres contenidos distintos">
          <PanelDemo />
        </Demo>

        <p>
          Fijate que <code>Panel</code> es siempre el mismo componente: no tiene
          ni un <code>if</code> para decidir qué mostrar adentro. Eso lo decide
          quien lo usa. Y si elegís el botón que cuenta aplausos, vas a ver que
          adentro del panel funciona igual: <code>children</code> es JSX común y
          corriente, con sus eventos incluidos. Ojo con un detalle: el estado de
          ese contador vive en el componente que escribió el children, no en{" "}
          <code>Panel</code>.
        </p>

        <Nota tipo="info" titulo="children es una prop más">
          <p>
            <code>{'<Panel titulo="Hola">texto</Panel>'}</code> es exactamente lo
            mismo que <code>{'<Panel titulo="Hola" children="texto" />'}</code>.
            Nadie escribe la segunda forma, pero entender que{" "}
            <code>children</code> es una prop normal te explica por qué podés
            pasarle cualquier cosa.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Las props son de sólo lectura">
        <p>
          Un componente puede leer sus props, pero <strong>no</strong> puede
          cambiarlas. Las props son del padre: el hijo las recibe para este
          render, las usa y nada más. El flujo de datos en React va siempre de
          arriba hacia abajo: los datos bajan del padre al hijo, nunca al revés.
        </p>

        <Demo titulo="El hijo intenta y no puede">
          <SoloLecturaDemo />
        </Demo>

        <Codigo
          archivo="app/react/props/SoloLecturaDemo.js"
          resaltar={[5, 6, 7]}
          codigo={`function Medidor({ valor }) {
  const [intentos, setIntentos] = useState(0);

  function intentarSubir() {
    // Contar los intentos sí lo puede hacer: ese estado es del hijo.
    // Escribirle encima a la prop "valor", no: esa prop es del padre.
    setIntentos(intentos + 1);
  }

  return (
    <div className="tarjeta">
      <p>El hijo recibe la prop valor:</p>
      <p className="marcador">{valor}</p>
      <button type="button" className="boton boton-suave" onClick={intentarSubir}>
        Intentar subirlo desde el hijo
      </button>
      {intentos > 0 && (
        <p className="tenue">
          Apretaste {intentos} {intentos === 1 ? "vez" : "veces"}. El hijo podría
          calcular {valor + 1} en una variable local, pero la prop sigue
          valiendo {valor}: no es suya.
        </p>
      )}
    </div>
  );
}`}
        />

        <p>
          El botón del hijo no mueve el número por más que lo aprietes: lo
          único que sube es el contador de intentos, que ese sí es estado del
          hijo. El número lo mueve solamente el padre. Cada vez que el
          componente se vuelve a renderizar, React le entrega las props que le
          manda el padre, pisando cualquier cosa que el hijo haya intentado.
        </p>

        <Nota tipo="error" titulo="Si intentás mutarlas, el linter te frena">
          <p>
            Reasignar la variable que sacaste de la destructuración (
            <code>valor = valor + 1</code>) es JavaScript válido, pero no sirve
            para nada: estás cambiando una variable local de este render y el
            padre ni se entera. Y si vas un paso más allá y escribís{" "}
            <code>props.valor = props.valor + 1</code>, el linter de React te
            corta con un error:{" "}
            <em>Modifying component props or hook arguments is not allowed</em>.
            No es una cuestión de estilo: React cuenta con que las props no se
            tocan.
          </p>
        </Nota>

        <Nota tipo="atencion" titulo="Si algo tiene que cambiar, es estado">
          <p>
            Que un valor cambie con el tiempo no se resuelve escribiéndole
            encima a una prop, sino con <strong>estado</strong> en el componente
            que es dueño del dato (acá, el padre). De eso se trata la clase 6:
            seguí en <Link href="/react/estado">useState</Link>. La combinación normal
            es: el padre guarda el estado, se lo pasa al hijo por props, y le
            pasa también una función para que el hijo le avise cuándo cambiarlo.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Reenviar todas las props con spread">
        <p>
          A veces un componente sólo envuelve a otro y le pasa todo lo que
          recibió. Para eso está el spread, el mismo <code>...</code> que usás
          con objetos en JavaScript.
        </p>

        <Codigo
          archivo="Ejemplo.js"
          resaltar={[2]}
          codigo={`function Tarjeta(props) {
  // {...props} manda TODAS las props que llegaron, tal cual.
  return <Caja {...props} />;
}`}
        />

        <Comparacion>
          <Columna tono="mal" titulo="Spread en todos lados">
            <Codigo
              archivo="Ejemplo.js"
              codigo={`function Perfil(props) {
  return (
    <Tarjeta {...props}>
      <Avatar {...props} />
    </Tarjeta>
  );
}`}
            />
            <p className="tenue">
              Nadie sabe qué props existen sin abrir los cuatro archivos, y un
              error de tipeo en el nombre de una prop no se nota nunca.
            </p>
          </Columna>
          <Columna tono="bien" titulo="Explícito, o spread del resto">
            <Codigo
              archivo="Ejemplo.js"
              codigo={`function Perfil({ persona, ...resto }) {
  return (
    <Tarjeta {...resto}>
      <Avatar persona={persona} />
    </Tarjeta>
  );
}`}
            />
            <p className="tenue">
              Se lee qué usa este componente y qué deja pasar. Si son dos o tres
              props, escribilas a mano.
            </p>
          </Columna>
        </Comparacion>

        <Nota tipo="atencion" titulo="Usalo poco">
          <p>
            El spread de props se abusa muchísimo. Si tenés que escribirlo, suele
            ser señal de que ese componente debería recibir{" "}
            <code>children</code> en vez de veinte props que sólo está
            reenviando.
          </p>
        </Nota>
      </Seccion>

      <Seccion titulo="Desafíos">
        <Desafio
          titulo="1. Agregarle una prop nueva a un componente"
          pista={
            <p>
              La prop nueva se agrega en dos lugares: en la destructuración de la
              firma (ahí también va el valor por defecto) y en la etiqueta donde
              usás el componente. Para pintar el texto,{" "}
              <code>{'style={{ color: color }}'}</code>.
            </p>
          }
          solucion={
            <Codigo
              archivo="Insignias.js"
              resaltar={[1, 8, 9]}
              codigo={`function Insignia({ texto, color = "#2f6fb5" }) {
  return <span style={{ color: color }}>{texto}</span>;
}

export default function Insignias() {
  return (
    <div>
      <Insignia texto="React" />
      <Insignia texto="Urgente" color="#b4243a" />
    </div>
  );
}`}
            />
          }
        >
          <p>Partiendo de este componente:</p>
          <Codigo
            archivo="Insignias.js"
            codigo={`function Insignia({ texto }) {
  return <span>{texto}</span>;
}

export default function Insignias() {
  return <Insignia texto="React" />;
}`}
          />
          <p>
            Agregale una prop <code>color</code> que pinte el texto, con{" "}
            <code>&quot;#2f6fb5&quot;</code> como valor por defecto. Después
            mostrá dos insignias: una sin la prop <code>color</code> y otra en
            rojo.
          </p>
        </Desafio>

        <Desafio
          titulo="2. Un componente Panel con children"
          pista={
            <p>
              <code>children</code> se escribe igual que cualquier otra prop en
              la destructuración, y se dibuja poniéndolo entre llaves donde
              quieras que aparezca el contenido. Ojo: si usás{" "}
              <code>{"<Panel />"}</code> auto-cerrado no hay children.
            </p>
          }
          solucion={
            <Codigo
              archivo="Panel.js"
              resaltar={[1, 5]}
              codigo={`function Panel({ titulo, children }) {
  return (
    <section>
      <h3>{titulo}</h3>
      <div>{children}</div>
    </section>
  );
}

export default function Aviso() {
  return (
    <Panel titulo="Entrega 1">
      <p>Fecha límite: viernes.</p>
      <p>Se entrega en grupos de dos.</p>
    </Panel>
  );
}`}
            />
          }
        >
          <p>
            Escribí un componente <code>Panel</code> que reciba una prop{" "}
            <code>titulo</code> y la prop <code>children</code>. Que muestre el
            título arriba y el contenido abajo. Usalo para envolver dos
            párrafos, sin tocar nada del <code>Panel</code>.
          </p>
        </Desafio>
      </Seccion>
    </Leccion>
  );
}
