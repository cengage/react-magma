import * as React from 'react';
import { ProgressBar, ProgressBarColor } from '../ProgressBar';
import { Spinner } from '../Spinner';
import styled from '@emotion/styled';
import { I18nContext } from '../../i18n';

export interface LoadingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  css?: any; // Adding css prop to fix emotion error
  message1?: string;
  message2?: string;
  message3?: string;
  percentage?: number;
  ref?: any;
  testId?: string;
  type?: LoadingIndicatorType;
}

export enum LoadingIndicatorType {
  progressbar = 'progressbar',
  spinner = 'spinner' // default
}

export interface LoadingIndicatorState {
  messageLevel: number;
}

const StyledLoadingIndicator = styled.div`
  max-width: 230px;
  text-align: center;
`;

const MessageContainer = styled.div`
  font-weight: 600;
  margin-top: 20px;
  max-width: 230px;
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
          height={10}
          isAnimated
          isLabelVisible
        />
      ) : (
        <Spinner {...other} size={50} />
      )}

      <MessageContainer>
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
