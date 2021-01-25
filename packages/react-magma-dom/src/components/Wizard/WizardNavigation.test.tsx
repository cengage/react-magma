/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  
  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
      http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.                                                                              *
 ******************************************************************************************************************** */
import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { WizardStepProps, WizardNavigation } from '.';
import { TabsOrientation } from '../Tabs/shared';

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
