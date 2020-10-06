import React from 'react';
import { axe } from 'jest-axe';
import { CheckIcon } from 'react-magma-icons';
import { NavTabs } from '.';
import { NavTab } from './NavTab';
import { render } from '@testing-library/react';

describe('NavTabs', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<NavTabs testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render centered tabs', () => {
    const { container } = render(
      <NavTabs alignment="center">
        <NavTab>Tab 1</NavTab>
      </NavTabs>
    );

    expect(container.querySelector('ul')).toHaveStyleRule(
      'justify-content',
      'center'
    );
  });

  it('should render right-aligned tabs', () => {
    const { container } = render(
      <NavTabs alignment="right">
        <NavTab>Tab 1</NavTab>
      </NavTabs>
    );

    expect(container.querySelector('ul')).toHaveStyleRule(
      'justify-content',
      'flex-end'
    );
  });

  it('should show icon in top position', () => {
    const testId = 'test-id';

    const icon = <CheckIcon size={18} />;
    const { container, getByTestId, rerender } = render(
      <NavTabs iconPosition="top">
        <NavTab testId={testId} icon={icon}>
          Tab
        </NavTab>
      </NavTabs>
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('span')).toHaveStyleRule(
      'margin',
      '0 0 5px'
    );
    expect(getByTestId(testId)).toHaveStyleRule('flex-direction', 'column');
    expect(getByTestId(testId)).toHaveStyleRule('align-items', 'center');

    rerender(
      <NavTabs iconPosition="left">
        <NavTab testId={testId} icon={icon}>
          Tab
        </NavTab>
      </NavTabs>
    );

    expect(container.querySelector('span')).toHaveStyleRule(
      'margin',
      '0 15px 0 0'
    );
    expect(getByTestId(testId)).not.toHaveStyleRule('flex-direction', 'column');
  });

  it('should show icon in left position', () => {
    const testId = 'test-id';

    const icon = <CheckIcon size={18} />;
    const { container, getByTestId } = render(
      <NavTabs iconPosition="left">
        <NavTab testId={testId} icon={icon}>
          Tab
        </NavTab>
      </NavTabs>
    );

    expect(container.querySelector('span')).toHaveStyleRule(
      'margin',
      '0 15px 0 0'
    );
    expect(getByTestId(testId)).not.toHaveStyleRule('flex-direction', 'column');
  });

  it('should show icon in bottom position', () => {
    const testId = 'test-id';

    const icon = <CheckIcon size={18} />;
    const { container, getByTestId } = render(
      <NavTabs iconPosition="bottom">
        <NavTab testId={testId} icon={icon}>
          Tab
        </NavTab>
      </NavTabs>
    );
    expect(container.querySelector('span')).toHaveStyleRule(
      'margin',
      '5px 0 0'
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
      <NavTabs iconPosition="right">
        <NavTab testId={testId} icon={icon}>
          Tab
        </NavTab>
      </NavTabs>
    );

    expect(container.querySelector('span')).toHaveStyleRule(
      'margin',
      '0 0 0 15px'
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'flex-direction',
      'row-reverse'
    );
  });

  describe('Test for accessibility', () => {
    it('Does not violate accessibility standards', () => {
      const { container } = render(
        <NavTabs>
          <NavTab>This is tab 1</NavTab>
          <NavTab>This is tab 2</NavTab>
          <NavTab>This is tab 3</NavTab>
        </NavTabs>
      );

      return axe(container.innerHTML, {
        rules: { listitem: { enabled: false } }
      }).then(result => {
        return expect(result).toHaveNoViolations();
      });
    });
  });
});
