import React from 'react';
import {
  IconButton,
  Tooltip,
  ButtonVariant,
  TooltipPosition,
} from 'react-magma-dom';
import { BrightnessHighIcon, BrightnessMediumIcon } from 'react-magma-icons';

export const DarkModeToggle = props => {
  function handleClick() {
    props.onClick();
  }

  const icon = props.isDarkMode ? (
    <BrightnessHighIcon />
  ) : (
    <BrightnessMediumIcon />
  );
  const label = props.isDarkMode ? 'Use light theme' : 'Use dark theme';

  return (
    <Tooltip content={label} position={TooltipPosition.left}>
      <IconButton
        aria-label={label}
        isInverse
        icon={icon}
        onClick={handleClick}
        variant={ButtonVariant.link}
      />
    </Tooltip>
  );
};
