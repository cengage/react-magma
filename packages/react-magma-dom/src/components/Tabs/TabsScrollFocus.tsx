import React from 'react';
import styled from '@emotion/styled';
import { ScrollSpy } from './utils';
import { ThemeContext } from '../../theme/ThemeContext';
import { Tabs, TabsBorderPosition, TabsOrientation } from './Tabs';
import { Tab } from './Tab';
import { TabsContainer } from './TabsContainer';
import { ThemeInterface } from '../../theme/magma';

interface TabScrollFocusProps extends React.HTMLAttributes<HTMLDivElement> {
  selector?: any;
  isActive?: boolean;
}

const StyledTabsContainer = styled(TabsContainer)`
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

const StyledTab = styled(Tab)<{
  isActive?: boolean;
  theme?: ThemeInterface;
  borderPosition?: TabsBorderPosition;
  orientation: TabsOrientation;
  isInverse?: boolean;
}>`
  .active {
    position: relative;
    &:after {
      background: ${props =>
        props.isInverse
          ? props.theme.colors.tertiary
          : props.theme.colors.primary};
      border-radius: 2px;
      content: '';
      display: block;
      opacity: 1;
      position: absolute;
      transition: 0.4s all;
      height: auto;
      bottom: 0;
      left: 0;
      right: auto;
      top: 0;
      width: 4px;
    }
  }
  box-shadow: ${props => (props.isActive ? 'inset 0 0 0 20px blue' : '')};
`;

const StyledContentWrapper = styled.div`
  flex: 1;
`;

export const TabsScrollFocus = React.forwardRef<
  HTMLDivElement,
  TabScrollFocusProps
>((props, ref) => {
  const { children, selector } = props;

  const [options, setOptions] = React.useState([]);

  const theme = React.useContext(ThemeContext);

  let isActive = false;

  const onScrollUpdate = (entry, isInVewPort) => {
    const { target, boundingClientRect } = entry;
    const menuItem = document.querySelector(
      `[data-scrollspy-id="${target.id}"]`
    );
    if (boundingClientRect.y <= 0 && isInVewPort) {
      menuItem.classList.add('active');
      console.log(target);
      // Get an active container index
      // Set an active container index
    } else {
      if (menuItem.classList.contains('active')) {
        menuItem.classList.remove('active');
        // Remove an active container index
      }
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
          <StyledTab
            orientation={TabsOrientation.vertical}
            key={option.hash}
            theme={theme}
          >
            <a
              href={`#${option.hash}`}
              onClick={onClick}
              data-scrollspy-id={option.hash}
            >
              {option.title}
            </a>
          </StyledTab>
        ))}
      </StyledTabs>
    );
  };

  console.log(isActive);

  React.useLayoutEffect(() => {
    const navMenuSections = document.querySelectorAll(selector);
    const optionsFromSections = Array.from(navMenuSections).map(section => {
      return {
        hash: section.id,
        title: section.dataset.navTitle,
      };
    });
    setOptions(optionsFromSections);
  }, [selector]);

  return (
    <StyledTabsContainer activeIndex={null}>
      <ScrollSpy handleScroll={onScrollUpdate} />
      <NavMenu options={options} />
      <StyledContentWrapper>{children}</StyledContentWrapper>
    </StyledTabsContainer>
  );
});
