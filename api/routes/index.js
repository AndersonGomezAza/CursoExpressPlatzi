const express = require('express');

const productosRouter = require('./productosRouter');
const usuariosRouter = require('./usuariosRouter');
const categoriasRouter = require('./categoriasRouter');

function routerApi(app) {
  const routerV1 = express.Router();
  app.use('/api/v1', routerV1);
    routerV1.use('/productos', productosRouter);
    routerV1.use('/usuarios', usuariosRouter);
    routerV1.use('/categorias', categoriasRouter);
  /*
  const routerV2 = express.Router(); con esto podemos crear diferentes versiones con una url padre
  app.use('/api/v1', routerV2);
    routerV2.use('/productos', productosV2Router);
    routerV2.use('/usuarios', usuariosV2Router);
    routerV2.use('/categorias', categoriasV2Router);
  */
}

module.exports = routerApi;
