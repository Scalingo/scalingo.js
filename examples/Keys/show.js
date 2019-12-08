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
      rl.question('> Enter the id of the key: ', (answer) => {
        rl.close()
        resolve(answer)
      })
    }).then((id) => {
      return client.Keys.show(id)
    })
  })
  .then(
    (key) => {
      console.log(key)
    },
    (e) => {
      console.log(e.data)
    },
  )
