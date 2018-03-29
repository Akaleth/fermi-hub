//models/Question.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    question: String,
    answer: String,
    trivia: String,
    id: Number,
});

module.exports = mongoose.model('Question', questionSchema);
