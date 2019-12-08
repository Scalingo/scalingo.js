const readline = require('readline')
const scalingo = require('../../dist/scalingo.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Keys.all().then((keys) => {
      console.log(keys)
      console.log('\n')

      return new Promise((resolve) => {
        rl.question('> Enter the id of the key to destroy: ', (answer) => {
          rl.close()
          resolve(answer)
        })
      }).then((id) => {
        return client.Keys.destroy(id)
      })
    })
  })
  .then(
    (key) => {
      console.log('destroyed')
    },
    (e) => {
      console.log(e.data)
    },
  )
