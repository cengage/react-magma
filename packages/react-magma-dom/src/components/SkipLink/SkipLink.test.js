import React from 'react';
import { axe } from 'jest-axe';
import { SkipLink } from '.';
import { render } from 'react-testing-library';

describe('SkipLink', () => {
  it('should render the skip link component', () => {
    const { container } = render(<SkipLink />);
    const button = container.querySelector('button');

    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toEqual('Skip Navigation');
  });

  it('should render the skip link component with custom text', () => {
    const TEXT = 'Test text';
    const { container } = render(<SkipLink buttonText={TEXT} />);
    const button = container.querySelector('button');

    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toEqual(TEXT);
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<SkipLink />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
