import * as React from 'react';
import styled from '../../theme/styled';
import { AlertProps, AlertVariant, buildAlertBackground } from '../Alert';
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
`;

const BannerContents = styled.div`
  flex-grow: 1;
  padding: 10px 15px 10px 0;
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
  color: inherit;
  height: calc(100% - 6px);
  margin: 3px;
  padding: 0 15px;
  width: auto;

  &&:focus:not(:disabled) {
    outline: 2px dotted
      ${({ alertVariant, theme }) =>
        alertVariant === 'warning'
          ? theme.colors.focus
          : theme.colors.focusInverse};
    outline-offset: 0 !important;
  }

  &:hover,
  &:focus {
    :not(:disabled):before {
      background: ${({ alertVariant, theme }) =>
        alertVariant === 'warning'
          ? theme.colors.focus
          : theme.colors.focusInverse};
      opacity: 0.15;
    }

    &:after {
      display: none;
    }
  }
`;

export const Banner: React.FunctionComponent<BannerProps> = React.forwardRef(
  (
    { children, isDismissible, variant, testId, ...other }: BannerProps,
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
        <BannerContents>{children}</BannerContents>
        {isDismissible && (
          <ButtonWrapper>
            <DismissButton
              alertVariant={variant}
              aria-label="Close this message"
              icon={<CrossIcon size={13} />}
              isInverse
              theme={theme}
              variant={ButtonVariant.link}
            />
          </ButtonWrapper>
        )}
      </StyledBanner>
    );
  }
);
