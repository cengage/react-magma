import * as React from 'react';
import { InputText, InputTextProps } from './InputText';
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library'

const INPUT_TEXT_PROPS: InputTextProps = {
    autoFocus: false,
    id: 'abc123',
    labelText: 'test label',
    placeholder: 'test placeholder',
    required: false,
    value: null
};

const renderInputText = (myProps = {}) => {
    const props = {
        ...INPUT_TEXT_PROPS,
        ...myProps
    };

    return render(<InputText {...props} />);
}

describe('InputText', () => {

    afterEach(() => {
        cleanup();
    });

    it('should render a input text with a placeholder', () => {
        const { getByLabelText } = renderInputText();

        expect(getByLabelText(INPUT_TEXT_PROPS.labelText)).not.toBeNull();
    });

    // it('should trigger the passed in function when clicked', () => {
    //     const onClickSpy = jest.fn()
    //     const { getByText } = renderInputText({
    //         onClick: onClickSpy
    //     });

    //     fireEvent(
    //         getByText(BASE_BUTTON_PROPS.text),
    //         new MouseEvent('click', {
    //             bubbles: true,
    //             cancelable: true
    //         })
    //     )

    //     expect(onClickSpy).toHaveBeenCalledTimes(1);
    // });
})