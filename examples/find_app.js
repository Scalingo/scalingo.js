let scalingo = require('../dist/scalingo.js')

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Apps.find("sample-go-martini")
}).then((app) => {
  console.log(app)
})
