import * as React from 'react'
import { ToggleCore } from 'react-magma-core'

export interface ToggleProps {
    isOn?: boolean,
    handleToggle?: () => void
}

export const Toggle: React.SFC<ToggleProps> = (props: ToggleProps): JSX.Element => (
    <ToggleCore>
        {({ isOn, handleToggle }) => {
            return (
                <React.Fragment>
                    <input
                        type="checkbox"
                        id="check"
                        onChange={handleToggle}
                        checked={isOn}
                    />
                    <label htmlFor="check">Check: {isOn ? 'On' : 'Off'}</label>
                </React.Fragment>
            )
        }}
    </ToggleCore>
)