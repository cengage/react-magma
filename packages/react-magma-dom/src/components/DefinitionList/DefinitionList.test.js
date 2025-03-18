import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '../../../axe-helper';

import { DefinitionList, DefinitionListItem, DefinitionListType } from '.';

const TERM = 'Coffee';
const DESCRIPTION = 'A hot beverage';

describe('DefinitionList', () => {
  it('should render the DefinitionList', () => {
    const { getByText } = render(
      <DefinitionList>
        <DefinitionListItem type={DefinitionListType.term}>
          {TERM}
        </DefinitionListItem>
        <DefinitionListItem type={DefinitionListType.description}>
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
        <DefinitionListItem type={DefinitionListType.term}>
          {TERM}
        </DefinitionListItem>
        <DefinitionListItem type={DefinitionListType.description}>
          {DESCRIPTION}
        </DefinitionListItem>
      </DefinitionList>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should does not violate accessibility standards', () => {
    const { container } = render(
      <DefinitionList>
        <DefinitionListItem type={DefinitionListType.term}>
          {TERM}
        </DefinitionListItem>
        <DefinitionListItem type={DefinitionListType.description}>
          {DESCRIPTION}
        </DefinitionListItem>
      </DefinitionList>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should render the DefinitionList with these styles when isInverse is false', () => {
    const { container } = render(
      <DefinitionList>
        <DefinitionListItem type={DefinitionListType.term}>
          Coffee
        </DefinitionListItem>
        <DefinitionListItem type={DefinitionListType.description}>
          A hot beverage
        </DefinitionListItem>
      </DefinitionList>
    );

    expect(container.querySelector('dl')).toHaveStyleRule(
      'margin',
      '0',
      'padding',
      '0',
      'color',
      'black'
    );
  });

  it('should render the DefinitionList with these styles when isInverse is true', () => {
    const { container } = render(
      <DefinitionList isInverse>
        <DefinitionListItem type={DefinitionListType.term}>
          Coffee
        </DefinitionListItem>
        <DefinitionListItem type={DefinitionListType.description}>
          A hot beverage
        </DefinitionListItem>
      </DefinitionList>
    );

    expect(container.querySelector('dl')).toHaveStyleRule('color', '#FFFFFF');
  });

  describe('DefinitionListItem', () => {
    it('should render component with correct tags for terms and description', () => {
      const testId = 'test-id';

      const { getByTestId } = render(
        <DefinitionList>
          <DefinitionListItem
            type={DefinitionListType.term}
            testId={testId + '-term'}
          >
            {TERM}
          </DefinitionListItem>
          <DefinitionListItem
            type={DefinitionListType.description}
            testId={testId + '-desc'}
          >
            {DESCRIPTION}
          </DefinitionListItem>
        </DefinitionList>
      );

      const termElements = getByTestId('test-id-term');
      const descriptionElement = getByTestId('test-id-desc');

      expect(termElements.tagName).toBe('DT');
      expect(descriptionElement.tagName).toBe('DD');
    });

    it('should render the DefinitionListItem with these default styles', () => {
      const { container } = render(
        <DefinitionList>
          <DefinitionListItem type={DefinitionListType.term}>
            Coffee
          </DefinitionListItem>
          <DefinitionListItem type={DefinitionListType.description}>
            A hot beverage
          </DefinitionListItem>
        </DefinitionList>
      );
      expect(container.querySelector('dt')).toBeInTheDocument();

      const dtElement = container.querySelector('dt');
      const alignItems = getComputedStyle(dtElement).alignItems;
      expect(alignItems).toBe('center');

      const ddElement = container.querySelector('dd');
      const marginInlineStart = getComputedStyle(ddElement).alignItems;
      expect(marginInlineStart).toBe('flex-start');
    });
  });
});
