const scalingo = require('../../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Projects.transferInvitations('project-id').find('invitation-id')
  })
  .then((invitation) => {
    console.log(invitation)
  })
  .catch((err) => {
    console.error(err)
  })
