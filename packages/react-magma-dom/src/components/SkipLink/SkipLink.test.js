import React from 'react';
import { axe } from 'jest-axe';
import { SkipLink } from '.';
import { SkipLinkContent } from '../SkipLinkContent';

import { render, fireEvent } from 'react-testing-library';

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

  it('should put focus on the h1 in the main content area when the button is clicked', () => {
    const { container } = render(
      <>
        <SkipLink />
        <SkipLinkContent>
          <h1>Test</h1>
        </SkipLinkContent>
      </>
    );
    const button = container.querySelector('button');
    const heading = container.querySelector('h1');

    expect(heading).not.toHaveFocus();
    fireEvent.click(button);
    expect(heading).toHaveFocus();
  });

  it('should put focus on the main content area when the button is clicked if they content area does not have an h1', () => {
    const { container } = render(
      <>
        <SkipLink />
        <SkipLinkContent />
      </>
    );
    const button = container.querySelector('button');
    const contentDiv = container.querySelector('#reactMagmaMainContent');

    expect(contentDiv).not.toHaveFocus();
    fireEvent.click(button);
    expect(contentDiv).toHaveFocus();
  });

  it('should not move focus if there is no content area', () => {
    const { container } = render(<SkipLink />);
    const button = container.querySelector('button');

    button.focus();
    fireEvent.click(button);
    expect(button).toHaveFocus();
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

  it('should render the skip link button specified position top and left attributes', () => {
    const { container } = render(
      <SkipLink positionLeft={86} positionTop={99} />
    );
    const button = container.querySelector('button');

    expect(button).toHaveStyleRule('left', '86px', {
      target: ':focus'
    });
    expect(button).toHaveStyleRule('top', '99px', {
      target: ':focus'
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<SkipLink />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
