jQuery(function(){
    
    $.validator.setDefaults({
            highlight: function(input) {
                $(input).parent().addClass("has-error");
                if ($('.form-group').hasClass('has-error') && $('#alerta').hasClass('alert-success'))
                    $('#msg').html('');

                if ($('#msg').html() !== '')
                    $('#alerta').fadeIn();
            },
            unhighlight: function(input) {
                $(input).parent().removeClass("has-error");

                if (!$('.form-group').hasClass('has-error'))
                    $('#alerta').fadeOut();
            }
        });
        
    jQuery.validator.messages.required = "";
    $('#formulario').validate({
        submitHandler:function(){
            $.ajax({
                url: BASE_URL + "/seguranca/configuracao/salvar",
                type: 'post',
                data: $('#formulario').serialize(),
                dataType: "json",
                beforeSubmit: function() {
                    $('#salvar').attr('disabled', true).html('aguarde...');
                },
                success: function(json){
                    if(json.erro)
                        $('#alerta').addClass('alert-danger').removeClass('alert-success').fadeIn();
                    else {
                        $('#alerta').addClass('alert-success').removeClass('alert-danger').fadeIn();
                    }
                    $('#msg').html(json.msg.replace(/\n/g, "<br>"));
                }
            });
            return false;
        }
    });
});