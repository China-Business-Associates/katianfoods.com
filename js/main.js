// JavaScript Document

(function ($) {
  "use strict";


  var wind = $(window);
    var sticky = $('.header');
    wind.on('scroll', function() {
        var scroll = wind.scrollTop();
        if (scroll < 100) {
            sticky.removeClass('sticky');
        } else {
            sticky.addClass('sticky');
        }
    });

  //Scroll event
  $(window).scroll(function(){
    var scrolled = $(window).scrollTop();
    if (scrolled > 200) $('.go-top').fadeIn('slow');
    if (scrolled < 200) $('.go-top').fadeOut('slow');
  });
  
  //Click event
  $('.go-top').click(function () {
    $("html, body").animate({ scrollTop: "0" },  1000);
  });
  
  
  //counter home page
	
	$('.count').each(function () {
        $(this).prop('key-figures',0).animate({
            Counter: $(this).text()
        }, {
          
          //chnage count up speed here
            duration: 3000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });	

	
	
	// home ourclients script
	$(".home-testimonials .owl-carousel").owlCarousel({
        loop: true,
        margin: 15,
        responsiveClass: true,
        autoplay: true,
        smartSpeed: 1200,
        navText: ['<i class="fa fa-long-arrow-left" aria-hidden="true"></i>', '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'],
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
		dots: false,
        navigation: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            600: {
                items: 1,
                nav: true,
            },
            1000: {
                items: 3,
                nav: true,
                loop: true,
            },
        },
    });
	



$('[data-fancybox]').fancybox({
        loop: true,
        keyboard: true,
        buttons: [
          "zoom",
          "share",
          "slideShow",
          "fullScreen",
          "download",
          "thumbs",
          "close"
        ],
        });



  

})(jQuery);