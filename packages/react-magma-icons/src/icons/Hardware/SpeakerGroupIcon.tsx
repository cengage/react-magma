import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M5 5c.55 0 1 .45 1 1v14c0 .55.45 1 1 1h8c.55 0 1 .45 1 1s-.45 1-1 1H6c-1.11 0-2-.9-2-2V6c0-.55.45-1 1-1zm13.2-4c.99 0 1.8.81 1.8 1.8v14.4c0 .99-.81 1.8-1.8 1.8l-8.4-.01c-.99 0-1.8-.8-1.8-1.79V2.8C8 1.81 8.81 1 9.8 1zM14 8.5c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 1.5c1.3807 0 2.5 1.1193 2.5 2.5S15.3807 15 14 15s-2.5-1.1193-2.5-2.5S12.6193 10 14 10zm0-7c-1.1 0-2 .89-2 2 0 1.11.9 2 2 2s2-.89 2-2c0-1.11-.9-2-2-2z',
    },
  ],
  circles: [],
};

export const SpeakerGroupIcon = (props: IconProps) =>
  renderIcon(props, iconType);
