import React from 'react';
import { axe } from 'jest-axe';
import { SkipLink } from '.';
import { render } from 'react-testing-library';

const targetID = 'testTargetId';

describe('SkipLink', () => {
  it('should render the skip link component', () => {
    const { container } = render(<SkipLink targetID={targetID} />);
    const button = container.querySelector('button');

    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toEqual('Skip Navigation');
  });

  it('should render the skip link component with custom text', () => {
    const TEXT = 'Test text';
    const { container } = render(
      <SkipLink targetID={targetID} buttonText={TEXT} />
    );
    const button = container.querySelector('button');

    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toEqual(TEXT);
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<SkipLink targetID={targetID} />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
