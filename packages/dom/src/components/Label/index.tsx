import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { InputSize } from '../InputBase';
import { useIsInverse } from '../../inverse';

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
    props.isInverse ? 'var(--colors-neutral08)' : 'var(--colors-neutral)'};
  display: inline-block;
  font-size: ${props =>
    props.size === InputSize.large
      ? 'var(--typeScale-size03-fontSize)'
      : 'var(--typeScale-size02-fontSize)'};
  font-weight: 600;
  line-height: ${props =>
    props.size === InputSize.large
      ? 'var(--typeScale-size03-lineHeight)'
      : 'var(--typeScale-size02-lineHeight)'};
  margin: ${props =>
    props.labelPosition === LabelPosition.left
      ? '0 var(--spaceScale-spacing05) 0 0'
      : '0 0 var(--spaceScale-spacing03)'};
  max-width: 100%;
  text-align: left;
  white-space: nowrap;
`;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref) => {
    const { children, labelPosition, size, testId, ...other } = props;
    const theme = React.useContext(ThemeContext);

    return (
      <StyledLabel
        {...other}
        data-testid={testId}
        isInverse={useIsInverse(props.isInverse)}
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
