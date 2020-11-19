/* eslint-disable no-console */
import '@testing-library/jest-dom/extend-expect';

// this is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9: https://github.com/facebook/react/pull/14853
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      /It looks like you're using a version of react-dom that supports the "act" function/.test(
        args[0]
      ) ||
      /Rendering components directly into document.body is discouraged/.test(
        args[0]
      )
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
