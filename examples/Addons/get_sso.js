let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Addons.sso("test-dashboard-ichkour", "ad-2ccd85e9-da30-4aff-9d8d-bacb7756924a")
}).then((sso) => {
  console.log(sso)
}).catch(e => {
  console.log(e.data)
});
