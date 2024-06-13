import * as React from 'react';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import styled, { CreateStyled } from '@emotion/styled';
import { ThemeInterface } from '../../theme/magma';

export enum FlexAlignContent {
  center = 'center',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  spaceBetween = 'space-between',
  spaceAround = 'space-around',
  stretch = 'stretch', // default
}

export enum FlexAlignItems {
  baseline = 'baseline',
  center = 'center',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  stretch = 'stretch', // default
}

export enum FlexBehavior {
  container = 'container',
  item = 'item',
  both = 'both',
}

export enum FlexDirection {
  column = 'column',
  columnReverse = 'column-reverse',
  row = 'row', // default
  rowReverse = 'row-reverse',
}

export enum FlexJustify {
  center = 'center',
  flexStart = 'flex-start', //default
  flexEnd = 'flex-end',
  spaceBetween = 'space-between',
  spaceAround = 'space-around',
  spaceEvenly = 'space-evenly',
}

export enum FlexWrap {
  nowrap = 'nowrap',
  wrap = 'wrap', //default
  wrapReverse = 'wrap-reverse',
}

/**
 * @children required
 */
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the align-content style property. It's applied for all screen sizes.
   * @default FlexAlignContent.stretch
   */
  alignContent?: FlexAlignContent;
  /**
   * Defines the align-items style property. It's applied for all screen sizes.
   * @default FlexAlignItems.stretch
   */
  alignItems?: FlexAlignItems;
  /**
   *  Defines the flex behavior for the component. Options are container, item or both. You should be wrapping items with a container.
   */
  behavior: FlexBehavior;
  /**
   * Defines the flex-direction style property. It's applied for all screen sizes.
   * @default FlexDirection.row
   */
  direction?: FlexDirection;
  /**
   * If true, the component will have the flex item behavior. You should be wrapping items with a container.
   * @default FlexJustify.flexStart
   */
  justify?: FlexJustify;
  /**
   * Defines the space between the type item component. Spacing will be this number multiplied by 8px. It can only be used on a type container component.
   * @default 0
   */
  spacing?: number;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Defines the flex-wrap style property. It's applied for all screen sizes.
   * @default FlexWrap.wrap
   */
  wrap?: FlexWrap;
  /**
   * Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority.
   * @default false
   */
  xs?: false | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /**
   * Defines the number of grids the component is going to use. It's applied for the small breakpoint and wider screens.
   * @default false
   */
  sm?: false | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /**
   * Defines the number of grids the component is going to use. It's applied for the medium breakpoint and wider screens.
   * @default false
   */
  md?: false | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /**
   * Defines the number of grids the component is going to use. It's applied for the large breakpoint and wider screens.
   * @default false
   */
  lg?: false | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /**
   * Defines the number of grids the component is going to use. It's applied for the extra-large breakpoint and wider screens.
   * @default false
   */
  xl?: false | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const typedStyled = styled as CreateStyled<ThemeInterface>;

function getWidth(size) {
  return `${Math.round((size / 12) * 10e7) / 10e5}%`;
}

const StyledFlex = typedStyled.div<FlexProps>`
  ${props =>
    props.behavior !== FlexBehavior.item &&
    css`
      align-content: ${props.alignContent};
      align-items: ${props.alignItems};
      flex-direction: ${props.direction};
      display: flex;
      flex-wrap: ${props.wrap};
      justify-content: ${props.justify};
      margin: ${0 - props.spacing * 4}px;
      width: calc(100% + ${props.spacing * props.theme.spacingMultiplier}px);

      > div {
        padding: ${props.spacing * 4}px;
      }
    `};

  ${props =>
    props.behavior !== FlexBehavior.container &&
    css`
      flex-grow: ${props.xs === true ? '1' : '0'};
      flex-basis: ${props.xs === true ? '0' : getWidth(props.xs)};
      max-width: ${props.xs === true ? '100%' : getWidth(props.xs)};

      ${props.sm &&
      css`
        @media (min-width: ${props.theme.breakpoints.small}px) {
          flex-grow: ${props.sm === true ? '1' : '0'};
          flex-basis: ${props.sm === true ? '0' : getWidth(props.sm)};
          max-width: ${props.sm === true ? '100%' : getWidth(props.sm)};
        }
      `};

      ${props.md &&
      css`
        @media (min-width: ${props.theme.breakpoints.medium}px) {
          flex-grow: ${props.md === true ? '1' : '0'};
          flex-basis: ${props.md === true ? '0' : getWidth(props.md)};
          max-width: ${props.md === true ? '100%' : getWidth(props.md)};
        }
      `};

      ${props.lg &&
      css`
        @media (min-width: ${props.theme.breakpoints.large}px) {
          flex-grow: ${props.lg === true ? '1' : '0'};
          flex-basis: ${props.lg === true ? '0' : getWidth(props.lg)};
          max-width: ${props.lg === true ? '100%' : getWidth(props.lg)};
        }
      `};

      ${props.xl &&
      css`
        @media (min-width: ${props.theme.breakpoints.xl}px) {
          flex-grow: ${props.xl === true ? '1' : '0'};
          flex-basis: ${props.xl === true ? '0' : getWidth(props.xl)};
          max-width: ${props.xl === true ? '100%' : getWidth(props.xl)};
        }
      `};
    `};
`;

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (props, ref) => {
    const {
      children,
      alignContent = FlexAlignContent.stretch,
      alignItems = FlexAlignItems.stretch,
      direction = FlexDirection.row,
      justify = FlexJustify.flexStart,
      spacing = 0,
      testId,
      wrap = FlexWrap.wrap,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);

    return (
      <StyledFlex
        {...other}
        alignContent={alignContent}
        alignItems={alignItems}
        data-testid={testId}
        direction={direction}
        justify={justify}
        ref={ref}
        spacing={spacing}
        theme={theme}
        wrap={wrap}
      >
        {children}
      </StyledFlex>
    );
  }
);
