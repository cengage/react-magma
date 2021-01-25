import * as React from 'react';
import { Card } from '../Card';
import {
  WizardStep,
  WizardStepProps,
  WizardNavigation,
  NavigationStepClickProps,
} from '.';
import { Button, ButtonColor, ButtonVariant } from '../Button';
import { Spinner, SpinnerProps } from '../Spinner';
import { TabsContainer } from '../Tabs/TabsContainer';
import { magma } from '../../theme/magma';
import styled from '@emotion/styled';
import { TabsOrientation } from '../Tabs';

const StyledSpinner = styled(Spinner)<SpinnerProps>`
  margin: '0 0 0 10px';
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
  getStepNumberLabel?: (stepNumber: number) => string;
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
  disableStepNavigation?: boolean;
}

export const WizardInner = React.forwardRef<HTMLDivElement, WizardInnerProps>(
  (
    {
      step,
      stepsInfo,
      stepCount,
      orientation,
      activeStepIndex,
      maxStepIndex,
      getStepNumberLabel = (stepNumber: number) => `Step ${stepNumber}`,
      isLoadingNextStep = false,
      disableStepNavigation = false,
      onNextButtonClick,
      onPreviousButtonClick,
      onStepNavigationClick,
      onSubmitButtonClick,
      onCancelButtonClick,
    },
    ref
  ) => {
    const actions = React.useMemo(() => {
      if (activeStepIndex === 0) {
        return (
          <ActionContainer>
            <Button variant={ButtonVariant.link} onClick={onCancelButtonClick}>
              CANCEL
            </Button>
            <Button color={ButtonColor.primary} onClick={onNextButtonClick}>
              NEXT{' '}
              {isLoadingNextStep && (
                <StyledSpinner color={magma.colors.focusInverse} />
              )}
            </Button>
          </ActionContainer>
        );
      }

      if (activeStepIndex === stepCount - 1) {
        return (
          <ActionContainer>
            <Button variant={ButtonVariant.link} onClick={onCancelButtonClick}>
              CANCEL
            </Button>
            <Button
              color={ButtonColor.secondary}
              onClick={onPreviousButtonClick}
            >
              PREVIOUS
            </Button>
            <Button color={ButtonColor.primary} onClick={onSubmitButtonClick}>
              SUBMIT{' '}
              {isLoadingNextStep && (
                <StyledSpinner color={magma.colors.focusInverse} />
              )}
            </Button>
          </ActionContainer>
        );
      }

      return (
        <ActionContainer>
          <Button variant={ButtonVariant.link} onClick={onCancelButtonClick}>
            CANCEL
          </Button>
          <Button color={ButtonColor.secondary} onClick={onPreviousButtonClick}>
            PREVIOUS
          </Button>
          <Button color={ButtonColor.primary} onClick={onNextButtonClick}>
            NEXT{' '}
            {isLoadingNextStep && (
              <StyledSpinner color={magma.colors.focusInverse} />
            )}
          </Button>
        </ActionContainer>
      );
    }, [activeStepIndex, stepCount, isLoadingNextStep]);

    return (
      <Card>
        <TabsContainer activeIndex={activeStepIndex}>
          <WizardNavigation
            disableStepNavigation={disableStepNavigation}
            steps={stepsInfo}
            getStepNumberLabel={getStepNumberLabel}
            activeStepIndex={activeStepIndex}
            maxStepIndex={maxStepIndex}
            orientation={orientation}
            onStepNavigationClick={onStepNavigationClick}
          />
          <StyledContainer>
            <WizardStep {...step} />
            {actions}
          </StyledContainer>
        </TabsContainer>
      </Card>
    );
  }
);
