module.exports = app => {
   const controlador = require('../controllers/dadosPessoas')()

    app.route('/api/v1/dadosPessoas').get(controlador.listar)
    app.route('/api/v1/dadosPessoas/filtrar').get(controlador.filtrar);

}
