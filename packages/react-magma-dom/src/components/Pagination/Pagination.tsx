import * as React from 'react';
import { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { I18nContext } from '../../i18n';
import { IconButton } from '../IconButton';
import { PageButton, pageButtonTypeSize } from './PageButton';
import { ArrowBackIcon, ArrowForwardIcon } from 'react-magma-icons';
import styled from '../../theme/styled';
import { SimplePagination } from '../Pagination/SimplePagination';
import { ThemeContext } from '../../theme/ThemeContext';
import { usePagination } from './usePagination';

export interface BasePaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @internal
   */
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
   * @default PageButtonSize.medium
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
  /**
   * Enum which changes Pagination into a dropdown when using 'simple'.
   * @default PaginationType.classic
   */
  type?: PaginationType;
}

export enum PaginationType {
  classic = 'classic',
  simple = 'simple',
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

function BuildButtonSize(props) {
  switch (props.size) {
    case 'large':
      return `${props.theme.spaceScale.spacing11}`;
    default:
      return `${props.theme.spaceScale.spacing09}`;
  }
}

export const NavButton = styled(IconButton)`
  height: ${BuildButtonSize};
  margin: 0;
  padding: 0;
  width: ${BuildButtonSize};
`;

const StyledEllipsis = styled.li`
  align-items: center;
  display: flex;
  font-size: ${pageButtonTypeSize};
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
      type,
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
      <>
        {type === PaginationType.simple ? (
          <SimplePagination
            count={count}
            defaultPage={defaultPage < 1 ? 1 : defaultPage}
            disabled={disabled}
            hideNextButton={hideNextButton}
            hidePreviousButton={hidePreviousButton}
            isInverse={isInverse}
            onPageChange={onPageChange}
            page={page}
            testId={testId}
          />
        ) : (
          <StyledNav {...other} theme={theme} data-testid={testId} ref={ref}>
            <StyledList>
              {pageButtons.map(
                (
                  { 'aria-current': ariaCurrent, page, type, ...other },
                  index
                ) => {
                  if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                    return (
                      <StyledEllipsis
                        aria-current={Boolean(ariaCurrent)}
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
                          variant={ButtonVariant.solid}
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
        )}
      </>
    );
  }
);
