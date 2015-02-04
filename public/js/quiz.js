(function () {
    var $q = $('#q');
    var $1 = $('#1');
    var $2 = $('#2');
    var $3 = $('#3');
    var $4 = $('#4');
    var $next = $('#next');
    var $answerButtons = $('#answers .answer');

    var WRONG_CLASS = 'btn-danger';
    var RIGHT_CLASS = 'btn-success';
    var nextTest;

    var next = function () {
        resetTestElements();
        getTest(function (test) {
            if (test) {
                setupTestElements(test);
            }
            preloadNextTest();
        });
    };

    var resetTestElements = function () {
        $next.hide();
        $('.' + WRONG_CLASS).removeClass(WRONG_CLASS);
        $('.' + RIGHT_CLASS).removeClass(RIGHT_CLASS);
        $answerButtons.prop('disabled', false);
    };

    var getTest = function (callback) {
        if (nextTest) {
            callback(nextTest);
            nextTest = null;
        } else {
            getTestFromServer(function (test) {
                callback(test);
            });
        }
    };

    var getTestFromServer = function (callback) {
        var test;

        $.ajax({
            url: '/test',
            method: 'GET',
            success: function (resp) {
                test = resp;
            },
            complete: function (jqXHR, status) {
                if (status !== 'success') {
                    console.error('unable to load test');
                }
                callback(test);
            }
        });
    };

    var setupTestElements = function (test) {
        $q.html(test.question.q).data(test);
        $1.html(test.answers[0].text).data(test.answers[0]);
        $2.html(test.answers[1].text).data(test.answers[1]);
        $3.html(test.answers[2].text).data(test.answers[2]);
        $4.html(test.answers[3].text).data(test.answers[3]);
    };

    var preloadNextTest = function () {
        getTestFromServer(function (test) {
            nextTest = test;
        });
    };

    var sendResponse = function (questionId, answerId) {
        $.ajax({
            url: '/response',
            method: 'POST',
            data: {
                questionId: questionId,
                answerId: answerId
            }
        });
    };

    $answerButtons.on('click', function () {
        var $btn = $(this);
        var answerId = $btn.data('_id');
        var questionId = $q.data('question')._id;

        if (!$next.is(':visible')) {
            if (questionId !== answerId) {
                $btn.addClass(WRONG_CLASS);
            }

            $answerButtons.filter(function (i, btn) {
                return $(btn).data('_id') === questionId;
            }).addClass(RIGHT_CLASS);

            sendResponse(questionId, answerId);
            $next.show();
            $answerButtons.prop('disabled', true);
        }
    });

    $next.on('click', next);
    next();

}());