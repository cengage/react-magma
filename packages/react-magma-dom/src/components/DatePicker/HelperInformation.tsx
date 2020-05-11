import * as React from 'react';
import styled from '../../theme/styled';
import { Modal, ModalSize } from '../Modal';
import { I18nContext } from '../../i18n';

interface HelperInformationProps {
  isOpen?: boolean;
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
> = ({ isOpen, onClose }) => {
  const i18n = React.useContext(I18nContext);

  return (
    <Modal
      isBackgroundClickDisabled
      header={i18n.datePicker.helpModal.header}
      onClose={onClose}
      isOpen={isOpen}
      size={ModalSize.small}
    >
      <List id="DayPickerKeyboardShortcuts_description">
        <Item>
          <KeyboardShortcutButtonWrapper
            role="img"
            aria-label={i18n.datePicker.helpModal.enter.ariaLabel}
          >
            ↵
          </KeyboardShortcutButtonWrapper>
          <div>{i18n.datePicker.helpModal.enter.explanation}</div>
        </Item>
        <Item>
          <KeyboardShortcutButtonWrapper
            role="img"
            aria-label={
              i18n.datePicker.helpModal.rightAndLeftArrowKeys.ariaLabel
            }
          >
            ←/→
          </KeyboardShortcutButtonWrapper>
          <div>
            {i18n.datePicker.helpModal.rightAndLeftArrowKeys.explanation}
          </div>
        </Item>
        <Item>
          <KeyboardShortcutButtonWrapper
            role="img"
            aria-label={i18n.datePicker.helpModal.upAndDownArrowKeys.ariaLabel}
          >
            ↑/↓
          </KeyboardShortcutButtonWrapper>
          <div>{i18n.datePicker.helpModal.upAndDownArrowKeys.explanation}</div>
        </Item>
        <Item>
          <KeyboardShortcutButtonWrapper
            role="img"
            aria-label={
              i18n.datePicker.helpModal.pageUpAndPageDownKeys.ariaLabel
            }
          >
            PgUp/PgDn
          </KeyboardShortcutButtonWrapper>
          <div>
            {i18n.datePicker.helpModal.pageUpAndPageDownKeys.explanation}
          </div>
        </Item>
        <Item>
          <KeyboardShortcutButtonWrapper
            role="img"
            aria-label={i18n.datePicker.helpModal.homeAndEndKeys.ariaLabel}
          >
            Home/End
          </KeyboardShortcutButtonWrapper>
          <div>{i18n.datePicker.helpModal.homeAndEndKeys.explanation}</div>
        </Item>
        <Item>
          <KeyboardShortcutButtonWrapper
            role="img"
            aria-label={i18n.datePicker.helpModal.escape.ariaLabel}
          >
            Esc
          </KeyboardShortcutButtonWrapper>
          <div>{i18n.datePicker.helpModal.escape.explanation}</div>
        </Item>
        <Item>
          <KeyboardShortcutButtonWrapper
            role="img"
            aria-label={i18n.datePicker.helpModal.questionMark.ariaLabel}
          >
            ?
          </KeyboardShortcutButtonWrapper>
          <div>{i18n.datePicker.helpModal.questionMark.explanation}</div>
        </Item>
      </List>
    </Modal>
  );
};
