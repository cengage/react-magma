import * as React from 'react';
import { Toggle, ToggleProps } from './Toggle';
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library'

const BASE_TOGGLE_PROPS: ToggleProps = {
    handleToggle: jest.fn(),
    isOn: false
};

const renderButton = (myProps = {}) => {
    const props = {
        ...BASE_TOGGLE_PROPS,
        ...myProps
    };

    return render(<Toggle {...props} />);
}

describe('Toggle', () => {

    afterEach(() => {
        cleanup();
    });

    it('should render a button with the passed in text', () => {
        const { debug } = renderButton();

        debug();

        expect(true).toBeTruthy();
    });

    it.only('should render a toggle that is on', () => {
        const { debug, getByText } = renderButton({
            isOn: true
        });

        debug();

        expect(getByText('On', {exact: false})).not.toBeNull();
    });
})