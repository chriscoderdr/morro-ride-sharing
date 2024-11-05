import TestComponent from "./components/test-component";

import InputText from './components/input-text';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export { InputText, TestComponent };

