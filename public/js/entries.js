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

    var reset = function () {
        $a.val('');
        $q.val('').focus();
    };

    var submit = function (data) {
        $.ajax({
            method: 'POST',
            url: '/entry',
            data: data,
            complete: function (jqXHR, status) {
                if (status === 'success') {
                    reset();
                } else {
                    alert('unable to save');
                }
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

    reset();
}());