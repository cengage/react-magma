import React from 'react';
import { axe } from 'jest-axe';
import { Paragraph } from '.';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('Paragraph', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Paragraph testId={testId}>Test Paragraph</Paragraph>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a large paragraph with the correct styles', () => {
    const text = 'Test Paragraph';
    const { getByText } = render(
      <Paragraph size="bodyLarge">{text}</Paragraph>
    );

    expect(getByText(text)).toHaveStyleRule(
      'font-size',
      magma.typographySizes.bodyLarge.mobile.fontSize
    );

    expect(getByText(text)).toHaveStyleRule('margin', '0 0 24px');
  });

  it('should render a medium paragraph with the correct styles', () => {
    const text = 'Test Paragraph';
    const { getByText } = render(
      <Paragraph size="bodyMedium">{text}</Paragraph>
    );

    expect(getByText(text)).toHaveStyleRule(
      'font-size',
      magma.typographySizes.bodyMedium.mobile.fontSize
    );

    expect(getByText(text)).toHaveStyleRule('margin', '0 0 24px');
  });

  it('should render a small paragraph with the correct styles', () => {
    const text = 'Test Paragraph';
    const { getByText } = render(
      <Paragraph size="bodySmall">{text}</Paragraph>
    );

    expect(getByText(text)).toHaveStyleRule(
      'font-size',
      magma.typographySizes.bodySmall.mobile.fontSize
    );

    expect(getByText(text)).toHaveStyleRule('margin', '0 0 16px');
  });

  it('should render an extra small paragraph with the correct styles', () => {
    const text = 'Test Paragraph';
    const { getByText } = render(
      <Paragraph size="bodyXSmall">{text}</Paragraph>
    );

    expect(getByText(text)).toHaveStyleRule(
      'font-size',
      magma.typographySizes.bodyXSmall.mobile.fontSize
    );

    expect(getByText(text)).toHaveStyleRule('margin', '0 0 8px');
  });

  it('should render a paragraph with expressive styles', () => {
    const text = 'Test Paragraph';
    const { getByText } = render(
      <Paragraph size="bodyLarge" variant="expressive">
        {text}
      </Paragraph>
    );

    expect(getByText(text)).toHaveStyleRule(
      'font-size',
      magma.typographyExpressiveSizes.bodyLarge.mobile.fontSize
    );
    expect(getByText(text)).toHaveStyleRule(
      'font-family',
      magma.bodyExpressiveFont
    );
  });

  it('should render a paragraph with narrative styles', () => {
    const text = 'Test Paragraph';
    const { getByText } = render(
      <Paragraph variant="narrative">{text}</Paragraph>
    );

    expect(getByText(text)).toHaveStyleRule(
      'font-family',
      magma.bodyNarrativeFont
    );
  });

  it('should render paragraphs with no margins', () => {
    const text1 = 'Test Paragraph 1';
    const text2 = 'Test Paragraph 2';
    const text3 = 'Test Paragraph 3';
    const text4 = 'Test Paragraph 4';
    const { getByText } = render(
      <>
        <Paragraph noMargins size="bodyLarge">
          {text1}
        </Paragraph>
        <Paragraph noMargins size="bodyMedium">
          {text2}
        </Paragraph>
        <Paragraph noMargins size="bodySmall">
          {text3}
        </Paragraph>
        <Paragraph noMargins size="bodyXSmall">
          {text4}
        </Paragraph>
      </>
    );

    expect(getByText(text1)).toHaveStyleRule('margin', '0');
    expect(getByText(text2)).toHaveStyleRule('margin', '0');
    expect(getByText(text3)).toHaveStyleRule('margin', '0');
    expect(getByText(text4)).toHaveStyleRule('margin', '0');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Paragraph>test text</Paragraph>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
