import React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

export const LiveProviderComponent = props => {
  return (
    <LiveProvider
      mountStylesheet={false}
      code={props.children.props.children}
      // scope={SCOPED_COMPONENTS[component]}
    >
      <div
        className="pre-container"
        style={props.children.props.props.hideCode ? { display: 'none' } : null}
      >
        <LiveEditor ignoreTabKey tabIndex="-1" />
      </div>
      <LiveError />
      <LivePreview />
    </LiveProvider>
  )
}
