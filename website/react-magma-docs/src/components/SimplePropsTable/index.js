import React from 'react';
import { NotificationIcon } from 'react-magma-icons';
import {
  magma,
  IconButton,
  Table,
  TableCell,
  TableHeaderCell,
  TableRow,
  Tooltip,
  VisuallyHidden,
} from 'react-magma-dom';

export const SimplePropsTable = ({ propertyValues }) => {
  if (propertyValues === undefined) {
    return null;
  }

  const hasDescription = Object.keys(propertyValues).some(name => {
    return Boolean(propertyValues[name].description);
  });

  return (
    <>
      <Table
        style={{
          fontSize: magma.typeScale.size02.fontSize,
          lineHeight: magma.typeScale.size02.lineHeight,
        }}
      >
        {propertyValues &&
          Object.keys(propertyValues).map(name => {
            const prop = propertyValues[name];

            if (!prop.type.name) {
              return null;
            }

            return (
              <>
                <TableRow key={name}>
                  <TableCell width="100%" colspan="2">
                    Property
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHeaderCell>Description</TableHeaderCell>
                  {hasDescription && (
                    <TableCell>
                      {prop.description && prop.description}
                    </TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableCell>
                    {prop.type.name === 'enum'
                      ? 'enum, one of:'
                      : prop.type.name}
                    <br />
                    {prop.type.options &&
                      Object.keys(prop.type.options).map(i => {
                        return (
                          <div key={i}>
                            <code>{prop.type.options[i]}</code>
                            <br />
                          </div>
                        );
                      })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHeaderCell>Default</TableHeaderCell>
                  {!prop.defaultValue ? (
                    <TableCell>
                      <em>-</em>
                    </TableCell>
                  ) : (
                    <TableCell>
                      {prop.defaultValue === "''" ? (
                        <em>[Empty String]</em>
                      ) : (
                        prop.defaultValue.replace(/'/g, '')
                      )}
                    </TableCell>
                  )}
                </TableRow>
              </>
            );
          })}
      </Table>
    </>
  );
};
