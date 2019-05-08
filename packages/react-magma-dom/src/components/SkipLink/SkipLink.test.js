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
    expect(button).toHaveStyleRule('background', '#006298');
    expect(button).toHaveStyleRule('color', '#FFFFFF');
    expect(button).toMatchSnapshot();
  });

  it('should render the skip link component with custom text', () => {
    const TEXT = 'Test text';
    const { container } = render(<SkipLink buttonText={TEXT} />);
    const button = container.querySelector('button');

    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toEqual(TEXT);
  });

  it('should render the skip link button with specified color and variant', () => {
    const { container } = render(
      <SkipLink color="success" variant="outline" />
    );
    const button = container.querySelector('button');

    expect(button).toHaveStyleRule('background', 'rgba(0,0,0,0)');
    expect(button).toHaveStyleRule('color', '#3A8200');
  });

  it('should render the skip link button the correct colors for an inverse button', () => {
    const { container } = render(<SkipLink inverse />);
    const button = container.querySelector('button');

    expect(button).toHaveStyleRule('background', '#FFFFFF');
    expect(button).toHaveStyleRule('color', '#006298');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<SkipLink />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
