const scalingo = require('../../dist/scalingo')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Environment.bulkDestroy('scalingo-js-tests', [
      '5cc85815fb0de6000e55f6f2',
      '5cc85815fb0de6000e55f6f1',
    ])
  })
  .then((domains) => {
    console.log(domains)
  })
  .catch((e) => {
    console.log(e)
  })
