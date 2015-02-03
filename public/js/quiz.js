(function () {
    var $q = $('#q');
    var $1 = $('#1');
    var $2 = $('#2');
    var $3 = $('#3');
    var $4 = $('#4');
    var $next = $('#next');

    var WRONG_CLASS = 'btn-danger';
    var RIGHT_CLASS = 'btn-success';

    var setup = function (test) {
        $q.html(test.question.q).data(test);
        $1.html(test.answers[0].text).data(test.answers[0]);
        $2.html(test.answers[1].text).data(test.answers[1]);
        $3.html(test.answers[2].text).data(test.answers[2]);
        $4.html(test.answers[3].text).data(test.answers[3]);
    };

    var loadTest = function () {
        $next.hide();
        $('.' + WRONG_CLASS).removeClass(WRONG_CLASS);
        $('.' + RIGHT_CLASS).removeClass(RIGHT_CLASS);

        $.ajax({
            url: '/test',
            method: 'GET',
            success: function (resp) {
                setup(resp);
            },
            complete: function (jqXHR, status) {
                if (status !== 'success') {
                    console.error('unable to load test');
                }
            }
        });
    };

    $('#answers > button').on('click', function () {
        var $btn = $(this);
        var answerData = $btn.data();
        var questionData = $q.data();

        if (questionData.question._id !== answerData._id) {
            $btn.addClass(WRONG_CLASS);
        }

        $('button').filter(function (i, btn) {
            return $(btn).data('_id') === questionData.question._id;
        }).addClass(RIGHT_CLASS);

        $next.show();
    });

    $next.on('click', function () {
        loadTest();
    });

    loadTest();

}());