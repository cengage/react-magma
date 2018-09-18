#  React magma

## Dependencies
1. Node v8.9.4 or greater
2. Lerna: `npm install --global lerna`

## Steps to run documentation locally

1. Clone this repo
2. `lerna bootstrap`
3. `lerna run build`
4. `npm run docs`
5. Go to localhost:3000 to view the documentation

Note:  If you get errors about a missing typescript module during step three, you may need to run `npm i -s -D typescript` from `packages/react-magma-native` and rerun the previous two commands.
