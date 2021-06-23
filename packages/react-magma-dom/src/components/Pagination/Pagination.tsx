import * as React from 'react';
import { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { darken } from 'polished';
import { I18nContext } from '../../i18n';
import { IconButton } from '../IconButton';
import { PageButton, typeSize } from './PageButton';
import { ArrowBackIcon, ArrowForwardIcon } from 'react-magma-icons';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { usePagination } from '../../hooks/usePagination';

export interface BasePaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
  isInverse?: boolean;
  page?: number;
  /**
   * The total number of Pagination buttons
   * @default 1
   */
  count?: number;
  /**
   * If true, disables all of the Pagination buttons
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, hides the next page button
   * @default false
   */
  hideNextButton?: boolean;
  /**
   * If true, hides the previous page button
   * @default false
   */
  hidePreviousButton?: boolean;
  /**
   * Number of page buttons before and after the current page
   * @default 1
   */
  numberOfAdjacentPages?: number;
  /**
   * Number of page buttons at the beginning and end of the page number buttons list
   * @default 1
   */
  numberOfEdgePages?: number;
  /**
   * Event that fires when the page number changes
   */
  onPageChange?: (event: React.SyntheticEvent, newPage: number) => void;
  /**
   * Size toggles between default and large variant buttons.
   */
  size?: PageButtonSize;
  /**
   * If true, shows the first page button
   * @default false
   */
  showFirstButton?: boolean;
  /**
   * If true, shows the last page button
   * @default false
   */
  showLastButton?: boolean;
}

export interface ControlledPaginationProps extends BasePaginationProps {
  defaultPage: never;
  /**
   * Current page number
   */
  page?: number;
}
export interface UncontrolledPaginationProps extends BasePaginationProps {
  /**
   * Page selected by default when the component is uncontrolled
   */
  defaultPage?: number;
  page: number;
}
export type PaginationProps =
  | ControlledPaginationProps
  | UncontrolledPaginationProps;

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

const StyledEllipsis = styled.div`
  align-items: center;
  border-top: ${BuildBorder};
  border-right: ${BuildBorder};
  border-bottom: ${BuildBorder};
  display: flex;
  font-size: ${typeSize};
  height: ${BuildButtonSize};
  justify-content: center;
  width: ${BuildButtonSize};
`;

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (props, ref) => {
    const {
      count,
      defaultPage,
      disabled,
      hideNextButton,
      hidePreviousButton,
      isInverse,
      numberOfAdjacentPages,
      numberOfEdgePages,
      page,
      size = PageButtonSize.medium,
      showFirstButton,
      showLastButton,
      testId,
      onPageChange,
      ...other
    } = props;
    const theme = React.useContext(ThemeContext);
    const buttonSize =
      size === PageButtonSize.large ? ButtonSize.large : ButtonSize.medium;

    const { pageButtons } = usePagination({
      count,
      defaultPage,
      disabled,
      hideNextButton,
      hidePreviousButton,
      numberOfAdjacentPages,
      numberOfEdgePages,
      onPageChange,
      page,
      showFirstButton,
      showLastButton,
    });

    const i18n = React.useContext(I18nContext);

    return (
      <StyledNav {...other} theme={theme} data-testid={testId} ref={ref}>
        <StyledList>
          {pageButtons.map(
            ({ 'aria-current': ariaCurrent, page, type, ...other }, index) => {
              if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                return (
                  <StyledEllipsis
                    key={index}
                    isInverse={isInverse}
                    size={size}
                    theme={theme}
                  >
                    ...
                  </StyledEllipsis>
                );
              } else if (type === 'page') {
                return (
                  <StyledListItem
                    aria-current={Boolean(ariaCurrent)}
                    key={index}
                  >
                    <PageButton
                      isInverse={isInverse}
                      size={buttonSize}
                      {...other}
                    >
                      {page}
                    </PageButton>
                  </StyledListItem>
                );
              } else if (type === 'previous' || type === 'next') {
                return (
                  <StyledListItem key={index}>
                    <NavButton
                      variant={
                        isInverse ? ButtonVariant.outline : ButtonVariant.solid
                      }
                      color={ButtonColor.secondary}
                      aria-label={i18n.pagination[`${type}ButtonLabel`]}
                      icon={
                        type === 'previous' ? (
                          <ArrowBackIcon />
                        ) : (
                          <ArrowForwardIcon />
                        )
                      }
                      isInverse={isInverse}
                      theme={theme}
                      shape={
                        type === 'previous'
                          ? ButtonShape.leftCap
                          : ButtonShape.rightCap
                      }
                      size={buttonSize}
                      {...other}
                    />
                  </StyledListItem>
                );
              }
            }
          )}
        </StyledList>
      </StyledNav>
    );
  }
);
