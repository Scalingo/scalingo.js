const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.TwoFactorAuth.status()
  })
  .then((tfa) => {
    console.log(tfa)
  })
