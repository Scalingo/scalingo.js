let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Containers.restart("test-dashboard-ichkour", ["web"])
}).then((response) => {
  console.log(response)
}).catch(e => {
  console.log(e.data)
});
