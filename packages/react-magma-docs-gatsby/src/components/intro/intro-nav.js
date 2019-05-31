import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';

const List = styled.ol`
    display: none;

    @media (min-width: 768px) {
        background-color: #00263E;
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

    @media (min-width: 1024px) {
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
   border-color: ${props => props.active? '#FFC72C' : 'transparent'};
   color: ${props => props.active? '#FFC72C' : '#fff'};
   display: block;
   font-size: 13px;
   line-height: 1.3em;
   padding: 9px 15px 7px;
   text-decoration: none;

   &:hover,
   &:focus {
    color: #DFDFDF;
    outline-offset: 0;
   }
`;

const Num = styled.span`
   display: block;
   font-family: 'Abel', sans-serif;
`;

const IntroNav = ({activeSection}) => (
    <nav>
        <List>
            <Item>
                <Link active={activeSection === 'sectionIntro'} href="#sectionIntro">
                    <Num>00</Num>Intro
                </Link>
            </Item>
            <Item>
                <Link active={activeSection === 'sectionComponents'} href="#sectionComponents">
                    <Num>01</Num>Component-based
                </Link>
            </Item>
            <Item>
                <Link active={activeSection === 'sectionQuality'} href="#sectionQuality">
                    <Num>02</Num>Quality
                </Link>
            </Item>
            <Item>
                <Link active={activeSection === 'sectionAccessible'} href="#sectionAccessible">
                    <Num>03</Num>Accessible
                </Link>
            </Item>
            <Item>
                <Link active={activeSection === 'sectionDevice'} href="#sectionDevice">
                    <Num>04</Num>Device-agnostic
                </Link>
            </Item>
            <Item>
                <Link active={activeSection === 'sectionEvolving'} href="#sectionEvolving">
                    <Num>05</Num>Always evolving
                </Link>
            </Item>
        </List>
    </nav>
);

IntroNav.propTypes = {
    activeSection: PropTypes.string
}

export default IntroNav

