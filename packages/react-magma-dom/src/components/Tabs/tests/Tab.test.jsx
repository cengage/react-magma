import React from 'react';
import { Tab } from '../Tab';
import { CheckIcon } from '../../Icon/types/CheckIcon';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);
const testId = 'test-id';

describe('Tab', () => {
  it('Should correctly apply the testId', () => {
    const { getByTestId } = render(<Tab testId={testId} ariaLabel="test" />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should be disabled', () => {
    const { getByTestId, rerender } = render(
      <Tab testId={'testId'} ariaLabel="test" disabled={true} />
    );
    const component = getByTestId('testId');

    expect(component).toHaveProperty('disabled', true);
    expect(component).toBeDisabled();

    rerender(<Tab testId={'testId'} ariaLabel="test" disabled={false} />);

    expect(component).toHaveProperty('disabled', false);
    expect(component).not.toBeDisabled();
  });

  it('should render children', () => {
    const { getByTestId } = render(
      <Tab testId={testId} ariaLabel="test">
        <div data-testid="child" />
      </Tab>
    );
    const component = getByTestId(testId);
    expect(component.children.length).toBe(1);
    expect(getByTestId('child')).toBeDefined();
  });

  it('should be aria attribute if tab is active', () => {
    const { getByTestId, rerender } = render(
      <Tab testId={testId} ariaLabel="test" isActive={true}></Tab>
    );
    const component = getByTestId(testId);

    expect(component).toHaveAttribute('aria-pressed', 'true');

    rerender(<Tab testId={testId} ariaLabel="test" isActive={false}></Tab>);

    expect(component).toHaveAttribute('aria-pressed', 'false');
  });

  it('should render text', () => {
    const { getByText } = render(
      <Tab testId={testId} path="/test" ariaLabel="test">
        Test
      </Tab>
    );
    expect(getByText('Test'));
  });

  it('should render component', () => {
    const { getByTestId } = render(
      <Tab
        testId={testId}
        ariaLabel="test"
        component={<div data-testid="child" />}
      ></Tab>
    );
    expect(getByTestId('child')).toBeDefined();
  });

  it('should render component link', () => {
    const { container } = render(
      <Tab
        testId={testId}
        path="/test"
        ariaLabel="test"
        component={
          <a data-testid="link" href="/test">
            Test
          </a>
        }
      />
    );

    expect(container.children[0].getAttribute('href')).toBe('/test');
  });

  it('should render icon', () => {
    const icon = <CheckIcon id="testId" size={18} />;
    const { container, rerender } = render(
      <Tab testId={testId} icon={icon}></Tab>
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute('height', '18');
    expect(container.querySelector('svg')).toHaveAttribute('width', '18');

    rerender(<Tab testId={testId}></Tab>);

    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('should show icon in left/top position', () => {
    const icon = <CheckIcon id="testId" size={18} />;
    const { container, getByTestId, rerender } = render(
      <Tab testId={testId} icon={icon} iconOrientation="top"></Tab>
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(getByTestId(testId)).toHaveStyleRule('flex-direction', 'column');
    expect(getByTestId(testId)).toHaveStyleRule('align-items', 'center');

    rerender(<Tab testId={testId} icon={icon} iconOrientation="left"></Tab>);

    expect(getByTestId(testId)).not.toHaveStyleRule('flex-direction', 'column');
    expect(getByTestId(testId)).not.toHaveStyleRule('align-items', 'center');
  });
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const { container } = render(<Tab testId={testId} ariaLabel="test" />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
