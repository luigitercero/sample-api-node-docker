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
- **-e** agregar variable de entorno
- **--rm** borrar el contenedor despues de matarlo
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
  res.send('Hello World' )
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
# Crear una Imagen a partir de un dockerfile

1) para crear un contenedor simple necesitamos crear un archivo docker file que contiene lo siguiente

```dockerfile
FROM node
WORKDIR /app
ADD . /app
RUN npm install
ENV PORT 3000
ENV IP "192.168.0.0"
CMD ["node","index.js"]
```

2) una vez creado esto modificamos el archivo index.js

```js
const express = require('express')
const app = express()
const ip = process.env.IP || "0.0.0.0"
const port =  process.env.PORT || 3000

bodyParser = require('body-parser').json();
app.get('/', function (req, res) {
  res.send(`kas variable de entorno son port: ${port} y ip ${ip}`)
})
app.get('/par',bodyParser, function (req, res) {
  res.send(req.body);
  console.log(req.body);
})
app.listen(port)

console.log(`se escucha en el puerto ${port}`);
```
3) al estar preparados podemos crear nuestra primera imagen para un contenedor 

```bash
docker build -t mi-primera-api .
```

4) la ejecutamos en la terminal

```bash
docker run -d -p 3000:3001 --name mi-api --rm -e PORT=3001 -e IP="192.18.35.1" mi-primera-api 
```
nos dirigimos nuestro navegador y localhost:3000
5) ver la ip de un container

```
docker inspect --format '{{ .NetworkSettings.IPAddress }}' ${CID}
```
## matar un contariner
  ```
  docker kill <nombredelcontainer>
  ```
# Crear una Imagen a partir de un contenedor (no recomendado)

al crear nuestro entorno de desarrollo podemos matar contenedores 

```bash
docker kill <NAMEContainer>
```
al matarlo y no usar la bander --rm podemos ver que el contenedor sigue existiendo con

```bash
docker ps -a
```
podemos observar que nos muestra una serie de columnas, lo unico que debemos hacer es 

```bash
docker commit <columnaNames> <nombreDeLAnuevaImangen>
docker commit mi-api holagg
```

```bash
docker images
```
y podemos ver la nueva imagen holagg con todo el desarrollo que agregamos 


# ejecutar una base de dato 

```bash
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=123456789 -d my-mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-authentication-plugin=mysql_native_password
```



