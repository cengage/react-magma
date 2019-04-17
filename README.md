# React magma

## Getting started

### Installation

Make sure you have a `.npmrc` file and are using http://nexus.mindtap.corp.web/content/groups/npm.group/ as your registry.

`npm i react-magma-dom`

### Babel Plugin

There is a custom babel plugin that we have created as well that will help with optimization. For this install using `npm i babel-plugin-react-magma-dom`

In your `babel.config.js` file add `react-magma-dom` to your `plugins` array.

Ex File: `module.exports = { presets: [ '@babel/preset-react', ], plugins: [ 'react-magma-dom', ] };`

This plugin will go through all of your `react-magma-dom` imports and get rid of any unnecessary imports. This will allow webpack to only put the necessary dependencies in your projects final build.

### Documentation

We have a documentation site that show all of the available components, usage of the components, and design guidlines from the UX team for how to use them in your project.

[React Magma Documentation](http://react-magma.apps.dev.cengage.io/)

## Contributing

### Dependencies

Node v8.9.4 or greater with npm 5.7.0 or greater

### Steps to run documentation locally

1. Clone this repo: `git clone ssh://git@stash.corp.web:7999/front/react-magma.git`
2. `npm ci` - using `ci` instead of `install` will install dependencies based on `package-lock.json` and should speed up the install
3. `npm run docs`
4. Go to [http://localhost:3000](http://localhost:3000) to view the documentation

Note: If you get errors about a missing typescript module during step three, you may need to run `npm i -s -D typescript` from `packages/react-magma-native` and rerun the previous two commands.

### Making changes

The code for the project is in one of two folders under the `packages` folder: `react-magma-core` and `react-magma-dom`

#### react-magma-core

This is our project for handling our business logic. This includes lifecycle events, state handling, event handling, etc.

##### Running tests

`npm run test` or `npm run test-watch` to run the test suite.

`npm run covg` to see the generated lcov coverage reports.

##### Building

Once you have finished making your code changes and have tested your changes run `npm run build`. Once you have done this you will immediately be able to see the changes in the `react-magma-dom` package because they are symlinked by default.

#### react-magma-dom

This is our project for the rendering of our components.

##### Running tests

`npm run test` or `npm run test-watch` to run the test suite.

`npm run covg` to see the generated lcov coverage reports.

##### Building

Once you have finished making your code changes and have tested your changes run `npm run build`. Once you have done this you will immediately be able to see the changes in the `react-magma-gatsby-docs` package because they are symlinked by default.

#### End to End Testing

We use `cypress` to create our e2e tests.

##### Running

Start the webpack server using `npm start`. Then, in another terminal window, start up the cypress ui using `npm run test-local`.

##### Create a test

All of the components are found in the `App.js` file. If you have a new component be sure to import it here and add it to the render.

Test files are under the `cypress/integration` folder.

#### react-magma-gatsby-docs

This is our project for the documentation site. Any changes to the usage of our components or the creation of new components should be documented here.

Each component has it's own `.mdx` file. If you have created a new component you will need to create a new `.mdx` file under the `pages/api` folder. To import your new component go to the `layout.js` file, import your new component, then add it to the `scope` prop array of the `LiveProvider`. Now you are able to use the component in your newly created `.mdx` file.

Be sure to add in the navigation details at the top of the page

```
---
title: '{ComponentName}'
order: 2
---
```

and import a link to the design guidlines with the correct route

```
import DocsHeading from '../../components/docs-heading'

<DocsHeading to="/design/{component}/" type="design">
  {ComponentName}
</DocsHeading>
```

##### Running

`npm run develop` then go to [http://localhost:8000](http://localhost:8000)

### Committing code

In order to adhere to [SemVer](https://semver.org/), manage release channels (`latest`, `next`, `previous`, `x.x.x-beta.x`, etc.), automate the creation of a consistent changelog and eventually automate releases, our commit messages will follow [the conventional commit format](https://www.conventionalcommits.org/en/v1.0.0-beta.2/). This is enforced with a `commit-msg` hook via [Husky](https://github.com/typicode/husky) which also runs linting, prettier and tests prior to allowing a commit.

#### Commit format:

All commits will have a topic and short description with an optional subject.

There is a short version of the format that will pass the `commit-msg` check and a longer version for handling changes that need more explanation and for marking commits that contain breaking changes.

**TL;DR: It's a good idea to understand the commit message format, but there is a script in place that will walk you through this to make it easier to adhere to this commit format. see the "Tooling" heading below**

##### Commit message components:

- type (required)
- subject
- description (required)
- body
- footer (required _if_ there are breaking changes)

###### Types

The type is key in determining how to bump the version number in the next version number change. Available types are:

- `feat` - commit adds a new feature
- `fix` - commit fixes a bug
- `docs` - commit changes documentation only
- `test` - commit adds missing tests or corrects existing tests
- `refactor` - commit only has refactoring, code has changed but behavior and tests retain original functionality
- `perf` - like refactor, but the focus is on performance
- `build` - changes that affect the build system or external dependencies
- `ci` - commit changes CI configuration files
- `revert` - reverts a previous commit
- `style` - Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `chore` - other changes that don't modify source or test files

###### Subject

The subject is an optional identifier. For example, if adding a new feature to a `Modal` component, you might use `modal` as your subject to provide context.

###### Description

Short description of the commit. The `commitlint` rules enforce a max length of 72 characters for the header, which is made up of the type, subject and description, along with the added characters to match the commit format, for example: `feat(modal):added support for closing via esc key`

###### Body

If the short description isn't enough to cover the details of your change, you can add more text in the body to expand on what the commit does and provide all the details you want.

###### Footer

The footer is where you designate a breaking change. So if you add a feature and that necessitates breaking changes to the existing API, you would use `feat` for the type and in the footer, you would add `BREAKING CHANGE: description of the breaking change`

##### Short commit message format

```bash
#format - with subject
git commit -m "<topic>(<subject>): <short description>"

#example - with subject
git commit -m "feat(button): Added icon capabilities to button"

#format - no subject
git commit -m "<topic>: <short description>"

#example - no subject
git commit -m "feat: Added icon capabilities to button"
```

##### Long commit message format (with a breaking change)

```bash
#format
git commit -m "<type>(subject): <short description>

<optional body>

<optional footer>"

#example
git commit -m "feat(button): Added icon capabilities to button

More verbose description of what was added with the icon feature of the button.

BREAKING CHANGE: description of what part of the API brakes with this commit"
```

##### Tooling

To facilitate getting the commit format right, you can create your commit messages by adding the files you want to commit with `git add <files>` then by running `npm run cm`, which will step you through the individual parts of the commit message.

###### Selecting a topic from the predefined list

![running npm run cm shows the topic selector screen for commitizen](./readme_assets/commitizen_topic.png)

###### Walking through the remaining questions

![commitizen guides you through entering scope, description, optional body and footer by prompting yes or no for breaking changes](./readme_assets/commitizen_scope_thru_end.png)

###### The resulting commit produced by the wizard

![the resulting commit produced by commitizen](./readme_assets/commitizen_resulting_commit.png)

###### Retry

If the `pre-commit` scripts prevent your commit due to a test or linting failure, you can fix those items, `git add` those updates and rather than going through the commit message wizard again, you can retry with `npm run cm-retry`.
