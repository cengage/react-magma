import React from 'react';
import { AsteriskIcon, NotificationIcon } from 'react-magma-icons';
import {
  magma,
  IconButton,
  Paragraph,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableHeaderCell,
  TableRow,
  Tooltip,
} from 'react-magma-dom';

export const SimplePropsTable = ({ propertyValues }) => {
  if (propertyValues === undefined) {
    return null;
  }

  const hasDescription = Object.keys(propertyValues).some(name => {
    return Boolean(propertyValues[name].description);
  });

  return (
    <div>
      <Paragraph>
        <AsteriskIcon size="12" color={magma.colors.primary} /> = required prop
      </Paragraph>
      <Table
        hasZebraStripes
        style={{
          fontSize: magma.typeScale.size02.fontSize,
          lineHeight: magma.typeScale.size02.lineHeight,
        }}
      >
        <TableHead>
          <TableRow>
            <TableHeaderCell width="10%">Property</TableHeaderCell>
            <TableHeaderCell width="25%">Type</TableHeaderCell>
            <TableHeaderCell width="15%">Default</TableHeaderCell>
            {hasDescription && (
              <TableHeaderCell width="45%">Description</TableHeaderCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {propertyValues &&
            Object.keys(propertyValues).map(name => {
              const prop = propertyValues[name];

              if (!prop.type.name) {
                return null;
              }

              return (
                <TableRow key={name}>
                  <TableCell>
                    <span style={{ whiteSpace: 'nowrap' }}>
                      {name}
                      {prop.required && (
                        <span aria-label="Required" className="required">
                          {' '}
                          <AsteriskIcon
                            size="12"
                            color={magma.colors.primary}
                          />
                        </span>
                      )}
                      {prop.deprecated && (
                        <Tooltip content="Deprecated">
                          <IconButton
                            aria-label="deprecated"
                            icon={
                              <NotificationIcon
                                size={magma.iconSizes.small}
                                color={magma.colors.danger}
                              />
                            }
                            variant="link"
                          />
                        </Tooltip>
                      )}
                    </span>
                  </TableCell>
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
                  {hasDescription && (
                    <TableCell>
                      {prop.description && prop.description}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};
