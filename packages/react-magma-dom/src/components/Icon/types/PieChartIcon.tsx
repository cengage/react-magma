import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 24.96 28","paths":[{"d":"M12.25,15.75V3.5a12.24,12.24,0,1,0,11,6.77ZM25,6.77A12.25,12.25,0,0,0,14,0V12.25Z"}]}
  
  export const PieChartIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);