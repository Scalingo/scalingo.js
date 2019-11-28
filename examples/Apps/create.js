const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Apps.create('john-test-scalingojs', { dry_run: true })
  })
  .then((app) => {
    console.log(app)
  })
