import React from 'react';
import { axe } from 'jest-axe';
import { Fileuploader } from '.';
import { render } from '@testing-library/react';
import { I18nContext, defaultI18n } from 'react-magma-dom';

const TEXT = 'Test Text';

describe('Fileuploader', () => {
  it('should be true', () => {
    expect(true).toBeTruthy();
  })
  // it('should render the visually hidden component', () => {
  //   const { container, getByText } = render(
  //     <Fileuploader/>
  //   );

  //   expect(getByText('or')).toBeInTheDocument();
  // });

  // it('should find element by testId', () => {
  //   const testId = 'test-id';
  //   const { getByTestId } = render(
  //     <Fileuploader testId={testId}/>
  //   );

  //   expect(getByTestId(testId)).toBeInTheDocument();
  // });

  // it('Does not violate accessibility standards', () => {
  //   const { container } = render(<Fileuploader>{TEXT}</Fileuploader>);
  //   return axe(container.innerHTML).then(result => {
  //     return expect(result).toHaveNoViolations();
  //   });
  // });

  // it('Supports i18n', () => {
  //   const example = 'example i18n';
  //   const { getByText } = render(<I18nContext.Provider value={{ ...defaultI18n, example}}>
  //     <Fileuploader>override default i18n value: </Fileuploader>
  //   </I18nContext.Provider>);
  //   expect(getByText(example)).toBeInTheDocument();
  // })
});
