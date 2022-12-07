import { ToastsContainer } from './ToastsContainer';
import { render } from '@testing-library/react';

describe('Toasts Container', () => {
  it('should render a toast container', () => {
    const testId = 'test';
    const { getByTestId } = render(<ToastsContainer testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
