import React from 'react';
import { axe } from 'jest-axe';
import { NavTabs, NavTab } from '.';
import { render } from '@testing-library/react';

describe('NavTabs', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<NavTabs testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  //   it('Does not violate accessibility standards', () => {
  //     const { container } = render(
  //       <NavTabs>
  //         <NavTab>test text</NavTab>
  //       </NavTabs>
  //     );

  //     return axe(container.innerHTML).then(result => {
  //       return expect(result).toHaveNoViolations();
  //     });
  //   });
});
