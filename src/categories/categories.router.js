const router = require("express").Router();
const categoriesServices = require("./categories.services");
const { getPostsByCategory } = require("../posts/posts.services");

//TODO /api/v1/categories

router
  .route("/")
  .get(categoriesServices.getAllCategories)
  .post(categoriesServices.createCategory);

router.get("/:id", categoriesServices.getCategoryById);

//TODO /api/v1/categories/:id/posts

router.get("/:id/posts", getPostsByCategory);

module.exports = router;
