import React from 'react';

import { render } from '@testing-library/react';

import { CardBody } from './CardBody';
import { CardHeading } from './CardHeading';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { Card, CardBorderRadius, CardCornerTreatment } from '.';

const TEXT = 'Test Text';

describe('Card', () => {
  it('should find elements by testId', () => {
    const testId = 'test-id';
    const testId2 = 'test-id2';
    const testId3 = 'test-id3';
    const { getByTestId } = render(
      <Card testId={testId}>
        <CardHeading testId={testId2}>Card Heading</CardHeading>
        <CardBody testId={testId3}>Card Body</CardBody>
      </Card>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(testId2)).toBeInTheDocument();
    expect(getByTestId(testId3)).toBeInTheDocument();
  });

  it('should render the card component with default styles', () => {
    const { getByText } = render(<Card>{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toBeInTheDocument();
    expect(card).toHaveStyleRule('box-shadow', '0 0 0');
    expect(card).toHaveStyleRule(
      'border',
      `1px solid ${magma.colors.neutral200}`
    );
    expect(card).toHaveStyleRule('padding-left', '0');
    expect(card).toHaveStyleRule('border-radius', '0 16px 16px 16px');
    expect(card).toHaveStyleRule('text-align', 'left');
    expect(card).toHaveStyleRule('width', 'auto');
  });

  it.each([
    [CardBorderRadius.none, '0px'],
    [CardBorderRadius.extraSmall, '4px'],
    [CardBorderRadius.small, '8px'],
    [CardBorderRadius.medium, '16px'],
    [CardBorderRadius.large, '24px'],
    [CardBorderRadius.extraLarge, '40px'],
  ])('should render the %s radius on all corners', (borderRadius, value) => {
    const { getByText } = render(
      <Card
        borderRadius={borderRadius}
        cornerTreatment={CardCornerTreatment.all}
      >
        {TEXT}
      </Card>
    );

    expect(getByText(TEXT)).toHaveStyleRule('border-radius', value);
  });

  it('should square both left callout corners by default', () => {
    const { getByText } = render(<Card calloutType="primary">{TEXT}</Card>);

    expect(getByText(TEXT)).toHaveStyleRule('border-radius', '0 16px 16px 0');
  });

  it('should keep both left callout corners square when all is selected', () => {
    const { getByText } = render(
      <Card calloutType="primary" cornerTreatment={CardCornerTreatment.all}>
        {TEXT}
      </Card>
    );

    expect(getByText(TEXT)).toHaveStyleRule('border-radius', '0 16px 16px 0');
  });

  it('should render the card component with a drop shadow', () => {
    const { getByText } = render(<Card hasDropShadow>{TEXT}</Card>);

    expect(getByText(TEXT)).toHaveStyleRule(
      'box-shadow',
      '0 2px 6px 0 rgba(0,0,0,0.18)'
    );
  });

  it('should render a callout stripe and drop shadow together', () => {
    const { getByText } = render(
      <Card calloutType="primary" hasDropShadow>
        {TEXT}
      </Card>
    );

    expect(getByText(TEXT)).toHaveStyleRule(
      'box-shadow',
      `inset 4px 0 0 0 ${magma.colors.brand.cyan},0 2px 6px 0 rgba(0,0,0,0.18)`
    );
  });

  it('should render the card body component', () => {
    const { getByText } = render(
      <Card>
        <CardBody>{TEXT}</CardBody>
      </Card>
    );

    const body = getByText(TEXT);

    expect(body).toHaveStyleRule('padding', magma.spaceScale.spacing05);
  });

  it('should render the card heading component', () => {
    const { container } = render(
      <Card>
        <CardHeading>{TEXT}</CardHeading>
      </Card>
    );

    const heading = container.querySelector('h4');

    expect(heading).toBeInTheDocument();
  });

  it('should render the card heading component with a custom heading level', () => {
    const { container } = render(
      <Card>
        <CardHeading headingLevel={2}>{TEXT}</CardHeading>
      </Card>
    );

    const heading = container.querySelector('h2');

    expect(heading).toBeInTheDocument();
  });

  it('should render the card component styled as a danger callout', () => {
    const { getByText } = render(<Card calloutType="danger">{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toHaveStyleRule('padding-left', magma.spaceScale.spacing03);
    expect(card).toHaveStyleRule(
      'box-shadow',
      `inset 4px 0 0 0 ${magma.colors.danger}`
    );
  });

  it('should render the card component styled as a primary callout', () => {
    const { getByText } = render(<Card calloutType="primary">{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toHaveStyleRule('padding-left', magma.spaceScale.spacing03);
    expect(card).toHaveStyleRule(
      'box-shadow',
      `inset 4px 0 0 0 ${magma.colors.brand.cyan}`
    );
  });

  it('should render the card component styled as a success callout', () => {
    const { getByText } = render(<Card calloutType="success">{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toHaveStyleRule('padding-left', magma.spaceScale.spacing03);
    expect(card).toHaveStyleRule(
      'box-shadow',
      `inset 4px 0 0 0 ${magma.colors.success}`
    );
  });

  it('should render the card component styled as a warning callout', () => {
    const { getByText } = render(<Card calloutType="warning">{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toHaveStyleRule('padding-left', magma.spaceScale.spacing03);
    expect(card).toHaveStyleRule(
      'box-shadow',
      `inset 4px 0 0 0 ${magma.colors.yellow400}`
    );
  });

  it('should render the card component with a custom width', () => {
    const { getByText } = render(<Card width="300px">{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toHaveStyleRule('width', '300px');
  });

  it('should render the card component with a custom background', () => {
    const { getByText } = render(<Card background="red">{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toHaveStyleRule('background', 'red');
  });

  it('should render the card component with inverse styles', () => {
    const { getByText } = render(<Card isInverse>{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toHaveStyleRule('background', magma.colors.neutral1100);
    expect(card).toHaveStyleRule(
      'border',
      `1px solid ${magma.colors.neutral800}`
    );
    expect(card).toHaveStyleRule('color', magma.colors.neutral0);
  });

  it.each([
    ['primary', magma.colors.brand.cyan],
    ['danger', magma.colors.red500],
    ['info', magma.colors.blue500],
    ['success', magma.colors.green500],
    ['warning', magma.colors.yellow400],
  ])(
    'should render an inverse %s callout with the rebrand color',
    (calloutType, color) => {
      const { getByText } = render(
        <Card calloutType={calloutType} isInverse>
          {TEXT}
        </Card>
      );

      expect(getByText(TEXT)).toHaveStyleRule(
        'box-shadow',
        `inset 4px 0 0 0 ${color}`
      );
    }
  );

  it('should render a card with right alignment', () => {
    const { getByText } = render(<Card align="right">{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toHaveStyleRule('text-align', 'right');
  });

  it('should render a card with center alignment', () => {
    const { getByText } = render(<Card align="center">{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toHaveStyleRule('text-align', 'center');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Card>{TEXT}</Card>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
