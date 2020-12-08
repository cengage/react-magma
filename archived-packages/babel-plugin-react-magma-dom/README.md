# DEPRECATION NOTICE

---

- DO NOT BUILD OR INSTALL THIS PLUGIN
- This plugin is deprecated and is being retained here as a reference implementation
- it will be moved to a separate repo in the future, but for now, it should be ignored

---

## Contributing

### Dependencies

Node v10.x or greater with npm 6.1.x or greater

### Setup

1. Clone this repo:

```
git clone git@github.com:cengage/react-magma.git
```

2. Install the project's dependencies with the `npm ci` command

   <details>
     <summary>Why npm ci?</summary>

   Using `npm ci` instead of `npm install` will install dependencies based on `package-lock.json` so you will get specific package versions and it should also speed up the install.

   </details>

```sh
npm ci
```

### Resources

A good resource for learning how to write a babel-plugin can be found [here](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md).

### Making changes

The code for the project is in the `src/index.js` file. The easiest way to check changes locally is to create tests for what you are expecting to see changed. If you would like a live look while making changes you can use the [AST Explorer](https://astexplorer.net/) using `babylon 7` and the `babel 7` transform.

### Running tests

`npm run test` or `npm run test-watch` to run the test suite.

`npm run covg` to see the generated lcov coverage reports.

### Building

`npm run build`
