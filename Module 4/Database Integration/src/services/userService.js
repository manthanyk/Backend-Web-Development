const userRepository = require('../repositories/userRepository');

async function getAllUsers() {
  return userRepository.findAll();
}

async function getUserById(id) {
  return userRepository.findById(id);
}

async function createUser(fields) {
  if (!fields.name) throw new Error('name is required');
  return userRepository.create(fields);
}

async function updateUser(id, patch) {
  return userRepository.update(id, patch);
}

async function deleteUser(id) {
  return userRepository.remove(id);
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
