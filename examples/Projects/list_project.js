const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Projects.all()
  })
  .then((projects) => {
    console.log(projects)
  })
  .catch((err) => {
    console.error(err)
  })
