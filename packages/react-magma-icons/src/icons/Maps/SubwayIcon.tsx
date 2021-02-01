import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M12 2c1.86 0 4 .09 5.8.8C20.47 3.84 22 6.05 22 8.86V22H2V8.86C2 6.05 3.53 3.84 6.2 2.8 8 2.09 10.14 2 12 2zm.2195 4.0007h-.439C8.8555 6.0194 6 6.434 6 9v6.5c0 1.54 1.16 2.79 2.65 2.96L7.5 19.62V20h1.67l1.5-1.5h2.66l1.5 1.5h1.67v-.38l-1.15-1.16c1.49-.17 2.65-1.42 2.65-2.96V9c0-2.63-3-3-6-3zM8.5 15c.5523 0 1 .4477 1 1s-.4477 1-1 1-1-.4477-1-1 .4477-1 1-1zm7 0c.5523 0 1 .4477 1 1s-.4477 1-1 1-1-.4477-1-1 .4477-1 1-1zm1.51-6v5h-10V9h10z',
    },
  ],
  circles: [],
};

export const SubwayIcon = (props: IconProps) => renderIcon(props, iconType);
