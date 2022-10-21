const db = require("../utils/database");
const datatypes = require("sequelize").DataTypes;

const Categories = db.define(
  "categories",
  {
    id: {
      type: datatypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: datatypes.STRING,
      allowNull: false,
    },
  },
  {
    //? Evita que sequelize agregue las columnas de createdAt y updatedAt.
    timestamps: false,
  }
);

module.exports = Categories;
