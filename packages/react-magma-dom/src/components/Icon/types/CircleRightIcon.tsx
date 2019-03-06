import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 28","paths":[{"d":"M14,0A14,14,0,1,0,28,14,14,14,0,0,0,14,0Zm0,25.38A11.38,11.38,0,1,1,25.38,14,11.39,11.39,0,0,1,14,25.38Z"},{"d":"M9.7,19.33l2.47,2.47L20,14l-7.8-7.8L9.7,8.68,15,14Z"}]}
  
  export const CircleRightIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);