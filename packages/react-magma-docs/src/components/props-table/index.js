import React from 'react'
import styles from './styles.css'

export const SimplePropsTable = ({ props }) => {
  if (props === undefined) {
    return null
  }

  const hasDescription = Object.keys(props).some(name => {
    return Boolean(props[name].description)
  })

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead
          style={{
            textAlign: 'left',
          }}
        >
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Required</th>
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
                  <td>{name}</td>
                  <td>{prop.type.name}</td>
                  <td>{prop.required ? String(prop.required) : 'false'}</td>
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
