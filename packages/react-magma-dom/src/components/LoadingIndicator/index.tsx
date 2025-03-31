import * as React from 'react';

import styled from '@emotion/styled';

import { I18nContext } from '../../i18n';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { ProgressBar, ProgressBarColor } from '../ProgressBar';
import { Spinner } from '../Spinner';

export interface LoadingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  /**
   * @internal
   */
  css?: any; // Adding css prop to fix emotion error
  /**
   * Message displayed for the first five seconds
   * @default "Loading..."
   */
  message1?: string;
  /**
   * Message displayed for the first five seconds
   * @default "Thank you for your patience. Still loading..."
   */
  message2?: string;
  /**
   * Message displayed after 15 seconds
   * @default "Sorry for the delay. This is taking longer than expected."
   */
  message3?: string;
  /**
   * Message displayed for the first five seconds
   * @default 0
   */
  percentage?: number;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Type of loading indictor to display, can be progress bar or spinner
   * @default LoadingIndicatorType.spinner
   */
  type?: LoadingIndicatorType;
  isInverse?: boolean;
}

export enum LoadingIndicatorType {
  progressbar = 'progressbar',
  spinner = 'spinner', // default
}

export interface LoadingIndicatorState {
  messageLevel: number;
}

const StyledLoadingIndicator = styled.div`
  text-align: center;
`;

const MessageContainer = styled.div<{ theme: ThemeInterface }>`
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  letter-spacing: ${props => props.theme.typeScale.size02.letterSpacing};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  margin-top: ${props => props.theme.spaceScale.spacing05};
  min-height: 5em;
  position: relative;
  text-align: center;
`;

const Message = styled.div<{ hide?: boolean }>`
  opacity: ${props => (props.hide ? '0' : '1')};
  position: absolute;
  transition: opacity 0.3s;
  width: 100%;
`;

export const LoadingIndicator = React.forwardRef<
  HTMLDivElement,
  LoadingIndicatorProps
>((props, ref) => {
  const [messageLevel, setMessageLevel] = React.useState<1 | 2 | 3>(1);

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  React.useEffect(() => {
    const { type: loadingIndicatorType } = props;
    const messageLevel2Timeout = setTimeout(
      () => {
        setMessageLevel(2);
      },
      loadingIndicatorType === LoadingIndicatorType.progressbar ? 10000 : 5000
    );

    const messageLevel3Timeout = setTimeout(
      () => {
        setMessageLevel(3);
      },
      loadingIndicatorType === LoadingIndicatorType.progressbar ? 30000 : 15000
    );

    return () => {
      clearTimeout(messageLevel2Timeout);
      clearTimeout(messageLevel3Timeout);
    };
  }, []);

  const { color, testId, type, ...other } = props;
  let { message1, message2, message3 } = props;

  message1 = message1
    ? message1
    : type === LoadingIndicatorType.progressbar
      ? i18n.loadingIndicator.progressBar.messages.first
      : i18n.loadingIndicator.spinner.messages.first;

  message2 = message2
    ? message2
    : type === LoadingIndicatorType.progressbar
      ? i18n.loadingIndicator.progressBar.messages.second
      : i18n.loadingIndicator.spinner.messages.second;

  message3 = message3
    ? message3
    : type === LoadingIndicatorType.progressbar
      ? i18n.loadingIndicator.progressBar.messages.third
      : i18n.loadingIndicator.spinner.messages.third;

  return (
    <StyledLoadingIndicator aria-busy="true" data-testid={testId} ref={ref}>
      {type === LoadingIndicatorType.progressbar ? (
        <ProgressBar
          {...other}
          color={color as ProgressBarColor}
          height={theme.spaceScale.spacing03}
          isAnimated
          isLoadingIndicator
        />
      ) : (
        <Spinner {...other} size={theme.spaceScale.spacing10} />
      )}

      <MessageContainer theme={theme}>
        <Message aria-hidden={messageLevel !== 1} hide={messageLevel !== 1}>
          {message1}
        </Message>
        <Message aria-hidden={messageLevel !== 2} hide={messageLevel !== 2}>
          {message2}
        </Message>
        <Message aria-hidden={messageLevel !== 3} hide={messageLevel !== 3}>
          {message3}
        </Message>
      </MessageContainer>
    </StyledLoadingIndicator>
  );
});
