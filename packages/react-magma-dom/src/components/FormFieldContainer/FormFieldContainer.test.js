import React from 'react';
import { axe } from '../../../axe-helper';
import { FormFieldContainer } from '.';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';

const TEXT = 'Test Text';

describe('FormFieldContainer', () => {
  it('should render the form field container component', () => {
    const { getByText } = render(
      <FormFieldContainer>{TEXT}</FormFieldContainer>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should render the form field container component', () => {
    const { getByLabelText } = render(
      <FormFieldContainer fieldId="input" labelText={TEXT}>
        <input id="input" />
      </FormFieldContainer>
    );

    expect(getByLabelText(TEXT)).toBeInTheDocument();
  });

  it('should render the form field label as a span when not actionable', () => {
    const { queryByLabelText, getByText } = render(
      <FormFieldContainer actionable={false} fieldId="input" labelText={TEXT}>
        <input id="input" />
      </FormFieldContainer>
    );

    expect(queryByLabelText(TEXT)).not.toBeInTheDocument();
    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <FormFieldContainer testId={testId}>{TEXT}</FormFieldContainer>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render an error message', () => {
    const errorMsg = 'Test error message';
    const { getByText } = render(
      <FormFieldContainer errorMessage={errorMsg}>{TEXT}</FormFieldContainer>
    );

    expect(getByText(errorMsg)).toBeInTheDocument();
  });

  it('should render a helper message', () => {
    const helperMsg = 'Test helper message';
    const { getByText } = render(
      <FormFieldContainer helperMessage={helperMsg}>{TEXT}</FormFieldContainer>
    );

    expect(getByText(helperMsg)).toBeInTheDocument();
  });

  it('should a large label when input size is large', () => {
    const labelText = 'test label';
    const { getByText } = render(
      <FormFieldContainer labelText={labelText} inputSize="large">
        {TEXT}
      </FormFieldContainer>
    );

    expect(getByText(labelText)).toBeInTheDocument();
    expect(getByText(labelText)).toHaveStyleRule(
      'font-size',
      magma.typeScale.size03.fontSize
    );
  });

  it('should custom styles', () => {
    const helperMsg = 'Test helper message';
    const labelText = 'test label';
    const testId = 'test-id';

    const { getByText, getByTestId } = render(
      <FormFieldContainer
        containerStyle={{ border: '1px solid red' }}
        labelStyle={{ color: 'green' }}
        messageStyle={{ color: 'purple' }}
        labelText={labelText}
        helperMessage={helperMsg}
        testId={testId}
      >
        {TEXT}
      </FormFieldContainer>
    );

    expect(getByTestId(testId)).toHaveStyle('border: 1px solid red');
    expect(getByText(labelText)).toHaveStyle('color: green');
    expect(getByText(helperMsg).parentElement).toHaveStyle('color: purple');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <FormFieldContainer>{TEXT}</FormFieldContainer>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
