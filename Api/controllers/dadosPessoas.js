const fs = require('fs');
const path = require('path');

module.exports = () => {
    const filePath = path.join(__dirname, '../data/dadosPessoas.json');

    const dadosPessoas = require(filePath);

    if (!Array.isArray(dadosPessoas)) {
        throw new Error('dadosPessoas não é um array!');
    }

    const controlador = {};

    controlador.listar = (req, res) => {
        return res.status(200).json(dadosPessoas);
    };

    controlador.filtrar = (req, res) => {
        const { name } = req.query;
        console.log(name);
        
        let resultado = dadosPessoas;

        if (name) {
            resultado = resultado.filter(pessoa => 
                pessoa.name && pessoa.name.toLowerCase().includes(name.toLowerCase())
            );
            console.log(resultado);
        }


        if (resultado.length > 0) {
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json({ mensagem: 'Nenhuma pessoa encontrada com os critérios fornecidos.' });
        }
    };

    return controlador;
};
