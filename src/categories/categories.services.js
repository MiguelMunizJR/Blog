const categoriesControllers = require("./categories.controller");

const getAllCategories = (req, res) => {
  categoriesControllers
    .getAllCategories()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const getCategoryById = (req, res) => {
  const id = req.params.id;

  categoriesControllers
    .getCategoryById(id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "Invalid ID",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const createCategory = (req, res) => {
  const {name} = req.body;

  if (name) {
    categoriesControllers
      .createCategory(name)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  } else {
    res.status(400).json({
      message: "Missing Data",
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
};
