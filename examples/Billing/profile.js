const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Billing.profile()
  })
  .then((profile) => {
    console.log(profile)
  })
  .catch((e) => {
    console.log(e.data)
  })
