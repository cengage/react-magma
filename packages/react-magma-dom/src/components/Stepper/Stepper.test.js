import React from 'react';
import { axe } from '../../../axe-helper';
import { Stepper, Step } from '.';
import { render } from '@testing-library/react';
import { I18nContext, defaultI18n } from '../../i18n';

const TEXT = 'Test Text';

describe('Stepper', () => {
  // it('should render the visually hidden component', () => {
  //   const { container, getByText } = render(<Stepper>{TEXT}</Stepper>);

  //   expect(getByText(TEXT)).toBeInTheDocument();
  // });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Stepper testId={testId}>{TEXT}</Stepper>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  // it('Does not violate accessibility standards', () => {
  //   const { container } = render(<Stepper>{TEXT}</Stepper>);

  //   return axe(container.innerHTML).then(result => {
  //     return expect(result).toHaveNoViolations();
  //   });
  // });

  // it('Supports i18n', () => {
  //   const example = 'example i18n';
  //   const { getByText } = render(
  //     <I18nContext.Provider value={{ ...defaultI18n, example }}>
  //       <Stepper>override default i18n value: </Stepper>
  //     </I18nContext.Provider>
  //   );

  //   expect(getByText(example)).toBeInTheDocument();
  // });
});
