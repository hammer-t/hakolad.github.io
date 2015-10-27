
	"use strict";

	//References to DOM elements
	var $window = $(window);
	var $document = $(document);

	// Other variable stuff
	var $navButtons = $("nav#menu a").filter("[href^=#]");
	var $startButton = $("p#start-navigation a").filter("[href^=#]");
	var $slides = $(".level");
	var $currentSlide = $slides.first();
	var $indexCurrentSlide = 0;

	//Animating flag - is our app animating
	var isAnimating = false;

	// colors that we use
	var colors = ['#202020', '#f3a33f']

	//The height and width of the window
	var pageHeight = $window.innerHeight();
	var pageWidth = $window.innerWidth();

	var $realisationNav = $('nav#realisation-nav'),
		$prestationNav = $('nav#prestation-nav');

	// Key codes for left and right arrows on keyboard. 
	// We'll be using this to navigate change slides using the keyboard
	var keyCodes = {
		LEFT  : 37,
		UP  : 38,
		RIGHT: 39,
		DOWN: 40
	}

	/*
	 * Event listener
	 */

	$window.on("resize", onResize).resize();
	$document.on("keydown", onKeyDown);
	$navButtons.on("click", onNavButtonClick);
	$startButton.on("click", homeFrontAnimationClick);
	//$window.on("mousewheel DOMMouseScroll", onMouseWheel);

	$window.on('mousewheel', onMouseWheel);

	/*
	 *   Getting the pressed key. Only if it's left or right arrow, we go to prev or next slide and prevent default behaviour
	 *   This way, if there's text input, the user is still able to fill it
	 */
	function onKeyDown(event) {

		var PRESSED_KEY = event.keyCode;

		if(PRESSED_KEY == keyCodes.LEFT) {
			goToPrevSlide();
			event.preventDefault();
		} else if(PRESSED_KEY == keyCodes.RIGHT) {
			goToNextSlide();
			event.preventDefault();
		} else if(PRESSED_KEY == keyCodes.DOWN) {
			// In thic case, we're on the home front slide
			if($indexCurrentSlide === 0)
				homeFrontAnimation();
			else if($indexCurrentSlide === 4)
				goToNextReal();			
			else if($indexCurrentSlide === 3)
				goToNextPrestation();
			else if($indexCurrentSlide === 2)
				goToNextAtelier();
		} else if(PRESSED_KEY == keyCodes.UP) {
			if($indexCurrentSlide === 4)
				goToPrevReal();
			else if($indexCurrentSlide === 3)
				goToPrevPrestation();
			else if($indexCurrentSlide === 2)
				goToPrevAtelier();
		}

	}

	/*
	 *   When user scrolls with the mouse, we have to do specific effect on each slides
	 */
	function onMouseWheel(event) {

		//Normalize event wheel delta
		var delta = event.deltaY;

		// If we are on the front home slide
		if(delta === -1 && $indexCurrentSlide === 0)
			homeFrontAnimation();
		else if(delta === -1 && $indexCurrentSlide === 4)
			goToNextReal();
		else if(delta === 1 && $indexCurrentSlide === 4)
			goToPrevReal();
		else if(delta === -1 && $indexCurrentSlide === 3)
			goToNextPrestation();
		else if(delta === 1 && $indexCurrentSlide === 3)
			goToPrevPrestation();
		else if(delta === -1 && $indexCurrentSlide === 2)
			goToNextAtelier();
		else if(delta === 1 && $indexCurrentSlide === 2)
			goToPrevAtelier();

		event.preventDefault();
	}

	/*
	 *   If there's a previous slide, slide to it
	 */
	function goToPrevSlide() {
		// We just don't want to be able to go back to the first slide
		if($currentSlide.prev().length && $indexCurrentSlide != 1 && $indexCurrentSlide != 0)
			goToSlide($currentSlide.prev());
	}

	/*
	 *   If there's a next slide, slide to it
	 */
	function goToNextSlide() {
		if($currentSlide.next().length && $indexCurrentSlide != 0)
			goToSlide($currentSlide.next());
	}

	/*
	 *   When a button is clicked - first get the button href, and then slide to the container, if there's such a container
	 */
	function onNavButtonClick(event) {
		//The clicked button
		var $button = $(this);

		//The slide the button points to
		var $slide = $($button.attr("href"));

		//If the slide exists, we go to it
		if($slide.length) {
			$('nav#menu a.active').removeClass('active');
			$($button).addClass('active');
			goToSlide($slide);
			event.preventDefault();
		}

	}

	/*
	 * We move and do the effect on each slide
	 */

	function goToSlide($slide) {

		// We check if we're not already moving and if there is a such slide
		// We check if it's not already the current slide
		if(!isAnimating && $slide.length && $($slide).attr('id') != $($currentSlide).attr('id')) {

			// We know define that we're moving
			isAnimating = true;
			$currentSlide = $slide;
			$indexCurrentSlide = $($slides).index($slide);

			var timeline = new TimelineMax({ paused: true });

			timeline.add(TweenMax.to($slides, 0.75, {scale: 0.95}), 0);

			// This slide is the slide we want to see
			timeline.add(TweenMax.to($slides[$indexCurrentSlide], 1.25, {x: 0, ease: Back.easeOut}), 0.75);

			var iPos = $indexCurrentSlide;

			for (var i = 1; i < $indexCurrentSlide; i++) {		
				iPos--;		
				timeline.add(TweenMax.to($slides[i], 1.25, {x: - (iPos * pageWidth), ease: Back.easeOut}), 0.75);
			};

			var iPos = 0;

			for (var i = $indexCurrentSlide + 1; i < $slides.length; i++) {	
				iPos++;			
				timeline.add(TweenMax.to($slides[i], 1.25, {x: (iPos * pageWidth), ease: Back.easeOut}), 0.75);
			};

			// Let's rock and roll !
			timeline.play();
			// Call the end function
			timeline.call(completeFunctionSlide);

		}

		if($indexCurrentSlide === 2)
			launchLeftImageScale();
		else
			killLeftImageScale();

	}

	// We call this function to stay on the right slide in the matrix when we resize the window

	function stayOnSlide($slide) {

		// We check if we're not already moving and if there is a such slide
		// We check if it's not already the current slide
		if(!isAnimating && $slide.length && $indexCurrentSlide != 0) {

			$indexCurrentSlide = $($slides).index($slide);
			var timelineStay = new TimelineMax({ paused: true });

			timelineStay.add(TweenMax.to($slides[$indexCurrentSlide], 0.3, {x: 0}));

			var iPos = $indexCurrentSlide;

			for (var i = 1; i < $indexCurrentSlide; i++) {		
				iPos--;		
				timelineStay.add(TweenMax.to($slides[i], 0.3, {x: - (iPos * pageWidth)}));
			};

			var iPos = 0;

			for (var i = $indexCurrentSlide + 1; i < $slides.length; i++) {	
				iPos++;			
				timelineStay.add(TweenMax.to($slides[i], 0.3, {x: (iPos * pageWidth)}));
			};

			// Let's rock and roll !
			timelineStay.play();

		}

	}

	/*
	 * We set everything at the default statut
	 */

	function completeFunctionSlide() {
		TweenMax.to($slides, 0.75, {scale: 1});
		isAnimating = false;

		if($indexCurrentSlide === 4 && !initMenuReal)
			menuRealAppears();

	}

	/*
	 *   When user resize it's browser we need to know the new height and width
	 */

	function onResize(event) {

		//This will give us the new height and width of the window
		pageHeight = $window.innerHeight();
		pageWidth = $window.innerWidth();

		// For Realisation page
		$realisationNav.css({lineHeight: $window.height() + 'px'});
		$prestationNav.css({lineHeight: $window.height() + 'px'});

		stayOnSlide($currentSlide);

	}

	/*
	 *   Home front animation, we faoeout the slide and appears the front(2) slide
	 */

	function homeFrontAnimationClick(event) {

		homeFrontAnimation();
		event.preventDefault();

	}

	function homeFrontAnimation(event, isBool) {

		// We block the animation, in case of...
		isAnimating = true;

		var timeline = new TimelineMax({ paused: true });
		timeline.add(TweenMax.to($slides[0], 1, {opacity: 0}), 0);
		timeline.add(TweenMax.to($slides[1], 0.75, {y: 0}), 0);
		timeline.play();
		timeline.call(onCompleteHomeFront);

	}

	function onCompleteHomeFront() {
		// we don't want to see this slide anymore
		TweenMax.to($slides[0], 0, {y: -pageHeight});

		isAnimating = false;
		$currentSlide = $(".level:nth-child(2)");
		$indexCurrentSlide = 1;
		menuAppears();
	}

	/*
	 * Menu effect =p=
	 */

	var logo = $('#logo'),
		menu = $('#menu'),
		menuLink = $('#menu a');

	TweenLite.set(logo, {css: {rotationY: 180, transformOrigin: "left top"}});
	TweenLite.set(menu, {css: {marginLeft: -menu.width(), opacity: 0}});
	TweenLite.set(menuLink, {css:{scale: 0.2, opacity: 0}});

	function menuAppears() {

		var menuTimeline = new TimelineMax();
		menuTimeline.to(logo, .6, {rotationY: 0, transformOrigin:"left top"})
		.set(menu, {css:{opacity: 1}})
		.to(menu, .4, {marginLeft: 0, ease: Power2.easeOut})
		.staggerTo(menuLink, 0.25,  {scale:1, opacity:1}, 0.25);
		
	}

	/*
	 * Atelier =p=
	 */

	var $atelierImageContainer = $('section#atelier article .left'),
		$ateliers = $('section#atelier .ateliers'),
		$currentAtelier = $ateliers.first(),
		$sectionAtelier = $('section#atelier'),
		$leftScaleVar = TweenMax.to($($currentAtelier).find('.left').find('p'), 160, {scale:1.35, repeat:-1, yoyo:true}, 0.5);

	$leftScaleVar.pause();

	// We want to set the image as a background
	$atelierImageContainer.each(function(index, value) {

		var imageLink = $(this).find('img').attr('src');
		$(this).find('p').css({
			'background-image': 'url(' + imageLink + ')'
		});

		$(this).find('img').css({display: 'none'});

	});

	// We want to align articles
	TweenLite.set($ateliers[0], {css: {top: 0, zIndex: 10}});
	TweenLite.set($ateliers[1], {css: {top: 0, zIndex: 9}});
	TweenLite.set($($ateliers[1]).find('.left'), {css: {y: '-100%'}});
	TweenLite.set($($ateliers[1]).find('.right'), {css: {y: '100%'}});

	function launchLeftImageScale() {
		TweenLite.set($($currentAtelier).find('.left').find('p'), {css: {scale: 1}});
		$leftScaleVar = TweenMax.to($($currentAtelier).find('.left').find('p'), 160, {scale:1.35, repeat:-1, yoyo:true}, 0.5);
	}

	function killLeftImageScale() {
		//TweenLite.set($($ateliers).find('.left').find('p'), {css: {scale: 1}});
		$leftScaleVar.pause();
	}

	function goToNextAtelierAnimation($atelier) {

		if(!isAnimating) {

			isAnimating = true;

			TweenLite.set($($currentAtelier), {css: {top: 0, zIndex: 9}});
			TweenLite.set($($atelier), {css: {top: 0, zIndex: 10}});
			TweenLite.set($($atelier).find('.left'), {css: {y: "-100%"}});

			$leftScaleVar.pause();
			TweenLite.set($($atelier).find('.left').find('p'), {css: {scale: 1}});

			var atelierTimeline = new TimelineMax({ paused: true });

			atelierTimeline.add(TweenMax.to($($currentAtelier).find('.left'), 1.25, {y: "100%", ease: Power1.easeIn}), 0);
			atelierTimeline.add(TweenMax.to($($currentAtelier).find('.right'), 1.25, {y: "-100%", ease: Power1.easeIn}), 0);
			atelierTimeline.add(TweenMax.to($($atelier).find('.left'), 1.25, {y: "0%", ease: Power1.easeOut}), 0);
			atelierTimeline.add(TweenMax.to($($atelier).find('.right'), 1.25, {y: "0%", ease: Power1.easeOut}), 0);
			atelierTimeline.add(TweenMax.to($sectionAtelier, 0.95, {backgroundColor: colors[1]}), 0);

			atelierTimeline.play();
			atelierTimeline.call(completeFunctionAtelier);	

			$currentAtelier = $atelier;

		}

	}

	function goToPrevAtelierAnimation($atelier) {

		if(!isAnimating) {

			isAnimating = true;

			TweenLite.set($($currentAtelier), {css: {top: 0, zIndex: 9}});
			TweenLite.set($($atelier), {css: {top: 0, zIndex: 10}});
			TweenLite.set($($atelier).find('.left'), {css: {y: "100%"}});

			$leftScaleVar.pause();
			TweenLite.set($($atelier).find('.left').find('p'), {css: {scale: 1}});

			var atelierTimeline = new TimelineMax({ paused: true });

			atelierTimeline.add(TweenMax.to($($currentAtelier).find('.left'), 1.25, {y: "-100%", ease: Power1.easeIn}), 0);
			atelierTimeline.add(TweenMax.to($($currentAtelier).find('.right'), 1.25, {y: "100%", ease: Power1.easeIn}), 0);
			atelierTimeline.add(TweenMax.to($($atelier).find('.left'), 1.25, {y: "0%", ease: Power1.easeOut}), 0);
			atelierTimeline.add(TweenMax.to($($atelier).find('.right'), 1.25, {y: "0%", ease: Power1.easeOut}), 0);
			atelierTimeline.add(TweenMax.to($sectionAtelier, 0.95, {backgroundColor: colors[0]}), 0);

			atelierTimeline.play();
			atelierTimeline.call(completeFunctionAtelier);	

			$currentAtelier = $atelier;

		}

	}

	function completeFunctionAtelier() {
		isAnimating = false;
		$leftScaleVar = TweenMax.to($($currentAtelier).find('.left').find('p'), 160, {scale:1.35, repeat:-1, yoyo:true}, 0.5);
	}

	function goToNextAtelier() {
		if($currentAtelier.next('.ateliers').length)
			goToNextAtelierAnimation($currentAtelier.next('.ateliers'));
	}

	function goToPrevAtelier() {
		if($currentAtelier.prev('.ateliers').length)
			goToPrevAtelierAnimation($currentAtelier.prev('.ateliers'));
	}

	/*
	 * Prestations =p=
	 */

	var $prestations = $('article.prestation-explain'),
		$currentPrestation = $prestations.first(),
		$prestationsBackground = $('div#explain-background'),
		$prestationsNavButton = $('nav#prestation-nav a'),
		backgroundColorPrestation = 0;

	// We're by default on the first slide, so we activated the first link in menu
	$('nav#prestation-nav li:first-child a').addClass('active');

	// Event listener
	$prestationsNavButton.on("click", onPrestationClick);

	// We need to configure everything in JS
	TweenLite.set($prestations, {css: {background: 'none', zIndex: 1, transformStyle:'preserve-3d', transformOrigin:"bottom center"}});
	TweenLite.set($prestations[0], {css: {zIndex: 13}});

	// Function event listener
	function onPrestationClick(event) {

		if(!isAnimating) {

			var thisClickIndex = $(this).parent().index(),
				currentActiveIndex = $('nav#prestation-nav a.active').parent().index();

			// We need this fix to keep the function .next() and .prev() available for scroll and click
			var nextPrestationId = $($prestations[thisClickIndex]).attr('id'),
				nextPrestation = $prestations.filter('#' + nextPrestationId);

			if(thisClickIndex === currentActiveIndex)
				return;
			else if(thisClickIndex > currentActiveIndex)
				goToNextPrestationAnimation(nextPrestation);
			else if(thisClickIndex < currentActiveIndex)
				goToPrevPrestationAnimation(nextPrestation);

		}

		event.preventDefault();
		
	}

	function goToPrevPrestationAnimation($prestation) {

		if(!isAnimating) {

			isAnimating = true;

			if(backgroundColorPrestation === 0)
				$($prestation).removeClass('yellow');
			else
				$($prestation).addClass('yellow');

			$('nav#prestation-nav li a.active').removeClass('active');
			$('nav#prestation-nav li a[href="#' + $($prestation).attr('id') + '"]').addClass('active');

			TweenLite.set($currentPrestation, {css: {y: 0, zIndex: 12}});
			TweenLite.set($prestation, {css: {y: "-100%", zIndex: 13}});

			var prestationTimeline = new TimelineMax({ paused: true });

			prestationTimeline.add(TweenMax.to($currentPrestation, 1.25, {y: "100%", ease: Power1.easeIn}), 0);
			prestationTimeline.add(TweenMax.to($prestation, 1.25, {y: "0%", ease: Power1.easeOut}), 0);
			prestationTimeline.add(TweenMax.to($prestationsBackground, 0.95, {backgroundColor: colors[backgroundColorPrestation]}), 0);

			prestationTimeline.play();
			prestationTimeline.call(completeFunctionPrestation);	

			$currentPrestation = $prestation;

		}

	}

	function goToNextPrestationAnimation($prestation) {

		if(!isAnimating) {

			isAnimating = true;

			if(backgroundColorPrestation === 0)
				$($prestation).removeClass('yellow');
			else
				$($prestation).addClass('yellow');

			$('nav#prestation-nav li a.active').removeClass('active');
			$('nav#prestation-nav li a[href="#' + $($prestation).attr('id') + '"]').addClass('active');

			TweenLite.set($currentPrestation, {css: {y: 0, zIndex: 12}});
			TweenLite.set($prestation, {css: {y: "100%", zIndex: 13}});

			var prestationTimeline = new TimelineMax({ paused: true });

			prestationTimeline.add(TweenMax.to($currentPrestation, 1.25, {y: "-100%", ease: Power1.easeIn}), 0);
			prestationTimeline.add(TweenMax.to($prestation, 1.25, {y: "0%", ease: Power1.easeOut}), 0);
			prestationTimeline.add(TweenMax.to($prestationsBackground, 0.95, {backgroundColor: colors[backgroundColorPrestation]}), 0);

			prestationTimeline.play();
			prestationTimeline.call(completeFunctionPrestation);	

			$currentPrestation = $prestation;

		}

	}
	
	function goToPrevPrestation() {
		if($currentPrestation.prev('.prestation-explain').length)
			goToPrevPrestationAnimation($currentPrestation.prev('.prestation-explain'));
	}

	function goToNextPrestation() {
		if($currentPrestation.next('.prestation-explain').length)
			goToNextPrestationAnimation($currentPrestation.next('.prestation-explain'));
	}

	function completeFunctionPrestation() {

		isAnimating = false;

		if(backgroundColorPrestation === 0)
			backgroundColorPrestation = 1;
		else 
			backgroundColorPrestation = 0;

	}

	/*
	 * Realisation =p=
	 */

	// Variable for this section
	var $realisations = $('.realisations'),	
		$reaNavButton = $('nav#realisation-nav a'),
		$currentReal = $realisations.first(),
		initMenuReal = false;

	// Event listener
	$reaNavButton.on("click", onRealClick);
	$reaNavButton.on("mouseover", onRealHover);

	// We need to configure everything in JS
	TweenLite.set($realisations, {css: {position: 'absolute', top: 0, left: 0, opacity: 0, zIndex: 1, transformStyle:'preserve-3d', transformOrigin:"bottom center"}});
	TweenLite.set($realisations[0], {css: {position: 'absolute', top: 0, left: 0, opacity: 1, zIndex: 11}});

	// To do the vertical align in the realisation menu
	$('nav#realisation-nav').css({lineHeight: $window.height() + 'px'});
	$('nav#realisation-nav li:first-child a').addClass('active');


	// Hide the menu
	TweenLite.set($('nav#realisation-nav'), {css: {left: -58}});

	// function who call the menu to appear
	function menuRealAppears() {
		TweenLite.to($('nav#realisation-nav'), .75, {delay: 0.75, left: 0, ease: Back.easeOut});
		initMenuReal = true;
	}

	// Show the span when we hover the buttona
	function onRealHover() {
		TweenLite.set($(this).children(), {css: {rotationY: 90, transformOrigin: "left center"}});
		TweenLite.to($(this).children(), .5, {rotationY: 0});
	}

	function onRealClick(event) {

		if(!isAnimating) {

			var thisClickIndex = $(this).parent().index(),
				currentActiveIndex = $('nav#realisation-nav a.active').parent().index();

			// We need this fix to keep the function .next() and .prev() available for scroll and click
			var nextRealId = $($realisations[thisClickIndex]).attr('id'),
				nextReal = $realisations.filter('#' + nextRealId);

			if(thisClickIndex === currentActiveIndex)
				return;
			else if(thisClickIndex > currentActiveIndex)
				goToNextRealAnimation(nextReal);
			else if(thisClickIndex < currentActiveIndex)
				goToNextRealAnimation(nextReal);

		}

		event.preventDefault();

	}

	function goToPrevRealAnimation($real) {

		if(!isAnimating) {

			isAnimating = true;

			TweenLite.set($currentReal, {css: {transformOrigin:"bottom center"}});
			TweenLite.set($real, {css: {rotationX: -90, transformOrigin:"top center", zIndex: 11}});

			var realTimeline = new TimelineMax({ paused: true });

			realTimeline.add(TweenMax.to($currentReal, 1.25, {rotationX: 90, opacity: 0}));
			realTimeline.add(TweenMax.to($real, 1.25, {rotationX: 0, opacity: 1}), 0.25);

			realTimeline.play();
			realTimeline.call(completeFunctionReal);	

			$currentReal = $real;


		}

	}

	function goToNextRealAnimation($real) {

		if(!isAnimating) {

			isAnimating = true;

			TweenLite.set($currentReal, {css: {transformOrigin:"top center"}});
			TweenLite.set($real, {css: {rotationX: 90, transformOrigin:"bottom center", zIndex: 11}});

			var realTimeline = new TimelineMax({ paused: true });

			realTimeline.add(TweenMax.to($currentReal, 1.25, {rotationX: -90, opacity: 0}));
			realTimeline.add(TweenMax.to($real, 1.25, {rotationX: 0, opacity: 1}), 0.25);

			realTimeline.play();
			realTimeline.call(completeFunctionReal);

			$currentReal = $real;

		}

	}

	/*
	 *   If there's a previous realisation
	 */
	function goToPrevReal() {
		if($currentReal.prev('.realisations').length)
			goToPrevRealAnimation($currentReal.prev('.realisations'));
	}

	/*
	 *   If there's a next realisation
	 */
	function goToNextReal() {
		if($currentReal.next('.realisations').length)
			goToNextRealAnimation($currentReal.next('.realisations'));
	}

	function completeFunctionReal() {

		isAnimating = false;
		$('nav#realisation-nav li a.active').removeClass('active');
		$('nav#realisation-nav li a[href="#' + $($currentReal).attr('id') + '"]').addClass('active');
		
	}

	/*
	 * Mentions légales
	 */

	var $mentionsLegales = $('section#mentions-legales'),
		$mentionsLegalesButton = $('footer#footer p a');

	TweenLite.set($mentionsLegales, {css: {scale: 0.8}});
	TweenLite.set($mentionsLegales.find('article'), {css: {opacity: 0}});

	$mentionsLegalesButton.on("click", mentionsLegalesClick);

	function mentionsLegalesClick() {

		var mentionsLegalesTimeline = new TimelineMax({ paused: true });

		mentionsLegalesTimeline.to($mentionsLegales, 0.75, {top: "3%", ease: Back.easeOut}, 0);
		mentionsLegalesTimeline.to($mentionsLegales, 0.25, {scale: 1}, 0.75);
		mentionsLegalesTimeline.to($mentionsLegales.find('article'), 0.45, {opacity: 1}, 0.95);

		mentionsLegalesTimeline.play();

	}

	/*
	 * Social media animation =p=
	 */ 

	$('nav#prestation-nav').css({lineHeight: $window.height() + 'px'});

	var socialMediaLink = $('#social-media a');
	TweenLite.set(socialMediaLink, {css: {marginLeft: "100px"}});
	TweenMax.staggerTo(socialMediaLink, 1,  {marginLeft: 0, ease: Back.easeOut}, 0.25);

	socialMediaLink.hover(function() {

		TweenLite.set($(this).children(), {css: {rotationY: -90, transformOrigin: "right center"}});
		TweenLite.to($(this).children(), .5, {rotationY: 0});

	});

