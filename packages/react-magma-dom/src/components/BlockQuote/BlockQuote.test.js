import React from 'react';
import { axe } from '../../../axe-helper';
import { BlockQuote, BlockQuoteItem } from '.';
import { magma } from '../../theme/magma';
import { render } from '@testing-library/react';
import { ThemeContext } from '../../theme/ThemeContext';

const TEXT = 'Test Text';

describe('BlockQuote', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <BlockQuote testId={testId}>{TEXT}</BlockQuote>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<BlockQuote>{TEXT}</BlockQuote>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should render the component with the correct styles', () => {
    const testId = 'test-id';

    const { getByTestId } = render(<BlockQuote testId={testId}></BlockQuote>);

    const blockquote = getByTestId(testId);

    expect(blockquote).toHaveStyleRule(
      'border-left',
      `4px solid ${magma.colors.neutral300}`
    );
  });

  it('should render the component with the correct inverse styles', () => {
    const testIdParent = 'test-id';
    const testIdChild = 'test-id-item';

    const { getByTestId } = render(
      <BlockQuote isInverse testId={testIdParent}>
        <BlockQuoteItem testId={testIdChild}>TEXT</BlockQuoteItem>
      </BlockQuote>
    );

    const blockquoteitem = getByTestId(testIdChild);
    const blockquote = getByTestId(testIdParent);

    expect(blockquoteitem).toHaveStyleRule('color', '#FFFFFF');
    expect(blockquote).toHaveStyleRule('border-left', '4px solid #FFFFFF');
  });

  it('should render the component with a narrative font style', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <BlockQuote>
        <BlockQuoteItem contextVariant="narrative" testId={testId}>
          TEXT
        </BlockQuoteItem>
      </BlockQuote>
    );

    const blockquoteitem = getByTestId(testId);

    expect(blockquoteitem).toHaveStyleRule(
      'font-family',
      magma.bodyNarrativeFont
    );
  });

  it('should render the component with a expressive font style', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <BlockQuote>
        <BlockQuoteItem contextVariant="expressive" testId={testId}>
          TEXT
        </BlockQuoteItem>
      </BlockQuote>
    );

    const blockquoteitem = getByTestId(testId);

    expect(blockquoteitem).toHaveStyleRule(
      'font-family',
      magma.bodyExpressiveFont
    );
  });

  it('should render the component with an attribution line', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <BlockQuote>
        <BlockQuoteItem hasAttribution testId={testId}>
          TEXT
        </BlockQuoteItem>
      </BlockQuote>
    );

    const blockquoteitem = getByTestId(testId);

    expect(blockquoteitem).toHaveStyleRule(
      'font-size',
      magma.typeScale.size03.fontSize
    );
  });

  it('should render the component with an inverse attribution line', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <BlockQuote isInverse>
        <BlockQuoteItem hasAttribution testId={testId}>
          TEXT
        </BlockQuoteItem>
      </BlockQuote>
    );

    const blockquoteitem = getByTestId(testId);

    expect(blockquoteitem).toHaveStyleRule(
      'font-size',
      magma.typeScale.size03.fontSize,
      'color',
      magma.colors.neutral200
    );
  });

  it('should render border with the correct color according to the overwritten theme', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <ThemeContext.Provider
        value={{ ...magma, colors: { ...magma.colors, primary: 'black' } }}
      >
        <BlockQuote borderStyle="primary" testId={testId}></BlockQuote>
      </ThemeContext.Provider>
    );

    const blockquote = getByTestId(testId);
    expect(blockquote).toHaveStyleRule('border-left', `4px solid black`);
  });
});
