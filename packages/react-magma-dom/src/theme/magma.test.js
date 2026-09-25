import { magma } from './magma';

describe('magma theme', () => {
  it.each([
    ['primary', magma.colors.brand.navy],
    ['secondary', magma.colors.brand.sunriseOrange],
    ['tertiary', magma.colors.cyan700],
    ['info', magma.colors.blue600],
    ['danger', magma.colors.red600],
    ['warning', magma.colors.yellow700],
    ['success', magma.colors.green600],
    ['focusInverse', magma.colors.blue400],
  ])('maps the %s semantic color to its palette token', (color, token) => {
    expect(magma.colors[color]).toBe(token);
  });

  it('uses the default inverse surface color for the AppBar', () => {
    expect(magma.appBar.inverse.backgroundColor).toBe(magma.colors.neutral1100);
  });
});
