import React from 'react';
import { axe } from '../../../axe-helper';
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
      <Paragraph visualStyle="bodyLarge">{text}</Paragraph>
    );

    expect(getByText(text)).toHaveStyleRule(
      'font-size',
      magma.typographyVisualStyles.bodyLarge.mobile.fontSize
    );

    expect(getByText(text)).toHaveStyleRule(
      'margin',
      `${magma.spaceScale.spacing06} 0`
    );
  });

  it('should render a medium paragraph with the correct styles', () => {
    const text = 'Test Paragraph';
    const { getByText } = render(
      <Paragraph visualStyle="bodyMedium">{text}</Paragraph>
    );

    expect(getByText(text)).toHaveStyleRule(
      'font-size',
      magma.typographyVisualStyles.bodyMedium.mobile.fontSize
    );

    expect(getByText(text)).toHaveStyleRule(
      'margin',
      `${magma.spaceScale.spacing06} 0`
    );
  });

  it('should render a small paragraph with the correct styles', () => {
    const text = 'Test Paragraph';
    const { getByText } = render(
      <Paragraph visualStyle="bodySmall">{text}</Paragraph>
    );

    expect(getByText(text)).toHaveStyleRule(
      'font-size',
      magma.typographyVisualStyles.bodySmall.mobile.fontSize
    );

    expect(getByText(text)).toHaveStyleRule(
      'margin',
      `${magma.spaceScale.spacing05} 0`
    );
  });

  it('should render an extra small paragraph with the correct styles', () => {
    const text = 'Test Paragraph';
    const { getByText } = render(
      <Paragraph visualStyle="bodyXSmall">{text}</Paragraph>
    );

    expect(getByText(text)).toHaveStyleRule(
      'font-size',
      magma.typographyVisualStyles.bodyXSmall.mobile.fontSize
    );

    expect(getByText(text)).toHaveStyleRule(
      'margin',
      `${magma.spaceScale.spacing03} 0`
    );
  });

  it('should render a paragraph with expressive styles', () => {
    const text = 'Test Paragraph';
    const { getByText } = render(
      <Paragraph visualStyle="bodyLarge" contextVariant="expressive">
        {text}
      </Paragraph>
    );

    expect(getByText(text)).toHaveStyleRule(
      'font-size',
      magma.typographyExpressiveVisualStyles.bodyLarge.mobile.fontSize
    );
    expect(getByText(text)).toHaveStyleRule(
      'font-family',
      magma.bodyExpressiveFont
    );
  });

  it('should render a paragraph with narrative styles', () => {
    const text = 'Test Paragraph';
    const { getByText } = render(
      <Paragraph contextVariant="narrative">{text}</Paragraph>
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
    const text5 = 'Test Paragraph 5';
    const text6 = 'Test Paragraph 6';
    const text7 = 'Test Paragraph 7';
    const text8 = 'Test Paragraph 8';
    const { getByText } = render(
      <>
        <Paragraph noMargins visualStyle="bodyLarge">
          {text1}
        </Paragraph>
        <Paragraph noMargins visualStyle="bodyMedium">
          {text2}
        </Paragraph>
        <Paragraph noMargins visualStyle="bodySmall">
          {text3}
        </Paragraph>
        <Paragraph noMargins visualStyle="bodyXSmall">
          {text4}
        </Paragraph>
        <Paragraph noBottomMargin noTopMargin visualStyle="bodyLarge">
          {text5}
        </Paragraph>
        <Paragraph noBottomMargin noTopMargin visualStyle="bodyMedium">
          {text6}
        </Paragraph>
        <Paragraph noBottomMargin noTopMargin visualStyle="bodySmall">
          {text7}
        </Paragraph>
        <Paragraph noBottomMargin noTopMargin visualStyle="bodyXSmall">
          {text8}
        </Paragraph>
      </>
    );

    expect(
      getByText(
        text1 || text2 || text3 || text4 || text5 || text6 || text7 || text8
      )
    ).toHaveStyleRule('margin', '0');
  });

  it('should render paragraphs with no top margin', () => {
    const text1 = 'Test Paragraph 1';
    const text2 = 'Test Paragraph 2';
    const text3 = 'Test Paragraph 3';
    const text4 = 'Test Paragraph 4';
    const { getByText } = render(
      <>
        <Paragraph noTopMargin visualStyle="bodyLarge">
          {text1}
        </Paragraph>
        <Paragraph noTopMargin visualStyle="bodyMedium">
          {text2}
        </Paragraph>
        <Paragraph noTopMargin visualStyle="bodySmall">
          {text3}
        </Paragraph>
        <Paragraph noTopMargin visualStyle="bodyXSmall">
          {text4}
        </Paragraph>
      </>
    );

    expect(getByText(text1)).toHaveStyleRule(
      'margin',
      `0 0 ${magma.spaceScale.spacing06} 0`
    );
    expect(getByText(text2)).toHaveStyleRule(
      'margin',
      `0 0 ${magma.spaceScale.spacing06} 0`
    );
    expect(getByText(text3)).toHaveStyleRule(
      'margin',
      `0 0 ${magma.spaceScale.spacing05} 0`
    );
    expect(getByText(text4)).toHaveStyleRule(
      'margin',
      `0 0 ${magma.spaceScale.spacing03} 0`
    );
  });

  it('should render paragraphs with no bottom margin', () => {
    const text1 = 'Test Paragraph 1';
    const text2 = 'Test Paragraph 2';
    const text3 = 'Test Paragraph 3';
    const text4 = 'Test Paragraph 4';
    const { getByText } = render(
      <>
        <Paragraph noBottomMargin visualStyle="bodyLarge">
          {text1}
        </Paragraph>
        <Paragraph noBottomMargin visualStyle="bodyMedium">
          {text2}
        </Paragraph>
        <Paragraph noBottomMargin visualStyle="bodySmall">
          {text3}
        </Paragraph>
        <Paragraph noBottomMargin visualStyle="bodyXSmall">
          {text4}
        </Paragraph>
      </>
    );

    expect(getByText(text1)).toHaveStyleRule(
      'margin',
      `${magma.spaceScale.spacing06} 0 0 0`
    );
    expect(getByText(text2)).toHaveStyleRule(
      'margin',
      `${magma.spaceScale.spacing06} 0 0 0`
    );
    expect(getByText(text3)).toHaveStyleRule(
      'margin',
      `${magma.spaceScale.spacing05} 0 0 0`
    );
    expect(getByText(text4)).toHaveStyleRule(
      'margin',
      `${magma.spaceScale.spacing03} 0 0 0`
    );
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Paragraph>test text</Paragraph>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
