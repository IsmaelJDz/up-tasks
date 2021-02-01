const express = require('express');
const routes = require('./routes/');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./config/db');
const helpers = require('./helpers');
require('./models/Proyectos');

const PORT = 3007;
const app = express();

db.sync()
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => console.log('Fail connection'));

app.use(express.static('public'));

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, './views'));

//vardump like middleware in whole app
app.use((req, res, next) => {
  const fecha = new Date();
  res.locals.year = fecha.getFullYear();
  res.locals.vardump = helpers.vardump;
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes());

app.listen(PORT, () => {
  console.log(`🛠 server listen on: ${PORT}: http://localhost:${PORT} ✔️`);
});
