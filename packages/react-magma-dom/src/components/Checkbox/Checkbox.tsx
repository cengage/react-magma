import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CheckboxCore } from 'react-magma-core';
import { Icon } from '../Icon/Icon';
const styled = require('styled-components').default;
import { magma } from '../../theme/magma';

export interface CheckboxProps {
  autoFocus?: boolean;
  color?: string;
  disabled?: boolean;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleFocus?: () => void;
  id: string;
  indeterminate?: boolean;
  inverse?: boolean;
  labelText: string;
  required?: boolean;
  value?: string;
}

export interface CheckboxWrapperProps {
  checked?: boolean;
  color: string;
  disabled?: boolean;
  inverse?: boolean;
}

const StyledContainer = styled.div`
  align-items: baseline;
  display: flex;
  flex-wrap: nowrap;
  margin: 0 0 5px 10px;
`;

const HiddenInput = styled.input`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  position: absolute;
  overflow: hidden;
  top: auto;
  white-space: nowrap;
  width: 1px;
`;

const StyledLabel = styled.label`
  color: ${props => (props.inverse ? magma.colors.neutral08 : 'inherit')};
  margin: 0 0 0 10px;
`;

const StyledInput = styled.span`
  align-items: center;
  background: ${props => {
    if (props.inverse) {
      if (props.checked) {
        return magma.colors.neutral08;
      }
      return 'none';
    }
    if (props.disabled) {
      return magma.colors.neutral06;
    }
    if (props.checked) {
      return props.color;
    }
    return magma.colors.neutral08;
  }};
  border: 2px solid;
  border-color: ${props => {
    if (props.inverse) {
      if (props.disabled) {
        return magma.colors.disabledInverseText;
      }
      return magma.colors.neutral08;
    }
    if (props.disabled) {
      return magma.colors.neutral05;
    }
    return props.color;
  }};
  border-radius: 3px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  float: left;
  height: 20px;
  justify-content: center;
  margin: 2px 5px 0 -25px;
  position: relative;
  transition: all 0.2s ease-out;
  width: 20px;

  svg {
    display: ${props => (props.disabled ? 'none' : 'block')};
    fill: ${props => (props.inverse ? props.color : magma.colors.neutral08)};
    opacity: ${props => (props.checked ? '1' : '0')};
    transition: all 0.2s ease-out;
  }

  ${HiddenInput}:focus + label & {
    outline: 2px dotted ${magma.colors.pop03};
    outline-offset: 2px;
  }

  ${HiddenInput}:active + label & {
    &:after {
      opacity: 0.4;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0s;
    }
  }

  ${HiddenInput}:indeterminate + label & {
    background: ${magma.colors.neutral08};
    border-color: ${props =>
      props.inverse ? magma.colors.neutral08 : props.color};

    &:before {
      background: ${props => props.color};
      content: '';
      display: block;
      height: 2px;
      width: 10px;
    }

    svg {
      display: none;
    }
  }
`;

export class Checkbox extends React.Component<CheckboxProps> {
  constructor(props) {
    super(props);

    this.setIndeterminate = this.setIndeterminate.bind(this);
  }

  private checkboxInput = React.createRef<HTMLInputElement>();

  componentDidMount() {
    this.setIndeterminate();
  }

  componentDidUpdate() {
    this.setIndeterminate();
  }

  setIndeterminate() {
    ReactDOM.findDOMNode(
      this.checkboxInput.current
    ).indeterminate = this.props.indeterminate;
  }

  render() {
    return (
      <CheckboxCore
        value={this.props.value}
        handleBlur={this.props.handleBlur}
        handleChange={this.props.handleChange}
        handleFocus={this.props.handleFocus}
      >
        {({ handleBlur, handleChange, handleFocus, value }) => {
          const {
            autoFocus,
            color,
            disabled,
            id,
            indeterminate,
            inverse,
            labelText,
            required
          } = this.props;

          return (
            <StyledContainer>
              <HiddenInput
                ref={this.checkboxInput}
                autoFocus={autoFocus}
                id={id}
                disabled={disabled}
                indeterminate={indeterminate}
                required={required}
                type="checkbox"
                value={value}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
              />
              <StyledLabel htmlFor={id} inverse={inverse}>
                <StyledInput
                  checked={value}
                  color={color ? color : magma.colors.primary}
                  disabled={disabled}
                  inverse={inverse}
                >
                  <Icon size={12} type="checkmark" />
                </StyledInput>
                {labelText}
              </StyledLabel>
            </StyledContainer>
          );
        }}
      </CheckboxCore>
    );
  }
}

export default Checkbox;
