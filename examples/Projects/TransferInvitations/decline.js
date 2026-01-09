const scalingo = require('../../../dist/scalingo.js')

const projectId = process.env.PROJECT_ID
const invitationId = process.env.INVITATION_ID

if (!projectId || !invitationId) {
  console.error('PROJECT_ID and INVITATION_ID environment variables are required')
  process.exit(1)
}

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Projects.transferInvitations(projectId).decline(invitationId)
  })
  .then((invitation) => {
    console.log('Declined transfer invitation:')
    console.log(invitation)
  })
  .catch((err) => {
    console.error(err)
  })
