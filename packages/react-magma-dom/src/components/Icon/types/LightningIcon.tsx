import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 12.97 26.76","paths":[{"d":"M17.64,10.66l-5.71,1.1L14.27.62,4.67,17.34l5.71-1.1L8,27.38Z","transform":"translate(-4.67 -0.62)"}]}
  
  export const LightningIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);