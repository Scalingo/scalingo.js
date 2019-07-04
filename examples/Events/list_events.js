let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Events.for("test-dashboard-ichkour", null, {page: 4, per_page: 10})
}).then((events) => {
  console.log(events)
}).catch(e => {
  console.log("error", e)
})
