$('.accordeon .list-title').click(function() {
  accordeonSlider( $(this) );
});

$('.video').click(function() {
  runVideo( $(this) );
});

function accordeonSlider(obj) {
  var parentBlock = $(obj).parent();
  var accordeonBody = $(obj).siblings('.list-info');
  if ( $(parentBlock).hasClass('active') ) {
    $(accordeonBody).slideUp(500);
    $(parentBlock).removeClass('active');
  } else {
    $('.list-info').slideUp(500);
    $('.list-item').removeClass('active');
    $(accordeonBody).slideDown(500);
    $(parentBlock).addClass('active');
  }
};

function runVideo(obj) {
  if ( !($(obj).hasClass('active')) ) {
    $(obj).addClass('active');
    $(obj).empty();
    $(obj).css('border-radius', '0');
    $(obj).append('<video id="player" src="videos/affirmation.mp4"  width="100%" height="100%" autoplay="true" controls="controls"></video>');
  }
};

$(window).scroll(function() {
  $('.animated').each(function(){
    var imagePos = $(this).offset().top;
    var topOfWindow = $(window).scrollTop();
		var windowHeight = $(window).height();
		var bottomOfWindow = windowHeight - (windowHeight / 3);

    if (imagePos < topOfWindow + bottomOfWindow) {
			if ($(this).hasClass('first')) {
				$(this).addClass('bounceInLeft');
			} else if ($(this).hasClass('second')) {
				$(this).addClass('bounceInRight');
			} else if ($(this).hasClass('third')) {
				$(this).addClass('zoomIn');
      }
    }
  });
});
