import React from 'react';
import PropTypes from 'prop-types';
import { convertTextToId } from '../../utils';
import styled from '@emotion/styled';
import { magma } from 'react-magma-dom';

const handleAnchorLinkClick = (id, handleClick, e) => {
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

  e.preventDefault();
  const targetID = id;
  const targetAnchor = document.getElementById(id);
  if (!targetAnchor) return;
  const originalTop = distanceToTop(targetAnchor);

  window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });

  const checkIfDone = setInterval(function () {
    const atBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = '-1';
      targetAnchor.focus();
      window.history.pushState('', '', '#' + targetID);
      clearInterval(checkIfDone);
    }
  }, 100);

  handleClick();
};

const SubMenuList = styled.ul`
  background: ${magma.colors.neutral200};
  list-style-type: none;
  margin: 0;
  padding: 0 0 ${magma.spaceScale.spacing03} 0;
`;

const SubMenuItem = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const SubMenuLink = styled.a`
  color: ${magma.colors.neutral700};
  display: block;
  font-size: ${magma.typeScale.size02.fontSize};
  letter-spacing: ${magma.typeScale.size02.letterSpacing};
  line-height: ${magma.typeScale.size02.lineHeight};
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing06}
    ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing09};
  text-decoration: none;

  &:hover,
  &:focus {
    background: ${magma.colors.neutral300};
    color: ${magma.colors.neutral700};
  }
`;

const SubMenuLink2 = styled.a`
  color: ${magma.colors.neutral700};
  display: block;
  font-size: ${magma.typeScale.size02.fontSize};
  letter-spacing: ${magma.typeScale.size02.letterSpacing};
  line-height: ${magma.typeScale.size02.lineHeight};
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing06}
    ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing09};
  text-decoration: none;

  &:hover,
  &:focus {
    background: ${magma.colors.neutral300};
    color: ${magma.colors.neutral700};
  }
`;

export const SubMenu = ({ headings, handleClick }) => {
  return (
    <SubMenuList>
      {headings.map((heading, index) => {
        const id = convertTextToId(heading.value);

        return (
          <SubMenuItem key={index}>
            <SubMenuLink
              href={`#${id}`}
              onClick={e => {
                handleAnchorLinkClick(id, handleClick, e);
              }}
            >
              {heading.value}
            </SubMenuLink>
          </SubMenuItem>
        );
      })}
    </SubMenuList>
  );
};

export const SubMenu2 = ({ headings, handleClick }) => {
  return (
    <SubMenuList>
      {headings.map((heading, index) => {
        const id = convertTextToId(heading.value);

        return (
          <SubMenuItem key={index}>
            <SubMenuLink2
              href={`#${id}`}
              onClick={e => {
                handleAnchorLinkClick(id, handleClick, e);
              }}
            >
              {heading.value}
            </SubMenuLink2>
          </SubMenuItem>
        );
      })}
    </SubMenuList>
  );
};

SubMenu.propTypes = {
  headings: PropTypes.array,
  handleClick: PropTypes.func,
};

SubMenu.propTypes = {
  headings: PropTypes.array,
  handleClick: PropTypes.func,
};
