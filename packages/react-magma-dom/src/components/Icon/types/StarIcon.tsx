import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 26 24.8","paths":[{"d":"M26,11.21a1.12,1.12,0,0,1-.4.75l-5.68,5.53,1.35,7.81a2.82,2.82,0,0,1,0,.32.9.9,0,0,1-.16.55.56.56,0,0,1-.48.23,1.23,1.23,0,0,1-.62-.19l-7-3.69L6,26.21a1.29,1.29,0,0,1-.63.19.57.57,0,0,1-.49-.23.9.9,0,0,1-.16-.55,2.67,2.67,0,0,1,0-.32l1.34-7.81L.39,12A1.19,1.19,0,0,1,0,11.21c0-.38.29-.62.88-.72L8.72,9.35l3.52-7.11c.19-.43.45-.64.76-.64s.57.21.77.64l3.51,7.11,7.85,1.14q.87.15.87.72Z","transform":"translate(0 -1.6)"}]}
  
  export const StarIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);