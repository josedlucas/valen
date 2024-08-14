import JustValidate from "just-validate";
import axios from 'axios';
import swal from 'sweetalert';

if ($(".owl-carousel-section1").length > 0) {
    $(".owl-carousel-section1").owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
            }
        }
    });
}

if ($(".about-us").length > 0) {
    $(".about-us").owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
            }
        }
    });
}

if ($(".owl-carousel-section2").length > 0) {
    $(".owl-carousel-section2").owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1,
                margin: -70
            },
            576: {
                items: 2,
                margin: 0,
            },
            768: {
                items: 2,
                margin: 30,
            },
            992: {
                margin: 60,
                items: 3
            }
        }
    });
}

if ($(".owl-carousel-section4").length > 0) {
    $(".owl-carousel-section4").owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1
            }
        }
    });
}

if ($(".owl-carousel-section5").length > 0) {
    $(".owl-carousel-section5").owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 6,
                margin: 30,
            },
        }
    });
}

if ($(".products-carousel").length > 0) {
    var $carousel = $(".products-carousel");

    $carousel.owlCarousel({
        items: 1, // Número de imágenes visibles por vez
        loop: false,
        nav: false,
        dots: false,
        onInitialized: setThumbnails,
        onChanged: setActiveThumbnail,
    });

    // Evento para manejar el movimiento del cursor sobre la imagen
    $carousel.on('mousemove', '.owl-item', function(event) {
        var $img = $(this).find('img');
        var imgWidth = $img.width();
        var imgHeight = $img.height();
        var parentOffset = $(this).offset();

        // Calcular la posición del mouse dentro de la imagen
        var relX = event.pageX - parentOffset.left;
        var relY = event.pageY - parentOffset.top;

        // Calcular la posición del zoom basándote en la posición del cursor
        var moveX = ((relX / $(this).width()) * 100) + "%";
        var moveY = ((relY / $(this).height()) * 100) + "%";

        // Aplicar el efecto de zoom y mover la imagen
        $img.css({
            'transform-origin': moveX + ' ' + moveY,
            'transform': 'scale(3)' // Ajusta el nivel de zoom según lo que necesites
        });
    });

    // Restaurar la imagen al tamaño original cuando el mouse sale de la imagen
    $carousel.on('mouseleave', '.owl-item', function() {
        var $img = $(this).find('img');
        $img.css({
            'transform-origin': 'center center',
            'transform': 'scale(1)'
        });
    });

    // Función para establecer las miniaturas como dots personalizados
    function setThumbnails(event) {
        var $owlThumbnails = $('.owl-thumbnails');
        event.item.count;
        // Crear las miniaturas
        $carousel.find('.owl-item img').each(function(index) {
            var thumbnail = $(this).clone().attr('data-index', index);
            $owlThumbnails.append(thumbnail);
        });

        // Asignar evento click para cambiar de slide al hacer click en la miniatura
        $owlThumbnails.find('img').on('click', function() {
            var index = $(this).data('index');
            $carousel.trigger('to.owl.carousel', [index, 300]);
        });

        setActiveThumbnail(event);
    }

    // Función para cambiar el estado activo de la miniatura
    function setActiveThumbnail(event) {
        var $owlThumbnails = $('.owl-thumbnails');
        var currentIndex = event.item.index;

        $owlThumbnails.find('img').removeClass('active');
        $owlThumbnails.find('img').eq(currentIndex).addClass('active');
    }
}

$(document).ready(function() {
    const $inputNumber = $('.input-number');
    if($inputNumber.length > 0) {
        $('.input-number-decrement').on('click', function() {
            const currentValue = parseInt($inputNumber.val()) || 0;
            const minValue = 0; // Forzamos el valor mínimo a 0 para evitar negativos

            if (currentValue > minValue) {
                $inputNumber.val(currentValue - 1);
            }
        });

        $('.input-number-increment').on('click', function() {
            const currentValue = parseInt($inputNumber.val()) || 0;
            const maxValue = parseInt($inputNumber.attr('max')) || Infinity;

            if (currentValue < maxValue) {
                $inputNumber.val(currentValue + 1);
            }
        });

        // Evitar que el usuario introduzca manualmente números negativos
        $inputNumber.on('input', function() {
            const value = parseInt($(this).val());
            if (value < 0) {
                $(this).val(0);
            }
        });
    }

});

