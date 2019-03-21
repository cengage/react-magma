const babel = require("@babel/core");
const plugin = require(".");

const combinationExample = `
  import * as React from 'react';
  import {
    Button,
    Heading,
    Icons as RenamedIcons,
    Radio as MyRadio
  } from 'react-magma-dom';
  import * as Magma2 from 'react-magma-dom';
  import Magma from 'react-magma-dom';

  export class Example extends React.Component {
    render() {
      const icon = <RenamedIcons.DeleteIcon />;
      const MyIcon = RenamedIcons.ArrowIcon;
      const NestedIcon = Magma2.Icons.ArrowLeftIcon;
      return (
        <>
          <Button />
          <Magma.Checkbox />
          <Magma.Icons.FakeIcon />
          <Magma2.Input prop={prop} />
          <Magma2.Blah />
          <RenamedIcons.CheckIcon />
          <MyIcon />
          <Magma2.Icons.ArrowRightIcon />

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

const iconsExample = `
  import { Icons } from 'react-magma-dom'

  export class Example extends React.Component {
    render() {
      return (
        <div>
          <Icons.CheckIcon />
        </div>
      );
    }
  }
`;

const defaultIconsExample = `
  import * as Magma from 'react-magma-dom'

  export class Example extends React.Component {
    render() {
      const DeleteIcon = Magma.Icons.DeleteIcon
      return (
        <div>
          <Magma.Icons.CheckIcon />
          <DeleteIcon />
        </div>
      );
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

it("works", () => {
  const { code } = babel.transform(combinationExample, { plugins: [plugin] });
  expect(code).toMatchSnapshot();
});

it("rewrites the named imports", () => {
  const { ast } = babel.transform(namedExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue1 = program.body[0].declarations[0].init.arguments[0].value;
  const sourceValue2 = program.body[1].declarations[0].init.arguments[0].value;

  expect(sourceValue1).toEqual("react-magma-dom/lib/Button");
  expect(sourceValue2).toEqual("react-magma-dom/lib/Heading");
});

it("changes default import reference to named imports", () => {
  const { ast } = babel.transform(defaultImportExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue1 = program.body[2].declarations[0].init.arguments[0].value;
  const sourceValue2 = program.body[3].declarations[0].init.arguments[0].value;

  expect(sourceValue1).toEqual("react-magma-dom/lib/Button");
  expect(sourceValue2).toEqual("react-magma-dom/lib/Input");
});

it("changes default namespace import reference to named imports", () => {
  const { ast } = babel.transform(defaultNamespaceExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue1 = program.body[2].declarations[0].init.arguments[0].value;
  const sourceValue2 = program.body[3].declarations[0].init.arguments[0].value;

  expect(sourceValue1).toEqual("react-magma-dom/lib/Button");
  expect(sourceValue2).toEqual("react-magma-dom/lib/Input");
});

it("changes Icons import references to named imports", () => {
  const { ast } = babel.transform(iconsExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue = program.body[2].declarations[0].init.arguments[0].value;

  expect(sourceValue).toEqual("react-magma-dom/lib/Icons/type/CheckIcon");
});

it("changes default import references to Icons to named imports", () => {
  const { ast } = babel.transform(defaultIconsExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue1 = program.body[2].declarations[0].init.arguments[0].value;
  const sourceValue2 = program.body[3].declarations[0].init.arguments[0].value;

  expect(sourceValue1).toEqual("react-magma-dom/lib/Icons/type/DeleteIcon");
  expect(sourceValue2).toEqual("react-magma-dom/lib/Icons/type/CheckIcon");
});

it("changes renamed import references to named imports", () => {
  const { ast } = babel.transform(renamedImportExample, {
    ast: true,
    plugins: [plugin]
  });
  const program = ast.program;
  const sourceValue = program.body[2].declarations[0].init.arguments[0].value;

  expect(sourceValue).toEqual("react-magma-dom/lib/Button");
});
