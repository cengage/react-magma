import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '../../../axe-helper';

import { Fieldset } from '.';

const LEGEND_TEXT = 'Group Label';
const CHILDREN_TEXT = 'Child content';

describe('Fieldset', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Fieldset legend={LEGEND_TEXT} testId={testId}>
        {CHILDREN_TEXT}
      </Fieldset>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a fieldset element by default', () => {
    const { container } = render(
      <Fieldset legend={LEGEND_TEXT}>{CHILDREN_TEXT}</Fieldset>
    );

    expect(container.querySelector('fieldset')).toBeInTheDocument();
  });

  it('should render a legend element with the provided text', () => {
    const { getByText } = render(
      <Fieldset legend={LEGEND_TEXT}>{CHILDREN_TEXT}</Fieldset>
    );

    const legend = getByText(LEGEND_TEXT);

    expect(legend).toBeInTheDocument();
    expect(legend.tagName).toBe('LEGEND');
  });

  it('should render legend as the first child of fieldset', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Fieldset legend={LEGEND_TEXT} testId={testId}>
        {CHILDREN_TEXT}
      </Fieldset>
    );

    const fieldset = getByTestId(testId);

    expect(fieldset.firstElementChild.tagName).toBe('LEGEND');
  });

  it('should render children', () => {
    const { getByText } = render(
      <Fieldset legend={LEGEND_TEXT}>{CHILDREN_TEXT}</Fieldset>
    );

    expect(getByText(CHILDREN_TEXT)).toBeInTheDocument();
  });

  it('should auto-generate legendId when not provided', () => {
    const { getByText } = render(
      <Fieldset legend={LEGEND_TEXT}>{CHILDREN_TEXT}</Fieldset>
    );

    const legend = getByText(LEGEND_TEXT);

    expect(legend.id).toBeTruthy();
  });

  it('should use the provided legendId', () => {
    const customId = 'custom-legend-id';

    const { getByText } = render(
      <Fieldset legend={LEGEND_TEXT} legendId={customId}>
        {CHILDREN_TEXT}
      </Fieldset>
    );

    const legend = getByText(LEGEND_TEXT);

    expect(legend.id).toBe(customId);
  });

  it('should not add role="group" when as is fieldset', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Fieldset legend={LEGEND_TEXT} testId={testId}>
        {CHILDREN_TEXT}
      </Fieldset>
    );

    expect(getByTestId(testId)).not.toHaveAttribute('role');
  });

  it('should pass additional HTML attributes via rest spread', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Fieldset
        aria-describedby="desc"
        className="custom-class"
        legend={LEGEND_TEXT}
        testId={testId}
      >
        {CHILDREN_TEXT}
      </Fieldset>
    );

    const fieldset = getByTestId(testId);

    expect(fieldset).toHaveAttribute('aria-describedby', 'desc');
    expect(fieldset).toHaveClass('custom-class');
  });

  it('should forward ref', () => {
    const ref = React.createRef();

    render(
      <Fieldset legend={LEGEND_TEXT} ref={ref}>
        {CHILDREN_TEXT}
      </Fieldset>
    );

    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
  });

  describe('visuallyHiddenLegend', () => {
    it('should visually hide the legend when visuallyHiddenLegend is true', () => {
      const { getByText } = render(
        <Fieldset legend={LEGEND_TEXT} visuallyHiddenLegend>
          {CHILDREN_TEXT}
        </Fieldset>
      );

      const legend = getByText(LEGEND_TEXT);

      expect(legend).toBeInTheDocument();
      expect(legend).toHaveStyleRule('position', 'absolute');
      expect(legend).toHaveStyleRule('height', '1px');
      expect(legend).toHaveStyleRule('width', '1px');
    });

    it('should keep the legend in the DOM for screen readers', () => {
      const { getByText } = render(
        <Fieldset legend={LEGEND_TEXT} visuallyHiddenLegend>
          {CHILDREN_TEXT}
        </Fieldset>
      );

      expect(getByText(LEGEND_TEXT)).toBeInTheDocument();
    });
  });

  describe('as="div"', () => {
    it('should render a div element', () => {
      const testId = 'test-id';

      const { getByTestId } = render(
        <Fieldset as="div" legend={LEGEND_TEXT} testId={testId}>
          {CHILDREN_TEXT}
        </Fieldset>
      );

      const el = getByTestId(testId);

      expect(el.tagName).toBe('DIV');
    });

    it('should set role="group"', () => {
      const testId = 'test-id';

      const { getByTestId } = render(
        <Fieldset as="div" legend={LEGEND_TEXT} testId={testId}>
          {CHILDREN_TEXT}
        </Fieldset>
      );

      expect(getByTestId(testId)).toHaveAttribute('role', 'group');
    });

    it('should set aria-labelledby pointing to the legend id', () => {
      const customId = 'custom-legend-id';
      const testId = 'test-id';

      const { getByTestId, getByText } = render(
        <Fieldset
          as="div"
          legend={LEGEND_TEXT}
          legendId={customId}
          testId={testId}
        >
          {CHILDREN_TEXT}
        </Fieldset>
      );

      expect(getByTestId(testId)).toHaveAttribute('aria-labelledby', customId);
      expect(getByText(LEGEND_TEXT).id).toBe(customId);
    });

    it('should not render a fieldset or legend element', () => {
      const { container } = render(
        <Fieldset as="div" legend={LEGEND_TEXT}>
          {CHILDREN_TEXT}
        </Fieldset>
      );

      expect(container.querySelector('fieldset')).not.toBeInTheDocument();
      expect(container.querySelector('legend')).not.toBeInTheDocument();
    });

    it('should render legend text in a span element', () => {
      const { getByText } = render(
        <Fieldset as="div" legend={LEGEND_TEXT}>
          {CHILDREN_TEXT}
        </Fieldset>
      );

      expect(getByText(LEGEND_TEXT).tagName).toBe('SPAN');
    });

    it('should visually hide the span when visuallyHiddenLegend is true', () => {
      const { getByText } = render(
        <Fieldset as="div" legend={LEGEND_TEXT} visuallyHiddenLegend>
          {CHILDREN_TEXT}
        </Fieldset>
      );

      const span = getByText(LEGEND_TEXT);

      expect(span).toHaveStyleRule('position', 'absolute');
      expect(span).toHaveStyleRule('height', '1px');
      expect(span).toHaveStyleRule('width', '1px');
    });

    it('should forward ref to the div element', () => {
      const ref = React.createRef();

      render(
        <Fieldset as="div" legend={LEGEND_TEXT} ref={ref}>
          {CHILDREN_TEXT}
        </Fieldset>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Accessibility', () => {
    it('Does not violate accessibility standards (fieldset)', () => {
      const { container } = render(
        <Fieldset legend={LEGEND_TEXT}>{CHILDREN_TEXT}</Fieldset>
      );

      return axe(container.innerHTML).then(result => {
        return expect(result).toHaveNoViolations();
      });
    });

    it('Does not violate accessibility standards (div)', () => {
      const { container } = render(
        <Fieldset as="div" legend={LEGEND_TEXT}>
          {CHILDREN_TEXT}
        </Fieldset>
      );

      return axe(container.innerHTML).then(result => {
        return expect(result).toHaveNoViolations();
      });
    });
  });
});
