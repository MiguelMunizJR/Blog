const Posts = require("../models/posts.model");
const uuid = require("uuid");

const getAllPosts = async () => {
  const data = await Posts.findAll();
  return data;
};

const getPostById = async (id) => {};

const createPost = async (data) => {
  const post = await Posts.create({
    id: uuid.v4(),
    title: data.title,
    content: data.content,
    createdBy: data.userId, //? Este es el id que viene desde el token.
    categoryId: data.categoryId,
  });
  return post;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
};
