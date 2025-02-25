
  module.exports = app => {
    const controlador = require('../controllers/produtos')();  
  
    app.route('/api/v1/produtos').get(controlador.listar);  
    app.route('/api/v1/produtos').post(controlador.adicionar); 
    app.route('/api/v1/produtos/:id').delete(controlador.deletar);
  };
  