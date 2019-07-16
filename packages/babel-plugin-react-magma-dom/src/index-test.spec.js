const babel = require('@babel/core');
const plugin = require('.');

const combinationExample = `
  import * as React from 'react';
  import {
    Button,
    Heading,
    ICONS as RenamedIcons,
    Radio as MyRadio
  } from 'react-magma-dom';
  import * as Magma2 from 'react-magma-dom';
  import Magma from 'react-magma-dom';

  export class Example extends React.Component {
    render() {
      const icon = <RenamedIcons.DeleteIcon />;
      const MyIcon = RenamedIcons.ArrowIcon;
      const NestedIcon = Magma2.ICONS.ArrowLeftIcon;
      return (
        <>
          <Button />
          <Magma.Checkbox />
          <Magma.ICONS.FakeIcon />
          <Magma2.Input prop={prop} />
          <Magma2.Blah />
          <RenamedIcons.CheckIcon />
          <MyIcon />
          <Magma2.ICONS.ArrowRightIcon />

          <MyRadio />
        </>
      );
    }
  }
`;

const namedExample = `
  import { Button, Heading } from 'react-magma-dom'
`;

const defaultImportExample = `
  import Magma from 'react-magma-dom'

  export class Example extends React.Component {
    render() {
      const Button = Magma.Button
      return (
        <div>
          <Magma.Input />
          <Button />
        </div>
      );
    }
  }
`;

const defaultNamespaceExample = `
  import * as Magma from 'react-magma-dom'

  export class Example extends React.Component {
    render() {
      const Button = Magma.Button
      return (
        <div>
          <Magma.Input />
          <Button />
        </div>
      );
    }
  }
`;

const globalStylesExample = `
  import { GlobalStyles } from 'react-magma-dom'

  export class Example extends React.Component {
    render() {
      return (
        <div>
          <GlobalStyles />
        </div>
      );
    }
  }
`;

const iconsExample = `
  import { ICONS } from 'react-magma-dom'

  export class Example extends React.Component {
    render() {
      return (
        <div>
          <ICONS.CheckIcon />
        </div>
      );
    }
  }
`;

const defaultIconsExample = `
  import * as Magma from 'react-magma-dom'

  export class Example extends React.Component {
    render() {
      const DeleteIcon = Magma.ICONS.DeleteIcon
      return (
        <div>
          <Magma.ICONS.CheckIcon />
          <DeleteIcon />
        </div>
      );
    }
  }
`;

const namedIconsExample = `
  import { DeleteIcon } from 'react-magma-dom'

  export class Example extends React.Component {
    render() {
      return (
        <div>
          <DeleteIcon />
        </div>
      )
    }
  }
`;

const renamedImportExample = `
  import { Button as MyButton } from 'react-magma-dom'

  export class Example extends React.Component {
    render() {
      return (
        <div>
          <MyButton />
        </div>
      );
    }
  }
`;

const interfaceExample = `
  import { IButtonColor } from 'react-magma-dom'

  export class Example extends React.Component {
    render() {
      return (
        <div>
          <button color={IButtonColor.yellow} />
        </div>
      );
    }
  }
`;

const enumExample = `
  import { EnumButtonColor } from 'react-magma-dom'

  export class Example extends React.Component {
    render() {
      return (
        <div>
          <button color={EnumButtonColor.yellow} />
        </div>
      );
    }
  }
`;

it('handles a combination of imports and use cases', () => {
  const { code } = babel.transform(combinationExample, { plugins: [plugin] });
  expect(code).toMatchSnapshot();
});

it('rewrites the named imports', () => {
  const { ast } = babel.transform(namedExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue1 = program.body[0].declarations[0].init.arguments[0].value;
  const sourceValue2 = program.body[1].declarations[0].init.arguments[0].value;

  expect(sourceValue1).toEqual('react-magma-dom/dist/components/Button');
  expect(sourceValue2).toEqual('react-magma-dom/dist/components/Heading');
});

it('changes default import reference to named imports', () => {
  const { ast } = babel.transform(defaultImportExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue1 = program.body[2].declarations[0].init.arguments[0].value;
  const sourceValue2 = program.body[3].declarations[0].init.arguments[0].value;

  expect(sourceValue1).toEqual('react-magma-dom/dist/components/Button');
  expect(sourceValue2).toEqual('react-magma-dom/dist/components/Input');
});

it('changes default namespace import reference to named imports', () => {
  const { ast } = babel.transform(defaultNamespaceExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue1 = program.body[2].declarations[0].init.arguments[0].value;
  const sourceValue2 = program.body[3].declarations[0].init.arguments[0].value;

  expect(sourceValue1).toEqual('react-magma-dom/dist/components/Button');
  expect(sourceValue2).toEqual('react-magma-dom/dist/components/Input');
});

it('changes GlobalStyles to import from the theme folder', () => {
  const { ast } = babel.transform(globalStylesExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue = program.body[2].declarations[0].init.arguments[0].value;

  expect(sourceValue).toEqual('react-magma-dom/dist/theme/GlobalStyles');
});

it('changes Icons import references to named imports', () => {
  const { ast } = babel.transform(iconsExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue = program.body[2].declarations[0].init.arguments[0].value;

  expect(sourceValue).toEqual(
    'react-magma-dom/dist/components/Icon/types/CheckIcon'
  );
});

it('changes default import references to Icons to named imports', () => {
  const { ast } = babel.transform(defaultIconsExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue1 = program.body[2].declarations[0].init.arguments[0].value;
  const sourceValue2 = program.body[3].declarations[0].init.arguments[0].value;

  expect(sourceValue1).toEqual(
    'react-magma-dom/dist/components/Icon/types/DeleteIcon'
  );
  expect(sourceValue2).toEqual(
    'react-magma-dom/dist/components/Icon/types/CheckIcon'
  );
});

it('changes named icon import references to their path', () => {
  const { ast } = babel.transform(namedIconsExample, {
    ast: true,
    plugins: [plugin]
  });

  const program = ast.program;
  const sourceValue = program.body[2].declarations[0].init.arguments[0].value;

  expect(sourceValue).toEqual(
    'react-magma-dom/dist/components/Icon/types/DeleteIcon'
  );
});

it('changes renamed import references to named imports', () => {
  const { ast } = babel.transform(renamedImportExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue = program.body[2].declarations[0].init.arguments[0].value;

  expect(sourceValue).toEqual('react-magma-dom/dist/components/Button');
});

it('changes inteface imports to reference the base component file', () => {
  const { ast } = babel.transform(interfaceExample, {
    ast: true,
    plugins: [plugin]
  });

  const program = ast.program;
  const sourceValue = program.body[2].declarations[0].init.arguments[0].value;

  expect(sourceValue).toEqual('react-magma-dom/dist/components/Button');
});

it('changes enum imports to reference the base component file', () => {
  const { ast } = babel.transform(enumExample, {
    ast: true,
    plugins: [plugin]
  });

  const program = ast.program;
  const sourceValue = program.body[2].declarations[0].init.arguments[0].value;

  expect(sourceValue).toEqual('react-magma-dom/dist/components/Button');
});
