import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '../../../axe-helper';

import { DefinitionList, DefinitionListItem } from '.';

const TERM = 'Coffee';
const DESCRIPTION = 'A hot beverage';

describe('definitionList', () => {
  it('should render the DefinitionList component', () => {
    const { getByText } = render(
      <DefinitionList>
        <DefinitionListItem type={'term'}>{TERM}</DefinitionListItem>
        <DefinitionListItem type={'description'}>
          {DESCRIPTION}
        </DefinitionListItem>
      </DefinitionList>
    );

    expect(getByText(TERM)).toBeInTheDocument();
    expect(getByText(DESCRIPTION)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <DefinitionList testId={testId}>
        <DefinitionListItem type={'term'}>{TERM}</DefinitionListItem>
        <DefinitionListItem type={'description'}>
          {DESCRIPTION}
        </DefinitionListItem>
      </DefinitionList>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <DefinitionList>
        <DefinitionListItem type={'term'}>{TERM}</DefinitionListItem>
        <DefinitionListItem type={'description'}>
          {DESCRIPTION}
        </DefinitionListItem>
      </DefinitionList>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should render the text only definition list item with these styles when isInverse is false', () => {
    const testId = 'test-id';

    const { container } = render(
      <DefinitionList>
        <DefinitionListItem testId={testId + ' term'} type={'term'}>
          Coffee
        </DefinitionListItem>
        <DefinitionListItem testId={testId + ' desc'} type={'description'}>
          A hot beverage
        </DefinitionListItem>
      </DefinitionList>
    );
    expect(container.querySelector('dt')).toBeInTheDocument();

    const dtElement = container.querySelector('dt');
    const alignItems = getComputedStyle(dtElement).alignItems;
    expect(alignItems).toBe("'center'");

    const ddElement = container.querySelector('dd');
    const marginInlineStart = getComputedStyle(ddElement).alignItems;
    expect(marginInlineStart).toBe('flex-start');

    expect(container.querySelector('dl')).toHaveStyleRule(
      'margin',
      '0',
      'padding',
      '0',
      'color',
      'black'
    );
  });

  it('should render the text only definition list item with these styles when isInverse is true', () => {
    const testId = 'test-id';

    const { container } = render(
      <DefinitionList isInverse>
        <DefinitionListItem testId={testId + ' term'} type={'term'}>
          Coffee
        </DefinitionListItem>
        <DefinitionListItem testId={testId + ' desc'} type={'description'}>
          A hot beverage
        </DefinitionListItem>
      </DefinitionList>
    );

    expect(container.querySelector('dl')).toHaveStyleRule('color', '#FFFFFF');
  });
});
