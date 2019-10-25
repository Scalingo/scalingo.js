const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Addons.create(
      'test-dashboard-ichkour',
      '57ee699585232200153dcb01',
      'scalingo-shared-filesystem',
    )
  })
  .then((addons) => {
    console.log(addons)
  })
  .catch((e) => {
    console.log(e.data.errors)
  })
