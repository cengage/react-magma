import * as React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { ModalCore } from 'react-magma-core';
import { ThemeContext } from '../../theme/themeContext';
import { Button } from '../Button';
import { ButtonColor, ButtonVariant } from '../StyledButton';
import { CrossIcon } from '../Icon/types/CrossIcon';

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
  onClose?: () => void;
  onEscKeyDown?: (event: React.KeyboardEvent) => void;
  open?: boolean;
  size?: ModalSize;
  testId?: string;
}

const ModalContainer = styled.div<{ isExiting?: boolean }>`
  animation: ${props => (props.isExiting ? 'fadeout 1000ms' : 'fadein 1000ms')};
  bottom: 0;
  left: 0;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 998;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
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

const ModalBackdrop = styled.div`
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: 999;
`;

const ModalContent = styled.div<ModalProps>`
  background: ${props => props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${props => props.theme.colors.neutral06};
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin: 10px;
  position: relative;
  z-index: 1000;

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

const H3 = styled.h3`
  border-bottom: 1px solid;
  border-color: ${props => props.theme.colors.neutral06};
  color: ${props => props.theme.colors.primary};
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

export const Modal: React.FunctionComponent<ModalProps> = React.forwardRef(
  (props: ModalProps, ref: any) => (
    <ThemeContext.Consumer>
      {theme => (
        <ModalCore open={props.open} onClose={props.onClose}>
          {({ isExiting, onClose, onKeyDown, focusTrapElement }) => {
            const {
              children,
              closeLabel,
              disableBackdropClick,
              disableEscKeyDown,
              header,
              hideEscButton,
              open,
              size,
              ...other
            } = props;

            const CloseIcon = <CrossIcon color={theme.colors.neutral04} />;

            return open ? (
              <>
                <Global
                  styles={css`
                    html {
                      overflow: hidden;
                    }
                  `}
                />

                <ModalContainer
                  ref={focusTrapElement}
                  isExiting={isExiting}
                  onKeyDown={disableEscKeyDown ? null : onKeyDown}
                >
                  <ModalBackdrop
                    data-testid="modal-backdrop"
                    onClick={disableBackdropClick ? null : onClose}
                  />
                  <ModalContent
                    ref={ref}
                    size={size}
                    data-testid="modal-content"
                    theme={theme}
                    {...other}
                  >
                    <ModalHeader theme={theme}>
                      {header && <H3 theme={theme}>{header}</H3>}

                      {!hideEscButton && (
                        <CloseBtn>
                          <Button
                            ariaLabel={closeLabel ? closeLabel : 'Close'}
                            color={ButtonColor.secondary}
                            icon={CloseIcon}
                            onClick={onClose}
                            style={{
                              borderRadius: 0,
                              margin: 0,
                              outlineOffset: 0
                            }}
                            testId="modal-closebtn"
                            variant={ButtonVariant.link}
                          />
                        </CloseBtn>
                      )}
                    </ModalHeader>
                    <ModalBody>{children}</ModalBody>
                  </ModalContent>
                </ModalContainer>
              </>
            ) : null;
          }}
        </ModalCore>
      )}
    </ThemeContext.Consumer>
  )
);
