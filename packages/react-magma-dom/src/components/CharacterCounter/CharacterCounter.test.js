import React from 'react';
import { axe } from '../../../axe-helper';
import { Input } from '../Input';
import { CharacterCounter } from '.';
import { transparentize } from 'polished';
import { magma } from '../../theme/magma';
import { render, fireEvent } from '@testing-library/react';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';

const testId = 'test-id';

describe('CharacterCounter', () => {
  it('should find element by testId', () => {
    const { getByTestId } = render(
      <CharacterCounter maxLength={1} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<CharacterCounter maxLength={347698} />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('Supports i18n', () => {
    const charactersAllowed = defaultI18n.characterCounter.charactersAllowed;
    const { getByText } = render(
      <I18nContext.Provider
        value={{
          ...defaultI18n,
        }}
      >
        <CharacterCounter maxLength={22} />
      </I18nContext.Provider>
    );

    expect(getByText('22 ' + charactersAllowed)).toBeInTheDocument();
  });

  it('Shows the default label of "character allowed"', () => {
    const characterAllowed = defaultI18n.characterCounter.characterAllowed;
    const { getByText } = render(
      <I18nContext.Provider
        value={{
          ...defaultI18n,
        }}
      >
        <CharacterCounter maxLength={1} />
      </I18nContext.Provider>
    );

    expect(getByText('1 ' + characterAllowed)).toBeInTheDocument();
  });

  it('Shows the default label of "characters allowed"', () => {
    const charactersAllowed = defaultI18n.characterCounter.charactersAllowed;
    const { getByText } = render(
      <I18nContext.Provider
        value={{
          ...defaultI18n,
        }}
      >
        <CharacterCounter maxLength={2} />
      </I18nContext.Provider>
    );

    expect(getByText('2 ' + charactersAllowed)).toBeInTheDocument();
  });

  it('Shows the correct top margin from the input with a "large" InputSize prop', () => {
    const charactersAllowed = defaultI18n.characterCounter.charactersAllowed;
    const { getByText } = render(<Input inputSize={'large'} maxLength={4} />);
    expect(getByText('4 ' + charactersAllowed)).toHaveStyleRule(
      'margin-top',
      magma.spaceScale.spacing03
    );
  });

  it('Shows the label "characters left" as the user types', () => {
    const onChange = jest.fn();
    const labelText = 'Character Counter';
    const charactersLeft = defaultI18n.characterCounter.charactersLeft;
    const { getByText, getByLabelText } = render(
      <Input labelText={labelText} maxLength={4} onChange={onChange} />
    );

    fireEvent.change(getByLabelText(labelText), { target: { value: 'dd' } });

    expect(onChange).toHaveBeenCalled();
    expect(getByText('2 ' + charactersLeft)).toBeInTheDocument();
  });

  it('Shows the inverse label "characters left" as the user types', () => {
    const onChange = jest.fn();
    const labelText = 'Character Counter';
    const charactersLeft = defaultI18n.characterCounter.charactersLeft;
    const { getByText, getByLabelText } = render(
      <Input
        isInverse
        labelText={labelText}
        maxLength={4}
        onChange={onChange}
      />
    );

    fireEvent.change(getByLabelText(labelText), { target: { value: 'dd' } });

    expect(onChange).toHaveBeenCalled();

    expect(getByText('2 ' + charactersLeft)).toHaveStyleRule(
      'color',
      transparentize(0.3, magma.colors.neutral100)
    );
    expect(getByText('2 ' + charactersLeft)).toBeInTheDocument();
  });

  it('Shows the label "characters left" if user types to zero', () => {
    const onChange = jest.fn();
    const labelText = 'Character Counter';
    const charactersLeft = defaultI18n.characterCounter.charactersLeft;
    const { getByText, getByLabelText } = render(
      <Input labelText={labelText} maxLength={4} onChange={onChange} />
    );

    fireEvent.change(getByLabelText(labelText), { target: { value: 'dddd' } });

    expect(onChange).toHaveBeenCalled();
    expect(getByText('0 ' + charactersLeft)).toBeInTheDocument();
  });

  it('Shows the label "character left" as the user types to one remaining character', () => {
    const onChange = jest.fn();
    const labelText = 'Character Counter';
    const characterLeft = defaultI18n.characterCounter.characterLeft;
    const { getByText, getByLabelText } = render(
      <Input labelText={labelText} maxLength={4} onChange={onChange} />
    );

    fireEvent.change(getByLabelText(labelText), { target: { value: 'ddd' } });

    expect(onChange).toHaveBeenCalled();
    expect(getByText('1 ' + characterLeft)).toBeInTheDocument();
  });

  it('Shows the label "character over limit" as the user types over the limit by one', () => {
    const onChange = jest.fn();
    const labelText = 'Character Counter';
    const characterOver = defaultI18n.characterCounter.characterOver;
    const { getByText, getByLabelText } = render(
      <Input labelText={labelText} maxLength={4} onChange={onChange} />
    );

    fireEvent.change(getByLabelText(labelText), { target: { value: 'ddddd' } });

    expect(onChange).toHaveBeenCalled();

    expect(getByText('1 ' + characterOver)).toHaveStyleRule(
      'color',
      magma.colors.danger
    );
    expect(getByText('1 ' + characterOver)).toBeInTheDocument();
  });

  it('Shows the label "characters over limit" as the user types over the limit', () => {
    const onChange = jest.fn();
    const labelText = 'Character Counter';
    const charactersOver = defaultI18n.characterCounter.charactersOver;
    const { getByText, getByLabelText } = render(
      <Input labelText={labelText} maxLength={4} onChange={onChange} />
    );

    fireEvent.change(getByLabelText(labelText), {
      target: { value: 'dddddd' },
    });

    expect(onChange).toHaveBeenCalled();
    expect(getByText('2 ' + charactersOver)).toBeInTheDocument();
  });

  it('Shows the inverse label "characters over limit" as the user types over the limit', () => {
    const onChange = jest.fn();
    const labelText = 'Character Counter';
    const charactersOver = defaultI18n.characterCounter.charactersOver;
    const { getByText, getByLabelText } = render(
      <Input
        isInverse
        labelText={labelText}
        maxLength={4}
        onChange={onChange}
      />
    );

    fireEvent.change(getByLabelText(labelText), {
      target: { value: 'dddddd' },
    });

    expect(onChange).toHaveBeenCalled();
    expect(getByText('2 ' + charactersOver)).toHaveStyleRule(
      'color',
      magma.colors.danger200
    );

    expect(getByText('2 ' + charactersOver)).toBeInTheDocument();
  });

  it('Shows the label "characters left" equal to the maxLength if the user clears the input', () => {
    const onChangeSpy = jest.fn();
    const labelText = 'Character Counter';
    const targetValue = '';
    const charactersAllowed = defaultI18n.characterCounter.charactersAllowed;
    const { getByText, getByLabelText } = render(
      <Input
        labelText={labelText}
        maxLength={4}
        onChange={onChangeSpy}
        value="dddd"
      />
    );

    fireEvent.change(getByLabelText(labelText), {
      target: { value: targetValue },
    });

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(getByText('4 ' + charactersAllowed)).toBeInTheDocument();
  });
});
