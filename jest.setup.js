global.IS_REACT_ACT_ENVIRONMENT = true;

const { createSerializer, matchers } = require('@emotion/jest');
const testingLibraryJestDom = require('@testing-library/jest-dom');
const reactTestingLibrary = require('@testing-library/react');

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);
expect.extend(testingLibraryJestDom);
