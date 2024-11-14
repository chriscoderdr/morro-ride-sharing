"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTimeout = void 0;
const withTimeout = (promise, ms) => {
  return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))]);
};
exports.withTimeout = withTimeout;
//# sourceMappingURL=index.js.map