const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.TwoFactorAuth.disable()
  })
  .then(
    (tfa) => {
      console.log(tfa)
    },
    (e) => {
      console.log(e.data)
    },
  )
