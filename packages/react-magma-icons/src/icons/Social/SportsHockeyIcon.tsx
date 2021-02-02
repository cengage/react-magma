import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M4 16v4H2v-3c0-.55.45-1 1-1h1zm5.86-1.94l1.59 3.48-.87 1.9c-.17.34-.51.55-.89.55L5 20v-4h4l.86-1.94zM21 16c.28 0 .53.11.71.29.18.18.29.43.29.71v3h-2v-4zM9.7 4L12 9.21l.05-.14.49-1.1L14.3 4h3.35l-4.05 8.84L15 16h4v4l-4.69-.01c-.38 0-.72-.21-.89-.55L12 16.34l-.08-.18-1.52-3.32L6.35 4H9.7z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const SportsHockeyIcon = (props: IconProps) =>
  renderIcon(props, iconType);
