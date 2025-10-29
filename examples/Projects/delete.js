const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Projects.delete('project-id')
  })
  .then(() => {
    console.log('Project deleted successfully')
  })
  .catch((err) => {
    console.error(err)
  })
