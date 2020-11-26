/* eslint-disable no-console */
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const responseHandler = require('./_helpers/responseHandler');

const { login, verifyUser } = require('./routes/auth.routes');

require('./repository/connectDB');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', login);

app.use((req, res, next) => verifyUser(req, res, next));

app.use('/api/users', require('./routes/users.routes'));
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/categories', require('./routes/categories.routes'));
app.use('/api/history', require('./routes/history.routes'));

app.use(responseHandler);

const server = app.listen(3001, () => {
  console.log('done!');
});

const closeConnection = () => {
  server.close();
};

module.exports.app = app;
module.exports.closeConnection = closeConnection;
