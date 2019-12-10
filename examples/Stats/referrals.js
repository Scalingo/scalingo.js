const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Stats.referrals()
  })
  .then((stats) => {
    console.log(stats)
  })
