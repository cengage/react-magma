import _ from 'lodash';
import nodePlop, { ActionType } from 'node-plop';

const plop = nodePlop('plop-templates/plopfile.hbs');

interface Answers {
  componentName: string;
  description: string;
  useTheme: boolean;
  useI18n: boolean;
  useInverse: boolean;
  destinationDirectory: 'components' | 'patterns';
}

async function createPackage() {
  plop.setHelper('capitalize', (text: string) => {
    return _.capitalize(_.camelCase(text));
  });

  plop.setHelper('kebabCase', (text: string) => {
    return _.kebabCase(text);
  });

  plop.setGenerator('component', {
    description: 'Generates a component package',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'Enter component name:',
      },
      {
        type: 'input',
        name: 'description',
        message: 'The description of this component:',
      },
      {
        type: 'confirm',
        name: 'useTheme',
        message: 'Does this component use the theme:',
      },
      {
        type: 'confirm',
        name: 'useInverse',
        message: 'Does this component use an inverse mode:',
      },
      {
        type: 'confirm',
        name: 'useI18n',
        default: false,
        message: 'Does this component use i18n:',
      },
    ],
    actions(answers: any) {
      const actions: ActionType[] = [];

      if (!answers) return actions;

      const { componentName, description, useTheme, useI18n, useInverse } =
        answers as Answers;

      actions.push({
        type: 'addMany',
        templateFiles: 'component-pkg/**',
        destination:
          '../packages/react-magma-dom/src/components/{{capitalize componentName}}',
        base: 'component-pkg/',
        data: { description, componentName, useTheme, useI18n, useInverse },
        abortOnFail: true,
      });

      actions.push({
        type: 'add',
        path: '../website/react-magma-docs/src/pages/api/{{kebabCase componentName}}.mdx',
        templateFile: 'website/component.mdx.hbs',
        data: { description, componentName, useTheme, useI18n, useInverse },
        abortOnFail: true,
        force: true,
      });

      actions.push({
        type: 'append',
        path: '../packages/react-magma-dom/src/index.ts',
        template: "export * from './components/{{capitalize componentName}}'",
        unique: true,
      });

      return actions;
    },
  });

  const { runPrompts, runActions } = plop.getGenerator('component');

  const answers = await runPrompts();
  await runActions(answers);
}

async function run() {
  await createPackage();
}

run();
