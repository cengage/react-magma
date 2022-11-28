import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { magma } from 'react-magma-dom';

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & + p {
    line-height: ${magma.typeScale.size04.lineHeight};
    font-size: ${magma.typeScale.size04.fontSize};
  }

  @media (min-width: ${magma.breakpoints.small}px) {
    align-items: center;
    flex-direction: row;
    & + p {
      line-height: ${magma.typeScale.size05.lineHeight};
      font-size: ${magma.typeScale.size05.fontSize};
    }
  }
`;

export const DocsHeading = () => {
  return (
    <>
      <Container></Container>
    </>
  );
};

DocsHeading.propTypes = {
  children: PropTypes.node.isRequired,
};
