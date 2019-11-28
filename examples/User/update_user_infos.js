const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    const attributes = {
      company: 'Newest company',
      username: 'newest-username-1',
    }

    return client.Users.updateAccount(attributes)
  })
  .then((user) => {
    console.log(user)
  })
  .catch((e) => {
    console.log(e.message)
  })
