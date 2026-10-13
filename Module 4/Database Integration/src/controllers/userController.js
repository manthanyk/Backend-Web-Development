const userService = require('../services/userService');

async function getAll(req, res) {
  const users = await userService.getAllUsers();
  res.json(users);
}

async function getOne(req, res) {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}

async function create(req, res) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function update(req, res) {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}

async function remove(req, res) {
  const deleted = await userService.deleteUser(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'User not found' });
  res.status(204).send();
}

module.exports = { getAll, getOne, create, update, remove };
