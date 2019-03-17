import $ from 'jquery';
import Swiper from "swiper";
import tingle from 'tingle.js';

$(document).ready(() => {
  // set content width
  $('#content').addClass('content-fixed');

  let content_slider = new Swiper('#content', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    shortSwipes: false,
    pagination: {
      el: '.swiper-pagination-v',
      clickable: true
    }
  });

  $(window).on("load resize ", function() {
    var scrollWidth = $('.table-content').width() - $('.table-content table').width();
    $('.table-header').css({'padding-right':scrollWidth});
  }).resize();


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
    const header = $(e.target).closest('.desc').children('.title').text();
    if (header === 'Финский дом 33 м2') {
      get_plan.setContent($('#see-comp-h33').html());
    }
    if (header === 'Финский дом 52 м2') {
      get_plan.setContent($('#see-comp-h52').html());
    }
    if (header === 'Финский дом 64 м2') {
      get_plan.setContent($('#see-comp-h64').html());
    }
    if (header === 'Финская баня 33 м2') {
      get_plan.setContent($('#see-comp-b33').html());
    }
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
    const header = $(e.target).closest('.desc').children('.title').text();
    if (header === 'Финский дом 33 м2') {
      see_more.setContent($('#see_more_template_h33').html());
    }
    if (header === 'Финский дом 52 м2') {
      see_more.setContent($('#see_more_template_h52').html());
    }
    if (header === 'Финский дом 64 м2') {
      see_more.setContent($('#see_more_template_h64').html());
    }
    if (header === 'Финская баня 33 м2') {
      see_more.setContent($('#see_more_template_b33').html());
    }
    see_more.open();
  });
});
