import styled from '@emotion/styled/';

const emotion = require('@emotion/core');
const { createSerializer, matchers } = require('jest-emotion');

global._styled = styled;

expect.addSnapshotSerializer(createSerializer(emotion));
expect.extend(matchers);