import React from 'react';
import { Hyperlink } from '.';
import { ButtonColor, ButtonTextTransform } from '../Button';

export default {
  component: Hyperlink,
  title: 'Hyperlink',
};

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
