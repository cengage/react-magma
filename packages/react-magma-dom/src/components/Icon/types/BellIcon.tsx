import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 21.17 23.56","paths":[{"d":"M21.9,10.31c0-4.8-5.34-6.49-5.34-6.49V2.22h-2v1.6S9.22,5.51,9.22,10.31,7,20.69,5,20.69v1.9h7.38a3.2,3.2,0,0,0,6.39,0h7.39v-1.9c-2,0-4.24-5.59-4.24-10.38Z","transform":"translate(-4.98 -2.22)"}]}
  
  export const BellIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);