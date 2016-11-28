var express = require('express');
var router  = express.Router();
var passport = require('passport');

//
router.get('/', function (req, res) {
  console.log('inside logout.js');
    // req.session.destroy();
    req.logout();
    res.redirect('/');
    req.session.destroy();

});

module.exports = router;
