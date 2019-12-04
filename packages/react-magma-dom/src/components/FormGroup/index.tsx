import * as React from 'react';
import { HiddenStyles } from '../UtilityStyles';
import styled from '@emotion/styled';
import { generateId, omit } from '../utils';

export const FormGroupLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  width: 100%;
`;

const HiddenLabel = styled.label`
  ${HiddenStyles};
`;

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  containerStyle?: React.CSSProperties;
  labelledById?: string;
  labelStyle?: React.CSSProperties;
  labelText?: string;
  testId?: string;
  textVisuallyHidden?: boolean;
}

export interface FormGroupState {
  id?: string;
}

export class FormGroup extends React.Component<FormGroupProps> {
  state: FormGroupState = {
    id: generateId(this.props.id)
  };

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }
  }
  render() {
    const {
      containerStyle,
      id,
      labelledById,
      labelStyle,
      labelText,
      textVisuallyHidden,
      testId,
      children,
      ...rest
    } = this.props;
    const other = omit(['id'], rest);

    return (
      <div
        {...other}
        aria-labelledby={labelledById ? labelledById : id}
        data-testid={testId}
        role="group"
        style={containerStyle}
      >
        {textVisuallyHidden ? (
          <HiddenLabel id={id} style={labelStyle}>
            {labelText}
          </HiddenLabel>
        ) : (
          <FormGroupLabel id={id} style={labelStyle}>
            {labelText}
          </FormGroupLabel>
        )}
        {children}
      </div>
    );
  }
}
