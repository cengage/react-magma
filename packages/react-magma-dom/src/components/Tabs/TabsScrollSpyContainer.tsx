import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { ScrollSpy } from './utils';
import { Tabs, TabsOrientation } from './Tabs';
import { Tab } from './Tab';
import { TabsContainer } from './TabsContainer';
import { toCamelCase } from '../../utils';
import { TabScrollSpyPanelContext } from './TabScrollSpyPanel';

export interface TabScrollSpyContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  isActive?: boolean;
  onChange?: () => void;
}

interface TabsScrollSpyContainerContextInterface {
  contentRef?: React.Ref<HTMLDivElement>;
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
}

export const TabsScrollSpyContainerContext =
  React.createContext<TabsScrollSpyContainerContextInterface>({});

const StyledTabsContainer = styled(TabsContainer)<{
  activeTab?: number;
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
}>`
  /* flex-wrap: nowrap; */
`;

const StyledTabs = styled(Tabs)<{
  isActive?: boolean;
}>`
  flex: 0 auto;
  position: sticky;
  top: 0;
  li {
    &:after {
      transition: none;
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

  // const [isClicked, setIsClicked] = React.useState(false);

  const [activeIndex, setActiveIndex] = React.useState();

  const { disabled, icon } = React.useContext(TabScrollSpyPanelContext);

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

    // if (e.hash === isActive) {
    //   console.log("it's active");
    //   setIsClicked(false);
    // } else {
    //   setIsClicked(true);
    // }
  }

  const ScrollSpyNav = ({ options }) => {
    return (
      <StyledTabs orientation={TabsOrientation.vertical}>
        {options.map(option => (
          <Tab
            disabled={option.disabled}
            icon={option.icon}
            key={option.hash}
            onClick={() => onClick(option)}
            data-scrollspy-id={option.hash}
          >
            {option.title}
          </Tab>
        ))}
      </StyledTabs>
    );
  };

  React.useLayoutEffect(() => {
    const scrollSpyNavSections = document.querySelectorAll('section');
    const optionsFromSections = Array.from(scrollSpyNavSections).map(
      (section, index) => {
        // console.log(icon);
        return {
          index,
          disabled: disabled,
          hash: toCamelCase(section.id),
          icon: icon,
          title: section.dataset.navTitle,
        };
      }
    );
    setOptions(optionsFromSections);
  }, ['section']);
  // console.log(options);
  return (
    <StyledTabsContainer activeIndex={activeIndex}>
      <ScrollSpy handleScroll={onScrollUpdate} />
      <ScrollSpyNav options={options} />
      <StyledContentWrapper>{children}</StyledContentWrapper>
    </StyledTabsContainer>
  );
});
