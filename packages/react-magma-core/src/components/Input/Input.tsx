import * as React from 'react';

export class InputCore extends React.Component<InputCoreProps, InputCoreState> {
    initialState: InputCoreState = {
        value: this.props.value
    }
    state: InputCoreState = this.initialState;

    constructor(props) {
        super(props);

        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleBlur() {
        this.props.handleBlur && this.props.handleBlur()
    }

    handleFocus() {
        this.props.handleFocus && this.props.handleFocus()
    }

    handleChange(event) {
        const { value } = event.target;

        this.setState(
            () => ({ value }),
            () => { this.props.handleChange && this.props.handleChange(this.state.value) }
        )
    }

    render() {
        return this.props.children({
            ...this.state,
            ...this.props,
            handleBlur: this.handleBlur,
            handleChange: this.handleChange,
            handleFocus: this.handleFocus,
            value: this.state.value
        })
    }
}

export interface InputCoreProps {
    children: (props) => React.ReactNode,
    handleBlur?: () => {},
    handleChange?: (value: string) => {},
    handleFocus?: () => {},
    value?: string
}

export interface InputCoreState {
    value?: string
}