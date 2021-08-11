import React from 'react';
import { Card, CardBody } from '../Card';
import { Hyperlink } from '.';
import { ButtonColor, ButtonTextTransform } from '../Button';
import { Meta } from '@storybook/react';

const meta: Meta = {
  component: Hyperlink,
  title: 'Hyperlink',
};

export default meta;

export const Default = () => {
  return (
    <>
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
        color={ButtonColor.success}
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
    </>
  );
};

export const Inverse = () => {
  return (
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
  );
};
