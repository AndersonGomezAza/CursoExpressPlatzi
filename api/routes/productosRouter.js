const express = require('express');
const ProductosService = require('../Services/productService');
const { validacionHandler } = require('../Middlewares/validatorHandler');
const { crearEsquemaProducto, actualizarEsquemaProducto, obtenerEsquemaProducto } = require('../Schemas/productSchema');

const router = express.Router();
const servicio = new ProductosService();

// CREACION PETICIONES GET
router.get('/', async (req, res) => {
  const productos = await servicio.buscar();
  res.json(productos);
});

router.get('/:id',
  validacionHandler(obtenerEsquemaProducto, 'params'),
  async (req, res, next) =>{
    try {
      const { id } = req.params;
      const producto = await servicio.buscarSoloUno(id);
      res.json(producto);
    } catch (error) {
      next(error)
    }
  }
);

//CREACION PETICIONES POST
router.post('/',
  validacionHandler(crearEsquemaProducto, 'body'),
  async (req, res)=>{
    const body = req.body;
    const nuevoProducto = await servicio.crear(body);
    res
      .status(201)
      .json({ nuevoProducto });
  }
)

//CREACION PETICIONES PUT O PATCH
router.patch('/:id',
  validacionHandler(obtenerEsquemaProducto, 'params'),
  validacionHandler(actualizarEsquemaProducto, 'body'),
  async (req, res, next)=>{
    try {
      const { id } = req.params;
      const body = req.body;
      const productoActualizado = await servicio.actualizar(id, body);
      res.json({ productoActualizado });
    } catch (error) {
      next(error);
    }
  }
)

//CREACION PETICIONES DELETE
router.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  const productoEliminado = await servicio.eliminar(id);
  res.json({ productoEliminado });
})

module.exports = router;
