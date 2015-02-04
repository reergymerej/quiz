/* jshint node: true */
'use strict';

var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
    q: String,
    a: String,
    correct: Number,
    incorrect: Number
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

questionSchema.statics.getNextQuestion = function (callback) {
    var that = this;

    // Find the lowest "correct" value.
    this.aggregate(
        { $group: { _id: null, min: { $min: '$correct' } } },
        { $project: { _id: 0, min: 1} },

        function (err, res) {
            var correctValue;

            if (err) {
                console.log('unable to aggregate');
            } else {
                correctValue = res[0].min;
                console.log('pick from questions with only ' + correctValue + ' correct responses');
            }

            that.find({ correct: correctValue }, function (err, questions) {
                var question;

                if (err) {
                    console.log('unable to getNextQuestion');
                } else {
                    question = questions[rand(0, questions.length - 1)];
                    console.log(questions.length);
                }
                
                callback(err, question);
            });
        }
    );

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

var rand = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getTest = function (done) {

    Question.getNextQuestion(function (err, question) {
        if (err) {
            done(err);
        } else {

            Question.getRandomAnswers(3, function (err, answers) {
                if (err) {
                    console.log('unable to get answers');
                    done(err);
                } else {
                    // TODO: Use a proper schema for this.
                    var correctAnswer = {
                        _id: question._id,
                        text: question.a
                    };

                    answers.splice(rand(0, answers.length - 1), 0, correctAnswer);

                    done(null, {
                        question: question,
                        answers: answers
                    });
                }
            });
        }
    });
};

var Response = mongoose.model('Response', {
    q: String,
    a: String,
    correct: Boolean
});

exports.Question = Question;
exports.getTest = getTest;
exports.Response = Response;