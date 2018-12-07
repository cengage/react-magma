import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const IconListContainer = props => (
  <StyledDiv>{props.children}</StyledDiv>
)
