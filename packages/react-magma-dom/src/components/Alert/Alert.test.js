import React from 'react';
import { axe } from 'jest-axe';
import { Alert, AlertVariant } from '.';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';
import uuid from 'uuid/v4';

jest.mock('uuid/v4');

describe('Alert', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Alert testId={testId}>Test Alert Text</Alert>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render an alert with default variant', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { container } = render(
      <Alert id="defaultVariant">Test Alert Text</Alert>
    );

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="css-1u3zgza-StyledAlert e1i9bore0"
    id="defaultVariant"
    tabindex="-1"
  >
    <span
      class="css-3xtpuq-IconWrapper-IconWrapperStyles e1i9bore2"
    >
      <svg
        aria-labelledby="auto-generated-id"
        class="icon"
        fill="currentColor"
        height="20"
        viewBox="0 0 27.3 27.3"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title
          id="auto-generated-id"
        />
        <path
          d="M12.65,9.9V7.14h2.7V9.9ZM14,25A11,11,0,1,0,3,14,11,11,0,0,0,14,25ZM14,.35A13.65,13.65,0,1,1,.35,14,13.62,13.62,0,0,1,14,.35ZM12.65,20.86V12.65h2.7v8.21Z"
          transform="translate(-0.35 -0.35)"
        />
      </svg>
    </span>
    <div
      class="css-zlsewa-AlertContents e1i9bore1"
    >
      Test Alert Text
    </div>
  </div>
