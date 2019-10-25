const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Apps.all()
  })
  .then((apps) => {
    console.log(apps)
  })
