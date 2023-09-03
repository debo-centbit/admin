declare namespace jest {
  interface Matchers<R> {
    toHaveBackgroundColor(expected: string): R;
  }
}
