import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { axe } from '../../../axe-helper';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';

import { Textarea } from '.';

const testId = 'test-id';

describe('Textarea', () => {
  it('should find element by testId', () => {
    const { getByTestId } = render(<Textarea testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a textarea with desired attributes', () => {
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

    fireEvent.change(textarea, { target: { value: '' } });
    expect(textarea.value).toBe('');
  });

  it('should render a textarea with a correctly styled helper message', () => {
    const testMessage = 'Test message';
    const { getByTestId } = render(<Textarea helperMessage={testMessage} />);

    const helperMessage = getByTestId('inputMessage');

    expect(helperMessage).toHaveStyleRule('color', magma.colors.neutral);
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

  describe('Character Counter', () => {
    const charactersAllowed = defaultI18n.characterCounter.charactersAllowed;
    const charactersLeft = defaultI18n.characterCounter.charactersLeft;

    it('Shows the label "characters allowed" equal to the maxCount if the user clears the textarea', () => {
      const { getByTestId, getByText } = render(
        <Textarea maxCount={4} testId={testId} />
      );
      const textarea = getByTestId(testId);

      fireEvent.change(textarea, { target: { value: 'dddd' } });
      expect(textarea.value).toBe('dddd');
      expect(getByText('0 ' + charactersLeft)).toBeInTheDocument();

      fireEvent.change(textarea, { target: { value: '' } });
      expect(textarea.value).toBe('');
      expect(getByText('4 ' + charactersAllowed)).toBeInTheDocument();
    });

    it('should render a textarea with an initial value set by the user', () => {
      const { getByText } = render(<Textarea maxCount={2} value="hi" />);
      expect(getByText('0 ' + charactersLeft)).toBeInTheDocument();
    });

    it('should disable the Character Counter and allow for the native HTML attribute `maxlength` when `hasCharacterCounter` is set to false', () => {
      const testId = 'test-id';

      const { getByTestId } = render(
        <Textarea testId={testId} hasCharacterCounter={false} maxLength={2} />
      );
      expect(getByTestId(testId)).toHaveAttribute('maxlength', '2');
    });

    it('should show the Character Counter with the deprecated prop of `maxLength`', () => {
      const testId = 'test-id';

      const { getByText } = render(
        <Textarea testId={testId} hasCharacterCounter maxLength={2} />
      );
      expect(getByText('2 ' + charactersAllowed)).toBeInTheDocument();
    });

    it('should show the Character Counter with the deprecated prop of `maxLength` but give the priority to `maxCount` if both used simultaneously', () => {
      const testId = 'test-id';

      const { getByText } = render(
        <Textarea
          testId={testId}
          hasCharacterCounter
          maxLength={2}
          maxCount={4}
        />
      );
      expect(getByText('4 ' + charactersAllowed)).toBeInTheDocument();
    });

    it('should update the character length on rerender', () => {
      const { getByText, rerender } = render(
        <Textarea maxCount={5} value="hi" />
      );
      expect(getByText('3 ' + charactersLeft)).toBeInTheDocument();
      rerender(<Textarea maxCount={5} value="hello" />);
      expect(getByText('0 ' + charactersLeft)).toBeInTheDocument();
    });
  });
});
