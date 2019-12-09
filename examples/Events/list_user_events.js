const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Events.all()
  })
  .then((events) => {
    console.log(events)
  })
  .catch((e) => {
    console.log(e.data)
  })
