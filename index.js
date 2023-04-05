//Importacion de modulos necesatios para el APIREST
const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

// Importar los middlewares
const { logErrors, errorHandler, boomErrorHandler } = require('./Middlewares/errorHandler');

// Constante para el uso de express JS
const app = express();
// Asignacion de nuestro servidor
const port = process.env.PORT || 3001;
const ipLan = '192.168.20.29';

// MiddleWare para poder recibir json como en la creacion POST
app.use(express.json());


// Peticion Get en la cual es nuestra pagina raiz
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

// Conexion entre el index.js de routes con el index.js nativo
routerApi(app);

// Middleware para procesar los cors
const whiteList = ['https://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Dominio no permitido'));
    }
  }
}
app.use(cors(options)); // Limitamos los dominios que pueden entrar a mi api
// app.use(cors()); // Habilitamos cualquier dominio para consumir la api

// Los middleware deben utilizarse despues del routerApi
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Programar nuestro servidor
app.listen(port, () => {
  console.log(`http://${ipLan}:${port}/`);
});
