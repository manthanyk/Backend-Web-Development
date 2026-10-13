const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

router.get('/', voteController.getAll);
router.post('/', voteController.create);
router.delete('/:id', voteController.remove);

module.exports = router;
