import React from 'react';

import { Meta } from '@storybook/react';
import {
  CalendarTodayIcon,
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
  OpenInNewIcon,
} from 'react-magma-icons';

import { magma } from '../../theme/magma';
import { ButtonColor, ButtonTextTransform } from '../Button';
import { Card, CardBody } from '../Card';
import { Flex, FlexBehavior, FlexJustify } from '../Flex';
import { Paragraph } from '../Paragraph';
import { Spacer, SpacerAxis } from '../Spacer';
import { TypographyVisualStyle } from '../Typography';

import { Hyperlink, HyperlinkIconPosition } from '.';

export default {
  component: Hyperlink,
  title: 'Hyperlink',
  argTypes: {
    iconPosition: {
      control: {
        type: 'select',
        options: HyperlinkIconPosition,
      },
    },
    styledAs: {
      control: {
        type: 'select',
        options: ['Button', 'Link'],
      },
    },
  },
} as Meta;

export const Default = {
  render: args => {
    const { iconPosition } = args;

    return (
      <>
        <Hyperlink
          target="_blank"
          {...args}
          icon={
            iconPosition === HyperlinkIconPosition.both
              ? [args.icon, <KeyboardArrowLeftIcon aria-hidden key={0} />]
              : args.icon
          }
        >
          Next
        </Hyperlink>
      </>
    );
  },

  args: {
    styledAs: 'Link',
    isInverse: false,
    to: 'https://www.google.com',
    hasUnderline: false,
    icon: <KeyboardArrowRightIcon aria-hidden />,
    iconPosition: HyperlinkIconPosition.right,
  },
};

