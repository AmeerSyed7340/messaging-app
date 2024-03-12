var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  const message = req.body;
  res.status(201).json({message});
});

module.exports = router;
