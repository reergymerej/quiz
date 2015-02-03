(function () {
    var $q = $('#q');
    var $1 = $('#1');
    var $2 = $('#2');
    var $3 = $('#3');
    var $4 = $('#4');
    var $next = $('#next');
    var $submit = $('#submit');

    var setup = function (test) {

        $q.html(test.question.q);

        $1.html(test.answers[0].text);
        $2.html(test.answers[1].text);
        $3.html(test.answers[2].text);
        $4.html(test.answers[3].text);
    };

    var loadTest = function () {
        $next.hide();
        $submit.show();

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

    $next.on('click', function () {
        loadTest();
    });

    $submit.on('click', function () {
        console.log('check answer');
        console.log('show correct');
        $submit.hide();
        $next.show();
    });

    loadTest();

}());