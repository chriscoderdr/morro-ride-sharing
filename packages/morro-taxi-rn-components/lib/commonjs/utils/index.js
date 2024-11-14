"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "debounce", {
  enumerable: true,
  get: function () {
    return _debounce.debounce;
  }
});
exports.withTimeout = exports.default = void 0;
var _debounce = require("./debounce.js");
const withTimeout = (promise, ms) => {
  return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))]);
};
exports.withTimeout = withTimeout;
var _default = exports.default = {
  withTimeout,
  debounce: _debounce.debounce
};
//# sourceMappingURL=index.js.map