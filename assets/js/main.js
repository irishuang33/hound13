$(function(){
	var width = $(window).width(),
		height = $(window).height();
	if ( width >= 768 ) {
		$("header").css({
			"height": ((width * 9) / 16)
		})
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

	// slides
	$(".slider").each(function () {
		var $slider = $(this),
			$slider_wrap = $slider.children(".slider-wrap"),
			$slider_navi_prev = $(this).children(".slider-navi").children(".slider-navi--prev"),
			$slider_navi_next = $(this).children(".slider-navi").children(".slider-navi--next"),
			$slider_item = $slider_wrap.children(".slider-item"),
			slider_item_width = $(this).parent().outerWidth(), //每張slide寬度
			slider_count = $slider_item.length,
			slider_item_index = 0, //預宣告slide為0
			index = 0;

		if ( $slider.hasClass("slider-lr") ) {
			$slider_wrap.css({
				"width": slider_item_width * (slider_count + 1),
			});
			$slider_item.css({
				"width": slider_item_width
			});
		}
		// $slider_item.first().clone().css({
		// 	"width": slider_item_width
		// }).appendTo($slider_wrap);
		console.log(slider_item_width);
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
		function switch_dot() {
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
		$slider_navi_next.click(switch_next);
		$slider_navi_prev.click(switch_prev);
		// var sid = setInterval(switch_next, 2000);
		// $slider.hover(function() {
		// 	clearInterval(sid);
		// },function() {
		// 	sid = setInterval(switch_next, 2000);
		// });
	})
});