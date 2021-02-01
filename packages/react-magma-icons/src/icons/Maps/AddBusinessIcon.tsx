import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M19 15c.55 0 1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2h-2c-.55 0-1-.45-1-1s.45-1 1-1h2v-2c0-.55.45-1 1-1zm-2.82-8c.48 0 .89.34.98.8l1 5c.12.62-.35 1.2-.98 1.2H17v3h-2v-3h-4v5c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1v-5h-.18c-.63 0-1.1-.58-.98-1.2l1-5c.09-.46.5-.8.98-.8zM9 14H4v4h5v-4zm7-10c.55 0 1 .45 1 1s-.45 1-1 1H3c-.55 0-1-.45-1-1s.45-1 1-1z',
    },
  ],
  circles: [],
};

export const AddBusinessIcon = (props: IconProps) =>
  renderIcon(props, iconType);
