import { axe } from '../../../axe-helper';
import { Announce } from '.';
import { render } from '@testing-library/react';

describe('Announce', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Announce testId={testId}>Test Announce</Announce>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the announce component', () => {
    const TEXT = 'Test Text';
    const { container, getByText } = render(<Announce>{TEXT}</Announce>);

    expect(container).toBeInTheDocument();
    expect(getByText(TEXT)).toHaveAttribute('aria-live', 'polite');
  });

  it('should render the announce with the politeness set to assertive', () => {
    const TEXT = 'Test Text';
    const { getByText } = render(
      <Announce politeness="assertive">{TEXT}</Announce>
    );

    expect(getByText(TEXT)).toHaveAttribute('aria-live', 'assertive');
  });

  it('should render the announce with the politeness set to off', () => {
    const TEXT = 'Test Text';
    const { getByText } = render(<Announce politeness="off">{TEXT}</Announce>);

    expect(getByText(TEXT)).toHaveAttribute('aria-live', 'off');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Announce>test text</Announce>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
