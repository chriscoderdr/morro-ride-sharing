import TestComponent from "./components/test-component";

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export { TestComponent };
