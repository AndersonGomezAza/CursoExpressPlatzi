const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(15);
const price = joi.number().integer().min(10);
const image = joi.string().uri();

const crearEsquemaProducto = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
})

const actualizarEsquemaProducto = joi.object({
  name: name,
  price: price,
  image: image,
})

const obtenerEsquemaProducto = joi.object({
  id: id.required(),
})

module.exports = {
  crearEsquemaProducto,
  actualizarEsquemaProducto,
  obtenerEsquemaProducto,
}
