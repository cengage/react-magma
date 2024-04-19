const emotion = require('@emotion/core');
const { createSerializer, matchers } = require('jest-emotion');

expect.addSnapshotSerializer(createSerializer(emotion));
expect.extend(matchers);
