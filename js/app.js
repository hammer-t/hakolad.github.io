/*
 * Generals variables
 */

//References to DOM elements
var $window = $(window);
var $document = $(document);

//The height and width of the window
var pageHeight = $window.innerHeight();
var pageWidth = $window.innerWidth();

// colors that we use
var colors = ['#202020', '#f3a33f']

/*
 * Navigation Handler =p=
 */

// Key codes for left and right arrows on keyboard. 
// We'll be using this to navigate change levels or slide using the keyboard
var keyCodes = {
	LEFT : 37,
	UP : 38,
	RIGHT : 39,
	DOWN : 40
};

// we need to map the handler
var hashMaps = [
	'/accueil-front',
	'/accueil',
	'/atelier-creation-web-bas-rhin-creation-web-bas-rhin',
	'/prestation',
	'/realisation',
	'/contact-agence-web-strasbourg',
	'/mentions-legales'
]

var changeHashLocation = function(index) {
	window.location.hash = hashMaps[index];
}

$window.on('mousewheel', onMouseWheel);

function onMouseWheel(event) {

	//Normalize event wheel delta
	var delta = event.deltaY;

	if(pageWidth > 640) {

		if(delta === -1 && $indexCurrentLevel === 0 && !isAnimating)
			window.location.hash = '/accueil';
		if(delta === -1 && $indexCurrentLevel === 2 && !isAnimating)
			window.location.hash = '/atelier-creation-web-bas-rhin/c-est-quoi';
		else if(delta === 1 && $indexCurrentLevel === 2 && !isAnimating)
			window.location.hash = '/atelier-creation-web-bas-rhin/c-est-qui';
		else if(delta === 1 && $indexCurrentLevel === 3 && !isAnimating)
			goToPrevPrestation();
		else if(delta === -1 && $indexCurrentLevel === 3 && !isAnimating)
			goToNextPrestation();
		else if(delta === 1 && $indexCurrentLevel === 4 && !isAnimating)
			goToPrevRealisation();
		else if(delta === -1 && $indexCurrentLevel === 4 && !isAnimating)
			goToNextRealisation();

		event.preventDefault();

	}

}

$document.on("keydown", onKeyDown);

function onKeyDown(event) {

	var PRESSED_KEY = event.keyCode,
		index = null;

	if(PRESSED_KEY == keyCodes.LEFT) {

		if($currentLevel.prev('.level').length && $indexCurrentLevel != 1) {
			goToLevel($currentLevel.prev('.level'));
			changeHashLocation($indexCurrentLevel);
		}

		event.preventDefault();

	} else if(PRESSED_KEY == keyCodes.RIGHT) {

		if($currentLevel.next('.level').length && $indexCurrentLevel != 0) {
			goToLevel($currentLevel.next('.level'));
			changeHashLocation($indexCurrentLevel);
		}

		event.preventDefault();

	} else if(PRESSED_KEY == keyCodes.UP) {

		if($indexCurrentLevel === 1) {
			goToHomeLevel($levels.first());			
			changeHashLocation(0);
		} if($indexCurrentLevel === 2 && !isAnimating) {
			window.location.hash = '/atelier-creation-web-bas-rhin/c-est-qui';
		} if($indexCurrentLevel === 3 && !isAnimating) {
			goToPrevPrestation();
		} if($indexCurrentLevel === 4 && !isAnimating) {
			goToPrevRealisation();
		}

		event.preventDefault();

	} else if(PRESSED_KEY == keyCodes.DOWN) {

		if($indexCurrentLevel === 0) {
			window.location.hash = '/accueil';
		} if($indexCurrentLevel === 2 && !isAnimating) {
			window.location.hash = '/atelier-creation-web-bas-rhin/c-est-quoi';
		} if($indexCurrentLevel === 3 && !isAnimating) {
			goToNextPrestation();
		} if($indexCurrentLevel === 4 && !isAnimating) {
			goToNextRealisation();
		}

		event.preventDefault();

	}

}

/*
 * Ascensor Functions =p=
 */

var $levels = $(".level");
var $currentLevel = $levels.first();
var $indexCurrentLevel = 0;

//Animating flag - is our app animating
var isAnimating = false; 

// This function needs to be loadeed to fix OSX mistake with translate

var setAscensor = function() {


	$levels.each(function(key, value) {

		if(key === 0)
			TweenLite.set(this, {css: {x: "0px", y: "0px"}});
		else if (key === 1)
			TweenLite.set(this, {css: {x: "0px", y: pageHeight}});
		else
			TweenLite.set(this, {css: {x: (key - 1) * pageWidth, y: pageHeight}});

	});

};

var goToHomeLevel = function($level) {

	if(!isAnimating && $indexCurrentLevel != 0) {

		var oldIndexLevel = $indexCurrentLevel;

		// We block other click
		isAnimating = true;

		// we define the new level
		$currentLevel = $level;
		$indexCurrentLevel = $($levels).index($level);

		// We block other click
		isAnimating = true;

		if(oldIndexLevel === 1) {

			// If we are already on the Level #1, we have just to translate to the top
			completeGoToHomeLevel();

		} else {

			var goToHomeLevelTimeline = new TimelineMax({ paused: true });

			goToHomeLevelTimeline.add(TweenMax.to($levels, 0.75, {scale: 0.95}), 0);

			// We start to animate
			goToHomeLevelTimeline.add(TweenMax.to($levels[1], 1.25, {x: 0, ease: Back.easeOut}), 0.75);

			var iPos = 1;

			for (var i = 1; i < 1; i++) {		
				iPos--;		
				goToHomeLevelTimeline.add(TweenMax.to($levels[i], 1.25, {x: - (iPos * pageWidth), ease: Back.easeOut}), 0.75);
			};

			var iPos = 0;

			for (var i = 1 + 1; i < $levels.length; i++) {	
				iPos++;			
				goToHomeLevelTimeline.add(TweenMax.to($levels[i], 1.25, {x: (iPos * pageWidth), ease: Back.easeOut}), 0.75);
			};

			goToHomeLevelTimeline.add(TweenMax.to($levels, 0.75, {scale: 1}), 2);

			goToHomeLevelTimeline.play();
			goToHomeLevelTimeline.call(completeGoToHomeLevel);

		}

	}

};

var completeGoToHomeLevel = function() {

	var goToHomeLevelEndTimeline = new TimelineMax({ paused: true });

	TweenMax.set($levels[0], {css: {y: 0}});
	goToHomeLevelEndTimeline.add(TweenMax.to($levels[0], 1, {opacity: 1}), 0);

	$levels.each(function(key, value) {
		if(key != 0)
			goToHomeLevelEndTimeline.add(TweenMax.to(this, 0.75, {y: pageHeight}), 0);
	});

	goToHomeLevelEndTimeline.play();

	isAnimating = false;
}

