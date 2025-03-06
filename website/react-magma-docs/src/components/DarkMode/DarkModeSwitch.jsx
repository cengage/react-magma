import React from 'react';

import { Toggle } from 'react-magma-dom';

import { DarkModeContext } from './DarkModeContext';

export const DarkModeSwitch = () => {
  const { isDarkMode, setIsDarkMode } = React.useContext(DarkModeContext);

  function handleDarkModeClick() {
    localStorage.setItem('isRMDarkMode', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  }

  return (
    <Toggle
      labelText="Use dark mode"
      checked={isDarkMode}
      onClick={handleDarkModeClick}
    />
  );
};
