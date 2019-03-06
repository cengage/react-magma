import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 23.67 23.67","paths":[{"d":"M5.84,23.84l1.42-1.43L3.59,18.74,2.16,20.16v1.68h2v2ZM14,9.34A.31.31,0,0,0,13.66,9a.36.36,0,0,0-.26.11L4.93,17.57a.37.37,0,0,0-.11.27.3.3,0,0,0,.34.34.37.37,0,0,0,.27-.11L13.9,9.6A.36.36,0,0,0,14,9.34Zm-.85-3,6.5,6.5-13,13H.16v-6.5Zm10.68,1.5a1.92,1.92,0,0,1-.58,1.4l-2.6,2.6-6.5-6.5,2.6-2.58a1.83,1.83,0,0,1,1.4-.6,1.94,1.94,0,0,1,1.43.6l3.67,3.65A2,2,0,0,1,23.84,7.84Z","transform":"translate(-0.16 -2.16)"}]}
  
  export const Pencil3Icon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);