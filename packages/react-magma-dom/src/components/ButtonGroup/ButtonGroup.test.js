import { axe } from '../../../axe-helper';
import { ButtonGroup, ButtonGroupOrientation, ButtonGroupAlignment } from '.';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownMenuItem,
} from '../Dropdown';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';

const testId = 'test-id';

describe('ButtonGroup', () => {
  it('should find element by testId', () => {
    const { getByTestId } = render(
      <ButtonGroup testId={testId}>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </ButtonGroup>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('does not violate accessibility standards', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </ButtonGroup>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  describe('Horizontal', () => {
    describe('Alignment', () => {
      it('Default: aligns the buttons to the left', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.horizontal}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'row');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'start');
      });
      it('Center: aligns the buttons to the center', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.horizontal}
            alignment={ButtonGroupAlignment.center}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'row');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'center');
      });
      it('Right: aligns the buttons to the right', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.horizontal}
            alignment={ButtonGroupAlignment.right}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'row');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'end');
      });
      it('Fill: fills the space with the buttons', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.horizontal}
            alignment={ButtonGroupAlignment.fill}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'row');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'stretch');
      });
      it('Apart: spreads out the buttons', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.horizontal}
            alignment={ButtonGroupAlignment.apart}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'row');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'space-between');
      });
    });
    describe('No Space', () => {
      it('Removes the border radius around the buttons', () => {
        const { container } = render(
          <ButtonGroup
            testId={testId}
            noSpace
            orientation={ButtonGroupOrientation.horizontal}
            alignment={ButtonGroupAlignment.left}
          >
            <Button testId={`${testId}-1`}>1</Button>
            <Button testId={`${testId}-2`}>2</Button>
            <Button testId={`${testId}-3`}>3</Button>
          </ButtonGroup>
        );

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('Vertical', () => {
    describe('Alignment', () => {
      it('Default: aligns the buttons to the left', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'column');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'start');
      });
      it('Center: aligns the buttons to the center', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            alignment={ButtonGroupAlignment.center}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'column');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'center');
      });
      it('Right: aligns the buttons to the right', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            alignment={ButtonGroupAlignment.right}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'column');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'end');
      });
      it('Fill: fills the space with the buttons', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            alignment={ButtonGroupAlignment.fill}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'column');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'stretch');
      });
      it('Apart: behaves like the left align', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            alignment={ButtonGroupAlignment.apart}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'column');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'start');
      });
    });
    describe('No Space', () => {
      it('Does NOT remove the border radius around the buttons', () => {
        const { container } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            noSpace
          >
            <Button testId={`${testId}-4`}>1</Button>
            <Button testId={`${testId}-5`}>2</Button>
            <Button testId={`${testId}-6`}>3</Button>
          </ButtonGroup>
        );

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('Props for the buttons', () => {
    describe('Color', () => {
      it('sets the color of the children button components', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            color={ButtonColor.danger}
          >
            <Button testId={`${testId}-1`}>1</Button>
            <Button testId={`${testId}-2`}>2</Button>
            <Button testId={`${testId}-3`}>3</Button>
          </ButtonGroup>
        );

        expect(getByTestId(`${testId}-1`)).toHaveStyleRule(
          'background',
          magma.colors.danger
        );
        expect(getByTestId(`${testId}-2`)).toHaveStyleRule(
          'background',
          magma.colors.danger
        );
        expect(getByTestId(`${testId}-3`)).toHaveStyleRule(
          'background',
          magma.colors.danger
        );
      });
      it('sets the color of the children buttons, except if the button has a color set', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            color={ButtonColor.danger}
          >
            <Button testId={`${testId}-1`}>1</Button>
            <Button testId={`${testId}-2`}>2</Button>
            <Button testId={`${testId}-3`} color={ButtonColor.marketing}>
              3
            </Button>
          </ButtonGroup>
        );

        expect(getByTestId(`${testId}-1`)).toHaveStyleRule(
          'background',
          magma.colors.danger
        );
        expect(getByTestId(`${testId}-2`)).toHaveStyleRule(
          'background',
          magma.colors.danger
        );
        expect(getByTestId(`${testId}-3`)).toHaveStyleRule(
          'background',
          magma.colors.secondary
        );
      });
    });

    describe('Size', () => {
      it('sets the size of the children button components', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            size={ButtonSize.large}
          >
            <Button testId={`${testId}-1`}>1</Button>
            <Button testId={`${testId}-2`}>2</Button>
          </ButtonGroup>
        );

        expect(getByTestId(`${testId}-1`)).toHaveStyleRule('height', '56px');
        expect(getByTestId(`${testId}-2`)).toHaveStyleRule('height', '56px');
      });
      it('sets the size of the children buttons, except if the button has a size set', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            size={ButtonSize.large}
          >
            <Button testId={`${testId}-1`}>1</Button>
            <Button testId={`${testId}-2`}>2</Button>
            <Button testId={`${testId}-3`} size={ButtonSize.small}>
              3
            </Button>
          </ButtonGroup>
        );

        expect(getByTestId(`${testId}-1`)).toHaveStyleRule('height', '56px');
        expect(getByTestId(`${testId}-2`)).toHaveStyleRule('height', '56px');
        expect(getByTestId(`${testId}-3`)).toHaveStyleRule('height', '28px');
      });
    });

    describe('Variant', () => {
      it('sets the variant of the children button components', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            variant={ButtonVariant.link}
          >
            <Button testId={`${testId}-1`}>1</Button>
            <Button testId={`${testId}-2`}>2</Button>
          </ButtonGroup>
        );

        expect(getByTestId(`${testId}-1`)).toHaveStyleRule(
          'background',
          'none'
        );
        expect(getByTestId(`${testId}-2`)).toHaveStyleRule(
          'background',
          'none'
        );
      });
      it('sets the variant of the children buttons, except if the button has a variant set', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            variant={ButtonVariant.link}
          >
            <Button testId={`${testId}-1`}>1</Button>
            <Button testId={`${testId}-2`}>2</Button>
            <Button testId={`${testId}-3`} variant={ButtonVariant.solid}>
              3
            </Button>
          </ButtonGroup>
        );

        expect(getByTestId(`${testId}-1`)).toHaveStyleRule(
          'background',
          'none'
        );
        expect(getByTestId(`${testId}-2`)).toHaveStyleRule(
          'background',
          'none'
        );
        expect(getByTestId(`${testId}-3`)).toHaveStyleRule(
          'background',
          magma.colors.primary
        );
      });
    });
  });

  describe('With dropdowns', () => {
    it('Snapshot: Horizontal & center alignment', () => {
      const { container } = render(
        <ButtonGroup
          orientation={ButtonGroupOrientation.horizontal}
          alignment={ButtonGroupAlignment.center}
        >
          <Button>1</Button>
          <Dropdown>
            <DropdownButton id="2">Dropdown 2</DropdownButton>
            <DropdownContent>
              <DropdownMenuItem>Menu item 2.1</DropdownMenuItem>
            </DropdownContent>
          </Dropdown>
          <Dropdown>
            <DropdownButton id="3">Dropdown 3</DropdownButton>
            <DropdownContent>
              <DropdownMenuItem>Menu item 3.1</DropdownMenuItem>
            </DropdownContent>
          </Dropdown>
        </ButtonGroup>
      );

      expect(container).toMatchSnapshot();
    });

    it('Snapshot: noSpace', () => {
      const { container } = render(
        <ButtonGroup
          noSpace
          orientation={ButtonGroupOrientation.horizontal}
          alignment={ButtonGroupAlignment.left}
        >
          <Button>1</Button>
          <Dropdown>
            <DropdownButton id="2">Dropdown 2</DropdownButton>
            <DropdownContent>
              <DropdownMenuItem>Menu item 2.1</DropdownMenuItem>
            </DropdownContent>
          </Dropdown>
          <Dropdown>
            <DropdownButton id="3">Dropdown 3</DropdownButton>
            <DropdownContent>
              <DropdownMenuItem>Menu item 3.1</DropdownMenuItem>
            </DropdownContent>
          </Dropdown>
        </ButtonGroup>
      );

      expect(container).toMatchSnapshot();
    });

    it('Snapshot: Vertical & fill alignment', () => {
      const { container } = render(
        <ButtonGroup
          orientation={ButtonGroupOrientation.vertical}
          alignment={ButtonGroupAlignment.fill}
        >
          <Button>1</Button>
          <Dropdown>
            <DropdownButton id="2">Dropdown 2</DropdownButton>
            <DropdownContent>
              <DropdownMenuItem>Menu item 2.1</DropdownMenuItem>
            </DropdownContent>
          </Dropdown>
          <Dropdown>
            <DropdownButton id="3">Dropdown 3</DropdownButton>
            <DropdownContent>
              <DropdownMenuItem>Menu item 3.1</DropdownMenuItem>
            </DropdownContent>
          </Dropdown>
        </ButtonGroup>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
