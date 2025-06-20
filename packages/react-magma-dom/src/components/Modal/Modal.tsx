import * as React from 'react';

import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import ReactDOM from 'react-dom';
import { CloseIcon } from 'react-magma-icons';

import { useFocusLock } from '../../hooks/useFocusLock';
import { I18nContext } from '../../i18n';
import { useIsInverse } from '../../inverse';
import { magma, ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { omit, useGenerateId, usePrevious } from '../../utils';
import { ButtonColor, ButtonVariant } from '../Button';
import { Heading } from '../Heading';
import { IconButton } from '../IconButton';
import { Transition, TransitionProps } from '../Transition';
import { TypographyVisualStyle } from '../Typography';

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
   * Custom aria label ONLY for modals that do not have a header
   */
  ariaLabel?: string;
  /**
   * The text read by screen readers for the close button
   * @default "Close dialog"
   */
  closeAriaLabel?: string;
  /**
   * Style for the modal container
   */
  closeButtonSize?: keyof typeof magma.iconSizes;
  /**
   * Style for the modal container
   */
  containerStyle?: React.CSSProperties;
  /**
   * The content of the modal header
   */
  header?: React.ReactNode;
  /**
   * Function that returns reference for the header
   */
  headerRef?: (headerRef: React.Ref<any>) => void;
  /**
   * If true, closing the modal handled on the consumer side
   * @default false
   */
  isModalClosingControlledManually?: boolean;
  /**
   * If true, clicking the backdrop will not dismiss the modal
   * @default false
   */
  isBackgroundClickDisabled?: boolean;
  /**
   * If true, the close button the modal will be suppressed
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
  isInverse?: boolean;
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
  /**
   * @internal
   * @default true
   */
  showBackgroundOverlay?: boolean;
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

const ModalContainer = styled(Transition)<{
  theme: ThemeInterface;
  modalCount?: number;
}>`
  bottom: 0;
  left: 0;
  overflow-y: auto;
  padding: ${props => props.theme.spaceScale.spacing03};
  right: 0;
  top: 0;
  z-index: ${props => (props.modalCount >= 2 ? '999' : '998')};
`;

const ModalBackdrop = styled(Transition)<{
  theme: ThemeInterface;
}>`
  backdrop-filter: blur(3px);
  background: ${props => transparentize(0.4, props.theme.colors.neutral900)};
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 997;
  position: fixed;
`;

const ModalContent = styled.div<ModalProps>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary600
      : props.theme.colors.neutral100};
  border: ${props => {
    if (!props.showBackgroundOverlay && props.isInverse) {
      return `1px solid ${transparentize(0.5, props.theme.colors.tertiary)}`;
    }
    return 'none';
  }};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => {
    const amount = props.isInverse ? 0.82 : 0.6;
    return `0 2px 6px ${transparentize(amount, props.theme.colors.neutral900)}`;
  }};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
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
  padding: ${props => props.theme.spaceScale.spacing05}
    ${props => props.theme.spaceScale.spacing05} 0
    ${props => props.theme.spaceScale.spacing05};
  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    padding: ${props => props.theme.spaceScale.spacing06}
      ${props => props.theme.spaceScale.spacing06} 0
      ${props => props.theme.spaceScale.spacing06};
  }
`;

const ModalWrapper = styled.div<{ theme?: ThemeInterface }>`
  padding: ${props => props.theme.spaceScale.spacing05};
  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    padding: ${props => props.theme.spaceScale.spacing06};
  }
`;

const H1 = styled(Heading)<{ theme?: ThemeInterface; isInverse?: boolean }>`
  font-size: ${props =>
    props.theme.typographyVisualStyles.headingSmall.desktop.fontSize};
  line-height: ${props =>
    props.theme.typographyVisualStyles.headingSmall.desktop.lineHeight};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  margin: 0;
  padding-right: ${props => props.theme.spaceScale.spacing10};
  font-weight: 600;
`;

const CloseBtn = styled.span<{ theme?: ThemeInterface }>`
  position: absolute;
  top: 0;
  right: 0;
  margin: ${props => props.theme.spaceScale.spacing02};
