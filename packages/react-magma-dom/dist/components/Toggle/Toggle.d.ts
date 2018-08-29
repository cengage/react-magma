import * as React from 'react';
export interface ToggleProps {
    isOn?: boolean;
    handleToggle?: () => void;
}
export declare const Toggle: React.SFC<ToggleProps>;
