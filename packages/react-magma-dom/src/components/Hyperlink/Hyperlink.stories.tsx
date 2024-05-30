import React from 'react';
import { Card, CardBody } from '../Card';
import { Hyperlink, HyperlinkIconPosition } from '.';
import { ButtonColor, ButtonTextTransform } from '../Button';
import { Meta } from '@storybook/react/types-6-0';
import { CalendarIcon, CheckCircleIcon, KeyboardArrowLeftIcon, KeyboardArrowRightIcon } from 'react-magma-icons';

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
        <Hyperlink
            textTransform={ButtonTextTransform.none}
            styledAs="Button"
            target="_blank"
            to="https://www.google.com"
            hasUnderline={false}
            icon={<KeyboardArrowRightIcon />}
            iconPosition={HyperlinkIconPosition.right}
            >
            Google as Button
          </Hyperlink>
          <br />
          <br />

          <Hyperlink
            textTransform={ButtonTextTransform.none}
            target="_blank"
            to="https://www.google.com"
            hasUnderline={false}
            icon={<CheckCircleIcon />}
            iconPosition={HyperlinkIconPosition.left}
          >
            Google
          </Hyperlink>
          <br />
          <br />
          <Hyperlink
            textTransform={ButtonTextTransform.none}
            target="_blank"
            to="https://www.google.com"
            hasUnderline={false}
            icon={<CalendarIcon />}
            iconPosition={HyperlinkIconPosition.both}
          >
            Schedule an appointment
          </Hyperlink>
        </CardBody>
      </Card>
      <br/>
      <Card isInverse>
        <CardBody>
        <Hyperlink
            textTransform={ButtonTextTransform.none}
            styledAs="Button"
            target="_blank"
            to="https://www.google.com"
            hasUnderline={false}
            isInverse
            icon={<KeyboardArrowLeftIcon />}
            iconPosition={HyperlinkIconPosition.left}
          >
            Google as Button
          </Hyperlink>
          <br/>
          <br/>
          <Hyperlink
            textTransform={ButtonTextTransform.none}
            target="_blank"
            to="https://www.google.com"
            hasUnderline={false}
            isInverse
            icon={<CheckCircleIcon />}
            iconPosition={HyperlinkIconPosition.right}
          >
            Google
          </Hyperlink>
        </CardBody>
      </Card>
      <br/>
      
      <Card>
        <CardBody>
        Cupcake ipsum dolor sit amet wafer biscuit toffee. Chocolate bar brownie lemon drops tootsie roll pudding muffin powder pudding. <Hyperlink
            textTransform={ButtonTextTransform.none}
            target="_blank"
            to="https://www.cengage.com/"
            hasUnderline={false}
          >
            I love chocolate cake.
          </Hyperlink> Pastry dragée cheesecake chocolate bar donut jujubes candy canes sugar plum bonbon. Toffee pie macaroon apple pie gummi bears gummi bears shortbread.
        </CardBody>
      </Card>
      <br/>
      <Card isInverse>
        <CardBody>
        Cupcake ipsum dolor sit amet wafer biscuit toffee. Chocolate bar brownie lemon drops tootsie roll pudding muffin powder pudding. <Hyperlink
            textTransform={ButtonTextTransform.none}
            target="_blank"
            to="https://www.cengage.com/"
            hasUnderline={false}
            isInverse
          >
            I love chocolate cake.
          </Hyperlink> Pastry dragée cheesecake chocolate bar donut jujubes candy canes sugar plum bonbon. Toffee pie macaroon apple pie gummi bears gummi bears shortbread.
        </CardBody>
      </Card>
      <br/>
      <Card>
        <CardBody>
        Cupcake ipsum dolor sit amet wafer biscuit toffee. Chocolate bar brownie lemon drops tootsie roll pudding muffin powder pudding. <a href="https://www.google.com">
            This is a link that does not use Hyperlink.
          </a> Pastry dragée cheesecake chocolate bar donut jujubes candy canes sugar plum bonbon. Toffee pie macaroon apple pie gummi bears gummi bears shortbread.
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
