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
  useIsInverse,
  VisuallyHidden,
} from 'react-magma-dom';

export const SimplePropsTable = ({ propertyValues }) => {
  const isInverse = useIsInverse();

  if (propertyValues === undefined) {
    return null;
  }

  const hasDescription = Object.keys(propertyValues).some(name => {
    return Boolean(propertyValues[name].description);
  });

  const asteriskColor = isInverse
    ? magma.colors.neutral100
    : magma.colors.primary;

  return (
    <div>
      <Paragraph>
        <AsteriskIcon size={16} color={asteriskColor} /> = required prop
      </Paragraph>
      <Table
        hasZebraStripes
        style={{
          fontSize: magma.typeScale.size02.fontSize,
          letterSpacing: magma.typeScale.size02.letterSpacing,
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
                        <span className="required">
                          <VisuallyHidden>Required</VisuallyHidden>
                          <AsteriskIcon size={16} color={asteriskColor} />
                        </span>
                      )}
                      {prop.deprecated && (
                        <Tooltip content="Deprecated">
                          <IconButton
                            aria-label="deprecated"
                            icon={
                              <NotificationIcon color={magma.colors.danger} />
                            }
                            size="small"
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
