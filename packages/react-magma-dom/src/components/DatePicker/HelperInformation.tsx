import * as React from 'react';
import { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from '../Button';

import { IconButton } from '../IconButton';
import { Heading } from '../Heading';
import { ArrowBackIcon, CloseIcon } from 'react-magma-icons';
import { TypographyVisualStyle } from '../Typography';

import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';
import styled from '@emotion/styled';
import { useFocusLock } from '../../hooks/useFocusLock';

interface HelperInformationProps {
  isInverse?: boolean;
  isOpen?: boolean;
  onReturnBack?: (event?: React.SyntheticEvent) => void;
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

const KeyboardShortcutButtonWrapper = styled.span<{
  isInverse?: boolean;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary400
      : props.theme.colors.neutral200};
  font-family: monospace;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  letter-spacing: ${props => props.theme.typeScale.size02.letterSpacing};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  margin-right: ${props => props.theme.spaceScale.spacing03};
  text-transform: uppercase;
  padding: ${props => props.theme.spaceScale.spacing02}
    ${props => props.theme.spaceScale.spacing04};
`;

const StyledPopup = styled.div`
  position: relative;
`;

const StyledNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px;
`;
const StyledContent = styled.div<{
  isInverse?: boolean;
}>`
  z-index: 9999;
  position: relative;
  color: ${props =>
    props.isInverse
      ? props?.theme?.colors?.neutral100
      : props?.theme?.colors?.neutral700};

  h2 {
    margin: 10px 0 12px 0;
  }
`;

const StyledDescription = styled.p`
  font-family: ${props => props.theme.bodyFont};
  margin: 0;
`;

export const HelperInformation: React.FunctionComponent<
  HelperInformationProps
> = (props: HelperInformationProps) => {
  const i18n = React.useContext(I18nContext);
  const theme = React.useContext(ThemeContext);
  const helperInformationRef = useFocusLock(true);

  const isInverse = useIsInverse(props.isInverse);

  return (
    <StyledPopup ref={helperInformationRef}>
      <StyledNavContainer>
        <IconButton
          icon={<ArrowBackIcon />}
          isInverse={isInverse}
          size={ButtonSize.small}
          style={{ top: '4px', left: '-12px' }}
          variant={ButtonVariant.link}
          onClick={props.onReturnBack}
        >
          Back to Calendar
        </IconButton>
        <IconButton
          aria-label={i18n.datePicker.calendarCloseAriaLabel}
          color={ButtonColor.secondary}
          icon={<CloseIcon />}
          isInverse={isInverse}
          size={ButtonSize.medium}
          style={{ left: '16px', margin: '4px' }}
          type={ButtonType.button}
          onClick={props.onClose}
          variant={ButtonVariant.link}
        />
      </StyledNavContainer>
      <StyledContent isInverse={isInverse}>
        <Heading
          level={2}
          visualStyle={TypographyVisualStyle.headingXSmall}
          isInverse={isInverse}
        >
          {i18n.datePicker.helpModal.header}
        </Heading>
        <List id="DayPickerKeyboardShortcuts_description">
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              aria-label={i18n.datePicker.helpModal.enter.ariaLabel}
              isInverse={isInverse}
              role="img"
              theme={theme}
            >
              ↵
            </KeyboardShortcutButtonWrapper>
            <StyledDescription theme={theme}>
              {i18n.datePicker.helpModal.enter.explanation}
            </StyledDescription>
          </Item>
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              role="img"
              theme={theme}
              aria-label={
                i18n.datePicker.helpModal.rightAndLeftArrowKeys.ariaLabel
              }
              isInverse={isInverse}
            >
              ←/→
            </KeyboardShortcutButtonWrapper>
            <StyledDescription theme={theme}>
              {i18n.datePicker.helpModal.rightAndLeftArrowKeys.explanation}
            </StyledDescription>
          </Item>
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              role="img"
              theme={theme}
              aria-label={
                i18n.datePicker.helpModal.upAndDownArrowKeys.ariaLabel
              }
              isInverse={isInverse}
            >
              ↑/↓
            </KeyboardShortcutButtonWrapper>
            <StyledDescription theme={theme}>
              {i18n.datePicker.helpModal.upAndDownArrowKeys.explanation}
            </StyledDescription>
          </Item>
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              role="img"
              theme={theme}
              aria-label={
                i18n.datePicker.helpModal.pageUpAndPageDownKeys.ariaLabel
              }
              isInverse={isInverse}
            >
              {i18n.datePicker.helpModal.pageUpAndPageDownKeys.displayValue}
            </KeyboardShortcutButtonWrapper>
            <StyledDescription theme={theme}>
              {i18n.datePicker.helpModal.pageUpAndPageDownKeys.explanation}
            </StyledDescription>
          </Item>
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              role="img"
              theme={theme}
              aria-label={i18n.datePicker.helpModal.homeAndEndKeys.ariaLabel}
              isInverse={isInverse}
            >
              {i18n.datePicker.helpModal.homeAndEndKeys.displayValue}
            </KeyboardShortcutButtonWrapper>
            <StyledDescription theme={theme}>
              {i18n.datePicker.helpModal.homeAndEndKeys.explanation}
            </StyledDescription>
          </Item>
          <Item theme={theme}>
            <KeyboardShortcutButtonWrapper
              role="img"
              theme={theme}
              aria-label={i18n.datePicker.helpModal.escape.ariaLabel}
              isInverse={isInverse}
            >
              {i18n.datePicker.helpModal.escape.displayValue}
            </KeyboardShortcutButtonWrapper>
            <StyledDescription theme={theme}>
              {i18n.datePicker.helpModal.escape.explanation}
            </StyledDescription>
          </Item>
        </List>
      </StyledContent>
    </StyledPopup>
  );
};
