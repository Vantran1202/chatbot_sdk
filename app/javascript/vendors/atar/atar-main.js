
$(function() {
	'use strict';

	// Preloader
	$(window).on('load', function() {
		$('.preloader').addClass('preloader-deactivate');
	})

	// Sticky, Go To Top JS
	$(window).on('scroll', function() {
		// Header Sticky JS
		if ($(this).scrollTop() >100){
			$('.navbar').addClass("is-sticky");
		}
		else{
			$('.navbar').removeClass("is-sticky");
		};
	});

	// Banner Slides
	let bannerSwiper = new Swiper(".bannerSwiper", {
		loop: false,
		speed: 4000,
		freemode: false,
		spaceBetween: 20,
		simulateTouch: false,
		autoplay: {
			delay: 1,
			disableOnInteraction: false
		},
		breakpoints: {
			0: {
				slidesPerView: 3
			},
			576: {
				slidesPerView: 4
			},
			768: {
				slidesPerView: 5
			},
			992: {
				slidesPerView: 6
			},
			1200: {
				slidesPerView: 7
			},
			1400: {
				slidesPerView: 8
			}
		}
	});

	// Banner Slides 2
	let bannerSwiper2 = new Swiper(".bannerSwiper2", {
		loop: false,
		speed: 4000,
		freemode: false,
		spaceBetween: 20,
		simulateTouch: false,
		autoplay: {
			delay: 1,
			disableOnInteraction: false
		},
		breakpoints: {
			0: {
				slidesPerView: 3
			},
			576: {
				slidesPerView: 4
			},
			768: {
				slidesPerView: 5
			},
			992: {
				slidesPerView: 6
			},
			1200: {
				slidesPerView: 7
			},
			1400: {
				slidesPerView: 8
			}
		}
	});

	// Text Slider Slides
	let textSliderSwiper = new Swiper(".textSliderSwiper", {
		loop: false,
		speed: 15000,
		freemode: false,
		spaceBetween: 25,
		simulateTouch: false,
		slidesPerView: "auto",
		autoplay: {
			delay: 1,
			disableOnInteraction: false
		},
		breakpoints: {
			0: {
				spaceBetween: 25
			},
			576: {
				spaceBetween: 50
			},
			768: {
				spaceBetween: 50
			},
			992: {
				spaceBetween: 50
			},
			1200: {
				spaceBetween: 50
			},
			1400: {
				spaceBetween: 50
			}
		}
	});

	// Brands Slides
	let brandsSwiper = new Swiper(".brandsSwiper", {
		loop: false,
		speed: 15000,
		freemode: false,
		spaceBetween: 25,
		simulateTouch: false,
		autoplay: {
			delay: 1,
			disableOnInteraction: false
		},
		breakpoints: {
			0: {
				slidesPerView: 3
			},
			576: {
				slidesPerView: 5
			},
			768: {
				slidesPerView: 6
			},
			992: {
				slidesPerView: 7
			},
			1200: {
				slidesPerView: 7
			},
			1400: {
				slidesPerView: 7
			}
		}
	});

	// Testimonials Slides
	let testimonialsSwiper = new Swiper(".testimonialsSwiper", {
		loop: true,
		freemode: true,
		grabCursor: true,
		spaceBetween: 25,
		autoplay: {
			delay: 4500,
			disableOnInteraction: false
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 25
			},
			576: {
				slidesPerView: 1,
				spaceBetween: 25
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 25
			},
			992: {
				slidesPerView: 2,
				spaceBetween: 25
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 35
			},
			1400: {
				slidesPerView: 3,
				spaceBetween: 55
			}
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	});

	// Popular Articles Slides
	let popularArticlesSwiper = new Swiper(".popularArticlesSwiper", {
		loop: false,
		freemode: true,
		spaceBetween: 0,
		grabCursor: true,
		autoHeight: true,
		autoplay: {
			delay: 4500,
			disableOnInteraction: false
		},
		breakpoints: {
			0: {
				slidesPerView: 1
			},
			576: {
				slidesPerView: 1
			},
			768: {
				slidesPerView: 1
			},
			992: {
				slidesPerView: 2
			},
			1200: {
				slidesPerView: 2
			},
			1400: {
				slidesPerView: 2
			}
		},
		navigation: {
			nextEl: ".pa-swiper-button-next",
			prevEl: ".pa-swiper-button-prev"
		}
	});

	// Top Stories Slides
	let topStoriesSwiper = new Swiper(".topStoriesSwiper .swiper", {
		loop: true,
		freemode: true,
		spaceBetween: 25,
		grabCursor: true,
		autoplay: {
			delay: 4500,
			disableOnInteraction: false
		},
		breakpoints: {
			0: {
				slidesPerView: 1
			},
			576: {
				slidesPerView: 1
			},
			768: {
				slidesPerView: 2
			},
			992: {
				slidesPerView: 3
			},
			1200: {
				slidesPerView: 3
			},
			1400: {
				slidesPerView: 4
			}
		},
		navigation: {
			nextEl: ".ts-swiper-button-next",
			prevEl: ".ts-swiper-button-prev"
		}
	});

	// Typewriter
	let TxtType = function(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	};
	TxtType.prototype.tick = function() {
		let i = this.loopNum % this.toRotate.length;
		let fullTxt = this.toRotate[i];
		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}
		this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
		let that = this;
		let delta = 200 - Math.random() * 100;
		if (this.isDeleting) { delta /= 2; }
		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}
		setTimeout(function() {
			that.tick();
		}, delta);
	};
	window.onload = function(){
		let elements = document.getElementsByClassName('typewrite');
		for (let i=0; i<elements.length; i++) {
			let toRotate = elements[i].getAttribute('data-type');
			let period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtType(elements[i], JSON.parse(toRotate), period);
			}
		}
		let css = document.createElement("style");
		css.TxtType = "text/css";
		css.innerHTML = ".typewrite > .wrap { border-right: 1px solid #ffffff}";
		document.body.appendChild(css);
	};

	// Scroll Event
	$(window).on('scroll', function(){
		var scrolled = $(window).scrollTop();
		if (scrolled > 100) $('.go-top').addClass('active');
		if (scrolled < 100) $('.go-top').removeClass('active');
	});

	// Click Event
	$('.go-top').on('click', function() {
		$("html, body").animate({ scrollTop: "0" },  100);
	});
}(jQuery));

