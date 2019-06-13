import * as React from 'react';
import styled from '@emotion/styled';
import { Modal } from '../Modal';

// const HelperInformationContainer = styled.div`
//   position: absolute;
//   top: 0px;
//   bottom: 0px;
//   right: 0px;
//   left: 0px;
//   z-index: 2;
//   text-align: left;
//   overflow: auto;
//   background: rgb(255, 255, 255);
//   border-width: 1px;
//   border-style: solid;
//   border-color: rgb(219, 219, 219);
//   border-image: initial;
//   border-radius: 2px;
//   padding: 22px;
//   margin: 33px;
// `;

interface HelperInformationProps {
  open?: boolean;
  onClose?: () => void;
}

const KeyboardShortcutButtonWrapper = styled.span`
  font-family: monospace;
  font-size: 12px;
  text-transform: uppercase;
  background: rgb(242, 242, 242);
  padding: 2px 6px;
`;

export const HelperInformation: React.FunctionComponent<
  HelperInformationProps
> = ({ open, onClose }) => (
  <Modal header="Keyboard Shortcuts" open={open} onClose={onClose}>
    <ul id="DayPickerKeyboardShortcuts_description">
      <li>
        <div>
          <KeyboardShortcutButtonWrapper role="img" aria-label="Enter key,">
            ↵
          </KeyboardShortcutButtonWrapper>
        </div>
        <div>Select the date in focus.</div>
      </li>
      <li>
        <div>
          <KeyboardShortcutButtonWrapper
            role="img"
            aria-label="Right and left arrow keys,"
          >
            ←/→
          </KeyboardShortcutButtonWrapper>
        </div>
        <div>Move backward (left) and forward (right) by one day.</div>
      </li>
      <li>
        <div>
          <KeyboardShortcutButtonWrapper
            role="img"
            aria-label="up and down arrow keys,"
          >
            ↑/↓
          </KeyboardShortcutButtonWrapper>
        </div>
        <div>Move backward (up) and forward (down) by one week.</div>
      </li>
      <li>
        <div>
          <KeyboardShortcutButtonWrapper
            role="img"
            aria-label="page up and page down keys,"
          >
            PgUp/PgDn
          </KeyboardShortcutButtonWrapper>
        </div>
        <div>Switch months.</div>
      </li>
      <li>
        <div>
          <KeyboardShortcutButtonWrapper
            role="img"
            aria-label="Home and end keys,"
          >
            Home/End
          </KeyboardShortcutButtonWrapper>
        </div>
        <div>Go to the first or last day of a week.</div>
      </li>
      <li>
        <div>
          <KeyboardShortcutButtonWrapper role="img" aria-label="Escape key,">
            Esc
          </KeyboardShortcutButtonWrapper>
        </div>
        <div>Return to the date input field.</div>
      </li>
      <li>
        <div>
          <KeyboardShortcutButtonWrapper role="img" aria-label="Question mark,">
            ?
          </KeyboardShortcutButtonWrapper>
        </div>
        <div>Open this panel.</div>
      </li>
    </ul>
  </Modal>
);
