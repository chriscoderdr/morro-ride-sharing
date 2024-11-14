"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
//# sourceMappingURL=debounce.js.map