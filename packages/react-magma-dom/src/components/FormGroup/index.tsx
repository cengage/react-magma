import * as React from 'react';
import { HiddenStyles } from '../UtilityStyles';
import styled from '../../theme/styled';
import { omit, useGenerateId } from '../utils';

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  containerStyle?: React.CSSProperties;
  labelledById?: string;
  labelStyle?: React.CSSProperties;
  labelText?: string;
  testId?: string;
  textVisuallyHidden?: boolean;
}

export const FormGroupLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  width: 100%;
`;

const HiddenLabel = styled.label`
  ${HiddenStyles};
`;

export const FormGroup: React.FunctionComponent<FormGroupProps> = (
  props: FormGroupProps
) => {
  const id = useGenerateId(props.id);

  const {
    containerStyle,
    labelledById,
    labelStyle,
    labelText,
    textVisuallyHidden,
    testId,
    children,
    ...rest
  } = props;
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
};
