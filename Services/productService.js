const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductosService {

  constructor(){
    this.productos = [];
    this.generate();
  }

  generate(){

    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.productos.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      })
    }

  }

  async crear( data ){
    const nuevoProduto = {
      id: faker.datatype.uuid(),
      ...data,
    }
    this.productos.push(nuevoProduto);
    return nuevoProduto;
  }

  async buscar(){
    return this.productos;
  }

  async buscarSoloUno(idProducto){
    const producto = this.productos.find(item => item.id === idProducto);
    if(!producto){
      throw boom.notFound('Product Not Found');
    }
    return producto;
  }

  async actualizar(idProducto, dataChange){
    const index = this.productos.findIndex(item => item.id === idProducto);
    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }
    const productoActualizar = this.productos[index];
    this.productos[index] = {
      ...productoActualizar,
      ...dataChange,
    };
    return this.productos[index];
  }

  async eliminar(idProducto){
    const index = this.productos.findIndex(item => item.id === idProducto);
    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }
    this.productos.splice(index, 1);
    return { idProducto };
  }

}

module.exports = ProductosService;
