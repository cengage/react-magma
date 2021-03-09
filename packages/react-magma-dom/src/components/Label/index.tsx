import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { InputSize } from '../InputBase';
import { InverseContext, getIsInverse } from '../../inverse';

export enum LabelPosition {
  left = 'left',
  top = 'top', // default
}

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isInverse?: boolean;
  labelPosition?: LabelPosition;
  size?: InputSize;
  theme?: any;
  testId?: string;
}

const StyledLabel = styled.label<LabelProps>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  display: inline-block;
  font-size: ${props =>
    props.size === InputSize.large
      ? props.theme.typeScale.size03.fontSize
      : props.theme.typeScale.size02.fontSize};
  font-weight: 600;
  line-height: ${props =>
    props.size === InputSize.large
      ? props.theme.typeScale.size03.lineHeight
      : props.theme.typeScale.size02.lineHeight};
  margin: ${props =>
    props.labelPosition === LabelPosition.left
      ? `0 ${props.theme.spaceScale.spacing05} 0 0`
      : `0 0 ${props.theme.spaceScale.spacing03}`};
  max-width: 100%;
  text-align: left;
  white-space: nowrap;
`;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref) => {
    const {
      children,
      isInverse,
      labelPosition,
      size,
      testId,
      ...other
    } = props;
    const theme = React.useContext(ThemeContext);
    const inverseContext = React.useContext(InverseContext);

    return (
      <StyledLabel
        {...other}
        data-testid={testId}
        isInverse={getIsInverse(inverseContext, isInverse)}
        labelPosition={labelPosition || LabelPosition.top}
        ref={ref}
        size={size ? size : InputSize.medium}
        theme={theme}
      >
        {children}
      </StyledLabel>
    );
  }
);
