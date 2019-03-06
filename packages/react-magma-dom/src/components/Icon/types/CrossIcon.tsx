import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 28","paths":[{"d":"M27.75,22.5h0L19.25,14l8.49-8.49h0a.75.75,0,0,0,.2-.31.87.87,0,0,0-.2-.93l-4-4a.86.86,0,0,0-.92-.2.91.91,0,0,0-.32.2h0L14,8.75,5.51.26h0a.83.83,0,0,0-.32-.2.86.86,0,0,0-.92.2l-4,4a.88.88,0,0,0,0,1.24h0L8.75,14,.26,22.5h0a.79.79,0,0,0-.2.31.86.86,0,0,0,.2.92l4,4a.88.88,0,0,0,.92.2,1,1,0,0,0,.32-.2h0L14,19.25l8.49,8.49h0a.78.78,0,0,0,.32.2.86.86,0,0,0,.92-.2l4-4a.86.86,0,0,0,.2-.92A.77.77,0,0,0,27.75,22.5Z","transform":"translate(0 0)"}]}
  
  export const CrossIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);