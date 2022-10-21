const Users = require("./users.model");
const Posts = require("./posts.model");
const Categories = require("./categories.model");

const initModels = () => {
  //! Relacion 1 -> Muchos
  //* Una publicacion pertenece a un usuario.
  Posts.belongsTo(Users);
  //* Un usuario tiene muchas publicaciones.
  Users.hasMany(Posts);

  //* Una publicacion pertenece a una categoria.
  Posts.belongsTo(Categories);
  //* Una categoria tiene muchas publicaciones.
  Categories.hasMany(Posts);
};

module.exports = initModels;
