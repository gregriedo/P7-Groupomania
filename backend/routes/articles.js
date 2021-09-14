const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config.js');

const articleCtrl = require('../controllers/articles.js');

router.get('/',  articleCtrl.getAllArticle);
router.post('/',  multer, articleCtrl.createArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.put('/:id', auth, multer, articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);














module.exports = router;
