import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { ScrollSpy } from './utils';
import { Tabs, TabsOrientation } from './Tabs';
import { Tab } from './Tab';
import { TabsContainer } from './TabsContainer';
import { toCamelCase } from '../../utils';

export interface TabScrollSpyContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  isActive?: boolean;
  onChange?: () => void;
}

const StyledTabs = styled(Tabs)<{
  isClicked?: boolean;
}>`
  flex: 0 auto;
  position: sticky;
  top: 0;
  li {
    &:after {
      background: ${props => (props.isClicked ? 'none' : '')};
      transition: 0.1s;
    }
  }
`;

const StyledContentWrapper = styled.div<{}>`
  flex: 1;
`;

export const TabsScrollSpyContainer = React.forwardRef<
  HTMLDivElement,
  TabScrollSpyContainerProps
>((props, ref) => {
  const { children } = props;

  const [options, setOptions] = React.useState([]);

  const [isActive, setIsActive] = React.useState(0);

  const [isClicked, setIsClicked] = React.useState(false);

  const [activeIndex, setActiveIndex] = React.useState();

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

  function onClick(e) {
    window.location.href = `#${e.hash}`;

    if (e.hash !== isActive) {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 250);
    }
  }

  const ScrollSpyNav = ({ options }) => {
    return (
      <StyledTabs isClicked={isClicked} orientation={TabsOrientation.vertical}>
        {options.map(option => (
          <Tab
            disabled={option.disabled}
            icon={option.icon}
            // key={option.hash}
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
    return <React.Fragment>{item.props.icon}</React.Fragment>;
  });

  React.useLayoutEffect(() => {
    const scrollSpyNavSections = document.querySelectorAll('section');
    const optionsFromSections = Array.from(scrollSpyNavSections).map(
      (section, index) => {
        console.log(tabScrollSpyPanelChildren[index]);
        return {
          index,
          // disabled: section.dataset.disabled,
          hash: toCamelCase(section.id),
          icon: tabScrollSpyPanelChildren[index],
          title: section.dataset.navTitle,
        };
      }
    );
    setOptions(optionsFromSections);
  }, ['section']);

  return (
    <TabsContainer activeIndex={activeIndex}>
      <ScrollSpy handleScroll={onScrollUpdate} />
      <ScrollSpyNav options={options} />
      <StyledContentWrapper>{children}</StyledContentWrapper>
    </TabsContainer>
  );
});
