
const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');

module.exports = () => {
  const app = express();

  app.set('port', process.env.PORT || config.get('server.port'));

  app.use(bodyParser.json());
  
  require('../Api/routes/dadosPessoas')(app)
  require('../Api/routes/protudos')(app)
  
  return app;
};