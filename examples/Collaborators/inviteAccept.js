const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Collaborators.inviteAccept(
      '4c31adc89f46bb61f87f22268c93c8db48106e2e',
    )
  })
  .then((application) => {
    console.log(application)
  })
  .catch((e) => {
    console.log(e.data)
  })
