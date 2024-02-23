import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { ScrollSpy } from './utils';
import { Tabs, TabsOrientation } from './Tabs';
import { Tab } from './Tab';
import { TabsContainer } from './TabsContainer';
import { toCamelCase } from '../../utils';

export interface TabScrollSpyContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /*
   * Adds an icon to the navigation Tab.
   */
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  isInverse?: boolean;
  /*
   * For custom click events.
   */
  onClick?: () => void;
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
  TabScrollSpyContainerProps
>((props, ref) => {
  const { children, isInverse, testId, ...other } = props;

  const [options, setOptions] = React.useState([]);

  const [isActive, setIsActive] = React.useState(0);

  const [activeIndex, setActiveIndex] = React.useState(0);

  //Window scroll override
  React.useEffect(() => {
    const html = document.querySelector('html');
    html.style.scrollBehavior = 'auto';
  }, []);

  //Sets the active tab state on scroll
  React.useEffect(() => {
    options.map((option: any) => {
      // const lastIndex = options.length - 1;

      // const scrollBottom =
      //   window.innerHeight + window.scrollY >=
      //   document.documentElement.scrollHeight - 600;

      // if (scrollBottom && activeIndex === lastIndex - 1) {
      //   setActiveIndex(lastIndex);
      //   console.log('bottom', lastIndex, typeof option.index);
      // }
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
    //Allows custom function
    props.onClick && typeof props.onClick === 'function' && props.onClick();
  }

  const ScrollSpyNav = ({ options }) => {
    return (
      <StyledTabs
        orientation={TabsOrientation.vertical}
        testId={testId ? `${testId}-Tabs` : null}
      >
        {options.map(option => (
          <Tab
            disabled={option.disabled}
            icon={option.icon}
            key={option.hash}
            onClick={() => onClick(option)}
            data-scrollspy-id={option.hash}
            testId={testId ? `${testId}-Tab` : null}
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
      return { icon: item.props.icon, disabled: item.props.disabled };
    }
  });

  React.useLayoutEffect(() => {
    const scrollSpyNavSections = document.querySelectorAll('section');
    const optionsFromSections = Array.from(scrollSpyNavSections).map(
      (section, index) => {
        return {
          index,
          disabled: tabScrollSpyPanelChildren[index]?.disabled,
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
      activeIndex={activeIndex}
      isInverse={isInverse}
      ref={ref}
      testId={testId}
      {...other}
    >
      <ScrollSpy handleScroll={onScrollUpdate} />
      <ScrollSpyNav options={options} />
      <StyledContentWrapper>{children}</StyledContentWrapper>
    </TabsContainer>
  );
});
