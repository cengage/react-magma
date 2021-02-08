import * as React from 'react';
import { IconProps } from '../../IconProps';
import { EventIcon } from '../Actions/EventIcon';
export const CalendarIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('CalendarIcon has been deprecated');
  }
  return <EventIcon {...props} />;
};
