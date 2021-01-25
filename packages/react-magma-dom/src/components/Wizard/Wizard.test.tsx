import React from 'react';
import { act, render, cleanup, fireEvent } from '@testing-library/react';
import { Wizard } from '.';
import { Input } from '../Input';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { axe } from 'jest-axe';

const steps = [
  {
    title: 'Step Title 1',
    description: 'Enter general information',
    children: <Input testId="step1" />,
  },
  {
    title: 'Step Title 2',
    children: <Input testId="step2" />,
  },
  {
    title: 'Step Title 3',
    children: <Input testId="step3" />,
    optional: true,
  },
];

describe('i18n', () => {
  it('should use the nav aria-label', () => {
    const { getByText } = render(
      <I18nContext.Provider
        value={{
          ...defaultI18n,
          wizard: {
            optional: 'not required',
            actions: {
              next: 'next label',
              previous: 'previous label',
              submit: 'submit label',
              cancel: 'cancel label',
            },
          },
        }}
      >
        <Wizard steps={steps} />
      </I18nContext.Provider>
    );

    expect(getByText('cancel label')).toBeInTheDocument();
    expect(getByText('next label')).toBeInTheDocument();
    fireEvent.click(getByText('next label'));
    expect(getByText('previous label')).toBeInTheDocument();
    fireEvent.click(getByText('next label'));
    expect(getByText('submit label')).toBeInTheDocument();
  });
});

describe('Wizard', () => {
  afterEach(cleanup);

  it('renders Wizard step 1', () => {
    const { getByText, getAllByText, getByTestId } = render(
      <Wizard steps={steps} />
    );

    expect(getAllByText('Step Title 1')).toHaveLength(2); // nav + main content
    expect(getByText('Enter general information')).toBeInTheDocument();
    expect(getByTestId('step1')).toBeInTheDocument();
  });

  it('should navigate between steps', () => {
    const { getByText, getByTestId } = render(<Wizard steps={steps} />);

    act(() => {
      fireEvent.click(getByText('next'));
    });
    expect(getByTestId('step2')).toBeInTheDocument();

    act(() => {
      fireEvent.click(getByText('next'));
    });
    expect(getByTestId('step3')).toBeInTheDocument();

    act(() => {
      fireEvent.click(getByText('previous'));
    });
    expect(getByTestId('step2')).toBeInTheDocument();
  });

  describe('Event handler', () => {
    it('should trigger onCancelButtonClick event', () => {
      const handleCancel = jest.fn();
      const { getByText } = render(
        <Wizard steps={steps} onCancelButtonClick={handleCancel} />
      );
      fireEvent.click(getByText('cancel'));
      expect(handleCancel).toHaveBeenCalled();
    });

    it('should trigger onNextButtonClick event', () => {
      const handleNext = jest.fn();
      const { getByText } = render(
        <Wizard steps={steps} onNextButtonClick={handleNext} />
      );
      fireEvent.click(getByText('next'));
      expect(handleNext).toHaveBeenCalledWith({ requestedStepIndex: 1 });
    });

    it('should trigger onPreviousButtonClick event', () => {
      const handlePrevious = jest.fn();
      const { getByText } = render(
        <Wizard steps={steps} onPreviousButtonClick={handlePrevious} />
      );
      fireEvent.click(getByText('next'));
      fireEvent.click(getByText('previous'));
      expect(handlePrevious).toHaveBeenCalledWith({ requestedStepIndex: 0 });
    });

    it('should trigger onSubmitButtonClick event', () => {
      const handleSubmit = jest.fn();
      const { getByText, getByTestId } = render(
        <Wizard steps={steps} onSubmitButtonClick={handleSubmit} />
      );
      fireEvent.click(getByText('next'));
      expect(getByTestId('step2')).toBeInTheDocument();
      fireEvent.click(getByText('next'));
      expect(getByTestId('step3')).toBeInTheDocument();
      fireEvent.click(getByText('submit'));
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('should trigger onStepNavigationClick event', () => {
      const handleStepNavigationClick = jest.fn();
      const { getByText, getByTestId } = render(
        <Wizard
          steps={steps}
          onStepNavigationClick={handleStepNavigationClick}
        />
      );
      fireEvent.click(getByText('next'));
      expect(getByTestId('step2')).toBeInTheDocument();
      fireEvent.click(getByText('Step Title 1'));
      expect(getByTestId('step1')).toBeInTheDocument();
      expect(handleStepNavigationClick).toHaveBeenCalledWith({
        requestedStepIndex: 0,
      });
    });
  });

  // it('renders accessible component', async () => {
  //   const { container } = render(<Wizard steps={steps}/>);
  //   const results = await axe(container);

  //   expect(results).toHaveNoViolations();
  // });
});
