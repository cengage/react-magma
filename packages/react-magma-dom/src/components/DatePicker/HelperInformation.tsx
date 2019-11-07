import * as React from 'react';
import styled from '../../theme/styled';
import { Modal, ModalSize } from '../Modal';

interface HelperInformationProps {
  open?: boolean;
  onClose?: () => void;
}

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
`;

const Item = styled.li`
  display: flex;
  list-style: none;
`;

const KeyboardShortcutButtonWrapper = styled.span`
  background: rgb(242, 242, 242);
  font-family: monospace;
  font-size: 12px;
  margin-right: 10px;
  padding: 2px 6px;
  text-transform: uppercase;
`;

export const HelperInformation: React.FunctionComponent<
  HelperInformationProps
> = ({ open, onClose }) => (
  <Modal
    disableBackdropClick
    header="Keyboard Shortcuts"
    onClose={onClose}
    open={open}
    size={ModalSize.small}
  >
    <List id="DayPickerKeyboardShortcuts_description">
      <Item>
        <KeyboardShortcutButtonWrapper role="img" aria-label="Enter key,">
          ↵
        </KeyboardShortcutButtonWrapper>
        <div>Select the date in focus.</div>
      </Item>
      <Item>
        <KeyboardShortcutButtonWrapper
          role="img"
          aria-label="Right and left arrow keys,"
        >
          ←/→
        </KeyboardShortcutButtonWrapper>
        <div>Move backward (left) and forward (right) by one day.</div>
      </Item>
      <Item>
        <KeyboardShortcutButtonWrapper
          role="img"
          aria-label="up and down arrow keys,"
        >
          ↑/↓
        </KeyboardShortcutButtonWrapper>
        <div>Move backward (up) and forward (down) by one week.</div>
      </Item>
      <Item>
        <KeyboardShortcutButtonWrapper
          role="img"
          aria-label="page up and page down keys,"
        >
          PgUp/PgDn
        </KeyboardShortcutButtonWrapper>
        <div>Switch months.</div>
      </Item>
      <Item>
        <KeyboardShortcutButtonWrapper
          role="img"
          aria-label="Home and end keys,"
        >
          Home/End
        </KeyboardShortcutButtonWrapper>
        <div>Go to the first or last day of a week.</div>
      </Item>
      <Item>
        <KeyboardShortcutButtonWrapper role="img" aria-label="Escape key,">
          Esc
        </KeyboardShortcutButtonWrapper>
        <div>Return to the date input field.</div>
      </Item>
      <Item>
        <KeyboardShortcutButtonWrapper role="img" aria-label="Question mark,">
          ?
        </KeyboardShortcutButtonWrapper>
        <div>Open this panel.</div>
      </Item>
    </List>
  </Modal>
);
