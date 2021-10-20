import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface TypographyProps<T = HTMLParagraphElement>
  extends React.HTMLAttributes<T> {
  as?: string;
  children?: any;
  color?: TypographyColor;
  contextVariant?: TypographyContextVariant;
  element?: string;
  isInverse?: boolean;
  noMargins?: boolean;
  ref?: any;
  testId?: string;
  visualStyle?: TypographyVisualStyle;
}

export enum TypographyColor {
  danger = 'danger',
  default = 'default', // default
  success = 'success',
  subdued = 'subdued',
}

export enum TypographyContextVariant {
  default = 'default', // default
  expressive = 'expressive',
  narrative = 'narrative',
}

export enum TypographyVisualStyle {
  headingXLarge = 'headingXLarge',
  headingLarge = 'headingLarge',
  headingMedium = 'headingMedium',
  headingSmall = 'headingSmall',
  headingXSmall = 'headingXSmall',
  heading2XSmall = 'heading2XSmall',
  bodyLarge = 'bodyLarge',
  bodyMedium = 'bodyMedium',
  bodySmall = 'bodySmall',
  bodyXSmall = 'bodyXSmall',
}

export function getBodyFontFamily(props) {
  switch (props.contextVariant) {
    case TypographyContextVariant.expressive:
      return 'var(--bodyExpressiveFont)';
    case TypographyContextVariant.narrative:
      return 'var(--bodyNarrativeFont)';
    default:
      return 'var(--bodyFont)';
  }
}

export const colorStyles = props => css`
  color: ${props.isInverse
    ? 'var(--colors-neutral08)'
    : props.contextVariant === 'expressive'
    ? 'var(--colors-foundation02)'
    : 'var(--colors-neutral)'};

  ${props.color === TypographyColor.danger &&
  !props.isInverse &&
  css`
    color: var(--colors-danger);
  `}

  ${props.color === TypographyColor.success &&
  !props.isInverse &&
  css`
    color: var(--colors-success);
  `}

${props.color === TypographyColor.subdued &&
  !props.isInverse &&
  css`
    color: var(--colors-neutral03);
  `}

  ${props.color === TypographyColor.danger &&
  props.isInverse &&
  css`
    color: var(--colors-dangerInverse);
  `}

  ${props.color === TypographyColor.success &&
  props.isInverse &&
  css`
    color: var(--colors-successInverse);
  `}

${props.color === TypographyColor.subdued &&
  props.isInverse &&
  css`
    color: var(--colors-focusInverse);
  `}
`;

const baseParagraphStyles = props => css`
  ${colorStyles(props)}
  font-family: ${getBodyFontFamily(props)};
  font-weight: normal;
`;

export const paragraphLargeStyles = props => css`
  ${baseParagraphStyles(props)}

  margin: ${props.noMargins ? '0' : 'var(--spaceScale-spacing06) 0'};

  font-size: var(--typographyVisualStyles-bodyLarge-mobile-fontSize);
  line-height: var(--typographyVisualStyles-bodyLarge-mobile-lineHeight);

  @media  {
    font-size: var(--typographyVisualStyles-bodyLarge-desktop-fontSize);
    line-height: var(--typographyVisualStyles-bodyLarge-desktop-lineHeight);
  }

  ${props.contextVariant === TypographyContextVariant.expressive &&
  css`
    font-size: var(
      --typographyExpressiveVisualStyles-bodyLarge-mobile-fontSize
    );
    line-height: var(
      --typographyExpressiveVisualStyles-bodyLarge-mobile-lineHeight
    );

    @media  {
      font-size: var(
        --typographyExpressiveVisualStyles-bodyLarge-desktop-fontSize
      );
      line-height: var(
        --typographyExpressiveVisualStyles-bodyLarge-desktop-lineHeight
      );
    }
  `};
`;

