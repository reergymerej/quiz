/* jshint node: true */
'use strict';

var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
    q: String,
    a: String
});

var answerSchema = new mongoose.Schema({
    text: String
});

var testSchema = new mongoose.Schema({
    // question: questionSchema,
    answers: [answerSchema]
});

questionSchema.statics.getRandom = function (callback) {
    this.count(function (err, count) {
        if (err) {
            callback(err);
        } else {
            this.findOne().skip(Math.random() * count).
                exec(function (err, question) {
                    callback(err, question);
            });
        }
    }.bind(this));
};

questionSchema.statics.getRandomAnswers = function (count, callback) {
    var answers = [];
    var that = this;

    var getAnswer = function () {
        that.getRandom(function (err, question) {
            if (err) {
                callback(err);
            } else {
                answers.push({
                    _id: question._id,
                    text: question.a
                });
                done();
            }
        });
    };

    var done = function () {
        if (answers.length === count) {
            callback(null, answers);
        } else {
            getAnswer();
        }
    };

    done();
};

var Question = mongoose.model('Question', questionSchema);

var getTest = function (done) {

    Question.getRandom(function (err, question) {
        if (err) {
            done(err);
        } else {

            Question.getRandomAnswers(4, function (err, answers) {
                // TODO: Use a proper schema for this.
                done(null, {
                    question: question,
                    answers: answers
                });
            });
        }
    });
};

exports.Question = Question;
exports.getTest = getTest;