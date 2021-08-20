import { createSerializer, matchers } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer())
expect.extend(matchers);
