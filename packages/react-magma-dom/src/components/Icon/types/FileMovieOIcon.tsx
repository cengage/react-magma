import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 24 28","paths":[{"d":"M22.94,5.94a3.69,3.69,0,0,1,.75,1.19A3.72,3.72,0,0,1,24,8.5v18A1.5,1.5,0,0,1,22.5,28H1.5a1.4,1.4,0,0,1-1.06-.44A1.44,1.44,0,0,1,0,26.5V1.5A1.44,1.44,0,0,1,.44.44,1.44,1.44,0,0,1,1.5,0h14a3.77,3.77,0,0,1,1.38.31,3.63,3.63,0,0,1,1.18.75ZM16,2.12V8h5.88a1.69,1.69,0,0,0-.35-.64L16.64,2.47A1.69,1.69,0,0,0,16,2.12ZM22,26V10H15.5A1.5,1.5,0,0,1,14,8.5V2H2V26ZM12,12a2,2,0,0,1,2,2v6a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V14a2,2,0,0,1,2-2Zm7.69,0a.46.46,0,0,1,.31.47v9a.46.46,0,0,1-.31.47l-.19,0a.51.51,0,0,1-.36-.14L15,17.7V16.3l4.14-4.16A.52.52,0,0,1,19.5,12Z","transform":"translate(0 0)"}]}
  
  export const FileMovieOIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);