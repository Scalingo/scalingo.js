let scalingo = require('../../dist/scalingo.js');

client = new Scalingo.Client()

client.Tokens.exchange(process.env.SCALINGO_TOKEN).then((result) => {
  console.log(result)
})
