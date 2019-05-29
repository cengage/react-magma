import React from 'react'
//import PropTypes from 'prop-types'
import styled from '@emotion/styled';

const List = styled.ol`
    background-color: #00263E;
    display: flex;
    left: 280px;
    list-style: none;
    margin: 0;
    padding: 0;
    position: fixed;
    right: 0;
    top: 80px;
    z-index: 2;
`;

const Item = styled.li`
    list-style: none;
    flex-grow: 1;
    font-size: 13px;
    margin: 0;
    padding: 0 60px 0 40px;
    text-transform: uppercase;
`;

const Link = styled.a`
   border-bottom: 2px solid;
   border-color: ${props => props.active? '#FFC72C' : 'transparent'};
   color: ${props => props.active? '#FFC72C' : '#fff'};
   display: block;
   padding: 10px 0;
   text-decoration: none;

   &:hover,
   &:focus {
    color: #DFDFDF;
   }
`;

const Num = styled.span`
   display: block;
`;

const IntroNav = () => (
    <nav>
        <List>
            <Item>
                <Link active href="#sectionIntro"><Num>00</Num>Intro</Link>
            </Item>
            <Item>
                <Link href="#sectionComponents"><Num>01</Num>Component-based</Link>
            </Item>
            <Item>
                <Link href="#sectionQuality"><Num>02</Num>Quality</Link>
            </Item>
            <Item>
                <Link href="#sectionAccessible"><Num>03</Num>Accessible</Link>
            </Item>
            <Item>
                <Link href="#sectionDevice"><Num>04</Num>Device-agnostic</Link>
            </Item>
            <Item>
                <Link href="#sectionEvolving"><Num>05</Num>Always evolving</Link>
            </Item>
        </List>
    </nav>
);

//IntroNav.propTypes = {}

export default IntroNav

