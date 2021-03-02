import React from 'react';
import { axe } from 'jest-axe';
import { AppBar } from '.';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('AppBar', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <AppBar testId={testId}>Test AppBar</AppBar>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the app bar with compact padding', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <AppBar testId={testId} isCompact>
        Test AppBar
      </AppBar>
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'padding',
      magma.spaceScale.spacing05
    );
  });

  it('should render the app bar with inverse styles', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <AppBar testId={testId} isInverse>
        Test AppBar
      </AppBar>
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'background',
      magma.colors.foundation02
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'color',
      magma.colors.neutral08
    );
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<AppBar>test text</AppBar>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
