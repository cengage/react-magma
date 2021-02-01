import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M18.5952 10.1184C17.9328 6.8064 15.024 4.32 11.5296 4.32c-2.7744 0-5.184 1.5744-6.384 3.8784C2.256 8.5056.0096 10.9536.0096 13.92c0 3.1776 2.5824 5.76 5.76 5.76h12.48c2.6496 0 4.8-2.1504 4.8-4.8 0-2.5344-1.968-4.5888-4.4544-4.7616z',
    },
  ],
  circles: [],
};

export const WbCloudyIcon = (props: IconProps) => renderIcon(props, iconType);
