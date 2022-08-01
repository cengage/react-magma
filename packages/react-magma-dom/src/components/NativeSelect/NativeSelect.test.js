import React from 'react';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { NativeSelect } from '.';
import { render } from '@testing-library/react';
import { transparentize } from 'polished';

describe('NativeSelect', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <NativeSelect testId={testId}></NativeSelect>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <NativeSelect labelText="Test">
        <option></option>
      </NativeSelect>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should render a disabled select', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <NativeSelect disabled testId={testId}></NativeSelect>
    );
    const nativeselect = getByTestId(testId);
    expect(nativeselect).toHaveStyleRule(
      'color',
      transparentize(0.4, magma.colors.neutral500)
    );
  });

  it('should render a disabled inverse select', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <NativeSelect disabled isInverse testId={testId}></NativeSelect>
    );
    const nativeselect = getByTestId(testId);
    expect(nativeselect).toHaveStyleRule(
      'color',
      transparentize(0.6, magma.colors.neutral100)
    );
  });

  it('should render an error state', () => {
    const testId = 'test-id';
    const { getByTestId, getByText } = render(
      <NativeSelect
        errorMessage="This is an error"
        testId={testId}
      ></NativeSelect>
    );

    const nativeselect = getByTestId(testId).parentElement;
    expect(nativeselect).toHaveStyleRule('border-color', magma.colors.danger);

    const errorMessage = 'This is an error';
    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('should render an inverse error state', () => {
    const testId = 'test-id';
    const { getByTestId, getByText } = render(
      <NativeSelect
        errorMessage="This is an error"
        isInverse
        testId={testId}
      ></NativeSelect>
    );

    const nativeselect = getByTestId(testId).parentElement;
    expect(nativeselect).toHaveStyleRule(
      'border-color',
      magma.colors.danger200
    );

    const errorMessage = 'This is an error';
    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