export const paragraphMediumStyles = props => css`
  ${baseParagraphStyles(props)}

  font-size: var(--typographyVisualStyles-bodyMedium-mobile-fontSize);
  line-height: var(--typographyVisualStyles-bodyMedium-mobile-lineHeight);
  margin: ${props.noMargins ? '0' : 'var(--spaceScale-spacing06) 0'};

  @media (min-width: 600px) ) {
    font-size: var(--typographyVisualStyles-bodyMedium-desktop-fontSize);
    line-height: var(--typographyVisualStyles-bodyMedium-desktop-lineHeight);
  }
`;

export const paragraphSmallStyles = props => css`
  ${baseParagraphStyles(props)}

  font-size: var(--typographyVisualStyles-bodySmall-mobile-fontSize);
  line-height: var(--typographyVisualStyles-bodySmall-mobile-lineHeight);
  margin: ${props.noMargins ? '0' : `var(--spaceScale-spacing05) 0`};

  @media (min-width: 600px) {
    font-size: var(--typographyVisualStyles-bodySmall-desktop-fontSize);
    line-height: var(--typographyVisualStyles-bodySmall-desktop-lineHeight);
  }
`;

export const paragraphXSmallStyles = props => css`
  ${baseParagraphStyles(props)}

  font-size: var(--typographyVisualStyles-bodyXSmall-mobile-fontSize);
  line-height: var(--typographyVisualStyles-bodyXSmall-mobile-lineHeight);
  margin: ${props.noMargins ? '0' : `var(--spaceScale-spacing03) 0`};

  @media (min-width: 600px) {
    font-size: var(--typographyVisualStyles-bodyXSmall-desktop-fontSize);
    line-height: var(--typographyVisualStyles-bodyXSmall-desktop-lineHeight);
  }
`;

function getHeadingFontFamily(props) {
  switch (props.contextVariant) {
    case TypographyContextVariant.expressive:
      return 'var(--headingExpressiveFont)';
    case TypographyContextVariant.narrative:
      return 'var(--headingNarrativeFont)';
    default:
      return 'var(--headingFont)';
  }
}

const baseHeadingStyles = props => css`
  border-bottom: 2px solid transparent;
  font-family: ${getHeadingFontFamily(props)};
  padding: 0;

  &:focus {
    border-bottom: 2px dotted
      ${props.isInverse ? 'var(--colors-focusInverse)' : 'var(--colors-focus)'};
    outline: 0;
    transition: border 0.1s linear;
  }

  ${colorStyles(props)}
`;

export const headingXLargeStyles = props => css`
  ${baseHeadingStyles(props)}

  font-size: var(--typographyVisualStyles-headingXLarge-mobile-fontSize);
  font-weight: var(--typographyVisualStyles-headingXLarge-fontWeight);
  line-height: var(--typographyVisualStyles-headingXLarge-mobile-lineHeight);
  margin: ${props.noMargins ? 0 : '0 0 var(--spaceScale-spacing05)'};

  @media (min-width: 600px) {
    font-size: var(--typographyVisualStyles-headingXLarge-desktop-fontSize};
    line-height: var(--typographyVisualStyles-headingXLarge-desktop-lineHeight};
  }

  ${
    props.contextVariant === 'expressive' &&
    css`
      font-size: var(
        --typographyExpressiveVisualStyles-headingXLarge-mobile-fontSize
      );
      font-weight: var(
        --typographyExpressiveVisualStyles-headingXLarge-fontWeight
      );
      line-height: var(
        --typographyExpressiveVisualStyles-headingXLarge-mobile-lineHeight
      );

      @media (min-width: 600px) {
        font-size: var(
          --typographyExpressiveVisualStyles-headingXLarge-desktop-fontSize
        );
        line-height: var(
          --typographyExpressiveVisualStyles-headingXLarge-desktop-lineHeight
        );
      }
    `
  };

  ${
    props.contextVariant === 'narrative' &&
    css`
      font-size: var(
        --typographyNarrativeVisualStyles-headingXLarge-mobile-fontSize
      );
      font-weight: var(
        --typographyNarrativeVisualStyles-headingXLarge-fontWeight
      );
      line-height: var(
        --typographyNarrativeVisualStyles-headingXLarge-mobile-lineHeight
      );
      @media (min-width: 600px) {
        font-size: var(
          --typographyNarrativeVisualStyles-headingXLarge-desktop-fontSize
        );
        line-height: var(
          --typographyNarrativeVisualStyles-headingXLarge-desktop-lineHeight
        );
      }
    `
  };
`;