</div>
`);
  });

  it('should render an alert with inverse focus style', () => {
    const { container } = render(<Alert inverse>Test Alert Text</Alert>);

    expect(container.firstChild).toHaveStyleRule(
      'outline',
      `2px dotted ${magma.colors.neutral08}`,
      {
        target: ':focus'
      }
    );
  });

  describe('Variants', () => {
    it('should render an alert with info variant', () => {
      uuid.mockReturnValue('auto-generated-id');
      const { container } = render(
        <Alert variant={AlertVariant.info}>Test Alert Text</Alert>
      );

      expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="css-1u3zgza-StyledAlert e1i9bore0"
    tabindex="-1"
  >
    <span
      class="css-3xtpuq-IconWrapper-IconWrapperStyles e1i9bore2"
    >
      <svg
        aria-labelledby="auto-generated-id"
        class="icon"
        fill="currentColor"
        height="20"
        viewBox="0 0 27.3 27.3"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title
          id="auto-generated-id"
        />
        <path
          d="M12.65,9.9V7.14h2.7V9.9ZM14,25A11,11,0,1,0,3,14,11,11,0,0,0,14,25ZM14,.35A13.65,13.65,0,1,1,.35,14,13.62,13.62,0,0,1,14,.35ZM12.65,20.86V12.65h2.7v8.21Z"
          transform="translate(-0.35 -0.35)"
        />
      </svg>
    </span>
    <div
      class="css-zlsewa-AlertContents e1i9bore1"
    >
      Test Alert Text
    </div>
  </div>
</div>
`);
    });

    it('should render an alert with success variant', () => {
      uuid.mockReturnValue('auto-generated-id');
      const { container } = render(
        <Alert variant={AlertVariant.success}>Test Alert Text</Alert>
      );

      expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="css-ueh4n7-StyledAlert e1i9bore0"
    tabindex="-1"
  >
    <span
      class="css-3xtpuq-IconWrapper-IconWrapperStyles e1i9bore2"
    >
      <svg
        aria-labelledby="auto-generated-id"
        class="icon"
        fill="currentColor"
        height="20"
        viewBox="0 0 29.37 21.88"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title
          id="auto-generated-id"
        />
        <path
          d="M26.71,3.06,11.89,17.88,4.4,10.4.87,13.93l11,11L30.24,6.59Z"
          transform="translate(-0.87 -3.06)"
        />
      </svg>
    </span>
    <div
      class="css-zlsewa-AlertContents e1i9bore1"
    >
      Test Alert Text
    </div>
  </div>
</div>
`);
    });

    it('should render an alert with warning variant', () => {
      uuid.mockReturnValue('auto-generated-id');
      const { container } = render(
        <Alert variant={AlertVariant.warning}>Test Alert Text</Alert>
      );

      expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="css-c3282f-StyledAlert e1i9bore0"
    tabindex="-1"
  >
    <span
      class="css-3xtpuq-IconWrapper-IconWrapperStyles e1i9bore2"
    >
      <svg
        aria-labelledby="auto-generated-id"
        class="icon"
        fill="currentColor"
        height="20"
        viewBox="0 0 40 40"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title
          id="auto-generated-id"
        />
        <path
          d="M20,4.5625 C15.877,4.5625 11.9998125,6.168 9.0845,9.0845 C6.1691875,12.001 4.5625,15.877 4.5625,20 C4.5625,24.123 6.168,28.0001875 9.0845,30.9155 C12.001,33.8308125 15.877,35.4375 20,35.4375 C24.123,35.4375 28.0001875,33.832 30.9155,30.9155 C33.8308125,27.999 35.4375,24.123 35.4375,20 C35.4375,15.877 33.832,11.9998125 30.9155,9.0845 C27.999,6.1691875 24.123,4.5625 20,4.5625 Z M20,1 L20,1 C30.4939375,1 39,9.5060625 39,20 C39,30.4939375 30.4939375,39 20,39 C9.5060625,39 1,30.4939375 1,20 C1,9.5060625 9.5060625,1 20,1 Z M17.625,27.125 L22.375,27.125 L22.375,31.875 L17.625,31.875 L17.625,27.125 Z M17.625,8.125 L22.375,8.125 L22.375,22.375 L17.625,22.375 L17.625,8.125 Z"
        />
      </svg>
    </span>
    <div
      class="css-zlsewa-AlertContents e1i9bore1"
    >
      Test Alert Text
    </div>
  </div>
</div>
`);
    });

    it('should render an alert with danger variant', () => {
      uuid.mockReturnValue('auto-generated-id');
      const { container } = render(
        <Alert variant={AlertVariant.danger}>Test Alert Text</Alert>
      );

      expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="css-e90d2a-StyledAlert e1i9bore0"
    tabindex="-1"
  >
    <span
      class="css-3xtpuq-IconWrapper-IconWrapperStyles e1i9bore2"
    >
      <svg
        aria-labelledby="auto-generated-id"
        class="icon"
        fill="currentColor"
        height="20"
        viewBox="0 0 28 28"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title
          id="auto-generated-id"
        />
        <path
          d="M23.9,4.1A14,14,0,0,0,4.1,23.9,14,14,0,0,0,23.9,4.1Zm.6,9.9a10.48,10.48,0,0,1-1.94,6.08L7.92,5.44A10.5,10.5,0,0,1,24.5,14Zm-21,0A10.48,10.48,0,0,1,5.44,7.92L20.08,22.56A10.5,10.5,0,0,1,3.5,14Z"
          transform="translate(0)"
        />
      </svg>
    </span>
    <div
      class="css-zlsewa-AlertContents e1i9bore1"
    >
      Test Alert Text
    </div>
  </div>
</div>
`);
    });
  });

  describe('Dismissable', () => {
    it('should render a dismissable icon button', () => {
      const { getByLabelText } = render(
        <Alert dismissable>Test Alert Text</Alert>
      );
      const dismissableIconButton = getByLabelText('Close this message');

      expect(dismissableIconButton).toBeInTheDocument();
    });

    it('should render a dismissable icon button with custom close label text', () => {
      const { getByLabelText } = render(
        <Alert dismissable closeLabel="Test">
          Test Alert Text
        </Alert>
      );
      const dismissableIconButton = getByLabelText('Test');

      expect(dismissableIconButton).toBeInTheDocument();
    });

    it('should render a dismissable icon button with the warning variant', () => {
      const { getByLabelText } = render(
        <Alert dismissable variant={AlertVariant.warning}>
          Test Alert Text
        </Alert>
      );

      const button = getByLabelText('Close this message');
      button.setAttribute('id', 'ignoreButton');
      button.firstChild.setAttribute('id', 'ignoreSvg');
      button.firstChild.setAttribute('aria-labelledby', 'ignoreButton');
      button.firstChild.firstChild.setAttribute('id', 'ignoreTitle');

      expect(button).toMatchSnapshot();
    });

    it('should call passed in onDismiss when dismissable icon button is clicked', () => {
      const onDismiss = jest.fn();
      const { getByLabelText } = render(
        <Alert dismissable onDismiss={onDismiss}>
          Test Alert Text
        </Alert>
      );
      const dismissableIconButton = getByLabelText('Close this message');

      fireEvent.click(dismissableIconButton);

      setTimeout(() => {
        expect(onDismiss).toHaveBeenCalled();
      }, 500);
    });
  });

  it('should render custom styles', () => {
    const color = '#cccccc';
    const { container } = render(
      <Alert style={{ color }}>Test Alert Text</Alert>
    );

    expect(container.firstChild).toHaveStyle(`color: ${color}`);
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Alert>Test Alert Text</Alert>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
