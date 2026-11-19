import React from 'react';

import { render } from '@testing-library/react';
import { renderToString } from 'react-dom/server.node';

import { TreeViewAnnouncer } from './TreeViewAnnouncer';
import * as deviceDetect from '../../hooks/useDeviceDetect';

jest.mock('../../hooks/useDeviceDetect');

it('starts with the same HTML on the server and Windows client', () => {
  const props = { branchIds: ['branch'], testId: 'tree-announce' };

  deviceDetect.default.mockReturnValue({ isMacOS: false, isWindows: false });
  const serverHTML = renderToString(<TreeViewAnnouncer {...props} />);

  deviceDetect.default.mockReturnValue({ isMacOS: false, isWindows: true });
  const windowsHTML = renderToString(<TreeViewAnnouncer {...props} />);

  expect(windowsHTML).toBe(serverHTML);

  const { getByTestId } = render(<TreeViewAnnouncer {...props} />);

  expect(getByTestId('tree-announce-branch')).toHaveTextContent('');
});

it('starts with empty regions for item IDs that match object properties', () => {
  deviceDetect.default.mockReturnValue({ isMacOS: false, isWindows: true });

  const { getByTestId } = render(
    <TreeViewAnnouncer
      branchIds={['__proto__', 'constructor']}
      testId="tree-announce"
    />
  );

  expect(getByTestId('tree-announce-__proto__')).toHaveTextContent('');
  expect(getByTestId('tree-announce-constructor')).toHaveTextContent('');
});