$('.loader-container, .loader').on('click', function () {
    $('.loader-container').css('display', 'none');
})

if($('#form-contact').length > 0) {
    const validator = new JustValidate('#form-contact');

    validator.addField(document.querySelector('#fullname'), [
        {
            rule: 'required',
            errorMessage: 'Este campo es obligatorio',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Este campo debe tener al menos 3 caracteres',
        }
    ]).addField(document.querySelector('#businnes'), [
        {
            rule: 'required',
            errorMessage: 'Este campo es obligatorio',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Este campo debe tener al menos 3 caracteres',
        }
    ]).addField(document.querySelector('#phone'), [
        {
            rule: 'required',
            errorMessage: 'Este campo es obligatorio',
        },
        {
            rule: 'number',
            errorMessage: 'Este campo debe tener solo números',
        }
    ]).addField(document.querySelector('#email'), [
        {
            rule: 'required',
            errorMessage: 'Este campo es obligatorio',
        },
        {
            rule: 'email',
            errorMessage: 'Por favor ingresa un email válido',
        }
    ]).addField(document.querySelector('#message'), [
        {
            rule: 'required',
            errorMessage: 'Este campo es obligatorio',
        },
        {
            rule: 'minLength',
            value: 20,
            errorMessage: 'Este campo debe tener al menos 20 caracteres',
        }
    ]).onSuccess(event => {
        $('.loader-container').css('display', 'block');
        var raw = JSON.stringify({
            "fullname": $('#fullname').val(),
            "businnes": $('#businnes').val(),
            "phone": $('#phone').val(),
            "email": $('#email').val(),
            "message": $('#message').val(),
            "recaptcha": grecaptcha.getResponse()
        });
        axios.post('https://script.google.com/macros/s/AKfycbx9p9CeYdwAbfUJSsDfGvC1YHZx9GtG8LH71d2YHDtNtSBtHA0rNAtPALaL3gGqD8bv8A/exec',
            raw).then(response => {
                $('.loader-container').css('display', 'none');
                swal({
                    title: "Mensaje enviado",
                    text: "Gracias por contactarnos",
                    icon: "success",
                    buttons: false,
                    timer: 2000,
                    progressBar: true
                });
                $('#form-contact')[0].reset();
        });
    });
}


// menu
window.addEventListener("resize", function() {
    "use strict"; window.location.reload();
});

document.addEventListener("DOMContentLoaded", function()
{
    /////// Prevent closing from click inside dropdown
    document.querySelectorAll('.dropdown-menu').forEach(function(element)
    {
        element.addEventListener('click', function(e)
        {
            e.stopPropagation();
        });
    })
    // make it as accordion for smaller screens
    if (window.innerWidth < 992)
    {
        // close all inner dropdowns when parent is closed
        document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown)
        {
            everydropdown.addEventListener('hidden.bs.dropdown', function()
            {
                // after dropdown is hidden, then find all submenus
                this.querySelectorAll('.submenu')
                    .forEach(function(everysubmenu)
                    {
                        // hide every submenu as well
                        everysubmenu
                            .style
                            .display =
                            'none';
                    });
            })
        });
        document.querySelectorAll('.dropdown-menu a').forEach(function(element)
        {
            element.addEventListener('click', function(e)
            {
                let nextEl = this.nextElementSibling;
                if (nextEl && nextEl.classList
                    .contains('submenu'))
                {
                    // prevent opening link if link needs to open dropdown
                    e.preventDefault();
                    console.log(nextEl);
                    if (nextEl.style.display ==
                        'block')
                    {
                        nextEl.style.display =
                            'none';
                    }
                    else
                    {
                        nextEl.style.display =
                            'block';
                    }
                }
            });

        })
    }
    // end if innerWidth
});
// DOMContentLoaded  end
