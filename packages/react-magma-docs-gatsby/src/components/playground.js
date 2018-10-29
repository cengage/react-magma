import React from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'react-magma-dom'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

const StyledProvider = styled(LiveProvider)`
  border-radius: 3px;
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  overflow: hidden;
  margin-bottom: 100px;
`

const LiveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const column = css`
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;
  @media (max-width: 600px) {
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
  }
`

const StyledEditor = styled(LiveEditor)`
  background: #ccc;
  font-family: 'Source Code Pro', monospace;
  font-size: 14;
  height: 350;
  overflow: scroll;

  ${column};
`

const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;

  ${column};
`

const StyledError = styled(LiveError)`
  display: block;
  padding: 8px;
  background: 'red';
  color: 'white';
`

export class Playground extends React.Component {
  transformCode(code) {
    return `
      const App = ({ children }) => (
        <div>
          {children && typeof children === 'function' ? children() : children}
        </div>
      )
      render(<App>${code}</App>)
    `
  }

  render() {
    console.log(this.props.children)
    return (
      <StyledProvider
        scope={{ Button }}
        code={this.props.children}
        noInline={false}
        mountStylesheet={false}
      >
        <LiveWrapper>
          <StyledPreview />
          <StyledEditor />>
        </LiveWrapper>

        <StyledError />
      </StyledProvider>
    )
  }
}

export default Playground
