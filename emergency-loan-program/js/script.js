$(document).ready(function() {
	// fixed header
	$(window).scroll(function() {
		if ($(window).scrollTop() >= 30) {
			$('.site-header').addClass('fixed');
		} else {
			$('.site-header').removeClass('fixed');
		}
	});
	if ($(window).scrollTop() >= 30) {
		$('.site-header').addClass('fixed');
	} else {
		$('.site-header').removeClass('fixed');
	}

	$('.scroll-cta').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - $('.site-header').height()
		}, 500);
	});

	// Mobile Menu
	$(".menu-btn").click(function(){
		$("body").toggleClass("menu-opened");
	});

	if ($('.datepicker').length) {
		var dateToday = new Date(); 
		$( ".datepicker" ).datepicker({
		beforeShowDay: $.datepicker.noWeekends,
		minDate: dateToday
		});
	}

	if ($('.dob').length) {
var dt = new Date();
dt.setFullYear(new Date().getFullYear()-18);


		$( ".dob" ).datepicker({
		viewMode: "years",
		 endDate: '-18y',
		     endDate : dt
		});
	}

	
	// Step slider
	var stepSwiper = new Swiper('.form-swiper-container', {
		autoHeight: true,
		spaceBetween: 30,
		effect: "fade",
		fadeEffect: { crossFade: true },
		observer: true,
		observeParents: true,
		allowTouchMove: false,
		preventClicks: false,
		preventClicksPropagation: false,
		navigation: {
		  nextEl: ".swiper-next",
		  prevEl: ".swiper-prev",
		},
		on: {
			init: function () {
				let heading = this.slides[this.realIndex].querySelector('.form-steps .heading');				
				let oldHeading = heading.innerHTML;
				heading.innerHTML = "<span class='typing'>Vicky is typing <div class='chat-bubble'><div class='inner'><div class='dots'></div><div class='dots'></div><div class='dots'></div></div></div></span>";
				setTimeout(function(){							
					var typed = new Typed(heading, {
					  strings: [oldHeading],
						typeSpeed: 50,
						startDelay: 50,
						backSpeed: 0,
						backDelay: 0,
					  onComplete: function(self) { 
						heading.nextSibling.remove()
					  }
					});								
				},3000)				
			},
		},		
	});
	
	
	stepSwiper.on('beforeTransitionStart', function() {
		let heading = stepSwiper.slides[stepSwiper.realIndex].querySelector('.form-steps .heading');		
/* 		if(heading.offsetHeight > 23){
			setTimeout(function(){				
				let headingHeight = parseInt($('.swiper-wrapper').css('height').split("px")[0]);				
				console.log(headingHeight + heading.offsetHeight)
				$('.swiper-wrapper').height();
			},350)					
		}	 */	
		let oldHeading = heading.innerHTML;
		heading.innerHTML = "<span class='typing'>Vicky is typing <div class='chat-bubble'><div class='inner'><div class='dots'></div><div class='dots'></div><div class='dots'></div></div></div></span>";
		setTimeout(function(){							
			var typed = new Typed(heading, {
			  strings: [oldHeading],
				typeSpeed: 50,
				startDelay: 50,
				backSpeed: 0,
				backDelay: 0,
			  onComplete: function(self) { 
				heading.nextSibling.remove()
			  }
			});								
		},3000)
	});
	
	// stepSwiper.on('resize', function() {
	// 	let heading = stepSwiper.slides[stepSwiper.realIndex].querySelector('.gray-box .profile-info .content .heading');
	// 	let oldHeading = heading.innerHTML;
	// 	heading.innerHTML = "<span class='typing'>Vicky is typing <div class='chat-bubble'><div class='inner'><div class='dots'></div><div class='dots'></div><div class='dots'></div></div></div></span>";
	// 	setTimeout(function(){							
	// 		var typed = new Typed(heading, {
	// 		  strings: [oldHeading],
	// 			typeSpeed: 50,
	// 			startDelay: 50,
	// 			backSpeed: 0,
	// 			backDelay: 0,
	// 		  onComplete: function(self) { 
	// 			heading.nextSibling.remove()
	// 		  }
	// 		});								
	// 	},3000)
	// });	

	stepSwiper.on('transitionEnd', function() {
		$('.step-loading').fadeIn();
		setTimeout(function(){
			$('.step-loading').fadeOut();
		},1500);
		totalStep = stepSwiper.slides.length;
		currentStep = stepSwiper.realIndex;
		percentComplete = Math.round(currentStep * 100 / totalStep) + 5;
		if(currentStep == totalStep - 1) {
			$('.progress-bar .progress-line').css({'width':'100%'});
			$('.progress-bar .progrees-count').html('100%');
			$('.progress-bar .progress-line').addClass('complete');
			//$('.progress-bar .progress-line').addClass('complete');
			//$('.progress-bar .progress-line .progress-updates .text').html('Complete');
		}else{
			$('.progress-bar').show();
			$('.progress-bar .progress-line').css({'width':percentComplete+'%'});	
			$('.progress-bar .progrees-count').html(percentComplete+'%');
		}		
		// if (currentStep > 0) {
		// 	$('body').addClass('step-2');
		// } else {
		// 	$('body').removeClass('step-2');
		// }
	});

	$('.radio-next input[type=radio]').on('click', function() {
		stepSwiper.slideNext();		
	});

	// Accordian
	$('.accordian-title').click(function(e) {
		e.preventDefault();
		let $this = $(this);
		if ($this.next().hasClass('show')) {
			$this.next().removeClass('show');
			$this.removeClass('active');
			$this.next().slideUp(350);
		} else {
		$('.accordian-title').removeClass('active');
			$('.accordian-item .content').removeClass('show');
			$('.accordian-item .content').slideUp(350);
			$this.toggleClass('active');
			$this.next().toggleClass('show');
			$this.next().slideToggle(350);
		}
	});
	
	if ($('[data-rangeslider]').length) {
		var $element = $('[data-rangeslider]');

		// Update additional input on slider change
		$(document).on('input', 'input[type="range"], [data-rangeslider]', function(e) {
			valueOutput(e.target);
		});

		// Range slider initilization
		$element.rangeslider({
			polyfill: false,
			onInit: function() {
				// Update additional input
				valueOutput(this.$element[0]);
				setTimeout(function(){
					$element.trigger('change');
				},0);
			}
		});

		// Focus input on edit icon
		$('.rangeslider-tooltip .edit-icon').on('click', function(){
			// Need to unset-set value otherwise caret will be at wrong position
			$input = $(this).closest('.rangeslider-tooltip').find('input');
			value = $input.val();
			$input.val('');
			$input.val(value);
			$input.focus();
		});

		// Update range slider with manually typed value
		$('.rangeslider-tooltip .wrapper .value input').on('input', function(){
			if ($(this).val() >= parseFloat($(this).attr('min')) && $(this).val() <= parseFloat($(this).attr('max'))) {
				// Within range
				$('input[type="range"]').val($(this).val()).change();
			}
		});

		$('.rangeslider-tooltip .wrapper .value input').on('focusout', function(){
			if(!this.value || parseInt(this.value) < parseInt(this.min)){
				this.value = this.min;
			}

			if(parseInt(this.value) > parseInt(this.max)){
				this.value = this.max;
			}

			if (parseInt(this.value) <= parseFloat($(this).attr('min'))) {
				// Lower than min value
				$('input[type="range"]').val($(this).attr('min')).change();
			} else if (parseInt(this.value) >= parseFloat($(this).attr('max'))) {
				// Greater than max value
				$('input[type="range"]').val($(this).attr('max')).change();
			}
		});

		// Sets value on the additional input
		function valueOutput(element) {
			var value = element.value;
			$('.rangeslider-tooltip .wrapper .value input').val(value);
		}
	}

	if ($('.page-loader').length) {
		setTimeout(function(){
			$('.page-loader').fadeOut();
		}, 1000);
	}
});


function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
