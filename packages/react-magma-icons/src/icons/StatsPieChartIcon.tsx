import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 40 40',
  paths: [
    {
      d:
        'M19.9462012,22.0512821 L19.9462012,4.1025641 C10.0347707,4.1025641 2,12.1384615 2,22.0512821 C2,31.9641026 10.0347707,40 19.9462012,40 C29.8576318,40 37.8924025,31.9641026 37.8924025,22.0512821 C37.8924025,19.1653846 37.2104468,16.4384615 36.0003601,14.0230769 L19.9462012,22.0512821 Z M38.5641032,9.92051282 C35.6170805,4.03846154 29.5358821,0 22.5099443,0 L22.5099443,17.9487179 L38.5641032,9.92051282 Z',
    },
  ],
};

export const StatsPieChartIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
