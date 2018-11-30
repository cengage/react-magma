import * as React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin: 0 0 120px;
`

export const SelectContainer = props => <StyledDiv>{props.children}</StyledDiv>
