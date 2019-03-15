import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 28","paths":[{"d":"M14,0A13.91,13.91,0,0,0,0,14,13.91,13.91,0,0,0,14,28,13.91,13.91,0,0,0,28,14,13.91,13.91,0,0,0,14,0ZM11,19.9v-11h2.34V18h4.48V19.9Z"}]}
  
  export const LatePenaltyIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);