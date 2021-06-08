import * as React from 'react';
import { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { darken } from 'polished';
import { I18nContext } from '../../i18n';
import { IconButton } from '../IconButton';
import { PageButton } from './PageButton';
import { ArrowBackIcon, ArrowForwardIcon } from 'react-magma-icons';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
  /**
   * Size toggles between default and large variant buttons.
   */
  size?: PageButtonSize;
  /**
   * Count designates the total number of Pagination buttons.
   */
  count: number;
  /**
   * Default Page allows the user to toggle which Pagination button is active by default.
   */
  defaultPage?: number;

  isInverse?: boolean;
  /**
   * Event that fires when the active page changes
   */
  onPageChange?: (pageNum: number) => void;
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

export function BuildBorder(props) {
  switch (props.color) {
    case 'primary':
      if (props.isInverse) {
        return `${props.theme.spaceScale.spacing01} solid ${props.theme.colors.neutral08}`;
      }
      return `${props.theme.spaceScale.spacing01} solid ${props.theme.colors.primary}`;
    default:
      if (props.isInverse) {
        if (props.disabled) {
          return `${props.theme.spaceScale.spacing01} solid ${props.theme.colors.tint04}`;
        }
        return `${props.theme.spaceScale.spacing01} solid ${props.theme.colors.neutral08}`;
      }
      if (props.disabled) {
        return `${props.theme.spaceScale.spacing01} solid ${props.theme.colors.neutral06}`;
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
  border-top: ${BuildBorder};
  border-right: ${BuildBorder};
  border-bottom: ${BuildBorder};
  border-left: ${BuildBorder};
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
    border: ${props =>
      props.isInverse
        ? `${props.theme.spaceScale.spacing01} solid ${props.theme.colors.focusInverse}`
        : `${props.theme.spaceScale.spacing01} solid ${props.theme.colors.focus}`};
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
      onPageChange,
      ...other
    } = props;
    const { theme } = React.useContext(ThemeContext);
    const buttonSize =
      size === PageButtonSize.large ? ButtonSize.large : ButtonSize.medium;
    const [activePage, setActivePage] = React.useState(defaultPage);

    function handlePreviousClick() {
      handlePageChange(activePage - 1);
    }
    function handleNextClick() {
      handlePageChange(activePage + 1);
    }
    function handlePageButtonClick(pageNumber) {
      handlePageChange(pageNumber);
    }
    function handlePageChange(pageNumber) {
      setActivePage(pageNumber);
      if (onPageChange) {
        onPageChange(pageNumber);
      }
    }

    const i18n = React.useContext(I18nContext);

    const buttons = [];
    for (let i = 1; i < count + 1; i++) {
      buttons.push(
        <StyledListItem key={i}>
          <PageButton
            aria-label={`${i18n.pagination.pageButtonLabel} ${i}`}
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
      <StyledNav {...other} theme={theme} data-testid={testId} ref={ref}>
        <StyledList>
          <StyledListItem>
            <NavButton
              variant={isInverse ? ButtonVariant.outline : ButtonVariant.solid}
              onClick={handlePreviousClick}
              color={ButtonColor.secondary}
              aria-label={i18n.pagination.previousButtonLabel}
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
              aria-label={i18n.pagination.nextButtonLabel}
              icon={<ArrowForwardIcon />}
              isInverse={isInverse}
              theme={theme}
              shape={ButtonShape.rightCap}
              size={buttonSize}
              disabled={activePage === count ? true : false}
              variant={isInverse ? ButtonVariant.outline : ButtonVariant.solid}
            />
          </StyledListItem>
        </StyledList>
      </StyledNav>
    );
  }
);
