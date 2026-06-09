import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { FormFieldContainer } from '.';

const TEXT = 'Test Text';
const testId = 'test-id';
const labelText = 'test label';

describe('FormFieldContainer', () => {
  it('Should render the form field container component', () => {
    const { getByText } = render(
      <FormFieldContainer>{TEXT}</FormFieldContainer>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('Should render the form field container component with child component', () => {
    const { getByLabelText } = render(
      <FormFieldContainer fieldId="input" labelText={TEXT}>
        <input id="input" />
      </FormFieldContainer>
    );

    expect(getByLabelText(TEXT)).toBeInTheDocument();
  });

  it('Should render the form field label as a span when not actionable', () => {
    const { queryByLabelText, getByText } = render(
      <FormFieldContainer actionable={false} fieldId="input" labelText={TEXT}>
        <input id="input" />
      </FormFieldContainer>
    );

    expect(queryByLabelText(TEXT)).not.toBeInTheDocument();
    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('Should find element by testId', () => {
    const { getByTestId } = render(
      <FormFieldContainer testId={testId}>{TEXT}</FormFieldContainer>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Should render an error message', () => {
    const errorMsg = 'Test error message';
    const { getAllByText } = render(
      <FormFieldContainer errorMessage={errorMsg}>{TEXT}</FormFieldContainer>
    );

    expect(getAllByText(errorMsg)[0]).toBeInTheDocument();
  });

  it('Should render a helper message', () => {
    const helperMsg = 'Test helper message';
    const { getAllByText } = render(
      <FormFieldContainer helperMessage={helperMsg}>{TEXT}</FormFieldContainer>
    );

    expect(getAllByText(helperMsg)[0]).toBeInTheDocument();
  });

  it('Should render a large label when input size is large', () => {
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

  it('Should have custom styles', () => {
    const helperMsg = 'Test helper message';

    const { getByText, getAllByText, getByTestId } = render(
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
    expect(getAllByText(helperMsg)[0].parentElement).toHaveStyle(
      'color: purple'
    );
  });

  it('Should have a defined width for labels when labelPosition is "left"', () => {
    const { getByText } = render(
      <FormFieldContainer
        labelPosition="left"
        labelText={labelText}
        labelWidth={20}
      >
        {TEXT}
      </FormFieldContainer>
    );
    expect(getByText(labelText)).toHaveStyle('flex-basis: 20%');
  });

  it('Should render the label with an id based on fieldId', () => {
    const { getByText } = render(
      <FormFieldContainer fieldId="my-field" labelText={labelText}>
        {TEXT}
      </FormFieldContainer>
    );

    const label = getByText(labelText);
    expect(label).toHaveAttribute('id', 'my-field__label');
  });

  it('Should render the error message with an id based on fieldId', () => {
    const errorMsg = 'Test error';
    const { container } = render(
      <FormFieldContainer fieldId="my-field" errorMessage={errorMsg}>
        {TEXT}
      </FormFieldContainer>
    );

    const messageEl = document.getElementById('my-field__desc');
    expect(messageEl).toBeInTheDocument();
    expect(messageEl).toHaveTextContent(errorMsg);
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