export const headingLargeStyles = props => css`
  ${baseHeadingStyles(props)}

  font-size: var(--typographyVisualStyles-headingLarge-mobile-fontSize);
  font-weight: var(--typographyVisualStyles-headingLarge-fontWeight);
  line-height: var(--typographyVisualStyles-headingLarge-mobile-lineHeight);
  margin: ${props.noMargins
    ? 0
    : 'var(--spaceScale-spacing10) 0 var(--spaceScale-spacing05)'};

  @media (min-width: 600px) {
    font-size: var(--typographyVisualStyles-headingLarge-desktop-fontSize);
    line-height: var(--typographyVisualStyles-headingLarge-desktop-lineHeight);
  }

  ${props.contextVariant === 'expressive' &&
  css`
    font-size: var(
      --typographyExpressiveVisualStyles-headingLarge-mobile-fontSize
    );
    font-weight: var(
      --typographyExpressiveVisualStyles-headingLarge-fontWeight
    );
    line-height: var(
      --typographyExpressiveVisualStyles-headingLarge-mobile-lineHeight
    );

    @media (min-width: 600px) {
      font-size: var(
        --typographyExpressiveVisualStyles-headingLarge-desktop-fontSize
      );
      line-height: var(
        --typographyExpressiveVisualStyles-headingLarge-desktop-lineHeight
      );
    }
  `};

  ${props.contextVariant === 'narrative' &&
  css`
    font-size: var(
      --typographyNarrativeVisualStyles-headingLarge-mobile-fontSize
    );
    font-weight: var(--typographyNarrativeVisualStyles-headingLarge-fontWeight);
    line-height: var(
      --typographyNarrativeVisualStyles-headingLarge-mobile-lineHeight
    );
    @media (min-width: 600px) {
      font-size: var(
        --typographyNarrativeVisualStyles-headingLarge-desktop-fontSize
      );
      line-height: var(
        --typographyNarrativeVisualStyles-headingLarge-desktop-lineHeight
      );
    }
  `};
`;

export const headingMediumStyles = props => css`
  ${baseHeadingStyles(props)};

  font-size: var(--typographyVisualStyles-headingMedium-mobile-fontSize);
  font-weight: var(--typographyVisualStyles-headingMedium-fontWeight);
  line-height: var(--typographyVisualStyles-headingMedium-mobile-lineHeight);
  margin: ${props.noMargins
    ? 0
    : 'var(--spaceScale-spacing09) 0 var(--spaceScale-spacing05)'};

  @media (min-width: 600px) {
    font-size: var(--typographyVisualStyles-headingMedium-desktop-fontSize);
    line-height: var(--typographyVisualStyles-headingMedium-desktop-lineHeight);
  }

  ${props.contextVariant === 'expressive' &&
  css`
    font-size: var(
      --typographyExpressiveVisualStyles-headingMedium-mobile-fontSize
    );
    font-weight: var(
      --typographyExpressiveVisualStyles-headingMedium-fontWeight
    );
    line-height: var(
      --typographyExpressiveVisualStyles-headingMedium-mobile-lineHeight
    );

    @media (min-width: 600px) {
      font-size: var(
        --typographyExpressiveVisualStyles-headingMedium-desktop-fontSize
      );
      line-height: var(
        --typographyExpressiveVisualStyles-headingMedium-desktop-lineHeight
      );
    }
  `};

  ${props.contextVariant === 'narrative' &&
  css`
    font-size: var(
      --typographyNarrativeVisualStyles-headingMedium-mobile-fontSize
    );
    font-weight: var(
      --typographyNarrativeVisualStyles-headingMedium-fontWeight
    );
    line-height: var(
      --typographyNarrativeVisualStyles-headingMedium-mobile-lineHeight
    );
    @media (min-width: 600px) {
      font-size: var(
        --typographyNarrativeVisualStyles-headingMedium-desktop-fontSize
      );
      line-height: var(
        --typographyNarrativeVisualStyles-headingMedium-desktop-lineHeight
      );
    }
  `};
`;

