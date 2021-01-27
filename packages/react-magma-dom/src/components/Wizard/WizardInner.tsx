import * as React from 'react';
import { Card } from '../Card';
import {
  WizardStep,
  WizardStepProps,
  WizardNavigation,
  NavigationStepClickProps,
} from '.';
import { HeadingProps } from '../Heading';
import { ParagraphProps } from '../Paragraph';
import { Button, ButtonColor, ButtonVariant } from '../Button';
import { Spinner, SpinnerProps } from '../Spinner';
import { TabsContainer } from '../Tabs/TabsContainer';
import styled from '@emotion/styled';
import { TabsOrientation } from '../Tabs';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';

const StyledSpinner = styled(Spinner)<SpinnerProps>`
  margin: ${props => `0 0 0 ${props.theme.spaceScale.spacing03}`};
`;

const StyledContainer = styled.div`
  flex-grow: 1;
`;

const ActionContainer = styled.div`
  text-align: right;
`;

export interface WizardInnerProps {
  step: WizardStepProps;
  stepsInfo: WizardStepProps[];
  stepCount: number;
  activeStepIndex: number;
  maxStepIndex: number;
  optionalText?: string;
  isLoadingNextStep?: boolean;
  orientation: TabsOrientation;
  onCancelButtonClick: () => void;
  onPreviousButtonClick: () => void;
  onNextButtonClick: () => void;
  onSubmitButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onStepNavigationClick?: (
    navigationStepClickProps: NavigationStepClickProps
  ) => void;
  headingProps?: HeadingProps;
  paragraphProps?: ParagraphProps;
}

export const WizardInner = React.forwardRef<HTMLDivElement, WizardInnerProps>(
  (
    {
      step,
      optionalText,
      stepsInfo,
      stepCount,
      orientation,
      activeStepIndex,
      maxStepIndex,
      isLoadingNextStep = false,
      onNextButtonClick,
      onPreviousButtonClick,
      onStepNavigationClick,
      onSubmitButtonClick,
      onCancelButtonClick,
    },
    ref
  ) => {
    const i18n = React.useContext(I18nContext);
    const theme = React.useContext(ThemeContext);

    const actions = React.useMemo(() => {
      if (activeStepIndex === 0) {
        return (
          <ActionContainer>
            <Button variant={ButtonVariant.link} onClick={onCancelButtonClick}>
              {i18n.wizard.actions.cancel}
            </Button>
            <Button color={ButtonColor.primary} onClick={onNextButtonClick}>
              {i18n.wizard.actions.next}{' '}
              {!isLoadingNextStep && (
                <StyledSpinner
                  theme={theme}
                  color={theme.colors.focusInverse}
                />
              )}
            </Button>
          </ActionContainer>
        );
      }

      if (activeStepIndex === stepCount - 1) {
        return (
          <ActionContainer>
            <Button variant={ButtonVariant.link} onClick={onCancelButtonClick}>
              {i18n.wizard.actions.cancel}
            </Button>
            <Button
              color={ButtonColor.secondary}
              onClick={onPreviousButtonClick}
            >
              {i18n.wizard.actions.previous}
            </Button>
            <Button color={ButtonColor.primary} onClick={onSubmitButtonClick}>
              {i18n.wizard.actions.submit}
              {isLoadingNextStep && (
                <StyledSpinner
                  theme={theme}
                  color={theme.colors.focusInverse}
                />
              )}
            </Button>
          </ActionContainer>
        );
      }

      return (
        <ActionContainer>
          <Button variant={ButtonVariant.link} onClick={onCancelButtonClick}>
            {i18n.wizard.actions.cancel}
          </Button>
          <Button color={ButtonColor.secondary} onClick={onPreviousButtonClick}>
            {i18n.wizard.actions.previous}
          </Button>
          <Button color={ButtonColor.primary} onClick={onNextButtonClick}>
            {i18n.wizard.actions.next}
            {isLoadingNextStep && (
              <StyledSpinner theme={theme} color={theme.colors.focusInverse} />
            )}
          </Button>
        </ActionContainer>
      );
    }, [activeStepIndex, stepCount, isLoadingNextStep]);

    return (
      <Card>
        <TabsContainer activeIndex={activeStepIndex}>
          <WizardNavigation
            navigationLabel={i18n.wizard.navigationLabel}
            steps={stepsInfo}
            maxStepIndex={maxStepIndex}
            orientation={orientation}
            onStepNavigationClick={onStepNavigationClick}
            optionalText={optionalText || i18n.wizard.optional}
          />
          <StyledContainer theme={theme}>
            <WizardStep
              optionalText={optionalText || i18n.wizard.optional}
              {...step}
            />
            {actions}
          </StyledContainer>
        </TabsContainer>
      </Card>
    );
  }
);
