
$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
  });

  
$("#single-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    dots: true,
  });
  
  
  $('#multiple-carousel').owlCarousel({
    responsive:{
        0:{
            items:2.2
        },
        576:{
            items:2.4
        },
        768:{
            items:2.8
        },
        992:{
            items:4.5
        },
        1200:{
            items:5.5
        } 
    },
    loop:true,
    margin:10,
    dots: false,
    nav: false,
    autoplay:true,
    autoplayTimeout:2000,
});
$('.play').on('click',function(){
    owl.trigger('play.owl.autoplay',[1000])
})
$('.stop').on('click',function(){
    owl.trigger('stop.owl.autoplay')
})
