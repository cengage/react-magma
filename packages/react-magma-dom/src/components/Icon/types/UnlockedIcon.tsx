import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 26.25 26.25","paths":[{"d":"M21.88.88a5.25,5.25,0,0,1,5.24,5.24v5.26h-3.5V6.12a1.74,1.74,0,0,0-1.74-1.74h-3.5a1.75,1.75,0,0,0-1.76,1.74v5.26h.44a1.32,1.32,0,0,1,1.32,1.31V25.81a1.33,1.33,0,0,1-1.32,1.32H2.19A1.33,1.33,0,0,1,.87,25.81V12.69a1.32,1.32,0,0,1,1.32-1.31H13.13V6.12A5.25,5.25,0,0,1,18.38.88Z","transform":"translate(-0.87 -0.88)"}]}
  
  export const UnlockedIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);