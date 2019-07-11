let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Collaborators.for('sample-python-celery')
}).then((attributes) => {
  console.log(attributes)
});
