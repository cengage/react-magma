import React from 'react';
import { Card, CardBody } from '../Card';
import { Hyperlink, HyperlinkIconPosition } from '.';
import { ButtonColor, ButtonTextTransform } from '../Button';
import { Meta } from '@storybook/react/types-6-0';
import {
  CakeIcon,
  CalendarTodayIcon,
  CheckCircleIcon,
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
  OpenInNewIcon,
} from 'react-magma-icons';
import { Paragraph } from '../Paragraph';
import { TypographyVisualStyle } from '../Typography';
import { Flex, FlexBehavior, FlexJustify } from '../Flex';
import { magma } from '../../theme/magma';

export default {
  component: Hyperlink,
  title: 'Hyperlink',
} as Meta;

export const Default = () => {
  return (
    <>
      <Card>
        <CardBody>
          <Hyperlink
            textTransform={ButtonTextTransform.none}
            styledAs="Button"
            target="_blank"
            to="https://www.google.com"
          >
            Google
          </Hyperlink>
          <Hyperlink
            color={ButtonColor.secondary}
            styledAs="Button"
            target="_blank"
            to="https://www.google.com"
          >
            Google
          </Hyperlink>
          <Hyperlink
            color={ButtonColor.danger}
            styledAs="Button"
            target="_blank"
            to="https://www.google.com"
          >
            Google
          </Hyperlink>
          <Hyperlink
            color={ButtonColor.marketing}
            styledAs="Button"
            target="_blank"
            to="https://www.google.com"
          >
            Google
          </Hyperlink>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Hyperlink
            textTransform={ButtonTextTransform.none}
            target="_blank"
            to="https://www.google.com"
          >
            Google
          </Hyperlink>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <a href="https://www.google.com">
            This is a link that does not use Hyperlink
          </a>
        </CardBody>
      </Card>
    </>
  );
};

