import * as React from 'react';
import styled from '../../theme/styled';
import {
  AlertProps,
  AlertVariant,
  buildAlertBackground,
  VARIANT_ICON
} from '../Alert';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { ThemeContext } from '../../theme/ThemeContext';

export interface BannerProps extends AlertProps {
  isDismissible?: boolean;
  testId?: string;
}

const StyledBanner = styled.div<AlertProps>`
  align-items: stretch;
  background: ${props => buildAlertBackground(props)};
  color: ${props =>
    props.variant === 'warning'
      ? props.theme.colors.neutral01
      : props.theme.colors.neutral08};
  display: flex;
  position: relative;
  text-align: center;

  @media (max-width: 600px) {
    text-align: left;
    font-size: 13px;
  }
`;

const BannerContents = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  padding: 10px 15px;

  @media (max-width: 600px) {
    justify-content: flex-start;
  }
`;

const ButtonWrapper = styled.span`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

const DismissButton = styled(IconButton)<{
  alertVariant?: AlertVariant;
}>`
  border-radius: 0;
  color: ${({ alertVariant, theme }) =>
    alertVariant === 'warning'
      ? theme.colors.neutral01
      : theme.colors.neutral08};
  height: calc(100% - 6px);
  margin: 3px;
  padding: 0 15px;
  width: auto;

  &&:focus:not(:disabled) {
    outline: 2px dotted
      ${({ alertVariant, theme }) =>
        alertVariant === 'warning'
          ? theme.colors.neutral01
          : theme.colors.neutral08};
    outline-offset: 0 !important;
  }

  &:hover,
  &:focus {
    :not(:disabled) {
      &:before {
        background: ${({ alertVariant, theme }) =>
          alertVariant === 'warning'
            ? theme.colors.neutral01
            : theme.colors.neutral08};
        opacity: 0.15;
      }

      &:after {
        display: none;
      }
    }
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  padding-right: 10px;

  @media (max-width: 600px) {
    display: none;
  }
`;

function renderIcon(variant = 'info') {
  const Icon = VARIANT_ICON[variant];

  return (
    <IconWrapper>
      <Icon size={20} />
    </IconWrapper>
  );
}

export const Banner: React.FunctionComponent<BannerProps> = React.forwardRef(
  (
    {
      children,
      closeAriaLabel,
      isDismissible,
      onDismiss,
      testId,
      variant,
      ...other
    }: BannerProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

    return (
      <StyledBanner
        {...other}
        data-testid={testId}
        ref={ref}
        theme={theme}
        variant={variant}
      >
        <BannerContents>
          {renderIcon(variant)}
          {children}
        </BannerContents>

        {isDismissible && (
          <ButtonWrapper>
            <DismissButton
              alertVariant={variant}
              aria-label={
                closeAriaLabel ? closeAriaLabel : 'Close this message'
              }
              icon={<CrossIcon size={13} />}
              isInverse
              onClick={onDismiss}
              theme={theme}
              variant={ButtonVariant.link}
            />
          </ButtonWrapper>
        )}
      </StyledBanner>
    );
  }
);
