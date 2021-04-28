import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { WizardStepProps, WizardNavigation } from '.';
import { TabsOrientation } from 'react-magma-dom';

describe('StepNavigation', () => {
  it('should render title as heading', () => {
    const steps: WizardStepProps[] = [
      {
        title: 'Step Title 1',
        optional: false,
      },
      {
        title: 'Step Title 2',
        optional: false,
      },
      {
        title: 'Step Title 3',
        optional: false,
      },
    ];
    const { getByText } = render(
      <WizardNavigation
        aria-label="hello"
        steps={steps}
        maxStepIndex={2}
        optionalText="Optional"
        orientation={TabsOrientation.horizontal}
      />
    );

    expect(getByText('Step Title 1')).toBeInTheDocument();
    expect(getByText('Step Title 2')).toBeInTheDocument();
    expect(getByText('Step Title 3')).toBeInTheDocument();
  });

  it('should render optional label', () => {
    const steps: WizardStepProps[] = [
      {
        title: 'Step Title 1',
        optional: true,
      },
      {
        title: 'Step Title 2',
        optional: false,
      },
    ];
    const { getByText } = render(
      <WizardNavigation
        aria-label="Navigation"
        steps={steps}
        maxStepIndex={2}
        optionalText="Optional label"
        orientation={TabsOrientation.horizontal}
      />
    );
    expect(getByText('Optional label', { exact: false })).toBeInTheDocument();
  });

  it('should navigate between steps', () => {
    const steps: WizardStepProps[] = [
      {
        title: 'Step Title 1',
        optional: false,
      },
      {
        title: 'Step Title 2',
        optional: false,
      },
      {
        title: 'Step Title 3',
        optional: false,
      },
    ];
    const handleStepNavigationClick = jest.fn();
    const { getByText } = render(
      <WizardNavigation
        aria-label="Navigation"
        steps={steps}
        maxStepIndex={2}
        optionalText="Optional label"
        onStepNavigationClick={handleStepNavigationClick}
        orientation={TabsOrientation.horizontal}
      />
    );

    act(() => {
      fireEvent.click(getByText('Step Title 2'));
      expect(handleStepNavigationClick).toHaveBeenCalledWith({
        requestedStepIndex: 1,
      });
    });
  });
});
