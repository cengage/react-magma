import styled from '@emotion/styled';
import React from 'react';
import { PopoverContext } from './Popover';
import { ThemeContext } from '../../theme/ThemeContext';
import { css } from '@emotion/react';

enum SectionEnum {
  header = 'header',
  footer = 'footer',
}

interface PopoverSectionTemplateProps {
  children: React.ReactChild | React.ReactChild[];
  section: SectionEnum;
  style?: React.CSSProperties;
}

export interface PopoverSectionProps {
  /**
   * @children required
   */
  children: React.ReactChild | React.ReactChild[];
  /**
   * @internal
   */
  style?: React.CSSProperties;
}

export const StyledSection = styled.section`
  position: relative;
  padding: 16px;
`;

const SectionContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const SectionLine = styled.div<{ isInverse?: boolean; section: SectionEnum }>`
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: ${props =>
    props.isInverse
      ? props.theme.colors.primary400
      : props.theme.colors.neutral300};
  left: 0;

  ${props =>
    props.section === SectionEnum.header
      ? css`
          bottom: 0;
        `
      : css`
          top: 0;
        `}
`;

const PopoverSection = React.forwardRef<
  HTMLDivElement,
  PopoverSectionTemplateProps
>((props, forwardedRef) => {
  const context = React.useContext(PopoverContext);
  const theme = React.useContext(ThemeContext);
  const { children, section, style } = props;

  const styledChildren = React.Children.toArray(children).map(item =>
    React.cloneElement(item as React.ReactElement, {
      theme,
      isInverse: context.isInverse,
    })
  );

  return (
    <StyledSection as={section} ref={forwardedRef}>
      <SectionContent style={style}>{styledChildren}</SectionContent>
      <SectionLine
        isInverse={context.isInverse}
        section={section}
        theme={theme}
      />
    </StyledSection>
  );
});

export const PopoverHeader = ({ children, style }: PopoverSectionProps) => (
  <PopoverSection section={SectionEnum.header} style={style}>
    {children}
  </PopoverSection>
);

export const PopoverFooter = ({ children, style }: PopoverSectionProps) => (
  <PopoverSection section={SectionEnum.footer} style={style}>
    {children}
  </PopoverSection>
);
