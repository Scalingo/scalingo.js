const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Collaborators.invite(
      'ichbinkour',
      'valentin.ichkour68210@gmail.com',
    )
  })
  .then((collaborator) => {
    console.log(collaborator)
  })
