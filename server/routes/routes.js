//server/routes/routes.js
var bodyParser = require('body-parser');
var Question = require('../../models/Question');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index')
});

router.route('/insert')
.post(function(req,res) {
  var question = new Question();
  question.question = req.body.question;
  question.answer = req.body.answer;
  question.trivia = req.body.trivia;
  question.id = req.body.id;
  question.save(function(err) {
      if (err)
        res.send(err);
      res.send('Question successfully added!');
  });
})

router.route('/update')
.post(function(req, res) {
  const doc = {
     question: req.body.question,
     answer: req.body.answer,
     trivia: req.body.trivia,
     id: req.body.id,
  };
  console.log(doc);
  Question.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Question successfully updated!');
  });
});

router.get('/delete', function(req, res){
 var id = req.query.id;
 Question.find({_id: id}).remove().exec(function(err, question) {
   if(err)
      res.send(err)
   res.send('Question successfully deleted!');
 })
});

router.get('/getAll',function(req, res) {
 //var id = req.query.id;
 Question.find({}, function(err, question) {
   if(err) {
     res.send(err);
   }
   res.json(question);
 });
});

module.exports = router;
