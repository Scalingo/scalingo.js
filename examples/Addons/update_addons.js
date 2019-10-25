const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Addons.update(
      'test-dashboard-ichkour',
      'ad-2fd80d14-a6e7-4c85-9c12-09691cf96a6d',
      { plan_id: '5c2e0a743e6b3b001393effc' },
    )
  })
  .then((addons) => {
    console.log(addons)
  })
  .catch((e) => {
    console.log(e.data)
  })