`;

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (props, ref) => {
    const {
      ariaLabel,
      children,
      closeAriaLabel,
      closeButtonSize,
      containerStyle,
      containerTransition = { slideTop: true },
      isBackgroundClickDisabled,
      isEscKeyDownDisabled,
      header,
      isCloseButtonHidden,
      isOpen,
      unmountOnExit = true,
      testId,
      isModalClosingControlledManually,
      headerRef,
      onClose,
      showBackgroundOverlay = true,
      ...rest
    } = props;

    const lastFocus = React.useRef<any>();
    const headingRef = React.useRef<any>();
    const bodyRef = React.useRef<any>();

    const id = useGenerateId(props.id);
    const headingId = `${id}_heading`;
    const contentId = `${id}_content`;

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(isOpen);
    const [currentTarget, setCurrentTarget] = React.useState(null);
    const [modalCount, setModalCount] = React.useState<number>(0);

    const focusTrapElement = useFocusLock(isModalOpen, headingRef, bodyRef);

    const prevOpen = usePrevious(isOpen);

    React.useEffect(() => {
      if (
        isModalClosingControlledManually &&
        prevOpen &&
        !isOpen &&
        isModalOpen
      ) {
        setIsModalOpen(false);
      } else if (!prevOpen && isOpen) {
        setIsModalOpen(true);
        if (headerRef && typeof headerRef === 'function') {
          headerRef(headingRef);
        }
      } else if (prevOpen && !isOpen && isModalOpen) {
        handleClose();
      }
    }, [isOpen]);

    React.useEffect(() => {
      if (isModalOpen) {
        lastFocus.current = document.activeElement;
        const count = document.querySelectorAll('[aria-modal="true"]').length;
        setModalCount(count);

        if (!isEscKeyDownDisabled) {
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

        //Supports nested modals
        const modalsInDom = document.querySelectorAll(
          '[aria-modal="true"]'
        ).length;
        if (modalCount <= 1 && modalsInDom !== 1) {
          if (
            document.getElementById(id).contains(event.target as HTMLDivElement)
          ) {
            handleClose(event);
          } else {
            headingRef.current.focus();
          }
        } else {
          handleClose(event);
        }
      }
    }

    function handleClose(event?) {
      event?.stopPropagation();

      setTimeout(() => {
        if (!props.isModalClosingControlledManually) {
          setIsModalOpen(false);
        }

        lastFocus.current?.focus();

        onClose && typeof onClose === 'function' && onClose();
      }, 0);
    }

    const isInverse = useIsInverse(props.isInverse);

    const other = omit(['onEscKeyDown'], rest);
    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);

    const CloseIconButton = (
      <CloseIcon
        size={
          magma.iconSizes[closeButtonSize]
            ? magma.iconSizes[closeButtonSize]
            : magma.iconSizes.medium
        }
      />
    );

    return isModalOpen
      ? ReactDOM.createPortal(
          <div ref={focusTrapElement}>
            <Global
              styles={css`
                html {
                  overflow: ${isOpen ? 'hidden' : 'auto'};
                }
              `}
            />
            <ModalContainer
              aria-labelledby={header ? headingId : null}
              aria-label={!header ? ariaLabel : null}
              aria-modal
              data-testid={testId}
              id={id}
              modalCount={modalCount}
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
                ref={ref}
                showBackgroundOverlay={showBackgroundOverlay}
                theme={theme}
              >
                {header && (
                  <ModalHeader theme={theme}>
                    {header && (
                      <H1
                        id={headingId}
                        isInverse={isInverse}
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
                <ModalWrapper ref={bodyRef} theme={theme}>
                  {children}
                </ModalWrapper>
                {!isCloseButtonHidden && (
                  <CloseBtn theme={theme}>
                    <IconButton
                      aria-label={
                        closeAriaLabel
                          ? closeAriaLabel
                          : i18n.modal.closeAriaLabel
                      }
                      color={ButtonColor.primary}
                      icon={CloseIconButton}
                      isInverse={isInverse}
                      onClick={handleClose}
                      testId="modal-closebtn"
                      variant={ButtonVariant.link}
                    />
                  </CloseBtn>
                )}
              </ModalContent>
            </ModalContainer>
            {showBackgroundOverlay && (
              <ModalBackdrop
                data-testid="modal-backdrop"
                onMouseDown={
                  isBackgroundClickDisabled
                    ? event => event.preventDefault()
                    : null
                }
                fade
                isOpen={isModalOpen}
                style={modalCount >= 2 && { zIndex: '998' }}
                unmountOnExit
                theme={theme}
              />
            )}
          </div>,
          document.getElementsByTagName('body')[0]
        )
      : null;
  }
);
