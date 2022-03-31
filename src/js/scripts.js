document.addEventListener('DOMContentLoaded', function() {

	initElements();

	// ССЫЛКИ НА МОДАЛЫ
	$('.js-modal-link').click(function(e) {
		e.preventDefault();
		showModal($(this).attr('href') ? $(this).attr('href').substring(1) : $(this).attr('data-target').substring(1));
	});

	// СЛИК СЛАЙДЕРЫ
	$('.js-slider').each(function(i, slider) {
		var mobile = $(slider).attr('data-mobile');
		var adaptive = $(slider).attr('data-adaptive');
		var dots = $(slider).attr('data-dots') === 'false' ? false : true;
		var arrows = $(slider).attr('data-arrows') === 'true' ? true : false;
		var autoplay = $(slider).attr('data-autoplay') ? $(slider).attr('data-autoplay') : false;
		var slidesToShow = adaptive ? Math.floor($(slider).outerWidth() / $(slider).children('li, .li').outerWidth()) : 1;
	
		if (mobile) {
			if ((mobile === 'true' && __isMobile) ||
				(mobile === 'middle' && __isMobileTabletMiddle) ||
				(mobile === 'small' && __isMobileTabletSmall) ||
				(mobile === 'mobile' && __isMobileSmall)) {					
	
				$(slider).slick({
					slidesToShow: slidesToShow,
					slidesToScroll: slidesToShow,
					dots: dots,
					arrows: arrows,
					autoplay: autoplay,
					centerMode: true,
     				centerPadding: '0'
				});
			}
		} else {
			$(slider).slick({
				slidesToShow: slidesToShow,
				slidesToScroll: slidesToShow,
				dots: dots,
				arrows: arrows,
				autoplay: autoplay,
				centerMode: true,
     			centerPadding: '0'
			});
		}
	});

	// ЛАЙТБОКСЫ
	var galleries = new Array();
	$('.js-lightbox').each(function(i, a) {
		if (!$(a).is('[data-gallery]')) {
			$(a).magnificPopup({
				type: 'image',
				removalDelay: 300,
  				mainClass: 'mfp-fade',
				// callbacks: {
			 //        beforeOpen: function() {
			 //            $(this.contentContainer).removeClass('fadeOut').addClass('animated fadeIn');
			 //        },
			 //        beforeClose: function() {
			 //        	$(this.contentContainer).removeClass('fadeIn').addClass('fadeOut');
			 //        }
			 //    },
				midClick: true
			});
		} else {
			if (typeof(galleries[$(a).attr('data-gallery')]) == 'undefined') galleries.push($(a).attr('data-gallery'));
		}
	});
	$.each(galleries, function(i, gallery) {
		$('.js-lightbox[data-gallery="' + gallery + '"]').magnificPopup({
			type: 'image',
			removalDelay: 300,
			callbacks: {
		        beforeOpen: function() {
		             $(this.contentContainer).removeClass('fadeOut').addClass('animated fadeIn');
		        },
		        beforeClose: function() {
		        	$(this.contentContainer).removeClass('fadeIn').addClass('fadeOut');
		        }
		    },
			gallery: {
				enabled: true
			},
			midClick: true
		});
	});

	// БУРГЕР
	function asideOpen() {
		var $side = $('#side-menu');
		if (!$side.data('inited')) {
			$('#mn-main').clone().removeAttr('id').addClass('mn-main').appendTo('#side-menu');
			$('#tel').clone().removeAttr('id').addClass('tel').appendTo('#side-menu');
			$side.data('inited', true);
		}

		$('#modal-fadeout').stop().fadeIn(300);
		$('html').addClass('mobile-opened');
		var aside_h = parseInt($('#side-menu').css('padding-top')) + parseInt($('#side-menu').css('padding-bottom')) + $('#side-menu>.mn-main').outerHeight(true) + $('#side-menu>.tel').outerHeight(true);
		$('html').addClass('html-modal');
		if (aside_h > $(window).height()) $('html').addClass('html-modal-long');
	}
	function asideClose() {
		$('html').removeClass('html-modal mobile-opened');
		$('#modal-fadeout').stop().fadeOut(300);
	}
	$('#ico-burger').click(function() {
		if ($(window).width() < 1350) {
			asideOpen();
		}
	});
	$('#side-menu .close').click(function() {
		if ($(window).width() < 1350) {
			asideClose();
		}
	});
	$('#side-menu').swipe({
		swipeRight: function(event, direction, distance) {
			if ($(window).width() < 1350) {
				asideClose();
			}			
		},
		threshold: 20
	});

	// КАРТА
	if (typeof(ymaps) != 'undefined') {
	    ymaps.ready(function () {
	    	if (document.getElementById('map') != null) {
	    		var map = new ymaps.Map('map', {
		          	center: [55.871329, 48.622977],
		          	zoom: 12,
		          	controls: []
		        });
		        var placemark = new ymaps.Placemark(
		          	[55.871329, 48.622977]
		        );
		        map.geoObjects.add(placemark);
	    	}	        

	    	if (document.getElementById('map2') != null) {
	    		var map2 = new ymaps.Map('map2', {
		          	center: [55.871329, 48.622977],
		          	zoom: 12,
		          	controls: []
		        });
		        var placemark2 = new ymaps.Placemark(
		          	[55.871329, 48.622977]
		        );
		        map2.geoObjects.add(placemark2);
	    	}	        
	    });
  	}

  	// ФОРМА ЗАЯВКИ
  	$('#modal-request form').on('submit', function(e) {
  		e.preventDefault();

  		// DEMO
  		showModal('modal-thanks');
  	});

  	// СКРЫТОЕ
  	$('.js-expand-hidden').click(function() {
  		$(this).parent().find('.mobile-hidden').stop().slideDown(__animationSpeed);
  		$(this).stop().slideUp(__animationSpeed);
  	});
  	$('.js-expand-hidden-to-flex').click(function() {
  		$(this).parent().find('.mobile-hidden').stop().slideDownFlex(__animationSpeed, 'flex', 'mobile-hidden', 'mobile-shown');
  		$(this).stop().slideUp(__animationSpeed);
  	});

});