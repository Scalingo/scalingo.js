const scalingo = require('../../dist/scalingo.js')

var client = client
scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((c) => {
    client = c
    return client.Deployments.for('sample-go-martini', { page: 3 })
  })
  .then(({ deployments, meta }) => {
    return client.Deployments.logs('sample-go-martini', deployments[0].id)
  })
  .then((logs) => {
    console.log(logs)
  })
