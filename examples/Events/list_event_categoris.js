let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Events.listEventCategories()
}).then((events) => {
  console.log(events)
}).catch(e => {
  console.log("error", e)
})
