const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Addons.getAddon(
      'test-dashboard-ichkour',
      'ad-19cacddb-5963-4909-8d88-a5c613a296b0',
    )
  })
  .then((addons) => {
    console.log(addons)
  })
  .catch((e) => {
    console.log(e.data)
  })
