import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 24.5","paths":[{"d":"M0,1.75H28v3.5H0ZM0,7H17.5v3.5H0ZM0,17.5H17.5V21H0Zm0-5.25H28v3.5H0Zm0,10.5H28v3.5H0Z","transform":"translate(0 -1.75)"}]}
  
  export const ParagraphLeftIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);