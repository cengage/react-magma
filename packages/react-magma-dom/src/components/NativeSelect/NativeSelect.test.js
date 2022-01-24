import React from 'react';
import { axe } from '../../../axe-helper';
import { NativeSelect } from '.';
import { render } from '@testing-library/react';

describe('NativeSelect', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <NativeSelect testId={testId}></NativeSelect>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should show an error message', () => {
    const labelText = 'Label';
    const errorMessage = 'This is an error';
    const { getByText } = render(
      <NativeSelect labelText={labelText} errorMessage={errorMessage} />
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
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
});
