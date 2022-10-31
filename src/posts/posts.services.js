const postsController = require("./posts.controller");

const getAllPosts = (req, res) => {
  //? localhost:9000/api/v1/posts?offset=0&limit=20
  const { offset, limit } = req.query;

  postsController
  //* Pasamos el offset y limit a nuestro controlador
    .getAllPosts(offset, limit)
    .then((response) => {
      res.status(200).json({
        offset,
        limit,
        results: response,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const getPostById = (req, res) => {
  const id = req.params.id;

  postsController
    .getPostById(id)
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

const getPostsByCategory = (req, res) => {
  const categoryId = req.params.id;

  postsController
    .getPostsByCategory(categoryId)
    .then((response) => {
      if (response[0]) {
        res.status(200).json(response);
      } else {
        res.status(400).json({
          message: "Empty Category",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const createPost = (req, res) => {
  const userId = req.user.id;
  const { title, content, categoryId } = req.body;

  if (title && content && categoryId) {
    postsController
      .createPost({
        title,
        content,
        userId,
        categoryId,
      })
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
      fields: {
        title: "string",
        content: "string",
        categoryId: "UUID",
      },
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByCategory,
};
