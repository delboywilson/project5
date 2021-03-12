
//ready is a method of the document object
$().ready(function () {
    //when the document is ready we call the validate method of the signup form
    $(".form").validate({
        invalidHandler: function (event, validator) {
            // 'this' refers to the form
            var errors = validator.numberOfInvalids();
            if (errors) {
                var message = errors == 1
                    ? 'You missed 1 field. It has been highlighted'
                    : 'You missed ' + errors + ' fields. They have been highlighted';
                $("div.error span").html(message);
                $("div.error").show();
            } else {
                $("div.error").hide();
            }
        },
        submitHandler: function (form) {
            form.submit();
        },
        //we pass it a couple of propertes
        //first one is rules' object, second  is messages
        rules: {
            username: {
                required: true,
                minlength: 2
            },
            first_name: {
                required: true,
                minlength: 2
            },
            last_name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            },
            password2: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            }
        },
         messages: {
                username: {
                    required: 'This field is required',
                    minlength: 'Your username must consist of at least 2 characters'
                },
                first_name: {
                    required: 'This field is required',
                    minlength: 'Your first name must consist of at least 2 characters'
                },
                last_name: {
                    required: 'This field is required',
                    minlength: 'Your last name must consist of at least 2 characters'
                },
                email: 'Enter a valid email',
                password: {
                    required: 'This field is required',
                    minlength: 'Password should be at least 6 chacters long'
                },
                password2: {
                    required: 'This field is required',
                    minlength: 'Password should be at least 6 chacters long',
                    equalTo: 'Passwords should match'
                }
            }
    });
    

});
