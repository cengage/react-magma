import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import { Button } from 'react-magma-dom'

const handleClick = (targetID, e) => {  
    e.preventDefault()
    const targetAnchor = document.getElementById(targetID);

    if (!targetAnchor) { return }

    const targetHeading = targetAnchor.getElementsByTagName('h1')[0];

    if (targetHeading) {
        targetHeading.setAttribute('tabIndex', '-1');
        targetHeading.focus();
        return;
    }
    targetAnchor.focus();
  }

const ButtonContainer = styled.div`
    display: none;

    @media (min-width: 1024px) {
        display: block;
        left: -9999px;
        position: fixed;
        top: -9999px;
        
        &:focus-within {
            left: 275px;
            top: 16px;
            z-index: 3;
        }
    }
`;

const SkipLink = ({ ...props }) => (
    <ButtonContainer>
        <Button
            inverse
            onClick={e => {
                handleClick(props.targetID, e)
            }}
            style={{'background': 'transparent'}}
            variant='outline'>Skip Navigation</Button>
    </ButtonContainer>
);

SkipLink.propTypes = {
    targetID: PropTypes.string
}
  
export default SkipLink
