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
