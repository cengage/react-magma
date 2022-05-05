import React from 'react';
import { axe } from '../../../axe-helper';
import { Textarea } from '.';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('Textarea', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Textarea testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a textarea with desired attributes', () => {
    const testId = 'test-id';
    const id = 'abc123';
    const placeholder = 'holding a place';
    const value = 'abcdefg';
    const { getByTestId } = render(
      <Textarea
        testId={testId}
        id={id}
        placeholder={placeholder}
        value={value}
      />
    );
    const textarea = getByTestId(testId);

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', id);
    expect(textarea).toHaveAttribute('placeholder', placeholder);
    expect(textarea).not.toHaveAttribute('required');
    expect(textarea).not.toHaveAttribute('autoFocus');
  });

  it('should trigger the passed in onChange when value of the textarea is changed', () => {
    const targetValue = 'Change';
    const onChangeSpy = jest.fn();
    const labelText = 'test label';
    const { getByLabelText } = render(
      <Textarea labelText={labelText} onChange={onChangeSpy} value="" />
    );

    fireEvent.change(getByLabelText(labelText), {
      target: { value: targetValue },
    });

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear the textarea when an empty string is passed', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Textarea value="hello" testId={testId} />);
    const textarea = getByTestId(testId);

    fireEvent.change(textarea, {target: {value: ''}})
    expect(textarea.value).toBe('');
  });

  it('should render a textarea with a correctly styled helper message', () => {
    const testMessage = 'Test message';
    const { getByTestId } = render(<Textarea helperMessage={testMessage} />);

    const helperMessage = getByTestId('inputMessage');

    expect(helperMessage).toHaveStyleRule('color', magma.colors.neutral03);
  });

  it('should render a textarea with a correctly styled error message', () => {
    const labelText = 'test label';
    const testHelperMessage = 'Test helper message';
    const testErrorMessage = 'Test error message';
    const { getByTestId, getByLabelText, queryByText } = render(
      <Textarea
        errorMessage={testErrorMessage}
        helperMessage={testHelperMessage}
        labelText={labelText}
      />
    );

    const errorMessage = getByTestId('inputMessage');

    expect(errorMessage).toBeInTheDocument();

    expect(getByLabelText(labelText)).toHaveStyleRule(
      'border-color',
      magma.colors.danger
    );

    expect(errorMessage).toHaveStyleRule('color', magma.colors.danger);

    const helperMessage = queryByText(testHelperMessage);

    expect(helperMessage).not.toBeInTheDocument();
  });

  it('should render the textarea with visually hidden label text', () => {
    const labelText = 'test label';
    const { getByText } = render(
      <Textarea labelText={labelText} isLabelVisuallyHidden />
    );

    expect(getByText(labelText)).toHaveStyleRule('height', '1px');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Textarea labelText="test label" />);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
