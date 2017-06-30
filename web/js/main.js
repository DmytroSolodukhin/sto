
$(window).on('load', function () {

    $(".open").on("click touch", function() {
        $(this).addClass('oppenned')
    });
    $("body").on("click touchstart", function(event) {
        if ($(event.target).closest(".open").length)return;

       else($('.open').removeClass('oppenned'));

    });


    $("a").on('click touch', function (event) {

        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                window.location.hash = hash;
            });
        } // End if
    });//smoth scroll

    $(".popup").on("click touch", function() {
        // event.preventDefault();
        $('.popup-form').css("display", "block")
    });

// When the user clicks on button close, close it
    $('.modal_close').on("click touch", function() {
        $('.popup-form').hide();
    });

// When the user clicks anywhere outside of the modal, close it
    $(".popup-form").on("click touch", function(event) {
        if ($(event.target).closest(".hello-form").length)return;

        $('.popup-form').hide();
    });

//validation
    function validateError(obj) {
        obj.addClass("error")
    }

    $("#orderName").keyup(function () { //keyup change?
        var oname = $("#orderName").val();
        if (oname.length > 2 && oname.length < 10) {
            $(this).removeClass("error");
        }
    });

    $("#orderPhone").keyup(function () { //keyup change?
        var ophone = $("#orderPhone").val();
        if (ophone.length > 6 && ophone.length < 15) {
            $(this).removeClass("error");
        }
    });

    $("#orderMessage").keyup(function () { //keyup change?
        var omessage = $("#orderMessage").val();
        if (omessage.length > 6 && omessage.length < 100) {
            $(this).removeClass("error");
        }
    });

    $("#commentsName").keyup(function () { //keyup change?
        var cname = $("#commentsName").val();
        if (cname.length > 2 && cname.length < 10) {
            $(this).removeClass("error");
        }
    });

    $("#commentMessage").keyup(function () { //keyup change?
        var cmessage = $("#commentMessage").val();
        if (cmessage.length > 2 && cmessage.length < 100) {
            $(this).removeClass("error");
        }
    });
//

    $("#pop-btn").on("click touch", function () {
        var oname = $("#orderName").val();
        if (oname.length < 2 || oname.length > 10){
            validateError($("#orderName"));
            return
        }
        var ophone = $("#orderPhone").val();
        if (ophone.length < 6 || ophone.length > 15){
            validateError($("#orderPhone"));
            return
        }
        var omessage = $("#orderMessage").val();
        if (omessage.length < 6 || omessage.length > 100){
            validateError($("#orderMessage"));
            return
        }else {  // zamena!!! ajax done!!!
            $('.thankyou').css("display", "block");
            $('.online').hide()
        }
        var request = {
            name: oname,
            phone: ophone,
            message: omessage
        };

        $.ajax({
            method: "POST",
            url: '/restapi/order',
            async: true,
            data: request
        }).done(function (data) {
            if(data['success']){
                $('.thankyou').show();
                $('.online').hide()
            }
        });
    });


//comment-form
// When the user clicks anywhere outside of the modal, close it
    
    $("#trigger").on("click touch", function () {
        var cname = $("#commentsName").val();
        if (cname.length < 2 || cname.length > 10){
            validateError($("#commentsName"));
            return
        }

        var cmessage = $("#commentMessage").val();
        if (cmessage.length < 6 || cmessage.length > 100){
            validateError($("#commentMessage"));
            return
        }else  { $('.window').fadeIn(2000);
            $('#form-container').hide()}
        var request = {
            name: cname,
            message: cmessage
        };

        $.ajax({
            method: "POST",
            url: '/restapi/comments',
            async: true,
            data: request
        }).done(function (data) {
            $('.slider-comments').html('<div class="comments-box"><h4>' + cname + '</h4><div class="yourcomments">'+ cmessage + '</div>');
            $('.window').fadeIn(2000);
            $('#form-container').hide();
        });
    });
});
//

$(document).ready(function () {

    $('.sliderparent').slick({
        dots: true,
        arrows:false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    arrows:false,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    arrows:false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows:false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


$('.slider-comments').slick({
    dots: false,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
});


});

