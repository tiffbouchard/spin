var express = require('express');
var router = express.Router();

const authCtrl = require("../controllers/auth");

router.get('/login', authCtrl.login);
router.get('/callback', authCtrl.callback);
router.get('/refresh-token', authCtrl.refreshToken);

module.exports = router;