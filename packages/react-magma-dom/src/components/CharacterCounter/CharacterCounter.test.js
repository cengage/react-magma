import React from 'react';
import { axe } from '../../../axe-helper';
import { CharacterCounter } from '.';
import { render } from '@testing-library/react';
import { I18nContext, defaultI18n } from '../../i18n';

const TEXT = 'Test Text';

xdescribe('CharacterCounter', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(
      <CharacterCounter>{TEXT}</CharacterCounter>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <CharacterCounter testId={testId}>{TEXT}</CharacterCounter>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<CharacterCounter>{TEXT}</CharacterCounter>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('Supports i18n', () => {
    const example = 'example i18n';
    const { getByText } = render(
      <I18nContext.Provider value={{ ...defaultI18n, example }}>
        <CharacterCounter>override default i18n value: </CharacterCounter>
      </I18nContext.Provider>
    );

    expect(getByText(example)).toBeInTheDocument();
  });

  //it('should count characters under the limit on user input')

  //it('should count characters over the limit on user input')

  //it('should reset the counter to maximum length on input clear')

  //it('should check for a on change state')

  //it('should have gray text on a default state')

  //it('should have red text on an error state')
});
