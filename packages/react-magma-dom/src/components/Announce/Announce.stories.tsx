import React from 'react';
import { Announce } from '.';
import { Button } from '../Button';
import { Meta } from '@storybook/react/types-6-0';

export default {
  component: Announce,
  title: 'Announce',
} as Meta;

export const Default = () => {
  const [announceContent, setAnnounceContent] = React.useState(
    'Initial content'
  );

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
