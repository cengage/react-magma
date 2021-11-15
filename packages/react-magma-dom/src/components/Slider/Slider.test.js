import React from 'react';
import { axe } from 'jest-axe';
import { Slider } from '.';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nContext, defaultI18n } from '../../i18n';

const TEXT = 'Test Text';

const getCurrentValue = (el) => Number(el.getAttribute("aria-valuenow"));

describe('Slider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it('Should find element by testId', async () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Slider testId={testId}>{TEXT}</Slider>);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', async () => {
    const { container } = render(<Slider>{TEXT}</Slider>);

    await act(async () => {
      jest.runAllTimers();
    });

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should render the Slider component with min, and max values', async () => {
    const maxVal = '100';

    const { getByTestId } = render(
      <Slider
        count={1}
        defaultValue={50}
        max={100}
        min={0}
        testId="testid"
        width={100}
      />
    );

    await act(async () => {
      jest.runAllTimers();
    });

    const handle = getByTestId('testid-handle0');
    expect(handle).toHaveAttribute('aria-valuemax', '100');
    expect(handle).toHaveAttribute('aria-valuemin', '0');
    expect(handle).toHaveAttribute('aria-valuenow', '50');
  });

  it("moves the handle", async () => {
    const min = 0;
    const max = 100;
    const keyStep = (max - min) / 100;
    const tenSteps = (max - min) / 10;

    const { getByRole } = render(
      <Slider
        count={1}
        defaultValue={50}
        max={100}
        min={0}
        testId="testid"
        width={100}
      />
    );

    await act(async () => {
      jest.runAllTimers();
    });

    const handle = getByRole("slider");
    const startingValue = getCurrentValue(handle);

    userEvent.click(handle);

    userEvent.keyboard('{ArrowRight}');
    userEvent.keyboard('{ArrowRight}');

    expect(getCurrentValue(handle)).toEqual(startingValue + keyStep * 2);

    userEvent.keyboard('{ArrowLeft}');
    userEvent.keyboard('{ArrowLeft}');

    expect(getCurrentValue(handle)).toEqual(startingValue);

    userEvent.keyboard('{End}');
    expect(getCurrentValue(handle)).toEqual(max);

    userEvent.keyboard('{Home}');
    expect(getCurrentValue(handle)).toEqual(min);

    userEvent.keyboard('{Home}');
    expect(getCurrentValue(handle)).toEqual(min);

    userEvent.keyboard('{PageUp}');
    userEvent.keyboard('{PageUp}');
    expect(getCurrentValue(handle)).toEqual(min + tenSteps * 2);

    userEvent.keyboard('{PageDown}');
    expect(getCurrentValue(handle)).toEqual(min + tenSteps);
  });

  
});
