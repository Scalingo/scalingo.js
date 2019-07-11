let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Addons.destroy("test-dashboard-ichkour", "ad-2fd80d14-a6e7-4c85-9c12-09691cf96a6d")
}).then((addons) => {
  console.log(addons)
}).catch(e => {
  console.log(e.data)
});
