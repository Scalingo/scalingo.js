# Scalingo.js

The Scalingo.js library provides convenient access to the Scalingo API.

## Usage

The package needs to be configured with your a token which are available in your Scalingo [Dashboard](https://my.scalingo.com/profile).

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
