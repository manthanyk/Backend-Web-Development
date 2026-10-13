const postService = require('../services/postService');

async function getAll(req, res) {
  const posts = await postService.getAllPosts();
  res.json(posts);
}

async function getOne(req, res) {
  const post = await postService.getPostById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
}

async function create(req, res) {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function update(req, res) {
  const post = await postService.updatePost(req.params.id, req.body);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
}

async function remove(req, res) {
  const deleted = await postService.deletePost(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Post not found' });
  res.status(204).send();
}

module.exports = { getAll, getOne, create, update, remove };
