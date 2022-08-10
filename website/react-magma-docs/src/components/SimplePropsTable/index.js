import React from 'react';
import { NotificationIcon } from 'react-magma-icons';
import {
  magma,
  IconButton,
  Flex,
  FlexAlignItems,
  FlexBehavior,
  FlexDirection,
  Paragraph,
  Tooltip,
  useIsInverse,
  Tag,
  TagColor,
  TagSize,
  TypographyContextVariant,
  TypographyVisualStyle,
} from 'react-magma-dom';
import styled from '@emotion/styled';

export const SimplePropsTable = ({ propertyValues }) => {
  const isInverse = useIsInverse();

  const HR = styled.hr`
    background: ${props =>
      props.isInverse ? magma.colors.borderInverse : magma.colors.border};
    border: none;
    height: 1px;
    margin: ${magma.spaceScale.spacing07} 0 ${magma.spaceScale.spacing03};
    padding: 0;
  `;

  if (propertyValues === undefined) {
    return null;
  }

  const getPropDefaultValue = value => {
    if (!value) {
      return <em>-</em>;
    }
    if (value === "''") {
      return <em>[Empty String]</em>;
    } else {
      return value.replace(/'/g, '');
    }
  };

  return (
    <>
      {propertyValues &&
        Object.keys(propertyValues).map(name => {
          const prop = propertyValues[name];

          if (!prop.type.name) {
            return null;
          }

          return (
            <>
              <Flex
                behavior={FlexBehavior.container}
                alignItems={FlexAlignItems.center}
              >
                <Flex
                  behavior={FlexBehavior.item}
                  xs={9}
                  s={10}
                  direction={FlexDirection.row}
                >
                  <Paragraph
                    contextVariant={TypographyContextVariant.narrative}
                    style={{ fontFamily: 'Courier', color: magma.colors.info }}
                  >
                    {name}
                  </Paragraph>
                </Flex>
                <Flex
                  behavior={FlexBehavior.item}
                  xs={3}
                  s={2}
                  direction={FlexDirection.row}
                  style={{ textAlign: 'right' }}
                >
                  {prop.required && (
                    <Tag
                      size={TagSize.small}
                      color={TagColor.primary}
                      isInverse={isInverse}
                    >
                      Required
                    </Tag>
                  )}
                  {prop.deprecated && (
                    <Tooltip content="Deprecated">
                      <IconButton
                        aria-label="deprecated"
                        icon={<NotificationIcon color={magma.colors.danger} />}
                        size="small"
                        variant="link"
                      />
                    </Tooltip>
                  )}
                </Flex>
              </Flex>
              <Flex behavior={FlexBehavior.container} spacing={2}>
                {prop.description && (
                  <>
                    <Flex
                      behavior={FlexBehavior.item}
                      xs={3}
                      direction={FlexDirection.column}
                    >
                      <Paragraph
                        visualStyle={TypographyVisualStyle.bodySmall}
                        noMargins
                        style={{ fontWeight: '600' }}
                      >
                        Description
                      </Paragraph>
                    </Flex>
                    <Flex
                      behavior={FlexBehavior.item}
                      xs={12}
                      md={9}
                      direction={FlexDirection.column}
                    >
                      <Paragraph
                        visualStyle={TypographyVisualStyle.bodySmall}
                        noMargins
                      >
                        {prop.description}
                      </Paragraph>
                    </Flex>
                  </>
                )}
                <Flex
                  behavior={FlexBehavior.item}
                  xs={3}
                  direction={FlexDirection.column}
                >
                  <Paragraph
                    visualStyle={TypographyVisualStyle.bodySmall}
                    noMargins
                    style={{ fontWeight: '600' }}
                  >
                    Type
                  </Paragraph>
                </Flex>
                <Flex
                  behavior={FlexBehavior.item}
                  xs={12}
                  md={9}
                  direction={FlexDirection.column}
                >
                  <Paragraph
                    visualStyle={TypographyVisualStyle.bodySmall}
                    noMargins
                  >
                    {prop.type.name === 'enum'
                      ? 'enum, one of:'
                      : prop.type.name}
                    <br />
                    {prop.type.options &&
                      Object.keys(prop.type.options).map(i => {
                        return (
                          <div key={i}>
                            {prop.type.options[i]}
                            <br />
                          </div>
                        );
                      })}
                  </Paragraph>
                </Flex>
                <Flex
                  behavior={FlexBehavior.item}
                  xs={3}
                  direction={FlexDirection.column}
                >
                  <Paragraph
                    visualStyle={TypographyVisualStyle.bodySmall}
                    noMargins
                    style={{ fontWeight: '600' }}
                  >
                    Default
                  </Paragraph>
                </Flex>
                <Flex
                  behavior={FlexBehavior.item}
                  xs={12}
                  md={9}
                  direction={FlexDirection.column}
                >
                  <Paragraph
                    visualStyle={TypographyVisualStyle.bodySmall}
                    noMargins
                  >
                    {getPropDefaultValue(prop.defaultValue)}
                  </Paragraph>
                </Flex>
              </Flex>
              <HR />
            </>
          );
        })}
    </>
  );
};
