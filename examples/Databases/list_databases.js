const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Databases.all()
  })
  .then((databases) => {
    console.log(databases)
  })
  .catch((err) => {
    console.error(err)
  })
