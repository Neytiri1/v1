'use strict';

(function () {
  var Charaslide = new Swiper('#charaSlide', {
    slidesPerView: 1,
    init: false,
    spaceBetween: 0,
    speed: 800,
    allowTouchMove: false,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    hashNavigation: {
      replaceState: true
    },
    on: {
      init: function init() {},
      slideChangeTransitionStart: function slideChangeTransitionStart() {},
      slideChange: function slideChange() {
        $('.js-charaslide-thumb.is-current').removeClass('is-current');
        $('.js-charaslide-thumb[data-index-num="' + this.activeIndex + '"]').addClass('is-current');
      }
    }
  });
  Charaslide.init();
  $('.js-charaslide-thumb').on('click', function () {
    Charaslide.slideTo($(this).data('indexNum'));
  });
})();

$(function () {
  $('.p-chara__change-btn').on('click', function (evt) {
    var index = $('.p-chara__change-btn').index($(this));
    var type = $(evt.target).attr('data-type');
    console.log(type);
    $(this).parent().find('li').removeClass('is-current');
    $(evt.currentTarget).addClass('is-current');
    console.log(evt.currentTarget);
    $(this).parent().parent().parent().find('.p-chara__info-img_change[data-type != ' + type + ']').removeClass('is-current');
    $(this).parent().parent().parent().find('.p-chara__info-img_change[data-type=' + type + ']').addClass('is-current');
  });
});