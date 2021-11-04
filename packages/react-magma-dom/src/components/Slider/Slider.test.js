import React from 'react';
import { axe } from 'jest-axe';
import { Slider } from '.';
import { Track } from './Track';
import { Handle } from './Handle';
import { render } from '@testing-library/react';
import { I18nContext, defaultI18n } from '../../i18n';

const TEXT = 'Test Text';

describe('Slider', () => {
  it('Should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Slider testId={testId}>{TEXT}</Slider>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Slider>{TEXT}</Slider>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  // it('should render the Slider component with min, and max values', () => {
  //   const maxVal = '100';

  //   const { getByText } = render(
  //     <Slider>
  //       <Track>
  //         <Handle max={maxVal}>100</Handle>
  //       </Track>
  //     </Slider>
  //   );

  //   const handleValue = getByText('aria-valuemax', '100').parentElement;
  //   expect(handleValue).toHaveAttribute('aria-valuemax', '100');
  // });

  // it('Supports i18n', () => {
  //   const example = 'example i18n';
  //   const { getByText } = render(<I18nContext.Provider value={{ ...defaultI18n, example}}>
  //     <Slider>override default i18n value: </Slider>
  //   </I18nContext.Provider>);

  //   expect(getByText(example)).toBeInTheDocument();
  // })
});
