let scalingo = require('../../dist/scalingo.js');

scalingo.clientFromToken(process.env.SCALINGO_TOKEN).then((client)=>{
  return client.Addons.for("sample-meteor-todo")
}).then((addons) => {
  console.log(addons)
});