var goToLevel = function($level) {

	// If it's the first time that we slide
	if(!isMenu){
		menuAppears();
		isMenu = true;
	} 
	if (!initRealMenu) {
		menuRealAppears();
		initRealMenu = true;
	}

	// We don't want to be able to move if we're already moving
	// We check if the is a level
	// We don't launch the move if we're on the slide that we have just clicked
	if(!isAnimating && $level.length && $($level).attr('id') != $($currentLevel).attr('id')) {

		var oldIndexLevel = $indexCurrentLevel;

		// We block other click
		isAnimating = true;
		// we define the new level
		$currentLevel = $level;
		$indexCurrentLevel = $($levels).index($level);

		var goToLevelTimeline = new TimelineMax({ paused: true });

		// If we are on the first level, the home front
		if(oldIndexLevel === 0) {

			// First, we want to make appears the level #1 and set the others levels to y:0
			goToLevelTimeline.add(TweenMax.to($levels[0], 1, {opacity: 0, onComplete: function() {
				TweenMax.set($levels[0], {css: {y: -pageHeight}});
			}}), 0);
			$levels.each(function(key, value) {
				if(key != 0)
					goToLevelTimeline.add(TweenMax.to(this, 0.75, {y: 0}), 0);
			});

			// If we are just going on the level #1, there is not reason to animate the level
			if($indexCurrentLevel != 1) {

				goToLevelTimeline.add(TweenMax.to($levels, 0.75, {scale: 0.95}), 0.75);

				goToLevelTimeline.add(TweenMax.to($level, 1.25, {x: 0, ease: Back.easeOut}), 1.5);

				// Then we move levels
				var iPos = $indexCurrentLevel;

				for (var i = 1; i < $indexCurrentLevel; i++) {		
					iPos--;		
					goToLevelTimeline.add(TweenMax.to($levels[i], 1.25, {x: - (iPos * pageWidth), ease: Back.easeOut}), 1.5);
				};

				var iPos = 0;

				for (var i = $indexCurrentLevel + 1; i < $levels.length; i++) {	
					iPos++;			
					goToLevelTimeline.add(TweenMax.to($levels[i], 1.25, {x: (iPos * pageWidth), ease: Back.easeOut}), 1.5);
				};

			}


		} else {

			goToLevelTimeline.add(TweenMax.to($levels, 0.75, {scale: 0.95}), 0);

			// We start to animate
			goToLevelTimeline.add(TweenMax.to($level, 1.25, {x: 0, ease: Back.easeOut}), 0.75);

			var iPos = $indexCurrentLevel;

			for (var i = 1; i < $indexCurrentLevel; i++) {		
				iPos--;		
				goToLevelTimeline.add(TweenMax.to($levels[i], 1.25, {x: - (iPos * pageWidth), ease: Back.easeOut}), 0.75);
			};

			var iPos = 0;

			for (var i = $indexCurrentLevel + 1; i < $levels.length; i++) {	
				iPos++;			
				goToLevelTimeline.add(TweenMax.to($levels[i], 1.25, {x: (iPos * pageWidth), ease: Back.easeOut}), 0.75);
			};

		}

		// Let's rock and roll !
		goToLevelTimeline.play();
		// Call the end function
		goToLevelTimeline.call(completeGoToLevel);

	}

};

var completeGoToLevel = function() {
	TweenMax.to($levels, 0.75, {scale: 1});
	isAnimating = false;
};

/*
 * Social Menu =p=
 */

var socialMediaLink = $('#social-media a');

TweenLite.set(socialMediaLink, {css: {marginLeft: "100px"}});
TweenMax.staggerTo(socialMediaLink, 1,  {marginLeft: 0, ease: Back.easeOut}, 0.25);

socialMediaLink.hover(function() {

	TweenLite.set($(this).children(), {css: {rotationY: -90, transformOrigin: "right center"}});
	TweenLite.to($(this).children(), .35, {rotationY: 0});

});

/*
 * All arrow =p=
 */


var	buttonArrowNavigation = $('p.atelier-arrow a, p.prestation-arrow-top a'),
	buttonArrowNavigationBefore = $('p.atelier-arrow a span:first-child, p.prestation-arrow-top a span:first-child'),
	buttonArrowNavigationAfter = $('p.atelier-arrow a span:nth-child(2), p.prestation-arrow-top a span:nth-child(2)');

TweenLite.set(buttonArrowNavigation, {css: {width: 0}});

var buttonArrowTimeline = new TimelineMax({paused: true, repeat: -1, repeatDelay: 0.25});

buttonArrowTimeline.set(buttonArrowNavigation, {float: 'left'}, 0);
buttonArrowTimeline.set(buttonArrowNavigationBefore, {left: '16px', right: 'auto'}, 0);
buttonArrowTimeline.set(buttonArrowNavigationAfter, {left: '-3px', right: 'auto'}, 0);
buttonArrowTimeline.to(buttonArrowNavigation, 0.75, {width: "40px", ease: Power0.easeNone}, 0.25);

buttonArrowTimeline.set(buttonArrowNavigation, {float: 'right'}, 1.25);
buttonArrowTimeline.set(buttonArrowNavigationBefore, {left: 'auto', right: '-3px'}, 1.25);
buttonArrowTimeline.set(buttonArrowNavigationAfter, {left: 'auto', right: '16px'}, 1.25);
buttonArrowTimeline.to(buttonArrowNavigation, 0.75, {width: "0px", ease: Power0.easeNone}, 1.25);

buttonArrowTimeline.play();

var	buttonArrowBottomNavigation = $('p.prestation-arrow-bottom a'),
	buttonArrowBottomNavigationBefore = $('p.prestation-arrow-bottom a span:first-child'),
	buttonArrowBottomNavigationAfter = $('p.prestation-arrow-bottom a span:nth-child(2)');

TweenLite.set(buttonArrowBottomNavigation, {css: {width: 0}});

var buttonArrowBottomTimeline = new TimelineMax({paused: true, repeat: -1, repeatDelay: 0.25});

buttonArrowBottomTimeline.set(buttonArrowBottomNavigation, {float: 'right'}, 0);
buttonArrowBottomTimeline.set(buttonArrowBottomNavigationBefore, {left: 'auto', right: '-3px'}, 0);
buttonArrowBottomTimeline.set(buttonArrowBottomNavigationAfter, {left: 'auto', right: '16px'}, 0);
buttonArrowBottomTimeline.to(buttonArrowBottomNavigation, 0.75, {width: "40px", ease: Power0.easeNone}, 0.25);

buttonArrowBottomTimeline.set(buttonArrowBottomNavigation, {float: 'left'}, 1.25);
buttonArrowBottomTimeline.set(buttonArrowBottomNavigationBefore, {left: '16px', right: 'auto'}, 1.25);
buttonArrowBottomTimeline.set(buttonArrowBottomNavigationAfter, {left: '-3px', right: 'auto'}, 1.25);
buttonArrowBottomTimeline.to(buttonArrowBottomNavigation, 0.75, {width: "0px", ease: Power0.easeNone}, 1.25);

buttonArrowBottomTimeline.play();

function restartArrow() {
	buttonArrowTimeline.restart();
	buttonArrowBottomTimeline.restart();
}


/*
 * Home Front & Menu =p=
 */

var logo = $('#logo'),
	menu = $('#menu'),
	menuLink = $('#menu a'),
	isMenu = false,
	buttonStartNavigation = $('p#start-navigation a'),
	buttonStartNavigationBefore = $('p#start-navigation a span:first-child'),
	buttonStartNavigationAfter = $('p#start-navigation a span:nth-child(2)');

