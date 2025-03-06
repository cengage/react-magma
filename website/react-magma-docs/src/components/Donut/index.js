import React from 'react';

import styled from '@emotion/styled';

// This is an example used in the theme documentation for decoration purposes.

const StyledDonut = styled.div`
  width: 288px;
  position: relative;
  left: calc(100% - 268px);
  margin-top: 100px;
  z-index: 1;
  bottom: 80px;
  transform: rotate(8deg);

  &:before {
    content: '';
    width: 100%;
    height: 206px;
    position: absolute;
    top: -10px;
    left: 0;
    border-radius: 80%;
    z-index: 0;
    background: linear-gradient(
      0deg,
      rgba(141, 70, 37, 1) 0%,
      rgba(190, 114, 78, 1) 62%,
      rgba(210, 139, 105, 1) 91%
    );
    box-shadow:
      -5px 15px 4px -14px rgb(0 0 0 / 35%),
      -70px 50px 11px -30px rgb(0 0 0 / 6%),
      inset 0 -42px 30px -5px #00000014;
  }
  &:after {
    content: '';
    background: pink;
    box-shadow:
      inset 0 -10px 2px #ffffff33,
      inset 0 36px 20px -20px #ffffff69,
      inset 0 -50px 30px -20px #0000001c,
      inset 0 -10px 30px 50px #ffffff66,
      inset 0 -4px 5px #00000070;
    position: absolute;
    top: -11px;
    left: 5%;
    width: 90%;
    height: 127px;
    border-radius: 50%;
  }
  @media screen and (max-width: 1120px) {
    zoom: 0.7;
  }
`;

const StyledLight = styled.div`
  width: 120px;
  height: 75px;
  position: absolute;
  top: -20px;
  left: 86px;
  z-index: 1;
  border-radius: 50%;
  background: linear-gradient(0deg, rgb(0 0 0 / 14%) 0%, rgba(0, 0, 0, 0) 40%);
  border-bottom: 3px solid #ffffff59;
  &:before {
    content: '\\\ ||/ /';
    position: absolute;
    top: 51px;
    left: 40px;
    width: 100%;
    height: 100%;
    filter: blur(3px);
    letter-spacing: 2px;
    color: #00000045;
  }
  &:after {
    content: '\ ||/ /';
    position: absolute;
    top: 51px;
    left: 42px;
    width: 100%;
    height: 100%;
    -webkit-filter: blur(3px);
    filter: blur(3px);
    -webkit-letter-spacing: 2px;
    -moz-letter-spacing: 2px;
    -ms-letter-spacing: 2px;
    letter-spacing: 2px;
    color: #f7f7f7;
  }
`;

const StyledShadow = styled.div`
  width: 100%;
  height: 206px;
  position: absolute;
  top: -10px;
  left: 0;
  border-radius: 80%;
  overflow: hidden;
  &:before {
    content: '\\||//';
    position: absolute;
    top: 159px;
    left: 35px;
    width: 100%;
    height: 150px;
    font-size: 50px;
    letter-spacing: 35px;
    filter: blur(7px);
    color: #43200f;
    -webkit-text-stroke-width: 14px;
    opacity: 0.1;
  }
  &:after {
    content: '\\||//';
    position: absolute;
    top: 169px;
    left: 53px;
    width: 100%;
    height: 150px;
    font-size: 50px;
    letter-spacing: 35px;
    filter: blur(7px);
    color: #ffffff;
    -webkit-text-stroke-width: 14px;
    opacity: 0.03;
  }
`;

const StyledSprinkle = styled.div`
  width: 25px;
  height: 5px;
  border-radius: 4px;
  position: absolute;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  z-index: 2;
  &:before {
    content: '';
    position: absolute;
    top: 1px;
    width: 88%;
    height: 2px;
    background: white;
    filter: blur(2px);
    left: 6%;
  }
`;

const Sprinkles = [
  { id: 'red', background: '#e82f33' },
  { id: 'blue', background: '#2a7ded' },
  { id: 'green', background: '#199662' },
  { id: 'orange', background: '#fa7831' },
  { id: 'yellow', background: '#f2c532' },
  { id: 'white', background: '#e9e9e9' },
  { id: 'pink', background: '#cc7bbf' },
];

function haveARandomNum(max) {
  return Math.floor(Math.random() * max);
}

export const Donut = () => (
  <StyledDonut>
    <StyledLight />
    <StyledShadow />
    {[...Array(60)].map((_, i) => (
      <StyledSprinkle
        key={i}
        style={{
          background: Sprinkles[haveARandomNum(6)].background,
          top: `${haveARandomNum(110)}px`,
          left: `${haveARandomNum(200)}px`,
          transform: `rotate(${haveARandomNum(160)}deg)`,
        }}
      />
    ))}
  </StyledDonut>
);
