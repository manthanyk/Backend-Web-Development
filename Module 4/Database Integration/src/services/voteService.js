const voteRepository = require('../repositories/voteRepository');

async function getAllVotes() {
  return voteRepository.findAll();
}

async function castVote(fields) {
  if (!fields.userId || !fields.postId) throw new Error('userId and postId are required');
  return voteRepository.create(fields);
}

async function removeVote(id) {
  return voteRepository.remove(id);
}

module.exports = { getAllVotes, castVote, removeVote };
