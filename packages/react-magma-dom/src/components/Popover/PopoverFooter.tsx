import styled from '@emotion/styled';
import React from 'react';
import { PopoverContext } from './Popover';
import { ThemeContext } from '../../theme/ThemeContext';

interface PopoverFooterProps {
  children: React.ReactChild | React.ReactChild[];
  style?: React.CSSProperties;
}

export const StyledFooter = styled.footer`
  position: relative;
  padding: 16px;
`;

const FooterContent = styled.div<PopoverFooterProps>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const FooterLine = styled.div<{ isInverse?: boolean }>`
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: ${props =>
    props.isInverse
      ? props.theme.colors.primary400
      : props.theme.colors.neutral300};
  left: 0;
  top: 0;
`;

export const PopoverFooter = React.forwardRef<
  HTMLDivElement,
  PopoverFooterProps
>((props, forwardedRef) => {
  const context = React.useContext(PopoverContext);
  const theme = React.useContext(ThemeContext);
  const { children, style } = props;

  const styledChildren = React.Children.toArray(children).map(item =>
    React.cloneElement(item as React.ReactElement, {
      theme,
      isInverse: context.isInverse,
    })
  );

  return (
    <StyledFooter ref={forwardedRef}>
      <FooterContent style={style}>{styledChildren}</FooterContent>
      <FooterLine isInverse={context.isInverse} theme={theme} />
    </StyledFooter>
  );
});
