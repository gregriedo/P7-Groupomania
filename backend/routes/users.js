const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users.js');
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/',  userCtrl.getAllUsers);
router.get('/:id',  userCtrl.findOneUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
  
