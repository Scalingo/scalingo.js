const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Billing.createProfile({
      name: 'name',
      address_line1: 'address_line1',
      address_zip: 'address_zip',
      address_city: 'address_city',
      address_country: 'FR',
    })
  })
  .then((profile) => {
    console.log(profile)
  })
  .catch((e) => {
    console.log(e.data)
  })
