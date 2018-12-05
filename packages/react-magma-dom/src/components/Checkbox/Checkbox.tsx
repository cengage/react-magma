import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CheckboxCore } from 'react-magma-core';
const styled = require('styled-components').default;
import { magma } from '../../theme/magma';

export interface CheckboxProps {
  autoFocus?: boolean;
  disabled?: boolean;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleFocus?: () => void;
  id: string;
  inline?: boolean;
  labelText: string;
  required?: boolean;
  value?: string;
  indeterminate?: boolean;
}

const StyledContainer = styled.div`
  align-items: baseline;
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  flex-wrap: nowrap;
  margin: 0 0 5px;
`;

const StyledInput = styled.input``;

const StyledLabel = styled.label`
  margin: ${props => (props.inline ? '0 20px 0 10px' : '0 0 0 10px')};
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
            id,
            inline,
            disabled,
            labelText,
            required,
            indeterminate
          } = this.props;

          return (
            <StyledContainer inline={inline}>
              <StyledInput
                ref={this.checkboxInput}
                autoFocus={autoFocus}
                id={id}
                disabled={disabled}
                required={required}
                type="checkbox"
                value={value}
                indeterminate={indeterminate}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
              />
              <StyledLabel htmlFor={id} inline={inline}>
                {labelText}
              </StyledLabel>
            </StyledContainer>
          );
        }}
      </CheckboxCore>
    );
  }
}
