require('url')
const readline = require('readline')
const scalingo = require('../../dist/scalingo.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.TwoFactorAuth.status()
      .then(() => {
        return client.TwoFactorAuth.initiate()
      })
      .then((tfa) => {
        const url = new URL(tfa.uri)
        console.log('Enter the TOTP secret in your auth client.')
        console.log('You will get a number necessary to finish the process.')
        console.log('\n')
        console.log('TOTP Secret:\t' + url.searchParams.get('secret'))
        console.log('\n')

        return new Promise((resolve) => {
          rl.question('Enter the pin number: ', (answer) => {
            rl.close()
            resolve(answer)
          })
        })
      })
      .then((attempt) => {
        return client.TwoFactorAuth.validate(attempt)
      })
  })
  .then(
    (tfa) => {
      console.log(tfa)
    },
    (e) => {
      console.log(e.data)
    },
  )
