global.IS_REACT_ACT_ENVIRONMENT = true;

HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  font: '',
  measureText: jest.fn(() => ({ width: 0 })),
}));

const { createSerializer, matchers } = require('@emotion/jest');
const testingLibraryJestDom = require('@testing-library/jest-dom');
const reactTestingLibrary = require('@testing-library/react');

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);
expect.extend(testingLibraryJestDom);
