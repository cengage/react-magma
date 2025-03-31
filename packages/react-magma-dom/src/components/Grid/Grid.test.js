import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '../../../axe-helper';

import { Grid, GridItem } from '.';

const TEXT = 'Test Text';

describe('Grid', () => {
  it('should render the grid component', () => {
    const { getByText } = render(<Grid>{TEXT}</Grid>);

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should render a grid container with the correct styles', () => {
    const { getByText } = render(<Grid>{TEXT}</Grid>);

    expect(getByText(TEXT)).toHaveStyleRule('display', 'grid');
  });

  it('should render a grid item with the correct styles', () => {
    const { getByText } = render(
      <Grid gridtemplateColumns="repeat(12, 1fr)">
        <GridItem gridColumn="1 / 6">{TEXT}</GridItem>
      </Grid>
    );

    expect(getByText(TEXT).parentElement).toHaveStyleRule('display', 'grid');
    expect(getByText(TEXT)).toHaveStyleRule('grid-column', '1/6');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Grid>{TEXT}</Grid>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
