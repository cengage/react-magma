import React from 'react';
import { Tab } from './Tab';
import { CheckIcon } from '../Icon/types/CheckIcon';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { magma } from '../../theme/magma';

expect.extend(toHaveNoViolations);

describe('Tab', () => {
  it('Should correctly apply the testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(<Tab testId={testId} ariaLabel="test" />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should be disabled', () => {
    const testId = 'test-id';

    const { getByTestId, rerender } = render(
      <Tab testId={testId} ariaLabel="test" disabled={true} />
    );
    const component = getByTestId(testId);

    expect(component).toHaveProperty('disabled', true);
    expect(component).toBeDisabled();

    rerender(<Tab testId={testId} ariaLabel="test" disabled={false} />);

    expect(component).toHaveProperty('disabled', false);
    expect(component).not.toBeDisabled();
  });

  it('should render children', () => {
    const testId = 'test-id';

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
    const testId = 'test-id';

    const { getByTestId, rerender } = render(
      <Tab testId={testId} ariaLabel="test" isActive={true}></Tab>
    );
    const component = getByTestId(testId);

    expect(component).toHaveAttribute('aria-selected', 'true');

    rerender(<Tab testId={testId} ariaLabel="test" isActive={false}></Tab>);

    expect(component).toHaveAttribute('aria-selected', 'false');
  });

  it('should render text', () => {
    const testId = 'test-id';

    const { getByText } = render(
      <Tab testId={testId} path="/test" ariaLabel="test">
        Test
      </Tab>
    );
    expect(getByText('Test'));
  });

  it('should render component', () => {
    const testId = 'test-id';

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
    const testId = 'test-id';

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
    const testId = 'test-id';

    const icon = <CheckIcon id="testId" size={18} />;
    const { container, rerender } = render(
      <Tab testId={testId} icon={icon}></Tab>
    );

    expect(container.querySelector('svg')).toBeInTheDocument();

    rerender(<Tab testId={testId}></Tab>);

    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('should color is defined', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Tab testId={testId}></Tab>
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'color',
      magma.colors.neutral01
    );
  })

  it('should change color when inverse prop is defined', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Tab testId={testId} inverse={true}></Tab>
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'color',
      magma.colors.neutral08
    );
  })

  it('should show icon in left/top position', () => {
    const testId = 'test-id';

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
    const testId = 'test-id';
    const { container } = render(<Tab testId={testId} ariaLabel="test" />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
