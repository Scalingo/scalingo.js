let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Containers.availableSizes()
}).then((attributes) => {
  console.log(attributes)
});
