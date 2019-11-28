const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Features.containerSizes()
  })
  .then((containerSizes) => {
    console.log(containerSizes)
  })
  .catch((e) => {
    console.log('error', e)
  })
