(function($){


// ********************************************************************************
// Layout
// ********************************************************************************


setHeight( $('.set-height') );

// elements with a class of set-height will have a total height of the height 
// of the window's multiplied why the value of its data-height attribute



// ********************************************************************************
// SlideShow
// ********************************************************************************

var container = $(".slideshow").addClass("js"), // add js class to slideshow
	number = $(".title").show(), // show slide number
	mapContainer = $(".dots")
	slideshow = new Slideshow( container, $(".nav-wrap"), mapContainer ); // new slideshow

// start slideshow
slideshow.showCurrent(); // show first slide when page loads
slideshow.log();
slideshow.fillMap();
slideshow.positionMap();
slideshow.mapCurrent();

// add click even handler to prev and next anchors
slideshow.nav.show().find("a").on("click", function(){
	slideshow.setCurrent( $(this).attr("class") );
	slideshow.showCurrent();
	slideshow.mapCurrent();

  	return false;
});

// reposition dot container when window is resized
$( window ).resize(function() {
	slideshow.positionMap();
});



// ********************************************************************************
// Hero
// ********************************************************************************

var $hero = $('#hero'),
	scrollPos = window.scrollY,
	heroEffects = new HeroEffects($hero);

heroEffects.set();
heroEffects.fadeDownArrow(scrollPos);

// ******************** On scroll event ********************
window.addEventListener('scroll', function(){
    var scrollPos = this.scrollY;

    heroEffects.updateOpacity(scrollPos);
    heroEffects.updatePosition(scrollPos);
    heroEffects.fadeDownArrow(scrollPos);
});

// ******************** On resize event ********************
window.addEventListener('resize', function(){
    heroEffects.set();
    // aboutEffects.set();
});


// ********************************************************************************
// Fade In
// ********************************************************************************

var $triggerFade = $('.trigger-fade'),
	fadeInEls = new FadeIn( $triggerFade );

fadeInEls.init();
// fadeInEls.listen(scrollPos);

// ******************** On scroll event ********************
window.addEventListener('scroll', function(){
    var scrollPos = this.scrollY;

    fadeInEls.listen(scrollPos);
});



})(jQuery);




























