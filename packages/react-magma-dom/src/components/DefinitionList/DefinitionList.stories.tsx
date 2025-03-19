import React from 'react';

import styled from '@emotion/styled';
import { Meta } from '@storybook/react/types-6-0';

import { TypographyVisualStyle } from '../Typography';
import { DefinitionList } from './DefinitionList';
import { DefinitionListItem, DefinitionListType } from './DefinitionListItem';
import { Card, CardBody } from '../Card';
import { Paragraph } from '../Paragraph';

export default {
  component: DefinitionList,
  title: 'DefinitionList',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    visualStyle: {
      control: {
        type: 'select',
        options: TypographyVisualStyle,
      },
    },
  },
} as Meta;

export const Simple = args => {
  const data = [
    { term: 'Coffee', description: 'A hot beverage' },
    { term: 'Tea', description: 'Another hot beverage' },
    { term: 'Milk', description: 'A cold beverage' },
  ];
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <DefinitionList {...args}>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <DefinitionListItem type={DefinitionListType.term}>
                {item.term}
              </DefinitionListItem>
              <DefinitionListItem type={DefinitionListType.description}>
                {item.description}
              </DefinitionListItem>
            </React.Fragment>
          ))}
        </DefinitionList>
      </CardBody>
    </Card>
  );
};

Simple.args = {
  isInverse: false,
  visualStyle: TypographyVisualStyle.bodyMedium,
};

export const WithMultipleTerms = args => {
  const data = [
    {
      term: ['Coffee', 'Tea', 'Hot Chocolate'],
      description: 'A hot beverage',
    },
    { term: ['Milk', 'Lemonade', 'Margarita'], description: 'A cold beverage' },
  ];

  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <DefinitionList {...args}>
          {data.map((item, index) => {
            const terms = Array.isArray(item.term) ? item.term : [item.term];

            return (
              <React.Fragment key={index}>
                {terms.map((term, i) => (
                  <DefinitionListItem
                    key={`term-${index}-${i}`}
                    type={DefinitionListType.term}
                  >
                    {term}
                  </DefinitionListItem>
                ))}
                <DefinitionListItem
                  key={`desc-${index}`}
                  type={DefinitionListType.description}
                >
                  {item.description}
                </DefinitionListItem>
              </React.Fragment>
            );
          })}
        </DefinitionList>
      </CardBody>
    </Card>
  );
};

WithMultipleTerms.args = {
  isInverse: false,
  visualStyle: TypographyVisualStyle.bodyMedium,
};

export const WithMultipleDescriptions = args => {
  const data = [
    {
      term: 'Coffee',
      description: [
        'A rich and aromatic brewed drink made from roasted coffee beans.',
        'A popular beverage known for its energizing caffeine content.',
        'A versatile drink enjoyed hot or cold, often with milk, sugar, or flavorings.',
      ],
    },
    { term: 'Tea', description: 'Another hot beverage' },
    { term: 'Milk', description: 'A cold beverage' },
  ];

  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <DefinitionList {...args}>
          {data.map((item, index) => {
            const descriptions = Array.isArray(item.description)
              ? item.description
              : [item.description];

            return (
              <React.Fragment key={index}>
                <DefinitionListItem
                  key={`term-${index}`}
                  type={DefinitionListType.term}
                >
                  {item.term}
                </DefinitionListItem>
                {descriptions.map((description, i) => (
                  <DefinitionListItem
                    key={`desc-${index}-${i}`}
                    type={DefinitionListType.description}
                  >
                    {description}
                  </DefinitionListItem>
                ))}
              </React.Fragment>
            );
          })}
        </DefinitionList>
      </CardBody>
    </Card>
  );
};

WithMultipleDescriptions.args = {
  isInverse: false,
  visualStyle: TypographyVisualStyle.bodyMedium,
};

export const CustomStyles = args => {
  const data = [
    {
      term: 'Beast of Bodmin',
      description: 'A large feline inhabiting Bodmin Moor.',
    },
    { term: 'Morgawr', description: 'A sea serpent.' },
    { term: 'Owlman', description: 'A giant owl-like creature.' },
  ];

  const TermStyled = styled.div<{ align: 'start' | 'end' }>`
    float: left;
    text-align: ${({ align }) => align};

    dt {
      margin-bottom: 16px;
      margin-right: 0;
    }
  `;

  const DescriptionStyled = styled.div`
    margin-left: 24px;
    float: left;
  `;

  return (
    <Card isInverse={args.isInverse}>
      <CardBody style={{ display: 'flex', flexDirection: 'column' }}>
        <DefinitionList {...args}>
          <Paragraph visualStyle={TypographyVisualStyle.bodyLarge} noTopMargin>
            Right align text
          </Paragraph>
          <TermStyled align={'end'}>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <DefinitionListItem type={DefinitionListType.term}>
                  {item.term}
                </DefinitionListItem>
              </React.Fragment>
            ))}
          </TermStyled>
          <DescriptionStyled>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <DefinitionListItem type={DefinitionListType.description}>
                  {item.description}
                </DefinitionListItem>
              </React.Fragment>
            ))}
          </DescriptionStyled>
        </DefinitionList>

        <DefinitionList {...args}>
          <Paragraph visualStyle={TypographyVisualStyle.bodyLarge} noTopMargin>
            Left align text
          </Paragraph>
          <TermStyled align={'start'}>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <DefinitionListItem type={DefinitionListType.term}>
                  {item.term}
                </DefinitionListItem>
              </React.Fragment>
            ))}
          </TermStyled>
          <DescriptionStyled>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <DefinitionListItem type={DefinitionListType.description}>
                  {item.description}
                </DefinitionListItem>
              </React.Fragment>
            ))}
          </DescriptionStyled>
        </DefinitionList>
      </CardBody>
    </Card>
  );
};

CustomStyles.args = {
  isInverse: false,
  visualStyle: TypographyVisualStyle.bodyMedium,
};
