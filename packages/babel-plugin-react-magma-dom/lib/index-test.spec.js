"use strict";

var babel = require('@babel/core');

var plugin = require('.');

var combinationExample = "\n  import * as React from 'react';\n  import {\n    Button,\n    Heading,\n    Icons as RenamedIcons,\n    Radio as MyRadio\n  } from 'react-magma-dom';\n  import * as Magma2 from 'react-magma-dom';\n  import Magma from 'react-magma-dom';\n\n  export class Example extends React.Component {\n    render() {\n      const icon = <RenamedIcons.DeleteIcon />;\n      const MyIcon = RenamedIcons.ArrowIcon;\n      const NestedIcon = Magma2.Icons.ArrowLeftIcon;\n      return (\n        <>\n          <Button />\n          <Magma.Checkbox />\n          <Magma.Icons.FakeIcon />\n          <Magma2.Input prop={prop} />\n          <Magma2.Blah />\n          <RenamedIcons.CheckIcon />\n          <MyIcon />\n          <Magma2.Icons.ArrowRightIcon />\n\n          <MyRadio />\n        </>\n      );\n    }\n  }\n";
var namedExample = "\n  import { Button, Heading } from 'react-magma-dom'\n";
var defaultImportExample = "\n  import Magma from 'react-magma-dom'\n\n  export class Example extends React.Component {\n    render() {\n      const Button = Magma.Button\n      return (\n        <div>\n          <Magma.Input />\n          <Button />\n        </div>\n      );\n    }\n  }\n";
var defaultNamespaceExample = "\n  import * as Magma from 'react-magma-dom'\n\n  export class Example extends React.Component {\n    render() {\n      const Button = Magma.Button\n      return (\n        <div>\n          <Magma.Input />\n          <Button />\n        </div>\n      );\n    }\n  }\n";
var globalStylesExample = "\n  import { GlobalStyles } from 'react-magma-dom'\n\n  export class Example extends React.Component {\n    render() {\n      return (\n        <div>\n          <GlobalStyles />\n        </div>\n      );\n    }\n  }\n";
var iconsExample = "\n  import { Icons } from 'react-magma-dom'\n\n  export class Example extends React.Component {\n    render() {\n      return (\n        <div>\n          <Icons.CheckIcon />\n        </div>\n      );\n    }\n  }\n";
var defaultIconsExample = "\n  import * as Magma from 'react-magma-dom'\n\n  export class Example extends React.Component {\n    render() {\n      const DeleteIcon = Magma.Icons.DeleteIcon\n      return (\n        <div>\n          <Magma.Icons.CheckIcon />\n          <DeleteIcon />\n        </div>\n      );\n    }\n  }\n";
var renamedImportExample = "\n  import { Button as MyButton } from 'react-magma-dom'\n\n  export class Example extends React.Component {\n    render() {\n      return (\n        <div>\n          <MyButton />\n        </div>\n      );\n    }\n  }\n";
it('handles a combination of imports and use cases', function () {
  var _babel$transform = babel.transform(combinationExample, {
    plugins: [plugin]
  }),
      code = _babel$transform.code;

  expect(code).toMatchSnapshot();
});
it('rewrites the named imports', function () {
  var _babel$transform2 = babel.transform(namedExample, {
    ast: true,
    plugins: [plugin]
  }),
      ast = _babel$transform2.ast;

  var program = ast.program;
  var sourceValue1 = program.body[0].declarations[0].init.arguments[0].value;
  var sourceValue2 = program.body[1].declarations[0].init.arguments[0].value;
  expect(sourceValue1).toEqual('react-magma-dom/dist/components/Button');
  expect(sourceValue2).toEqual('react-magma-dom/dist/components/Heading');
});
it('changes default import reference to named imports', function () {
  var _babel$transform3 = babel.transform(defaultImportExample, {
    ast: true,
    plugins: [plugin]
  }),
      ast = _babel$transform3.ast;

  var program = ast.program;
  var sourceValue1 = program.body[2].declarations[0].init.arguments[0].value;
  var sourceValue2 = program.body[3].declarations[0].init.arguments[0].value;
  expect(sourceValue1).toEqual('react-magma-dom/dist/components/Button');
  expect(sourceValue2).toEqual('react-magma-dom/dist/components/Input');
});
it('changes default namespace import reference to named imports', function () {
  var _babel$transform4 = babel.transform(defaultNamespaceExample, {
    ast: true,
    plugins: [plugin]
  }),
      ast = _babel$transform4.ast;

  var program = ast.program;
  var sourceValue1 = program.body[2].declarations[0].init.arguments[0].value;
  var sourceValue2 = program.body[3].declarations[0].init.arguments[0].value;
  expect(sourceValue1).toEqual('react-magma-dom/dist/components/Button');
  expect(sourceValue2).toEqual('react-magma-dom/dist/components/Input');
});
it('changes GlobalStyles to import from the theme folder', function () {
  var _babel$transform5 = babel.transform(globalStylesExample, {
    ast: true,
    plugins: [plugin]
  }),
      ast = _babel$transform5.ast;

  var program = ast.program;
  var sourceValue = program.body[2].declarations[0].init.arguments[0].value;
  expect(sourceValue).toEqual('react-magma-dom/dist/theme/GlobalStyles');
});
it('changes Icons import references to named imports', function () {
  var _babel$transform6 = babel.transform(iconsExample, {
    ast: true,
    plugins: [plugin]
  }),
      ast = _babel$transform6.ast;

  var program = ast.program;
  var sourceValue = program.body[2].declarations[0].init.arguments[0].value;
  expect(sourceValue).toEqual('react-magma-dom/dist/components/Icons/type/CheckIcon');
});
it('changes default import references to Icons to named imports', function () {
  var _babel$transform7 = babel.transform(defaultIconsExample, {
    ast: true,
    plugins: [plugin]
  }),
      ast = _babel$transform7.ast;

  var program = ast.program;
  var sourceValue1 = program.body[2].declarations[0].init.arguments[0].value;
  var sourceValue2 = program.body[3].declarations[0].init.arguments[0].value;
  expect(sourceValue1).toEqual('react-magma-dom/dist/components/Icons/type/DeleteIcon');
  expect(sourceValue2).toEqual('react-magma-dom/dist/components/Icons/type/CheckIcon');
});
it('changes renamed import references to named imports', function () {
  var _babel$transform8 = babel.transform(renamedImportExample, {
    ast: true,
    plugins: [plugin]
  }),
      ast = _babel$transform8.ast;

  var program = ast.program;
  var sourceValue = program.body[2].declarations[0].init.arguments[0].value;
  expect(sourceValue).toEqual('react-magma-dom/dist/components/Button');
});