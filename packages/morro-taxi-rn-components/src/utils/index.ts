import { debounce } from './debounce';

const withTimeout = (promise: any, ms: any) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    ),
  ]);
};

export { withTimeout, debounce };
export default { withTimeout, debounce };
