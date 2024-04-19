import React, { useCallback } from 'react';
import styled from '../../theme/styled';
import { ScrollSpy } from './utils';
import { Tabs, TabsOrientation } from './Tabs';
import { Tab } from './Tab';
import { TabsContainer } from './TabsContainer';
import { toCamelCase } from '../../utils';

export interface TabsScrollSpyContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isInverse?: boolean;

  /**
   * @internal
   */
  testId?: string;
}

const StyledTabs = styled(Tabs)`
  flex: 0 auto;
  position: sticky;
  top: 0;
  li {
    &:after {
      transition: none;
    }
  }
`;

const StyledContentWrapper = styled.div`
  flex: 1;
`;

export const TabsScrollSpyContainer = React.forwardRef<
  HTMLDivElement,
  TabsScrollSpyContainerProps
>((props, ref) => {
  const { children, isInverse, testId, ...other } = props;

  const [options, setOptions] = React.useState([]);

  const [isActive, setIsActive] = React.useState(0);

  const [activeIndex, setActiveIndex] = React.useState();

  //Window scroll override
  React.useEffect(() => {
    const html = document.querySelector('html');
    html.style.scrollBehavior = 'auto';
  }, []);

  //Sets the active tab state on scroll
  React.useEffect(() => {
    options.map((option: any) => {
      /*
      TODO: Get the last item in the array and set it to active when the user scrolls to the bottom of the page. This helps in cases where more than just the last section is visible, yet the conveyance of the active state should still remain the last item.

      const lastIndex = options.length - 1;

      window.onscroll = function (ev) {
        if (
          window.innerHeight + Math.round(window.scrollY) >=
          document.body.offsetHeight
        ) {
          setActiveIndex(lastIndex);
        }
      };
      */

      if (option.hash === isActive) {
        setActiveIndex(option.index);
      }
    });
  }, [isActive]);

  const onScrollUpdate = useCallback(
    (entry, isInViewPort) => {
      const { target } = entry;

      if (isInViewPort) {
        setIsActive(toCamelCase(target.id));
      }
    },
    [setIsActive]
  );

  function onClick(option) {
    //Prevents smooth page scroll on navigation click
    window.location.href = `#${option.hash}`;
  }

  const ScrollSpyNav = ({ options }) => {
    return (
      <StyledTabs orientation={TabsOrientation.vertical}>
        {options.map((option, i) => (
          <Tab
            icon={option.icon}
            key={option.hash}
            testId={`tab${i}`}
            onClick={() => onClick(option)}
            data-scrollspy-id={option.hash}
          >
            {option.title}
          </Tab>
        ))}
      </StyledTabs>
    );
  };

  const tabScrollSpyPanelChildren = React.Children.map(children, child => {
    const item = child as React.ReactElement;
    if (item.props) {
      return { icon: item.props.icon };
    }
  });

  React.useLayoutEffect(() => {
    const scrollSpyNavSections = document.querySelectorAll('section');
    const optionsFromSections = Array.from(scrollSpyNavSections).map(
      (section, index) => {
        return {
          index,
          hash: toCamelCase(section.id),
          icon: tabScrollSpyPanelChildren[index]?.icon,
          title: section.dataset.navTitle,
        };
      }
    );
    setOptions(optionsFromSections);
  }, ['section']);

  return (
    <TabsContainer
      {...other}
      activeIndex={activeIndex}
      isInverse={isInverse}
      ref={ref}
      testId={testId}
    >
      <ScrollSpy handleScroll={onScrollUpdate} />
      <ScrollSpyNav options={options} />
      <StyledContentWrapper>{children}</StyledContentWrapper>
    </TabsContainer>
  );
});
