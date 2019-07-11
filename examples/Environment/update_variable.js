let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Environment.update("scalingo-js-tests", "5cc8370800de8f000f81c002", "$SCALINGOJS")
}).then((domains) => {
  console.log(domains)
});
