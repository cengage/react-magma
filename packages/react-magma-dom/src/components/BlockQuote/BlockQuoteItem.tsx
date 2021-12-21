import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';
import { BlockQuoteProps } from '.';

/**
 * @children required
 */
export enum fontStyles {
  expressive = 'expressive',
  narrative = 'narrative',
}

export interface BlockQuoteItemProps
  extends BlockQuoteProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * Allows different font family usage for the quote and attribution between "narrative" and "expressive" if configured
   */
  fontFamily?: fontStyles;
  /**
   * If true, adds in an attribution line for the quote
   * @default false
   */
  hasAttribution?: boolean;
  isInverse?: boolean;
  testId?: string;
}

export const blockQuoteStyles = props => css`
  font-size: ${props.theme.typeScale.size05.fontSize};
  margin: 0;
  padding: 8px 0;
  //Default
  color: ${props.theme.colors.neutral};
  //Expressive font
  ${props.fontFamily === 'expressive' &&
  css`
    font-family: ${props.theme.bodyExpressiveFont};
  `}
  //Narrative font
    ${props.fontFamily === 'narrative' &&
  css`
    font-family: ${props.theme.bodyNarrativeFont};
  `}
    //Attribution
    ${props.hasAttribution &&
  css`
    color: ${props.theme.colors.neutral03};
    font-size: ${props.theme.typeScale.size03.fontSize};
  `}
    //Inverse
  ${props.isInverse &&
  css`
    color: ${props.theme.colors.neutral08};
  `}
  //Inverse & Attribution
    ${props.isInverse &&
  props.hasAttribution &&
  css`
    color: ${props.theme.colors.neutral07};
  `}
`;

export const StyledBlockQuoteItem = styled.p<BlockQuoteItemProps>`
  ${blockQuoteStyles}
`;

export const BlockQuoteItem = React.forwardRef<
  HTMLDivElement,
  BlockQuoteItemProps
>((props, ref) => {
  const { children, fontFamily, hasAttribution, testId, ...rest } = props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse();

  return (
    <StyledBlockQuoteItem
      theme={theme}
      fontFamily={fontFamily}
      hasAttribution={hasAttribution}
      isInverse={isInverse}
      ref={ref}
      data-testid={props.testId}
      {...rest}
    >
      {hasAttribution ? (
        <>
          &#x02015;
          {children}
        </>
      ) : (
        <>
          &#x002DD;
          {children}
          &#x002DD;
        </>
      )}
    </StyledBlockQuoteItem>
  );
});
