import React from 'react';
import { axe } from 'jest-axe';
import { Announce } from '.';
import { render } from 'react-testing-library';

const TEXT = 'Test Text';

describe('Announce', () => {
  it('should render the announce component', () => {
    const { container, getByText } = render(<Announce>{TEXT}</Announce>);

    expect(container).toBeInTheDocument();
    expect(getByText(TEXT)).toHaveAttribute('aria-live', 'polite');
  });

  it('should render the announce with the politeness set to assertive', () => {
    const { getByText } = render(
      <Announce politeness="assertive">{TEXT}</Announce>
    );

    expect(getByText(TEXT)).toHaveAttribute('aria-live', 'assertive');
  });

  it('should render the announce with the politeness set to off', () => {
    const { getByText } = render(<Announce politeness="off">{TEXT}</Announce>);

    expect(getByText(TEXT)).toHaveAttribute('aria-live', 'off');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Announce>{TEXT}</Announce>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
