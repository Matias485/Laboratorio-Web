// ===========================================================================
// Un slice que no declara ninguna acción propia y escucha todas las demás.
//
// No es parte de la tienda: existe para que el demo final pueda mostrar en
// pantalla lo que se fue despachando, en orden. En una aplicación de verdad
// esto lo hacen las DevTools de Redux, que es justo lo que te vamos a pedir
// que instales al final de la lección.
// ===========================================================================

import { createSlice, nanoid } from "@reduxjs/toolkit";

const registroSlice = createSlice({
  name: "registro",
  initialState: [],
  reducers: {
    registroLimpiado: () => [],
  },
  extraReducers: (constructor) => {
    // addMatcher toma cualquier acción que cumpla la condición. Nos salteamos
    // las nuestras, para no registrar el acto de limpiar el registro, y las
    // internas de Redux, que empiezan con @@.
    constructor.addMatcher(
      (accion) =>
        !accion.type.startsWith("registro/") && !accion.type.startsWith("@@"),
      (estado, accion) => {
        estado.unshift({
          id: nanoid(),
          type: accion.type,
          payload: accion.payload,
        });
        if (estado.length > 40) estado.pop();
      },
    );
  },
});

export const { registroLimpiado } = registroSlice.actions;
export default registroSlice.reducer;
