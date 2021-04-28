import React from 'react';
import { render } from '@testing-library/react';
import { WizardStep } from '.';

describe('Step', () => {
  it('should render title as heading and content', () => {
    const { getByText } = render(
      <WizardStep title="WizardStep Title">content</WizardStep>
    );

    expect(getByText('WizardStep Title')).toBeInTheDocument();
    expect(getByText('WizardStep Title').closest('h4')).toBeInTheDocument();
    expect(getByText('content')).toBeInTheDocument();
  });

  it('should render optional when optional is true', () => {
    const { getByText } = render(
      <WizardStep title="WizardStep Title" optional={true}>
        content
      </WizardStep>
    );

    expect(getByText(/optional/)).toBeInTheDocument();
  });

  it('should render description when it is provided', () => {
    const { getByText } = render(
      <WizardStep title="WizardStep Title" description="WizardStep description">
        content
      </WizardStep>
    );

    expect(getByText('WizardStep description')).toBeInTheDocument();
  });
});
