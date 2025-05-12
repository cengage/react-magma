import React from 'react';

import {
  IconButton,
  Tooltip,
  ButtonVariant,
  TooltipPosition,
} from 'react-magma-dom';
import { BrightnessHighIcon, BrightnessMediumIcon } from 'react-magma-icons';

import { DarkModeContext } from './DarkModeContext';

export const DarkModeButton = () => {
  const { isDarkMode, setIsDarkMode } = React.useContext(DarkModeContext);

  function handleDarkModeClick() {
    localStorage.setItem('isRMDarkMode', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  }

  const icon = isDarkMode ? <BrightnessHighIcon /> : <BrightnessMediumIcon />;
  const label = isDarkMode ? 'Use light mode' : 'Use dark mode';

  return (
    <Tooltip content={label} position={TooltipPosition.left}>
      <IconButton
        aria-label={label}
        icon={icon}
        onClick={handleDarkModeClick}
        variant={ButtonVariant.link}
      />
    </Tooltip>
  );
};
