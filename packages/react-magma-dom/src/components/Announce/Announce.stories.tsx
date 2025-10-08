import React from 'react';

import { Meta } from '@storybook/react';

import { Button } from '../Button';

import { Announce } from '.';

export default {
  component: Announce,
  title: 'Announce',
} as Meta;

export const Default = () => {
  const [announceContent, setAnnounceContent] =
    React.useState('Initial content');

  return (
    <>
      <p>This content will be read by a screen reader when it changes.</p>
      <p>
        <Button
          onClick={() =>
            setAnnounceContent('New content replacing the initial content')
          }
        >
          Update content
        </Button>
      </p>
      <Announce>{announceContent}</Announce>
    </>
  );
};
