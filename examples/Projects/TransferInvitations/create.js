const scalingo = require('../../../dist/scalingo.js')

const projectId = process.env.PROJECT_ID
const invitedUserId = process.env.INVITED_USER_ID

if (!projectId || !invitedUserId) {
  console.error('PROJECT_ID and INVITED_USER_ID environment variables are required')
  process.exit(1)
}

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Projects.transferInvitations(projectId).create({
      invited_user_id: invitedUserId,
    })
  })
  .then((invitation) => {
    console.log('Created transfer invitation:')
    console.log(invitation)
  })
  .catch((err) => {
    console.error(err)
  })
