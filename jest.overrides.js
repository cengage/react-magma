// Force all console.error and console.warnings to fail the test
let { error, warning } = console;

console.error = function (message) {
  error.apply(console, arguments); // keep default behaviour
  throw message instanceof Error ? message : new Error(message);
};

console.warning = function (message) {
  warning.apply(console, arguments); // keep default behaviour
  throw message instanceof Error ? message : new Error(message);
};
