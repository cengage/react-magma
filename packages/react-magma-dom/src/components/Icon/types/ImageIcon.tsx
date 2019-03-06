import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 24.5","paths":[{"d":"M26.25,3.5h0v21H1.75V3.5h24.5Zm0-1.75H1.75A1.76,1.76,0,0,0,0,3.5v21a1.76,1.76,0,0,0,1.75,1.75h24.5A1.76,1.76,0,0,0,28,24.5V3.5a1.76,1.76,0,0,0-1.75-1.75Z","transform":"translate(0 -1.75)"},{"d":"M22.75,7.88a2.63,2.63,0,1,1-2.63-2.63A2.62,2.62,0,0,1,22.75,7.88Z","transform":"translate(0 -1.75)"},{"d":"M24.5,22.75H3.5v-3.5L9.62,8.75l7,8.75h1.76l6.12-5.25Z","transform":"translate(0 -1.75)"}]}
  
  export const ImageIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);