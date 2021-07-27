import * as React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { ButtonColor, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { CloseIcon } from 'react-magma-icons';
import { Heading } from '../Heading';
import { TypographyVisualStyle } from '../Typography';
import { Transition, TransitionProps } from '../Transition';
import { ThemeInterface } from '../../theme/magma';
import { omit, useGenerateId, usePrevious } from '../../utils';
import { useFocusLock } from '../../hooks/useFocusLock';

export enum ModalSize {
  large = 'large',
  medium = 'medium', //default
  small = 'small',
}

/**
 * @children required
 */
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The text read by screen readers for the close button
   * @default "Close dialog"
   */
  closeAriaLabel?: string;
  /**
   * Style for the modal container
   */
  containerStyle?: React.CSSProperties;
  /**
   * The content of the modal header
   */
  header?: React.ReactNode;
  /**
   * If true, clicking the backdrop will not dismiss the modal
   * @default false
   */
  isBackgroundClickDisabled?: boolean;
  /**
   * If true, the close button the the modal will be suppressed
   * @default false
   */
  isCloseButtonHidden?: boolean;
  /**
   * If true, pressing the Escape key will not dismiss the modal
   * @false
   */
  isEscKeyDownDisabled?: boolean;
  /**
   * If true, the modal will be visible
   * @default false
   */
  isOpen?: boolean;
  /**
   * If true, the modal will removed from the DOM when closed
   * @default true
   */
  unmountOnExit?: boolean;
  /**
   * @internal
   */
  containerTransition?: Omit<TransitionProps, 'isOpen'>;
  /**
   * Action that fires when the close button is clicked
   */
  onClose?: () => void;
  /**
   * Action that fires when the Escape key is pressed
   */
  onEscKeyDown?: (event: KeyboardEvent) => void;
  /**
   * The relative size of the modal
   * @default ModalSize.medium
   */
  size?: ModalSize;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

const ModalContainer = styled(Transition)<{
  theme: ThemeInterface;
}>`
  bottom: 0;
  left: 0;
  overflow-y: auto;
  padding: ${props => props.theme.spaceScale.spacing03};
  right: 0;
  top: 0;
  z-index: 998;
`;

const ModalBackdrop = styled(Transition)<{ isExiting?: boolean }>`
  backdrop-filter: blur(3px);
  background: rgba(0, 0, 0, 0.6);
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 997;
  position: fixed;
`;

const ModalContent = styled.div<ModalProps & { isExiting?: boolean }>`
  background: ${props => props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${props => props.theme.colors.neutral06};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.colors.neutral};
  margin: 0 auto;
  position: relative;
  z-index: 1000;

  max-width: ${props => {
    switch (props.size) {
      case 'large':
        return props.theme.modal.width.large;
      case 'small':
        return props.theme.modal.width.small;
      default:
        return props.theme.modal.width.medium;
    }
  }};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    margin: ${props => props.theme.spaceScale.spacing08} auto;
  }
`;

const ModalHeader = styled.div<{ theme?: ThemeInterface }>`
  padding: ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing05} 0
    ${props => props.theme.spaceScale.spacing05};
  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    padding: ${props => props.theme.spaceScale.spacing05}
      ${props => props.theme.spaceScale.spacing06} 0
      ${props => props.theme.spaceScale.spacing06};
  }
`;

const H1 = styled(Heading)<{ theme?: ThemeInterface }>`
  font-size: ${props =>
    props.theme.typographyVisualStyles.headingSmall.desktop.fontSize};
  line-height: ${props =>
    props.theme.typographyVisualStyles.headingSmall.desktop.lineHeight};
  margin: 0;
  padding-right: ${props => props.theme.spaceScale.spacing10};
`;

const CloseBtn = styled.span`
  position: absolute;
  top: 0;
  right: 0;
`;
const ModalBody = styled.div<{ theme?: ThemeInterface }>`
  padding: ${props => props.theme.spaceScale.spacing05};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    padding: ${props => props.theme.spaceScale.spacing06};
  }
`;

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (props, ref) => {
    const lastFocus = React.useRef<any>();
    const headingRef = React.useRef<any>();
    const bodyRef = React.useRef<any>();

    const id = useGenerateId(props.id);
    const headingId = `${id}_heading`;
    const contentId = `${id}_content`;

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(props.isOpen);
    const [isExiting, setIsExiting] = React.useState<boolean>(false);
    const [currentTarget, setCurrentTarget] = React.useState(null);

    const focusTrapElement = useFocusLock(
      isModalOpen,
      props.header ? headingRef : null,
      bodyRef
    );

    const prevOpen = usePrevious(props.isOpen);

    React.useEffect(() => {
      if (!prevOpen && props.isOpen) {
        setIsModalOpen(true);
      } else if (prevOpen && !props.isOpen && isModalOpen) {
        handleClose();
      }
    }, [props.isOpen]);

    React.useEffect(() => {
      if (isModalOpen) {
        lastFocus.current = document.activeElement;

        if (!props.isEscKeyDownDisabled) {
          document.body.addEventListener('keydown', handleEscapeKeyDown, false);
        }
      }

      return () => {
        document.body.removeEventListener(
          'keydown',
          handleEscapeKeyDown,
          false
        );
      };
    }, [isModalOpen]);

    function handleModalClick(event: React.SyntheticEvent) {
      if (
        !document.getElementById(contentId).contains(event.target as Node) &&
        event.target === currentTarget
      ) {
        handleClose(event);
      }
    }

    function handleModalOnMouseDown(event: React.SyntheticEvent) {
      setCurrentTarget(event.target);
    }

    function handleEscapeKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();

        props.onEscKeyDown &&
          typeof props.onEscKeyDown === 'function' &&
          props.onEscKeyDown(event);

        handleClose(event);
      }
    }

    function handleClose(event?) {
      if (event) {
        event.stopPropagation();
      }
      setIsExiting(true);

      setTimeout(() => {
        setIsExiting(false);
        setIsModalOpen(false);

        if (lastFocus.current) {
          lastFocus.current.focus();
        }

        props.onClose && typeof props.onClose === 'function' && props.onClose();
      }, 300);
    }

    const {
      children,
      closeAriaLabel,
      containerStyle,
      containerTransition = { slideTop: true },
      isBackgroundClickDisabled,
      isEscKeyDownDisabled,
      header,
      isCloseButtonHidden,
      isOpen,
      unmountOnExit = true,
      testId,
      ...rest
    } = props;

    const other = omit(['onEscKeyDown'], rest);
    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);

    const CloseIconButton = (
      <CloseIcon color={theme.colors.neutral03} size={theme.iconSizes.small} />
    );

    return (
      <div ref={focusTrapElement}>
        {isOpen && (
          <Global
            styles={css`
              html {
                overflow: hidden;
              }
            `}
          />
        )}
        <ModalContainer
          aria-labelledby={header ? headingId : null}
          aria-modal={true}
          data-testid={testId}
          id={id}
          onClick={isBackgroundClickDisabled ? null : handleModalClick}
          onMouseDown={
            isBackgroundClickDisabled ? null : handleModalOnMouseDown
          }
          role="dialog"
          style={containerStyle}
          theme={theme}
          isOpen={isModalOpen}
          {...containerTransition}
          unmountOnExit={unmountOnExit}
        >
          <ModalContent
            {...other}
            data-testid="modal-content"
            id={contentId}
            isExiting={isExiting}
            ref={ref}
            theme={theme}
          >
            {header && (
              <ModalHeader theme={theme}>
                {header && (
                  <H1
                    id={headingId}
                    level={1}
                    ref={headingRef}
                    visualStyle={TypographyVisualStyle.headingSmall}
                    tabIndex={-1}
                    theme={theme}
                  >
                    {header}
                  </H1>
                )}
              </ModalHeader>
            )}
            <ModalBody ref={bodyRef} theme={theme}>
              {children}
            </ModalBody>
            {!isCloseButtonHidden && (
              <CloseBtn>
                <IconButton
                  aria-label={
                    closeAriaLabel ? closeAriaLabel : i18n.modal.closeAriaLabel
                  }
                  color={ButtonColor.secondary}
                  icon={CloseIconButton}
                  onClick={handleClose}
                  testId="modal-closebtn"
                  variant={ButtonVariant.link}
                />
              </CloseBtn>
            )}
          </ModalContent>
        </ModalContainer>
        <ModalBackdrop
          data-testid="modal-backdrop"
          isExiting={isExiting}
          onMouseDown={
            isBackgroundClickDisabled ? event => event.preventDefault() : null
          }
          fade
          isOpen={isModalOpen}
          unmountOnExit
        />
      </div>
    );
  }
);
