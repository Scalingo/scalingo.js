let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Collaborators.destroy('ichbinkour', 'put-collaborator-id-here')
}).then((collaborator) => {
  console.log(collaborator)
});
