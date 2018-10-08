# React magma

## Getting started

_TODO: Add install instructions_

[React Magma Documentation](http://react-magma.apps.dev.cengage.io/)

## Contributing

### Dependencies

Node v8.9.4 or greater

### Steps to run documentation locally

1. Clone this repo: `git clone ssh://git@stash.corp.web:7999/front/react-magma.git`
2. `npm install`
3. `npm run docs`
4. Go to [http://localhost:3000](http://localhost:3000) to view the documentation

Note: If you get errors about a missing typescript module during step three, you may need to run `npm i -s -D typescript` from `packages/react-magma-native` and rerun the previous two commands.

### Committing code

In order to adhere to [SemVer](https://semver.org/), manage release channels (`latest`, `next`, `previous`, `x.x.x-beta.x`, etc.), automate the creation of a consistent changelog and eventually automate releases, our commit messages will follow [the conventional commit format](https://www.conventionalcommits.org/en/v1.0.0-beta.2/). This is enforced with a `commit-msg` hook via [Husky](https://github.com/typicode/husky) which also runs linting, prettier and tests prior to allowing a commit.

#### Commit format:

All commits will have a topic and short description with an optional subject.

There is a short version of the format that will pass the `commit-msg` check and a longer version for handling changes that need more explanation and for marking commits that contain breaking changes.

##### Short commit message format

```bash
#format - with subject
<topic>(<subject>): <short description>

#example - with subject
feat(button): Added icon capabilities to button

#format - no subject
<topic>: <short description>

#example - no subject
feat: Added icon capabilities to button
```

##### Long commit message format (with a breaking change)

```bash
#format
<type>(subject): <short description>

<optional body>

<optional footer>

#example
feat(button): Added icon capabilities to button

More verbose description of what was added with the icon feature of the button.

BREAKING CHANGE: description of what part of the API broke
```

##### Tooling

To facilitate getting the commit format right, you can create your commit messages with `npm run commit-changes`, which will step you through the individual parts of the commit message.

_TODO: add an image_
