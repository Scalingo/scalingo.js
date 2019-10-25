const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Containers.restart('test-dashboard-ichkour', ['web'])
  })
  .then(async (response) => {
    console.log(await response.operation.refresh())
    await response.operation.wait()
  })
  .catch((e) => {
    console.log('error', e)
  })
