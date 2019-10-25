import * as React from 'react';
import { Spinner } from '../Spinner';
import styled from '@emotion/styled';

export interface LoadingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message1?: string;
  message2?: string;
  message3?: string;
  ref?: any;
}

export interface LoadingIndicatorState {
  messageLevel: number;
}

const StyledLoadingIndicator = styled.div`
  max-width: 230px;
  text-align: center;
`;

const MessageContainer = styled.div`
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

class LoadingIndicatorComponent extends React.Component<
  LoadingIndicatorProps,
  LoadingIndicatorState
> {
  constructor(props) {
    super(props);

    this.state = {
      messageLevel: 1
    };

    this.setTimer = this.setTimer.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  setTimer() {
    setTimeout(() => {
      this.setState({ messageLevel: 2 });
    }, 5000);

    setTimeout(() => {
      this.setState({ messageLevel: 3 });
    }, 15000);
  }

  render() {
    const { ref, message1, message2, message3 } = this.props;
    const { messageLevel } = this.state;

    return (
      <StyledLoadingIndicator ref={ref}>
        <Spinner size={50} />
        <MessageContainer>
          <Message hide={messageLevel !== 1}>
            {message1 ? message1 : 'Loading...'}
          </Message>
          <Message hide={messageLevel !== 2}>
            {message2
              ? message2
              : 'Thank you for your patience. Still loading...'}
          </Message>
          <Message hide={messageLevel !== 3}>
            {message3
              ? message3
              : 'Sorry for the delay. This is taking longer than expected.'}
          </Message>
        </MessageContainer>
      </StyledLoadingIndicator>
    );
  }
}

export const LoadingIndicator = React.forwardRef<
  HTMLDivElement,
  LoadingIndicatorProps
>((props, ref) => <LoadingIndicatorComponent ref={ref} {...props} />);
