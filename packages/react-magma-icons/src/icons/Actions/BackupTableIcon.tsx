import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M21 6l.1162.0068C21.612 6.0648 22 6.4893 22 7v13c0 1.1-.9 2-2 2H7c-.55 0-1-.45-1-1l.0068-.1162C6.0648 20.388 6.4893 20 7 20h12c.55 0 1-.45 1-1V7c0-.55.45-1 1-1zm-5-4c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm-7 9H4v5h5v-5zm7 0h-5v5h5v-5zm0-7H4v5h12V4z',
    },
  ],
  circles: [],
};

export const BackupTableIcon = (props: IconProps) =>
  renderIcon(props, iconType);
