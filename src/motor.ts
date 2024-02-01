import _ from "underscore";
import { Carta, Tablero, tablero } from "./model";
import {
  mandarMensajeAJugador,
  mostrarImagenDeCarta,
  mostrarIntentos,
  ocultarImageCarta,
} from "./ui";

export const aumentarNumeroIntentos = () => {
  tablero.numeroIntentos++;
};

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  const cartasBarajadas = _.shuffle(cartas);
  return cartasBarajadas;
};

export const iniciarPartida = (tablero: Tablero): void => {
  const cartasBarajadas = barajarCartas(tablero.cartas);
  tablero.cartas = [...cartasBarajadas];
  tablero.estadoPartida = "CeroCartasLevantadas";
  console.log(tablero.cartas);
};

export const obtenerIndiceDiv = (cartaDiv: HTMLDivElement): number => {
  const indiceCartaDiv: number = parseInt(cartaDiv.id.slice(6));
  return indiceCartaDiv;
};

export const sePuedeVoltearCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  const estaVolteada: boolean = tablero.cartas[indice - 1].estaVuelta;
  const encontrada: boolean = tablero.cartas[indice - 1].encontrada;

  return !estaVolteada && !encontrada ? true : false;
};

export const voltearCarta = (
  cartaDiv: HTMLDivElement,
  tablero: Tablero,
  indice: number
): void => {
  tablero.cartas[indice - 1].estaVuelta = true;
  mostrarImagenDeCarta(cartaDiv, tablero, indice);
};

export const asignarIndiceCartasVolteadasAlTablero = (
  tablero: Tablero,
  indice: number
): void => {
  if (tablero.indiceCartaVolteadaA) {
    tablero.indiceCartaVolteadaB = indice;
  } else {
    tablero.indiceCartaVolteadaA = indice;
  }
};

const vaciarIndiceCartasTablero = (tablero: Tablero) => {
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

export const gestionarEstadoPartida = (tablero: Tablero) => {
  if (tablero.indiceCartaVolteadaA) {
    tablero.estadoPartida = "UnaCartaLevantada";
  }
  if (tablero.indiceCartaVolteadaA && tablero.indiceCartaVolteadaB) {
    tablero.estadoPartida = "DosCartasLevantadas";
  }
};

const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  tablero.cartas[indiceA - 1].encontrada = true;
  tablero.cartas[indiceB - 1].encontrada = true;
  tablero.estadoPartida = "CeroCartasLevantadas";
  vaciarIndiceCartasTablero(tablero);
  mandarMensajeAJugador('¡Muy bien! ¡Pareja encontrada!')
};

const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  vaciarIndiceCartasTablero(tablero);
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.cartas[indiceA - 1].estaVuelta = false;
  tablero.cartas[indiceB - 1].estaVuelta = false;
  setTimeout(() => {
    ocultarImageCarta(indiceA);
    ocultarImageCarta(indiceB);
  }, 1000);
};

export const sonPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  const idFotoCartaA = tablero.cartas[indiceA - 1].idFoto;
  const idFotoCartaB = tablero.cartas[indiceB - 1].idFoto;

  if (idFotoCartaA === idFotoCartaB) {
    parejaEncontrada(tablero, indiceA, indiceB);
  } else {
    parejaNoEncontrada(tablero, indiceA, indiceB);
  }
};

export const esPartidaCompleta = (tablero: Tablero) => {
  if (tablero.cartas.every((carta) => carta.encontrada)) {
    tablero.estadoPartida = "PartidaCompleta";
    mandarMensajeAJugador("¡Enhorabuena! ¡has ganado!");
    return true;
  } else {
    return false;
  }
};

export const reiniciarPartida = (tablero: Tablero): void => {
  mandarMensajeAJugador("¡Aquí vamos de nuevo!");
  for (let indice = 0; indice <= 12; indice++) {
    const cartaDiv = document.getElementById(`carta-${indice}`);

    if (cartaDiv && cartaDiv instanceof HTMLDivElement) {
      ocultarImageCarta(indice);
    }
  }

  tablero.cartas.forEach((carta) => {
    carta.encontrada = false;
    carta.estaVuelta = false;
  });
  tablero.estadoPartida = "PartidaNoIniciada";
  tablero.numeroIntentos = 0;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  mostrarIntentos(tablero.numeroIntentos);
};
