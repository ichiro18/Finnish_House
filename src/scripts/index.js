import $ from 'jquery';
import Swiper from "swiper";
import tingle from 'tingle.js';

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
  });


  // * Modals
  // get consultation
  var get_cons = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Закрыть",
    cssClass: ['get_cons'],
  });
  // set content
  get_cons.setContent($('#get_cons_template').html());
  // add a button
  get_cons.addFooterBtn('Получить консультацию', 'tingle-btn tingle-btn--pull-right modal-action-button', function() {
    // here goes some logic
    get_cons.close();
  });
  // open modal
  $('.answer').click((e) => {
    console.log(e.target);
    get_cons.open();
  });

  // get plan
  var get_plan = new tingle.modal({
    footer: false,
    closeMethods: ['overlay', 'button', 'escape'],
    cssClass: ['get_plan'],
  });

  $('.see-comp').click((e) => {
    console.log(e.target);
    get_plan.setContent('<h1>Планировка дома</h1>');
    get_plan.open();
  });

  // Read More
  var see_more = new tingle.modal({
    footer: true,
    stickyFooter: true,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Закрыть",
    cssClass: ['get_cons'],
  });

  see_more.addFooterBtn('Заказать', 'tingle-btn tingle-btn--pull-right modal-action-button', function() {
    // here goes some logic
    see_more.close();
  });
  $('.read-more').click((e) => {
    console.log(e.target);
    see_more.setContent($('#see_more_template').html());
    see_more.open();
  });
});
