import * as React from 'react';

import styled from '@emotion/styled';
import { AutoAwesomeIcon } from 'react-magma-icons';

import { StyledAIButtonTemplate } from './StyledAIButtonTemplate';
import { ThemeContext } from '../../theme/ThemeContext';

import {
  AIButtonShape,
  AIButtonSize,
  AIButtonTextTransform,
  AIButtonType,
  AIButtonVariant,
  BaseAIButtonProps,
} from '.';

export interface StyledAIButtonProps extends BaseAIButtonProps {
  iconOnly?: boolean;
  trailingIcon?: React.ReactElement;
  leadingIcon?: boolean | React.ReactElement;
}

export function getIconSize(size, theme) {
  switch (size) {
    case AIButtonSize.large:
      return theme.iconSizes.medium;
    case AIButtonSize.small:
      return theme.iconSizes.xSmall;
    default:
      return theme.iconSizes.small;
  }
}

export interface SpanProps {
  hasIconLeading?: boolean;
  size?: AIButtonSize;
}

const SpanTextLeft = styled.span<SpanProps>`
  ${props => {
    const padding = getIconPadding(props);
    return `
      padding-left: ${props.hasIconLeading ? padding : 0};
      padding-right: ${padding};
    `;
  }}
`;

const SpanTextRight = styled.span<SpanProps>`
  padding-left: ${props => getIconPadding(props)};
`;

function getIconPadding(props) {
  switch (props.size) {
    case 'large':
      return props.theme.spaceScale.spacing05;
    case 'small':
      return props.theme.spaceScale.spacing02;
    default:
      return props.theme.spaceScale.spacing03;
  }
}

export const StyledAIButton = React.forwardRef<
  HTMLButtonElement,
  StyledAIButtonProps
>((props, ref) => {
  const {
    size,
    variant,
    isInverse,
    children,
    type = AIButtonType.button,
    testId,
    leadingIcon: isLeadingIcon = true,
    trailingIcon,
    shape,
    textTransform,
    'aria-label': ariaLabel,
    ...other
  } = props;

  const theme = React.useContext(ThemeContext);

  let leadingIcon;

  if (typeof isLeadingIcon === 'boolean') {
    if (isLeadingIcon) {
      leadingIcon = <AutoAwesomeIcon />;
    }
  } else {
    leadingIcon = isLeadingIcon;
  }

  const updatedChildren = React.useMemo(() => {
    if (trailingIcon) {
      return (
        <SpanTextLeft hasIconLeading={!!leadingIcon} size={size} theme={theme}>
          {children}
        </SpanTextLeft>
      );
    }

    if (leadingIcon) {
      return (
        <SpanTextRight size={size} theme={theme}>
          {children}
        </SpanTextRight>
      );
    }

    return children;
  }, []);

  if (!children) {
    return (
      <StyledAIButtonTemplate
        {...other}
        ref={ref}
        iconOnly
        testId={testId}
        isInverse={isInverse}
        shape={shape || AIButtonShape.round}
        size={size || AIButtonSize.medium}
        variant={variant || AIButtonVariant.variantA}
      >
        {React.Children.only(
          React.cloneElement(leadingIcon, {
            size: leadingIcon.props.size
              ? leadingIcon.props.size
              : getIconSize(size, theme),
            'aria-label': ariaLabel,
            'aria-hidden': 'true',
          })
        )}
      </StyledAIButtonTemplate>
    );
  }

  return (
    <StyledAIButtonTemplate
      {...other}
      ref={ref}
      isInverse={isInverse}
      shape={shape || AIButtonShape.fill}
      size={size || AIButtonSize.medium}
      testId={testId}
      textTransform={textTransform || AIButtonTextTransform.uppercase}
      variant={variant || AIButtonVariant.variantA}
    >
      {leadingIcon &&
        React.Children.only(
          React.cloneElement(leadingIcon, {
            size: leadingIcon.props.size
              ? leadingIcon.props.size
              : getIconSize(size, theme),
            'data-testid': `${testId}-leading-icon`,
            'aria-hidden': 'true',
          })
        )}
      {updatedChildren}
      {trailingIcon &&
        React.Children.only(
          React.cloneElement(trailingIcon as React.ReactElement, {
            size: trailingIcon.props.size || getIconSize(size, theme),
            'data-testid': `${testId}-trailing-icon`,
            'aria-hidden': 'true',
          })
        )}
    </StyledAIButtonTemplate>
  );
});
