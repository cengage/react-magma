import React, { HTMLAttributes } from 'react';
import {
  AppBar,
  ButtonVariant,
  HideAtBreakpoint,
  HideAtBreakpointDisplayType,
  Hyperlink,
  IconButton,
  Search,
  ThemeContext,
  ThemeInterface,
} from 'react-magma-dom';
import { IconProps, MenuIcon } from 'react-magma-icons';
import styled from '@emotion/styled';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  callToAction?: string; //TODO: Make link props not string
  iconButtons?: IconButtonProps[];
  isCompact?: boolean;
  isInverse?: boolean;
  hasSidebar?: boolean; //TODO: Do everything related to this :)
  logo?: React.ReactNode;
  searchProps?: SearchProps;
  testId?: string;
}

interface IconButtonProps {
  ariaLabel: string;
  icon: React.ReactElement<IconProps>;
  onClick: () => void;
}

interface SearchProps {
  iconAriaLabel?: string; // default Search
  labelText?: string; // default Search
  placeholder?: string; // default Search
  onSearch?: (term: string) => void;
  value?: string;
}

//TODO: Responsive behavior including hamburger menu

const LogoWrapper = styled.span<{ theme: ThemeInterface }>`
  flex-grow: 1;
  margin-right: ${props => props.theme.spaceScale.spacing12};
  white-space: nowrap;
`;

const ChildrenWrapper = styled.span<{ theme: ThemeInterface }>`
  margin: 0 ${props => props.theme.spaceScale.spacing06};
  white-space: nowrap;
`;

const StyledLink = styled(Hyperlink)<{ theme: ThemeInterface }>`
  text-decoration: none;
  margin-right: ${props => props.theme.spaceScale.spacing06};
  white-space: nowrap;
`;

export const Header = ({
  children,
  callToAction,
  logo,
  iconButtons,
  isInverse,
  searchProps,
  ...other
}: HeaderProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <AppBar isInverse={isInverse} theme={theme} {...other}>
      <HideAtBreakpoint minWidth={1024}>
        <IconButton
          aria-label="Open navigation menu"
          icon={<MenuIcon />}
          isInverse={isInverse}
          style={{ marginLeft: '-4px' }}
          variant={ButtonVariant.link}
        />
      </HideAtBreakpoint>

      <LogoWrapper theme={theme}>
        {logo || <strong>YOUR LOGO HERE</strong>}
      </LogoWrapper>

      <HideAtBreakpoint
        displayType={HideAtBreakpointDisplayType.flex}
        maxWidth={1023}
        style={{ alignItems: 'center' }}
      >
        {children && (
          <ChildrenWrapper theme={theme}>{children}</ChildrenWrapper>
        )}

        {callToAction && (
          <StyledLink isInverse={isInverse} theme={theme} to="#">
            {callToAction}
          </StyledLink>
        )}

        {searchProps && searchProps.onSearch && (
          <Search
            {...searchProps}
            isInverse={isInverse}
            onSearch={searchProps.onSearch}
          />
        )}

        {iconButtons &&
          iconButtons.map((icon: IconButtonProps, i: number) => (
            <IconButton
              aria-label={icon.ariaLabel}
              icon={icon.icon}
              isInverse={isInverse}
              key={i}
              onClick={icon.onClick}
              variant={ButtonVariant.link}
            />
          ))}
      </HideAtBreakpoint>
    </AppBar>
  );
};
