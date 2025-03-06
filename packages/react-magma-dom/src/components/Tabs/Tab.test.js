import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { CheckIcon } from 'react-magma-icons';

import { Tab } from './Tab';
import { TabsContainer } from './TabsContainer';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { Tabs } from '.';

describe('Tab', () => {
  it('Should correctly apply the testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Tabs>
        <Tab testId={testId}>Tab Text</Tab>
      </Tabs>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should apply the aria-label', () => {
    const ariaLabel = 'Tab aria label';
    const { getByLabelText } = render(
      <Tabs>
        <Tab aria-label={ariaLabel}>Tab Text</Tab>
      </Tabs>
    );

    expect(getByLabelText(ariaLabel)).toBeInTheDocument();
  });

  it('should render children', () => {
    const testId = 'test-id';

    const { getByText } = render(
      <Tabs>
        <Tab testId={testId}>Test</Tab>
      </Tabs>
    );
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('should have aria-selected attribute if tab is active', () => {
    const testId = 'testId';
    const { getByTestId, rerender } = render(
      <TabsContainer activeIndex={0}>
        <Tabs>
          <Tab testId={testId}>Tab Text</Tab>
        </Tabs>
      </TabsContainer>
    );
    const component = getByTestId(testId);

    expect(component).toHaveAttribute('aria-selected', 'true');

    rerender(
      <TabsContainer activeIndex={1}>
        <Tabs>
          <Tab testId={testId}>Tab Text</Tab>
        </Tabs>
      </TabsContainer>
    );

    expect(component).toHaveAttribute('aria-selected', 'false');
  });

  it('should be disabled', () => {
    const testId = 'test-id';

    const { getByTestId, rerender } = render(
      <Tabs>
        <Tab testId={testId} disabled>
          Tab Text
        </Tab>
      </Tabs>
    );
    const component = getByTestId(testId);

    expect(component).toHaveProperty('disabled', true);
    expect(component).toBeDisabled();
    expect(getByTestId('tabContainer')).toHaveStyleRule(
      'cursor',
      'not-allowed'
    );

    rerender(
      <Tabs>
        <Tab testId={testId} disabled={false}>
          Tab Text
        </Tab>
      </Tabs>
    );

    expect(component).toHaveProperty('disabled', false);
    expect(component).not.toBeDisabled();
    expect(getByTestId('tabContainer')).toHaveStyleRule('cursor', 'pointer');
  });

  it('should render icon', () => {
    const icon = <CheckIcon size={18} />;
    const { container } = render(
      <Tabs>
        <Tab icon={icon}>Tab With Icon</Tab>
      </Tabs>
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('should render an icon only tab', () => {
    const icon = <CheckIcon testId="icon" />;
    const { getByTestId } = render(
      <Tabs>
        <Tab icon={icon} />
      </Tabs>
    );

    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('should change color when isInverse prop is true', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Tabs isInverse>
        <Tab testId={testId}>Inverse Tab</Tab>
      </Tabs>
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'color',
      magma.colors.neutral100
    );
  });

  it('should render a vertical tab with the correct styles', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Tabs orientation="vertical">
        <Tab testId={testId}>Vertical Tab</Tab>
      </Tabs>
    );

    expect(getByTestId(testId)).toHaveStyleRule('align-items', 'center');
    expect(getByTestId(testId)).toHaveStyleRule('text-align', 'left');
    expect(getByTestId(testId)).toHaveStyleRule('width', '100%');
  });

  it('should render a fullWidth tab with the correct styles', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Tabs isFullWidth>
        <Tab testId={testId}>Full Width Tab</Tab>
      </Tabs>
    );

    expect(getByTestId(testId)).toHaveStyleRule('flex-shrink', '1');
  });

  it('should show icon in top position', () => {
    const testId = 'test-id';

    const icon = <CheckIcon size={18} />;
    const { container, getByTestId, rerender } = render(
      <Tabs iconPosition="top">
        <Tab testId={testId} icon={icon}>
          Tab
        </Tab>
      </Tabs>
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('span')).toHaveStyleRule(
      'margin',
      `0 0 ${magma.spaceScale.spacing02}`
    );
    expect(getByTestId(testId)).toHaveStyleRule('flex-direction', 'column');
    expect(getByTestId(testId)).toHaveStyleRule('align-items', 'center');

    rerender(
      <Tabs iconPosition="left">
        <Tab testId={testId} icon={icon}>
          Tab
        </Tab>
      </Tabs>
    );

    expect(container.querySelector('span')).toHaveStyleRule(
      'margin',
      `0 ${magma.spaceScale.spacing03} 0 0`
    );
    expect(getByTestId(testId)).not.toHaveStyleRule('flex-direction', 'column');
  });

  it('should show icon in left position', () => {
    const testId = 'test-id';

    const icon = <CheckIcon size={18} />;
    const { container, getByTestId } = render(
      <Tabs iconPosition="left">
        <Tab testId={testId} icon={icon}>
          Tab
        </Tab>
      </Tabs>
    );

    expect(container.querySelector('span')).toHaveStyleRule(
      'margin',
      `0 ${magma.spaceScale.spacing03} 0 0`
    );
    expect(getByTestId(testId)).not.toHaveStyleRule('flex-direction', 'column');
  });
});

it('should show icon in bottom position', () => {
  const testId = 'test-id';

  const icon = <CheckIcon size={18} />;
  const { container, getByTestId } = render(
    <Tabs iconPosition="bottom">
      <Tab testId={testId} icon={icon}>
        Tab
      </Tab>
    </Tabs>
  );
  expect(container.querySelector('span')).toHaveStyleRule(
    'margin',
    `${magma.spaceScale.spacing02} 0 0`
  );
  expect(getByTestId(testId)).toHaveStyleRule(
    'flex-direction',
    'column-reverse'
  );
});

it('should show icon in right position', () => {
  const testId = 'test-id';

  const icon = <CheckIcon size={18} />;
  const { container, getByTestId } = render(
    <Tabs iconPosition="right">
      <Tab testId={testId} icon={icon}>
        Tab
      </Tab>
    </Tabs>
  );

  expect(container.querySelector('span')).toHaveStyleRule(
    'margin',
    `0 0 0 ${magma.spaceScale.spacing03}`
  );
  expect(getByTestId(testId)).toHaveStyleRule('flex-direction', 'row-reverse');
});

it('should show fire a custom onClick event', () => {
  const testId = 'test-id';
  const customOnClick = jest.fn();

  const { getByTestId } = render(
    <Tabs>
      <Tab testId={testId} onClick={customOnClick}>
        Tab
      </Tab>
    </Tabs>
  );

  fireEvent.click(getByTestId(testId));
  expect(customOnClick).toHaveBeenCalled();
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const testId = 'test-id';
    const { container } = render(
      <TabsContainer>
        <Tabs>
          <Tab testId={testId}>Tab Text</Tab>
        </Tabs>
      </TabsContainer>
    );

    return axe(container.innerHTML, {
      rules: { listitem: { enabled: false } },
    }).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
