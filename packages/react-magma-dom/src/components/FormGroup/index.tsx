import * as React from 'react';
import { HiddenStyles } from '../../utils/UtilityStyles';
import styled from '../../theme/styled';
import { omit, useGenerateId } from '../../utils';

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  containerStyle?: React.CSSProperties;
  isTextVisuallyHidden?: boolean;
  labelledById?: string;
  labelStyle?: React.CSSProperties;
  labelText?: React.ReactNode;
  testId?: string;
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
    isTextVisuallyHidden,
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
      {labelText && isTextVisuallyHidden && (
        <HiddenLabel id={id} style={labelStyle}>
          {labelText}
        </HiddenLabel>
      )}

      {labelText && !isTextVisuallyHidden && (
        <FormGroupLabel id={id} style={labelStyle}>
          {labelText}
        </FormGroupLabel>
      )}
      {children}
    </div>
  );
};
