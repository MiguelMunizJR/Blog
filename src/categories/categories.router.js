const router = require("express").Router();
const categoriesServices = require("./categories.services");

router
  .route("/")
  .get(categoriesServices.getAllCategories)
  .post(categoriesServices.createCategory);

router.get("/:id", categoriesServices.getCategoryById);

module.exports = router;
