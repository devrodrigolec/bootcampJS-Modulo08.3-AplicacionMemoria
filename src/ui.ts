import { EstadoBoton, Tablero } from "./model";
import {
  asignarIndiceCartasVolteadasAlTablero,
  aumentarNumeroIntentos,
  esPartidaCompleta,
  gestionarEstadoPartida,
  gestionarPartidaCompleta,
  iniciarPartida,
  obtenerIndiceDiv,
  reiniciarPartida,
  sePuedeVoltearCarta,
  sonPareja,
  vaciarIndiceCartasTablero,
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

const gestionarSonPareja = (resultadoSonPareja: boolean, tablero: Tablero) => {
  if (resultadoSonPareja) {
    mandarMensajeAJugador("¡Muy bien! ¡Pareja encontrada!");
  } else {
    const indiceA = tablero.indiceCartaVolteadaA;
    const indiceB = tablero.indiceCartaVolteadaB;

    vaciarIndiceCartasTablero(tablero);
    setTimeout(() => {
      if (indiceA && indiceB) {
        ocultarImageCarta(indiceA);
        ocultarImageCarta(indiceB);
      }
    }, 1000);
  }
};

export const gestionarIniciarPartida = (tablero: Tablero): void => {
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
        gestionarEstadoBoton(iniciarPartidaBoton, "DESACTIVAR");
        mandarMensajeAJugador("¡Buena suerte!");
        gestionarJuego(tablero);
        if (
          reiniciarPartidaBoton &&
          reiniciarPartidaBoton instanceof HTMLButtonElement
        ) {
          gestionarEstadoBoton(reiniciarPartidaBoton, "ACTIVAR");
        }
      }
    });
  }
};

export const gestionarReiniciarPartida = (tablero: Tablero): void => {
  const reiniciarPartidaBoton = document.getElementById(
    "reiniciar-partida-boton"
  );
  if (
    reiniciarPartidaBoton &&
    reiniciarPartidaBoton instanceof HTMLButtonElement
  ) {
    gestionarEstadoBoton(reiniciarPartidaBoton, "DESACTIVAR");
    reiniciarPartidaBoton.addEventListener("click", () => {
      reiniciarPartida(tablero);
      mostrarIntentos(tablero.numeroIntentos);
      mandarMensajeAJugador("¡Aquí vamos de nuevo!");
      for (let indice = 0; indice <= 12; indice++) {
        const cartaDiv = document.getElementById(`carta-${indice}`);

        if (cartaDiv && cartaDiv instanceof HTMLDivElement) {
          ocultarImageCarta(indice);
        }
      }
    });
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
            voltearCarta(tablero, indiceCartaDiv);
            mostrarImagenDeCarta(cartaDelJuego, tablero, indiceCartaDiv);
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
            const resultadoSonPareja = sonPareja(
              tablero,
              tablero.indiceCartaVolteadaA,
              tablero.indiceCartaVolteadaB
            );

            gestionarSonPareja(resultadoSonPareja, tablero);
          }
          if (esPartidaCompleta(tablero)) {
            gestionarPartidaCompleta(tablero);
            mandarMensajeAJugador("¡Enhorabuena! ¡has ganado!");
          }
        });
      }
    }
  }
};
