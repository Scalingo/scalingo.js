const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    return client.Databases.listDatabaseTypes()
  })
  .then((databaseTypes) => {
    console.log('Database Types:')
    databaseTypes.forEach((type) => {
      console.log(`  - ${type.name} (${type.id})`)
      console.log(`    Logo: ${type.logo_url}`)
      console.log(`    Description: ${type.short_description}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
