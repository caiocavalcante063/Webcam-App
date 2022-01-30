// a camada controller é responsável por lidar com a requisição feita pelo usuário, e é
// separada da camada models para facilitar a legibilidade do código e manutenção

const imgModel = require('../models/imgModel');

const create = async (req, res) => {
  const { src } = req.body;

  try {
    await imgModel.create(src);

    return res.status(201).json({ message: 'imagem inserida com sucesso' });
  } catch(e) {
    res.status(500).json({message: `Algo deu errado :(`});
  }

 
};

const getAll = async (_req, res) => {
  try {
  const images = await imgModel.getAll();

  return res.status(200).json(images);
  } catch(e) {
    res.status(500).json({message: `Algo deu errado :(`});
  }
};

const remove = async (req, res) => {
  const { src } = req.body;

  try {
  await imgModel.remove(src);

  return res.status(200).json({ message: 'imagem removida com sucesso' });
  } catch(e) {
    res.status(500).json({message: `Algo deu errado :(`});
  }
};

module.exports = {
  create,
  getAll,
  remove,
};