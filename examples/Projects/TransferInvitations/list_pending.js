const scalingo = require('../../../dist/scalingo.js')

const projectId = process.env.PROJECT_ID

if (!projectId) {
  console.error('PROJECT_ID environment variable is required')
  process.exit(1)
}

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Projects.transferInvitations(projectId).all({ status: 'pending' })
  })
  .then((invitations) => {
    console.log('Pending transfer invitations:')
    console.log(invitations)
  })
  .catch((err) => {
    console.error(err)
  })
