import React from 'react'
import './styles.css'

export const SimplePropsTable = ({ props }) => {
  if (props === undefined) {
    return null
  }

  const hasDescription = Object.keys(props).some(name => {
    return Boolean(props[name].description)
  })

  return (
    <div>
      <table className="props-table" cellSpacing="0" cellPadding="0">
        <thead
          style={{
            textAlign: 'left',
          }}
        >
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default</th>
            {hasDescription && <th width="40%">Description</th>}
          </tr>
        </thead>
        <tbody>
          {props &&
            Object.keys(props).map(name => {
              const prop = props[name]

              if (!prop.type.name) {
                return null
              }

              return (
                <tr key={name}>
                  <td>
                    {name}
                    {prop.required ? <span className="required">required</span> :''}
                  </td>
                  <td>
                    {prop.type.name}
                    <br/>
                    {prop.type.options && Object.keys(prop.type.options).map(i => {
                      return <code>{prop.type.options[i]}</code>
                    })}
                  </td>
                  {!prop.defaultValue ? (
                    <td>
                      <em>-</em>
                    </td>
                  ) : (
                    <td>
                      {prop.defaultValue === "''" ? (
                        <em>[Empty String]</em>
                      ) : (
                        prop.defaultValue.replace(/'/g, '')
                      )}
                    </td>
                  )}
                  {hasDescription && (
                    <td>{prop.description && prop.description}</td>
                  )}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
