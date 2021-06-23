import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';

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
  gridColumns?: string;
  /**
   * Set the rows in the grid.
   */
  gridRows?: string;
  /**
   * Set the areas in the grid.
   */
  gridAreas?: string;
  /**
   * Set the space between columns and / or rows in the grid.
   */
  gridGap?: string;
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
  /**
   * Defines the span of a column on a grid item.
   */
  gridColSpan?: string;
  /**
   * Defines the span of a row on a grid item.
   */
  gridRowSpan?: string;
  /**
   * Define which grid area a grid item belongs to.
   */
  gridArea?: string;
  /**
   * Aligns the grid item within the cell along the inline (row) axis. Applies to a grid item inside a single cell.
   */
  gridItemJustifySelf?: GridItemJustifySelf;
  /**
   * Aligns the grid item within the cell along the block (column) axis. Applies to a grid item inside a single cell.
   */
  gridItemAlignSelf?: GridItemAlignSelf;
  as?: string;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export const StyledGrid = styled.div<GridProps>`
  display: ${props => props.gridDisplay};
  grid-template-rows: ${props => props.gridRows};
  grid-template-columns: ${props => props.gridColumns};
  grid-areas: ${props => props.gridAreas};
  grid-gap: ${props => props.gridGap};
`;

export const GridItem = styled.div<GridProps>`
  grid-column: ${props => props.gridColSpan};
  grid-row: ${props => props.gridRowSpan};
  grid-area: ${props => props.gridArea};
`;

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (props, ref) => {
    const {
      as,
      children,
      testId,
      gridDisplay = GridDisplay.grid,
      gridRows,
      gridColumns,
      gridGap,
      gridAreas,
      gridAutoFlow,
      gridColSpan,
      gridRowSpan,
      gridArea,
      style,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);

    return (
      <StyledGrid
        theme={theme}
        as="div"
        ref={ref}
        data-testid={testId}
        gridDisplay={gridDisplay}
        gridRows={gridRows}
        gridColumns={gridColumns}
        gridGap={gridGap}
        gridAreas={gridAreas}
        gridAutoFlow={gridAutoFlow}
        gridColSpan={gridColSpan}
        gridRowSpan={gridRowSpan}
        gridArea={gridArea}
        {...rest}
      >
        {children}
      </StyledGrid>
    );
  }
);
