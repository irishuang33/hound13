$(function(){
	var width = $(window).width(),
		height = $(window).height();
	if ( width >= 768 ) {
		$("header").css({
			"height": ((width * 9) / 16)
		})
	}
	if ( (height / width) < 0.5625 ) {
		$("video").addClass("w-100");
	} else {
		$("video").addClass("h-100");
	}
	$(".function--playFullScreen").on("click", function () {
		$(".black").fadeIn();
		$(".lightbox--video").fadeIn();
	});
	$(".function--close").on("click", function () {
		$(this).parent().parent().fadeOut();
		$(this).parent().parent().siblings(".black").fadeOut();
	});
	$(".black").on("click", function () {
		$(this).fadeOut();
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
		if ( $slider.hasClass("slider-lr") ) {
			$slider_wrap.css({
				"width": slider_item_width * (slider_count + 1),
			});
			$slider_item.css({
				"width": slider_item_width
			});
			$(".card-item").click(function () {
				var index = $(".card-item").index(this);
				$slider_wrap.animate({
					"left": -((index + 1) * slider_item_width)
				});
				$(".character > li.active").removeClass("active");
				$(".character > li").eq(index).addClass("active");
				$(".slider-lr-navi").fadeIn();
			})
			$(".character > li").click(function () {
				var index = $(".character > li").index(this);
				$slider_wrap.animate({
					"left": -((index + 1) * slider_item_width)
				});
				$(".character > li.active").removeClass("active");
				$(".character > li").eq(index).addClass("active");
			})
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
});