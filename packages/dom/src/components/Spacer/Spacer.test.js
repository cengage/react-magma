import React from 'react';
import { axe } from '../../../axe-helper';
import { Spacer } from '.';
import { render } from '@testing-library/react';

describe('Spacer', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Spacer size={16} testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a spacer with a size as a number', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Spacer size={16} testId={testId} />);

    const spacer = getByTestId(testId);

    expect(spacer).toHaveStyleRule('height', '16px');
    expect(spacer).toHaveStyleRule('width', '16px');
  });

  it('should render a spacer with a size as a string', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Spacer size="16px" testId={testId} />);

    const spacer = getByTestId(testId);

    expect(spacer).toHaveStyleRule('height', '16px');
    expect(spacer).toHaveStyleRule('width', '16px');
  });

  it('should render a spacer with a horizontal axis', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Spacer axis="horizontal" size={16} testId={testId} />
    );

    const spacer = getByTestId(testId);

    expect(spacer).toHaveStyleRule('height', '1px');
    expect(spacer).toHaveStyleRule('width', '16px');
    expect(spacer).toHaveStyleRule('display', 'inline-block');
  });

  it('should render a spacer with a vertical axis', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Spacer axis="vertical" size={16} testId={testId} />
    );

    const spacer = getByTestId(testId);

    expect(spacer).toHaveStyleRule('height', '16px');
    expect(spacer).toHaveStyleRule('width', '1px');
    expect(spacer).toHaveStyleRule('display', 'block');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Spacer size={16} />);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
