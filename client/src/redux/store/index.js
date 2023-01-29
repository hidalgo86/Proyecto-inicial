"use strict";

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer";
import thunk from "redux-thunk";

//Intalar extencion de redux.
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Objeto que mantiene el arbol de estado de la aplicacion
const store = createStore(
  rootReducer, // recibe una accion como argumento y retorna un objeto con el estado
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