window.onload = function() {

	/*
	 * Menu Link animation =p=
	 */ 

	menuLink.hover(function() {

		TweenLite.set($(this).children(), {css: {skewX: "0deg", rotationX: -90, transformOrigin: "left top"}});
		TweenLite.to($(this).children(), .5, {skewX: "0deg", rotationX: 0, ease: Back.easeOut});

	});

	/*
	 * Homepage =p=
	 */ 

	var buttonStartNavigation = $('p#start-navigation a'),
		buttonStartNavigationBefore = $('p#start-navigation a span:first-child'),
		buttonStartNavigationAfter = $('p#start-navigation a span:nth-child(2)');

	TweenLite.set(buttonStartNavigation, {css: {width: 0}});

	var buttonStartTimeline = new TimelineMax({paused: true, repeat: -1, repeatDelay: 0.75});

	buttonStartTimeline.set(buttonStartNavigation, {float: 'left'}, 0);
	buttonStartTimeline.set(buttonStartNavigationBefore, {left: '16px', right: 'auto'}, 0);
	buttonStartTimeline.set(buttonStartNavigationAfter, {left: '-3px', right: 'auto'}, 0);
	buttonStartTimeline.to(buttonStartNavigation, 0.75, {width: "40px", ease: Power0.easeNone}, 0.25);

	buttonStartTimeline.set(buttonStartNavigation, {float: 'right'}, 1.25);
	buttonStartTimeline.set(buttonStartNavigationBefore, {left: 'auto', right: '-3px'}, 1.25);
	buttonStartTimeline.set(buttonStartNavigationAfter, {left: 'auto', right: '16px'}, 1.25);
	buttonStartTimeline.to(buttonStartNavigation, 0.75, {width: "0px", ease: Power0.easeNone}, 1.25);

	buttonStartTimeline.play();

	buttonStartNavigation.click(function() {

		var homesection = $('section#home');

		TweenMax.to(homesection, .5, {opacity: 0, onComplete: function() {
			menuAppears();
			homesection.remove();
		}});

	});

	/***
		scrollbar =p=
	***/

	$('#accueil, #contact .right-container, section#mentions-legales').jScrollPane({ autoReinitialise: true });

}