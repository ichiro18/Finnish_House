import $ from 'jquery';
import Swiper from "swiper";

$(document).ready(() => {
  // set content width
  $('#content').addClass('content-fixed');

  let content_slider = new Swiper('#content', {
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination-v',
      clickable: true
    }
  });

  $(document).on('wheel', (e) => {
    let delta = e.originalEvent.deltaY;
    if (delta > 0){
      content_slider.slideNext();
    } else {
      content_slider.slidePrev();
    }
  })
});
