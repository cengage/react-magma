import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M19.59 10c.45 0 .83.26.97.66l1.43 4.11.01 5.24c-.01.55-.45.99-1 .99s-1-.45-1-1v-1h-8v1c0 .55-.45 1-1 1s-1-.44-1-.99v-5.24l1.42-4.11c.15-.4.52-.66.98-.66zM14 3c.55 0 1 .45 1 1v5h-1V4.5c0-.28-.22-.5-.5-.5h-5c-.28 0-.5.22-.5.5v4c0 .28-.22.5-.5.5h-4c-.28 0-.5.22-.5.5V21H2V9c0-.55.45-1 1-1h4V4c0-.55.45-1 1-1zM7 19v2H5v-2h2zm4.99-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm8 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM7 15v2H5v-2h2zm12.24-4h-6.48c-.22 0-.41.14-.46.34l-.69 2c-.11.32.13.66.47.66h7.85c.34 0 .58-.34.47-.66l-.69-2c-.07-.2-.26-.34-.47-.34zM7 11v2H5v-2h2zm5-6v2h-2V5h2z',
    },
  ],
  circles: [],
};

export const EmojiTransportationIcon = (props: IconProps) =>
  renderIcon(props, iconType);
