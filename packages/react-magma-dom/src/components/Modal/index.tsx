import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { ModalCore } from 'react-magma-core';
import { getTrapElements, getFocusedElementIndex } from './utils';
import { ThemeContext } from '../../theme/ThemeContext';
import { Button, ButtonColor, ButtonVariant } from '../Button';
import { CrossIcon } from '../Icon/types/CrossIcon';

export enum ModalSize {
  large = 'large',
  medium = 'medium', //default
  small = 'small'
}

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  closeLabel?: string;
  disableBackdropClick?: boolean;
  disableEscKeyDown?: boolean;
  header?: React.ReactNode;
  hideEscButton?: boolean;
  isExiting?: boolean;
  onClose?: () => void;
  onEscKeyDown?: (event: React.KeyboardEvent) => void;
  open?: boolean;
  size?: ModalSize;
  testId?: string;
  innerRef?: React.Ref<HTMLDivElement>;
}

interface ModalState {
  focusableElements: Array<HTMLElement>;
}

const ModalContainer = styled.div`
  bottom: 0;
  left: 0;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 998;
`;

const ModalBackdrop = styled.div<{ isExiting?: boolean }>`
  animation: ${props => (props.isExiting ? 'fadeout 500ms' : 'fadein 500ms')};
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: 999;

  @keyframes fadein {
    from {
      opacity: 0;
      transition: translate(0, -50px);
    }
    to {
      opacity: 1;
      transition: translate(0, 0);
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const ModalContent = styled.div<ModalProps>`
  animation: ${props =>
    props.isExiting ? 'fadeSlideOut 500ms' : 'fadeSlideIn 500ms'};
  background: ${props => props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${props => props.theme.colors.neutral06};
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin: 10px;
  position: relative;
  z-index: 1000;

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translate(0, -50px);
    }
    to {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @keyframes fadeSlideOut {
    from {
      opacity: 1;
      transform: translate(0, 0);
    }
    to {
      opacity: 0;
      transform: translate(0, -50px);
    }
  }

  max-width: ${props => {
    switch (props.size) {
      case 'large':
        return '900px';
      case 'small':
        return '300px';
      default:
        return '750px';
    }
  }};

  @media (min-width: 320px) {
    margin: ${props => (props.size === 'small' ? '30px auto' : '10px')};
  }

  @media (min-width: 770px) {
    margin: ${props => (props.size !== 'large' ? '30px auto' : '10px')};
  }

  @media (min-width: 920px) {
    margin: 30px auto;
  }
`;

const ModalHeader = styled.div`
  padding: 20px 20px 10px;
`;

const H1 = styled.h1`
  color: ${props => props.theme.colors.foundation01};
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  padding-right: 50px;
  text-transform: uppercase;
`;

const CloseBtn = styled.span`
  position: absolute;
  top: 0;
  right: 0;

  svg {
    height: 15px;
    width: 15px;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

class ModalComponent extends React.Component<ModalProps, ModalState> {
  private lastFocus = React.createRef<any>();
  private focusTrapElement = React.createRef<any>();

  constructor(props) {
    super(props);

    this.state = {
      focusableElements: []
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate(prevProps: ModalProps) {
    if (!prevProps.open && this.props.open) {
      // @ts-ignore: CreateRef only gives back a immutable ref
      this.lastFocus.current = document.activeElement;
      this.setState({
        focusableElements: getTrapElements(this.focusTrapElement)
      });
    }
  }

  handleKeyDown(onClose: (callback: () => void) => void) {
    return event => {
      const { keyCode, shiftKey } = event;

      if (keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onEscKeyDown &&
          typeof this.props.onEscKeyDown === 'function' &&
          this.props.onEscKeyDown(event);

        this.handleClose(onClose)();
      } else if (shiftKey && keyCode === 9) {
        const index = getFocusedElementIndex(
          this.state.focusableElements,
          event.target
        );

        if (index === 0) {
          event.preventDefault();
          this.state.focusableElements[
            this.state.focusableElements.length - 1
          ].focus();
        }
      } else if (keyCode === 9) {
        const index = getFocusedElementIndex(
          this.state.focusableElements,
          event.target
        );

        if (index === this.state.focusableElements.length - 1) {
          event.preventDefault();
          this.state.focusableElements[0].focus();
        }
      }
    };
  }

  handleClose(onClose: (callback: () => void) => void) {
    return () => {
      onClose(() => {
        this.lastFocus.current.focus();
        this.setState({ focusableElements: [] });
        this.props.onClose &&
          typeof this.props.onClose === 'function' &&
          this.props.onClose();
      });
    };
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <ModalCore id={this.props.id} open={this.props.open}>
            {({ id, isExiting, onClose }) => {
              const {
                children,
                closeLabel,
                disableBackdropClick,
                disableEscKeyDown,
                header,
                hideEscButton,
                open,
                size,
                innerRef,
                ...other
              } = this.props;

              const CloseIcon = <CrossIcon color={theme.colors.neutral04} />;

              return open
                ? ReactDOM.createPortal(
                    <>
                      <Global
                        styles={css`
                          html {
                            overflow: hidden;
                          }
                        `}
                      />

                      <ModalContainer
                        aria-modal={true}
                        data-testid="modal-container"
                        id={id}
                        onKeyDown={
                          disableEscKeyDown ? null : this.handleKeyDown(onClose)
                        }
                        ref={this.focusTrapElement}
                        role="dialog"
                      >
                        <ModalBackdrop
                          data-testid="modal-backdrop"
                          isExiting={isExiting}
                          onMouseDown={
                            disableBackdropClick
                              ? event => event.preventDefault()
                              : null
                          }
                          onClick={
                            disableBackdropClick
                              ? null
                              : this.handleClose(onClose)
                          }
                        />
                        <ModalContent
                          data-testid="modal-content"
                          isExiting={isExiting}
                          ref={innerRef}
                          size={size}
                          theme={theme}
                          {...other}
                        >
                          <ModalHeader theme={theme}>
                            {header && <H1 theme={theme}>{header}</H1>}
                          </ModalHeader>
                          <ModalBody>{children}</ModalBody>
                          {!hideEscButton && (
                            <CloseBtn>
                              <Button
                                aria-label={closeLabel ? closeLabel : 'Close'}
                                color={ButtonColor.secondary}
                                icon={CloseIcon}
                                onClick={this.handleClose(onClose)}
                                testId="modal-closebtn"
                                variant={ButtonVariant.link}
                              />
                            </CloseBtn>
                          )}
                        </ModalContent>
                      </ModalContainer>
                    </>,
                    document.getElementsByTagName('body')[0]
                  )
                : null;
            }}
          </ModalCore>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (props, ref) => <ModalComponent innerRef={ref} {...props} />
);
