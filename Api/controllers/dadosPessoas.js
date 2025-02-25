module.exports = () => {
    const dadosPessoas = require('../data/dadosPessoas.json')
    const controlador = {}

    controlador.listar = (req, res) => res.status(200).json(dadosPessoas)

    return controlador
}