export const All = {
  render: args => {
    return (
      <>
        <Card>
          <CardBody>
            <Hyperlink
              textTransform={ButtonTextTransform.none}
              target="_blank"
              to="https://www.google.com"
            >
              Google
            </Hyperlink>
            <Spacer size={'8px'} axis={SpacerAxis.horizontal} />
            <Hyperlink
              color={ButtonColor.marketing}
              styledAs="Button"
              target="_blank"
              to="https://www.google.com"
            >
              Google
            </Hyperlink>
            <Spacer size={'8px'} axis={SpacerAxis.horizontal} />
            <Hyperlink
              styledAs="Button"
              target="_blank"
              to="https://www.google.com"
              icon={<KeyboardArrowLeftIcon aria-hidden />}
              iconPosition={HyperlinkIconPosition.left}
            >
              Back
            </Hyperlink>
            <Spacer size={'8px'} axis={SpacerAxis.horizontal} />
            <Hyperlink
              color={ButtonColor.danger}
              styledAs="Button"
              target="_blank"
              to="https://www.google.com"
              icon={[
                <KeyboardArrowLeftIcon aria-hidden key={0} />,
                <KeyboardArrowRightIcon aria-hidden key={1} />,
              ]}
              iconPosition={HyperlinkIconPosition.both}
            >
              Guess
            </Hyperlink>
            <Spacer size={'8px'} axis={SpacerAxis.horizontal} />
            <Hyperlink
              color={ButtonColor.secondary}
              styledAs="Button"
              target="_blank"
              to="https://www.google.com"
              icon={<KeyboardArrowRightIcon aria-hidden />}
              iconPosition={HyperlinkIconPosition.right}
            >
              Next
            </Hyperlink>
          </CardBody>
        </Card>
        <Spacer size={'12px'} />
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
                  to="#"
                  hasUnderline={false}
                  icon={<KeyboardArrowLeftIcon aria-hidden />}
                  iconPosition={HyperlinkIconPosition.left}
                >
                  Brownie
                </Hyperlink>
              </span>
              <span style={{ flex: '0 0 auto' }}>
                <Hyperlink
                  textTransform={ButtonTextTransform.none}
                  target="_blank"
                  to="#"
                  hasUnderline={false}
                  icon={<KeyboardArrowRightIcon aria-hidden />}
                  iconPosition={HyperlinkIconPosition.right}
                >
                  Muffin
                </Hyperlink>
              </span>
            </Flex>
          </CardBody>
        </Card>
        <Spacer size={'12px'} />
        <Card>
          <CardBody>
            <p>
              Cupcake ipsum dolor sit amet wafer biscuit toffee. Chocolate bar
              brownie lemon drops tootsie roll pudding muffin powder pudding.{' '}
              <Hyperlink
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.cengage.com/"
                icon={
                  <OpenInNewIcon size={magma.iconSizes.small} aria-hidden />
                }
                iconPosition={HyperlinkIconPosition.right}
              >
                I love chocolate cake
              </Hyperlink>{' '}
              Pastry dragée cheesecake chocolate bar donut jujubes candy canes
              sugar plum bonbon. Toffee pie macaroon{' '}
              <Hyperlink target="_blank" to="https://www.apple.com/">
                apple
              </Hyperlink>{' '}
              pie gummi bears gummi bears shortbread.
            </p>
          </CardBody>
        </Card>
        <Spacer size={'12px'} />
        <Card>
          <CardBody>
            Apple pie danish apple pie tootsie roll tiramisu dessert danish.{' '}
            <a href="https://www.google.com">
              This is a link that does not use Hyperlink.
            </a>{' '}
            Marzipan candy danish chupa chups icing jelly-o danish halvah jelly.
            Cake dragée candy canes liquorice cheesecake tootsie roll danish.
          </CardBody>
        </Card>
        <Spacer size={'12px'} />
        <Card>
          <CardBody>
            <Paragraph
              visualStyle={TypographyVisualStyle.headingSmall}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              You can{' '}
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
                    aria-hidden
                  />,
                  <OpenInNewIcon
                    key={1}
                    size={magma.iconSizes.xLarge}
                    style={{ marginLeft: magma.spaceScale.spacing03 }}
                    aria-hidden
                  />,
                ]}
                iconPosition={HyperlinkIconPosition.both}
                style={{ margin: `0 ${magma.spaceScale.spacing03}` }}
              >
                schedule an appointment
              </Hyperlink>{' '}
              to meet with us.
            </Paragraph>
            <Spacer size={'8px'} axis={SpacerAxis.vertical} />
            <Paragraph
              visualStyle={TypographyVisualStyle.bodyLarge}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              You can{' '}
              <Hyperlink
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={[
                  <CalendarTodayIcon
                    key={0}
                    size={magma.iconSizes.large}
                    aria-hidden
                  />,
                  <OpenInNewIcon
                    key={1}
                    size={magma.iconSizes.large}
                    aria-hidden
                  />,
                ]}
                iconPosition={HyperlinkIconPosition.both}
                style={{ margin: `0 ${magma.spaceScale.spacing03}` }}
              >
                schedule an appointment
              </Hyperlink>{' '}
              to meet with us.
            </Paragraph>
            <Spacer size={'8px'} axis={SpacerAxis.vertical} />
            <Paragraph
              visualStyle={TypographyVisualStyle.bodyMedium}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              You can{' '}
              <Hyperlink
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={[
                  <CalendarTodayIcon
                    key={0}
                    size={magma.iconSizes.medium}
                    aria-hidden
                  />,
                  <OpenInNewIcon
                    key={1}
                    size={magma.iconSizes.medium}
                    aria-hidden
                  />,
                ]}
                iconPosition={HyperlinkIconPosition.both}
                style={{ margin: `0 ${magma.spaceScale.spacing03}` }}
              >
                schedule an appointment
              </Hyperlink>{' '}
              to meet with us.
            </Paragraph>
            <Spacer size={'8px'} axis={SpacerAxis.vertical} />
            <Paragraph
              visualStyle={TypographyVisualStyle.bodySmall}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              You can{' '}
              <Hyperlink
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={[
                  <CalendarTodayIcon
                    key={0}
                    size={magma.iconSizes.small}
                    aria-hidden
                  />,
                  <OpenInNewIcon
                    key={1}
                    size={magma.iconSizes.small}
                    aria-hidden
                  />,
                ]}
                iconPosition={HyperlinkIconPosition.both}
                style={{ margin: `0 ${magma.spaceScale.spacing03}` }}
              >
                schedule an appointment
              </Hyperlink>{' '}
              to meet with us.
            </Paragraph>
            <Spacer size={'8px'} axis={SpacerAxis.vertical} />
            <Paragraph
              visualStyle={TypographyVisualStyle.bodyXSmall}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              You can{' '}
              <Hyperlink
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={[
                  <CalendarTodayIcon
                    key={0}
                    size={magma.iconSizes.xSmall}
                    aria-hidden
                  />,
                  <OpenInNewIcon
                    key={1}
                    size={magma.iconSizes.xSmall}
                    aria-hidden
                  />,
                ]}
                iconPosition={HyperlinkIconPosition.both}
                style={{ margin: `0 ${magma.spaceScale.spacing03}` }}
              >
                schedule an appointment
              </Hyperlink>{' '}
              to meet with us.
            </Paragraph>
          </CardBody>
        </Card>
      </>
    );
  },

  args: {},
  parameters: { controls: { exclude: ['iconPosition', 'styledAs'] } },
};

