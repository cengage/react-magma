import React from 'react';
import { Card, CardBody } from '../Card';
import { Hyperlink } from '.';
import { ButtonColor, ButtonTextTransform } from '../Button';

export default {
  component: Hyperlink,
  title: 'Hyperlink',
};

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
          <a href="https://www.google.com">This is a link that doesn't use Hyperlink</a>
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
