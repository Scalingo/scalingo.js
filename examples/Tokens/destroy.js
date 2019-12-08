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
          rl.question('> Enter the id of the token to destroy: ', (answer) => {
            rl.close()
            resolve(answer)
          })
        })
      })
      .then((answer) => {
        return client.Tokens.destroy(answer)
      })
  })
  .then(() => {
    console.log('Destroyed.')
  })
  .catch((e) => {
    console.log(e.data)
  })
