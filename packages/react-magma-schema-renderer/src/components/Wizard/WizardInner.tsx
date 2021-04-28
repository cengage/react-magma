import * as React from 'react';
import {
  WizardStep,
  WizardStepProps,
  WizardNavigation,
  NavigationStepClickProps,
} from '.';
import {
  I18nContext,
  TabsContainer,
  ThemeContext,
  ThemeInterface,
  TabsOrientation,
  Button,
  ButtonColor,
  TabsBorderPosition,
  ButtonVariant,
  Spinner,
  SpinnerProps,
  HeadingProps,
  ParagraphProps,
} from 'react-magma-dom';
import styled from '@emotion/styled';

export interface VerticalTabsProps {
  orientation?: TabsOrientation.vertical;
  borderPosition?: TabsBorderPosition.left | TabsBorderPosition.right;
}
export interface HorizontalTabsProps {
  orientation?: TabsOrientation.horizontal;
  borderPosition?: TabsBorderPosition.bottom | TabsBorderPosition.top;
}

export declare type Orientation = HorizontalTabsProps | VerticalTabsProps;

const StyledSpinner = styled(Spinner)<SpinnerProps & { theme: ThemeInterface }>`
  margin: ${props => `0 0 0 ${props.theme.spaceScale.spacing03}`};
`;

const StyledContainer = styled.div`
  flex-grow: 1;
`;

const ActionContainer = styled.div<{ theme: ThemeInterface }>`
  margin: ${props => ` 0 ${props.theme.spaceScale.spacing05}`};
  text-align: right;

  button:last-of-type {
    margin-right: 0;
  }
`;

export interface WizardInnerProps {
  step: WizardStepProps;
  stepsInfo: WizardStepProps[];
  stepCount: number;
  activeStepIndex: number;
  maxStepIndex: number;
  optionalText?: string;
  isLoadingNextStep?: boolean;
  orientation?: TabsOrientation;
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

export const WizardInner = React.forwardRef<
  HTMLDivElement,
  WizardInnerProps & Orientation
>((props, ref) => {
  const {
    step,
    optionalText,
    stepsInfo,
    stepCount,
    activeStepIndex,
    maxStepIndex,
    isLoadingNextStep = false,
    onNextButtonClick,
    onPreviousButtonClick,
    onStepNavigationClick,
    onSubmitButtonClick,
    onCancelButtonClick,
    ...other
  } = props;

  const i18n = React.useContext(I18nContext);
  const theme = React.useContext(ThemeContext);

  const actions = React.useMemo(() => {
    if (activeStepIndex === 0) {
      return (
        <ActionContainer theme={theme}>
          <Button variant={ButtonVariant.link} onClick={onCancelButtonClick}>
            {i18n.wizard.actions.cancel}
          </Button>
          <Button
            color={ButtonColor.primary}
            disabled={isLoadingNextStep}
            onClick={onNextButtonClick}
          >
            {i18n.wizard.actions.next}{' '}
            {isLoadingNextStep && (
              <StyledSpinner theme={theme} color={theme.colors.focusInverse} />
            )}
          </Button>
        </ActionContainer>
      );
    }

    if (activeStepIndex === stepCount - 1) {
      return (
        <ActionContainer theme={theme}>
          <Button variant={ButtonVariant.link} onClick={onCancelButtonClick}>
            {i18n.wizard.actions.cancel}
          </Button>
          <Button color={ButtonColor.secondary} onClick={onPreviousButtonClick}>
            {i18n.wizard.actions.previous}
          </Button>
          <Button
            color={ButtonColor.primary}
            disabled={isLoadingNextStep}
            onClick={onSubmitButtonClick}
          >
            {i18n.wizard.actions.submit}
            {isLoadingNextStep && (
              <StyledSpinner theme={theme} color={theme.colors.focusInverse} />
            )}
          </Button>
        </ActionContainer>
      );
    }

    return (
      <ActionContainer theme={theme}>
        <Button variant={ButtonVariant.link} onClick={onCancelButtonClick}>
          {i18n.wizard.actions.cancel}
        </Button>
        <Button color={ButtonColor.secondary} onClick={onPreviousButtonClick}>
          {i18n.wizard.actions.previous}
        </Button>
        <Button
          color={ButtonColor.primary}
          disabled={isLoadingNextStep}
          onClick={onNextButtonClick}
        >
          {i18n.wizard.actions.next}
          {isLoadingNextStep && (
            <StyledSpinner theme={theme} color={theme.colors.focusInverse} />
          )}
        </Button>
      </ActionContainer>
    );
  }, [activeStepIndex, stepCount, isLoadingNextStep]);

  return (
    <TabsContainer activeIndex={activeStepIndex} ref={ref}>
      <WizardNavigation
        {...other}
        aria-label={i18n.wizard.navigationLabel}
        maxStepIndex={maxStepIndex}
        onStepNavigationClick={onStepNavigationClick}
        optionalText={optionalText || i18n.wizard.optional}
        steps={stepsInfo}
      />
      <StyledContainer theme={theme}>
        <WizardStep
          {...other}
          optionalText={optionalText || i18n.wizard.optional}
          {...step}
        />
        {actions}
      </StyledContainer>
    </TabsContainer>
  );
});
