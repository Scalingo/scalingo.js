const scalingo = require('../../dist/scalingo.js')

scalingo
  .clientFromToken(process.env.SCALINGO_TOKEN)
  .then((client) => {
    // Use the database type ID (e.g., '5eea3324d6f2bd5a55e2aa9d')
    const databaseTypeId = process.env.DATABASE_TYPE_ID || '5eea3324d6f2bd5a55e2aa9d'
    return client.Databases.showDatabaseType(databaseTypeId)
  })
  .then((databaseType) => {
    console.log('Database Type Details:')
    console.log('  ID:', databaseType.id)
    console.log('  Name:', databaseType.name)
    console.log('  Logo URL:', databaseType.logo_url)
    console.log('  Short Description:', databaseType.short_description)
    console.log('  Description:', databaseType.description)
    console.log('  Created At:', databaseType.created_at)
    console.log('  Updated At:', databaseType.updated_at)
  })
  .catch((err) => {
    console.error(err)
  })
