import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 16.55 26","paths":[{"d":"M5.38,12.82V5.73h7.09v7.09ZM.65,27H5.37V17.55H17.19V1H.65Z","transform":"translate(-0.65 -1)"}]}
  
  export const WlPracticeItIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);