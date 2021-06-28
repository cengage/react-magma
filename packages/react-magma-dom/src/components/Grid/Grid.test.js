import React from 'react';
import { axe } from 'jest-axe';
import { Grid, GridItem } from '.';
import { render } from '@testing-library/react';
import { I18nContext, defaultI18n } from '../../i18n';

const TEXT = 'Test Text';

describe('Grid', () => {
  it('should render the visually hidden component', () => {
    const { getByText } = render(<Grid>{TEXT}</Grid>);

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should render a grid container with the correct styles', () => {
    const { getByText } = render(<Grid>{TEXT}</Grid>);

    expect(getByText(TEXT)).toHaveStyleRule('display', 'grid');
  });

  it('should render a grid item with the correct styles', () => {
    const { getByText } = render(
      <Grid gridColumns="repeat(12, 1fr)">
        <GridItem gridColSpan="1 / 6">{TEXT}</GridItem>
      </Grid>
    );

    expect(getByText(TEXT).parentElement).toHaveStyleRule('display', 'grid');
    expect(getByText(TEXT)).toHaveStyleRule('grid-column', '1 / 6');
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Grid testId={testId}>{TEXT}</Grid>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Grid>{TEXT}</Grid>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
