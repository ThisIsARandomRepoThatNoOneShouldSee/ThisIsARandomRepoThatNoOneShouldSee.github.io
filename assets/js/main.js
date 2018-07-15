(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

	});

	var x = document.getElementById("demo");
	if(x && navigator.geolocation)
            navigator.geolocation.getCurrentPosition(position => $("a#demo").replaceWith(
                '<a id=\"demo\" href=\"https://www.google.com/maps/dir/' + position.coords.latitude + ','
                + position.coords.longitude
                +'/1434+S+Water+Ave,+Gallatin,+TN+37066/@36.350183,-86.4741911,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x88643a'
                + 'e7f687c36f:0x267eb0a90cfd6ff6!2m2!1d-86.4391717!2d36.350119\">Location</a>'))


})(jQuery);

// Get the modal
var modal = document.getElementsByClassName('modal');

// Get the button that opens the modal
var btn = document.getElementById("btn");
var btn2 = document.getElementById("btn2");

if(btn) {
//When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal[0].style.display = "block";
    }
    btn2.onclick = function () {
        modal[1].style.display = "block";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        var i = 0, len = modal.length;
        for (; i < len; ++i)
            if (event.target === modal[i]) {
                modal[i].style.display = "none";
                break;
            }
    }
}

var Count = {counter: 0};

function hover(element) {
    if($('div#myModal').has(element).length) {
        var modal_banner = $('#myModal .modal-banner')[0];
    }

    else if($('div#myModal2').has(element).length) {
        var modal_banner = $('#myModal2 .modal-banner')[0];
    }
    var modal_banner_src = modal_banner.src;
    var element_src = element.src;
    modal_banner.setAttribute('src', element_src);
    element.setAttribute('src', modal_banner_src);
}

function clicked(element) {
    if($('div#myModal').has(element).length) {
        var modal_pics = $('#myModal .modal-pic');
    }

    else if($('div#myModal2').has(element).length) {
        var modal_pics = $('#myModal2 .modal-pic');
    }

    var modal_banner_src = element.src;
    var pic_src = modal_pics[Count.counter].src;
    element.setAttribute('src', pic_src);
    modal_pics[Count.counter].setAttribute('src', modal_banner_src);
    Count.counter = (Count.counter + 1)%modal_pics.length;

}