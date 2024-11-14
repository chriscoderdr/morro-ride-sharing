"use strict";

import { debounce } from "./debounce.js";
const withTimeout = (promise, ms) => {
  return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))]);
};
export { withTimeout, debounce };
export default {
  withTimeout,
  debounce
};
//# sourceMappingURL=index.js.map