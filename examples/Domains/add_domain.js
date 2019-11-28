const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Domains.create('scalingo-js-tests', { name: 'te.eplzzze' })
  })
  .then((domains) => {
    console.log(domains)
  })
