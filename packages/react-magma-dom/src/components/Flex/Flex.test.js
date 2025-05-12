import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '../../../axe-helper';

import { Flex } from '.';

describe('Flex', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Flex behavior="container" testId={testId}>
        Test Flex
      </Flex>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a flex container with the correct styles', () => {
    const text = 'Test Flex';
    const { getByText } = render(<Flex behavior="container">{text}</Flex>);

    expect(getByText(text)).toHaveStyleRule('align-content', 'stretch');
  });

  it('should render a flex item with the correct styles', () => {
    const text = 'Test Flex';
    const { getByText } = render(
      <Flex behavior="item" xs={6}>
        {text}
      </Flex>
    );

    expect(getByText(text)).toHaveStyleRule('max-width', '50%');
    expect(getByText(text)).toHaveStyleRule('flex-basis', '50%');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Flex behavior="container">test text</Flex>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
