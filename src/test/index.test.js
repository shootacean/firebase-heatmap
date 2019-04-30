import { echo } from "../index";

test('echo hello', () => {
  expect(echo('hello')).toBe('hello');
});
