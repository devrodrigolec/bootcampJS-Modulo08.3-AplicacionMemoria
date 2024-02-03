import { tablero } from "./model";
import { gestionarIniciarPartida, gestionarReiniciarPartida } from "./ui";

document.addEventListener("DOMContentLoaded", () => {
  gestionarIniciarPartida(tablero);
  gestionarReiniciarPartida(tablero);
  
});
