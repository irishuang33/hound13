$(function(){
	var width = $(window).width(),
		height = $(window).height();
	$('.page-scroll[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - 0)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});
	if ( width >= 768 ) {
		$("header").css({
			"height": ((width * 9) / 16)
		})
		$("header > video").attr("poster", "assets/img/1920x1080.jpg");
	} else {
		$("header > video").attr("poster", "assets/img/750x1334.jpg");
	}
	if ( (height / width) < 0.5625 ) {
		$("video").addClass("w-100");
	} else {
		$("video").addClass("h-100");
	}
	$(".btn.hamburgur").on("click", function () {
		$("nav").addClass("active").slideDown();
	});
	$(".btn.close").on("click", function () {
		$("nav").removeClass("active").slideUp();
	});
	if ( width < 768 ) {
		$("nav ul li a").on("click", function () {
			$("nav").removeClass("active").slideUp();
		});
	}
	$(".function--playFullScreen").each(function () {
		$(this).on("click", function () {
			$(".black").fadeIn();
			$(".lightbox--video iframe").attr("src", "https://www.youtube.com/embed/" + $(this).data("video"));
			$(".lightbox--video").fadeIn();
		});
	});
	$(".function--close").on("click", function () {
		$(this).parent().parent().fadeOut();
		$(".lightbox--video iframe").attr("src", "");
		$(this).parent().parent().siblings(".black").fadeOut();
		$(this).parent().parent().siblings(".black").fadeOut();
	});
	$(".black").on("click", function () {
		$(this).fadeOut();
		$(".lightbox--video iframe").attr("src", "");
		$(this).siblings(".lightbox").fadeOut();
	});
	$(".storage__open").on("click", function () {
		$(this).parent().toggleClass("active");
	});
	// $(".slider__image").
	// slides
	$(".slider").each(function () {
		var $slider = $(this),
			$slider_wrap = $slider.children(".slider-wrap"),
			$slider_navi_prev = $(this).children(".slider-navi").children(".slider-navi--prev"),
			$slider_navi_next = $(this).children(".slider-navi").children(".slider-navi--next"),
			$slider_item = $slider_wrap.children(".slider-item"),
			slider_item_width = $(this).parent().outerWidth(), //每張slide寬度
			$slider_dot = $(this).children(".slider-dot"),
			slider_count = $slider_item.length,
			slider_item_index = 0, //預宣告slide為0
			index = 0;

		function switch_dot() {
			$slider_dot.children("li.active").removeClass();
			$slider_dot.children("li").eq(index).addClass("active");
		}
		function fade_dot() {
			$slider_wrap.children(".active").removeClass("active");
			$slider_wrap.children().eq(slider_item_index).addClass("active");
		}
		function switch_next() {
			if ($slider_wrap.is(":animated")) return;
			$slider_wrap.animate({left: "-="+slider_item_width}, function() {
				if (index >= slider_count - 1) {
					index = -1;
					$(this).css("left", 0);
				}
				index++;
				switch_dot();
			});
		}
		function switch_prev() {
			if ($slider_wrap.is(":animated")) return;
			if (index <= 0) {
				index = slider_count;
				$slider_wrap.css("left", -(index * slider_item_width));
			}
			$slider_wrap.animate({left: "+="+slider_item_width}, function() {
				index--;
				switch_dot();
			});
		}
		if ( $slider.hasClass("slider-mobile") && (width < 1024) ) {
			$slider_item.first().clone().css({
				"width": slider_item_width
			}).appendTo($slider_wrap);
			$slider_wrap.css({
				"width": slider_item_width * (slider_count + 1),
			});
			$slider_item.css({
				"width": slider_item_width
			});
			// $(this).children(".slider-navi").css({
			// 	"height": slider_item_width
			// });
			$slider_navi_prev.click(
				function switch_prev() {
					if ($slider_wrap.is(":animated")) return;
					if (index <= 0) {
						index = slider_count;
						$slider_wrap.css("left", -(index * slider_item_width));
					}
					$slider_wrap.animate({left: "+="+slider_item_width}, function() {
						index--;
					});
				}
			);
			$slider_navi_next.click(
				function switch_prev() {
					if ($slider_wrap.is(":animated")) return;
					$slider_wrap.animate({left: "-="+slider_item_width}, function() {
						if (index >= slider_count - 1) {
							index = -1;
							$(this).css("left", 0);
						}
						index++;
					});
				}
			);
		}
		if ( $slider.hasClass("slider-lr") ) {
			// $slider_wrap.css({
			// 	"width": slider_item_width * (slider_count + 1),
			// });
			// $slider_item.css({
			// 	"width": slider_item_width
			// });
			// $(".card-group.desktop > .card-item").click(function () {
			// 	var index = $(".card-group.desktop > .card-item").index(this);
			// 	$slider_wrap.animate({
			// 		"left": -((index + 1) * slider_item_width)
			// 	});
			// 	$(".character > li.active").removeClass("active");
			// 	$(".character > li").eq(index).addClass("active");
			// 	$(".slider-lr-navi").fadeIn();
			// })
			// $(".card-group.desktop > .card-item:last-child").click(function () {
			// 	setTimeout(function () {
			// 		$(".slider-lr-navi > li.eq-main").addClass("active");
			// 	})
			// })
			// $(".card-group.mobile > .card-item").click(function () {
			// 	var index = $(".card-group.mobile > .card-item").index(this);
			// 	if(index <= 2){
			// 		$slider_wrap.animate({
			// 			"left": -((index + 1) * slider_item_width)
			// 		});
			// 	}
			// 	if(index == 3){
			// 		$slider_wrap.animate({
			// 			"left": -3 * slider_item_width
			// 		});
			// 		$(".slider-equipment > .slider-wrap > .slider-item").removeClass("active");
			// 		$(".slider-equipment > .slider-wrap > .slider-item").eq(1).addClass("active");
			// 		$(".character > li.active").removeClass("active");
			// 		$(".character > li").eq(2).addClass("active");
			// 	}
			// })
			// $(".slider-lr-navi > li").click(function () {
			// 	$(this).siblings().removeClass("active");
			// 	$(this).addClass("active");
			// 	if ( $(this).hasClass("eq-main") ) {
			// 		$slider_wrap.animate({
			// 			"left": -(3 * slider_item_width)
			// 		});
			// 		$(".slider-equipment > .slider-wrap > .slider-item").removeClass("active");
			// 		$(".slider-equipment > .slider-wrap > .slider-item").eq(0).addClass("active");
			// 		$(".character > li.active").removeClass("active");
			// 		$(".character > li").eq(2).addClass("active");
			// 	}
			// 	if ( $(this).hasClass("eq-sub") ) {
			// 		$slider_wrap.animate({
			// 			"left": -(3 * slider_item_width)
			// 		});
			// 		$(".slider-equipment > .slider-wrap > .slider-item").removeClass("active");
			// 		$(".slider-equipment > .slider-wrap > .slider-item").eq(1).addClass("active");
			// 		$(".character > li.active").removeClass("active");
			// 		$(".character > li").eq(2).addClass("active");
			// 	}
			// })
			// $(".character > li").click(function () {
			// 	var index = $(".character > li").index(this);
			// 	$slider_wrap.animate({
			// 		"left": -((index + 1) * slider_item_width)
			// 	});
			// 	$(".character > li.active").removeClass("active");
			// 	$(".character > li").eq(index).addClass("active");
			// })
			// $(".character > li:last-child").click(function () {
			// 	setTimeout(function () {
			// 		$(".slider-lr-navi > li.eq-main").addClass("active");
			// 	})
			// })
		}
		if ( $slider.hasClass("slider-fade") ) {
			$slider_navi_prev.click(function () {
				if (slider_item_index != 0) {
					slider_item_index--;
				} else {
					slider_item_index = slider_count - 1;
				}
				fade_dot();
				return false;
			})
			$slider_navi_next.click(function () {
				if (slider_item_index != slider_count - 1) {
					slider_item_index++;
				} else {
					slider_item_index = 0;
				}
				fade_dot();
				return false;
			})
		}
		if ( $slider.hasClass("slider-infinite") ) {
			$slider_item.click(function () {
				var index = $slider_item.index(this);
				console.log(index);
				$slider_item.removeClass("before");
				$slider_item.eq(index-1).addClass("before");
				$slider_item.removeClass("active");
				$slider_item.eq(index).addClass("active");
				$slider_dot.children("li.active").removeClass("active");
				$slider_dot.children("li").eq(index).addClass("active");
			})
		}
		// var sid = setInterval(switch_next, 2000);
		// $slider.hover(function() {
		// 	clearInterval(sid);
		// },function() {
		// 	sid = setInterval(switch_next, 2000);
		// });
	})
	$(".tab-navi > li").click(function () {
		var tabsIndex = $(this).index();
		$(this).addClass('active').siblings('.active').removeClass('active');
		$(this).parent().siblings('.tab-content-group').children('.content-item').removeClass('active');
		$(this).parent().siblings('.tab-content-group').children('.content-item').eq(tabsIndex).addClass('active');
	})
});