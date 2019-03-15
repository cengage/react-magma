import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 23.6 28","paths":[{"d":"M8.3,0C5.19,5.63,4.66,14.23,16.88,13.94V7l10.5,10.5L16.88,28V21.21C2.25,21.59.62,8.3,8.3,0Z","transform":"translate(-3.78)"}]}
  
  export const ForwardIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);