import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ThemeContext } from 'react-magma-dom';

const List = styled.ol`
    display: none;

    @media (min-width: ${props => props.theme.sizeSm}) {
        background-color: ${props => props.theme.colors.neutral01};
        display: flex;
        left: 0;
        list-style: none;
        justify-content: space-around;
        margin: 0;
        padding: 0 0 0 10px;
        position: fixed;
        right: 0;
        top: 80px;
        z-index: 2;
    }

    @media (min-width: ${props => props.theme.sizeMd}) {
        left: 280px;
    }
`;

const Item = styled.li`
    list-style: none;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
`;

const Link = styled.a`
   border-bottom: 2px solid;
   border-color: ${props => props.active? props.theme.colors.pop04 : 'transparent'};
   color: ${props => props.active? props.theme.colors.pop04 : props.theme.colors.neutral08};
   display: block;
   font-size: 13px;
   line-height: 1.3em;
   padding: 9px 15px 7px;
   text-decoration: none;

   &:hover,
   &:focus {
    color: ${props => props.theme.colors.neutral06};
    outline-offset: 0;
   }
`;

const Num = styled.span`
   display: block;
   font-family: 'Abel', sans-serif;
`;

const IntroNav = ({activeSection}) => (
    <ThemeContext.Consumer>
        {theme => (
            <nav>
                <List theme={theme}>
                    <Item>
                        <Link active={activeSection === 'sectionIntro'} href="#sectionIntro" theme={theme}>
                            <Num>00</Num>Intro
                        </Link>
                    </Item>
                    <Item>
                        <Link active={activeSection === 'sectionComponents'} href="#sectionComponents" theme={theme}>
                            <Num>01</Num>Component-based
                        </Link>
                    </Item>
                    <Item>
                        <Link active={activeSection === 'sectionQuality'} href="#sectionQuality" theme={theme}>
                            <Num>02</Num>Quality
                        </Link>
                    </Item>
                    <Item>
                        <Link active={activeSection === 'sectionAccessible'} href="#sectionAccessible" theme={theme}>
                            <Num>03</Num>Accessible
                        </Link>
                    </Item>
                    <Item>
                        <Link active={activeSection === 'sectionDevice'} href="#sectionDevice" theme={theme}>
                            <Num>04</Num>Device-agnostic
                        </Link>
                    </Item>
                    <Item>
                        <Link active={activeSection === 'sectionEvolving'} href="#sectionEvolving" theme={theme}>
                            <Num>05</Num>Always evolving
                        </Link>
                    </Item>
                </List>
            </nav>
        )}
    </ThemeContext.Consumer>
);

IntroNav.propTypes = {
    activeSection: PropTypes.string
}

export default IntroNav

