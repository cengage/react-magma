import React from 'react';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { render, fireEvent, getByAltText } from '@testing-library/react';
import { TabScrollSpyPanel, TabsScrollSpyContainer } from '.';
import { AndroidIcon } from 'react-magma-icons';

const TEXT = 'Test Text';
const testId = 'test-id';
const testIdTab = `${testId}-Tab`;

describe('TabsScrollSpyContainer', () => {
  it('Should find element by testId', () => {
    const { getByTestId } = render(<TabsScrollSpyContainer testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Should change the active Tab on click', () => {
    const { container, getByTestId } = render(
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
    const { container, getByText, queryByText } = render(
      <div style={{ height: '20px', width: '200px', overflow: 'auto' }}>
        <TabsScrollSpyContainer activeIndex="" testId={testId}>
          <TabScrollSpyPanel tabLabel={'first'}>
            Content Area One
          </TabScrollSpyPanel>
        </TabsScrollSpyContainer>
      </div>
    );

    expect(getByText('first')).toBeVisible();
  });

  it('Should set the icon', () => {
    const { container, getByText, queryByText } = render(
      <div style={{ height: '20px', width: '200px', overflow: 'auto' }}>
        <TabsScrollSpyContainer activeIndex="" testId={testId}>
          <TabScrollSpyPanel tabLabel={'first'} icon={<AndroidIcon />}>
            Content Area One
          </TabScrollSpyPanel>
        </TabsScrollSpyContainer>
      </div>
    );

    const tab1 = container.querySelector('button[data-scrollspy-id="first"]');

    expect(tab1.firstChild.firstChild.nodeName).toBe('svg');
  });

  describe('Click events', () => {
    it('Should allow a custom onClick function', () => {
      const customOnClick = jest.fn();

      const { getByTestId } = render(
        <TabsScrollSpyContainer
          testId={testId}
          onClick={customOnClick}
        ></TabsScrollSpyContainer>
      );

      fireEvent.click(getByTestId(testId));
      expect(customOnClick).toHaveBeenCalledTimes(1);
    });

    // it('Should set the window.location.href on click', () => {
    //   ///WIP
    //   const { container, getByText, queryByText } = render(
    //     <div style={{ height: '20px', width: '200px', overflow: 'auto' }}>
    //       <TabsScrollSpyContainer activeIndex="" testId={testId}>
    //         <TabScrollSpyPanel tabLabel={'first'} style={{ height: '200px' }}>
    //           Content Area One
    //         </TabScrollSpyPanel>
    //         <TabScrollSpyPanel tabLabel={'second'} style={{ height: '200px' }}>
    //           Content Area Two
    //         </TabScrollSpyPanel>
    //         <TabScrollSpyPanel tabLabel={'third'} style={{ height: '200px' }}>
    //           Content Area Three
    //         </TabScrollSpyPanel>
    //       </TabsScrollSpyContainer>
    //     </div>
    //   );
    //   const tab3 = container.querySelector('button[data-scrollspy-id="third"]');

    //   expect(getByText('Content Area One')).toBeVisible();
    //   expect(queryByText('Content Area Three')).not.toBeVisible();

    //   fireEvent.click(tab3);

    //   expect(queryByText('Content Area One')).not.toBeVisible();
    //   expect(getByText('Content Area Three')).toBeVisible();
    // });

    // it('Should prevent disabled from being clickable', () => {
    // });
  });

  it('Tab Panels are compliant with accessibility', () => {
    const { container } = render(
      <TabsScrollSpyContainer aria-label="TabsScrollSpyContainer">
        {TEXT}
      </TabsScrollSpyContainer>
    );
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
