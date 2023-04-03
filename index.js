const express = require('express');

const app = express();
const port = 3001;
const ipLan = '192.168.20.29';

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy un nuevo endpoint');
});

app.get('/productos', (req, res) => {
  res.json({
    name: 'Product 1',
    price: 1000,
  });
});

app.listen(port, () => {
  console.log(`http://${ipLan}:${port}/`)
});
