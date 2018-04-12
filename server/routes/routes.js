//server/routes/routes.js
var bodyParser = require('body-parser');
var Question = require('../../models/Question');
var User = require('../../models/User');

var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');
var validator = require('validator');

function requireLogin (req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    }
    else {
        next();
    }
};

router.get('/', function(req, res) {
    res.render('index')
    console.log("Is this happening");
});

// TODO: setup dashboard functionality on client side
/*router.get('/dashboard', requireLogin);*/

router.get('/add', requireLogin);

router.route('/insert').post(function(req,res) {
    var question = new Question();
    question.question = req.body.question;
    question.answer = req.body.answer;
    question.sourceUrl = req.body.sourceUrl;
    question.sourceLabel = req.body.sourceLabel;
    question.user = req.body.user;
    question.trivia = req.body.trivia;
    question.validated = false;
    question.save(function(err) {
        if (err)
            res.send(err);
        res.send('Question successfully added!');
    });
})

router.route('/register').post(function(req, res) {
    //TODO: show and enforce this validation on the client side
    //TODO: password complexity parameters?
    if(req.body.password != req.body.passwordConfirm) {
        res.send({
            status: 400,
            data: "Passwords do not match",
            error: "",
        });
    }

    else if(!validator.isEmail(req.body.email)) {
        res.send({
            status: 400,
            data: "Invalid email",
            error:""
        });
    }
    else {
        User.find({$or:[{username:req.body.username}, {email:req.body.email}]}, function(err, user) {
            if(err) {
                res.send({
                    status:400,
                    data:"Database error",
                    error:err,
                });
            }
            if(user.length) {
                res.send({
                    status:400,
                    data:"Email or username already in use.",
                    error:'',
                });
            }
            else {
                var user = new User();
                user.username = req.body.username;
                user.email = req.body.email;

                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if(err)
                        res.send({
                            status:400,
                            data:"Encryption error",
                            error:err,
                        });
                    user.password = hash;
                    user.save(function(err) {
                        if(err)
                            res.send({
                                status:400,
                                data:"Database error",
                                error:err,
                            });
                        //res.send('Registration Successful!');
                        //req.session.user = user.username;
                        res.send({
                            status:200,
                            data:user.username,
                            error:""
                        });
                    });
                });
            }
        });
    }
})

router.route('/login').post(function(req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
        if(err)
            res.send({
                status: 401,
                data: "Invalid login - database error",
                error: err,
            });
        if(!user) {
            res.send({
                status: 401,
                data: "Invalid login credentials",
                error: '',
            });
        }
        else {
            bcrypt.compare(req.body.password, user.password, function(err, response) {
                if(response) {
                    //req.session.user = user;
                    res.send({
                        status: 200,
                        data: user.username,
                        errors:'',
                    });
                }
                else {
                    res.send({
                        status: 401,
                        data: "Invalid login credentials",
                        error: '',
                    });
                }
            });

        }
    });
})

router.route('/currentuser').get(function(req, res) {
    if(!req.session || !req.session.user) {
        res.send('');
    }
    else {
        res.send(req.session.user.username);
    }
});

//router.route('/')

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
 Question.find({validated:true}, function(err, question) {
   if(err) {
     res.send(err);
   }
   res.json(question);
 });
});

module.exports = router;
