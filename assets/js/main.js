$(function(){
	var width = $(window).width(),
		height = $(window).height();
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
});