import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { AppBar } from '.';

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

    expect(appBar).toHaveStyleRule('padding', magma.appBar.padding);
    expect(appBar).toHaveStyleRule('height', magma.appBar.height);
    expect(appBar).toHaveStyleRule('background', magma.appBar.backgroundColor);
    expect(appBar).toHaveStyleRule('color', magma.appBar.textColor);
  });

  it('should render the app bar with compact styles', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <AppBar testId={testId} isCompact>
        Test AppBar
      </AppBar>
    );

    const appBar = getByTestId(testId);

    expect(appBar).toHaveStyleRule('padding', magma.appBar.compact.padding);
    expect(appBar).toHaveStyleRule('height', magma.appBar.compact.height);
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
      magma.appBar.inverse.backgroundColor
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'color',
      magma.appBar.inverse.textColor
    );
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<AppBar>test text</AppBar>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
