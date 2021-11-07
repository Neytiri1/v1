'use strict';

var page = $('.l-wrapper').attr('data-page');
var body = $('body');
var wrapper = $('.l-wrapper');
var jsMenu = $('.c-nav');
var jsMenuBtn = $('.c-hamburger');
var jsMenuItem = $('.c-nav__list-item');

(function () {
  jsMenuBtn.on('click', function () {
    if (jsMenu.hasClass('is-open')) {
      closeMenu();
    } else {
      body.addClass('is-modal-open');
      wrapper.addClass('is-menu-open');
      jsMenu.addClass('is-open');
      jsMenuBtn.addClass('is-open');
      setTimeout(function () {
        jsMenuItem.each(function (i) {
          setTimeout(function () {
            jsMenuItem.eq(i).addClass('is-active');
          }, 50 * i);
        });
      }, 800);
    }
  });

  function closeMenu() {
    body.removeClass('is-modal-open');
    wrapper.removeClass('is-menu-open');
    jsMenuBtn.removeClass('is-open');
    jsMenu.removeClass('is-open');
    jsMenuItem.removeClass('is-active');
  }

  var bg = {
    elm: $('.js-bg'),
    update: function update() {},
    init: function init() {
      var _this = this;

      _this.elm = $('.js-bg');
      $(window).on('load resize scroll', function () {
        _this.elm.each(function (index, val) {
          var parallaxNum = $(val).attr('data-parallax');

          var _num;

          _num = Math.floor($(window).scrollTop() * parallaxNum);
          $(val).css({
            'backgroundPosition': "0 ".concat(-_num, "px")
          });
        });
      });
    }
  };
  bg.init();
  var parallax = {
    elm: $('.js-parallax'),
    update: function update() {},
    init: function init() {
      var _this = this;

      _this.elm = $('.js-parallax');
      $(window).on('load resize scroll', function () {
        _this.elm.each(function (index, val) {
          var parallaxNum = $(val).attr('data-parallax');

          var _num;

          _num = Math.floor(($(window).scrollTop() - $(val).parent().offset().top) * parallaxNum);
          $(val).css({
            'transform': 'translate( 0,' + -_num + 'px)'
          });
        });
      });
    }
  };
  parallax.init();
  var slide = new Swiper('.js-slide', {
    slidesPerView: 1,
    init: false,
    spaceBetween: 0,
    speed: 800,
    allowTouchMove: false,
    effect: 'fade',
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
        $('.js-slideThumb.is-current').removeClass('is-current');
        $('.js-slideThumb').eq(this.activeIndex).addClass('is-current');
      },
      progress: function progress() {},
      touchStart: function touchStart() {},
      setTransition: function setTransition(speed) {}
    }
  });

  if ($('.js-slide').length) {
    slide.init();
    $('.js-slideThumb').on('click', function () {
      var index = $(this).index();
      slide.slideTo(index);
    });
  }
})();

var stage = new createjs.Stage("bgCanvas");
var particleSystem = new particlejs.ParticleSystem();
stage.addChild(particleSystem.container);
particleSystem.importFromJson({
  "bgColor": "#00000",
  "width": 1400,
  "height": 1400,
  "emitFrequency": 90,
  "startX": 700,
  "startXVariance": 1400,
  "startY": 1400,
  "startYVariance": 100,
  "initialDirection": 270,
  "initialDirectionVariance": 0,
  "initialSpeed": 3,
  "initialSpeedVariance": "2",
  "friction": "0.02",
  "accelerationSpeed": "0.04",
  "accelerationDirection": "270",
  "startScale": 0.015,
  "startScaleVariance": 0.15,
  "finishScale": "0",
  "finishScaleVariance": "0",
  "lifeSpan": 200,
  "lifeSpanVariance": 100,
  "startAlpha": "1",
  "startAlphaVariance": "0.58",
  "finishAlpha": "0",
  "finishAlphaVariance": 0.5,
  "shapeIdList": ["circle", "blur_circle"],
  "startColor": {
    "hue": 200,
    "hueVariance": 0,
    "saturation": 100,
    "saturationVariance": "0",
    "luminance": 75,
    "luminanceVariance": "0"
  },
  "blendMode": false,
  "alphaCurveType": "1",
  "VERSION": "1.0.0"
});
createjs.Ticker.framerate = 60;
createjs.Ticker.on("tick", handleTick);

function handleTick() {
  particleSystem.update();
  stage.update();
}

$(window).on('load', function () {
  $('.l-wrapper').addClass('is-load');

  if ($('.l-in').length) {
    setTimeout(function () {
      $('.l-in').addClass('is-active');
    }, 500);
  }

  setTimeout(function () {
    $('.l-loading').addClass('is-end');
  }, 3000);
  setTimeout(function () {
    createjs.Ticker.removeEventListener('tick');
    createjs.Ticker.reset();
    createjs.Ticker._timerId = null;
    createjs.Ticker._inited = false;
  }, 4500);
});
var paramScroll = '';
var paramOp = '';
var urlParam = location.search.substring(1);

if (urlParam) {
  var param = urlParam.split('&');
  var paramArray = [];

  for (var i = 0; i < param.length; i++) {
    var paramItem = param[i].split('=');

    if (paramItem.length > 1) {
      paramArray[paramItem[0]] = paramItem[1];
    }
  }

  if (paramArray.scroll) {
    paramScroll = paramArray.scroll;
  }

  if (paramArray.op) {
    paramOp = paramArray.op;
  }

  $(window).on('load', function () {
    if (paramScroll != '') {
      if ($('.js-param__' + paramScroll).length) {
        setTimeout(function () {
          var target = $('.js-param__' + paramScroll).offset().top;
          $('html, body').stop(true).animate({
            scrollTop: target
          }, 700, 'easeInOutCubic');
        }, 1000);
      }
    }
  });
}

var wW = $(window).outerWidth();
var wH = $(window).innerHeight();

var updateDOM = function updateDOM() {
  wW = $(window).outerWidth();
  wH = $(window).innerHeight();
};

var Modal = {
  instance: null,
  init: function init() {
    var _template = '' + '<div class="m-modal is-close" id="{{ id }}" data-modal-type>' + '  <div class="m-modal__wrap">' + '    <div class="m-modal__bg" data-modal-ui-close></div>' + '    <div class="m-modal__inner">' + '      <div class="m-modal__content">' + '        {{ content }}' + '      </div>' + '    </div>' + '    <div class="m-modal__close" data-modal-ui-close data-pointer>' + '      <span></span>' + '      <span></span>' + '    </div>' + '  </div>' + '</div>';

    this.instance = new MODAL_MODULE({
      duration: 800,
      zIndex: 10,
      removeWrapperTag: false,
      defaultModalStyle: false,
      customModalHtml: _template,
      customModalStyle: '<style>.m-modal {} </style>',
      loadStart: false,
      elemOutputSelector: '.l-wrapper',
      elemYoutubePlayerAspectRatio: '16:9',
      movie: {
        youtube: {
          height: '360',
          width: '640',
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            controls: 1,
            disablekb: 0,
            fs: 1,
            loop: 0,
            rel: 0
          }
        }
      },
      on: {}
    });
  }
};

if ($('[data-modal]').length) {
  Modal.init();
}

$(window).on('load resize', function () {
  updateDOM();
});