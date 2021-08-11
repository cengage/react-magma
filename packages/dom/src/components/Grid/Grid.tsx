import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import * as CSS from 'csstype';

export enum GridDisplay {
  grid = 'grid', // default
  inlineGrid = 'inline-grid',
}

export enum GridJustifyItems {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
}

export enum GridJustifyContent {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
  spaceAround = 'space-around',
  spaceBetween = 'space-between',
  spaceEvenly = 'space-evenly',
}

export enum GridAlignItems {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
}

export enum GridAlignContent {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
  spaceAround = 'space-around',
  spaceBetween = 'space-between',
  spaceEvenly = 'space-evenly',
}

export enum GridItemJustifySelf {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
}

export enum GridItemAlignSelf {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
}

export enum GridAutoFlow {
  row = 'row',
  column = 'column',
  rowDense = 'row-dense',
  columnDense = 'column-dense',
}

/**
 * @children required
 */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the display style property. Sets grid or inline-grid.
   * @default GridDisplay.grid
   */
  gridDisplay?: GridDisplay;
  /**
   * Set the columns in the grid.
   */
  gridTemplateColumns?: CSS.Property.GridTemplateColumns;
  /**
   * Set the rows in the grid.
   */
  gridTemplateRows?: CSS.Property.GridTemplateRows;
  /**
   * Set the areas in the grid.
   */
  gridTemplateAreas?: CSS.Property.GridTemplateAreas;
  /**
   * Set the space between columns and / or rows in the grid.
   */
  gridGap?: CSS.Property.GridGap;
  /**
   * Align grid items along the inline (row) axis. Applies to all items in the grid.
   */
  gridJustifyItems?: GridJustifyItems;
  /**
   * Sets the alignment of the grid within the grid container along the inline row axis.
   */
  gridJustifyContent?: GridJustifyContent;
  /**
   * Align grid items along the block (column) axis. Applies to all items in the grid.
   */
  gridAlignItems?: GridAlignItems;
  /**
   * Sets the alignment of the grid within the grid container along the block (column) axis.
   */
  gridAlignContent?: GridAlignContent;
  /**
   * If you have grid items that you don’t explicitly place on the grid, the auto-placement algorithm kicks in to automatically place the items.
   */
  gridAutoFlow?: GridAutoFlow;
}

/**
 * @children required
 */
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the span of a column on a grid item.
   */
  gridColumn?: CSS.Property.GridColumn;
  /**
   * Defines the span of a row on a grid item.
   */
  gridRow?: CSS.Property.GridRow;
  /**
   * Define which grid area a grid item belongs to.
   */
  gridArea?: CSS.Property.GridArea;
  /**
   * Aligns the grid item within the cell along the inline (row) axis. Applies to a grid item inside a single cell.
   */
  gridItemJustifySelf?: GridItemJustifySelf;
  /**
   * Aligns the grid item within the cell along the block (column) axis. Applies to a grid item inside a single cell.
   */
  gridItemAlignSelf?: GridItemAlignSelf;
}

export const Grid = styled.div<GridProps>`
  ${props =>
    css({
      display: props.gridDisplay || GridDisplay.grid,
      gridTemplateRows: props.gridTemplateRows,
      gridTemplateColumns: props.gridTemplateColumns,
      gridAreas: props.gridTemplateAreas,
      gridGap: props.gridGap,
      justifyItems: props.gridJustifyItems,
      justifyContent: props.gridJustifyContent,
      alignItems: props.gridAlignItems,
      alignContent: props.gridAlignContent,
      gridAutoFlow: props.gridAutoFlow,
    })}
`;

export const GridItem = styled.div<GridItemProps>`
  ${props =>
    css({
      gridColumn: props.gridColumn,
      gridRow: props.gridRow,
      gridArea: props.gridArea,
      justifySelf: props.gridItemJustifySelf,
      alignSelf: props.gridItemAlignSelf,
    })}
`;
