$(".tranding-slider").slick({
    slidesToShow: 6,
  slidesToScroll: 1,
  arrows: true,
  dots: true,
  prevArrow: '<i class="fas fa-arrow-left prev"></i>',
  nextArrow: '<i class="fas fa-arrow-right next"></i>',

  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});