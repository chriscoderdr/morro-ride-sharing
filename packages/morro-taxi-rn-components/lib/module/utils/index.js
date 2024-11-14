"use strict";

const withTimeout = (promise, ms) => {
  return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))]);
};
export { withTimeout };
//# sourceMappingURL=index.js.map