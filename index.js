// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const routeProduct = require('./routes/productsRoute');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routeProduct);

app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
