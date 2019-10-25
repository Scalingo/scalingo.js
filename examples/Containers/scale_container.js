const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Containers.scale('test-dashboard-ichkour', [
      {
        name: 'web',
        size: 'M',
        amount: 1,
      },
    ])
  })
  .then(async (response) => {
    await response.operation.wait()
    console.log(response.operation.status)
    console.log(response.formation)
  })
  .catch((e) => {
    console.log(e)
  })
