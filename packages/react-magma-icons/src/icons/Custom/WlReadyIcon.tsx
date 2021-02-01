import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M9.6206 11.0514h5.4308V5.6206H9.6206v5.4308zm9.0514 3.6206V2H6v19.9131h3.6206V14.672h1.8048L14.8414 22l3.883-.0869-3.3254-7.2411h3.273z',
    },
  ],
  circles: [],
};

export const WlReadyIcon = (props: IconProps) => renderIcon(props, iconType);
