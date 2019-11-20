import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from '../../theme/styled';
import { Global, css } from '@emotion/core';
import {
  getTrapElements,
  getTrapElementsAndFocus,
  getFocusedElementIndex
} from './utils';
import { ThemeContext } from '../../theme/ThemeContext';
import { Button, ButtonColor, ButtonVariant } from '../Button';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { Heading } from '../Heading';
import { omit, useGenerateId, usePrevious } from '../utils';

export enum ModalSize {
  large = 'large',
  medium = 'medium', //default
  small = 'small'
}

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  closeLabel?: string;
  disableBackdropClick?: boolean;
  disableEscKeyDown?: boolean;
  header?: React.ReactNode;
  hideEscButton?: boolean;
  id?: string;
  innerRef?: React.Ref<HTMLDivElement>;
  isExiting?: boolean;
  onClose?: () => void;
  onEscKeyDown?: (event: React.KeyboardEvent) => void;
  open?: boolean;
  size?: ModalSize;
  testId?: string;
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
  color: ${props => props.theme.colors.neutral02};
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

const H1 = styled(Heading)`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  padding-right: 50px;
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

export const Modal: React.FunctionComponent<ModalProps> = React.forwardRef(
  (props: ModalProps, ref: any) => {
    const lastFocus = React.useRef<any>();
    const headingRef = React.useRef<any>();
    const bodyRef = React.useRef<any>();
    const focusTrapElement = React.useRef<any>();
    const id = useGenerateId(props.id);
    const [focusableElements, setFocusableElements] = React.useState<
      HTMLElement[]
    >([]);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(props.open);
    const [isExiting, setIsExiting] = React.useState<boolean>(false);
    const prevOpen: boolean = usePrevious(props.open);
    const prevIsModalOpen: boolean = usePrevious(isModalOpen);

    // constructor(props) {
    //   super(props);

    //   this.state = {
    //     focusableElements: []
    //   };

    //   this.handleKeyDown = this.handleKeyDown.bind(this);
    //   this.handleClose = this.handleClose.bind(this);
    // }

    React.useEffect(() => {
      if (!prevOpen && props.open) {
        setIsModalOpen(true);
      } else if (prevOpen && !props.open) {
        handleClose();
      }
    }, [props.open]);

    React.useEffect(() => {
      if (!prevIsModalOpen && isModalOpen) {
        lastFocus.current = document.activeElement;

        setFocusableElements(
          getTrapElementsAndFocus(
            focusTrapElement,
            bodyRef,
            props.header ? headingRef : null
          )
        );
      }
    }, [isModalOpen]);

    React.useEffect(() => {
      if (isModalOpen) {
        const newFocusableElements: Array<HTMLElement> =
          document.activeElement.nodeName === 'BODY'
            ? getTrapElementsAndFocus(focusTrapElement, bodyRef)
            : getTrapElements(focusTrapElement);

        setFocusableElements(newFocusableElements);
      }
    }, [props.children]);

    // componentDidUpdate(prevProps: ModalProps, prevState: ModalState) {
    //   if (!prevProps.open && props.open) {
    //     this.setState({ isModalOpen: true });
    //   } else if (prevProps.open && !this.props.open) {
    //     this.handleClose();
    //   }
    //   if (!prevState.isModalOpen && this.state.isModalOpen) {
    //     // @ts-ignore: CreateRef only gives back a immutable ref
    //     this.lastFocus.current = document.activeElement;

    //     if (this.props.header) {
    //       this.setState({
    //         focusableElements: getTrapElementsAndFocus(
    //           this.focusTrapElement,
    //           this.bodyRef,
    //           this.headingRef
    //         )
    //       });
    //     } else {
    //       this.setState({
    //         focusableElements: getTrapElementsAndFocus(
    //           this.focusTrapElement,
    //           this.bodyRef
    //         )
    //       });
    //     }
    //   }

    //   if (this.state.isModalOpen && this.props.children !== prevProps.children) {
    //     const focusableElements: Array<HTMLElement> =
    //       document.activeElement.nodeName === 'BODY'
    //         ? getTrapElementsAndFocus(this.focusTrapElement, this.bodyRef)
    //         : getTrapElements(this.focusTrapElement);

    //     this.setState({ focusableElements });
    //   }
    // }

    // componentDidMount() {
    //   if (this.props.open) {
    //     this.setState({ isModalOpen: true });
    //   }
    // }

    function handleKeyDown(event: React.KeyboardEvent) {
      const { keyCode, shiftKey } = event;

      if (keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();
        props.onEscKeyDown &&
          typeof props.onEscKeyDown === 'function' &&
          props.onEscKeyDown(event);

        handleClose();
      } else if (shiftKey && keyCode === 9) {
        const index = getFocusedElementIndex(focusableElements, event.target);

        if (index === 0) {
          event.preventDefault();
          focusableElements[focusableElements.length - 1].focus();
        }
      } else if (keyCode === 9) {
        const index = getFocusedElementIndex(focusableElements, event.target);

        if (index === focusableElements.length - 1) {
          event.preventDefault();
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          }
        }
      }
    }

    function handleClose() {
      setIsExiting(true);

      setTimeout(() => {
        setIsExiting(false);
        setFocusableElements([]);
        setIsModalOpen(false);

        if (lastFocus.current) {
          lastFocus.current.focus();
        }

        props.onClose && typeof props.onClose === 'function' && props.onClose();
      }, 300);
    }

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
      ...rest
    } = props;

    const other = omit(['onEscKeyDown'], rest);

    const headingId = `${id}_heading`;

    return (
      <ThemeContext.Consumer>
        {theme => {
          const CloseIcon = <CrossIcon color={theme.colors.neutral04} />;

          return isModalOpen
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
                    aria-labelledby={headingId}
                    aria-modal={true}
                    data-testid="modal-container"
                    id={id}
                    onKeyDown={disableEscKeyDown ? null : handleKeyDown}
                    ref={focusTrapElement}
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
                      onClick={disableBackdropClick ? null : handleClose}
                    />
                    <ModalContent
                      data-testid="modal-content"
                      isExiting={isExiting}
                      ref={ref}
                      size={size}
                      theme={theme}
                      {...other}
                    >
                      {header && (
                        <ModalHeader theme={theme}>
                          {header && (
                            <H1
                              id={headingId}
                              level={1}
                              ref={headingRef}
                              tabIndex={-1}
                              theme={theme}
                            >
                              {header}
                            </H1>
                          )}
                        </ModalHeader>
                      )}
                      <ModalBody ref={bodyRef}>{children}</ModalBody>
                      {!hideEscButton && (
                        <CloseBtn>
                          <Button
                            aria-label={
                              closeLabel ? closeLabel : 'Close dialog'
                            }
                            color={ButtonColor.secondary}
                            icon={CloseIcon}
                            onClick={handleClose}
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
      </ThemeContext.Consumer>
    );
  }
);
