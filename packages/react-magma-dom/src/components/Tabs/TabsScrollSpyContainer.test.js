import React from 'react';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { render, fireEvent, getByAltText } from '@testing-library/react';
import { TabScrollSpyPanel, TabsScrollSpyContainer } from '.';
import { AndroidIcon } from 'react-magma-icons';

const TEXT = 'Test Text';
const testId = 'test-id';
const testIdTab = `${testId}-Tab`;
const tabLabel = 'tab-label';

describe('TabsScrollSpyContainer', () => {
  it('Should find element by testId', () => {
    const { getByTestId } = render(<TabsScrollSpyContainer testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Should change the active Tab on click', () => {
    const { container } = render(
      <TabsScrollSpyContainer testId={testIdTab}>
        <TabScrollSpyPanel tabLabel={'first'}></TabScrollSpyPanel>
        <TabScrollSpyPanel tabLabel={'second'}></TabScrollSpyPanel>
        <TabScrollSpyPanel tabLabel={'third'}></TabScrollSpyPanel>
      </TabsScrollSpyContainer>
    );

    const tab1 = container.querySelector('button[data-scrollspy-id="first"]');
    const tab2 = container.querySelector('button[data-scrollspy-id="second"]');
    const tab3 = container.querySelector('button[data-scrollspy-id="third"]');

    fireEvent.click(tab1);

    expect(tab1).toHaveStyleRule('color', magma.colors.primary500);
    expect(tab2).toHaveStyleRule('color', magma.colors.neutral500);
    expect(tab3).toHaveStyleRule('color', magma.colors.neutral500);

    fireEvent.click(tab2);

    expect(tab1).toHaveStyleRule('color', magma.colors.neutral500);
    expect(tab2).toHaveStyleRule('color', magma.colors.primary500);
    expect(tab3).toHaveStyleRule('color', magma.colors.neutral500);

    fireEvent.click(tab3);

    expect(tab1).toHaveStyleRule('color', magma.colors.neutral500);
    expect(tab2).toHaveStyleRule('color', magma.colors.neutral500);
    expect(tab3).toHaveStyleRule('color', magma.colors.primary500);
  });

  it('Should set the tabLabel', () => {
    const { getByText } = render(
      <TabsScrollSpyContainer activeIndex="" testId={testId}>
        <TabScrollSpyPanel tabLabel={'first'}>
          Content Area One
        </TabScrollSpyPanel>
      </TabsScrollSpyContainer>
    );

    expect(getByText('first')).toBeVisible();
  });

  it('Should set the icon', () => {
    const { container } = render(
      <TabsScrollSpyContainer activeIndex="" testId={testId}>
        <TabScrollSpyPanel tabLabel={'first'} icon={<AndroidIcon />}>
          Content Area One
        </TabScrollSpyPanel>
      </TabsScrollSpyContainer>
    );

    const tab1 = container.querySelector('button[data-scrollspy-id="first"]');

    expect(tab1.firstChild.firstChild.nodeName).toBe('svg');
  });

  describe('Click events', () => {
    it('Should allow a custom onClick function', () => {
      const customOnClick = jest.fn();

      const { getByTestId } = render(
        <TabsScrollSpyContainer
          testId={`${testId}-Tab`}
          onClick={customOnClick}
        ></TabsScrollSpyContainer>
      );

      fireEvent.click(getByTestId(`${testId}-Tab`));
      expect(customOnClick).toHaveBeenCalledTimes(1);
    });

    it('Should set the window.location.href on click', () => {
      const { container } = render(
        <TabsScrollSpyContainer testId={testId}>
          <TabScrollSpyPanel tabLabel={'first'}>
            Content Area One
          </TabScrollSpyPanel>
        </TabsScrollSpyContainer>
      );

      const tab3 = container.querySelector('button[data-scrollspy-id="first"]');

      fireEvent.click(tab3);

      expect(window.location.href).toInclude('#first');
    });

    it('Should prevent disabled from being clickable', () => {
      const { container } = render(
        <TabsScrollSpyContainer testId={testId}>
          <TabScrollSpyPanel tabLabel={'first'} disabled>
            Content Area One
          </TabScrollSpyPanel>
        </TabsScrollSpyContainer>
      );
      const tab1 = container.querySelector('button[data-scrollspy-id="first"]');

      expect(tab1).toHaveAttribute('disabled');
    });
  });

  it('Tab Panels are compliant with accessibility', () => {
    const { container } = render(
      <TabsScrollSpyContainer aria-label="TabsScrollSpyContainer">
        <TabScrollSpyPanel tabLabel={'first'}>{TEXT}</TabScrollSpyPanel>
      </TabsScrollSpyContainer>
    );
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});

describe('TabScrollSpyPanel', () => {
  it('Should find element by testId', () => {
    const { getByTestId } = render(
      <TabScrollSpyPanel tabLabel={tabLabel} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it(`Should set the navigation title with 'tabLabel'`, () => {
    const { getByTestId } = render(
      <TabsScrollSpyContainer testId={`${testId}-Tab`}>
        <TabScrollSpyPanel tabLabel={`${tabLabel}-1`} />
        <TabScrollSpyPanel tabLabel={`${tabLabel}-2`} />
      </TabsScrollSpyContainer>
    );

    expect(getByTestId(`${testId}-Tab`)).toHaveTextContent(`${tabLabel}-1`);
    expect(getByTestId(`${testId}-Tab`)).toHaveTextContent(`${tabLabel}-2`);
  });

  it(`Should set an icon in each navigation item with 'icon'`, () => {
    const { getByTestId } = render(
      <TabsScrollSpyContainer testId={`${testId}-Tab`}>
        <TabScrollSpyPanel tabLabel={tabLabel} icon={<AndroidIcon />} />
      </TabsScrollSpyContainer>
    );

    expect(
      getByTestId(`${testId}-Tab`).querySelector('svg')
    ).toBeInTheDocument();
  });

  it(`Should set a disabled state in each navigation item with 'disabled'`, () => {
    const { container } = render(
      <TabsScrollSpyContainer>
        <TabScrollSpyPanel tabLabel="disabled-nav" disabled>
          {TEXT}
        </TabScrollSpyPanel>
      </TabsScrollSpyContainer>
    );

    const tab1 = container.querySelector('button[data-scrollspy-id="first"]');

    expect(tab1.parentElement).toHaveStyleRule('cursor', 'not-allowed');
  });

  it('Tab Panels are compliant with accessibility', () => {
    const { container } = render(
      <TabScrollSpyPanel tabLabel={tabLabel}>{TEXT}</TabScrollSpyPanel>
    );
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
