import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CheckboxCore } from 'react-magma-core';
const styled = require('styled-components').default;
// import { magma } from '../../theme/magma';

const StyledLabel = styled.label`
  display: inline-block;
  font-weight: bold;
  margin-bottom: 5px;
  max-width: 100%;
`;

const StyledInput = styled.input``;

export interface CheckboxProps {
  autoFocus?: boolean;
  disabled?: boolean;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleFocus?: () => void;
  id: string;
  labelText: string;
  required?: boolean;
  value?: string;
  indeterminate?: boolean;
}

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
            disabled,
            labelText,
            required,
            indeterminate
          } = this.props;

          return (
            <div>
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
              <StyledLabel htmlFor={id}>{labelText}</StyledLabel>
            </div>
          );
        }}
      </CheckboxCore>
    );
  }
}

export default Checkbox;
