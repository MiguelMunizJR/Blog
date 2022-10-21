const db = require("../utils/database");
const datatypes = require("sequelize").DataTypes;

const Categories = require("./categories.model");
const Users = require("./users.model");

const Posts = db.define("posts", {
  id: {
    type: datatypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: datatypes.STRING,
    allowNull: false,
  },
  content: {
    type: datatypes.TEXT,
    allowNull: false,
  },
  //? Llave foranea de Users
  createdBy: {
    type: datatypes.UUID,
    allowNull: false,
    field: "created_by",
    references: {
      //? Key: con que la relacionaremos.
      key: "id",
      //? Model: Modelo al cual nos relacionaremos.
      model: Users,
    },
  },
  categoryId: {
    type: datatypes.INTEGER,
    allowNull: false,
    field: "category_id",
    references: {
      key: "id",
      model: Categories,
    },
  },
});

module.exports = Posts;
