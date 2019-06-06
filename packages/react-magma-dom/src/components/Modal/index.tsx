import * as React from 'react';
import styled from '@emotion/styled';
import { ModalCore } from 'react-magma-core';
import { ThemeContext } from '../../theme/themeContext';
import { Button } from '../Button';
import { ButtonColor, ButtonVariant } from '../StyledButton';
import { CrossIcon } from '../Icon/types/CrossIcon';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  closeLabel?: string;
  open?: boolean;
  disableBackdropClick?: boolean;
  disableEscKeyDown?: boolean;
  onClose?: () => void;
  onEscKeyDown: (event: React.KeyboardEvent) => void;
  header?: React.ReactNode;
  hideEscButton?: boolean;
  testId?: string;
}

const ModalContainer = styled.div<{ isExiting?: boolean }>`
  animation: ${props => (props.isExiting ? 'fadeout 1000ms' : 'fadein 1000ms')};
  bottom: 0;
  left: 0;
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
  background: rgba(0, 0, 0, 0.3);
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
  margin: 30px auto;
  max-width: 750px;
  position: relative;
  z-index: 1000;
  width: 90%;
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
              ...other
            } = props;

            return open ? (
              <>
                <ModalContainer
                  ref={focusTrapElement}
                  isExiting={isExiting}
                  onKeyDown={disableEscKeyDown ? null : onKeyDown}
                >
                  <ModalBackdrop
                    data-testid="modal-backdrop"
                    onClick={disableBackdropClick ? null : onClose}
                  />
                  <ModalContent ref={ref} theme={theme} {...other}>
                    <ModalHeader theme={theme}>
                      {header && <H3 theme={theme}>{header}</H3>}

                      {!hideEscButton && (
                        <CloseBtn>
                          <Button
                            ariaLabel={closeLabel ? closeLabel : 'Close'}
                            color={ButtonColor.secondary}
                            icon={<CrossIcon />}
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
