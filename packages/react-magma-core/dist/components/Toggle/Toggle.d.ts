import * as React from 'react';
export declare class ToggleCore extends React.Component<ToggleCoreProps> {
    static state: ToggleCoreState;
    constructor(props: any);
    handleToggle(): void;
    render(): any;
}
export interface ToggleCoreProps {
    children: any;
}
export interface ToggleCoreState {
    isOn: boolean;
}
