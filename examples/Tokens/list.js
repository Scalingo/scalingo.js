const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Tokens.list()
  })
  .then((tokens) => {
    console.log(tokens)
  })
