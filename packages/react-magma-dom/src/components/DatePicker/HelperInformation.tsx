import * as React from 'react';
import styled from '../../theme/styled';
import { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from '../Button';

import { IconButton } from '../IconButton';
import { Heading } from '../Heading';
import { ArrowBackIcon, CloseIcon } from 'react-magma-icons';
import { TypographyVisualStyle } from '../Typography';

import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';

interface HelperInformationProps {
  isOpen?: boolean;
  onClose?: (event?: React.SyntheticEvent) => void;
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
  margin-bottom: 12px;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  align-items: center;
  span {
    flex: 0 0 100px;
    overflow: hidden;
    line-height: 28px;
    min-height: 36px;
    height: max-content;
    text-align: center;
  }
  div {
    flex: 1;
  }
`;

const KeyboardShortcutButtonWrapper = styled.span`
  background: rgb(242, 242, 242);
  font-family: monospace;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  letter-spacing: ${props => props.theme.typeScale.size02.letterSpacing};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  margin-right: ${props => props.theme.spaceScale.spacing03};
  padding: ${props => props.theme.spaceScale.spacing02}
    ${props => props.theme.spaceScale.spacing04};
  text-transform: uppercase;
`;

const StyledPopup = styled.div`
  position: relative;
  background: white;
`;

const StyledNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px;
`;
const StyledContent = styled.div`
  z-index: 9999;
  position: relative;
  background: white;
  h2 {
    margin: 10px 0 12px 0;
  }
`;

export const HelperInformation: React.FunctionComponent<
  HelperInformationProps
> = (props: HelperInformationProps) => {
  const i18n = React.useContext(I18nContext);
  const theme = React.useContext(ThemeContext);

  return (
    <StyledPopup onClose={props.onClose} isOpen={props.isOpen}>
      <StyledNavContainer>
        <IconButton
          icon={<ArrowBackIcon />}
          size={ButtonSize.small}
          style={{ top: '4px', left: '-12px' }}
          variant={ButtonVariant.link}
          onClick={props.onClose}
        >
          Back to Calendar
        </IconButton>
        <IconButton
          aria-label={i18n.datePicker.calendarCloseAriaLabel}
          color={ButtonColor.secondary}
          icon={<CloseIcon />}
          size={ButtonSize.medium}
          style={{ left: '16px' }}
          type={ButtonType.button}
          onClick={props.onClose}
          variant={ButtonVariant.link}
        />
      </StyledNavContainer>
      <StyledContent>
        <Heading level={2} visualStyle={TypographyVisualStyle.headingXSmall}>
          {i18n.datePicker.helpModal.header}
        </Heading>
        <List id="DayPickerKeyboardShortcuts_description">
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              aria-label={i18n.datePicker.helpModal.enter.ariaLabel}
              role="img"
              theme={theme}
            >
              ↵
            </KeyboardShortcutButtonWrapper>
            <div>{i18n.datePicker.helpModal.enter.explanation}</div>
          </Item>
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              role="img"
              theme={theme}
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
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              role="img"
              theme={theme}
              aria-label={
                i18n.datePicker.helpModal.upAndDownArrowKeys.ariaLabel
              }
            >
              ↑/↓
            </KeyboardShortcutButtonWrapper>
            <div>
              {i18n.datePicker.helpModal.upAndDownArrowKeys.explanation}
            </div>
          </Item>
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              role="img"
              theme={theme}
              aria-label={
                i18n.datePicker.helpModal.pageUpAndPageDownKeys.ariaLabel
              }
            >
              {i18n.datePicker.helpModal.pageUpAndPageDownKeys.displayValue}
            </KeyboardShortcutButtonWrapper>
            <div>
              {i18n.datePicker.helpModal.pageUpAndPageDownKeys.explanation}
            </div>
          </Item>
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              role="img"
              theme={theme}
              aria-label={i18n.datePicker.helpModal.homeAndEndKeys.ariaLabel}
            >
              {i18n.datePicker.helpModal.homeAndEndKeys.displayValue}
            </KeyboardShortcutButtonWrapper>
            <div>{i18n.datePicker.helpModal.homeAndEndKeys.explanation}</div>
          </Item>
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              role="img"
              theme={theme}
              aria-label={i18n.datePicker.helpModal.escape.ariaLabel}
            >
              {i18n.datePicker.helpModal.escape.displayValue}
            </KeyboardShortcutButtonWrapper>
            <div>{i18n.datePicker.helpModal.escape.explanation}</div>
          </Item>
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              role="img"
              theme={theme}
              aria-label={i18n.datePicker.helpModal.questionMark.ariaLabel}
            >
              ?
            </KeyboardShortcutButtonWrapper>
            <div>{i18n.datePicker.helpModal.questionMark.explanation}</div>
          </Item>
        </List>
      </StyledContent>
    </StyledPopup>
  );
};
