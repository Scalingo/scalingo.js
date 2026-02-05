const scalingo = require('../../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Projects.transferInvitations('project-id').all()
  })
  .then((invitations) => {
    console.log(invitations)
  })
  .catch((err) => {
    console.error(err)
  })
