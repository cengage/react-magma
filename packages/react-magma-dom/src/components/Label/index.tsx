import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { InputIconPosition, InputSize } from '../InputBase';
import { useIsInverse } from '../../inverse';
import styled from '@emotion/styled';

export enum LabelPosition {
  left = 'left',
  top = 'top', // default
}

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  actionable?: boolean;
  iconPosition?: InputIconPosition;
  isInverse?: boolean;
  /**
   * @default LabelPosition.top
   */
  labelPosition?: LabelPosition;
  /**
   * @default InputSize.medium
   */
  size?: InputSize;
  theme?: any;
  /**
   * @internal
   */
  testId?: string;
}

const StyledLabel = styled.label<{
  iconPosition: InputIconPosition;
  isInverse: boolean;
  theme: any;
  size: InputSize;
  labelPosition: LabelPosition;
}>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  display: inline-block;
  font-size: ${props =>
    props.size === InputSize.large
      ? props.theme.typeScale.size03.fontSize
      : props.theme.typeScale.size02.fontSize};
  font-family: ${props => props.theme.bodyFont};
  font-weight: 500;
  letter-spacing: ${props =>
    props.size === InputSize.large
      ? 'inherit'
      : props.theme.typeScale.size02.letterSpacing};
  line-height: ${props =>
    props.size === InputSize.large
      ? props.theme.typeScale.size03.lineHeight
      : props.theme.typeScale.size02.lineHeight};
  margin: ${props =>
    props.labelPosition === LabelPosition.left
      ? `${props.theme.spaceScale.spacing04} ${props.theme.spaceScale.spacing03} 0 0`
      : `0 0 ${props.theme.spaceScale.spacing03}`};
  max-width: ${props =>
    props.iconPosition === InputIconPosition.top
      ? 'calc(100% - 51px)'
      : '100%'};
  text-align: ${props =>
    props.labelPosition === LabelPosition.left ? 'right' : 'left'};
  white-space: ${props =>
    props.iconPosition === InputIconPosition.top ||
    props.labelPosition === LabelPosition.left
      ? 'inherit'
      : 'normal'};
`;

const StyledSpan = StyledLabel.withComponent('span');

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref) => {
    const {
      actionable = true,
      children,
      iconPosition,
      labelPosition,
      size,
      testId,
      ...other
    } = props;
    const theme = React.useContext(ThemeContext);

    const isInverse = useIsInverse(props.isInverse);

    return actionable ? (
      <StyledLabel
        {...other}
        data-testid={testId}
        isInverse={isInverse}
        iconPosition={iconPosition}
        labelPosition={labelPosition || LabelPosition.top}
        ref={ref}
        size={size ? size : InputSize.medium}
        theme={theme}
      >
        {children}
      </StyledLabel>
    ) : (
      <StyledSpan
        {...other}
        data-testid={testId}
        isInverse={isInverse}
        iconPosition={iconPosition}
        labelPosition={labelPosition || LabelPosition.top}
        ref={ref}
        size={size ? size : InputSize.medium}
        theme={theme}
      >
        {children}
      </StyledSpan>
    );
  }
);
