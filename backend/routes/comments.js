const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const commentCtrl = require('../controllers/comments.js');


router.post('/', commentCtrl.createNewComment);
router.get('/',  commentCtrl.getAllComment);
router.delete('/:id', commentCtrl.deleteComment);


module.exports = router;
