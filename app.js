const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const PORT = 5555;

const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

const getAllProducts = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: products.length,
    data: {
      products,
    },
  });
};
const getProduct = (req, res) => {
  const id = req.params.id * 1;
  const product = products.find(el => el.id * 1 === id);

  if (!product || !product.id) {
    res.status(404).json({
      status: 'error',
      message: 'Product not found',
    });
  }

  res.status(200).json({
    status: 'success',
    result: products.length,
    data: {
      product,
    },
  });
};

const addProduct = (req, res) => {
  const newId = parseInt(products[products.length - 1].id) + 1;
  const newProduct = Object.assign({id: newId}, req.body);
  products.push(newProduct);
  fs.writeFile(
    `${__dirname}/data/products.json`,
    JSON.stringify(products),
    error => {
      res.status(201).json({
        status: 'success',
        data: {
          product: newProduct,
        },
      });
    },
  );
};

const updateProduct = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      product: 'updated',
    },
  });
};

const deleteProduct = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

app.get('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		data: 'Api v1.0.1'
	})
});
app.get('/api/v1/products', getAllProducts);
app.get('/api/v1/products/:id', getProduct);
app.post('/api/v1/products', addProduct)
app.patch('/api/v1/products/:id', updateProduct);
app.delete('/api/v1/products/:id', deleteProduct);

app.listen(PORT, () => {
  console.log('Server start at port: ' + PORT);
});
