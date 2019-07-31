import React from 'react';
import { axe } from 'jest-axe';
import { Heading } from '.';
import { render } from 'react-testing-library';

describe('Heading', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Heading level={1} testId={testId}>
        test
      </Heading>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render an h1', () => {
    const headingText = 'test';
    const { getByText } = render(<Heading level={1}>{headingText}</Heading>);
    const heading = getByText(headingText);

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
    expect(heading).toHaveStyleRule('font-size', '40px');
  });

  it('should render an h2', () => {
    const headingText = 'test';
    const { getByText } = render(<Heading level={2}>{headingText}</Heading>);
    const heading = getByText(headingText);

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
    expect(heading).toHaveStyleRule('font-size', '32px');
  });

  it('should render an h3', () => {
    const headingText = 'test';
    const { getByText } = render(<Heading level={3}>{headingText}</Heading>);
    const heading = getByText(headingText);

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
    expect(heading).toHaveStyleRule('font-size', '26px');
  });

  it('should render an h4', () => {
    const headingText = 'test';
    const { getByText } = render(<Heading level={4}>{headingText}</Heading>);
    const heading = getByText(headingText);

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
    expect(heading).toHaveStyleRule('font-size', '23px');
  });

  it('should render an h5', () => {
    const headingText = 'test';
    const { getByText } = render(<Heading level={5}>{headingText}</Heading>);
    const heading = getByText(headingText);

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
    expect(heading).toHaveStyleRule('font-size', '20px');
  });

  it('should render an h6', () => {
    const headingText = 'test';
    const { getByText } = render(<Heading level={6}>{headingText}</Heading>);
    const heading = getByText(headingText);

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
    expect(heading).toHaveStyleRule('font-size', '18px');
  });

  it('should render custom styles', () => {
    const color = '#cccccc';
    const headingText = 'test';
    const { getByText } = render(
      <Heading level={1} style={{ color }}>
        {headingText}
      </Heading>
    );
    const heading = getByText(headingText);

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
    const { container } = render(<Heading level={1}>test</Heading>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
