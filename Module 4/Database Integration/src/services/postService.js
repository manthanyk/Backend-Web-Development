const postRepository = require('../repositories/postRepository');

async function getAllPosts() {
  return postRepository.findAll();
}

async function getPostById(id) {
  return postRepository.findById(id);
}

async function createPost(fields) {
  if (!fields.title) throw new Error('title is required');
  if (!fields.authorId) throw new Error('authorId is required');
  return postRepository.create(fields);
}

async function updatePost(id, patch) {
  return postRepository.update(id, patch);
}

async function deletePost(id) {
  return postRepository.remove(id);
}

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
