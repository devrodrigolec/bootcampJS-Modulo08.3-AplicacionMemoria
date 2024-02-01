import { Tablero } from "./model";
import {
  asignarIndiceCartasVolteadasAlTablero,
  aumentarNumeroIntentos,
  esPartidaCompleta,
  gestionarEstadoPartida,
  obtenerIndiceDiv,
  sePuedeVoltearCarta,
  sonPareja,
  voltearCarta,
} from "./motor";

export const mostrarIntentos = (numeroIntentos: number) => {
  const intentosDiv = document.getElementById("intentosDiv");
  if (intentosDiv && intentosDiv instanceof HTMLDivElement) {
    intentosDiv.innerHTML = `Intentos: ${numeroIntentos}`;
  }
  if (numeroIntentos > 4) {
    mandarMensajeAJugador("No está fácil, ¿verdad? ");
  }
  if (numeroIntentos > 9) {
    mandarMensajeAJugador("Mmmm... ¿seguro quieres seguir?");
  }
  if (numeroIntentos > 14) {
    mandarMensajeAJugador("Te estás tardandooo...");
  }
  if (numeroIntentos > 19) {
    mandarMensajeAJugador("Un niño tardaría menos...");
  }
  if (numeroIntentos > 25) {
    mandarMensajeAJugador("Creo que no diré nada más...");
  }
};

export const mostrarImagenDeCarta = (
  cartaDiv: HTMLDivElement,
  tablero: Tablero,
  indice: number
) => {
  cartaDiv.classList.remove("slit-in-vertical", "carta-cerrada");

  setTimeout(() => {
    cartaDiv.classList.add("carta-abierta", "slit-in-vertical");

    const imgCarta = document.getElementById(`imgCarta-${indice}`);
    if (imgCarta && imgCarta instanceof HTMLImageElement) {
      imgCarta.src = tablero.cartas[indice - 1].imagen;
    }
  }, 150);
};

export const ocultarImageCarta = (indice: number): void => {
  const cartaDiv = document.getElementById(`carta-${indice}`);
  const imgCarta = document.getElementById(`imgCarta-${indice}`);
  if (cartaDiv && cartaDiv instanceof HTMLDivElement) {
    cartaDiv.classList.remove("carta-abierta", "slit-in-vertical");
    cartaDiv.classList.add("carta-cerrada");
    setTimeout(() => {
      cartaDiv.classList.add("slit-in-vertical");
      if (imgCarta && imgCarta instanceof HTMLImageElement) {
        imgCarta.src = "";
      }
    }, 150);
  }
};

export const mandarMensajeAJugador = (texto: string): void => {
  const mensajeJugadorDiv = document.getElementById("mensajeJugador");
  if (mensajeJugadorDiv && mensajeJugadorDiv instanceof HTMLDivElement) {
    mensajeJugadorDiv.textContent = texto;
  }
};

export const gestionarJuego = (tablero: Tablero) => {
  if (tablero.estadoPartida !== "PartidaNoIniciada") {
    for (let indiceDiv = 1; indiceDiv <= 12; indiceDiv++) {
      const cartaDelJuego = document.getElementById(`carta-${indiceDiv}`);

      if (cartaDelJuego && cartaDelJuego instanceof HTMLDivElement) {
        cartaDelJuego.addEventListener("click", () => {
          const indiceCartaDiv = obtenerIndiceDiv(cartaDelJuego);
          const sePuedeVoltearCartaDelJuego = sePuedeVoltearCarta(
            tablero,
            indiceCartaDiv
          );

          if (sePuedeVoltearCartaDelJuego) {
            voltearCarta(cartaDelJuego, tablero, indiceCartaDiv);
            asignarIndiceCartasVolteadasAlTablero(tablero, indiceCartaDiv);
            gestionarEstadoPartida(tablero);
          }
          if (!sePuedeVoltearCartaDelJuego) {
            mandarMensajeAJugador(
              "¡Presta más atención! ¡Esa carta ya la has volteado!"
            );
          }

          if (
            tablero.estadoPartida === "DosCartasLevantadas" &&
            tablero.indiceCartaVolteadaA &&
            tablero.indiceCartaVolteadaB
          ) {
            aumentarNumeroIntentos();
            mostrarIntentos(tablero.numeroIntentos);
            sonPareja(
              tablero,
              tablero.indiceCartaVolteadaA,
              tablero.indiceCartaVolteadaB
            );
          }

          esPartidaCompleta(tablero);
        });
      }
    }
  }
};