TweenLite.set(buttonStartNavigation, {css: {width: 0}});

var buttonStartTimeline = new TimelineMax({paused: true, repeat: -1, repeatDelay: 0.25});

buttonStartTimeline.set(buttonStartNavigation, {float: 'left'}, 0);
buttonStartTimeline.set(buttonStartNavigationBefore, {left: '16px', right: 'auto'}, 0);
buttonStartTimeline.set(buttonStartNavigationAfter, {left: '-3px', right: 'auto'}, 0);
buttonStartTimeline.to(buttonStartNavigation, 0.75, {width: "40px", ease: Power0.easeNone}, 0.25);

buttonStartTimeline.set(buttonStartNavigation, {float: 'right'}, 1.25);
buttonStartTimeline.set(buttonStartNavigationBefore, {left: 'auto', right: '-3px'}, 1.25);
buttonStartTimeline.set(buttonStartNavigationAfter, {left: 'auto', right: '16px'}, 1.25);
buttonStartTimeline.to(buttonStartNavigation, 0.75, {width: "0px", ease: Power0.easeNone}, 1.25);

buttonStartTimeline.play();

buttonStartNavigation.click(function(event) {

	var homesection = $('section#home');

	TweenMax.to(homesection, .5, {opacity: 0, onComplete: function() {
		menuAppears();
		homesection.remove();
	}});

	window.location.hash = "/accueil";

	event.preventDefault();

});

var hideMenu = function() {

	TweenLite.set(logo, {css: {rotationY: 180, transformOrigin: "left top"}});
	TweenLite.set(menu, {css: {marginLeft: -menu.width(), opacity: 0}});
	TweenLite.set(menuLink, {css:{scale: 0.2, opacity: 0}});

}		

var menuAppears = function() {

	isMenu = true;

	var menuTimeline = new TimelineMax();
	menuTimeline.delay(1).to(logo, .6, {rotationY: 0, transformOrigin:"left top"})
	.set(menu, {css:{opacity: 1}})
	.to(menu, .4, {marginLeft: 0, ease: Power2.easeOut})
	.staggerTo(menuLink, 0.25,  {scale:1, opacity:1}, 0.25);

}

menuLink.hover(function() {

	TweenLite.set($(this).children(), {css: {skewX: "0deg", rotationX: -90, transformOrigin: "left top"}});
	TweenLite.to($(this).children(), .5, {skewX: "0deg", rotationX: 0, ease: Back.easeOut});

});

menuLink.click(function(event) {

	if(isAnimating)
		event.preventDefault();

	if(pageWidth < 640) {

		menuLink.removeClass('active');
		$(this).addClass('active');

		var ele = $(this).attr('href'),
			anchor = ele.split('/')[1],
			elementToScroll = $('section#' + anchor);

		//$('html, body').scrollTop({scrollTop: elementToScroll.offset().top}, 'slow');
		$('html, body').animate({scrollTop: elementToScroll.offset().top - 100}, 'slow');
		event.preventDefault();
	}
		
});

/*
 * Home =p=
 */

var homeCanvas = function() {
	function init(){for(can=document.getElementById("accueil-canvas"),ctx=can.getContext("2d"),width=$("body").width(),height=$("article#accueil-2").height()+40,x=0;numPoints>x;x++){var i=new Point;i._size=1,i._x=(Math.random()*width).toFixed(0),i._y=(Math.random()*height).toFixed(0),i._direction=(360*Math.random()).toFixed(2),i._velocity=2,i._randomization=(10*Math.random()+0).toFixed(2),aPoints.push(i)}animate()}function animate(){for(x=0;numPoints>x;x++)aPoints[x]._step(aPoints);requestAnimFrame(animate),draw()}function draw(){for(ctx.save(),ctx.clearRect(0,0,width,height),x=0;numPoints>x;x++)aPoints[x].draw(ctx);ctx.restore()}window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(i){window.setTimeout(i,1e3/23)}}(),$(function(){$(window).resize(function(){$("#accueil-canvas").attr({width:$("body").width(),height:$("article#accueil-2").height()+40}),width=$("body").width(),height=$("article#accueil-2").height()+40}),$(window).resize()});var Point=function(){this._size=.5,this._x=0,this._y=0,this._direction=0,this._velocity=0,this._distances=[],this._neighboors=[],this._randomization=0,this.__collection=null,this._step=function(i){var t=.3*this._velocity*((Math.random()*this._randomization+1)/10),e=2*Math.random()%2>1?-1:1;this._direction=1*this._direction+Math.random()*this._randomization*e;var n=this._direction*Math.PI/180;this._x=1*this._x+t*Math.cos(n)*1,this._y=1*this._y+t*Math.sin(n)*1,this._x>width&&(this._x=0),this._x<0&&(this._x=width),this._y>height&&(this._y=0),this._y<0&&(this._y=height),this.__collection=i},this._computeNeighboors=function(){if(null!=this.__collection){for(aCollection=this.__collection,this._distances=[],i=0;i<aCollection.length;i++)aCollection[i]._x!=this._x&&aCollection[i]._y!=this._y&&this._distances.push({pointIndex:i,pointObj:aCollection[i],distance:Math.sqrt(Math.pow(this._x-aCollection[i]._x,2)+Math.pow(this._y-aCollection[i]._y,2))});this._distances.sort(function(i,t){return defaultReturn=0,i.distance<t.distance&&(defaultReturn=-1),i.distance>t.distance&&(defaultReturn=1),defaultReturn}),this._neighboors=this._distances.slice(0,3)}},this.draw=function(t){for(this._computeNeighboors(),t.lineWidth=.5,t.strokeStyle="#c5c5c5",t.beginPath(),i=0;i<this._neighboors.length;i++)t.moveTo(this._x,this._y),t.lineTo(this._neighboors[i].pointObj._x,this._neighboors[i].pointObj._y),t.lineWidth=.5+5/this._neighboors[i].distance;t.closePath(),t.stroke(),t.beginPath(),t.arc(this._x,this._y,this._size*this._velocity,0,2*Math.PI,!1),t.fillStyle="#c5c5c5",t.strokeStyle="#c5c5c5",t.lineWidth=5,t.fill(),t.stroke(),t.beginPath(),t.arc(this._x,this._y,this._size,0,2*Math.PI,!1),t.fillStyle="#c5c5c5",t.fill()}},aPoints=[],can,ctx,interval,width,height,numPoints=20;null!=document.getElementById("accueil-canvas")&&init();
}

/*
 * Atelier =p=
 */

var $atelierImageContainer = $('section#atelier-creation-web-bas-rhin article .left'),
	currentWorkshopSlide = 'c-est-qui',
	$scaleWorkshopAnimation = TweenMax.to($atelierImageContainer.find('p'), 160, {scale:1.35, repeat:-1, yoyo:true}, 0.5);

	$scaleWorkshopAnimation.pause();

var imageToBackground = function() {

	$atelierImageContainer.each(function(index, value) {

		var imageLink = $(this).find('img').attr('src');
		$(this).find('p').css({
			'background-image': 'url(' + imageLink + ')'
		});

		$(this).find('img').css({display: 'none'});

	});

};

