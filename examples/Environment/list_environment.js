let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Environment.for("scalingo-js-tests")
}).then((domains) => {
  console.log(domains)
});
