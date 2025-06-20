const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Projects.create({ name: 'test-project', default: false })
  })
  .then((project) => {
    console.log(project)
  })
  .catch((err) => {
    console.error(err)
  })
