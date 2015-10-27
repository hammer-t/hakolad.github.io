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
        init();
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

	blackRectangleMask = createRect(winWidth, -winHeight / 2, winWidth, winWidth, 0xFF2020);

	yellowRectangleMask = createRect(-winWidth, -winHeight / 2, winWidth, winWidth, 0xf3a3FF);

	/*
	 * Yellow Rectangle
	 */

	yellowRectangle = createRect(-winWidth, -winHeight / 2, winWidth, winWidth, 0xf3a33f);

	/*
	 * Black Rectangle
	 */

	blackRectangle = createRect(winWidth, -winHeight / 2, winWidth, winWidth, 0x202020);

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
	}})
}