import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 16.54 26","paths":[{"d":"M5.35,12.77V5.71h7.06v7.06Zm11.77,4.7V1H.65V26.89h4.7V17.47H7.7L12.14,27l5.05-.11-4.32-9.42Z","transform":"translate(-0.65 -1)"}]}
  
  export const WlReadyIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);