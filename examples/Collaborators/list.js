let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Collaborators.for('ichbinkour')
}).then((collaborator) => {
  console.log(collaborator)
});
