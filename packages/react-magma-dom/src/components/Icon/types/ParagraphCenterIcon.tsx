import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 24.5","paths":[{"d":"M0,1.75H28v3.5H0ZM5.25,7h17.5v3.5H5.25Zm0,10.5h17.5V21H5.25ZM0,12.25H28v3.5H0Zm0,10.5H28v3.5H0Z","transform":"translate(0 -1.75)"}]}
  
  export const ParagraphCenterIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);