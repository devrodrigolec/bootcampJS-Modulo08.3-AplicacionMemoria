import { iniciarPartida, reiniciarPartida } from "./motor";
import { tablero } from "./model";
import { gestionarJuego, mandarMensajeAJugador, mostrarIntentos } from "./ui";

document.addEventListener("DOMContentLoaded", () => {
  const iniciarPartidaBoton = document.getElementById("iniciar-partida-boton");
  const reiniciarPartidaBoton = document.getElementById(
    "reiniciar-partida-boton"
  );

  tablero.estadoPartida = "PartidaNoIniciada";
  mostrarIntentos(tablero.numeroIntentos);

  if (iniciarPartidaBoton && iniciarPartidaBoton instanceof HTMLButtonElement) {
    iniciarPartidaBoton.addEventListener("click", () => {
      if (tablero.estadoPartida === "PartidaNoIniciada") {
        iniciarPartida(tablero);
        iniciarPartidaBoton.disabled = true;
        mandarMensajeAJugador("¡Buena suerte!");
        gestionarJuego(tablero);
        if (
          reiniciarPartidaBoton &&
          reiniciarPartidaBoton instanceof HTMLButtonElement
        ) {
          reiniciarPartidaBoton.disabled = false;
        }
      }
    });
  }
  if (
    reiniciarPartidaBoton &&
    reiniciarPartidaBoton instanceof HTMLButtonElement
  ) {
    reiniciarPartidaBoton.disabled = true;
    reiniciarPartidaBoton.addEventListener("click", () => {
      reiniciarPartida(tablero);
      if (
        iniciarPartidaBoton &&
        iniciarPartidaBoton instanceof HTMLButtonElement
      ) {
        iniciarPartidaBoton.disabled = true;
      }
    });
  }
});
