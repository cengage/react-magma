import * as React from 'react';
import styled from '@emotion/styled';
import { ModalCore } from 'react-magma-core';
import { ThemeContext } from '../../theme/themeContext';
import { Heading } from '../Heading';
import { Button } from '../Button';
import FocusTrap from 'focus-trap-react';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
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

const ModalHeading = styled.div`
    color: ${props => props.theme.colors.foundation01};
    font-family: color: ${props => props.theme.headingFont};
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const ModalContent = styled.div<ModalProps>`
  background: ${props => props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${props => props.theme.colors.neutral06};
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 50px;
  z-index: 1000;
  width: 100%;
`;

export const Modal: React.FunctionComponent<ModalProps> = React.forwardRef(
  (props: ModalProps, ref: any) => (
    <ThemeContext.Consumer>
      {theme => (
        <ModalCore open={props.open} onClose={props.onClose}>
          {({ isExiting, onClose, onKeyDown }) => {
            const {
              children,
              disableBackdropClick,
              disableEscKeyDown,
              header,
              hideEscButton,
              open,
              ...other
            } = props;
            return (
              <>
                {open && (
                  <FocusTrap
                    active={open}
                    focusTrapOptions={{
                      clickOutsideDeactivates: false,
                      escapeDeactivates: false
                    }}
                  >
                    <ModalContainer
                      isExiting={isExiting}
                      onKeyDown={disableEscKeyDown ? null : onKeyDown}
                    >
                      <ModalBackdrop
                        onClick={disableBackdropClick ? null : onClose}
                      />
                      <ModalContent ref={ref} theme={theme} {...other}>
                        <ModalHeading theme={theme}>
                          <Heading level={3}>{header}</Heading>
                          {!hideEscButton && (
                            <Button onClick={onClose}>Close</Button>
                          )}
                        </ModalHeading>
                        <ModalBody>{children}</ModalBody>
                      </ModalContent>
                    </ModalContainer>
                  </FocusTrap>
                )}
              </>
            );
          }}
        </ModalCore>
      )}
    </ThemeContext.Consumer>
  )
);
