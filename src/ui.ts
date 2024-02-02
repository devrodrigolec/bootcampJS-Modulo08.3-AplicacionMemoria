import { EstadoBoton, Tablero } from "./model";
import {
  asignarIndiceCartasVolteadasAlTablero,
  aumentarNumeroIntentos,
  esPartidaCompleta,
  gestionarEstadoPartida,
  gestionarPartidaCompleta,
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
  gestionarMensajesJugadorPorIntentos(numeroIntentos);
};

const gestionarMensajesJugadorPorIntentos = (numeroIntentos: number): void => {
  let mensaje: string = "";
  switch (numeroIntentos) {
    case 5:
      mensaje = "No está fácil, ¿verdad? ";
      break;
    case 10:
      mensaje = "Mmmm... ¿seguro quieres seguir?";
      break;
    case 15:
      mensaje = "Te estás tardandooo...";
      break;
    case 20:
      mensaje = "Un niño tardaría menos...";
      break;
    case 25:
      mensaje = "Creo que no diré nada más...";
      break;
  }
  if (mensaje !== "") {
    mandarMensajeAJugador(mensaje);
  }
};

export const mostrarImagenDeCarta = (
  cartaDiv: HTMLDivElement,
  tablero: Tablero,
  indice: number
) => {
  cartaDiv.classList.remove("slit-in-vertical", "contenedor__carta-cerrada");
  setTimeout(() => {
    cartaDiv.classList.add("contenedor__carta-abierta", "slit-in-vertical");
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
    cartaDiv.classList.remove("contenedor__carta-abierta", "slit-in-vertical");
    cartaDiv.classList.add("contenedor__carta-cerrada");
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

export const gestionarEstadoBoton = (
  boton: HTMLButtonElement,
  estado: EstadoBoton
): void => {
  if (estado === "ACTIVAR") {
    boton.disabled = false;
  } else {
    boton.disabled = true;
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
          if(esPartidaCompleta(tablero)) {
            gestionarPartidaCompleta(tablero)
          }
        });
      }
    }
  }
};
