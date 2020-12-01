# Scalingo.js
[![Build Status](https://travis-ci.org/Scalingo/scalingo.js.svg?branch=master)](https://travis-ci.org/Scalingo/scalingo.js)
[![Documentation](https://scalingo.github.io/scalingo.js/badge.svg)](https://scalingo.github.io/scalingo.js/)

The Scalingo.js library provides convenient access to the Scalingo API. A
documentation is [available
online](https://scalingo.github.io/scalingo.js/)

Note: 0.2.0 is a breaking change from previous versions.

## Usage

The package needs to be configured with your a token which are available in your Scalingo [dashboard](https://my.scalingo.com/profile).

```js
const scalingo = require('scalingo')

scalingo.clientFromToken("tk-us-...").then(function(client) {
  return client.Users.self()
}).then(function(user) {
  console.log(user)
})
```

Or using ES modules, this looks more like:

```js
import Scalingo from 'scalingo'

let client = await Scalingo.clientFromToken("tk-us-...")
let user = await client.Users.self()
console.log(user)
```

## Examples

A bunch of examples are available in the `examples` folder to show how to use
scalingo.js library. In order to execute them, you need to define the
environment variable `SCALINGO_TOKEN`. The token can be created in Scalingo
[dashboard](https://my.scalingo.com/profile). Then modify the example so that
the application name and the possible IDs match one of your application.
Eventually execute the example with:

```bash
export SCALINGO_TOKEN="tk-us-...."
node examples/Addons/add_addon.js
```

## Development

### Release a new version

```bash
# If it's a patch (see https://docs.npmjs.com/cli/version.html)
npm version patch
git push --tags
git push origin master
```
