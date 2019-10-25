const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    //return client.Metrics.get('scalingo-api-production', 'router')
    return client.Metrics.types()
  })
  .then((metrics) => {
    console.log(metrics)
  })
