const emotion = require('@emotion/react');
const { createSerializer, matchers } = require('jest-emotion');

expect.addSnapshotSerializer(createSerializer(emotion));
expect.extend(matchers);
