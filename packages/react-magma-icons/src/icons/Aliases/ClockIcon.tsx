import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ScheduleIcon } from '../Actions/ScheduleIcon';
export const ClockIcon = (props: IconProps) => {
  console.warn('ClockIcon has been deprecated');
  return <ScheduleIcon {...props} />;
};
