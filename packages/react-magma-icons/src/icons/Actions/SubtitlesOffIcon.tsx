import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M1.75 3.16c.39-.39 1.02-.39 1.41 0L20 20l.83.84c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L17.17 20H4c-1.1 0-2-.9-2-2V6c0-.34.09-.65.24-.94l-.49-.49a.9959.9959 0 010-1.41zM20 4c1.1 0 2 .9 2 2v12c0 .34-.09.65-.24.93L16.83 14H19c.55 0 1-.45 1-1s-.45-1-1-1h-4.17l-8-8zm-7 12H5c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1 0-.08-.03-.14-.05-.22l-.74-.74c-.07-.01-.13-.04-.21-.04zm-6-4H5c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1z',
    },
  ],
  circles: [],
};

export const SubtitlesOffIcon = (props: IconProps) =>
  renderIcon(props, iconType);