export const headingSmallStyles = props => css`
  ${baseHeadingStyles(props)}

  font-size: var(--typographyVisualStyles-headingSmall-mobile-fontSize);
  font-weight: var(--typographyVisualStyles-headingSmall-fontWeight);
  line-height: var(--typographyVisualStyles-headingSmall-mobile-lineHeight);
  margin: ${props.noMargins
    ? 0
    : 'var(--spaceScale-spacing08) 0 var(--spaceScale-spacing05)'};

  @media (min-width: 600px) {
    font-size: var(--typographyVisualStyles-headingSmall-desktop-fontSize);
    line-height: var(--typographyVisualStyles-headingSmall-desktop-lineHeight);
  }
  ${props.contextVariant === 'expressive' &&
  css`
    font-size: var(
      --typographyExpressiveVisualStyles-headingSmall-mobile-fontSize
    );
    font-weight: var(
      --typographyExpressiveVisualStyles-headingSmall-fontWeight
    );
    line-height: var(
      --typographyExpressiveVisualStyles-headingSmall-mobile-lineHeight
    );

    @media (min-width: 600px) {
      font-size: var(
        --typographyExpressiveVisualStyles-headingSmall-desktop-fontSize
      );
      line-height: var(
        --typographyExpressiveVisualStyles-headingSmall-desktop-lineHeight
      );
    }
  `};

  ${props.contextVariant === 'narrative' &&
  css`
    font-size: var(
      --typographyNarrativeVisualStyles-headingSmall-mobile-fontSize
    );
    font-weight: var(--typographyNarrativeVisualStyles-headingSmall-fontWeight);
    line-height: var(
      --typographyNarrativeVisualStyles-headingSmall-mobile-lineHeight
    );
    @media (min-width: 600px) {
      font-size: var(
        --typographyNarrativeVisualStyles-headingSmall-desktop-fontSize
      );
      line-height: var(
        --typographyNarrativeVisualStyles-headingSmall-desktop-lineHeight
      );
    }
  `};
`;

export const headingXSmallStyles = props => css`
  ${baseHeadingStyles(props)}

  font-size: var(--typographyVisualStyles-headingXSmall-mobile-fontSize);
  font-weight: var(--typographyVisualStyles-headingXSmall-fontWeight);
  line-height: var(--typographyVisualStyles-headingXSmall-mobile-lineHeight);
  margin: ${props.noMargins
    ? 0
    : 'var(--spaceScale-spacing06} 0 var(--spaceScale-spacing05)'};

  @media (min-width: 600px) {
    font-size: var(--typographyVisualStyles-headingXSmall-desktop-fontSize);
    line-height: var(--typographyVisualStyles-headingXSmall-desktop-lineHeight);
  }

  ${props.contextVariant === 'expressive' &&
  css`
    font-size: var(
      --typographyExpressiveVisualStyles-headingXSmall-mobile-fontSize
    );
    font-weight: var(
      --typographyExpressiveVisualStyles-headingXSmall-fontWeight
    );
    line-height: var(
      --typographyExpressiveVisualStyles-headingXSmall-mobile-lineHeight
    );

    @media (min-width: 600px) {
      font-size: var(
        --typographyExpressiveVisualStyles-headingXSmall-desktop-fontSize
      );
      line-height: var(
        --typographyExpressiveVisualStyles-headingXSmall-desktop-lineHeight
      );
    }
  `};

  ${props.contextVariant === 'narrative' &&
  css`
    font-size: var(
      --typographyNarrativeVisualStyles-headingXSmall-mobile-fontSize
    );
    font-weight: var(
      --typographyNarrativeVisualStyles-headingXSmall-fontWeight
    );
    line-height: var(
      --typographyNarrativeVisualStyles-headingXSmall-mobile-lineHeight
    );
    @media (min-width: 600px) {
      font-size: var(
        --typographyNarrativeVisualStyles-headingXSmall-desktop-fontSize
      );
      line-height: var(
        --typographyNarrativeVisualStyles-headingXSmall-desktop-lineHeight
      );
    }
  `};
`;

