const voteService = require('../services/voteService');

async function getAll(req, res) {
  const votes = await voteService.getAllVotes();
  res.json(votes);
}

async function create(req, res) {
  try {
    const vote = await voteService.castVote(req.body);
    res.status(201).json(vote);
  } catch (e) {
    if (e.message === 'User has already voted on this post') {
      return res.status(409).json({ error: e.message });
    }
    res.status(400).json({ error: e.message });
  }
}

async function remove(req, res) {
  const deleted = await voteService.removeVote(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Vote not found' });
  res.status(204).send();
}

module.exports = { getAll, create, remove };
