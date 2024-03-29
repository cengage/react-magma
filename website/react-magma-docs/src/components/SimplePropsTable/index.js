import React from 'react';
import {
  magma,
  Flex,
  FlexAlignItems,
  FlexBehavior,
  FlexDirection,
  Paragraph,
  useIsInverse,
  Spacer,
  Tag,
  TagColor,
  TagSize,
  TypographyContextVariant,
  TypographyVisualStyle,
} from 'react-magma-dom';
import styled from '@emotion/styled';

export const SimplePropsTable = ({ propertyValues }) => {
  const isInverse = useIsInverse();

  const StyledHr = styled('hr')`
    background: ${isInverse ? magma.colors.borderInverse : magma.colors.border};
    border: none;
    height: 1px;
    margin: ${magma.spaceScale.spacing06} 0 0;
    padding: 0;
  `;

  const StyledParagraphKey = styled(Paragraph)`
    font-weight: 600;
    padding-bottom: 0;
  `;
  
const StyledFlexLeft = styled(Flex)`
  @media (max-width: ${magma.breakpoints.small}px) {
    padding: 8px 8px 4px !important;
  }
`;

const StyledFlexRight = styled(Flex)`
  @media (max-width: ${magma.breakpoints.small}px) {
    padding-top: 0 !important;
  }
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
            <div key={name}>
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
                    style={{ fontWeight: 'bold', fontFamily: 'Courier', color: prop.deprecated ? magma.colors.neutral600 : magma.colors.info, marginBottom: '16px' }}
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
                    <Tag
                      size={TagSize.small}
                      isInverse={isInverse}
                    >
                      Deprecated
                    </Tag>
                  )}
                </Flex>
              </Flex>
              <Flex behavior={FlexBehavior.container} spacing={2}>
                {prop.description && (
                  <>
                    <StyledFlexLeft
                      behavior={FlexBehavior.item}
                      xs={3}
                      direction={FlexDirection.column}
                      spacing={0}
                      >
                      <StyledParagraphKey
                        visualStyle={TypographyVisualStyle.bodySmall}
                        noMargins
                        >
                        Description
                      </StyledParagraphKey>
                    </StyledFlexLeft>
                    <StyledFlexRight
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
                    </StyledFlexRight>
                  </>
                )}
                <StyledFlexLeft
                  behavior={FlexBehavior.item}
                  xs={3}
                  direction={FlexDirection.column}
                >
                  <StyledParagraphKey
                    visualStyle={TypographyVisualStyle.bodySmall}
                    noMargins
                  >
                    Type
                  </StyledParagraphKey>
                </StyledFlexLeft>
                <StyledFlexRight
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
                          <span key={i}>
                            {prop.type.options[i]}
                            <br />
                          </span>
                        );
                      })}
                  </Paragraph>
                </StyledFlexRight>
                <StyledFlexLeft
                  behavior={FlexBehavior.item}
                  xs={3}
                  direction={FlexDirection.column}
                >
                  <StyledParagraphKey
                    visualStyle={TypographyVisualStyle.bodySmall}
                    noMargins
                  >
                    Default
                  </StyledParagraphKey>
                </StyledFlexLeft>
                <StyledFlexRight
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
                </StyledFlexRight>
              </Flex>
              <StyledHr />
            </div>
          );
        })}
        <Spacer size="32" />
    </>
  );
};
