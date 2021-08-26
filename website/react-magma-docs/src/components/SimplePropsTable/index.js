import React from 'react';
import styled from '@emotion/styled';
import {
  magma,
  Badge,
  BadgeColor,
  Tooltip,
  IconButton,
  NotificationIcon,
} from 'react-magma-dom';

export const SimplePropsTable = ({ propertyValues }) => {
  if (propertyValues === undefined) {
    return null;
  }

  const StyledPropsContainer = styled.div`
    padding-bottom: ${magma.spaceScale.spacing05};
    margin-bottom: ${magma.spaceScale.spacing05};
    border-bottom: 1px solid ${magma.colors.neutral06};
  `;

  const StyledPropsInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: ${magma.spaceScale.spacing02};
  `;

  const StyledPropName = styled.div`
    color: ${magma.colors.pop05};
    font-family: ${magma.docsPropsFont};
    font-weight: 600;
    padding: ${magma.spaceScale.spacing05} 0;
    font-size: 18px;

    > * {
      font-family: ${magma.bodyFont};
      text-transform: uppercase;
      font-weight: 400;
      margin: 0 ${magma.spaceScale.spacing04};
    }
  `;

  const StyledTitle = styled.span`
    font-weight: 600;
  `;

  const hasDescription = Object.keys(propertyValues).some(name => {
    return Boolean(propertyValues[name].description);
  });

  return (
    <section>
      {propertyValues &&
        Object.keys(propertyValues).map(name => {
          const prop = propertyValues[name];

          if (!prop.type.name) {
            return null;
          }

          return (
            <StyledPropsContainer key={name}>
              <StyledPropName>
                {name}
                {prop.required && (
                  <Badge className="required" color={BadgeColor.light}>
                    Required
                  </Badge>
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
              </StyledPropName>
              <StyledPropsInfo>
                <StyledTitle>Description</StyledTitle>
                {hasDescription && (
                  <div>{prop.description && prop.description}</div>
                )}
              </StyledPropsInfo>
              <StyledPropsInfo>
                <StyledTitle>Type</StyledTitle>
                <div>
                  {prop.type.name === 'enum' ? 'enum, one of:' : prop.type.name}
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
                </div>
              </StyledPropsInfo>
              <StyledPropsInfo>
                <StyledTitle>Default</StyledTitle>
                {!prop.defaultValue ? (
                  <em>-</em>
                ) : (
                  <div>
                    {prop.defaultValue === "''" ? (
                      <em>[Empty String]</em>
                    ) : (
                      prop.defaultValue.replace(/'/g, '')
                    )}
                  </div>
                )}
              </StyledPropsInfo>
            </StyledPropsContainer>
          );
        })}
    </section>
  );
};
