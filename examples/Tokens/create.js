const readline = require('readline')
const scalingo = require('../../dist/scalingo.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return new Promise((resolve) => {
      rl.question(
        "> Enter the name of the token to create (if blank, 'test' will be used): ",
        (answer) => {
          rl.close()
          resolve(answer)
        },
      )
    }).then((name) => {
      return client.Tokens.create(name || 'test')
    })
  })
  .then((token) => {
    console.log(token)
  })
