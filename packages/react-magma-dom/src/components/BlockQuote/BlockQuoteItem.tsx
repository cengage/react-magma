import * as React from 'react';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';
import { BlockQuoteProps } from '.';
import {
  TypographyVisualStyle,
  TypographyColor,
  TypographyContextVariant,
  TypographyComponent,
} from '../Typography';
import styled from '@emotion/styled';
/**
 * @children required
 */
export interface BlockQuoteItemProps
  extends BlockQuoteProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * The color of the component, helping to convey meaning or relative emphasis
   * @default TypographyColor.default
   */
  color?: TypographyColor;
  /**
   * Additional styles for typography based on the context of the content
   * @default TypographyContextVariant.default
   */
  contextVariant?: TypographyContextVariant;
  /**
   * If true, adds in an attribution line for the quote
   * @default false
   */
  hasAttribution?: boolean;
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Applies visual styles including font-size, font-weight, line-height and margins
   * @default TypographyVisualStyle.bodyMedium
   */
  visualStyle?: TypographyVisualStyle;
}

export const blockQuoteStyles = props => css`
  margin: 0;
  padding: 8px 0;
  blockquote {
    margin: 0;
  }
  //Inverse
  ${props.isInverse &&
  css`
    color: ${props.theme.colors.neutral100};
  `}
`;

const StyledBlockQuoteItem = styled(TypographyComponent)<any>`
  ${blockQuoteStyles}
`;

export const BlockQuoteItem = React.forwardRef<
  HTMLDivElement,
  BlockQuoteItemProps
>((props, ref) => {
  const { children, color, hasAttribution, testId, visualStyle, ...rest } =
    props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse();

  return (
    <StyledBlockQuoteItem
      as={hasAttribution ? 'figcaption' : 'blockquote'}
      color={
        hasAttribution
          ? color || TypographyColor.subdued
          : color || TypographyColor.default
      }
      theme={theme}
      hasAttribution={hasAttribution}
      isInverse={isInverse}
      ref={ref}
      data-testid={props.testId}
      visualStyle={
        hasAttribution
          ? visualStyle || TypographyVisualStyle.bodyMedium
          : visualStyle || TypographyVisualStyle.bodyLarge
      }
      {...rest}
    >
      {hasAttribution ? (
        <>
          &#x02015;&nbsp;
          {children}
        </>
      ) : (
        <>
          &ldquo;
          {children}
          &rdquo;
        </>
      )}
    </StyledBlockQuoteItem>
  );
});
