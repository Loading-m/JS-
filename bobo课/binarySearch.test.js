const {add} = import('./binarySearch');

test('add test', () => {
  expect(add(4, 2)).toBe(6);
});
