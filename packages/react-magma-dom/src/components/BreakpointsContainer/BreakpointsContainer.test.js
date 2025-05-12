import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { BreakpointsContainer, Breakpoint } from '.';

const XS_TEXT = 'xsmall text';
const SMALL_TEXT = 'small text';
const MEDIUM_TEXT = 'medium text';
const LARGE_TEXT = 'LARGE TEXT';
const XL_TEXT = 'XL TEXT';

const XS_ID = 'xsid';
const SMALL_ID = 'smallid';
const MEDIUM_ID = 'mediumid';
const LARGE_ID = 'LARGEID';
const XL_ID = 'XLID';

describe('Breakpoints Container', () => {
  it('should render the BreakpointsContainer component', () => {
    const { container, getByText, getByTestId } = render(
      <BreakpointsContainer implementation="css">
        <Breakpoint screenSize="xs" testId={XS_ID}>
          {XS_TEXT}
        </Breakpoint>
        <Breakpoint screenSize="small" testId={SMALL_ID}>
          {SMALL_TEXT}
        </Breakpoint>
        <Breakpoint screenSize="medium" testId={MEDIUM_ID}>
          {MEDIUM_TEXT}
        </Breakpoint>
        <Breakpoint screenSize="large" testId={LARGE_ID}>
          {LARGE_TEXT}
        </Breakpoint>
        <Breakpoint screenSize="xl" testId={XL_ID}>
          {XL_TEXT}
        </Breakpoint>
      </BreakpointsContainer>
    );

    expect(container).toBeInTheDocument();
    expect(getByText(XS_TEXT)).toBeInTheDocument();
    expect(getByText(SMALL_TEXT)).toBeInTheDocument();
    expect(getByText(MEDIUM_TEXT)).toBeInTheDocument();
    expect(getByText(LARGE_TEXT)).toBeInTheDocument();

    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.xs - 1}px`,
    });
    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.small}px`,
    });

    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.small - 1}px`,
    });
    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.medium}px`,
    });

    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.medium - 1}px`,
    });
    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.large}px`,
    });

    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.large - 1}px`,
    });
    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.xl}px`,
    });

    expect(getByTestId(XL_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XL_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.xl - 1}px`,
    });
  });

  it('should render the BreakpointsContainer with custom breakpoints', () => {
    const customBreakpoints = {
      xs: 0,
      small: 10,
      medium: 20,
      large: 30,
      xl: 40,
    };

    const { getByTestId } = render(
      <BreakpointsContainer
        breakpoints={customBreakpoints}
        implementation="css"
      >
        <Breakpoint screenSize="xs" testId={XS_ID}>
          {XS_TEXT}
        </Breakpoint>
        <Breakpoint screenSize="small" testId={SMALL_ID}>
          {SMALL_TEXT}
        </Breakpoint>
        <Breakpoint screenSize="medium" testId={MEDIUM_ID}>
          {MEDIUM_TEXT}
        </Breakpoint>
        <Breakpoint screenSize="large" testId={LARGE_ID}>
          {LARGE_TEXT}
        </Breakpoint>
        <Breakpoint screenSize="xl" testId={XL_ID}>
          {XL_TEXT}
        </Breakpoint>
      </BreakpointsContainer>
    );

    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'none', {
      media: 'min-width: 10px',
    });

    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'none', {
      media: 'max-width: 9px',
    });
    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'none', {
      media: 'min-width: 20px',
    });

    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'none', {
      media: 'max-width: 19px',
    });
    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'none', {
      media: 'min-width: 30px',
    });

    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'none', {
      media: 'max-width: 29px',
    });
    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'none', {
      media: 'min-width: 40px',
    });

    expect(getByTestId(XL_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XL_ID)).toHaveStyleRule('display', 'none', {
      media: 'max-width: 39px',
    });
  });

  it('should render the BreakpointsContainer component with just three breakpoints (no small and medium)', () => {
    const { container, getByTestId } = render(
      <BreakpointsContainer implementation="css">
        <Breakpoint screenSize="xs" testId={XS_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="large" testId={LARGE_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="xl" testId={XL_ID}>
          text
        </Breakpoint>
      </BreakpointsContainer>
    );

    expect(container).toBeInTheDocument();

    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.large}px`,
    });

    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.large - 1}px`,
    });
    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.xl}px`,
    });

    expect(getByTestId(XL_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XL_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.xl - 1}px`,
    });
  });

  it('should render the BreakpointsContainer component with just three breakpoints (no small and large)', () => {
    const { container, getByTestId } = render(
      <BreakpointsContainer implementation="css">
        <Breakpoint screenSize="xs" testId={XS_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="medium" testId={MEDIUM_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="xl" testId={XL_ID}>
          text
        </Breakpoint>
      </BreakpointsContainer>
    );

    expect(container).toBeInTheDocument();

    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.medium - 1}px`,
    });
    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.xl}px`,
    });

    expect(getByTestId(XL_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XL_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.xl - 1}px`,
    });
  });

  it('should render the BreakpointsContainer component with just three breakpoints (no small and xl)', () => {
    const { container, getByTestId } = render(
      <BreakpointsContainer implementation="css">
        <Breakpoint screenSize="xs" testId={XS_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="medium" testId={MEDIUM_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="large" testId={LARGE_ID}>
          text
        </Breakpoint>
      </BreakpointsContainer>
    );

    expect(container).toBeInTheDocument();

    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.medium}px`,
    });

    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.medium - 1}px`,
    });
    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.large}px`,
    });

    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.large - 1}px`,
    });
  });

  it('should render the BreakpointsContainer component with just three breakpoints (no medium and large)', () => {
    const { getByTestId } = render(
      <BreakpointsContainer implementation="css">
        <Breakpoint screenSize="xs" testId={XS_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="small" testId={SMALL_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="xl" testId={XL_ID}>
          text
        </Breakpoint>
      </BreakpointsContainer>
    );

    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.small}px`,
    });

    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.small - 1}px`,
    });
    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.xl}px`,
    });

    expect(getByTestId(XL_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XL_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.xl - 1}px`,
    });
  });

  it('should render the BreakpointsContainer component with just three breakpoints (no medium and xl)', () => {
    const { getByTestId } = render(
      <BreakpointsContainer implementation="css">
        <Breakpoint screenSize="xs" testId={XS_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="small" testId={SMALL_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="large" testId={LARGE_ID}>
          text
        </Breakpoint>
      </BreakpointsContainer>
    );

    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.small - 1}px`,
    });
    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.large}px`,
    });

    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(LARGE_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.large - 1}px`,
    });
  });

  it('should render the BreakpointsContainer component with just three breakpoints (no large and xl)', () => {
    const { getByTestId } = render(
      <BreakpointsContainer implementation="css">
        <Breakpoint screenSize="xs" testId={XS_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="small" testId={SMALL_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="medium" testId={MEDIUM_ID}>
          text
        </Breakpoint>
      </BreakpointsContainer>
    );

    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.small}px`,
    });

    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.small - 1}px`,
    });
    expect(getByTestId(SMALL_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.medium}px`,
    });

    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(MEDIUM_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.medium - 1}px`,
    });
  });

  it('should render the BreakpointsContainer component with just two breakpoints (xs and xl)', () => {
    const { container, getByTestId } = render(
      <BreakpointsContainer implementation="css">
        <Breakpoint screenSize="xs" testId={XS_ID}>
          text
        </Breakpoint>
        <Breakpoint screenSize="xl" testId={XL_ID}>
          text
        </Breakpoint>
      </BreakpointsContainer>
    );

    expect(container).toBeInTheDocument();

    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XS_ID)).toHaveStyleRule('display', 'none', {
      media: `min-width: ${magma.breakpoints.xl}px`,
    });

    expect(getByTestId(XL_ID)).toHaveStyleRule('display', 'block');
    expect(getByTestId(XL_ID)).toHaveStyleRule('display', 'none', {
      media: `max-width: ${magma.breakpoints.xl - 1}px`,
    });
  });
  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <BreakpointsContainer>
        <Breakpoint>hello</Breakpoint>
      </BreakpointsContainer>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
