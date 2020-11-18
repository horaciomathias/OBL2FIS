const { timeStamp } = require("console");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const functions = require("./index");

test("Validación nombre", () => {
  expect(functions.validateForm());
});