var goToWorkshopSlide = function(slide) {

	if(slide != null) {

		$scaleWorkshopAnimation.pause();

		if(slide === 'c-est-qui' && currentWorkshopSlide === 'c-est-quoi') {

			// We block animation
			isAnimating = true;

			var currentAtelier = $('article#atelier-2'),
				nextAtelier = $('article#atelier-1'),
				sectionAtelier = $('section#atelier-creation-web-bas-rhin');

			// We set position to elements
			TweenLite.set(currentAtelier, {css: {top: 0, zIndex: 9}});
			TweenLite.set(nextAtelier, {css: {top: 0, zIndex: 10}});

			TweenLite.set(nextAtelier.find('.left'), {css: {y: "100%"}});
			TweenLite.set(nextAtelier.find('.right'), {css: {y: "-100%"}});

			TweenLite.set(nextAtelier.find('.left').find('p'), {css: {scale: 1}});
			TweenLite.set(nextAtelier.find('.right').find('p.atelier-gif'), {css: {opacity: 0}});
			TweenLite.set(nextAtelier.find('.right').find('p.atelier-arrow'), {css: {opacity: 0}});

			var atelierTimeline = new TimelineMax({ paused: true });

			atelierTimeline.add(TweenMax.to(currentAtelier.find('.left'), 1.25, {y: "-100%", ease: Power1.easeIn}), 0);
			atelierTimeline.add(TweenMax.to(currentAtelier.find('.right'), 1.25, {y: "100%", ease: Power1.easeIn}), 0);
			atelierTimeline.add(TweenMax.to(currentAtelier.find('.right').find('p.atelier-gif'), 0.25, {opacity: 0}), 0);
			atelierTimeline.add(TweenMax.to(currentAtelier.find('.right').find('p.atelier-arrow'), 0.25, {opacity: 0}), 0);

			atelierTimeline.add(TweenMax.to(nextAtelier.find('.left'), 1.25, {y: "0%", ease: Power1.easeOut}), 0);
			atelierTimeline.add(TweenMax.to(nextAtelier.find('.right'), 1.25, {y: "0%", ease: Power1.easeOut}), 0);
			atelierTimeline.add(TweenMax.to(nextAtelier.find('.right').find('p.atelier-gif'), 0.25, {opacity: 1}), 1.25);
			atelierTimeline.add(TweenMax.to(nextAtelier.find('.right').find('p.atelier-arrow'), 0.25, {opacity: 1}), 1.25);

			atelierTimeline.add(TweenMax.to(sectionAtelier, 0.95, {backgroundColor: '#202020'}), 0);

			atelierTimeline.addCallback(restartArrow, 1.25);

			atelierTimeline.play();
			atelierTimeline.call(completeFunctionAtelier);

			currentWorkshopSlide = 'c-est-qui';

		} else if(slide === 'c-est-quoi' && currentWorkshopSlide === 'c-est-qui') {

			// We block animation
			isAnimating = true;

			var currentAtelier = $('article#atelier-1'),
				nextAtelier = $('article#atelier-2'),
				sectionAtelier = $('section#atelier-creation-web-bas-rhin');

			// We set position to elements
			TweenLite.set(currentAtelier, {css: {top: 0, zIndex: 9}});
			TweenLite.set(nextAtelier, {css: {top: 0, zIndex: 10}});

			TweenLite.set(nextAtelier.find('.left'), {css: {y: "-100%"}});
			TweenLite.set(nextAtelier.find('.right'), {css: {y: "100%"}});

			TweenLite.set(nextAtelier.find('.left').find('p'), {css: {scale: 1}});

			var atelierTimeline = new TimelineMax({ paused: true });

			atelierTimeline.add(TweenMax.to(currentAtelier.find('.left'), 1.25, {y: "100%", ease: Power1.easeIn}), 0);
			atelierTimeline.add(TweenMax.to(currentAtelier.find('.right'), 1.25, {y: "-100%", ease: Power1.easeIn}), 0);
			atelierTimeline.add(TweenMax.to(currentAtelier.find('.right').find('p.atelier-gif'), 0.25, {opacity: 0}), 0);
			atelierTimeline.add(TweenMax.to(currentAtelier.find('.right').find('p.atelier-arrow'), 0.25, {opacity: 0}), 0);

			atelierTimeline.add(TweenMax.to(nextAtelier.find('.left'), 1.25, {y: "0%", ease: Power1.easeOut}), 0);
			atelierTimeline.add(TweenMax.to(nextAtelier.find('.right'), 1.25, {y: "0%", ease: Power1.easeOut}), 0);
			atelierTimeline.add(TweenMax.to(nextAtelier.find('.right').find('p.atelier-gif'), 0.25, {opacity: 1}), 1.25);
			atelierTimeline.add(TweenMax.to(nextAtelier.find('.right').find('p.atelier-arrow'), 0.25, {opacity: 1}), 1.25);

			atelierTimeline.add(TweenMax.to(sectionAtelier, 0.95, {backgroundColor: '#f3a33f'}), 0);

			atelierTimeline.addCallback(restartArrow, 1.25);

			atelierTimeline.play();
			atelierTimeline.call(completeFunctionAtelier);

			currentWorkshopSlide = 'c-est-quoi';

		}

		currentAtelier = nextAtelier;

	}

};

var completeFunctionAtelier = function() {
	$scaleWorkshopAnimation = TweenMax.to($atelierImageContainer.find('p'), 160, {scale:1.35, repeat:-1, yoyo:true}, 0.5);
	isAnimating = false;
};

/*
 * Prestation =p=
 */

var $prestations = $('article.prestation-explain'),
	$currentPrestation = $prestations.first(),
	$prestationsBackground = $('div#explain-background'),
	$prestationNav = $('nav#prestation-nav'),
	$prestationsNavButton = $('nav#prestation-nav a'),
	backgroundColorPrestation = 1;

// We're by default on the first slide, so we activated the first link in menu
$('nav#prestation-nav li:first-child a').addClass('active');
// We want to align in the middle the nav
$prestationNav.css({lineHeight: $window.height() + 'px'});

// We need to configure everything in JS
TweenLite.set($prestations, {css: {background: 'none', zIndex: 1, transformStyle:'preserve-3d', transformOrigin:"bottom center"}});
TweenLite.set($prestations[0], {css: {zIndex: 13}});
TweenLite.set($prestationsBackground, {css: {backgroundColor: colors[0]}});

// Event listener
$prestationsNavButton.on("click", onPrestationClick);

// Function event listener
function onPrestationClick(event) {

	if(!isAnimating) {

		var addToUrl = $(this).attr('href');
		addToUrl = addToUrl.split('#')[1];

		window.location.hash = '/prestation/' + addToUrl;

	}

	event.preventDefault();
	
}

var goToPrevPrestation = function() {

	isAnimating = true;

	var currentPrestation = $('nav#prestation-nav li a.active').parent(),
		prevPrestation = currentPrestation.prev('li');

	if($currentPrestation.prev('.prestation-explain').length) {

		var addToUrl = prevPrestation.find('a').attr('href');
			addToUrl = addToUrl.split('#')[1];

		window.location.hash = '/prestation/' + addToUrl;
	} else
		isAnimating = false;

};

