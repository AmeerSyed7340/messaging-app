var express = require('express');
var router = express.Router();
const Message = require('../models/messages');

/* GET home page. */
router.post('/', async function(req, res, next) {
  const {message} = req.body;

  //query to create
  try{
    const newMsg = await Message.create({message});
    res.status(201).json({newMsg});
  }
  catch(error){
    console.error('Error crteating Message in index: ', error)
    next(error);
  }
});

module.exports = router;
