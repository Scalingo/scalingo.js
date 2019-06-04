let scalingo  = require('../../dist/scalingo')

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Operations.operation("test-dashboard-ichkour", "5cee3b18fb0de6000ec68051")
}).then(response => {
  console.log("response", response)
}).catch(e => {
  console.log(e)
})
