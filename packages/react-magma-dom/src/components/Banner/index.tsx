import * as React from 'react';
import styled from '../../theme/styled';
import { AlertProps, buildAlertBackground } from '../Alert';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { ThemeContext } from '../../theme/ThemeContext';

export interface BannerProps extends AlertProps {
  isDismissible?: boolean;
  testId?: string;
}

const StyledBanner = styled.div<AlertProps>`
  background: ${props => buildAlertBackground(props)};
  color: ${props =>
    props.variant === 'warning'
      ? props.theme.colors.neutral01
      : props.theme.colors.neutral08};
  padding: 10px;
  position: relative;
  text-align: center;
`;

const ButtonWrapper = styled.span`
  position: absolute;
  right: 2px;
  top: 2px;
`;

export const Banner: React.FunctionComponent<BannerProps> = React.forwardRef(
  ({ children, isDismissible, testId, ...other }: BannerProps, ref: any) => {
    const theme = React.useContext(ThemeContext);

    return (
      <StyledBanner {...other} data-testid={testId} ref={ref} theme={theme}>
        {children}
        {isDismissible && (
          <ButtonWrapper>
            <IconButton
              aria-label="Close this message"
              icon={<CrossIcon size={13} />}
              isInverse
              style={{ margin: 0 }}
              variant={ButtonVariant.link}
            />
          </ButtonWrapper>
        )}
      </StyledBanner>
    );
  }
);
