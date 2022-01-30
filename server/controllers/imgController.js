// a camada controller é responsável por lidar com a requisição feita pelo usuário, e é
// separada da camada models para facilitar a legibilidade do código e manutenção

const imgModel = require('../models/imgModel');

const create = async (req, res) => {
  const { src } = req.body;

  await imgModel.create(src);

  return res.status(201).json({ message: 'imagem inserida com sucesso' });
};

const getAll = async (_req, res) => {
  const images = await imgModel.getAll();

  return res.status(200).json(images);
};

const remove = async (req, res) => {
  const { src } = req.body;

  await imgModel.remove(src);

  return res.status(200).json({ message: 'imagem removida com sucesso' });
};

module.exports = {
  create,
  getAll,
  remove,
};