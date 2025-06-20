const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Projects.find('project-uuid')
  })
  .then((project) => {
    console.log(project)
  })
  .catch((err) => {
    console.error(err)
  })
