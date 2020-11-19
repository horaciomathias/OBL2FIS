const { classExpression } = require("@babel/types");
const { test, expect } = require("@jest/globals");
const { timeStamp } = require("console");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const functions = require("./index");

test("Validación string vacio", () => {
  expect(functions.validarString("")).toBe(false);
});

test("Validación string nulo", () => {
  expect(functions.validarString(null)).toBe(false);
});

test("Validación string valido", () => {
  expect(functions.validarString("un String cualquiera")).toBe(true);
});

test("Validación de extensión de imagen tablatura aceptable", () => {
  expect(functions.validateFileTab("miImagen.png")).toBe(true);
});

test("Validación de extensión de imagen tablatura aceptable", () => {
  expect(functions.validateFileTab("miImagen.jpg")).toBe(true);
});
/*
test("Validación de extensión de imagen tablatura no aceptable", () => {
  expect(functions.validateFileTab("miImagen.pdf")).toBe(false);
});*/

test("Validación de extensión de audio cancion aceptable", () => {
  expect(functions.validateFileSong("miAudio.mp3")).toBe(true);
});

test("Validación de extensión de audio cancion aceptable", () => {
  expect(functions.validateFileSong("miAudio.m4a")).toBe(true);
});

/*
test("Validación de extensión de audio cancion no aceptable", () => {
  expect(functions.validateFileSong("miAudio.wav")).toBe(false);
});
*/

test("Agregar Clase parámetros válidos", () => {
  expect(
    functions.agregarClase(
      "unaTab",
      "unaCancion",
      "unNombreAutor",
      "unNombreCancion"
    )
  ).toBe(true);
});

/*VALIDAR ARCHIVO CANCION*/
