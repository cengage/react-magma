import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/themeContext';
import { Button } from '../Button';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpen?: (event) => void;
  onClose?: (event) => void;
  header?: React.ReactNode;
  testId?: string;
}

const ModalHeading = styled.h3`
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
  ({ children, header, onClose, open, ...other }: ModalProps, ref: any) => (
    <ThemeContext.Consumer>
      {theme => (
        <>
          {open && (
            <>
              {' '}
              <ModalBackdrop />
              <ModalContent ref={ref} theme={theme} {...other}>
                <ModalHeading theme={theme}>
                  {header}
                  <Button onClick={onClose}>Close</Button>
                </ModalHeading>
                <ModalBody>{children}</ModalBody>
              </ModalContent>{' '}
            </>
          )}
        </>
      )}
    </ThemeContext.Consumer>
  )
);
