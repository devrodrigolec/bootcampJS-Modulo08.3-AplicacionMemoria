import { iniciarPartida, reiniciarPartida } from "./motor";
import { tablero } from "./model";
import { gestionarEstadoBoton, gestionarJuego, mandarMensajeAJugador, mostrarIntentos } from "./ui";

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
        gestionarEstadoBoton(iniciarPartidaBoton, 'DESACTIVAR')
        mandarMensajeAJugador("¡Buena suerte!");
        gestionarJuego(tablero);
        if (
          reiniciarPartidaBoton &&
          reiniciarPartidaBoton instanceof HTMLButtonElement
        ) {
          gestionarEstadoBoton(reiniciarPartidaBoton, 'ACTIVAR');
        }
      }
    });
  }
  if (
    reiniciarPartidaBoton &&
    reiniciarPartidaBoton instanceof HTMLButtonElement
  ) {
    gestionarEstadoBoton(reiniciarPartidaBoton, 'DESACTIVAR');
    reiniciarPartidaBoton.addEventListener("click", () => {
      reiniciarPartida(tablero);      
    });
  }
});
