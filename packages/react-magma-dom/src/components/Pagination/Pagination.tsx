import * as React from 'react';
import { ButtonColor, ButtonShape, ButtonSize } from '../Button';
import { darken } from 'polished';
import { IconButton } from '../IconButton';
import { PageButton } from './PageButton';
import { ArrowBackIcon, ArrowForwardIcon } from 'react-magma-icons';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
  size?: PageButtonSize;
  count: number;
  defaultPage?: number;
  isInverse?: boolean;
}

export enum PageButtonSize {
  medium = 'medium',
  large = 'large',
}

const StyledNav = styled.nav`
  min-width: 0;
`;

const StyledList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li`
  list-style-type: none;
  &:last-child {
    button {
      border-left: none;
    }
  }
`;

export function BuildBackground(props) {
  if (props.isInverse) {
    switch (props.color) {
      case 'primary':
        if (props.isInverse) {
          return `${props.theme.colors.neutral08}`;
        }
        return `${props.theme.colors.primary}`;
      default:
        if (props.isInverse) {
          return `${props.theme.colors.foundation02}`;
        }
        return `${props.theme.colors.neutral05}`;
    }
  }
}

export function BuildBorder(props) {
  switch (props.color) {
    case 'primary':
      if (props.isInverse) {
        return `${props.theme.spaceScale.spacing01} solid ${props.theme.colors.neutral08}`;
      }
      return `${props.theme.spaceScale.spacing01} solid ${props.theme.colors.primary}`;
    default:
      if (props.isInverse) {
        return `${props.theme.spaceScale.spacing01} solid ${props.theme.colors.neutral08}`;
      }
      return `${props.theme.spaceScale.spacing01} solid ${props.theme.colors.neutral05}`;
  }
}

export function hoverBorder(props) {
  switch (props.color) {
    case 'primary':
      if (props.isInverse) {
        return `${props.theme.colors.neutral08}`;
      }
      return `${darken(0.1, props.theme.colors.primary)}`;
    default:
      if (props.isInverse) {
        return `${props.theme.colors.neutral08}`;
      }
      return `${props.theme.colors.neutral05}`;
  }
}

function BuildButtonSize(props) {
  switch (props.size) {
    case 'large':
      return `${props.theme.spaceScale.spacing11}`;
    default:
      return `${props.theme.spaceScale.spacing09}`;
  }
}

const NavButton = styled(IconButton)`
  background: ${BuildBackground};
  border: none;
  border-top: ${BuildBorder};
  border-right: ${BuildBorder};
  border-bottom: ${BuildBorder};
  border-left: ${BuildBorder};
  color: ${props =>
    props.isInverse ? props.theme.colors.neutral08 : 'inherit'};
  height: ${BuildButtonSize};
  margin: 0;
  padding: 0;
  width: ${BuildButtonSize};
  &:focus {
    z-index: 1;
    outline: 0 !important;
    outline-offset: 0;
    overflow: visible;
  }
  &:focus:before {
    content: '';
    border: 2px solid ${props => props.theme.colors.focus};
    border-style: dotted;
    height: calc(100% + 14px);
    left: -7px;
    position: absolute;
    top: -7px;
    width: calc(100% + 14px);
  }
`;

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (props, ref) => {
    const {
      count,
      defaultPage = 1,
      isInverse,
      size = PageButtonSize.medium,
      testId,
      ...other
    } = props;
    const theme = React.useContext(ThemeContext);
    const buttonSize =
      size === PageButtonSize.large ? ButtonSize.large : ButtonSize.medium;
    const [activePage, setActivePage] = React.useState(defaultPage);

    function handlePreviousClick() {
      setActivePage(activePage - 1);
    }
    function handleNextClick() {
      setActivePage(activePage + 1);
    }
    function handlePageButtonClick(pageNumber) {
      setActivePage(pageNumber);
    }

    const buttons = [];
    for (let i = 1; i < count + 1; i++) {
      buttons.push(
        <StyledListItem>
          <PageButton
            onClick={() => {
              handlePageButtonClick(i);
            }}
            isInverse={isInverse}
            isSelected={activePage === i ? true : false}
            size={buttonSize}
            key={i}
          >
            {i}
          </PageButton>
        </StyledListItem>
      );
    }
    return (
      <StyledNav {...other} theme={theme}>
        <StyledList>
          <StyledListItem>
            <NavButton
              onClick={handlePreviousClick}
              color={ButtonColor.secondary}
              aria-label="Previous"
              icon={<ArrowBackIcon />}
              isInverse={isInverse}
              theme={theme}
              shape={ButtonShape.leftCap}
              size={buttonSize}
              disabled={activePage === 1 ? true : false}
            />
          </StyledListItem>
          {buttons}
          <StyledListItem>
            <NavButton
              onClick={handleNextClick}
              color={ButtonColor.secondary}
              aria-label="Next"
              icon={<ArrowForwardIcon />}
              isInverse={isInverse}
              theme={theme}
              shape={ButtonShape.rightCap}
              size={buttonSize}
              disabled={activePage === count ? true : false}
            />
          </StyledListItem>
        </StyledList>
      </StyledNav>
    );
  }
);
