# Como Crear una API en Node js en docker

1) para empezar debemos construir un contenedor con lo necesario para trabajar.
2) debemos crear un ambiente de desarrollo en docker con nodejs
```bash
docker pull node
```
3) para poder trabajar con el contenedor en un ambiente de desarrollo podemos utilizar el comando -v para poder compartir carpetas


```bash
docker run -it  -v <carpetaDeAPI>:<cualquierCarpetaDocker> --name<nombreParaIdentificarContenedor> -p <puertoLocal>:<PuertoAxponer> node bash

```
- **-d** correr el contenedor en modo demonio (segundo plano)
- **-v** crear un carpeta compartida
- **-p** mapear puerto
- **-it** agregar un script de consola al iniciar el contenedor
***ejemplo*** 

```bash
docker run -it -v ~/Documents/APIREST:/App --name api-node -p 3000:3000 node bash
```
ahora podemos trabajar desde nuestro ide favorito

4) una vez que nos encontremos en el contenedor podemos inicializar nuestro proyecto

```bash
cd App
npm init
```
5) agregamos el script start a nuestro archivo json

```json
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "author": "Luis",
  "license": "ISC"
}
```

6) creamos un archivo index.js y agregamos un saludo y luego lo ejecutamos
```js
console.log("hola");
```
```bash
npm start
```
7) instalamos express 
```bash
npm i express 
```
8) al archivo index agregamos lo siguiente para crear nuestra primera api

```js
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

```

con esto podemos entrar a nuestro navegador y dirigirnos a localhost:3000

9) en postman podemos enviar una peticion a localhost:3000/par y en raw 

```json
{
  "test": "yay"
}
```
