const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Logs.archives('sample-go-martini')
  })
  .then((archives) => {
    console.log(archives)
  })
