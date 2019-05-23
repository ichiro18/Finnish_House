import $ from 'jquery';
import Swiper from "swiper";
import tingle from 'tingle.js';
import '@fancyapps/fancybox';

$(document).ready(() => {
  $(window).on("load resize ", function() {
    var scrollWidth = $('.table-content').width() - $('.table-content table').width();
    $('.table-header').css({'padding-right':scrollWidth});
  }).resize();

  $('[data-fancybox="gallery"]').fancybox({
    // Options will go here
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
  // open modal
  $('.answer').click((e) => {
    get_cons.open();
  });
  $('.action-button').click((e) => {
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
