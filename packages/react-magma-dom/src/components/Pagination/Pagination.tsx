import * as React from 'react';

import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { ArrowBackIcon, ArrowForwardIcon } from 'react-magma-icons';

import { I18nContext } from '../../i18n';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import {
  PageButton,
  pageButtonTypeLetterSpacing,
  pageButtonTypeLineHeight,
  pageButtonTypeSize,
} from './PageButton';
import { usePagination } from './usePagination';
import { Announce, AnnouncePoliteness } from '../Announce';
import { SimplePagination } from '../Pagination/SimplePagination';
import { Tooltip, TooltipPosition } from '../Tooltip';
import { VisuallyHidden } from '../VisuallyHidden';
import { formatPageNumber, pageAriaLabel } from './utils';

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
   * If true, ellipses in classic Pagination become page-jump controls.
   * @default false
   */
  enablePageJump?: boolean;
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
   * Current page number when used with onPageChange.
   */
  page?: number;
}
export interface UncontrolledPaginationProps extends BasePaginationProps {
  /**
   * Page selected by default when the component is uncontrolled
   */
  defaultPage?: number;
  /**
   * Current page number when used with onPageChange.
   */
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
  flex-wrap: wrap;
  gap: ${props => props.theme.spaceScale.spacing02};
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li`
  list-style-type: none;
  position: relative;
`;

function BuildButtonSize(props) {
  switch (props.size) {
    case 'large':
      return `${props.theme.spaceScale.spacing11}`;
    default:
      return `${props.theme.spaceScale.spacing09}`;
  }
}

function buildClassicButtonSize(props) {
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

const ClassicNavButton = styled(NavButton)`
  height: ${buildClassicButtonSize};
  width: ${buildClassicButtonSize};
`;

interface PaginationControlStyles {
  size: PageButtonSize;
  theme: ThemeInterface;
}

interface InversePaginationControlStyles extends PaginationControlStyles {
  isInverse?: boolean;
}

interface PageJumpSelectStyles {
  disabled?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}

const StyledEllipsis = styled.li<PaginationControlStyles>`
  align-items: center;
  display: flex;
  font-size: ${pageButtonTypeSize};
  height: ${buildClassicButtonSize};
  justify-content: center;
  letter-spacing: ${pageButtonTypeLetterSpacing};
  line-height: ${pageButtonTypeLineHeight};
  width: ${buildClassicButtonSize};
`;

const StyledPageJump = styled.li<PaginationControlStyles>`
  height: ${buildClassicButtonSize};
  list-style-type: none;
  position: relative;
  width: ${buildClassicButtonSize};
`;

const StyledPageJumpLabel = styled.span<InversePaginationControlStyles>`
  align-items: center;
  border-radius: 100%;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral0
      : props.theme.colors.brand.navy};
  display: flex;
  font-size: ${pageButtonTypeSize};
  height: 100%;
  justify-content: center;
  letter-spacing: ${pageButtonTypeLetterSpacing};
  line-height: ${pageButtonTypeLineHeight};
  pointer-events: none;
  width: 100%;
`;

const StyledPageJumpSelect = styled.select<PageJumpSelectStyles>`
  appearance: none;
  border: 0;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  height: 100%;
  inset: 0;
  opacity: 0;
  position: absolute;
  width: 100%;
  z-index: 1;

  &:not(:disabled):hover
    + ${StyledPageJumpLabel},
    &:not(:disabled):focus
    + ${StyledPageJumpLabel} {
    background: ${props =>
      props.isInverse
        ? transparentize(0.5, props.theme.colors.neutral900)
        : transparentize(0.5, props.theme.colors.neutral200)};
  }

  &:not(:disabled):focus + ${StyledPageJumpLabel} {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
    outline-offset: 2px;
  }

  &:disabled + ${StyledPageJumpLabel} {
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral600
        : props.theme.colors.neutral500};
  }
`;

function getPageJumpBounds(pageButtons, index) {
  const previousPage = pageButtons
    .slice(0, index)
    .reverse()
    .find(item => item.type === 'page')?.page;
  const nextPage = pageButtons
    .slice(index + 1)
    .find(item => item.type === 'page')?.page;

  if (previousPage === undefined || nextPage === undefined) {
    return null;
  }

  return {
    startPage: previousPage + 1,
    endPage: nextPage - 1,
  };
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (props, ref) => {
    const {
      count,
      defaultPage,
      disabled,
      enablePageJump = false,
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

    const { handlePageChange, pageButtons } = usePagination({
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
    const [focusedPage, setFocusedPage] = React.useState<number | null>(null);
    const pageButtonRefs = React.useRef<Map<number, HTMLButtonElement>>(
      new Map()
    );

    React.useEffect(() => {
      if (focusedPage !== null && pageButtonRefs.current.has(focusedPage)) {
        const button = pageButtonRefs.current.get(focusedPage);

        button?.focus();
        setFocusedPage(null);
      }
    }, [focusedPage, pageButtons]);

    const setPageButtonRef =
      (pageNumber: number) => (el: HTMLButtonElement | null) => {
        if (el) {
          pageButtonRefs.current.set(pageNumber, el);
        } else {
          pageButtonRefs.current.delete(pageNumber);
        }
      };

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
            {...other}
          />
        ) : (
          <StyledNav
            aria-label="pagination"
            {...other}
            theme={theme}
            data-testid={testId}
            ref={ref}
          >
            <StyledList theme={theme}>
              {pageButtons.map(
                (
                  {
                    'aria-current': ariaCurrent,
                    page,
                    type,
                    isSelected,
                    ...other
                  },
                  index
                ) => {
                  if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                    const pageJumpBounds = getPageJumpBounds(
                      pageButtons,
                      index
                    );

                    if (enablePageJump && pageJumpBounds) {
                      const { startPage, endPage } = pageJumpBounds;
                      const pageJumpLabel = (
                        i18n.pagination.pageJumpLabel ??
                        'Select a page between {startPage} and {endPage}'
                      )
                        .replace(
                          '{startPage}',
                          formatPageNumber(startPage)
                        )
                        .replace('{endPage}', formatPageNumber(endPage));

                      return (
                        <StyledPageJump key={index} size={size} theme={theme}>
                          <StyledPageJumpSelect
                            aria-label={pageJumpLabel}
                            disabled={other.disabled}
                            isInverse={isInverse}
                            onChange={event => {
                              const nextPage = Number(
                                event.currentTarget.value
                              );

                              setFocusedPage(nextPage);
                              handlePageChange(event, nextPage);
                            }}
                            theme={theme}
                            value=""
                          >
                            <option hidden value="" />
                            {Array.from(
                              { length: endPage - startPage + 1 },
                              (_, pageIndex) => startPage + pageIndex
                            ).map(pageNumber => (
                              <option key={pageNumber} value={pageNumber}>
                                {formatPageNumber(pageNumber)}
                              </option>
                            ))}
                          </StyledPageJumpSelect>
                          <StyledPageJumpLabel
                            aria-hidden="true"
                            isInverse={isInverse}
                            size={size}
                            theme={theme}
                          >
                            &#8230;
                          </StyledPageJumpLabel>
                        </StyledPageJump>
                      );
                    }

                    return (
                      <StyledEllipsis
                        aria-current={Boolean(ariaCurrent)}
                        aria-hidden="true"
                        key={index}
                        size={size}
                        theme={theme}
                      >
                        &#8230;
                      </StyledEllipsis>
                    );
                  } else if (type === 'page') {
                    return (
                      <StyledListItem key={index}>
                        <PageButton
                          aria-current={
                            ariaCurrent ? 'page' : Boolean(ariaCurrent)
                          }
                          ref={setPageButtonRef(page)}
                          isInverse={isInverse}
                          isSelected={isSelected}
                          size={buttonSize}
                          {...other}
                          onClick={event => {
                            setFocusedPage(page);
                            other.onClick?.(event);
                          }}
                        >
                          {formatPageNumber(page)}
                        </PageButton>
                        <VisuallyHidden>
                          <Announce
                            politeness={AnnouncePoliteness.assertive}
                          >{`${isSelected ? pageAriaLabel(page, count, i18n.simplePagination) : ''}`}</Announce>
                        </VisuallyHidden>
                      </StyledListItem>
                    );
                  } else if (type === 'previous' || type === 'next') {
                    const tooltipContent =
                      type === 'previous'
                        ? (i18n.pagination.previousTooltipLabel ??
                          i18n.pagination.previousButtonLabel)
                        : (i18n.pagination.nextTooltipLabel ??
                          i18n.pagination.nextButtonLabel);
                    const navButton = (
                      <ClassicNavButton
                        variant={ButtonVariant.link}
                        color={ButtonColor.subtle}
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
                        shape={ButtonShape.round}
                        size={buttonSize}
                        {...other}
                      />
                    );

                    return (
                      <StyledListItem key={index}>
                        {other.disabled ? (
                          navButton
                        ) : (
                          <Tooltip
                            content={tooltipContent}
                            isInverse={isInverse}
                            position={TooltipPosition.bottom}
                          >
                            {navButton}
                          </Tooltip>
                        )}
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