var goToNextPrestation = function() {

	isAnimating = true;

	var currentPrestation = $('nav#prestation-nav li a.active').parent(),
		nextPrestation = currentPrestation.next('li');

	if($currentPrestation.next('.prestation-explain').length) {

		var addToUrl = nextPrestation.find('a').attr('href');
			addToUrl = addToUrl.split('#')[1];

		window.location.hash = '/prestation/' + addToUrl;
	} else
		isAnimating = false;

};

function prestationHandler(thisIndex, currentActiveIndex) {

	// We need this fix to keep the function .next() and .prev() available for scroll and click
	var nextPrestationId = $($prestations[thisIndex]).attr('id'),
		nextPrestation = $prestations.filter('#' + nextPrestationId);

	if(thisIndex === currentActiveIndex)
		return;
	else if(thisIndex > currentActiveIndex)
		goToNextPrestationAnimation(nextPrestation);
	else if(thisIndex < currentActiveIndex)
		goToPrevPrestationAnimation(nextPrestation);

}

function goToPrevPrestationAnimation($prestation) {

	isAnimating = true;

	if(backgroundColorPrestation === 0) 
		$($prestation).removeClass('yellow');
	else
		$($prestation).addClass('yellow');

	$('nav#prestation-nav li a.active').removeClass('active');
	$('nav#prestation-nav li a[href="#' + $($prestation).attr('id') + '"]').addClass('active');

	TweenLite.set($currentPrestation, {css: {y: 0, zIndex: 12}});
	TweenLite.set($prestation, {css: {y: "-100%", zIndex: 13}});
	TweenLite.set($prestation.find('p.prestation-arrow-bottom, p.prestation-arrow-top, p.prestation-gif'), {css: {opacity: 0}});

	var prestationTimeline = new TimelineMax({ paused: true });

	prestationTimeline.add(TweenMax.to($currentPrestation, 1.25, {y: "100%", ease: Power1.easeIn}), 0);
	prestationTimeline.add(TweenMax.to($currentPrestation.find('p.prestation-arrow-bottom, p.prestation-arrow-top, p.prestation-gif'), 0.25, {opacity: 0}), 0);
	prestationTimeline.add(TweenMax.to($prestation, 1.25, {y: "0%", ease: Power1.easeOut}), 0);
	prestationTimeline.add(TweenMax.to($prestation.find('p.prestation-arrow-bottom, p.prestation-arrow-top, p.prestation-gif'), 0.25, {opacity: 1, ease: Power1.easeOut}), 1.25);
	prestationTimeline.add(TweenMax.to($prestationsBackground, 0.95, {backgroundColor: colors[backgroundColorPrestation]}), 0);

	prestationTimeline.addCallback(restartArrow, 1.25);

	prestationTimeline.play();
	prestationTimeline.call(completeFunctionPrestation);	

	$currentPrestation = $prestation;

}

function goToNextPrestationAnimation($prestation) {
	
	isAnimating = true;

	if(backgroundColorPrestation === 0)
		$($prestation).removeClass('yellow');
	else
		$($prestation).addClass('yellow');

	$('nav#prestation-nav li a.active').removeClass('active');
	$('nav#prestation-nav li a[href="#' + $($prestation).attr('id') + '"]').addClass('active');

	TweenLite.set($currentPrestation, {css: {y: 0, zIndex: 12}});
	TweenLite.set($prestation, {css: {y: "100%", zIndex: 13}});
	TweenLite.set($prestation.find('p.prestation-arrow-bottom, p.prestation-arrow-top, p.prestation-gif'), {css: {opacity: 0}});

	var prestationTimeline = new TimelineMax({ paused: true });

	prestationTimeline.add(TweenMax.to($currentPrestation, 1.25, {y: "-100%", ease: Power1.easeIn}), 0);
	prestationTimeline.add(TweenMax.to($currentPrestation.find('p.prestation-arrow-bottom, p.prestation-arrow-top, p.prestation-gif'), 0.25, {opacity: 0}), 0);
	prestationTimeline.add(TweenMax.to($prestation, 1.25, {y: "0%", ease: Power1.easeOut}), 0);
	prestationTimeline.add(TweenMax.to($prestation.find('p.prestation-arrow-bottom, p.prestation-arrow-top, p.prestation-gif'), 0.25, {opacity: 1, ease: Power1.easeOut}), 1.25);
	prestationTimeline.add(TweenMax.to($prestationsBackground, 0.95, {backgroundColor: colors[backgroundColorPrestation]}), 0);

	prestationTimeline.addCallback(restartArrow, 1.25);

	prestationTimeline.play();
	prestationTimeline.call(completeFunctionPrestation);	

	$currentPrestation = $prestation;

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

var $realisations = $('.realisations'),	
	$currentReal = $realisations.first()
	$realisationNav = $('nav#realisation-nav'),
	$realisationNavButton = $('nav#realisation-nav a'),
	initRealMenu = false;


$realisationNavButton.on("mouseover", onRealHover);

// Show the span when we hover the buttona
function onRealHover() {
	TweenLite.set($(this).children(), {css: {rotationY: 90, transformOrigin: "left center"}});
	TweenLite.to($(this).children(), .5, {rotationY: 0});
}

// Hide the menu
TweenLite.set($realisationNav, {css: {left: -58}});

// function who call the menu to appear
function menuRealAppears() {
	TweenLite.to($realisationNav, .75, {delay: 0.75, left: 0, ease: Back.easeOut});
}

// We need to align on the middle the navigation
$realisationNav.css({lineHeight: $window.height() + 'px'});

// set the default activated menu
$('nav#realisation-nav li:first-child a').addClass('active');

// We need to configure everything in JS
TweenLite.set($realisations, {css: {position: 'absolute', top: 0, left: 0, opacity: 0, zIndex: 1, transformStyle:'preserve-3d', transformOrigin:"bottom center"}});
TweenLite.set($realisations[0], {css: {position: 'absolute', top: 0, left: 0, opacity: 1, zIndex: 11}});

var realisationCanvas = function () {
	function init(){for(can=document.getElementById("realisation-canvas"),ctx=can.getContext("2d"),width=$("body").width(),height=$("body").height(),x=0;numPoints>x;x++){var t=new Point;t._size=1,t._x=(Math.random()*width).toFixed(0),t._y=(Math.random()*height).toFixed(0),t._direction=(360*Math.random()).toFixed(2),t._velocity=2,t._randomization=(10*Math.random()+0).toFixed(2),aPoints.push(t)}animate()}function animate(){for(x=0;numPoints>x;x++)aPoints[x]._step(aPoints);requestAnimFrame(animate),draw()}function draw(){for(ctx.save(),ctx.clearRect(0,0,width,height),x=0;numPoints>x;x++)aPoints[x].draw(ctx);ctx.restore()}window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/23)}}(),$(function(){$(window).resize(function(){$("#realisation-canvas").attr({width:$("body").width(),height:$("body").height()}),width=$("body").width(),height=$("body").height()}),$(window).resize()});var Point=function(){this._size=.5,this._x=0,this._y=0,this._direction=0,this._velocity=0,this._distances=[],this._neighboors=[],this._randomization=0,this.__collection=null,this._step=function(t){var i=.3*this._velocity*((Math.random()*this._randomization+1)/10),n=2*Math.random()%2>1?-1:1;this._direction=1*this._direction+Math.random()*this._randomization*n;var e=this._direction*Math.PI/180;this._x=1*this._x+i*Math.cos(e)*1,this._y=1*this._y+i*Math.sin(e)*1,this._x>width&&(this._x=0),this._x<0&&(this._x=width),this._y>height&&(this._y=0),this._y<0&&(this._y=height),this.__collection=t},this._computeNeighboors=function(){if(null!=this.__collection){for(aCollection=this.__collection,this._distances=[],i=0;i<aCollection.length;i++)aCollection[i]._x!=this._x&&aCollection[i]._y!=this._y&&this._distances.push({pointIndex:i,pointObj:aCollection[i],distance:Math.sqrt(Math.pow(this._x-aCollection[i]._x,2)+Math.pow(this._y-aCollection[i]._y,2))});this._distances.sort(function(t,i){return defaultReturn=0,t.distance<i.distance&&(defaultReturn=-1),t.distance>i.distance&&(defaultReturn=1),defaultReturn}),this._neighboors=this._distances.slice(0,3)}},this.draw=function(t){for(this._computeNeighboors(),t.lineWidth=.5,t.strokeStyle="#c5c5c5",t.beginPath(),i=0;i<this._neighboors.length;i++)t.moveTo(this._x,this._y),t.lineTo(this._neighboors[i].pointObj._x,this._neighboors[i].pointObj._y),t.lineWidth=.5+5/this._neighboors[i].distance;t.closePath(),t.stroke(),t.beginPath(),t.arc(this._x,this._y,this._size*this._velocity,0,2*Math.PI,!1),t.fillStyle="#c5c5c5",t.strokeStyle="#c5c5c5",t.lineWidth=5,t.fill(),t.stroke(),t.beginPath(),t.arc(this._x,this._y,this._size,0,2*Math.PI,!1),t.fillStyle="#c5c5c5",t.fill()}},aPoints=[],can,ctx,interval,width,height,numPoints=20;null!=document.getElementById("realisation-canvas")&&init();
}

