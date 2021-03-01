import React, { HTMLAttributes } from 'react';
import {
  ButtonVariant,
  Hyperlink,
  IconButton,
  Search,
  ThemeContext,
  ThemeInterface,
} from 'react-magma-dom';
import { IconProps } from 'react-magma-icons';
import styled from '@emotion/styled';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  callToAction?: string; //TODO: Make link props not string
  iconButtons?: IconButtonProps[]; //TODO: Revisit interface structure
  isCompact?: boolean;
  isInverse?: boolean;
  hasSearch?: boolean; //TODO: Make search props not boolean
  hasSidebar?: boolean; //TODO: Do everything related to this :)
  logo?: React.ReactNode;
  tabbedNavigation?: React.ReactNode; //TODO: Do everything related to this :)
  testId?: string;
}

interface IconButtonProps {
  ariaLabel: string;
  icon: React.ReactElement<IconProps>;
  onClick: () => void;
}

//TODO: Responsive behavior including hamburger menu

const StyledHeader = styled.header<{
  isCompact?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
  background: ${props =>
    props.isInverse
      ? props.theme.colors.foundation02
      : props.theme.colors.neutral08};
  border-bottom: 1px solid ${props => props.theme.colors.neutral06};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  display: flex;
  height: ${props =>
    props.isCompact ? '56px' : '88px'}; // TODO: Remove hardcoded values
  padding: ${props =>
    props.isCompact
      ? props.theme.spaceScale.spacing05
      : props.theme.spaceScale.spacing06};
`;

const LogoWrapper = styled.span<{ theme: ThemeInterface }>`
  flex-grow: 1;
  margin-right: ${props => props.theme.spaceScale.spacing12};
`;

const ChildrenWrapper = styled.span<{ theme: ThemeInterface }>`
  margin: 0 ${props => props.theme.spaceScale.spacing06};
`;

const StyledLink = styled(Hyperlink)<{ theme: ThemeInterface }>`
  text-decoration: none;
  margin-right: ${props => props.theme.spaceScale.spacing06};
`;

export const Header = ({
  children,
  callToAction,
  logo,
  iconButtons,
  isInverse,
  hasSearch,
  testId,
  ...other
}: HeaderProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <StyledHeader
      data-testid={testId}
      isInverse={isInverse}
      theme={theme}
      {...other}
    >
      <LogoWrapper theme={theme}>
        {logo || <strong>YOUR LOGO HERE</strong>}
      </LogoWrapper>

      {children && <ChildrenWrapper theme={theme}>{children}</ChildrenWrapper>}

      {callToAction && (
        <StyledLink isInverse={isInverse} theme={theme} to="#">
          {callToAction}
        </StyledLink>
      )}

      {hasSearch && <Search isInverse={isInverse} onSearch={() => {}} />}

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
    </StyledHeader>
  );
};
