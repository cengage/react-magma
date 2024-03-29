import React from 'react';
import {
  AppBar,
  AppBarProps,
  ButtonVariant,
  HideAtBreakpoint,
  HideAtBreakpointDisplayType,
  Hyperlink,
  HyperlinkProps,
  IconButton,
  I18nContext,
  Search,
  SearchProps,
  Spacer,
  SpacerAxis,
  ThemeContext,
  ThemeInterface,
  useIsInverse,
} from 'react-magma-dom';
import { MenuIcon } from 'react-magma-icons';
import styled from '@emotion/styled';

// NOTE: These props are manually copied to header.mdx
export interface HeaderProps extends AppBarProps {
  breakpoint?: number;
  callToActionProps?: HyperlinkProps;
  logo?: React.ReactNode;
  onMenuButtonClick?: () => void;
  searchProps?: SearchProps;
  /**
   * @internal
   */
  testId?: string;
}

const LogoWrapper = styled('span')<{ isCompact?: boolean; theme: ThemeInterface }>`
  align-items: center;
  display: flex;
  flex-grow: 1;
  white-space: nowrap;

  svg,
  img {
    height: ${props =>
      props.isCompact
        ? props.theme.spaceScale.spacing06
        : props.theme.spaceScale.spacing09};
  }
`;

const StyledLink = styled(Hyperlink)`
  text-decoration: none;
  white-space: nowrap;
`;

const ChildrenWrapper = styled('span')`
  align-items: center;
  display: flex;
  white-space: nowrap;
`;

export const Header = (props: HeaderProps) => {
  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const {
    breakpoint,
    children,
    callToActionProps,
    logo,
    isCompact,
    onMenuButtonClick,
    searchProps,
    ...other
  } = props;

  const isInverse = useIsInverse(props.isInverse);

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
            aria-label={i18n.header.navigationButtonLabel}
            icon={<MenuIcon />}
            onClick={onMenuButtonClick}
            style={{ marginLeft: `-${theme.spaceScale.spacing04}` }}
            variant={ButtonVariant.link}
          />
          <Spacer
            axis={SpacerAxis.horizontal}
            size={theme.spaceScale.spacing03}
          />
        </HideAtBreakpoint>
      )}
      <LogoWrapper
        data-testid="logoWrapper"
        isCompact={isCompact}
        theme={theme}
      >
        {logo}
      </LogoWrapper>
      <Spacer size={theme.spaceScale.spacing12} />
      <HideAtBreakpoint
        displayType={HideAtBreakpointDisplayType.flex}
        maxWidth={breakpoint}
        style={{ alignItems: 'center' }}
      >
        {callToActionProps && (
          <>
            <StyledLink theme={theme} {...callToActionProps} />
            {(searchProps || children) && (
              <Spacer size={theme.spaceScale.spacing06} />
            )}
          </>
        )}

        {searchProps && (
          <>
            <Search {...searchProps} />
            {children && <Spacer size={theme.spaceScale.spacing05} />}
          </>
        )}

        {children && (
          <ChildrenWrapper theme={theme}>{children}</ChildrenWrapper>
        )}
      </HideAtBreakpoint>
    </AppBar>
  );
};
