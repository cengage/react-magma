import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M17 16.04l3.11 1.8C18.29 20.35 15.34 22 12 22c-1.4 0-2.72-.29-3.93-.8L17 16.04zm-5-2.89l3 1.74-8.93 5.14c-.84-.61-1.57-1.36-2.18-2.2L12 13.15zM6 4.01v10.3l-3.11 1.8C2.32 14.85 2 13.46 2 12c0-3.27 1.58-6.16 4-7.99zm7 3.95l8.93 5.16c-.12 1.05-.4 2.05-.82 2.98L13 11.42V7.96zm-2-5.91v9.37l-3 1.74V2.84c.93-.41 1.94-.68 3-.79zm2 0c4.66.46 8.37 4.13 8.92 8.76L13 5.65z',
    },
  ],
  circles: [],
};

export const SportsVolleyballIcon = (props: IconProps) =>
  renderIcon(props, iconType);
