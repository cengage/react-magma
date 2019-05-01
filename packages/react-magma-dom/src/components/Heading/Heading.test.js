import React from 'react';
import { axe } from 'jest-axe';
import { Heading } from '.';
import { render, cleanup } from 'react-testing-library';

const headingText = 'Test Heading Text';

const BASE_HEADING_PROPS = {
  level: 1,
  id: 'testId',
  children: React.createElement('div')
};

const renderHeading = (myProps = {}) => {
  const props = {
    ...BASE_HEADING_PROPS,
    ...myProps
  };

  return render(<Heading {...props}>{headingText}</Heading>);
};

describe('Heading', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = renderHeading({ testId });

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render an h1', () => {
    const { container } = renderHeading();
    const heading = container.querySelector('h1');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
    expect(heading).toHaveStyleRule('font-size', '40px');
  });

  it('should render an h2', () => {
    const { container } = renderHeading({
      level: 2
    });
    const heading = container.querySelector('h2');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
    expect(heading).toHaveStyleRule('font-size', '32px');
  });

  it('should render an h3', () => {
    const { container } = renderHeading({
      level: 3
    });
    const heading = container.querySelector('h3');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
    expect(heading).toHaveStyleRule('font-size', '26px');
  });

  it('should render an h4', () => {
    const { container } = renderHeading({
      level: 4
    });
    const heading = container.querySelector('h4');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
    expect(heading).toHaveStyleRule('font-size', '23px');
  });

  it('should render an h5', () => {
    const { container } = renderHeading({
      level: 5
    });
    const heading = container.querySelector('h5');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
    expect(heading).toHaveStyleRule('font-size', '20px');
  });

  it('should render an h6', () => {
    const { container } = renderHeading({
      level: 6
    });
    const heading = container.querySelector('h6');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
    expect(heading).toHaveStyleRule('font-size', '18px');
  });

  it('should render custom styles', () => {
    const color = '#cccccc';
    const { container } = renderHeading({ level: 1, style: { color } });
    const heading = container.querySelector('h1');

    expect(heading).toHaveStyle(`color: ${color}`);
  });

  describe('Snapshot', () => {
    it('should render heading 1 correctly', () => {
      const { container } = render(
        <Heading level={1} id="testId">
          Heading 1
        </Heading>
      );

      expect(container).toMatchSnapshot();
    });

    it('should render heading 2 correctly', () => {
      const { container } = render(<Heading level={2}>Heading 2</Heading>);

      expect(container).toMatchSnapshot();
    });

    it('should render heading 3 correctly', () => {
      const { container } = render(<Heading level={3}>Heading 3</Heading>);

      expect(container).toMatchSnapshot();
    });

    it('should render heading 4 correctly', () => {
      const { container } = render(<Heading level={4}>Heading 4</Heading>);

      expect(container).toMatchSnapshot();
    });

    it('should render heading 5 correctly', () => {
      const { container } = render(<Heading level={5}>Heading 5</Heading>);

      expect(container).toMatchSnapshot();
    });

    it('should render heading 6 correctly', () => {
      const { container } = render(<Heading level={6}>Heading 6</Heading>);

      expect(container).toMatchSnapshot();
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = renderHeading();
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
