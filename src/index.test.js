const { classExpression } = require("@babel/types");
const { test, expect } = require("@jest/globals");
const { timeStamp } = require("console");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const functions = require("./index");

test("Validación string ", () => {
  expect(functions.validarString("")).toBe(false);
});

test("Validación string", () => {
  expect(functions.validarString(null)).toBe(false);
});

test("Validación string", () => {
  expect(functions.validarString("Horacio")).toBe(true);
});

/*
test("Validacion de archivo tablatura", () => {
  expect(functions.validateFileTab("")).toBe(false);
});
*/

/*VALIDAR ARCHIVO CANCION*/
