const Posts = require("../models/posts.model");
const uuid = require("uuid");
const Users = require("../models/users.model");
const Categories = require("../models/categories.model");

const getAllPosts = async (offset, limit) => {
  const data = await Posts.findAndCountAll({
    //? Include nos ayuda a hacer los joins
    //* Offset: Donde comienza.
    //* Limit: Donde termina.
    offset: offset,
    limit: limit,
    attributes: {
      exclude: ["userId", "categoryId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Users,
        as: "user",
        attributes: ["id", "firstName", "lastName", "email"],
      },
      {
        model: Categories,
        as: "category",
      },
    ],
  });
  return data;
};

const getPostById = async (id) => {
  const data = await Posts.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ["userId", "categoryId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Users,
        as: "user",
        attributes: ["id", "firstName", "lastName", "email"],
      },
      {
        model: Categories,
        as: "category",
      },
    ],
  });
  return data;
};

const getPostsByCategory = async (categoryId) => {
  const data = await Posts.findAll({
    where: {
      categoryId,
    },
  });
  return data;
};

const createPost = async (data) => {
  const post = await Posts.create({
    id: uuid.v4(),
    title: data.title,
    content: data.content,
    userId: data.userId, //? Este es el id que viene desde el token.
    categoryId: data.categoryId,
  });
  return post;
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByCategory,
  createPost,
};
