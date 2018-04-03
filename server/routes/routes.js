//server/routes/routes.js
var bodyParser = require('body-parser');
var Question = require('../../models/Question');
var User = require('../../models/User');

var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');

router.get('/', function(req, res) {
    res.render('index')
});

router.route('/insert').post(function(req,res) {
    var question = new Question();
    question.question = req.body.question;
    question.answer = req.body.answer;
    question.source = req.body.source;
    question.trivia = req.body.trivia;
    question.validated = false;
    question.save(function(err) {
        if (err)
            res.send(err);
        res.send('Question successfully added!');
    });
})

router.route('/register').post(function(req, res) {
    if(req.body.password != req.body.passwordConfirm) {
        console.log('Passwords do not match.');
        return;
    }

    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;

    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err)
            res.send(err);
        user.password = hash;
        user.save(function(err) {
            if(err)
                res.send(err);
            res.send('Registration Successful!');
        });
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
