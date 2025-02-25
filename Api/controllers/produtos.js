const fs = require('fs');
const path = require('path');

module.exports = () => {
  const produtosFilePath = path.join(__dirname, '../data/produtos.json');
  let produtos = require(produtosFilePath);

  const controlador = {};

//------------------------------------------------------------------------------------------

  controlador.listar = (req, res) => {
    res.status(200).json(produtos);
  };

//------------------------------------------------------------------------------------------

  controlador.adicionar = (req, res) => {
    const novoProduto = req.body;

    if (!novoProduto.name || !novoProduto.price || !novoProduto.category) {
      return res.status(400).json({ message: 'Nome, preço e categoria são obrigatórios!' });
    }

    produtos.push(novoProduto);
    fs.writeFileSync(produtosFilePath, JSON.stringify(produtos,  2));

    res.status(201).json(novoProduto);
  };

//------------------------------------------------------------------------------------------

  controlador.deletar = (req, res) => {
    const { id } = req.params; 

    const produtoIndex = produtos.find(produto => produto.id === id);

    if (produtoIndex === -1) {
      return res.status(404).json({ message: 'Produto não encontrado!' });
    }

    produtos.splice(produtoIndex, 1); 
    fs.writeFileSync(produtosFilePath, JSON.stringify(produtos, 2));

    res.status(200).json({ message: 'Produto deletado com sucesso!' });
  };
  
//------------------------------------------------------------------------------------------

  controlador.buscar = (req, res) => {

    const { id } = req.params

    const produto = produtos.find(produto => produto.id === id);
    
    if (!produto) {
      res.status(400).json({ mensagem: 'Produto não encontrado' });
    }

    res.status(200).json({ mensagem: 'Produto encontrado', obj: produto })

  }

//------------------------------------------------------------------------------------------

  controlador.alterar = (req, res) => {
    const { id } = req.params; 
  
    const body = req.body;
  
    const produto = produtos.find(produto => produto.id === id);
  
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
  
    produto.name = body.name || produto.name;
    produto.price = body.price || produto.price;
    produto.category = body.category || produto.category;
    produto.description = body.description || produto.description;
    produto.stockQuantity = body.stockQuantity || produto.stockQuantity;
    produto.supplierId = body.supplierId || produto.supplierId;
  
    res.status(200).json({ mensagem: 'Produto atualizado com sucesso!', produto });
  };
  

  return controlador;
};
