const { createSerializer, matchers } = require('@emotion/jest');

expect.addSnapshotSerializer(createSerializer())
expect.extend(matchers);
