import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 28","paths":[{"d":"M0,14A14,14,0,1,0,14,0,14,14,0,0,0,0,14Zm25.38,0A11.38,11.38,0,1,1,14,2.62,11.39,11.39,0,0,1,25.38,14Z"},{"d":"M19.33,18.3l2.47-2.48L14,8l-7.8,7.8L8.68,18.3,14,13Z"}]}
  
  export const CircleUpIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);