// Event listener
$realisationNavButton.on("click", onRealisationClick);

// Function event listener
function onRealisationClick(event) {

	if(!isAnimating) {

		var addToUrl = $(this).attr('href');
		addToUrl = addToUrl.split('#')[1];

		window.location.hash = '/realisation/' + addToUrl;

	}

	event.preventDefault();
	
}

var goToPrevRealisation = function() {

	isAnimating = true;

	var currentRealisation = $('nav#realisation-nav li a.active').parent(),
		prevRealisation = currentRealisation.prev('li');

	if($currentReal.prev('.realisations').length) {

		var addToUrl = prevRealisation.find('a').attr('href');
			addToUrl = addToUrl.split('#')[1];

		window.location.hash = '/realisation/' + addToUrl;
	} else
		isAnimating = false;

};

var goToNextRealisation = function() {

	isAnimating = true;

	var currentRealisation = $('nav#realisation-nav li a.active').parent(),
		nextRealisation = currentRealisation.next('li');

	if($currentReal.next('.realisations').length) {

		var addToUrl = nextRealisation.find('a').attr('href');
			addToUrl = addToUrl.split('#')[1];

		window.location.hash = '/realisation/' + addToUrl;
	} else
		isAnimating = false;

};

function realisationHandler(thisIndex, currentActiveIndex) {

	// We need this fix to keep the function .next() and .prev() available for scroll and click
	var nextRealisationId = $($realisations[thisIndex]).attr('id'),
		nextRealisation = $realisations.filter('#' + nextRealisationId);

	if(thisIndex === currentActiveIndex)
		return;
	else if(thisIndex > currentActiveIndex)
		goToNextRealisationAnimation(nextRealisation);
	else if(thisIndex < currentActiveIndex)
		goToPrevRealisationAnimation(nextRealisation);

}

