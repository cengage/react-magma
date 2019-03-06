import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 26 22","paths":[{"d":"M26,9v4a.94.94,0,0,1-.3.7,1,1,0,0,1-.7.3H24a1,1,0,0,1-.7-.3A.94.94,0,0,1,23,13V9a4,4,0,0,0-4-4,4,4,0,0,0-4,4v3h1.5A1.5,1.5,0,0,1,18,13.5v9A1.5,1.5,0,0,1,16.5,24H1.5a1.44,1.44,0,0,1-1.06-.44A1.44,1.44,0,0,1,0,22.5v-9a1.44,1.44,0,0,1,.44-1.06A1.44,1.44,0,0,1,1.5,12H12V9a6.75,6.75,0,0,1,2.06-4.95A6.76,6.76,0,0,1,19,2a6.72,6.72,0,0,1,4.94,2.05A6.73,6.73,0,0,1,26,9Z","transform":"translate(0 -2)"}]}
  
  export const UnlockIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);