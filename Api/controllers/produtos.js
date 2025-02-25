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

    if (!novoProduto.name || !novoProduto.price || !novoProduto.category) {
      return res.status(400).json({ message: 'Nome, preço e categoria são obrigatórios!' });
    }

    produtos.push(novoProduto);
    fs.writeFileSync(produtosFilePath, JSON.stringify(produtos,  2));

    res.status(201).json(novoProduto);
  };

  controlador.deletar = (req, res) => {
    const { id } = req.params; 

    const produtoIndex = produtos.findIndex(produto => produto.id === id);

    if (produtoIndex === -1) {
      return res.status(404).json({ message: 'Produto não encontrado!' });
    }

    produtos.splice(produtoIndex, 1); 
    fs.writeFileSync(produtosFilePath, JSON.stringify(produtos, 2));

    res.status(200).json({ message: 'Produto deletado com sucesso!' });
  };

  return controlador;
};