export const Inverse = {
  render: args => {
    return (
      <>
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
            <Spacer size={'8px'} axis={SpacerAxis.horizontal} />
            <Hyperlink
              color={ButtonColor.marketing}
              styledAs="Button"
              target="_blank"
              to="https://www.google.com"
              isInverse
            >
              Google
            </Hyperlink>
            <Spacer size={'8px'} axis={SpacerAxis.horizontal} />
            <Hyperlink
              styledAs="Button"
              target="_blank"
              to="https://www.google.com"
              isInverse
              hasUnderline={false}
              icon={<KeyboardArrowLeftIcon aria-hidden />}
              iconPosition={HyperlinkIconPosition.left}
            >
              Back
            </Hyperlink>
            <Spacer size={'8px'} axis={SpacerAxis.horizontal} />
            <Hyperlink
              color={ButtonColor.danger}
              styledAs="Button"
              target="_blank"
              to="https://www.google.com"
              isInverse
              hasUnderline={false}
              icon={[
                <KeyboardArrowLeftIcon aria-hidden key={0} />,
                <KeyboardArrowRightIcon aria-hidden key={1} />,
              ]}
              iconPosition={HyperlinkIconPosition.both}
            >
              Guess
            </Hyperlink>
            <Spacer size={'8px'} axis={SpacerAxis.horizontal} />
            <Hyperlink
              color={ButtonColor.secondary}
              styledAs="Button"
              target="_blank"
              to="https://www.google.com"
              hasUnderline={false}
              isInverse
              icon={<KeyboardArrowRightIcon aria-hidden />}
              iconPosition={HyperlinkIconPosition.right}
            >
              Next
            </Hyperlink>
          </CardBody>
        </Card>
        <Spacer size={'12px'} />
        <Card isInverse>
          <CardBody>
            <Flex
              behavior={FlexBehavior.container}
              justify={FlexJustify.spaceBetween}
            >
              <span style={{ flex: '0 0 auto' }}>
                <Hyperlink
                  textTransform={ButtonTextTransform.none}
                  target="_blank"
                  to="#"
                  hasUnderline={false}
                  icon={<KeyboardArrowLeftIcon aria-hidden />}
                  iconPosition={HyperlinkIconPosition.left}
                  isInverse
                >
                  Brownie
                </Hyperlink>
              </span>
              <span style={{ flex: '0 0 auto' }}>
                <Hyperlink
                  textTransform={ButtonTextTransform.none}
                  target="_blank"
                  to="#"
                  hasUnderline={false}
                  icon={<KeyboardArrowRightIcon aria-hidden />}
                  iconPosition={HyperlinkIconPosition.right}
                  isInverse
                >
                  Muffin
                </Hyperlink>
              </span>
            </Flex>
          </CardBody>
        </Card>
        <Spacer size={'12px'} />
        <Card isInverse>
          <CardBody>
            <p>
              Cupcake ipsum dolor sit amet wafer biscuit toffee. Chocolate bar
              brownie lemon drops tootsie roll pudding muffin powder pudding.{' '}
              <Hyperlink
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.cengage.com/"
                icon={
                  <OpenInNewIcon size={magma.iconSizes.small} aria-hidden />
                }
                iconPosition={HyperlinkIconPosition.right}
                isInverse
              >
                I love chocolate cake
              </Hyperlink>{' '}
              Pastry dragée cheesecake chocolate bar donut jujubes candy canes
              sugar plum bonbon. Toffee pie macaroon{' '}
              <Hyperlink target="_blank" to="https://www.apple.com/" isInverse>
                apple
              </Hyperlink>{' '}
              pie gummi bears gummi bears shortbread.
            </p>
          </CardBody>
        </Card>
        <Spacer size={'12px'} />
        <Card isInverse>
          <CardBody>
            <Paragraph
              visualStyle={TypographyVisualStyle.headingSmall}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
              isInverse
            >
              You can{' '}
              <Hyperlink
                isInverse
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={[
                  <CalendarTodayIcon
                    key={0}
                    size={magma.iconSizes.xLarge}
                    style={{ marginRight: magma.spaceScale.spacing03 }}
                    aria-hidden
                  />,
                  <OpenInNewIcon
                    key={1}
                    size={magma.iconSizes.xLarge}
                    style={{ marginLeft: magma.spaceScale.spacing03 }}
                    aria-hidden
                  />,
                ]}
                iconPosition={HyperlinkIconPosition.both}
                style={{ margin: `0 ${magma.spaceScale.spacing03}` }}
              >
                schedule an appointment
              </Hyperlink>{' '}
              to meet with us.
            </Paragraph>
            <Spacer size={'8px'} axis={SpacerAxis.vertical} />
            <Paragraph
              visualStyle={TypographyVisualStyle.bodyLarge}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
              isInverse
            >
              You can{' '}
              <Hyperlink
                isInverse
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={[
                  <CalendarTodayIcon
                    key={0}
                    size={magma.iconSizes.large}
                    aria-hidden
                  />,
                  <OpenInNewIcon
                    key={1}
                    size={magma.iconSizes.large}
                    aria-hidden
                  />,
                ]}
                iconPosition={HyperlinkIconPosition.both}
                style={{ margin: `0 ${magma.spaceScale.spacing03}` }}
              >
                schedule an appointment
              </Hyperlink>{' '}
              to meet with us.
            </Paragraph>
            <Spacer size={'8px'} axis={SpacerAxis.vertical} />
            <Paragraph
              visualStyle={TypographyVisualStyle.bodyMedium}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
              isInverse
            >
              You can{' '}
              <Hyperlink
                isInverse
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={[
                  <CalendarTodayIcon
                    key={0}
                    size={magma.iconSizes.medium}
                    aria-hidden
                  />,
                  <OpenInNewIcon
                    key={1}
                    size={magma.iconSizes.medium}
                    aria-hidden
                  />,
                ]}
                iconPosition={HyperlinkIconPosition.both}
                style={{ margin: `0 ${magma.spaceScale.spacing03}` }}
              >
                schedule an appointment
              </Hyperlink>{' '}
              to meet with us.
            </Paragraph>
            <Spacer size={'8px'} axis={SpacerAxis.vertical} />
            <Paragraph
              visualStyle={TypographyVisualStyle.bodySmall}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
              isInverse
            >
              You can{' '}
              <Hyperlink
                isInverse
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={[
                  <CalendarTodayIcon
                    key={0}
                    size={magma.iconSizes.small}
                    aria-hidden
                  />,
                  <OpenInNewIcon
                    key={1}
                    size={magma.iconSizes.small}
                    aria-hidden
                  />,
                ]}
                iconPosition={HyperlinkIconPosition.both}
                style={{ margin: `0 ${magma.spaceScale.spacing03}` }}
              >
                schedule an appointment
              </Hyperlink>{' '}
              to meet with us.
            </Paragraph>
            <Spacer size={'8px'} axis={SpacerAxis.vertical} />
            <Paragraph
              isInverse
              visualStyle={TypographyVisualStyle.bodyXSmall}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              You can{' '}
              <Hyperlink
                isInverse
                textTransform={ButtonTextTransform.none}
                target="_blank"
                to="https://www.google.com"
                hasUnderline={false}
                icon={[
                  <CalendarTodayIcon
                    key={0}
                    size={magma.iconSizes.xSmall}
                    aria-hidden
                  />,
                  <OpenInNewIcon
                    key={1}
                    size={magma.iconSizes.xSmall}
                    aria-hidden
                  />,
                ]}
                iconPosition={HyperlinkIconPosition.both}
                style={{ margin: `0 ${magma.spaceScale.spacing03}` }}
              >
                schedule an appointment
              </Hyperlink>{' '}
              to meet with us.
            </Paragraph>
          </CardBody>
        </Card>
      </>
    );
  },

  args: {},
  parameters: { controls: { exclude: ['iconPosition', 'styledAs'] } },
};
