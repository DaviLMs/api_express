const fs = require('fs');
const path = require('path');

module.exports = () => {
  const produtosFilePath = path.join(__dirname, '../data/produtos.json');
  let produtos = require(produtosFilePath);

  const controlador = {};

  controlador.listar = (req, res) => {
    res.status(200).json(produtos);
  };

  controlador.adicionar = (req, res) => {
    const novoProduto = req.body;

    if (produtos.some(produto => produto.name === novoProduto.name)) {
      return res.status(400).json({ message: 'Produto já existente!' });
    }

    if (!novoProduto.name || !novoProduto.price || !novoProduto.category) {
      return res.status(400).json({ message: 'Nome, preço e categoria são obrigatórios!' });
    }

    produtos.push(novoProduto);
  
  };

  return controlador;
};
