//models/Question.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    question: String,
    answer: String,
    sourceLabel: String,
    sourceUrl: String,
    trivia: String,
    user: String,
    validated: Boolean,
    id: Number,
});

module.exports = mongoose.model('Question', questionSchema, 'testing');
