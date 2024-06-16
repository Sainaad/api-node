const { Category, Task } = require('../models');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Task, as: 'tasks' }]
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Algo deu errado' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Algo deu errado' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    category.name = name;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Algo deu errado' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Algo deu errado' });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
