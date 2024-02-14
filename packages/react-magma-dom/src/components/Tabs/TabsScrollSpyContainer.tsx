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
   * Disables a navigation Tab.
   */
  disabled?: boolean;
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

  const [activeIndex, setActiveIndex] = React.useState();

  //Window scroll override
  React.useEffect(() => {
    const html = document.querySelector('html');
    html.style.scrollBehavior = 'auto';
  }, []);

  //Sets the active tab state on scroll
  React.useEffect(() => {
    options.map((option: any) => {
      if (option.hash === isActive) {
        setActiveIndex(option.index);
      }
    });
  }, [isActive]);

  const onScrollUpdate = useCallback(
    (entry, isInVewPort) => {
      const { target } = entry;
      if (isInVewPort) {
        setIsActive(toCamelCase(target.id));
      }
    },
    [setIsActive]
  );

  //Prevents smooth page scroll on navigation click
  function onClick(e) {
    props.onClick && typeof props.onClick === 'function' && props.onClick();
    window.location.href = `#${e.hash}`;
  }

  const ScrollSpyNav = ({ options }) => {
    return (
      <StyledTabs
        orientation={TabsOrientation.vertical}
        testId={`${testId}-Tabs`}
      >
        {options.map(option => (
          <Tab
            disabled={option.disabled}
            icon={option.icon}
            key={option.hash}
            onClick={() => onClick(option)}
            data-scrollspy-id={option.hash}
            testId={`${testId}-Tab`}
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
      isInverse={isInverse ? true : false}
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
