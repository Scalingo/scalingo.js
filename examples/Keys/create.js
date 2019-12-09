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
      rl.question('> Enter the name of the key: ', (answer) => {
        resolve(answer)
      })
    })
      .then((name) => {
        return new Promise((resolve) => {
          rl.question(
            '> Enter the content of the key (ie. content of ~/.ssh/id_rsa.pub): ',
            (answer) => {
              rl.close()
              resolve({ name, content: answer })
            },
          )
        })
      })
      .then(({ name, content }) => {
        return client.Keys.create(name, content)
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
