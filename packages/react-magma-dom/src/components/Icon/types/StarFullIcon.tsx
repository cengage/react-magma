import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 26.63","paths":[{"d":"M28,10.86,18.33,9.45,14,.69,9.67,9.45,0,10.86l7,6.82L5.35,27.32,14,22.77l8.65,4.55L21,17.68Z","transform":"translate(0 -0.69)"}]}
  
  export const StarFullIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);