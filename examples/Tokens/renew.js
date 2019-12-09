const readline = require('readline')
const scalingo = require('../../dist/scalingo.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Tokens.list()
      .then((tokens) => {
        console.log(tokens)

        return new Promise((resolve) => {
          rl.question('> Enter the id of the token to renew: ', (answer) => {
            rl.close()
            resolve(answer)
          })
        })
      })
      .then((answer) => {
        return client.Tokens.renew(answer)
      })
  })
  .then((tokens) => {
    console.log(tokens)
  })
  .catch((e) => {
    console.log(e.data)
  })
