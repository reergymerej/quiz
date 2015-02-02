(function () {
    var $form = $('form');
    var $q = $('#question');
    var $a = $('#answer');



    var isValid = function (form) {
        var INVALID_CLASS = 'has-error';
        var valid = true;

        // clear marks
        $('.' + INVALID_CLASS).removeClass(INVALID_CLASS);

        // validate
        $('input').each(function (index, field) {
            var $field = $(field);
            if (!$field.val().trim()) {
                // mark
                $field.closest('.form-group').addClass(INVALID_CLASS);
                valid = false;
            }
        });

        return valid;
    };

    var submit = function (data) {
        console.log(data);
        $.ajax({
            method: 'POST',
            url: '/entry',
            data: data,
            complete: function () {
                console.log(arguments);
            }
        });
    };

    $form.on('submit', function () {
        if (isValid($form)) {
            submit({
                q: $q.val().trim(),
                a: $a.val().trim()
            });
        }
        return false;
    });


}());