function goToPrevRealisationAnimation($real) {

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

function goToNextRealisationAnimation($real) {

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

function completeFunctionReal() {

	isAnimating = false;
	$('nav#realisation-nav li a.active').removeClass('active');
	$('nav#realisation-nav li a[href="#' + $($currentReal).attr('id') + '"]').addClass('active');
	
}

/*
 * Contact =p=
 */

var contactButton = $('.submit button');

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

contactButton.hover(function() {

	TweenLite.set(contactButton.parent().find('span'), {css: {left: 0, right: 'auto'}});

	TweenMax.to(contactButton, .25, {color: "#FFF"});
	TweenMax.to(contactButton.parent().find('span'), .35, {width: "100%"});

}, function() {

	TweenLite.set(contactButton.parent().find('span'), {css: {left: 'auto', right: 0}});

	TweenMax.to(contactButton, .25, {color: "#202020"});
	TweenMax.to(contactButton.parent().find('span'), .35, {width: "0%"});

});

contactButton.click(function(event) {

	if(validateEmail($('input[name="email"]').val()) && $('input[name="name"]').val() && $('textarea[name="message"]').val()) {

		TweenMax.to($('form *'), .45, {opacity: 0});
		$('form').delay(450).queue(function() {
			$(this).html('<h4>Votre email a bien été envoyé !</h4>').dequeue();
		});
		TweenLite.set($('form'), {css: {backgroundImage: 'url(img/mc-hammer-dance.gif)'}});

	    $.ajax({
	        url: 'http://www.hakolad.fr/v5/',
	        type: 'post',
	        data: $('form').serialize()
	    });

	} else {
		if(!validateEmail($('input[name="email"]').val())) 
			$('p.email').addClass('wrong');
		else
			$('p.email').removeClass('wrong');

		if(!$('input[name="name"]').val()) 
			$('p.name').addClass('wrong');
		else 
			$('p.name').removeClass('wrong');

		if(!$('textarea[name="message"]').val()) 
			$('p.message').addClass('wrong');
		else 
			$('p.message').removeClass('wrong');
	}

	event.preventDefault();
	
});

/*
 * Mentions légales =p=
 */

var $mentionsLegales = $('section#mentions-legales'),
	$closeMentionsLegalesButton = $('section#mentions-legales article div.remover-container div');

TweenLite.set($mentionsLegales, {css: {scale: 0.8}});
TweenLite.set($mentionsLegales.find('article'), {css: {opacity: 0}});

var showMentionsLegales = function() {

	var mentionsLegalesTimeline = new TimelineMax({ paused: true });

	mentionsLegalesTimeline.to($mentionsLegales, 0.75, {top: "3%", ease: Back.easeOut}, 0);
	mentionsLegalesTimeline.to($mentionsLegales, 0.25, {scale: 1}, 0.75);
	mentionsLegalesTimeline.to($mentionsLegales.find('article'), 0.45, {opacity: 1}, 0.95);

	mentionsLegalesTimeline.play();

}

$closeMentionsLegalesButton.click(function() {

	var mentionsLegalesTimeline = new TimelineMax({ paused: true });

	mentionsLegalesTimeline.to($mentionsLegales.find('article'), 0.45, {opacity: 0}, 0);
	mentionsLegalesTimeline.to($mentionsLegales, 0.25, {scale: 0.8}, 0.45);
	mentionsLegalesTimeline.to($mentionsLegales, 0.75, {top: "100%", ease: Back.easeOut}, 0.70);

	mentionsLegalesTimeline.play();

});

/*
 * Routage Functions =p=
 */


var addActiveMenu = function(hash) {

	var hashToActive = hash.split('/')[1];

	menuLink.removeClass('active');
	$('#menu a[href="#/' + hashToActive +'"]').addClass('active');

}

var getLevel = function(hash) {
	var sectionLevel = hash.split('/')[1];
	return $('section#' + sectionLevel);
};

var viewHomeFront = function() {
	goToHomeLevel(getLevel(window.location.hash));
	document.title = '{ Hakolad } Artisans du monde digital';
	$scaleWorkshopAnimation.pause();
};

var viewHome = function() {
	homeCanvas();
	goToLevel(getLevel(window.location.hash));
	addActiveMenu(window.location.hash);
	document.title = '{ Hakolad } Artisans du monde digital';
	menuLink.removeClass('active');
	$scaleWorkshopAnimation.pause();
};

var viewWorkshop = function() {
	goToLevel(getLevel(window.location.hash));
	addActiveMenu(window.location.hash);
	document.title = 'Notre Atelier { Hakolad }';
	$scaleWorkshopAnimation.restart();
};

var viewWorkshopSlide = function(slide) {
	goToLevel(getLevel(window.location.hash));
	addActiveMenu(window.location.hash);
	goToWorkshopSlide(slide);
	document.title = 'Notre Atelier { Hakolad }';
};

var viewService = function() {
	goToLevel(getLevel(window.location.hash));
	addActiveMenu(window.location.hash);
	document.title = 'Nos Prestations { Hakolad }';
	$scaleWorkshopAnimation.pause();
};

var viewServiceSlide = function(slide) {

	goToLevel(getLevel(window.location.hash));
	addActiveMenu(window.location.hash);
	document.title = 'Nos Prestations { Hakolad }';
	$scaleWorkshopAnimation.pause();


	if(slide != null) {

		var thisIndex = $('nav#prestation-nav a').filter("[href='#"+slide+"']").parent().index(),
			currentActiveIndex = $('nav#prestation-nav a.active').parent().index();

		prestationHandler(thisIndex, currentActiveIndex);

	}

};

var viewProduction = function() {
	realisationCanvas();
	goToLevel(getLevel(window.location.hash));
	addActiveMenu(window.location.hash);
	document.title = 'Nos Réalisations { Hakolad }';
	$scaleWorkshopAnimation.pause();
};

var viewProductionSlide = function(slide) {

	goToLevel(getLevel(window.location.hash));
	addActiveMenu(window.location.hash);
	document.title = 'Nos Réalisations { Hakolad }';
	$scaleWorkshopAnimation.pause();

	if(slide != null) {

		var thisIndex = $('nav#realisation-nav a').filter("[href='#"+slide+"']").parent().index(),
			currentActiveIndex = $('nav#realisation-nav a.active').parent().index();

		realisationHandler(thisIndex, currentActiveIndex);

	}

};

var viewContact = function() {
	goToLevel(getLevel(window.location.hash));
	addActiveMenu(window.location.hash);
	document.title = 'Nous Contacter { Hakolad }';
	$scaleWorkshopAnimation.pause();
};

var viewLegalMention = function() {
	document.title = 'Mentions Légales { Hakolad }';
	showMentionsLegales();
};

/*
 * Routage =p=
 */

var routes = {
	'/accueil-front': viewHomeFront,
	'/accueil': viewHome,
	'/atelier-creation-web-bas-rhin': viewWorkshop,
	'/atelier-creation-web-bas-rhin/:slide': viewWorkshopSlide,
	'/prestation': viewService,
	'/prestation/:slide': viewServiceSlide,
	'/realisation': viewProduction,
	'/realisation/:slide': viewProductionSlide,
	'/contact-agence-web-strasbourg': viewContact,
	'/mentions-legales': viewLegalMention,
};

var router = Router(routes);
var routerIsInit = false;

/*
 * Scrollbar =p=
 */
if(pageWidth > 640)
	$('#accueil, #contact-agence-web-strasbourg .right-container, section#mentions-legales').jScrollPane({ autoReinitialise: true });

/*
 * Resizer =p=
 */

var routerIsDead = false,
	desktopSettingAreSet = true;

var onResize = function(event) {

	pageHeight = $window.innerHeight();
	pageWidth = $window.innerWidth();

	if(pageWidth > 640) {
		$prestationNav.css({lineHeight: $window.height() + 'px'});
		$realisationNav.css({lineHeight: $window.height() + 'px'});	

		if(!desktopSettingAreSet) {
			window.location.hash = '/accueil-front';
			setAscensor();
			desktopSettingAreSet = true;
		}			

		if(routerIsDead && !isAnimating) {
			router.init();
			routerIsDead = false;
		}
			

	} else {

		menuAppears();

		if(!routerIsDead) {
			router.destroy();
			routerIsDead = true;
		}

		if(desktopSettingAreSet) {
			killDesktopSettings()
			desktopSettingAreSet = false;
		}
		
	}

}

var killDesktopSettings = function() {

	$levels.each(function(key, value) {
		TweenLite.set(this, {css: {x: "0px", y: "0px"}});
	});

};

$window.on("resize", onResize).resize();

/*
 * Init launcher =p=
 */

$(document).ready(function() {

	imageToBackground();
	if(pageWidth > 640) {
		hideMenu();
		setAscensor();
		router.init();
	} else {
		menuAppears();
		$('div#loader').remove();
	}

});

/***
	PIXI stuff
***/

Object.defineProperties(PIXI.Graphics.prototype, {
    scaleX: {
        get: function () { return this.scale.x; },
        set: function (v) { this.scale.x = v; }
    },
    scaleY: {
        get: function () { return this.scale.y; },
        set: function (v) { this.scale.y = v; }
    }
});

Object.defineProperties(PIXI.Text.prototype, {
    scaleX: {
        get: function () { return this.scale.x; },
        set: function (v) { this.scale.x = v; }
    },
    scaleY: {
        get: function () { return this.scale.y; },
        set: function (v) { this.scale.y = v; }
    }
});

var renderer,
	stage;

var winWidth = window.innerWidth,
	winHeight = window.innerHeight;

// Elements
var yellowRectangle,
	blackRectangle,
	yellowRectangleMask,
	blackRectangleMask,
	goldRectangleMask,
	textYellow,
	textBlack,
	sketchBlackTexture,
	sketchBlack,
	sketchWhiteTexture,
	sketchWhite,
	goldTexture,
	gold;

// We create the canvas element
stage = new PIXI.Stage(0xFFFFFF);
renderer = new PIXI.CanvasRenderer(800, 600, null, true, true);
document.getElementById("loader").appendChild(renderer.view);

// Load google fonts before starting...!
window.WebFontConfig = {
    google: {
        families: ['Lato']
    },

    active: function() {
    	var img = new Image();
    	if(pageWidth > 640)
			img.onload = init();
		img.src = "/img/or.png";
    }
};

(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

var createRect = function (x1, y1, x2, y2, color) {

    var graphics = new PIXI.Graphics();

    graphics.beginFill(color || 0x000000);

    graphics.position.x = x1 + (x2/2);
    graphics.position.y = y1 + (y2/2);

    graphics.drawRect(-(x2/2), -(y2/2), x2, y2);

    return graphics;

};

var init = function() {

	$(window).resize(onResize);
	onResize();

	requestAnimFrame(animate);

	elements();

};

var elements = function() {

	/*
	 * Yellow, Black and Gold Mask
	 */

	blackRectangleMask = createRect(winWidth, -winHeight / 2, winWidth, winHeight * 2, 0xFF2020);

	yellowRectangleMask = createRect(-winWidth, -winHeight / 2, winWidth, winHeight * 2, 0xf3a3FF);

	/*
	 * Yellow Rectangle
	 */

	yellowRectangle = createRect(-winWidth, -winHeight / 2, winWidth, winHeight * 2, 0xf3a33f);

	/*
	 * Black Rectangle
	 */

	blackRectangle = createRect(winWidth, -winHeight / 2, winWidth, winHeight * 2, 0x202020);

	/*
	 * Hakolad Sketch Black
	 */

	sketchBlackTexture = PIXI.Texture.fromImage('img/crayon_noir.png');
	sketchBlack = new PIXI.Sprite(sketchBlackTexture);

	sketchBlack.anchor.x = sketchBlack.anchor.y = 0.5
	sketchBlack.position.x = winWidth / 2;
	sketchBlack.position.y = winHeight / 2 - 5;

    sketchBlack.mask = yellowRectangleMask;

	/*
	 * Hakolad Sketch White
	 */

	sketchWhiteTexture = PIXI.Texture.fromImage('img/crayon_blanc.png');
	sketchWhite = new PIXI.Sprite(sketchWhiteTexture);

	sketchWhite.anchor.x = sketchWhite.anchor.y = 0.5
	sketchWhite.position.x = winWidth / 2;
	sketchWhite.position.y = winHeight / 2 - 5;
	
    sketchWhite.mask = blackRectangleMask;

	/*
	 * Gold Mask
	 */

	goldRectangleMask = createRect(-winWidth, 0, winWidth, winHeight, 0xFF0000);
	goldRectangleMask.mask = blackRectangleMask;

	/*
	 * Hakolad Sketch Gold
	 */

	goldTexture = PIXI.Texture.fromImage('img/or.png');
	gold = new PIXI.Sprite(goldTexture);

	gold.anchor.x = gold.anchor.y = 0.5
	gold.position.x = winWidth / 2 + 2;
	gold.position.y = winHeight / 2 - 5;
	
    gold.mask = goldRectangleMask;

	/*
	 * Texte
	 */

	textBlack = new PIXI.Text('TRANSFORMONS VOS PROJETS EN RÉALITÉ', { font: '12px Lato', fill: '#202020', align: 'left'});
	textYellow = new PIXI.Text('TRANSFORMONS VOS PROJETS EN RÉALITÉ', { font: '12px Lato', fill: '#f3a33f', align: 'left'});

	//var countingText = new PIXI.Text('TRANSFORMONS VOS PROJETS EN RÉALITÉ', {font: '90px', align: 'right'});

    textBlack.position.x = textYellow.position.x = winWidth / 2;
    textBlack.position.y = textYellow.position.y = winHeight / 2 + 55;
    textBlack.anchor.x = textBlack.anchor.y = textYellow.anchor.x = textYellow.anchor.y = 0.5;
    textBlack.alpha = textYellow.alpha = 0;

    textYellow.mask = blackRectangleMask;
    textBlack.mask = yellowRectangleMask;

    /*
   	 * Manage layers
   	 */

	stage.addChild(blackRectangle);
	stage.addChild(blackRectangleMask);
	stage.addChild(textYellow);
	stage.addChild(sketchWhite);

	stage.addChild(goldRectangleMask);
	stage.addChild(gold);

	stage.addChild(yellowRectangle);
	stage.addChild(yellowRectangleMask);
	stage.addChild(textBlack);
	stage.addChild(sketchBlack);

	// Launch animation
	timelineAnimation();

}

var timelineAnimation = function() {

	var timeline = new TimelineMax({ paused: true });

	/*
	 * Rectangle
	 */

	timeline.add(TweenMax.to( yellowRectangle, 0.75, {x: -10, ease: Power3.easeIn}), 0);
	timeline.add(TweenMax.to( blackRectangle, 0.75, {x: winWidth - 10, ease: Power3.easeIn}), 0);

	timeline.add(TweenMax.to( yellowRectangle, 0.35, {rotation: -0.15}), 1);
	timeline.add(TweenMax.to( blackRectangle, 0.35, {rotation: -0.15}), 1)
	
	timeline.add(TweenMax.to( yellowRectangle, 0.75, {x: -winWidth / 2, rotation: 0}), 4.5);
	timeline.add(TweenMax.to( blackRectangle, 0.75, {x: winWidth + winWidth / 2, rotation: 0}), 4.5);

	/*
	 * Mask
	 */

	timeline.add(TweenMax.to( yellowRectangleMask, 0.75, {x: -10, ease: Power3.easeIn}), 0);
	timeline.add(TweenMax.to( blackRectangleMask, 0.75, {x: winWidth - 10, ease: Power3.easeIn}), 0);

	timeline.add(TweenMax.to( yellowRectangleMask, 0.35, {rotation: -0.15}), 1);
	timeline.add(TweenMax.to( blackRectangleMask, 0.35, {rotation: -0.15}), 1);

	timeline.add(TweenMax.to( yellowRectangleMask, 0.75, {x: -winWidth / 2, rotation: 0}), 4.5);
	timeline.add(TweenMax.to( blackRectangleMask, 0.75, {x: winWidth + winWidth / 2, rotation: 0}), 4.5);

	/*
	 * Gold Mask
	 */

	timeline.add(TweenMax.to( goldRectangleMask, 1.5, {x: winWidth - 10}), 1.5);
	timeline.add(TweenMax.to( gold, 0.01, {alpha: 0}), 4.5);

	/*
	 * Text
	 */

	timeline.add(TweenMax.to( textYellow, 0, {scaleX: 2.5, scaleY: 2.5}), 0);
	timeline.add(TweenMax.to( textBlack, 0, {scaleX: 2.5, scaleY: 2.5}), 0);

	timeline.add(TweenMax.to( textYellow, 0.35, {alpha: 1, scaleX: 1, scaleY: 1}), 2.5);
	timeline.add(TweenMax.to( textBlack, 0.35, {alpha: 1, scaleX: 1, scaleY: 1}), 2.5);

	// Call back function to remove background color
	timeline.addCallback(removeBackground, 4);

	timeline.play();
	timeline.call(removeCanvas);

}

var animate = function() {
	requestAnimFrame(animate);
	renderer.render(stage);
}

var onResize = function() {

	winWidth = window.innerWidth;
	winHeight = window.innerHeight;

	renderer.resize(winWidth, winHeight);

}

var removeBackground = function() {
	$('div#loader').css({background: 'none'});
}

var removeCanvas = function() {

	TweenMax.to( $('div#loader'), 0.35, {alpha: 0, onComplete: function() {
		$('div#loader').remove();
	}});

}