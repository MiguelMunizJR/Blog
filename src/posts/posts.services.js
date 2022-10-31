const postsController = require("./posts.controller");
const { host } = require("../config");

const getAllPosts = (req, res) => {
  //? localhost:9000/api/v1/posts?offset=0&limit=20
  //! Offset: donde inicia.
  //! Limit: cantidad maxima de entidades a mostrar por página.
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;

  const urlBase = `${host}/api/v1/posts`;

  postsController
    //* Pasamos el offset y limit a nuestro controlador
    .getAllPosts(offset, limit)
    .then((response) => {
      //? Comprobamos si hay items suficientes para paginar hacia adelante, de lo contrario mostramos NULL
      const nextPage =
        response.count - offset >= limit
          ? `${urlBase}?offset=${offset + limit}&limit=${limit}`
          : null;

      //? Comprobamos si hay items suficientes para paginar hacia atrás, de lo contrario mostramos NULL
      const prevPage =
        offset - limit >= 0
          ? `${urlBase}?offset=${offset - limit}&limit=${limit}`
          : null;

      res.status(200).json({
        prev: prevPage,
        next: nextPage,
        items: response.count,
        results: response.rows,
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
