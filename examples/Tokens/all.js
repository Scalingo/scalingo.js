const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Tokens.all()
  })
  .then((tokens) => {
    console.log(tokens)
  })
