const express = require('express')
const app = express()
const ip = process.env.IP || "0.0.0.0"
const port =  process.env.IP || 3000

bodyParser = require('body-parser').json();
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/par',bodyParser, function (req, res) {
  res.send(req.body);
  console.log(req.body);
})
app.listen(port)

console.log(`se escucha en el puerto ${port}` );