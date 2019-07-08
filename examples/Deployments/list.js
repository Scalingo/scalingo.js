let scalingo = require('../../dist/scalingo.js');

var client = client;
scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Deployments.for("sample-python-celery", {page: 2})
}).then((deployments) => {
  console.log(deployments)
})
