import React from 'react';
import { axe } from '../../../axe-helper';
import { Card } from '.';
import { CardBody } from './CardBody';
import { CardHeading } from './CardHeading';
import { magma } from '../../theme/magma';
import { render } from '@testing-library/react';

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
    expect(card).toHaveStyleRule('padding-left', '0');
    expect(card).toHaveStyleRule('text-align', 'left');
    expect(card).toHaveStyleRule('width', 'auto');
  });

  it('should render the card component with a drop shadow', () => {
    const { getByText } = render(<Card hasDropShadow>{TEXT}</Card>);

    expect(getByText(TEXT)).toHaveStyleRule(
      'box-shadow',
      '0 2px 6px 0 rgba(0,0,0,0.18)'
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

    expect(card).toHaveStyleRule('padding-left', magma.spaceScale.spacing02);
    expect(card).toHaveStyleRule('background', magma.colors.danger, {
      target: ':before',
    });
  });

  it('should render the card component styled as a primary callout', () => {
    const { getByText } = render(<Card calloutType="primary">{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toHaveStyleRule('padding-left', magma.spaceScale.spacing02);
    expect(card).toHaveStyleRule('background', magma.colors.primary600, {
      target: ':before',
    });
  });

  it('should render the card component styled as a success callout', () => {
    const { getByText } = render(<Card calloutType="success">{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toHaveStyleRule('padding-left', magma.spaceScale.spacing02);
    expect(card).toHaveStyleRule('background', magma.colors.success, {
      target: ':before',
    });
  });

  it('should render the card component styled as a warning callout', () => {
    const { getByText } = render(<Card calloutType="warning">{TEXT}</Card>);

    const card = getByText(TEXT);

    expect(card).toHaveStyleRule('padding-left', magma.spaceScale.spacing02);
    expect(card).toHaveStyleRule('background', magma.colors.warning, {
      target: ':before',
    });
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

    expect(card).toHaveStyleRule('background', magma.colors.primary600);
    expect(card).toHaveStyleRule('color', magma.colors.neutral100);
  });

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
