import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 22.8 28","paths":[{"d":"M22.29,14.84a6.37,6.37,0,0,1,3-5.33,6.54,6.54,0,0,0-5.12-2.77C18,6.52,15.94,8,14.83,8S12,6.77,10.21,6.8a6.89,6.89,0,0,0-5.79,3.51C2,14.6,3.79,21,6.2,24.42,7.37,26.12,8.77,28,10.61,28s2.45-1.14,4.59-1.14S18,28,19.82,27.93s3.12-1.73,4.29-3.44a15.84,15.84,0,0,0,1.94-4,6.18,6.18,0,0,1-3.76-5.67ZM18.76,4.44A6.17,6.17,0,0,0,20.22,0,6.24,6.24,0,0,0,16.1,2.09a5.86,5.86,0,0,0-1.49,4.33,5.19,5.19,0,0,0,4.15-2Z","transform":"translate(-3.25 0.03)"}]}
  
  export const AppleIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);