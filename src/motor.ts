import _ from "underscore";
import { Carta, Tablero, tablero } from "./model";

export const aumentarNumeroIntentos = () => {
  tablero.numeroIntentos++;
};

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  const cartasBarajadas = _.shuffle(cartas);
  return cartasBarajadas;
};

export const iniciarPartida = (tablero: Tablero): void => {
  const cartasBarajadas = barajarCartas(tablero.cartas);
  tablero.cartas = structuredClone(cartasBarajadas);
  tablero.estadoPartida = "CeroCartasLevantadas";
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

export const voltearCarta = (tablero: Tablero, indice: number): void => {
  tablero.cartas[indice - 1].estaVuelta = true;
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

export const vaciarIndiceCartasTablero = (tablero: Tablero) => {
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
): void => {
  tablero.cartas[indiceA - 1].encontrada = true;
  tablero.cartas[indiceB - 1].encontrada = true;
  tablero.estadoPartida = "CeroCartasLevantadas";
  vaciarIndiceCartasTablero(tablero);
};

const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.cartas[indiceA - 1].estaVuelta = false;
  tablero.cartas[indiceB - 1].estaVuelta = false;
};

export const sonPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): boolean => {
  const idFotoCartaA = tablero.cartas[indiceA - 1].idFoto;
  const idFotoCartaB = tablero.cartas[indiceB - 1].idFoto;

  if (idFotoCartaA === idFotoCartaB) {
    parejaEncontrada(tablero, indiceA, indiceB);
    return true;
  } else {
    parejaNoEncontrada(tablero, indiceA, indiceB);
    return false;
  }
};

export const esPartidaCompleta = (tablero: Tablero) =>
  tablero.cartas.every((carta) => carta.encontrada);

export const gestionarPartidaCompleta = (tablero: Tablero) => {
  tablero.estadoPartida = "PartidaCompleta";
};

export const reiniciarPartida = (tablero: Tablero): void => {
  tablero.cartas.forEach((carta) => {
    carta.encontrada = false;
    carta.estaVuelta = false;
  });
  const cartasBarajadas = barajarCartas(tablero.cartas);
  tablero.cartas = structuredClone(cartasBarajadas);
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.numeroIntentos = 0;
  vaciarIndiceCartasTablero(tablero);
};
