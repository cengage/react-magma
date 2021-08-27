import React from 'react';
import { axe } from 'jest-axe';
import { Slider } from '.';
import { render } from '@testing-library/react';
import { I18nContext, defaultI18n } from '../../i18n';

const TEXT = 'Test Text';

describe('Slider', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Slider testId={testId}>{TEXT}</Slider>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Slider>{TEXT}</Slider>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  // it('Supports i18n', () => {
  //   const example = 'example i18n';
  //   const { getByText } = render(<I18nContext.Provider value={{ ...defaultI18n, example}}>
  //     <Slider>override default i18n value: </Slider>
  //   </I18nContext.Provider>);

  //   expect(getByText(example)).toBeInTheDocument();
  // })
});
