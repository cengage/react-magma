import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 18.03","paths":[{"d":"M28,10,25.14,8.33a2.87,2.87,0,0,0,.05-.52,2.83,2.83,0,1,0-5,1.8l-4.89,8a3,3,0,0,0-1.16-.25,2.88,2.88,0,0,0-2,.87L8.49,15.07A2.74,2.74,0,0,0,8.7,14,2.83,2.83,0,1,0,3,14a2.86,2.86,0,0,0,.5,1.6L0,20.14l1.47,1.13L5,16.7a3,3,0,0,0,.85.13,2.76,2.76,0,0,0,1.4-.37l4,3.55c0,.06,0,.11,0,.17a2.84,2.84,0,1,0,5.67,0,2.87,2.87,0,0,0-.31-1.27l5.12-8.34a3,3,0,0,0,.61.06,2.86,2.86,0,0,0,1.87-.7l2.85,1.65L28,10Z","transform":"translate(0 -4.98)"}]}
  
  export const ExamIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);