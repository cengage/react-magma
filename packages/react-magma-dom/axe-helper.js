import { configureAxe } from 'jest-axe';

export const axe = configureAxe({
  rules: {
    // disabled landmark rules when testing isolated components.
    region: { enabled: false },
    // disabled nested-interactive when testing isolated components
    'nested-interactive': { enabled: false },
  },
});
