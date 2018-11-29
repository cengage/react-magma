import * as React from 'react';
import { Heading, HeadingProps } from './Heading';
import { render, cleanup } from 'react-testing-library';

const headingText = 'Test Heading Text';

const BASE_HEADING_PROPS: HeadingProps = {
  level: 1,
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
  afterEach(() => {
    cleanup();
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

  describe('Snapshot', () => {
    it('should render headings correctly', () => {
      const { container } = render(
        <div>
          <Heading level={1}>Heading 1</Heading>
          <Heading level={2}>Heading 2</Heading>
          <Heading level={3}>Heading 3</Heading>
          <Heading level={4}>Heading 4</Heading>
          <Heading level={5}>Heading 5</Heading>
          <Heading level={6}>Heading 6</Heading>
        </div>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
