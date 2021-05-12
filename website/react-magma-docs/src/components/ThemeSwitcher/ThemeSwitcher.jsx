import React from 'react';
import { Select, ThemeContext, magma, ngl } from 'react-magma-dom';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  function handleItemChange(changes) {
    const themeString = changes.selectedItem.value === magma ? 'magma' : 'ngl';

    localStorage.setItem('rmTheme', themeString);
    localStorage.setItem('theme', theme);
    setTheme(changes.selectedItem.value);
  }

  return (
    <Select
      id="themeSwitcher"
      labelText="Select Theme"
      onSelectedItemChange={handleItemChange}
      items={[
        {
          value: magma,
          label: 'Magma (default)',
        },
        {
          value: ngl,
          label: 'National Geographic Learning',
        },
      ]}
    />
  );
};
