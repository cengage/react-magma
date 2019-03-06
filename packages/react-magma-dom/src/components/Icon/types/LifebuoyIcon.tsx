import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 28","paths":[{"d":"M14,0A14,14,0,1,0,28,14,14,14,0,0,0,14,0ZM8.75,14A5.25,5.25,0,1,1,14,19.25,5.25,5.25,0,0,1,8.75,14Zm16.57,4.69h0l-4.85-2a7,7,0,0,0,0-5.36l4.85-2a12.29,12.29,0,0,1,0,9.38Zm-6.63-16h0l-2,4.85a7,7,0,0,0-5.36,0l-2-4.85a12.29,12.29,0,0,1,9.38,0Zm-16,6.63,4.85,2a7,7,0,0,0,0,5.36l-4.85,2a12.29,12.29,0,0,1,0-9.38Zm6.63,16,2-4.85a7,7,0,0,0,5.36,0l2,4.85a12.29,12.29,0,0,1-9.38,0Z"}]}
  
  export const LifebuoyIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);