const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Keys.all()
  })
  .then((keys) => {
    console.log(keys)
  })
