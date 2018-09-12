import * as React from 'react';
import 'jest-dom/extend-expect';
import { InputText, InputTextProps } from './InputText';
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library'

const INPUT_TEXT_PROPS: InputTextProps = {
    autoFocus: false,
    id: 'abc123',
    labelText: 'test label',
    placeholder: 'test placeholder',
    required: false
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

    it('should render a label for the input', () => {
        const { getByText } = renderInputText();
        const label = getByText(INPUT_TEXT_PROPS.labelText);

        expect(label).toBeInTheDocument();
    });

    it('should render a input text with desired attributes', () => {
        const { getByLabelText } = renderInputText();
        const input = getByLabelText(INPUT_TEXT_PROPS.labelText); 

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('id', INPUT_TEXT_PROPS.id);
        expect(input).toHaveAttribute('placeholder', INPUT_TEXT_PROPS.placeholder);
        expect(input).toHaveAttribute('value', INPUT_TEXT_PROPS.value);
        expect(input).not.toHaveAttribute('required');
        expect(input).not.toHaveAttribute('autoFocus');
    });

    it('should render an input with a value passed through', () => {
        const value = 'Test Value';
        const { getByLabelText } = renderInputText({ value });
        const input = getByLabelText(INPUT_TEXT_PROPS.labelText);

        expect(input).toHaveAttribute('value', value);
    });

    it('should auto focus your input', () => {
        const { getByLabelText } = renderInputText({ autoFocus: true });
        const input = getByLabelText(INPUT_TEXT_PROPS.labelText);

        expect(input).toHaveFocus();
    });

    it('should require the input', () => {
        const { getByLabelText } = renderInputText({ required: true });
        const input = getByLabelText(INPUT_TEXT_PROPS.labelText);

        expect(input).toHaveAttribute('required');
    });
});