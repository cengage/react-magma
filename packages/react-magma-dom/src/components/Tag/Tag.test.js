import React from 'react';
import { axe } from 'jest-axe';
import { Tag } from '.';
import { render } from '@testing-library/react';
import { I18nContext, defaultI18n } from '../../i18n';

const TEXT = 'Test Text';

describe('Tag', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(
      <Tag>{TEXT}</Tag>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Tag testId={testId}>{TEXT}</Tag>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Tag>{TEXT}</Tag>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  // it('Supports i18n', () => {
  //   const example = 'example i18n';
  //   const { getByText } = render(<I18nContext.Provider value={{ ...defaultI18n, example}}>
  //     <Tag>override default i18n value: </Tag>
  //   </I18nContext.Provider>);

  //   expect(getByText(example)).toBeInTheDocument();
  // })
});
