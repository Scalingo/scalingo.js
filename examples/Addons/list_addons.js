const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Addons.for('test-dashboard-ichkour')
  })
  .then((addons) => {
    console.log(addons)
  })
