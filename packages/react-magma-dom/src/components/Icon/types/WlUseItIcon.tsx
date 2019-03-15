import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 26 26","paths":[{"d":"M21.22,21.22H6.78V1H1V27H27V1H21.22Z","transform":"translate(-1 -1)"}]}
  
  export const WlUseItIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);