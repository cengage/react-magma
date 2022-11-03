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

  it('should render a default border', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <NativeSelect testId={testId}></NativeSelect>
    );

    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      `1px solid ${magma.colors.neutral500}`
    );
  });

  it('should render a default inverse border', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <NativeSelect isInverse testId={testId}></NativeSelect>
    );

    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      `1px solid ${transparentize(0.5, magma.colors.neutral100)}`
    );
  });

  it('should render an error state', () => {
    const testId = 'test-id';
    const errorMessage = 'This is an error';
    const { getByTestId, getByText } = render(
      <NativeSelect errorMessage={errorMessage} testId={testId}></NativeSelect>
    );

    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      `1px solid ${magma.colors.danger}`
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('should render an inverse error state', () => {
    const testId = 'test-id';
    const errorMessage = 'This is an error';
    const { getByTestId, getByText } = render(
      <NativeSelect
        errorMessage={errorMessage}
        isInverse
        testId={testId}
      ></NativeSelect>
    );

    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      `1px solid ${magma.colors.danger200}`
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
