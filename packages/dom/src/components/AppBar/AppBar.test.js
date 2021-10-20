import React from 'react';
import { axe } from '../../../axe-helper';
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

  it('should render the app bar with standard styles', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <AppBar testId={testId}>Test AppBar</AppBar>
    );

    const appBar = getByTestId(testId);

    expect(appBar).toHaveStyleRule('padding', 'var(--appBar-padding)');
    expect(appBar).toHaveStyleRule('height', 'var(--appBar-height)');
    expect(appBar).toHaveStyleRule(
      'background',
      'var(--appBar-backgroundColor)'
    );
    expect(appBar).toHaveStyleRule('color', 'var(--appBar-textColor)');
  });

  it('should render the app bar with compact styles', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <AppBar testId={testId} isCompact>
        Test AppBar
      </AppBar>
    );

    const appBar = getByTestId(testId);

    expect(appBar).toHaveStyleRule('padding', 'var(--appBar-compact-padding)');
    expect(appBar).toHaveStyleRule('height', 'var(--appBar-compact-height)');
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
      'var(--appBar-inverse-backgroundColor)'
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'color',
      'var(--appBar-inverse-textColor)'
    );
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<AppBar>test text</AppBar>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
