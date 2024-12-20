import styled from '@emotion/styled';
import React from 'react';
import { PopoverContext } from './Popover';
import { ThemeContext } from '../../theme/ThemeContext';

interface PopoverHeaderProps {
  children: React.ReactChild | React.ReactChild[];
  style?: React.CSSProperties;
}

export const StyledHeader = styled.header`
  position: relative;
  padding: 16px;
`;

const HeaderContent = styled.div<PopoverHeaderProps>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const HeaderLine = styled.div<{ isInverse?: boolean }>`
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: ${props =>
    props.isInverse
      ? props.theme.colors.primary400
      : props.theme.colors.neutral300};
  left: 0;
  bottom: 0;
`;

export const PopoverHeader = React.forwardRef<
  HTMLDivElement,
  PopoverHeaderProps
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
    <StyledHeader ref={forwardedRef}>
      <HeaderContent style={style}>{styledChildren}</HeaderContent>
      <HeaderLine isInverse={context.isInverse} theme={theme} />
    </StyledHeader>
  );
});