export const heading2XSmallStyles = props => css`
  ${baseHeadingStyles(props)}

  font-size: var(--typographyVisualStyles-heading2XSmall-mobile-fontSize);
  font-weight: var(--typographyVisualStyles-heading2XSmall-fontWeight);
  line-height: var(--typographyVisualStyles-heading2XSmall-mobile-lineHeight);
  text-transform: uppercase;
  margin: ${props.noMargins
    ? 0
    : 'var(--spaceScale-spacing06) 0 var(--spaceScale-spacing03)'};

  @media (min-width: 600px) {
    font-size: var(--typographyVisualStyles-heading2XSmall-desktop-fontSize);
    line-height: var(
      --typographyVisualStyles-heading2XSmall-desktop-lineHeight
    );
  }

  ${props.contextVariant === 'expressive' &&
  css`
    font-size: var(
      --typographyExpressiveVisualStyles-heading2XSmall-mobile-fontSize
    );
    font-weight: var(
      --typographyExpressiveVisualStyles-heading2XSmall-fontWeight
    );
    line-height: var(
      --typographyExpressiveVisualStyles-heading2XSmall-mobile-lineHeight
    );
    text-transform: none;

    @media (min-width: 600px) {
      font-size: var(
        --typographyExpressiveVisualStyles-heading2XSmall-desktop-fontSize
      );
      line-height: var(
        --typographyExpressiveVisualStyles-heading2XSmall-desktop-lineHeight
      );
    }
  `};

  ${props.contextVariant === 'narrative' &&
  css`
    font-size: var(
      --typographyNarrativeVisualStyles-heading2XSmall-mobile-fontSize
    );
    font-weight: var(
      --typographyNarrativeVisualStyles-heading2XSmall-fontWeight
    );
    line-height: var(
      --typographyNarrativeVisualStyles-heading2XSmall-mobile-lineHeight
    );
    @media (min-width: 600px) {
      font-size: var(
        --typographyNarrativeVisualStyles-heading2XSmall-desktop-fontSize
      );
      line-height: var(
        --typographyNarrativeVisualStyles-heading2XSmall-desktop-lineHeight
      );
    }
  `};
`;

function getTypographyStyles(props) {
  switch (props.visualStyle) {
    case TypographyVisualStyle.headingXLarge:
      return headingXLargeStyles(props);
    case TypographyVisualStyle.headingLarge:
      return headingLargeStyles(props);
    case TypographyVisualStyle.headingMedium:
      return headingMediumStyles(props);
    case TypographyVisualStyle.headingSmall:
      return headingSmallStyles(props);
    case TypographyVisualStyle.headingXSmall:
      return headingXSmallStyles(props);
    case TypographyVisualStyle.heading2XSmall:
      return heading2XSmallStyles(props);
    case TypographyVisualStyle.bodyLarge:
      return paragraphLargeStyles(props);
    case TypographyVisualStyle.bodyMedium:
      return paragraphMediumStyles(props);
    case TypographyVisualStyle.bodySmall:
      return paragraphSmallStyles(props);
    case TypographyVisualStyle.bodyXSmall:
      return paragraphXSmallStyles(props);
    default:
      return headingLargeStyles(props);
  }
}

export const TypographyComponent = styled.p<TypographyProps>`
  ${props => getTypographyStyles(props)}
`;
