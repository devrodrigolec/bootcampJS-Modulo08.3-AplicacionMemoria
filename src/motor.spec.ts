import "vitest";
import {
  asignarIndiceCartasVolteadasAlTablero,
  aumentarNumeroIntentos,
  esPartidaCompleta,
  gestionarEstadoPartida,
  sePuedeVoltearCarta,
  vaciarIndiceCartasTablero,
} from "./motor";

import { EstadoPartida, tablero } from "./model";

describe("aumentarNumeroIntentos", () => {
  it("debe devolver 1", () => {
    //arrange
    const numeroEsperado: number = 1;

    //act
    aumentarNumeroIntentos();
    const numeroRecibido = tablero.numeroIntentos;
    //assert
    expect(numeroRecibido).toBe(numeroEsperado);
  });
});

describe("sePuedeVoltearCarta", () => {
  it("Debe devolver true", () => {
    //Arrange
    const indice: number = 1;
    const resultadoEsperado: boolean = true;
    tablero.cartas[indice - 1].estaVuelta = false;
    tablero.cartas[indice - 1].encontrada = false;
    //Act
    const resultado = sePuedeVoltearCarta(tablero, indice);
    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });

  it("Debe devolver false", () => {
    //Arrange
    const indice: number = 8;
    const resultadoEsperado: boolean = false;
    tablero.cartas[indice - 1].estaVuelta = true;
    tablero.cartas[indice - 1].encontrada = true;
    //Act
    const resultado = sePuedeVoltearCarta(tablero, indice);
    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });
});

describe("asignarIndiceCartasVolteadasAlTablero", () => {
  it("Debe devolver tablero.indiceCartaVolteadaA = 1, tablero.indiceCartaVolteadaB = undefined ", () => {
    //Arrange
    const resultadoEsperado = 1;
    //Act
    asignarIndiceCartasVolteadasAlTablero(tablero, 1);
    const resultadoA = tablero.indiceCartaVolteadaA;
    const resultadoB = tablero.indiceCartaVolteadaB;
    //Assert
    expect(resultadoA).toBe(resultadoEsperado);
    expect(resultadoB).toBe(undefined);
  });
  it("Debe devolver tablero.indiceCartaVolteadaA = 1, tablero.indiceCartaVolteadaB = 3 ", () => {
    //Arrange
    const resultadoEsperadoA = 1;
    const resultadoEsperadoB = 3;
    //Act
    asignarIndiceCartasVolteadasAlTablero(tablero, 1);
    asignarIndiceCartasVolteadasAlTablero(tablero, 3);
    const resultadoA = tablero.indiceCartaVolteadaA;
    const resultadoB = tablero.indiceCartaVolteadaB;
    //Assert
    expect(resultadoA).toBe(resultadoEsperadoA);
    expect(resultadoB).toBe(resultadoEsperadoB);
  });
});

describe("gestionarEstadoPartida", () => {
  it("Debe de devolver UnaCartaLevantada", () => {
    //Arrange
    vaciarIndiceCartasTablero(tablero);
    tablero.indiceCartaVolteadaA = 2;
    const resultadoEsperado: EstadoPartida = "UnaCartaLevantada";
    //Act
    gestionarEstadoPartida(tablero);
    const resultado: EstadoPartida = tablero.estadoPartida;
    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });

  it("Debe de devolver DosCartasLevantadas", () => {
    //Arrange
    tablero.indiceCartaVolteadaA = 2;
    tablero.indiceCartaVolteadaB = 3;
    const resultadoEsperado: EstadoPartida = "DosCartasLevantadas";
    //Act
    gestionarEstadoPartida(tablero);
    const resultado: EstadoPartida = tablero.estadoPartida;
    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });
});

describe("esPartidaCompleta", () => {
  it("Debe devolver true", () => {
    //Arrange
    tablero.cartas.forEach((carta) => {
      carta.encontrada = true;
    });
    const resultadoEsperado: boolean = true;
    //Act
    const resultado: boolean = esPartidaCompleta(tablero);
    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });

  it("Debe devolver false", () => {
    //Arrange
    tablero.cartas.forEach((carta) => {
      carta.encontrada = false;
    });
    tablero.cartas[1].encontrada = true;
    const resultadoEsperado: boolean = false;
    //Act
    const resultado = esPartidaCompleta(tablero);
    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });
});
