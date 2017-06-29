$(".popup").on("click touch", function(event) {
    event.preventDefault();
   $('.popup-form').css("display", "block")
});

// $("#pop-btn").on("click touch", function() {// zamena!!! ajax done!!!
//     $('.thankyou').css("display", "block");
//     $('.online').hide()
// });

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
    var name = $("#orderName").val();
    if (name.length > 2 && name.length < 10) {
        $(this).removeClass("error");
    }
});

$("#orderPhone").keyup(function () { //keyup change?
    var phone = $("#orderPhone").val();
    if (phone.length > 6 && phone.length < 15) {
        $(this).removeClass("error");
    }
});

$("#orderMessage").keyup(function () { //keyup change?
    var message = $("#orderMessage").val();
    if (message.length > 6 && message.length < 100) {
        $(this).removeClass("error");
    }
});

$("#commentsName").keyup(function () { //keyup change?
    var name = $("#commentsName").val();
    if (name.length > 2 && name.length < 10) {
        $(this).removeClass("error");
    }
});

$("#commentMessage").keyup(function () { //keyup change?
    var name = $("#commentMessage").val();
    if (name.length > 2 && name.length < 100) {
        $(this).removeClass("error");
    }
});
//

$("#pop-btn").on("click touch", function () {
    var name = $("#orderName").val();
    if (name.length < 2 || name.length > 10){
        validateError($("#orderName"));
        return
    }
    var phone = $("#orderPhone").val();
    if (phone.length < 6 || phone.length > 15){
        validateError($("#orderPhone"));
        return
    }
    var message = $("#orderMessage").val();
    if (message.length < 6 || message.length > 100){
        validateError($("#orderMessage"));
        return
    }
    var request = {
        name: name,
        phone: phone,
        message: message
    };

  $.ajax({
      method: "POST",
      url: 'restapi/order',
      async: true,
      data: request
  }).done(function (data) {
      if(data['success']){
          $('.thankyou').show();
          $('.online').hide()
      }
  });

});
////comment-form
//// When the user clicks anywhere outside of the modal, close it
//$("#trigger").on("click touch", function() {// zamena!!! ajax done!!!
//    $('.window').fadeIn(2000);
//    $('#form-container').hide()
//});

$("#trigger").on("click touch", function () {
    var name = $("#commentsName").val();
    if (name.length < 2 || name.length > 10){
        validateError($("#commentsName"));
        return
    }

    var message = $("#commentMessage").val();
    if (message.length < 6 || message.length > 100){
        validateError($("#commentMessage"));
        return
    }
    var request = {
        name: name,
        message: message
    };

    $.ajax({
        method: "POST",
        url: 'restapi/comments',
        async: true,
        data: request
    }).done(function (data) {
        $('.slider-comments').html('<div class="comments-box"><h4>' + name + '</h4><div class="yourcomments">'+ message + '</div>');
        $('.window').fadeIn(2000);
        $('#form-container').hide();
    });

});

//

$(document).ready(function () {

    $(document).delegate('.open', 'click', function (event) {
        $(this).addClass('oppenned');
        event.stopPropagation();
    });
    $(document).delegate('body', 'click', function (event) {
        $('.open').removeClass('oppenned');
    });
    $(document).delegate('.cls', 'click', function (event) {
        $('.open').removeClass('oppenned');
        event.stopPropagation();
    });

    $('.sliderparent').slick({
        dots: true,
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
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


$('.slider-comments').slick({
    dots: false,
    arrows: false,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
});

    $("a").on('click touch', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });//smoth scroll

});

