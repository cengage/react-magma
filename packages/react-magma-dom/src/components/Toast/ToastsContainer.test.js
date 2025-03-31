import React from 'react';

import { render } from '@testing-library/react';

import { ToastsContainer } from './ToastsContainer';

describe('Toasts Container', () => {
  it('should render a toast container', () => {
    const testId = 'test';
    const { getByTestId } = render(<ToastsContainer testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
