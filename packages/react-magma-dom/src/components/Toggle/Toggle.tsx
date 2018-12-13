import * as React from 'react';
import { ToggleCore } from 'react-magma-core';

export interface ToggleProps {
  isOn?: boolean;
  handleToggle?: () => void;
}

export const Toggle: React.FunctionComponent<ToggleProps> = (
  props: ToggleProps
) => (
  <ToggleCore>
    {({ isOn, handleToggle }) => {
      return (
        <React.Fragment>
          <input
            type="checkbox"
            id="check"
            onChange={handleToggle}
            aria-checked={isOn}
            checked={isOn}
          />
          <label htmlFor="check">Check: {isOn ? 'On' : 'Off'}</label>
        </React.Fragment>
      );
    }}
  </ToggleCore>
);
