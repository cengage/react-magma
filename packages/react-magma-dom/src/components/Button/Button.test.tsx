import * as React from 'react';
import { Button, ButtonProps } from './Button';
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library'

const BASE_BUTTON_PROPS: ButtonProps = {
    onClick: jest.fn(),
    text: 'Test Text'
};

const renderButton = (myProps = {}) => {
    const props = {
        ...BASE_BUTTON_PROPS,
        ...myProps
    };

    return render(<Button {...props} />);
}

describe('Button', () => {

    afterEach(() => {
        cleanup();
    });

    it('should render a button with the passed in text', () => {
        const { getByText } = renderButton();

        expect(getByText(BASE_BUTTON_PROPS.text)).not.toBeNull();
    });

    it('should trigger the passed in function when clicked', () => {
        const onClickSpy = jest.fn()
        const { getByText } = renderButton({
            onClick: onClickSpy
        });

        fireEvent(
            getByText(BASE_BUTTON_PROPS.text),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        )

        expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
})
