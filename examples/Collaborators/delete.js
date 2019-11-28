const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Collaborators.destroy(
      'ichbinkour',
      '5d2c637ffb0de6000f0bac11',
    )
  })
  .then((collaborator) => {
    console.log(collaborator)
  })