export const NoUnderline = () => {
  return (
    <>
      <Card>
        <CardBody>
          <Flex
            behavior={FlexBehavior.container}
            justify={FlexJustify.spaceBetween}
          >
            <span style={{ flex: '0 0 auto' }}>
              <Hyperlink
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={<KeyboardArrowLeftIcon aria-hidden={true} />}
                iconPosition={HyperlinkIconPosition.left}
              >
                Follow this link
              </Hyperlink>
            </span>
            <span style={{ flex: '0 0 auto' }}>
              <Hyperlink
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={<KeyboardArrowRightIcon aria-hidden={true} />}
                iconPosition={HyperlinkIconPosition.right}
              >
                Follow this link
              </Hyperlink>
            </span>
          </Flex>
        </CardBody>
      </Card>
      <br />
      <Flex
        behavior={FlexBehavior.container}
        justify={FlexJustify.spaceBetween}
      >
        <Flex behavior={FlexBehavior.item}>
          <Card>
            <CardBody>
              <Hyperlink
                textTransform={ButtonTextTransform.none}
                styledAs="Button"
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={<KeyboardArrowRightIcon aria-hidden={true} />}
                iconPosition={HyperlinkIconPosition.right}
              >
                Back Button
              </Hyperlink>
              <br />
              <br />
              <Hyperlink
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={<CheckCircleIcon aria-hidden={true} />}
                iconPosition={HyperlinkIconPosition.left}
              >
                Powder apple pie sugar plum cupcake
              </Hyperlink>
              <br />
            </CardBody>
          </Card>
        </Flex>
        <Flex behavior={FlexBehavior.item}>
          <Card isInverse>
            <CardBody>
              <Hyperlink
                textTransform={ButtonTextTransform.none}
                styledAs="Button"
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                isInverse
                icon={<KeyboardArrowLeftIcon aria-hidden={true} />}
                iconPosition={HyperlinkIconPosition.left}
              >
                Back Button
              </Hyperlink>
              <br />
              <br />
              <Hyperlink
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                isInverse
                icon={<CheckCircleIcon aria-hidden={true} />}
                iconPosition={HyperlinkIconPosition.right}
              >
                Sweet roll cotton candy carrot cake
              </Hyperlink>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
      <br />
      <Card>
        <CardBody>
          <Paragraph visualStyle={TypographyVisualStyle.headingSmall}>
            Something something{' '}
            <Hyperlink
              textTransform={ButtonTextTransform.none}
              target="_blank"
              to="https://www.google.com"
              hasUnderline={false}
              icon={[
                <CalendarTodayIcon
                  key={0}
                  size={magma.iconSizes.xLarge}
                  style={{ marginRight: magma.spaceScale.spacing03 }}
                  aria-hidden={true}
                />,
                <OpenInNewIcon
                  key={1}
                  size={magma.iconSizes.xLarge}
                  style={{ marginLeft: magma.spaceScale.spacing03 }}
                  aria-hidden={true}
                />,
              ]}
              iconPosition={HyperlinkIconPosition.both}
            >
              Schedule an appointment
            </Hyperlink>{' '}
            Other things
          </Paragraph>
          <Paragraph visualStyle={TypographyVisualStyle.bodyLarge}>
            Something something{' '}
            <Hyperlink
              textTransform={ButtonTextTransform.none}
              target="_blank"
              to="https://www.google.com"
              hasUnderline={false}
              icon={[
                <CalendarTodayIcon
                  key={0}
                  size={magma.iconSizes.large}
                  aria-hidden={true}
                />,
                <OpenInNewIcon
                  key={1}
                  size={magma.iconSizes.large}
                  aria-hidden={true}
                />,
              ]}
              iconPosition={HyperlinkIconPosition.both}
            >
              Schedule an appointment
            </Hyperlink>{' '}
            Other things
          </Paragraph>
          <Paragraph visualStyle={TypographyVisualStyle.bodyMedium}>
            Something something{' '}
            <Hyperlink
              textTransform={ButtonTextTransform.none}
              target="_blank"
              to="https://www.google.com"
              hasUnderline={false}
              icon={[
                <CalendarTodayIcon
                  key={0}
                  size={magma.iconSizes.medium}
                  aria-hidden={true}
                />,
                <OpenInNewIcon
                  key={1}
                  size={magma.iconSizes.medium}
                  aria-hidden={true}
                />,
              ]}
              iconPosition={HyperlinkIconPosition.both}
            >
              Schedule an appointment
            </Hyperlink>{' '}
            Other things
          </Paragraph>
          <Paragraph visualStyle={TypographyVisualStyle.bodySmall}>
            Something something{' '}
            <Hyperlink
              textTransform={ButtonTextTransform.none}
              target="_blank"
              to="https://www.google.com"
              hasUnderline={false}
              icon={[
                <CalendarTodayIcon
                  key={0}
                  size={magma.iconSizes.small}
                  aria-hidden={true}
                />,
                <OpenInNewIcon
                  key={1}
                  size={magma.iconSizes.small}
                  aria-hidden={true}
                />,
              ]}
              iconPosition={HyperlinkIconPosition.both}
            >
              Schedule an appointment
            </Hyperlink>{' '}
            Other things
          </Paragraph>
          <Paragraph visualStyle={TypographyVisualStyle.bodyXSmall}>
            Something something{' '}
            <Hyperlink
              textTransform={ButtonTextTransform.none}
              target="_blank"
              to="https://www.google.com"
              hasUnderline={false}
              icon={[
                <CalendarTodayIcon
                  key={0}
                  size={magma.iconSizes.xSmall}
                  aria-hidden={true}
                />,
                <OpenInNewIcon
                  key={1}
                  size={magma.iconSizes.xSmall}
                  aria-hidden={true}
                />,
              ]}
              iconPosition={HyperlinkIconPosition.both}
            >
              Schedule an appointment
            </Hyperlink>{' '}
            Other things
          </Paragraph>
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardBody>
          Cupcake ipsum dolor sit amet wafer biscuit toffee. Chocolate bar
          brownie lemon drops tootsie roll pudding muffin powder pudding.{' '}
          <Hyperlink
            textTransform={ButtonTextTransform.none}
            target="_blank"
            to="https://www.cengage.com/"
            hasUnderline={false}
            icon={<CakeIcon size={magma.iconSizes.small} aria-hidden={true} />}
            iconPosition={HyperlinkIconPosition.left}
          >
            I love chocolate cake.
          </Hyperlink>{' '}
          Pastry dragée cheesecake chocolate bar donut jujubes candy canes sugar
          plum bonbon. Toffee pie macaroon apple pie gummi bears gummi bears
          shortbread.
        </CardBody>
      </Card>
      <br />
      <Card isInverse>
        <CardBody>
          Cupcake ipsum dolor sit amet wafer biscuit toffee. Chocolate bar
          brownie lemon drops tootsie roll pudding muffin powder pudding.{' '}
          <Hyperlink
            textTransform={ButtonTextTransform.none}
            target="_blank"
            to="https://www.cengage.com/"
            hasUnderline={false}
            isInverse
            icon={<CakeIcon aria-hidden={true} />}
            iconPosition={HyperlinkIconPosition.right}
          >
            I love chocolate cake
          </Hyperlink>{' '}
          Pastry dragée cheesecake chocolate bar donut jujubes candy canes sugar
          plum bonbon. Toffee pie macaroon apple pie gummi bears gummi bears
          shortbread.
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardBody>
          Cupcake ipsum dolor sit amet wafer biscuit toffee. Chocolate bar
          brownie lemon drops tootsie roll pudding muffin powder pudding.{' '}
          <a href="https://www.google.com">
            This is a link that does not use Hyperlink.
          </a>{' '}
          Pastry dragée cheesecake chocolate bar donut jujubes candy canes sugar
          plum bonbon. Toffee pie macaroon apple pie gummi bears gummi bears
          shortbread.
        </CardBody>
      </Card>
    </>
  );
};

export const Inverse = () => {
  return (
    <>
      <Card isInverse>
        <CardBody>
          <Hyperlink
            textTransform={ButtonTextTransform.none}
            styledAs="Button"
            target="_blank"
            to="https://www.google.com"
            isInverse
          >
            Google
          </Hyperlink>
          <Hyperlink
            color={ButtonColor.secondary}
            styledAs="Button"
            target="_blank"
            to="https://www.google.com"
            isInverse
          >
            Google
          </Hyperlink>
          <Hyperlink
            color={ButtonColor.danger}
            styledAs="Button"
            target="_blank"
            to="https://www.google.com"
            isInverse
          >
            Google
          </Hyperlink>
          <Hyperlink
            color={ButtonColor.marketing}
            styledAs="Button"
            target="_blank"
            to="https://www.google.com"
            isInverse
          >
            Google
          </Hyperlink>
        </CardBody>
      </Card>
      <Card isInverse>
        <CardBody>
          <Hyperlink
            textTransform={ButtonTextTransform.none}
            target="_blank"
            to="https://www.google.com"
            isInverse
          >
            Google
          </Hyperlink>
        </CardBody>
      </Card>
    </>
  );
};
