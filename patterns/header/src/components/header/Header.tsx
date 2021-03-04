import React, { HTMLAttributes } from 'react';
import {
  AppBar,
  ButtonVariant,
  HideAtBreakpoint,
  HideAtBreakpointDisplayType,
  Hyperlink,
  HyperlinkProps,
  IconButton,
  I18nContext,
  Search,
  SearchProps,
  ThemeContext,
  ThemeInterface,
} from 'react-magma-dom';
import { MenuIcon } from 'react-magma-icons';
import styled from '@emotion/styled';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  breakpoint?: number;
  callToActionProps?: HyperlinkProps;
  isCompact?: boolean;
  isInverse?: boolean;
  hasSidebar?: boolean;
  logo?: React.ReactNode;
  onMenuButtonClick?: () => void;
  searchProps?: SearchProps;
  testId?: string;
}

const LogoWrapper = styled.span<{ isCompact?: boolean; theme: ThemeInterface }>`
  align-items: center;
  display: flex;
  flex-grow: 1;
  height: ${props =>
    props.isCompact
      ? props.theme.spaceScale.spacing06
      : props.theme.spaceScale.spacing09};
  margin-right: ${props => props.theme.spaceScale.spacing12};
  white-space: nowrap;

  svg,
  img {
    height: ${props =>
      props.isCompact
        ? props.theme.spaceScale.spacing06
        : props.theme.spaceScale.spacing09};
  }
`;

const StyledLink = styled(Hyperlink)<{ theme: ThemeInterface }>`
  text-decoration: none;
  margin-right: ${props => props.theme.spaceScale.spacing06};
  white-space: nowrap;
`;

const ChildrenWrapper = styled.span<{ theme: ThemeInterface }>`
  align-items: center;
  display: flex;
  margin: 0 0 0 ${props => props.theme.spaceScale.spacing06};
  white-space: nowrap;
`;

export const Header = ({
  breakpoint,
  children,
  callToActionProps,
  logo,
  isCompact,
  isInverse,
  onMenuButtonClick,
  searchProps,
  ...other
}: HeaderProps) => {
  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  return (
    <AppBar
      isCompact={isCompact}
      isInverse={isInverse}
      theme={theme}
      {...other}
    >
      {breakpoint && onMenuButtonClick && (
        <HideAtBreakpoint minWidth={breakpoint + 1}>
          <IconButton
            aria-label={i18n.alert.dismissAriaLabel}
            icon={<MenuIcon />}
            onClick={onMenuButtonClick}
            isInverse={isInverse}
            style={{ marginLeft: `-${theme.spaceScale.spacing02}` }}
            variant={ButtonVariant.link}
          />
        </HideAtBreakpoint>
      )}

      <LogoWrapper isCompact={isCompact} theme={theme}>
        {logo}
      </LogoWrapper>

      <HideAtBreakpoint
        displayType={HideAtBreakpointDisplayType.flex}
        maxWidth={breakpoint}
        style={{ alignItems: 'center' }}
      >
        {callToActionProps && (
          <StyledLink
            isInverse={isInverse}
            theme={theme}
            {...callToActionProps}
          />
        )}

        {searchProps && <Search {...searchProps} isInverse={isInverse} />}

        {children && (
          <ChildrenWrapper theme={theme}>{children}</ChildrenWrapper>
        )}
      </HideAtBreakpoint>
    </AppBar>
  );
};
