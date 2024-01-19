import React from 'react';
import styled from '@emotion/styled';
import { ScrollSpy } from './utils';
import { Tabs, TabsOrientation } from './Tabs';
import { Tab } from './Tab';
import { TabsContainer } from './TabsContainer';

export interface TabScrollFocusProps
  extends React.HTMLAttributes<HTMLDivElement> {
  activeTab?: number;
  isActive?: boolean;
  onChange?: () => void;
  setHeight?: string;
}

const StyledTabsContainer = styled(TabsContainer)<{
  activeTab?: number;
}>`
  flex-wrap: nowrap;
`;

const StyledTabs = styled(Tabs)`
  flex: 0 100px;
  position: sticky;
  top: 0;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const StyledContentWrapper = styled.div<{
  setHeight?: string;
}>`
  flex: 1;
  height: ${props => (props.setHeight ? `${props.setHeight}px` : '')};
  overflow: ${props => (props.setHeight ? 'hidden' : '')};
  overflow-y: ${props => (props.setHeight ? `auto` : '')};
`;

export const TabsScrollSpyContainer = React.forwardRef<
  HTMLDivElement,
  TabScrollFocusProps
>(props => {
  const { children, setHeight } = props;

  const [options, setOptions] = React.useState([]);

  const [isActive, setIsActive] = React.useState(null);

  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    options.map((option: any) => {
      if (option.hash === isActive) {
        setActiveIndex(option.index);
        return;
      }
    });
  }, [isActive]);

  const onScrollUpdate = (entry, isInVewPort) => {
    const { target, boundingClientRect } = entry;

    if (boundingClientRect.y <= 0 && isInVewPort) {
      setIsActive(target.id);
    }
  };

  const NavMenu = ({ options }) => {
    // control the click event
    const onClick = e => {
      e.preventDefault();
      // Set the hash
      window.location.hash = e.target.hash;

      // Scroll to the section + 1 to account for weird bug.
      // remove the `+1` and click on Section 2 link to see the bug.
      const targetSection = document.querySelector(
        `${e.target.hash}`
      ) as HTMLElement;
      window.scrollTo(0, targetSection.offsetTop + 1);
    };

    return (
      <StyledTabs orientation={TabsOrientation.vertical}>
        {options.map(option => (
          <Tab>
            <a
              href={`#${option.hash}`}
              onClick={onClick}
              data-scrollspy-id={option.hash}
            >
              {option.title}
            </a>
          </Tab>
        ))}
      </StyledTabs>
    );
  };

  React.useLayoutEffect(() => {
    const navMenuSections = document.querySelectorAll('section');
    const optionsFromSections = Array.from(navMenuSections).map(
      (section, index) => {
        return {
          index,
          hash: section.id,
          title: section.dataset.navTitle,
        };
      }
    );
    setOptions(optionsFromSections);
  }, ['section']);
  return (
    <StyledTabsContainer activeTab={activeIndex} activeIndex={activeIndex}>
      <ScrollSpy handleScroll={onScrollUpdate} />
      <NavMenu options={options} />
      <StyledContentWrapper setHeight={setHeight}>
        {children}
      </StyledContentWrapper>
    </StyledTabsContainer>
  );
});
