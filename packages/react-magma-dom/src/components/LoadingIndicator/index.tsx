import * as React from 'react';
import { ProgressBar } from '../ProgressBar';
import { Spinner } from '../Spinner';
import styled from '@emotion/styled';

export interface LoadingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message1?: string;
  message2?: string;
  message3?: string;
  percentage?: number;
  ref?: any;
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
  const [messageLevel, setMessageLevel] = React.useState(1);

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

  const { percentage, type } = props;
  let { message1, message2, message3 } = props;

  message1 = message1
    ? message1
    : type === LoadingIndicatorType.progressbar
    ? 'Please be patient as this could take up to a minute to load.'
    : 'Loading...';

  message2 = message2
    ? message2
    : 'Thank you for your patience. Still loading...';

  message3 = message3
    ? message3
    : type === LoadingIndicatorType.progressbar
    ? 'Thank you for waiting.  We’re almost there!'
    : 'Sorry for the delay. This is taking longer than expected.';

  return (
    <StyledLoadingIndicator aria-busy="true" ref={ref}>
      {type === LoadingIndicatorType.progressbar ? (
        <ProgressBar
          animated
          height={10}
          labelVisible
          percentage={percentage}
        />
      ) : (
        <Spinner size={50} />
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
