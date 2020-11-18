const { timeStamp } = require("console");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const functions = require("./index");

test("Validación nombre", () => {
  expect(functions.validarString("")).toBe(false);
});

test("Validación nombre", () => {
  expect(functions.validarString(null)).toBe(false);
});
